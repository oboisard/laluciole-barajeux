import Image from 'next/image';
import Button from '@/components/Button';
import LigneFormule from '@/components/LigneFormule';
import data from '@/data/formules.json';
import { image } from '@/lib/images';
import { liens } from '@/lib/site';
import styles from './TeamBuilding.module.css';

// Section team building (Redesign Finale, Figma 116:481). Ancre #team-building.
export default function TeamBuilding() {
  const illu = image('illustrations/illustration-abeille-et-fourmis-jeu-de-plateau.webp');

  return (
    <section id="team-building" className={`container section ${styles.section}`} aria-labelledby="titre-team-building">
      <figure className={`bezel ${styles.illustration}`} data-apparition>
        <div className={`bezel-coeur ${styles.illustrationCoeur}`}>
          <Image
            src={illu.src}
            fill
            alt="Illustration d’une abeille et de fourmis jouant à un jeu de plateau"
            placeholder="blur"
            blurDataURL={illu.blurDataURL}
            sizes="(min-width: 1200px) 37vw, 100vw"
            className={styles.image}
          />
        </div>
      </figure>

      <div className={styles.contenu}>
        <div className={styles.texte} data-apparition>
          <h2 id="titre-team-building" className="t-titre">
            Team building et soirées d’entreprise à Mérignac
          </h2>
          <p className={styles.accroche}>Sortez vos équipes des écrans, le temps d’une soirée.</p>
          <p className={styles.corps}>
            Afterwork, séminaire, soirée CE ou pot de départ : La Luciole accueille vos groupes dans un cadre chaleureux,
            à 10 minutes de Bordeaux. Jeux, cocktails et planches à partager, vous n’avez plus qu’à jouer.
          </p>
        </div>

        <div className="bezel" data-apparition>
          <ul role="list" className={`bezel-coeur ${styles.formules}`}>
            {data.formules.map((f) => (
              <LigneFormule key={f.id} titre={f.titre} description={f.description} capacite={f.capacite} />
            ))}
          </ul>
        </div>

        <div data-apparition>
          <Button href={liens.devis}>Demander un devis</Button>
        </div>
      </div>
    </section>
  );
}
