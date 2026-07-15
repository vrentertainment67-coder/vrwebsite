/**
 * "The Final" — single source of truth for the PUBLIC guest page (/the-final).
 *
 * GUARDRAILS:
 * - No FIFA marks/logos/emblems. The match is referenced in plain text only.
 * - Budbee appears ONLY as a tasteful "in association with" credit — never promote
 *   the alcohol product (no scotch/whisky/Lighthouse copy, no drink imagery).
 * - No internal/commercial terms here (no budget/split/revenue share/fee/advance).
 */
export const event = {
  name: 'The Final',
  kicker: 'THE WORLD CUP FINAL · LIVE IN BANGALORE',
  subtitle: "One screen. One room. One night the city won't forget.",

  venue: {
    name: 'Lolas',
    fullName: "Lola's All Day Casual Dining + Bar",
    city: 'Bangalore', // marketing copy uses "Bangalore"; postal address uses "Bengaluru"
    addressLines: [
      'Ground Floor, Embassy Manyata Business Park',
      'D3, Redwood Building',
      'Outer Ring Road, Nagavara',
      'Bengaluru, Karnataka 560045',
    ],
    // Structured pieces for JSON-LD
    streetAddress: 'Ground Floor, Embassy Manyata Business Park, D3 Redwood Building, Outer Ring Road, Nagavara',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560045',
    phone: '+91 78994 44099',
    mapsUrl: 'https://share.google/m6ybeRvhWqgvGsRsk',
  },

  when: {
    // Confirmed: the final is Sun 19 July; kickoff 12:30 AM lands in the early
    // hours of Mon 20 IST. Matches the OG banner ("SUN 19 JULY").
    dateLabel: 'Sun 19 July',
    doors: '10 PM',
    kickoff: '12:30 AM',
    kickoffISO: '2026-07-20T00:30:00+05:30', // drives the countdown
    ageNote: '21+ only',
  },

  theNight: {
    body:
      'The biggest final of the era, on a proper screen with the sound turned up — not your phone at 12:30 AM. DJ Andre and DJ Vic live from 10 PM through the night, the halftime show big, premium food and drinks, and a room full of people who came for exactly this.',
    features: [
      { icon: 'screen', label: 'Big-screen final, full sound' },
      { icon: 'decks', label: 'DJ Andre + DJ Vic — live pre-match & through the night' },
      { icon: 'star', label: 'The halftime show, on the big screen' },
      { icon: 'food', label: 'Premium food & drinks all night' },
      { icon: 'trophy', label: 'Fan games, prizes & jerseys to win' },
    ],
  },

  passes: [
    { id: 'early', name: 'Early Bird', price: 1000, note: 'first 100 guests', featured: true },
    { id: 'standard', name: 'Standard', price: 1500, note: 'thereafter', featured: false },
  ],
  passesNote: 'Limited capacity. Pre-register to lock your spot — passes confirmed first-come.',

  knowBeforeYouGo: [
    'Venue: Lolas, Bangalore',
    '21+ only · carry a valid photo ID',
    'Late-night event · plan your ride home',
    'Drink responsibly',
  ],

  sponsor: {
    showCredit: true, // tasteful credit only — never product promotion
    creditLine: 'In association with Budbee',
  },

  contacts: {
    bookingsEmail: 'bookings@vrentertainment.digital',
  },

  socials: {
    thevicfix: 'https://instagram.com/thevicfix',
    djvic: 'https://instagram.com/djvicofficial',
  },
} as const;
