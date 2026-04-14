import { describe, it, expect } from 'vitest';
import { escapeHtml, formatResponse, extractSources } from '../shared/text-utils';

describe('escapeHtml', () => {
  it('escapes < and > to HTML entities', () => {
    expect(escapeHtml('<script>')).toBe('&lt;script&gt;');
  });

  it('escapes & to &amp;', () => {
    expect(escapeHtml('A & B')).toBe('A &amp; B');
  });

  it('escapes all three characters together', () => {
    expect(escapeHtml('<div class="a">&</div>')).toBe('&lt;div class="a"&gt;&amp;&lt;/div&gt;');
  });

  it('returns empty string unchanged', () => {
    expect(escapeHtml('')).toBe('');
  });

  it('leaves safe text unchanged', () => {
    expect(escapeHtml('Hello world')).toBe('Hello world');
  });

  it('handles Vietnamese text without modification', () => {
    expect(escapeHtml('Chữ Quốc ngữ')).toBe('Chữ Quốc ngữ');
  });

  it('prevents XSS injection', () => {
    const malicious = '<img onerror="alert(1)" src=x>';
    const escaped = escapeHtml(malicious);
    expect(escaped).not.toContain('<');
    expect(escaped).not.toContain('>');
  });
});

describe('formatResponse', () => {
  it('converts **bold** to <strong> tags', () => {
    expect(formatResponse('**bold text**')).toBe('<strong>bold text</strong>');
  });

  it('converts *italic* to <em> tags', () => {
    expect(formatResponse('*italic text*')).toBe('<em>italic text</em>');
  });

  it('converts double newlines to paragraph breaks', () => {
    expect(formatResponse('para one\n\npara two')).toBe('para one</p><p>para two');
  });

  it('converts single newlines to <br>', () => {
    expect(formatResponse('line one\nline two')).toBe('line one<br>line two');
  });

  it('escapes HTML before applying markdown formatting', () => {
    const result = formatResponse('**<script>**');
    expect(result).toBe('<strong>&lt;script&gt;</strong>');
    expect(result).not.toContain('<script>');
  });

  it('handles combined bold, italic, and newlines', () => {
    const input = '**Title**\n\n*Subtitle*\nBody text';
    const result = formatResponse(input);
    expect(result).toContain('<strong>Title</strong>');
    expect(result).toContain('</p><p>');
    expect(result).toContain('<em>Subtitle</em>');
    expect(result).toContain('<br>');
  });

  it('returns empty string unchanged', () => {
    expect(formatResponse('')).toBe('');
  });

  it('handles text with no formatting markers', () => {
    expect(formatResponse('plain text')).toBe('plain text');
  });
});

describe('extractSources', () => {
  it('extracts report numbers from text', () => {
    const result = extractSources('See Report 01 and Report 07 for details.');
    expect(result).toContain('01');
    expect(result).toContain('07');
    expect(result).toHaveLength(2);
  });

  it('pads single-digit report numbers to two digits', () => {
    const result = extractSources('Report 1 and Report 7');
    expect(result).toContain('01');
    expect(result).toContain('07');
  });

  it('excludes report numbers out of range (0)', () => {
    const result = extractSources('Report 0 is not valid.');
    expect(result).not.toContain('00');
    expect(result).toHaveLength(0);
  });

  it('excludes report numbers out of range (13+)', () => {
    const result = extractSources('Report 13 does not exist.');
    expect(result).not.toContain('13');
    expect(result).toHaveLength(0);
  });

  it('handles edge case: Report 12 is valid', () => {
    const result = extractSources('Report 12 is the last valid one.');
    expect(result).toContain('12');
    expect(result).toHaveLength(1);
  });

  it('deduplicates repeated report references', () => {
    const result = extractSources('Report 01, then Report 01 again, and Report 03.');
    expect(result).toContain('01');
    expect(result).toContain('03');
    expect(result).toHaveLength(2);
  });

  it('returns empty array for text with no report references', () => {
    const result = extractSources('No references to any reports here.');
    expect(result).toEqual([]);
  });

  it('is case-insensitive', () => {
    const result = extractSources('report 5 and REPORT 10');
    expect(result).toContain('05');
    expect(result).toContain('10');
  });

  it('handles text with mixed valid and invalid report numbers', () => {
    const result = extractSources('Report 3, Report 0, Report 15, Report 12');
    expect(result).toContain('03');
    expect(result).toContain('12');
    expect(result).not.toContain('00');
    expect(result).not.toContain('15');
  });
});
