import { getLang, type Lang } from './i18n';

export interface ReportData {
  id: string;
  title: { en: string; vi: string };
  summary: { en: string; vi: string };
  tags: string[];
  readingTime: number;
  featured: boolean;
  sections: {
    heading: { en: string; vi: string };
    content: { en: string; vi: string };
  }[];
}

const reportCache: Map<string, ReportData> = new Map();

export async function loadReport(id: string): Promise<ReportData> {
  if (reportCache.has(id)) return reportCache.get(id)!;
  const padded = id.padStart(2, '0');
  const mod = await import(`../data/reports/${padded}.json`);
  const data = mod.default as ReportData;
  reportCache.set(id, data);
  return data;
}

export async function loadAllReports(): Promise<ReportData[]> {
  const ids = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const reports = await Promise.all(ids.map(id => loadReport(id)));
  return reports;
}

export function localized(obj: { en: string; vi: string }): string {
  const lang = getLang();
  return obj[lang] || obj.en;
}
