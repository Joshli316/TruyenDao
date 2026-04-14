import { t, getLang } from '../i18n';
import { loadAllReports, loadReport, localized, type ReportData } from '../data-loader';
import { getRouteParam, setCleanup } from '../main';
import { renderFooter } from '../shared/footer';

export async function renderResearchList(): Promise<void> {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="section" style="padding-top: calc(64px + var(--space-2xl));">
      <div class="section-eyebrow" data-i18n="nav.research">${t('nav.research')}</div>
      <h1 data-i18n="research.title">${t('research.title')}</h1>
      <p class="section-subtitle" data-i18n="research.subtitle">${t('research.subtitle')}</p>
      <input type="text" class="search-page-input" id="report-search" data-i18n-placeholder="research.search.placeholder" placeholder="${t('research.search.placeholder')}">
      <div class="report-filters" id="tag-filters"></div>
      <div class="report-grid" id="report-grid">
        <div class="skeleton" style="height: 200px;"></div>
        <div class="skeleton" style="height: 200px;"></div>
        <div class="skeleton" style="height: 200px;"></div>
      </div>
    </div>
    ${renderFooter()}
  `;

  const reports = await loadAllReports();
  const grid = document.getElementById('report-grid')!;
  const filterContainer = document.getElementById('tag-filters')!;
  const searchInput = document.getElementById('report-search') as HTMLInputElement;

  // Build tag filters
  const allTags = new Set<string>();
  reports.forEach(r => r.tags.forEach(tag => allTags.add(tag)));

  let activeTag = 'all';
  filterContainer.innerHTML = `
    <button class="active" data-tag="all" data-i18n="research.filter.all">${t('research.filter.all')}</button>
    ${Array.from(allTags).map(tag => {
      const i18nKey = `research.filter.${tag}`;
      return `<button data-tag="${tag}" data-i18n="${i18nKey}">${t(i18nKey)}</button>`;
    }).join('')}
  `;

  function renderGrid(filter: string, query: string): void {
    let filtered = reports;
    if (filter !== 'all') {
      filtered = filtered.filter(r => r.tags.includes(filter));
    }
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(r =>
        localized(r.title).toLowerCase().includes(q) ||
        localized(r.summary).toLowerCase().includes(q) ||
        r.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    grid.innerHTML = filtered.map(r => `
      <a href="#/research/${r.id}" class="lacquer-card${r.featured ? ' featured' : ''}">
        <div class="card-number">${t('common.report')} ${r.id}</div>
        <div class="card-title">${localized(r.title)}</div>
        <div class="card-desc">${localized(r.summary).substring(0, 160)}...</div>
        <div class="card-meta">${r.readingTime} ${t('research.readingtime')} &middot; ${r.tags.join(', ')}</div>
      </a>
    `).join('');

    if (filtered.length === 0) {
      grid.innerHTML = `<p style="color: var(--text-tertiary);" data-i18n="search.no_results">${t('search.no_results')}</p>`;
    }
  }

  renderGrid('all', '');

  filterContainer.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('button');
    if (!btn) return;
    activeTag = btn.dataset.tag || 'all';
    filterContainer.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderGrid(activeTag, searchInput.value);
  });

  searchInput.addEventListener('input', () => {
    renderGrid(activeTag, searchInput.value);
  });
}

export async function renderResearchDetail(): Promise<void> {
  const app = document.getElementById('app');
  if (!app) return;

  const id = getRouteParam('id');
  if (!id) {
    app.innerHTML = `<p style="padding: 120px 24px; color: var(--text-tertiary);">${t('common.notfound')}</p>`;
    return;
  }

  app.innerHTML = `<div class="report-detail"><div class="skeleton" style="height: 400px;"></div></div>`;

  let report: ReportData;
  try {
    report = await loadReport(id);
  } catch {
    app.innerHTML = `<p style="padding: 120px 24px; color: var(--text-tertiary);">${t('common.notfound')}</p>`;
    return;
  }

  // Progress bar
  const progressBar = document.createElement('div');
  progressBar.className = 'reading-progress';
  progressBar.style.width = '0%';
  document.body.appendChild(progressBar);

  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(pct, 100)}%`;
  };
  window.addEventListener('scroll', onScroll);

  // Determine prev/next
  const num = parseInt(id);
  const prevId = num > 1 ? String(num - 1).padStart(2, '0') : null;
  const nextId = num < 12 ? String(num + 1).padStart(2, '0') : null;

  // Render with TOC sidebar
  const tocLinks = report.sections.map((s, i) =>
    `<a href="#section-${i}" data-idx="${i}">${localized(s.heading)}</a>`
  ).join('');

  const sectionsHtml = report.sections.map((s, i) => `
    <div id="section-${i}">
      <h2>${localized(s.heading)}</h2>
      <div class="report-section-content">${renderMarkdown(localized(s.content))}</div>
    </div>
  `).join('');

  app.innerHTML = `
    <div class="report-layout">
      <aside class="report-toc">
        <a href="#/research" class="report-back" data-i18n="toc.back">${t('toc.back')}</a>
        <div class="toc-title" data-i18n="toc.title">${t('toc.title')}</div>
        ${tocLinks}
      </aside>
      <article class="report-detail" style="padding: 0;">
        <div class="report-meta">
          <span>${t('common.report')} ${report.id}</span>
          <span>${report.readingTime} ${t('research.readingtime')}</span>
          <span>${report.tags.join(', ')}</span>
        </div>
        <h1>${localized(report.title)}</h1>
        <p style="font-size: 18px; line-height: 1.75; color: var(--text-secondary); margin-bottom: var(--space-xl);">${localized(report.summary)}</p>
        ${getLang() === 'vi' ? '<span class="ai-badge">Bản dịch AI — Chờ xem xét</span>' : ''}
        ${sectionsHtml}
        <div style="display: flex; justify-content: space-between; margin-top: var(--space-2xl); padding-top: var(--space-lg); border-top: 1px solid var(--border-subtle);">
          ${prevId ? `<a href="#/research/${prevId}" class="btn-gold-ghost" data-i18n="toc.prev">&larr; ${t('toc.prev')}</a>` : '<span></span>'}
          ${nextId ? `<a href="#/research/${nextId}" class="btn-cinnabar" data-i18n="toc.next">${t('toc.next')} &rarr;</a>` : '<span></span>'}
        </div>
      </article>
    </div>
    ${renderFooter()}
  `;

  // Active TOC highlighting on scroll
  const tocObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = entry.target.id.replace('section-', '');
        document.querySelectorAll('.report-toc a[data-idx]').forEach(a => {
          a.classList.toggle('active', a.getAttribute('data-idx') === idx);
        });
      }
    });
  }, { rootMargin: '-80px 0px -50% 0px' });

  report.sections.forEach((_, i) => {
    const el = document.getElementById(`section-${i}`);
    if (el) tocObserver.observe(el);
  });

  setCleanup(() => {
    window.removeEventListener('scroll', onScroll);
    progressBar.remove();
    tocObserver.disconnect();
  });
}

function renderMarkdown(text: string): string {
  // Simple markdown rendering — handles paragraphs, bold, italic, lists, headers
  return text
    .split('\n\n')
    .map(block => {
      block = block.trim();
      if (!block) return '';

      // Headers
      if (block.startsWith('### ')) return `<h3>${block.slice(4)}</h3>`;
      if (block.startsWith('## ')) return `<h2>${block.slice(3)}</h2>`;

      // Unordered lists
      if (block.match(/^[-*] /m)) {
        const items = block.split(/\n/).filter(l => l.match(/^[-*] /));
        return `<ul>${items.map(i => `<li>${inlineFormat(i.replace(/^[-*] /, ''))}</li>`).join('')}</ul>`;
      }

      // Ordered lists
      if (block.match(/^\d+\. /m)) {
        const items = block.split(/\n/).filter(l => l.match(/^\d+\. /));
        return `<ol>${items.map(i => `<li>${inlineFormat(i.replace(/^\d+\. /, ''))}</li>`).join('')}</ol>`;
      }

      // Tables
      if (block.includes('|') && block.includes('---')) {
        const rows = block.split('\n').filter(r => r.trim() && !r.match(/^\|?\s*---/));
        if (rows.length >= 1) {
          const parseRow = (r: string) => r.split('|').map(c => c.trim()).filter(Boolean);
          const header = parseRow(rows[0]);
          const body = rows.slice(1).map(parseRow);
          return `<table><thead><tr>${header.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${body.map(r => `<tr>${r.map(c => `<td>${inlineFormat(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
        }
      }

      return `<p>${inlineFormat(block)}</p>`;
    })
    .join('\n');
}

function inlineFormat(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>');
}
