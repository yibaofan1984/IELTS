import sourceData from './vocabulary.json';

export type BookWord = {
  chapter: number;
  chapterName: string;
  list: number;
  number: number;
  word: string;
  hint: string;
  sourceId?: string;
};

export type BookChapter = { id: number; name: string; words: BookWord[] };

const chapterNames = [
  '自然地理', '植物研究', '动物保护', '太空探索', '学校教育', '科技发明',
  '文化历史', '语言演化', '娱乐运动', '物品材料', '时尚潮流', '饮食健康',
  '建筑场所', '交通旅行', '国家政府', '社会经济', '法律法规', '征战沙场',
  '社会关系', '行为动作', '身心健康', '时间日期',
];

const corrections: Record<string, string> = {
  slothfu: 'slothful',
  temperat: 'temperate',
};

function chineseHint(hint: string) {
  return hint
    .replace(/\[[^\]]*]/g, '')
    .replace(/[A-Za-z][A-Za-z0-9 .,'’~\-]*/g, '')
    .replace(/[~|]/g, '')
    .replace(/\s+/g, '')
    .replace(/[，,、；;]+/g, '；')
    .replace(/[。．]+/g, '。')
    .replace(/^[；。]+|[；。]+$/g, '')
    || '请参阅词书释义';
}

const stream = (sourceData as BookChapter[]).flatMap((chapter) => chapter.words.map((word) => ({
  ...word,
  word: corrections[word.word] ?? word.word,
  hint: chineseHint(word.hint),
  sourceId: String(word.chapter) + '-' + word.list + '-' + word.number + '-' + word.word,
})));

function insertBefore(target: string, word: Omit<BookWord, 'sourceId'>) {
  const index = stream.findIndex((item) => item.word === target);
  if (index < 0) throw new Error('Missing insertion point: ' + target);
  stream.splice(index, 0, { ...word, sourceId: 'book-' + word.word });
}

// These two headwords are printed in the book but were absent from the old imported list.
insertBefore('fashionable', {
  chapter: 11, chapterName: '时尚潮流', list: 28, number: 1, word: 'fashion', hint: '时尚；流行款式',
});
insertBefore('diet', {
  chapter: 12, chapterName: '饮食健康', list: 29, number: 1, word: 'food', hint: '食物；食品',
});

const firstWords = [
  'atmosphere', 'photosynthesis', 'biologist', 'galaxy', 'education', 'technology',
  'ideology', 'pictograph', 'medium', 'stuff', 'fashion', 'food', 'architecture',
  'navigate', 'republic', 'economy', 'law', 'violence', 'pioneer', 'act', 'feel', 'daily',
];

const starts = firstWords.map((word) => {
  const index = stream.findIndex((item) => item.word === word);
  if (index < 0) throw new Error('Missing Chapter start: ' + word);
  return index;
});

export const chapters: BookChapter[] = chapterNames.map((name, index) => {
  const start = starts[index];
  const end = starts[index + 1] ?? stream.length;
  return {
    id: index + 1,
    name,
    words: stream.slice(start, end).map((word, number) => ({
      ...word,
      chapter: index + 1,
      chapterName: name,
      number: number + 1,
    })),
  };
});

const temporaryChapter21Migration = new Map<string, string>([
  ['21-57-1-feel', '20-55-28-feel'],
  ['21-57-2-mood', '20-55-29-mood'],
  ['21-57-3-emotion', '20-55-30-emotion'],
  ['21-57-4-attitude', '20-55-33-attitude'],
  ['21-57-5-character', '20-55-34-character'],
  ['21-57-6-personality', '20-55-35-personality'],
]);

for (const word of (sourceData as BookChapter[]).find((chapter) => chapter.id === 21)?.words ?? []) {
  temporaryChapter21Migration.set(
    '21-57-' + (word.number + 6) + '-' + word.word,
    '21-57-' + word.number + '-' + word.word,
  );
}

export function migrateMistakeId(id: string) {
  return temporaryChapter21Migration.get(id) ?? id;
}
