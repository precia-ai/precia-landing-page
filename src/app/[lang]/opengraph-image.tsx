import { ImageResponse } from 'next/og';
import { getDictionary } from '@/lib/dictionary';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ lang: 'en' | 'id' }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0a1b4e 0%, #0052ff 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontSize: 40,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.01em',
          }}
        >
          PRECIA
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 36,
            fontSize: 52,
            fontWeight: 600,
            color: '#ffffff',
            lineHeight: 1.2,
            maxWidth: 980,
          }}
        >
          {dict.seo.title.replace('PRECIA - ', '')}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 28,
            fontSize: 26,
            color: 'rgba(255,255,255,0.75)',
            maxWidth: 920,
            lineHeight: 1.4,
          }}
        >
          {dict.seo.description}
        </div>
      </div>
    ),
    { ...size }
  );
}
