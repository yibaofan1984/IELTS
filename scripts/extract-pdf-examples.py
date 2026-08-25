"""Extract example sentences and translations from the scanned vocabulary book.

The PDF has no text layer, so this script renders each page, OCRs the two text
columns separately, aligns printed headwords with the app's book order, and
writes only entries that contain an explicit [例] section. Words without a
printed example are deliberately absent from the output JSON.
"""

from __future__ import annotations

import argparse
import concurrent.futures
import difflib
import json
import re
import subprocess
import tempfile
from pathlib import Path

import pypdfium2 as pdfium


ROOT = Path(__file__).resolve().parents[1]
WORKSPACE = ROOT.parent
PDF_PATH = WORKSPACE / "《雅思词汇真经》.pdf"
VOCAB_PATH = ROOT / "app" / "vocabulary.json"
OUTPUT_PATH = ROOT / "app" / "book-content.json"
OCR_DIR = WORKSPACE / "tmp" / "pdfs" / "ocr-examples-hq"
LEGACY_OCR_DIR = WORKSPACE / "tmp" / "pdfs" / "ocr-examples"
TESSDATA_DIR = WORKSPACE / "tmp" / "pdfs" / "tessdata"
TESSERACT = Path(r"C:\Program Files\Tesseract-OCR\tesseract.exe")

CORRECTIONS = {
    "slothfu": "slothful",
    "temperat": "temperate",
    "escalato": "escalator",
    "epartment": "department",
    "instituted": "institute",
    "federationn": "federation",
    "cation": "clarification",
    "comdemn": "condemn",
    "fasle": "false",
    "debate about/on/upon sth": "debate",
}

_PDF: pdfium.PdfDocument | None = None


def target_words() -> list[str]:
    chapters = json.loads(VOCAB_PATH.read_text(encoding="utf-8"))
    words = [CORRECTIONS.get(item["word"], item["word"]) for chapter in chapters for item in chapter["words"]]
    words.insert(words.index("fashionable"), "fashion")
    words.insert(words.index("diet"), "food")
    return words


def init_worker() -> None:
    global _PDF
    _PDF = pdfium.PdfDocument(PDF_PATH)


def run_tesseract(image_path: Path, psm: int) -> str:
    try:
        process = subprocess.run(
            [
                str(TESSERACT), str(image_path), "stdout", "--tessdata-dir", str(TESSDATA_DIR),
                "-l", "chi_sim+eng", "--psm", str(psm), "-c", "preserve_interword_spaces=1",
            ],
            check=True,
            capture_output=True,
            timeout=60,
        )
    except subprocess.TimeoutExpired:
        # A handful of illustrated divider pages can make layout analysis loop
        # for many minutes. The other pass still supplies usable text.
        return ""
    return process.stdout.decode("utf-8", errors="replace")


def ocr_page(page_number: int, dpi: int) -> tuple[int, str]:
    assert _PDF is not None
    output = OCR_DIR / f"page-{page_number:04d}.txt"
    if output.exists() and output.stat().st_size > 20:
        return page_number, "cached"

    page = _PDF[page_number - 1]
    image = page.render(scale=dpi / 72).to_pil()
    width, height = image.size
    with tempfile.TemporaryDirectory(dir=OCR_DIR) as temp_dir:
        temp = Path(temp_dir)
        left_path = temp / "left.png"
        right_path = temp / "right.png"
        image.crop((0, 0, width // 2, height)).save(left_path)
        image.crop((width // 2, 0, width, height)).save(right_path)
        # PSM 4 understands the variable-size dictionary layout better, while
        # PSM 6 occasionally reads a difficult Chinese line more accurately.
        # Keep both passes and choose the cleaner complete example when parsing.
        left_4 = run_tesseract(left_path, 4)
        right_4 = run_tesseract(right_path, 4)
        left_6 = run_tesseract(left_path, 6)
        right_6 = run_tesseract(right_path, 6)
    output.write_text(
        "\n".join([
            "<<<LEFT_PSM4>>>", left_4, "<<<RIGHT_PSM4>>>", right_4,
            "<<<LEFT_PSM6>>>", left_6, "<<<RIGHT_PSM6>>>", right_6,
        ]),
        encoding="utf-8",
    )
    return page_number, "ocr"


def normal_word(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", value.lower().replace("’", "'"))


def candidate_before_phonetic(line: str) -> str | None:
    slash = line.find("/")
    if slash < 1 or slash > 100:
        return None
    if line.find("/", slash + 1) >= 0:
        prefix = line[:slash]
    else:
        # OCR occasionally drops the opening slash but keeps the closing one:
        # "demise ,di'maiz/". In that case the headword is the first run of
        # letters before the phonetic transcription.
        one_slash = re.match(r"^\s*([A-Za-z][A-Za-z0-9'’\-]*)\s+[=,《‘'\"“]?\s*[A-Za-zəɑɔɜɪʊʌæθðʃʒŋ:'.\-]+/", line)
        if not one_slash:
            return None
        prefix = one_slash.group(1)
    prefix = prefix.replace("=", " ").replace("|", " ")
    prefix = re.sub(r"^\s*[\[【(（][^\]】)）]{0,8}[\]】)）]\s*", "", prefix)
    prefix = re.sub(r"^\s*(?:n|v|adj|adv)\.?\s+", "", prefix, flags=re.I)
    prefix = re.sub(r"[^A-Za-z0-9'’\-\s]", " ", prefix)
    prefix = re.sub(r"\s+", " ", prefix).strip()
    return prefix or None


def match_heading(candidate: str, words: list[str], pointer: int) -> tuple[int, float] | None:
    candidate_norm = normal_word(candidate)
    if len(candidate_norm) < 2:
        return None

    # Exact matches may look farther ahead because some printed related forms
    # have no independent headword. Fuzzy matches, however, stay close to the
    # current pointer so a damaged word cannot jump over an entire chapter.
    exact_end = min(len(words), pointer + 180)
    for index in range(pointer, exact_end):
        target_norm = normal_word(words[index])
        if candidate_norm == target_norm:
            return index, 1.0

    fuzzy_end = min(len(words), pointer + 45)
    best: tuple[int, float] | None = None
    best_weighted = 0.0
    for index in range(pointer, fuzzy_end):
        target_norm = normal_word(words[index])
        if abs(len(candidate_norm) - len(target_norm)) > max(3, len(target_norm) // 3):
            continue
        score = difflib.SequenceMatcher(None, candidate_norm, target_norm).ratio()
        threshold = 0.80 if len(target_norm) <= 4 else 0.70
        weighted = score - (index - pointer) * 0.004
        if score >= threshold and weighted > best_weighted:
            best = (index, score)
            best_weighted = weighted
    return best


def match_heading_independent(candidate: str, words: list[str]) -> tuple[str, float] | None:
    candidate_norm = normal_word(candidate)
    if len(candidate_norm) < 2 or len(candidate_norm) > 45:
        return None
    exact = {normal_word(word): word for word in words}
    if candidate_norm in exact:
        return exact[candidate_norm], 1.0

    best_word = None
    best_score = 0.0
    for word in words:
        target_norm = normal_word(word)
        if abs(len(candidate_norm) - len(target_norm)) > max(2, len(target_norm) // 4):
            continue
        score = difflib.SequenceMatcher(None, candidate_norm, target_norm).ratio()
        if score > best_score:
            best_word, best_score = word, score
    threshold = 0.90 if len(candidate_norm) <= 4 else 0.82 if len(candidate_norm) <= 7 else 0.78
    return (best_word, best_score) if best_word and best_score >= threshold else None


def marker(line: str) -> tuple[str, str] | None:
    known = re.match(r"^\s*[\[【]?\s*([例记搭派同])\s*[\]】]?\s*(.*)$", line)
    if known:
        return known.group(1), known.group(2)
    unknown = re.match(r"^\s*\[[^\]]{0,8}\]\s*(.*)$", line)
    if unknown:
        return "?", unknown.group(1)
    return None


def looks_like_example(text: str) -> bool:
    english_words = re.findall(r"[A-Za-z][A-Za-z'’-]*", text)
    if len(english_words) < 3:
        return False
    return bool(re.search(r"[A-Za-z]", text) and re.search(r"[\u3400-\u9fff]", text))


def clean_english(text: str) -> str:
    text = text.replace("’", "'").replace("“", '"').replace("”", '"')
    text = re.sub(r"^\s*\|\s*", "I ", text)
    text = text.replace("|", "")
    text = re.sub(r"^1(?=\s|')", "I", text)
    text = re.sub(r"([.!?])\s+[Il]\s*$", r"\1", text)
    text = re.sub(r"\b(their|his|her|our|your|its|the|an|a)\s+[Il]\s+(?=[a-z])", r"\1 ", text, flags=re.I)
    text = re.sub(r"\s+([,.;:!?])", r"\1", text)
    text = re.sub(r"([([{])\s+", r"\1", text)
    text = re.sub(r"\s+", " ", text).strip(" -—:|")
    text = re.sub(r"\bieg\b", "leg", text, flags=re.I)
    return text


def clean_chinese(text: str) -> str:
    fixes = {
        "抛酒热血": "抛洒热血",
        "控伤手指": "擦伤手指",
        "对害虫臻命": "对害虫致命",
        "有和氧锻炼": "有氧锻炼",
        "很难治请": "很难治疗",
    }
    text = text.replace("。 .", "。").replace("， ,", "，")
    text = text.replace("|", "")
    text = re.sub(r"(?<=[\u3400-\u9fff])\s+(?=[\u3400-\u9fff])", "", text)
    text = re.sub(r"(?<=[\u3400-\u9fff])\s+([，。；：！？、])", r"\1", text)
    text = re.sub(r"([，。；：！？、])\s+(?=[\u3400-\u9fff])", r"\1", text)
    text = re.sub(r"\s+", " ", text).strip(" -—:|")
    for wrong, right in fixes.items():
        text = text.replace(wrong, right)
    return text


def example_quality(example: dict[str, str]) -> float:
    english = example["before"] + example["after"]
    translation = example["translation"]
    han = len(re.findall(r"[\u3400-\u9fff]", translation))
    latin_in_translation = len(re.findall(r"[A-Za-z]", translation))
    suspicious = len(re.findall(r"(?:IELTS|Chapter|adj\.|adv\.|\[记\]|\[搭\]|雅思词汇真经)", translation, re.I))
    terminal_bonus = 50 if re.search(r"[。！？?]$", translation) else 0
    ratio = han / max(1, han + latin_in_translation)
    return terminal_bonus + ratio * 40 + min(han, 55) / 3 - latin_in_translation * 4 - suspicious * 80


def publishable_example(example: dict[str, str]) -> bool:
    english = example["before"] + example["after"]
    translation = example["translation"]
    if not re.search(r"[。！？?]$", translation):
        return False
    if len(re.findall(r"[A-Za-z]", translation)) > 3:
        return False
    if re.search(r"(?:IELTS|Chapter|adj\.|adv\.|雅思词汇真经|\[\s*[记搭派同]\s*\])", translation, re.I):
        return False
    if len(re.findall(r"[\\<>_=~{}@#%^&*]", translation)) > 1:
        return False
    if len(re.findall(r"[\\<>_=~{}@#%^&*]", english)) > 1:
        return False
    return True


def example_similarity(left: dict[str, str], right: dict[str, str]) -> float:
    left_english = normal_word(left["before"] + left["after"])
    right_english = normal_word(right["before"] + right["after"])
    english_score = difflib.SequenceMatcher(None, left_english, right_english).ratio()
    translation_score = difflib.SequenceMatcher(None, left["translation"], right["translation"]).ratio()
    return (english_score + translation_score) / 2


def cut_english_sentence(text: str, word: str) -> str:
    for found in re.finditer(r"[.!?](?=\s|$)", text):
        candidate = text[:found.end()]
        if re.search(re.escape(word), candidate, flags=re.I):
            return candidate
    return text


def cut_translation(text: str) -> str:
    cutoffs: list[int] = []
    terminal = re.search(r"[。！？?]", text)
    if terminal:
        cutoffs.append(terminal.end())
    ascii_period = re.search(r"(?<=[\u3400-\u9fff])\.", text)
    if ascii_period:
        cutoffs.append(ascii_period.end())
    junk = re.search(
        r"(?:雅思词汇真经|IELTS|Chapter|词源|字根|\[\s*[记搭派同]\s*\]|\b[A-Za-z][A-Za-z'’-]*\s+(?:adj|adv|n|v)\.)",
        text,
        flags=re.I,
    )
    if junk and len(re.findall(r"[\u3400-\u9fff]", text[:junk.start()])) >= 4:
        cutoffs.append(junk.start())
    if cutoffs:
        text = text[:min(cutoffs)]
    return text.strip(" -—:|,，;；")


def extract_example(block: list[str], word: str) -> dict[str, str] | None:
    start = None
    first_body = ""
    for index, line in enumerate(block[1:], 1):
        found = marker(line)
        if not found:
            continue
        kind, body = found
        unknown_example = (
            kind == "?"
            and len(re.findall(r"[A-Za-z][A-Za-z'’-]*", body)) >= 4
            and re.search(re.escape(word), body, flags=re.I)
        )
        if kind == "例" or (kind == "?" and (looks_like_example(body) or unknown_example)):
            start, first_body = index, body
            break
        if kind in {"记", "搭", "派", "同"}:
            continue
    if start is None:
        return None

    parts = [first_body]
    for line in block[start + 1:]:
        if marker(line):
            break
        if candidate_before_phonetic(line):
            break
        parts.append(line)
    combined = re.sub(r"\s+", " ", " ".join(parts)).strip()
    chinese = re.search(r"[\u3400-\u9fff]", combined)
    if not chinese:
        return None
    english = clean_english(combined[:chinese.start()])
    english = cut_english_sentence(english, word)
    translation = cut_translation(clean_chinese(combined[chinese.start():]))
    # A printed example ends with its Chinese sentence. Cutting at that point
    # prevents the following [记]/[搭] paragraph or page footer from leaking in.
    terminal = re.search(r"[。！？?]", translation)
    if terminal:
        translation = translation[:terminal.end()]
    han_count = len(re.findall(r"[\u3400-\u9fff]", translation))
    latin_count = len(re.findall(r"[A-Za-z]", translation))
    if (
        not english
        or not translation
        or len(re.findall(r"[A-Za-z]", english)) < 4
        or han_count < 4
        or (latin_count > 4 and han_count / (han_count + latin_count) < 0.55)
        or len(english) > 260
        or len(translation) > 180
    ):
        return None

    word_match = re.search(re.escape(word), english, flags=re.I)
    if not word_match:
        # A printed example may use an inflected form, but it must still contain
        # the headword as a substring to be highlighted faithfully in the UI.
        compact_word = re.sub(r"\s+", " ", word).strip()
        word_match = re.search(re.escape(compact_word), english, flags=re.I)
    if not word_match:
        return None
    return {
        "before": english[:word_match.start()],
        "after": english[word_match.end():],
        "translation": translation,
    }


def parse_ocr() -> tuple[dict[str, dict[str, str]], dict[str, object]]:
    words = target_words()
    unique_words = list(dict.fromkeys(words))
    current_word: str | None = None
    current_block: list[str] = []
    candidates: dict[str, list[dict[str, str]]] = {}
    headings: list[dict[str, object]] = []

    def finish_block() -> None:
        if current_word is None:
            return
        example = extract_example(current_block, current_word)
        if example:
            key = current_word.lower()
            candidates.setdefault(key, []).append(example)

    for source_dir in (OCR_DIR, LEGACY_OCR_DIR):
        for path in sorted(source_dir.glob("page-*.txt")):
            page_number = int(path.stem.split("-")[-1])
            content = path.read_text(encoding="utf-8", errors="replace")
            columns = re.split(r"<<<(?:LEFT|RIGHT)(?:_PSM[46])?>>>", content)
            for column in columns:
                for raw_line in column.splitlines():
                    line = raw_line.strip()
                    if not line:
                        continue
                    candidate = candidate_before_phonetic(line)
                    matched = match_heading_independent(candidate, unique_words) if candidate else None
                    if matched:
                        matched_word, score = matched
                        finish_block()
                        current_word = matched_word
                        current_block = [line]
                        headings.append({"page": page_number, "word": current_word, "score": round(score, 3), "ocr": candidate})
                    elif current_word is not None:
                        current_block.append(line)
                # Columns are independent in the printed book. Ending the block
                # here avoids joining a left-column entry to the right column or
                # carrying the final word into the index on the next page.
                finish_block()
                current_word = None
                current_block = []
    finish_block()

    results: dict[str, dict[str, str]] = {}
    for key, options in candidates.items():
        unique = list({json.dumps(option, ensure_ascii=False, sort_keys=True): option for option in options}.values())
        publishable = [option for option in unique if publishable_example(option)]
        if not publishable:
            continue

        def consensus_quality(option: dict[str, str]) -> float:
            agreement = sorted(
                (example_similarity(option, other) for other in publishable if other is not option),
                reverse=True,
            )[:2]
            return example_quality(option) + sum(agreement) * 35

        results[key] = max(publishable, key=consensus_quality)

    unfiltered_count = len(candidates)
    report = {
        "targetEntries": len(words),
        "matchedHeadings": len(headings),
        "matchedUniqueHeadwords": len({heading["word"].lower() for heading in headings}),
        "examples": len(results),
        "discardedUnreliableExamples": unfiltered_count - len(results),
        "candidateExamples": sum(len(options) for options in candidates.values()),
        "headings": headings,
    }
    return results, report


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--ocr", action="store_true")
    parser.add_argument("--parse", action="store_true")
    parser.add_argument("--start", type=int, default=1)
    parser.add_argument("--end", type=int)
    parser.add_argument("--dpi", type=int, default=240)
    parser.add_argument("--workers", type=int, default=4)
    args = parser.parse_args()
    OCR_DIR.mkdir(parents=True, exist_ok=True)

    if args.ocr:
        page_count = len(pdfium.PdfDocument(PDF_PATH))
        end = min(args.end or page_count, page_count)
        pages = list(range(max(1, args.start), end + 1))
        with concurrent.futures.ProcessPoolExecutor(max_workers=args.workers, initializer=init_worker) as pool:
            futures = [pool.submit(ocr_page, page, args.dpi) for page in pages]
            for completed, future in enumerate(concurrent.futures.as_completed(futures), 1):
                page, status = future.result()
                print(f"[{completed}/{len(pages)}] page {page}: {status}", flush=True)

    if args.parse:
        examples, report = parse_ocr()
        OUTPUT_PATH.write_text(json.dumps(examples, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        (OCR_DIR / "extraction-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"wrote {len(examples)} PDF examples to {OUTPUT_PATH}")
        print(f"matched {report['matchedHeadings']} headings ({report['matchedUniqueHeadwords']} unique)")


if __name__ == "__main__":
    main()
