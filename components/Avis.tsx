import ACompleter from '@/components/ACompleter';
import styles from './Avis.module.css';

export type AvisData = {
  auteur: string;
  note: number;
  date: string | null;
  /** Passage affiché (coupé dans l'avis, sans le modifier). */
  extrait: string;
  texte: string;
};

const dateFr = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' });

// Avis (Redesign Finale, « review ») : monogramme, prénom + initiale, note et date
// (date obligatoire à l'affichage, art. L111-7-2 du Code de la consommation).
export default function Avis({ avis }: { avis: AvisData }) {
  return (
    <figure className={styles.avis}>
      <figcaption className={styles.auteur}>
        <span className={styles.monogramme} aria-hidden="true">
          {avis.auteur.charAt(0)}
        </span>
        <span className={styles.qui}>
          <span className={styles.nom}>{avis.auteur}</span>
          <span className={styles.detail}>
            {avis.note} étoiles ·{' '}
            {avis.date ? (
              <time dateTime={avis.date}>{dateFr.format(new Date(avis.date))}</time>
            ) : (
              <ACompleter>date</ACompleter>
            )}
          </span>
        </span>
      </figcaption>
      <blockquote className={styles.texte}>
        <p>{avis.extrait}</p>
      </blockquote>
    </figure>
  );
}
