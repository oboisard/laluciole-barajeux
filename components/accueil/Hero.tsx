import { getImageProps } from 'next/image';
import Button from '@/components/Button';
import Lucioles from '@/components/Lucioles';
import { IMAGE_PRINCIPALE } from '@/lib/jsonld';
import { image } from '@/lib/images';
import styles from './Hero.module.css';

// Héro (Figma 15:18). L'image est l'élément LCP : chargée en priorité haute,
// avec un recadrage portrait dédié au mobile (art direction).
export default function Hero() {
  const paysage = image(IMAGE_PRINCIPALE);
  const portrait = image(IMAGE_PRINCIPALE.replace('.webp', '-mobile.webp'));
  const commun = {
    alt: 'Étagères remplies de jeux de société au bar à jeux La Luciole à Mérignac',
    quality: 75,
    fetchPriority: 'high' as const,
    loading: 'eager' as const,
  };

  const {
    props: { srcSet: srcSetPaysage },
  } = getImageProps({ ...commun, src: paysage.src, width: paysage.width, height: paysage.height, sizes: '100vw' });
  // Mobile : recadrage portrait plus léger (qualité 60) — l'élément LCP doit arriver vite en 4G.
  const {
    props: { srcSet: srcSetPortrait, ...img },
  } = getImageProps({ ...commun, quality: 60, src: portrait.src, width: portrait.width, height: portrait.height, sizes: '100vw' });

  return (
    <section className={styles.hero} aria-labelledby="titre-hero">
      <div className={styles.cadre}>
        <picture>
          <source media="(min-width: 768px)" srcSet={srcSetPaysage} sizes="100vw" />
          <img {...img} srcSet={srcSetPortrait} className={styles.image} />
        </picture>
        <div className={styles.degrade} aria-hidden="true" />
        <Lucioles />

        <div className={styles.infos}>
          <h1 id="titre-hero" className="t-hero-titre">
            Le bar à jeux de Mérignac où chaque soirée devient une aventure !
          </h1>
          <p className="t-outfit-20">
            Jeux de société, cocktails et bonne ambiance : bienvenue dans le bar à jeux nouvelle génération de Mérignac.
            Plus de 200 jeux à découvrir entre amis, en famille ou entre collègues.
          </p>
          <Button href="#le-bar" variant="blanc" icon="chevronForward">
            Découvrir le bar
          </Button>
        </div>
      </div>
    </section>
  );
}
