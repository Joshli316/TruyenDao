import { t, getLang } from '../i18n';
import { setCleanup } from '../main';
import { renderFooter } from '../shared/footer';
import { setPageMeta } from '../shared/page-meta';

interface BiText {
  en: string;
  vi: string;
}

interface Chapter {
  number: string;
  heading: BiText;
  body: BiText;
}

const chapters: Chapter[] = [
  {
    number: 'I',
    heading: {
      en: 'The Price of Faith',
      vi: 'Gi\u00e1 c\u1ee7a \u0110\u1ee9c Tin'
    },
    body: {
      en: 'Vietnam saw some of the most intense Christian persecutions in Asian history. Between 1625 and 1886, an estimated 100,000\u2013300,000 Christians were killed for their faith across the Nguy\u1ec5n domains and the unified empire. What began as suspicion of a foreign religion escalated into centuries of systematic violence \u2014 edicts, executions, and the erasure of entire Christian villages. This is the story of those who refused to renounce their faith, and the 117 who were raised to the altars of the universal Church.',
      vi: 'Vi\u1ec7t Nam ch\u1ee9ng ki\u1ebfn m\u1ed9t trong nh\u1eefng cu\u1ed9c b\u00e1ch h\u1ea1i Kit\u00f4 gi\u00e1o kh\u1ed1c li\u1ec7t nh\u1ea5t trong l\u1ecbch s\u1eed ch\u00e2u \u00c1. T\u1eeb n\u0103m 1625 \u0111\u1ebfn 1886, \u01b0\u1edbc t\u00ednh kho\u1ea3ng 100.000\u2013300.000 Kit\u00f4 h\u1eefu \u0111\u00e3 b\u1ecb gi\u1ebft v\u00ec \u0111\u1ee9c tin tr\u00ean kh\u1eafp c\u00e1c v\u00f9ng \u0111\u1ea5t nh\u00e0 Nguy\u1ec5n v\u00e0 \u0111\u1ebf ch\u1ebf th\u1ed1ng nh\u1ea5t. \u0110i\u1ec1u b\u1eaft \u0111\u1ea7u t\u1eeb s\u1ef1 nghi ng\u1edd v\u1ec1 m\u1ed9t t\u00f4n gi\u00e1o ngo\u1ea1i lai \u0111\u00e3 leo thang th\u00e0nh nhi\u1ec1u th\u1ebf k\u1ef7 b\u1ea1o l\u1ef1c c\u00f3 h\u1ec7 th\u1ed1ng \u2014 s\u1eafc l\u1ec7nh, h\u00e0nh quy\u1ebft, v\u00e0 x\u00f3a s\u1ed5 to\u00e0n b\u1ed9 c\u00e1c l\u00e0ng Kit\u00f4 gi\u00e1o. \u0110\u00e2y l\u00e0 c\u00e2u chuy\u1ec7n c\u1ee7a nh\u1eefng ng\u01b0\u1eddi t\u1eeb ch\u1ed1i b\u1ecf \u0111\u1ea1o, v\u00e0 117 v\u1ecb \u0111\u00e3 \u0111\u01b0\u1ee3c t\u00f4n vinh tr\u00ean b\u00e0n th\u1edd c\u1ee7a Gi\u00e1o h\u1ed9i ho\u00e0n v\u0169.'
    }
  },
  {
    number: 'II',
    heading: {
      en: 'The Minh M\u1ea1ng Era (1820\u20131841)',
      vi: 'Th\u1eddi Minh M\u1ea1ng (1820\u20131841)'
    },
    body: {
      en: 'Emperor Minh M\u1ea1ng viewed Christianity as a direct threat to the Confucian moral order that underpinned his authority. His 1833 edict ordered the destruction of all churches and commanded Christians to trample on the cross \u2014 the act of \u201c\u0111\u1ea1p \u1ea3nh\u201d \u2014 as proof of apostasy. Missionaries who refused to leave were to be thrown into the sea. Vietnamese priests and catechists faced imprisonment, torture, and execution. The edict triggered the first great wave of martyrdoms, as thousands chose death over the desecration of the cross beneath their feet.',
      vi: 'Ho\u00e0ng \u0111\u1ebf Minh M\u1ea1ng coi Kit\u00f4 gi\u00e1o l\u00e0 m\u1ed1i \u0111e d\u1ecda tr\u1ef1c ti\u1ebfp \u0111\u1ebfn tr\u1eadt t\u1ef1 \u0111\u1ea1o \u0111\u1ee9c Nho gi\u00e1o v\u1ed1n l\u00e0 n\u1ec1n t\u1ea3ng quy\u1ec1n l\u1ef1c c\u1ee7a \u00f4ng. S\u1eafc l\u1ec7nh n\u0103m 1833 ra l\u1ec7nh ph\u00e1 h\u1ee7y t\u1ea5t c\u1ea3 nh\u00e0 th\u1edd v\u00e0 b\u1eaft bu\u1ed9c Kit\u00f4 h\u1eefu ph\u1ea3i gi\u1eabm l\u00ean th\u00e1nh gi\u00e1 \u2014 h\u00e0nh \u0111\u1ed9ng \u201c\u0111\u1ea1p \u1ea3nh\u201d \u2014 \u0111\u1ec3 ch\u1ee9ng minh vi\u1ec7c b\u1ecf \u0111\u1ea1o. Nh\u1eefng nh\u00e0 truy\u1ec1n gi\u00e1o t\u1eeb ch\u1ed1i r\u1eddi \u0111i s\u1ebd b\u1ecb n\u00e9m xu\u1ed1ng bi\u1ec3n. C\u00e1c linh m\u1ee5c v\u00e0 th\u1ea7y gi\u1ea3ng Vi\u1ec7t Nam ph\u1ea3i \u0111\u1ed1i m\u1eb7t v\u1edbi t\u00f9 \u0111\u00e0y, tra t\u1ea5n, v\u00e0 h\u00e0nh quy\u1ebft. S\u1eafc l\u1ec7nh \u0111\u00e3 ch\u00e2m ng\u00f2i l\u00e0n s\u00f3ng t\u1eed \u0111\u1ea1o l\u1edbn \u0111\u1ea7u ti\u00ean, khi h\u00e0ng ngh\u00ecn ng\u01b0\u1eddi ch\u1ecdn c\u00e1i ch\u1ebft h\u01a1n l\u00e0 x\u00fac ph\u1ea1m th\u00e1nh gi\u00e1 d\u01b0\u1edbi ch\u00e2n m\u00ecnh.'
    }
  },
  {
    number: 'III',
    heading: {
      en: 'The Thi\u1ec7u Tr\u1ecb Era (1841\u20131847)',
      vi: 'Th\u1eddi Thi\u1ec7u Tr\u1ecb (1841\u20131847)'
    },
    body: {
      en: 'Emperor Thi\u1ec7u Tr\u1ecb continued his father\u2019s anti-Christian policies with equal severity. Foreign missionaries were hunted, Vietnamese Christians faced ongoing persecution, and the machinery of suppression ground on. The international consequences arrived in 1847, when French warships under Captain Lapierre bombarded \u0110\u00e0 N\u1eb5ng harbor in retaliation for the persecution of French missionaries \u2014 an act of gunboat diplomacy that foreshadowed the full French colonial conquest to come. The persecutions had drawn the attention of European powers, and Vietnam\u2019s fate was being sealed.',
      vi: 'Ho\u00e0ng \u0111\u1ebf Thi\u1ec7u Tr\u1ecb ti\u1ebfp t\u1ee5c ch\u00ednh s\u00e1ch ch\u1ed1ng Kit\u00f4 gi\u00e1o c\u1ee7a cha m\u00ecnh v\u1edbi m\u1ee9c \u0111\u1ed9 kh\u1ed1c li\u1ec7t t\u01b0\u01a1ng \u0111\u01b0\u01a1ng. C\u00e1c nh\u00e0 truy\u1ec1n gi\u00e1o n\u01b0\u1edbc ngo\u00e0i b\u1ecb truy l\u00f9ng, Kit\u00f4 h\u1eefu Vi\u1ec7t Nam ti\u1ebfp t\u1ee5c b\u1ecb b\u00e1ch h\u1ea1i, v\u00e0 b\u1ed9 m\u00e1y \u0111\u00e0n \u00e1p v\u1eabn ti\u1ebfp t\u1ee5c nghi\u1ec1n n\u00e1t. H\u1eadu qu\u1ea3 qu\u1ed1c t\u1ebf \u0111\u1ebfn v\u00e0o n\u0103m 1847, khi t\u00e0u chi\u1ebfn Ph\u00e1p d\u01b0\u1edbi quy\u1ec1n ch\u1ec9 huy c\u1ee7a \u0110\u1ea1i t\u00e1 Lapierre n\u1ed5 s\u00fang b\u1eafn ph\u00e1 c\u1ea3ng \u0110\u00e0 N\u1eb5ng \u0111\u1ec3 tr\u1ea3 \u0111\u0169a vi\u1ec7c b\u00e1ch h\u1ea1i c\u00e1c nh\u00e0 truy\u1ec1n gi\u00e1o Ph\u00e1p \u2014 m\u1ed9t h\u00e0nh \u0111\u1ed9ng ngo\u1ea1i giao ph\u00e1o h\u1ea1m b\u00e1o tr\u01b0\u1edbc cu\u1ed9c chinh ph\u1ee5c thu\u1ed9c \u0111\u1ecba to\u00e0n di\u1ec7n c\u1ee7a Ph\u00e1p s\u1eafp t\u1edbi. Nh\u1eefng cu\u1ed9c b\u00e1ch h\u1ea1i \u0111\u00e3 thu h\u00fat s\u1ef1 ch\u00fa \u00fd c\u1ee7a c\u00e1c c\u01b0\u1eddng qu\u1ed1c ch\u00e2u \u00c2u, v\u00e0 s\u1ed1 ph\u1eadn c\u1ee7a Vi\u1ec7t Nam \u0111ang d\u1ea7n \u0111\u01b0\u1ee3c \u0111\u1ecbnh \u0111o\u1ea1t.'
    }
  },
  {
    number: 'IV',
    heading: {
      en: 'The T\u1ef1 \u0110\u1ee9c Era (1847\u20131883)',
      vi: 'Th\u1eddi T\u1ef1 \u0110\u1ee9c (1847\u20131883)'
    },
    body: {
      en: 'The most severe persecutions came under Emperor T\u1ef1 \u0110\u1ee9c. He ordered Christians branded on the face with the characters \u201ct\u1ea3 \u0111\u1ea1o\u201d \u2014 meaning \u201cleft religion\u201d or \u201cfalse religion\u201d \u2014 a permanent mark of shame visible to all. Families were forcibly separated: Christian parents sent to one province, their children to another, to be raised by non-Christian households. Entire villages suspected of harboring the faith were razed to the ground. The French used these atrocities as justification for military intervention, culminating in the capture of Saigon in 1859 and the Treaty of Saigon in 1862. The martyrs\u2019 blood became the pretext for empire.',
      vi: 'Nh\u1eefng cu\u1ed9c b\u00e1ch h\u1ea1i kh\u1ed1c li\u1ec7t nh\u1ea5t di\u1ec5n ra d\u01b0\u1edbi th\u1eddi Ho\u00e0ng \u0111\u1ebf T\u1ef1 \u0110\u1ee9c. \u00d4ng ra l\u1ec7nh kh\u1eafc ch\u1eef \u201ct\u1ea3 \u0111\u1ea1o\u201d l\u00ean m\u1eb7t Kit\u00f4 h\u1eefu \u2014 ngh\u0129a l\u00e0 \u201ct\u00f4n gi\u00e1o sai l\u1ea1c\u201d \u2014 m\u1ed9t d\u1ea5u \u1ea5n s\u1ec9 nh\u1ee5c v\u0129nh vi\u1ec5n m\u00e0 ai c\u0169ng nh\u00ecn th\u1ea5y. C\u00e1c gia \u0111\u00ecnh b\u1ecb c\u01b0\u1ee1ng b\u1ee9c chia t\u00e1ch: cha m\u1eb9 Kit\u00f4 gi\u00e1o b\u1ecb \u0111\u01b0a \u0111\u1ebfn m\u1ed9t t\u1ec9nh, con c\u00e1i \u0111\u1ebfn t\u1ec9nh kh\u00e1c, \u0111\u1ec3 \u0111\u01b0\u1ee3c nu\u00f4i d\u01b0\u1ee1ng b\u1edfi c\u00e1c h\u1ed9 kh\u00f4ng theo \u0111\u1ea1o. To\u00e0n b\u1ed9 c\u00e1c l\u00e0ng b\u1ecb nghi ng\u1edd che gi\u1ea5u \u0111\u1ee9c tin \u0111\u1ec1u b\u1ecb san b\u1eb1ng. Ng\u01b0\u1eddi Ph\u00e1p \u0111\u00e3 d\u00f9ng nh\u1eefng h\u00e0nh \u0111\u1ed9ng t\u00e0n b\u1ea1o n\u00e0y l\u00e0m c\u1edb cho s\u1ef1 can thi\u1ec7p qu\u00e2n s\u1ef1, \u0111\u1ec9nh \u0111i\u1ec3m l\u00e0 vi\u1ec7c chi\u1ebfm S\u00e0i G\u00f2n n\u0103m 1859 v\u00e0 Hi\u1ec7p \u01b0\u1edbc S\u00e0i G\u00f2n n\u0103m 1862. M\u00e1u c\u1ee7a c\u00e1c v\u1ecb t\u1eed \u0111\u1ea1o \u0111\u00e3 tr\u1edf th\u00e0nh c\u00e1i c\u1edb cho \u0111\u1ebf ch\u1ebf.'
    }
  },
  {
    number: 'V',
    heading: {
      en: 'The 117',
      vi: '117 Th\u00e1nh T\u1eed \u0110\u1ea1o'
    },
    body: {
      en: 'On June 19, 1988, Pope John Paul II canonized 117 martyrs who died for their faith in Vietnam \u2014 the largest single-country group canonization in Catholic history. The 117 saints include 96 Vietnamese, 11 Spanish Dominicans, and 10 French members of the Paris Foreign Missions Society. Among them: 8 bishops, 50 priests, and 59 lay people \u2014 catechists, soldiers, farmers, mothers, and a 19-year-old boy. They were killed by beheading, strangulation, burning, drowning, and dismemberment across three imperial reigns. Their canonization was not merely a religious act; it was the recognition that ordinary Vietnamese men and women had, for 260 years, chosen death over apostasy.',
      vi: 'Ng\u00e0y 19 th\u00e1ng 6 n\u0103m 1988, \u0110\u1ee9c Gi\u00e1o ho\u00e0ng Gioan Phaol\u00f4 II phong th\u00e1nh cho 117 v\u1ecb t\u1eed \u0111\u1ea1o \u0111\u00e3 ch\u1ebft v\u00ec \u0111\u1ee9c tin t\u1ea1i Vi\u1ec7t Nam \u2014 l\u1ea7n phong th\u00e1nh \u0111\u00f4ng nh\u1ea5t cho m\u1ed9t qu\u1ed1c gia trong l\u1ecbch s\u1eed C\u00f4ng gi\u00e1o. 117 th\u00e1nh bao g\u1ed3m 96 ng\u01b0\u1eddi Vi\u1ec7t, 11 tu s\u0129 D\u00f2ng \u0110a Minh T\u00e2y Ban Nha, v\u00e0 10 th\u00e0nh vi\u00ean H\u1ed9i Truy\u1ec1n gi\u00e1o Paris. Trong s\u1ed1 \u0111\u00f3: 8 gi\u00e1m m\u1ee5c, 50 linh m\u1ee5c, v\u00e0 59 gi\u00e1o d\u00e2n \u2014 th\u1ea7y gi\u1ea3ng, binh s\u0129, n\u00f4ng d\u00e2n, c\u00e1c b\u00e0 m\u1eb9, v\u00e0 m\u1ed9t ch\u00e0ng trai 19 tu\u1ed5i. H\u1ecd b\u1ecb gi\u1ebft b\u1eb1ng ch\u00e9m \u0111\u1ea7u, xi\u1ebft c\u1ed5, thi\u00eau s\u1ed1ng, d\u00ecm n\u01b0\u1edbc, v\u00e0 ph\u00e2n th\u00e2y qua ba tri\u1ec1u \u0111\u1ea1i. Vi\u1ec7c phong th\u00e1nh kh\u00f4ng ch\u1ec9 l\u00e0 m\u1ed9t h\u00e0nh \u0111\u1ed9ng t\u00f4n gi\u00e1o; \u0111\u00f3 l\u00e0 s\u1ef1 c\u00f4ng nh\u1eadn r\u1eb1ng nh\u1eefng ng\u01b0\u1eddi Vi\u1ec7t Nam b\u00ecnh th\u01b0\u1eddng \u0111\u00e3, su\u1ed1t 260 n\u0103m, ch\u1ecdn c\u00e1i ch\u1ebft h\u01a1n l\u00e0 b\u1ecf \u0111\u1ea1o.'
    }
  },
  {
    number: 'VI',
    heading: {
      en: 'Andrew of Ph\u00fa Y\u00ean',
      vi: 'Anr\u00ea Ph\u00fa Y\u00ean'
    },
    body: {
      en: 'Andr\u00e9 of Ph\u00fa Y\u00ean is considered the first Vietnamese martyr. A 19-year-old catechist trained by the Jesuit Alexandre de Rhodes, he was arrested in 1644 for refusing to renounce his faith. Before his execution by lance, he proclaimed: \u201cI am a Christian. I will be a Christian until death.\u201d His courage left a deep impression on de Rhodes, who recorded the account and carried it back to Europe. Andr\u00e9\u2019s death at such a young age became a founding story of Vietnamese Catholic identity \u2014 proof that the faith had taken root deeply enough to produce its own witnesses within a single generation of its arrival.',
      vi: 'Anr\u00ea Ph\u00fa Y\u00ean \u0111\u01b0\u1ee3c coi l\u00e0 v\u1ecb t\u1eed \u0111\u1ea1o \u0111\u1ea7u ti\u00ean c\u1ee7a Vi\u1ec7t Nam. L\u00e0 m\u1ed9t th\u1ea7y gi\u1ea3ng 19 tu\u1ed5i \u0111\u01b0\u1ee3c \u0111\u00e0o t\u1ea1o b\u1edfi nh\u00e0 truy\u1ec1n gi\u00e1o D\u00f2ng T\u00ean Alexandre de Rhodes, anh b\u1ecb b\u1eaft n\u0103m 1644 v\u00ec t\u1eeb ch\u1ed1i b\u1ecf \u0111\u1ea1o. Tr\u01b0\u1edbc khi b\u1ecb h\u00e0nh quy\u1ebft b\u1eb1ng gi\u00e1o, anh tuy\u00ean b\u1ed1: \u201cT\u00f4i l\u00e0 Kit\u00f4 h\u1eefu. T\u00f4i s\u1ebd l\u00e0 Kit\u00f4 h\u1eefu cho \u0111\u1ebfn ch\u1ebft.\u201d S\u1ef1 can \u0111\u1ea3m c\u1ee7a anh \u0111\u1ec3 l\u1ea1i \u1ea5n t\u01b0\u1ee3ng s\u00e2u s\u1eafc v\u1edbi de Rhodes, ng\u01b0\u1eddi \u0111\u00e3 ghi l\u1ea1i c\u00e2u chuy\u1ec7n v\u00e0 mang v\u1ec1 ch\u00e2u \u00c2u. C\u00e1i ch\u1ebft c\u1ee7a Anr\u00ea \u1edf \u0111\u1ed9 tu\u1ed5i tr\u1ebb nh\u01b0 v\u1eady \u0111\u00e3 tr\u1edf th\u00e0nh c\u00e2u chuy\u1ec7n n\u1ec1n t\u1ea3ng c\u1ee7a b\u1ea3n s\u1eafc C\u00f4ng gi\u00e1o Vi\u1ec7t Nam \u2014 b\u1eb1ng ch\u1ee9ng r\u1eb1ng \u0111\u1ee9c tin \u0111\u00e3 \u0103n r\u1ec5 s\u00e2u \u0111\u1ee7 \u0111\u1ec3 sinh ra nh\u1eefng ch\u1ee9ng nh\u00e2n c\u1ee7a ri\u00eang m\u00ecnh ch\u1ec9 trong m\u1ed9t th\u1ebf h\u1ec7 k\u1ec3 t\u1eeb khi \u0111\u1ebfn.'
    }
  },
  {
    number: 'VII',
    heading: {
      en: 'Legacy',
      vi: 'Di s\u1ea3n'
    },
    body: {
      en: 'The 117 Vietnamese Martyrs are celebrated every year on November 24 \u2014 the Feast of the Vietnamese Martyrs. In parishes across Vietnam and the Vietnamese diaspora, from Ho Chi Minh City to Orange County, California, the day is marked with special Masses, processions, and the retelling of the martyrs\u2019 stories. Their legacy shapes Vietnamese Catholic identity to this day: the conviction that faith is worth dying for, that ordinary people can become saints, and that the blood of the martyrs is indeed the seed of the Church. Of the roughly 8\u201310 million Christians in Vietnam today, the overwhelming majority trace their spiritual lineage through these centuries of suffering.',
      vi: '117 Th\u00e1nh T\u1eed \u0110\u1ea1o Vi\u1ec7t Nam \u0111\u01b0\u1ee3c m\u1eebng k\u00ednh h\u00e0ng n\u0103m v\u00e0o ng\u00e0y 24 th\u00e1ng 11 \u2014 L\u1ec5 c\u00e1c Th\u00e1nh T\u1eed \u0110\u1ea1o Vi\u1ec7t Nam. T\u1ea1i c\u00e1c gi\u00e1o x\u1ee9 kh\u1eafp Vi\u1ec7t Nam v\u00e0 c\u1ed9ng \u0111\u1ed3ng ng\u01b0\u1eddi Vi\u1ec7t h\u1ea3i ngo\u1ea1i, t\u1eeb Th\u00e0nh ph\u1ed1 H\u1ed3 Ch\u00ed Minh \u0111\u1ebfn Qu\u1eadn Cam, California, ng\u00e0y n\u00e0y \u0111\u01b0\u1ee3c \u0111\u00e1nh d\u1ea5u b\u1eb1ng Th\u00e1nh l\u1ec5 \u0111\u1eb7c bi\u1ec7t, r\u01b0\u1edbc ki\u1ec7u, v\u00e0 k\u1ec3 l\u1ea1i c\u00e2u chuy\u1ec7n c\u1ee7a c\u00e1c th\u00e1nh t\u1eed \u0111\u1ea1o. Di s\u1ea3n c\u1ee7a h\u1ecd \u0111\u1ecbnh h\u00ecnh b\u1ea3n s\u1eafc C\u00f4ng gi\u00e1o Vi\u1ec7t Nam cho \u0111\u1ebfn ng\u00e0y nay: ni\u1ec1m x\u00e1c t\u00edn r\u1eb1ng \u0111\u1ee9c tin \u0111\u00e1ng \u0111\u1ec3 ch\u1ebft, r\u1eb1ng ng\u01b0\u1eddi b\u00ecnh th\u01b0\u1eddng c\u00f3 th\u1ec3 tr\u1edf th\u00e0nh th\u00e1nh, v\u00e0 r\u1eb1ng m\u00e1u c\u1ee7a c\u00e1c v\u1ecb t\u1eed \u0111\u1ea1o th\u1ef1c s\u1ef1 l\u00e0 h\u1ea1t gi\u1ed1ng c\u1ee7a Gi\u00e1o h\u1ed9i. Trong s\u1ed1 kho\u1ea3ng 8\u201310 tri\u1ec7u Kit\u00f4 h\u1eefu t\u1ea1i Vi\u1ec7t Nam ng\u00e0y nay, \u0111\u1ea1i \u0111a s\u1ed1 truy t\u00ecm dòng ch\u1ea3y tâm linh c\u1ee7a m\u00ecnh qua nhi\u1ec1u th\u1ebf k\u1ef7 \u0111au kh\u1ed5 \u1ea5y.'
    }
  }
];

export async function renderMartyrs(): Promise<void> {
  const app = document.getElementById('app');
  if (!app) return;
  setPageMeta({ titleKey: 'meta.martyrs.title', descKey: 'meta.martyrs.description' });

  const lang = getLang();
  const loc = (obj: { en: string; vi: string }) => obj[lang] || obj.en;

  const pageTitle: BiText = {
    en: 'The 117 Vietnamese Martyrs',
    vi: '117 Th\u00e1nh T\u1eed \u0110\u1ea1o Vi\u1ec7t Nam'
  };

  const pageSubtitle: BiText = {
    en: 'The largest single-country canonization in Catholic history',
    vi: 'L\u1ea7n phong th\u00e1nh \u0111\u00f4ng nh\u1ea5t cho m\u1ed9t qu\u1ed1c gia trong l\u1ecbch s\u1eed C\u00f4ng gi\u00e1o'
  };

  const backText: BiText = {
    en: '\u2190 Back to Heritage',
    vi: '\u2190 V\u1ec1 Di s\u1ea3n'
  };

  const canonizationLabel: BiText = {
    en: 'Canonization breakdown',
    vi: 'Ph\u00e2n lo\u1ea1i phong th\u00e1nh'
  };

  const byNationality: BiText = {
    en: 'By nationality',
    vi: 'Theo qu\u1ed1c t\u1ecbch'
  };

  const byRole: BiText = {
    en: 'By role',
    vi: 'Theo vai tr\u00f2'
  };

  const statsData = {
    nationality: [
      { label: { en: 'Vietnamese', vi: 'Vi\u1ec7t Nam' }, value: 96 },
      { label: { en: 'Spanish', vi: 'T\u00e2y Ban Nha' }, value: 11 },
      { label: { en: 'French', vi: 'Ph\u00e1p' }, value: 10 }
    ],
    role: [
      { label: { en: 'Bishops', vi: 'Gi\u00e1m m\u1ee5c' }, value: 8 },
      { label: { en: 'Priests', vi: 'Linh m\u1ee5c' }, value: 50 },
      { label: { en: 'Lay people', vi: 'Gi\u00e1o d\u00e2n' }, value: 59 }
    ]
  };

  const chaptersHtml = chapters.map((ch, i) => `
    <article class="martyrs-chapter${i === 0 ? ' first' : ''}" style="
      max-width: 720px;
      margin: 0 auto;
      padding: var(--space-2xl) 0;
      ${i < chapters.length - 1 ? 'border-bottom: 1px solid var(--border-subtle);' : ''}
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    ">
      <div style="
        font-family: var(--font-mono);
        font-size: 13px;
        color: var(--accent-cinnabar);
        letter-spacing: 0.12em;
        margin-bottom: var(--space-sm);
      ">${ch.number}</div>
      <h2 style="
        font-family: var(--font-display);
        font-size: var(--text-2xl);
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: var(--space-lg);
        line-height: var(--leading-snug);
      ">${loc(ch.heading)}</h2>
      <p style="
        font-size: var(--text-base);
        line-height: var(--leading-relaxed);
        color: var(--text-secondary);
      ">${loc(ch.body)}</p>
      ${ch.number === 'V' ? `
        <div style="
          margin-top: var(--space-xl);
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          padding: var(--space-lg);
        ">
          <div style="
            font-family: var(--font-mono);
            font-size: 12px;
            color: var(--accent-gold);
            text-transform: uppercase;
            letter-spacing: 0.12em;
            margin-bottom: var(--space-md);
          ">${loc(canonizationLabel)}</div>

          <div style="margin-bottom: var(--space-md);">
            <div style="
              font-family: var(--font-display);
              font-size: 14px;
              color: var(--text-tertiary);
              margin-bottom: var(--space-sm);
            ">${loc(byNationality)}</div>
            <div style="display: flex; gap: var(--space-lg); flex-wrap: wrap;">
              ${statsData.nationality.map(s => `
                <div style="text-align: center; min-width: 80px;">
                  <div style="
                    font-family: var(--font-mono);
                    font-size: 28px;
                    font-weight: 700;
                    color: var(--accent-cinnabar);
                    line-height: 1;
                  ">${s.value}</div>
                  <div style="
                    font-size: 13px;
                    color: var(--text-tertiary);
                    margin-top: var(--space-xs);
                  ">${loc(s.label)}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div style="
            width: 100%;
            height: 1px;
            background: var(--border-subtle);
            margin: var(--space-md) 0;
          "></div>

          <div>
            <div style="
              font-family: var(--font-display);
              font-size: 14px;
              color: var(--text-tertiary);
              margin-bottom: var(--space-sm);
            ">${loc(byRole)}</div>
            <div style="display: flex; gap: var(--space-lg); flex-wrap: wrap;">
              ${statsData.role.map(s => `
                <div style="text-align: center; min-width: 80px;">
                  <div style="
                    font-family: var(--font-mono);
                    font-size: 28px;
                    font-weight: 700;
                    color: var(--accent-gold);
                    line-height: 1;
                  ">${s.value}</div>
                  <div style="
                    font-size: 13px;
                    color: var(--text-tertiary);
                    margin-top: var(--space-xs);
                  ">${loc(s.label)}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      ` : ''}
    </article>
  `).join(`
    <div style="
      width: 40px;
      height: 2px;
      background: var(--accent-gold);
      margin: 0 auto;
      opacity: 0.4;
    "></div>
  `);

  app.innerHTML = `
    <div class="section" style="padding-top: calc(64px + var(--space-2xl));">
      <a href="#/heritage" style="
        font-family: var(--font-body);
        font-size: 14px;
        color: var(--accent-gold);
        text-decoration: none;
        display: inline-block;
        margin-bottom: var(--space-lg);
        transition: color var(--transition-default);
      ">${loc(backText)}</a>

      <div style="
        font-family: var(--font-mono);
        font-size: 12px;
        color: var(--accent-cinnabar);
        text-transform: uppercase;
        letter-spacing: 0.15em;
        margin-bottom: var(--space-sm);
      ">${lang === 'vi' ? 'Di s\u1ea3n' : 'Heritage'}</div>

      <h1 style="
        font-size: var(--text-3xl);
        font-weight: 700;
        line-height: var(--leading-tight);
        margin-bottom: var(--space-md);
      ">${loc(pageTitle)}</h1>

      <p class="section-subtitle" style="
        color: var(--text-secondary);
        font-size: var(--text-lg);
        max-width: 640px;
      ">${loc(pageSubtitle)}</p>

      <div class="gold-divider"></div>

      ${chaptersHtml}
    </div>

    ${renderFooter()}
  `;

  // Scrollytelling: observe chapters and fade them in
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        (entry.target as HTMLElement).style.opacity = '1';
        (entry.target as HTMLElement).style.transform = 'translateY(0)';
      }
    });
  }, { rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.martyrs-chapter').forEach(el => {
    observer.observe(el);
  });

  // Show first chapter immediately
  const firstChapter = document.querySelector('.martyrs-chapter.first') as HTMLElement;
  if (firstChapter) {
    firstChapter.style.opacity = '1';
    firstChapter.style.transform = 'translateY(0)';
  }

  setCleanup(() => {
    observer.disconnect();
  });
}
