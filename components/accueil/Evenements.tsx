import Button from '@/components/Button';
import CarteEvent from '@/components/CarteEvent';
import type { EvenementAffiche } from '@/lib/evenements';
import styles from './Evenements.module.css';

// Section « nos event » (Figma 23:72) sur sa vague jaune (Figma 74:482).
export default function Evenements({ evenements }: { evenements: EvenementAffiche[] }) {
  const affiches = [...evenements].sort((a, b) => Number(b.miseEnAvant) - Number(a.miseEnAvant)).slice(0, 4);

  return (
    <section id="evenements" className={`section ${styles.section}`} aria-labelledby="titre-evenements">
      <Vague />

      <div className={`container ${styles.contenu}`}>
        <div className={styles.entete}>
          <div className={`${styles.texte} reveal`}>
            <h2 id="titre-evenements" className="t-montserrat-h3">
              Soirées jeux et tournois chaque semaine
            </h2>
            <p className="t-outfit-20">
              Tournois, soirées à thème, jeux de rôle grandeur nature : chaque semaine, notre bar à jeux de Mérignac
              propose des événements pour tous les niveaux. Consultez le programme et réservez votre table.
            </p>
          </div>
          <div className={`${styles.ce} reveal`}>
            <p className="t-outfit-24b">Envie de réserver une soirée CE ?</p>
            <Button href="#team-building" variant="blanc-bleue" icon="telephone">
              Nous contacter
            </Button>
          </div>
        </div>

        <ul className={styles.cartes} role="list">
          {affiches.map((e, i) => (
            <li key={e.id} className={i === 0 ? styles.grande : undefined}>
              <CarteEvent
                evenement={e}
                grande={i === 0}
                sizes={
                  i === 0
                    ? '(min-width: 1200px) 34vw, (min-width: 768px) 90vw, 92vw'
                    : '(min-width: 1200px) 20vw, (min-width: 768px) 45vw, 92vw'
                }
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Fond jaune à bords ondulés : bord haut et bord bas en SVG (proportions gardées
// quelle que soit la hauteur de la section), corps uni entre les deux.
function Vague() {
  return (
    <div className={styles.vague} aria-hidden="true">
      {/* Les tracés débordent de 3 unités sur le corps (overflow visible) : pas de liseré au raccord. */}
      <svg className={styles.vagueHaut} viewBox="0 0 1920 56" preserveAspectRatio="none" overflow="visible" focusable="false">
        <path d="M0 3.8C0 3.8 345.427 54.844 573.5 52.76C844.803 50.281 976.241 22.546 1246.75 3.8C1509.96 -14.441 1920 38.923 1920 38.923V59H0Z" />
      </svg>
      <div className={styles.vagueCorps} />
      <svg className={styles.vagueBas} viewBox="0 0 1920 64" preserveAspectRatio="none" overflow="visible" focusable="false">
        <path d="M0 -3H1920V31.898C1920 31.898 1513.81 2.276 1246.75 14.59C972.501 27.235 826.251 46.688 552.097 60.89C326.446 72.578 0 31.898 0 31.898Z" />
      </svg>
    </div>
  );
}
