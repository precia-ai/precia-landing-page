import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PRECIA - Platform AI Klinis',
    short_name: 'PRECIA',
    description: 'Platform AI klinis untuk rumah sakit dan klinik: skrining AI-ECG, AI-BOO Multimodal uroflowmetry.',
    start_url: '/id',
    display: 'standalone',
    background_color: '#f5f8fc',
    theme_color: '#0052ff',
    icons: [
      {
        src: '/brand/precia-logo.png',
        sizes: '768x256',
        type: 'image/png',
      },
    ],
  };
}
