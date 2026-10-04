import PileDeCartes, { type PhotoPile } from '@/components/accueil/PileDeCartes';
import { image } from '@/lib/images';
import styles from './LeBar.module.css';

// Photos du paquet, de la carte de devant à celle du fond (Figma 18:90).
const PHOTOS: { key: string; alt: string; cadrage?: PhotoPile['cadrage'] }[] = [
  {
    key: 'lieu/partie-jeu-de-plateau-et-biere.webp',
    alt: 'Partie de jeu de plateau avec une bière au bar La Luciole',
    cadrage: { width: '133.76%', height: '153.04%', left: '-16.88%', top: '-7.21%' },
  },
  { key: 'lieu/boites-de-jeux-mad-et-crack-list.webp', alt: 'Boîtes de jeux de société MAD et Crack List dans la ludothèque de La Luciole' },
  { key: 'lieu/joueurs-partie-de-cartes-et-cidre.webp', alt: 'Joueurs en pleine partie de cartes autour d’une table du bar La Luciole' },
  { key: 'lieu/bonbons-dans-des-bols-sur-le-comptoir.webp', alt: 'Bols de bonbons sur le comptoir du bar La Luciole' },
];

// Section 1 / SEO (Figma 18:90)
export default function LeBar() {
  const photos: PhotoPile[] = PHOTOS.map(({ key, alt, cadrage }) => ({ ...image(key), alt, cadrage }));

  return (
    <section id="le-bar" className={`container section ${styles.section}`} aria-labelledby="titre-le-bar">
      <PileDeCartes photos={photos}>
        <h2 id="titre-le-bar" className="t-montserrat-h3 reveal">
          Un bar à jeux convivial à Mérignac
        </h2>
        <p className="t-outfit-20 reveal">
          Envie de sortir sans écran ni bruit de fond ? Notre bar à jeux à Mérignac, à deux pas de Bordeaux, vous accueille
          dans un cadre chaleureux pour jouer, boire un verre et passer un vrai moment ensemble. Plateau, cartes, ambiance
          conviviale : tout est pensé pour reconnecter autour du jeu.
        </p>
      </PileDeCartes>
    </section>
  );
}
