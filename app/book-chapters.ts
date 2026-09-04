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
  '5-11-53-all-round': '全面的；多才多艺的',
  '5-14-14-dividend': '被除数',
  '5-15-39-curriculum': '课程；（学校等的）全部课程',
  '5-16-52-understand': '懂得；理解',
  '5-16-57-deduce': '演绎；推论',
  '5-17-1-contrast': '对比；明显的差异',
  '5-17-27-achieve': '实现；达到；取得（成功或成就）',
  '5-17-37-grant': '授予；准予；承认',
  '6-18-29-apply': '应用；适用',
  '6-18-40-count': '数数；计数；清点（数量）',
  '6-18-52-attach': '附上；连接；使依附；attach importance to 重视',
  '6-18-53-belong': '属于；应在（某处）；适合；belong to 属于',
  '6-19-18-vision': '视觉；视力；visual adj. 视觉的；视力的；visible adj. 看得见的',
  '6-19-23-gear': '齿轮；传动装置；使适合；in high gear 以高速挡；高速地',
  '6-19-32-simplify': '简化；精简；simplicity n. 简单；质朴；simple adj. 简单的；simply adv. 简单地；仅仅',
  '6-19-34-filter': '过滤；（光或声音）透过；过滤器；filter through 消息等慢慢传开；走漏',
  '7-20-17-local': '当地的；本地的；当地人；localise v. 使局部化；localize v. 使局部化',
  '9-23-30-role': '角色；作用；职能',
  '9-23-49-lyric': '歌词；抒情诗；抒情的；lyrics n. 歌词',
  '9-24-50-jump': '跳跃；跳过；暴涨；from the jump 从一开始',
  '9-25-4-pace': '步速；节奏；步伐；踱步；set the pace 确立标准；领先',
  '9-25-8-cruise': '乘船游览；以平稳的速度行驶；cruiser n. 巡洋舰',
  '9-25-10-vocation': '职业；使命感；vacation n. 休假；假期',
  '11-28-34-cosplay': '角色扮演；装扮成角色；costume play 角色扮演',
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
  '5-11-53-all-round': '全面的；多才多艺的',
  '5-14-14-dividend': '被除数',
  '5-15-39-curriculum': '课程；（学校等的）全部课程',
  '5-16-52-understand': '懂得；理解',
  '5-16-57-deduce': '演绎；推论',
  '5-17-1-contrast': '对比；明显的差异',
  '5-17-27-achieve': '实现；达到；取得（成功或成就）',
  '5-17-37-grant': '授予；准予；承认',
  '6-18-29-apply': '应用；适用',
  '6-18-40-count': '数数；计数；清点（数量）',
  '6-18-52-attach': '附上；连接；使依附',
  '6-18-53-belong': '属于；应在（某处）；适合',
  '6-19-18-vision': '视觉；视力',
  '6-19-23-gear': '齿轮；传动装置；使适合',
  '6-19-32-simplify': '简化；精简',
  '6-19-34-filter': '过滤；（光或声音）透过；过滤器',
  '7-20-17-local': '当地的；本地的；当地人',
  '9-23-30-role': '角色；作用；职能',
  '9-23-49-lyric': '歌词；抒情诗；抒情的',
  '9-24-50-jump': '跳跃；跳过；暴涨',
  '9-25-4-pace': '步速；节奏；步伐；踱步',
  '9-25-8-cruise': '乘船游览；以平稳的速度行驶',
  '9-25-10-vocation': '职业；使命感',
  '11-28-34-cosplay': '角色扮演；装扮成角色',
  '20-52-18-reel': '眩晕；混乱；卷轴',
  '20-53-47-range': '（在一定范围内）变化；变动',
  '20-54-32-saturate': '使饱和；浸透；使充满',
};

const partOfSpeechCorrectionsBySourceId: Record<string, string> = {
  '6-19-32-simplify': 'v.',
  '11-28-34-cosplay': 'n. / v.',
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

// Chapter 15 was originally imported from every English token in the PDF,
// including derivations and memory notes. Keep only the printed headwords,
// in the order shown on book pages 184-195.
const chapter15PrimaryWordOrder = [
  'republic', 'Marxism', 'socialism', 'communism', 'regime', 'government', 'authority', 'political', 'hierarchy', 'democracy', 'bureaucracy', 'egalitarian', 'materialism', 'revolution',
  'reform', 'process', 'conservative', 'meltdown', 'municipal', 'neutral', 'bilateral', 'arena', 'flag', 'banner',
  'president', 'premier', 'minister', 'secretary', 'parliament', 'senate', 'conference', 'meeting', 'headquarters', 'delegation', 'behalf', 'police', 'statesman',
  'mayor', 'service', 'office', 'bureau', 'department', 'harness', 'administration', 'dominate', 'power', 'influence', 'affect', 'importance', 'significance', 'organisation', 'association',
  'union', 'community', 'consortium', 'league', 'institution', 'unite', 'unique', 'nation', 'global', 'worldwide', 'federal', 'foreign', 'overseas',
  'abroad', 'civil', 'emigrate', 'immigrate', 'reign', 'puppet', 'throne', 'crown', 'wreath', 'colony', 'liberty', 'independence',
  'slum', 'refuge', 'asylum', 'population', 'demographic', 'citizen', 'resident', 'ethnic', 'racial', 'clan', 'franchise', 'entitle', 'preference', 'vote',
  'elect', 'respondent', 'poll', 'ambition', 'nominate', 'checklist', 'succession', 'safety', 'welfare', 'well-being',
  'harmony', 'steady', 'flourish', 'succeed', 'prospect', 'perspective', 'viewpoint', 'standpoint', 'outlook', 'guideline', 'ethic', 'suggest', 'advise', 'proposal',
  'hint', 'declare', 'affirm', 'claim', 'proclaim', 'state', 'announce', 'clarify', 'assist', 'aid', 'encourage', 'implement', 'monitor',
  'admit', 'African', 'European', 'Latin', 'Jewish', 'Arabian', 'Portuguese', 'Roman', 'Russian', 'Spanish', 'Swiss', 'Greek', 'Italian', 'soviet', 'Indian', 'Australia', 'New Zealand', 'Canada',
  'Britain', 'France', 'Germany',
];

const chapter15SupplementalWords: Record<string, BookWord> = Object.fromEntries([
  ['flag', 38, '旗帜；国旗', 'n.'],
  ['meeting', 38, '会议；会面', 'n.'],
  ['police', 38, '警察；警方', 'n.'],
  ['office', 38, '办公室；要职；官职', 'n.'],
  ['nation', 39, '国家；民族；国民', 'n.'],
  ['global', 39, '全球的；全世界的', 'adj.'],
  ['foreign', 39, '外国的；外来的；外交的', 'adj.'],
  ['citizen', 39, '公民；市民', 'n.'],
  ['safety', 40, '安全；安全场所', 'n.'],
  ['Canada', 41, '加拿大', 'n.'],
].map(([word, list, hint, partOfSpeech]) => [word, {
  bookId: 'ielts' as const,
  chapter: 15,
  chapterName: '国家政府',
  list: Number(list),
  number: 0,
  word: String(word),
  hint: String(hint),
  sourceHint: String(hint),
  sourceId: 'book-15-' + String(word).toLowerCase().replace(/\s+/g, '-'),
  partOfSpeech: String(partOfSpeech),
}])) as Record<string, BookWord>;

function correctedChapter15Words(words: BookWord[]) {
  return chapter15PrimaryWordOrder.map((headword) => {
    const sourceId = headword === 'claim' ? '15-40-35-claim' : undefined;
    const word = chapter15SupplementalWords[headword]
      ?? words.find((candidate) => sourceId ? candidate.sourceId === sourceId : candidate.word === headword);
    if (!word) throw new Error('Missing Chapter 15 headword: ' + headword);
    return word;
  });
}

const starts = firstWords.map((word) => {
  const index = stream.findIndex((item) => item.word === word);
  if (index < 0) throw new Error('Missing Chapter start: ' + word);
  return index;
});

export const chapters: BookChapter[] = chapterNames.map((name, index) => {
  const start = starts[index];
  const end = starts[index + 1] ?? stream.length;
  const sourceWords = stream.slice(start, end);
  const chapterWords = index === 14 ? correctedChapter15Words(sourceWords) : sourceWords;
  return {
    id: index + 1,
    name,
    words: chapterWords.map((word, number) => ({
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
