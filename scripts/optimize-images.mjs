// Convertit les originaux de _sources/images/ en WebP dans public/images/
// (même arborescence, même nom), applique les recadrages de recadrages.json et le
// flou uniforme de floutage.json, puis écrit :
// - data/images.json : état de la conversion (incrémentale) ;
// - lib/images.generated.ts : imports statiques des WebP. Next.js ajoute une empreinte
//   du contenu à leur URL : une photo remplacée n'est jamais servie depuis un vieux cache.
//
// Usage : npm run images            (incrémental)
//         npm run images -- --force (tout régénérer)

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, '_sources', 'images');
const OUT = path.join(ROOT, 'public', 'images');
const MANIFEST = path.join(ROOT, 'data', 'images.json');

const MAX_WIDTH = 2400;
// Inutile de servir une image floutée en très haute définition.
const MAX_WIDTH_FLOU = 1200;
const QUALITY = 80;
const FORCE = process.argv.includes('--force');

// Sans les originaux (dépôt GitHub, build Vercel : _sources/ n'est jamais envoyé),
// on garde les WebP déjà convertis et versionnés dans public/images/.
if (!existsSync(SRC)) {
  console.log('Pas de dossier _sources/images : images déjà converties conservées.');
  process.exit(0);
}

const lireConfig = (nom) => JSON.parse(readFileSync(path.join(ROOT, 'scripts', nom), 'utf8'));
const floutage = lireConfig('floutage.json');
const recadrages = lireConfig('recadrages.json');
const previous = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {};

function listSources(dir, base = '') {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) return listSources(path.join(dir, entry.name), rel);
    return /\.(jpe?g|png)$/i.test(entry.name) ? [rel] : [];
  });
}

const versWebp = (rel, suffixe = '') => rel.replace(/\.(jpe?g|png)$/i, `${suffixe}.webp`);
const estFloutee = (rel) => floutage.images.includes(rel);
const variantes = (rel) => (recadrages[rel] ?? []).filter((r) => !r.principal);

// Empreinte de tout ce qui influence le rendu d'une image.
function fingerprint(rel) {
  const { size, mtimeMs } = statSync(path.join(SRC, rel));
  const flou = estFloutee(rel) ? floutage.intensite : null;
  return createHash('sha1')
    .update(JSON.stringify([size, mtimeMs, flou, recadrages[rel] ?? null, MAX_WIDTH, MAX_WIDTH_FLOU, QUALITY]))
    .digest('hex')
    .slice(0, 12);
}

const zone = (r, info) => ({
  left: Math.round(r.x * info.width),
  top: Math.round(r.y * info.height),
  width: Math.round(r.w * info.width),
  height: Math.round(r.h * info.height),
});

// Écrit un WebP et renvoie son entrée de manifeste.
async function ecrire(buffer, outRel) {
  const output = path.join(OUT, outRel);
  mkdirSync(path.dirname(output), { recursive: true });
  const result = await sharp(buffer)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, alphaQuality: 90, effort: 5 })
    .toFile(output);
  const placeholder = await sharp(buffer).resize({ width: 16 }).webp({ quality: 40 }).toBuffer();
  return {
    src: `/images/${outRel}`,
    width: result.width,
    height: result.height,
    blurDataURL: `data:image/webp;base64,${placeholder.toString('base64')}`,
  };
}

async function convert(rel) {
  const oriente = await sharp(path.join(SRC, rel)).rotate().png().toBuffer({ resolveWithObject: true });
  let buffer = oriente.data;

  const cadrage = (recadrages[rel] ?? []).find((r) => r.principal);
  if (cadrage) buffer = await sharp(buffer).extract(zone(cadrage, oriente.info)).png().toBuffer();

  // Flou uniforme, proportionnel à la largeur : même rendu à toutes les tailles d'affichage.
  if (estFloutee(rel)) {
    const reduite = await sharp(buffer).resize({ width: MAX_WIDTH_FLOU, withoutEnlargement: true }).png().toBuffer({ resolveWithObject: true });
    buffer = await sharp(reduite.data)
      .blur((floutage.intensite / 100) * reduite.info.width)
      .png()
      .toBuffer();
  }

  const entries = [[versWebp(rel), await ecrire(buffer, versWebp(rel))]];

  const info = await sharp(buffer).metadata();
  for (const r of variantes(rel)) {
    const outRel = versWebp(rel, r.suffixe);
    entries.push([outRel, await ecrire(await sharp(buffer).extract(zone(r, info)).png().toBuffer(), outRel)]);
  }
  return entries;
}

const sources = listSources(SRC);
const manifest = {};
let converted = 0;

for (const rel of sources) {
  const hash = fingerprint(rel);
  const cles = [versWebp(rel), ...variantes(rel).map((r) => versWebp(rel, r.suffixe))];
  const aJour = cles.every((k) => previous[k]?.hash === hash && existsSync(path.join(OUT, k)));

  if (!FORCE && aJour) {
    for (const k of cles) manifest[k] = previous[k];
    continue;
  }

  for (const [key, entry] of await convert(rel)) {
    manifest[key] = { ...entry, hash };
    const notes = [estFloutee(rel) && 'flou uniforme', (recadrages[rel] ?? []).some((r) => r.principal) && 'recadrée'];
    console.log(`✓ ${key} (${entry.width}×${entry.height})${notes.filter(Boolean).map((n) => ` — ${n}`).join('')}`);
  }
  converted++;
}

// Supprime les WebP dont l'original a disparu ou a été renommé.
for (const key of Object.keys(previous)) {
  if (!manifest[key]) {
    rmSync(path.join(OUT, key), { force: true });
    console.log(`✗ ${key} supprimé (plus de source)`);
  }
}

mkdirSync(path.dirname(MANIFEST), { recursive: true });
writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);

const cles = Object.keys(manifest).sort();
writeFileSync(
  path.join(ROOT, 'lib', 'images.generated.ts'),
  [
    '// Fichier généré par scripts/optimize-images.mjs (npm run images) : ne pas modifier.',
    ...cles.map((k, i) => `import i${i} from '@/public/images/${k}';`),
    '',
    'export const IMAGES = {',
    ...cles.map((k, i) => `  '${k}': i${i},`),
    '} as const;',
    '',
  ].join('\n'),
);
console.log(`${converted} image(s) convertie(s), ${sources.length - converted} inchangée(s).`);
