import { getDictionary } from '@/lib/dictionary';
import ClientPage from './ClientPage';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'id' }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: 'en' | 'id' }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return <ClientPage dict={dict} currentLang={lang} />;
}
