import { t } from '../i18n';
import { renderFooter } from '../shared/footer';

export function renderHeritage(): void {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="section" style="padding-top: calc(64px + var(--space-2xl));">
      <div class="section-eyebrow" data-i18n="nav.heritage">${t('nav.heritage')}</div>
      <h1 data-i18n="heritage.title">${t('heritage.title')}</h1>
      <p class="section-subtitle" data-i18n="heritage.subtitle">${t('heritage.subtitle')}</p>
      <div class="gold-divider"></div>
      <div class="heritage-grid">
        <a href="#/heritage/martyrs" class="lacquer-card featured" style="border-top: 3px solid var(--accent-cinnabar); text-decoration: none;">
          <div class="card-number" style="color: var(--accent-cinnabar);">I</div>
          <div class="card-title" style="font-size: 28px; margin-bottom: var(--space-md);" data-i18n="heritage.martyrs.title">${t('heritage.martyrs.title')}</div>
          <div class="card-desc" style="font-size: 16px; line-height: 1.6;" data-i18n="heritage.martyrs.desc">${t('heritage.martyrs.desc')}</div>
          <div style="margin-top: var(--space-lg);">
            <span class="btn-cinnabar">${t('common.readmore')} &rarr;</span>
          </div>
        </a>
        <a href="#/heritage/script" class="lacquer-card featured" style="border-top: 3px solid var(--accent-gold); text-decoration: none;">
          <div class="card-number">II</div>
          <div class="card-title" style="font-size: 28px; margin-bottom: var(--space-md);" data-i18n="heritage.script.title">${t('heritage.script.title')}</div>
          <div class="card-desc" style="font-size: 16px; line-height: 1.6;" data-i18n="heritage.script.desc">${t('heritage.script.desc')}</div>
          <div style="margin-top: var(--space-lg);">
            <span class="btn-gold-ghost">${t('common.readmore')} &rarr;</span>
          </div>
        </a>
      </div>
    </div>
    ${renderFooter()}
  `;
}
