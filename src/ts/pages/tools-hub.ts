import { t } from '../i18n';
import { localized } from '../data-loader';
import { renderFooter } from '../shared/footer';

export function renderToolsHub(): void {
  const app = document.getElementById('app');
  if (!app) return;

  const tools = [
    { title: { en: 'Ask the Archive', vi: 'Hỏi Kho Tư Liệu' }, desc: { en: 'AI-powered Q&A grounded in 12 research reports on Vietnamese Christianity.', vi: 'Hỏi đáp AI dựa trên 12 báo cáo nghiên cứu về Kitô giáo Việt Nam.' }, href: '#/research/ask' },
    { title: { en: 'Animated Spread Map', vi: 'Bản đồ lan tỏa động' }, desc: { en: 'Watch Christianity grow through accommodation — from coastal missions to Central Highlands.', vi: 'Xem Kitô giáo phát triển qua sự hòa hợp — từ các cứ điểm ven biển đến Tây Nguyên.' }, href: '#/research/map' },
    { title: { en: 'Interactive Timeline', vi: 'Dòng thời gian tương tác' }, desc: { en: '493 years from first Portuguese contact to today\'s 8-10 million believers.', vi: '493 năm từ lần tiếp xúc đầu tiên của người Bồ Đào Nha đến 8-10 triệu tín hữu ngày nay.' }, href: '#/research/timeline' },
    { title: { en: 'Missionary Network', vi: 'Mạng lưới nhà truyền giáo' }, desc: { en: 'Explore the relationships between missionaries, Vietnamese leaders, and mission organizations.', vi: 'Khám phá mối quan hệ giữa các nhà truyền giáo, lãnh đạo Việt Nam, và các tổ chức truyền giáo.' }, href: '#/research/network' },
    { title: { en: 'Returnee Preparation', vi: 'Chuẩn bị cho người trở về' }, desc: { en: 'Personalized 90-day return kit for Vietnamese students navigating church in Vietnam.', vi: 'Bộ chuẩn bị 90 ngày cho sinh viên Việt Nam tìm nhà thờ khi trở về.' }, href: '#/tools/returnee' },
    { title: { en: 'Volunteer Training', vi: 'Đào tạo tình nguyện viên' }, desc: { en: '5 modules for anyone serving Vietnamese students and returnees.', vi: '5 mô-đun dành cho mọi người phục vụ sinh viên và người trở về Việt Nam.' }, href: '#/tools/training' },
    { title: { en: 'Faith Retention Calculator', vi: 'Công cụ dự đoán gìn giữ đức tin' }, desc: { en: 'Estimate return-to-home faith retention and model interventions.', vi: 'Dự đoán khả năng gìn giữ đức tin khi trở về và mô hình can thiệp.' }, href: '#/tools/retention' },
    { title: { en: 'Research Gap Tracker', vi: 'Theo dõi khoảng trống nghiên cứu' }, desc: { en: 'Track the biggest unanswered questions in Vietnam missions scholarship.', vi: 'Theo dõi các câu hỏi lớn chưa được giải đáp trong học thuật truyền giáo Việt Nam.' }, href: '#/research/gaps' },
    { title: { en: 'Trilingual Comparator', vi: 'So sánh ba ngôn ngữ' }, desc: { en: 'Compare English, Vietnamese, and French sources on the same topic — side by side.', vi: 'So sánh nguồn tiếng Anh, tiếng Việt, và tiếng Pháp về cùng một chủ đề — cạnh nhau.' }, href: '#/research/comparator' },
  ];

  app.innerHTML = `
    <div class="section" style="padding-top: calc(64px + var(--space-2xl));">
      <div class="section-eyebrow" data-i18n="nav.tools">${t('nav.tools')}</div>
      <h1 data-i18n="tools.title">${t('tools.title')}</h1>
      <p class="section-subtitle" data-i18n="tools.subtitle">${t('tools.subtitle')}</p>
      <div class="gold-divider"></div>
      <div class="report-grid">
        ${tools.map(tool => `
          <a href="${tool.href}" class="lacquer-card" style="text-decoration: none;">
            <div class="card-title">${localized(tool.title)}</div>
            <div class="card-desc">${localized(tool.desc)}</div>
          </a>
        `).join('')}
      </div>
    </div>
    ${renderFooter()}
  `;
}
