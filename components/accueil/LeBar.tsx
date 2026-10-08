import Image from 'next/image';
import { image } from '@/lib/images';
import styles from './LeBar.module.css';

const CHIFFRES = [
  { valeur: '200+', texte: 'jeux de société à jouer sur place' },
  { valeur: '10 min', texte: 'du centre de Bordeaux, accès en tram' },
  { valeur: '5 jours', texte: 'd’ouverture, du mercredi au dimanche' },
];

// Mosaïque (Figma « div_img_bento ») : grande, petite / petite, grande.
// La photo de la salle montre des clients : version au flou uniforme (scripts/floutage.json).
const PHOTOS = [
  { key: 'hero/etageres-jeux-de-societe-bar-a-jeux-merignac.webp', alt: 'Étagères remplies de jeux de société au bar à jeux La Luciole à Mérignac', classe: 'ludotheque' },
  { key: 'avis/salle-du-bar-joueurs-et-etageres-de-jeux.webp', alt: 'Joueurs attablés dans la salle du bar à jeux La Luciole, devant les étagères de jeux', classe: 'salle' },
  { key: 'lieu/partie-jeu-de-plateau-et-biere.webp', alt: 'Partie de jeu de plateau avec une bière au bar La Luciole', classe: 'partie' },
  { key: 'lieu/bonbons-dans-des-bols-sur-le-comptoir.webp', alt: 'Bols de bonbons sur le comptoir du bar La Luciole', classe: 'bonbons' },
] as const;

// Section « Le bar » (Redesign Finale, Figma 116:356).
export default function LeBar() {
  return (
    <section id="le-bar" className={`container section ${styles.section}`} aria-labelledby="titre-le-bar">
      <div className={styles.texte}>
        <div className={styles.intro} data-apparition>
          <h2 id="titre-le-bar" className="t-titre">
            Un bar à jeux convivial à Mérignac
          </h2>
          <p className="t-corps-l">
            Envie de sortir sans écran ni bruit de fond ? Notre bar à jeux à Mérignac, à deux pas de Bordeaux, vous
            accueille dans un cadre chaleureux pour jouer, boire un verre et passer un vrai moment ensemble.
          </p>
        </div>

        <dl className={styles.chiffres}>
          {CHIFFRES.map((c) => (
            <div key={c.valeur} className={styles.chiffre} data-apparition>
              <dt className={styles.valeur}>{c.valeur}</dt>
              <dd className={styles.legende}>{c.texte}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={styles.mosaique}>
        {PHOTOS.map((p) => {
          const img = image(p.key);
          return (
            <figure key={p.key} className={`bezel ${styles.photo} ${styles[p.classe]}`} data-apparition>
              <div className={`bezel-coeur ${styles.coeur}`}>
                <Image
                  src={img.src}
                  fill
                  alt={p.alt}
                  placeholder="blur"
                  blurDataURL={img.blurDataURL}
                  sizes="(min-width: 1200px) 30vw, (min-width: 768px) 60vw, 50vw"
                  className={styles.image}
                />
              </div>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
