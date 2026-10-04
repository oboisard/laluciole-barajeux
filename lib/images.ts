import { IMAGES } from '@/lib/images.generated';

export type ImageInfo = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
};

/**
 * Image générée par `npm run images` (clé = chemin dans public/images/), importée
 * statiquement : URL avec empreinte du contenu, dimensions et placeholder flou fournis par Next.js.
 * Échoue au build si l'image n'existe pas, pour ne jamais publier d'image cassée.
 */
export function image(key: string): ImageInfo {
  const img = IMAGES[key as keyof typeof IMAGES];
  if (!img) throw new Error(`Image introuvable : « ${key} » (lancer npm run images)`);
  return { src: img.src, width: img.width, height: img.height, blurDataURL: img.blurDataURL ?? '' };
}
