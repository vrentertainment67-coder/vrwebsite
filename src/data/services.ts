/** The studio's capability pillars. Intelligent Websites is the flagship; the
 *  other three are the real-world services VR Entertainment has run for years.
 *  `body`/`points` drive the home teaser cards; `lead`/`includes` drive /studio. */
export interface Service {
  n: string;
  name: string;
  tag: string;
  anchor: string;
  body: string;
  points: string[];
  lead: string;
  includes: string[];
  href?: string;
  flagship?: boolean;
}

export const SERVICES: Service[] = [
  {
    n: '01',
    name: 'Intelligent websites',
    tag: 'Flagship',
    anchor: 'websites',
    body: 'Sites that answer guests, take bookings and rank in AI search — the sharpest thing we make, and the reason most people find us.',
    points: ['AI concierge', 'Smart enquiries', 'AI-ready search'],
    lead: 'The flagship. A website that works like your best host — answering guests at 2am, qualifying every enquiry, generating a page for every event and getting named when people ask AI where to go.',
    includes: [
      'AI concierge trained on your menus, policies and events',
      'Smart enquiries for tables, guestlists and private bookings',
      'Auto-generated, indexable event pages',
      'Schema, llms.txt and local SEO from day one',
      'A one-page performance brief every Monday',
    ],
    href: '/intelligent-websites',
    flagship: true,
  },
  {
    n: '02',
    name: 'Events & curation',
    tag: '19 years',
    anchor: 'events',
    body: 'We programme and run the nights — lineups, production and the room — drawing on nineteen years inside Bengaluru’s night economy.',
    points: ['Lineup & programming', 'Production', 'Venue partnerships'],
    lead: 'We programme and run nights end to end — the lineup, the production and the flow of the room. Nineteen years of booking talent and reading a crowd, applied to your venue or your brand’s event.',
    includes: [
      'Concept, theme and lineup programming',
      'Artist booking and run-of-show',
      'Sound, lighting and production coordination',
      'Guestlist, door and on-night management',
      'Venue and brand partnerships',
    ],
  },
  {
    n: '03',
    name: 'Content & social',
    tag: 'The Vic Fix',
    anchor: 'content',
    body: 'Reels, video and social that give a venue or an artist a reason to be followed — the same engine behind The Vic Fix.',
    points: ['Reels & video', 'Social content', 'Episode series'],
    lead: 'The engine behind The Vic Fix. We shoot the night and cut it for the feed — the reels, recaps and series that give a venue or an artist a reason to be followed.',
    includes: [
      'Short-form reels and event recaps',
      'Episode series production (The Vic Fix)',
      'Social calendar, captions and scheduling',
      'Thumbnails, covers and motion graphics',
      'Content that feeds straight into the website',
    ],
  },
  {
    n: '04',
    name: 'Artist management',
    tag: 'Talent & brands',
    anchor: 'artists',
    body: 'We represent artists and broker brand partnerships, matching the right name to the right room.',
    points: ['Artist representation', 'Brand partnerships', 'Bookings'],
    lead: 'We represent artists and broker the partnerships around them — matching the right name to the right room, and the right brand to the right artist.',
    includes: [
      'Artist representation and bookings',
      'Brand partnerships and collaborations',
      'Rate, rider and contract handling',
      'Calendar, logistics and tour support',
      'Positioning across web, content and events',
    ],
  },
];
