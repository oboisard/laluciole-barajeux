import type { Metadata } from 'next';
import AvisClients from '@/components/accueil/AvisClients';
import CommentVenir from '@/components/accueil/CommentVenir';
import Evenements from '@/components/accueil/Evenements';
import Hero from '@/components/accueil/Hero';
import LeBar from '@/components/accueil/LeBar';
import PetiteSoif from '@/components/accueil/PetiteSoif';
import TeamBuilding from '@/components/accueil/TeamBuilding';
import CommentReserver from '@/components/accueil/CommentReserver';
import JsonLd from '@/components/JsonLd';
import { evenementsJsonLd, getEvenements } from '@/lib/evenements';

// Page régénérée chaque jour : les événements passés disparaissent et les dates récurrentes avancent.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: { absolute: 'La Luciole – Bar à jeux de société à Mérignac (Bordeaux)' },
  description:
    'Bar à jeux à Mérignac, à 10 min de Bordeaux : plus de 200 jeux de société, cocktails et soirées à thème chaque semaine. Réservez votre table !',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'La Luciole – Bar à jeux de société à Mérignac (Bordeaux)',
    description: 'Plus de 200 jeux de société, cocktails et soirées à thème chaque semaine, à 10 min de Bordeaux.',
    url: '/',
  },
};

export default function Accueil() {
  const evenements = getEvenements();

  return (
    <>
      <Hero />
      <LeBar />
      <Evenements evenements={evenements} />
      <PetiteSoif />
      <TeamBuilding />
      <AvisClients />
      <CommentVenir />
      <CommentReserver />
      <JsonLd data={evenementsJsonLd(evenements)} />
    </>
  );
}
