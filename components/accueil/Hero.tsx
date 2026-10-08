import { getImageProps } from 'next/image';
import Button from '@/components/Button';
import { image } from '@/lib/images';
import { liens } from '@/lib/site';
import styles from './Hero.module.css';

const ILLUSTRATION = 'hero/illustration-arbre-et-table-de-jeu-au-crepuscule.webp';

// Héro (Redesign Finale, Figma 116:325). L'illustration est l'élément LCP : chargée en
// priorité haute, avec un recadrage portrait dédié au mobile (art direction).
export default function Hero() {
  const paysage = image(ILLUSTRATION);
  const portrait = image(ILLUSTRATION.replace('.webp', '-mobile.webp'));
  const commun = {
    alt: 'Illustration d’une table de jeu sous un grand arbre, entourée de lucioles au crépuscule',
    quality: 75,
    fetchPriority: 'high' as const,
    loading: 'eager' as const,
  };

  const {
    props: { srcSet: srcSetPaysage },
  } = getImageProps({ ...commun, src: paysage.src, width: paysage.width, height: paysage.height, sizes: '100vw' });
  // Mobile : recadrage portrait plus léger (qualité 60), l'élément LCP doit arriver vite en 4G.
  const {
    props: { srcSet: srcSetPortrait, ...img },
  } = getImageProps({ ...commun, quality: 60, src: portrait.src, width: portrait.width, height: portrait.height, sizes: '100vw' });

  return (
    <section className={styles.hero} aria-labelledby="titre-hero">
      <div className={styles.bezel}>
        <div className={styles.coeur}>
          <picture>
            <source media="(min-width: 768px)" srcSet={srcSetPaysage} sizes="100vw" />
            <img {...img} srcSet={srcSetPortrait} className={styles.image} />
          </picture>
          <div className={styles.voileBas} aria-hidden="true" />
          <div className={styles.voileGauche} aria-hidden="true" />

          <div className={styles.contenu}>
            <h1 id="titre-hero" className={`t-hero ${styles.titre}`} style={{ '--rang': 0 } as React.CSSProperties}>
              Le bar à jeux de Mérignac où chaque soirée devient une aventure
            </h1>
            <p className={styles.sousTitre} style={{ '--rang': 1 } as React.CSSProperties}>
              Plus de 200 jeux de société, des cocktails et des planches à partager, entre amis, en famille ou entre
              collègues.
            </p>
            <div className={styles.ctas} style={{ '--rang': 2 } as React.CSSProperties}>
              <Button href={liens.reserver}>Réserver</Button>
              <Button href="/#carte" variant="secondaire">
                Voir la carte
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
