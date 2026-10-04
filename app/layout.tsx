import type { Metadata, Viewport } from 'next';
import { Montserrat, Outfit, Source_Sans_3 } from 'next/font/google';
import CurseurLuciole from '@/components/curseur/CurseurLuciole';
import DefilementAncres from '@/components/DefilementAncres';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import JsonLd from '@/components/JsonLd';
import { IMAGE_PRINCIPALE, barJsonLd } from '@/lib/jsonld';
import { image } from '@/lib/images';
import { SITE, siteUrl } from '@/lib/site';
import './globals.css';

// Polices auto-hébergées au build : uniquement les graisses utilisées.
const montserrat = Montserrat({ subsets: ['latin'], weight: '700', variable: '--font-montserrat', display: 'swap' });
// Police variable : un seul fichier pour les graisses 300, 400, 600 et 700.
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });
// Police des boutons (Figma : Noto Sans JP Medium). Les caractères latins de Noto Sans JP
// sont ceux de Source Sans : même rendu, mais un seul fichier au lieu de ~120 @font-face japonais.
const noto = Source_Sans_3({ subsets: ['latin'], weight: '500', variable: '--font-noto', display: 'swap', preload: false });

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
  themeColor: '#009597',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${outfit.variable} ${noto.variable}`}>
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
        <DefilementAncres />
        <JsonLd data={barJsonLd()} />
      </body>
    </html>
  );
}
