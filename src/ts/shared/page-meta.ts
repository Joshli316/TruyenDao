import { t } from '../i18n';

const SITE_TITLE = 'TruyềnĐạo 傳道';
const SITE_BASE = 'https://truyendao.pages.dev';

const DEFAULT_DESC_KEY = 'meta.default.description';

interface PageMetaOptions {
  /** i18n key for the page title (without site name suffix) */
  titleKey: string;
  /** i18n key for the page description; falls back to site default */
  descKey?: string;
  /** explicit hash route (e.g. '#/research') for canonical/og:url */
  route?: string;
}

let lastApplied: PageMetaOptions | null = null;

export function setPageMeta(opts: PageMetaOptions): void {
  lastApplied = opts;
  applyMeta(opts);
}

export function reapplyPageMeta(): void {
  if (lastApplied) applyMeta(lastApplied);
}

function applyMeta(opts: PageMetaOptions): void {
  const pageTitle = t(opts.titleKey);
  const fullTitle = opts.titleKey === 'meta.home.title'
    ? `${SITE_TITLE} — ${pageTitle}`
    : `${pageTitle} — ${SITE_TITLE}`;
  document.title = fullTitle;

  const desc = t(opts.descKey || DEFAULT_DESC_KEY);
  setMeta('name', 'description', desc);

  setMeta('property', 'og:title', fullTitle);
  setMeta('property', 'og:description', desc);
  setMeta('name', 'twitter:title', fullTitle);
  setMeta('name', 'twitter:description', desc);

  // Canonical: prefer clean URLs (no hash) so Google indexes one form
  const route = opts.route ?? window.location.hash;
  const cleanPath = (route || '').replace(/^#?\/?/, '');
  const url = cleanPath ? `${SITE_BASE}/${cleanPath}` : `${SITE_BASE}/`;
  setLink('canonical', url);
  setMeta('property', 'og:url', url);
}

function setMeta(attr: 'name' | 'property', key: string, value: string): void {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}

function setLink(rel: string, href: string): void {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}
