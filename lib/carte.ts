import data from '@/data/carte.json';

export type Produit = {
  nom: string;
  composition: string;
  /** En euros ; null tant qu'il n'est pas renseigné. Pas affiché sur l'accueil. */
  prix: number | null;
  /** Clé dans data/images.json, ou null : placeholder en attendant la photo. */
  image: string | null;
  alt: string;
  alcool: boolean;
  /** Position dans la bande de l'accueil (1, 2, 3…), ou null pour ne pas l'y afficher. */
  aLaUne: number | null;
};

export type Categorie = { id: string; titre: string; produits: Produit[] };

export const categories = data.categories as Categorie[];

/** Produits de la bande « La carte » de l'accueil, toutes catégories confondues, dans l'ordre de `aLaUne`. */
export function produitsALaUne(): Produit[] {
  return categories
    .flatMap((c) => c.produits)
    .filter((p) => p.aLaUne != null)
    .sort((a, b) => a.aLaUne! - b.aLaUne!);
}
