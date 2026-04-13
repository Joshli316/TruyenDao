import { loadAllReports, localized, type ReportData } from './data-loader';
import { t } from './i18n';

interface SearchIndex {
  reports: ReportData[];
  tfidf: Map<string, Map<string, number>>; // term -> reportId -> score
}

let index: SearchIndex | null = null;

async function buildIndex(): Promise<SearchIndex> {
  if (index) return index;

  const reports = await loadAllReports();
  const tfidf = new Map<string, Map<string, number>>();

  // Build term frequencies
  const docFreq = new Map<string, number>(); // term -> count of docs containing it
  const termFreqs: Map<string, number>[] = [];

  reports.forEach((report, _) => {
    const text = [
      localized(report.title),
      localized(report.summary),
      ...report.sections.map(s => localized(s.heading) + ' ' + localized(s.content))
    ].join(' ').toLowerCase();

    const terms = tokenize(text);
    const tf = new Map<string, number>();
    const seen = new Set<string>();

    terms.forEach(term => {
      tf.set(term, (tf.get(term) || 0) + 1);
      if (!seen.has(term)) {
        docFreq.set(term, (docFreq.get(term) || 0) + 1);
        seen.add(term);
      }
    });

    // Normalize by doc length
    const len = terms.length || 1;
    tf.forEach((count, term) => tf.set(term, count / len));

    termFreqs.push(tf);
  });

  // Calculate TF-IDF
  const N = reports.length;
  reports.forEach((report, i) => {
    const tf = termFreqs[i];
    tf.forEach((freq, term) => {
      const df = docFreq.get(term) || 1;
      const idfVal = Math.log(N / df);
      const score = freq * idfVal;

      if (!tfidf.has(term)) tfidf.set(term, new Map());
      tfidf.get(term)!.set(report.id, score);
    });
  });

  index = { reports, tfidf };
  return index;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(t => t.length > 1);
}

export interface SearchResult {
  report: ReportData;
  score: number;
  excerpt: string;
}

export async function search(query: string): Promise<SearchResult[]> {
  const idx = await buildIndex();
  const queryTerms = tokenize(query.toLowerCase());

  if (queryTerms.length === 0) return [];

  const scores = new Map<string, number>();

  queryTerms.forEach(term => {
    const termScores = idx.tfidf.get(term);
    if (termScores) {
      termScores.forEach((score, reportId) => {
        scores.set(reportId, (scores.get(reportId) || 0) + score);
      });
    }

    // Also check partial matches
    idx.tfidf.forEach((termScores, indexTerm) => {
      if (indexTerm.includes(term) && indexTerm !== term) {
        termScores.forEach((score, reportId) => {
          scores.set(reportId, (scores.get(reportId) || 0) + score * 0.5);
        });
      }
    });
  });

  const results: SearchResult[] = [];
  scores.forEach((score, reportId) => {
    const report = idx.reports.find(r => r.id === reportId);
    if (report && score > 0) {
      const excerpt = findExcerpt(report, queryTerms);
      results.push({ report, score, excerpt });
    }
  });

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, 10);
}

function findExcerpt(report: ReportData, terms: string[]): string {
  const allText = report.sections.map(s => localized(s.content)).join(' ');
  const lower = allText.toLowerCase();

  for (const term of terms) {
    const idx = lower.indexOf(term);
    if (idx >= 0) {
      const start = Math.max(0, idx - 60);
      const end = Math.min(allText.length, idx + term.length + 100);
      let excerpt = allText.substring(start, end).trim();
      if (start > 0) excerpt = '...' + excerpt;
      if (end < allText.length) excerpt += '...';
      return excerpt;
    }
  }

  return localized(report.summary).substring(0, 160) + '...';
}

export function initSearch(): void {
  const modal = document.getElementById('search-modal');
  const input = modal?.querySelector('.search-input') as HTMLInputElement;
  const resultsContainer = document.getElementById('search-results');

  if (!input || !resultsContainer) return;

  let debounceTimer: number;

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(async () => {
      const q = input.value.trim();
      if (!q) {
        resultsContainer.innerHTML = '';
        return;
      }

      const results = await search(q);
      resultsContainer.innerHTML = results.map(r => `
        <a href="#/research/${r.report.id}" class="search-result-item" onclick="document.getElementById('search-modal').classList.remove('open')">
          <div class="title">${t('common.report')} ${r.report.id}: ${localized(r.report.title)}</div>
          <div class="excerpt">${highlightTerms(r.excerpt, tokenize(q))}</div>
        </a>
      `).join('');

      if (results.length === 0) {
        resultsContainer.innerHTML = `<div style="padding: 16px 24px; color: var(--text-tertiary);" data-i18n="search.no_results">${t('search.no_results')}</div>`;
      }
    }, 200);
  });
}

function highlightTerms(text: string, terms: string[]): string {
  let result = text;
  terms.forEach(term => {
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    result = result.replace(regex, '<mark style="background: var(--accent-gold-subtle); color: var(--text-primary); padding: 0 2px;">$1</mark>');
  });
  return result;
}
