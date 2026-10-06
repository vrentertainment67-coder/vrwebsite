/** The studio's capability pillars. Intelligent Websites is the flagship; the
 *  other three are the real-world services VR Entertainment has run for years. */
export interface Service {
  n: string;
  name: string;
  tag: string;
  body: string;
  points: string[];
  href?: string;
  flagship?: boolean;
}

export const SERVICES: Service[] = [
  {
    n: '01',
    name: 'Intelligent websites',
    tag: 'Flagship',
    body: 'Sites that answer guests, take bookings and rank in AI search — the sharpest thing we make, and the reason most people find us.',
    points: ['AI concierge', 'Smart enquiries', 'AI-ready search'],
    href: '/intelligent-websites',
    flagship: true,
  },
  {
    n: '02',
    name: 'Events & curation',
    tag: '19 years',
    body: 'We programme and run the nights — lineups, production and the room — drawing on nineteen years inside Bengaluru’s night economy.',
    points: ['Lineup & programming', 'Production', 'Venue partnerships'],
  },
  {
    n: '03',
    name: 'Content & social',
    tag: 'The Vic Fix',
    body: 'Reels, video and social that give a venue or an artist a reason to be followed — the same engine behind The Vic Fix.',
    points: ['Reels & video', 'Social content', 'Episode series'],
  },
  {
    n: '04',
    name: 'Artist management',
    tag: 'Talent & brands',
    body: 'We represent artists and broker brand partnerships, matching the right name to the right room.',
    points: ['Artist representation', 'Brand partnerships', 'Bookings'],
  },
];
