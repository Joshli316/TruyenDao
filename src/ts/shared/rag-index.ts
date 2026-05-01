import { localized, type ReportData } from '../data-loader';

interface Chunk {
  reportId: string;
  reportTitle: string;
  heading: string;
  text: string;
  termFreq: Map<string, number>;
  length: number;
}

interface BuiltIndex {
  chunks: Chunk[];
  docFreq: Map<string, number>;
  avgLength: number;
}

const STOPWORDS = new Set([
  'a','an','the','and','or','but','of','to','in','on','at','by','for','with','from','is','are','was','were','be','been','being','have','has','had','do','does','did','this','that','these','those','it','its','as','if','then','than','so','not','no','nor','can','will','would','should','could','may','might',
  'và','hoặc','nhưng','của','cho','với','từ','là','đã','được','các','những','một','người','ta','tôi','bạn','này','đó','khi','nếu','thì','cũng','không','có','sẽ','phải','nên','trong','trên','dưới','ngoài','tại','đến','vì','bởi','về'
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 2 && !STOPWORDS.has(w));
}

function chunkText(text: string, maxLen = 600): string[] {
  const sentences = text.split(/(?<=[.!?。！？])\s+/);
  const chunks: string[] = [];
  let buf = '';
  for (const s of sentences) {
    if (!s) continue;
    if ((buf + ' ' + s).length > maxLen && buf) {
      chunks.push(buf.trim());
      buf = s;
    } else {
      buf = buf ? buf + ' ' + s : s;
    }
  }
  if (buf.trim()) chunks.push(buf.trim());
  return chunks;
}

let cachedIndex: BuiltIndex | null = null;
let cachedFor: ReportData[] | null = null;

export function buildIndex(reports: ReportData[]): BuiltIndex {
  if (cachedFor === reports && cachedIndex) return cachedIndex;

  const chunks: Chunk[] = [];

  for (const report of reports) {
    const reportTitle = localized(report.title);
    const summaryText = localized(report.summary);

    chunks.push(makeChunk(report.id, reportTitle, reportTitle, reportTitle + ' ' + summaryText));

    for (const section of report.sections) {
      const heading = localized(section.heading);
      const content = localized(section.content);
      const pieces = chunkText(content);
      for (const piece of pieces) {
        chunks.push(makeChunk(report.id, reportTitle, heading, heading + '. ' + piece));
      }
    }
  }

  const docFreq = new Map<string, number>();
  for (const c of chunks) {
    for (const term of c.termFreq.keys()) {
      docFreq.set(term, (docFreq.get(term) || 0) + 1);
    }
  }

  const avgLength = chunks.reduce((acc, c) => acc + c.length, 0) / Math.max(chunks.length, 1);

  cachedIndex = { chunks, docFreq, avgLength };
  cachedFor = reports;
  return cachedIndex;
}

function makeChunk(reportId: string, reportTitle: string, heading: string, text: string): Chunk {
  const tokens = tokenize(text);
  const tf = new Map<string, number>();
  tokens.forEach(t => tf.set(t, (tf.get(t) || 0) + 1));
  return { reportId, reportTitle, heading, text, termFreq: tf, length: tokens.length };
}

export interface RetrievedChunk {
  reportId: string;
  reportTitle: string;
  heading: string;
  text: string;
  score: number;
}

export function retrieveChunks(query: string, reports: ReportData[], topK = 6): RetrievedChunk[] {
  const index = buildIndex(reports);
  const queryTerms = tokenize(query);
  if (queryTerms.length === 0 || index.chunks.length === 0) return [];

  const N = index.chunks.length;
  const k1 = 1.5;
  const b = 0.75;

  const uniqueTerms = Array.from(new Set(queryTerms));
  const idf = new Map<string, number>();
  for (const term of uniqueTerms) {
    const df = index.docFreq.get(term) || 0;
    idf.set(term, Math.log(1 + (N - df + 0.5) / (df + 0.5)));
  }

  const scored = index.chunks.map(chunk => {
    let score = 0;
    for (const term of uniqueTerms) {
      const tf = chunk.termFreq.get(term) || 0;
      if (tf === 0) continue;
      const norm = 1 - b + b * (chunk.length / index.avgLength);
      score += (idf.get(term) || 0) * (tf * (k1 + 1)) / (tf + k1 * norm);
    }
    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored
    .filter(s => s.score > 0)
    .slice(0, topK)
    .map(s => ({
      reportId: s.chunk.reportId,
      reportTitle: s.chunk.reportTitle,
      heading: s.chunk.heading,
      text: s.chunk.text,
      score: s.score,
    }));
}

export function topReportIds(chunks: RetrievedChunk[], max = 3): string[] {
  const seen = new Set<string>();
  const ordered: string[] = [];
  for (const c of chunks) {
    if (!seen.has(c.reportId)) {
      seen.add(c.reportId);
      ordered.push(c.reportId);
      if (ordered.length >= max) break;
    }
  }
  return ordered;
}

export function clearIndexCache(): void {
  cachedIndex = null;
  cachedFor = null;
}
