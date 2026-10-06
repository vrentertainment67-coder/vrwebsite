import { SITE } from '@/data/site';
import { PROJECTS } from '@/lib/content';
import { SERVICES } from '@/data/services';

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
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'VR Entertainment services',
        itemListElement: SERVICES.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.name, description: s.body },
        })),
      },
    },
    ...SERVICES.map((s) => ({
      '@type': 'Service',
      '@id': `${SITE.url}/#svc-${s.n}`,
      name: s.name,
      description: s.body,
      serviceType: s.name,
      provider: { '@id': `${SITE.url}/#organization` },
      areaServed: { '@type': 'City', name: 'Bengaluru' },
      ...(s.href ? { url: `${SITE.url}${s.href}` } : {}),
    })),
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
