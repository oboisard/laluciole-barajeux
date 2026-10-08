'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from '@/components/Icon';
import styles from './Header.module.css';

export type LienNav = { href: string; label: string };

type NavigationProps = {
  liensNav: LienNav[];
  /** Éléments rendus côté serveur, réutilisés en bas du menu mobile. */
  piedMenu: React.ReactNode;
};

// Seule partie client du header : lien actif (aria-current) et menu mobile.
export default function Navigation({ liensNav, piedMenu }: NavigationProps) {
  const pathname = usePathname();
  const [ouvert, setOuvert] = useState(false);
  const [monte, setMonte] = useState(false);
  const bouton = useRef<HTMLButtonElement>(null);
  const panneau = useRef<HTMLDivElement>(null);

  useEffect(() => setMonte(true), []);

  // Ferme le menu à chaque changement de page.
  useEffect(() => setOuvert(false), [pathname]);

  useEffect(() => {
    if (!ouvert) return;
    document.documentElement.style.overflow = 'hidden';
    panneau.current?.querySelector<HTMLElement>('a[href]')?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOuvert(false);
        bouton.current?.focus();
      }
      // Garde le focus entre le bouton de fermeture et le menu.
      if (event.key === 'Tab' && panneau.current && bouton.current) {
        const focusables = [bouton.current, ...panneau.current.querySelectorAll<HTMLElement>('a[href], button')];
        const premier = focusables[0];
        const dernier = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === premier) {
          event.preventDefault();
          dernier.focus();
        } else if (!event.shiftKey && document.activeElement === dernier) {
          event.preventDefault();
          premier.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [ouvert]);

  const estActif = (href: string) => !href.includes('#') && (href === '/' ? pathname === '/' : pathname.startsWith(href));

  const menuMobile = (
    <div ref={panneau} id="menu-mobile" className={styles.panneau} data-ouvert={ouvert}>
      <ul className={styles.liensMobile} role="list">
        {liensNav.map((lien, i) => (
          <li key={lien.href} style={{ '--i': i } as React.CSSProperties}>
            <Link
              href={lien.href}
              className={styles.lienMobile}
              aria-current={estActif(lien.href) ? 'page' : undefined}
              onClick={() => setOuvert(false)}
            >
              {lien.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.panneauBas}>{piedMenu}</div>
    </div>
  );

  return (
    <>
      <ul className={styles.liens} role="list">
        {liensNav.map((lien) => (
          <li key={lien.href}>
            <Link href={lien.href} className={styles.lien} aria-current={estActif(lien.href) ? 'page' : undefined}>
              {lien.label}
            </Link>
          </li>
        ))}
      </ul>

      <button
        ref={bouton}
        type="button"
        className={styles.burger}
        aria-expanded={ouvert}
        aria-controls="menu-mobile"
        onClick={() => setOuvert((o) => !o)}
      >
        <Icon name={ouvert ? 'close' : 'menu'} size={26} />
        <span className="visually-hidden">{ouvert ? 'Fermer le menu' : 'Ouvrir le menu'}</span>
      </button>

      {/* Rendu dans <body> : le header animé ne doit pas contenir le menu plein écran. */}
      {monte && createPortal(menuMobile, document.body)}
    </>
  );
}
