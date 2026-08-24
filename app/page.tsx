'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import chaptersData from './vocabulary.json';

type Word = { chapter: number; chapterName: string; list: number; number: number; word: string; hint: string };
type Chapter = { id: number; name: string; words: Word[] };
type Result = 'correct' | 'wrong' | null;

const chapters = chaptersData as Chapter[];
const STORAGE_KEY = 'ielts-dictation-mistakes-v1';
const wordId = (word: Word) => `${word.chapter}-${word.list}-${word.number}-${word.word}`;
const normalize = (value: string) => value.trim().toLowerCase().replace(/[’]/g, "'").replace(/\s+/g, ' ');

export default function Home() {
  const [chapterId, setChapterId] = useState(1);
  const [mode, setMode] = useState<'chapter' | 'mistakes'>('chapter');
  const [queue, setQueue] = useState<Word[]>(chapters[0].words);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<Result>(null);
  const [mistakeIds, setMistakeIds] = useState<string[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [ready, setReady] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const chapter = chapters.find((item) => item.id === chapterId) ?? chapters[0];
  const current = queue[index];
  const chapterMistakes = useMemo(() => new Set(mistakeIds.filter((id) => id.startsWith(`${chapterId}-`))), [chapterId, mistakeIds]);
  const letterCount = current?.word.match(/[a-z]/gi)?.length ?? 0;
  const progress = queue.length ? Math.min(((index + (result ? 1 : 0)) / queue.length) * 100, 100) : 0;

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      if (Array.isArray(saved)) setMistakeIds(saved.filter((item): item is string => typeof item === 'string'));
    } catch { /* Ignore invalid local data. */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(mistakeIds));
  }, [mistakeIds, ready]);

  const resetRound = (words: Word[], nextMode: 'chapter' | 'mistakes') => {
    setQueue(words); setMode(nextMode); setIndex(0); setAnswer(''); setResult(null); setCorrectCount(0);
    window.setTimeout(() => inputRef.current?.focus(), 50);
  };

  const chooseChapter = (id: number) => {
    const selected = chapters.find((item) => item.id === id) ?? chapters[0];
    setChapterId(id); resetRound(selected.words, 'chapter');
  };

  const openMistakes = () => resetRound(chapter.words.filter((word) => chapterMistakes.has(wordId(word))), 'mistakes');

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
    setResult(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) {
      setCorrectCount((count) => count + 1);
      if (mode === 'mistakes') setMistakeIds((ids) => ids.filter((id) => id !== wordId(current)));
    } else {
      setMistakeIds((ids) => ids.includes(wordId(current)) ? ids : [...ids, wordId(current)]);
    }
  };

  const nextWord = () => {
    setIndex((value) => value + 1); setAnswer(''); setResult(null);
    window.setTimeout(() => inputRef.current?.focus(), 30);
  };

  const restart = () => {
    const words = mode === 'mistakes' ? chapter.words.filter((word) => mistakeIds.includes(wordId(word))) : chapter.words;
    resetRound(words, mode);
  };

  const complete = index >= queue.length && queue.length > 0;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f3ea] text-[#173c35]">
      <div className="pointer-events-none fixed inset-0 opacity-35 [background-image:radial-gradient(#173c35_0.7px,transparent_0.7px)] [background-size:22px_22px]" />
      <header className="relative mx-auto flex max-w-[1380px] items-center justify-between gap-4 px-5 py-5 sm:px-8 sm:py-7">
        <button onClick={() => chooseChapter(chapterId)} className="text-left" aria-label="返回本章练习">
          <p className="text-[10px] font-black tracking-[0.28em] text-[#d96540] sm:text-xs">IELTS DICTATION</p>
          <h1 className="mt-1 text-lg font-black tracking-tight sm:text-xl">雅思词汇真经 · 默写练习</h1>
        </button>
        <button onClick={openMistakes} className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition ${mode === 'mistakes' ? 'border-[#d96540] bg-[#d96540] text-white' : 'border-[#173c35]/15 bg-white/80 hover:border-[#d96540]/50'}`}>
          <span aria-hidden="true">✦</span><span>本章错词</span><span className={`rounded-full px-2 py-0.5 text-xs ${mode === 'mistakes' ? 'bg-white/20' : 'bg-[#f3dfd2] text-[#b64e2f]'}`}>{chapterMistakes.size}</span>
        </button>
      </header>

      <div className="relative mx-auto grid max-w-[1380px] gap-5 px-5 pb-8 sm:px-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-8">
        <aside className="hidden max-h-[calc(100vh-126px)] flex-col overflow-hidden rounded-[28px] bg-[#173c35] text-white shadow-2xl shadow-[#173c35]/15 lg:flex">
          <div className="border-b border-white/10 p-6">
            <p className="text-[10px] font-black tracking-[0.22em] text-[#9dcbb8]">按 CHAPTER 选择</p>
            <p className="mt-2 text-sm text-white/55">共 {chapters.length} 章 · {chapters.reduce((sum, item) => sum + item.words.length, 0)} 个有效词条</p>
          </div>
          <nav className="chapter-scroll flex-1 overflow-y-auto p-3" aria-label="章节列表">
            {chapters.map((item) => {
              const count = mistakeIds.filter((id) => id.startsWith(`${item.id}-`)).length;
              const active = item.id === chapterId;
              return (
                <button key={item.id} onClick={() => chooseChapter(item.id)} className={`group mb-1 flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${active ? 'bg-white text-[#173c35]' : 'text-white/72 hover:bg-white/8 hover:text-white'}`}>
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xs font-black ${active ? 'bg-[#f2a36f] text-[#173c35]' : 'bg-white/9 text-white/55'}`}>{String(item.id).padStart(2, '0')}</span>
                  <span className="min-w-0 flex-1"><strong className="block truncate text-sm">{item.name}</strong><small className={`text-[11px] ${active ? 'text-[#173c35]/48' : 'text-white/38'}`}>{item.words.length} 词</small></span>
                  {count > 0 && <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${active ? 'bg-[#f8e5da] text-[#b64e2f]' : 'bg-[#d96540]/20 text-[#f6ab8f]'}`}>{count}</span>}
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="min-w-0">
          <div className="mb-4 flex items-center gap-3 rounded-2xl bg-[#173c35] p-3 text-white lg:hidden">
            <span className="text-xs font-bold text-white/55">选择章节</span>
            <select value={chapterId} onChange={(event) => chooseChapter(Number(event.target.value))} className="min-w-0 flex-1 rounded-xl bg-white/10 px-3 py-2 text-sm font-bold outline-none">
              {chapters.map((item) => <option key={item.id} value={item.id} className="text-[#173c35]">Chapter {item.id} · {item.name}（{item.words.length}词）</option>)}
            </select>
          </div>

          <div className="mb-5 flex flex-wrap items-end justify-between gap-3 px-1">
            <div><p className="text-[10px] font-black tracking-[0.22em] text-[#d96540]">{mode === 'mistakes' ? 'MISTAKE REVIEW' : `CHAPTER ${chapter.id}`}</p><h2 className="mt-1 text-2xl font-black sm:text-3xl">{mode === 'mistakes' ? `${chapter.name} · 错词本` : chapter.name}</h2></div>
            <p className="text-sm font-semibold text-[#173c35]/48">{queue.length ? `${Math.min(index + 1, queue.length)} / ${queue.length}` : '暂无题目'}</p>
          </div>
          <div className="mb-5 h-2 overflow-hidden rounded-full bg-[#173c35]/8"><div className="h-full rounded-full bg-[#e2744d] transition-[width] duration-500" style={{ width: `${progress}%` }} /></div>

          {queue.length === 0 ? (
            <div className="grid min-h-[590px] place-items-center rounded-[34px] border border-[#173c35]/8 bg-white/90 p-8 text-center shadow-2xl shadow-[#173c35]/8"><div><div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#eef4ef] text-3xl">✓</div><h3 className="mt-6 text-2xl font-black">本章错词本是空的</h3><p className="mt-2 text-[#173c35]/55">先完成一轮默写，答错的词会自动出现在这里。</p><button onClick={() => chooseChapter(chapterId)} className="mt-7 rounded-full bg-[#173c35] px-6 py-3 font-bold text-white">开始本章练习</button></div></div>
          ) : complete ? (
            <div className="grid min-h-[590px] place-items-center rounded-[34px] border border-[#173c35]/8 bg-white/90 p-8 text-center shadow-2xl shadow-[#173c35]/8"><div className="max-w-md"><p className="text-5xl">✦</p><h3 className="mt-5 text-3xl font-black">本轮完成</h3><p className="mt-3 text-[#173c35]/58">答对 {correctCount} 个，共练习 {queue.length} 个。{mode === 'mistakes' ? ` 本章还剩 ${chapterMistakes.size} 个错词。` : ''}</p><div className="mt-8 flex flex-wrap justify-center gap-3"><button onClick={restart} className="rounded-full bg-[#173c35] px-6 py-3 font-bold text-white">再练一轮</button><button onClick={openMistakes} className="rounded-full border border-[#173c35]/15 bg-[#f7f3ea] px-6 py-3 font-bold">练习错词本</button></div></div></div>
          ) : current ? (
            <article className={`relative flex min-h-[590px] flex-col overflow-hidden rounded-[34px] border bg-white/95 p-6 shadow-2xl transition sm:p-10 lg:p-12 ${result === 'correct' ? 'border-[#4e9a76]/35' : result === 'wrong' ? 'border-[#d96540]/35' : 'border-[#173c35]/8'} shadow-[#173c35]/8`}>
              <div className="flex items-center justify-between gap-4"><span className="rounded-full bg-[#eef4ef] px-4 py-2 text-xs font-black tracking-wide">中文提示</span><div className="flex items-center gap-2"><span className="hidden text-xs text-[#173c35]/40 sm:inline">听发音</span><button onClick={speak} className="grid h-12 w-12 place-items-center rounded-full bg-[#f7f3ea] text-xl transition hover:scale-105 hover:bg-[#f3e7d7]" aria-label="播放英文发音">♬</button></div></div>
              <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
                <p className="max-w-3xl text-2xl font-black leading-snug sm:text-3xl lg:text-[2.15rem]">{current.hint}</p>
                <p className="mt-3 text-xs font-semibold text-[#173c35]/35">来自原书 List {current.list} · 第 {current.number} 词</p>
                <div className="relative mt-10 w-full max-w-2xl">
                  <input ref={inputRef} value={answer} onChange={(event) => !result && setAnswer(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') result ? nextWord() : checkAnswer(); }} disabled={Boolean(result)} autoCapitalize="none" autoComplete="off" spellCheck={false} aria-label="输入英文单词" className={`w-full bg-transparent px-3 text-center text-2xl font-black tracking-[0.12em] outline-none sm:text-3xl ${result === 'correct' ? 'text-[#3f8a68]' : result === 'wrong' ? 'text-[#bd4d2e]' : 'text-[#173c35]'}`} placeholder="在这里输入英文" />
                  <div className="mx-auto mt-5 flex max-w-2xl flex-wrap justify-center gap-x-1.5 gap-y-3" aria-label={`${letterCount} 个字母`}>{Array.from({ length: letterCount }).map((_, lineIndex) => <span key={lineIndex} className={`h-0.5 w-4 rounded-full sm:w-5 ${result === 'correct' ? 'bg-[#4e9a76]' : result === 'wrong' ? 'bg-[#d96540]' : 'bg-[#173c35]/25'}`} />)}</div>
                  <p className="mt-3 text-[11px] font-semibold text-[#173c35]/32">{letterCount} 个字母{current.word.includes(' ') ? ' · 含空格' : ''}{current.word.includes('-') ? ' · 含连字符' : ''}</p>
                </div>
                {result && <div role="status" className={`mt-7 rounded-2xl px-6 py-4 ${result === 'correct' ? 'bg-[#e8f3ed] text-[#347154]' : 'bg-[#fae8df] text-[#a73f24]'}`}><p className="font-black">{result === 'correct' ? '拼写正确，很棒！' : '已加入本章错词本'}</p>{result === 'wrong' && <p className="mt-1 text-lg font-black tracking-wide">正确答案：{current.word}</p>}</div>}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#173c35]/8 pt-5"><button onClick={() => checkAnswer(true)} disabled={Boolean(result)} className="px-2 py-2 text-sm font-bold text-[#173c35]/45 transition hover:text-[#d96540] disabled:invisible">显示答案</button><button onClick={result ? nextWord : () => checkAnswer()} disabled={!result && !answer.trim()} className="rounded-full bg-[#e16f48] px-7 py-3.5 font-black text-white shadow-lg shadow-[#e16f48]/25 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-35">{result ? '下一个 →' : '检查答案 →'}</button></div>
            </article>
          ) : null}
        </section>
      </div>
    </main>
  );
}
