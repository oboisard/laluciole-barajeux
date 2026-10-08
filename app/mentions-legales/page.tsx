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
      <h1 className="t-titre">Mentions légales</h1>

      <section aria-labelledby="editeur">
        <h2 id="editeur" className="t-titre-carte">
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
        <h2 id="hebergeur" className="t-titre-carte">
          Hébergement
        </h2>
        <p>
          <ACompleter>hébergeur définitif (Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis, à confirmer)</ACompleter>
        </p>
      </section>

      <section aria-labelledby="propriete">
        <h2 id="propriete" className="t-titre-carte">
          Propriété intellectuelle
        </h2>
        <p>
          Les textes, photos, illustrations et logos de ce site sont la propriété de {SITE.nom} ou de leurs auteurs et ne
          peuvent être reproduits sans autorisation.
        </p>
      </section>

      <section aria-labelledby="avis">
        <h2 id="avis" className="t-titre-carte">
          Avis clients
        </h2>
        <p>
          Les avis affichés sur ce site sont une sélection d’avis publiés par nos clients sur Google. Seuls des extraits
          sont affichés, sans modification du texte, avec leur date de publication. L’ensemble des avis est consultable
          sur notre fiche Google.
        </p>
      </section>

      <section aria-labelledby="confidentialite">
        <h2 id="confidentialite" className="t-titre-carte">
          Politique de confidentialité
        </h2>
        <p>
          Ce site ne contient aucun formulaire : il ne collecte directement aucune donnée personnelle. Il ne dépose aucun
          cookie de mesure d’audience ni de cookie publicitaire.
        </p>
        <p>
          La carte Google Maps de la section « Comment venir ? » est chargée quand vous approchez de cette section ;
          Google peut alors déposer ses propres cookies, selon sa politique de confidentialité.
        </p>
        <p>
          Les réservations se font sur le service de L’Addition : les informations saisies lors d’une réservation sont
          traitées selon la politique de confidentialité de ce service. Les liens vers Instagram, Facebook et Google
          ouvrent ces services, eux aussi soumis à leurs propres politiques.
        </p>
        <p>
          Responsable du traitement : <Champ valeur={l.raisonSociale} libelle="raison sociale" />. Pour exercer vos
          droits (accès, rectification, effacement) : <ACompleter>adresse de contact pour les demandes RGPD</ACompleter>.
          Vous pouvez aussi adresser une réclamation à la CNIL (cnil.fr).
        </p>
        <p>
          <ACompleter>outil de mesure d’audience éventuel</ACompleter>
        </p>
      </section>
    </article>
  );
}
