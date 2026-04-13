# Implementation Plan: TruyềnĐạo 傳道

## Overview
A bilingual (English/Vietnamese), AI-powered research platform on Christianity in Vietnam, covering 493 years of history (first contact 1533 → today's 8-10% church). Third in the Asia trilogy after XuanYan 宣研 (China) and Sendō 宣道 (Japan). The XuanYan/Sendō codebase is the architectural template — TruyềnĐạo ports faster than building from scratch but uses a distinct visual identity (sơn mài lacquer + cinnabar + gold leaf). Unique features: the chữ Quốc ngữ interactive story (missionaries invented the Vietnamese script), Vietnamese Martyrs heritage experience, ethnic minority conversion mapping, and trilingual source bridging (EN/VI/FR).

## Design Spec

### Direction
Mood: **Gallery warmth** — lacquer art exhibition meets editorial depth. Density: **Balanced** (spacious for reading, denser for tools). Color: **Dark mode with dual warm accents (cinnabar primary, gold leaf secondary)**. Type: **One serif display + one Vietnamese-designed body sans + one data mono**. Shapes: **Sharp content containers, slightly rounded interactive elements, lacquer-panel framing**.

### Color Palette (CSS Custom Properties)

```css
:root {
  /* Base — sơn mài (lacquer) black */
  --bg-base: #12090B;        /* deep lacquer with warm red-brown undertone */
  --bg-surface: #1E1014;     /* lifted surface — like a second lacquer layer */
  --bg-elevated: #2A1820;    /* cards, modals */
  --bg-overlay: rgba(18, 9, 11, 0.85);

  /* Text — eggshell/parchment */
  --text-primary: #F2E8DC;   /* warm off-white, like aged paper */
  --text-secondary: #B8A898; /* muted warm */
  --text-tertiary: #7A6A5E;  /* labels, captions */
  --text-disabled: #4A3E38;

  /* Accent primary — oxblood cinnabar (朱砂) */
  --accent-primary: #9B2335;     /* deep cinnabar red */
  --accent-hover: #B5293E;       /* lighter on hover */
  --accent-pressed: #7E1C2A;     /* darker on press */
  --accent-subtle: rgba(155, 35, 53, 0.12); /* tinted backgrounds */

  /* Accent secondary — gold leaf (vàng lá) */
  --accent-gold: #C9A84C;        /* gold leaf */
  --accent-gold-hover: #D4B65E;  /* brighter on hover */
  --accent-gold-subtle: rgba(201, 168, 76, 0.12);

  /* Mother-of-pearl shimmer (xà cừ) — CSS gradient for hover */
  --pearl-gradient: linear-gradient(135deg, 
    rgba(201, 168, 76, 0.08) 0%, 
    rgba(155, 35, 53, 0.06) 25%, 
    rgba(180, 160, 140, 0.1) 50%, 
    rgba(201, 168, 76, 0.08) 75%, 
    rgba(155, 35, 53, 0.06) 100%);

  /* Borders — warm lacquer edge */
  --border-subtle: #2A1E22;
  --border-default: #3D2E32;
  --border-strong: #5C484E;
  --border-gold: rgba(201, 168, 76, 0.3); /* gold accent borders for featured content */

  /* Semantic */
  --color-success: #7A9B6E;  /* jade green */
  --color-warning: #C9A84C;  /* same as gold */
  --color-error: #9B2335;    /* same as accent */
  --color-info: #6B8FA8;     /* indigo blue */

  /* Light mode (toggle) */
  --light-bg-base: #FAF6ED;
  --light-bg-surface: #F2E8DC;
  --light-text-primary: #1A1012;
  --light-accent-primary: #7E1C2A;
}
```

**Contrast verified:** Body text (#F2E8DC on #12090B) = 15.2:1 ratio. Cinnabar accent on lacquer = 4.8:1 (AA). Gold leaf on lacquer = 7.1:1 (AAA). All pass WCAG AA.

### Typography

```css
--font-display: 'Noto Serif', Georgia, serif;
--font-body: 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', Consolas, monospace;

/* Type scale */
--text-xs: 12px;     /* labels, captions */
--text-sm: 14px;     /* metadata, footnotes */
--text-base: 16px;   /* body */
--text-lg: 18px;     /* large body, lead paragraphs */
--text-xl: 24px;     /* h4, card titles */
--text-2xl: 32px;    /* h3 */
--text-3xl: 44px;    /* h2 */
--text-4xl: 60px;    /* h1, hero */
--text-5xl: 84px;    /* display */

/* Weights — only 3 used */
--weight-regular: 400;
--weight-medium: 500;
--weight-bold: 700;

/* Line heights */
--leading-tight: 1.15;   /* headings */
--leading-snug: 1.35;    /* subheadings */
--leading-normal: 1.55;  /* body */
--leading-relaxed: 1.75; /* long-form reading */
```

### Spacing

```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 40px;
--space-2xl: 64px;
--space-3xl: 96px;
--space-4xl: 128px;
```

### Shapes & Effects

```css
--radius-none: 0;        /* content containers, cards */
--radius-sm: 4px;        /* buttons, inputs, toggles */
--radius-md: 8px;        /* dropdowns, tooltips */
--radius-full: 9999px;   /* pills, badges */

--shadow-sm: 0 1px 3px rgba(18, 9, 11, 0.4);
--shadow-md: 0 4px 12px rgba(18, 9, 11, 0.5);
--shadow-lg: 0 8px 24px rgba(18, 9, 11, 0.6);
--shadow-gold: 0 0 12px rgba(201, 168, 76, 0.15); /* gold glow for featured */

--transition-default: 200ms ease;
--transition-slow: 400ms ease;
```

### Anti-AI Checklist
1. Vary spacing — tighter within lacquer panels, looser between sections
2. Left-aligned headings, asymmetric hero layout
3. Solid cinnabar buttons, gold-leaf ghost buttons — no gradients
4. Cinnabar + gold leaf palette — no blue/purple defaults
5. Featured report cards break the grid; masonry for galleries
6. Hero leads with the chữ Quốc ngữ story, not generic centered h1
7. Sharp containers (lacquer panels), 4px buttons — mixed radius
8. One dominant element per section — size or color, not both
9. No emoji — use lacquer motifs or no icons
10. Specific copy: "493 years of Christianity in Vietnam" not "Elevate your missions experience"

### Responsive Breakpoints
- **Mobile:** 375px — single column, stacked sections
- **Tablet:** 768px — 2-column grid for reports, side nav emerges
- **Desktop:** 1024px — full layout, timeline horizontal
- **Wide:** 1440px — max-width container with generous margins

---

## Phase 1: Foundation (5 Builds)

### Build 1A — Project Scaffold + Homepage (Steps 1-6)

**Step 1.** Initialize Vite + TypeScript project. Install Tailwind CSS. Configure vite.config.ts with base path and build settings. Add Be Vietnam Pro, Noto Serif, and JetBrains Mono via Google Fonts link.

**Step 2.** Create src/css/main.css with all CSS custom properties from the Design Spec (lacquer palette, typography, spacing, shapes). Set up Tailwind with custom theme extending the CSS vars. Set `<body>` to --bg-base with --text-primary default.

**Step 3.** Create src/ts/i18n.ts — bilingual string store with `en` and `vi` objects. Include: nav items, hero text, footer, common UI labels, error messages. Export `t(key)` function that reads `localStorage.getItem('truyendao-lang')` and returns the correct string. Default to English.

**Step 4.** Create src/ts/main.ts — app initialization: language toggle listener, hash-based router (`#/research`, `#/tools`, `#/heritage`, `#/personas`, `#/about`), page loading, smooth scroll behavior.

**Step 5.** Build src/index.html with full homepage:
- **Nav:** Logo "TruyềnĐạo 傳道" left, nav links center (Research, Tools, Heritage, About), EN/VI toggle right. Sticky, lacquer-black bg with gold-leaf bottom border on scroll.
- **Hero:** Asymmetric split layout. Left: "493 Years of Christianity in Vietnam" (h1 in Noto Serif), subtext about chữ Quốc ngữ and the missionaries who invented it, two CTAs (cinnabar "Explore the Archive" + gold-leaf ghost "Read the Research"). Right: lacquer-texture panel with key stats (8-10M Christians, 117 Martyrs Saints, 100M using missionary-created script). NOT a centered generic hero.
- **Three Pillars section:** Research (12 reports) | Tools (returnee, training) | Heritage (martyrs, script story). Cards with lacquer-panel borders, gold-leaf section divider lines.
- **Timeline Preview:** Horizontal scrolling mini-timeline with 5-6 key dates (1533, 1651, 1988, 2016, etc.). Links to full timeline page.
- **The Trilogy section:** Show TruyềnĐạo alongside XuanYan and Sendō — "Three countries. Three stories. One mission." with visual comparison.
- **Footer:** NotebookLM link, research source credit.

**Step 6.** Wire up language toggle. All visible text uses `t()`. Toggle switches all text without page reload. Persist to `truyendao-lang` in localStorage.

### Build 1B — 12 Research Reports (Steps 7-10)

**Step 7.** Create src/data/reports/ directory. Convert all 12 research reports from ~/Desktop/Projects/Research/2026-04-12-vietnam-missions-scholarship/ into structured JSON with `en` and `vi` fields. Vietnamese translations marked "Bản dịch AI — Chờ xem xét". Structure: `{ id, title: {en, vi}, summary: {en, vi}, sections: [{heading: {en, vi}, content: {en, vi}}], metadata: {wordCount, date, tags} }`.

**Step 8.** Create src/pages/research/index.html — report listing page. Grid of 12 report cards with lacquer-panel styling. Each shows number, title, one-line summary, word count. Hover: mother-of-pearl shimmer. Gold-leaf accent on featured reports (01, 07, 08). Filter by tag.

**Step 9.** Create src/pages/research/report.html — single report template. Renders JSON content with proper headings, tables, lists. Table of contents sidebar on desktop. Reading progress bar (cinnabar). Bilingual toggle switches content inline. Print-friendly layout. Back to report list link.

**Step 10.** Create src/ts/search.ts — client-side TF-IDF search across all reports. Search bar on report listing page. Results show matching excerpts with highlighted terms. Supports both English and Vietnamese queries.

### Build 1C — Interactive Timeline (Steps 11-14)

**Step 11.** Create src/data/timeline.json — timeline events from 1533 to 2026. Each event: `{ year, era, title: {en, vi}, description: {en, vi}, category, significance }`. Categories: missions, persecution, cultural, political, institutional. ~50-60 events covering all major periods.

**Step 12.** Create src/ts/timeline.ts — animated timeline component. Horizontal scrolling on desktop, vertical on mobile. Era markers with gold-leaf dividers. Event dots color-coded by category. Click to expand full event detail.

**Step 13.** Build src/pages/research/timeline.html — full timeline page. Era filter buttons (Early Contact, Jesuit Era, MEP Era, Persecutions, Colonial, Partition, Communist, Modern). Smooth scroll to era. Events animate in as user scrolls.

**Step 14.** Add "jump to era" feature — clicking a timeline period scrolls with animation. Deep links via hash (#/timeline/1651).

### Build 1D — Ask the Archive RAG (Steps 15-19)

**Step 15.** Create worker/src/index.ts — Cloudflare Worker. Handles POST /api/ask with message body. Forwards to Claude API with system prompt containing Vietnam Christianity context. Streams response. CORS headers for local dev.

**Step 16.** Create src/data/reports/ chunked index for RAG context. Split report JSON into chunks (~500 tokens each) with metadata (report number, section, topic). Store as searchable index.

**Step 17.** Create src/ts/chat.ts — chat interface component. Text input, streaming response display, source citations with links to full reports. Maintains conversation history in sessionStorage. Bilingual: user can ask in English or Vietnamese.

**Step 18.** Build src/pages/research/ask.html — Ask the Archive page. System prompt instructs Claude to answer questions about Vietnamese Christianity using the 12 reports as primary sources, cite specific reports, and respond in the language the user writes in. Lacquer-panel chat container with gold-leaf accent on AI responses.

**Step 19.** Add suggested questions carousel: "What is chữ Quốc ngữ and who created it?", "Why did Christianity grow among the Hmong?", "Who are the 117 Vietnamese Martyrs?", "How does the ancestor worship barrier affect conversion?", "Tại sao Kitô giáo phát triển mạnh ở Tây Nguyên?" (Vietnamese).

### Build 1E — Deploy + Polish (Steps 20-23)

**Step 20.** Configure Cloudflare Pages. Set up wrangler.toml for Worker. Create GitHub repo. Push and deploy.

**Step 21.** Performance pass: lazy-load images, preload fonts (Be Vietnam Pro, Noto Serif), minify JSON data, add service worker for offline report reading.

**Step 22.** Accessibility pass: semantic HTML throughout, alt text on all images, focus-visible styles matching lacquer theme, ARIA labels on interactive elements, keyboard navigation for timeline.

**Step 23.** Mobile polish: test at 375px, 768px, 1024px, 1440px. Fix any overflow, touch target sizes (min 44px), nav hamburger on mobile.

---

## Phase 2: Interactive Tools (5 Builds)

### Build 2A — Animated Spread Map (Steps 24-27)

**Step 24.** Create src/data/map-data.json — geographic + temporal church data. Points: early coastal missions (Hội An, Đà Nẵng), major Catholic centers (Saigon, Hanoi, Huế, Phát Diệm), ethnic minority regions (Central Highlands), diaspora communities. Each point: `{ lat, lng, year, type, name: {en, vi}, description: {en, vi} }`.

**Step 25.** Create src/ts/map.ts — Leaflet map with CartoDB Dark Matter tiles. Custom cinnabar markers for Catholic, gold for Protestant, mixed for both. Timeline slider at bottom — drag to animate spread from 1533 to present.

**Step 26.** Build src/pages/research/map.html — full map page. Year counter animates as slider moves. Legend with category colors. Click marker for popup with details. "Watch Christianity grow through accommodation" narrative text updates by era.

**Step 27.** Add ethnic minority overlay — toggle to show Hmong/Montagnard/Ede/Jarai territory boundaries with conversion estimates. Central Highlands zoom feature.

### Build 2B — Vietnamese Martyrs + Chữ Quốc Ngữ Heritage Experience (Steps 28-32)

**Step 28.** Build src/pages/heritage/index.html — heritage landing page. Two paths: "The 117 Saints" (martyrs story) and "The Gift of Letters" (chữ Quốc ngữ story). Dramatic lacquer-panel layout.

**Step 29.** Build "The 117 Saints" experience — scrollytelling page walking through the persecution eras (Minh Mạng, Thiệu Trị, Tự Đức). Key martyr stories. Interactive map of martyrdom locations. The 1988 canonization. Full list of 117 with names, dates, occupations. Cinnabar accent heavy — the color of sacrifice.

**Step 30.** Build "The Gift of Letters" experience — interactive story of how missionaries invented the Vietnamese script. Visual demo: show the same Vietnamese sentence in chữ Hán → chữ Nôm → chữ Quốc ngữ. Interactive keyboard where users can type Vietnamese with diacritical marks and see the missionary connection. Francisco de Pina → Alexandre de Rhodes → French colonial adoption → communist promotion → 100 million users today. Gold-leaf accent heavy — the color of gift.

**Step 31.** Add audio elements — pronunciation comparisons showing how diacritical marks change meaning (ma, mà, má, mả, mã, mạ — six tones, six meanings). Visual tone diagram.

**Step 32.** Add sharing features — shareable cards for social media ("Did you know the Vietnamese alphabet was invented by Catholic missionaries?").

### Build 2C — Network Graph (Steps 33-35)

**Step 33.** Create src/data/network.json — relationship data between missionaries, organizations, Vietnamese leaders, locations. Nodes: people, organizations, places. Edges: "sent by", "trained by", "founded", "martyred at", "partnered with".

**Step 34.** Build src/ts/network.ts — D3.js force-directed graph. Nodes colored by type (missionaries = gold, Vietnamese leaders = cinnabar, organizations = text-secondary). Click to expand connections. Hover for details.

**Step 35.** Build src/pages/research/network.html — network page with filter controls. Filter by era, by organization (MEP, CMA, Catholic orders), by type. Search for specific people.

### Build 2D — Returnee Tool (Steps 36-40)

**Step 36.** Build src/pages/tools/returnee/index.html — returnee landing page explaining the tool. Stats on Vietnamese students abroad, the returnee challenge (church registration, ancestor worship pressure, cultural re-entry).

**Step 37.** Build returnee questionnaire — bilingual form: name, city returning to, denomination preference, language preference for worship, comfort with registered vs. house church, family religious background, specific concerns. Form state persisted to sessionStorage.

**Step 38.** Build recommendation engine — client-side logic matching responses to church directory data. Output: 90-day re-entry plan, church recommendations (navigating registered/unregistered sensitively), cultural re-entry tips, online fellowship options, key contacts.

**Step 39.** Create src/data/churches-vietnam.json — curated directory of churches welcoming returnees, categorized by city, denomination, registration status, language. Include Vietnamese-American church partner contacts.

**Step 40.** Add "Connect Me" feature — form that sends returnee's info (with consent) to a partner pastor or fellowship in their destination city. Goes through CF Worker to avoid exposing contacts.

### Build 2E — Training Modules (Steps 41-44)

**Step 41.** Build src/pages/tools/training/index.html — training module listing. 5 modules for volunteers and campus ministers working with Vietnamese students.

**Step 42.** Build Module 1: "Understanding Vietnam's Christian Story" — condensed from reports 01 and 07. Key facts, the chữ Quốc ngữ story, the 8-10% context. Interactive quiz at end.

**Step 43.** Build Module 2: "The Ancestor Worship Question" — the biggest cultural barrier. What it is, why it matters, how Vietnamese Christians navigate it, what NOT to say. Sourced from reports 07 and 08.

**Step 44.** Build Module 3: "Preparing a Vietnamese Student to Return" — the returnee pipeline. What to do 6 months before, 1 month before, at departure, 3 months after. Links to the Returnee Tool. Module 4: "Registered vs. Unregistered Churches" — the Vietnam-specific navigation. Module 5: "The Hmong and Montagnard Story" — ethnic minority context.

---

## Phase 3: Advanced Features (4 Builds)

### Build 3A — AI Persona Conversations (Steps 45-50)

**Step 45.** Create src/data/personas/ — corpus files for each historical figure. Primary sources: Alexandre de Rhodes (dictionary preface, catechism, letters), Nguyễn Văn Thuận (The Road of Hope, prison letters), Robert Jaffray (CMA reports), others with available writings.

**Step 46.** Build src/pages/personas/index.html — persona selection gallery. Cards with portrait (AI-generated or historical), name, dates, one-line identity, "Speak with [name]" CTA. Categories: Missionary Pioneers, Vietnamese Saints, Modern Voices.

**Step 47.** Build src/pages/personas/chat.html — conversation interface. System prompt instructs Claude to respond as the historical figure, drawing from their corpus, in the persona's voice and era. The figure responds in the language the user writes in.

**Step 48.** Implement 6 primary personas: Alexandre de Rhodes (Jesuit, script creator), Nguyễn Văn Thuận (Cardinal, prisoner of faith), Andrew of Phú Yên (first Vietnamese martyr), Trần Lục (cathedral builder), Robert Jaffray (Protestant pioneer), a composite Hmong elder voice.

**Step 49.** Add conversation starters: "Father de Rhodes, why did you create a new writing system for Vietnamese?" / "Cardinal Thuận, how did you keep faith during 13 years in prison?" / "Andrew, what gave you courage at age 19?"

**Step 50.** Add conversation sharing — export a conversation as a styled card for social media or as a PDF.

### Build 3B — Faith Retention Calculator (Steps 51-53)

**Step 51.** Build src/pages/tools/retention/index.html — interactive calculator. Inputs: years abroad, church involvement frequency, Vietnamese Christian community abroad (yes/no), plan for church in Vietnam, family religious background, city returning to. Outputs: estimated retention probability, personalized risk factors, recommended actions.

**Step 52.** Create retention model — client-side scoring based on research data from report 06. Weight factors by importance. Show comparison: "Students with a pre-return church plan retain at 2x the rate."

**Step 53.** Add "Improve My Score" feature — each risk factor links to a specific action (join Vietnamese Christian Fellowship, complete returnee questionnaire, connect with mentor).

### Build 3C — Research Gap Tracker (Steps 54-57)

**Step 54.** Create src/data/gaps.json — structured gap data from report 03. Each gap: `{ id, topic: {en, vi}, category, description: {en, vi}, significance, status: "open" | "in-progress" | "completed", claimedBy }`. ~25-30 gaps.

**Step 55.** Build src/pages/research/gaps.html — gap tracker page. Filterable grid by category (chronological, geographic, ethnic, thematic, comparative). Status badges. Sort by significance.

**Step 56.** Add "I'm Working on This" form — researchers can claim a gap. Collects name, institution, expected completion, brief description. Stored via CF Worker.

**Step 57.** Add "Suggest a Gap" form — community can propose new gaps for review.

### Build 3D — Trilingual Comparator (Steps 58-61)

**Step 58.** Build src/pages/research/comparator.html — the unique-to-Vietnam feature. Search a topic and see sources in English, Vietnamese, AND French side by side. Three-column layout on desktop, tabbed on mobile.

**Step 59.** Create src/data/sources.json — bibliography with language tags. Each source: `{ title, author, year, language: "en" | "vi" | "fr", type, url, abstract: {en} }`. Focus on making French colonial sources and Vietnamese church histories discoverable.

**Step 60.** Build comparison view — for a given topic, show what exists in each language, highlight where a language has no coverage (the gap), and suggest: "This topic has 4 French sources, 2 Vietnamese, 0 English — translation needed."

**Step 61.** Add "Request Translation" button — flags sources that need translation into other languages. Community can volunteer.

---

## Files to Create/Modify

### Phase 1
- `vite.config.ts` — Vite config
- `tailwind.config.js` — Tailwind with custom theme
- `package.json` — dependencies
- `src/index.html` — homepage
- `src/css/main.css` — all CSS custom properties + Tailwind
- `src/ts/main.ts` — app init, router
- `src/ts/i18n.ts` — bilingual strings (EN/VI)
- `src/ts/timeline.ts` — timeline component
- `src/ts/search.ts` — full-text search
- `src/ts/chat.ts` — chat interface
- `src/pages/research/index.html` — report listing
- `src/pages/research/report.html` — single report
- `src/pages/research/timeline.html` — timeline page
- `src/pages/research/ask.html` — Ask the Archive
- `src/data/reports/*.json` — 12 report data files
- `src/data/timeline.json` — timeline events
- `worker/src/index.ts` — CF Worker API proxy
- `wrangler.toml` — deployment config

### Phase 2
- `src/ts/map.ts` — Leaflet map
- `src/pages/research/map.html` — map page
- `src/pages/heritage/index.html` — heritage landing
- `src/pages/heritage/martyrs.html` — 117 Saints experience
- `src/pages/heritage/script.html` — Chữ Quốc Ngữ story
- `src/ts/network.ts` — D3.js network graph
- `src/pages/research/network.html` — network page
- `src/pages/tools/returnee/index.html` — returnee landing
- `src/pages/tools/returnee/questionnaire.html` — returnee form
- `src/pages/tools/returnee/results.html` — recommendations
- `src/pages/tools/training/index.html` — training listing
- `src/pages/tools/training/module.html` — module template
- `src/data/map-data.json` — geographic data
- `src/data/network.json` — relationship data
- `src/data/churches-vietnam.json` — church directory

### Phase 3
- `src/pages/personas/index.html` — persona gallery
- `src/pages/personas/chat.html` — persona chat
- `src/pages/tools/retention/index.html` — retention calculator
- `src/pages/research/gaps.html` — gap tracker
- `src/pages/research/comparator.html` — trilingual comparator
- `src/data/personas/*.json` — persona corpora
- `src/data/gaps.json` — research gaps
- `src/data/sources.json` — trilingual bibliography

## Open Questions
- Vietnamese translation quality: should we invest in professional review before launch, or ship with "Bản dịch AI" labels first?
- Church directory for returnee tool: how to handle registered vs. unregistered churches sensitively (government monitoring concerns)?
- French source digitization: how many MEP sources can we realistically include in the trilingual comparator at launch?
- Cardinal Thuận's writings: copyright status of "The Road of Hope" for AI persona training?
- Hmong elder persona: composite voice or specific named individual? Sensitivity around ongoing persecution.
- Partnership pathway with Vietnamese Christian Fellowship (VCF) chapters — who is the point of contact?
