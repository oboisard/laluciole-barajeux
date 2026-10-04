import Button from '@/components/Button';
import { SITE, adresse, horairesGroupes, liens } from '@/lib/site';
import styles from './CommentVenir.module.css';

// Section « Comment venir » (Figma 23:197) : carte Google Maps en grand, titre, texte
// et horaires posés dessus. Carte chargée en différé (loading="lazy") : rien n'est
// demandé à Google tant que le visiteur n'approche pas de la section.
export default function CommentVenir() {
  const recherche = encodeURIComponent(`${SITE.nom}, ${adresse.ligne}`);

  return (
    <section id="comment-venir" className="container section" aria-labelledby="titre-venir">
      <div className={`${styles.plan} reveal-card`}>
        <div className={styles.panneau}>
          <div className={styles.entete}>
            <h2 id="titre-venir" className="t-montserrat-h3">
              Comment venir ?
            </h2>
            <p className="t-outfit-20">
              Situé au <strong className={styles.adresse}>{adresse.courte}</strong>, à 10 minutes du centre de Bordeaux,
              notre bar à jeux est accessible en tram et dispose de places de parking à proximité.
            </p>
          </div>

          <div className={styles.horaires}>
            <p className="t-outfit-h6">Nos horaires</p>
            <dl className="t-outfit-20">
              {horairesGroupes().map((h) => (
                <div key={h.jours} className={h.ferme ? styles.ferme : undefined}>
                  <dt>{h.jours}</dt>
                  <dd>{h.texte}</dd>
                </div>
              ))}
            </dl>
            <Button href={liens.itineraire} variant="blanc" icon="localisation">
              Itinéraire
            </Button>
          </div>
        </div>

        {/* Après le texte dans le code : le titre de la section est lu avant la carte.
            Hors de l'ordre de tabulation : le focus se perdrait sous le panneau, dans la
            fiche Google masquée. Le bouton « Itinéraire » ouvre la même carte au clavier. */}
        <iframe
          src={`https://maps.google.com/maps?q=${recherche}&z=16&output=embed`}
          title={`Plan Google Maps : ${SITE.nom}, ${adresse.ligne}`}
          className={styles.carte}
          loading="lazy"
          tabIndex={-1}
          allowFullScreen
        />
      </div>
    </section>
  );
}
