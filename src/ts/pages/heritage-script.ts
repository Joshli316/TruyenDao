import { t, getLang } from '../i18n';
import { setCleanup } from '../main';

interface BiText {
  en: string;
  vi: string;
}

interface Chapter {
  number: string;
  heading: BiText;
  body: BiText;
  special?: 'comparison' | 'tones';
}

const chapters: Chapter[] = [
  {
    number: 'I',
    heading: {
      en: 'The Gift of Letters',
      vi: '\u00c2n Ph\u1ea9m Ch\u1eef Vi\u1ebft'
    },
    body: {
      en: 'Vietnam is the only country in Asia whose modern national writing system was created by Christian missionaries. Today, over 100 million people write in ch\u1eef Qu\u1ed1c ng\u1eef \u2014 the \u201cnational language script\u201d \u2014 a romanized alphabet born not from colonial decree but from the evangelistic need to teach Vietnamese converts to read scripture. The missionaries who invented it are largely forgotten. The script they made is used by everyone.',
      vi: 'Vi\u1ec7t Nam l\u00e0 qu\u1ed1c gia duy nh\u1ea5t \u1edf ch\u00e2u \u00c1 c\u00f3 h\u1ec7 th\u1ed1ng ch\u1eef vi\u1ebft qu\u1ed1c gia hi\u1ec7n \u0111\u1ea1i \u0111\u01b0\u1ee3c t\u1ea1o ra b\u1edfi c\u00e1c nh\u00e0 truy\u1ec1n gi\u00e1o Kit\u00f4. Ng\u00e0y nay, h\u01a1n 100 tri\u1ec7u ng\u01b0\u1eddi vi\u1ebft b\u1eb1ng ch\u1eef Qu\u1ed1c ng\u1eef \u2014 b\u1ea3ng ch\u1eef c\u00e1i La-tinh h\u00f3a ra \u0111\u1eddi kh\u00f4ng ph\u1ea3i t\u1eeb s\u1eafc l\u1ec7nh thu\u1ed9c \u0111\u1ecba m\u00e0 t\u1eeb nhu c\u1ea7u truy\u1ec1n gi\u00e1o \u0111\u1ec3 d\u1ea1y ng\u01b0\u1eddi Vi\u1ec7t c\u1ea3i \u0111\u1ea1o \u0111\u1ecdc Kinh Th\u00e1nh. Nh\u1eefng nh\u00e0 truy\u1ec1n gi\u00e1o s\u00e1ng t\u1ea1o ra n\u00f3 ph\u1ea7n l\u1edbn \u0111\u00e3 b\u1ecb l\u00e3ng qu\u00ean. Ch\u1eef vi\u1ebft h\u1ecd t\u1ea1o ra \u0111\u01b0\u1ee3c m\u1ecdi ng\u01b0\u1eddi s\u1eed d\u1ee5ng.'
    }
  },
  {
    number: 'II',
    heading: {
      en: 'Francisco de Pina (1585\u20131625)',
      vi: 'Francisco de Pina (1585\u20131625)'
    },
    body: {
      en: 'The true pioneer of Vietnamese romanization was not Alexandre de Rhodes, but the Portuguese Jesuit Francisco de Pina. Arriving in Cochinchina in 1617, Pina became the first European to truly master the tonal system of Vietnamese. He recognized that the language had six distinct tones \u2014 something no European had systematically documented before \u2014 and began devising a romanized notation to capture them. He trained other missionaries, including de Rhodes, in Vietnamese pronunciation and grammar. Pina drowned in a shipwreck off the coast of \u0110\u00e0 N\u1eb5ng in 1625, before he could complete or publish his linguistic work. His contributions were largely credited to those who came after him.',
      vi: 'Ng\u01b0\u1eddi ti\u00ean phong th\u1ef1c s\u1ef1 c\u1ee7a vi\u1ec7c La-tinh h\u00f3a ti\u1ebfng Vi\u1ec7t kh\u00f4ng ph\u1ea3i l\u00e0 Alexandre de Rhodes, m\u00e0 l\u00e0 nh\u00e0 truy\u1ec1n gi\u00e1o D\u00f2ng T\u00ean ng\u01b0\u1eddi B\u1ed3 \u0110\u00e0o Nha Francisco de Pina. \u0110\u1ebfn Nam B\u1ed9 n\u0103m 1617, Pina tr\u1edf th\u00e0nh ng\u01b0\u1eddi ch\u00e2u \u00c2u \u0111\u1ea7u ti\u00ean th\u1ef1c s\u1ef1 l\u00e0m ch\u1ee7 h\u1ec7 th\u1ed1ng thanh \u0111i\u1ec7u c\u1ee7a ti\u1ebfng Vi\u1ec7t. \u00d4ng nh\u1eadn ra r\u1eb1ng ng\u00f4n ng\u1eef n\u00e0y c\u00f3 s\u00e1u thanh \u0111i\u1ec7u ri\u00eang bi\u1ec7t \u2014 \u0111i\u1ec1u ch\u01b0a c\u00f3 ng\u01b0\u1eddi ch\u00e2u \u00c2u n\u00e0o h\u1ec7 th\u1ed1ng h\u00f3a tr\u01b0\u1edbc \u0111\u00f3 \u2014 v\u00e0 b\u1eaft \u0111\u1ea7u nghi\u00ean c\u1ee9u m\u1ed9t k\u00fd hi\u1ec7u La-tinh h\u00f3a \u0111\u1ec3 ghi l\u1ea1i ch\u00fang. \u00d4ng \u0111\u00e0o t\u1ea1o c\u00e1c nh\u00e0 truy\u1ec1n gi\u00e1o kh\u00e1c, bao g\u1ed3m de Rhodes, v\u1ec1 ph\u00e1t \u00e2m v\u00e0 ng\u1eef ph\u00e1p ti\u1ebfng Vi\u1ec7t. Pina ch\u1ebft \u0111u\u1ed1i trong m\u1ed9t v\u1ee5 \u0111\u1eafm t\u00e0u ngo\u00e0i kh\u01a1i \u0110\u00e0 N\u1eb5ng n\u0103m 1625, tr\u01b0\u1edbc khi c\u00f3 th\u1ec3 ho\u00e0n th\u00e0nh ho\u1eb7c xu\u1ea5t b\u1ea3n c\u00f4ng tr\u00ecnh ng\u00f4n ng\u1eef c\u1ee7a m\u00ecnh. Nh\u1eefng \u0111\u00f3ng g\u00f3p c\u1ee7a \u00f4ng ph\u1ea7n l\u1edbn \u0111\u01b0\u1ee3c ghi c\u00f4ng cho nh\u1eefng ng\u01b0\u1eddi \u0111\u1ebfn sau.'
    }
  },
  {
    number: 'III',
    heading: {
      en: 'Alexandre de Rhodes (1591\u20131660)',
      vi: 'Alexandre de Rhodes (1591\u20131660)'
    },
    body: {
      en: 'The Avignonese Jesuit Alexandre de Rhodes built on Pina\u2019s foundation and became the name most associated with ch\u1eef Qu\u1ed1c ng\u1eef. After years of missionary work in both Tonkin and Cochinchina, de Rhodes traveled to Rome, where in 1651 he published the Dictionarium Annamiticum Lusitanum et Latinum \u2014 the first Vietnamese-Portuguese-Latin dictionary using the romanized script. The dictionary systematized Vietnamese tones through diacritical marks and established the orthographic conventions that, with modifications, survive to this day. De Rhodes did not invent the script alone \u2014 it was a collaborative effort by multiple Jesuits, Japanese catechists, and Vietnamese converts \u2014 but his dictionary gave it permanence.',
      vi: 'Nh\u00e0 truy\u1ec1n gi\u00e1o D\u00f2ng T\u00ean g\u1ed1c Avignon, Alexandre de Rhodes, \u0111\u00e3 x\u00e2y d\u1ef1ng tr\u00ean n\u1ec1n t\u1ea3ng c\u1ee7a Pina v\u00e0 tr\u1edf th\u00e0nh c\u00e1i t\u00ean g\u1eafn li\u1ec1n nh\u1ea5t v\u1edbi ch\u1eef Qu\u1ed1c ng\u1eef. Sau nhi\u1ec1u n\u0103m truy\u1ec1n gi\u00e1o \u1edf c\u1ea3 \u0110\u00e0ng Ngo\u00e0i v\u00e0 \u0110\u00e0ng Trong, de Rhodes \u0111\u1ebfn La M\u00e3, n\u01a1i n\u0103m 1651 \u00f4ng xu\u1ea5t b\u1ea3n cu\u1ed1n Dictionarium Annamiticum Lusitanum et Latinum \u2014 cu\u1ed1n t\u1eeb \u0111i\u1ec3n Vi\u1ec7t-B\u1ed3-La \u0111\u1ea7u ti\u00ean s\u1eed d\u1ee5ng ch\u1eef La-tinh h\u00f3a. Cu\u1ed1n t\u1eeb \u0111i\u1ec3n \u0111\u00e3 h\u1ec7 th\u1ed1ng h\u00f3a c\u00e1c thanh \u0111i\u1ec7u ti\u1ebfng Vi\u1ec7t qua c\u00e1c d\u1ea5u ph\u1ee5 v\u00e0 thi\u1ebft l\u1eadp c\u00e1c quy \u01b0\u1edbc ch\u00ednh t\u1ea3 m\u00e0, v\u1edbi nh\u1eefng s\u1eed\u0111\u1ed5i, v\u1eabn t\u1ed3n t\u1ea1i \u0111\u1ebfn ng\u00e0y nay. De Rhodes kh\u00f4ng s\u00e1ng t\u1ea1o ch\u1eef vi\u1ebft m\u1ed9t m\u00ecnh \u2014 \u0111\u00f3 l\u00e0 n\u1ed7 l\u1ef1c h\u1ee3p t\u00e1c c\u1ee7a nhi\u1ec1u tu s\u0129 D\u00f2ng T\u00ean, c\u00e1c th\u1ea7y gi\u1ea3ng Nh\u1eadt B\u1ea3n, v\u00e0 ng\u01b0\u1eddi Vi\u1ec7t c\u1ea3i \u0111\u1ea1o \u2014 nh\u01b0ng cu\u1ed1n t\u1eeb \u0111i\u1ec3n c\u1ee7a \u00f4ng \u0111\u00e3 l\u00e0m cho n\u00f3 tr\u01b0\u1eddng t\u1ed3n.'
    }
  },
  {
    number: 'IV',
    heading: {
      en: 'The Script Evolves',
      vi: 'Ch\u1eef vi\u1ebft ti\u1ebfn h\u00f3a'
    },
    body: {
      en: 'Vietnamese writing passed through three distinct systems. For over a thousand years under Chinese rule, Vietnamese scholars wrote in ch\u1eef H\u00e1n \u2014 classical Chinese characters. After independence, Vietnamese developed ch\u1eef N\u00f4m, a demotic script that adapted and invented characters to represent Vietnamese sounds \u2014 complex, beautiful, and enormously difficult to learn. Then came ch\u1eef Qu\u1ed1c ng\u1eef, the missionary-created romanization that made literacy accessible to anyone who could learn 29 letters and six tone marks.',
      vi: 'Ch\u1eef vi\u1ebft Vi\u1ec7t Nam \u0111\u00e3 tr\u1ea3i qua ba h\u1ec7 th\u1ed1ng ri\u00eang bi\u1ec7t. Trong h\u01a1n m\u1ed9t ngh\u00ecn n\u0103m d\u01b0\u1edbi s\u1ef1 cai tr\u1ecb c\u1ee7a Trung Qu\u1ed1c, c\u00e1c h\u1ecdc gi\u1ea3 Vi\u1ec7t Nam vi\u1ebft b\u1eb1ng ch\u1eef H\u00e1n \u2014 ch\u1eef H\u00e1n c\u1ed5 \u0111i\u1ec3n. Sau khi gi\u00e0nh \u0111\u1ed9c l\u1eadp, ng\u01b0\u1eddi Vi\u1ec7t ph\u00e1t tri\u1ec3n ch\u1eef N\u00f4m, m\u1ed9t h\u1ec7 th\u1ed1ng ch\u1eef vi\u1ebft b\u1ea3n \u0111\u1ecba \u0111i\u1ec1u ch\u1ec9nh v\u00e0 s\u00e1ng t\u1ea1o c\u00e1c k\u00fd t\u1ef1 \u0111\u1ec3 bi\u1ec3u th\u1ecb \u00e2m ti\u1ebfng Vi\u1ec7t \u2014 ph\u1ee9c t\u1ea1p, \u0111\u1eb9p, v\u00e0 c\u1ef1c k\u1ef3 kh\u00f3 h\u1ecdc. Sau \u0111\u00f3 xu\u1ea5t hi\u1ec7n ch\u1eef Qu\u1ed1c ng\u1eef, b\u1ea3ng ch\u1eef La-tinh h\u00f3a do c\u00e1c nh\u00e0 truy\u1ec1n gi\u00e1o t\u1ea1o ra, gi\u00fap vi\u1ec7c bi\u1ebft ch\u1eef tr\u1edf n\u00ean d\u1ec5 d\u00e0ng cho b\u1ea5t k\u1ef3 ai c\u00f3 th\u1ec3 h\u1ecdc 29 ch\u1eef c\u00e1i v\u00e0 s\u00e1u d\u1ea5u thanh.'
    },
    special: 'comparison'
  },
  {
    number: 'V',
    heading: {
      en: 'French Colonial Adoption',
      vi: 'Th\u1eddi Ph\u00e1p thu\u1ed9c ti\u1ebfp nh\u1eadn'
    },
    body: {
      en: 'In the 1920s, the French colonial government adopted ch\u1eef Qu\u1ed1c ng\u1eef as the official writing system of Vietnam, replacing Chinese characters in administration and education. The irony was profound: a script invented by missionaries as an evangelistic tool \u2014 designed to help Vietnamese converts read the catechism and the Bible \u2014 became the instrument of colonial administration. The French promoted it not to spread Christianity but to sever Vietnam\u2019s literary connection to China and to produce a literate workforce that could serve the colonial state. The missionaries\u2019 gift was repurposed for empire.',
      vi: 'V\u00e0o nh\u1eefng n\u0103m 1920, ch\u00ednh quy\u1ec1n thu\u1ed9c \u0111\u1ecba Ph\u00e1p ch\u00ednh th\u1ee9c ch\u1ea5p nh\u1eadn ch\u1eef Qu\u1ed1c ng\u1eef l\u00e0m h\u1ec7 th\u1ed1ng ch\u1eef vi\u1ebft c\u1ee7a Vi\u1ec7t Nam, thay th\u1ebf ch\u1eef H\u00e1n trong h\u00e0nh ch\u00ednh v\u00e0 gi\u00e1o d\u1ee5c. S\u1ef1 m\u1ec9a mai th\u1eadt s\u00e2u s\u1eafc: m\u1ed9t lo\u1ea1i ch\u1eef do c\u00e1c nh\u00e0 truy\u1ec1n gi\u00e1o s\u00e1ng t\u1ea1o nh\u01b0 m\u1ed9t c\u00f4ng c\u1ee5 truy\u1ec1n gi\u00e1o \u2014 \u0111\u01b0\u1ee3c thi\u1ebft k\u1ebf \u0111\u1ec3 gi\u00fap ng\u01b0\u1eddi Vi\u1ec7t c\u1ea3i \u0111\u1ea1o \u0111\u1ecdc gi\u00e1o l\u00fd v\u00e0 Kinh Th\u00e1nh \u2014 \u0111\u00e3 tr\u1edf th\u00e0nh c\u00f4ng c\u1ee5 h\u00e0nh ch\u00ednh thu\u1ed9c \u0111\u1ecba. Ng\u01b0\u1eddi Ph\u00e1p qu\u1ea3ng b\u00e1 n\u00f3 kh\u00f4ng ph\u1ea3i \u0111\u1ec3 truy\u1ec1n b\u00e1 Kit\u00f4 gi\u00e1o m\u00e0 \u0111\u1ec3 c\u1eaft \u0111\u1ee9t m\u1ed1i li\u00ean h\u1ec7 v\u0103n h\u1ecdc c\u1ee7a Vi\u1ec7t Nam v\u1edbi Trung Qu\u1ed1c v\u00e0 t\u1ea1o ra m\u1ed9t l\u1ef1c l\u01b0\u1ee3ng lao \u0111\u1ed9ng bi\u1ebft ch\u1eef ph\u1ee5c v\u1ee5 nh\u00e0 n\u01b0\u1edbc thu\u1ed9c \u0111\u1ecba. M\u00f3n qu\u00e0 c\u1ee7a c\u00e1c nh\u00e0 truy\u1ec1n gi\u00e1o \u0111\u00e3 \u0111\u01b0\u1ee3c t\u00e1i s\u1eed d\u1ee5ng cho \u0111\u1ebf ch\u1ebf.'
    }
  },
  {
    number: 'VI',
    heading: {
      en: 'Communist Promotion',
      vi: 'Ch\u00ednh quy\u1ec1n C\u1ed9ng s\u1ea3n qu\u1ea3ng b\u00e1'
    },
    body: {
      en: 'After independence, Ho Chi Minh\u2019s government promoted ch\u1eef Qu\u1ed1c ng\u1eef aggressively as the centerpiece of national literacy campaigns. The communists recognized that the romanized script \u2014 simple, phonetic, learnable in weeks rather than years \u2014 was the fastest path to mass literacy. Literacy rates soared from under 20% to over 90% within decades. The paradox was stark: the government that persecuted Christianity and expelled missionaries was simultaneously building its national identity on a writing system those missionaries had created. The communists embraced the script while erasing its origins.',
      vi: 'Sau khi gi\u00e0nh \u0111\u1ed9c l\u1eadp, ch\u00ednh ph\u1ee7 H\u1ed3 Ch\u00ed Minh m\u1ea1nh m\u1ebd qu\u1ea3ng b\u00e1 ch\u1eef Qu\u1ed1c ng\u1eef l\u00e0m tr\u1ee5 c\u1ed9t cho c\u00e1c chi\u1ebfn d\u1ecbch x\u00f3a m\u00f9 ch\u1eef. Ch\u00ednh quy\u1ec1n C\u1ed9ng s\u1ea3n nh\u1eadn ra r\u1eb1ng ch\u1eef La-tinh h\u00f3a \u2014 \u0111\u01a1n gi\u1ea3n, ng\u1eef \u00e2m, h\u1ecdc \u0111\u01b0\u1ee3c trong v\u00e0i tu\u1ea7n thay v\u00ec nhi\u1ec1u n\u0103m \u2014 l\u00e0 con \u0111\u01b0\u1eddng nhanh nh\u1ea5t \u0111\u1ebfn x\u00f3a m\u00f9 ch\u1eef \u0111\u1ea1i ch\u00fang. T\u1ef7 l\u1ec7 bi\u1ebft ch\u1eef t\u0103ng v\u1ecdt t\u1eeb d\u01b0\u1edbi 20% l\u00ean h\u01a1n 90% ch\u1ec9 trong v\u00e0i th\u1eadp k\u1ef7. Ngh\u1ecbch l\u00fd r\u1ea5t r\u00f5 r\u00e0ng: ch\u00ednh ph\u1ee7 b\u00e1ch h\u1ea1i Kit\u00f4 gi\u00e1o v\u00e0 truy xu\u1ea5t c\u00e1c nh\u00e0 truy\u1ec1n gi\u00e1o l\u1ea1i \u0111\u1ed3ng th\u1eddi x\u00e2y d\u1ef1ng b\u1ea3n s\u1eafc d\u00e2n t\u1ed9c tr\u00ean h\u1ec7 th\u1ed1ng ch\u1eef vi\u1ebft do ch\u00ednh nh\u1eefng nh\u00e0 truy\u1ec1n gi\u00e1o \u0111\u00f3 t\u1ea1o ra. Ch\u00ednh quy\u1ec1n C\u1ed9ng s\u1ea3n ch\u1ea5p nh\u1eadn ch\u1eef vi\u1ebft nh\u01b0ng x\u00f3a b\u1ecf ngu\u1ed3n g\u1ed1c c\u1ee7a n\u00f3.'
    }
  },
  {
    number: 'VII',
    heading: {
      en: 'Six Tones, Six Meanings',
      vi: 'S\u00e1u thanh, s\u00e1u ngh\u0129a'
    },
    body: {
      en: 'The genius of ch\u1eef Qu\u1ed1c ng\u1eef is how it captures Vietnamese\u2019s six tones through diacritical marks. A single syllable can have six entirely different meanings depending on its tone. The missionaries had to invent a way to write what no European language needed to represent: pitch contour as meaning. Below, see how the syllable \u201cma\u201d transforms across all six tones:',
      vi: 'S\u1ef1 t\u00e0i t\u00ecnh c\u1ee7a ch\u1eef Qu\u1ed1c ng\u1eef l\u00e0 c\u00e1ch n\u00f3 ghi l\u1ea1i s\u00e1u thanh \u0111i\u1ec7u c\u1ee7a ti\u1ebfng Vi\u1ec7t qua c\u00e1c d\u1ea5u ph\u1ee5. M\u1ed9t \u00e2m ti\u1ebft duy nh\u1ea5t c\u00f3 th\u1ec3 mang s\u00e1u ngh\u0129a ho\u00e0n to\u00e0n kh\u00e1c nhau t\u00f9y theo thanh \u0111i\u1ec7u. C\u00e1c nh\u00e0 truy\u1ec1n gi\u00e1o ph\u1ea3i ph\u00e1t minh ra c\u00e1ch vi\u1ebft nh\u1eefng \u0111i\u1ec1u m\u00e0 kh\u00f4ng ng\u00f4n ng\u1eef ch\u00e2u \u00c2u n\u00e0o c\u1ea7n bi\u1ec3u th\u1ecb: \u0111\u01b0\u1eddng n\u00e9t cao \u0111\u1ed9 nh\u01b0 ngh\u0129a. D\u01b0\u1edbi \u0111\u00e2y, xem c\u00e1ch \u00e2m ti\u1ebft \u201cma\u201d bi\u1ebfn \u0111\u1ed5i qua s\u00e1u thanh \u0111i\u1ec7u:'
    },
    special: 'tones'
  },
  {
    number: 'VIII',
    heading: {
      en: '100 Million Writers',
      vi: '100 Tri\u1ec7u Ng\u01b0\u1eddi Vi\u1ebft'
    },
    body: {
      en: 'Today, the script created by a handful of Jesuit missionaries as a tool for evangelization is used by over 100 million people in Vietnam and millions more in the Vietnamese diaspora worldwide. Every text message, every newspaper headline, every government document, every novel, every road sign in Vietnam is written in the alphabet that Francisco de Pina began sketching and Alexandre de Rhodes systematized nearly four centuries ago. It is perhaps the most consequential unintended legacy in the history of Christian missions. The missionaries came to save souls. They ended up giving a nation its voice. The world forgot who made it.',
      vi: 'Ng\u00e0y nay, ch\u1eef vi\u1ebft \u0111\u01b0\u1ee3c m\u1ed9t s\u1ed1 \u00edt nh\u00e0 truy\u1ec1n gi\u00e1o D\u00f2ng T\u00ean t\u1ea1o ra nh\u01b0 m\u1ed9t c\u00f4ng c\u1ee5 truy\u1ec1n gi\u00e1o \u0111\u01b0\u1ee3c h\u01a1n 100 tri\u1ec7u ng\u01b0\u1eddi t\u1ea1i Vi\u1ec7t Nam v\u00e0 h\u00e0ng tri\u1ec7u ng\u01b0\u1eddi Vi\u1ec7t h\u1ea3i ngo\u1ea1i s\u1eed d\u1ee5ng. M\u1ecdi tin nh\u1eafn, m\u1ecdi ti\u00eau \u0111\u1ec1 b\u00e1o ch\u00ed, m\u1ecdi v\u0103n b\u1ea3n ch\u00ednh ph\u1ee7, m\u1ecdi cu\u1ed1n ti\u1ec3u thuy\u1ebft, m\u1ecdi bi\u1ec3n b\u00e1o \u0111\u01b0\u1eddng \u1edf Vi\u1ec7t Nam \u0111\u1ec1u \u0111\u01b0\u1ee3c vi\u1ebft b\u1eb1ng b\u1ea3ng ch\u1eef c\u00e1i m\u00e0 Francisco de Pina b\u1eaft \u0111\u1ea7u ph\u00e1c th\u1ea3o v\u00e0 Alexandre de Rhodes h\u1ec7 th\u1ed1ng h\u00f3a g\u1ea7n b\u1ed1n th\u1ebf k\u1ef7 tr\u01b0\u1edbc. \u0110\u00e2y c\u00f3 l\u1ebd l\u00e0 di s\u1ea3n ngo\u00e0i \u00fd mu\u1ed1n \u0111\u00e1ng k\u1ec3 nh\u1ea5t trong l\u1ecbch s\u1eed truy\u1ec1n gi\u00e1o Kit\u00f4. C\u00e1c nh\u00e0 truy\u1ec1n gi\u00e1o \u0111\u1ebfn \u0111\u1ec3 c\u1ee9u linh h\u1ed3n. H\u1ecd \u0111\u00e3 trao cho c\u1ea3 m\u1ed9t d\u00e2n t\u1ed9c ti\u1ebfng n\u00f3i c\u1ee7a m\u00ecnh. Th\u1ebf gi\u1edbi qu\u00ean ai \u0111\u00e3 t\u1ea1o ra n\u00f3.'
    }
  }
];

const toneData = [
  {
    word: 'ma',
    tone: { en: 'ngang (level)', vi: 'ngang' },
    meaning: { en: 'ghost', vi: 'ma (qu\u1ef7)' },
    mark: { en: 'no mark', vi: 'kh\u00f4ng d\u1ea5u' }
  },
  {
    word: 'm\u00e0',
    tone: { en: 'huy\u1ec1n (falling)', vi: 'huy\u1ec1n' },
    meaning: { en: 'but / which', vi: 'nh\u01b0ng / m\u00e0' },
    mark: { en: 'grave accent (`)', vi: 'd\u1ea5u huy\u1ec1n (`)' }
  },
  {
    word: 'm\u00e1',
    tone: { en: 's\u1eafc (rising)', vi: 's\u1eafc' },
    meaning: { en: 'mother / cheek', vi: 'm\u1eb9 / m\u00e1' },
    mark: { en: 'acute accent (\u00b4)', vi: 'd\u1ea5u s\u1eafc (\u00b4)' }
  },
  {
    word: 'm\u1ea3',
    tone: { en: 'h\u1ecfi (dipping-rising)', vi: 'h\u1ecfi' },
    meaning: { en: 'grave / tomb', vi: 'm\u1ed9 / m\u1ea3' },
    mark: { en: 'hook above (\u0309)', vi: 'd\u1ea5u h\u1ecfi (\u0309)' }
  },
  {
    word: 'm\u00e3',
    tone: { en: 'ng\u00e3 (creaky rising)', vi: 'ng\u00e3' },
    meaning: { en: 'horse / code', vi: 'ng\u1ef1a / m\u00e3' },
    mark: { en: 'tilde (~)', vi: 'd\u1ea5u ng\u00e3 (~)' }
  },
  {
    word: 'm\u1ea1',
    tone: { en: 'n\u1eb7ng (heavy/falling)', vi: 'n\u1eb7ng' },
    meaning: { en: 'rice seedling', vi: 'c\u00e2y m\u1ea1' },
    mark: { en: 'dot below (.)', vi: 'd\u1ea5u n\u1eb7ng (.)' }
  }
];

const scriptComparison = [
  {
    system: { en: 'ch\u1eef H\u00e1n', vi: 'Ch\u1eef H\u00e1n' },
    label: { en: 'Chinese characters', vi: 'Ch\u1eef H\u00e1n (c\u1ed5 \u0111i\u1ec3n)' },
    example: '\u8d8a\u5357',
    era: { en: '~111 BC \u2013 1920s', vi: '~111 TCN \u2013 1920s' }
  },
  {
    system: { en: 'ch\u1eef N\u00f4m', vi: 'Ch\u1eef N\u00f4m' },
    label: { en: 'Vietnamese demotic script', vi: 'Ch\u1eef N\u00f4m (b\u1ea3n \u0111\u1ecba)' },
    example: '\ud841\ude38\u5583',
    era: { en: '~13th century \u2013 1920s', vi: '~Th\u1ebf k\u1ef7 13 \u2013 1920s' }
  },
  {
    system: { en: 'ch\u1eef Qu\u1ed1c ng\u1eef', vi: 'Ch\u1eef Qu\u1ed1c ng\u1eef' },
    label: { en: 'Romanized national script', vi: 'Ch\u1eef Qu\u1ed1c ng\u1eef (La-tinh h\u00f3a)' },
    example: 'Vi\u1ec7t Nam',
    era: { en: '1651 \u2013 present', vi: '1651 \u2013 nay' }
  }
];

export async function renderScript(): Promise<void> {
  const app = document.getElementById('app');
  if (!app) return;

  const lang = getLang();
  const loc = (obj: { en: string; vi: string }) => obj[lang] || obj.en;

  const pageTitle: BiText = {
    en: 'The Gift of Letters: Ch\u1eef Qu\u1ed1c Ng\u1eef',
    vi: '\u00c2n Ph\u1ea9m Ch\u1eef Vi\u1ebft: Ch\u1eef Qu\u1ed1c Ng\u1eef'
  };

  const pageSubtitle: BiText = {
    en: 'How missionaries invented the Vietnamese alphabet',
    vi: 'C\u00e1ch c\u00e1c nh\u00e0 truy\u1ec1n gi\u00e1o s\u00e1ng t\u1ea1o b\u1ea3ng ch\u1eef c\u00e1i Vi\u1ec7t Nam'
  };

  const backText: BiText = {
    en: '\u2190 Back to Heritage',
    vi: '\u2190 V\u1ec1 Di s\u1ea3n'
  };

  const comparisonTitle: BiText = {
    en: 'Three writing systems, one language',
    vi: 'Ba h\u1ec7 th\u1ed1ng ch\u1eef vi\u1ebft, m\u1ed9t ng\u00f4n ng\u1eef'
  };

  const tonesTitle: BiText = {
    en: 'The six tones of Vietnamese',
    vi: 'S\u00e1u thanh \u0111i\u1ec7u c\u1ee7a ti\u1ebfng Vi\u1ec7t'
  };

  const colWord: BiText = { en: 'Word', vi: 'T\u1eeb' };
  const colTone: BiText = { en: 'Tone', vi: 'Thanh' };
  const colMeaning: BiText = { en: 'Meaning', vi: 'Ngh\u0129a' };
  const colMark: BiText = { en: 'Diacritical mark', vi: 'D\u1ea5u ph\u1ee5' };

  function buildComparisonHtml(): string {
    return `
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
          margin-bottom: var(--space-lg);
        ">${loc(comparisonTitle)}</div>

        <div style="
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-md);
        ">
          ${scriptComparison.map(s => `
            <div style="
              text-align: center;
              padding: var(--space-md);
              border: 1px solid var(--border-subtle);
              background: var(--bg-elevated);
            ">
              <div style="
                font-family: var(--font-display);
                font-size: 14px;
                color: var(--accent-gold);
                margin-bottom: var(--space-xs);
                font-weight: 600;
              ">${loc(s.system)}</div>
              <div style="
                font-size: 36px;
                color: var(--text-primary);
                margin: var(--space-md) 0;
                line-height: 1.2;
                font-family: ${s.system.en === 'ch\u1eef Qu\u1ed1c ng\u1eef' ? 'var(--font-body)' : 'serif'};
              ">${s.example}</div>
              <div style="
                font-size: 13px;
                color: var(--text-secondary);
                margin-bottom: var(--space-xs);
              ">${loc(s.label)}</div>
              <div style="
                font-family: var(--font-mono);
                font-size: 11px;
                color: var(--text-tertiary);
              ">${loc(s.era)}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function buildTonesHtml(): string {
    return `
      <div style="
        margin-top: var(--space-xl);
        background: var(--bg-surface);
        border: 1px solid var(--border-default);
        padding: var(--space-lg);
        overflow-x: auto;
      ">
        <div style="
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--accent-gold);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: var(--space-lg);
        ">${loc(tonesTitle)}</div>

        <div style="
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: var(--space-sm);
        " class="tone-grid">
          ${toneData.map(td => `
            <div style="
              text-align: center;
              padding: var(--space-md) var(--space-sm);
              border: 1px solid var(--border-subtle);
              background: var(--bg-elevated);
              transition: all var(--transition-default);
            " class="tone-cell">
              <div style="
                font-family: var(--font-body);
                font-size: 32px;
                font-weight: 700;
                color: var(--accent-gold);
                line-height: 1;
                margin-bottom: var(--space-sm);
              ">${td.word}</div>
              <div style="
                font-family: var(--font-mono);
                font-size: 11px;
                color: var(--accent-cinnabar);
                margin-bottom: var(--space-xs);
                font-weight: 600;
              ">${loc(td.tone)}</div>
              <div style="
                font-size: 14px;
                color: var(--text-primary);
                margin-bottom: var(--space-xs);
                font-weight: 500;
              ">${loc(td.meaning)}</div>
              <div style="
                font-family: var(--font-mono);
                font-size: 10px;
                color: var(--text-tertiary);
              ">${loc(td.mark)}</div>
            </div>
          `).join('')}
        </div>

        <table style="
          width: 100%;
          margin-top: var(--space-lg);
          border-collapse: collapse;
          font-size: 14px;
        " class="tone-table">
          <thead>
            <tr>
              <th style="
                text-align: left;
                padding: var(--space-sm) var(--space-md);
                border-bottom: 1px solid var(--border-default);
                color: var(--text-tertiary);
                font-family: var(--font-mono);
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.08em;
              ">${loc(colWord)}</th>
              <th style="
                text-align: left;
                padding: var(--space-sm) var(--space-md);
                border-bottom: 1px solid var(--border-default);
                color: var(--text-tertiary);
                font-family: var(--font-mono);
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.08em;
              ">${loc(colTone)}</th>
              <th style="
                text-align: left;
                padding: var(--space-sm) var(--space-md);
                border-bottom: 1px solid var(--border-default);
                color: var(--text-tertiary);
                font-family: var(--font-mono);
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.08em;
              ">${loc(colMeaning)}</th>
              <th style="
                text-align: left;
                padding: var(--space-sm) var(--space-md);
                border-bottom: 1px solid var(--border-default);
                color: var(--text-tertiary);
                font-family: var(--font-mono);
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.08em;
              ">${loc(colMark)}</th>
            </tr>
          </thead>
          <tbody>
            ${toneData.map(td => `
              <tr>
                <td style="
                  padding: var(--space-sm) var(--space-md);
                  border-bottom: 1px solid var(--border-subtle);
                  font-family: var(--font-body);
                  font-size: 18px;
                  font-weight: 700;
                  color: var(--accent-gold);
                ">${td.word}</td>
                <td style="
                  padding: var(--space-sm) var(--space-md);
                  border-bottom: 1px solid var(--border-subtle);
                  color: var(--text-secondary);
                  font-size: 13px;
                ">${loc(td.tone)}</td>
                <td style="
                  padding: var(--space-sm) var(--space-md);
                  border-bottom: 1px solid var(--border-subtle);
                  color: var(--text-primary);
                ">${loc(td.meaning)}</td>
                <td style="
                  padding: var(--space-sm) var(--space-md);
                  border-bottom: 1px solid var(--border-subtle);
                  color: var(--text-tertiary);
                  font-family: var(--font-mono);
                  font-size: 12px;
                ">${loc(td.mark)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  const chaptersHtml = chapters.map((ch, i) => `
    <article class="script-chapter${i === 0 ? ' first' : ''}" style="
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
        color: var(--accent-gold);
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
      ${ch.special === 'comparison' ? buildComparisonHtml() : ''}
      ${ch.special === 'tones' ? buildTonesHtml() : ''}
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
    <style>
      @media (max-width: 768px) {
        .tone-grid {
          grid-template-columns: repeat(3, 1fr) !important;
        }
        .tone-table th:nth-child(4),
        .tone-table td:nth-child(4) {
          display: none;
        }
      }
      @media (max-width: 480px) {
        .tone-grid {
          grid-template-columns: repeat(2, 1fr) !important;
        }
      }
    </style>

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
        color: var(--accent-gold);
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

    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-mission" data-i18n="footer.mission">${t('footer.mission')}</div>
        <div class="footer-links">
          <a href="#/heritage">${lang === 'vi' ? 'Di s\u1ea3n' : 'Heritage'}</a>
          <a href="#/about" data-i18n="footer.fc">${t('footer.fc')}</a>
        </div>
      </div>
      <div class="footer-tagline" data-i18n="footer.tagline">${t('footer.tagline')}</div>
    </footer>
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

  document.querySelectorAll('.script-chapter').forEach(el => {
    observer.observe(el);
  });

  // Show first chapter immediately
  const firstChapter = document.querySelector('.script-chapter.first') as HTMLElement;
  if (firstChapter) {
    firstChapter.style.opacity = '1';
    firstChapter.style.transform = 'translateY(0)';
  }

  setCleanup(() => {
    observer.disconnect();
  });
}
