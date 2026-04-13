import { getLang } from '../i18n';

interface Gap {
  id: string;
  topic: { en: string; vi: string };
  category: string;
  description: { en: string; vi: string };
  significance: number;
  status: 'open' | 'in-progress' | 'completed';
}

function loc(obj: { en: string; vi: string }): string {
  return obj[getLang()] || obj.en;
}

export async function renderGaps(): Promise<void> {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `<div class="section" style="padding-top: calc(64px + var(--space-2xl));"><div class="skeleton" style="height: 400px;"></div></div>`;

  const mod = await import('../../data/gaps.json');
  const gaps: Gap[] = mod.default;

  const categories = ['all', 'chronological', 'geographic', 'ethnic', 'thematic', 'comparative'];
  const catLabels: Record<string, { en: string; vi: string }> = {
    all: { en: 'All', vi: 'Tất cả' },
    chronological: { en: 'Chronological', vi: 'Niên đại' },
    geographic: { en: 'Geographic', vi: 'Địa lý' },
    ethnic: { en: 'Ethnic', vi: 'Dân tộc' },
    thematic: { en: 'Thematic', vi: 'Chủ đề' },
    comparative: { en: 'Comparative', vi: 'So sánh' },
  };

  const statusLabels: Record<string, { en: string; vi: string }> = {
    open: { en: 'Open', vi: 'Mở' },
    'in-progress': { en: 'In Progress', vi: 'Đang thực hiện' },
    completed: { en: 'Completed', vi: 'Hoàn thành' },
  };

  let activeCategory = 'all';
  let sortBy = 'significance';

  function renderGrid(): string {
    let filtered = gaps;
    if (activeCategory !== 'all') filtered = filtered.filter(g => g.category === activeCategory);
    if (sortBy === 'significance') filtered.sort((a, b) => b.significance - a.significance);
    else filtered.sort((a, b) => { const o = { open: 0, 'in-progress': 1, completed: 2 }; return (o[a.status] || 0) - (o[b.status] || 0); });

    return filtered.map(g => {
      const statusColor = g.status === 'open' ? 'var(--accent-gold)' : g.status === 'in-progress' ? 'var(--accent-cinnabar)' : 'var(--success)';
      const dots = Array.from({ length: 5 }, (_, i) => `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:3px;background:${i < g.significance ? 'var(--accent-gold)' : 'var(--border-default)'}"></span>`).join('');
      return `
        <div class="lacquer-card" data-gap-id="${g.id}">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-sm);">
            <span style="font-family:var(--font-mono);font-size:11px;color:var(--text-tertiary);">${loc(catLabels[g.category] || { en: g.category, vi: g.category })}</span>
            <span style="font-size:11px;padding:2px 10px;border-radius:9999px;border:1px solid ${statusColor};color:${statusColor};">${loc(statusLabels[g.status])}</span>
          </div>
          <div class="card-title" style="font-size:18px;">${loc(g.topic)}</div>
          <div class="card-desc" style="margin-top:var(--space-sm);">${loc(g.description)}</div>
          <div style="margin-top:var(--space-sm);">${dots}</div>
          ${g.status === 'open' ? `<button class="btn-gold-ghost claim-btn" data-id="${g.id}" style="margin-top:var(--space-md);font-size:12px;padding:6px 12px;">${loc({ en: "I'm working on this", vi: 'Tôi đang nghiên cứu vấn đề này' })}</button>` : ''}
        </div>
      `;
    }).join('');
  }

  app.innerHTML = `
    <div class="section" style="padding-top: calc(64px + var(--space-2xl));">
      <div class="section-eyebrow">${loc({ en: 'Research', vi: 'Nghiên cứu' })}</div>
      <h1>${loc({ en: 'Research Gap Tracker', vi: 'Theo dõi khoảng trống nghiên cứu' })}</h1>
      <p class="section-subtitle">${loc({ en: 'Track the biggest unanswered questions in Vietnam missions scholarship. Claim a gap and contribute.', vi: 'Theo dõi các câu hỏi lớn chưa được giải đáp trong học thuật truyền giáo Việt Nam. Nhận một khoảng trống và đóng góp.' })}</p>

      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:var(--space-md);margin-bottom:var(--space-xl);">
        <div class="report-filters" id="gap-filters">
          ${categories.map(c => `<button data-cat="${c}" class="${c === 'all' ? 'active' : ''}">${loc(catLabels[c])}</button>`).join('')}
        </div>
        <div style="display:flex;gap:var(--space-sm);align-items:center;">
          <label style="font-size:12px;color:var(--text-tertiary);">${loc({ en: 'Sort:', vi: 'Sắp xếp:' })}</label>
          <select id="gap-sort" style="background:var(--bg-surface);border:1px solid var(--border-default);color:var(--text-primary);font-size:12px;padding:4px 8px;border-radius:var(--radius-sm);">
            <option value="significance">${loc({ en: 'Significance', vi: 'Mức quan trọng' })}</option>
            <option value="status">${loc({ en: 'Status', vi: 'Trạng thái' })}</option>
          </select>
          <button id="suggest-gap-btn" class="btn-cinnabar" style="font-size:12px;padding:6px 14px;">${loc({ en: 'Suggest a Gap', vi: 'Đề xuất khoảng trống' })}</button>
        </div>
      </div>

      <div class="report-grid" id="gaps-grid">${renderGrid()}</div>

      <div id="claim-modal" style="display:none;position:fixed;inset:0;z-index:200;background:var(--bg-overlay);display:none;justify-content:center;align-items:center;">
        <div style="background:var(--bg-surface);border:1px solid var(--border-default);padding:var(--space-xl);max-width:500px;width:90%;border-radius:var(--radius-md);">
          <h3 id="claim-title" style="margin-bottom:var(--space-lg);"></h3>
          <div id="claim-form-content"></div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-mission">${loc({ en: 'AI can serve the Great Commission — not replace human connection, but extend it.', vi: 'AI có thể phục vụ Đại Mệnh Lệnh — không thay thế mối liên kết con người, mà mở rộng nó.' })}</div>
        <div class="footer-links"><a href="#/about">${loc({ en: 'About', vi: 'Giới thiệu' })}</a></div>
      </div>
      <div class="footer-tagline">${loc({ en: 'Powered by AI. Grounded in 493 years of history.', vi: 'Được hỗ trợ bởi AI. Dựa trên 493 năm lịch sử.' })}</div>
    </footer>
  `;

  const grid = document.getElementById('gaps-grid')!;
  const modal = document.getElementById('claim-modal')!;

  // Filters
  document.getElementById('gap-filters')!.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('button');
    if (!btn) return;
    activeCategory = btn.dataset.cat || 'all';
    document.querySelectorAll('#gap-filters button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    grid.innerHTML = renderGrid();
  });

  // Sort
  document.getElementById('gap-sort')!.addEventListener('change', (e) => {
    sortBy = (e.target as HTMLSelectElement).value;
    grid.innerHTML = renderGrid();
  });

  // Claim button
  grid.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('.claim-btn') as HTMLButtonElement;
    if (!btn) return;
    const gapId = btn.dataset.id;
    const gap = gaps.find(g => g.id === gapId);
    if (!gap) return;
    showModal(loc({ en: "I'm Working on This", vi: 'Tôi đang nghiên cứu vấn đề này' }), `
      <p style="color:var(--text-secondary);margin-bottom:var(--space-lg);font-size:14px;">${loc(gap.topic)}</p>
      <input type="text" placeholder="${loc({ en: 'Your name', vi: 'Tên của bạn' })}" style="width:100%;margin-bottom:var(--space-sm);padding:8px 12px;background:var(--bg-elevated);border:1px solid var(--border-default);color:var(--text-primary);border-radius:var(--radius-sm);font-family:var(--font-body);">
      <input type="text" placeholder="${loc({ en: 'Institution', vi: 'Tổ chức' })}" style="width:100%;margin-bottom:var(--space-sm);padding:8px 12px;background:var(--bg-elevated);border:1px solid var(--border-default);color:var(--text-primary);border-radius:var(--radius-sm);font-family:var(--font-body);">
      <input type="text" placeholder="${loc({ en: 'Expected completion (e.g., 2027)', vi: 'Dự kiến hoàn thành (VD: 2027)' })}" style="width:100%;margin-bottom:var(--space-sm);padding:8px 12px;background:var(--bg-elevated);border:1px solid var(--border-default);color:var(--text-primary);border-radius:var(--radius-sm);font-family:var(--font-body);">
      <textarea placeholder="${loc({ en: 'Brief description of your work', vi: 'Mô tả ngắn gọn công việc của bạn' })}" rows="3" style="width:100%;margin-bottom:var(--space-lg);padding:8px 12px;background:var(--bg-elevated);border:1px solid var(--border-default);color:var(--text-primary);border-radius:var(--radius-sm);font-family:var(--font-body);resize:vertical;"></textarea>
      <button class="btn-cinnabar modal-submit">${loc({ en: 'Submit', vi: 'Gửi' })}</button>
      <button class="btn-gold-ghost modal-close" style="margin-left:var(--space-sm);">${loc({ en: 'Cancel', vi: 'Hủy' })}</button>
    `);
  });

  // Suggest gap button
  document.getElementById('suggest-gap-btn')!.addEventListener('click', () => {
    showModal(loc({ en: 'Suggest a Research Gap', vi: 'Đề xuất khoảng trống nghiên cứu' }), `
      <input type="text" placeholder="${loc({ en: 'Topic', vi: 'Chủ đề' })}" style="width:100%;margin-bottom:var(--space-sm);padding:8px 12px;background:var(--bg-elevated);border:1px solid var(--border-default);color:var(--text-primary);border-radius:var(--radius-sm);font-family:var(--font-body);">
      <select style="width:100%;margin-bottom:var(--space-sm);padding:8px 12px;background:var(--bg-elevated);border:1px solid var(--border-default);color:var(--text-primary);border-radius:var(--radius-sm);font-family:var(--font-body);">
        ${categories.filter(c => c !== 'all').map(c => `<option value="${c}">${loc(catLabels[c])}</option>`).join('')}
      </select>
      <textarea placeholder="${loc({ en: 'Description', vi: 'Mô tả' })}" rows="3" style="width:100%;margin-bottom:var(--space-sm);padding:8px 12px;background:var(--bg-elevated);border:1px solid var(--border-default);color:var(--text-primary);border-radius:var(--radius-sm);font-family:var(--font-body);resize:vertical;"></textarea>
      <input type="text" placeholder="${loc({ en: 'Your name', vi: 'Tên của bạn' })}" style="width:100%;margin-bottom:var(--space-lg);padding:8px 12px;background:var(--bg-elevated);border:1px solid var(--border-default);color:var(--text-primary);border-radius:var(--radius-sm);font-family:var(--font-body);">
      <button class="btn-cinnabar modal-submit">${loc({ en: 'Submit', vi: 'Gửi' })}</button>
      <button class="btn-gold-ghost modal-close" style="margin-left:var(--space-sm);">${loc({ en: 'Cancel', vi: 'Hủy' })}</button>
    `);
  });

  function showModal(title: string, content: string): void {
    document.getElementById('claim-title')!.textContent = title;
    document.getElementById('claim-form-content')!.innerHTML = content;
    modal.style.display = 'flex';

    modal.querySelector('.modal-close')?.addEventListener('click', () => { modal.style.display = 'none'; });
    modal.querySelector('.modal-submit')?.addEventListener('click', () => {
      modal.querySelector('.modal-submit')!.textContent = loc({ en: 'Thank you!', vi: 'Cảm ơn bạn!' });
      (modal.querySelector('.modal-submit') as HTMLButtonElement).disabled = true;
      setTimeout(() => { modal.style.display = 'none'; }, 1500);
    });
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
  }
}
