import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import Navigation, { type LienNav } from '@/components/Navigation';
import { image } from '@/lib/images';
import { liens } from '@/lib/site';
import styles from './Header.module.css';

// V1 en page unique : chaque lien descend vers sa section de l'accueil.
export const LIENS_NAV: LienNav[] = [
  { href: '/#evenements', label: 'Évènements' },
  { href: '/#le-bar', label: 'My ludos' },
  { href: '/#carte', label: 'La carte' },
  { href: '/#team-building', label: 'Privatisation' },
  { href: '/#comment-venir', label: 'Venir chez nous' },
];

// Nav bar (Figma 16:189) : pilule flottante en verre dépoli, fixe au défilement.
export default function Header() {
  const logo = image('logo/logo-la-luciole.webp');

  return (
    <header className={styles.header}>
      <nav className={styles.pill} aria-label="Navigation principale">
        <Link href="/" className={styles.marque} aria-label="La luciole bar, accueil">
          <Image src={logo.src} width={48} height={48} alt="" sizes="48px" className={styles.logo} />
          <span className={styles.nomMarque}>La luciole bar</span>
        </Link>

        <Navigation
          liensNav={LIENS_NAV}
          piedMenu={
            <>
              <Button href={liens.reserver} variant="blanc" icon="calendrier">
                Réserver une table
              </Button>
              <Button href={liens.telephone} variant="noir-jaune" icon="telephone">
                Appeler
              </Button>
            </>
          }
        />

        <Button href={liens.reserver} variant="blanc" icon="calendrier" className={styles.reserver} signalerLienManquant>
          <span className={styles.reserverTexte}>Réserver !</span>
        </Button>
      </nav>
    </header>
  );
}
