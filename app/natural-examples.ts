export type ExampleSentence = {
  before: string;
  after: string;
  translation: string;
};

type Word = { chapter: number; number: number; word: string; hint: string };

const featured: Record<string, ExampleSentence> = {
  atmosphere: {
    before: "The Earth's ",
    after: ' absorbs much of the harmful radiation from the sun.',
    translation: '地球大气层吸收了大量来自太阳的有害辐射。',
  },
  hydrosphere: {
    before: 'Pollution can move through the ',
    after: ' and eventually reach the ocean.',
    translation: '污染物会在水圈中迁移，并最终进入海洋。',
  },
  lithosphere: {
    before: 'Most earthquakes occur where sections of the ',
    after: ' move against one another.',
    translation: '大多数地震发生在岩石圈板块相互运动的区域。',
  },
  oxygen: {
    before: 'Regular exercise increases the amount of ',
    after: ' delivered to the muscles.',
    translation: '经常锻炼可以增加输送到肌肉中的氧气量。',
  },
  oxide: {
    before: 'The metal reacted with air and formed a thin layer of ',
    after: ' on its surface.',
    translation: '这种金属与空气发生反应，在表面形成了一层薄薄的氧化物。',
  },
  'carbon dioxide': {
    before: 'Trees absorb ',
    after: ' from the atmosphere as they grow.',
    translation: '树木在生长过程中会从大气中吸收二氧化碳。',
  },
  hydrogen: {
    before: 'Some countries are investing heavily in ',
    after: ' as a cleaner source of energy.',
    translation: '一些国家正在大力投资氢能，希望将其作为更清洁的能源。',
  },
  core: {
    before: "Scientists believe that the Earth's inner ",
    after: ' is mainly composed of iron.',
    translation: '科学家认为，地球内核主要由铁构成。',
  },
  crust: {
    before: 'The oceanic ',
    after: ' is generally thinner than the continental crust.',
    translation: '海洋地壳通常比大陆地壳更薄。',
  },
  mantle: {
    before: "Heat from the Earth's ",
    after: ' drives the slow movement of tectonic plates.',
    translation: '来自地幔的热量推动着构造板块缓慢移动。',
  },
  longitude: {
    before: 'Sailors once relied on accurate clocks to calculate ',
    after: ' at sea.',
    translation: '过去，水手依靠精确的时钟计算海上的经度。',
  },
  latitude: {
    before: 'Average temperatures tend to fall as ',
    after: ' increases.',
    translation: '随着纬度升高，平均气温往往会下降。',
  },
  altitude: {
    before: 'The air becomes thinner as ',
    after: ' increases.',
    translation: '海拔越高，空气就越稀薄。',
  },
  horizon: {
    before: 'Dark clouds appeared on the ',
    after: ' shortly before the storm began.',
    translation: '暴风雨来临前不久，地平线上出现了乌云。',
  },
  disaster: {
    before: 'Better warning systems can prevent a natural hazard from becoming a human ',
    after: '.',
    translation: '更完善的预警系统可以防止自然灾害演变成人类灾难。',
  },
  endanger: {
    before: 'Continued deforestation could ',
    after: ' many species that depend on the forest.',
    translation: '持续砍伐森林可能危及许多依赖森林生存的物种。',
  },
  jeopardise: {
    before: 'Cutting the safety budget may ',
    after: ' the lives of both workers and residents.',
    translation: '削减安全预算可能危及工人和居民的生命。',
  },
};

const topics: Record<number, { en: string; zh: string }> = {
  1: { en: 'the natural environment', zh: '自然环境' },
  2: { en: 'sustainable agriculture', zh: '可持续农业' },
  3: { en: 'wildlife protection', zh: '野生动物保护' },
  4: { en: 'space exploration', zh: '太空探索' },
  5: { en: 'modern education', zh: '现代教育' },
  6: { en: 'technological development', zh: '科技发展' },
  7: { en: 'cultural heritage', zh: '文化遗产' },
  8: { en: 'language and communication', zh: '语言与交流' },
  9: { en: 'sport and entertainment', zh: '体育与娱乐' },
  10: { en: 'consumer products', zh: '消费品' },
  11: { en: 'fashion and consumer behaviour', zh: '时尚与消费行为' },
  12: { en: 'diet and health', zh: '饮食与健康' },
  13: { en: 'urban design', zh: '城市设计' },
  14: { en: 'transport and travel', zh: '交通与旅行' },
  15: { en: 'public policy', zh: '公共政策' },
  16: { en: 'economic development', zh: '经济发展' },
  17: { en: 'law and public responsibility', zh: '法律与公共责任' },
  18: { en: 'international security', zh: '国际安全' },
  19: { en: 'community life', zh: '社区生活' },
  20: { en: 'human behaviour', zh: '人类行为' },
  21: { en: 'physical and mental health', zh: '身心健康' },
  22: { en: 'social change over time', zh: '社会随时间发生的变化' },
};

function meaning(hint: string) {
  return hint.split(/[；;,，。[(]/)[0].replace(/[~]/g, '').trim() || '这一概念';
}

function isAdverb(word: string, hint: string) {
  return /ly$/i.test(word) || /adv\.?/i.test(hint);
}

function isAdjective(word: string, hint: string) {
  return /adj\.?/i.test(hint) || /(able|ible|al|ful|ic|ical|ive|less|ous|ary|ory|ent|ant)$/i.test(word);
}

function isVerb(word: string, hint: string) {
  return /(?:^|\s)v\.?/i.test(hint) || /^(endanger|jeopardise|erupt|protect|prevent|support|provide|affect|influence|encourage|allow|require|consider|suggest|explain|compare|replace|remove|produce|consume|maintain)$/i.test(word);
}

export function createNaturalExample(word: Word): ExampleSentence {
  const saved = featured[word.word.toLowerCase()];
  if (saved) return saved;

  const topic = topics[word.chapter] || { en: 'contemporary society', zh: '当代社会' };
  const gloss = meaning(word.hint);
  const variant = (word.number + word.word.length) % 3;

  if (isAdverb(word.word, word.hint)) {
    return [
      { before: 'The situation changed ', after: ' after the new measures were introduced.', translation: '新措施出台后，情况' + gloss + '发生了变化。' },
      { before: 'Researchers examined the results ', after: ' before publishing their conclusions.', translation: '研究人员在发表结论前' + gloss + '分析了结果。' },
      { before: 'Public attitudes have shifted ', after: ' over the past decade.', translation: '过去十年间，公众态度' + gloss + '发生了转变。' },
    ][variant];
  }

  if (isAdjective(word.word, word.hint)) {
    return [
      { before: 'The government introduced a ', after: ' strategy to address problems in ' + topic.en + '.', translation: '政府推出了一项' + gloss + '策略，以解决' + topic.zh + '领域的问题。' },
      { before: 'The findings were ', after: ', so the researchers repeated the experiment.', translation: '研究结果' + gloss + '，因此研究人员重复了实验。' },
      { before: 'A more ', after: ' approach could produce better results in ' + topic.en + '.', translation: '采用更' + gloss + '的方法，可能会在' + topic.zh + '领域取得更好的结果。' },
    ][variant];
  }

  if (isVerb(word.word, word.hint) && !word.word.includes(' ')) {
    return [
      { before: 'Governments should ', after: ' the problem before it has a wider impact on ' + topic.en + '.', translation: '政府应当' + gloss + '这一问题，以免它对' + topic.zh + '产生更广泛的影响。' },
      { before: 'The new programme aims to ', after: ' long-term progress in ' + topic.en + '.', translation: '这项新计划旨在' + gloss + '，推动' + topic.zh + '领域的长期进步。' },
      { before: 'Several factors may ', after: ' the final outcome of the study.', translation: '多种因素可能会' + gloss + '这项研究的最终结果。' },
    ][variant];
  }

  return [
    { before: 'Recent research has revealed important changes in ', after: ' across ' + topic.en + '.', translation: '近期研究发现，' + topic.zh + '领域的' + gloss + '出现了重要变化。' },
    { before: 'Public concern about ', after: ' has grown significantly in recent years.', translation: '近年来，公众对' + gloss + '的关注显著增加。' },
    { before: 'The report examines how ', after: ' affects everyday life and ' + topic.en + '.', translation: '该报告研究了' + gloss + '如何影响日常生活和' + topic.zh + '。' },
  ][variant];
}
