type Theme = 'light' | 'dark';

const THEME_KEY = 'truyendao-theme';

function detectInitial(): Theme {
  const saved = localStorage.getItem(THEME_KEY) as Theme | null;
  if (saved === 'light' || saved === 'dark') return saved;
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'dark';
}

export function getTheme(): Theme {
  return (document.documentElement.getAttribute('data-theme') as Theme) === 'light' ? 'light' : 'dark';
}

export function setTheme(theme: Theme): void {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  localStorage.setItem(THEME_KEY, theme);
  const meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
  if (meta) meta.content = theme === 'light' ? '#F4ECDC' : '#12090B';
  syncToggle();
}

export function toggleTheme(): void {
  setTheme(getTheme() === 'light' ? 'dark' : 'light');
}

function syncToggle(): void {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const isLight = getTheme() === 'light';
  btn.setAttribute('aria-pressed', String(isLight));
}

export function initTheme(): void {
  // Initial DOM was set inline by index.html script; this only re-syncs in case localStorage diverges.
  const theme = detectInitial();
  if (theme === 'light' && document.documentElement.getAttribute('data-theme') !== 'light') {
    setTheme('light');
  } else if (theme === 'dark' && document.documentElement.hasAttribute('data-theme')) {
    setTheme('dark');
  }

  syncToggle();

  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', toggleTheme);
  }

  // Follow OS changes only if user hasn't picked manually
  const mq = window.matchMedia('(prefers-color-scheme: light)');
  mq.addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_KEY)) {
      setTheme(e.matches ? 'light' : 'dark');
      // remove key again so we keep following OS
      localStorage.removeItem(THEME_KEY);
    }
  });
}
