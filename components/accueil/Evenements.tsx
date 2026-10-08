import Image from 'next/image';
import ACompleter from '@/components/ACompleter';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import type { EvenementAffiche } from '@/lib/evenements';
import { image } from '@/lib/images';
import { liens } from '@/lib/site';
import styles from './Evenements.module.css';

const lienCta = (e: EvenementAffiche) => (e.cta.type === 'carte' ? '/#carte' : liens.reserver);

// Section événements (Redesign Finale, Figma 116:384) : l'événement mis en avant en
// grande carte, les trois autres plus proches dans l'agenda (liste déjà triée par date).
export default function Evenements({ evenements }: { evenements: EvenementAffiche[] }) {
  const vedette = evenements.find((e) => e.miseEnAvant) ?? evenements[0];
  const agenda = evenements.filter((e) => e !== vedette).slice(0, 3);

  return (
    <section id="evenements" className={`container section ${styles.section}`} aria-labelledby="titre-evenements">
      <div className={styles.entete} data-apparition>
        <h2 id="titre-evenements" className="t-titre">
          Soirées jeux et tournois chaque semaine
        </h2>
        <p className="t-corps-l">
          Tournois, soirées à thème, jeux de rôle grandeur nature : chaque semaine, des événements pour tous les niveaux.
        </p>
      </div>

      <div className={styles.evenements}>
        {vedette && <Vedette evenement={vedette} />}
        {agenda.length > 0 && (
          <div className={`bezel ${styles.agendaCadre}`} data-apparition>
            <ul role="list" className={`bezel-coeur ${styles.agenda}`}>
              {agenda.map((e) => (
                <LigneAgenda key={e.id} evenement={e} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function Vedette({ evenement: e }: { evenement: EvenementAffiche }) {
  const img = image(e.image);
  return (
    <article id={e.id} className={`bezel ${styles.vedette}`} data-apparition>
      <div className={`bezel-coeur ${styles.vedetteCoeur}`}>
        <Image
          src={img.src}
          fill
          alt={e.alt}
          placeholder="blur"
          blurDataURL={img.blurDataURL}
          sizes="(min-width: 1200px) 52vw, 100vw"
          className={styles.vedetteImage}
        />
        <div className={styles.voile} aria-hidden="true" />
        <div className={styles.vedetteContenu}>
          <p className={styles.quand}>{e.quand ?? <ACompleter>date et heure</ACompleter>}</p>
          <p className={styles.vedetteTitre}>{e.titre}</p>
          <p className={styles.vedetteTexte}>{e.description || <ACompleter>texte de présentation</ACompleter>}</p>
          <Button href={lienCta(e)} className={styles.vedetteBouton}>
            {e.cta.label}
          </Button>
        </div>
      </div>
    </article>
  );
}

function LigneAgenda({ evenement: e }: { evenement: EvenementAffiche }) {
  const img = image(e.image);
  const href = lienCta(e);
  const externe = href?.startsWith('http');
  return (
    <li id={e.id} className={styles.ligne}>
      <p className={styles.date}>
        {e.jour ? (
          <>
            <span className={styles.numero}>{e.jour.numero}</span>
            <span className={styles.mois}>{e.jour.mois}</span>
          </>
        ) : (
          <ACompleter>date</ACompleter>
        )}
      </p>
      <div className={styles.infos}>
        <p className="t-titre-carte">{e.titre}</p>
        {e.meta && <p className={styles.meta}>{e.meta}</p>}
        {href ? (
          <a
            href={href}
            className={styles.lien}
            aria-label={`${e.cta.label} : ${e.titre}`}
            {...(externe ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {e.cta.label}
            <Icon name="arrowForward" size={16} />
          </a>
        ) : (
          <span className={styles.lien} aria-disabled="true">
            {e.cta.label}
          </span>
        )}
      </div>
      <div className={styles.vignette}>
        <Image src={img.src} fill alt={e.alt} sizes="112px" className={styles.vignetteImage} />
      </div>
    </li>
  );
}
