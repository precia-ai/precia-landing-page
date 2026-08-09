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

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: 'PRECIA',
    alternateName: 'Precision & Intelligent Analytics for Medicine',
    url: `${siteUrl}/${lang}`,
    logo: `${siteUrl}/brand/precia-logo.png`,
    description: dict.seo.description,
    medicalSpecialty: ['Cardiology', 'Urology'],
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia',
    },
    knowsAbout: [
      'Clinical AI screening',
      'ECG analysis',
      'Uroflowmetry analysis',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ClientPage dict={dict} currentLang={lang} />
    </>
  );
}
