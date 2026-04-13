import { t, getLang } from '../i18n';
import { setCleanup } from '../main';

interface TimelineEvent {
  year: number;
  era: string;
  title: { en: string; vi: string };
  description: { en: string; vi: string };
  category: string;
  significance: number;
}

export async function renderTimeline(): Promise<void> {
  const app = document.getElementById('app');
  if (!app) return;

  // Show loading
  app.innerHTML = `
    <div class="timeline-container">
      <div class="section-eyebrow" data-i18n="timeline.eyebrow">${t('timeline.eyebrow')}</div>
      <h1 data-i18n="timeline.page.title">${t('timeline.page.title')}</h1>
      <p class="section-subtitle" data-i18n="timeline.page.subtitle">${t('timeline.page.subtitle')}</p>
      <div class="skeleton" style="height: 400px;"></div>
    </div>
  `;

  // Load data
  const mod = await import('../../data/timeline.json');
  const events: TimelineEvent[] = mod.default;

  const lang = getLang();
  const loc = (obj: { en: string; vi: string }) => obj[lang] || obj.en;

  // Get unique eras in order
  const eraOrder = ['early', 'jesuit', 'mep', 'persecution', 'colonial', 'partition', 'communist', 'modern'];
  const eraNames: Record<string, string> = {
    early: t('era.early'),
    jesuit: t('era.jesuit'),
    mep: t('era.mep'),
    persecution: t('era.persecution'),
    colonial: t('era.colonial'),
    partition: t('era.partition'),
    communist: t('era.communist'),
    modern: t('era.modern'),
  };

  const filterOptions = ['all', ...eraOrder];
  let activeFilter = 'all';

  function renderEvents(filter: string): string {
    let filtered = events;
    if (filter !== 'all') {
      filtered = events.filter(e => e.era === filter);
    }

    // Group by era
    let html = '';
    let currentEra = '';

    filtered.forEach(event => {
      if (event.era !== currentEra) {
        currentEra = event.era;
        html += `
          <div class="timeline-era-divider" id="era-${currentEra}">
            <h3>${eraNames[currentEra] || currentEra}</h3>
          </div>
        `;
      }

      html += `
        <div class="timeline-event cat-${event.category}" data-year="${event.year}">
          <div class="event-year">${event.year}</div>
          <div class="event-title">${loc(event.title)}</div>
          <div class="event-desc">${loc(event.description)}</div>
          <div class="event-era">${eraNames[event.era] || event.era}</div>
        </div>
      `;
    });

    return html;
  }

  app.innerHTML = `
    <div class="timeline-container">
      <div class="section-eyebrow" data-i18n="timeline.eyebrow">${t('timeline.eyebrow')}</div>
      <h1 data-i18n="timeline.page.title">${t('timeline.page.title')}</h1>
      <p class="section-subtitle" data-i18n="timeline.page.subtitle">${t('timeline.page.subtitle')}</p>

      <div class="timeline-era-filters" id="timeline-filters">
        ${filterOptions.map(opt => {
          const label = opt === 'all' ? t('timeline.filter.all') : eraNames[opt];
          return `<button data-cat="${opt}" class="${opt === 'all' ? 'active' : ''}">${label}</button>`;
        }).join('')}
      </div>

      <div class="timeline-vertical" id="timeline-events">
        ${renderEvents('all')}
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

  // Filter buttons
  const filtersEl = document.getElementById('timeline-filters');
  const eventsEl = document.getElementById('timeline-events');
  if (filtersEl && eventsEl) {
    filtersEl.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest('button');
      if (!btn) return;
      activeFilter = btn.dataset.cat || 'all';
      filtersEl.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      eventsEl.innerHTML = renderEvents(activeFilter);
      observeEvents();
    });
  }

  // Scroll-triggered animation
  function observeEvents(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.timeline-event').forEach(el => {
      observer.observe(el);
    });
  }

  observeEvents();

  // Handle deep links like #/research/timeline?year=1651 or #/research/timeline/1651
  const hash = window.location.hash;
  const yearMatch = hash.match(/[?&]year=(\d+)/) || hash.match(/\/timeline\/(\d+)/);
  if (yearMatch) {
    const targetYear = yearMatch[1];
    setTimeout(() => {
      const targetEl = document.querySelector(`[data-year="${targetYear}"]`);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetEl.classList.add('visible');
      }
    }, 100);
  }
}
