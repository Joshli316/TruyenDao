import { t, getLang } from '../i18n';
import { loadAllReports, localized, type ReportData } from '../data-loader';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
}

let messages: Message[] = [];
let reports: ReportData[] = [];

export async function renderAskArchive(): Promise<void> {
  const app = document.getElementById('app');
  if (!app) return;

  // Load reports for RAG context
  reports = await loadAllReports();

  // Restore session messages
  try {
    const saved = sessionStorage.getItem('truyendao-chat');
    if (saved) messages = JSON.parse(saved);
  } catch { messages = []; }

  const starters = [
    { key: 'ask.starter.1', text: t('ask.starter.1') },
    { key: 'ask.starter.2', text: t('ask.starter.2') },
    { key: 'ask.starter.3', text: t('ask.starter.3') },
    { key: 'ask.starter.4', text: t('ask.starter.4') },
    { key: 'ask.starter.5', text: t('ask.starter.5') },
  ];

  app.innerHTML = `
    <div class="chat-container">
      <div style="margin-bottom: var(--space-xl);">
        <div class="section-eyebrow" data-i18n="nav.research">${t('nav.research')}</div>
        <h1 data-i18n="ask.title">${t('ask.title')}</h1>
        <p class="section-subtitle" data-i18n="ask.subtitle">${t('ask.subtitle')}</p>
      </div>

      ${messages.length === 0 ? `
        <div class="chat-starters" id="chat-starters">
          ${starters.map(s => `<button class="chat-starter" data-i18n="${s.key}">${s.text}</button>`).join('')}
        </div>
      ` : ''}

      <div class="chat-messages" id="chat-messages">
        ${messages.map(m => renderMessage(m)).join('')}
      </div>

      <div class="chat-input-area">
        <textarea class="chat-input" id="chat-input" rows="1" data-i18n-placeholder="ask.placeholder" placeholder="${t('ask.placeholder')}"></textarea>
        <button class="chat-send" id="chat-send" data-i18n="ask.send">${t('ask.send')}</button>
      </div>
    </div>
  `;

  const messagesEl = document.getElementById('chat-messages')!;
  const inputEl = document.getElementById('chat-input') as HTMLTextAreaElement;
  const sendBtn = document.getElementById('chat-send')!;
  const startersEl = document.getElementById('chat-starters');

  // Auto-resize textarea
  inputEl.addEventListener('input', () => {
    inputEl.style.height = 'auto';
    inputEl.style.height = Math.min(inputEl.scrollHeight, 120) + 'px';
  });

  // Send on Enter (not Shift+Enter)
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  sendBtn.addEventListener('click', sendMessage);

  // Starter buttons
  if (startersEl) {
    startersEl.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest('.chat-starter');
      if (!btn) return;
      inputEl.value = btn.textContent || '';
      startersEl.remove();
      sendMessage();
    });
  }

  // Scroll to bottom if there are messages
  if (messages.length > 0) {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  async function sendMessage(): Promise<void> {
    const text = inputEl.value.trim();
    if (!text) return;

    // Remove starters
    document.getElementById('chat-starters')?.remove();

    // Add user message
    const userMsg: Message = { role: 'user', content: text };
    messages.push(userMsg);
    messagesEl.innerHTML += renderMessage(userMsg);
    inputEl.value = '';
    inputEl.style.height = 'auto';

    // Show thinking indicator
    const thinkingId = 'thinking-' + Date.now();
    messagesEl.innerHTML += `
      <div class="chat-message assistant" id="${thinkingId}">
        <p style="color: var(--text-tertiary); font-style: italic;" data-i18n="ask.thinking">${t('ask.thinking')}</p>
      </div>
    `;
    messagesEl.scrollTop = messagesEl.scrollHeight;

    try {
      // Find relevant report chunks for context
      const context = findRelevantContext(text);

      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          context,
          history: messages.slice(-6).map(m => ({ role: m.role, content: m.content })),
          lang: getLang(),
        }),
      });

      const thinkingEl = document.getElementById(thinkingId);

      if (!response.ok) {
        // Fallback: generate a local response from report data
        const fallback = generateLocalResponse(text, context);
        if (thinkingEl) {
          thinkingEl.innerHTML = `<p>${fallback.content}</p>` +
            (fallback.sources.length > 0 ? `
              <div class="chat-sources">
                ${fallback.sources.map(s => `<a href="#/research/${s}">${t('common.report')} ${s}</a>`).join('')}
              </div>
            ` : '');
        }
        const assistantMsg: Message = { role: 'assistant', content: fallback.content, sources: fallback.sources };
        messages.push(assistantMsg);
        saveMessages();
        return;
      }

      // Stream response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      if (reader && thinkingEl) {
        thinkingEl.innerHTML = '<p></p>';
        const pEl = thinkingEl.querySelector('p')!;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          fullText += decoder.decode(value, { stream: true });
          pEl.innerHTML = formatResponse(fullText);
          messagesEl.scrollTop = messagesEl.scrollHeight;
        }

        // Extract cited reports
        const sources = extractSources(fullText);
        if (sources.length > 0) {
          thinkingEl.innerHTML += `
            <div class="chat-sources">
              ${sources.map(s => `<a href="#/research/${s}">${t('common.report')} ${s}</a>`).join('')}
            </div>
          `;
        }

        const assistantMsg: Message = { role: 'assistant', content: fullText, sources };
        messages.push(assistantMsg);
        saveMessages();
      }
    } catch {
      // Network error — use local fallback
      const context = findRelevantContext(text);
      const fallback = generateLocalResponse(text, context);
      const thinkingEl = document.getElementById(thinkingId);
      if (thinkingEl) {
        thinkingEl.innerHTML = `<p>${fallback.content}</p>` +
          (fallback.sources.length > 0 ? `
            <div class="chat-sources">
              ${fallback.sources.map(s => `<a href="#/research/${s}">${t('common.report')} ${s}</a>`).join('')}
            </div>
          ` : '');
      }
      const assistantMsg: Message = { role: 'assistant', content: fallback.content, sources: fallback.sources };
      messages.push(assistantMsg);
      saveMessages();
    }
  }
}

function renderMessage(msg: Message): string {
  return `
    <div class="chat-message ${msg.role}">
      <p>${msg.role === 'assistant' ? formatResponse(msg.content) : escapeHtml(msg.content)}</p>
      ${msg.sources && msg.sources.length > 0 ? `
        <div class="chat-sources">
          ${msg.sources.map(s => `<a href="#/research/${s}">${t('common.report')} ${s}</a>`).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

function formatResponse(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function findRelevantContext(query: string): string {
  const q = query.toLowerCase();
  const scored = reports.map(r => {
    const text = (localized(r.title) + ' ' + localized(r.summary) + ' ' +
      r.sections.map(s => localized(s.heading)).join(' ')).toLowerCase();
    const words = q.split(/\s+/);
    const score = words.reduce((acc, w) => acc + (text.includes(w) ? 1 : 0), 0);
    return { report: r, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, 3).filter(s => s.score > 0);

  return top.map(({ report }) => {
    const title = localized(report.title);
    const summary = localized(report.summary);
    const sections = report.sections.map(s =>
      `### ${localized(s.heading)}\n${localized(s.content).substring(0, 500)}`
    ).join('\n\n');
    return `## Report ${report.id}: ${title}\n${summary}\n\n${sections}`;
  }).join('\n\n---\n\n');
}

function generateLocalResponse(query: string, context: string): { content: string; sources: string[] } {
  const q = query.toLowerCase();
  const lang = getLang();

  const topicMatches: { pattern: RegExp; reportIds: string[]; en: string; vi: string }[] = [
    {
      pattern: /ch\u1eef\s*qu\u1ed1c\s*ng\u1eef|alphabet|script|writing|romaniz/i,
      reportIds: ['01', '07'],
      en: 'Ch\u1eef Qu\u1ed1c ng\u1eef is the romanized writing system used by over 100 million Vietnamese today. It was developed by Portuguese and Italian Jesuit missionaries, notably Francisco de Pina and Alexandre de Rhodes, in the early 17th century as a tool for evangelization. De Rhodes published the first dictionary (*Dictionarium Annamiticum Lusitanum et Latinum*) in Rome in 1651. The system was later adopted by French colonial authorities and, ironically, promoted by the Vietnamese Communist government after independence. Vietnam is the only Asian country whose modern national script was created by Christian missionaries. See Reports 01 and 07 for the full story.',
      vi: 'Ch\u1eef Qu\u1ed1c ng\u1eef l\u00e0 h\u1ec7 th\u1ed1ng ch\u1eef vi\u1ebft La-tinh h\u00f3a \u0111\u01b0\u1ee3c h\u01a1n 100 tri\u1ec7u ng\u01b0\u1eddi Vi\u1ec7t Nam s\u1eed d\u1ee5ng ng\u00e0y nay. N\u00f3 \u0111\u01b0\u1ee3c ph\u00e1t tri\u1ec3n b\u1edfi c\u00e1c nh\u00e0 truy\u1ec1n gi\u00e1o D\u00f2ng T\u00ean B\u1ed3 \u0110\u00e0o Nha v\u00e0 \u00dd, \u0111\u1eb7c bi\u1ec7t l\u00e0 Francisco de Pina v\u00e0 Alexandre de Rhodes, v\u00e0o \u0111\u1ea7u th\u1ebf k\u1ef7 17 nh\u01b0 m\u1ed9t c\u00f4ng c\u1ee5 truy\u1ec1n gi\u00e1o. De Rhodes xu\u1ea5t b\u1ea3n cu\u1ed1n t\u1eeb \u0111i\u1ec3n \u0111\u1ea7u ti\u00ean t\u1ea1i Roma n\u0103m 1651. H\u1ec7 th\u1ed1ng n\u00e0y sau \u0111\u00f3 \u0111\u01b0\u1ee3c ch\u00ednh quy\u1ec1n thu\u1ed9c \u0111\u1ecba Ph\u00e1p \u00e1p d\u1ee5ng v\u00e0 ch\u00ednh quy\u1ec1n C\u1ed9ng s\u1ea3n qu\u1ea3ng b\u00e1. Vi\u1ec7t Nam l\u00e0 qu\u1ed1c gia ch\u00e2u \u00c1 duy nh\u1ea5t c\u00f3 ch\u1eef vi\u1ebft hi\u1ec7n \u0111\u1ea1i do c\u00e1c nh\u00e0 truy\u1ec1n gi\u00e1o Kit\u00f4 s\u00e1ng t\u1ea1o. Xem B\u00e1o c\u00e1o 01 v\u00e0 07.',
    },
    {
      pattern: /martyr|117|t\u1eed\s*\u0111\u1ea1o|canon/i,
      reportIds: ['01', '08'],
      en: 'The 117 Vietnamese Martyrs were canonized by Pope John Paul II on June 19, 1988. They represent the largest single-country group canonization in Catholic Church history. These saints were killed during the great persecutions of the 19th century under emperors Minh M\u1ea1ng, Thi\u1ec7u Tr\u1ecb, and T\u1ef1 \u0110\u1ee9c. Among them were 96 Vietnamese, 11 Spanish, and 10 French members \u2014 including bishops, priests, catechists, and lay people. An estimated 100,000-300,000 Christians were killed during this period. See Reports 01 and 08.',
      vi: '117 Th\u00e1nh T\u1eed \u0110\u1ea1o Vi\u1ec7t Nam \u0111\u01b0\u1ee3c Gi\u00e1o ho\u00e0ng Gioan Phaol\u00f4 II phong th\u00e1nh ng\u00e0y 19/6/1988. \u0110\u00e2y l\u00e0 l\u1ea7n phong th\u00e1nh \u0111\u00f4ng nh\u1ea5t cho m\u1ed9t qu\u1ed1c gia trong l\u1ecbch s\u1eed Gi\u00e1o h\u1ed9i C\u00f4ng gi\u00e1o. C\u00e1c th\u00e1nh \u0111\u00e3 b\u1ecb gi\u1ebft trong c\u00e1c cu\u1ed9c b\u00e1ch h\u1ea1i l\u1edbn c\u1ee7a th\u1ebf k\u1ef7 19 d\u01b0\u1edbi tri\u1ec1u Minh M\u1ea1ng, Thi\u1ec7u Tr\u1ecb, v\u00e0 T\u1ef1 \u0110\u1ee9c. Trong s\u1ed1 \u0111\u00f3 c\u00f3 96 ng\u01b0\u1eddi Vi\u1ec7t, 11 ng\u01b0\u1eddi T\u00e2y Ban Nha, v\u00e0 10 ng\u01b0\u1eddi Ph\u00e1p. \u01af\u1edbc t\u00ednh 100.000-300.000 Kit\u00f4 h\u1eefu \u0111\u00e3 b\u1ecb gi\u1ebft trong giai \u0111o\u1ea1n n\u00e0y. Xem B\u00e1o c\u00e1o 01 v\u00e0 08.',
    },
    {
      pattern: /hmong|montagnard|highland|ethnic|minority|t\u00e2y\s*nguy\u00ean/i,
      reportIds: ['08', '03'],
      en: 'The conversion of Hmong and Montagnard (Degar) peoples in Vietnam\'s Central Highlands represents one of the most dramatic church growth stories in contemporary Asia. Since the 1990s, Protestant Christianity has spread rapidly among these ethnic minorities, partly through radio broadcasts and kinship networks. The Vietnamese government has responded with a mix of repression and registration. Estimates suggest hundreds of thousands of Hmong and Montagnard Christians today. See Reports 08 and 03.',
      vi: 'Vi\u1ec7c c\u1ea3i \u0111\u1ea1o c\u1ee7a ng\u01b0\u1eddi H\'M\u00f4ng v\u00e0 ng\u01b0\u1eddi Th\u01b0\u1ee3ng (Degar) \u1edf T\u00e2y Nguy\u00ean l\u00e0 m\u1ed9t trong nh\u1eefng c\u00e2u chuy\u1ec7n t\u0103ng tr\u01b0\u1edfng gi\u00e1o h\u1ed9i n\u1ed5i b\u1eadt nh\u1ea5t \u1edf ch\u00e2u \u00c1 \u0111\u01b0\u01a1ng \u0111\u1ea1i. T\u1eeb nh\u1eefng n\u0103m 1990, \u0111\u1ea1o Tin L\u00e0nh lan r\u1ed9ng nhanh ch\u00f3ng trong c\u00e1c d\u00e2n t\u1ed9c thi\u1ec3u s\u1ed1, ph\u1ea7n l\u1edbn qua ph\u00e1t thanh v\u00e0 m\u1ea1ng l\u01b0\u1edbi d\u00f2ng t\u1ed9c. \u01af\u1edbc t\u00ednh h\u00e0ng tr\u0103m ngh\u00ecn Kit\u00f4 h\u1eefu H\'M\u00f4ng v\u00e0 Th\u01b0\u1ee3ng ng\u00e0y nay. Xem B\u00e1o c\u00e1o 08 v\u00e0 03.',
    },
    {
      pattern: /ancestor|worship|th\u1edd|c\u00fang|barrier|conversion/i,
      reportIds: ['07', '08'],
      en: 'Ancestor veneration is the deepest cultural practice in Vietnamese society. Every conversion to Christianity involves negotiating this tension. Vietnamese theologians are actively developing inculturation responses \u2014 some argue for a distinction between "worship" (th\u1edd) and "reverence" (k\u00ednh), allowing Christians to honor ancestors without contradicting monotheism. The Rites Controversy of the 17th-18th century centered on exactly this issue. See Reports 07 and 08.',
      vi: 'Th\u1edd c\u00fang t\u1ed5 ti\u00ean l\u00e0 t\u1eadp t\u1ee5c v\u0103n h\u00f3a s\u00e2u s\u1eafc nh\u1ea5t trong x\u00e3 h\u1ed9i Vi\u1ec7t Nam. M\u1ecdi cu\u1ed9c c\u1ea3i \u0111\u1ea1o sang Kit\u00f4 gi\u00e1o \u0111\u1ec1u ph\u1ea3i \u0111\u1ed1i di\u1ec7n v\u1edbi c\u0103ng th\u1eb3ng n\u00e0y. C\u00e1c nh\u00e0 th\u1ea7n h\u1ecdc Vi\u1ec7t Nam \u0111ang t\u00edch c\u1ef1c ph\u00e1t tri\u1ec3n c\u00e1c ph\u01b0\u01a1ng \u00e1n h\u1ed9i nh\u1eadp v\u0103n h\u00f3a \u2014 ph\u00e2n bi\u1ec7t gi\u1eefa "th\u1edd" v\u00e0 "k\u00ednh", cho ph\u00e9p Kit\u00f4 h\u1eefu t\u00f4n vinh t\u1ed5 ti\u00ean m\u00e0 kh\u00f4ng m\u00e2u thu\u1eabn v\u1edbi \u0111\u1ed9c th\u1ea7n gi\u00e1o. Xem B\u00e1o c\u00e1o 07 v\u00e0 08.',
    },
  ];

  for (const match of topicMatches) {
    if (match.pattern.test(q)) {
      return { content: lang === 'vi' ? match.vi : match.en, sources: match.reportIds };
    }
  }

  // Generic response when no specific match
  const topReports = reports
    .map(r => {
      const text = (localized(r.title) + ' ' + localized(r.summary)).toLowerCase();
      const words = q.split(/\s+/);
      const score = words.reduce((acc, w) => acc + (text.includes(w) ? 1 : 0), 0);
      return { report: r, score };
    })
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  if (topReports.length > 0) {
    const reportLabel = lang === 'vi' ? 'Báo cáo' : 'Report';
    const summaries = topReports.map(({ report }) =>
      `**${reportLabel} ${report.id}: ${localized(report.title)}** — ${localized(report.summary).substring(0, 200)}...`
    ).join('\n\n');
    const intro = lang === 'vi'
      ? 'Dựa trên kho nghiên cứu, đây là các báo cáo liên quan nhất cho câu hỏi của bạn:'
      : 'Based on our research archive, here are the most relevant reports for your question:';
    const cta = lang === 'vi'
      ? 'Nhấn vào liên kết báo cáo bên dưới để đọc phân tích đầy đủ.'
      : 'Click the report links below to read the full analysis.';
    return {
      content: `${intro}\n\n${summaries}\n\n${cta}`,
      sources: topReports.map(r => r.report.id),
    };
  }

  return {
    content: lang === 'vi'
      ? 'Chúng tôi không có thông tin cụ thể về chủ đề đó trong 12 báo cáo nghiên cứu. Hãy thử hỏi về lịch sử Kitô giáo Việt Nam, chữ Quốc ngữ, 117 Thánh Tử Đạo, Kitô giáo dân tộc thiểu số, thờ cúng tổ tiên, hoặc mục vụ sinh viên hải ngoại.'
      : 'I don\'t have specific information on that topic in our 12 research reports. Try asking about Vietnamese Christian history, the chữ Quốc ngữ script, the 117 Martyrs, ethnic minority Christianity, ancestor worship, or diaspora student ministry.',
    sources: [],
  };
}

function extractSources(text: string): string[] {
  const matches = text.match(/Report\s+(\d{1,2})/gi) || [];
  const ids = new Set<string>();
  matches.forEach(m => {
    const num = m.replace(/Report\s+/i, '').padStart(2, '0');
    if (parseInt(num) >= 1 && parseInt(num) <= 12) ids.add(num);
  });
  return Array.from(ids);
}

function saveMessages(): void {
  try {
    sessionStorage.setItem('truyendao-chat', JSON.stringify(messages.slice(-20)));
  } catch { /* sessionStorage full */ }
}
