import type { Metadata } from 'next';
import Link from 'next/link';

export function generateMetadata(): Metadata {
  return {
    title: 'Terms of Service',
    robots: { index: false, follow: true },
  };
}

const content: Record<'id' | 'en', { title: string; updated: string; sections: { heading: string; body: string }[] }> = {
  id: {
    title: 'Syarat dan Ketentuan',
    updated: 'Draf terakhir diperbarui: 2026-08-09 — belum dipublikasikan resmi',
    sections: [
      {
        heading: '1. Penerimaan ketentuan',
        body: '[PLACEHOLDER: sebutkan nama badan hukum penyedia layanan (PT ...), nomor registrasi, dan alamat terdaftar.] Dengan menggunakan platform PRECIA, institusi Anda menyetujui syarat dan ketentuan berikut.',
      },
      {
        heading: '2. Deskripsi layanan',
        body: 'PRECIA menyediakan modul AI klinis (skrining AI-ECG, AI-BOO Multimodal uroflowmetry) sebagai alat bantu skrining. PRECIA bukan alat diagnosis final — keputusan klinis tetap berada di tangan dokter yang berwenang.',
      },
      {
        heading: '3. Status regulasi',
        body: '[PLACEHOLDER: cantumkan status registrasi alat kesehatan/perangkat lunak medis dari Kementerian Kesehatan RI dan/atau BPOM untuk setiap modul AI yang berstatus "Tersedia".]',
      },
      {
        heading: '4. Tanggung jawab pengguna',
        body: 'Institusi pengguna bertanggung jawab memastikan hasil skrining AI ditinjau oleh tenaga medis berwenang sebelum digunakan untuk pengambilan keputusan klinis, sesuai disclaimer yang tercantum di platform.',
      },
      {
        heading: '5. Batasan tanggung jawab',
        body: '[PLACEHOLDER: cantumkan klausul batasan tanggung jawab yang sudah direview tim legal, khususnya terkait penggunaan hasil AI dalam konteks klinis.]',
      },
      {
        heading: '6. Kekayaan intelektual',
        body: 'Seluruh perangkat lunak, model AI, dan materi platform PRECIA adalah milik [PLACEHOLDER: nama badan hukum] dan dilindungi hukum kekayaan intelektual yang berlaku.',
      },
      {
        heading: '7. Perubahan ketentuan',
        body: 'Ketentuan ini dapat diperbarui sewaktu-waktu. Perubahan material akan diinformasikan kepada institusi pengguna melalui email atau pemberitahuan di platform.',
      },
      {
        heading: '8. Hukum yang berlaku',
        body: 'Ketentuan ini tunduk pada hukum Republik Indonesia. [PLACEHOLDER: sebutkan yurisdiksi penyelesaian sengketa.]',
      },
      {
        heading: '9. Kontak',
        body: 'Pertanyaan seputar syarat dan ketentuan dapat dikirim ke hello@precia.site.',
      },
    ],
  },
  en: {
    title: 'Terms of Service',
    updated: 'Draft last updated: 2026-08-09 — not yet officially published',
    sections: [
      {
        heading: '1. Acceptance of terms',
        body: '[PLACEHOLDER: state the legal entity name providing the service (PT ...), registration number, and registered address.] By using the PRECIA platform, your institution agrees to the following terms.',
      },
      {
        heading: '2. Service description',
        body: 'PRECIA provides clinical AI modules (AI-ECG screening, AI-BOO Multimodal uroflowmetry) as a screening aid. PRECIA is not a final diagnostic tool — clinical decisions remain with the licensed physician.',
      },
      {
        heading: '3. Regulatory status',
        body: '[PLACEHOLDER: state the medical device/software registration status from Indonesia\'s Ministry of Health and/or BPOM for each AI module marked "Available".]',
      },
      {
        heading: '4. User responsibilities',
        body: 'The user institution is responsible for ensuring AI screening results are reviewed by a licensed medical professional before being used for clinical decision-making, per the disclaimer stated on the platform.',
      },
      {
        heading: '5. Limitation of liability',
        body: '[PLACEHOLDER: insert a legal-reviewed limitation of liability clause, specifically addressing use of AI output in a clinical context.]',
      },
      {
        heading: '6. Intellectual property',
        body: 'All software, AI models, and platform materials are the property of [PLACEHOLDER: legal entity name] and are protected under applicable intellectual property law.',
      },
      {
        heading: '7. Changes to terms',
        body: 'These terms may be updated from time to time. Material changes will be communicated to user institutions via email or an in-platform notice.',
      },
      {
        heading: '8. Governing law',
        body: 'These terms are governed by the law of the Republic of Indonesia. [PLACEHOLDER: state the dispute-resolution jurisdiction.]',
      },
      {
        heading: '9. Contact',
        body: 'Questions about these terms can be sent to hello@precia.site.',
      },
    ],
  },
};

export default async function TermsOfService({ params }: { params: Promise<{ lang: 'en' | 'id' }> }) {
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
