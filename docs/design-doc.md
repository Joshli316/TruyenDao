# TruyềnĐạo 傳道 — Design Document

## Problem Statement
The Vietnam missions web landscape is fragmented into silos: mission organization sites (OMF, CMA), Catholic institutional sites (CBCV, VietCatholic News), Protestant resources (VietChristian), advocacy/data platforms (Joshua Project, USCIRF), and academic archives (MEP/IRFA). None integrate the field. None use AI. None are truly bilingual (EN/VI). None bridge the 493 years of Vietnamese Christian history with contemporary practice. The trilingual scholarship gap (Vietnamese + French + English) is worse than China's or Japan's bilingual divides — and nobody is addressing it. This platform can be the first to connect Vietnam's extraordinary Christian story to today's diaspora student ministry through bilingual, AI-powered tools.

## Vietnam's Unique Story

Vietnam is the middle case in the Asia trilogy:
- **China (XuanYan):** Persecution + rapid growth. ~5-7% Christian.
- **Japan (Sendō):** Full freedom + persistent stagnation. ~1.5% Christian.
- **Vietnam (TruyềnĐạo):** Controlled accommodation + steady growth. ~8-10% Christian.

Vietnam is the only one of the three where Christianity has crossed significant demographic thresholds and continues growing. It also has three features found nowhere else:

1. **Missionaries invented the national script.** Chữ Quốc ngữ — the romanized writing system used by 100 million Vietnamese today — was created by Jesuit missionaries (Francisco de Pina, Alexandre de Rhodes) as an evangelistic tool. The communist government adopted and promoted this missionary-created script. No other Asian country owes its modern writing system to Christianity.

2. **The largest single-country martyrdom.** The 117 Vietnamese Martyrs, canonized in 1988, represent the largest single-country group canonization in Catholic history. An estimated 100,000-300,000 Christians were killed during the great persecutions (1830s-1860s).

3. **Explosive ethnic minority growth.** Hmong and Montagnard/Degar peoples in the Central Highlands have converted to Christianity in massive numbers since the 1990s — one of the most dramatic church growth stories in contemporary Asia, largely undocumented outside advocacy reports.

## The Ancestor Worship Barrier

If Japan's defining puzzle is "why does Christianity stall despite full freedom?", Vietnam's is "how does Christianity grow despite the ancestor worship barrier?" Ancestor veneration is the deepest cultural practice in Vietnamese society — present across Buddhist, Confucian, and folk religious contexts. Every conversion to Christianity involves negotiating this tension. Vietnamese theologians are actively developing inculturation responses, but the Western church barely knows this conversation exists.

## Target Users

| User | Need | Primary Path |
|------|------|-------------|
| Missionaries in/to Vietnam | Cultural intelligence, history, registration guidance, ethnic minority context | /research → reports, map, returnee tool |
| Vietnamese pastors | Heritage, theology in Vietnamese, training resources | /research, /tools → returnee, training |
| Vietnamese international students abroad | Returnee preparation, church-finder for Vietnam | /tools → returnee tool |
| Returnees in Vietnam | Church connection (navigating registered vs. unregistered), discipleship | /tools → returnee tool |
| Scholars | Trilingual bibliography, primary source search, gap tracker | /research → ask archive, gaps |
| Volunteers (campus, Vietnamese fellowship, church) | Training modules, cultural guides | /tools → training |
| Vietnamese-Americans | Heritage reconnection, the chữ Quốc ngữ story, martyrs | /heritage |
| OMF / CMA / Catholic orders | Shared infrastructure they don't have to build | /research, /tools |
| Funders / partners | Platform innovation capability on display | /about, all tools |

## User Journeys

**Returnee in Hanoi:**
A friend at her California campus fellowship shares the TruyềnĐạo link. She fills out the Returnee Tool questionnaire in Vietnamese before her flight. The tool navigates the sensitive question: registered church or house church? It provides both options with context. Downloads her 90-day plan. Three months after return, she's attending a small fellowship in Cầu Giấy that the tool connected her to via a Vietnamese-American pastor who maintains contacts in Hanoi.

**Vietnamese-American Student in Texas:**
Second-generation, raised Catholic, curiosity about Vietnamese Christian history sparked by a TikTok about the 117 Martyrs. Finds TruyềnĐạo via Google. Explores the Martyrs Heritage Experience. Discovers that the Vietnamese alphabet she writes in every day was invented by Catholic missionaries — her mind is blown. Shares the chữ Quốc ngữ interactive story on Instagram. Her Vietnamese grandmother, who survived the 1975 exodus, cries when she sees the timeline entry for the Catholic migration south.

**Hmong Pastor in Sapa:**
Finds TruyềnĐạo through a Vietnamese Christian who shared the link on Zalo. Toggles to Vietnamese. Searches the Ask the Archive for "người H'Mông tin Chúa" (Hmong believers). Gets sourced answers from reports 08 and 03. Discovers the Research Gap Tracker shows Hmong Christianity as understudied. Submits a "I can help" form — he has 20 years of oral history he'd share if someone would record it.

**Scholar in Paris:**
Doctoral candidate at INALCO researching MEP archives. Finds TruyềnĐạo through the Trilingual Comparator — searches a topic and sees Vietnamese, French, AND English sources side by side. This is the first tool that bridges all three. Bookmarks it. Uses Ask the Archive to cross-reference MEP correspondence with Vietnamese-language church histories. Discovers a research gap she can fill.

## What This Product IS
- A research platform with interactive tools
- Bilingual by default (EN/VI toggle on every page)
- AI-powered (search, conversations, translation, trilingual synthesis)
- Connected to real ministry network and Vietnamese diaspora church partnerships
- The third in a trilogy proving AI can serve missions
- The sister to XuanYan 宣研 (China) and Sendō 宣道 (Japan), sharing architecture but not aesthetic

## What This Product IS NOT
- A donation funnel (no payment, no paywall)
- A blog or news site (VietCatholic News and VietChristian do that)
- A social network or forum
- A replacement for OMF, CMA, or CBCV — it's complementary, integrative
- A marketing site for the organization (it's a tool, not a brochure)
- A clone of XuanYan or Sendō — Vietnam needs its own stories, its own aesthetic, its own partnerships

## Key Design Rationale

**Dark mode default (lacquer black):** Vietnamese sơn mài (lacquer art) is one of the country's most distinctive art traditions — layers of natural lacquer built up over months, polished to a deep warm black. The lacquer-black base (#12090B) has a warm undertone that distinguishes it from both XuanYan's cool navy and Sendō's neutral charcoal. It signals craftsmanship and depth.

**Oxblood cinnabar (朱砂 *chu sa*) primary accent:** Cinnabar is the traditional red pigment used in Vietnamese lacquerware and temple decoration. Deeper and warmer than Sendō's bright vermillion, more muted than a Chinese imperial red. References both the lacquer tradition and the martyrdom story — the color of sacrifice.

**Gold leaf (vàng lá) secondary accent:** Gold leaf inlay is the signature technique of Vietnamese lacquerware — thin sheets of gold pressed into layers of lacquer. Used sparingly for section dividers, decorative elements, and important callouts. Differentiates from XuanYan's gold (which is the primary accent) by being secondary and applied as delicate accents rather than bold highlights.

**Mother-of-pearl shimmer on interactions:** Vietnamese lacquerware often features mother-of-pearl (xà cừ) inlay — iridescent shell fragments that catch light differently at different angles. Translated to CSS as a subtle gradient animation on hover states. Unique to TruyềnĐạo — no equivalent in the sister projects.

**Be Vietnam Pro for body text:** A typeface specifically designed for Vietnamese diacritical marks (six tones, multiple diacritics that stack). Using a Vietnamese-designed font signals respect for the language's unique typographic needs. Replaces Inter (used in the sisters) as the body font.

**Noto Serif for headings:** The standard Noto Serif (not SC, not JP) handles Vietnamese diacritics correctly at display sizes. Maintains family consistency with the sisters' serif heading approach.

**Three fonts max:** Noto Serif (display), Be Vietnam Pro (body/VI), JetBrains Mono (data). No more.

**Sharp containers, soft interactions:** Same principle as the sisters — cards and panels have sharp corners (editorial), buttons and toggles have 4px radius (approachable).

**Lacquer panel motif as visual punctuation:** Sections framed with subtle lacquer-panel borders — warm dark frames with gold-leaf accent lines. Distinctive, culturally grounded.

## Differentiation from Sister Projects

| Dimension | XuanYan (China) | Sendō (Japan) | TruyềnĐạo (Vietnam) |
|-----------|-----------------|---------------|---------------------|
| Color base | Dark navy (#0B1222) | Sumi charcoal (#0A0908) | Lacquer black (#12090B) |
| Primary accent | Gold (#D4A44C) | Vermillion (#C8323C) | Oxblood cinnabar (#9B2335) |
| Secondary accent | — | Washi cream (#F4EAD5) | Gold leaf (#C9A84C) |
| Texture | Chinese ink-wash (水墨) | Japanese sumi-e (墨絵) | Vietnamese lacquer (sơn mài) |
| Heading font | Noto Serif SC | Noto Serif JP | Noto Serif |
| Body font | Inter | Inter | Be Vietnam Pro |
| Visual motif | None specific | Torii gate, enso circle | Lacquer panel, mother-of-pearl shimmer |
| Tone | Scholarly observatory | Editorial contemplative | Gallery warmth |
| Unique heritage feature | N/A | Hidden Christian experience | Vietnamese Martyrs + Chữ Quốc Ngữ story |
| Diaspora partner | Existing networks | JCFN | Vietnamese Christian Fellowship + diaspora churches |
| Persecution framing | Active, contemporary (Xi era) | Historical (1597-1873) | Historical + ongoing (ethnic minorities) |
| Map narrative | Watch Christianity spread despite hostility | Watch Christianity stall despite openness | Watch Christianity grow through accommodation |
| Language gap | Bilingual (CN ↔ EN) | Bilingual (JP ↔ EN) | Trilingual (VI ↔ FR ↔ EN) |
