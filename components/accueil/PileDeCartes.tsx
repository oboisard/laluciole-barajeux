'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import Button from '@/components/Button';
import styles from './PileDeCartes.module.css';

export type PhotoPile = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
  alt: string;
  /** Recadrage Figma (image agrandie dans la carte), en % de la carte. */
  cadrage?: { width: string; height: string; left: string; top: string };
};

type PileDeCartesProps = {
  photos: PhotoPile[];
  /** Titre et texte de la section (rendus côté serveur). */
  children: React.ReactNode;
};

// Section 1 (Figma 18:90) : paquet de photos en éventail.
// Flèche suivante : la carte en position 2 passe en position 1, la 3 en 2, etc.,
// et la carte de devant repart sous le paquet. Flèche précédente : l'inverse.
export default function PileDeCartes({ photos, children }: PileDeCartesProps) {
  const total = photos.length;
  const [devant, setDevant] = useState(0);
  const depart = useRef<number | null>(null);

  const suivante = () => setDevant((d) => (d + 1) % total);
  const precedente = () => setDevant((d) => (d - 1 + total) % total);

  // Glisser du doigt sur le paquet (souris exclue : les flèches suffisent).
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') depart.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (depart.current === null) return;
    const dx = e.clientX - depart.current;
    depart.current = null;
    if (Math.abs(dx) > 40) (dx < 0 ? suivante : precedente)();
  };

  return (
    <div className={styles.grille}>
      <div className={styles.colonneTexte}>
        <div className={styles.texte}>{children}</div>

        <div className={styles.controles}>
          <Button variant="noir" icon="arrowBack" label="Photo précédente" onClick={precedente} aria-controls="pile-photos" />
          <Button variant="noir" icon="arrowForward" label="Photo suivante" onClick={suivante} aria-controls="pile-photos" />
          <p className="t-outfit-20" aria-live="polite">
            <span className="visually-hidden">Photo </span>
            {devant + 1} / {total}
          </p>
        </div>
      </div>

      <div className={styles.zonePile}>
        <div
          id="pile-photos"
          className={`${styles.pile} reveal`}
          role="region"
          aria-roledescription="carrousel"
          aria-label="Photos du bar à jeux La Luciole"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (depart.current = null)}
        >
          {photos.map((photo, i) => {
            const position = ((i - devant + total) % total) + 1;
            return (
              <figure
                key={photo.src}
                className={styles.carte}
                data-position={position}
                aria-hidden={position !== 1}
                aria-roledescription="photo"
                aria-label={`${i + 1} sur ${total}`}
              >
                <Image
                  src={photo.src}
                  width={photo.width}
                  height={photo.height}
                  alt={photo.alt}
                  placeholder="blur"
                  blurDataURL={photo.blurDataURL}
                  sizes={photo.cadrage ? '(min-width: 1200px) 25vw, (min-width: 768px) 43vw, 75vw' : '(min-width: 1200px) 19vw, (min-width: 768px) 32vw, 56vw'}
                  className={photo.cadrage ? styles.imageCadree : styles.image}
                  style={photo.cadrage}
                  draggable={false}
                />
              </figure>
            );
          })}
        </div>
      </div>
    </div>
  );
}
