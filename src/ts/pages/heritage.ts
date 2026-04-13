import { t } from '../i18n';

export function renderHeritage(): void {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="section" style="padding-top: calc(64px + var(--space-2xl));">
      <div class="section-eyebrow" data-i18n="nav.heritage">${t('nav.heritage')}</div>
      <h1 data-i18n="heritage.title">${t('heritage.title')}</h1>
      <p class="section-subtitle" data-i18n="heritage.subtitle">${t('heritage.subtitle')}</p>
      <div class="gold-divider"></div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-lg);">
        <div class="lacquer-card featured" style="border-top: 3px solid var(--accent-cinnabar);">
          <div class="card-number" style="color: var(--accent-cinnabar);">I</div>
          <div class="card-title" style="font-size: 28px; margin-bottom: var(--space-md);">The 117 Saints</div>
          <div class="card-desc" style="font-size: 16px; line-height: 1.6;">The largest single-country group canonization in Catholic history. Walk through the persecution eras of Minh Mạng, Thiệu Trị, and Tự Đức. Discover the stories of courage that earned 117 Vietnamese, Spanish, and French believers their place among the saints.</div>
          <div style="margin-top: var(--space-lg);">
            <span class="btn-cinnabar" style="opacity: 0.5; cursor: default;">Coming in Phase 2</span>
          </div>
        </div>
        <div class="lacquer-card featured" style="border-top: 3px solid var(--accent-gold);">
          <div class="card-number">II</div>
          <div class="card-title" style="font-size: 28px; margin-bottom: var(--space-md);">The Gift of Letters</div>
          <div class="card-desc" style="font-size: 16px; line-height: 1.6;">How Jesuit missionaries invented the Vietnamese alphabet. Follow the journey from Francisco de Pina's linguistic genius through Alexandre de Rhodes' dictionary to 100 million people writing in a missionary-created script. The communists promoted it. The world forgot who made it.</div>
          <div style="margin-top: var(--space-lg);">
            <span class="btn-gold-ghost" style="opacity: 0.5; cursor: default;">Coming in Phase 2</span>
          </div>
        </div>
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
