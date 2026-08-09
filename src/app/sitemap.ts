import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['id', 'en'] as const;
  const modules = ['ai-ecg', 'ai-boo', 'ai-ortho'] as const;
  const lastModified = new Date();

  const homeEntries: MetadataRoute.Sitemap = locales.map((lang) => ({
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

  const moduleEntries: MetadataRoute.Sitemap = modules.flatMap((slug) =>
    locales.map((lang) => ({
      url: `${siteUrl}/${lang}/modul/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          id: `${siteUrl}/id/modul/${slug}`,
          en: `${siteUrl}/en/modul/${slug}`,
          'x-default': `${siteUrl}/id/modul/${slug}`,
        },
      },
    }))
  );

  return [...homeEntries, ...moduleEntries];
}
