/**
 * "The Final" — single source of truth for the event page (/the-final).
 * All prices, times, capacity, venue and contacts are provisional and edited here.
 * NOTE: neutral event naming only — no FIFA/team marks anywhere.
 */
export const event = {
  name: 'The Final',
  tagline: "Football's biggest final, live on the big screen.",
  venue: {
    name: 'Lolas',
    city: 'Bengaluru',
    address: 'Lolas, Bengaluru', // TODO(VIC): full street address if you want it shown
    mapsUrl: 'https://share.google/m6ybeRvhWqgvGsRsk',
  },
  when: {
    dateLabel: 'Sunday 19 → Monday 20 July 2026',
    doors: '10:00 PM',
    kickoff: '12:30 AM IST',
    closes: '3:30 AM', // late licence confirmed
    ageNote: '21+ only',
  },
  runOfNight: [
    { time: '10:00 PM', title: 'DJ Andre + DJ Vic', note: 'Doors open. The pre-match build — where the room fills and the night starts.' },
    { time: '12:30 AM', title: 'Kickoff', note: "Big screen. Full sound. The final, the way it's meant to be watched." },
    { time: 'Halftime', title: 'Live set', note: 'The halftime show on the big screen, then a live set keeps the floor moving.' },
    { time: 'Full time', title: 'The finish', note: 'History, together — the moment everyone came for.' },
  ],
  packages: [
    { id: 'entry', name: 'Entry', price: 999, priceNote: '₹500 redeemable on food & drink', blurb: 'In the room for the full night. Food & drinks à la carte.', featured: false },
    { id: 'unlimited', name: 'The Unlimited Pour', price: 2499, priceNote: 'all night', blurb: 'Unlimited premium scotch + mixers, all night, plus the screening.', featured: true },
    { id: 'vip', name: 'VIP table', price: null, priceNote: 'on request', blurb: 'Reserved prime-view seating and a welcome pour. Limited tables.', featured: false },
  ],
  capacity: 250, // provisional; used for the "limited" line
  contacts: {
    bookingsEmail: 'bookings@vrentertainment.digital',
    whatsappPrimary: '918105363636', // Vic — wa.me format, no + or spaces
    whatsappSecondary: '919945194781', // Andre
  },
  sponsor: {
    showBranding: false, // ⚠️ keep false until sponsor + legal sign-off
    creditLine: 'In association with Budbee',
    product: 'Lighthouse',
  },
  socials: {
    thevicfix: 'https://instagram.com/thevicfix',
    djvic: 'https://instagram.com/djvicofficial',
  },
} as const;
