import { getLang } from '../i18n';
import { setCleanup } from '../main';
import { renderFooter } from '../shared/footer';

/* =========================================
   Types
   ========================================= */

interface Church {
  id: string;
  name: { en: string; vi: string };
  city: string;
  cityName: { en: string; vi: string };
  denomination: string;
  registered: boolean;
  languages: string[];
  returneeWelcome: boolean;
  contact: string;
  notes: { en: string; vi: string };
}

interface FormState {
  name: string;
  city: string;
  denomination: string;
  languagePref: string;
  registrationComfort: string;
  familyBackground: string;
  concerns: string[];
  completed: boolean;
}

/* =========================================
   Constants
   ========================================= */

const STORAGE_KEY = 'truyendao-returnee';

const CITIES = [
  { value: 'ho-chi-minh', label: { en: 'Ho Chi Minh City', vi: 'Thành phố Hồ Chí Minh' } },
  { value: 'hanoi', label: { en: 'Hanoi', vi: 'Hà Nội' } },
  { value: 'da-nang', label: { en: 'Đà Nẵng', vi: 'Đà Nẵng' } },
  { value: 'hue', label: { en: 'Huế', vi: 'Huế' } },
  { value: 'nha-trang', label: { en: 'Nha Trang', vi: 'Nha Trang' } },
  { value: 'da-lat', label: { en: 'Đà Lạt', vi: 'Đà Lạt' } },
  { value: 'can-tho', label: { en: 'Cần Thơ', vi: 'Cần Thơ' } },
  { value: 'other', label: { en: 'Other', vi: 'Khác' } },
];

const DENOMINATIONS = [
  { value: 'catholic', label: { en: 'Catholic', vi: 'Công giáo' } },
  { value: 'protestant', label: { en: 'Protestant', vi: 'Tin Lành' } },
  { value: 'evangelical', label: { en: 'Evangelical', vi: 'Phúc Âm' } },
  { value: 'no-preference', label: { en: 'No preference', vi: 'Không có ưu tiên' } },
];

const LANGUAGE_PREFS = [
  { value: 'vi-only', label: { en: 'Vietnamese only', vi: 'Chỉ tiếng Việt' } },
  { value: 'bilingual', label: { en: 'Bilingual EN/VI', vi: 'Song ngữ Anh/Việt' } },
  { value: 'en-primary', label: { en: 'English primarily', vi: 'Chủ yếu tiếng Anh' } },
];

const REGISTRATION_COMFORT = [
  { value: 'registered-only', label: { en: 'Registered only', vi: 'Chỉ đã đăng ký' } },
  { value: 'open-to-both', label: { en: 'Open to both', vi: 'Cả hai đều được' } },
  { value: 'house-church', label: { en: 'House church preferred', vi: 'Ưu tiên nhà thờ tại gia' } },
];

const FAMILY_BACKGROUNDS = [
  { value: 'christian', label: { en: 'Christian family', vi: 'Gia đình Kitô giáo' } },
  { value: 'non-christian', label: { en: 'Non-Christian family', vi: 'Gia đình không theo đạo' } },
  { value: 'mixed', label: { en: 'Mixed', vi: 'Hỗn hợp' } },
];

const CONCERNS = [
  { value: 'finding-church', label: { en: 'Finding a church', vi: 'Tìm nhà thờ' } },
  { value: 'family-pressure', label: { en: 'Family pressure about faith', vi: 'Áp lực gia đình về đức tin' } },
  { value: 'ancestor-worship', label: { en: 'Ancestor worship questions', vi: 'Câu hỏi về thờ cúng tổ tiên' } },
  { value: 'workplace-identity', label: { en: 'Workplace identity', vi: 'Bản sắc đức tin nơi làm việc' } },
  { value: 'loneliness', label: { en: 'Loneliness', vi: 'Sự cô đơn' } },
  { value: 'losing-faith', label: { en: 'Losing faith', vi: 'Mất đức tin' } },
];

/* =========================================
   Helpers
   ========================================= */

type BiStr = { en: string; vi: string };

function loc(obj: BiStr): string {
  const lang = getLang();
  return obj[lang] || obj.en;
}

function loadState(): FormState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore parse errors */ }
  return {
    name: '',
    city: '',
    denomination: '',
    languagePref: '',
    registrationComfort: '',
    familyBackground: '',
    concerns: [],
    completed: false,
  };
}

function saveState(state: FormState): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/* =========================================
   Stage 1: Landing + Stats
   ========================================= */

function renderStage1(): string {
  return `
    <div class="returnee-landing">
      <div class="section-eyebrow">${loc({ en: 'Returnee Tool', vi: 'Công cụ cho người trở về' })}</div>
      <h1>${loc({ en: 'Returnee Preparation Tool', vi: 'Công cụ chuẩn bị cho người trở về' })}</h1>
      <p class="section-subtitle">${loc({
        en: 'Helping Vietnamese international students prepare to return home and find church community in Vietnam. Answer a few questions and receive a personalized 90-day re-entry plan with church recommendations.',
        vi: 'Giúp du học sinh Việt Nam chuẩn bị trở về nước và tìm cộng đồng nhà thờ tại Việt Nam. Trả lời vài câu hỏi để nhận kế hoạch tái hòa nhập 90 ngày cá nhân hóa cùng gợi ý nhà thờ.'
      })}</p>
      <div class="gold-divider"></div>

      <div class="returnee-stats-grid">
        <div class="lacquer-card" style="text-align: center; border-top: 3px solid var(--accent-cinnabar);">
          <div style="font-family: var(--font-mono); font-size: var(--text-2xl); color: var(--accent-cinnabar); font-weight: 700;">~200,000</div>
          <div style="font-size: var(--text-sm); color: var(--text-secondary); margin-top: var(--space-sm);">
            ${loc({ en: 'Vietnamese students abroad', vi: 'Du học sinh Việt Nam ở nước ngoài' })}
          </div>
        </div>
        <div class="lacquer-card" style="text-align: center; border-top: 3px solid var(--accent-gold);">
          <div style="font-family: var(--font-mono); font-size: var(--text-2xl); color: var(--accent-gold); font-weight: 700;">60-80%</div>
          <div style="font-size: var(--text-sm); color: var(--text-secondary); margin-top: var(--space-sm);">
            ${loc({ en: 'Faith attrition rate among returnees', vi: 'Tỷ lệ mất đức tin ở người trở về' })}
          </div>
        </div>
        <div class="lacquer-card" style="text-align: center; border-top: 3px solid var(--accent-cinnabar);">
          <div style="font-family: var(--font-mono); font-size: var(--text-2xl); color: var(--accent-cinnabar); font-weight: 700;">
            ${loc({ en: 'Complex', vi: 'Phức tạp' })}
          </div>
          <div style="font-size: var(--text-sm); color: var(--text-secondary); margin-top: var(--space-sm);">
            ${loc({ en: 'Registered vs. house church navigation', vi: 'Lựa chọn giữa nhà thờ đăng ký và nhà thờ tại gia' })}
          </div>
        </div>
      </div>

      <div style="text-align: center; margin-top: var(--space-xl);">
        <button class="btn-cinnabar" id="returnee-start-btn">
          ${loc({ en: 'Start My Plan', vi: 'Bắt đầu kế hoạch' })}
        </button>
      </div>
    </div>
  `;
}

/* =========================================
   Stage 2: Multi-step Questionnaire
   ========================================= */

function renderFormStep(step: number, state: FormState): string {
  const totalSteps = 7;
  const progress = Math.round((step / totalSteps) * 100);

  const stepLabel = loc({ en: `Step ${step} of ${totalSteps}`, vi: `Bước ${step} / ${totalSteps}` });

  let stepContent = '';

  switch (step) {
    case 1:
      stepContent = `
        <label class="returnee-label">${loc({ en: 'Your name (optional)', vi: 'Tên của bạn (không bắt buộc)' })}</label>
        <input type="text" class="returnee-input" id="returnee-name" value="${escapeAttr(state.name)}"
               placeholder="${loc({ en: 'Enter your name...', vi: 'Nhập tên...' })}"
               aria-label="${loc({ en: 'Your name', vi: 'Tên của bạn' })}" />
      `;
      break;

    case 2:
      stepContent = `
        <label class="returnee-label">${loc({ en: 'City you are returning to', vi: 'Thành phố bạn sẽ trở về' })}</label>
        <select class="returnee-input" id="returnee-city" aria-label="${loc({ en: 'City you are returning to', vi: 'Thành phố bạn sẽ trở về' })}">
          <option value="">${loc({ en: 'Select a city...', vi: 'Chọn thành phố...' })}</option>
          ${CITIES.map(c => `<option value="${c.value}" ${state.city === c.value ? 'selected' : ''}>${loc(c.label)}</option>`).join('')}
        </select>
      `;
      break;

    case 3:
      stepContent = `
        <label class="returnee-label">${loc({ en: 'Denomination preference', vi: 'Giáo phái ưu tiên' })}</label>
        <div class="returnee-radio-group">
          ${DENOMINATIONS.map(d => `
            <label class="returnee-radio-option">
              <input type="radio" name="denomination" value="${d.value}" ${state.denomination === d.value ? 'checked' : ''} />
              <span>${loc(d.label)}</span>
            </label>
          `).join('')}
        </div>
      `;
      break;

    case 4:
      stepContent = `
        <label class="returnee-label">${loc({ en: 'Language preference for worship', vi: 'Ngôn ngữ thờ phượng ưu tiên' })}</label>
        <div class="returnee-radio-group">
          ${LANGUAGE_PREFS.map(l => `
            <label class="returnee-radio-option">
              <input type="radio" name="languagePref" value="${l.value}" ${state.languagePref === l.value ? 'checked' : ''} />
              <span>${loc(l.label)}</span>
            </label>
          `).join('')}
        </div>
      `;
      break;

    case 5:
      stepContent = `
        <label class="returnee-label">${loc({ en: 'Comfort with church registration status', vi: 'Mức độ thoải mái với tình trạng đăng ký nhà thờ' })}</label>
        <p style="font-size: var(--text-sm); color: var(--text-tertiary); margin-bottom: var(--space-md);">
          ${loc({
            en: 'In Vietnam, churches can be government-registered or unregistered house churches. Both are legitimate expressions of faith.',
            vi: 'Tại Việt Nam, nhà thờ có thể được chính quyền cấp đăng ký hoặc là nhà thờ tại gia chưa đăng ký. Cả hai đều là hình thức đức tin chính đáng.'
          })}
        </p>
        <div class="returnee-radio-group">
          ${REGISTRATION_COMFORT.map(r => `
            <label class="returnee-radio-option">
              <input type="radio" name="registrationComfort" value="${r.value}" ${state.registrationComfort === r.value ? 'checked' : ''} />
              <span>${loc(r.label)}</span>
            </label>
          `).join('')}
        </div>
      `;
      break;

    case 6:
      stepContent = `
        <label class="returnee-label">${loc({ en: 'Family religious background', vi: 'Nền tảng tôn giáo gia đình' })}</label>
        <div class="returnee-radio-group">
          ${FAMILY_BACKGROUNDS.map(f => `
            <label class="returnee-radio-option">
              <input type="radio" name="familyBackground" value="${f.value}" ${state.familyBackground === f.value ? 'checked' : ''} />
              <span>${loc(f.label)}</span>
            </label>
          `).join('')}
        </div>
      `;
      break;

    case 7:
      stepContent = `
        <label class="returnee-label">${loc({ en: 'Your specific concerns (select all that apply)', vi: 'Mối quan tâm cụ thể (chọn tất cả phù hợp)' })}</label>
        <div class="returnee-checkbox-group">
          ${CONCERNS.map(c => `
            <label class="returnee-checkbox-option">
              <input type="checkbox" name="concerns" value="${c.value}" ${state.concerns.includes(c.value) ? 'checked' : ''} />
              <span>${loc(c.label)}</span>
            </label>
          `).join('')}
        </div>
      `;
      break;
  }

  return `
    <div class="returnee-form-container">
      <div class="returnee-progress-bar">
        <div class="returnee-progress-fill" style="width: ${progress}%;"></div>
      </div>
      <div class="returnee-step-label">${stepLabel}</div>
      <div class="returnee-step-content">
        ${stepContent}
      </div>
      <div class="returnee-form-nav">
        ${step > 1 ? `<button class="btn-gold-ghost" id="returnee-prev-btn">${loc({ en: 'Back', vi: 'Quay lại' })}</button>` : '<div></div>'}
        ${step < totalSteps
          ? `<button class="btn-cinnabar" id="returnee-next-btn">${loc({ en: 'Next', vi: 'Tiếp theo' })}</button>`
          : `<button class="btn-cinnabar" id="returnee-submit-btn">${loc({ en: 'Get My Plan', vi: 'Nhận kế hoạch' })}</button>`
        }
      </div>
    </div>
  `;
}

/* =========================================
   Stage 3: Results
   ========================================= */

function filterChurches(churches: Church[], state: FormState): Church[] {
  let filtered = churches.filter(c => c.returneeWelcome);

  // Filter by city
  if (state.city && state.city !== 'other') {
    filtered = filtered.filter(c => c.city === state.city);
  }

  // Filter by denomination
  if (state.denomination && state.denomination !== 'no-preference') {
    // Include house-church denomination regardless of preference
    filtered = filtered.filter(c =>
      c.denomination === state.denomination ||
      c.denomination === 'house-church'
    );
  }

  // Filter by language preference
  if (state.languagePref === 'bilingual' || state.languagePref === 'en-primary') {
    // Prefer bilingual, but don't exclude Vietnamese-only if few matches
    const bilingualMatches = filtered.filter(c => c.languages.includes('en'));
    if (bilingualMatches.length > 0) {
      filtered = bilingualMatches;
    }
  }

  // Filter by registration comfort
  if (state.registrationComfort === 'registered-only') {
    filtered = filtered.filter(c => c.registered);
  } else if (state.registrationComfort === 'house-church') {
    // Prefer house churches, but include registered too
    const houseChurches = filtered.filter(c => !c.registered);
    if (houseChurches.length > 0) {
      // Show house churches first, then registered
      filtered = [...houseChurches, ...filtered.filter(c => c.registered)];
    }
  }

  return filtered;
}

function renderReEntryPlan(state: FormState): string {
  const name = state.name ? state.name : loc({ en: 'friend', vi: 'bạn' });

  return `
    <div class="returnee-plan-section">
      <h2>${loc({ en: '90-Day Re-Entry Plan', vi: 'Kế hoạch tái hòa nhập 90 ngày' })}</h2>
      <p style="color: var(--text-secondary); margin-bottom: var(--space-lg);">
        ${loc({
          en: `${name}, here is your personalized plan for returning to Vietnam and staying connected to faith.`,
          vi: `${name}, đây là kế hoạch cá nhân hóa giúp bạn trở về Việt Nam và duy trì kết nối đức tin.`
        })}
      </p>

      <div class="returnee-plan-phases">
        <!-- Phase 1: Before Departure -->
        <div class="lacquer-card" style="border-left: 4px solid var(--accent-gold);">
          <div style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--accent-gold); margin-bottom: var(--space-sm);">
            ${loc({ en: 'PHASE 1 — DAYS -30 TO 0', vi: 'GIAI ĐOẠN 1 — NGÀY -30 ĐẾN 0' })}
          </div>
          <div class="card-title" style="margin-bottom: var(--space-md);">
            ${loc({ en: 'Before Departure', vi: 'Trước khi về nước' })}
          </div>
          <ul class="returnee-checklist">
            <li>${loc({
              en: 'Connect with a returnee network or VCF chapter before you leave',
              vi: 'Kết nối với mạng lưới du học sinh về nước hoặc chi hội VCF trước khi về'
            })}</li>
            <li>${loc({
              en: 'Download Bible apps and devotional resources in Vietnamese',
              vi: 'Tải ứng dụng Kinh Thánh và tài liệu suy niệm bằng tiếng Việt'
            })}</li>
            <li>${loc({
              en: 'Save contact information for 2-3 churches in your destination city',
              vi: 'Lưu thông tin liên hệ của 2-3 nhà thờ tại thành phố bạn sẽ về'
            })}</li>
            <li>${loc({
              en: 'Ask your current pastor or fellowship for an introduction to contacts in Vietnam',
              vi: 'Nhờ mục sư hoặc nhóm thông công hiện tại giới thiệu liên hệ tại Việt Nam'
            })}</li>
            <li>${loc({
              en: 'Set up accountability partnership with a friend who understands your faith journey',
              vi: 'Thiết lập mối quan hệ trách nhiệm với bạn bè hiểu hành trình đức tin của bạn'
            })}</li>
          </ul>
        </div>

        <!-- Phase 2: First Month -->
        <div class="lacquer-card" style="border-left: 4px solid var(--accent-cinnabar);">
          <div style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--accent-cinnabar); margin-bottom: var(--space-sm);">
            ${loc({ en: 'PHASE 2 — DAYS 1 TO 30', vi: 'GIAI ĐOẠN 2 — NGÀY 1 ĐẾN 30' })}
          </div>
          <div class="card-title" style="margin-bottom: var(--space-md);">
            ${loc({ en: 'First Month Home', vi: 'Tháng đầu tiên về nhà' })}
          </div>
          <ul class="returnee-checklist">
            <li>${loc({
              en: 'Visit 2-3 churches from your saved list within the first two weeks',
              vi: 'Thăm 2-3 nhà thờ từ danh sách đã lưu trong hai tuần đầu'
            })}</li>
            <li>${loc({
              en: 'Establish a weekly worship rhythm, even if you haven\'t found your church yet',
              vi: 'Thiết lập nhịp thờ phượng hàng tuần, ngay cả khi chưa tìm được nhà thờ phù hợp'
            })}</li>
            <li>${loc({
              en: 'Connect with at least one small group or fellowship meeting',
              vi: 'Kết nối với ít nhất một nhóm nhỏ hoặc buổi thông công'
            })}</li>
            <li>${loc({
              en: 'Keep a journal about your re-entry experience and spiritual state',
              vi: 'Viết nhật ký về trải nghiệm tái hòa nhập và tình trạng tâm linh'
            })}</li>
            <li>${loc({
              en: 'Reach out to your accountability partner weekly',
              vi: 'Liên lạc với người đồng hành trách nhiệm hàng tuần'
            })}</li>
          </ul>
        </div>

        <!-- Phase 3: Months 2-3 -->
        <div class="lacquer-card" style="border-left: 4px solid var(--accent-gold);">
          <div style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--accent-gold); margin-bottom: var(--space-sm);">
            ${loc({ en: 'PHASE 3 — DAYS 31 TO 90', vi: 'GIAI ĐOẠN 3 — NGÀY 31 ĐẾN 90' })}
          </div>
          <div class="card-title" style="margin-bottom: var(--space-md);">
            ${loc({ en: 'Settling In', vi: 'Ổn định' })}
          </div>
          <ul class="returnee-checklist">
            <li>${loc({
              en: 'Settle into one church community and commit to regular attendance',
              vi: 'Ổn định tại một cộng đồng nhà thờ và cam kết tham dự thường xuyên'
            })}</li>
            <li>${loc({
              en: 'Find a local accountability partner or mentor within your church',
              vi: 'Tìm người đồng hành trách nhiệm hoặc cố vấn tại nhà thờ'
            })}</li>
            <li>${loc({
              en: 'Address family dynamics around faith — have honest, gentle conversations',
              vi: 'Giải quyết vấn đề gia đình liên quan đến đức tin — trò chuyện thành thật, nhẹ nhàng'
            })}</li>
            <li>${loc({
              en: 'Look for ways to serve in your new community',
              vi: 'Tìm cách phục vụ trong cộng đồng mới'
            })}</li>
            <li>${loc({
              en: 'Evaluate: do you feel spiritually nourished? If not, revisit your church options',
              vi: 'Đánh giá: bạn có cảm thấy được nuôi dưỡng tâm linh không? Nếu không, xem lại các lựa chọn nhà thờ'
            })}</li>
          </ul>
        </div>
      </div>
    </div>
  `;
}

function renderChurchCard(church: Church): string {
  const lang = getLang();
  const name = church.name[lang] || church.name.en;
  const cityName = church.cityName[lang] || church.cityName.en;
  const notes = church.notes[lang] || church.notes.en;

  const denomLabel: Record<string, BiStr> = {
    'catholic': { en: 'Catholic', vi: 'Công giáo' },
    'protestant': { en: 'Protestant', vi: 'Tin Lành' },
    'evangelical': { en: 'Evangelical', vi: 'Phúc Âm' },
    'house-church': { en: 'House Church', vi: 'Nhà thờ tại gia' },
  };

  const denomText = denomLabel[church.denomination] ? loc(denomLabel[church.denomination]) : church.denomination;

  const regBadge = church.registered
    ? `<span class="returnee-badge returnee-badge--registered">${loc({ en: 'Registered', vi: 'Đã đăng ký' })}</span>`
    : `<span class="returnee-badge returnee-badge--unregistered">${loc({ en: 'Unregistered', vi: 'Chưa đăng ký' })}</span>`;

  const langIcons = church.languages.map(l => l === 'en' ? 'EN' : 'VI').join(' / ');

  const discretionNote = !church.registered ? `
    <div class="returnee-discretion-note">
      ${loc({
        en: 'Please exercise discretion when inquiring about this fellowship. Contact information is shared through trusted connections for safety.',
        vi: 'Xin hãy thận trọng khi hỏi thăm về nhóm thông công này. Thông tin liên hệ được chia sẻ qua các mối quan hệ đáng tin cậy vì lý do an toàn.'
      })}
    </div>
  ` : '';

  return `
    <div class="lacquer-card returnee-church-card">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: var(--space-md); flex-wrap: wrap;">
        <div>
          <div class="card-title">${name}</div>
          <div style="font-size: var(--text-sm); color: var(--text-tertiary); margin-top: var(--space-xs);">${cityName}</div>
        </div>
        <div style="display: flex; gap: var(--space-sm); flex-wrap: wrap;">
          ${regBadge}
        </div>
      </div>
      <div style="display: flex; gap: var(--space-md); margin-top: var(--space-md); flex-wrap: wrap;">
        <span style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-secondary);">${denomText}</span>
        <span style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-secondary);">${langIcons}</span>
      </div>
      <p style="font-size: var(--text-sm); color: var(--text-secondary); margin-top: var(--space-md); line-height: 1.6;">${notes}</p>
      <div style="font-size: var(--text-xs); color: var(--text-tertiary); margin-top: var(--space-sm);">
        ${loc({ en: 'Contact:', vi: 'Liên hệ:' })} ${church.contact}
      </div>
      ${discretionNote}
    </div>
  `;
}

function renderChurchRecommendations(churches: Church[], state: FormState): string {
  const matched = filterChurches(churches, state);

  if (state.city === 'other' || matched.length === 0) {
    return `
      <div class="returnee-plan-section">
        <h2>${loc({ en: 'Church Recommendations', vi: 'Gợi ý nhà thờ' })}</h2>
        <div class="lacquer-card" style="text-align: center; padding: var(--space-xl);">
          <p style="color: var(--text-secondary);">
            ${state.city === 'other'
              ? loc({
                  en: 'We don\'t have church data for your city yet. Use the Connect Me form below, and we will try to find contacts for you.',
                  vi: 'Chúng tôi chưa có dữ liệu nhà thờ cho thành phố của bạn. Sử dụng biểu mẫu Kết Nối bên dưới, chúng tôi sẽ cố gắng tìm liên hệ cho bạn.'
                })
              : loc({
                  en: 'No exact matches found. Try broadening your preferences. Use the Connect Me form below for personal help.',
                  vi: 'Không tìm thấy kết quả phù hợp. Thử mở rộng điều kiện. Sử dụng biểu mẫu Kết Nối bên dưới để được hỗ trợ cá nhân.'
                })
            }
          </p>
        </div>
      </div>
    `;
  }

  return `
    <div class="returnee-plan-section">
      <h2>${loc({ en: 'Church Recommendations', vi: 'Gợi ý nhà thờ' })}</h2>
      <p style="color: var(--text-secondary); margin-bottom: var(--space-lg);">
        ${loc({
          en: `Found ${matched.length} church${matched.length > 1 ? 'es' : ''} matching your preferences.`,
          vi: `Tìm thấy ${matched.length} nhà thờ phù hợp với lựa chọn của bạn.`
        })}
      </p>
      <div class="returnee-church-grid">
        ${matched.map(c => renderChurchCard(c)).join('')}
      </div>
    </div>
  `;
}

function renderCulturalTips(state: FormState): string {
  const tips: string[] = [];

  if (state.concerns.includes('ancestor-worship')) {
    tips.push(`
      <div class="lacquer-card" style="border-left: 4px solid var(--accent-gold);">
        <div class="card-title" style="margin-bottom: var(--space-md);">
          ${loc({ en: 'Navigating Ancestor Worship', vi: 'Ứng xử với thờ cúng tổ tiên' })}
        </div>
        <ul class="returnee-tips-list">
          <li>${loc({
            en: 'Distinguish between honoring ancestors (respectful remembrance) and worship (spiritual devotion). Many Vietnamese Christians find ways to honor family heritage without compromising faith.',
            vi: 'Phân biệt giữa kính nhớ tổ tiên (tưởng nhớ tôn trọng) và thờ phượng (sùng kính tâm linh). Nhiều Kitô hữu Việt Nam tìm cách tôn vinh di sản gia đình mà không ảnh hưởng đức tin.'
          })}</li>
          <li>${loc({
            en: 'During Tết and death anniversaries, you can participate in family gatherings, share meals, and show respect without performing rituals you\'re uncomfortable with.',
            vi: 'Trong dịp Tết và giỗ, bạn có thể tham gia đoàn tụ gia đình, chia sẻ bữa ăn, và bày tỏ sự tôn trọng mà không cần thực hiện nghi thức bạn không thoải mái.'
          })}</li>
          <li>${loc({
            en: 'Prepare a gentle explanation: "I want to honor our family. My faith teaches me to do it through prayer and loving action rather than incense."',
            vi: 'Chuẩn bị giải thích nhẹ nhàng: "Con muốn tôn kính gia đình. Đức tin dạy con thể hiện qua cầu nguyện và hành động yêu thương thay vì thắp hương."'
          })}</li>
          <li>${loc({
            en: 'Ask your pastor about contextualized practices — some churches in Vietnam have thoughtful approaches to this very common question.',
            vi: 'Hỏi mục sư về các thực hành bối cảnh hóa — một số nhà thờ tại Việt Nam có cách tiếp cận chu đáo cho câu hỏi rất phổ biến này.'
          })}</li>
        </ul>
      </div>
    `);
  }

  if (state.concerns.includes('family-pressure')) {
    tips.push(`
      <div class="lacquer-card" style="border-left: 4px solid var(--accent-cinnabar);">
        <div class="card-title" style="margin-bottom: var(--space-md);">
          ${loc({ en: 'Handling Family Pressure', vi: 'Đối mặt áp lực gia đình' })}
        </div>
        <ul class="returnee-tips-list">
          <li>${loc({
            en: 'Lead with love, not arguments. Your family sees your faith through how you treat them, not what you debate.',
            vi: 'Dẫn dắt bằng tình yêu, không phải tranh luận. Gia đình nhìn đức tin của bạn qua cách bạn đối xử với họ, không phải qua những gì bạn tranh cãi.'
          })}</li>
          <li>${loc({
            en: 'Script: "I understand this is different from our family tradition. I\'m not rejecting our family — my faith actually teaches me to love and honor you more."',
            vi: '"Con hiểu điều này khác với truyền thống gia đình. Con không từ chối gia đình — đức tin dạy con yêu thương và kính trọng gia đình hơn."'
          })}</li>
          <li>${loc({
            en: 'Be patient. Conversion took years for many Vietnamese families. Show consistency over time.',
            vi: 'Hãy kiên nhẫn. Nhiều gia đình Việt Nam cần nhiều năm mới chấp nhận. Hãy thể hiện sự nhất quán theo thời gian.'
          })}</li>
          <li>${loc({
            en: 'Find other Vietnamese Christians with similar family situations — you are not alone in this.',
            vi: 'Tìm các Kitô hữu Việt Nam có hoàn cảnh gia đình tương tự — bạn không đơn độc.'
          })}</li>
        </ul>
      </div>
    `);
  }

  if (state.concerns.includes('workplace-identity')) {
    tips.push(`
      <div class="lacquer-card" style="border-left: 4px solid var(--accent-gold);">
        <div class="card-title" style="margin-bottom: var(--space-md);">
          ${loc({ en: 'Faith in the Vietnamese Workplace', vi: 'Đức tin nơi làm việc tại Việt Nam' })}
        </div>
        <ul class="returnee-tips-list">
          <li>${loc({
            en: 'Vietnam\'s constitution guarantees freedom of religion, but workplace culture can be different from legal rights. Be wise about when and how you share.',
            vi: 'Hiến pháp Việt Nam bảo đảm tự do tôn giáo, nhưng văn hóa nơi làm việc có thể khác với quyền pháp lý. Hãy khôn ngoan khi chia sẻ.'
          })}</li>
          <li>${loc({
            en: 'Let your work ethic and character speak first. Excellence and integrity are powerful witnesses.',
            vi: 'Hãy để đạo đức và phẩm cách làm việc nói trước. Sự xuất sắc và chính trực là chứng nhân mạnh mẽ.'
          })}</li>
          <li>${loc({
            en: 'In state-owned enterprises, be more cautious. In private sector and foreign companies, there is generally more openness.',
            vi: 'Ở doanh nghiệp nhà nước, hãy thận trọng hơn. Trong khu vực tư nhân và công ty nước ngoài, thường cởi mở hơn.'
          })}</li>
          <li>${loc({
            en: 'Build genuine friendships at work — people are more open to faith through relationship than through declaration.',
            vi: 'Xây dựng tình bạn chân thành tại nơi làm việc — mọi người cởi mở hơn với đức tin qua mối quan hệ hơn là qua tuyên bố.'
          })}</li>
        </ul>
      </div>
    `);
  }

  if (state.concerns.includes('loneliness')) {
    tips.push(`
      <div class="lacquer-card" style="border-left: 4px solid var(--accent-cinnabar);">
        <div class="card-title" style="margin-bottom: var(--space-md);">
          ${loc({ en: 'Combating Loneliness', vi: 'Đối mặt sự cô đơn' })}
        </div>
        <ul class="returnee-tips-list">
          <li>${loc({
            en: 'Reverse culture shock is real. The country you return to is not the one you left. Give yourself grace during adjustment.',
            vi: 'Sốc văn hóa ngược là có thật. Đất nước bạn trở về không phải đất nước bạn đã rời đi. Hãy nhẹ nhàng với bản thân trong quá trình thích nghi.'
          })}</li>
          <li>${loc({
            en: 'Prioritize finding one deep friendship over many shallow connections. One faithful friend makes the difference.',
            vi: 'Ưu tiên tìm một tình bạn sâu sắc hơn nhiều mối quan hệ hời hợt. Một người bạn trung thành tạo nên sự khác biệt.'
          })}</li>
          <li>${loc({
            en: 'Join a small group immediately — don\'t wait until you feel settled. Community is how you get settled.',
            vi: 'Tham gia nhóm nhỏ ngay — đừng đợi đến khi cảm thấy ổn định. Cộng đồng là cách bạn ổn định.'
          })}</li>
          <li>${loc({
            en: 'Stay connected to your abroad fellowship via video calls during the transition period.',
            vi: 'Duy trì kết nối với nhóm thông công ở nước ngoài qua video call trong thời gian chuyển tiếp.'
          })}</li>
        </ul>
      </div>
    `);
  }

  if (state.concerns.includes('losing-faith')) {
    tips.push(`
      <div class="lacquer-card" style="border-left: 4px solid var(--accent-gold);">
        <div class="card-title" style="margin-bottom: var(--space-md);">
          ${loc({ en: 'Guarding Your Faith', vi: 'Bảo vệ đức tin' })}
        </div>
        <ul class="returnee-tips-list">
          <li>${loc({
            en: 'The 60-80% attrition rate is real, but you are already ahead by preparing. Awareness is the first defense.',
            vi: 'Tỷ lệ mất đức tin 60-80% là có thật, nhưng bạn đã đi trước bằng việc chuẩn bị. Nhận thức là phòng thủ đầu tiên.'
          })}</li>
          <li>${loc({
            en: 'Establish non-negotiable rhythms: daily Scripture, weekly worship, monthly deep conversation with a fellow believer.',
            vi: 'Thiết lập nhịp không thể thay đổi: Kinh Thánh hàng ngày, thờ phượng hàng tuần, trò chuyện sâu hàng tháng với anh chị em cùng tin.'
          })}</li>
          <li>${loc({
            en: 'Your faith may look different in Vietnam than it did abroad — and that\'s okay. Contextualization is not compromise.',
            vi: 'Đức tin của bạn có thể trông khác ở Việt Nam so với ở nước ngoài — và điều đó không sao. Bối cảnh hóa không phải thỏa hiệp.'
          })}</li>
          <li>${loc({
            en: 'When doubt comes (and it will), remember: doubt is not the opposite of faith. Unanswered questions are part of a mature faith.',
            vi: 'Khi nghi ngờ đến (và nó sẽ đến), hãy nhớ: nghi ngờ không phải đối lập với đức tin. Những câu hỏi chưa có lời đáp là phần của đức tin trưởng thành.'
          })}</li>
        </ul>
      </div>
    `);
  }

  if (state.concerns.includes('finding-church')) {
    tips.push(`
      <div class="lacquer-card" style="border-left: 4px solid var(--accent-cinnabar);">
        <div class="card-title" style="margin-bottom: var(--space-md);">
          ${loc({ en: 'Finding the Right Church', vi: 'Tìm nhà thờ phù hợp' })}
        </div>
        <ul class="returnee-tips-list">
          <li>${loc({
            en: 'Visit at least 3 churches before deciding. First impressions don\'t always reflect the community\'s depth.',
            vi: 'Thăm ít nhất 3 nhà thờ trước khi quyết định. Ấn tượng ban đầu không luôn phản ánh chiều sâu cộng đồng.'
          })}</li>
          <li>${loc({
            en: 'Look for: solid teaching, welcoming community, opportunities to serve, and people your age you can connect with.',
            vi: 'Tìm kiếm: giảng dạy vững vàng, cộng đồng chào đón, cơ hội phục vụ, và những người cùng tuổi có thể kết nối.'
          })}</li>
          <li>${loc({
            en: 'Don\'t expect your Vietnam church to feel like your abroad fellowship. Different is not worse — it\'s contextualized.',
            vi: 'Đừng kỳ vọng nhà thờ Việt Nam giống nhóm thông công ở nước ngoài. Khác biệt không phải kém hơn — đó là bối cảnh hóa.'
          })}</li>
          <li>${loc({
            en: 'Ask other returnees for recommendations — they understand what you need.',
            vi: 'Hỏi các du học sinh khác đã về nước để được gợi ý — họ hiểu bạn cần gì.'
          })}</li>
        </ul>
      </div>
    `);
  }

  if (tips.length === 0) return '';

  return `
    <div class="returnee-plan-section">
      <h2>${loc({ en: 'Cultural Re-Entry Tips', vi: 'Mẹo tái hòa nhập văn hóa' })}</h2>
      <p style="color: var(--text-secondary); margin-bottom: var(--space-lg);">
        ${loc({
          en: 'Based on the concerns you selected, here is tailored guidance for your return.',
          vi: 'Dựa trên các mối quan tâm bạn đã chọn, đây là hướng dẫn phù hợp cho hành trình trở về.'
        })}
      </p>
      <div class="returnee-tips-grid">
        ${tips.join('')}
      </div>
    </div>
  `;
}

function renderConnectForm(): string {
  return `
    <div class="returnee-plan-section">
      <h2>${loc({ en: 'Connect Me', vi: 'Kết nối với tôi' })}</h2>
      <p style="color: var(--text-secondary); margin-bottom: var(--space-lg);">
        ${loc({
          en: 'Leave your information and we will connect you with a partner pastor or returnee mentor in your city.',
          vi: 'Để lại thông tin và chúng tôi sẽ kết nối bạn với mục sư đối tác hoặc người cố vấn du học sinh tại thành phố của bạn.'
        })}
      </p>
      <div class="lacquer-card" style="max-width: 560px;">
        <div id="connect-form-content">
          <div class="returnee-form-field">
            <label class="returnee-label">${loc({ en: 'Name', vi: 'Tên' })}</label>
            <input type="text" class="returnee-input" id="connect-name"
                   placeholder="${loc({ en: 'Your name', vi: 'Tên của bạn' })}"
                   aria-label="${loc({ en: 'Name', vi: 'Tên' })}" />
          </div>
          <div class="returnee-form-field">
            <label class="returnee-label">${loc({ en: 'Email', vi: 'Email' })}</label>
            <input type="email" class="returnee-input" id="connect-email"
                   placeholder="${loc({ en: 'your.email@example.com', vi: 'email@example.com' })}"
                   aria-label="${loc({ en: 'Email', vi: 'Email' })}" />
          </div>
          <div class="returnee-form-field">
            <label class="returnee-label">${loc({ en: 'City in Vietnam', vi: 'Thành phố tại Việt Nam' })}</label>
            <input type="text" class="returnee-input" id="connect-city"
                   placeholder="${loc({ en: 'Which city are you returning to?', vi: 'Bạn sẽ về thành phố nào?' })}"
                   aria-label="${loc({ en: 'City in Vietnam', vi: 'Thành phố tại Việt Nam' })}" />
          </div>
          <div class="returnee-form-field">
            <label class="returnee-checkbox-option" style="cursor: pointer;">
              <input type="checkbox" id="connect-consent" aria-label="${loc({ en: 'Consent to share information', vi: 'Đồng ý chia sẻ thông tin' })}" />
              <span style="font-size: var(--text-sm);">
                ${loc({
                  en: 'I consent to having my information shared with a partner pastor or mentor for the purpose of connecting me with a church community.',
                  vi: 'Tôi đồng ý cho chia sẻ thông tin với mục sư đối tác hoặc cố vấn nhằm kết nối tôi với cộng đồng nhà thờ.'
                })}
              </span>
            </label>
          </div>
          <button class="btn-cinnabar" id="connect-submit-btn" style="margin-top: var(--space-md);">
            ${loc({ en: 'Connect Me', vi: 'Kết nối' })}
          </button>
        </div>
        <div id="connect-form-success" style="display: none; text-align: center; padding: var(--space-lg);">
          <div style="font-size: var(--text-xl); color: var(--accent-gold); margin-bottom: var(--space-md);">&#10003;</div>
          <p style="color: var(--text-primary); font-size: var(--text-lg); margin-bottom: var(--space-sm);">
            ${loc({ en: 'Thank you!', vi: 'Cảm ơn bạn!' })}
          </p>
          <p style="color: var(--text-secondary); font-size: var(--text-sm);">
            ${loc({
              en: 'Your information has been recorded. A partner pastor or returnee mentor will reach out to you soon.',
              vi: 'Thông tin của bạn đã được ghi nhận. Mục sư đối tác hoặc người cố vấn sẽ liên hệ với bạn sớm.'
            })}
          </p>
        </div>
      </div>
    </div>
  `;
}

function renderResults(churches: Church[], state: FormState): string {
  return `
    <div class="returnee-results">
      <div class="section-eyebrow">${loc({ en: 'Your Personalized Plan', vi: 'Kế hoạch cá nhân hóa' })}</div>
      <h1>${loc({ en: 'Returnee Re-Entry Plan', vi: 'Kế hoạch tái hòa nhập' })}</h1>
      <p class="section-subtitle">
        ${loc({
          en: 'Based on your answers, here is your tailored preparation kit for returning to Vietnam.',
          vi: 'Dựa trên câu trả lời, đây là bộ chuẩn bị phù hợp cho hành trình trở về Việt Nam.'
        })}
      </p>
      <div class="gold-divider"></div>

      ${renderReEntryPlan(state)}
      ${renderChurchRecommendations(churches, state)}
      ${renderCulturalTips(state)}
      ${renderConnectForm()}

      <div style="text-align: center; margin-top: var(--space-2xl); padding-bottom: var(--space-lg);">
        <button class="btn-gold-ghost" id="returnee-restart-btn">
          ${loc({ en: 'Start Over', vi: 'Làm lại từ đầu' })}
        </button>
      </div>
    </div>
  `;
}

/* =========================================
   Utility
   ========================================= */

function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* =========================================
   Inline styles for returnee-specific elements
   ========================================= */

function getReturneeStyles(): string {
  return `
    <style>
      .returnee-landing { max-width: 800px; margin: 0 auto; }

      .returnee-stats-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--space-lg);
        margin-top: var(--space-xl);
      }

      .returnee-form-container {
        max-width: 560px;
        margin: 0 auto;
        padding: var(--space-xl) 0;
      }

      .returnee-progress-bar {
        width: 100%;
        height: 4px;
        background: var(--border-default);
        border-radius: var(--radius-full);
        overflow: hidden;
        margin-bottom: var(--space-md);
      }

      .returnee-progress-fill {
        height: 100%;
        background: var(--accent-cinnabar);
        border-radius: var(--radius-full);
        transition: width 300ms ease;
      }

      .returnee-step-label {
        font-family: var(--font-mono);
        font-size: var(--text-xs);
        color: var(--text-tertiary);
        margin-bottom: var(--space-xl);
      }

      .returnee-label {
        display: block;
        font-family: var(--font-display);
        font-size: var(--text-lg);
        color: var(--text-primary);
        margin-bottom: var(--space-md);
        font-weight: 500;
      }

      .returnee-input {
        width: 100%;
        padding: 12px 16px;
        background: var(--bg-surface);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-md);
        color: var(--text-primary);
        font-family: var(--font-body);
        font-size: var(--text-base);
        transition: border-color var(--transition-default);
        outline: none;
      }

      .returnee-input:focus {
        border-color: var(--accent-gold);
      }

      .returnee-input::placeholder {
        color: var(--text-tertiary);
      }

      select.returnee-input {
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23B8A898' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 16px center;
        padding-right: 40px;
        cursor: pointer;
      }

      select.returnee-input option {
        background: var(--bg-surface);
        color: var(--text-primary);
      }

      .returnee-radio-group,
      .returnee-checkbox-group {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
      }

      .returnee-radio-option,
      .returnee-checkbox-option {
        display: flex;
        align-items: flex-start;
        gap: var(--space-sm);
        padding: 12px 16px;
        background: var(--bg-surface);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: border-color var(--transition-default), background var(--transition-default);
        color: var(--text-primary);
        font-size: var(--text-base);
        line-height: 1.4;
      }

      .returnee-radio-option:hover,
      .returnee-checkbox-option:hover {
        border-color: var(--border-strong);
        background: var(--bg-elevated);
      }

      .returnee-radio-option input,
      .returnee-checkbox-option input {
        margin-top: 3px;
        accent-color: var(--accent-cinnabar);
        flex-shrink: 0;
      }

      .returnee-form-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: var(--space-xl);
      }

      .returnee-form-field {
        margin-bottom: var(--space-lg);
      }

      /* Results */
      .returnee-results { max-width: 900px; margin: 0 auto; }

      .returnee-plan-section {
        margin-top: var(--space-2xl);
      }

      .returnee-plan-section h2 {
        font-family: var(--font-display);
        font-size: var(--text-xl);
        color: var(--text-primary);
        margin-bottom: var(--space-sm);
      }

      .returnee-plan-phases {
        display: flex;
        flex-direction: column;
        gap: var(--space-lg);
      }

      .returnee-checklist,
      .returnee-tips-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
      }

      .returnee-checklist li,
      .returnee-tips-list li {
        position: relative;
        padding-left: 24px;
        font-size: var(--text-sm);
        color: var(--text-secondary);
        line-height: 1.6;
      }

      .returnee-checklist li::before {
        content: '';
        position: absolute;
        left: 0;
        top: 8px;
        width: 12px;
        height: 12px;
        border: 1px solid var(--border-strong);
        border-radius: 2px;
        background: transparent;
      }

      .returnee-tips-list li::before {
        content: '\\2022';
        position: absolute;
        left: 4px;
        top: 0;
        color: var(--accent-gold);
        font-weight: bold;
      }

      .returnee-church-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-lg);
      }

      .returnee-church-card {
        cursor: default;
      }

      .returnee-church-card:hover {
        border-color: var(--border-strong);
      }

      .returnee-tips-grid {
        display: flex;
        flex-direction: column;
        gap: var(--space-lg);
      }

      .returnee-badge {
        display: inline-block;
        font-family: var(--font-mono);
        font-size: 11px;
        padding: 4px 10px;
        border-radius: var(--radius-full);
        font-weight: 500;
        white-space: nowrap;
      }

      .returnee-badge--registered {
        background: rgba(122, 155, 110, 0.15);
        color: var(--success);
        border: 1px solid rgba(122, 155, 110, 0.3);
      }

      .returnee-badge--unregistered {
        background: rgba(201, 168, 76, 0.12);
        color: var(--accent-gold);
        border: 1px solid rgba(201, 168, 76, 0.25);
      }

      .returnee-discretion-note {
        margin-top: var(--space-md);
        padding: var(--space-sm) var(--space-md);
        background: rgba(201, 168, 76, 0.06);
        border-left: 2px solid var(--accent-gold);
        font-size: var(--text-xs);
        color: var(--text-tertiary);
        line-height: 1.5;
        font-style: italic;
      }

      /* Responsive */
      @media (max-width: 768px) {
        .returnee-stats-grid {
          grid-template-columns: 1fr;
          gap: var(--space-md);
        }
      }

      @media (min-width: 768px) {
        .returnee-church-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    </style>
  `;
}

/* =========================================
   Main Render + Event Wiring
   ========================================= */

export async function renderReturnee(): Promise<void> {
  const app = document.getElementById('app');
  if (!app) return;

  let state = loadState();
  let currentStep = 1;
  let churches: Church[] = [];

  // Load church data
  try {
    const mod = await import('../../data/churches-vietnam.json');
    churches = (mod.default || mod) as Church[];
  } catch {
    // Church data unavailable — continue without recommendations
  }

  // Language change listener
  const onLangChange = () => { render(); };
  window.addEventListener('langchange', onLangChange);

  setCleanup(() => {
    window.removeEventListener('langchange', onLangChange);
  });

  function render(): void {
    if (!app) return;

    // Determine what to show
    if (state.completed) {
      // Stage 3: Results (restored from session)
      app.innerHTML = `
        ${getReturneeStyles()}
        <div class="section" style="padding-top: calc(64px + var(--space-2xl));">
          ${renderResults(churches, state)}
        </div>
        ${renderFooter()}
      `;
      wireResultsEvents();
      return;
    }

    if (currentStep === 0) {
      // Stage 1: Landing
      app.innerHTML = `
        ${getReturneeStyles()}
        <div class="section" style="padding-top: calc(64px + var(--space-2xl));">
          ${renderStage1()}
        </div>
        ${renderFooter()}
      `;

      document.getElementById('returnee-start-btn')?.addEventListener('click', () => {
        currentStep = 1;
        render();
      });
      return;
    }

    // Stage 2: Form
    app.innerHTML = `
      ${getReturneeStyles()}
      <div class="section" style="padding-top: calc(64px + var(--space-2xl));">
        <div class="section-eyebrow">${loc({ en: 'Returnee Tool', vi: 'Công cụ cho người trở về' })}</div>
        <h1 style="font-size: var(--text-xl);">${loc({ en: 'Tell Us About You', vi: 'Cho chúng tôi biết về bạn' })}</h1>
        <div class="gold-divider"></div>
        ${renderFormStep(currentStep, state)}
      </div>
      ${renderFooter()}
    `;

    wireFormEvents();
  }

  function collectStepData(): void {
    switch (currentStep) {
      case 1: {
        const input = document.getElementById('returnee-name') as HTMLInputElement;
        if (input) state.name = input.value.trim();
        break;
      }
      case 2: {
        const select = document.getElementById('returnee-city') as HTMLSelectElement;
        if (select) state.city = select.value;
        break;
      }
      case 3: {
        const checked = document.querySelector('input[name="denomination"]:checked') as HTMLInputElement;
        if (checked) state.denomination = checked.value;
        break;
      }
      case 4: {
        const checked = document.querySelector('input[name="languagePref"]:checked') as HTMLInputElement;
        if (checked) state.languagePref = checked.value;
        break;
      }
      case 5: {
        const checked = document.querySelector('input[name="registrationComfort"]:checked') as HTMLInputElement;
        if (checked) state.registrationComfort = checked.value;
        break;
      }
      case 6: {
        const checked = document.querySelector('input[name="familyBackground"]:checked') as HTMLInputElement;
        if (checked) state.familyBackground = checked.value;
        break;
      }
      case 7: {
        const boxes = document.querySelectorAll('input[name="concerns"]:checked') as NodeListOf<HTMLInputElement>;
        state.concerns = Array.from(boxes).map(b => b.value);
        break;
      }
    }
    saveState(state);
  }

  function wireFormEvents(): void {
    document.getElementById('returnee-next-btn')?.addEventListener('click', () => {
      collectStepData();
      currentStep++;
      render();
      window.scrollTo(0, 0);
    });

    document.getElementById('returnee-prev-btn')?.addEventListener('click', () => {
      collectStepData();
      currentStep--;
      render();
      window.scrollTo(0, 0);
    });

    document.getElementById('returnee-submit-btn')?.addEventListener('click', () => {
      collectStepData();
      state.completed = true;
      saveState(state);
      render();
      window.scrollTo(0, 0);
    });
  }

  function wireResultsEvents(): void {
    document.getElementById('returnee-restart-btn')?.addEventListener('click', () => {
      sessionStorage.removeItem(STORAGE_KEY);
      state = loadState();
      currentStep = 0;
      render();
      window.scrollTo(0, 0);
    });

    document.getElementById('connect-submit-btn')?.addEventListener('click', () => {
      const nameInput = document.getElementById('connect-name') as HTMLInputElement;
      const emailInput = document.getElementById('connect-email') as HTMLInputElement;
      const cityInput = document.getElementById('connect-city') as HTMLInputElement;
      const consentInput = document.getElementById('connect-consent') as HTMLInputElement;

      if (!emailInput?.value.trim()) {
        emailInput?.focus();
        return;
      }
      if (!consentInput?.checked) {
        consentInput?.focus();
        return;
      }

      // Phase 1: just show confirmation (no actual submission)
      const formContent = document.getElementById('connect-form-content');
      const successContent = document.getElementById('connect-form-success');
      if (formContent) formContent.style.display = 'none';
      if (successContent) successContent.style.display = 'block';
    });
  }

  // Initial render: show landing if fresh, results if completed, form if in-progress
  if (state.completed) {
    // Go straight to results
    render();
  } else if (state.city || state.name || state.denomination) {
    // Resume form where they were (determine step from filled data)
    if (state.concerns.length > 0) currentStep = 7;
    else if (state.familyBackground) currentStep = 7;
    else if (state.registrationComfort) currentStep = 6;
    else if (state.languagePref) currentStep = 5;
    else if (state.denomination) currentStep = 4;
    else if (state.city) currentStep = 3;
    else if (state.name) currentStep = 2;
    else currentStep = 1;
    render();
  } else {
    // Fresh: show landing
    currentStep = 0;
    render();
  }
}
