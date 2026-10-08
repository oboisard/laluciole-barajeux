import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import Navigation, { type LienNav } from '@/components/Navigation';
import { image } from '@/lib/images';
import { liens } from '@/lib/site';
import styles from './Header.module.css';

// V1 en page unique : chaque lien descend vers sa section de l'accueil.
export const LIENS_NAV: LienNav[] = [
  { href: '/#evenements', label: 'Événements' },
  { href: '/#le-bar', label: 'My ludos' },
  { href: '/#carte', label: 'La carte' },
  { href: '/#comment-venir', label: 'Venir chez nous' },
];

// Menu en îlot (Figma « Nav island ») : fixe, seule zone en verre dépoli du site.
export default function Header() {
  const logo = image('logo/logo-la-luciole.webp');

  return (
    <header className={styles.header}>
      <nav className={styles.ilot} aria-label="Navigation principale">
        <Link href="/" className={styles.marque} aria-label="La luciole bar, accueil">
          <Image src={logo.src} width={40} height={40} alt="" sizes="40px" className={styles.logo} />
          <span className={styles.nomMarque}>La luciole bar</span>
        </Link>

        <Navigation
          liensNav={LIENS_NAV}
          piedMenu={
            <Button href={liens.reserver} icon="arrowForward">
              Réserver
            </Button>
          }
        />

        <Button
          href={liens.reserver}
          taille="compacte"
          className={styles.reserver}
          label="Réserver"
          signalerLienManquant
        >
          <span className={styles.reserverTexte}>Réserver</span>
        </Button>
      </nav>
    </header>
  );
}
