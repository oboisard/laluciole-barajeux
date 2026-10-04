import Image from 'next/image';
import Avis, { type AvisData } from '@/components/Avis';
import Button from '@/components/Button';
import data from '@/data/avis.json';
import { image } from '@/lib/images';
import { liens } from '@/lib/site';
import styles from './AvisClients.module.css';

const PHOTOS = [
  { key: 'avis/salle-du-bar-joueurs-et-etageres-de-jeux.webp', alt: 'Joueurs attablés dans la salle du bar à jeux La Luciole, devant les étagères de jeux', apres: 0 },
  { key: 'avis/comptoir-du-bar-suspensions-et-plantes.webp', alt: 'Comptoir du bar La Luciole avec ses suspensions noires et ses plantes', apres: 4 },
];

// Section avis (Figma 28:90) : 6 avis Google en dur, 2 photos intercalées.
export default function AvisClients() {
  const avis = data.avis as AvisData[];
  const elements: React.ReactNode[] = [];

  avis.forEach((a, i) => {
    elements.push(
      <li key={a.auteur} className="reveal-card">
        <Avis avis={a} />
      </li>,
    );
    const photo = PHOTOS.find((p) => p.apres === i);
    if (photo) {
      const img = image(photo.key);
      elements.push(
        <li key={photo.key} className={`${styles.photo} reveal-card`}>
          <Image
            src={img.src}
            width={img.width}
            height={img.height}
            alt={photo.alt}
            placeholder="blur"
            blurDataURL={img.blurDataURL}
            sizes="(min-width: 1200px) 22vw, (min-width: 768px) 45vw, 80vw"
          />
        </li>,
      );
    }
  });

  return (
    <section className={`container section ${styles.section}`} aria-labelledby="titre-avis">
      <div className={`${styles.entete} reveal`}>
        <h2 id="titre-avis" className="t-montserrat-h3">
          Ce qu’on dit de nous !
        </h2>
        <p className="t-sous-titre-bleu">Avis de nos joueurs</p>
      </div>

      <ul className={styles.grille} role="list">
        {elements}
      </ul>

      <div className={styles.pied}>
        <p className="t-outfit-16">Sélection d’avis publiés par nos clients sur Google, recopiés sans modification.</p>
        <Button href={liens.avisGoogle} variant="noir" icon="etoile" external>
          Voir tous nos avis sur Google
        </Button>
      </div>
    </section>
  );
}
