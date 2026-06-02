/**
 * Central site configuration — NAP, socials, nav, services, segments.
 * Edit copy/content here; components read from this single source of truth.
 */

export const SITE = {
  name: 'VR Entertainment',
  tagline: 'We build the brands that own the night.',
  url: 'https://vrentertainment.digital',
  // One consistent email on the .digital domain (used everywhere)
  email: 'hello@vrentertainment.digital',
  // NAP — must stay identical across the whole site for local SEO
  nap: {
    business: 'VR Entertainment',
    street: 'Mantri Webcity, Hennur',
    locality: 'Bangalore',
    region: 'Karnataka',
    postalCode: '560077',
    country: 'IN',
    phoneDisplay: '+91 81053 63636',
    phoneE164: '+918105363636',
  },
  founder: {
    name: 'Vikas Naik',
    alias: 'DJ Vic',
    bio: '19+ years behind the decks, 18+ countries, a Universal Music partnership, and the creator of The Vic Fix.',
  },
  // Real WhatsApp click-to-chat link to the correct number
  whatsapp: 'https://wa.me/918105363636',
  socials: {
    instagramAgency: 'https://instagram.com/vr_entt',
    instagramDjVic: 'https://instagram.com/djvicofficial',
    instagramVicFix: 'https://instagram.com/thevicfix',
    youtube: 'https://youtube.com/@VREntertainment67',
  },
} as const;

/** Top-level navigation. */
export const NAV = [
  {
    label: 'Who We Help',
    href: '/who-we-help/venues-and-clubs',
    children: [
      { label: 'Venues & Clubs', href: '/who-we-help/venues-and-clubs' },
      { label: 'Artists & DJs', href: '/who-we-help/artists-and-djs' },
      { label: 'Hospitality & Beverage Brands', href: '/who-we-help/hospitality-and-beverage-brands' },
      { label: 'Festivals & Events', href: '/who-we-help/festivals-and-events' },
    ],
  },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'The Vic Fix', href: '/the-vic-fix' },
  { label: 'About', href: '/about' },
  { label: 'Resources', href: '/resources' },
] as const;

/** Segment pages — "Who we build for". */
export const SEGMENTS = [
  {
    slug: 'venues-and-clubs',
    title: 'Venues & Clubs',
    pitch: 'Fill the room. Own the city’s feed.',
    segment: 'venue',
  },
  {
    slug: 'artists-and-djs',
    title: 'Artists & DJs',
    pitch: 'A brand that books gigs while you sleep.',
    segment: 'artist',
  },
  {
    slug: 'hospitality-and-beverage-brands',
    title: 'Hospitality & Beverage Brands',
    pitch: 'Activation that actually reaches the night crowd.',
    segment: 'brand',
  },
  {
    slug: 'festivals-and-events',
    title: 'Festivals & Events',
    pitch: 'Sell out the lineup before doors open.',
    segment: 'event',
  },
] as const;

/** The Arsenal — services. */
export const SERVICES = [
  { slug: 'web-design-development', title: 'Web Design & Development', blurb: 'Fast, cinematic sites that convert browsers into bookings.' },
  { slug: 'artist-dj-websites', title: 'Artist / DJ Websites', blurb: 'A booking-ready home base that works while you tour.' },
  { slug: 'seo-and-local-seo', title: 'SEO & Local SEO', blurb: 'Get found when the city searches for the night out.' },
  { slug: 'social-content-and-reels', title: 'Social Content & Reels', blurb: 'Scroll-stopping content shot by people who live in the scene.' },
  { slug: 'video-and-podcast-production', title: 'Video & Podcast Production', blurb: 'Documentary-grade film and audio, end to end.' },
  { slug: 'branding-and-press-kits', title: 'Branding & Press Kits', blurb: 'An identity and EPK that gets you taken seriously.' },
  { slug: 'event-and-nightlife-marketing', title: 'Event & Nightlife Marketing', blurb: 'Fill the floor — campaigns built for the night economy.' },
  { slug: 'consulting-and-growth-strategy', title: 'Growth Strategy', blurb: 'The roadmap to own your city, then the next one.' },
] as const;

/** Process — 4 steps. */
export const PROCESS = ['Audit', 'Strategy', 'Build', 'Grow'] as const;
