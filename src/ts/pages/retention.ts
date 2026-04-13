import { t, getLang } from '../i18n';
import { setCleanup } from '../main';

/* =========================================
   Types
   ========================================= */

type BiStr = { en: string; vi: string };

interface FactorResult {
  label: BiStr;
  score: number;
  max: number;
  key: string;
}

interface RetentionResult {
  total: number;
  factors: FactorResult[];
}

/* =========================================
   Helpers
   ========================================= */

function loc(obj: BiStr): string {
  const lang = getLang();
  return obj[lang] || obj.en;
}

/* =========================================
   Constants — Input Options
   ========================================= */

const YEARS_ABROAD_OPTIONS = [
  { value: '1-2', label: { en: '1-2 years', vi: '1-2 năm' }, score: 5 },
  { value: '3-5', label: { en: '3-5 years', vi: '3-5 năm' }, score: 0 },
  { value: '6-8', label: { en: '6-8 years', vi: '6-8 năm' }, score: -5 },
  { value: '9+', label: { en: '9+ years', vi: '9+ năm' }, score: -10 },
];

const CHURCH_INVOLVEMENT_OPTIONS = [
  { value: 'weekly', label: { en: 'Weekly', vi: 'Hàng tuần' }, score: 20 },
  { value: 'monthly', label: { en: 'Monthly', vi: 'Hàng tháng' }, score: 10 },
  { value: 'occasionally', label: { en: 'Occasionally', vi: 'Thỉnh thoảng' }, score: 0 },
  { value: 'rarely', label: { en: 'Rarely', vi: 'Hiếm khi' }, score: -15 },
];

const VN_COMMUNITY_OPTIONS = [
  { value: 'active', label: { en: 'Yes — active', vi: 'Có — tích cực' }, score: 15 },
  { value: 'loose', label: { en: 'Yes — loose', vi: 'Có — lỏng lẻo' }, score: 5 },
  { value: 'none', label: { en: 'No', vi: 'Không' }, score: -10 },
];

const PRE_RETURN_PLAN_OPTIONS = [
  { value: 'specific', label: { en: 'Yes — specific church identified', vi: 'Có — đã xác định nhà thờ cụ thể' }, score: 25 },
  { value: 'general', label: { en: 'Yes — general plan', vi: 'Có — kế hoạch chung' }, score: 10 },
  { value: 'none', label: { en: 'No plan', vi: 'Chưa có kế hoạch' }, score: -15 },
];

const FAMILY_BG_OPTIONS = [
  { value: 'christian', label: { en: 'Christian family', vi: 'Gia đình Kitô giáo' }, score: 15 },
  { value: 'mixed', label: { en: 'Mixed', vi: 'Hỗn hợp' }, score: 5 },
  { value: 'non-christian', label: { en: 'Non-Christian', vi: 'Không theo đạo' }, score: -5 },
  { value: 'hostile', label: { en: 'Hostile to faith', vi: 'Chống đối đức tin' }, score: -15 },
];

const CITY_OPTIONS = [
  { value: 'hcmc', label: { en: 'HCMC', vi: 'TP. Hồ Chí Minh' }, score: 10 },
  { value: 'hanoi', label: { en: 'Hanoi', vi: 'Hà Nội' }, score: 5 },
  { value: 'danang', label: { en: 'Đà Nẵng', vi: 'Đà Nẵng' }, score: 5 },
  { value: 'other-major', label: { en: 'Other major city', vi: 'Thành phố lớn khác' }, score: 0 },
  { value: 'rural', label: { en: 'Rural area', vi: 'Vùng nông thôn' }, score: -10 },
];

const DISCIPLESHIP_OPTIONS = [
  { value: 'full', label: { en: 'Completed course + mentored others', vi: 'Hoàn thành khóa học + hướng dẫn người khác' }, score: 20 },
  { value: 'course', label: { en: 'Completed course', vi: 'Hoàn thành khóa học' }, score: 10 },
  { value: 'informal', label: { en: 'Informal', vi: 'Không chính thức' }, score: 5 },
  { value: 'none', label: { en: 'None', vi: 'Không có' }, score: -10 },
];

/* =========================================
   Scoring Model
   ========================================= */

const BASE_SCORE = 50;

function calculateRetention(form: Record<string, string>): RetentionResult {
  const factors: FactorResult[] = [];

  // Church involvement
  const church = CHURCH_INVOLVEMENT_OPTIONS.find(o => o.value === form.church);
  factors.push({
    label: { en: 'Church involvement', vi: 'Tham gia nhà thờ' },
    score: church?.score ?? 0,
    max: 20,
    key: 'church',
  });

  // Vietnamese community
  const community = VN_COMMUNITY_OPTIONS.find(o => o.value === form.community);
  factors.push({
    label: { en: 'Vietnamese community', vi: 'Cộng đồng Việt Nam' },
    score: community?.score ?? 0,
    max: 15,
    key: 'community',
  });

  // Pre-return plan
  const plan = PRE_RETURN_PLAN_OPTIONS.find(o => o.value === form.plan);
  factors.push({
    label: { en: 'Pre-return church plan', vi: 'Kế hoạch nhà thờ trước khi về' },
    score: plan?.score ?? 0,
    max: 25,
    key: 'plan',
  });

  // Family background
  const family = FAMILY_BG_OPTIONS.find(o => o.value === form.family);
  factors.push({
    label: { en: 'Family background', vi: 'Bối cảnh gia đình' },
    score: family?.score ?? 0,
    max: 15,
    key: 'family',
  });

  // City
  const city = CITY_OPTIONS.find(o => o.value === form.city);
  factors.push({
    label: { en: 'City returning to', vi: 'Thành phố trở về' },
    score: city?.score ?? 0,
    max: 10,
    key: 'city',
  });

  // Discipleship depth
  const discipleship = DISCIPLESHIP_OPTIONS.find(o => o.value === form.discipleship);
  factors.push({
    label: { en: 'Discipleship depth', vi: 'Chiều sâu môn đồ hóa' },
    score: discipleship?.score ?? 0,
    max: 20,
    key: 'discipleship',
  });

  // Years abroad
  const years = YEARS_ABROAD_OPTIONS.find(o => o.value === form.years);
  factors.push({
    label: { en: 'Years abroad', vi: 'Số năm ở nước ngoài' },
    score: years?.score ?? 0,
    max: 5,
    key: 'years',
  });

  const rawTotal = BASE_SCORE + factors.reduce((sum, f) => sum + f.score, 0);
  const total = Math.max(5, Math.min(95, rawTotal));

  return { total, factors };
}

/* =========================================
   "Improve My Score" Recommendations
   ========================================= */

interface Recommendation {
  condition: (form: Record<string, string>) => boolean;
  label: BiStr;
  action: BiStr;
  link?: string;
}

const RECOMMENDATIONS: Recommendation[] = [
  {
    condition: (f) => f.plan === 'none',
    label: { en: 'No church plan', vi: 'Chưa có kế hoạch nhà thờ' },
    action: {
      en: 'Use the Returnee Tool to find churches in your city',
      vi: 'Sử dụng Công cụ cho Người Trở Về để tìm nhà thờ tại thành phố của bạn'
    },
    link: '#/tools/returnee',
  },
  {
    condition: (f) => f.community === 'none',
    label: { en: 'No Vietnamese Christian community', vi: 'Không có cộng đồng Kitô hữu Việt Nam' },
    action: {
      en: 'Connect with Vietnamese Christian Fellowship (VCF) — active chapters serve returnees across Vietnam',
      vi: 'Kết nối với Hội Thánh Tin Lành Việt Nam (VCF) — các chi hội hỗ trợ người trở về trên khắp Việt Nam'
    },
  },
  {
    condition: (f) => f.discipleship === 'none' || f.discipleship === 'informal',
    label: { en: 'Low discipleship depth', vi: 'Chiều sâu môn đồ hóa thấp' },
    action: {
      en: 'Complete a training module before you return',
      vi: 'Hoàn thành mô-đun đào tạo trước khi bạn trở về'
    },
    link: '#/tools/training',
  },
  {
    condition: (f) => f.family === 'hostile',
    label: { en: 'Hostile family environment', vi: 'Môi trường gia đình chống đối' },
    action: {
      en: 'Read about navigating ancestor worship and family dynamics in Report 07',
      vi: 'Đọc về cách ứng xử với thờ cúng tổ tiên và quan hệ gia đình trong Báo cáo 07'
    },
    link: '#/research/07',
  },
  {
    condition: (f) => f.church === 'rarely',
    label: { en: 'Rare church attendance', vi: 'Hiếm khi tham dự nhà thờ' },
    action: {
      en: 'Even occasional attendance abroad builds habits that transfer home — start now',
      vi: 'Ngay cả việc tham dự thỉnh thoảng ở nước ngoài cũng tạo thói quen mang về — hãy bắt đầu ngay'
    },
  },
  {
    condition: (f) => f.city === 'rural',
    label: { en: 'Returning to rural area', vi: 'Trở về vùng nông thôn' },
    action: {
      en: 'Rural areas have fewer churches but strong house church networks — the Returnee Tool can help you find them',
      vi: 'Vùng nông thôn ít nhà thờ nhưng có mạng lưới nhà thờ tại gia mạnh — Công cụ cho Người Trở Về có thể giúp bạn tìm'
    },
    link: '#/tools/returnee',
  },
];

/* =========================================
   Render Functions
   ========================================= */

function renderFormHTML(): string {
  function radioGroup(name: string, options: { value: string; label: BiStr }[]): string {
    return options.map(opt => `
      <label class="retention-radio-label">
        <input type="radio" name="${name}" value="${opt.value}" />
        <span>${loc(opt.label)}</span>
      </label>
    `).join('');
  }

  return `
    <div class="section" style="padding-top: calc(64px + var(--space-2xl));">
      <div class="section-eyebrow">${loc({ en: 'Faith Retention Calculator', vi: 'Tính toán gìn giữ đức tin' })}</div>
      <h1>${loc({ en: 'Faith Retention Calculator', vi: 'Tính toán gìn giữ đức tin' })}</h1>
      <p class="section-subtitle">${loc({
        en: 'Estimate the likelihood of maintaining active faith after returning to Vietnam. Answer 7 questions to see your retention profile and personalized recommendations.',
        vi: 'Ước tính khả năng duy trì đức tin tích cực sau khi trở về Việt Nam. Trả lời 7 câu hỏi để xem hồ sơ gìn giữ đức tin và gợi ý cá nhân hóa.'
      })}</p>
      <div class="gold-divider"></div>

      <form id="retention-form" class="retention-form">
        <!-- 1. Years abroad -->
        <div class="retention-question lacquer-card">
          <div class="retention-question-number">${loc({ en: 'Question 1 of 7', vi: 'Câu hỏi 1 / 7' })}</div>
          <div class="card-title">${loc({ en: 'How many years have you been abroad?', vi: 'Bạn đã ở nước ngoài bao nhiêu năm?' })}</div>
          <div class="retention-options">
            ${radioGroup('years', YEARS_ABROAD_OPTIONS)}
          </div>
        </div>

        <!-- 2. Church involvement -->
        <div class="retention-question lacquer-card">
          <div class="retention-question-number">${loc({ en: 'Question 2 of 7', vi: 'Câu hỏi 2 / 7' })}</div>
          <div class="card-title">${loc({ en: 'How often do you attend church abroad?', vi: 'Bạn tham dự nhà thờ ở nước ngoài bao lâu một lần?' })}</div>
          <div class="retention-options">
            ${radioGroup('church', CHURCH_INVOLVEMENT_OPTIONS)}
          </div>
        </div>

        <!-- 3. Vietnamese Christian community -->
        <div class="retention-question lacquer-card">
          <div class="retention-question-number">${loc({ en: 'Question 3 of 7', vi: 'Câu hỏi 3 / 7' })}</div>
          <div class="card-title">${loc({ en: 'Are you part of a Vietnamese Christian community abroad?', vi: 'Bạn có tham gia cộng đồng Kitô hữu Việt Nam ở nước ngoài không?' })}</div>
          <div class="retention-options">
            ${radioGroup('community', VN_COMMUNITY_OPTIONS)}
          </div>
        </div>

        <!-- 4. Pre-return plan -->
        <div class="retention-question lacquer-card">
          <div class="retention-question-number">${loc({ en: 'Question 4 of 7', vi: 'Câu hỏi 4 / 7' })}</div>
          <div class="card-title">${loc({ en: 'Do you have a church plan for when you return?', vi: 'Bạn có kế hoạch nhà thờ khi trở về không?' })}</div>
          <div class="retention-options">
            ${radioGroup('plan', PRE_RETURN_PLAN_OPTIONS)}
          </div>
        </div>

        <!-- 5. Family background -->
        <div class="retention-question lacquer-card">
          <div class="retention-question-number">${loc({ en: 'Question 5 of 7', vi: 'Câu hỏi 5 / 7' })}</div>
          <div class="card-title">${loc({ en: 'What is your family\'s religious background?', vi: 'Bối cảnh tôn giáo của gia đình bạn là gì?' })}</div>
          <div class="retention-options">
            ${radioGroup('family', FAMILY_BG_OPTIONS)}
          </div>
        </div>

        <!-- 6. City -->
        <div class="retention-question lacquer-card">
          <div class="retention-question-number">${loc({ en: 'Question 6 of 7', vi: 'Câu hỏi 6 / 7' })}</div>
          <div class="card-title">${loc({ en: 'Which city are you returning to?', vi: 'Bạn trở về thành phố nào?' })}</div>
          <div class="retention-options">
            ${radioGroup('city', CITY_OPTIONS)}
          </div>
        </div>

        <!-- 7. Discipleship -->
        <div class="retention-question lacquer-card">
          <div class="retention-question-number">${loc({ en: 'Question 7 of 7', vi: 'Câu hỏi 7 / 7' })}</div>
          <div class="card-title">${loc({ en: 'What is your discipleship depth?', vi: 'Chiều sâu môn đồ hóa của bạn ở mức nào?' })}</div>
          <div class="retention-options">
            ${radioGroup('discipleship', DISCIPLESHIP_OPTIONS)}
          </div>
        </div>

        <div style="text-align: center; margin-top: var(--space-xl);">
          <button type="submit" class="btn-cinnabar" id="retention-submit">
            ${loc({ en: 'Calculate My Score', vi: 'Tính điểm của tôi' })}
          </button>
        </div>
      </form>
    </div>
  `;
}

function getScoreColor(score: number): string {
  if (score > 70) return '#4CAF50';
  if (score >= 40) return 'var(--accent-gold)';
  return 'var(--accent-cinnabar)';
}

function getScoreLabel(score: number): BiStr {
  if (score > 70) return { en: 'Strong retention outlook', vi: 'Triển vọng gìn giữ đức tin tốt' };
  if (score >= 40) return { en: 'Moderate — action needed', vi: 'Trung bình — cần hành động' };
  return { en: 'At risk — urgent action recommended', vi: 'Nguy cơ cao — khuyến nghị hành động khẩn' };
}

function renderBarChart(factors: FactorResult[]): string {
  const sorted = [...factors].sort((a, b) => b.score - a.score);

  return sorted.map(f => {
    const barColor = f.score > 0 ? '#4CAF50' : f.score < 0 ? 'var(--accent-cinnabar)' : 'var(--text-tertiary)';
    // Normalize bar width: map score range to 0-100%
    // Max positive is 25, max negative is -15
    const absMax = 25;
    const pct = Math.round(Math.abs(f.score) / absMax * 100);
    const isPositive = f.score >= 0;
    const sign = f.score > 0 ? '+' : '';

    return `
      <div class="retention-bar-row">
        <div class="retention-bar-label">${loc(f.label)}</div>
        <div class="retention-bar-track">
          <div class="retention-bar-center"></div>
          ${isPositive
            ? `<div class="retention-bar-fill retention-bar-positive" style="width: ${pct}%; background: ${barColor};"></div>`
            : `<div class="retention-bar-fill retention-bar-negative" style="width: ${pct}%; background: ${barColor};"></div>`
          }
        </div>
        <div class="retention-bar-value" style="color: ${barColor};">${sign}${f.score}</div>
      </div>
    `;
  }).join('');
}

function renderResultsHTML(result: RetentionResult, form: Record<string, string>): string {
  const color = getScoreColor(result.total);
  const label = getScoreLabel(result.total);

  // Find top helpers and top hurts
  const helpers = result.factors.filter(f => f.score > 0).sort((a, b) => b.score - a.score);
  const hurts = result.factors.filter(f => f.score < 0).sort((a, b) => a.score - b.score);

  // Get applicable recommendations
  const recs = RECOMMENDATIONS.filter(r => r.condition(form));

  return `
    <div class="section" style="padding-top: calc(64px + var(--space-2xl));">
      <div class="section-eyebrow">${loc({ en: 'Your Results', vi: 'Kết quả của bạn' })}</div>
      <h1>${loc({ en: 'Faith Retention Profile', vi: 'Hồ sơ gìn giữ đức tin' })}</h1>
      <div class="gold-divider"></div>

      <!-- Score Display -->
      <div class="lacquer-card featured" style="text-align: center; padding: var(--space-xl); margin-top: var(--space-xl);">
        <div style="font-family: var(--font-mono); font-size: 72px; font-weight: 700; color: ${color}; line-height: 1;">
          ${result.total}%
        </div>
        <div style="font-size: var(--text-lg); color: ${color}; margin-top: var(--space-md); font-weight: 600;">
          ${loc(label)}
        </div>
        <div style="font-size: var(--text-sm); color: var(--text-tertiary); margin-top: var(--space-sm);">
          ${loc({ en: 'Estimated faith retention probability', vi: 'Xác suất gìn giữ đức tin ước tính' })}
        </div>
      </div>

      <!-- Comparison stat -->
      <div class="lacquer-card" style="margin-top: var(--space-lg); border-left: 4px solid var(--accent-gold); display: flex; align-items: center; gap: var(--space-md);">
        <div style="font-family: var(--font-mono); font-size: var(--text-2xl); color: var(--accent-gold); font-weight: 700; flex-shrink: 0;">2x</div>
        <div style="font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.6;">
          ${loc({
            en: 'Students with a pre-return church plan retain active faith at 2x the rate of those without one.',
            vi: 'Sinh viên có kế hoạch nhà thờ trước khi về duy trì đức tin tích cực gấp 2 lần so với những người không có.'
          })}
        </div>
      </div>

      <!-- Factor Breakdown -->
      <div style="margin-top: var(--space-xl);">
        <h2 style="font-family: var(--font-display); margin-bottom: var(--space-lg);">
          ${loc({ en: 'Score Breakdown', vi: 'Phân tích điểm' })}
        </h2>

        <div class="lacquer-card" style="padding: var(--space-lg);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-lg);">
            <div style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-tertiary);">
              ${loc({ en: 'BASE SCORE', vi: 'ĐIỂM CƠ SỞ' })}
            </div>
            <div style="font-family: var(--font-mono); font-size: var(--text-sm); color: var(--text-secondary);">
              ${BASE_SCORE}
            </div>
          </div>
          ${renderBarChart(result.factors)}
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: var(--space-lg); padding-top: var(--space-md); border-top: 1px solid var(--border-default);">
            <div style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-tertiary);">
              ${loc({ en: 'TOTAL', vi: 'TỔNG' })}
            </div>
            <div style="font-family: var(--font-mono); font-size: var(--text-lg); color: ${color}; font-weight: 700;">
              ${result.total}%
            </div>
          </div>
        </div>
      </div>

      <!-- Risk Factor Summary -->
      <div style="margin-top: var(--space-xl);">
        <h2 style="font-family: var(--font-display); margin-bottom: var(--space-lg);">
          ${loc({ en: 'Risk Factor Summary', vi: 'Tóm tắt yếu tố rủi ro' })}
        </h2>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md);">
          <!-- Helping factors -->
          <div class="lacquer-card" style="border-top: 3px solid #4CAF50;">
            <div style="font-family: var(--font-mono); font-size: var(--text-xs); color: #4CAF50; margin-bottom: var(--space-md);">
              ${loc({ en: 'HELPING', vi: 'YẾU TỐ THUẬN LỢI' })}
            </div>
            ${helpers.length > 0
              ? helpers.map(f => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-xs) 0;">
                  <span style="font-size: var(--text-sm); color: var(--text-secondary);">${loc(f.label)}</span>
                  <span style="font-family: var(--font-mono); font-size: var(--text-sm); color: #4CAF50;">+${f.score}</span>
                </div>
              `).join('')
              : `<div style="font-size: var(--text-sm); color: var(--text-tertiary);">${loc({ en: 'No positive factors identified', vi: 'Không xác định được yếu tố tích cực' })}</div>`
            }
          </div>

          <!-- Hurting factors -->
          <div class="lacquer-card" style="border-top: 3px solid var(--accent-cinnabar);">
            <div style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--accent-cinnabar); margin-bottom: var(--space-md);">
              ${loc({ en: 'RISK FACTORS', vi: 'YẾU TỐ RỦI RO' })}
            </div>
            ${hurts.length > 0
              ? hurts.map(f => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-xs) 0;">
                  <span style="font-size: var(--text-sm); color: var(--text-secondary);">${loc(f.label)}</span>
                  <span style="font-family: var(--font-mono); font-size: var(--text-sm); color: var(--accent-cinnabar);">${f.score}</span>
                </div>
              `).join('')
              : `<div style="font-size: var(--text-sm); color: var(--text-tertiary);">${loc({ en: 'No risk factors identified', vi: 'Không xác định được yếu tố rủi ro' })}</div>`
            }
          </div>
        </div>
      </div>

      <!-- Improve My Score -->
      ${recs.length > 0 ? `
        <div style="margin-top: var(--space-xl);">
          <h2 style="font-family: var(--font-display); margin-bottom: var(--space-lg);">
            ${loc({ en: 'Improve My Score', vi: 'Cải thiện điểm của tôi' })}
          </h2>
          <div style="display: flex; flex-direction: column; gap: var(--space-md);">
            ${recs.map(r => `
              <div class="lacquer-card" style="border-left: 4px solid var(--accent-gold);">
                <div style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--accent-cinnabar); margin-bottom: var(--space-sm);">
                  ${loc(r.label)}
                </div>
                <div style="font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.6;">
                  ${r.link
                    ? `<a href="${r.link}" style="color: var(--accent-gold); text-decoration: underline; text-underline-offset: 3px;">${loc(r.action)}</a>`
                    : loc(r.action)
                  }
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Actions -->
      <div style="display: flex; gap: var(--space-md); justify-content: center; margin-top: var(--space-xl); flex-wrap: wrap;">
        <button class="btn-cinnabar" id="retention-retake">
          ${loc({ en: 'Retake Assessment', vi: 'Làm lại đánh giá' })}
        </button>
        <a href="#/tools/returnee" class="btn-gold-ghost" style="text-decoration: none;">
          ${loc({ en: 'Start Return Plan', vi: 'Bắt đầu kế hoạch trở về' })}
        </a>
      </div>
    </div>

    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-mission" data-i18n="footer.mission">${t('footer.mission')}</div>
        <div class="footer-links">
          <a href="#/about" data-i18n="footer.fc">${t('footer.fc')}</a>
        </div>
      </div>
      <div class="footer-tagline" data-i18n="footer.tagline">${t('footer.tagline')}</div>
    </footer>
  `;
}

/* =========================================
   Scoped Styles
   ========================================= */

function injectStyles(): HTMLStyleElement {
  const style = document.createElement('style');
  style.id = 'retention-styles';
  style.textContent = `
    .retention-form {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
      max-width: 720px;
      margin: var(--space-xl) auto 0;
    }

    .retention-question {
      padding: var(--space-lg);
    }

    .retention-question-number {
      font-family: var(--font-mono);
      font-size: var(--text-xs);
      color: var(--accent-gold);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: var(--space-sm);
    }

    .retention-options {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      margin-top: var(--space-md);
    }

    .retention-radio-label {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-sm) var(--space-md);
      border: 1px solid var(--border-default);
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: var(--text-sm);
      color: var(--text-secondary);
    }

    .retention-radio-label:hover {
      border-color: var(--accent-gold);
      color: var(--text-primary);
      background: var(--accent-gold-subtle);
    }

    .retention-radio-label:has(input:checked) {
      border-color: var(--accent-gold);
      background: var(--accent-gold-subtle);
      color: var(--text-primary);
    }

    .retention-radio-label input[type="radio"] {
      accent-color: var(--accent-gold);
      margin: 0;
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    /* Bar chart */
    .retention-bar-row {
      display: grid;
      grid-template-columns: 160px 1fr 50px;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-xs) 0;
    }

    .retention-bar-label {
      font-size: var(--text-xs);
      color: var(--text-secondary);
      text-align: right;
      font-family: var(--font-body);
    }

    .retention-bar-track {
      position: relative;
      height: 20px;
      background: var(--bg-elevated);
      border-radius: var(--radius-sm);
      overflow: hidden;
    }

    .retention-bar-center {
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 1px;
      background: var(--text-tertiary);
      opacity: 0.4;
    }

    .retention-bar-fill {
      position: absolute;
      top: 2px;
      bottom: 2px;
      border-radius: 2px;
      transition: width 0.6s ease;
    }

    .retention-bar-positive {
      left: 50%;
    }

    .retention-bar-negative {
      right: 50%;
    }

    .retention-bar-value {
      font-family: var(--font-mono);
      font-size: var(--text-xs);
      text-align: right;
      min-width: 40px;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .retention-bar-row {
        grid-template-columns: 100px 1fr 40px;
      }

      .retention-bar-label {
        font-size: 11px;
      }

      div[style*="grid-template-columns: 1fr 1fr"] {
        grid-template-columns: 1fr !important;
      }
    }

    @media (max-width: 375px) {
      .retention-bar-row {
        grid-template-columns: 80px 1fr 36px;
      }
    }
  `;
  document.head.appendChild(style);
  return style;
}

/* =========================================
   Main Export
   ========================================= */

export async function renderRetention(): Promise<void> {
  const app = document.getElementById('app');
  if (!app) return;

  const styleEl = injectStyles();

  setCleanup(() => {
    styleEl.remove();
  });

  let currentView: 'form' | 'results' = 'form';
  let lastResult: RetentionResult | null = null;
  let lastForm: Record<string, string> = {};

  function render(): void {
    if (!app) return;

    if (currentView === 'form') {
      app.innerHTML = renderFormHTML() + `
        <footer class="footer">
          <div class="footer-inner">
            <div class="footer-mission" data-i18n="footer.mission">${t('footer.mission')}</div>
            <div class="footer-links">
              <a href="#/about" data-i18n="footer.fc">${t('footer.fc')}</a>
            </div>
          </div>
          <div class="footer-tagline" data-i18n="footer.tagline">${t('footer.tagline')}</div>
        </footer>
      `;
      bindFormEvents();
    } else if (currentView === 'results' && lastResult) {
      app.innerHTML = renderResultsHTML(lastResult, lastForm);
      bindResultEvents();
    }
  }

  function bindFormEvents(): void {
    const form = document.getElementById('retention-form') as HTMLFormElement | null;
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const values: Record<string, string> = {};
      let allAnswered = true;

      const fieldNames = ['years', 'church', 'community', 'plan', 'family', 'city', 'discipleship'];
      for (const name of fieldNames) {
        const val = formData.get(name) as string | null;
        if (!val) {
          allAnswered = false;
          // Scroll to first unanswered question
          const questions = form.querySelectorAll('.retention-question');
          for (let i = 0; i < fieldNames.length; i++) {
            if (!formData.get(fieldNames[i])) {
              questions[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              // Flash the unanswered question
              questions[i]?.classList.add('retention-shake');
              setTimeout(() => questions[i]?.classList.remove('retention-shake'), 600);
              break;
            }
          }
          return;
        }
        values[name] = val;
      }

      if (!allAnswered) return;

      lastForm = values;
      lastResult = calculateRetention(values);
      currentView = 'results';
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function bindResultEvents(): void {
    document.getElementById('retention-retake')?.addEventListener('click', () => {
      currentView = 'form';
      lastResult = null;
      lastForm = {};
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Language change: re-render in place
  const langHandler = () => render();
  window.addEventListener('langchange', langHandler);

  const originalCleanup = styleEl.remove.bind(styleEl);
  setCleanup(() => {
    originalCleanup();
    window.removeEventListener('langchange', langHandler);
    const injected = document.getElementById('retention-styles');
    if (injected) injected.remove();
  });

  // Initial render
  render();
}
