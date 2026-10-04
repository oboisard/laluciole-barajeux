import ACompleter from '@/components/ACompleter';
import Icon from '@/components/Icon';
import styles from './Avis.module.css';

export type AvisData = {
  auteur: string;
  note: number;
  date: string | null;
  texte: string;
};

const dateFr = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' });

// Testimonial card (Figma 28:306).
export default function Avis({ avis, className }: { avis: AvisData; className?: string }) {
  return (
    <figure className={`${styles.carte} ${className ?? ''}`}>
      <figcaption className={styles.entete}>
        <span className={styles.avatar} aria-hidden="true">
          {avis.auteur.charAt(0)}
        </span>
        <span className={styles.identite}>
          <span className={styles.nom}>{avis.auteur}</span>
          <span className={styles.etoiles} role="img" aria-label={`Note : ${avis.note} sur 5`}>
            {Array.from({ length: 5 }, (_, i) => (
              <Icon key={i} name="etoile" size={15} className={i < avis.note ? undefined : styles.etoileVide} />
            ))}
          </span>
          <span className="t-outfit-14">
            Avis Google,{' '}
            {avis.date ? (
              <time dateTime={avis.date}>{dateFr.format(new Date(avis.date))}</time>
            ) : (
              <ACompleter>date</ACompleter>
            )}
          </span>
        </span>
      </figcaption>
      <blockquote className={`t-outfit-16 ${styles.texte}`}>
        <p>{avis.texte}</p>
      </blockquote>
    </figure>
  );
}
