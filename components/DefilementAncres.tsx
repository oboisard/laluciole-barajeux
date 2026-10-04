'use client';

import { useEffect } from 'react';

// Liens vers une section (« /#evenements », « #le-bar »…) : défilement doux qui s'arrête
// pile sur la section. Les sections hors écran ne sont mises en page qu'à l'approche
// (content-visibility: auto) avec une hauteur estimée : un défilement calculé d'avance
// s'arrêterait à côté. Au clic, juste avant le défilement, toutes les sections sont
// mises en page (html[data-sections-rendues], voir globals.css).
export default function DefilementAncres() {
  useEffect(() => {
    const surClic = (e: MouseEvent) => {
      const lien = e.target instanceof Element ? e.target.closest('a[href*="#"]') : null;
      if (lien) document.documentElement.setAttribute('data-sections-rendues', '');
    };
    // Phase de capture : avant que le lien ne lance la navigation.
    document.addEventListener('click', surClic, { capture: true, passive: true });
    return () => document.removeEventListener('click', surClic, { capture: true });
  }, []);

  return null;
}
