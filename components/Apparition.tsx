'use client';

import { useEffect } from 'react';

// Entrée au défilement (Figma « Règles d'intégration ») : les éléments marqués
// data-apparition apparaissent en fondu, montée de 16 px et flou vers net, 80 ms
// d'écart entre les éléments qui entrent ensemble. Styles dans globals.css.
//
// Seuls les éléments d'une section encore sous la ligne de flottaison au chargement
// sont masqués : rien ne clignote en haut de page, et sans JavaScript tout reste visible.
export default function Apparition() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observateur = new IntersectionObserver(
      (entrees) => {
        entrees
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
          .forEach((entree, rang) => {
            const el = entree.target as HTMLElement;
            el.style.setProperty('--rang', String(Math.min(rang, 6)));
            el.dataset.apparition = 'visible';
            observateur.unobserve(el);
          });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );

    const basDeLEcran = window.innerHeight;
    document.querySelectorAll<HTMLElement>('[data-apparition]').forEach((el) => {
      // Position de la section (toujours mise en page) plutôt que de l'élément, dont le
      // contenu peut ne pas l'être encore (content-visibility: auto).
      const zone = el.closest('section, footer') ?? el;
      if (zone.getBoundingClientRect().top > basDeLEcran) {
        el.dataset.apparition = 'attente';
        observateur.observe(el);
      }
    });

    return () => observateur.disconnect();
  }, []);

  return null;
}
