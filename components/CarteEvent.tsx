import Image from 'next/image';
import ACompleter from '@/components/ACompleter';
import Button from '@/components/Button';
import type { IconName } from '@/components/Icon';
import type { CtaType, EvenementAffiche } from '@/lib/evenements';
import { image } from '@/lib/images';
import { liens } from '@/lib/site';
import styles from './CarteEvent.module.css';

const CTA: Record<CtaType, { href: string | null; icon?: IconName }> = {
  reserver: { href: liens.reserver, icon: 'calendrier' },
  telephone: { href: liens.telephone, icon: 'telephone' },
  carte: { href: '/#carte' },
};

type CarteEventProps = {
  evenement: EvenementAffiche;
  /** Niveau du titre : `p` sur l'accueil (structure Hn validée), `h2`/`h3` sur /evenements. */
  titreAs?: 'p' | 'h2' | 'h3';
  grande?: boolean;
  sizes?: string;
};

// Carte event (Figma 20:182). Au survol, la carte révèle son texte SEO (variante « Back »).
export default function CarteEvent({ evenement: e, titreAs: Titre = 'p', grande, sizes }: CarteEventProps) {
  const img = image(e.image);
  const cta = CTA[e.cta.type];

  return (
    <article id={e.id} className={`${styles.carte} ${grande ? styles.grande : ''} reveal-card`}>
      <Image
        src={img.src}
        width={img.width}
        height={img.height}
        alt={e.alt}
        placeholder="blur"
        blurDataURL={img.blurDataURL}
        sizes={sizes ?? '(min-width: 1200px) 20vw, (min-width: 768px) 45vw, 85vw'}
        className={styles.image}
      />
      <div className={styles.voile} aria-hidden="true" />

      <div className={styles.texte}>
        <Titre className={`t-outfit-h5 ${styles.titre}`}>{e.titre}</Titre>
        <p className="t-outfit-20">{e.libelle ?? <ACompleter>date et heure</ACompleter>}</p>
        <div className={styles.seo}>
          <p className="t-outfit-16">{e.description || <ACompleter>texte de présentation de l’événement</ACompleter>}</p>
        </div>
      </div>

      <Button href={cta.href} variant="blanc" icon={cta.icon} className={styles.cta}>
        {e.cta.label}
      </Button>
    </article>
  );
}
