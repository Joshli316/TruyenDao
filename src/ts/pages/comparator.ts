import { localized } from '../data-loader';
import { renderFooter } from '../shared/footer';
import { setPageMeta } from '../shared/page-meta';

interface Source {
  title: string;
  author: string;
  year: number;
  type: string;
}

interface TopicEntry {
  topic: { en: string; vi: string };
  en: Source[];
  vi: Source[];
  fr: Source[];
}

const sources: TopicEntry[] = [
  {
    topic: { en: 'Alexandre de Rhodes & Chữ Quốc Ngữ', vi: 'Alexandre de Rhodes & Chữ Quốc Ngữ' },
    en: [
      { title: 'Rhodes of Viet Nam', author: 'Peter C. Phan', year: 1998, type: 'book' },
      { title: 'The Birth of Vietnamese Writing', author: 'Roland Jacques', year: 2002, type: 'book' },
    ],
    vi: [
      { title: 'Alexandre de Rhodes và vấn đề chữ Quốc ngữ', author: 'Nguyễn Khắc Xuyên', year: 2006, type: 'article' },
      { title: 'Lịch sử chữ Quốc ngữ', author: 'Hoàng Tuệ', year: 1992, type: 'book' },
    ],
    fr: [
      { title: 'Dictionarium Annamiticum Lusitanum et Latinum', author: 'Alexandre de Rhodes', year: 1651, type: 'primary' },
      { title: 'Voyages et Missions du Père Alexandre de Rhodes', author: 'Alexandre de Rhodes', year: 1653, type: 'primary' },
      { title: "L'œuvre linguistique des missionnaires au Vietnam", author: 'Roland Jacques', year: 2004, type: 'book' },
    ],
  },
  {
    topic: { en: 'Vietnamese Martyrs & Persecutions', vi: 'Thánh Tử Đạo & Bách Hại Việt Nam' },
    en: [
      { title: 'Vietnam: A History of Christianity', author: 'Jean-Louis Taberd', year: 1999, type: 'book' },
    ],
    vi: [
      { title: 'Lịch sử Giáo hội Công giáo Việt Nam', author: 'Trần Trọng Kim', year: 1971, type: 'book' },
      { title: '117 Thánh Tử Đạo Việt Nam', author: 'HĐGM Việt Nam', year: 1988, type: 'document' },
    ],
    fr: [
      { title: 'Histoire de la Mission de Cochinchine', author: 'Adrien Launay', year: 1923, type: 'book' },
      { title: 'Les Martyrs du Viêt-Nam', author: 'MEP Archives', year: 1988, type: 'document' },
    ],
  },
  {
    topic: { en: 'MEP (Missions Étrangères de Paris)', vi: 'Hội Thừa Sai Paris (MEP)' },
    en: [
      { title: 'The Paris Foreign Missions in East Asia', author: 'Catherine Marin', year: 2008, type: 'book' },
    ],
    vi: [],
    fr: [
      { title: 'Histoire générale de la Société des Missions Étrangères', author: 'Adrien Launay', year: 1894, type: 'book' },
      { title: 'Archives des MEP: Cochinchine et Tonkin', author: 'MEP', year: 1680, type: 'primary' },
      { title: 'Lettres édifiantes des Missions Étrangères', author: 'Various', year: 1780, type: 'primary' },
    ],
  },
  {
    topic: { en: 'Pigneau de Béhaine & Nguyễn Ánh', vi: 'Pigneau de Béhaine & Nguyễn Ánh' },
    en: [
      { title: 'The Last Mandarin', author: 'Spencer Tucker', year: 1999, type: 'book' },
    ],
    vi: [
      { title: 'Gia Long và người Pháp', author: 'Thạch Lam', year: 1965, type: 'book' },
    ],
    fr: [
      { title: "L'évêque d'Adran et la politique française en Indochine", author: 'E. Vo Duc Hanh', year: 1969, type: 'book' },
      { title: 'Mémoires de Pigneau de Béhaine', author: 'Pierre Pigneau', year: 1799, type: 'primary' },
    ],
  },
  {
    topic: { en: 'French Colonial Catholicism', vi: 'Công giáo thời Pháp thuộc' },
    en: [
      { title: 'Sacred War: Nationalism and Revolution in Vietnam', author: 'Patricia Pelley', year: 2002, type: 'book' },
    ],
    vi: [
      { title: 'Kitô giáo và văn hóa Việt Nam thời Pháp thuộc', author: 'Nguyễn Văn Kiệm', year: 2003, type: 'book' },
    ],
    fr: [
      { title: "L'Église catholique et la société coloniale au Vietnam", author: 'Charles Keith', year: 2012, type: 'book' },
      { title: 'Le catholicisme au Vietnam', author: 'Pierre Brocheux', year: 2001, type: 'article' },
    ],
  },
  {
    topic: { en: 'Protestant Missions (CMA)', vi: 'Truyền giáo Tin Lành (CMA)' },
    en: [
      { title: 'The Christian and Missionary Alliance in Vietnam', author: 'Reg Reimer', year: 2011, type: 'book' },
      { title: 'To Vietnam with Love', author: 'Homer Dowdy', year: 1969, type: 'book' },
    ],
    vi: [
      { title: 'Lịch sử Hội Thánh Tin Lành Việt Nam', author: 'Lê Hoàng Phu', year: 1972, type: 'book' },
    ],
    fr: [],
  },
  {
    topic: { en: '1954 Catholic Migration South', vi: 'Di cư Công giáo vào Nam 1954' },
    en: [
      { title: 'Passage to Freedom', author: 'Seth Jacobs', year: 2004, type: 'book' },
    ],
    vi: [
      { title: 'Cuộc di cư 1954', author: 'Nguyễn Đình Đầu', year: 2004, type: 'book' },
      { title: 'Giáo xứ Bùi Chu di cư', author: 'Lm. Trần Văn Đoàn', year: 2005, type: 'article' },
    ],
    fr: [
      { title: 'La migration catholique de 1954', author: 'Philippe Franchini', year: 1990, type: 'article' },
    ],
  },
  {
    topic: { en: 'Contemporary Church-State Relations', vi: 'Quan hệ Giáo hội-Nhà nước đương đại' },
    en: [
      { title: 'God and Uncle Ho: Religious Freedom in Vietnam', author: 'Claire Nguyen', year: 2019, type: 'book' },
      { title: 'Vietnam: Religious Freedom in Context', author: 'USCIRF', year: 2023, type: 'report' },
    ],
    vi: [
      { title: 'Pháp lệnh tín ngưỡng, tôn giáo 2016', author: 'Quốc hội', year: 2016, type: 'document' },
    ],
    fr: [],
  },
  {
    topic: { en: 'Hmong & Montagnard Christianity', vi: 'Kitô giáo người H\'Mông & Thượng' },
    en: [
      { title: 'Mobilizing for Human Rights in Vietnam', author: 'Human Rights Watch', year: 2006, type: 'report' },
      { title: 'Conversion and Hmong Autonomy in Vietnam', author: 'Jean Michaud', year: 2010, type: 'article' },
    ],
    vi: [],
    fr: [
      { title: 'Les Montagnards du Sud-Indochinois', author: 'Jacques Dournes', year: 1950, type: 'book' },
    ],
  },
  {
    topic: { en: 'Ancestor Worship & Inculturation', vi: 'Thờ cúng tổ tiên & Hội nhập văn hóa' },
    en: [
      { title: 'Vietnamese Catholics and Ancestor Worship', author: 'Peter C. Phan', year: 2003, type: 'article' },
    ],
    vi: [
      { title: 'Thờ kính tổ tiên trong đời sống Kitô hữu Việt Nam', author: 'Lm. Nguyễn Thái Hợp', year: 2001, type: 'book' },
      { title: 'Thần học hội nhập văn hóa Việt Nam', author: 'Lm. Trần Văn Toàn', year: 2008, type: 'article' },
    ],
    fr: [
      { title: 'La Querelle des Rites en Asie', author: 'Claudia von Collani', year: 2001, type: 'book' },
    ],
  },
];

export function renderComparator(): void {
  const app = document.getElementById('app');
  if (!app) return;
  setPageMeta({ titleKey: 'meta.comparator.title', descKey: 'meta.comparator.description' });

  const totalEn = sources.reduce((a, s) => a + s.en.length, 0);
  const totalVi = sources.reduce((a, s) => a + s.vi.length, 0);
  const totalFr = sources.reduce((a, s) => a + s.fr.length, 0);

  let searchQuery = '';

  function typeBadge(type: string): string {
    const colors: Record<string, string> = { primary: 'var(--accent-cinnabar)', book: 'var(--accent-gold)', article: 'var(--info)', report: 'var(--success)', document: 'var(--text-tertiary)' };
    return `<span style="font-size:10px;padding:1px 8px;border-radius:9999px;border:1px solid ${colors[type] || 'var(--border-default)'};color:${colors[type] || 'var(--text-tertiary)'};">${type}</span>`;
  }

  function renderSources(): string {
    const filtered = searchQuery
      ? sources.filter(s => {
          const q = searchQuery.toLowerCase();
          return localized(s.topic).toLowerCase().includes(q) ||
            [...s.en, ...s.vi, ...s.fr].some(src => src.title.toLowerCase().includes(q) || src.author.toLowerCase().includes(q));
        })
      : sources;

    return filtered.map(entry => {
      const renderCol = (items: Source[], langLabel: string): string => {
        if (items.length === 0) {
          return `<div style="padding:var(--space-md);color:var(--accent-gold);font-size:13px;font-style:italic;border:1px dashed var(--border-gold);text-align:center;">
            ${localized({ en: `No ${langLabel} sources — translation needed`, vi: `Không có nguồn ${langLabel} — cần dịch thuật` })}
          </div>`;
        }
        return items.map(s => `
          <div style="padding:var(--space-sm) 0;border-bottom:1px solid var(--border-subtle);">
            <div style="font-size:14px;color:var(--text-primary);font-weight:500;">${s.title}</div>
            <div style="font-size:12px;color:var(--text-tertiary);margin-top:2px;">${s.author}, ${s.year} ${typeBadge(s.type)}</div>
          </div>
        `).join('');
      };

      return `
        <div class="lacquer-card" style="margin-bottom:var(--space-lg);">
          <div class="card-title" style="margin-bottom:var(--space-md);">${localized(entry.topic)}</div>
          <div class="comparator-columns">
            <div class="comparator-col">
              <div style="font-family:var(--font-mono);font-size:11px;color:var(--accent-gold);margin-bottom:var(--space-sm);">ENGLISH (${entry.en.length})</div>
              ${renderCol(entry.en, 'English')}
            </div>
            <div class="comparator-col">
              <div style="font-family:var(--font-mono);font-size:11px;color:var(--accent-cinnabar);margin-bottom:var(--space-sm);">TIẾNG VIỆT (${entry.vi.length})</div>
              ${renderCol(entry.vi, localized({ en: 'Vietnamese', vi: 'tiếng Việt' }))}
            </div>
            <div class="comparator-col">
              <div style="font-family:var(--font-mono);font-size:11px;color:var(--info);margin-bottom:var(--space-sm);">FRANÇAIS (${entry.fr.length})</div>
              ${renderCol(entry.fr, localized({ en: 'French', vi: 'tiếng Pháp' }))}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  app.innerHTML = `
    <div class="section" style="padding-top: calc(64px + var(--space-2xl));">
      <div class="section-eyebrow">${localized({ en: 'Research', vi: 'Nghiên cứu' })}</div>
      <h1>${localized({ en: 'Trilingual Comparator', vi: 'Công cụ so sánh ba ngôn ngữ' })}</h1>
      <p class="section-subtitle">${localized({ en: 'Search a topic and see sources in English, Vietnamese, AND French side by side. The first tool to bridge all three.', vi: 'Tìm kiếm một chủ đề và xem nguồn bằng tiếng Anh, tiếng Việt, VÀ tiếng Pháp cạnh nhau. Công cụ đầu tiên kết nối cả ba.' })}</p>

      <div style="display:flex;gap:var(--space-lg);margin-bottom:var(--space-xl);flex-wrap:wrap;">
        <div style="font-family:var(--font-mono);font-size:13px;">
          <span style="color:var(--accent-gold);">${totalEn}</span> <span style="color:var(--text-tertiary);">English</span>
          <span style="margin:0 var(--space-sm);color:var(--border-default);">|</span>
          <span style="color:var(--accent-cinnabar);">${totalVi}</span> <span style="color:var(--text-tertiary);">Tiếng Việt</span>
          <span style="margin:0 var(--space-sm);color:var(--border-default);">|</span>
          <span style="color:var(--info);">${totalFr}</span> <span style="color:var(--text-tertiary);">Français</span>
        </div>
      </div>

      <input type="text" class="search-page-input" id="comp-search" placeholder="${localized({ en: 'Search topics, authors, titles...', vi: 'Tìm kiếm chủ đề, tác giả, tiêu đề...' })}">

      <div id="comp-grid">${renderSources()}</div>
    </div>

    ${renderFooter()}

    <style>
      .comparator-columns { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: var(--space-md); }
      .comparator-col { min-width: 0; }
      @media (max-width: 768px) {
        .comparator-columns { grid-template-columns: 1fr; }
        .comparator-col { border-bottom: 1px solid var(--border-subtle); padding-bottom: var(--space-md); margin-bottom: var(--space-md); }
        .comparator-col:last-child { border-bottom: none; }
      }
    </style>
  `;

  document.getElementById('comp-search')!.addEventListener('input', (e) => {
    searchQuery = (e.target as HTMLInputElement).value.trim();
    document.getElementById('comp-grid')!.innerHTML = renderSources();
  });
}
