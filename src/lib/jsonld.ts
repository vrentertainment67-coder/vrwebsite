import { SITE } from '@/data/site';
import { PROJECTS } from '@/lib/content';

/** Organization + ProfessionalService + CreativeWork graph, shared across pages. */
export function baseGraph(): object[] {
  return [
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
      email: SITE.email,
      telephone: SITE.phoneDisplay,
      sameAs: [SITE.instagram],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Mantri Webcity, Hennur',
        addressLocality: SITE.address.locality,
        addressRegion: SITE.address.region,
        postalCode: SITE.address.postalCode,
        addressCountry: SITE.address.country,
      },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE.url}/#service`,
      name: SITE.name,
      description:
        'An intelligent website studio for venues, hospitality brands and artists. Websites that answer guests, take bookings, rank in AI search and report back weekly.',
      url: SITE.url,
      areaServed: { '@type': 'City', name: 'Bengaluru', containedInPlace: { '@type': 'Country', name: 'India' } },
      provider: { '@id': `${SITE.url}/#organization` },
    },
    ...PROJECTS.map((p) => ({
      '@type': 'CreativeWork',
      '@id': `${SITE.url}/#work-${p.slug}`,
      name: p.name,
      url: p.url,
      about: p.blurb,
      creator: { '@id': `${SITE.url}/#organization` },
    })),
  ];
}

export function jsonLd(extra: object[] = []): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': [...baseGraph(), ...extra] });
}
