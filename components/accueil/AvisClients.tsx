import Image from 'next/image';
import Avis, { type AvisData } from '@/components/Avis';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import data from '@/data/avis.json';
import { image } from '@/lib/images';
import { SITE, liens } from '@/lib/site';
import styles from './AvisClients.module.css';

// Section avis (Redesign Finale, Figma 116:518) : note Google à gauche, six avis à droite.
export default function AvisClients() {
  const avis = data.avis as AvisData[];
  const photo = image('avis/comptoir-du-bar-suspensions-et-plantes.webp');
  const { moyenne, nombre } = SITE.noteGoogle;

  return (
    <section id="avis" className={`container section ${styles.section}`} aria-labelledby="titre-avis">
      <div className={styles.entete} data-apparition>
        <h2 id="titre-avis" className="t-titre">
          Ce qu’en disent nos joueurs
        </h2>
        <p className="t-corps-l">Avis laissés sur Google</p>
      </div>

      <div className={styles.rangee}>
        <div className={`bezel ${styles.noteCadre}`} data-apparition>
          <div className={`bezel-coeur ${styles.note}`}>
            <div className={styles.photo}>
              <Image
                src={photo.src}
                fill
                alt="Comptoir du bar La Luciole avec ses suspensions noires et ses plantes"
                placeholder="blur"
                blurDataURL={photo.blurDataURL}
                sizes="(min-width: 1200px) 25vw, 100vw"
                className={styles.photoImage}
              />
            </div>
            <div className={styles.noteInfos}>
              <span className={styles.etoiles} aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <Icon key={i} name="etoile" size={22} />
                ))}
              </span>
              <p>
                <span className={styles.moyenne}>{moyenne}</span>
                <span className={styles.base}>sur 5, d’après {nombre} avis Google</span>
              </p>
              <Button href={liens.avisGoogle} variant="secondaire" taille="compacte" external>
                Voir sur Google
              </Button>
            </div>
          </div>
        </div>

        <ul role="list" className={styles.grille}>
          {avis.map((a) => (
            <li key={a.auteur} data-apparition>
              <Avis avis={a} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
