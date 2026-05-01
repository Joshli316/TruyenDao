import { t, SISTER_PROJECTS } from '../i18n';

function renderSisterFamilyBlock(): string {
  const main = SISTER_PROJECTS.find(p => p.isMain)!;
  const others = SISTER_PROJECTS.filter(p => !p.isMain && p.key !== 'truyendao');
  return `
    <div class="footer-family">
      <div class="footer-family__title" data-i18n="footer.family_title">${t('footer.family_title')}</div>
      <div class="footer-family__row">
        <a class="footer-family__main" href="${main.url}" target="_blank" rel="noopener">
          <span aria-hidden="true">${main.emoji}</span>
          <span class="footer-family__main-tag">${main.tag}</span>
          <span class="footer-family__main-name">XuanYan</span>
          <span class="footer-family__main-badge" data-i18n="footer.family_main">${t('footer.family_main')}</span>
        </a>
        <span class="footer-family__current" aria-current="page">
          <span aria-hidden="true">🇻🇳</span>
          <span>傳道 TruyềnĐạo</span>
        </span>
        ${others.map(p => `
          <a class="footer-family__sister" href="${p.url}" target="_blank" rel="noopener">
            <span aria-hidden="true">${p.emoji}</span>
            <span>${p.tag}</span>
          </a>
        `).join('')}
      </div>
    </div>
  `;
}

export function renderFooter(): string {
  return `
    <footer class="footer">
      ${renderSisterFamilyBlock()}
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
