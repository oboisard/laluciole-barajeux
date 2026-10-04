import Button from '@/components/Button';
import CarteGraille from '@/components/CarteGraille';
import carte from '@/data/carte.json';
import { liens } from '@/lib/site';
import styles from './PetiteSoif.module.css';

// Section Menu (Figma 20:25) : titre à gauche, 5 cartes en petit format ;
// la carte survolée grandit vers le haut jusqu'au grand format.
export default function PetiteSoif() {
  const cocktails = carte.categories.find((c) => c.id === 'cocktails')?.produits ?? [];
  const planche = carte.categories.find((c) => c.id === 'planches')?.produits[0];
  const produits = [cocktails[0], cocktails[1], planche, cocktails[2], cocktails[3]].filter(Boolean);

  return (
    <section id="carte" className={`container section ${styles.section}`} aria-labelledby="titre-soif">
      <div className={`${styles.entete} reveal`}>
        <h2 id="titre-soif" className="t-montserrat-h3">
          Une petite soif ?
        </h2>
        <p className="t-sous-titre-bleu">Cocktails et planches à partager</p>
        {/* V1 sans page /carte : ouvre le PDF de la carte (Google Drive, à fournir). */}
        <Button href={liens.cartePdf} variant="noir-bleue" icon="chevronForward">
          Découvrir la carte
        </Button>
      </div>

      <ul className={styles.cartes} role="list">
        {produits.map((p, i) => (
          <li key={p!.nom} className={`${styles.carte} ${i === 2 ? styles.centre : ''}`}>
            <CarteGraille
              nom={p!.nom}
              composition={p!.composition}
              imageKey={p!.image}
              alt={p!.alt}
              className="reveal-card"
              sizes={i === 2 ? '(min-width: 1200px) 18vw, 92vw' : '(min-width: 1200px) 18vw, 46vw'}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
