'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icon';
import styles from './PetiteSoif.module.css';

type CarrouselProps = {
  /** En-tête de section (rendu serveur), avec les flèches à sa droite. */
  entete: React.ReactNode;
  cartes: { cle: string; contenu: React.ReactNode; large?: boolean }[];
  libelle: string;
};

// Bande défilante de la carte (Figma « strip_scroll ») : défilement natif avec points
// d'accroche, flèches pour avancer d'une carte. Sur mobile, grille sans défilement.
export default function Carrousel({ entete, cartes, libelle }: CarrouselProps) {
  const piste = useRef<HTMLUListElement>(null);
  const [auDebut, setAuDebut] = useState(true);
  const [aLaFin, setALaFin] = useState(false);

  // Flèches désactivées aux extrémités : on observe la première et la dernière carte.
  useEffect(() => {
    const el = piste.current;
    if (!el || el.children.length === 0) return;
    const premiere = el.firstElementChild!;
    const derniere = el.lastElementChild!;
    const observateur = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) {
          const visible = e.intersectionRatio > 0.9;
          if (e.target === premiere) setAuDebut(visible);
          if (e.target === derniere) setALaFin(visible);
        }
      },
      { root: el, threshold: [0, 0.9, 1] },
    );
    observateur.observe(premiere);
    observateur.observe(derniere);
    return () => observateur.disconnect();
  }, []);

  const defiler = (sens: 1 | -1) => {
    const el = piste.current;
    const carte = el?.firstElementChild as HTMLElement | null;
    if (!el || !carte) return;
    const ecart = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: sens * (carte.offsetWidth + ecart) });
  };

  return (
    <>
      <div className={styles.entete}>
        {entete}
        <div className={styles.controles}>
          <button
            type="button"
            className={styles.fleche}
            aria-label="Carte précédente"
            aria-controls="piste-carte"
            disabled={auDebut}
            onClick={() => defiler(-1)}
          >
            <Icon name="arrowBack" size={22} />
          </button>
          <button
            type="button"
            className={styles.fleche}
            aria-label="Carte suivante"
            aria-controls="piste-carte"
            disabled={aLaFin}
            onClick={() => defiler(1)}
          >
            <Icon name="arrowForward" size={22} />
          </button>
        </div>
      </div>

      {/* Zone défilante atteignable au clavier (flèches gauche/droite une fois ciblée). */}
      <ul id="piste-carte" ref={piste} role="list" tabIndex={0} aria-label={libelle} className={styles.piste}>
        {cartes.map((c) => (
          <li key={c.cle} className={`${styles.element} ${c.large ? styles.large : ''}`} data-apparition>
            {c.contenu}
          </li>
        ))}
      </ul>
    </>
  );
}
