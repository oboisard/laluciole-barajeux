import Image from 'next/image';
import Link from 'next/link';
import ACompleter from '@/components/ACompleter';
import Icon from '@/components/Icon';
import { LIENS_NAV } from '@/components/Header';
import { image } from '@/lib/images';
import { SITE, adresse, horairesGroupes, liens } from '@/lib/site';
import styles from './Footer.module.css';

// Footer (Figma 30:246). Les intitulés de colonnes ne sont pas des titres Hn
// pour ne pas modifier la structure validée de l'accueil.
export default function Footer() {
  const logo = image('logo/logo-la-luciole.webp');

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.haut}`}>
        <div className={styles.colonnes}>
          <nav aria-labelledby="footer-nav">
            <p id="footer-nav" className={styles.titreColonne}>
              Navigation
            </p>
            <ul role="list" className={`t-outfit-20 ${styles.liste}`}>
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

          <div>
            <p className={styles.titreColonne}>Nos horaires</p>
            <dl className={`t-outfit-20 ${styles.horaires}`}>
              {horairesGroupes().map((h) => (
                <div key={h.jours} className={h.ferme ? styles.ferme : undefined}>
                  <dt>{h.jours}</dt>
                  <dd>{h.texte}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <p className={styles.titreColonne}>Nous suivre</p>
            <ul role="list" className={styles.reseaux}>
              {(
                [
                  ['facebook', 'Facebook', liens.facebook],
                  ['instagram', 'Instagram', liens.instagram],
                ] as const
              ).map(([icone, nom, url]) => (
                <li key={icone}>
                  {url ? (
                    <a href={url} className={styles.reseau} aria-label={`${nom} de La Luciole`} target="_blank" rel="noopener noreferrer">
                      <Icon name={icone} size={46} />
                    </a>
                  ) : (
                    <span className={styles.reseau} title={`Lien ${nom} à compléter`}>
                      <Icon name={icone} size={46} />
                      <span className="visually-hidden">{nom} (lien à compléter)</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
            {!liens.facebook && !liens.instagram && <ACompleter>URL Facebook et Instagram</ACompleter>}
          </div>
        </div>

        <address className={styles.infos}>
          <p className={styles.titreColonne}>Infos pratiques</p>
          <p className={styles.info}>
            <Icon name="telephone" />
            {liens.telephone ? (
              <a href={liens.telephone} className={`t-body-m-18 ${styles.lien}`}>
                {SITE.telephone.affiche}
              </a>
            ) : (
              <ACompleter>téléphone</ACompleter>
            )}
          </p>
          <p className={styles.info}>
            <Icon name="localisation" />
            <a href={liens.itineraire} className={`t-outfit-20 ${styles.lien}`} target="_blank" rel="noopener noreferrer">
              {adresse.courte}
            </a>
          </p>
          <p className={`t-outfit-20 ${styles.info}`}>
            <Icon name="tram" />
            <span>Accessible en tram {SITE.acces.tram || <ACompleter>ligne et arrêt</ACompleter>}</span>
          </p>
          <p className={`t-outfit-20 ${styles.info}`}>
            <Icon name="parking" />
            <span>Parking à proximité</span>
          </p>
        </address>
      </div>

      <div className={`container ${styles.signature}`}>
        <Image src={logo.src} width={231} height={229} alt="" sizes="(min-width: 768px) 231px, 96px" className={styles.logo} />
        <p className={styles.geant} aria-hidden="true">
          La luciole bar
        </p>
      </div>

      <div className={`container t-outfit-14 ${styles.legal}`}>
        <p>
          © {new Date().getFullYear()} {SITE.nom} · <Link href="/mentions-legales">Mentions légales</Link>
        </p>
        <p>L’abus d’alcool est dangereux pour la santé, à consommer avec modération.</p>
      </div>
    </footer>
  );
}
