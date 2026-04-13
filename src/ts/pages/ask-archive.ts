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
                ${fallback.sources.map(s => `<a href="#/research/${s}">Report ${s}</a>`).join('')}
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
              ${sources.map(s => `<a href="#/research/${s}">Report ${s}</a>`).join('')}
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
              ${fallback.sources.map(s => `<a href="#/research/${s}">Report ${s}</a>`).join('')}
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
          ${msg.sources.map(s => `<a href="#/research/${s}">Report ${s}</a>`).join('')}
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
  const sources: string[] = [];

  // Match query to specific topics
  const topicMatches: { pattern: RegExp; reportIds: string[]; response: string }[] = [
    {
      pattern: /ch\u1eef\s*qu\u1ed1c\s*ng\u1eef|alphabet|script|writing|romaniz/i,
      reportIds: ['01', '07'],
      response: 'Chữ Quốc ngữ is the romanized writing system used by over 100 million Vietnamese today. It was developed by Portuguese and Italian Jesuit missionaries, notably Francisco de Pina and Alexandre de Rhodes, in the early 17th century as a tool for evangelization. De Rhodes published the first dictionary (*Dictionarium Annamiticum Lusitanum et Latinum*) in Rome in 1651. The system was later adopted by French colonial authorities and, ironically, promoted by the Vietnamese Communist government after independence. Vietnam is the only Asian country whose modern national script was created by Christian missionaries. See Reports 01 and 07 for the full story.',
    },
    {
      pattern: /martyr|117|t\u1eed\s*\u0111\u1ea1o|canon/i,
      reportIds: ['01', '08'],
      response: 'The 117 Vietnamese Martyrs were canonized by Pope John Paul II on June 19, 1988. They represent the largest single-country group canonization in Catholic Church history. These saints were killed during the great persecutions of the 19th century under emperors Minh Mạng (r. 1820-1841), Thiệu Trị (r. 1841-1847), and Tự Đức (r. 1847-1883). Among them were 96 Vietnamese, 11 Spanish, and 10 French members of the church — including bishops, priests, catechists, and lay people. An estimated 100,000-300,000 Christians were killed during this period. See Reports 01 and 08 for detailed coverage.',
    },
    {
      pattern: /hmong|montagnard|highland|ethnic|minority|t\u00e2y\s*nguy\u00ean/i,
      reportIds: ['08', '03'],
      response: 'The conversion of Hmong and Montagnard (Degar) peoples in Vietnam\'s Central Highlands represents one of the most dramatic church growth stories in contemporary Asia. Since the 1990s, Protestant Christianity has spread rapidly among these ethnic minorities, partly through radio broadcasts and kinship networks. The Vietnamese government has responded with a mix of repression and registration, particularly after the 2001 and 2004 protests. Estimates suggest hundreds of thousands of Hmong and Montagnard Christians today, though exact numbers are difficult to verify due to government restrictions on research access. See Reports 08 and 03.',
    },
    {
      pattern: /ancestor|worship|th\u1edd|c\u00fang|barrier|conversion/i,
      reportIds: ['07', '08'],
      response: 'Ancestor veneration is the deepest cultural practice in Vietnamese society, present across Buddhist, Confucian, and folk religious contexts. Every conversion to Christianity involves negotiating this tension. Vietnamese theologians are actively developing inculturation responses — some argue for a distinction between "worship" (thờ) and "reverence" (kính), allowing Christians to honor ancestors without the ritual elements that contradict monotheism. The Rites Controversy of the 17th-18th century between Jesuits and Dominicans/Franciscans in Asia centered on exactly this issue. See Reports 07 and 08.',
    },
  ];

  for (const match of topicMatches) {
    if (match.pattern.test(q)) {
      return { content: match.response, sources: match.reportIds };
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
    const summaries = topReports.map(({ report }) =>
      `**Report ${report.id}: ${localized(report.title)}** — ${localized(report.summary).substring(0, 200)}...`
    ).join('\n\n');
    return {
      content: `Based on our research archive, here are the most relevant reports for your question:\n\n${summaries}\n\nClick the report links below to read the full analysis.`,
      sources: topReports.map(r => r.report.id),
    };
  }

  return {
    content: 'I don\'t have specific information on that topic in our 12 research reports. Try asking about Vietnamese Christian history, the chữ Quốc ngữ script, the 117 Martyrs, ethnic minority Christianity, ancestor worship, or diaspora student ministry.',
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
