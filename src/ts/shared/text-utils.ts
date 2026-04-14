/**
 * Shared text utility functions used by ask-archive and persona-chat.
 */

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function formatResponse(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
}

export function extractSources(text: string): string[] {
  const matches = text.match(/Report\s+(\d{1,2})/gi) || [];
  const ids = new Set<string>();
  matches.forEach(m => {
    const num = m.replace(/Report\s+/i, '').padStart(2, '0');
    if (parseInt(num) >= 1 && parseInt(num) <= 12) ids.add(num);
  });
  return Array.from(ids);
}
