import type { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionary';
import { siteUrl } from '@/lib/site';
import ClientPage from './ClientPage';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'id' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: 'en' | 'id' }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const url = `${siteUrl}/${lang}`;

  return {
    title: dict.seo.title,
    description: dict.seo.description,
    alternates: {
      canonical: url,
      languages: {
        id: `${siteUrl}/id`,
        en: `${siteUrl}/en`,
        'x-default': `${siteUrl}/id`,
      },
    },
    openGraph: {
      title: dict.seo.title,
      description: dict.seo.description,
      url,
      siteName: 'PRECIA',
      locale: lang === 'id' ? 'id_ID' : 'en_US',
      type: 'website',
      images: [`${siteUrl}/${lang}/opengraph-image`],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.seo.title,
      description: dict.seo.description,
      images: [`${siteUrl}/${lang}/opengraph-image`],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: 'en' | 'id' }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const orgId = `${siteUrl}/#organization`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    '@id': orgId,
    name: 'PRECIA',
    alternateName: 'Precision & Intelligent Analytics for Medicine',
    url: `${siteUrl}/${lang}`,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/brand/precia-logo.png`,
      width: 768,
      height: 256,
    },
    description: dict.seo.description,
    medicalSpecialty: ['Cardiovascular', 'Urologic'],
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Depok',
      addressRegion: 'Jawa Barat',
      addressCountry: 'ID',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@precia.site',
      contactType: 'customer service',
      areaServed: 'ID',
      availableLanguage: ['id', 'en'],
    },
    knowsAbout: [
      'Clinical AI screening',
      'ECG analysis',
      'Uroflowmetry analysis',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'PRECIA',
    inLanguage: lang,
    publisher: { '@id': orgId },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <ClientPage dict={dict} currentLang={lang} />
    </>
  );
}
