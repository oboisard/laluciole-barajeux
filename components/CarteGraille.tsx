import Image from 'next/image';
import ACompleter from '@/components/ACompleter';
import { image } from '@/lib/images';
import styles from './CarteGraille.module.css';

type CarteGrailleProps = {
  nom: string;
  composition: string;
  /** Clé dans data/images.json, ou null : placeholder en attendant la photo. */
  imageKey: string | null;
  alt: string;
  sizes?: string;
  className?: string;
};

// Carte de la carte (Redesign Finale, « card_carte ») : photo dans son cadre, nom et
// composition en dessous.
export default function CarteGraille({
  nom,
  composition,
  imageKey,
  alt,
  sizes = '(min-width: 768px) 388px, 46vw',
  className,
}: CarteGrailleProps) {
  const img = imageKey ? image(imageKey) : null;

  return (
    <article className={`${styles.carte} ${className ?? ''}`}>
      <div className={`bezel ${styles.cadre}`}>
        <div className={`bezel-coeur ${styles.coeur}`}>
          {img ? (
            <Image
              src={img.src}
              fill
              alt={alt}
              placeholder="blur"
              blurDataURL={img.blurDataURL}
              sizes={sizes}
              className={styles.image}
            />
          ) : (
            <div className={styles.placeholder}>
              <ACompleter>photo</ACompleter>
            </div>
          )}
        </div>
      </div>
      <div className={styles.legende}>
        <p className="t-titre-carte">{nom}</p>
        <p className={styles.composition}>{composition}</p>
      </div>
    </article>
  );
}
