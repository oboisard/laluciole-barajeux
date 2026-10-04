import Link from 'next/link';
import Icon, { type IconName } from '@/components/Icon';
import styles from './Button.module.css';

// Variantes de couleur du composant « Déclinaison » (Figma 1:190).
// « blanc-bleue » : bouton « Nous contacter » de la section événements (texte bleu sur blanc).
export type ButtonVariant = 'noir' | 'noir-jaune' | 'noir-bleue' | 'blanc' | 'blanc-bleue' | 'bleue' | 'orange';

type ButtonProps = {
  children?: React.ReactNode;
  /** Lien interne (/…), ancre (#…), externe (https:, tel:, mailto:). `null` = lien pas encore renseigné. */
  href?: string | null;
  variant?: ButtonVariant;
  icon?: IconName;
  /** Variante « Icon » du master bouton : icône seule, `label` obligatoire. */
  label?: string;
  external?: boolean;
  /** Entoure de pointillés jaunes un bouton dont le lien reste à fournir (`href={null}`). */
  signalerLienManquant?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
} & Omit<React.AriaAttributes, 'aria-label'>;

export default function Button({
  children,
  href,
  variant = 'noir',
  icon,
  label,
  external,
  signalerLienManquant,
  className,
  onClick,
  type = 'button',
  ...aria
}: ButtonProps) {
  const iconOnly = !children;
  const classes = [styles.button, styles[variant], iconOnly && styles.iconOnly, className].filter(Boolean).join(' ');
  const content = (
    <>
      {icon && <Icon name={icon} className={styles.icon} />}
      {children && <span>{children}</span>}
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
        {content}
      </span>
    );
  }

  if (href === undefined) {
    return (
      <button type={type} className={classes} onClick={onClick} aria-label={label} {...aria}>
        {content}
      </button>
    );
  }

  if (href.startsWith('/')) {
    return (
      <Link href={href} className={classes} aria-label={label} {...aria}>
        {content}
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
      {content}
    </a>
  );
}
