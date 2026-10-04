import type { StaticImageData } from 'next/image';
import aileArriere from '@/public/images/curseur/aile-arriere.webp';
import aileAvant from '@/public/images/curseur/aile-avant.webp';
import corps from '@/public/images/curseur/corps.webp';

type Classes = { readonly [cle: string]: string };
type Point = { x: number; y: number };
type Etincelle = Point & { vx: number; vy: number; age: number; duree: number; taille: number };

// Repères dans le cadre du logo, en fraction de sa taille (voir CurseurLuciole.module.css).
const POINTE: Point = { x: 0.15, y: 0.571 };
const LUMIERE: Point = { x: 0.788, y: 0.755 };
const LARGEUR = 40;
const HAUTEUR = (LARGEUR * 143) / 144;
const ECHELLE_SURVOL = 1.2;

// La main du curseur natif disparaît : la luciole grossit au survol de ce qui se clique.
const INTERACTIF = 'a[href], button:not(:disabled), [role="button"], summary, label[for], select, input, textarea';

// Traînée diffuse : peu de halos, larges, très transparents, qui s'étalent en s'éteignant.
const ESPACEMENT = 10; // px parcourus entre deux halos
const MAX_ETINCELLES = 45;

/** Installe le curseur luciole et sa traînée de lumière. Renvoie la fonction qui les retire. */
export function demarrer(c: Classes): () => void {
  const racine = document.documentElement;
  const px = POINTE.x * LARGEUR;
  const py = POINTE.y * HAUTEUR;

  // Curseur : halo de la lumière, corps, puis les deux ailes qui battent.
  const curseur = document.createElement('div');
  curseur.className = c.curseur;
  curseur.setAttribute('aria-hidden', 'true');
  const orientation = document.createElement('div');
  orientation.className = c.orientation;
  const etat = document.createElement('div');
  etat.className = c.etat;
  const halo = document.createElement('span');
  halo.className = c.halo;
  const calques = ([
    [corps, ''],
    [aileArriere, c.aileArriere],
    [aileAvant, c.aileAvant],
  ] as [StaticImageData, string][]).map(([image, classe]) => {
    const img = new Image();
    img.src = image.src;
    img.alt = '';
    img.draggable = false;
    img.className = `${c.calque} ${classe}`;
    return img;
  });
  etat.append(halo, ...calques);
  orientation.append(etat);
  curseur.append(orientation);

  // Traînée : étincelles dessinées sur une toile plein écran, seulement quand il y en a.
  const toile = document.createElement('canvas');
  toile.className = c.trainee;
  toile.setAttribute('aria-hidden', 'true');
  const ctx = toile.getContext('2d');
  document.body.append(toile, curseur);

  const lueur = document.createElement('canvas');
  lueur.width = lueur.height = 64;
  const lctx = lueur.getContext('2d');
  if (lctx) {
    // Dégradé sans cœur net : un voile, pas un point.
    const degrade = lctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    degrade.addColorStop(0, 'rgba(253, 198, 0, 1)');
    degrade.addColorStop(0.25, 'rgba(253, 198, 0, 0.55)');
    degrade.addColorStop(0.55, 'rgba(253, 198, 0, 0.18)');
    degrade.addColorStop(1, 'rgba(253, 198, 0, 0)');
    lctx.fillStyle = degrade;
    lctx.fillRect(0, 0, 64, 64);
  }

  let dpr = 1;
  const dimensionner = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    toile.width = Math.round(toile.clientWidth * dpr);
    toile.height = Math.round(toile.clientHeight * dpr);
  };
  dimensionner();

  let pret = false;
  let visible = false;
  let reprise = true;
  let survol = false;
  let x = 0;
  let y = 0;
  let vx = 0;
  let vy = 0;
  let dernierT = 0;
  let sens = 1; // 1 : tête à gauche (logo), -1 : retournée vers la droite
  let sensCible = 1;
  let inclinaison = 0;
  let queuePrec: Point = { x: 0, y: 0 };
  let distance = 0;
  let frame = 0;
  let tempsPrec = 0;
  const etincelles: Etincelle[] = [];

  // Le curseur natif reste en place tant que les calques ne sont pas prêts.
  Promise.all(calques.map((img) => img.decode().catch(() => undefined))).then(() => {
    pret = true;
  });

  const afficher = (oui: boolean) => {
    if (oui === visible) return;
    visible = oui;
    curseur.toggleAttribute('data-visible', oui);
    if (!oui) reprise = true;
  };

  // Position de la lumière à l'écran, selon le sens, l'inclinaison et le survol.
  const lumiere = (): Point => {
    const echelle = survol ? ECHELLE_SURVOL : 1;
    const dx = (LUMIERE.x - POINTE.x) * LARGEUR * echelle;
    const dy = (LUMIERE.y - POINTE.y) * HAUTEUR * echelle;
    const a = (inclinaison * Math.PI) / 180;
    return {
      x: x + (dx * Math.cos(a) - dy * Math.sin(a)) * sens,
      y: y + dx * Math.sin(a) + dy * Math.cos(a),
    };
  };

  // Étincelles réparties le long du trajet de la lumière depuis la dernière émission.
  const emettre = (pas: number) => {
    const queue = lumiere();
    distance += pas;
    const n = Math.min(4, Math.floor(distance / ESPACEMENT));
    for (let i = 1; i <= n; i++) {
      const t = i / n;
      if (etincelles.length >= MAX_ETINCELLES) etincelles.shift();
      etincelles.push({
        x: queuePrec.x + (queue.x - queuePrec.x) * t + (Math.random() - 0.5) * 6,
        y: queuePrec.y + (queue.y - queuePrec.y) * t + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 0.012,
        vy: (Math.random() - 0.5) * 0.012 - 0.006,
        age: 0,
        duree: 500 + Math.random() * 300,
        taille: 6 + Math.random() * 4,
      });
    }
    if (n) {
      distance -= n * ESPACEMENT;
      queuePrec = queue;
    }
  };

  const boucle = (t: number) => {
    // Temps réel pour l'âge des étincelles (elles s'éteignent à l'heure même si
    // l'affichage rame), pas borné pour les mouvements.
    const ecoule = Math.min(1000, tempsPrec ? t - tempsPrec : 16);
    const dt = Math.min(50, ecoule);
    tempsPrec = t;

    // La souris s'arrête : la vitesse retombe, la luciole se redresse.
    if (performance.now() - dernierT > 60) {
      vx *= 0.85;
      vy *= 0.85;
    }
    // Demi-tour quand la souris part franchement dans l'autre sens.
    if (vx > 0.3) sensCible = -1;
    else if (vx < -0.3) sensCible = 1;
    sens += (sensCible - sens) * Math.min(1, dt / 60);
    if (Math.abs(sensCible - sens) < 0.01) sens = sensCible;
    const inclinaisonCible = Math.max(-14, Math.min(14, -vy * 12));
    inclinaison += (inclinaisonCible - inclinaison) * Math.min(1, dt / 120);
    if (Math.abs(inclinaisonCible - inclinaison) < 0.05) inclinaison = inclinaisonCible;
    orientation.style.transform = `scaleX(${sens.toFixed(3)}) rotate(${inclinaison.toFixed(2)}deg)`;

    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, toile.width, toile.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (let i = etincelles.length - 1; i >= 0; i--) {
        const e = etincelles[i];
        e.age += ecoule;
        if (e.age >= e.duree) {
          etincelles.splice(i, 1);
          continue;
        }
        e.x += e.vx * dt;
        e.y += e.vy * dt;
        const reste = 1 - e.age / e.duree;
        // Le halo s'élargit en s'éteignant : la lumière se dissipe.
        const r = e.taille * (1 + 0.6 * (1 - reste));
        ctx.globalAlpha = reste * reste * 0.35;
        ctx.drawImage(lueur, e.x - r, e.y - r, r * 2, r * 2);
      }
      ctx.globalAlpha = 1;
    }

    const auRepos =
      !etincelles.length && sens === sensCible && inclinaison === inclinaisonCible && Math.abs(vx) < 0.01 && Math.abs(vy) < 0.01;
    frame = auRepos ? 0 : requestAnimationFrame(boucle);
    if (auRepos) tempsPrec = 0;
  };

  const relancer = () => {
    if (!frame) frame = requestAnimationFrame(boucle);
  };

  const surDeplacement = (e: PointerEvent) => {
    // Stylet ou doigt : retour au curseur natif.
    if (e.pointerType !== 'mouse') {
      racine.removeAttribute('data-curseur-luciole');
      afficher(false);
      return;
    }
    const ancienX = x;
    const ancienY = y;
    x = e.clientX;
    y = e.clientY;
    if (!pret) return;

    // Sur la carte Google Maps (curseur de la carte) ou les barres de défilement :
    // curseur natif.
    if (e.target instanceof HTMLIFrameElement || x >= racine.clientWidth || y >= racine.clientHeight) {
      afficher(false);
      return;
    }
    racine.setAttribute('data-curseur-luciole', '');
    curseur.style.transform = `translate3d(${x - px}px, ${y - py}px, 0)`;

    const maintenant = performance.now();
    if (reprise) {
      // Retour du curseur : pas de traînée depuis l'ancienne position.
      reprise = false;
      vx = vy = distance = 0;
      queuePrec = lumiere();
    } else {
      const ecart = Math.max(1, maintenant - dernierT);
      vx = vx * 0.75 + ((x - ancienX) / ecart) * 0.25;
      vy = vy * 0.75 + ((y - ancienY) / ecart) * 0.25;
      emettre(Math.hypot(x - ancienX, y - ancienY));
    }
    dernierT = maintenant;
    afficher(true);
    relancer();
  };

  const surSurvol = (e: PointerEvent) => {
    const cible = e.target;
    // Dans la carte Google Maps, c'est le curseur de la carte qui s'affiche.
    if (cible instanceof HTMLIFrameElement) {
      afficher(false);
      return;
    }
    const oui = cible instanceof Element && cible.closest(INTERACTIF) !== null;
    if (oui !== survol) {
      survol = oui;
      curseur.toggleAttribute('data-survol', oui);
    }
  };

  const surSortie = (e: MouseEvent) => {
    if (!e.relatedTarget || e.relatedTarget instanceof HTMLIFrameElement) afficher(false);
  };
  const surAppui = (e: PointerEvent) => {
    if (e.pointerType === 'mouse') curseur.setAttribute('data-appui', '');
  };
  const surRelache = () => curseur.removeAttribute('data-appui');
  const masquer = () => afficher(false);

  window.addEventListener('pointermove', surDeplacement, { passive: true });
  document.addEventListener('pointerover', surSurvol, { passive: true });
  document.addEventListener('mouseout', surSortie, { passive: true });
  window.addEventListener('pointerdown', surAppui, { passive: true });
  window.addEventListener('pointerup', surRelache, { passive: true });
  window.addEventListener('blur', masquer);
  window.addEventListener('resize', dimensionner);

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('pointermove', surDeplacement);
    document.removeEventListener('pointerover', surSurvol);
    document.removeEventListener('mouseout', surSortie);
    window.removeEventListener('pointerdown', surAppui);
    window.removeEventListener('pointerup', surRelache);
    window.removeEventListener('blur', masquer);
    window.removeEventListener('resize', dimensionner);
    racine.removeAttribute('data-curseur-luciole');
    curseur.remove();
    toile.remove();
  };
}
