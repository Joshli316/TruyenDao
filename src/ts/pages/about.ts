import { t } from '../i18n';
import { renderFooter } from '../shared/footer';

export function renderAbout(): void {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="section" style="padding-top: calc(64px + var(--space-2xl));">
      <h1 data-i18n="about.title">${t('about.title')}</h1>
      <div class="gold-divider"></div>
      <div style="max-width: 700px;">
        <p style="font-size: 18px; line-height: 1.75; color: var(--text-secondary); margin-bottom: var(--space-lg);" data-i18n="about.p1">${t('about.p1')}</p>
        <p style="font-size: 16px; line-height: 1.75; color: var(--text-secondary); margin-bottom: var(--space-lg);" data-i18n="about.p2">${t('about.p2')}</p>
        <p style="font-size: 16px; line-height: 1.75; color: var(--text-secondary);" data-i18n="about.p3">${t('about.p3')}</p>
      </div>
    </div>

    ${renderFooter()}
  `;
}
