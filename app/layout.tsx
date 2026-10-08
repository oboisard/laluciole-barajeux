import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';
import Apparition from '@/components/Apparition';
import CurseurLuciole from '@/components/curseur/CurseurLuciole';
import DefilementAncres from '@/components/DefilementAncres';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import JsonLd from '@/components/JsonLd';
import { IMAGE_PRINCIPALE, barJsonLd } from '@/lib/jsonld';
import { image } from '@/lib/images';
import { SITE, siteUrl } from '@/lib/site';
import './globals.css';

// Police unique (Redesign Finale) : Outfit, auto-hébergée au build. Police variable :
// un seul fichier pour toutes les graisses utilisées (400, 500, 600).
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });

const imageOg = image(IMAGE_PRINCIPALE);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: 'La Luciole – Bar à jeux de société à Mérignac (Bordeaux)',
    template: '%s | La Luciole, bar à jeux à Mérignac',
  },
  description: SITE.description,
  applicationName: SITE.nom,
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: SITE.nom,
    images: [{ url: imageOg.src, width: imageOg.width, height: imageOg.height, alt: 'Étagères de jeux de société au bar La Luciole' }],
  },
  twitter: { card: 'summary_large_image' },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#0b1516',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={outfit.variable}>
      <body>
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <CurseurLuciole />
        <Apparition />
        <DefilementAncres />
        <JsonLd data={barJsonLd()} />
      </body>
    </html>
  );
}
