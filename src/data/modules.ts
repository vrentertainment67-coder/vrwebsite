/** The six intelligence modules — detail content for /intelligent-websites. */
export interface ModuleRow { k: string; v: string; }
export interface Module {
  n: string;
  name: string;
  verb: string;
  headline: string;
  body: string;
  rows: ModuleRow[];
}

export const MODULES: Module[] = [
  {
    n: '01', name: 'Concierge', verb: 'Answers',
    headline: 'Your best host, awake at 2am.',
    body: 'An AI assistant trained only on your menus, policies, timings and events. It answers in your tone and hands off to WhatsApp when a human is needed.',
    rows: [
      { k: 'Trained on', v: 'Menus · FAQs · events · policies' },
      { k: 'Hand-off', v: 'WhatsApp · phone · email' },
      { k: 'Guardrail', v: 'Says “I don’t know” rather than guessing' },
    ],
  },
  {
    n: '02', name: 'Smart enquiries', verb: 'Books',
    headline: 'Every lead arrives qualified.',
    body: 'Tables, guestlists, private events and artist bookings: date, size and budget are captured, then routed to the right calendar or person.',
    rows: [
      { k: 'Captures', v: 'Date · party size · budget · occasion' },
      { k: 'Routes to', v: 'Calendar · WhatsApp · CRM' },
      { k: 'Follow-up', v: 'Automatic confirmation to the guest' },
    ],
  },
  {
    n: '03', name: 'Events engine', verb: 'Adapts',
    headline: 'Brunch at noon. The lineup at midnight.',
    body: 'Event pages are generated from your listings, each one indexable and shareable. The homepage changes with the time of day.',
    rows: [
      { k: 'Sources', v: 'Your admin · listings · Instagram' },
      { k: 'Output', v: 'An SEO page for every event' },
      { k: 'Homepage', v: 'Day · evening · late-night states' },
    ],
  },
  {
    n: '04', name: 'AI-ready search', verb: 'Ranks',
    headline: 'Named when people ask AI.',
    body: 'Schema markup, entity pages, llms.txt and local SEO from day one, so Google, ChatGPT and Perplexity understand who you are.',
    rows: [
      { k: 'Includes', v: 'Schema · llms.txt · entity pages' },
      { k: 'Local', v: 'Google Business Profile alignment' },
      { k: 'Tracked', v: 'AI-answer mentions over time' },
    ],
  },
  {
    n: '05', name: 'Monday brief', verb: 'Reports',
    headline: 'One page. Every Monday.',
    body: 'Visits, enquiries, top guest questions and the one change we recommend next. Analytics are cookieless and privacy-friendly.',
    rows: [
      { k: 'Delivered', v: 'Email · WhatsApp' },
      { k: 'Covers', v: 'Traffic · enquiries · questions · bookings' },
      { k: 'Analytics', v: 'Umami, cookieless' },
    ],
  },
  {
    n: '06', name: 'Feedback loop', verb: 'Learns',
    headline: 'Smarter every month.',
    body: 'Questions the site couldn’t answer become new content, so the gaps close on their own over time.',
    rows: [
      { k: 'Input', v: 'Unanswered concierge questions' },
      { k: 'Output', v: 'New FAQ entries and pages' },
      { k: 'Cadence', v: 'Reviewed monthly' },
    ],
  },
];

/** The five module rows shown on the home "modules band". */
export const HOME_MODULES = [
  { n: '01', name: 'Answers', body: 'An AI concierge that knows your menu, timings and dress code, and replies at 2am.' },
  { n: '02', name: 'Books', body: 'Tables, guestlists, private events and artist enquiries, qualified and routed to the right person.' },
  { n: '03', name: 'Adapts', body: 'Brunch at noon, the lineup at midnight. Event pages build themselves from your listings.' },
  { n: '04', name: 'Ranks', body: 'Built so Google, ChatGPT and Perplexity can find you, and name you when people ask.' },
  { n: '05', name: 'Reports', body: 'A one-page brief every Monday covering what guests asked, what booked and what to change.' },
] as const;
