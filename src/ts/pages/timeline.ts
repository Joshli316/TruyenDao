import { t, getLang } from '../i18n';
import { localized } from '../data-loader';
import { setCleanup } from '../main';
import { renderFooter } from '../shared/footer';
import { setPageMeta } from '../shared/page-meta';

interface TimelineEvent {
  year: number;
  era: string;
  title: { en: string; vi: string };
  description: { en: string; vi: string };
  category: string;
  significance: number;
}

type View = 'vertical' | 'horizontal';

const VIEW_KEY = 'truyendao-timeline-view';

function getStoredView(): View {
  const v = localStorage.getItem(VIEW_KEY);
  return v === 'horizontal' ? 'horizontal' : 'vertical';
}

function setStoredView(v: View): void {
  localStorage.setItem(VIEW_KEY, v);
}

export async function renderTimeline(): Promise<void> {
  const app = document.getElementById('app');
  if (!app) return;
  setPageMeta({ titleKey: 'meta.timeline.title', descKey: 'meta.timeline.description', route: '#/research/timeline' });

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

  // ignore lang variable (kept for future deep-link translation lookups)
  void getLang();

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
  let activeView: View = window.matchMedia('(min-width: 1024px)').matches
    ? getStoredView()
    : 'vertical';

  function eventLi(event: TimelineEvent): string {
    return `
      <li class="timeline-event cat-${event.category}" data-year="${event.year}" data-significance="${event.significance}">
        <button class="timeline-event-toggle" type="button" aria-expanded="false" aria-controls="event-details-${event.year}">
          <time class="event-year" datetime="${event.year}">${event.year}</time>
          <h4 class="event-title">${localized(event.title)}</h4>
          <span class="event-era">${eraNames[event.era] || event.era}</span>
          <span class="event-expand-hint" data-i18n="timeline.expand" aria-hidden="true">${t('timeline.expand')}</span>
        </button>
        <div class="event-details" id="event-details-${event.year}" hidden>
          <p class="event-desc">${localized(event.description)}</p>
          <dl class="event-meta">
            <dt data-i18n="timeline.category">${t('timeline.category')}</dt>
            <dd>${event.category}</dd>
            <dt data-i18n="timeline.significance">${t('timeline.significance')}</dt>
            <dd>${'★'.repeat(event.significance)}<span class="event-meta-empty">${'☆'.repeat(Math.max(0, 5 - event.significance))}</span></dd>
          </dl>
        </div>
      </li>
    `;
  }

  function renderEvents(filter: string, view: View): string {
    const filtered = filter === 'all' ? events : events.filter(e => e.era === filter);

    // Group by era while preserving event order
    const eraMap = new Map<string, TimelineEvent[]>();
    for (const e of filtered) {
      const list = eraMap.get(e.era) || [];
      list.push(e);
      eraMap.set(e.era, list);
    }

    const wrapper = view === 'horizontal' ? 'timeline-rail' : 'timeline-stack';

    return `
      <div class="${wrapper}" id="timeline-events-inner" role="list">
        ${Array.from(eraMap.entries()).map(([era, items]) => `
          <section class="timeline-era-column" id="era-${era}">
            <header class="timeline-era-divider">
              <h3>${eraNames[era] || era}</h3>
              <span class="timeline-era-count">${items.length}</span>
            </header>
            <ol class="timeline-events" role="list" aria-label="${eraNames[era] || era}">
              ${items.map(eventLi).join('')}
            </ol>
          </section>
        `).join('')}
      </div>
    `;
  }

  function renderViewToggle(view: View): string {
    return `
      <div class="timeline-view-toggle" role="group" aria-label="${t('timeline.view.label')}">
        <span class="timeline-view-label" data-i18n="timeline.view.label">${t('timeline.view.label')}:</span>
        <button data-view="vertical" class="${view === 'vertical' ? 'active' : ''}" data-i18n="timeline.view.vertical">${t('timeline.view.vertical')}</button>
        <button data-view="horizontal" class="${view === 'horizontal' ? 'active' : ''}" data-i18n="timeline.view.horizontal">${t('timeline.view.horizontal')}</button>
      </div>
    `;
  }

  app.innerHTML = `
    <div class="timeline-container view-${activeView}">
      <div class="section-eyebrow" data-i18n="timeline.eyebrow">${t('timeline.eyebrow')}</div>
      <h1 data-i18n="timeline.page.title">${t('timeline.page.title')}</h1>
      <p class="section-subtitle" data-i18n="timeline.page.subtitle">${t('timeline.page.subtitle')}</p>

      <div class="timeline-controls">
        <div class="timeline-era-filters" id="timeline-filters">
          ${filterOptions.map(opt => {
            const label = opt === 'all' ? t('timeline.filter.all') : eraNames[opt];
            return `<button data-cat="${opt}" class="${opt === 'all' ? 'active' : ''}">${label}</button>`;
          }).join('')}
        </div>
        ${renderViewToggle(activeView)}
      </div>

      <div class="timeline-events-wrap" id="timeline-events" data-view="${activeView}">
        ${renderEvents('all', activeView)}
      </div>
    </div>

    ${renderFooter()}
  `;

  const containerEl = app.querySelector('.timeline-container') as HTMLElement | null;
  const filtersEl = document.getElementById('timeline-filters');
  const eventsEl = document.getElementById('timeline-events');
  const toggleEl = app.querySelector('.timeline-view-toggle') as HTMLElement | null;

  // Filter buttons
  if (filtersEl && eventsEl) {
    filtersEl.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest('button');
      if (!btn) return;
      activeFilter = btn.dataset.cat || 'all';
      filtersEl.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      eventsEl.innerHTML = renderEvents(activeFilter, activeView);
      eventsEl.dataset.view = activeView;
      observeEvents();
    });
  }

  // View toggle
  if (toggleEl && eventsEl && containerEl) {
    toggleEl.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest('button[data-view]') as HTMLButtonElement | null;
      if (!btn) return;
      const next = (btn.dataset.view as View) || 'vertical';
      if (next === activeView) return;
      activeView = next;
      setStoredView(activeView);
      toggleEl.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      containerEl.classList.remove('view-vertical', 'view-horizontal');
      containerEl.classList.add(`view-${activeView}`);
      eventsEl.innerHTML = renderEvents(activeFilter, activeView);
      eventsEl.dataset.view = activeView;
      observeEvents();
    });
  }

  // Click-to-expand event details (delegated)
  if (eventsEl) {
    eventsEl.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest('.timeline-event-toggle') as HTMLButtonElement | null;
      if (!btn) return;
      const li = btn.closest('.timeline-event') as HTMLElement | null;
      if (!li) return;
      const details = li.querySelector('.event-details') as HTMLElement | null;
      if (!details) return;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      li.classList.toggle('expanded', !expanded);
      if (expanded) {
        details.setAttribute('hidden', '');
      } else {
        details.removeAttribute('hidden');
      }
    });
  }

  // Scroll-triggered animation
  let currentObserver: IntersectionObserver | null = null;

  function observeEvents(): void {
    if (currentObserver) currentObserver.disconnect();
    currentObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.timeline-event').forEach(el => {
      currentObserver!.observe(el);
    });
  }

  observeEvents();

  setCleanup(() => {
    if (currentObserver) currentObserver.disconnect();
  });

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
        const btn = targetEl.querySelector('.timeline-event-toggle') as HTMLButtonElement | null;
        if (btn && btn.getAttribute('aria-expanded') !== 'true') btn.click();
      }
    }, 100);
  }
}
