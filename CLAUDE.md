# TruyềnĐạo 傳道 — Vietnam Missions Research Platform

A bilingual (EN/VI), AI-powered research platform connecting 493 years of Christianity in Vietnam to today's international student ministry. Sister project to **XuanYan 宣研** (China) and **Sendō 宣道** (Japan).

## Tech Stack
- TypeScript/HTML single-page app
- Tailwind CSS (dark mode default)
- Vite for bundling
- Cloudflare Pages deployment
- Cloudflare Worker as API proxy for Claude API calls
- No framework — vanilla TypeScript with module bundling

## Structure
```
src/
  index.html          — Homepage
  css/
    main.css          — Tailwind + custom CSS vars
  ts/
    main.ts           — App init, router, language toggle
    i18n.ts           — Bilingual string management (EN/VI)
    timeline.ts       — Animated timeline component
    search.ts         — Full-text search across reports
    map.ts            — Animated spread map (Leaflet)
    chat.ts           — Ask the Archive RAG interface
  pages/
    research/         — 12 research report pages
    tools/            — Interactive tool pages (returnee, training, etc.)
    heritage/         — Vietnamese Martyrs + Chữ Quốc Ngữ experience
    personas/         — AI conversation interfaces
    about/            — About page
  data/
    reports/          — Report content as JSON (EN + VI)
    timeline.json     — Timeline events (1533-2026)
    personas/         — Persona corpora (de Rhodes, Thuận, Diệm, etc.)
    map-data.json     — Geographic + temporal church data
  assets/
    fonts/            — Noto Serif + Be Vietnam Pro + JetBrains Mono
    img/              — Lacquer textures, gold leaf accents, portraits
dist/                 — Built output
worker/
  src/index.ts        — CF Worker for Claude API proxy
```

## Entry Point
src/index.html

## Deployment
`wrangler pages deploy dist/`

## Conventions
- All user-facing strings go through i18n.ts — no hardcoded EN or VI text
- CSS custom properties for all colors (dark mode is default, light mode via toggle)
- Bilingual toggle persists to localStorage as `truyendao-lang`
- Report content stored as structured JSON with `en` and `vi` fields
- Mobile-first responsive: 375px → 768px → 1024px → 1440px
- Monospace (JetBrains Mono) for data/stats, Serif (Noto Serif) for headings, Sans (Be Vietnam Pro) for body
- Oxblood cinnabar accent (#9B2335) on lacquer black (#12090B) — never pure black or pure white
- Sơn mài lacquer texture as subtle background accent, NOT decoration
- Mother-of-pearl shimmer (gradient animation) on hover states for interactive elements
- Gold leaf (#C9A84C) as secondary accent for decorative elements, section dividers
- Vietnamese text uses Be Vietnam Pro — a font specifically designed for Vietnamese diacritics
- For Vietnamese translations, mark AI-translated content with: "Bản dịch AI — Chờ xem xét" / "AI-translated — review pending"
- All API calls to Claude go through CF Worker proxy at /api/* — never expose API key in client

## Sister Projects
- XuanYan 宣研 (China) at ~/Desktop/Projects/XuanYan/. Dark navy + gold aesthetic.
- Sendō 宣道 (Japan) at ~/Desktop/Projects/Sendo/. Sumi charcoal + vermillion aesthetic.
- TruyềnĐạo must be visually distinct — lacquer black + oxblood cinnabar + gold leaf.

## Research Source
~/Desktop/Projects/Research/2026-04-12-vietnam-missions-scholarship/ (12 reports + NotebookLM deliverables)
