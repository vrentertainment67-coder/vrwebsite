# VR Entertainment — marketing site

> **We build the brands that own the night.**

A premium, dark, cinematic lead-generation site for VR Entertainment — a growth agency for nightlife, hospitality, and the artists who power them.

Built with **Astro + Tailwind CSS v4 + GSAP**, TypeScript throughout, SSR via the **Netlify** adapter, and **Supabase** for all form data.

---

## Quick start

```bash
npm install
cp .env.example .env      # then fill in real values (see below)
npm run dev               # http://localhost:4321
npm run build             # production build
npm run preview           # preview the build locally
```

Requires Node ≥ 20.

---

## Environment variables

Copy `.env.example` → `.env` and set:

| Variable | Scope | Purpose |
|---|---|---|
| `SUPABASE_URL` | server | Supabase project URL (`https://srvznhpfgynwxqmpfdmf.supabase.co`) |
| `SUPABASE_SERVICE_ROLE_KEY` | **server only** | Service-role key for server-side inserts. **Never expose to the client / never commit.** |
| `PUBLIC_SUPABASE_URL` | public | Optional — only if a safe client read is ever added |
| `MAILERLITE_API_KEY` | server only | Optional — forwards audit/newsletter signups to MailerLite |

> The service role key bypasses Row Level Security, so it lives **only** in `.env` and is read **only** inside `src/pages/api/*.ts`. Set it locally in `.env`, and in production under **Netlify → Site settings → Environment variables**.

---

## Database setup

1. Open the **Supabase SQL editor** for project `srvznhpfgynwxqmpfdmf`.
2. Paste and run [`supabase/schema.sql`](supabase/schema.sql).

This creates `leads`, `audit_requests`, `subscribers`, and the optional `case_studies` / `testimonials` content tables. **RLS is enabled on every table.** Public clients get **no** insert/select on the lead tables (all writes go through the server API routes); the public may only `select` rows where `published = true` on the content tables.

---

## How form submissions work

All public forms post to server endpoints — the browser never touches Supabase directly:

| Form | Endpoint | Table |
|---|---|---|
| Strategy-call / contact (`LeadForm`) | `POST /api/lead` | `leads` |
| Free audit (`AuditForm`) | `POST /api/audit` | `audit_requests` |
| Newsletter (footer) | `POST /api/subscribe` | `subscribers` |

Each route: validates required fields + email format, checks a **honeypot** field (`company`), then inserts via the Supabase server client. They return JSON; the client shows inline success/error without a page reload.

---

## Where to edit content

| What | Where |
|---|---|
| NAP, email, socials, WhatsApp, nav, services, segments, process | `src/lib/site.ts` |
| Case studies (`/work`) | `src/lib/work.ts` *(or the Supabase `case_studies` table)* |
| Homepage copy + sections | `src/pages/index.astro` |
| Design tokens (colors, fonts, motion) | `src/styles/global.css` (`@theme` block) |
| SEO defaults + JSON-LD | `src/components/SEO.astro`, `src/components/JsonLd.astro` |

Search the codebase for `TODO` to find every spot awaiting real assets or verified data:

- **Hero video** — drop `public/hero.mp4` + `public/hero-poster.jpg` (audio is off by default; never autoplays sound).
- **OG image** — add `public/og-default.jpg`.
- **Case-study metrics** — `38 → 92`, `68%`, etc. are marked `TODO(metrics)` pending verification.
- **Testimonials** — placeholders marked `TODO(testimonials)`; real quotes can live in the `testimonials` table.

---

## Deployment (Netlify)

The `@astrojs/netlify` adapter is configured in `astro.config.mjs`. Default output is **static** (fast prerendered pages); the `/api/*` routes opt into SSR via `export const prerender = false` and deploy as Netlify Functions automatically.

1. Push the repo to GitHub and connect it in Netlify (or `netlify deploy`).
2. Build settings come from [`netlify.toml`](netlify.toml) (`npm run build` → `dist`).
3. Add the environment variables above under **Site settings → Environment variables**.
4. Point the domain (`vrentertainment.digital`) at the Netlify site.

---

## Routes

- `/` — full homepage (12 sections, GSAP motion, working forms)
- `/who-we-help/[segment]` — venues-and-clubs · artists-and-djs · hospitality-and-beverage-brands · festivals-and-events
- `/services` + `/services/[slug]` — 8 services
- `/work` + `/work/[slug]` — case studies
- `/the-vic-fix` · `/about` · `/resources` · `/contact`
- `/dj-website-in-a-box` · `/venue-launch-kit` — productized offers
- `/api/lead` · `/api/audit` · `/api/subscribe` — server endpoints
- `sitemap-index.xml` + `robots.txt` generated/served automatically

---

## Accessibility & performance

Mobile-first, semantic HTML, keyboard-navigable, ARIA labels, visible focus rings, and a `prefers-reduced-motion` fallback that disables all GSAP/CSS motion. Fonts are self-hosted via `@fontsource`; media is lazy-loaded. If motion ever costs load speed, motion loses.
