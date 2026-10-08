import Link from 'next/link';
import Icon, { type IconName } from '@/components/Icon';
import styles from './Button.module.css';

// Boutons du Redesign Finale : pilule, libellé puis flèche dans une pastille ronde.
// « primaire » : fond lueur (Réserver, Voir la carte, Demander un devis).
// « secondaire » : verre clair, sur fond sombre ou photo.
export type ButtonVariant = 'primaire' | 'secondaire';

type ButtonProps = {
  children: React.ReactNode;
  /** Lien interne (/…), ancre (#…), externe (https:, tel:). `null` = lien pas encore renseigné. */
  href?: string | null;
  variant?: ButtonVariant;
  /** « compacte » : menu, cartes (pastille de 36 px au lieu de 44). */
  taille?: 'normale' | 'compacte';
  icon?: IconName;
  /** Nom accessible, s'il doit préciser le libellé visible (qu'il doit contenir). */
  label?: string;
  external?: boolean;
  /** Entoure de pointillés un bouton dont le lien reste à fournir (`href={null}`). */
  signalerLienManquant?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
} & Omit<React.AriaAttributes, 'aria-label'>;

export default function Button({
  children,
  href,
  variant = 'primaire',
  taille = 'normale',
  icon = 'arrowForward',
  label,
  external,
  signalerLienManquant,
  className,
  onClick,
  type = 'button',
  ...aria
}: ButtonProps) {
  const classes = [styles.bouton, styles[variant], taille === 'compacte' && styles.compacte, className]
    .filter(Boolean)
    .join(' ');
  const contenu = (
    <>
      <span className={styles.libelle}>{children}</span>
      <span className={styles.pastille} aria-hidden="true">
        <Icon name={icon} size={taille === 'compacte' ? 18 : 20} />
      </span>
    </>
  );

  // Lien attendu mais pas encore fourni par le client : bouton visible mais inactif,
  // rendu sans <a> pour ne pas publier de lien vide.
  if (href === null) {
    return (
      <span
        className={`${classes} ${styles.sansLien} ${signalerLienManquant ? styles.signale : ''}`}
        role="link"
        aria-disabled="true"
        aria-label={label}
        title="Lien à compléter"
        {...aria}
      >
        {contenu}
      </span>
    );
  }

  if (href === undefined) {
    return (
      <button type={type} className={classes} onClick={onClick} aria-label={label} {...aria}>
        {contenu}
      </button>
    );
  }

  if (href.startsWith('/')) {
    return (
      <Link href={href} className={classes} aria-label={label} {...aria}>
        {contenu}
      </Link>
    );
  }

  const isExternal = external ?? href.startsWith('http');
  return (
    <a
      href={href}
      className={classes}
      aria-label={label}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...aria}
    >
      {contenu}
    </a>
  );
}
