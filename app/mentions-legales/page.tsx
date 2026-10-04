import type { Metadata } from 'next';
import ACompleter from '@/components/ACompleter';
import { SITE, adresse } from '@/lib/site';
import styles from './mentions.module.css';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales et politique de confidentialité du site du bar à jeux La Luciole à Mérignac.',
  alternates: { canonical: '/mentions-legales' },
  robots: { index: false, follow: true },
};

function Champ({ valeur, libelle }: { valeur: string; libelle: string }) {
  return valeur ? <>{valeur}</> : <ACompleter>{libelle}</ACompleter>;
}

export default function MentionsLegales() {
  const l = SITE.legal;

  return (
    <article className={`container ${styles.page}`} data-entete-sombre>
      <h1 className="t-montserrat-h2">Mentions légales</h1>

      <section aria-labelledby="editeur">
        <h2 id="editeur" className="t-outfit-h5">
          Éditeur du site
        </h2>
        <p>
          <Champ valeur={l.raisonSociale} libelle="raison sociale" /> (<Champ valeur={l.formeJuridique} libelle="forme juridique" />
          {l.capital && <>, au capital de {l.capital}</>}), exploitant le bar {SITE.nom}.
        </p>
        <p>Siège social : <Champ valeur={l.siege} libelle="adresse du siège" /></p>
        <p>Établissement : {adresse.ligne}</p>
        <p>SIRET : <Champ valeur={l.siret} libelle="SIRET" /> · RCS : <Champ valeur={l.rcs} libelle="ville du RCS" /></p>
        <p>TVA intracommunautaire : <Champ valeur={l.tva} libelle="numéro de TVA" /></p>
        <p>
          Téléphone : <Champ valeur={SITE.telephone.affiche} libelle="téléphone" /> · E-mail :{' '}
          <Champ valeur={SITE.email} libelle="e-mail" />
        </p>
        <p>Directeur de la publication : <Champ valeur={l.directeurPublication} libelle="nom" /></p>
      </section>

      <section aria-labelledby="hebergeur">
        <h2 id="hebergeur" className="t-outfit-h5">
          Hébergement
        </h2>
        <p>
          <ACompleter>hébergeur définitif (Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis, à confirmer)</ACompleter>
        </p>
      </section>

      <section aria-labelledby="propriete">
        <h2 id="propriete" className="t-outfit-h5">
          Propriété intellectuelle
        </h2>
        <p>
          Les textes, photos, illustrations et logos de ce site sont la propriété de {SITE.nom} ou de leurs auteurs et ne
          peuvent être reproduits sans autorisation. Plan du quartier : © les contributeurs d’OpenStreetMap (licence ODbL).
        </p>
      </section>

      <section aria-labelledby="donnees">
        <h2 id="donnees" className="t-outfit-h5">
          Données personnelles et cookies
        </h2>
        <p>
          Ce site ne contient aucun formulaire et ne dépose aucun cookie de mesure d’audience ou publicitaire. La carte
          Google Maps n’est chargée que si vous cliquez sur « Afficher la carte Google Maps » ; Google peut alors déposer
          ses propres cookies. Les liens vers Instagram, Facebook et Google ouvrent ces services, soumis à leurs propres
          politiques de confidentialité.
        </p>
        <p>
          <ACompleter>outil de mesure d’audience éventuel et contact pour exercer vos droits (RGPD)</ACompleter>
        </p>
      </section>

      <section aria-labelledby="avis">
        <h2 id="avis" className="t-outfit-h5">
          Avis clients
        </h2>
        <p>
          Les avis affichés sur ce site sont une sélection d’avis publiés par nos clients sur Google, recopiés sans
          modification, avec leur date de publication. L’ensemble des avis est consultable sur notre fiche Google.
        </p>
      </section>
    </article>
  );
}
