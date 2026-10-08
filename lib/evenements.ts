import data from '@/data/evenements.json';
import { SITE, siteUrl } from '@/lib/site';
import { image } from '@/lib/images';

const FUSEAU = 'Europe/Paris';
const JOURS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;
const JOURS_FR: Record<string, string> = {
  Sunday: 'dimanche',
  Monday: 'lundi',
  Tuesday: 'mardi',
  Wednesday: 'mercredi',
  Thursday: 'jeudi',
  Friday: 'vendredi',
  Saturday: 'samedi',
};

/** reserver : réservation en ligne (L'Addition) ; carte : section « La carte ». */
export type CtaType = 'reserver' | 'carte';

export type Evenement = {
  id: string;
  titre: string;
  type: 'evenement' | 'actu';
  recurrence: { jour: string; heure: string } | null;
  date: string | null;
  heure: string | null;
  horaireLibre: string | null;
  description: string;
  image: string;
  alt: string;
  cta: { type: CtaType; label: string };
  miseEnAvant: boolean;
};

export type EvenementAffiche = Evenement & {
  /** Quand : « Chaque mercredi, 19h », « Jeudi 16 juillet, 19h » ; null si la date reste à compléter. */
  quand: string | null;
  /** Bloc date de l'agenda (« 16 » / « juil. ») ; null sans date. */
  jour: { numero: string; mois: string } | null;
  /** Ligne sous le titre dans l'agenda : « Jeudi · 19h », ou l'horaire seul sans date. */
  meta: string | null;
  /** Dates ISO des prochaines occurrences (pour le schema Event). */
  occurrences: string[];
};

/** Date du jour (AAAA-MM-JJ) à Paris. */
function aujourdhui(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: FUSEAU }).format(new Date());
}

function ajouterJours(iso: string, n: number): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function jourSemaine(iso: string): string {
  return JOURS[new Date(`${iso}T12:00:00Z`).getUTCDay()];
}

/** Décalage horaire de Paris à cette date (« +02:00 » en été, « +01:00 » en hiver). */
function decalageParis(iso: string): string {
  const nom = new Intl.DateTimeFormat('en-US', { timeZone: FUSEAU, timeZoneName: 'longOffset' })
    .formatToParts(new Date(`${iso}T12:00:00Z`))
    .find((p) => p.type === 'timeZoneName')?.value;
  return nom?.replace('GMT', '') || '+01:00';
}

/** « 19:00 » → « 19h », « 19:30 » → « 19h30 ». */
export function heureCourte(heure: string): string {
  const [h, m] = heure.split(':');
  return `${Number(h)}h${m === '00' ? '' : m}`;
}

const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const MOIS_COURTS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];

const majuscule = (texte: string) => texte.charAt(0).toUpperCase() + texte.slice(1);
const minuscule = (texte: string) => texte.charAt(0).toLowerCase() + texte.slice(1);

function nomJour(iso: string): string {
  return majuscule(JOURS_FR[jourSemaine(iso)]);
}

function blocJour(iso: string) {
  const [, mois, jour] = iso.split('-');
  return { numero: String(Number(jour)), mois: MOIS_COURTS[Number(mois) - 1] };
}

function prochainesDates(jour: string, n: number): string[] {
  let d = aujourdhui();
  while (jourSemaine(d) !== jour) d = ajouterJours(d, 1);
  return Array.from({ length: n }, (_, i) => ajouterJours(d, i * 7));
}

function preparer(e: Evenement): EvenementAffiche {
  const horaire = e.horaireLibre ?? (e.heure ? heureCourte(e.heure) : null);

  if (e.recurrence) {
    const dates = prochainesDates(e.recurrence.jour, 4);
    const heure = heureCourte(e.recurrence.heure);
    return {
      ...e,
      quand: `Chaque ${JOURS_FR[e.recurrence.jour]}, ${heure}`,
      jour: blocJour(dates[0]),
      meta: `${majuscule(JOURS_FR[e.recurrence.jour])} · ${heure}`,
      occurrences: dates.map((d) => `${d}T${e.recurrence!.heure}:00${decalageParis(d)}`),
    };
  }

  if (e.date) {
    const [, mois, jour] = e.date.split('-');
    const date = `${nomJour(e.date)} ${Number(jour)} ${MOIS[Number(mois) - 1]}`;
    return {
      ...e,
      quand: horaire ? `${date}, ${minuscule(horaire)}` : date,
      jour: blocJour(e.date),
      meta: horaire ? `${nomJour(e.date)} · ${minuscule(horaire)}` : nomJour(e.date),
      occurrences: [e.heure ? `${e.date}T${e.heure}:00${decalageParis(e.date)}` : e.date],
    };
  }

  return { ...e, quand: null, jour: null, meta: horaire, occurrences: [] };
}

/** Par prochaine date (les récurrents à leur prochaine occurrence) ; sans date en dernier, dans l'ordre du fichier. */
function parDate(a: EvenementAffiche, b: EvenementAffiche): number {
  const [da] = a.occurrences;
  const [db] = b.occurrences;
  if (!da || !db) return (da ? 0 : 1) - (db ? 0 : 1);
  return da < db ? -1 : da > db ? 1 : 0;
}

/** Événements à afficher, du plus proche au plus lointain : les événements datés déjà passés sont retirés. */
export function getEvenements(): EvenementAffiche[] {
  const jour = aujourdhui();
  return (data.evenements as Evenement[])
    .filter((e) => !e.date || e.date >= jour)
    .map(preparer)
    .sort(parDate);
}

/** Schema.org Event pour chaque occurrence à venir (les actus et les dates à compléter sont ignorées). */
export function evenementsJsonLd(evenements: EvenementAffiche[]) {
  const url = siteUrl();
  return evenements
    .filter((e) => e.type === 'evenement')
    .flatMap((e) =>
      e.occurrences.map((startDate) => ({
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: `${e.titre.replace(/\s*!$/, '')} au bar à jeux ${SITE.nom}`,
        startDate,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        ...(e.description ? { description: e.description } : {}),
        image: [`${url}${image(e.image).src}`],
        url: `${url}/#${e.id}`,
        location: {
          '@type': 'Place',
          name: SITE.nom,
          address: {
            '@type': 'PostalAddress',
            streetAddress: SITE.adresse.rue,
            postalCode: SITE.adresse.codePostal,
            addressLocality: SITE.adresse.ville,
            addressCountry: SITE.adresse.pays,
          },
        },
        organizer: { '@type': 'Organization', name: SITE.nom, url },
      })),
    );
}
