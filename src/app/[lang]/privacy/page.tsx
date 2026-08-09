import type { Metadata } from 'next';
import Link from 'next/link';

export function generateMetadata(): Metadata {
  return {
    title: 'Privacy Policy',
    robots: { index: false, follow: true },
  };
}

const content: Record<'id' | 'en', { title: string; updated: string; sections: { heading: string; body: string }[] }> = {
  id: {
    title: 'Kebijakan Privasi',
    updated: 'Draf terakhir diperbarui: 2026-08-09 — belum dipublikasikan resmi',
    sections: [
      {
        heading: '1. Ringkasan',
        body: 'PRECIA ("kami") menyediakan platform AI klinis untuk rumah sakit dan klinik. Dokumen ini menjelaskan data apa yang kami kumpulkan, bagaimana data itu digunakan, dan hak Anda sebagai subjek data, sesuai Undang-Undang No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP).',
      },
      {
        heading: '2. Data yang dikumpulkan',
        body: 'Melalui landing page ini, kami mengumpulkan data yang Anda kirim lewat formulir jadwalkan demo: nama, institusi, email kerja, dan kebutuhan Anda. Data klinis pasien (rekaman ECG, hasil uroflowmetry, data demografis pasien) diproses lewat aplikasi platform PRECIA yang terpisah, di bawah perjanjian kerja sama dengan institusi rumah sakit/klinik, bukan lewat halaman ini.',
      },
      {
        heading: '3. Dasar hukum dan tujuan pemrosesan',
        body: '[PLACEHOLDER: sebutkan dasar hukum pemrosesan sesuai Pasal 20 UU PDP — persetujuan, kontrak, kewajiban hukum, atau kepentingan sah — untuk masing-masing kategori data di atas.]',
      },
      {
        heading: '4. Keamanan data',
        body: '[PLACEHOLDER: jelaskan langkah keamanan teknis dan organisasi yang diterapkan — enkripsi in-transit/at-rest, kontrol akses berbasis peran, audit trail, sertifikasi ISO 27001 kalau ada.]',
      },
      {
        heading: '5. Retensi data',
        body: '[PLACEHOLDER: sebutkan berapa lama data disimpan dan kapan/bagaimana data dihapus.]',
      },
      {
        heading: '6. Hak Anda sebagai subjek data',
        body: 'Sesuai UU PDP, Anda berhak mengakses, memperbaiki, menghapus, dan meminta portabilitas data pribadi Anda. Untuk menggunakan hak ini, hubungi kami lewat kontak di bagian 8.',
      },
      {
        heading: '7. Pihak ketiga',
        body: '[PLACEHOLDER: sebutkan penyedia infrastruktur/sub-processor pihak ketiga yang memproses data — hosting, email, analytics — dan lokasi penyimpanan data.]',
      },
      {
        heading: '8. Kontak',
        body: 'Pertanyaan seputar privasi dapat dikirim ke hello@precia.site. [PLACEHOLDER: cantumkan kontak Data Protection Officer (DPO) jika sudah ditunjuk.]',
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    updated: 'Draft last updated: 2026-08-09 — not yet officially published',
    sections: [
      {
        heading: '1. Overview',
        body: 'PRECIA ("we") provides a clinical AI platform for hospitals and clinics. This document explains what data we collect, how it is used, and your rights as a data subject under Indonesia\'s Personal Data Protection Law (UU PDP, Law No. 27/2022).',
      },
      {
        heading: '2. Data we collect',
        body: 'Through this landing page, we collect the data you submit via the demo request form: name, institution, work email, and your stated needs. Clinical patient data (ECG recordings, uroflowmetry results, patient demographics) is processed through the separate PRECIA platform application, under a cooperation agreement with the hospital/clinic, not through this page.',
      },
      {
        heading: '3. Legal basis and purpose of processing',
        body: '[PLACEHOLDER: state the legal basis for processing per UU PDP Article 20 — consent, contract, legal obligation, or legitimate interest — for each data category above.]',
      },
      {
        heading: '4. Data security',
        body: '[PLACEHOLDER: describe technical and organizational security measures — encryption in transit/at rest, role-based access control, audit trail, ISO 27001 certification if applicable.]',
      },
      {
        heading: '5. Data retention',
        body: '[PLACEHOLDER: state how long data is retained and when/how it is deleted.]',
      },
      {
        heading: '6. Your rights as a data subject',
        body: 'Under UU PDP, you have the right to access, correct, delete, and request portability of your personal data. To exercise these rights, contact us via section 8.',
      },
      {
        heading: '7. Third parties',
        body: '[PLACEHOLDER: list third-party infrastructure providers/sub-processors that process data — hosting, email, analytics — and data storage location.]',
      },
      {
        heading: '8. Contact',
        body: 'Privacy questions can be sent to hello@precia.site. [PLACEHOLDER: list a Data Protection Officer (DPO) contact once appointed.]',
      },
    ],
  },
};

export default async function PrivacyPolicy({ params }: { params: Promise<{ lang: 'en' | 'id' }> }) {
  const { lang } = await params;
  const c = content[lang];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <Link href={`/${lang}`} className="text-sm font-semibold text-primary hover:text-accent-secondary transition-colors">
        {lang === 'id' ? '← Kembali ke beranda' : '← Back to home'}
      </Link>
      <div className="mt-6 mb-8 rounded-lg border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900">
        {lang === 'id'
          ? 'Ini draf awal. Bagian bertanda [PLACEHOLDER] perlu diisi tim legal sebelum dokumen ini dianggap final dan diindeks mesin pencari.'
          : 'This is an early draft. Sections marked [PLACEHOLDER] need to be filled in by the legal team before this document is considered final and indexed by search engines.'}
      </div>
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">{c.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{c.updated}</p>
      <div className="mt-10 space-y-8">
        {c.sections.map((s, i) => (
          <div key={i}>
            <h2 className="text-lg font-semibold text-foreground">{s.heading}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
