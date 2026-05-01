type Lang = 'en' | 'vi';

interface Translations {
  [key: string]: { en: string; vi: string };
}

const strings: Translations = {
  // Nav
  'nav.research': { en: 'Research', vi: 'Nghiên cứu' },
  'nav.tools': { en: 'Tools', vi: 'Công cụ' },
  'nav.heritage': { en: 'Heritage', vi: 'Di sản' },
  'nav.personas': { en: 'Personas', vi: 'Nhân vật' },
  'nav.about': { en: 'About', vi: 'Giới thiệu' },
  'nav.search': { en: 'Search', vi: 'Tìm kiếm' },

  // Hero — asymmetric split layout
  'hero.eyebrow': {
    en: 'Vietnam Missions Research Platform',
    vi: 'Nền tảng nghiên cứu truyền giáo Việt Nam'
  },
  'hero.title': {
    en: '493 Years of Christianity in Vietnam',
    vi: '493 năm Kitô giáo tại Việt Nam'
  },
  'hero.intro': {
    en: 'The missionaries who brought Christianity to Vietnam also invented the Vietnamese alphabet. This platform connects that extraordinary story — from the first Portuguese contact in 1533 to today\'s 8-10 million believers — through 12 research reports, interactive tools, and AI-powered discovery. Bilingual throughout.',
    vi: 'Các nhà truyền giáo mang Kitô giáo đến Việt Nam cũng đã sáng tạo ra chữ Quốc ngữ. Nền tảng này kết nối câu chuyện phi thường ấy — từ lần tiếp xúc đầu tiên của người Bồ Đào Nha năm 1533 đến 8-10 triệu tín hữu ngày nay — qua 12 báo cáo nghiên cứu, công cụ tương tác, và khám phá bằng AI. Song ngữ toàn bộ.'
  },
  'hero.cta.explore': { en: 'Explore the Archive', vi: 'Khám phá kho tư liệu' },
  'hero.cta.research': { en: 'Read the Research', vi: 'Đọc nghiên cứu' },
  'hero.stat.christians': { en: '8-10M', vi: '8-10 triệu' },
  'hero.stat.christians.label': { en: 'Christians in Vietnam', vi: 'Kitô hữu tại Việt Nam' },
  'hero.stat.martyrs': { en: '117', vi: '117' },
  'hero.stat.martyrs.label': { en: 'Canonized Martyrs', vi: 'Thánh Tử Đạo' },
  'hero.stat.script': { en: '100M+', vi: '100 triệu+' },
  'hero.stat.script.label': { en: 'using missionary-created script', vi: 'dùng chữ do nhà truyền giáo sáng tạo' },
  'hero.stat.years': { en: '493', vi: '493' },
  'hero.stat.years.label': { en: 'years of history', vi: 'năm lịch sử' },
  'hero.panel.title': { en: 'Vietnam at a glance', vi: 'Việt Nam nhìn nhanh' },

  // Three Pillars
  'pillars.eyebrow': { en: 'The Platform', vi: 'Nền tảng' },
  'pillars.title': { en: 'Research, Tools, Heritage', vi: 'Nghiên cứu, Công cụ, Di sản' },
  'pillars.research.title': { en: 'Research Archive', vi: 'Kho nghiên cứu' },
  'pillars.research.count': { en: '12 reports', vi: '12 báo cáo' },
  'pillars.research.desc': {
    en: 'From the 1533 first contact through French colonialism, Communist revolution, and today\'s controlled accommodation — 12 bilingual reports with AI-powered search.',
    vi: 'Từ lần tiếp xúc đầu tiên năm 1533 qua thời Pháp thuộc, cách mạng Cộng sản, đến chính sách hòa hợp có kiểm soát ngày nay — 12 báo cáo song ngữ với tìm kiếm AI.'
  },
  'pillars.research.cta': { en: 'Browse reports', vi: 'Xem báo cáo' },
  'pillars.tools.title': { en: 'Ministry Tools', vi: 'Công cụ mục vụ' },
  'pillars.tools.count': { en: '5 tools', vi: '5 công cụ' },
  'pillars.tools.desc': {
    en: 'Returnee preparation kit, volunteer training modules, animated spread map, faith retention calculator, and the Ask the Archive AI.',
    vi: 'Bộ chuẩn bị cho người trở về, mô-đun đào tạo tình nguyện viên, bản đồ lan tỏa động, tính toán gìn giữ đức tin, và AI Hỏi Kho Tư Liệu.'
  },
  'pillars.tools.cta': { en: 'Explore tools', vi: 'Khám phá công cụ' },
  'pillars.heritage.title': { en: 'Vietnamese Heritage', vi: 'Di sản Việt Nam' },
  'pillars.heritage.count': { en: '2 experiences', vi: '2 trải nghiệm' },
  'pillars.heritage.desc': {
    en: 'The 117 Vietnamese Martyrs — the largest single-country canonization in Catholic history. And the chữ Quốc ngữ story — how missionaries invented the Vietnamese alphabet.',
    vi: '117 Thánh Tử Đạo Việt Nam — lần phong thánh đông nhất cho một quốc gia trong lịch sử Công giáo. Và câu chuyện chữ Quốc ngữ — cách các nhà truyền giáo sáng tạo bảng chữ cái Việt Nam.'
  },
  'pillars.heritage.cta': { en: 'Discover heritage', vi: 'Khám phá di sản' },

  // Timeline preview
  'timeline.eyebrow': { en: 'Timeline', vi: 'Dòng thời gian' },
  'timeline.title': { en: '493 Years at a Glance', vi: '493 năm nhìn lại' },
  'timeline.cta': { en: 'View full timeline', vi: 'Xem toàn bộ dòng thời gian' },
  'timeline.event.1651': { en: 'Chữ Quốc ngữ dictionary', vi: 'Từ điển chữ Quốc ngữ' },
  'timeline.event.1988': { en: '117 Martyrs canonized', vi: '117 Thánh Tử Đạo được phong thánh' },

  // Timeline page
  'timeline.page.title': { en: '493 Years of Christianity in Vietnam', vi: '493 năm Kitô giáo tại Việt Nam' },
  'timeline.page.subtitle': {
    en: 'From the first Portuguese contact in 1533 to today\'s growing church — scroll through the events that shaped Vietnamese Christianity.',
    vi: 'Từ lần tiếp xúc đầu tiên với người Bồ Đào Nha năm 1533 đến Giáo hội đang phát triển ngày nay — lướt qua các sự kiện đã định hình Kitô giáo Việt Nam.'
  },
  'timeline.filter.all': { en: 'All', vi: 'Tất cả' },
  'timeline.filter.missions': { en: 'Missions', vi: 'Truyền giáo' },
  'timeline.filter.persecution': { en: 'Persecution', vi: 'Bách hại' },
  'timeline.filter.cultural': { en: 'Cultural', vi: 'Văn hóa' },
  'timeline.filter.political': { en: 'Political', vi: 'Chính trị' },
  'timeline.filter.institutional': { en: 'Institutional', vi: 'Thể chế' },
  'timeline.view.vertical': { en: 'Vertical', vi: 'Dọc' },
  'timeline.view.horizontal': { en: 'Horizontal', vi: 'Ngang' },
  'timeline.view.label': { en: 'View', vi: 'Hiển thị' },
  'timeline.expand': { en: 'Show details', vi: 'Xem chi tiết' },
  'timeline.collapse': { en: 'Hide details', vi: 'Ẩn chi tiết' },
  'timeline.significance': { en: 'Significance', vi: 'Mức độ quan trọng' },
  'timeline.category': { en: 'Category', vi: 'Phân loại' },

  // Timeline eras
  'era.early': { en: 'Early Contact', vi: 'Tiếp xúc đầu tiên' },
  'era.jesuit': { en: 'Jesuit Era', vi: 'Thời kỳ Dòng Tên' },
  'era.mep': { en: 'MEP Era', vi: 'Thời kỳ MEP' },
  'era.persecution': { en: 'Great Persecutions', vi: 'Đại Bách Hại' },
  'era.colonial': { en: 'Colonial Period', vi: 'Thời kỳ thuộc địa' },
  'era.partition': { en: 'Partition & War', vi: 'Chia cắt & Chiến tranh' },
  'era.communist': { en: 'Communist Era', vi: 'Thời kỳ Cộng sản' },
  'era.modern': { en: 'Modern Era', vi: 'Thời kỳ hiện đại' },

  // Trilogy
  'trilogy.eyebrow': { en: 'The Asia Trilogy', vi: 'Bộ ba Châu Á' },
  'trilogy.title': { en: 'Three Countries. Three Stories. One Mission.', vi: 'Ba quốc gia. Ba câu chuyện. Một sứ mạng.' },
  'trilogy.china': { en: 'China', vi: 'Trung Quốc' },
  'trilogy.japan': { en: 'Japan', vi: 'Nhật Bản' },
  'trilogy.vietnam': { en: 'Vietnam', vi: 'Việt Nam' },
  'trilogy.china.stat': { en: '~5-7%', vi: '~5-7%' },
  'trilogy.japan.stat': { en: '~1.5%', vi: '~1,5%' },
  'trilogy.vietnam.stat': { en: '~8-10%', vi: '~8-10%' },

  // Research page
  'research.title': { en: 'Research Reports', vi: 'Báo cáo nghiên cứu' },
  'research.subtitle': {
    en: '12 bilingual reports on Christianity in Vietnam — from the 1533 first contact to contemporary scholarship and AI-enabled research.',
    vi: '12 báo cáo song ngữ về Kitô giáo tại Việt Nam — từ lần tiếp xúc đầu tiên năm 1533 đến học thuật đương đại và nghiên cứu hỗ trợ AI.'
  },
  'research.filter.all': { en: 'All', vi: 'Tất cả' },
  'research.filter.history': { en: 'History', vi: 'Lịch sử' },
  'research.filter.scholarship': { en: 'Scholarship', vi: 'Học thuật' },
  'research.filter.gaps': { en: 'Gaps', vi: 'Khoảng trống' },
  'research.filter.ai': { en: 'AI', vi: 'AI' },
  'research.filter.archives': { en: 'Archives', vi: 'Kho lưu trữ' },
  'research.filter.diaspora': { en: 'Diaspora', vi: 'Cộng đồng hải ngoại' },
  'research.filter.culture': { en: 'Culture', vi: 'Văn hóa' },
  'research.filter.contemporary': { en: 'Contemporary', vi: 'Đương đại' },
  'research.readingtime': { en: 'min read', vi: 'phút đọc' },
  'research.search.placeholder': { en: 'Search all reports...', vi: 'Tìm kiếm tất cả báo cáo...' },

  // Report TOC
  'toc.title': { en: 'Contents', vi: 'Mục lục' },
  'toc.sources': { en: 'Sources', vi: 'Nguồn tham khảo' },
  'toc.back': { en: '\u2190 Back to Reports', vi: '\u2190 Về danh sách báo cáo' },
  'toc.prev': { en: 'Previous', vi: 'Trước' },
  'toc.next': { en: 'Next', vi: 'Tiếp' },

  // Ask the Archive
  'ask.title': { en: 'Ask the Archive', vi: 'H\u1ecfi Kho T\u01b0 Li\u1ec7u' },
  'ask.subtitle': {
    en: 'Ask anything about Christianity in Vietnam. Every answer cites its sources from our 12 research reports.',
    vi: 'H\u1ecfi b\u1ea5t k\u1ef3 \u0111i\u1ec1u g\u00ec v\u1ec1 Kit\u00f4 gi\u00e1o t\u1ea1i Vi\u1ec7t Nam. M\u1ecdi c\u00e2u tr\u1ea3 l\u1eddi \u0111\u1ec1u tr\u00edch ngu\u1ed3n t\u1eeb 12 b\u00e1o c\u00e1o nghi\u00ean c\u1ee9u.'
  },
  'ask.placeholder': { en: 'Ask anything about Christianity in Vietnam...', vi: 'Hỏi bất kỳ điều gì về Kitô giáo tại Việt Nam...' },
  'ask.send': { en: 'Send', vi: 'Gửi' },
  'ask.thinking': { en: 'Searching the archive...', vi: 'Đang tìm kiếm trong kho tư liệu...' },
  'ask.starter.1': { en: 'What is chữ Quốc ngữ and who created it?', vi: 'Chữ Quốc ngữ là gì và ai đã sáng tạo ra nó?' },
  'ask.starter.2': { en: 'Why did Christianity grow among the Hmong?', vi: 'Tại sao Kitô giáo phát triển mạnh trong cộng đồng H\'Mông?' },
  'ask.starter.3': { en: 'Who are the 117 Vietnamese Martyrs?', vi: '117 Thánh Tử Đạo Việt Nam là ai?' },
  'ask.starter.4': { en: 'How does ancestor worship affect conversion?', vi: 'Thờ cúng tổ tiên ảnh hưởng đến việc cải đạo như thế nào?' },
  'ask.starter.5': { en: 'Tại sao Kitô giáo phát triển mạnh ở Tây Nguyên?', vi: 'Tại sao Kitô giáo phát triển mạnh ở Tây Nguyên?' },
  'ask.error': {
    en: 'Something went wrong. Please try again.',
    vi: 'Đã xảy ra lỗi. Vui lòng thử lại.'
  },
  'ask.sources': { en: 'Sources', vi: 'Nguồn' },

  // Search
  'search.placeholder': { en: 'Search reports, tools, timeline...', vi: 'Tìm kiếm báo cáo, công cụ, dòng thời gian...' },
  'search.hint': { en: 'Press Cmd+K to search', vi: 'Nhấn Cmd+K để tìm kiếm' },
  'search.no_results': { en: 'No results found', vi: 'Không tìm thấy kết quả' },

  // Tools hub
  'tools.title': { en: 'Tools', vi: 'Công cụ' },
  'tools.subtitle': {
    en: 'Practical tools built on the research — for missionaries, pastors, returnees, and volunteers.',
    vi: 'Công cụ thực tiễn dựa trên nghiên cứu — dành cho nhà truyền giáo, mục sư, người trở về, và tình nguyện viên.'
  },

  // Heritage
  'heritage.title': { en: 'Vietnamese Christian Heritage', vi: 'Di sản Kitô giáo Việt Nam' },
  'heritage.subtitle': {
    en: 'The 117 Martyrs. The Gift of Letters. Two stories that define Vietnamese Christianity.',
    vi: '117 Thánh Tử Đạo. Ân Phẩm Chữ Viết. Hai câu chuyện định hình Kitô giáo Việt Nam.'
  },
  'heritage.martyrs.title': { en: 'The 117 Saints', vi: '117 Thánh Tử Đạo' },
  'heritage.martyrs.desc': {
    en: 'The largest single-country group canonization in Catholic history. Walk through the persecution eras of Minh Mạng, Thiệu Trị, and Tự Đức. Discover the stories of courage that earned 117 Vietnamese, Spanish, and French believers their place among the saints.',
    vi: 'Lần phong thánh đông nhất cho một quốc gia trong lịch sử Công giáo. Bước qua các thời kỳ bách hại của Minh Mạng, Thiệu Trị, và Tự Đức. Khám phá những câu chuyện can đảm đã đưa 117 tín hữu Việt Nam, Tây Ban Nha, và Pháp vào hàng ngũ các thánh.'
  },
  'heritage.script.title': { en: 'The Gift of Letters', vi: 'Ân Phẩm Chữ Viết' },
  'heritage.script.desc': {
    en: 'How Jesuit missionaries invented the Vietnamese alphabet. Follow the journey from Francisco de Pina\'s linguistic genius through Alexandre de Rhodes\' dictionary to 100 million people writing in a missionary-created script. The communists promoted it. The world forgot who made it.',
    vi: 'Cách các nhà truyền giáo Dòng Tên sáng tạo bảng chữ cái Việt Nam. Hành trình từ thiên tài ngôn ngữ Francisco de Pina qua từ điển của Alexandre de Rhodes đến 100 triệu người viết bằng chữ do nhà truyền giáo sáng tạo. Chính quyền Cộng sản quảng bá nó. Thế giới quên ai đã tạo ra nó.'
  },
  'heritage.coming': { en: 'Coming in Phase 2', vi: 'Sắp có trong Giai đoạn 2' },

  // Personas
  'personas.title': { en: 'Historical Conversations', vi: 'Đối thoại lịch sử' },
  'personas.subtitle': {
    en: 'Converse with key figures from Vietnamese Christian history — AI-mediated, grounded in their actual writings.',
    vi: 'Trò chuyện với các nhân vật quan trọng trong lịch sử Kitô giáo Việt Nam — qua AI, dựa trên các tác phẩm thực tế của họ.'
  },
  'personas.coming': { en: 'Coming in Phase 3', vi: 'Sắp có trong Giai đoạn 3' },
  'personas.era.pioneers': { en: 'Missionary Pioneers', vi: 'Nhà Tiên Phong Truyền Giáo' },
  'personas.era.saints': { en: 'Vietnamese Saints', vi: 'Thánh Nhân Việt Nam' },
  'personas.era.modern': { en: 'Modern Voices', vi: 'Tiếng nói Hiện đại' },
  'personas.rhodes.name': { en: 'Alexandre de Rhodes', vi: 'Alexandre de Rhodes' },
  'personas.rhodes.dates': { en: '1591\u20131660', vi: '1591\u20131660' },
  'personas.rhodes.desc': { en: 'Jesuit missionary, creator of ch\u1eef Qu\u1ed1c ng\u1eef dictionary', vi: 'Nhà truyền giáo Dòng Tên, tác giả từ điển chữ Quốc ngữ' },
  'personas.thuan.name': { en: 'Nguy\u1ec5n V\u0103n Thu\u1eadn', vi: 'Nguyễn Văn Thuận' },
  'personas.thuan.dates': { en: '1928\u20132002', vi: '1928\u20132002' },
  'personas.thuan.desc': { en: 'Cardinal, 13 years imprisoned for faith', vi: 'Hồng y, 13 năm tù vì đức tin' },
  'personas.andrew.name': { en: 'Andrew of Ph\u00fa Y\u00ean', vi: 'Anrê Phú Yên' },
  'personas.andrew.dates': { en: '1625\u20131644', vi: '1625\u20131644' },
  'personas.andrew.desc': { en: 'First Vietnamese martyr, killed at age 19', vi: 'Thánh tử đạo Việt Nam đầu tiên, bị giết ở tuổi 19' },
  'personas.tranluc.name': { en: 'Tr\u1ea7n L\u1ee5c', vi: 'Trần Lục' },
  'personas.tranluc.dates': { en: '1825\u20131899', vi: '1825\u20131899' },
  'personas.tranluc.desc': { en: 'Builder of Ph\u00e1t Di\u1ec7m Cathedral', vi: 'Người xây dựng Nhà thờ Phát Diệm' },
  'personas.jaffray.name': { en: 'Robert Jaffray', vi: 'Robert Jaffray' },
  'personas.jaffray.dates': { en: '1873\u20131945', vi: '1873\u20131945' },
  'personas.jaffray.desc': { en: 'CMA pioneer, brought Protestantism to Vietnam', vi: 'Nhà tiên phong CMA, mang đạo Tin Lành đến Việt Nam' },
  'personas.hmong.name': { en: 'Hmong Elder', vi: 'Trưởng lão H\'Mông' },
  'personas.hmong.dates': { en: 'Composite voice', vi: 'Tiếng nói tổng hợp' },
  'personas.hmong.desc': { en: 'Representing the Central Highlands conversion story', vi: 'Đại diện câu chuyện cải đạo ở Tây Nguyên' },

  // About
  'about.title': { en: 'About TruyềnĐạo', vi: 'Giới thiệu TruyềnĐạo' },
  'about.p1': {
    en: 'TruyềnĐạo (傳道) applies AI to international student ministry and the Vietnamese diaspora pipeline — connecting 493 years of missions history to practical tools for today.',
    vi: 'TruyềnĐạo (傳道) ứng dụng AI vào mục vụ sinh viên quốc tế và đường dẫn cộng đồng Việt Nam hải ngoại — kết nối 493 năm lịch sử truyền giáo với các công cụ thực tiễn ngày nay.'
  },
  'about.p2': {
    en: 'The platform connects 493 years of Christian missions in Vietnam to practical ministry tools. Every feature is bilingual, AI-powered, and grounded in peer-reviewed research. It is the third in a trilogy: XuanYan 宣研 (China), Sendō 宣道 (Japan), TruyềnĐạo 傳道 (Vietnam).',
    vi: 'Nền tảng kết nối 493 năm truyền giáo Kitô tại Việt Nam với các công cụ mục vụ thực tiễn. Mọi tính năng đều song ngữ, hỗ trợ AI, và dựa trên nghiên cứu được bình duyệt. Đây là phần thứ ba trong bộ ba: Tuyên Nghiên 宣研 (Trung Quốc), Sendō 宣道 (Nhật Bản), TruyềnĐạo 傳道 (Việt Nam).'
  },
  'about.p3': {
    en: 'We partner with Vietnamese Christian Fellowship (VCF) chapters for returnee support. TruyềnĐạo is proof that AI can serve the Great Commission — not replace human connection, but extend it.',
    vi: 'Chúng tôi hợp tác với các chi hội Hội Thánh Tin Lành Việt Nam (VCF) để hỗ trợ người trở về. TruyềnĐạo là minh chứng rằng AI có thể phục vụ Đại Mệnh Lệnh — không thay thế mối liên kết con người, mà mở rộng nó.'
  },

  // Footer
  'footer.mission': {
    en: 'AI can serve the Great Commission — not replace human connection, but extend it.',
    vi: 'AI có thể phục vụ Đại Mệnh Lệnh — không thay thế mối liên kết con người, mà mở rộng nó.'
  },
  'footer.tagline': { en: 'Powered by AI. Grounded in 493 years of history.', vi: 'Được hỗ trợ bởi AI. Dựa trên 493 năm lịch sử.' },
  'footer.fc': { en: 'About', vi: 'Giới thiệu' },
  'footer.privacy': { en: 'Privacy', vi: 'Quyền riêng tư' },
  'footer.github': { en: 'GitHub', vi: 'GitHub' },
  'footer.notebooklm': { en: 'NotebookLM', vi: 'NotebookLM' },
  'footer.source': { en: 'Research Source', vi: 'Nguồn nghiên cứu' },

  // Common
  'common.loading': { en: 'Loading...', vi: 'Đang tải...' },
  'common.error': { en: 'Something went wrong. Please try again.', vi: 'Đã xảy ra lỗi. Vui lòng thử lại.' },
  'common.back': { en: 'Back', vi: 'Quay lại' },
  'common.readmore': { en: 'Read more', vi: 'Đọc thêm' },
  'common.ai_translated': { en: 'AI-translated — review pending', vi: 'Bản dịch AI — Chờ xem xét' },
  'common.report': { en: 'Report', vi: 'Báo cáo' },
  'common.notfound': { en: 'Report not found.', vi: 'Không tìm thấy báo cáo.' },

  // Theme
  'theme.toggle': { en: 'Toggle light/dark mode', vi: 'Chuyển đổi chế độ sáng/tối' },
  'theme.dark': { en: 'Dark', vi: 'Tối' },
  'theme.light': { en: 'Light', vi: 'Sáng' },

  // Not found
  'notfound.title': { en: 'Page not found', vi: 'Không tìm thấy trang' },
  'notfound.subtitle': {
    en: 'The page you were looking for is either missing or has moved. Try the homepage or browse the research archive.',
    vi: 'Trang bạn đang tìm không tồn tại hoặc đã được di chuyển. Hãy thử trang chủ hoặc duyệt kho nghiên cứu.',
  },
  'notfound.home': { en: 'Go home', vi: 'Về trang chủ' },
  'notfound.research': { en: 'Browse research', vi: 'Xem nghiên cứu' },
};

let currentLang: Lang = (localStorage.getItem('truyendao-lang') as Lang) || detectBrowserLang();

function detectBrowserLang(): Lang {
  const nav = typeof navigator !== 'undefined' ? (navigator.language || '').toLowerCase() : '';
  return nav.startsWith('vi') ? 'vi' : 'en';
}

export function t(key: string): string {
  const entry = strings[key];
  if (!entry) {
    return key;
  }
  return entry[currentLang];
}

export function getLang(): Lang {
  return currentLang;
}

export function setLang(lang: Lang): void {
  currentLang = lang;
  localStorage.setItem('truyendao-lang', lang);
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n')!;
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder')!;
    (el as HTMLInputElement).placeholder = t(key);
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html')!;
    el.innerHTML = t(key);
  });
  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

export function toggleLang(): void {
  setLang(currentLang === 'en' ? 'vi' : 'en');
}

export { type Lang, type Translations };
