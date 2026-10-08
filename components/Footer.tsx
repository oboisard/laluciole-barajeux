import Image from 'next/image';
import Link from 'next/link';
import ACompleter from '@/components/ACompleter';
import Icon from '@/components/Icon';
import { LIENS_NAV } from '@/components/Header';
import { image } from '@/lib/images';
import { SITE, adresse, liens } from '@/lib/site';
import styles from './Footer.module.css';

// Footer (Redesign Finale, Figma 116:706). Les intitulés de colonnes ne sont pas des
// titres Hn, pour ne pas modifier la structure de l'accueil.
export default function Footer() {
  const logo = image('logo/logo-la-luciole.webp');

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.haut}`}>
        <p className={styles.accroche}>Bar à jeux de société à Mérignac, à 10 minutes de Bordeaux.</p>

        <div className={styles.colonnes}>
          <nav aria-labelledby="footer-nav" className={styles.colonne}>
            <p id="footer-nav" className={styles.intitule}>
              Navigation
            </p>
            <ul role="list">
              {LIENS_NAV.map((lien) => (
                <li key={lien.href}>
                  <Link href={lien.href} className={styles.lien}>
                    {lien.label}
                  </Link>
                </li>
              ))}
              <li>
                {liens.reserver ? (
                  <a href={liens.reserver} className={styles.lien} target="_blank" rel="noopener noreferrer">
                    Réserver
                  </a>
                ) : (
                  <span>
                    Réserver <ACompleter>lien de réservation</ACompleter>
                  </span>
                )}
              </li>
            </ul>
          </nav>

          <address className={styles.colonne}>
            <p className={styles.intitule}>Contact</p>
            <ul role="list">
              <li>
                {liens.telephone ? (
                  <a href={liens.telephone} className={styles.lien}>
                    {SITE.telephone.affiche}
                  </a>
                ) : (
                  <ACompleter>téléphone</ACompleter>
                )}
              </li>
              <li>
                <a href={liens.itineraire} className={styles.lien} target="_blank" rel="noopener noreferrer">
                  {adresse.courteVirgule}
                </a>
              </li>
            </ul>
          </address>

          <div className={styles.colonne}>
            <p className={styles.intitule}>Nous suivre</p>
            <ul role="list">
              {(
                [
                  ['instagram', 'Instagram', liens.instagram],
                  ['facebook', 'Facebook', liens.facebook],
                ] as const
              ).map(([icone, nom, url]) => (
                <li key={icone}>
                  {url ? (
                    <a href={url} className={`${styles.lien} ${styles.reseau}`} target="_blank" rel="noopener noreferrer">
                      <Icon name={icone} size={18} />
                      {nom}
                    </a>
                  ) : (
                    <span className={styles.reseau}>
                      <Icon name={icone} size={18} />
                      {nom} <ACompleter>lien</ACompleter>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={`container ${styles.signature}`}>
        <Image src={logo.src} width={200} height={198} alt="" sizes="(min-width: 768px) 200px, 64px" className={styles.logo} />
        <p className={styles.geant} aria-hidden="true">
          La luciole bar
        </p>
      </div>

      <div className="container">
        <div className={styles.legal}>
          <p>© {new Date().getFullYear()} {SITE.nom}</p>
          <p>L’abus d’alcool est dangereux pour la santé, à consommer avec modération.</p>
          <Link href="/mentions-legales" className={styles.lien}>
            Mentions légales
          </Link>
        </div>
      </div>
    </footer>
  );
}
