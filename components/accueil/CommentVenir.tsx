import Button from '@/components/Button';
import Icon from '@/components/Icon';
import { SITE, adresse, horairesGroupes, liens } from '@/lib/site';
import styles from './CommentVenir.module.css';

// Section « Comment venir » (Redesign Finale, Figma 116:616) : carte Google Maps dans son
// cadre, légèrement assombrie, encadré (adresse, accès, horaires) posé dessus.
export default function CommentVenir() {
  const recherche = encodeURIComponent(`${SITE.nom}, ${adresse.ligne}`);

  return (
    <section id="comment-venir" className={`container section ${styles.section}`} aria-labelledby="titre-venir">
      <div className={styles.entete} data-apparition>
        <h2 id="titre-venir" className="t-titre">
          Comment venir ?
        </h2>
        <p className="t-corps-l">
          Au 4 rue Beaumarchais à Mérignac, à 10 minutes du centre de Bordeaux. Accessible en tram, avec des places de
          parking à proximité.
        </p>
      </div>

      <div className={`bezel ${styles.cadre}`} data-apparition>
        <div className={`bezel-coeur ${styles.coeur}`}>
          <div className={styles.encadre}>
            <ul role="list" className={styles.acces}>
              <li>
                <Icon name="localisation" size={20} />
                <a href={liens.itineraire} target="_blank" rel="noopener noreferrer">
                  {adresse.courteVirgule}
                </a>
              </li>
              <li>
                <Icon name="tram" size={20} />
                <span>Accessible en tram {SITE.acces.tram}</span>
              </li>
              <li>
                <Icon name="parking" size={20} />
                <span>Parking à proximité</span>
              </li>
            </ul>

            <div className={styles.horaires}>
              <p className={styles.horairesTitre}>Horaires</p>
              <dl>
                {horairesGroupes().map((h) => (
                  <div key={h.jours} className={h.ferme ? styles.ferme : undefined}>
                    <dt>{h.jours}</dt>
                    <dd>{h.texte}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <Button href={liens.itineraire} variant="secondaire" taille="compacte">
              Ouvrir l’itinéraire
            </Button>
          </div>

          <div className={styles.carte}>
            {/* Hors de l'ordre de tabulation : le bouton « Ouvrir l'itinéraire » ouvre la
                même carte au clavier. */}
            <iframe
              src={`https://maps.google.com/maps?q=${recherche}&z=16&output=embed`}
              title={`Plan Google Maps : ${SITE.nom}, ${adresse.ligne}`}
              className={styles.iframe}
              loading="lazy"
              tabIndex={-1}
              allowFullScreen
            />
            <div className={styles.teinte} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
