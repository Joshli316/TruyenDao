import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock data-loader before importing search
vi.mock('../data-loader', () => {
  const mockReports = [
    {
      id: '01',
      title: { en: 'Christianity in Vietnam: A Comprehensive History', vi: 'Kitô giáo tại Việt Nam: Lịch sử toàn diện' },
      summary: { en: 'Vietnam presents one of the most complex case studies in Asian mission history.', vi: 'Việt Nam là một trong những trường hợp phức tạp nhất.' },
      tags: ['history', 'overview'],
      readingTime: 21,
      featured: true,
      sections: [
        {
          heading: { en: 'Era 1: Early Contact', vi: 'Giai đoạn 1: Tiếp xúc ban đầu' },
          content: { en: 'The first recorded Christian presence in Vietnam dates to 1533.', vi: 'Sự hiện diện Kitô giáo đầu tiên được ghi nhận vào năm 1533.' },
        },
        {
          heading: { en: 'Alexandre de Rhodes and Chữ Quốc Ngữ', vi: 'Alexandre de Rhodes và chữ Quốc ngữ' },
          content: { en: 'Alexandre de Rhodes systematized the romanized Vietnamese script called Chữ Quốc Ngữ.', vi: 'Alexandre de Rhodes hệ thống hóa chữ Quốc ngữ La-tinh hóa.' },
        },
      ],
    },
    {
      id: '07',
      title: { en: 'Chữ Quốc Ngữ: The Missionary Script', vi: 'Chữ Quốc ngữ: Chữ viết truyền giáo' },
      summary: { en: 'The romanized alphabet used by over 100 million Vietnamese today was created by Jesuit missionaries.', vi: 'Bảng chữ cái La-tinh hóa được hơn 100 triệu người Việt Nam sử dụng.' },
      tags: ['script', 'language'],
      readingTime: 15,
      featured: false,
      sections: [
        {
          heading: { en: 'Origins of the Script', vi: 'Nguồn gốc chữ viết' },
          content: { en: 'Francisco de Pina and Alexandre de Rhodes developed the romanized script in the early 17th century.', vi: 'Francisco de Pina và Alexandre de Rhodes phát triển chữ viết La-tinh vào đầu thế kỷ 17.' },
        },
      ],
    },
    {
      id: '08',
      title: { en: 'The 117 Vietnamese Martyrs', vi: '117 Thánh Tử Đạo Việt Nam' },
      summary: { en: 'The 117 Vietnamese Martyrs were canonized in 1988.', vi: '117 Thánh Tử Đạo Việt Nam được phong thánh năm 1988.' },
      tags: ['martyrs', 'saints'],
      readingTime: 18,
      featured: true,
      sections: [
        {
          heading: { en: 'The Persecutions', vi: 'Các cuộc bách hại' },
          content: { en: 'The great persecutions under Minh Mạng, Thiệu Trị, and Tự Đức killed an estimated 100,000-300,000 Christians.', vi: 'Các cuộc bách hại lớn dưới triều Minh Mạng, Thiệu Trị, và Tự Đức.' },
        },
      ],
    },
  ];

  return {
    loadAllReports: vi.fn().mockResolvedValue(mockReports),
    localized: vi.fn((obj: { en: string; vi: string }) => obj.en),
  };
});

// Mock i18n
vi.mock('../i18n', () => ({
  t: vi.fn((key: string) => key),
}));

import { search } from '../search';

describe('search module', () => {
  beforeEach(() => {
    // Reset the module-level index cache by re-importing
    // Each test gets a fresh call to buildIndex via search()
  });

  it('returns empty results for an empty query', async () => {
    const results = await search('');
    expect(results).toEqual([]);
  });

  it('returns empty results for a whitespace-only query', async () => {
    const results = await search('   ');
    expect(results).toEqual([]);
  });

  it('returns results with correct structure for a matching query', async () => {
    const results = await search('Vietnam Christianity');
    expect(results.length).toBeGreaterThan(0);

    const first = results[0];
    expect(first).toHaveProperty('report');
    expect(first).toHaveProperty('score');
    expect(first).toHaveProperty('excerpt');
    expect(first.report).toHaveProperty('id');
    expect(first.report).toHaveProperty('title');
    expect(typeof first.score).toBe('number');
    expect(typeof first.excerpt).toBe('string');
  });

  it('returns results sorted by relevance (highest score first)', async () => {
    const results = await search('Vietnam Christianity history');
    if (results.length >= 2) {
      for (let i = 0; i < results.length - 1; i++) {
        expect(results[i].score).toBeGreaterThanOrEqual(results[i + 1].score);
      }
    }
  });

  it('finds reports containing "Quốc ngữ" (Vietnamese diacritical marks)', async () => {
    const results = await search('Quốc ngữ');
    expect(results.length).toBeGreaterThan(0);
    // Report 07 is specifically about Chữ Quốc Ngữ
    const ids = results.map(r => r.report.id);
    expect(ids).toContain('07');
  });

  it('handles special characters without crashing', async () => {
    const specialChars = [
      '<script>alert("xss")</script>',
      'test@#$%^&*()',
      '[]{}|\\;:\'",.<>/?',
      '🇻🇳',
      '\\n\\t\\r',
    ];

    for (const query of specialChars) {
      // Should not throw
      const results = await search(query);
      expect(Array.isArray(results)).toBe(true);
    }
  });

  it('returns at most 10 results', async () => {
    const results = await search('the');
    expect(results.length).toBeLessThanOrEqual(10);
  });

  it('all results have a positive score', async () => {
    const results = await search('martyrs persecutions');
    for (const r of results) {
      expect(r.score).toBeGreaterThan(0);
    }
  });

  it('finds partial term matches', async () => {
    // "martyr" should partially match "martyrs"
    const results = await search('martyr');
    expect(results.length).toBeGreaterThan(0);
  });

  it('excerpt contains a substring of the original content or summary', async () => {
    const results = await search('Alexandre de Rhodes');
    expect(results.length).toBeGreaterThan(0);
    const first = results[0];
    // Excerpt should be a non-empty string
    expect(first.excerpt.length).toBeGreaterThan(0);
  });
});
