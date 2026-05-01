import { t } from '../i18n';
import { renderFooter } from '../shared/footer';
import { setPageMeta } from '../shared/page-meta';

export function renderNotFound(): void {
  const app = document.getElementById('app');
  if (!app) return;
  // 404 canonical points to root, not the bad URL
  setPageMeta({ titleKey: 'meta.notfound.title', route: '#/' });
  app.innerHTML = `
    <div class="not-found">
      <div class="not-found-inner">
        <div class="section-eyebrow">404</div>
        <h1 data-i18n="notfound.title">${t('notfound.title')}</h1>
        <p class="section-subtitle" data-i18n="notfound.subtitle">${t('notfound.subtitle')}</p>
        <div class="not-found-actions">
          <a href="#/" class="btn-cinnabar" data-i18n="notfound.home">${t('notfound.home')}</a>
          <a href="#/research" class="btn-gold-ghost" data-i18n="notfound.research">${t('notfound.research')}</a>
        </div>
      </div>
    </div>
    ${renderFooter()}
  `;
}
