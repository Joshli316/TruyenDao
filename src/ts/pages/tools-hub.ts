import { t } from '../i18n';

export function renderToolsHub(): void {
  const app = document.getElementById('app');
  if (!app) return;

  const tools = [
    {
      title: { en: 'Ask the Archive', vi: 'Hỏi Kho Tư Liệu' },
      desc: { en: 'AI-powered Q&A grounded in 12 research reports on Vietnamese Christianity.', vi: 'Hỏi đáp AI dựa trên 12 báo cáo nghiên cứu về Kitô giáo Việt Nam.' },
      href: '#/research/ask',
      accent: 'gold',
    },
    {
      title: { en: 'Animated Spread Map', vi: 'Bản đồ lan tỏa động' },
      desc: { en: 'Watch Christianity grow through accommodation — from coastal missions to Central Highlands.', vi: 'Xem Kitô giáo phát triển qua sự hòa hợp — từ các cứ điểm ven biển đến Tây Nguyên.' },
      href: '#/research/map',
      accent: 'cinnabar',
    },
    {
      title: { en: 'Interactive Timeline', vi: 'Dòng thời gian tương tác' },
      desc: { en: '493 years from first Portuguese contact to today\'s 8-10 million believers.', vi: '493 năm từ lần tiếp xúc đầu tiên của người Bồ Đào Nha đến 8-10 triệu tín hữu ngày nay.' },
      href: '#/research/timeline',
      accent: 'gold',
    },
    {
      title: { en: 'Returnee Preparation', vi: 'Chuẩn bị cho người trở về' },
      desc: { en: 'Personalized 90-day return kit for Vietnamese students navigating church in Vietnam.', vi: 'Bộ chuẩn bị 90 ngày cho sinh viên Việt Nam tìm nhà thờ khi trở về.' },
      href: '#/tools/returnee',
      accent: 'cinnabar',
    },
    {
      title: { en: 'Volunteer Training', vi: 'Đào tạo tình nguyện viên' },
      desc: { en: '5 modules for anyone serving Vietnamese students and returnees.', vi: '5 mô-đun dành cho mọi người phục vụ sinh viên và người trở về Việt Nam.' },
      href: '#/tools/training',
      accent: 'gold',
    },
  ];

  const lang = (localStorage.getItem('truyendao-lang') || 'en') as 'en' | 'vi';
  const loc = (obj: { en: string; vi: string }) => obj[lang] || obj.en;

  app.innerHTML = `
    <div class="section" style="padding-top: calc(64px + var(--space-2xl));">
      <div class="section-eyebrow" data-i18n="nav.tools">${t('nav.tools')}</div>
      <h1 data-i18n="tools.title">${t('tools.title')}</h1>
      <p class="section-subtitle" data-i18n="tools.subtitle">${t('tools.subtitle')}</p>
      <div class="gold-divider"></div>
      <div class="report-grid">
        ${tools.map(tool => `
          <a href="${tool.href}" class="lacquer-card" style="text-decoration: none;">
            <div class="card-title">${loc(tool.title)}</div>
            <div class="card-desc">${loc(tool.desc)}</div>
          </a>
        `).join('')}
      </div>
    </div>
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-mission" data-i18n="footer.mission">${t('footer.mission')}</div>
        <div class="footer-links">
          <a href="#/about" data-i18n="footer.fc">${t('footer.fc')}</a>
        </div>
      </div>
      <div class="footer-tagline" data-i18n="footer.tagline">${t('footer.tagline')}</div>
    </footer>
  `;
}
