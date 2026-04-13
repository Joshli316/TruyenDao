import { t } from '../i18n';

export function renderPersonasHub(): void {
  const app = document.getElementById('app');
  if (!app) return;

  const personas = [
    { nameKey: 'personas.rhodes.name', datesKey: 'personas.rhodes.dates', descKey: 'personas.rhodes.desc', eraKey: 'personas.era.pioneers' },
    { nameKey: 'personas.thuan.name', datesKey: 'personas.thuan.dates', descKey: 'personas.thuan.desc', eraKey: 'personas.era.modern' },
    { nameKey: 'personas.andrew.name', datesKey: 'personas.andrew.dates', descKey: 'personas.andrew.desc', eraKey: 'personas.era.saints' },
    { nameKey: 'personas.tranluc.name', datesKey: 'personas.tranluc.dates', descKey: 'personas.tranluc.desc', eraKey: 'personas.era.saints' },
    { nameKey: 'personas.jaffray.name', datesKey: 'personas.jaffray.dates', descKey: 'personas.jaffray.desc', eraKey: 'personas.era.pioneers' },
    { nameKey: 'personas.hmong.name', datesKey: 'personas.hmong.dates', descKey: 'personas.hmong.desc', eraKey: 'personas.era.modern' },
  ];

  app.innerHTML = `
    <div class="section" style="padding-top: calc(64px + var(--space-2xl));">
      <div class="section-eyebrow" data-i18n="nav.personas">${t('nav.personas')}</div>
      <h1 data-i18n="personas.title">${t('personas.title')}</h1>
      <p class="section-subtitle" data-i18n="personas.subtitle">${t('personas.subtitle')}</p>
      <div class="gold-divider"></div>
      <div class="report-grid">
        ${personas.map(p => `
          <div class="lacquer-card">
            <div class="card-number" data-i18n="${p.eraKey}">${t(p.eraKey)}</div>
            <div class="card-title" data-i18n="${p.nameKey}">${t(p.nameKey)}</div>
            <div style="font-family: var(--font-mono); font-size: 12px; color: var(--text-tertiary); margin-bottom: var(--space-sm);" data-i18n="${p.datesKey}">${t(p.datesKey)}</div>
            <div class="card-desc" data-i18n="${p.descKey}">${t(p.descKey)}</div>
            <div style="margin-top: var(--space-md);">
              <span class="btn-gold-ghost" style="opacity: 0.5; cursor: default; font-size: 12px; padding: 6px 12px;" data-i18n="personas.coming">${t('personas.coming')}</span>
            </div>
          </div>
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
