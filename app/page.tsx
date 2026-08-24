'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import chaptersData from './vocabulary.json';

type Word = { chapter: number; chapterName: string; list: number; number: number; word: string; hint: string };
type Chapter = { id: number; name: string; words: Word[] };
type Result = 'correct' | 'wrong' | null;
type MistakeCounts = Record<string, number>;

const chapters = chaptersData as Chapter[];
const STORAGE_KEY = 'ielts-dictation-mistakes-v2';
const LEGACY_STORAGE_KEY = 'ielts-dictation-mistakes-v1';
const wordId = (word: Word) => `${word.chapter}-${word.list}-${word.number}-${word.word}`;
const normalize = (value: string) => value.trim().toLowerCase().replace(/[’]/g, "'").replace(/\s+/g, ' ');
const repetitionTarget = (errorCount: number) => Math.min(6, Math.max(2, errorCount + 1));

function shuffled<T>(items: T[]) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[target]] = [copy[target], copy[index]];
  }
  return copy;
}

function buildMistakeQueue(words: Word[], counts: MistakeCounts) {
  return words.flatMap((word) => Array.from({ length: repetitionTarget(counts[wordId(word)] ?? 1) }, () => word));
}

export default function Home() {
  const [chapterId, setChapterId] = useState(1);
  const [mode, setMode] = useState<'chapter' | 'mistakes'>('chapter');
  const [queue, setQueue] = useState<Word[]>(chapters[0].words);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<Result>(null);
  const [mistakeCounts, setMistakeCounts] = useState<MistakeCounts>({});
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [ready, setReady] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const chapter = chapters.find((item) => item.id === chapterId) ?? chapters[0];
  const current = queue[index];
  const chapterMistakes = useMemo(() => new Set(Object.keys(mistakeCounts).filter((id) => id.startsWith(`${chapterId}-`))), [chapterId, mistakeCounts]);
  const mistakeWords = useMemo(() => chapter.words.filter((word) => chapterMistakes.has(wordId(word))), [chapter, chapterMistakes]);
  const letterCount = current?.word.match(/[a-z]/gi)?.length ?? 0;
  const expectedCharacters = Array.from(current?.word.toLowerCase() ?? '');
  const typedCharacters = Array.from(answer.toLowerCase());
  const currentErrorCount = current ? mistakeCounts[wordId(current)] ?? 0 : 0;
  const progress = queue.length ? Math.min(((index + (result ? 1 : 0)) / queue.length) * 100, 100) : 0;
  const complete = index >= queue.length && queue.length > 0;

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
      if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
        setMistakeCounts(Object.fromEntries(Object.entries(saved).filter((entry): entry is [string, number] => typeof entry[1] === 'number' && entry[1] > 0)));
      } else {
        const legacy = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY) ?? '[]');
        if (Array.isArray(legacy)) setMistakeCounts(Object.fromEntries(legacy.filter((item): item is string => typeof item === 'string').map((id) => [id, 1])));
      }
    } catch { /* Ignore invalid local data. */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(mistakeCounts));
  }, [mistakeCounts, ready]);

  useEffect(() => {
    if (current && !result) inputRef.current?.focus();
  }, [current, result]);

  const resetRound = (words: Word[], nextMode: 'chapter' | 'mistakes') => {
    setQueue(words); setMode(nextMode); setIndex(0); setAnswer(''); setResult(null);
    setCorrectCount(0); setWrongCount(0);
    window.setTimeout(() => inputRef.current?.focus(), 50);
  };

  const chooseChapter = (id: number) => {
    const selected = chapters.find((item) => item.id === id) ?? chapters[0];
    setChapterId(id); resetRound(selected.words, 'chapter');
  };

  const openMistakes = () => resetRound(buildMistakeQueue(mistakeWords, mistakeCounts), 'mistakes');
  const randomize = () => resetRound(mode === 'mistakes' ? buildMistakeQueue(shuffled(mistakeWords), mistakeCounts) : shuffled(chapter.words), mode);
  const removeMistake = (word: Word) => setMistakeCounts((counts) => {
    const next = { ...counts };
    delete next[wordId(word)];
    return next;
  });
  const clearChapterMistakes = () => {
    if (!chapterMistakes.size || !window.confirm(`确定清空第${chapterId}章的全部错词和错误次数吗？`)) return;
    setMistakeCounts((counts) => Object.fromEntries(Object.entries(counts).filter(([id]) => !id.startsWith(`${chapterId}-`))));
    if (mode === 'mistakes') resetRound([], 'mistakes');
  };

  const speak = () => {
    if (!current || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(current.word);
    utterance.lang = 'en-GB'; utterance.rate = 0.82;
    const voice = window.speechSynthesis.getVoices().find((item) => item.lang.toLowerCase().startsWith('en-gb'));
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  };

  const checkAnswer = (reveal = false) => {
    if (!current || result) return;
    const isCorrect = !reveal && normalize(answer) === normalize(current.word);
    const id = wordId(current);
    if (!reveal) speak();
    setResult(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) {
      setCorrectCount((count) => count + 1);
      const nextIsSameMistake = mode === 'mistakes' && queue[index + 1] && wordId(queue[index + 1]) === id;
      if (mode !== 'mistakes' || !nextIsSameMistake) removeMistake(current);
    } else {
      setWrongCount((count) => count + 1);
      const nextErrorCount = currentErrorCount + 1;
      setMistakeCounts((counts) => ({ ...counts, [id]: (counts[id] ?? 0) + 1 }));
      if (mode === 'mistakes') {
        setQueue((words) => {
          let blockEnd = index + 1;
          while (blockEnd < words.length && wordId(words[blockEnd]) === id) blockEnd += 1;
          const retryBlock = Array.from({ length: repetitionTarget(nextErrorCount) }, () => current);
          return [...words.slice(0, index + 1), ...retryBlock, ...words.slice(blockEnd)];
        });
      }
    }
  };

  const nextWord = () => {
    setIndex((value) => value + 1); setAnswer(''); setResult(null);
    window.setTimeout(() => inputRef.current?.focus(), 30);
  };

  const restart = () => resetRound(mode === 'mistakes' ? buildMistakeQueue(mistakeWords, mistakeCounts) : chapter.words, mode);

  return (
    <main className="min-h-screen bg-[#edf1f6] text-[#141b2d]">
      <div className="mx-auto min-h-screen max-w-[1240px] bg-[#fbfcfe] shadow-[0_0_50px_rgb(50_65_90/8%)]">
        <header className="border-b border-[#e8edf5] px-5 py-4 sm:px-8">
          <div className="mx-auto flex max-w-[1080px] flex-wrap items-center justify-between gap-3">
            <button onClick={() => chooseChapter(chapterId)} className="text-left" aria-label="返回本章练习">
              <p className="text-[10px] font-black tracking-[0.24em] text-[#397cf4]">IELTS DICTATION</p>
              <h1 className="mt-0.5 text-base font-black sm:text-lg">雅思词汇真经 · 默写练习</h1>
            </button>
            <div className="flex flex-wrap items-center justify-end gap-2">
              <select value={chapterId} onChange={(event) => chooseChapter(Number(event.target.value))} className="h-10 rounded-full border border-[#dfe6f1] bg-white px-4 text-sm font-bold shadow-sm outline-none">
                {chapters.map((item) => <option key={item.id} value={item.id}>第{item.id}章 · {item.name}</option>)}
              </select>
              <button onClick={() => resetRound(chapter.words, 'chapter')} className={`toolbar-pill ${mode === 'chapter' ? 'toolbar-pill-active' : ''}`}>▣ 看中文</button>
              <button onClick={speak} className="toolbar-pill">🔊 听音</button>
              <button onClick={randomize} className="toolbar-pill">🎲 随机</button>
              <button onClick={openMistakes} className={`toolbar-pill ${mode === 'mistakes' ? 'toolbar-pill-active' : ''}`}>📕 错词 {chapterMistakes.size}</button>
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-[1080px] px-5 pb-10 pt-5 sm:px-8">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2">
              <button onClick={() => checkAnswer(true)} disabled={!current || Boolean(result)} className="soft-pill disabled:opacity-35">💡 提示</button>
              <button onClick={restart} className="soft-pill">↻ 重新开始</button>
            </div>
            <div className="flex items-center gap-3 rounded-full bg-white px-4 py-2 font-semibold text-[#536077] shadow-sm">
              <span>🎯 本轮进度 {Math.min(index + (result ? 1 : 0), queue.length)}/{queue.length}</span>
              <span className="hidden h-1.5 w-28 overflow-hidden rounded-full bg-[#e5eaf2] sm:block"><span className="block h-full rounded-full bg-[#4484f5]" style={{ width: `${progress}%` }} /></span>
            </div>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-[#e2e7ef]"><div className="h-full rounded-full bg-gradient-to-r from-[#3e82f7] to-[#8b5cf6] transition-[width] duration-500" style={{ width: `${progress}%` }} /></div>

          <div className="mt-4 grid grid-cols-3 divide-x divide-[#edf0f5] rounded-2xl bg-white py-3 text-center shadow-[0_8px_26px_rgb(65_80_110/6%)]">
            <p className="text-sm font-semibold text-[#59667d]">📊 进度 <strong className="text-[#172033]">{Math.min(index + 1, queue.length)}/{queue.length}</strong></p>
            <p className="text-sm font-semibold text-[#59667d]">✅ 正确 <strong className="text-[#24a56a]">{correctCount}</strong></p>
            <p className="text-sm font-semibold text-[#59667d]">❌ 错误 <strong className="text-[#e65369]">{wrongCount}</strong></p>
          </div>

          {queue.length === 0 ? (
            <EmptyMistakes onStart={() => chooseChapter(chapterId)} />
          ) : complete ? (
            <CompleteCard correct={correctCount} total={queue.length} remaining={chapterMistakes.size} onRestart={restart} onMistakes={openMistakes} />
          ) : current ? (
            <article className="mx-auto flex min-h-[410px] max-w-[820px] flex-col items-center justify-center px-2 py-8 text-center sm:py-12">
              <span className="rounded-full bg-white px-5 py-2 text-sm font-bold text-[#3e4b62] shadow-[0_5px_20px_rgb(66_80_110/7%)]">📖 看中文拼写</span>
              <h2 className="mt-7 max-w-3xl text-2xl font-black leading-snug sm:text-3xl lg:text-[2.1rem]">{current.hint}</h2>
              <p className="mt-2 text-xs font-semibold text-[#9aa6ba]">第{chapter.id}章 · {chapter.name} · 原书 List {current.list}</p>

              <div className="mt-8 w-full max-w-[660px]">
                <div className="relative mx-auto flex min-h-14 flex-wrap justify-center gap-x-2 gap-y-3 rounded-xl p-2 focus-within:ring-2 focus-within:ring-[#8bb8ff]/35" aria-label={`${letterCount} 个字母`}>
                  <input ref={inputRef} value={answer} onChange={(event) => !result && setAnswer(event.target.value.toLowerCase())} onKeyDown={(event) => { if (event.key === 'Enter') result ? nextWord() : checkAnswer(); }} readOnly={Boolean(result)} autoFocus autoCapitalize="none" autoComplete="off" spellCheck={false} aria-label="输入英文单词" className="absolute inset-0 z-10 h-full w-full cursor-text opacity-0 read-only:cursor-default" placeholder="输入英文拼写" />
                  {expectedCharacters.map((expectedCharacter, characterIndex) => {
                    const typedCharacter = typedCharacters[characterIndex] ?? '';
                    const isLetter = /[a-z]/i.test(expectedCharacter);
                    if (!isLetter) {
                      const separatorEntered = typedCharacter === expectedCharacter;
                      return <span key={characterIndex} aria-label={expectedCharacter === ' ' ? (separatorEntered ? '已输入空格' : '这里输入空格') : '这里输入连字符'} className={`pointer-events-none flex h-10 min-w-10 items-end justify-center pb-1 text-[10px] font-black ${result === 'correct' ? 'text-[#25a76b]' : result === 'wrong' ? 'text-[#df4f65]' : separatorEntered ? 'text-[#397cf4]' : characterIndex === typedCharacters.length ? 'text-[#397cf4]' : 'text-[#9aa6ba]'}`}>{typedCharacter ? (typedCharacter === ' ' ? '␣ 空格' : typedCharacter) : expectedCharacter === ' ' ? '空格' : '－'}</span>;
                    }
                    return <span key={characterIndex} className={`pointer-events-none flex h-10 w-8 items-end justify-center border-b-[3px] pb-1 text-xl font-black lowercase sm:text-2xl ${result === 'correct' ? 'border-[#64cd9b] text-[#25a76b]' : result === 'wrong' ? 'border-[#f08b99] text-[#df4f65]' : characterIndex === typedCharacters.length ? 'border-[#7eb0ff] text-[#172033]' : 'border-[#ccd5e3] text-[#172033]'}`}>{typedCharacter === ' ' ? '␣' : typedCharacter}</span>;
                  })}
                </div>
                <p className="mx-auto mt-5 max-w-[560px] rounded-full bg-[#eef5ff] px-4 py-2 text-xs font-semibold text-[#52627a]">严格按原拼写输入 · {letterCount} 个字母{current.word.includes(' ') ? ' · 含空格' : ''}{current.word.includes('-') ? ' · 含连字符' : ''}</p>
              </div>

              {result && <div role="status" className={`mt-5 rounded-2xl px-6 py-3 ${result === 'correct' ? 'bg-[#e6f7ee] text-[#238657]' : 'bg-[#ffeaed] text-[#b9394c]'}`}><strong>{result === 'correct' ? '拼写正确！' : `已加入本章错词本 · 累计错 ${currentErrorCount} 次`}</strong>{result === 'wrong' && <span className="ml-2">正确答案：<b>{current.word}</b></span>}{result === 'correct' && mode === 'mistakes' && queue[index + 1] && wordId(queue[index + 1]) === wordId(current) && <span className="ml-2">请继续拼写，完成连续强化</span>}</div>}

              <div className="mt-7 flex flex-wrap justify-center gap-2.5">
                <button onClick={() => checkAnswer(true)} disabled={Boolean(result)} className="action-button disabled:opacity-35">📌 显示答案</button>
                <button onClick={restart} className="action-button">🔄 重新开始</button>
                <button onClick={speak} className="action-button">🔊 再读一次</button>
                <button onClick={result ? nextWord : () => checkAnswer()} disabled={!result && !answer.trim()} className="action-button action-primary disabled:cursor-not-allowed disabled:opacity-40">{result ? '↵ 下一题' : '↵ 提交 / 下一题'}</button>
              </div>
              <p className="mt-3 text-[11px] font-semibold text-[#a4afc0]">💡 按回车判断，再按回车进入下一题</p>
            </article>
          ) : null}

          <div className="mt-3 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
            <section className="rounded-2xl border border-[#ebeff5] bg-white p-4 shadow-[0_7px_24px_rgb(60_75_105/5%)]">
              <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-black">📕 本章错词本（{mistakeWords.length}）</h3><div className="flex items-center gap-3"><button onClick={clearChapterMistakes} disabled={!mistakeWords.length} className="text-xs font-bold text-[#df4f65] disabled:cursor-not-allowed disabled:opacity-35">清空错词表</button><button onClick={openMistakes} disabled={!mistakeWords.length} className="text-xs font-bold text-[#377df2] disabled:cursor-not-allowed disabled:opacity-35">开始复习 →</button></div></div>
              <div className="mt-3 flex min-h-10 flex-wrap gap-2">
                {mistakeWords.length ? mistakeWords.slice(0, 14).map((word) => { const errors = mistakeCounts[wordId(word)] ?? 1; return <span key={wordId(word)} className="inline-flex items-center gap-1.5 rounded-full border border-[#f2b7c0] bg-[#fff5f6] px-3 py-1.5 text-xs"><b>{word.word}</b><span className="text-[#c34d60]">错 {errors} 次 · 连写 {repetitionTarget(errors)} 次</span><button onClick={() => removeMistake(word)} className="text-[#a85c68]" aria-label={`移除 ${word.word}`}>×</button></span>; }) : <p className="text-sm text-[#98a4b7]">暂无错词，继续保持。</p>}
                {mistakeWords.length > 14 && <span className="rounded-full bg-[#f1f4f8] px-3 py-1.5 text-xs font-bold text-[#69758a]">还有 {mistakeWords.length - 14} 个</span>}
              </div>
              {mistakeWords.length > 0 && <p className="mt-3 text-[11px] font-semibold text-[#98a4b7]">错误次数越多，错词复习时需要连续正确拼写的次数越多（最多 6 次）。</p>}
            </section>
            <section className="rounded-2xl border border-[#ebeff5] bg-white p-4 shadow-[0_7px_24px_rgb(60_75_105/5%)]">
              <h3 className="font-black">📚 当前单元</h3>
              <div className="mt-3 flex items-center justify-between rounded-xl bg-[#f5f8fc] px-4 py-3"><span><b>Chapter {chapter.id}</b><small className="ml-2 text-[#7e8ba0]">{chapter.name}</small></span><strong className="text-[#397cf4]">{chapter.words.length} 词</strong></div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

function EmptyMistakes({ onStart }: { onStart: () => void }) {
  return <div className="grid min-h-[410px] place-items-center text-center"><div><p className="text-5xl">✅</p><h2 className="mt-4 text-2xl font-black">本章错词本是空的</h2><p className="mt-2 text-[#7d899d]">答错的词会自动收录到这里。</p><button onClick={onStart} className="action-button action-primary mt-6">开始本章练习</button></div></div>;
}

function CompleteCard({ correct, total, remaining, onRestart, onMistakes }: { correct: number; total: number; remaining: number; onRestart: () => void; onMistakes: () => void }) {
  return <div className="grid min-h-[410px] place-items-center text-center"><div><p className="text-5xl">🎉</p><h2 className="mt-4 text-3xl font-black">本轮完成</h2><p className="mt-2 text-[#718096]">答对 {correct} 个，共练习 {total} 个，本章剩余错词 {remaining} 个。</p><div className="mt-6 flex justify-center gap-3"><button onClick={onRestart} className="action-button">再练一轮</button><button onClick={onMistakes} className="action-button action-primary">练习错词</button></div></div></div>;
}
