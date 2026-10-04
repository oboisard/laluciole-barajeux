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
  prix?: number | null;
  afficherPrix?: boolean;
  titreAs?: 'p' | 'h3';
  sizes?: string;
  className?: string;
};

const euros = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

// Carte Graille (Figma 23:68) : cocktails et plats.
export default function CarteGraille({
  nom,
  composition,
  imageKey,
  alt,
  prix,
  afficherPrix,
  titreAs: Titre = 'p',
  sizes = '(min-width: 1200px) 18vw, (min-width: 768px) 30vw, 75vw',
  className,
}: CarteGrailleProps) {
  const img = imageKey ? image(imageKey) : null;

  return (
    <article className={`${styles.carte} ${className ?? ''}`}>
      {img ? (
        <Image
          src={img.src}
          width={img.width}
          height={img.height}
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
      <div className={styles.degrade} aria-hidden="true" />
      <Titre className={`t-outfit-h5 ${styles.nom}`}>{nom}</Titre>
      <p className="t-outfit-20">{composition}</p>
      {afficherPrix && (
        <p className={`t-outfit-24b ${styles.prix}`}>{prix != null ? euros.format(prix) : <ACompleter>prix</ACompleter>}</p>
      )}
    </article>
  );
}
