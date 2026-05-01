import { setLang, getLang, t } from './i18n';
import { initTheme } from './theme';

type Route = {
  path: string;
  render: () => void;
};

const routes: Route[] = [];
let currentCleanup: (() => void) | null = null;

export function registerRoute(path: string, render: () => void): void {
  routes.push({ path, render });
}

function getHash(): string {
  return window.location.hash.slice(1) || '/';
}

function findMatch(hash: string): { route: Route; params: Record<string, string> } | null {
  const exact = routes.find(r => r.path === hash);
  if (exact) return { route: exact, params: {} };

  for (const route of routes) {
    const routeParts = route.path.split('/');
    const hashParts = hash.split('/');
    if (routeParts.length !== hashParts.length) continue;

    let match = true;
    const params: Record<string, string> = {};
    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) {
        params[routeParts[i].slice(1)] = hashParts[i];
      } else if (routeParts[i] !== hashParts[i]) {
        match = false;
        break;
      }
    }
    if (match) return { route, params };
  }
  return null;
}

function matchRoute(hash: string): Route | undefined {
  return findMatch(hash)?.route;
}

export function getRouteParam(paramName: string): string | null {
  const match = findMatch(getHash());
  return match?.params[paramName] ?? null;
}

export function navigate(path: string): void {
  window.location.hash = path;
}

function handleRoute(): void {
  const hash = getHash();
  const route = matchRoute(hash);

  if (currentCleanup) {
    currentCleanup();
    currentCleanup = null;
  }

  if (route) {
    route.render();
  } else if (hash === '/' || hash === '') {
    const home = routes.find(r => r.path === '/');
    if (home) home.render();
  } else {
    import('./pages/not-found').then(m => m.renderNotFound());
  }

  window.scrollTo(0, 0);
  document.getElementById('app')?.focus();

  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (hash.startsWith(href.replace('#', ''))) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
}

export function setCleanup(fn: () => void): void {
  currentCleanup = fn;
}

function initNav(): void {
  // Language toggle
  const langBtns = document.querySelectorAll('.lang-toggle button');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang') as 'en' | 'vi';
      setLang(lang);
      updateLangButtons();
    });
  });

  // Scroll effect on nav
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }
  });

  // Mobile menu
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
      });
    });
  }

  // Search shortcut (Cmd+K)
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      const modal = document.getElementById('search-modal');
      if (modal) {
        modal.classList.toggle('open');
        const input = modal.querySelector('.search-input') as HTMLInputElement;
        if (input) input.focus();
      }
    }
    if (e.key === 'Escape') {
      const modal = document.getElementById('search-modal');
      if (modal) modal.classList.remove('open');
    }
  });

  const searchModal = document.getElementById('search-modal');
  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) {
        searchModal.classList.remove('open');
      }
    });
  }

  updateLangButtons();
}

function updateLangButtons(): void {
  const lang = getLang();
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

window.addEventListener('langchange', () => {
  updateLangButtons();
  handleRoute();
});

export function initApp(): void {
  initNav();
  initTheme();
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}
