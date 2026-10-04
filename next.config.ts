import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    // CSS dans le <head> : supprime les requêtes CSS bloquantes (visiteurs majoritairement nouveaux).
    inlineCss: true,
  },
  images: {
    // AVIF pour les navigateurs compatibles, WebP sinon.
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 75],
  },
};

export default nextConfig;
