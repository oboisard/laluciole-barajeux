import Image from 'next/image';
import Icon from '@/components/Icon';
import { image } from '@/lib/images';
import { liens } from '@/lib/site';
import styles from './CommentReserver.module.css';

// Section « Comment réserver ? » (Redesign Finale, Figma 116:666) : le client centralise
// les réservations sur L'Addition, seule tuile affichée. Ancre #comment-reserver.
export default function CommentReserver() {
  const illu = image('illustrations/illustration-arbre-bibliotheque-de-jeux.webp');
  const href = liens.reservationEnLigne;

  const tuile = (
    <>
      <span className={styles.pastille} aria-hidden="true">
        <Icon name="calendrier" size={22} />
      </span>
      <span className={styles.libelle}>
        <span className={styles.nom}>L’addition</span>
        <span className={styles.precision}>Réservation en ligne</span>
      </span>
      <span className={styles.fleche} aria-hidden="true">
        <Icon name="arrowForward" size={20} />
      </span>
    </>
  );

  return (
    <section id="comment-reserver" className={`container ${styles.section}`} aria-labelledby="titre-reserver">
      <div className={`bezel ${styles.cadre}`} data-apparition>
        <div className={`bezel-coeur ${styles.coeur}`}>
          <div className={styles.illustration}>
            <Image
              src={illu.src}
              fill
              alt="Illustration d’un grand arbre dont le tronc abrite des étagères remplies de jeux"
              placeholder="blur"
              blurDataURL={illu.blurDataURL}
              sizes="(min-width: 1200px) 50vw, 100vw"
              className={styles.image}
            />
            <div className={styles.fondu} aria-hidden="true" />
          </div>

          <div className={styles.contenu}>
            <div className={styles.texte}>
              <h2 id="titre-reserver" className="t-titre">
                Comment réserver ?
              </h2>
              {/* Texte adapté : la maquette évoque les messages et le téléphone, mais les
                  réservations passent toutes par L'Addition (décision du client). */}
              <p className={styles.corps}>Les réservations se font en ligne, sur L’addition.</p>
            </div>

            {href ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className={styles.tuile}>
                {tuile}
              </a>
            ) : (
              <span className={styles.tuile} role="link" aria-disabled="true" title="Lien à compléter">
                {tuile}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
