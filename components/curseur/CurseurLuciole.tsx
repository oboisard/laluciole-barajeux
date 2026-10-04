'use client';

import { useEffect } from 'react';
import styles from './CurseurLuciole.module.css';

// Curseur en forme de luciole qui bat des ailes et laisse une traînée de lumière.
// Le moteur n'est téléchargé que sur les appareils avec une souris, hors réduction
// des animations et mode contraste élevé : partout ailleurs, curseur natif.
export default function CurseurLuciole() {
  useEffect(() => {
    const souris = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const sobre = matchMedia('(prefers-reduced-motion: reduce), (forced-colors: active)').matches;
    if (!souris || sobre) return;

    let annule = false;
    let arreter: (() => void) | undefined;
    import('./moteur').then(({ demarrer }) => {
      if (!annule) arreter = demarrer(styles);
    });
    return () => {
      annule = true;
      arreter?.();
    };
  }, []);

  return null;
}
