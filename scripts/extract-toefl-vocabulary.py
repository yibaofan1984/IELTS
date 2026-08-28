"""Extract the 48 TOEFL lists from the source PDF into app data.

The PDF contains selectable table text plus a diagonal watermark.  The
watermark is exposed by pdfplumber as isolated capital letters, so those
lines are removed before the book fields are normalised.
"""

from __future__ import annotations

import json
import re
import sys
from collections import defaultdict
from pathlib import Path

import pdfplumber


ROOT = Path(__file__).resolve().parents[2]
PDF_PATH = ROOT / "托福词汇.pdf"
OUTPUT_PATH = ROOT / "web" / "app" / "toefl-vocabulary.json"

CONTENT_FIRST_PAGE = 4  # zero-based: PDF page 5 / printed page 001
CONTENT_LAST_PAGE = 296  # zero-based: PDF page 297 / printed page 293

POS_PATTERN = re.compile(
    r"(?<![A-Za-z])(?:n|v|vt|vi|adj|adv|prep|conj|pron|num|art|aux|modal|int|interj|abbr)\s*\.",
    re.IGNORECASE,
)
WORD_PATTERN = re.compile(r"^[A-Za-z][A-Za-z0-9'’.,/&()\-\s]*$")
WORD_CORRECTIONS = {
    # The narrow headword column adds a discretionary line-break hyphen.
    "incomprehen- sible": "incomprehensible",
}


def clean_lines(value: object) -> list[str]:
    if value is None:
        return []
    lines = []
    for raw_line in str(value).replace("\r", "").split("\n"):
        line = raw_line.strip()
        # The source watermark is extracted as isolated letters such as
        # P/O/S/T/E/R between otherwise valid table lines.
        if not line or re.fullmatch(r"[A-Z]", line):
            continue
        lines.append(line)
    return lines


def clean_word(value: object) -> str:
    word = re.sub(r"\s+", " ", " ".join(clean_lines(value))).strip()
    return WORD_CORRECTIONS.get(word, word)


def clean_definition(value: object) -> str:
    text = "".join(clean_lines(value))
    return re.sub(r"\s+", " ", text).strip()


def clean_example(value: object) -> str:
    text = " ".join(clean_lines(value))
    text = re.sub(r"\s+", " ", text)
    # Keep lexical hyphens while removing whitespace introduced when a
    # hyphenated compound wraps to the next printed line.
    text = re.sub(r"(?<=[A-Za-z])-\s+(?=[A-Za-z])", "-", text)
    text = re.sub(r"\s+([,.;:!?])", r"\1", text)
    return text.strip()


def extract_part_of_speech(definition: str) -> str:
    values: list[str] = []
    for match in POS_PATTERN.finditer(definition):
        value = re.sub(r"\s+", "", match.group(0)).lower()
        if value not in values:
            values.append(value)
    return " / ".join(values)


def extract_hint(definition: str) -> str:
    hint = POS_PATTERN.sub("", definition)
    hint = re.sub(r"\s+", "", hint)
    hint = re.sub(r"^[；;，,、]+|[；;，,、]+$", "", hint)
    return hint or "请参阅词书释义"


def page_list_and_level(text: str) -> tuple[int, int]:
    list_match = re.search(r"List\s+(\d+)", text[:500])
    level_match = re.search(r"Level\s+(\d+)", text[:500])
    if not list_match or not level_match:
        raise ValueError("Could not identify List/Level from page heading")
    return int(list_match.group(1)), int(level_match.group(1))


def main() -> None:
    if not PDF_PATH.exists():
        raise FileNotFoundError(PDF_PATH)

    words_by_list: dict[int, list[dict[str, object]]] = defaultdict(list)
    levels: dict[int, int] = {}
    source_pages: dict[int, list[int]] = defaultdict(list)
    malformed_rows: list[str] = []

    with pdfplumber.open(PDF_PATH) as pdf:
        for page_index in range(CONTENT_FIRST_PAGE, CONTENT_LAST_PAGE + 1):
            page = pdf.pages[page_index]
            page_text = page.extract_text() or ""
            list_number, level = page_list_and_level(page_text)
            levels[list_number] = level
            source_pages[list_number].append(page_index + 1)

            tables = page.extract_tables()
            if len(tables) != 1:
                raise ValueError(f"PDF page {page_index + 1}: expected one table, found {len(tables)}")

            rows = tables[0]
            if rows and "单词" in "".join(str(cell or "") for cell in rows[0]):
                rows = rows[1:]

            for row_number, row in enumerate(rows, start=1):
                if len(row) < 4:
                    malformed_rows.append(f"page {page_index + 1}, row {row_number}: {row!r}")
                    continue

                word = clean_word(row[0])
                definition = clean_definition(row[2])
                example = clean_example(row[3])
                if not word or not WORD_PATTERN.fullmatch(word) or not definition:
                    malformed_rows.append(
                        f"page {page_index + 1}, row {row_number}: word={word!r}, definition={definition!r}"
                    )
                    continue

                item_number = len(words_by_list[list_number]) + 1
                part_of_speech = extract_part_of_speech(definition)
                item: dict[str, object] = {
                    "bookId": "toefl",
                    "chapter": list_number,
                    "chapterName": f"Level {level}",
                    "level": level,
                    "list": list_number,
                    "number": item_number,
                    "word": word,
                    "hint": extract_hint(definition),
                    "sourceHint": definition,
                    "sourceId": f"toefl-{list_number}-{item_number}-{word}",
                }
                if part_of_speech:
                    item["partOfSpeech"] = part_of_speech
                if example and example != "/":
                    item["example"] = example
                words_by_list[list_number].append(item)

    if malformed_rows:
        print("Malformed rows:", file=sys.stderr)
        print("\n".join(malformed_rows[:100]), file=sys.stderr)
        raise ValueError(f"Found {len(malformed_rows)} malformed table rows")
    if sorted(words_by_list) != list(range(1, 49)):
        raise ValueError(f"Expected Lists 1-48, got {sorted(words_by_list)}")

    chapters = []
    for list_number in range(1, 49):
        pages = source_pages[list_number]
        words = words_by_list[list_number]
        chapters.append(
            {
                "id": list_number,
                "name": f"Level {levels[list_number]}",
                "level": levels[list_number],
                "sourcePages": [pages[0], pages[-1]],
                "words": words,
            }
        )

    OUTPUT_PATH.write_text(json.dumps(chapters, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    total = sum(len(chapter["words"]) for chapter in chapters)
    examples = sum(1 for chapter in chapters for word in chapter["words"] if "example" in word)
    pos_missing = [
        word["sourceId"]
        for chapter in chapters
        for word in chapter["words"]
        if "partOfSpeech" not in word
    ]
    print(f"Wrote {OUTPUT_PATH}")
    print(f"Lists: {len(chapters)}; words: {total}; examples: {examples}; rows without POS marker: {len(pos_missing)}")
    for chapter in chapters:
        words = chapter["words"]
        print(
            f"List {chapter['id']:>2} / {chapter['name']}: {len(words):>3} words; "
            f"{words[0]['word']} -> {words[-1]['word']}"
        )
    if pos_missing:
        print("Rows without POS marker (reviewed as phrases):")
        print("\n".join(pos_missing))


if __name__ == "__main__":
    main()
