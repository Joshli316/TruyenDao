import { t } from '../i18n';

export function renderPersonasHub(): void {
  const app = document.getElementById('app');
  if (!app) return;

  const personas = [
    { name: 'Alexandre de Rhodes', dates: '1591\u20131660', desc: 'Jesuit missionary, creator of ch\u1eef Qu\u1ed1c ng\u1eef dictionary', era: 'Missionary Pioneers' },
    { name: 'Nguy\u1ec5n V\u0103n Thu\u1eadn', dates: '1928\u20132002', desc: 'Cardinal, 13 years imprisoned for faith', era: 'Modern Voices' },
    { name: 'Andrew of Ph\u00fa Y\u00ean', dates: '1625\u20131644', desc: 'First Vietnamese martyr, killed at age 19', era: 'Vietnamese Saints' },
    { name: 'Tr\u1ea7n L\u1ee5c', dates: '1825\u20131899', desc: 'Builder of Ph\u00e1t Di\u1ec7m Cathedral', era: 'Vietnamese Saints' },
    { name: 'Robert Jaffray', dates: '1873\u20131945', desc: 'CMA pioneer, brought Protestantism to Vietnam', era: 'Missionary Pioneers' },
    { name: 'Hmong Elder', dates: 'Composite voice', desc: 'Representing the Central Highlands conversion story', era: 'Modern Voices' },
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
            <div class="card-number">${p.era}</div>
            <div class="card-title">${p.name}</div>
            <div style="font-family: var(--font-mono); font-size: 12px; color: var(--text-tertiary); margin-bottom: var(--space-sm);">${p.dates}</div>
            <div class="card-desc">${p.desc}</div>
            <div style="margin-top: var(--space-md);">
              <span class="btn-gold-ghost" style="opacity: 0.5; cursor: default; font-size: 12px; padding: 6px 12px;">Coming in Phase 3</span>
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
