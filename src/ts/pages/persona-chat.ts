import { t, getLang } from '../i18n';
import { getRouteParam } from '../main';
import { escapeHtml, formatResponse } from '../shared/text-utils';
import { setPageMeta } from '../shared/page-meta';

interface LocalizedString {
  en: string;
  vi: string;
}

interface Persona {
  id: string;
  name: LocalizedString;
  dates: string;
  role: LocalizedString;
  era: LocalizedString;
  systemPrompt: string;
  starters: { en: string[]; vi: string[] };
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function localized(obj: LocalizedString): string {
  return obj[getLang()];
}

// escapeHtml, formatResponse imported from shared/text-utils

function renderMessage(msg: Message): string {
  return `
    <div class="chat-message ${msg.role}">
      <p>${msg.role === 'assistant' ? formatResponse(msg.content) : escapeHtml(msg.content)}</p>
    </div>
  `;
}

export async function renderPersonaChat(): Promise<void> {
  const app = document.getElementById('app');
  if (!app) return;
  setPageMeta({ titleKey: 'meta.persona.title', descKey: 'meta.personas.description' });

  const personaId = getRouteParam('id');
  if (!personaId) {
    app.innerHTML = `<div class="section" style="padding-top: calc(64px + var(--space-2xl)); text-align: center;">
      <p>${t('common.error')}</p>
      <a href="#/personas" class="btn-gold-ghost" style="margin-top: var(--space-md);">${t('common.back')}</a>
    </div>`;
    return;
  }

  // Load persona data
  let personas: Persona[] = [];
  try {
    const response = await fetch(new URL('../../data/personas/index.json', import.meta.url).href);
    personas = await response.json();
  } catch {
    app.innerHTML = `<div class="section" style="padding-top: calc(64px + var(--space-2xl)); text-align: center;">
      <p>${t('common.error')}</p>
      <a href="#/personas" class="btn-gold-ghost" style="margin-top: var(--space-md);">${t('common.back')}</a>
    </div>`;
    return;
  }

  const persona = personas.find(p => p.id === personaId);
  if (!persona) {
    app.innerHTML = `<div class="section" style="padding-top: calc(64px + var(--space-2xl)); text-align: center;">
      <p>${t('common.error')}</p>
      <a href="#/personas" class="btn-gold-ghost" style="margin-top: var(--space-md);">${t('common.back')}</a>
    </div>`;
    return;
  }

  // Restore session messages
  const storageKey = `truyendao-persona-${personaId}`;
  let messages: Message[] = [];
  try {
    const saved = sessionStorage.getItem(storageKey);
    if (saved) messages = JSON.parse(saved);
  } catch { messages = []; }

  const lang = getLang();
  const starters = persona.starters[lang];

  app.innerHTML = `
    <div class="chat-container">
      <div style="margin-bottom: var(--space-xl);">
        <a href="#/personas" style="color: var(--text-tertiary); text-decoration: none; font-size: 14px; display: inline-block; margin-bottom: var(--space-sm);">&larr; ${t('common.back')}</a>
        <div class="section-eyebrow">${localized(persona.era)}</div>
        <h1>${localized(persona.name)}</h1>
        <p style="font-family: var(--font-mono); font-size: 13px; color: var(--text-tertiary); margin-bottom: var(--space-xs);">${persona.dates}</p>
        <p class="section-subtitle">${localized(persona.role)}</p>
      </div>

      ${messages.length === 0 ? `
        <div class="chat-starters" id="chat-starters">
          ${starters.map(s => `<button class="chat-starter">${s}</button>`).join('')}
        </div>
      ` : ''}

      <div class="chat-messages" id="chat-messages" role="log" aria-live="polite">
        ${messages.map(m => renderMessage(m)).join('')}
      </div>

      <div class="chat-input-area">
        <textarea class="chat-input" id="chat-input" rows="1" maxlength="5000" placeholder="${lang === 'vi' ? 'Nhập câu hỏi của bạn...' : 'Type your question...'}" aria-label="${lang === 'vi' ? 'Nhập câu hỏi của bạn' : 'Type your question'}"></textarea>
        <button class="chat-send" id="chat-send">${t('ask.send')}</button>
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

  function saveMessages(): void {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(messages.slice(-20)));
    } catch { /* sessionStorage full */ }
  }

  function getFallbackMessage(): string {
    const name = localized(persona!.name);
    if (lang === 'vi') {
      return `Tôi là ${name}. Rất tiếc, kết nối với thời đại của tôi tạm thời bị gián đoạn. Xin hãy thử lại, hoặc khám phá câu chuyện của tôi trong các báo cáo nghiên cứu.`;
    }
    return `I am ${name}. Unfortunately, the connection to my era is temporarily interrupted. Please try again, or explore my story in the research reports.`;
  }

  let isSubmitting = false;

  async function sendMessage(): Promise<void> {
    const text = inputEl.value.trim();
    if (!text || isSubmitting) return;
    isSubmitting = true;
    sendBtn.setAttribute('disabled', 'true');

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
        <p style="color: var(--text-tertiary); font-style: italic;">${lang === 'vi' ? 'Đang suy nghĩ...' : 'Thinking...'}</p>
      </div>
    `;
    messagesEl.scrollTop = messagesEl.scrollHeight;

    try {
      const response = await fetch('/api/persona', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          personaId: persona!.id,
          systemPrompt: persona!.systemPrompt,
          history: messages.slice(-6).map(m => ({ role: m.role, content: m.content })),
          lang,
        }),
      });

      const thinkingEl = document.getElementById(thinkingId);

      if (!response.ok) {
        const fallback = getFallbackMessage();
        if (thinkingEl) {
          thinkingEl.innerHTML = `<p>${fallback}</p>`;
        }
        const assistantMsg: Message = { role: 'assistant', content: fallback };
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

        const assistantMsg: Message = { role: 'assistant', content: fullText };
        messages.push(assistantMsg);
        saveMessages();
      }
    } catch {
      // Network error — show fallback
      const fallback = getFallbackMessage();
      const thinkingEl = document.getElementById(thinkingId);
      if (thinkingEl) {
        thinkingEl.innerHTML = `<p>${fallback}</p>`;
      }
      const assistantMsg: Message = { role: 'assistant', content: fallback };
      messages.push(assistantMsg);
      saveMessages();
    } finally {
      isSubmitting = false;
      sendBtn.removeAttribute('disabled');
    }
  }
}
