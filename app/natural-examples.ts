export type ExampleSentence = {
  before: string;
  after: string;
  translation: string;
};

export type RelatedWord = {
  word: string;
  note: string;
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
  feel: {
    before: 'Many university students ',
    after: ' anxious when they have to balance study with part-time work.',
    translation: '许多大学生在兼顾学业和兼职工作时会感到焦虑。',
  },
  mood: {
    before: 'Regular exercise can improve a person’s ',
    after: ' and help them manage everyday stress.',
    translation: '规律运动可以改善一个人的情绪，并帮助其应对日常压力。',
  },
  emotion: {
    before: 'Children need a safe environment in which to express ',
    after: ' without fear of being judged.',
    translation: '儿童需要一个安全的环境来表达情绪，而不必担心受到评判。',
  },
  feeling: {
    before: 'The documentary left many viewers with a strong ',
    after: ' of responsibility for the natural world.',
    translation: '这部纪录片让许多观众强烈感到自己对自然世界负有责任。',
  },
  temper: {
    before: 'The teacher remained calm despite the child’s bad ',
    after: '.',
    translation: '尽管孩子脾气不好，老师仍保持冷静。',
  },
  manner: {
    before: 'Applicants are expected to speak in a polite ',
    after: ' during the interview.',
    translation: '求职者在面试时应以礼貌的方式表达。',
  },
  attitude: {
    before: 'A positive ',
    after: ' towards learning can make it easier to overcome early setbacks.',
    translation: '对学习持积极态度能让人更容易克服早期挫折。',
  },
  character: {
    before: 'Volunteering can help young people develop ',
    after: ' as well as practical skills.',
    translation: '志愿服务既能帮助年轻人培养品格，也能培养实用技能。',
  },
  personality: {
    before: 'Although ',
    after: ' may influence career choices, experience often matters more in the workplace.',
    translation: '尽管个性可能影响职业选择，但在职场中经验往往更重要。',
  },
  trait: {
    before: 'Patience is an important ',
    after: ' for anyone who works with young children.',
    translation: '耐心是所有从事幼儿工作的人都应具备的重要特质。',
  },
  virtue: {
    before: 'Schools should promote ',
    after: 's such as honesty and responsibility alongside academic achievement.',
    translation: '学校在重视学业成绩的同时，也应倡导诚实和责任感等美德。',
  },
  feature: {
    before: 'A key ',
    after: ' of the new library is its quiet study area.',
    translation: '这座新图书馆的一项主要特色是设有安静的自习区。',
  },
  stature: {
    before: 'The scientist gained international ',
    after: ' after publishing her findings on climate change.',
    translation: '这位科学家发表气候变化研究成果后，获得了国际声望。',
  },
  flesh: {
    before: 'The surgeon examined the damaged ',
    after: ' before treating the wound.',
    translation: '外科医生在处理伤口前检查了受损的皮肉组织。',
  },
  mankind: {
    before: 'Climate change is a challenge that affects all ',
    after: '.',
    translation: '气候变化是一项影响全人类的挑战。',
  },
  cripple: {
    before: 'A serious injury can ',
    after: ' a person’s ability to work and live independently.',
    translation: '严重的伤病可能会使一个人失去工作和独立生活的能力。',
  },
  lame: {
    before: 'The audience found his explanation ',
    after: ' because it failed to address the main issue.',
    translation: '观众认为他的解释很牵强，因为它没有回应核心问题。',
  },
  dwarf: {
    before: 'The new library is ',
    after: 'ed by the high-rise buildings around it.',
    translation: '新图书馆在周围高楼的映衬下显得很矮小。',
  },
  pregnancy: {
    before: 'Good nutrition during ',
    after: ' is essential for the health of both mother and child.',
    translation: '孕期良好的营养对母亲和孩子的健康都至关重要。',
  },
  pregnant: {
    before: 'Pregnant women should have access to regular medical care throughout ',
    after: '.',
    translation: '孕妇在整个孕期都应获得定期的医疗照护。',
  },
  born: {
    before: 'Children ',
    after: ' into disadvantaged families may need additional support at school.',
    translation: '出生在弱势家庭的儿童在学校中可能需要额外支持。',
  },
  condom: {
    before: 'The health campaign provided clear information about how to use a ',
    after: ' correctly.',
    translation: '这项健康宣传活动清晰讲解了如何正确使用安全套。',
  },
  symptom: {
    before: 'Persistent fatigue can be an early ',
    after: ' of several common health conditions.',
    translation: '持续疲劳可能是多种常见健康问题的早期症状。',
  },
  disease: {
    before: 'Vaccination remains one of the most effective ways to prevent infectious ',
    after: '.',
    translation: '接种疫苗仍然是预防传染病最有效的方法之一。',
  },
  illness: {
    before: 'Long-term ',
    after: ' can affect not only patients but also their families.',
    translation: '长期疾病不仅会影响患者，也会影响其家人。',
  },
  moan: {
    before: 'The patient began to ',
    after: ' when the nurse moved his injured arm.',
    translation: '护士移动病人受伤的手臂时，他开始呻吟。',
  },
  infection: {
    before: 'Prompt treatment can stop a minor ',
    after: ' from becoming more serious.',
    translation: '及时治疗可以避免轻微感染变得更严重。',
  },
  infect: {
    before: 'Contaminated water can ',
    after: ' people who do not have access to clean drinking supplies.',
    translation: '受污染的水可能感染无法获得洁净饮用水的人。',
  },
  detriment: {
    before: 'Excessive screen time may be to the ',
    after: ' of children’s sleep and concentration.',
    translation: '过多的屏幕时间可能损害儿童的睡眠和注意力。',
  },
  broken: {
    before: 'The device was returned because its screen was ',
    after: ' when it arrived.',
    translation: '该设备送达时屏幕已经损坏，因此被退回。',
  },
  disable: {
    before: 'A workplace accident can ',
    after: ' an employee for months if rehabilitation is delayed.',
    translation: '如果康复治疗被延误，工作事故可能会使员工数月失去工作能力。',
  },
  invalid: {
    before: 'The application was rejected because the supporting document was ',
    after: '.',
    translation: '由于证明文件无效，该申请被拒绝了。',
  },
  patient: {
    before: 'The nurse explained the treatment plan to each ',
    after: ' in clear and simple language.',
    translation: '护士用清晰易懂的语言向每位病人解释治疗方案。',
  },
  dysfunction: {
    before: 'Chronic stress may contribute to sleep ',
    after: ' and reduced concentration.',
    translation: '长期压力可能导致睡眠功能紊乱和注意力下降。',
  },
  diabetes: {
    before: 'A balanced diet and regular exercise can reduce the risk of type 2 ',
    after: '.',
    translation: '均衡饮食和规律运动可以降低患 2 型糖尿病的风险。',
  },
  obesity: {
    before: 'Schools can help prevent childhood ',
    after: ' by providing healthier meals and more opportunities for exercise.',
    translation: '学校可以通过提供更健康的餐食和更多运动机会来预防儿童肥胖。',
  },
  hypertension: {
    before: 'Reducing salt intake can help many adults control ',
    after: '.',
    translation: '减少盐摄入可以帮助许多成年人控制高血压。',
  },
  paralyse: {
    before: 'Fear of failure can ',
    after: ' people and prevent them from taking useful action.',
    translation: '对失败的恐惧会使人无法行动，并阻止他们采取有益行动。',
  },
  dizzy: {
    before: 'Some people feel ',
    after: ' when they stand up too quickly after sitting for a long time.',
    translation: '有些人久坐后突然站起时会感到头晕。',
  },
};

const relatedWords: Record<string, RelatedWord[]> = {
  atmosphere: [
    { word: 'atmospheric', note: 'adj. 大气的；大气层的' },
    { word: 'atmospheric pressure', note: '大气压' },
    { word: 'atmospheric pollution', note: '大气污染' },
  ],
  hydrosphere: [
    { word: 'hydrological', note: 'adj. 水文的' },
    { word: 'water cycle', note: '水循环' },
  ],
  lithosphere: [
    { word: 'tectonic plate', note: '构造板块' },
    { word: 'geological', note: 'adj. 地质的' },
  ],
  oxygen: [
    { word: 'oxygenate', note: 'v. 供氧；使氧化' },
    { word: 'oxygen-rich', note: 'adj. 富氧的' },
    { word: 'oxygen supply', note: '氧气供应' },
  ],
  oxide: [
    { word: 'oxidise', note: 'v. 氧化' },
    { word: 'oxidation', note: 'n. 氧化作用' },
  ],
  'carbon dioxide': [
    { word: 'carbon emissions', note: '碳排放' },
    { word: 'greenhouse gas', note: '温室气体' },
    { word: 'carbon-neutral', note: 'adj. 碳中和的' },
    { word: 'CO₂', note: '二氧化碳的化学式' },
  ],
  hydrogen: [
    { word: 'hydrogen fuel', note: '氢燃料' },
    { word: 'hydrogen-powered', note: 'adj. 氢动力的' },
  ],
  core: [
    { word: 'core issue', note: '核心问题' },
    { word: 'core value', note: '核心价值观' },
  ],
  crust: [
    { word: 'continental crust', note: '大陆地壳' },
    { word: 'oceanic crust', note: '海洋地壳' },
  ],
  mantle: [
    { word: 'mantle plume', note: '地幔柱' },
    { word: 'tectonic movement', note: '构造运动' },
  ],
  longitude: [
    { word: 'latitude', note: 'n. 纬度' },
    { word: 'longitude line', note: '经线' },
  ],
  latitude: [
    { word: 'longitude', note: 'n. 经度' },
    { word: 'high latitudes', note: '高纬度地区' },
  ],
  altitude: [
    { word: 'high-altitude', note: 'adj. 高海拔的' },
    { word: 'altitude sickness', note: '高原反应' },
  ],
  horizon: [
    { word: 'on the horizon', note: '即将出现；在地平线上' },
    { word: 'broaden one’s horizons', note: '开阔眼界' },
  ],
  disaster: [
    { word: 'disastrous', note: 'adj. 灾难性的' },
    { word: 'disaster relief', note: '灾害救援' },
    { word: 'natural disaster', note: '自然灾害' },
  ],
  endanger: [
    { word: 'endangered', note: 'adj. 濒危的' },
    { word: 'endangered species', note: '濒危物种' },
  ],
  jeopardise: [
    { word: 'in jeopardy', note: '处于危险之中' },
    { word: 'put ... in jeopardy', note: '使……陷入危险' },
  ],
  feel: [
    { word: 'felt', note: '过去式和过去分词' },
    { word: 'feeling', note: '名词：感觉；情感' },
    { word: 'feel like doing', note: '想要做某事' },
  ],
  mood: [
    { word: 'moody', note: '形容词：情绪多变的' },
    { word: 'be in a good mood', note: '心情很好' },
  ],
  emotion: [
    { word: 'emotional', note: '形容词：情绪激动的；情感的' },
    { word: 'emotional support', note: '情感支持' },
  ],
  temper: [
    { word: 'temperamental', note: '形容词：喜怒无常的' },
    { word: 'lose one’s temper', note: '发脾气' },
  ],
  manner: [
    { word: 'in a ... manner', note: '以……方式' },
    { word: 'good manners', note: '良好的礼貌' },
  ],
  attitude: [
    { word: 'attitudinal', note: '形容词：态度方面的' },
    { word: 'a positive attitude', note: '积极的态度' },
  ],
  character: [
    { word: 'characteristic', note: '形容词：典型的；名词：特征' },
    { word: 'build character', note: '培养品格' },
  ],
  personality: [
    { word: 'personal', note: '形容词：个人的' },
    { word: 'personality trait', note: '性格特质' },
  ],
  trait: [
    { word: 'personality trait', note: '性格特质' },
    { word: 'a defining trait', note: '鲜明特征' },
  ],
  virtue: [
    { word: 'virtuous', note: '形容词：有美德的' },
    { word: 'moral virtue', note: '道德美德' },
  ],
  feature: [
    { word: 'featured', note: '形容词：作为特色的；重点介绍的' },
    { word: 'a key feature', note: '一项主要特色' },
  ],
  stature: [
    { word: 'of international stature', note: '具有国际声望的' },
    { word: 'grow in stature', note: '声望提高' },
  ],
  flesh: [
    { word: 'flesh out', note: '充实；使具体化' },
    { word: 'in the flesh', note: '亲自；本人在场' },
  ],
  mankind: [
    { word: 'humankind', note: '名词：人类' },
    { word: 'for the good of mankind', note: '为了全人类的福祉' },
  ],
  pregnancy: [
    { word: 'pregnant', note: '形容词：怀孕的' },
    { word: 'during pregnancy', note: '在孕期' },
  ],
  pregnant: [
    { word: 'pregnancy', note: '名词：怀孕；妊娠' },
    { word: 'get pregnant', note: '怀孕' },
  ],
  infect: [
    { word: 'infected', note: '过去式和过去分词；形容词：受感染的' },
    { word: 'infection', note: '名词：感染' },
  ],
  infection: [
    { word: 'infect', note: '动词：感染' },
    { word: 'infectious', note: '形容词：传染性的' },
  ],
  obesity: [
    { word: 'obese', note: '形容词：肥胖的' },
    { word: 'childhood obesity', note: '儿童肥胖' },
  ],
  paralyse: [
    { word: 'paralysed', note: '过去式和过去分词；形容词：瘫痪的' },
    { word: 'paralysis', note: '名词：瘫痪' },
  ],
  fluent: [
    { word: 'fluency', note: '名词：流利；流畅' },
    { word: 'be fluent in', note: '熟练掌握（某种语言）' },
  ],
};

const irregularVerbs: Record<string, RelatedWord[]> = {
  be: [{ word: 'was / were', note: '过去式' }, { word: 'been', note: '过去分词' }],
  bear: [{ word: 'bore', note: '过去式' }, { word: 'borne', note: '过去分词' }],
  become: [{ word: 'became', note: '过去式' }, { word: 'become', note: '过去分词' }],
  begin: [{ word: 'began', note: '过去式' }, { word: 'begun', note: '过去分词' }],
  bend: [{ word: 'bent', note: '过去式和过去分词' }],
  bet: [{ word: 'bet', note: '过去式和过去分词' }],
  bind: [{ word: 'bound', note: '过去式和过去分词' }],
  bite: [{ word: 'bit', note: '过去式' }, { word: 'bitten', note: '过去分词' }],
  bleed: [{ word: 'bled', note: '过去式和过去分词' }],
  blow: [{ word: 'blew', note: '过去式' }, { word: 'blown', note: '过去分词' }],
  break: [{ word: 'broke', note: '过去式' }, { word: 'broken', note: '过去分词' }],
  breed: [{ word: 'bred', note: '过去式和过去分词' }],
  bring: [{ word: 'brought', note: '过去式和过去分词' }],
  build: [{ word: 'built', note: '过去式和过去分词' }],
  buy: [{ word: 'bought', note: '过去式和过去分词' }],
  catch: [{ word: 'caught', note: '过去式和过去分词' }],
  choose: [{ word: 'chose', note: '过去式' }, { word: 'chosen', note: '过去分词' }],
  come: [{ word: 'came', note: '过去式' }, { word: 'come', note: '过去分词' }],
  cost: [{ word: 'cost', note: '过去式和过去分词' }],
  creep: [{ word: 'crept', note: '过去式和过去分词' }],
  cut: [{ word: 'cut', note: '过去式和过去分词' }],
  deal: [{ word: 'dealt', note: '过去式和过去分词' }],
  dig: [{ word: 'dug', note: '过去式和过去分词' }],
  do: [{ word: 'did', note: '过去式' }, { word: 'done', note: '过去分词' }],
  draw: [{ word: 'drew', note: '过去式' }, { word: 'drawn', note: '过去分词' }],
  drink: [{ word: 'drank', note: '过去式' }, { word: 'drunk', note: '过去分词' }],
  drive: [{ word: 'drove', note: '过去式' }, { word: 'driven', note: '过去分词' }],
  eat: [{ word: 'ate', note: '过去式' }, { word: 'eaten', note: '过去分词' }],
  fall: [{ word: 'fell', note: '过去式' }, { word: 'fallen', note: '过去分词' }],
  feed: [{ word: 'fed', note: '过去式和过去分词' }],
  fight: [{ word: 'fought', note: '过去式和过去分词' }],
  find: [{ word: 'found', note: '过去式和过去分词' }],
  fly: [{ word: 'flew', note: '过去式' }, { word: 'flown', note: '过去分词' }],
  forbid: [{ word: 'forbade', note: '过去式' }, { word: 'forbidden', note: '过去分词' }],
  forget: [{ word: 'forgot', note: '过去式' }, { word: 'forgotten', note: '过去分词' }],
  forgive: [{ word: 'forgave', note: '过去式' }, { word: 'forgiven', note: '过去分词' }],
  freeze: [{ word: 'froze', note: '过去式' }, { word: 'frozen', note: '过去分词' }],
  get: [{ word: 'got', note: '过去式' }, { word: 'got / gotten', note: '过去分词' }],
  give: [{ word: 'gave', note: '过去式' }, { word: 'given', note: '过去分词' }],
  go: [{ word: 'went', note: '过去式' }, { word: 'gone', note: '过去分词' }],
  grow: [{ word: 'grew', note: '过去式' }, { word: 'grown', note: '过去分词' }],
  hang: [{ word: 'hung', note: '过去式和过去分词' }],
  have: [{ word: 'had', note: '过去式和过去分词' }],
  hear: [{ word: 'heard', note: '过去式和过去分词' }],
  hide: [{ word: 'hid', note: '过去式' }, { word: 'hidden', note: '过去分词' }],
  hold: [{ word: 'held', note: '过去式和过去分词' }],
  keep: [{ word: 'kept', note: '过去式和过去分词' }],
  know: [{ word: 'knew', note: '过去式' }, { word: 'known', note: '过去分词' }],
  lay: [{ word: 'laid', note: '过去式和过去分词' }],
  lead: [{ word: 'led', note: '过去式和过去分词' }],
  leave: [{ word: 'left', note: '过去式和过去分词' }],
  lend: [{ word: 'lent', note: '过去式和过去分词' }],
  lie: [{ word: 'lay', note: '过去式' }, { word: 'lain', note: '过去分词' }],
  lose: [{ word: 'lost', note: '过去式和过去分词' }],
  make: [{ word: 'made', note: '过去式和过去分词' }],
  mean: [{ word: 'meant', note: '过去式和过去分词' }],
  meet: [{ word: 'met', note: '过去式和过去分词' }],
  pay: [{ word: 'paid', note: '过去式和过去分词' }],
  prove: [{ word: 'proved', note: '过去式' }, { word: 'proven / proved', note: '过去分词' }],
  put: [{ word: 'put', note: '过去式和过去分词' }],
  read: [{ word: 'read', note: '过去式和过去分词，读音为 /red/' }],
  ride: [{ word: 'rode', note: '过去式' }, { word: 'ridden', note: '过去分词' }],
  ring: [{ word: 'rang', note: '过去式' }, { word: 'rung', note: '过去分词' }],
  rise: [{ word: 'rose', note: '过去式' }, { word: 'risen', note: '过去分词' }],
  run: [{ word: 'ran', note: '过去式' }, { word: 'run', note: '过去分词' }],
  say: [{ word: 'said', note: '过去式和过去分词' }],
  see: [{ word: 'saw', note: '过去式' }, { word: 'seen', note: '过去分词' }],
  sell: [{ word: 'sold', note: '过去式和过去分词' }],
  send: [{ word: 'sent', note: '过去式和过去分词' }],
  set: [{ word: 'set', note: '过去式和过去分词' }],
  shake: [{ word: 'shook', note: '过去式' }, { word: 'shaken', note: '过去分词' }],
  shoot: [{ word: 'shot', note: '过去式和过去分词' }],
  show: [{ word: 'showed', note: '过去式' }, { word: 'shown', note: '过去分词' }],
  shut: [{ word: 'shut', note: '过去式和过去分词' }],
  sing: [{ word: 'sang', note: '过去式' }, { word: 'sung', note: '过去分词' }],
  sit: [{ word: 'sat', note: '过去式和过去分词' }],
  sleep: [{ word: 'slept', note: '过去式和过去分词' }],
  speak: [{ word: 'spoke', note: '过去式' }, { word: 'spoken', note: '过去分词' }],
  spend: [{ word: 'spent', note: '过去式和过去分词' }],
  stand: [{ word: 'stood', note: '过去式和过去分词' }],
  steal: [{ word: 'stole', note: '过去式' }, { word: 'stolen', note: '过去分词' }],
  swim: [{ word: 'swam', note: '过去式' }, { word: 'swum', note: '过去分词' }],
  take: [{ word: 'took', note: '过去式' }, { word: 'taken', note: '过去分词' }],
  teach: [{ word: 'taught', note: '过去式和过去分词' }],
  tear: [{ word: 'tore', note: '过去式' }, { word: 'torn', note: '过去分词' }],
  tell: [{ word: 'told', note: '过去式和过去分词' }],
  think: [{ word: 'thought', note: '过去式和过去分词' }],
  throw: [{ word: 'threw', note: '过去式' }, { word: 'thrown', note: '过去分词' }],
  understand: [{ word: 'understood', note: '过去式和过去分词' }],
  wake: [{ word: 'woke', note: '过去式' }, { word: 'woken', note: '过去分词' }],
  wear: [{ word: 'wore', note: '过去式' }, { word: 'worn', note: '过去分词' }],
  win: [{ word: 'won', note: '过去式和过去分词' }],
  write: [{ word: 'wrote', note: '过去式' }, { word: 'written', note: '过去分词' }],
  born: [{ word: 'bear — bore — borne', note: '对应动词的不规则变化' }],
  broken: [{ word: 'break — broke — broken', note: '对应动词的不规则变化' }],
};

function sourceHintRelations(word: string, sourceHint?: string): RelatedWord[] {
  if (!sourceHint) return [];
  const candidates = sourceHint.match(/[A-Za-z][A-Za-z'’~\-]*(?:\s+[A-Za-z][A-Za-z'’~\-]*)*/g) ?? [];
  const ignored = new Set(['n', 'v', 'adj', 'adv', 'a', 'sb', 'sth', 'of', 'to', 'and', 'or', 'the']);
  const seen = new Set<string>();
  return candidates.flatMap((candidate) => {
    let phrase = candidate.replace(/[’]/g, "'").replace(/\s+(?:n|v|adj|adv)$/i, '').trim();
    if (ignored.has(phrase.toLowerCase()) || phrase.length < 3) return [];
    if (phrase.includes('~')) phrase = phrase.replace(/~/g, ' ' + word + ' ').replace(/\s+/g, ' ').trim();
    if (phrase.toLowerCase() === word.toLowerCase() || seen.has(phrase.toLowerCase())) return [];
    seen.add(phrase.toLowerCase());
    return [{ word: phrase, note: phrase.includes(' ') ? '词书常用搭配' : '词书相关词' }];
  });
}

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

export function createNaturalExample(word: Word): ExampleSentence | null {
  const saved = featured[word.word.toLowerCase()];
  if (saved) return saved;

  return null;
}

export function getRelatedWords(word: string, sourceHint?: string) {
  const key = word.toLowerCase();
  const all = [
    ...(relatedWords[key] ?? []),
    ...(irregularVerbs[key] ?? []),
    ...sourceHintRelations(word, sourceHint),
  ];
  const seen = new Set<string>();
  return all.filter((item) => {
    const identity = item.word.toLowerCase();
    if (seen.has(identity)) return false;
    seen.add(identity);
    return true;
  }).slice(0, 6);
}
