import ACompleter from '@/components/ACompleter';
import Button from '@/components/Button';
import { SITE, liens } from '@/lib/site';
import styles from './CommentReserver.module.css';

// Section « Comment réserver ? » (ex « Une question ? », Figma 23:271, refaite par Louis
// en oct. 2026) : téléphone, Instagram, Facebook et réservation en ligne (L'Addition).
export default function CommentReserver() {
  return (
    <section id="comment-reserver" className="container section" aria-labelledby="titre-reserver">
      <div className={`${styles.contenu} reveal`}>
        <h2 id="titre-reserver" className="t-montserrat-h3">
          Comment réserver ?
        </h2>

        <ul role="list" className={`t-body-m-18 ${styles.moyens}`}>
          <li>
            Par téléphone :{' '}
            {liens.telephone ? (
              <a href={liens.telephone} className={styles.telephone}>
                {SITE.telephone.affiche}
              </a>
            ) : (
              <ACompleter>numéro de téléphone</ACompleter>
            )}
          </li>
          <li className={styles.ligne}>
            <span>Via Instagram</span>
            <Button href={liens.dmInstagram} variant="bleue" icon="instagram">
              Via Instagram
            </Button>
          </li>
          <li className={styles.ligne}>
            <span>Via facebook</span>
            <Button href={liens.messenger} variant="bleue" icon="facebook">
              Sur facebook !
            </Button>
          </li>
          <li className={styles.ligne}>
            <span>Réserver en ligne</span>
            <Button href={liens.reservationEnLigne} variant="bleue" icon="etoile" label="Réserver en ligne sur L’addition">
              L’addition
            </Button>
          </li>
        </ul>

        <p className="t-outfit-h6">
          Venez nous rendre visite
          <br />
          ou envoyez nous un message
        </p>
      </div>
    </section>
  );
}
