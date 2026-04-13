import { t } from '../i18n';

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

    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-mission" data-i18n="footer.mission">${t('footer.mission')}</div>
        <div class="footer-links">
          <a href="#/about" data-i18n="footer.fc">${t('footer.fc')}</a>
          <a href="#" data-i18n="footer.github">${t('footer.github')}</a>
        </div>
      </div>
      <div class="footer-tagline" data-i18n="footer.tagline">${t('footer.tagline')}</div>
    </footer>
  `;
}
