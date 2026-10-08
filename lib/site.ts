import site from '@/data/site.json';

export const SITE = site;

/** URL publique du site, sans slash final. Renseigner `url` dans data/site.json une fois le domaine choisi. */
export function siteUrl(): string {
  const url =
    site.url ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '') ||
    'http://localhost:3000';
  return url.replace(/\/$/, '');
}

export const adresse = {
  ligne: `${site.adresse.rue}, ${site.adresse.codePostal} ${site.adresse.ville}`,
  courte: `${site.adresse.rue} à ${site.adresse.ville}`,
  courteVirgule: `${site.adresse.rue}, ${site.adresse.ville}`,
};

const destination = encodeURIComponent(`${site.nom}, ${adresse.ligne}`);
const reservationEnLigne = site.liens.reservation || null;
const dmInstagram = site.reseaux.instagram.compte ? `https://ig.me/m/${site.reseaux.instagram.compte}` : null;

/** Liens de contact et de réservation. `null` tant que l'info n'est pas renseignée dans data/site.json. */
export const liens = {
  /** Boutons « Réserver » : réservation en ligne (choix de Louis), à défaut une conversation Instagram. */
  reserver: reservationEnLigne || dmInstagram,
  /** Module de réservation de L'Addition (bouton « L'addition », JSON-LD). */
  reservationEnLigne,
  /** Conversation Instagram (boutons « Via Instagram »). */
  dmInstagram,
  instagram: site.reseaux.instagram.url || null,
  facebook: site.reseaux.facebook.url || null,
  messenger: site.reseaux.facebook.page ? `https://m.me/${site.reseaux.facebook.page}` : null,
  telephone: site.telephone.international ? `tel:${site.telephone.international.replace(/\s/g, '')}` : null,
  email: site.email ? `mailto:${site.email}` : null,
  itineraire: `https://www.google.com/maps/dir/?api=1&destination=${destination}`,
  googleMaps: `https://www.google.com/maps/search/?api=1&query=${destination}`,
  avisGoogle: site.liens.avisGoogle || null,
  cartePdf: site.liens.cartePdf || null,
  devis: site.liens.devis || null,
};

export type LigneHoraire = { jours: string; texte: string; ferme: boolean };

/** Regroupe les jours consécutifs aux horaires identiques : « Lundi, mardi / Fermé », « Mercredi - Vendredi ». */
export function horairesGroupes(): LigneHoraire[] {
  const lignes: { jours: string[]; texte: string; ferme: boolean }[] = [];
  for (const h of site.horaires) {
    const ferme = !h.ouverture || !h.fermeture;
    const texte = ferme ? 'Fermé' : `${h.ouverture} - ${h.fermeture}`;
    const derniere = lignes.at(-1);
    if (derniere && derniere.texte === texte) derniere.jours.push(h.label);
    else lignes.push({ jours: [h.label], texte, ferme });
  }
  return lignes.map((l) => ({
    jours:
      l.jours.length === 2
        ? `${l.jours[0]}, ${l.jours[1].toLowerCase()}`
        : l.jours.length > 2
          ? `${l.jours[0]} - ${l.jours.at(-1)}`
          : l.jours[0],
    texte: l.texte,
    ferme: l.ferme,
  }));
}
