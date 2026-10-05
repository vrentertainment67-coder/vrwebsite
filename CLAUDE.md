# CLAUDE.md: vrentertainment.digital

## What this is
The marketing site for VR Entertainment, an intelligent website studio in Bengaluru. The site has to *prove* the product: it adapts to the time of day, has a live AI concierge demo, and should feel ultra premium (cinematic, calm, precise).

Full spec: `BUILD_BRIEF.md`. Approved look: `design/reference/HomePremium.dc.html` and `design/reference/IntelligentWebsitesPremium.dc.html`.

## Stack (keep it)
- Astro 6 (static by default; SSR only for API routes), TypeScript strict
- Tailwind CSS v4, driven by the CSS variables in `design/tokens.css`. Never hard-code hex values in components.
- GSAP + ScrollTrigger for scroll motion, with Lenis for smooth scroll. CSS keyframes for small loops.
- Supabase for enquiries, Site Score results, concierge knowledge and the events table
- Anthropic API (Claude) for the concierge and the Site Score summary, called from server routes only
- Umami for cookieless analytics
- Hosting on Vercel or Netlify (match the existing deployment)

## Non-negotiables
- **Performance:** Lighthouse ≥ 95 on mobile for Performance, Accessibility, Best Practices and SEO. LCP < 2.0s on 4G. Hydrate only interactive islands (`client:visible` / `client:idle`).
- **Accessibility:** WCAG 2.1 AA. Every theme passes contrast. Real `<button>`/`<a>`, focus rings visible, ≥44px touch targets. Respect `prefers-reduced-motion`: no marquee, no word rotation, no typing (show the full text), no scroll reveals.
- **Theme system:** three themes (`day`, `evening`, `night`) set as `data-theme` on `<html>`. A tiny inline script in `<head>` sets it before first paint from Asia/Kolkata time. That avoids a flash, and the theme must also work without JS. The toggle overrides it for the session (sessionStorage).
- **No layout shift** from fonts: self-host Geist, Geist Mono and Instrument Serif via `@fontsource`, with `font-display: swap` and size-adjusted fallbacks.
- **Secrets:** API keys live only in server env vars and are never shipped to the client.
- **Copy:** use the exact copy in `BUILD_BRIEF.md`. Keep placeholders in `[brackets]` visible so they're easy to find. Never invent stats, clients or quotes.
- **SEO / AI-readiness:** per-page meta and OG tags, `Organization` + `ProfessionalService` + `CreativeWork` JSON-LD, `sitemap.xml`, `robots.txt`, `llms.txt`.

## Conventions
- Components in `src/components/` (PascalCase `.astro`; islands in `.tsx` only when they need state)
- Content in `src/content/` using Astro content collections (projects, modules, FAQs)
- One section per component: `Hero.astro`, `ClientMarquee.astro`, `Stats.astro`, `WorkShowcase.tsx`, `Modules.astro`, `Process.astro`, `ScoreCTA.tsx`, `Footer.astro`
- Commit per section with clear messages. Run `astro check` and a Lighthouse pass before calling a phase done.
