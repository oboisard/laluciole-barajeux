import Button from '@/components/Button';
import CarteGraille from '@/components/CarteGraille';
import Carrousel from '@/components/accueil/Carrousel';
import { produitsALaUne } from '@/lib/carte';
import { liens } from '@/lib/site';
import styles from './PetiteSoif.module.css';

// Section « La carte » (Redesign Finale, Figma 116:435) : titre et bouton à gauche,
// flèches à droite, cartes en bande défilante qui déborde à droite de l'écran.
// Produits choisis dans data/carte.json (champ `aLaUne`).
export default function PetiteSoif() {
  const produits = produitsALaUne();
  // Sur mobile (deux colonnes), avec un nombre impair de produits, celui du milieu prend
  // toute la largeur : la grille reste pleine.
  const milieu = produits.length % 2 === 1 ? Math.floor(produits.length / 2) : -1;

  return (
    <section id="carte" className={`container section ${styles.section}`} aria-labelledby="titre-soif">
      <Carrousel
        libelle="Cocktails et planches à partager"
        entete={
          <div className={styles.titre} data-apparition>
            <div className={styles.texte}>
              <h2 id="titre-soif" className="t-titre">
                Une petite soif, un petit creux ?
              </h2>
              <p className="t-corps-l">
                Cocktails, planches à partager et desserts, avec des options végétariennes et sans lactose.
              </p>
            </div>
            {/* V1 sans page /carte : ouvre le PDF de la carte (Google Drive, à fournir). */}
            <Button href={liens.cartePdf}>Voir la carte</Button>
          </div>
        }
        cartes={produits.map((p, i) => ({
          cle: p.nom,
          large: i === milieu,
          contenu: <CarteGraille nom={p.nom} composition={p.composition} imageKey={p.image} alt={p.alt} />,
        }))}
      />
    </section>
  );
}
