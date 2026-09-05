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
  crisis: '危机；危急关头；overcome a crisis 克服危机；ease a crisis 缓和危机',
  security: '安全；保障；证券；Security Council 联合国安全理事会',
  decline: '下降；减少；衰退；拒绝；a decline in moral standards 道德水准下降',
  increment: '增加；增量；增加额；annual increment 年增长量',
  acquisition: '获得；取得；收购；购置物；习得；the acquisition of a fortune 获得一笔财富',
  absent: '缺席的；不在场的；缺少的；心不在焉的；be absent from 缺席；不在（某处）',
  cheque: '支票；用支票支付；check（美式拼写）',
  coin: '硬币；铸造（硬币）；创造（新词或说法）；coin a term 创造术语',
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
  crisis: '危机；危急关头',
  security: '安全；保障；证券',
  decline: '下降；减少；衰退；拒绝',
  increment: '增加；增量；增加额',
  acquisition: '获得；取得；收购；购置物；习得',
  absent: '缺席的；不在场的；缺少的；心不在焉的',
  cheque: '支票；用支票支付',
  coin: '硬币；铸造；创造（新词或说法）',
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

// The old import mixed printed headwords with derivations, example phrases and
// memory notes. These chapter-specific exclusions were checked against the
// headword footers in the printed book.
const excludedHeadwordsByChapter: Record<number, Set<string>> = Object.fromEntries(
  Object.entries({
    1: ['equal'],
    2: ['undermine', 'extinction', 'pattern', 'outcome', 'impact', 'seasonal', 'experimental', 'favourable', 'productive', 'efficient', 'effective', 'considerable', 'massive', 'immense', 'maximal', 'minimal', 'optimal'],
    3: ['instinct', 'intuition', 'captivate', 'defend', 'existence', 'tame nature', 'sheepdog', 'hybridize'],
    5: ['academic', 'intelligible', 'intellectual', 'appreciate', 'feedback', 'underestimate', 'overestimate', 'apply', 'fellowship', 'scholarship', 'reward', 'award', 'prize'],
    6: ['pinpoint', 'accurate', 'precise', 'correct', 'error', 'flaw', 'fault', 'stumble', 'contingency', 'circumstance', 'culture', 'civilisation', 'renaissance', 'epic'],
    7: ['language', 'symbol', 'assign', 'gesture', 'handwriting'],
    8: ['diction', 'communicate', 'discussion', 'brainstorm', 'debate', 'debatable', 'commentary', 'comment', 'negotiate', 'negotiation', 'contention', 'content'],
    9: ['publication', 'participate', 'expectation', 'entertainment', 'simulative', 'dramatic', 'concertmaster', 'artistic', 'craft', 'rhythmical', 'compete', 'sponsorship', 'athletics', 'fame', 'cyclist', 'bicycle', 'plunge whole-heartedly', 'footstep', 'jogger', 'limb', 'pull', 'drag', 'bend', 'bend over backwards to do sth', 'bow', 'take a bow', 'photographic', 'programmer', 'musicale', 'vocation'],
    10: ['artificial', 'raw material', 'necessary', 'pipeline', 'booklet', 'leaflet', 'brochure', 'opaque', 'cementer', 'stationer', 'refrigeration'],
    11: ['fashionable', 'stylish', 'tend', 'prevalence', 'prevailing', 'luxurious', 'cosplay', 'indecent', 'graceful', 'elegant', 'perfection', 'clothing', 'unbutton', 'woollen', 'patchwork', 'whitewash', 'stainless', 'curvy', 'hourglass', 'slightly', 'slim', 'thready', 'stringy'],
    12: ['dietary', 'treatment', 'drinkable', 'chief', 'spoonful', 'alcoholic beverage', 'alcoholic', 'cigar', 'strawberry', 'blueberry', 'lemonade', 'popcorn', 'beefy', 'an odd fish', 'diary', 'boiling', 'creamy', 'salty', 'sweeten', 'acidic', 'hungry', 'soy sauce', 'digestion', 'cooker', 'baker', 'bakery', 'toaster', 'slice', 'dice', 'shred', 'chop', 'deep-fry', 'steam', 'shell', 'beat', 'toss', 'mash'],
    13: ['architect', 'erect', 'structural', 'constructive', 'obstacle', 'established', 'founder', 'concretely', 'residential', 'immigrate', 'settlement', 'lift', 'columnist', 'laser', 'vaulted', 'arched', 'lobbyist', 'radiate', 'bathe', 'reservoir', 'urbanise', 'urbanisation', 'periphery', 'expansion', 'brick', 'maltreat', 'maintenance', 'modification', 'span of life', 'installation', 'furniture', 'emigrate', 'assembly'],
    14: ['navigation', 'attractive', 'commemorate', 'monumental', 'pharaoh', 'traffic regulations', 'a traffic jam', 'traffic congestion', 'aeroplane', 'freighter', 'convention', 'pavement', 'recycle', 'cyclist', 'stewardess', 'hazardous', 'bow', 'overdue', 'post', 'pack', 'unload', 'transition', 'vehicles', 'appear'],
    16: ['economics', 'industrialise', 'commercialise', 'affordable', 'retailing', 'dutiable', 'depress', 'declination', 'gradual', 'redundancy', 'accompany', 'entrepreneur', 'investor', 'productive', 'rely', 'stockbroker', 'possessive', 'accountable', 'improvement'],
    17: ['anonymous', 'falsehood', 'genuine', 'routine', 'consequence', 'demand', 'request', 'require', 'petition', 'command', 'instruct', 'false', 'procedure'],
    18: ['explode', 'occasionally', 'spy', 'scout', 'general', 'soldier', 'veteran'],
    19: ['relate'],
    20: ['activity', 'behaviour', 'reaction', 'response', 'complain', 'ironic', 'prejudice', 'terrifying', 'accordance', 'substitute', 'distinguish', 'differentiate', 'incline', 'lean', 'sideways'],
    21: ['organic', 'immunise', 'snore', 'pregnant', 'infect', 'fluent', 'traumatic', 'immortal', 'prescribe', 'serious', 'stem', 'confident', 'sympathy', 'temperateness', 'neutral', 'explicit', 'irritant', 'anxious', 'reluctance', 'confusion', 'impulse', 'rigid', 'stubborn', 'stereotype'],
    22: ['latter', 'precedes', 'punctual', 'duration', 'consecutive', 'periodically', 'period', 'imminent', 'incidentally'],
  }).map(([chapter, words]) => [Number(chapter), new Set(words)]),
) as Record<number, Set<string>>;

type SupplementalHeadword = {
  word: string;
  hint: string;
  before?: string;
  sourceId?: string;
};

function supplemental(word: string, hint: string, before?: string, sourceId?: string): SupplementalHeadword {
  return { word, hint, before, sourceId };
}

const supplementalHeadwordsByChapter: Record<number, SupplementalHeadword[]> = {
  1: [
    supplemental('gasoline', '汽油', 'petrol'),
  ],
  3: [
    supplemental('hybridise', '杂交；使杂交', 'breed'),
    supplemental('protein', '蛋白质', 'intuitive'),
    supplemental('instinctive', '本能的；直觉的', 'intuitive'),
  ],
  4: [
    supplemental('signal', '信号；发信号', 'refraction'),
    supplemental('desperate', '绝望的；不顾一切的', 'hopeless'),
  ],
  5: [
    supplemental('problem', '问题；难题', 'issue'),
    supplemental('motive', '动机；目的', 'motivate'),
    supplemental('clever', '聪明的；灵巧的', 'all-round'),
    supplemental('smart', '聪明的；时髦的', 'all-round'),
    supplemental('scientist', '科学家', 'mentor'),
    supplemental('doctor', '博士；医生', 'fresher'),
  ],
  7: [
    supplemental('culture', '文化；文明', 'ideology', '7-20-1-culture'),
    supplemental('civilisation', '文明；文明社会', 'ideology', '7-20-2-civilisation'),
    supplemental('renaissance', '文艺复兴；复兴', 'ideology', '7-20-3-renaissance'),
    supplemental('epic', '史诗；史诗般的', 'ideology', '7-20-4-epic'),
    supplemental('homesick', '思乡的；想家的', 'celebrity'),
  ],
  8: [
    supplemental('language', '语言', 'pictograph', '8-21-19-language'),
    supplemental('symbol', '符号；象征', 'pictograph', '8-21-20-symbol'),
    supplemental('sign', '标志；迹象；签名', 'pictograph'),
    supplemental('gesture', '手势；姿态', 'pictograph', '8-21-22-gesture'),
    supplemental('handwriting', '笔迹；书法', 'pictograph', '8-21-23-handwriting'),
    supplemental('dictionary', '词典；字典', 'idiom'),
  ],
  9: [
    supplemental('festival', '节日；庆典', 'feast'),
    supplemental('magic', '魔术；魔力；神奇的', 'drama'),
    supplemental('film', '电影；胶片；拍摄', 'X-rated'),
    supplemental('movie', '电影', 'X-rated'),
    supplemental('artist', '艺术家', 'X-rated'),
    supplemental('painter', '画家；油漆工', 'role'),
    supplemental('classical', '古典的；经典的', 'lyric'),
    supplemental('jazz', '爵士乐', 'lyric'),
    supplemental('rock', '摇滚乐；岩石', 'lyric'),
    supplemental('hip-hop', '嘻哈音乐；嘻哈文化', 'lyric'),
    supplemental('pop', '流行音乐；流行的', 'lyric'),
    supplemental('band', '乐队；带；箍', 'rhythm'),
    supplemental('melody', '旋律；曲调', 'rhythm'),
    supplemental('piano', '钢琴', 'violin'),
    supplemental('guitar', '吉他', 'harmonica'),
    supplemental('drum', '鼓；击鼓', 'flute'),
    supplemental('Olympic', '奥林匹克运动会的', 'sponsor'),
    supplemental('cricket', '板球；蟋蟀', 'kick'),
    supplemental('goal', '目标；球门；进球', 'kick'),
    supplemental('bat', '球棒；蝙蝠', 'kick'),
    supplemental('racket', '球拍；喧闹声', 'kick'),
    supplemental('vacation', '假期；休假', 'hike'),
    supplemental('climb', '攀登；爬升'),
  ],
  10: [
    supplemental('umbrella', '雨伞', 'raincoat'),
    supplemental('fuel', '燃料；给……加燃料', 'lubricate'),
    supplemental('fake', '假的；伪造；赝品', 'fragile'),
  ],
  11: [
    supplemental('perfect', '完美的；使完善', 'appearance'),
    supplemental('makeup', '化妆品；构成', 'handsome'),
    supplemental('pretty', '漂亮的；相当', 'uniform'),
    supplemental('beautiful', '美丽的', 'uniform'),
    supplemental('ugly', '丑陋的；难看的', 'uniform'),
    supplemental('dress', '连衣裙；穿衣', 'uniform'),
    supplemental('clothe', '给……穿衣；覆盖', 'uniform'),
    supplemental('hat', '帽子', 'brim'),
    supplemental('cap', '帽子；盖', 'brim'),
    supplemental('colour', '颜色；给……着色', 'brown'),
    supplemental('white', '白色；白色的', 'brown'),
    supplemental('yellow', '黄色；黄色的', 'purple'),
    supplemental('grey', '灰色；灰色的', 'purple'),
    supplemental('pink', '粉红色；粉红色的', 'purple'),
    supplemental('tan', '棕褐色；晒黑', 'stain'),
    supplemental('fade', '褪色；逐渐消失', 'stain'),
  ],
  12: [
    supplemental('bar', '酒吧；条；障碍', 'cafeteria'),
    supplemental('restaurant', '餐馆；饭店', 'refectory'),
    supplemental('tray', '托盘', 'fork'),
    supplemental('knife', '刀', 'spoon'),
    supplemental('glass', '玻璃；玻璃杯', 'mug'),
    supplemental('juice', '果汁；汁液', 'alcohol'),
    supplemental('soda', '苏打水；汽水', 'alcohol'),
    supplemental('coffee', '咖啡', 'alcohol'),
    supplemental('drunk', '喝醉的；醉汉', 'tobacco'),
    supplemental('vegetable', '蔬菜', 'cabbage'),
    supplemental('tomato', '西红柿', 'cabbage'),
    supplemental('potato', '土豆；马铃薯', 'cabbage'),
    supplemental('fruit', '水果；果实', 'peel'),
    supplemental('peach', '桃；桃子', 'plum'),
    supplemental('pear', '梨', 'plum'),
    supplemental('orange', '橙子；橙色', 'melon'),
    supplemental('chicken', '鸡；鸡肉', 'turkey'),
    supplemental('fish', '鱼；钓鱼', 'pond'),
    supplemental('hamburger', '汉堡包', 'loaf'),
    supplemental('pie', '馅饼', 'pasta'),
    supplemental('pizza', '比萨饼', 'pasta'),
    supplemental('spaghetti', '意大利面', 'pudding'),
    supplemental('soup', '汤', 'pudding'),
    supplemental('nut', '坚果', 'vanilla'),
    supplemental('chocolate', '巧克力', 'vanilla'),
    supplemental('ice cream', '冰淇淋', 'vanilla'),
    supplemental('salt', '盐', 'flavour'),
    supplemental('candy', '糖果', 'flavour'),
    supplemental('sugar', '糖', 'flavour'),
    supplemental('honey', '蜂蜜', 'flavour'),
    supplemental('sweet', '甜的；甜食', 'bitter'),
    supplemental('yummy', '美味的', 'tasty'),
  ],
  13: [
    supplemental('hostel', '旅舍；招待所', 'lodge'),
    supplemental('kitchen', '厨房', 'lavatory'),
    supplemental('mall', '商场', 'complex'),
    supplemental('supermarket', '超市', 'booth'),
    supplemental('mason', '石匠；泥瓦匠', 'tile'),
    supplemental('infrastructure', '基础设施', 'crane'),
    supplemental('apparatus', '设备；器械', 'crane'),
  ],
  14: [
    supplemental('visa', '签证', 'helicopter'),
    supplemental('traffic', '交通；来往车辆', 'helicopter'),
    supplemental('airline', '航空公司；航线', 'helicopter'),
    supplemental('airplane', '飞机', 'helicopter'),
    supplemental('flight', '飞行；航班', 'pilot'),
    supplemental('cross', '穿过；十字形', 'path'),
    supplemental('way', '道路；方法', 'path'),
    supplemental('highway', '公路；干道', 'curb'),
    supplemental('captain', '船长；队长', 'steward'),
    supplemental('channel', '海峡；频道；渠道', 'canal'),
    supplemental('mail', '邮件；邮寄', 'packet'),
  ],
  16: [
    supplemental('saving', '节省；储蓄', 'redundant'),
    supplemental('cash', '现金', 'coin'),
    supplemental('interest', '兴趣；利息', 'dividend'),
    supplemental('fire', '解雇；火；开火', 'lay-off'),
    supplemental('loss', '损失；丧失', 'opportunity'),
    supplemental('develop', '发展；开发', 'sustainable'),
    supplemental('improve', '改善；提高', 'manage'),
  ],
  17: [
    supplemental('fool', '傻瓜；愚弄', 'stigma'),
  ],
  18: [
    supplemental('bomb', '炸弹；轰炸', 'blast'),
    supplemental('glow', '发光；光辉', 'sword'),
    supplemental('blade', '刀刃；叶片', 'sword'),
    supplemental('hit', '击打；命中', 'beat'),
    supplemental('deter', '阻止；威慑', 'forbid'),
    supplemental('treason', '叛国罪；背叛', 'traitor'),
    supplemental('rebel', '反叛者；反抗', 'traitor'),
    supplemental('terrible', '可怕的；糟糕的', 'terrific'),
    supplemental('warn', '警告；提醒', 'force'),
    supplemental('might', '力量；可能', 'force'),
  ],
  19: [
    supplemental('sex', '性别；性', 'female'),
    supplemental('husband', '丈夫', 'grandfather'),
    supplemental('gay', '同性恋的；同性恋者', 'grandfather'),
    supplemental('twin', '双胞胎之一；成对的', 'embryo'),
    supplemental('teenager', '青少年', 'adolescence'),
    supplemental('dear', '亲爱的；昂贵的', 'beloved'),
    supplemental('darling', '亲爱的；心爱的人', 'beloved'),
    supplemental('lover', '爱人；情人；爱好者', 'beloved'),
    supplemental('madam', '女士；夫人', 'hostess'),
    supplemental('housewife', '家庭主妇', 'widow'),
    supplemental('household', '家庭；一家人', 'chore'),
    supplemental('guest', '客人；宾客', 'customer'),
    supplemental('miss', '错过；未击中；小姐', 'appointment'),
    supplemental('wedding', '婚礼', 'divorce'),
    supplemental('honeymoon', '蜜月', 'divorce'),
    supplemental('kiss', '亲吻；吻', 'divorce'),
    supplemental('single', '单身的；单一的', 'sole'),
    supplemental('each', '每个；各自', 'individual'),
    supplemental('boss', '老板；上司', 'manager'),
    supplemental('friendship', '友谊', 'affection'),
    supplemental('stranger', '陌生人', 'apprentice'),
    supplemental('deputy', '副手；代理人', 'hero'),
    supplemental('actress', '女演员', 'chancellor'),
    supplemental('fireman', '消防员', 'nurse'),
    supplemental('fisherman', '渔民；钓鱼者', 'butcher'),
  ],
  20: [
    supplemental('explain', '解释；说明', 'quarrel'),
    supplemental('argument', '争论；论点', 'mention'),
    supplemental('hug', '拥抱', 'tap'),
    supplemental('follow', '跟随；遵循', 'mess'),
    supplemental('grip', '紧握；控制', 'mess'),
    supplemental('loosen', '松开；放宽', 'smash'),
    supplemental('wish', '希望；愿望', 'aspire'),
    supplemental('clear', '清除；清晰的', 'erase'),
    supplemental('offer', '提供；提议', 'enlarge'),
    supplemental('reader', '读者；读本', 'enlarge'),
    supplemental('welcome', '欢迎；受欢迎的', 'greet'),
  ],
  21: [
    supplemental('mouth', '嘴；口', 'tongue'),
    supplemental('muscle', '肌肉；力量', 'pore'),
    supplemental('quiet', '安静的；使安静', 'asleep'),
    supplemental('overweight', '超重的', 'hypertension'),
    supplemental('death', '死亡', 'mortal'),
    supplemental('hospital', '医院', 'therapy'),
    supplemental('check', '检查；核对', 'prescription'),
    supplemental('relax', '放松', 'normal'),
    supplemental('happiness', '幸福；快乐', 'delight'),
    supplemental('fun', '乐趣；有趣的', 'joke'),
    supplemental('lovely', '可爱的；美好的', 'fond'),
    supplemental('amazing', '令人惊叹的', 'astound'),
    supplemental('stern', '严厉的；苛刻的', 'hospitable'),
    supplemental('friendly', '友好的', 'hospitable'),
    supplemental('careful', '小心的；仔细的', 'concern'),
    supplemental('ready', '准备好的；愿意的', 'apologise'),
    supplemental('fortune', '财富；运气', 'grief'),
    supplemental('agony', '极度痛苦', 'grief'),
    supplemental('disappoint', '使失望', 'discourage'),
    supplemental('hate', '憎恨；讨厌', 'hatred'),
    supplemental('bother', '打扰；使烦恼', 'troublesome'),
    supplemental('mad', '疯狂的；愤怒的', 'wicked'),
    supplemental('crazy', '疯狂的', 'wicked'),
    supplemental('selfish', '自私的', 'nasty'),
    supplemental('unkind', '不友善的', 'envy'),
    supplemental('stupid', '愚蠢的', 'oblivious'),
  ],
  22: [
    supplemental('midnight', '午夜；子夜', 'overnight'),
    supplemental('night', '夜晚', 'modern'),
    supplemental('first', '第一；首先', 'secondly'),
    supplemental('finish', '结束；完成', 'immediately'),
    supplemental('moment', '片刻；时刻', 'prior'),
    supplemental('minute', '分钟；微小的', 'prior'),
  ],
};

const supplementalPartOfSpeechByWord: Record<string, string> = Object.fromEntries([
  ['gasoline|protein|problem|motive|scientist|doctor|dictionary|festival|movie|artist|painter|jazz|hip-hop|melody|piano|guitar|goal|racket|umbrella|makeup|hat|restaurant|tray|knife|glass|juice|soda|coffee|vegetable|tomato|potato|fruit|peach|pear|orange|chicken|hamburger|pie|pizza|spaghetti|soup|nut|chocolate|ice cream|salt|candy|sugar|honey|hostel|kitchen|mall|supermarket|mason|infrastructure|apparatus|visa|traffic|airline|airplane|flight|way|highway|captain|channel|mail|saving|cash|loss|fool|bomb|blade|treason|sex|husband|twin|teenager|darling|lover|madam|housewife|household|guest|wedding|honeymoon|boss|friendship|stranger|deputy|actress|fireman|fisherman|argument|reader|mouth|muscle|death|hospital|happiness|fortune|agony|midnight|night|moment|minute', 'n.'],
  ['hybridise|clothe|fade|develop|improve|deter|warn|explain|follow|loosen|relax|disappoint', 'v.'],
  ['instinctive|desperate|clever|smart|homesick|classical|beautiful|ugly|yummy|terrible|overweight|lovely|amazing|stern|friendly|careful|ready|crazy|selfish|unkind|stupid', 'adj.'],
  ['signal|sign|film|rock|pop|band|drum|bat|vacation|climb|fuel|dress|cap|colour|tan|bar|fish|cross|fire|interest|glow|hit|rebel|miss|kiss|hug|grip|wish|offer|check|hate|bother|finish', 'n. / v.'],
  ['magic|fake|perfect|sweet|gay|single|quiet|mad', 'adj. / n.'],
  ['pretty|first', 'adj. / adv.'],
  ['drunk', 'adj. / n.'],
  ['Olympic|yellow|grey|pink|white', 'adj. / n.'],
  ['might', 'modal v. / n.'],
  ['dear', 'adj. / n. / adv.'],
  ['each', 'det. / pron.'],
  ['welcome', 'v. / adj. / n.'],
  ['clear', 'adj. / v.'],
  ['fun', 'n. / adj.'],
].flatMap(([words, partOfSpeech]) => String(words).split('|').map((word) => [word.toLowerCase(), partOfSpeech]))) as Record<string, string>;

function correctedChapterWords(chapterId: number, words: BookWord[]) {
  if (chapterId === 15) return correctedChapter15Words(words);

  const excluded = excludedHeadwordsByChapter[chapterId] ?? new Set<string>();
  const corrected = words.filter((word) => !excluded.has(word.word));

  for (const addition of supplementalHeadwordsByChapter[chapterId] ?? []) {
    const insertionIndex = addition.before
      ? corrected.findIndex((word) => word.word === addition.before)
      : corrected.length;
    if (insertionIndex < 0) {
      throw new Error(`Missing Chapter ${chapterId} insertion point: ${addition.before}`);
    }

    const reused = addition.sourceId
      ? stream.find((word) => word.sourceId === addition.sourceId)
      : undefined;
    if (addition.sourceId && !reused) {
      throw new Error(`Missing Chapter ${chapterId} source headword: ${addition.sourceId}`);
    }

    const anchor = corrected[insertionIndex] ?? corrected.at(-1);
    const word: BookWord = reused ?? {
      bookId: 'ielts',
      chapter: chapterId,
      chapterName: chapterNames[chapterId - 1],
      list: anchor?.list ?? 1,
      number: 0,
      word: addition.word,
      hint: addition.hint,
      sourceHint: addition.hint,
      sourceId: `book-${chapterId}-${addition.word.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      partOfSpeech: supplementalPartOfSpeechByWord[addition.word.toLowerCase()]
        ?? partOfSpeechByWord[addition.word.toLowerCase()]
        ?? '词组',
    };
    corrected.splice(insertionIndex, 0, word);
  }

  return corrected;
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
  const chapterWords = correctedChapterWords(index + 1, sourceWords);
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

function validateAuditedChapters() {
  for (const chapter of chapters) {
    for (const excluded of excludedHeadwordsByChapter[chapter.id] ?? []) {
      if (chapter.words.some((word) => word.word === excluded)) {
        throw new Error(`Excluded Chapter ${chapter.id} headword remains: ${excluded}`);
      }
    }
    for (const addition of supplementalHeadwordsByChapter[chapter.id] ?? []) {
      const matches = chapter.words.filter((word) => word.word === addition.word);
      if (matches.length !== 1) {
        throw new Error(`Chapter ${chapter.id} headword count for ${addition.word}: ${matches.length}`);
      }
      if (addition.sourceId && matches[0].sourceId !== addition.sourceId) {
        throw new Error(`Chapter ${chapter.id} source ID changed for ${addition.word}`);
      }
      if (!addition.sourceId && matches[0].partOfSpeech === '词组') {
        throw new Error(`Missing Chapter ${chapter.id} part of speech for ${addition.word}`);
      }
    }
  }

  if (chapters[14].words.length !== 149) {
    throw new Error(`Chapter 15 should contain 149 headwords, found ${chapters[14].words.length}`);
  }

  const sourceIds = chapters.flatMap((chapter) => chapter.words.map((word) => word.sourceId).filter(Boolean));
  if (new Set(sourceIds).size !== sourceIds.length) {
    throw new Error('Duplicate IELTS source IDs found after chapter audit');
  }
}

validateAuditedChapters();

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
