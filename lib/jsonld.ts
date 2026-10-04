import { SITE, liens, siteUrl } from '@/lib/site';
import { image } from '@/lib/images';

export const IMAGE_PRINCIPALE = 'hero/etageres-jeux-de-societe-bar-a-jeux-merignac.webp';

/** Données structurées LocalBusiness, générées depuis data/site.json (NAP identique partout). */
export function barJsonLd() {
  const url = siteUrl();
  const sameAs = [SITE.reseaux.instagram.url, SITE.reseaux.facebook.url].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'BarOrPub',
    '@id': `${url}/#bar`,
    name: SITE.nom,
    description: SITE.description,
    url,
    ...(SITE.telephone.international ? { telephone: SITE.telephone.international.replace(/\s/g, '') } : {}),
    ...(SITE.email ? { email: SITE.email } : {}),
    image: `${url}${image(IMAGE_PRINCIPALE).src}`,
    logo: `${url}${image('logo/logo-la-luciole.webp').src}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.adresse.rue,
      postalCode: SITE.adresse.codePostal,
      addressLocality: SITE.adresse.ville,
      addressCountry: SITE.adresse.pays,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    hasMap: liens.googleMaps,
    // schema.org accepte ici l'URL de la page de réservation.
    ...(liens.reservationEnLigne ? { acceptsReservations: liens.reservationEnLigne } : {}),
    openingHoursSpecification: SITE.horaires
      .filter((h) => h.ouverture && h.fermeture)
      .map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.jour,
        opens: h.ouverture,
        closes: h.fermeture,
      })),
    ...(sameAs.length ? { sameAs } : {}),
  };
}
