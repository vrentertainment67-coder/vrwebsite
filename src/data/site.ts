/** Single source of truth for brand constants, contact details and nav. */
export const SITE = {
  name: 'VR Entertainment',
  url: 'https://vrentertainment.digital',
  // Footer reference uses hello@; older material uses bookings@ (open item in the brief).
  email: 'hello@vrentertainment.digital',
  phoneDisplay: '+91 81053 63636',
  phoneE164: '+918105363636',
  whatsapp: 'https://wa.me/918105363636',
  instagram: 'https://instagram.com/vr_entt',
  address: {
    line: 'Mantri Webcity, Hennur, Bengaluru 560077',
    locality: 'Bengaluru',
    region: 'Karnataka',
    postalCode: '560077',
    country: 'IN',
  },
  tagline: 'An intelligent website studio for the brands people go out for.',
} as const;

/** Phase-1 nav: only routes that exist. Services / Lab / Studio arrive in later phases. */
export const NAV = [
  { label: 'Intelligent Websites', href: '/intelligent-websites' },
  { label: 'Work', href: '/#work' },
  { label: 'Contact', href: '/contact' },
] as const;
