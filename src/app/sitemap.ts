import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['id', 'en'] as const;
  const lastModified = new Date();

  return locales.map((lang) => ({
    url: `${siteUrl}/${lang}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 1,
    alternates: {
      languages: {
        id: `${siteUrl}/id`,
        en: `${siteUrl}/en`,
        'x-default': `${siteUrl}/id`,
      },
    },
  }));
}
