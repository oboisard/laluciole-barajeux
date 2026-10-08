import type { Metadata } from 'next';
import Button from '@/components/Button';
import Lucioles from '@/components/Lucioles';
import styles from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Page introuvable',
  robots: { index: false },
};

export default function PageIntrouvable() {
  return (
    <section className={`container ${styles.page}`} aria-labelledby="titre-404" data-entete-sombre>
      <div className={styles.carte}>
        <Lucioles />
        <p className={styles.code} aria-hidden="true">
          404
        </p>
        <h1 id="titre-404" className="t-titre">
          Cette page s’est envolée…
        </h1>
        <p className={`t-corps-l ${styles.texte}`}>Elle n’existe pas ou plus. Revenez au bar, les jeux vous attendent.</p>
        <Button href="/" icon="arrowBack">
          Retour à l’accueil
        </Button>
      </div>
    </section>
  );
}
