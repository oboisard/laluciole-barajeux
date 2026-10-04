import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const url = siteUrl();
  const maintenant = new Date();

  // V1 : page unique. Les pages internes sont archivées dans _archives/v2.
  return [{ url: `${url}/`, lastModified: maintenant, changeFrequency: 'weekly', priority: 1 }];
}
