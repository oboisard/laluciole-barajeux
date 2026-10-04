import ACompleter from '@/components/ACompleter';
import Icon from '@/components/Icon';
import styles from './LigneFormule.module.css';

type LigneFormuleProps = {
  numero: string;
  titre: string;
  description: string;
  capacite: string;
  titreAs?: 'h3' | 'h2';
};

// Ligne formule (Figma 60:35) : offre team building / entreprise.
export default function LigneFormule({ numero, titre, description, capacite, titreAs: Titre = 'h3' }: LigneFormuleProps) {
  return (
    <li className={styles.ligne}>
      <span className={styles.numero} aria-hidden="true">
        {numero}
      </span>
      <div className={styles.texte}>
        <Titre className="t-outfit-h6">{titre}</Titre>
        <p className="t-outfit-20">{description}</p>
      </div>
      <p className={styles.capacite}>
        <Icon name="amis" size={20} />
        <span className="t-outfit-16">{capacite || <ACompleter>capacité</ACompleter>}</span>
      </p>
    </li>
  );
}
