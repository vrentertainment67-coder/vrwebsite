# Build brief: vrentertainment.digital rebuild

Version 1 · 5 Oct 2026 · Owner: Vic (VR Entertainment)

---

## 1. Positioning

**One line:** VR Entertainment is an intelligent website studio for the brands people go out for.

**Expanded:** We serve venues, hospitality groups, artists and event brands. We design websites that answer guests, take bookings, rank in AI search and report back every week, then run the content and growth systems around them. We've built for the night economy from the inside for 19 years.

**Why the rebuild:** the current site lists eight equal services, sells a mood ("brands that own the night") instead of a result, shows six live TODO placeholders, and looks the same as DJ Vic and The Vic Fix. The new site leads with one flagship, *Intelligent Websites*, and proves it by being one.

**Proof we can use (all real):**
- 19 years in the night economy · 18 countries · Universal Music partner
- djvicofficial.com SEO score 38 → 92
- The Vic Fix +68% episode-view growth
- Five live client sites: DJ Vic, Lloyd's Pro Sound & Lighting, DJ Gags, SNLA, Supriya Bopanna
- Flingit: nightlife rewards platform, built and run end to end

---

## 2. Service architecture (8 → 1 + 3)

| Offer | What it is | Replaces |
|---|---|---|
| **Intelligent Websites** (flagship) | Three tiers: **Launch** (artists/DJs), **Venue & Brand**, **Platform** (custom products like Flingit) | Web Design & Development, Artist/DJ Websites, Branding & Press Kits |
| Content Engine | Reels, shoots, video and podcast production | Social & Reels, Video & Podcast |
| Search & AI Visibility | Local SEO plus getting named in ChatGPT, Perplexity and Google AI answers | SEO & Local SEO |
| Growth Ops | Monthly retainer for campaigns, conversion tuning and the Monday brief. From ₹1L/month. | Event Marketing, Growth Strategy |

**The six intelligence modules** (each one can be named, demoed and priced):
1. **Concierge (Answers):** AI assistant trained only on the client's menus, policies, timings and events. It hands off to WhatsApp and says "I don't know" rather than guessing.
2. **Smart enquiries (Books):** captures date, party size, budget and occasion, then routes to a calendar, WhatsApp or CRM and sends an automatic confirmation.
3. **Events engine (Adapts):** builds event pages from the admin, listings or Instagram, with an SEO page per event and day, evening and late-night homepage states.
4. **AI-ready search (Ranks):** schema, entity pages, llms.txt, Google Business Profile alignment, and AI-answer mentions tracked over time.
5. **Monday brief (Reports):** one page by email or WhatsApp covering traffic, enquiries, top questions and one recommendation. Analytics are cookieless (Umami).
6. **Feedback loop (Learns):** unanswered concierge questions become new FAQ entries and pages, reviewed monthly.

---

## 3. Sitemap

```
/                         Home (Phase 1)
/intelligent-websites     Flagship service page (Phase 1)
  /for-venues  /for-artists  /for-hospitality  /for-events   (Phase 2, SEO landing pages)
/services                 Content Engine · Search & AI Visibility · Growth Ops (Phase 2)
/work                     Index + /work/[slug] case studies (Phase 2)
/lab                      Live concierge playground (Phase 3)
/score                    Site Intelligence Score tool (Phase 3; Phase 1 is form capture only)
/pricing                  (Phase 2)
/studio                   About: founder, team, The Vic Fix as proof (Phase 2)
/journal                  Blog (Phase 2)
/contact                  Book a call (Phase 1)
```
Main nav: Intelligent Websites · Work · Services · Lab · Studio, plus a **Start a project** pill.
Keep 301 redirects from the old URLs (`/who-we-help`, `/resources`, `/the-vic-fix`, etc.) to their nearest new page.

---

## 4. Design system

**Look:** cinematic, calm, editorial. Big, tight, light-weight sans headlines with italic serif accent words. Lots of air. One accent colour per theme. No gradient washes, no emoji, no stock illustration.

**Type**
- Display and UI: **Geist** 300/400/500. Headlines weight 500, letter-spacing −0.05em, line-height 0.92–0.98.
- Accent words: **Instrument Serif Italic** (e.g. "Websites that *answer.*", "A website that runs the *front desk.*")
- Labels and metadata: **Geist Mono** 11–12px, uppercase, letter-spacing 0.14em
- Fluid scale: hero `clamp(56px, 10.4vw, 168px)`, H2 `clamp(44px, 6vw, 96px)`, body 17px, lead `clamp(19px, 1.6vw, 23px)` weight 300

**Themes (time of day, Asia/Kolkata)**: see `design/tokens.css`
- `day` 06:00–16:59: warm bone `#F1EEE8`, ink `#111110`, accent ultramarine `#3A34E8`
- `evening` 17:00–20:59: dusk `#1B1613`, cream `#F4EDE3`, accent ember `#E8743B`
- `night` 21:00–05:59: near-black `#09090B`, bone `#F2F0EB`, accent violet `#8C86FF`
- Every themed surface transitions over 1.2s when the theme changes.

**Layout:** max-width 1360px, side padding 40px (20px on mobile), sections 120–140px tall padding. Radii: cards 18–22px, CTA panels 28px, buttons are pills (min-height 60px for primary, 44px for small).

---

## 5. Pages

### 5.1 Home (`/`): reference `HomePremium.dc.html`

1. **Header:** "VR" in Instrument Serif + "ENTERTAINMENT" in mono · nav · "Start a project" pill with a pulsing accent dot.
2. **Hero**
   - Status line (mono): `● Bengaluru · {live time} · this page is in {Day|Evening|Late-night} mode`. The time is live and updates every 30s.
   - Theme toggle: Day / Evening / Late-night (segmented pill, `aria-pressed`).
   - H1: "Websites / that *answer.*" The italic word rotates every 2.4s through answer. book. rank. adapt. report. with a vertical slot-machine roll (0.9s, `cubic-bezier(.7,0,.2,1)`).
   - Lead: "An intelligent website studio for venues, hospitality brands and artists. We build sites that answer guests, take bookings, rank in AI search and change with the hour, *like this one just did.*"
   - CTAs: **Get your Site Intelligence Score →** (solid) · **See the work** (outline)
   - **Live site card** (right): a mock venue site whose scene changes with the theme (see `content/concierge-scenes.json`). The guest message appears, then the concierge reply types out at about 26ms per character with a blinking caret, then the suggestion chips fade in. The reply restarts when the theme changes.
3. **Client marquee:** DJ Vic ✦ Lloyd's Pro Sound ✦ DJ Gags ✦ SNLA ✦ Supriya Bopanna ✦ Flingit ✦ The Vic Fix. Instrument Serif 34px, muted, 38s linear loop, pauses on hover.
4. **Stats:** 19 years · 18 countries · 92 SEO score · +68% episode views. Counters ease up from 0 over 1.6s (ease-out cubic) the first time they scroll into view.
5. **Selected work:** a numbered list of the five projects (left) and a large framed screenshot (right). The active item expands to show its blurb and tags. Images cross-fade (0.9s) with a slight scale settle (1.06 → 1). The showcase advances every 7s and pauses on hover or focus. Each item links to `/work/[slug]`. Data: `content/projects.json`. Shows "01 / 05".
6. **Modules band** (inverse colours): "A brochure waits. *Ours work the room.*" Five rows: Answers / Books / Adapts / Ranks / Reports. On hover the row slides right 24px and an arrow appears.
7. **Process:** "Six weeks, *give or take.*" [confirm timeline]. Four steps: Score · Blueprint · Build & train · Grow.
8. **Score CTA panel:** "How intelligent is *your* website?" A URL input and **Get my score →** button. Phase 1: the form saves to Supabase `score_requests` and the user sees "We'll email your score within 24 hours." Phase 3: real-time scoring.
9. **Footer:** a very large "VR *Entertainment*" wordmark, then the address, email, phone, Instagram and WhatsApp.

### 5.2 Intelligent Websites (`/intelligent-websites`): reference `IntelligentWebsitesPremium.dc.html`

1. Hero: "A website that runs the *front desk.*" + lead + **See packages** / **Explore the modules**
2. **Modules explorer** (tabs): six modules on the left. The selected one shows a detail panel with a serif headline, body and a three-row spec table. Copy is in the reference file's `M` array. Use real tabs (arrow-key navigation, `aria-selected`).
3. **Brochure vs. intelligent** comparison table (inverse band, five rows, scrolls sideways on mobile).
4. **Tiers:** Launch · Venue & Brand (highlighted, inverse card, "Most chosen") · Platform. Prices are `[₹ price]` and timelines `[x] weeks`. Note: "Any tier can add Growth Ops from ₹1L/month after launch."
5. FAQ: four `<details>` items, with a "+" that rotates 45° when open.
6. CTA panel: "See it answer *your* guests." **Book a 20-min demo** / **Get your score**

### 5.3 Phase 2 pages
Build these with the same components and look: vertical landing pages (reuse the hero, modules and work filtered by vertical), services, work index and case studies (before/after, one hard number, a client quote), pricing, studio (founder, team, The Vic Fix), journal.

---

## 6. Behaviour spec

### Time-of-day theme
```js
// inline in <head>, before CSS paints
const h = +new Date().toLocaleString('en-GB',{timeZone:'Asia/Kolkata',hour:'2-digit',hour12:false});
const auto = h>=6&&h<17 ? 'day' : h>=17&&h<21 ? 'evening' : 'night';
document.documentElement.dataset.theme = sessionStorage.getItem('vr-theme') || auto;
```
- The toggle writes `vr-theme` to sessionStorage and updates `data-theme`.
- Without JS, default to `night` via `<html data-theme="night">`.
- Send an Umami event `theme_toggle` with the chosen value.

### Concierge (Phase 1 is a scripted demo; Phase 3 is live)
- Phase 1: scripted scenes from `content/concierge-scenes.json`, with the typing effect only.
- Phase 3 (`/lab` and client builds): `POST /api/concierge` → Claude with a system prompt and a retrieved knowledge base (Supabase `kb_chunks` with pgvector). Stream the reply. Rate-limit 20 messages per IP per hour. Refuse anything outside the knowledge base. Log questions it couldn't answer to `unanswered_questions` (this feeds the feedback loop).

### Site Intelligence Score
- Phase 1: capture `{url, email, created_at, utm}` in `score_requests` and notify Vic by email or WhatsApp.
- Phase 3: a server route fetches the URL and scores five areas, 0–20 each:
  - Speed (PageSpeed Insights API)
  - Search (meta, headings, sitemap, local schema)
  - AI-ready (JSON-LD present, llms.txt, entity clarity)
  - Booking (a CTA above the fold, form/WhatsApp present)
  - Content (freshness, event pages)

  Claude then writes a three-fix summary, emailed with Resend. Show the score with an animated dial.

### Motion
See `design/MOTION.md`. Global easing is `cubic-bezier(.2,.7,.1,1)`, and entrances rise 28px over about 1.1s.

---

## 7. Data model (Supabase)

```sql
create table score_requests (id uuid primary key default gen_random_uuid(), url text not null, email text not null, utm jsonb, score int, report jsonb, created_at timestamptz default now());
create table enquiries (id uuid primary key default gen_random_uuid(), name text, email text, phone text, business_type text check (business_type in ('venue','artist','hospitality','events','other')), message text, source text, created_at timestamptz default now());
create table kb_chunks (id bigserial primary key, tenant text not null, content text not null, embedding vector(1024), updated_at timestamptz default now());
create table unanswered_questions (id bigserial primary key, tenant text, question text, created_at timestamptz default now());
```
Turn on row-level security for all tables. Inserts go through server routes using the service key, and the anon key never writes.

---

## 8. SEO and AI readiness
- Titles: `Intelligent websites for venues, hospitality & artists | VR Entertainment` (home), `Intelligent Websites: AI concierge, smart bookings, AI search | VR Entertainment`
- JSON-LD: `Organization`, `ProfessionalService` (areaServed: Bengaluru, India), `Service` for each tier, `CreativeWork` for each project, `FAQPage` on the service page
- `llms.txt` at the root summarising the services, tiers, the proof points above and contact details
- OG images: one per page, generated at build time (headline in Geist on the theme background)

---

## 9. Phases and acceptance

**Phase 1 (launch)**
Includes the scaffold, tokens, theme system, Home, Intelligent Websites, Contact, Score capture form, 301s, analytics, SEO basics and the removal of every old TODO.
- [ ] Lighthouse mobile ≥ 95 in all four categories on both pages
- [ ] All three themes pass AA contrast. The theme loads correctly at first paint with no flash.
- [ ] Reduced-motion mode shows final states with no animation
- [ ] Score and contact forms write to Supabase and send a notification
- [ ] No `TODO` or "coming soon" text anywhere

**Phase 2:** Work case studies, vertical landing pages, services, pricing, studio, journal

**Phase 3:** Live `/lab` concierge, real-time Site Score, Monday-brief template, concierge on vrentertainment.digital itself (use the product on our own site first)

---

## 10. Open items for Vic
- [₹ price] for Launch and Venue & Brand
- [x] weeks typical timeline (the design says "Six weeks, give or take")
- [₹ x/month] running cost
- [Headliner] for the late-night demo scene
- Client quotes: at least one, ideally from Lloyd's, DJ Gags and SNLA
- High-resolution screenshots or screen recordings of all five sites (short muted MP4 loops would look even better in the showcase)
- Confirm contact email: the footer uses hello@vrentertainment.digital and older material uses bookings@vrentertainment.digital
