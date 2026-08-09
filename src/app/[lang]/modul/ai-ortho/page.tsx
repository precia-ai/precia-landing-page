import type { Metadata } from 'next';
import Link from 'next/link';
import { siteUrl } from '@/lib/site';

export function generateMetadata(): Metadata {
  const title = 'AI-Ortho (MetriSnap) — PRECIA';
  const description = 'Pengukuran fotogrametri ekstraoral 2D ortodonti berbasis AI, mempercepat proses yang biasanya manual. Berbasis MetriSnap, startup binaan UI Incubate.';
  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/id/modul/ai-ortho` },
  };
}

const content: Record<'id' | 'en', { title: string; sections: { heading: string; body: string }[] }> = {
  id: {
    title: 'AI-Ortho (MetriSnap)',
    sections: [
      {
        heading: 'Apa yang dilakukan',
        body: 'AI-Ortho membantu spesialis ortodonti melakukan pengukuran Fotogrametri Ekstraoral 2D — mengukur simetri, proporsi, dan elemen wajah lain dari foto klinis pasien — secara digital, menggantikan proses manual mencetak foto, menganotasi dengan alat tulis, dan mengukur pakai penggaris.',
      },
      {
        heading: 'Asal-usul: dari riset ke MetriSnap ke PRECIA',
        body: 'Modul ini berawal dari riset skripsi tim Fakultas Ilmu Komputer UI (Amanda Nurul Izzah, Kausar Meutuwah, Risa Lestari, dibimbing Muhammad Febrian Rachmadi dan konsultan ortodonti Dr. drg. Ratna Sekundariadewi Rustamadji), yang berkembang menjadi MetriSnap, startup binaan UI Incubate. MetriSnap terpilih sebagai penerima pendanaan Program Hackathon UI Incubate Pathway 2025 (kategori PSF), dan sekarang sedang dalam proses integrasi menjadi modul AI baru di platform PRECIA.',
      },
      {
        heading: 'Hasil uji coba',
        body: 'Menurut rilis resmi Direktorat Inovasi dan Riset Berdampak Tinggi UI, MetriSnap mampu mengurangi waktu pengukuran Fotogrametri Ekstraoral 2D hingga 93,3% dibandingkan metode manual, dengan menghilangkan kebutuhan alat tulis dalam proses anotasi.',
      },
      {
        heading: 'Cara kerja teknis',
        body: 'MetriSnap memakai teknologi computer vision (facial landmark detection) untuk mengidentifikasi titik-titik anatomis wajah pada foto depan dan samping, lalu mengonversi jarak piksel ke satuan milimeter dunia nyata memakai referensi skala. Hasilnya: pengukuran proporsi dan simetri wajah yang biasanya makan waktu lama, sekarang bisa didapat dalam hitungan detik.',
      },
      {
        heading: 'Status integrasi ke PRECIA',
        body: 'Prototipe MetriSnap sudah live dan bisa diakses di metrisnap.precia.site. Modul ini sedang dalam proses merger ke platform PRECIA — belum menjadi bagian resmi dari alur transaksi klinis PRECIA. Ukuran uji evaluasi akademik untuk modul ini masih kecil, jadi kami belum mempublikasikan angka akurasi pengukuran per kasus sampai pengujian lebih luas selesai.',
      },
    ],
  },
  en: {
    title: 'AI-Ortho (MetriSnap)',
    sections: [
      {
        heading: 'What it does',
        body: 'AI-Ortho helps orthodontic specialists perform 2D Extraoral Photogrammetry measurement — measuring symmetry, proportion, and other facial elements from a patient\'s clinical photos — digitally, replacing the manual process of printing photos, annotating by hand, and measuring with a ruler.',
      },
      {
        heading: 'Origin: from research to MetriSnap to PRECIA',
        body: 'This module started as undergraduate thesis research from a Universitas Indonesia Faculty of Computer Science team (Amanda Nurul Izzah, Kausar Meutuwah, Risa Lestari, advised by Muhammad Febrian Rachmadi with orthodontic consultant Dr. drg. Ratna Sekundariadewi Rustamadji), which grew into MetriSnap, a UI Incubate-backed startup. MetriSnap was selected as a funding recipient of the UI Incubate Pathway 2025 Hackathon Program (PSF category), and is now being integrated as a new AI module into the PRECIA platform.',
      },
      {
        heading: 'Trial results',
        body: 'Per an official release from UI\'s Directorate of Innovation and High-Impact Research, MetriSnap reduces 2D Extraoral Photogrammetry measurement time by up to 93.3% compared to the manual method, while eliminating the need for manual annotation tools.',
      },
      {
        heading: 'How it works technically',
        body: 'MetriSnap uses computer vision (facial landmark detection) to identify anatomical facial points on frontal and side photos, then converts pixel distances into real-world millimeters using a scale reference. The result: facial proportion and symmetry measurements that used to take a long time now come back in seconds.',
      },
      {
        heading: 'PRECIA integration status',
        body: 'The MetriSnap prototype is already live and reachable at metrisnap.precia.site. This module is being merged into the PRECIA platform — it is not yet part of PRECIA\'s official clinical transaction workflow. The academic evaluation sample for this module is still small, so we have not published per-case measurement accuracy figures until broader testing is complete.',
      },
    ],
  },
};

export default async function AIOrthoModulePage({ params }: { params: Promise<{ lang: 'en' | 'id' }> }) {
  const { lang } = await params;
  const c = content[lang];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <Link href={`/${lang}#modul`} className="text-sm font-semibold text-primary hover:text-accent-secondary transition-colors">
        {lang === 'id' ? '← Kembali ke modul AI' : '← Back to AI modules'}
      </Link>
      <div className="mt-6 text-xs tracking-widest uppercase text-primary font-semibold">Ortodonti / Orthodontics</div>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{c.title}</h1>
      <div className="mt-10 space-y-8">
        {c.sections.map((s, i) => (
          <div key={i}>
            <h2 className="text-lg font-semibold text-foreground">{s.heading}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 pt-6 border-t border-border text-xs text-muted-foreground">
        {lang === 'id' ? 'Sumber: ' : 'Source: '}
        <a href="https://innovation.ui.ac.id/39914-2/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          innovation.ui.ac.id
        </a>
      </div>
    </div>
  );
}
