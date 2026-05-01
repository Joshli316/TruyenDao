import { t, getLang } from '../i18n';
import { renderFooter } from '../shared/footer';
import { setPageMeta } from '../shared/page-meta';

interface LocalizedString {
  en: string;
  vi: string;
}

interface Persona {
  id: string;
  name: LocalizedString;
  dates: string;
  role: LocalizedString;
  era: LocalizedString;
  systemPrompt: string;
  starters: { en: string[]; vi: string[] };
}

function localized(obj: LocalizedString): string {
  return obj[getLang()];
}

export async function renderPersonasHub(): Promise<void> {
  const app = document.getElementById('app');
  if (!app) return;
  setPageMeta({ titleKey: 'meta.personas.title', descKey: 'meta.personas.description' });

  // Show loading state
  app.innerHTML = `
    <div class="section" style="padding-top: calc(64px + var(--space-2xl));">
      <p style="text-align: center; color: var(--text-tertiary);">${t('common.loading')}</p>
    </div>
  `;

  // Load persona data from JSON
  let personas: Persona[] = [];
  try {
    const response = await fetch(new URL('../../data/personas/index.json', import.meta.url).href);
    personas = await response.json();
  } catch {
    app.innerHTML = `
      <div class="section" style="padding-top: calc(64px + var(--space-2xl));">
        <p style="text-align: center; color: var(--text-tertiary);">${t('common.error')}</p>
      </div>
    `;
    return;
  }

  app.innerHTML = `
    <div class="section" style="padding-top: calc(64px + var(--space-2xl));">
      <div class="section-eyebrow" data-i18n="nav.personas">${t('nav.personas')}</div>
      <h1 data-i18n="personas.title">${t('personas.title')}</h1>
      <p class="section-subtitle" data-i18n="personas.subtitle">${t('personas.subtitle')}</p>
      <div class="gold-divider"></div>
      <div class="report-grid">
        ${personas.map(p => `
          <a href="#/personas/${p.id}" class="lacquer-card" style="text-decoration: none; color: inherit; cursor: pointer; display: block;">
            <div class="card-number">${localized(p.era)}</div>
            <div class="card-title">${localized(p.name)}</div>
            <div style="font-family: var(--font-mono); font-size: 12px; color: var(--text-tertiary); margin-bottom: var(--space-sm);">${p.dates}</div>
            <div class="card-desc">${localized(p.role)}</div>
            <div style="margin-top: var(--space-md);">
              <span class="btn-gold-ghost" style="font-size: 12px; padding: 6px 12px;">${getLang() === 'vi' ? 'Trò chuyện' : 'Start conversation'}</span>
            </div>
          </a>
        `).join('')}
      </div>
    </div>
    ${renderFooter()}
  `;
}
