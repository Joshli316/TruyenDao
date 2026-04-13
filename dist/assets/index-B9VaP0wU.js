(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function a(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=a(n);fetch(n.href,r)}})();const Y={"nav.research":{en:"Research",vi:"Nghiên cứu"},"nav.tools":{en:"Tools",vi:"Công cụ"},"nav.heritage":{en:"Heritage",vi:"Di sản"},"nav.personas":{en:"Personas",vi:"Nhân vật"},"nav.about":{en:"About",vi:"Giới thiệu"},"nav.search":{en:"Search",vi:"Tìm kiếm"},"hero.eyebrow":{en:"Vietnam Missions Research Platform",vi:"Nền tảng nghiên cứu truyền giáo Việt Nam"},"hero.title":{en:"493 Years of Christianity in Vietnam",vi:"493 năm Kitô giáo tại Việt Nam"},"hero.intro":{en:"The missionaries who brought Christianity to Vietnam also invented the Vietnamese alphabet. This platform connects that extraordinary story — from the first Portuguese contact in 1533 to today's 8-10 million believers — through 12 research reports, interactive tools, and AI-powered discovery. Bilingual throughout.",vi:"Các nhà truyền giáo mang Kitô giáo đến Việt Nam cũng đã sáng tạo ra chữ Quốc ngữ. Nền tảng này kết nối câu chuyện phi thường ấy — từ lần tiếp xúc đầu tiên của người Bồ Đào Nha năm 1533 đến 8-10 triệu tín hữu ngày nay — qua 12 báo cáo nghiên cứu, công cụ tương tác, và khám phá bằng AI. Song ngữ toàn bộ."},"hero.cta.explore":{en:"Explore the Archive",vi:"Khám phá kho tư liệu"},"hero.cta.research":{en:"Read the Research",vi:"Đọc nghiên cứu"},"hero.stat.christians":{en:"8-10M",vi:"8-10 triệu"},"hero.stat.christians.label":{en:"Christians in Vietnam",vi:"Kitô hữu tại Việt Nam"},"hero.stat.martyrs":{en:"117",vi:"117"},"hero.stat.martyrs.label":{en:"Canonized Martyrs",vi:"Thánh Tử Đạo"},"hero.stat.script":{en:"100M+",vi:"100 triệu+"},"hero.stat.script.label":{en:"using missionary-created script",vi:"dùng chữ do nhà truyền giáo sáng tạo"},"hero.stat.years":{en:"493",vi:"493"},"hero.stat.years.label":{en:"years of history",vi:"năm lịch sử"},"hero.panel.title":{en:"Vietnam at a glance",vi:"Việt Nam nhìn nhanh"},"pillars.eyebrow":{en:"The Platform",vi:"Nền tảng"},"pillars.title":{en:"Research, Tools, Heritage",vi:"Nghiên cứu, Công cụ, Di sản"},"pillars.research.title":{en:"Research Archive",vi:"Kho nghiên cứu"},"pillars.research.count":{en:"12 reports",vi:"12 báo cáo"},"pillars.research.desc":{en:"From the 1533 first contact through French colonialism, Communist revolution, and today's controlled accommodation — 12 bilingual reports with AI-powered search.",vi:"Từ lần tiếp xúc đầu tiên năm 1533 qua thời Pháp thuộc, cách mạng Cộng sản, đến chính sách hòa hợp có kiểm soát ngày nay — 12 báo cáo song ngữ với tìm kiếm AI."},"pillars.research.cta":{en:"Browse reports",vi:"Xem báo cáo"},"pillars.tools.title":{en:"Ministry Tools",vi:"Công cụ mục vụ"},"pillars.tools.count":{en:"5 tools",vi:"5 công cụ"},"pillars.tools.desc":{en:"Returnee preparation kit, volunteer training modules, animated spread map, faith retention calculator, and the Ask the Archive AI.",vi:"Bộ chuẩn bị cho người trở về, mô-đun đào tạo tình nguyện viên, bản đồ lan tỏa động, tính toán gìn giữ đức tin, và AI Hỏi Kho Tư Liệu."},"pillars.tools.cta":{en:"Explore tools",vi:"Khám phá công cụ"},"pillars.heritage.title":{en:"Vietnamese Heritage",vi:"Di sản Việt Nam"},"pillars.heritage.count":{en:"2 experiences",vi:"2 trải nghiệm"},"pillars.heritage.desc":{en:"The 117 Vietnamese Martyrs — the largest single-country canonization in Catholic history. And the chữ Quốc ngữ story — how missionaries invented the Vietnamese alphabet.",vi:"117 Thánh Tử Đạo Việt Nam — lần phong thánh đông nhất cho một quốc gia trong lịch sử Công giáo. Và câu chuyện chữ Quốc ngữ — cách các nhà truyền giáo sáng tạo bảng chữ cái Việt Nam."},"pillars.heritage.cta":{en:"Discover heritage",vi:"Khám phá di sản"},"timeline.eyebrow":{en:"Timeline",vi:"Dòng thời gian"},"timeline.title":{en:"493 Years at a Glance",vi:"493 năm nhìn lại"},"timeline.cta":{en:"View full timeline",vi:"Xem toàn bộ dòng thời gian"},"timeline.page.title":{en:"493 Years of Christianity in Vietnam",vi:"493 năm Kitô giáo tại Việt Nam"},"timeline.page.subtitle":{en:"From the first Portuguese contact in 1533 to today's growing church — scroll through the events that shaped Vietnamese Christianity.",vi:"Từ lần tiếp xúc đầu tiên với người Bồ Đào Nha năm 1533 đến Giáo hội đang phát triển ngày nay — lướt qua các sự kiện đã định hình Kitô giáo Việt Nam."},"timeline.filter.all":{en:"All",vi:"Tất cả"},"timeline.filter.missions":{en:"Missions",vi:"Truyền giáo"},"timeline.filter.persecution":{en:"Persecution",vi:"Bách hại"},"timeline.filter.cultural":{en:"Cultural",vi:"Văn hóa"},"timeline.filter.political":{en:"Political",vi:"Chính trị"},"timeline.filter.institutional":{en:"Institutional",vi:"Thể chế"},"era.early":{en:"Early Contact",vi:"Tiếp xúc đầu tiên"},"era.jesuit":{en:"Jesuit Era",vi:"Thời kỳ Dòng Tên"},"era.mep":{en:"MEP Era",vi:"Thời kỳ MEP"},"era.persecution":{en:"Great Persecutions",vi:"Đại Bách Hại"},"era.colonial":{en:"Colonial Period",vi:"Thời kỳ thuộc địa"},"era.partition":{en:"Partition & War",vi:"Chia cắt & Chiến tranh"},"era.communist":{en:"Communist Era",vi:"Thời kỳ Cộng sản"},"era.modern":{en:"Modern Era",vi:"Thời kỳ hiện đại"},"trilogy.eyebrow":{en:"The Asia Trilogy",vi:"Bộ ba Châu Á"},"trilogy.title":{en:"Three Countries. Three Stories. One Mission.",vi:"Ba quốc gia. Ba câu chuyện. Một sứ mạng."},"trilogy.china":{en:"China",vi:"Trung Quốc"},"trilogy.japan":{en:"Japan",vi:"Nhật Bản"},"trilogy.vietnam":{en:"Vietnam",vi:"Việt Nam"},"trilogy.china.stat":{en:"~5-7%",vi:"~5-7%"},"trilogy.japan.stat":{en:"~1.5%",vi:"~1,5%"},"trilogy.vietnam.stat":{en:"~8-10%",vi:"~8-10%"},"research.title":{en:"Research Reports",vi:"Báo cáo nghiên cứu"},"research.subtitle":{en:"12 bilingual reports on Christianity in Vietnam — from the 1533 first contact to contemporary scholarship and AI-enabled research.",vi:"12 báo cáo song ngữ về Kitô giáo tại Việt Nam — từ lần tiếp xúc đầu tiên năm 1533 đến học thuật đương đại và nghiên cứu hỗ trợ AI."},"research.filter.all":{en:"All",vi:"Tất cả"},"research.filter.history":{en:"History",vi:"Lịch sử"},"research.filter.scholarship":{en:"Scholarship",vi:"Học thuật"},"research.filter.gaps":{en:"Gaps",vi:"Khoảng trống"},"research.filter.ai":{en:"AI",vi:"AI"},"research.filter.archives":{en:"Archives",vi:"Kho lưu trữ"},"research.filter.diaspora":{en:"Diaspora",vi:"Cộng đồng hải ngoại"},"research.filter.culture":{en:"Culture",vi:"Văn hóa"},"research.filter.contemporary":{en:"Contemporary",vi:"Đương đại"},"research.readingtime":{en:"min read",vi:"phút đọc"},"research.search.placeholder":{en:"Search all reports...",vi:"Tìm kiếm tất cả báo cáo..."},"toc.title":{en:"Contents",vi:"Mục lục"},"toc.sources":{en:"Sources",vi:"Nguồn tham khảo"},"toc.back":{en:"← Back to Reports",vi:"← Về danh sách báo cáo"},"toc.prev":{en:"Previous",vi:"Trước"},"toc.next":{en:"Next",vi:"Tiếp"},"ask.title":{en:"Ask the Archive",vi:"Hỏi Kho Tư Liệu"},"ask.subtitle":{en:"Ask anything about Christianity in Vietnam. Every answer cites its sources from our 12 research reports.",vi:"Hỏi bất kỳ điều gì về Kitô giáo tại Việt Nam. Mọi câu trả lời đều trích nguồn từ 12 báo cáo nghiên cứu."},"ask.placeholder":{en:"Ask anything about Christianity in Vietnam...",vi:"Hỏi bất kỳ điều gì về Kitô giáo tại Việt Nam..."},"ask.send":{en:"Send",vi:"Gửi"},"ask.thinking":{en:"Searching the archive...",vi:"Đang tìm kiếm trong kho tư liệu..."},"ask.starter.1":{en:"What is chữ Quốc ngữ and who created it?",vi:"Chữ Quốc ngữ là gì và ai đã sáng tạo ra nó?"},"ask.starter.2":{en:"Why did Christianity grow among the Hmong?",vi:"Tại sao Kitô giáo phát triển mạnh trong cộng đồng H'Mông?"},"ask.starter.3":{en:"Who are the 117 Vietnamese Martyrs?",vi:"117 Thánh Tử Đạo Việt Nam là ai?"},"ask.starter.4":{en:"How does ancestor worship affect conversion?",vi:"Thờ cúng tổ tiên ảnh hưởng đến việc cải đạo như thế nào?"},"ask.starter.5":{en:"Tại sao Kitô giáo phát triển mạnh ở Tây Nguyên?",vi:"Tại sao Kitô giáo phát triển mạnh ở Tây Nguyên?"},"ask.error":{en:"Something went wrong. Please try again.",vi:"Đã xảy ra lỗi. Vui lòng thử lại."},"ask.sources":{en:"Sources",vi:"Nguồn"},"search.placeholder":{en:"Search reports, tools, timeline...",vi:"Tìm kiếm báo cáo, công cụ, dòng thời gian..."},"search.hint":{en:"Press Cmd+K to search",vi:"Nhấn Cmd+K để tìm kiếm"},"search.no_results":{en:"No results found",vi:"Không tìm thấy kết quả"},"tools.title":{en:"Tools",vi:"Công cụ"},"tools.subtitle":{en:"Practical tools built on the research — for missionaries, pastors, returnees, and volunteers.",vi:"Công cụ thực tiễn dựa trên nghiên cứu — dành cho nhà truyền giáo, mục sư, người trở về, và tình nguyện viên."},"heritage.title":{en:"Vietnamese Christian Heritage",vi:"Di sản Kitô giáo Việt Nam"},"heritage.subtitle":{en:"The 117 Martyrs. The Gift of Letters. Two stories that define Vietnamese Christianity.",vi:"117 Thánh Tử Đạo. Ân Phẩm Chữ Viết. Hai câu chuyện định hình Kitô giáo Việt Nam."},"personas.title":{en:"Historical Conversations",vi:"Đối thoại lịch sử"},"personas.subtitle":{en:"Converse with key figures from Vietnamese Christian history — AI-mediated, grounded in their actual writings.",vi:"Trò chuyện với các nhân vật quan trọng trong lịch sử Kitô giáo Việt Nam — qua AI, dựa trên các tác phẩm thực tế của họ."},"about.title":{en:"About TruyềnĐạo",vi:"Giới thiệu TruyềnĐạo"},"about.p1":{en:"TruyềnĐạo (傳道) applies AI to international student ministry and the Vietnamese diaspora pipeline — connecting 493 years of missions history to practical tools for today.",vi:"TruyềnĐạo (傳道) ứng dụng AI vào mục vụ sinh viên quốc tế và đường dẫn cộng đồng Việt Nam hải ngoại — kết nối 493 năm lịch sử truyền giáo với các công cụ thực tiễn ngày nay."},"about.p2":{en:"The platform connects 493 years of Christian missions in Vietnam to practical ministry tools. Every feature is bilingual, AI-powered, and grounded in peer-reviewed research. It is the third in a trilogy: XuanYan 宣研 (China), Sendō 宣道 (Japan), TruyềnĐạo 傳道 (Vietnam).",vi:"Nền tảng kết nối 493 năm truyền giáo Kitô tại Việt Nam với các công cụ mục vụ thực tiễn. Mọi tính năng đều song ngữ, hỗ trợ AI, và dựa trên nghiên cứu được bình duyệt. Đây là phần thứ ba trong bộ ba: Tuyên Nghiên 宣研 (Trung Quốc), Sendō 宣道 (Nhật Bản), TruyềnĐạo 傳道 (Việt Nam)."},"about.p3":{en:"We partner with Vietnamese Christian Fellowship (VCF) chapters for returnee support. TruyềnĐạo is proof that AI can serve the Great Commission — not replace human connection, but extend it.",vi:"Chúng tôi hợp tác với các chi hội Hội Thánh Tin Lành Việt Nam (VCF) để hỗ trợ người trở về. TruyềnĐạo là minh chứng rằng AI có thể phục vụ Đại Mệnh Lệnh — không thay thế mối liên kết con người, mà mở rộng nó."},"footer.mission":{en:"AI can serve the Great Commission — not replace human connection, but extend it.",vi:"AI có thể phục vụ Đại Mệnh Lệnh — không thay thế mối liên kết con người, mà mở rộng nó."},"footer.tagline":{en:"Powered by AI. Grounded in 493 years of history.",vi:"Được hỗ trợ bởi AI. Dựa trên 493 năm lịch sử."},"footer.fc":{en:"About",vi:"Giới thiệu"},"footer.privacy":{en:"Privacy",vi:"Quyền riêng tư"},"footer.github":{en:"GitHub",vi:"GitHub"},"footer.notebooklm":{en:"NotebookLM",vi:"NotebookLM"},"footer.source":{en:"Research Source",vi:"Nguồn nghiên cứu"},"common.loading":{en:"Loading...",vi:"Đang tải..."},"common.error":{en:"Something went wrong. Please try again.",vi:"Đã xảy ra lỗi. Vui lòng thử lại."},"common.back":{en:"Back",vi:"Quay lại"},"common.readmore":{en:"Read more",vi:"Đọc thêm"},"common.ai_translated":{en:"AI-translated — review pending",vi:"Bản dịch AI — Chờ xem xét"}};let R=localStorage.getItem("truyendao-lang")||X();function X(){return(typeof navigator<"u"?(navigator.language||"").toLowerCase():"").startsWith("vi")?"vi":"en"}function e(t){const i=Y[t];return i?i[R]:(console.warn(`Missing i18n key: ${t}`),t)}function k(){return R}function U(t){R=t,localStorage.setItem("truyendao-lang",t),document.documentElement.lang=t,document.querySelectorAll("[data-i18n]").forEach(i=>{const a=i.getAttribute("data-i18n");i.textContent=e(a)}),document.querySelectorAll("[data-i18n-placeholder]").forEach(i=>{const a=i.getAttribute("data-i18n-placeholder");i.placeholder=e(a)}),document.querySelectorAll("[data-i18n-html]").forEach(i=>{const a=i.getAttribute("data-i18n-html");i.innerHTML=e(a)}),window.dispatchEvent(new CustomEvent("langchange",{detail:{lang:t}}))}const M=[];let V=null;function x(t,i){M.push({path:t,render:i})}function z(){return window.location.hash.slice(1)||"/"}function F(t){const i=M.find(a=>a.path===t);if(i)return{route:i,params:{}};for(const a of M){const s=a.path.split("/"),n=t.split("/");if(s.length!==n.length)continue;let r=!0;const c={};for(let o=0;o<s.length;o++)if(s[o].startsWith(":"))c[s[o].slice(1)]=n[o];else if(s[o]!==n[o]){r=!1;break}if(r)return{route:a,params:c}}return null}function Z(t){var i;return(i=F(t))==null?void 0:i.route}function ee(t){const i=F(z());return(i==null?void 0:i.params[t])??null}function H(){var a;const t=z(),i=Z(t);if(V&&(V(),V=null),i)i.render();else{const s=M.find(n=>n.path==="/");s&&s.render()}window.scrollTo(0,0),(a=document.getElementById("app"))==null||a.focus(),document.querySelectorAll(".nav-links a").forEach(s=>{const n=s.getAttribute("href")||"";t.startsWith(n.replace("#",""))?s.classList.add("active"):s.classList.remove("active")})}function te(t){V=t}function ie(){document.querySelectorAll(".lang-toggle button").forEach(n=>{n.addEventListener("click",()=>{const r=n.getAttribute("data-lang");U(r),P()})}),window.addEventListener("scroll",()=>{const n=document.querySelector(".nav");n&&n.classList.toggle("scrolled",window.scrollY>20)});const i=document.querySelector(".mobile-menu-btn"),a=document.querySelector(".mobile-nav");i&&a&&(i.addEventListener("click",()=>{a.classList.toggle("open")}),a.querySelectorAll("a").forEach(n=>{n.addEventListener("click",()=>{a.classList.remove("open")})})),document.addEventListener("keydown",n=>{if((n.metaKey||n.ctrlKey)&&n.key==="k"){n.preventDefault();const r=document.getElementById("search-modal");if(r){r.classList.toggle("open");const c=r.querySelector(".search-input");c&&c.focus()}}if(n.key==="Escape"){const r=document.getElementById("search-modal");r&&r.classList.remove("open")}});const s=document.getElementById("search-modal");s&&s.addEventListener("click",n=>{n.target===s&&s.classList.remove("open")}),P()}function P(){const t=k();document.querySelectorAll(".lang-toggle button").forEach(i=>{i.getAttribute("data-lang")===t?i.classList.add("active"):i.classList.remove("active")})}window.addEventListener("langchange",()=>{P(),H()});function ne(){ie(),window.addEventListener("hashchange",H),H()}function ae(){const t=document.getElementById("app");t&&(t.innerHTML=`
    <!-- Hero — Asymmetric Split -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-eyebrow" data-i18n="hero.eyebrow">${e("hero.eyebrow")}</div>
        <h1 data-i18n="hero.title">${e("hero.title")}</h1>
        <p class="hero-intro" data-i18n="hero.intro">${e("hero.intro")}</p>
        <div class="hero-ctas">
          <a href="#/research/ask" class="btn-cinnabar" data-i18n="hero.cta.explore">${e("hero.cta.explore")}</a>
          <a href="#/research" class="btn-gold-ghost" data-i18n="hero.cta.research">${e("hero.cta.research")}</a>
        </div>
      </div>
      <div class="hero-panel">
        <div class="hero-panel-title" data-i18n="hero.panel.title">${e("hero.panel.title")}</div>
        <div class="hero-stats">
          <div class="hero-stat">
            <span class="number" data-i18n="hero.stat.christians">${e("hero.stat.christians")}</span>
            <span class="label" data-i18n="hero.stat.christians.label">${e("hero.stat.christians.label")}</span>
          </div>
          <div class="hero-stat">
            <span class="number" data-i18n="hero.stat.martyrs">${e("hero.stat.martyrs")}</span>
            <span class="label" data-i18n="hero.stat.martyrs.label">${e("hero.stat.martyrs.label")}</span>
          </div>
          <div class="hero-stat">
            <span class="number" data-i18n="hero.stat.script">${e("hero.stat.script")}</span>
            <span class="label" data-i18n="hero.stat.script.label">${e("hero.stat.script.label")}</span>
          </div>
          <div class="hero-stat">
            <span class="number" data-i18n="hero.stat.years">${e("hero.stat.years")}</span>
            <span class="label" data-i18n="hero.stat.years.label">${e("hero.stat.years.label")}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Three Pillars -->
    <section class="section">
      <div class="section-eyebrow" data-i18n="pillars.eyebrow">${e("pillars.eyebrow")}</div>
      <h2 data-i18n="pillars.title">${e("pillars.title")}</h2>
      <div class="gold-divider"></div>
      <div class="pillars-grid">
        <div class="pillar-card">
          <div class="pillar-count" data-i18n="pillars.research.count">${e("pillars.research.count")}</div>
          <h3 data-i18n="pillars.research.title">${e("pillars.research.title")}</h3>
          <p data-i18n="pillars.research.desc">${e("pillars.research.desc")}</p>
          <a href="#/research" data-i18n="pillars.research.cta">${e("pillars.research.cta")} &rarr;</a>
        </div>
        <div class="pillar-card">
          <div class="pillar-count" data-i18n="pillars.tools.count">${e("pillars.tools.count")}</div>
          <h3 data-i18n="pillars.tools.title">${e("pillars.tools.title")}</h3>
          <p data-i18n="pillars.tools.desc">${e("pillars.tools.desc")}</p>
          <a href="#/tools" data-i18n="pillars.tools.cta">${e("pillars.tools.cta")} &rarr;</a>
        </div>
        <div class="pillar-card">
          <div class="pillar-count" data-i18n="pillars.heritage.count">${e("pillars.heritage.count")}</div>
          <h3 data-i18n="pillars.heritage.title">${e("pillars.heritage.title")}</h3>
          <p data-i18n="pillars.heritage.desc">${e("pillars.heritage.desc")}</p>
          <a href="#/heritage" data-i18n="pillars.heritage.cta">${e("pillars.heritage.cta")} &rarr;</a>
        </div>
      </div>
    </section>

    <!-- Timeline Preview -->
    <section class="section">
      <div class="section-eyebrow" data-i18n="timeline.eyebrow">${e("timeline.eyebrow")}</div>
      <h2 data-i18n="timeline.title">${e("timeline.title")}</h2>
      <div class="gold-divider"></div>
      <div class="timeline-preview">
        <a href="#/research/timeline" class="timeline-dot">
          <span class="year">1533</span>
          <span class="event">${e("era.early")}</span>
        </a>
        <a href="#/research/timeline" class="timeline-dot">
          <span class="year">1615</span>
          <span class="event">${e("era.jesuit")}</span>
        </a>
        <a href="#/research/timeline" class="timeline-dot">
          <span class="year">1651</span>
          <span class="event">Chữ Quốc ngữ dictionary</span>
        </a>
        <a href="#/research/timeline" class="timeline-dot">
          <span class="year">1833</span>
          <span class="event">${e("era.persecution")}</span>
        </a>
        <a href="#/research/timeline" class="timeline-dot">
          <span class="year">1988</span>
          <span class="event">117 Martyrs canonized</span>
        </a>
        <a href="#/research/timeline" class="timeline-dot">
          <span class="year">2016</span>
          <span class="event">${e("era.modern")}</span>
        </a>
      </div>
      <div style="margin-top: var(--space-lg);">
        <a href="#/research/timeline" class="btn-gold-ghost" data-i18n="timeline.cta">${e("timeline.cta")}</a>
      </div>
    </section>

    <!-- The Asia Trilogy -->
    <section class="section">
      <div class="section-eyebrow" data-i18n="trilogy.eyebrow">${e("trilogy.eyebrow")}</div>
      <h2 data-i18n="trilogy.title">${e("trilogy.title")}</h2>
      <div class="gold-divider"></div>
      <div class="trilogy-grid">
        <div class="trilogy-card">
          <div class="trilogy-name">宣研</div>
          <div class="trilogy-han">XuanYan</div>
          <div class="trilogy-country" data-i18n="trilogy.china">${e("trilogy.china")}</div>
          <div class="trilogy-stat" style="color: #D4A44C;" data-i18n="trilogy.china.stat">${e("trilogy.china.stat")}</div>
        </div>
        <div class="trilogy-card">
          <div class="trilogy-name">宣道</div>
          <div class="trilogy-han">Sendō</div>
          <div class="trilogy-country" data-i18n="trilogy.japan">${e("trilogy.japan")}</div>
          <div class="trilogy-stat" style="color: #C8323C;" data-i18n="trilogy.japan.stat">${e("trilogy.japan.stat")}</div>
        </div>
        <div class="trilogy-card current">
          <div class="trilogy-name">傳道</div>
          <div class="trilogy-han">TruyềnĐạo</div>
          <div class="trilogy-country" data-i18n="trilogy.vietnam">${e("trilogy.vietnam")}</div>
          <div class="trilogy-stat" style="color: var(--accent-cinnabar);" data-i18n="trilogy.vietnam.stat">${e("trilogy.vietnam.stat")}</div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-mission" data-i18n="footer.mission">${e("footer.mission")}</div>
        <div class="footer-links">
          <a href="#/about" data-i18n="footer.fc">${e("footer.fc")}</a>
          <a href="#" data-i18n="footer.github">${e("footer.github")}</a>
        </div>
      </div>
      <div class="footer-tagline" data-i18n="footer.tagline">${e("footer.tagline")}</div>
    </footer>
  `)}const se="modulepreload",re=function(t){return"/"+t},q={},T=function(i,a,s){let n=Promise.resolve();if(a&&a.length>0){let c=function(h){return Promise.all(h.map(p=>Promise.resolve(p).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));n=c(a.map(h=>{if(h=re(h),h in q)return;q[h]=!0;const p=h.endsWith(".css"),u=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${u}`))return;const d=document.createElement("link");if(d.rel=p?"stylesheet":se,p||(d.as="script"),d.crossOrigin="",d.href=h,l&&d.setAttribute("nonce",l),document.head.appendChild(d),p)return new Promise((g,b)=>{d.addEventListener("load",g),d.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${h}`)))})}))}function r(c){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=c,window.dispatchEvent(o),!o.defaultPrevented)throw c}return n.then(c=>{for(const o of c||[])o.status==="rejected"&&r(o.reason);return i().catch(r)})},oe=(t,i,a)=>{const s=t[i];return s?typeof s=="function"?s():Promise.resolve(s):new Promise((n,r)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(r.bind(null,new Error("Unknown variable dynamic import: "+i+(i.split("/").length!==a?". Note that variables only represent file names one level deep.":""))))})},_=new Map;async function G(t){if(_.has(t))return _.get(t);const i=t.padStart(2,"0"),s=(await oe(Object.assign({"../data/reports/01.json":()=>T(()=>import("./01-BDQhbDlQ.js"),[]),"../data/reports/02.json":()=>T(()=>import("./02-C2rNG3Y-.js"),[]),"../data/reports/03.json":()=>T(()=>import("./03-99ZYwPxF.js"),[]),"../data/reports/04.json":()=>T(()=>import("./04-D_xRkuYr.js"),[]),"../data/reports/05.json":()=>T(()=>import("./05-D0LueHGv.js"),[]),"../data/reports/06.json":()=>T(()=>import("./06-CYYSEIXy.js"),[]),"../data/reports/07.json":()=>T(()=>import("./07-BYaWrZap.js"),[]),"../data/reports/08.json":()=>T(()=>import("./08-CLx-wdD3.js"),[]),"../data/reports/09.json":()=>T(()=>import("./09-Bul1kyef.js"),[]),"../data/reports/10.json":()=>T(()=>import("./10-Cl7Vb9r3.js"),[]),"../data/reports/11.json":()=>T(()=>import("./11-BvWG6cR0.js"),[]),"../data/reports/12.json":()=>T(()=>import("./12-Z7q1fn7c.js"),[])}),`../data/reports/${i}.json`,4)).default;return _.set(t,s),s}async function N(){const t=["01","02","03","04","05","06","07","08","09","10","11","12"];return await Promise.all(t.map(a=>G(a)))}function v(t){const i=k();return t[i]||t.en}async function ce(){const t=document.getElementById("app");if(!t)return;t.innerHTML=`
    <div class="section" style="padding-top: calc(64px + var(--space-2xl));">
      <div class="section-eyebrow" data-i18n="nav.research">${e("nav.research")}</div>
      <h1 data-i18n="research.title">${e("research.title")}</h1>
      <p class="section-subtitle" data-i18n="research.subtitle">${e("research.subtitle")}</p>
      <input type="text" class="search-page-input" id="report-search" data-i18n-placeholder="research.search.placeholder" placeholder="${e("research.search.placeholder")}">
      <div class="report-filters" id="tag-filters"></div>
      <div class="report-grid" id="report-grid">
        <div class="skeleton" style="height: 200px;"></div>
        <div class="skeleton" style="height: 200px;"></div>
        <div class="skeleton" style="height: 200px;"></div>
      </div>
    </div>
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-mission" data-i18n="footer.mission">${e("footer.mission")}</div>
        <div class="footer-links">
          <a href="#/about" data-i18n="footer.fc">${e("footer.fc")}</a>
        </div>
      </div>
      <div class="footer-tagline" data-i18n="footer.tagline">${e("footer.tagline")}</div>
    </footer>
  `;const i=await N(),a=document.getElementById("report-grid"),s=document.getElementById("tag-filters"),n=document.getElementById("report-search"),r=new Set;i.forEach(l=>l.tags.forEach(h=>r.add(h)));let c="all";s.innerHTML=`
    <button class="active" data-tag="all" data-i18n="research.filter.all">${e("research.filter.all")}</button>
    ${Array.from(r).map(l=>{const h=`research.filter.${l}`;return`<button data-tag="${l}" data-i18n="${h}">${e(h)}</button>`}).join("")}
  `;function o(l,h){let p=i;if(l!=="all"&&(p=p.filter(u=>u.tags.includes(l))),h){const u=h.toLowerCase();p=p.filter(d=>v(d.title).toLowerCase().includes(u)||v(d.summary).toLowerCase().includes(u)||d.tags.some(g=>g.toLowerCase().includes(u)))}a.innerHTML=p.map(u=>`
      <a href="#/research/${u.id}" class="lacquer-card${u.featured?" featured":""}">
        <div class="card-number">Report ${u.id}</div>
        <div class="card-title">${v(u.title)}</div>
        <div class="card-desc">${v(u.summary).substring(0,160)}...</div>
        <div class="card-meta">${u.readingTime} ${e("research.readingtime")} &middot; ${u.tags.join(", ")}</div>
      </a>
    `).join(""),p.length===0&&(a.innerHTML=`<p style="color: var(--text-tertiary);" data-i18n="search.no_results">${e("search.no_results")}</p>`)}o("all",""),s.addEventListener("click",l=>{const h=l.target.closest("button");h&&(c=h.dataset.tag||"all",s.querySelectorAll("button").forEach(p=>p.classList.remove("active")),h.classList.add("active"),o(c,n.value))}),n.addEventListener("input",()=>{o(c,n.value)})}async function le(){const t=document.getElementById("app");if(!t)return;const i=ee("id");if(!i){t.innerHTML='<p style="padding: 120px 24px; color: var(--text-tertiary);">Report not found.</p>';return}t.innerHTML='<div class="report-detail"><div class="skeleton" style="height: 400px;"></div></div>';let a;try{a=await G(i)}catch{t.innerHTML='<p style="padding: 120px 24px; color: var(--text-tertiary);">Report not found.</p>';return}const s=document.createElement("div");s.className="reading-progress",s.style.width="0%",document.body.appendChild(s);const n=()=>{const u=window.scrollY,d=document.documentElement.scrollHeight-window.innerHeight,g=d>0?u/d*100:0;s.style.width=`${Math.min(g,100)}%`};window.addEventListener("scroll",n),te(()=>{window.removeEventListener("scroll",n),s.remove()});const r=parseInt(i),c=r>1?String(r-1).padStart(2,"0"):null,o=r<12?String(r+1).padStart(2,"0"):null,l=a.sections.map((u,d)=>`<a href="#section-${d}" data-idx="${d}">${v(u.heading)}</a>`).join(""),h=a.sections.map((u,d)=>`
    <div id="section-${d}">
      <h2>${v(u.heading)}</h2>
      <div class="report-section-content">${de(v(u.content))}</div>
    </div>
  `).join("");t.innerHTML=`
    <div class="report-layout">
      <aside class="report-toc">
        <a href="#/research" class="report-back" data-i18n="toc.back">${e("toc.back")}</a>
        <div class="toc-title" data-i18n="toc.title">${e("toc.title")}</div>
        ${l}
      </aside>
      <article class="report-detail" style="padding: 0;">
        <div class="report-meta">
          <span>Report ${a.id}</span>
          <span>${a.readingTime} ${e("research.readingtime")}</span>
          <span>${a.tags.join(", ")}</span>
        </div>
        <h1>${v(a.title)}</h1>
        <p style="font-size: 18px; line-height: 1.75; color: var(--text-secondary); margin-bottom: var(--space-xl);">${v(a.summary)}</p>
        ${k()==="vi"?'<span class="ai-badge">Bản dịch AI — Chờ xem xét</span>':""}
        ${h}
        <div style="display: flex; justify-content: space-between; margin-top: var(--space-2xl); padding-top: var(--space-lg); border-top: 1px solid var(--border-subtle);">
          ${c?`<a href="#/research/${c}" class="btn-gold-ghost" data-i18n="toc.prev">&larr; ${e("toc.prev")}</a>`:"<span></span>"}
          ${o?`<a href="#/research/${o}" class="btn-cinnabar" data-i18n="toc.next">${e("toc.next")} &rarr;</a>`:"<span></span>"}
        </div>
      </article>
    </div>
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-mission" data-i18n="footer.mission">${e("footer.mission")}</div>
        <div class="footer-links">
          <a href="#/about" data-i18n="footer.fc">${e("footer.fc")}</a>
        </div>
      </div>
      <div class="footer-tagline" data-i18n="footer.tagline">${e("footer.tagline")}</div>
    </footer>
  `;const p=new IntersectionObserver(u=>{u.forEach(d=>{if(d.isIntersecting){const g=d.target.id.replace("section-","");document.querySelectorAll(".report-toc a[data-idx]").forEach(b=>{b.classList.toggle("active",b.getAttribute("data-idx")===g)})}})},{rootMargin:"-80px 0px -50% 0px"});a.sections.forEach((u,d)=>{const g=document.getElementById(`section-${d}`);g&&p.observe(g)})}function de(t){return t.split(`

`).map(i=>{if(i=i.trim(),!i)return"";if(i.startsWith("### "))return`<h3>${i.slice(4)}</h3>`;if(i.startsWith("## "))return`<h2>${i.slice(3)}</h2>`;if(i.match(/^[-*] /m))return`<ul>${i.split(/\n/).filter(s=>s.match(/^[-*] /)).map(s=>`<li>${A(s.replace(/^[-*] /,""))}</li>`).join("")}</ul>`;if(i.match(/^\d+\. /m))return`<ol>${i.split(/\n/).filter(s=>s.match(/^\d+\. /)).map(s=>`<li>${A(s.replace(/^\d+\. /,""))}</li>`).join("")}</ol>`;if(i.includes("|")&&i.includes("---")){const a=i.split(`
`).filter(s=>s.trim()&&!s.match(/^\|?\s*---/));if(a.length>=1){const s=c=>c.split("|").map(o=>o.trim()).filter(Boolean),n=s(a[0]),r=a.slice(1).map(s);return`<table><thead><tr>${n.map(c=>`<th>${c}</th>`).join("")}</tr></thead><tbody>${r.map(c=>`<tr>${c.map(o=>`<td>${A(o)}</td>`).join("")}</tr>`).join("")}</tbody></table>`}}return`<p>${A(i)}</p>`}).join(`
`)}function A(t){return t.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>").replace(/`(.+?)`/g,"<code>$1</code>")}async function he(){const t=document.getElementById("app");if(!t)return;t.innerHTML=`
    <div class="timeline-container">
      <div class="section-eyebrow" data-i18n="timeline.eyebrow">${e("timeline.eyebrow")}</div>
      <h1 data-i18n="timeline.page.title">${e("timeline.page.title")}</h1>
      <p class="section-subtitle" data-i18n="timeline.page.subtitle">${e("timeline.page.subtitle")}</p>
      <div class="skeleton" style="height: 400px;"></div>
    </div>
  `;const a=(await T(()=>import("./timeline-CkDPMunt.js"),[])).default,s=k(),n=m=>m[s]||m.en,r=["early","jesuit","mep","persecution","colonial","partition","communist","modern"],c={early:e("era.early"),jesuit:e("era.jesuit"),mep:e("era.mep"),persecution:e("era.persecution"),colonial:e("era.colonial"),partition:e("era.partition"),communist:e("era.communist"),modern:e("era.modern")},o=["all","missions","persecution","cultural","political","institutional"];let l="all";function h(m){let f=a;m!=="all"&&(f=a.filter(y=>y.category===m));let w="",$="";return f.forEach(y=>{y.era!==$&&($=y.era,w+=`
          <div class="timeline-era-divider" id="era-${$}">
            <h3>${c[$]||$}</h3>
          </div>
        `),w+=`
        <div class="timeline-event cat-${y.category}" data-year="${y.year}">
          <div class="event-year">${y.year}</div>
          <div class="event-title">${n(y.title)}</div>
          <div class="event-desc">${n(y.description)}</div>
          <div class="event-era">${c[y.era]||y.era}</div>
        </div>
      `}),w}t.innerHTML=`
    <div class="timeline-container">
      <div class="section-eyebrow" data-i18n="timeline.eyebrow">${e("timeline.eyebrow")}</div>
      <h1 data-i18n="timeline.page.title">${e("timeline.page.title")}</h1>
      <p class="section-subtitle" data-i18n="timeline.page.subtitle">${e("timeline.page.subtitle")}</p>

      <div class="timeline-era-filters" id="timeline-filters">
        ${o.map(m=>{const f=m==="all"?"timeline.filter.all":`timeline.filter.${m}`;return`<button data-cat="${m}" class="${m==="all"?"active":""}" data-i18n="${f}">${e(f)}</button>`}).join("")}
      </div>

      <div style="display: flex; gap: var(--space-sm); flex-wrap: wrap; margin-bottom: var(--space-xl);">
        ${r.map(m=>`<a href="#era-${m}" style="font-size: 12px; font-family: var(--font-mono); color: var(--accent-gold); padding: 4px 12px; border: 1px solid var(--border-default); border-radius: 9999px; text-decoration: none; transition: all 200ms ease;" onmouseover="this.style.borderColor='var(--accent-gold)'" onmouseout="this.style.borderColor='var(--border-default)'">${c[m]}</a>`).join("")}
      </div>

      <div class="timeline-vertical" id="timeline-events">
        ${h("all")}
      </div>
    </div>

    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-mission" data-i18n="footer.mission">${e("footer.mission")}</div>
        <div class="footer-links">
          <a href="#/about" data-i18n="footer.fc">${e("footer.fc")}</a>
        </div>
      </div>
      <div class="footer-tagline" data-i18n="footer.tagline">${e("footer.tagline")}</div>
    </footer>
  `;const p=document.getElementById("timeline-filters"),u=document.getElementById("timeline-events");p&&u&&p.addEventListener("click",m=>{const f=m.target.closest("button");f&&(l=f.dataset.cat||"all",p.querySelectorAll("button").forEach(w=>w.classList.remove("active")),f.classList.add("active"),u.innerHTML=h(l),d())});function d(){const m=new IntersectionObserver(f=>{f.forEach(w=>{w.isIntersecting&&w.target.classList.add("visible")})},{rootMargin:"0px 0px -50px 0px"});document.querySelectorAll(".timeline-event").forEach(f=>{m.observe(f)})}d();const b=window.location.hash.match(/\/timeline\/(\d+)/);if(b){const m=b[1];setTimeout(()=>{const f=document.querySelector(`[data-year="${m}"]`);f&&(f.scrollIntoView({behavior:"smooth",block:"center"}),f.classList.add("visible"))},100)}}let E=[],B=[];async function Q(){const t=document.getElementById("app");if(!t)return;B=await N();try{const o=sessionStorage.getItem("truyendao-chat");o&&(E=JSON.parse(o))}catch{E=[]}const i=[{key:"ask.starter.1",text:e("ask.starter.1")},{key:"ask.starter.2",text:e("ask.starter.2")},{key:"ask.starter.3",text:e("ask.starter.3")},{key:"ask.starter.4",text:e("ask.starter.4")},{key:"ask.starter.5",text:e("ask.starter.5")}];t.innerHTML=`
    <div class="chat-container">
      <div style="margin-bottom: var(--space-xl);">
        <div class="section-eyebrow" data-i18n="nav.research">${e("nav.research")}</div>
        <h1 data-i18n="ask.title">${e("ask.title")}</h1>
        <p class="section-subtitle" data-i18n="ask.subtitle">${e("ask.subtitle")}</p>
      </div>

      ${E.length===0?`
        <div class="chat-starters" id="chat-starters">
          ${i.map(o=>`<button class="chat-starter" data-i18n="${o.key}">${o.text}</button>`).join("")}
        </div>
      `:""}

      <div class="chat-messages" id="chat-messages">
        ${E.map(o=>D(o)).join("")}
      </div>

      <div class="chat-input-area">
        <textarea class="chat-input" id="chat-input" rows="1" data-i18n-placeholder="ask.placeholder" placeholder="${e("ask.placeholder")}"></textarea>
        <button class="chat-send" id="chat-send" data-i18n="ask.send">${e("ask.send")}</button>
      </div>
    </div>
  `;const a=document.getElementById("chat-messages"),s=document.getElementById("chat-input"),n=document.getElementById("chat-send"),r=document.getElementById("chat-starters");s.addEventListener("input",()=>{s.style.height="auto",s.style.height=Math.min(s.scrollHeight,120)+"px"}),s.addEventListener("keydown",o=>{o.key==="Enter"&&!o.shiftKey&&(o.preventDefault(),c())}),n.addEventListener("click",c),r&&r.addEventListener("click",o=>{const l=o.target.closest(".chat-starter");l&&(s.value=l.textContent||"",r.remove(),c())}),E.length>0&&(a.scrollTop=a.scrollHeight);async function c(){var p,u;const o=s.value.trim();if(!o)return;(p=document.getElementById("chat-starters"))==null||p.remove();const l={role:"user",content:o};E.push(l),a.innerHTML+=D(l),s.value="",s.style.height="auto";const h="thinking-"+Date.now();a.innerHTML+=`
      <div class="chat-message assistant" id="${h}">
        <p style="color: var(--text-tertiary); font-style: italic;" data-i18n="ask.thinking">${e("ask.thinking")}</p>
      </div>
    `,a.scrollTop=a.scrollHeight;try{const d=K(o),g=await fetch("/api/ask",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:o,context:d,history:E.slice(-6).map($=>({role:$.role,content:$.content})),lang:k()})}),b=document.getElementById(h);if(!g.ok){const $=O(o,d);b&&(b.innerHTML=`<p>${$.content}</p>`+($.sources.length>0?`
              <div class="chat-sources">
                ${$.sources.map(L=>`<a href="#/research/${L}">Report ${L}</a>`).join("")}
              </div>
            `:""));const y={role:"assistant",content:$.content,sources:$.sources};E.push(y),S();return}const m=(u=g.body)==null?void 0:u.getReader(),f=new TextDecoder;let w="";if(m&&b){b.innerHTML="<p></p>";const $=b.querySelector("p");for(;;){const{done:C,value:W}=await m.read();if(C)break;w+=f.decode(W,{stream:!0}),$.innerHTML=J(w),a.scrollTop=a.scrollHeight}const y=pe(w);y.length>0&&(b.innerHTML+=`
            <div class="chat-sources">
              ${y.map(C=>`<a href="#/research/${C}">Report ${C}</a>`).join("")}
            </div>
          `);const L={role:"assistant",content:w,sources:y};E.push(L),S()}}catch{K(o);const d=O(o),g=document.getElementById(h);g&&(g.innerHTML=`<p>${d.content}</p>`+(d.sources.length>0?`
            <div class="chat-sources">
              ${d.sources.map(m=>`<a href="#/research/${m}">Report ${m}</a>`).join("")}
            </div>
          `:""));const b={role:"assistant",content:d.content,sources:d.sources};E.push(b),S()}}}function D(t){return`
    <div class="chat-message ${t.role}">
      <p>${t.role==="assistant"?J(t.content):ue(t.content)}</p>
      ${t.sources&&t.sources.length>0?`
        <div class="chat-sources">
          ${t.sources.map(i=>`<a href="#/research/${i}">Report ${i}</a>`).join("")}
        </div>
      `:""}
    </div>
  `}function J(t){return t.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>").replace(/\n\n/g,"</p><p>").replace(/\n/g,"<br>")}function ue(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function K(t){const i=t.toLowerCase(),a=B.map(n=>{const r=(v(n.title)+" "+v(n.summary)+" "+n.sections.map(l=>v(l.heading)).join(" ")).toLowerCase(),o=i.split(/\s+/).reduce((l,h)=>l+(r.includes(h)?1:0),0);return{report:n,score:o}});return a.sort((n,r)=>r.score-n.score),a.slice(0,3).filter(n=>n.score>0).map(({report:n})=>{const r=v(n.title),c=v(n.summary),o=n.sections.map(l=>`### ${v(l.heading)}
${v(l.content).substring(0,500)}`).join(`

`);return`## Report ${n.id}: ${r}
${c}

${o}`}).join(`

---

`)}function O(t,i){const a=t.toLowerCase(),s=[{pattern:/ch\u1eef\s*qu\u1ed1c\s*ng\u1eef|alphabet|script|writing|romaniz/i,reportIds:["01","07"],response:"Chữ Quốc ngữ is the romanized writing system used by over 100 million Vietnamese today. It was developed by Portuguese and Italian Jesuit missionaries, notably Francisco de Pina and Alexandre de Rhodes, in the early 17th century as a tool for evangelization. De Rhodes published the first dictionary (*Dictionarium Annamiticum Lusitanum et Latinum*) in Rome in 1651. The system was later adopted by French colonial authorities and, ironically, promoted by the Vietnamese Communist government after independence. Vietnam is the only Asian country whose modern national script was created by Christian missionaries. See Reports 01 and 07 for the full story."},{pattern:/martyr|117|t\u1eed\s*\u0111\u1ea1o|canon/i,reportIds:["01","08"],response:"The 117 Vietnamese Martyrs were canonized by Pope John Paul II on June 19, 1988. They represent the largest single-country group canonization in Catholic Church history. These saints were killed during the great persecutions of the 19th century under emperors Minh Mạng (r. 1820-1841), Thiệu Trị (r. 1841-1847), and Tự Đức (r. 1847-1883). Among them were 96 Vietnamese, 11 Spanish, and 10 French members of the church — including bishops, priests, catechists, and lay people. An estimated 100,000-300,000 Christians were killed during this period. See Reports 01 and 08 for detailed coverage."},{pattern:/hmong|montagnard|highland|ethnic|minority|t\u00e2y\s*nguy\u00ean/i,reportIds:["08","03"],response:"The conversion of Hmong and Montagnard (Degar) peoples in Vietnam's Central Highlands represents one of the most dramatic church growth stories in contemporary Asia. Since the 1990s, Protestant Christianity has spread rapidly among these ethnic minorities, partly through radio broadcasts and kinship networks. The Vietnamese government has responded with a mix of repression and registration, particularly after the 2001 and 2004 protests. Estimates suggest hundreds of thousands of Hmong and Montagnard Christians today, though exact numbers are difficult to verify due to government restrictions on research access. See Reports 08 and 03."},{pattern:/ancestor|worship|th\u1edd|c\u00fang|barrier|conversion/i,reportIds:["07","08"],response:'Ancestor veneration is the deepest cultural practice in Vietnamese society, present across Buddhist, Confucian, and folk religious contexts. Every conversion to Christianity involves negotiating this tension. Vietnamese theologians are actively developing inculturation responses — some argue for a distinction between "worship" (thờ) and "reverence" (kính), allowing Christians to honor ancestors without the ritual elements that contradict monotheism. The Rites Controversy of the 17th-18th century between Jesuits and Dominicans/Franciscans in Asia centered on exactly this issue. See Reports 07 and 08.'}];for(const r of s)if(r.pattern.test(a))return{content:r.response,sources:r.reportIds};const n=B.map(r=>{const c=(v(r.title)+" "+v(r.summary)).toLowerCase(),l=a.split(/\s+/).reduce((h,p)=>h+(c.includes(p)?1:0),0);return{report:r,score:l}}).filter(r=>r.score>0).sort((r,c)=>c.score-r.score).slice(0,2);return n.length>0?{content:`Based on our research archive, here are the most relevant reports for your question:

${n.map(({report:c})=>`**Report ${c.id}: ${v(c.title)}** — ${v(c.summary).substring(0,200)}...`).join(`

`)}

Click the report links below to read the full analysis.`,sources:n.map(c=>c.report.id)}:{content:"I don't have specific information on that topic in our 12 research reports. Try asking about Vietnamese Christian history, the chữ Quốc ngữ script, the 117 Martyrs, ethnic minority Christianity, ancestor worship, or diaspora student ministry.",sources:[]}}function pe(t){const i=t.match(/Report\s+(\d{1,2})/gi)||[],a=new Set;return i.forEach(s=>{const n=s.replace(/Report\s+/i,"").padStart(2,"0");parseInt(n)>=1&&parseInt(n)<=12&&a.add(n)}),Array.from(a)}function S(){try{sessionStorage.setItem("truyendao-chat",JSON.stringify(E.slice(-20)))}catch{}}function ve(){const t=document.getElementById("app");if(!t)return;const i=[{title:{en:"Ask the Archive",vi:"Hỏi Kho Tư Liệu"},desc:{en:"AI-powered Q&A grounded in 12 research reports on Vietnamese Christianity.",vi:"Hỏi đáp AI dựa trên 12 báo cáo nghiên cứu về Kitô giáo Việt Nam."},href:"#/research/ask",accent:"gold"},{title:{en:"Animated Spread Map",vi:"Bản đồ lan tỏa động"},desc:{en:"Watch Christianity grow through accommodation — from coastal missions to Central Highlands.",vi:"Xem Kitô giáo phát triển qua sự hòa hợp — từ các cứ điểm ven biển đến Tây Nguyên."},href:"#/research/map",accent:"cinnabar"},{title:{en:"Interactive Timeline",vi:"Dòng thời gian tương tác"},desc:{en:"493 years from first Portuguese contact to today's 8-10 million believers.",vi:"493 năm từ lần tiếp xúc đầu tiên của người Bồ Đào Nha đến 8-10 triệu tín hữu ngày nay."},href:"#/research/timeline",accent:"gold"},{title:{en:"Returnee Preparation",vi:"Chuẩn bị cho người trở về"},desc:{en:"Personalized 90-day return kit for Vietnamese students navigating church in Vietnam.",vi:"Bộ chuẩn bị 90 ngày cho sinh viên Việt Nam tìm nhà thờ khi trở về."},href:"#/tools/returnee",accent:"cinnabar"},{title:{en:"Volunteer Training",vi:"Đào tạo tình nguyện viên"},desc:{en:"5 modules for anyone serving Vietnamese students and returnees.",vi:"5 mô-đun dành cho mọi người phục vụ sinh viên và người trở về Việt Nam."},href:"#/tools/training",accent:"gold"}],a=localStorage.getItem("truyendao-lang")||"en",s=n=>n[a]||n.en;t.innerHTML=`
    <div class="section" style="padding-top: calc(64px + var(--space-2xl));">
      <div class="section-eyebrow" data-i18n="nav.tools">${e("nav.tools")}</div>
      <h1 data-i18n="tools.title">${e("tools.title")}</h1>
      <p class="section-subtitle" data-i18n="tools.subtitle">${e("tools.subtitle")}</p>
      <div class="gold-divider"></div>
      <div class="report-grid">
        ${i.map(n=>`
          <a href="${n.href}" class="lacquer-card" style="text-decoration: none;">
            <div class="card-title">${s(n.title)}</div>
            <div class="card-desc">${s(n.desc)}</div>
          </a>
        `).join("")}
      </div>
    </div>
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-mission" data-i18n="footer.mission">${e("footer.mission")}</div>
        <div class="footer-links">
          <a href="#/about" data-i18n="footer.fc">${e("footer.fc")}</a>
        </div>
      </div>
      <div class="footer-tagline" data-i18n="footer.tagline">${e("footer.tagline")}</div>
    </footer>
  `}function me(){const t=document.getElementById("app");t&&(t.innerHTML=`
    <div class="section" style="padding-top: calc(64px + var(--space-2xl));">
      <div class="section-eyebrow" data-i18n="nav.heritage">${e("nav.heritage")}</div>
      <h1 data-i18n="heritage.title">${e("heritage.title")}</h1>
      <p class="section-subtitle" data-i18n="heritage.subtitle">${e("heritage.subtitle")}</p>
      <div class="gold-divider"></div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-lg);">
        <div class="lacquer-card featured" style="border-top: 3px solid var(--accent-cinnabar);">
          <div class="card-number" style="color: var(--accent-cinnabar);">I</div>
          <div class="card-title" style="font-size: 28px; margin-bottom: var(--space-md);">The 117 Saints</div>
          <div class="card-desc" style="font-size: 16px; line-height: 1.6;">The largest single-country group canonization in Catholic history. Walk through the persecution eras of Minh Mạng, Thiệu Trị, and Tự Đức. Discover the stories of courage that earned 117 Vietnamese, Spanish, and French believers their place among the saints.</div>
          <div style="margin-top: var(--space-lg);">
            <span class="btn-cinnabar" style="opacity: 0.5; cursor: default;">Coming in Phase 2</span>
          </div>
        </div>
        <div class="lacquer-card featured" style="border-top: 3px solid var(--accent-gold);">
          <div class="card-number">II</div>
          <div class="card-title" style="font-size: 28px; margin-bottom: var(--space-md);">The Gift of Letters</div>
          <div class="card-desc" style="font-size: 16px; line-height: 1.6;">How Jesuit missionaries invented the Vietnamese alphabet. Follow the journey from Francisco de Pina's linguistic genius through Alexandre de Rhodes' dictionary to 100 million people writing in a missionary-created script. The communists promoted it. The world forgot who made it.</div>
          <div style="margin-top: var(--space-lg);">
            <span class="btn-gold-ghost" style="opacity: 0.5; cursor: default;">Coming in Phase 2</span>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-mission" data-i18n="footer.mission">${e("footer.mission")}</div>
        <div class="footer-links">
          <a href="#/about" data-i18n="footer.fc">${e("footer.fc")}</a>
        </div>
      </div>
      <div class="footer-tagline" data-i18n="footer.tagline">${e("footer.tagline")}</div>
    </footer>
  `)}function ge(){const t=document.getElementById("app");if(!t)return;const i=[{name:"Alexandre de Rhodes",dates:"1591–1660",desc:"Jesuit missionary, creator of chữ Quốc ngữ dictionary",era:"Missionary Pioneers"},{name:"Nguyễn Văn Thuận",dates:"1928–2002",desc:"Cardinal, 13 years imprisoned for faith",era:"Modern Voices"},{name:"Andrew of Phú Yên",dates:"1625–1644",desc:"First Vietnamese martyr, killed at age 19",era:"Vietnamese Saints"},{name:"Trần Lục",dates:"1825–1899",desc:"Builder of Phát Diệm Cathedral",era:"Vietnamese Saints"},{name:"Robert Jaffray",dates:"1873–1945",desc:"CMA pioneer, brought Protestantism to Vietnam",era:"Missionary Pioneers"},{name:"Hmong Elder",dates:"Composite voice",desc:"Representing the Central Highlands conversion story",era:"Modern Voices"}];t.innerHTML=`
    <div class="section" style="padding-top: calc(64px + var(--space-2xl));">
      <div class="section-eyebrow" data-i18n="nav.personas">${e("nav.personas")}</div>
      <h1 data-i18n="personas.title">${e("personas.title")}</h1>
      <p class="section-subtitle" data-i18n="personas.subtitle">${e("personas.subtitle")}</p>
      <div class="gold-divider"></div>
      <div class="report-grid">
        ${i.map(a=>`
          <div class="lacquer-card">
            <div class="card-number">${a.era}</div>
            <div class="card-title">${a.name}</div>
            <div style="font-family: var(--font-mono); font-size: 12px; color: var(--text-tertiary); margin-bottom: var(--space-sm);">${a.dates}</div>
            <div class="card-desc">${a.desc}</div>
            <div style="margin-top: var(--space-md);">
              <span class="btn-gold-ghost" style="opacity: 0.5; cursor: default; font-size: 12px; padding: 6px 12px;">Coming in Phase 3</span>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-mission" data-i18n="footer.mission">${e("footer.mission")}</div>
        <div class="footer-links">
          <a href="#/about" data-i18n="footer.fc">${e("footer.fc")}</a>
        </div>
      </div>
      <div class="footer-tagline" data-i18n="footer.tagline">${e("footer.tagline")}</div>
    </footer>
  `}function fe(){const t=document.getElementById("app");t&&(t.innerHTML=`
    <div class="section" style="padding-top: calc(64px + var(--space-2xl));">
      <h1 data-i18n="about.title">${e("about.title")}</h1>
      <div class="gold-divider"></div>
      <div style="max-width: 700px;">
        <p style="font-size: 18px; line-height: 1.75; color: var(--text-secondary); margin-bottom: var(--space-lg);" data-i18n="about.p1">${e("about.p1")}</p>
        <p style="font-size: 16px; line-height: 1.75; color: var(--text-secondary); margin-bottom: var(--space-lg);" data-i18n="about.p2">${e("about.p2")}</p>
        <p style="font-size: 16px; line-height: 1.75; color: var(--text-secondary);" data-i18n="about.p3">${e("about.p3")}</p>
      </div>
    </div>

    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-mission" data-i18n="footer.mission">${e("footer.mission")}</div>
        <div class="footer-links">
          <a href="#/about" data-i18n="footer.fc">${e("footer.fc")}</a>
          <a href="#" data-i18n="footer.github">${e("footer.github")}</a>
        </div>
      </div>
      <div class="footer-tagline" data-i18n="footer.tagline">${e("footer.tagline")}</div>
    </footer>
  `)}let I=null;async function ye(){if(I)return I;const t=await N(),i=new Map,a=new Map,s=[];t.forEach((r,c)=>{const o=[v(r.title),v(r.summary),...r.sections.map(d=>v(d.heading)+" "+v(d.content))].join(" ").toLowerCase(),l=j(o),h=new Map,p=new Set;l.forEach(d=>{h.set(d,(h.get(d)||0)+1),p.has(d)||(a.set(d,(a.get(d)||0)+1),p.add(d))});const u=l.length||1;h.forEach((d,g)=>h.set(g,d/u)),s.push(h)});const n=t.length;return t.forEach((r,c)=>{s[c].forEach((l,h)=>{const p=a.get(h)||1,u=Math.log(n/p),d=l*u;i.has(h)||i.set(h,new Map),i.get(h).set(r.id,d)})}),I={reports:t,tfidf:i},I}function j(t){return t.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu," ").split(/\s+/).filter(i=>i.length>1)}async function be(t){const i=await ye(),a=j(t.toLowerCase());if(a.length===0)return[];const s=new Map;a.forEach(r=>{const c=i.tfidf.get(r);c&&c.forEach((o,l)=>{s.set(l,(s.get(l)||0)+o)}),i.tfidf.forEach((o,l)=>{l.includes(r)&&l!==r&&o.forEach((h,p)=>{s.set(p,(s.get(p)||0)+h*.5)})})});const n=[];return s.forEach((r,c)=>{const o=i.reports.find(l=>l.id===c);if(o&&r>0){const l=$e(o,a);n.push({report:o,score:r,excerpt:l})}}),n.sort((r,c)=>c.score-r.score),n.slice(0,10)}function $e(t,i){const a=t.sections.map(n=>v(n.content)).join(" "),s=a.toLowerCase();for(const n of i){const r=s.indexOf(n);if(r>=0){const c=Math.max(0,r-60),o=Math.min(a.length,r+n.length+100);let l=a.substring(c,o).trim();return c>0&&(l="..."+l),o<a.length&&(l+="..."),l}}return v(t.summary).substring(0,160)+"..."}function we(){const t=document.getElementById("search-modal"),i=t==null?void 0:t.querySelector(".search-input"),a=document.getElementById("search-results");if(!i||!a)return;let s;i.addEventListener("input",()=>{clearTimeout(s),s=window.setTimeout(async()=>{const n=i.value.trim();if(!n){a.innerHTML="";return}const r=await be(n);a.innerHTML=r.map(c=>`
        <a href="#/research/${c.report.id}" class="search-result-item" onclick="document.getElementById('search-modal').classList.remove('open')">
          <div class="title">Report ${c.report.id}: ${v(c.report.title)}</div>
          <div class="excerpt">${Te(c.excerpt,j(n))}</div>
        </a>
      `).join(""),r.length===0&&(a.innerHTML=`<div style="padding: 16px 24px; color: var(--text-tertiary);" data-i18n="search.no_results">${e("search.no_results")}</div>`)},200)})}function Te(t,i){let a=t;return i.forEach(s=>{const n=new RegExp(`(${s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"gi");a=a.replace(n,'<mark style="background: var(--accent-gold-subtle); color: var(--text-primary); padding: 0 2px;">$1</mark>')}),a}x("/",ae);x("/research",ce);x("/research/timeline",he);x("/research/ask",Q);x("/research/:id",le);x("/tools",ve);x("/tools/ask",Q);x("/heritage",me);x("/personas",ge);x("/about",fe);ne();we();
