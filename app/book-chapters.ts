import sourceData from './vocabulary.json';
import partOfSpeechData from './word-parts-of-speech.json';

export type BookWord = {
  bookId?: 'ielts' | 'toefl';
  chapter: number;
  chapterName: string;
  level?: number;
  list: number;
  number: number;
  word: string;
  hint: string;
  partOfSpeech?: string;
  sourceHint?: string;
  sourceId?: string;
  example?: string;
  exampleTranslation?: string;
};

export type BookChapter = { id: number; name: string; level?: number; sourcePages?: number[]; words: BookWord[] };

const chapterNames = [
  '自然地理', '植物研究', '动物保护', '太空探索', '学校教育', '科技发明',
  '文化历史', '语言演化', '娱乐运动', '物品材料', '时尚潮流', '饮食健康',
  '建筑场所', '交通旅行', '国家政府', '社会经济', '法律法规', '征战沙场',
  '社会关系', '行为动作', '身心健康', '时间日期',
];

const corrections: Record<string, string> = {
  slothfu: 'slothful',
  temperat: 'temperate',
  escalato: 'escalator',
  epartment: 'department',
  instituted: 'institute',
  federationn: 'federation',
  cation: 'clarification',
  comdemn: 'condemn',
  fasle: 'false',
  'debate about/on/upon sth': 'debate',
};

const sourceHintCorrections: Record<string, string> = {
  story: '故事；叙述；to cut a long story short 长话短说；简而言之',
  recruit: '招募；招聘；征募；n. 新成员；新兵',
  knot: '结；绳结；打结；cut the Gordian knot 快刀斩乱麻',
  kettle: '水壶；[美]锅；a different kettle of fish 截然不同的人；另一码事',
  grain: '谷物；颗粒；a grain of 一点，些微；一粒',
  squeeze: '挤压；squeeze sth. out of/from sth. 从某物中榨出（或挤出）某物',
  snatch: '一把抓住；迅速夺取',
  trail: '（使）拖在后面；跟踪；踪迹',
  obsess: '（使）痴迷；（使）心神不宁；be obsessed by/with 被……迷住；对……着迷',
};

const sourceHintCorrectionsBySourceId: Record<string, string> = {
  '5-14-14-dividend': '被除数',
  '5-15-39-curriculum': '课程；（学校等的）全部课程',
  '5-16-52-understand': '懂得；理解',
};

const displayHintCorrections: Record<string, string> = {
  story: '故事；叙述',
  recruit: '招募；招聘；征募；新成员；新兵',
  knot: '结；绳结；打结',
  kettle: '水壶；锅',
  grain: '谷物；颗粒',
  squeeze: '挤压',
  snatch: '一把抓住；迅速夺取',
  trail: '（使）拖在后面；跟踪；踪迹',
  obsess: '（使）痴迷；（使）心神不宁',
};

const displayHintCorrectionsBySourceId: Record<string, string> = {
  '5-14-14-dividend': '被除数',
  '5-15-39-curriculum': '课程；（学校等的）全部课程',
  '5-16-52-understand': '懂得；理解',
  '20-52-18-reel': '眩晕；混乱；卷轴',
  '20-53-47-range': '（在一定范围内）变化；变动',
  '20-54-32-saturate': '使饱和；浸透；使充满',
};

const partOfSpeechCorrectionsBySourceId: Record<string, string> = {
  '20-53-47-range': 'v.',
};

const partOfSpeechByWord = partOfSpeechData as Record<string, string>;

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

const stream = (sourceData as BookChapter[]).flatMap((chapter) => chapter.words.map((word) => {
  const correctedWord = corrections[word.word] ?? word.word;
  const sourceId = String(word.chapter) + '-' + word.list + '-' + word.number + '-' + word.word;
  const sourceHint = sourceHintCorrectionsBySourceId[sourceId] ?? sourceHintCorrections[correctedWord] ?? word.hint;
  return {
    ...word,
    bookId: 'ielts' as const,
    word: correctedWord,
    partOfSpeech: partOfSpeechCorrectionsBySourceId[sourceId] ?? partOfSpeechByWord[correctedWord.toLowerCase()] ?? '词组',
    sourceHint,
    hint: displayHintCorrectionsBySourceId[sourceId] ?? displayHintCorrections[correctedWord] ?? chineseHint(sourceHint),
    sourceId,
  };
}));

function insertBefore(target: string, word: Omit<BookWord, 'sourceId'>) {
  const index = stream.findIndex((item) => item.word === target);
  if (index < 0) throw new Error('Missing insertion point: ' + target);
  stream.splice(index, 0, { ...word, bookId: 'ielts', partOfSpeech: word.partOfSpeech ?? partOfSpeechByWord[word.word.toLowerCase()] ?? '词组', sourceHint: word.sourceHint ?? word.hint, sourceId: 'book-' + word.word });
}

// These two headwords are printed in the book but were absent from the old imported list.
insertBefore('fashionable', {
  chapter: 11, chapterName: '时尚潮流', list: 28, number: 1, word: 'fashion', hint: '时尚；流行款式', partOfSpeech: partOfSpeechByWord.fashion,
});
insertBefore('diet', {
  chapter: 12, chapterName: '饮食健康', list: 29, number: 1, word: 'food', hint: '食物；食品', partOfSpeech: partOfSpeechByWord.food,
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

// Reuse the book's cleaned Chinese definitions when explaining related words.
// A later occurrence wins when a headword appears more than once in the book.
export const chineseMeaningByWord: Record<string, string> = Object.fromEntries(
  chapters.flatMap((chapter) => chapter.words).map((word) => [word.word.toLowerCase(), word.hint]),
);

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
