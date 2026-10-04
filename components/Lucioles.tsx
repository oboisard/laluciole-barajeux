import styles from './Lucioles.module.css';

// Positions fixes (rendu serveur identique à chaque build) : x, y en %, durée, délai, taille.
const LUCIOLES = [
  [12, 22, 9, 0, 6],
  [24, 64, 11, 1.5, 4],
  [38, 34, 8, 3, 5],
  [52, 78, 12, 0.8, 4],
  [61, 18, 10, 2.2, 6],
  [72, 52, 9, 4, 5],
  [84, 30, 13, 1, 4],
  [91, 70, 10, 2.8, 6],
  [46, 50, 14, 5, 3],
  [6, 82, 11, 3.6, 4],
] as const;

/** Lucioles lumineuses décoratives qui flottent et clignotent. Purement CSS. */
export default function Lucioles({ nombre = LUCIOLES.length }: { nombre?: number }) {
  return (
    <div className={styles.essaim} aria-hidden="true">
      {LUCIOLES.slice(0, nombre).map(([x, y, duree, delai, taille], i) => (
        <span
          key={i}
          className={styles.luciole}
          style={
            {
              '--x': `${x}%`,
              '--y': `${y}%`,
              '--duree': `${duree}s`,
              '--delai': `-${delai}s`,
              '--taille': `${taille}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
