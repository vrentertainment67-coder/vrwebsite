/**
 * Hardcoded case studies (mirrors the optional Supabase `case_studies` table).
 * TODO(metrics): all numbers are being verified before publish.
 * To go DB-driven later, fetch published rows via getReadClient() and map to
 * this shape.
 */
export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  segment: string;
  summary: string;
  problem: string;
  approach: string;
  result: string;
  metricLabel: string;
  metricBefore: string;
  metricAfter: string;
  hasSlider: boolean;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'djvicofficial',
    title: 'djvicofficial.com',
    client: 'DJ Vic',
    segment: 'artist',
    summary: 'A booking-ready artist site, built on Astro, ranking and converting.',
    problem: 'An outdated site that didn’t rank and didn’t book gigs.',
    approach: 'Rebuilt on Astro with a cinematic dark design, technical SEO, and a Supabase-powered booking funnel.',
    result: 'SEO score 38 → 92. Ranking on local terms and taking bookings directly.', // TODO verify
    metricLabel: 'SEO score',
    metricBefore: '38',
    metricAfter: '92',
    hasSlider: true,
  },
  {
    slug: 'flingit',
    title: 'Flingit',
    client: 'Flingit',
    segment: 'brand',
    summary: 'A full nightlife rewards platform — built, shipped, and run end-to-end.',
    problem: 'A nightlife rewards concept with no product to ship it on.',
    approach: 'Designed and built the platform end-to-end, then ran it.',
    result: 'A live nightlife rewards platform built, shipped and operated in-house.', // TODO verify
    metricLabel: 'Delivery',
    metricBefore: 'Idea',
    metricAfter: 'Shipped',
    hasSlider: false,
  },
  {
    slug: 'the-vic-fix',
    title: 'The Vic Fix',
    client: 'The Vic Fix',
    segment: 'event',
    summary: 'India’s nightlife documentary platform — our own proof of what we build.',
    problem: 'Telling the real story of India’s nightlife at broadcast quality.',
    approach: 'Documentary production, distribution and growth strategy across seasons.',
    result: '68% episode-view growth, Season 1 → Season 2.', // TODO verify
    metricLabel: 'Episode-view growth',
    metricBefore: 'S1',
    metricAfter: '+68%',
    hasSlider: false,
  },
];
