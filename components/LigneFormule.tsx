import ACompleter from '@/components/ACompleter';
import Icon from '@/components/Icon';
import styles from './LigneFormule.module.css';

type LigneFormuleProps = {
  titre: string;
  description: string;
  capacite: string;
};

// Ligne formule (Redesign Finale, « formule ») : offre entreprise et étiquette de capacité.
export default function LigneFormule({ titre, description, capacite }: LigneFormuleProps) {
  return (
    <li className={styles.ligne}>
      <div className={styles.texte}>
        <h3 className="t-titre-carte">{titre}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <p className={styles.capacite}>
        <Icon name="amis" size={16} />
        <span>{capacite || <ACompleter>capacité</ACompleter>}</span>
      </p>
    </li>
  );
}
