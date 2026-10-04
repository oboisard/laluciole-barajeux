import Image from 'next/image';
import Button from '@/components/Button';
import LigneFormule from '@/components/LigneFormule';
import data from '@/data/formules.json';
import { image } from '@/lib/images';
import { liens } from '@/lib/site';
import styles from './TeamBuilding.module.css';

// Section team building (Figma 58:426). Ancre #team-building utilisée par la section événements.
export default function TeamBuilding() {
  const illu = image('illustrations/illustration-abeille-et-fourmis-jeu-de-plateau.webp');

  return (
    <section id="team-building" className={`container section ${styles.section}`} aria-labelledby="titre-team-building">
      <h2 id="titre-team-building" className={`t-montserrat-h3 ${styles.titre} reveal`}>
        Team building et soirées d’entreprise à Mérignac
      </h2>

      <div className={styles.corps}>
        <div className={styles.contenu}>
          <div className={`${styles.texte} reveal`}>
            <p className="t-outfit-h6">Sortez vos équipes des écrans, le temps d’une soirée.</p>
            <p className="t-outfit-20">
              Afterwork, séminaire, soirée CE ou pot de départ : La Luciole accueille vos groupes dans un cadre chaleureux,
              à 10 minutes de Bordeaux. Jeux, cocktails et planches à partager… vous n’avez plus qu’à jouer.
            </p>
          </div>

          <ol className={styles.formules} role="list">
            {data.formules.map((f, i) => (
              <LigneFormule
                key={f.id}
                numero={String(i + 1).padStart(2, '0')}
                titre={f.titre}
                description={f.description}
                capacite={f.capacite}
              />
            ))}
          </ol>

          <div className={styles.ctas}>
            <Button href={liens.devis} variant="bleue" icon="arrowForward">
              Demander un devis
            </Button>
            <Button href={liens.telephone} variant="blanc" icon="telephone">
              Par téléphone
            </Button>
          </div>
        </div>

        <figure className={`${styles.illustration} reveal-card`}>
          <Image
            src={illu.src}
            fill
            alt="Illustration d’une abeille et de fourmis jouant à un jeu de plateau"
            placeholder="blur"
            blurDataURL={illu.blurDataURL}
            sizes="(min-width: 1200px) 716px, 100vw"
            className={styles.image}
          />
          <figcaption className="t-outfit-h5">Plus de 200 jeux pour faire jouer toute l’équipe.</figcaption>
        </figure>
      </div>
    </section>
  );
}
