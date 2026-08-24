import bookContentData from './book-content.json';
import wordnetRelationsData from './wordnet-relations.json';
import { chineseMeaningByWord } from './book-chapters';

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
  bone: {
    before: 'Once cancer has spread to the ',
    after: ', it is difficult to treat.',
    translation: '癌症一旦扩散到骨骼，就很难治疗。',
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
  'el nino': {
    before: '',
    after: ' can disrupt rainfall patterns across the Pacific region.',
    translation: '厄尔尼诺现象会扰乱太平洋地区的降雨规律。',
  },
  tornado: {
    before: 'The ',
    after: ' destroyed several homes but caused no deaths.',
    translation: '龙卷风摧毁了数所房屋，但没有造成人员死亡。',
  },
  silt: {
    before: 'The river carried fertile ',
    after: ' onto the surrounding farmland.',
    translation: '河流把肥沃的淤泥带到了周围的农田。',
  },
  deforest: {
    before: 'Companies should not ',
    after: ' large areas simply to expand short-term production.',
    translation: '企业不应为了扩大短期生产而砍伐大片森林。',
  },
  fertilise: {
    before: 'Farmers use organic waste to ',
    after: ' the soil and improve crop yields.',
    translation: '农民利用有机废料给土壤施肥，以提高作物产量。',
  },
  horticulture: {
    before: 'Urban ',
    after: ' can provide fresh food and improve neglected public spaces.',
    translation: '城市园艺能够提供新鲜食物，并改善被忽视的公共空间。',
  },
  amphibian: {
    before: 'The decline of each ',
    after: ' species may indicate wider damage to the wetland.',
    translation: '每一种两栖动物数量的下降都可能表明湿地遭受了更广泛的破坏。',
  },
  horn: {
    before: 'Illegal traders often target animals for their ',
    after: ' rather than their meat.',
    translation: '非法商贩捕杀这些动物，往往是为了获取兽角而不是肉。',
  },
  'tame nature': {
    before: 'Early settlers believed they could ',
    after: ', but floods repeatedly exposed the limits of that ambition.',
    translation: '早期定居者以为能够征服自然，但一次次洪水暴露了这种企图的局限。',
  },
  sheepdog: {
    before: 'A well-trained ',
    after: ' can guide an entire flock with very little assistance.',
    translation: '训练有素的牧羊犬几乎无需协助就能引导整个羊群。',
  },
  synthesise: {
    before: 'Students must ',
    after: ' evidence from several sources rather than summarise one article.',
    translation: '学生必须综合多个来源的证据，而不是只概述一篇文章。',
  },
  displace: {
    before: 'Rising sea levels could ',
    after: ' millions of people living in coastal regions.',
    translation: '海平面上升可能迫使数百万沿海居民迁离家园。',
  },
  questionnaire: {
    before: 'The researchers tested the ',
    after: ' with a small group before conducting the national survey.',
    translation: '研究人员在开展全国调查前，先用一个小组测试了问卷。',
  },
  overestimate: {
    before: 'People often ',
    after: ' how much information they can remember after one reading.',
    translation: '人们常常高估自己阅读一遍后能够记住的信息量。',
  },
  scholarship: {
    before: 'The ',
    after: ' allowed her to continue her studies without taking on additional debt.',
    translation: '这笔奖学金使她能够继续学业，而不必承担更多债务。',
  },
  debate: {
    before: 'Experts continue to ',
    after: ' whether economic growth can be separated from environmental damage.',
    translation: '专家们仍在讨论经济增长能否与环境破坏脱钩。',
  },
  concertmaster: {
    before: 'The ',
    after: ' led the orchestra in tuning before the conductor arrived.',
    translation: '指挥到场前，首席小提琴手带领乐团调音。',
  },
  sponsorship: {
    before: 'Corporate ',
    after: ' enabled the museum to offer free admission to students.',
    translation: '企业赞助使博物馆能够向学生免费开放。',
  },
  adorn: {
    before: 'Local artists were invited to ',
    after: ' the station walls with colourful murals.',
    translation: '当地艺术家受邀用彩色壁画装饰车站墙面。',
  },
  thready: {
    before: 'The patient had a weak, ',
    after: ' pulse and required immediate medical attention.',
    translation: '病人的脉搏微弱而细速，需要立即接受治疗。',
  },
  stringy: {
    before: 'The vegetables became ',
    after: ' because they had been cooked for too long.',
    translation: '这些蔬菜因为烹煮时间过长而变得又老又韧。',
  },
  turnip: {
    before: 'The farmer planted ',
    after: ' alongside other crops that grow well in cool weather.',
    translation: '农民种植了芜菁以及其他适合凉爽气候的作物。',
  },
  acidic: {
    before: 'Some aquatic species cannot survive when the water becomes too ',
    after: '.',
    translation: '当水体酸性过强时，一些水生物种无法生存。',
  },
  shred: {
    before: 'Please ',
    after: ' confidential documents before placing them in the recycling bin.',
    translation: '请先粉碎机密文件，再把它们放入回收箱。',
  },
  escalator: {
    before: 'The station installed a new ',
    after: ' to improve access for passengers carrying luggage.',
    translation: '车站安装了一部新自动扶梯，方便携带行李的乘客通行。',
  },
  furnish: {
    before: 'The charity helped ',
    after: ' temporary homes for families displaced by the fire.',
    translation: '该慈善机构帮助为因火灾流离失所的家庭布置临时住所。',
  },
  department: {
    before: 'The health ',
    after: ' launched a campaign to encourage childhood vaccination.',
    translation: '卫生部门发起了一项鼓励儿童接种疫苗的宣传活动。',
  },
  institute: {
    before: 'The research ',
    after: ' publishes independent reports on public health policy.',
    translation: '这家研究机构发布有关公共卫生政策的独立报告。',
  },
  federation: {
    before: 'Each state retains considerable authority within the ',
    after: '.',
    translation: '联邦中的每个州都保留着相当大的权力。',
  },
  clarification: {
    before: 'The committee requested further ',
    after: ' before approving the proposed regulation.',
    translation: '委员会要求作出进一步说明，然后才会批准拟议法规。',
  },
  declination: {
    before: 'Navigators must account for magnetic ',
    after: ' when using a compass.',
    translation: '使用指南针时，导航人员必须考虑磁偏角。',
  },
  condemn: {
    before: 'International observers were quick to ',
    after: ' the attack on civilians.',
    translation: '国际观察人士迅速谴责了针对平民的袭击。',
  },
  false: {
    before: 'The report was withdrawn after several ',
    after: ' claims were discovered.',
    translation: '报告在被发现含有多项虚假说法后撤回。',
  },
  surname: {
    before: 'Applicants should write their ',
    after: ' exactly as it appears on their passport.',
    translation: '申请人应按照护照上的拼写填写姓氏。',
  },
  prescribe: {
    before: 'Doctors should not ',
    after: ' antibiotics when an infection is caused by a virus.',
    translation: '如果感染由病毒引起，医生不应开抗生素。',
  },
  temperate: {
    before: 'Many crops grow well in a ',
    after: ' climate with moderate rainfall.',
    translation: '许多作物适合在降雨适中的温带气候中生长。',
  },
  irritant: {
    before: 'Air pollution can act as an ',
    after: ' and worsen existing breathing problems.',
    translation: '空气污染会成为刺激物，加重已有的呼吸问题。',
  },
  slothful: {
    before: 'A ',
    after: ' response to the crisis allowed the damage to spread.',
    translation: '对危机反应迟缓懒散，使损害进一步扩大。',
  },
  mutation: { before: 'A genetic ', after: ' may help a species adapt to a changing environment.', translation: '基因突变可能帮助物种适应不断变化的环境。' },
  'shade-tolerant': { before: 'These ', after: ' plants can grow beneath a dense forest canopy.', translation: '这些耐阴植物能够在茂密的森林冠层下生长。' },
  burgeon: { before: 'Online services began to ', after: ' as more households gained internet access.', translation: '随着更多家庭接入互联网，在线服务开始迅速发展。' },
  alga: { before: 'A single ', after: ' can multiply rapidly when the water is warm and rich in nutrients.', translation: '水温较高且营养丰富时，单个藻类也能迅速繁殖。' },
  queue: { before: 'Passengers formed a long ', after: ' outside the station after the trains were cancelled.', translation: '列车停运后，乘客在车站外排起了长队。' },
  multimedia: { before: 'The course uses ', after: ' to present complex scientific ideas more clearly.', translation: '这门课程利用多媒体更清楚地呈现复杂的科学概念。' },
  prefix: { before: 'Adding a ', after: ' can completely change the meaning of an English word.', translation: '添加前缀可能会彻底改变英语单词的含义。' },
  simulative: { before: 'The laboratory provides a ', after: ' environment in which trainees can practise emergency procedures.', translation: '实验室提供模拟环境，供学员练习应急程序。' },
  'plunge whole-heartedly': { before: 'New researchers should not ', after: ' into a project before understanding its ethical risks.', translation: '新研究人员在了解项目的伦理风险前，不应全身心贸然投入其中。' },
  'take a bow': { before: 'The performers returned to the stage to ', after: ' after a long round of applause.', translation: '长时间的掌声过后，演员们回到舞台谢幕。' },
  stationer: { before: 'The local ', after: ' supplies notebooks and art materials to several nearby schools.', translation: '当地文具商为附近多所学校供应笔记本和美术用品。' },
  cementer: { before: 'The experienced ', after: ' ensured that the concrete surface was smooth and level.', translation: '经验丰富的水泥工确保混凝土表面平整光滑。' },
  icon: { before: 'The red telephone box has become a cultural ', after: ' recognised around the world.', translation: '红色电话亭已成为享誉世界的文化标志。' },
  cosplay: { before: 'The convention attracts thousands of ', after: ' enthusiasts dressed as fictional characters.', translation: '这场展会吸引了数千名装扮成虚构角色的角色扮演爱好者。' },
  eggplant: { before: 'Roasted ', after: ' is widely used in dishes across the Mediterranean region.', translation: '烤茄子广泛用于地中海地区的菜肴。' },
  'an odd fish': { before: 'His colleagues considered him ', after: ' because he preferred working alone at night.', translation: '同事们觉得他是个怪人，因为他喜欢夜间独自工作。' },
  wasabi: { before: 'A small amount of ', after: ' gives the dish a sharp and distinctive flavour.', translation: '少量芥末就能给菜肴带来辛辣而独特的味道。' },
  toaster: { before: 'The hotel replaced every faulty ', after: ' after a guest reported an electrical smell.', translation: '一名客人报告有电器焦味后，酒店更换了所有故障烤面包机。' },
  handrail: { before: 'A secure ', after: ' can reduce the risk of falls on steep staircases.', translation: '牢固的扶手可以降低人们在陡峭楼梯上摔倒的风险。' },
  urbanise: { before: 'Governments should not ', after: ' rural land without considering food security and wildlife.', translation: '政府不应在忽视粮食安全和野生动物的情况下将农村土地城市化。' },
  malfunction: { before: 'A minor software error caused the monitoring system to ', after: ' during the test.', translation: '一个小的软件错误导致监测系统在测试期间发生故障。' },
  viaduct: { before: 'The historic ', after: ' carries the railway across a deep valley.', translation: '这座历史悠久的高架桥承载铁路跨越深谷。' },
  pharaoh: { before: 'The tomb was built for a ', after: ' who ruled Egypt more than three thousand years ago.', translation: '这座陵墓是为一位三千多年前统治埃及的法老修建的。' },
  'a traffic jam': { before: 'A minor collision caused ', after: ' that lasted for nearly two hours.', translation: '一次轻微碰撞造成了持续近两小时的交通堵塞。' },
  'traffic congestion': { before: 'Better public transport could reduce ', after: ' in the city centre.', translation: '更完善的公共交通可以缓解市中心的交通拥堵。' },
  honk: { before: 'Drivers should not ', after: ' near hospitals unless there is an immediate danger.', translation: '除非出现紧急危险，驾驶员不应在医院附近鸣笛。' },
  democratise: { before: 'Affordable online courses can ', after: ' access to high-quality education.', translation: '价格亲民的在线课程能够推动优质教育机会的普及。' },
  bureaucratism: { before: 'Excessive ', after: ' can delay urgent public projects and frustrate citizens.', translation: '过度官僚主义会拖延紧急公共项目，并令市民感到不满。' },
  premiership: { before: 'During her ', after: ', the government introduced major reforms to public health.', translation: '在她担任首相期间，政府推行了重要的公共卫生改革。' },
  'establish a nation': { before: 'Shared institutions and public trust are essential to ', after: ' after a prolonged conflict.', translation: '长期冲突结束后，共同的制度和公众信任是建立国家的必要条件。' },
  commercialise: { before: 'The university plans to ', after: ' the invention while keeping the patent publicly accountable.', translation: '这所大学计划将该发明商业化，同时确保专利受到公共监督。' },
  humiliate: { before: 'Teachers should correct mistakes without trying to ', after: ' students in front of their classmates.', translation: '教师应纠正错误，但不应试图当着同学的面羞辱学生。' },
  baptise: { before: 'The family chose to ', after: ' the child in the village church.', translation: '这家人选择在村里的教堂为孩子施洗。' },
  obsess: { before: 'Young people should not ', after: ' over every image they see on social media.', translation: '年轻人不应对社交媒体上看到的每张图片都过度纠结。' },
  astonish: { before: 'The speed of the medical breakthrough continued to ', after: ' researchers around the world.', translation: '这项医学突破的速度继续令世界各地的研究人员惊叹。' },
  terrify: { before: 'Graphic warnings may ', after: ' some viewers without helping them understand the actual risk.', translation: '直观而刺激的警示可能吓坏一些观众，却不能帮助他们理解真实风险。' },
  kidnap: { before: 'The gang attempted to ', after: ' a businessman and demand a large ransom.', translation: '该团伙企图绑架一名商人并索要巨额赎金。' },
  hijack: { before: 'Modern security systems make it far more difficult to ', after: ' a commercial aircraft.', translation: '现代安保系统使劫持民航客机变得困难得多。' },
  eyelash: { before: 'A tiny particle trapped beneath an ', after: ' can cause considerable discomfort.', translation: '睫毛下卡住的一粒微小颗粒也会造成明显不适。' },
  snore: { before: 'People who ', after: ' heavily may need to be checked for sleep apnoea.', translation: '鼾声很大的人可能需要检查是否患有睡眠呼吸暂停。' },
  doze: { before: 'Several passengers began to ', after: ' during the long and quiet journey.', translation: '在漫长而安静的旅途中，几名乘客开始打瞌睡。' },
  pimple: { before: 'A single ', after: ' is usually harmless and should not be treated with strong medication.', translation: '单个粉刺通常无害，不应使用强效药物处理。' },
  embarrass: { before: 'Public criticism can ', after: ' employees and discourage them from asking for help.', translation: '公开批评会使员工难堪，并让他们不敢寻求帮助。' },
};

const bookContent = bookContentData as Record<string, ExampleSentence>;
const wordnetRelations = wordnetRelationsData as Record<string, string[]>;

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

function grammarFormNote(source: string) {
  const marker = source.match(/^\s*(n|v|adj|adv)\s*\./i)?.[1]?.toLowerCase();
  if (marker === 'n') return '名词形式';
  if (marker === 'v') return '动词形式';
  if (marker === 'adj') return '形容词形式';
  if (marker === 'adv') return '副词形式';
  return '';
}

function sourceHintExplanation(sourceHint: string, matchEnd: number, phrase: string) {
  const remainder = sourceHint.slice(matchEnd);
  const chinese = remainder
    .replace(/^\s*(?:n|v|adj|adv)\s*\.?\s*/i, '')
    .match(/^[：:，,；;。．.\s]*([\u3400-\u9fff][\u3400-\u9fff、，；（）()·…\s]*)/)?.[1]
    ?.trim()
    .replace(/[，；。]+$/, '');
  if (chinese) return chinese;
  return chineseMeaningByWord[phrase.toLowerCase()] ?? grammarFormNote(remainder);
}

function sourceHintRelations(word: string, sourceHint?: string): RelatedWord[] {
  if (!sourceHint) return [];
  const candidatePattern = /[A-Za-z][A-Za-z'’~\-]*(?:\s+[A-Za-z][A-Za-z'’~\-]*)*/g;
  const ignored = new Set(['n', 'v', 'adj', 'adv', 'a', 'sb', 'sth', 'of', 'to', 'and', 'or', 'the']);
  const seen = new Set<string>();
  return Array.from(sourceHint.matchAll(candidatePattern)).flatMap((match) => {
    const candidate = match[0];
    let phrase = candidate.replace(/[’]/g, "'").replace(/\s+(?:n|v|adj|adv)$/i, '').trim();
    if (ignored.has(phrase.toLowerCase()) || phrase.length < 3) return [];
    if (phrase.includes('~')) phrase = phrase.replace(/~/g, ' ' + word + ' ').replace(/\s+/g, ' ').trim();
    if (phrase.toLowerCase() === word.toLowerCase() || seen.has(phrase.toLowerCase())) return [];
    const note = sourceHintExplanation(sourceHint, (match.index ?? 0) + candidate.length, phrase);
    if (!note) return [];
    seen.add(phrase.toLowerCase());
    return [{ word: phrase, note }];
  });
}

function localiseRelationNote(note: string) {
  return note
    .replace(/^adj\.\s*/i, '形容词形式：')
    .replace(/^adv\.\s*/i, '副词形式：')
    .replace(/^n\.\s*/i, '名词形式：')
    .replace(/^v\.\s*/i, '动词形式：');
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
  return bookContent[word.word.toLowerCase()] ?? null;
}

export function getRelatedWords(word: string, sourceHint?: string, chineseMeaning?: string) {
  const key = word.toLowerCase();
  const all = [
    ...(relatedWords[key] ?? []),
    ...(irregularVerbs[key] ?? []),
    ...(wordnetRelations[key] ?? []).flatMap((related) => {
      const note = chineseMeaningByWord[related.toLowerCase()];
      return note ? [{ word: related, note }] : [];
    }),
    ...sourceHintRelations(word, sourceHint),
  ].map((item) => ({ ...item, note: localiseRelationNote(item.note) }));
  const seen = new Set<string>();
  const filtered = all.filter((item) => {
    const identity = item.word.toLowerCase();
    if (seen.has(identity)) return false;
    seen.add(identity);
    return true;
  }).slice(0, 6);
  if (filtered.length > 0) return filtered;

  const example = featured[key] ?? bookContent[key];
  if (!example) return [];
  const leftWords = example.before.match(/[A-Za-z']+/g) ?? [];
  const rightWords = example.after.match(/[A-Za-z']+/g) ?? [];
  const phrase = [...leftWords.slice(-2), word, ...rightWords.slice(0, 1)].join(' ');
  return [{ word: phrase, note: chineseMeaning ?? chineseMeaningByWord[key] ?? '常用短语' }];
}
