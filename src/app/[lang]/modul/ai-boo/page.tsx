import type { Metadata } from 'next';
import Link from 'next/link';
import { siteUrl } from '@/lib/site';

export function generateMetadata(): Metadata {
  const title = 'AI-BOO Multimodal — PRECIA';
  const description = 'Skrining Bladder Outlet Obstruction dari waveform uroflowmetry dan data klinis pasien, dengan safety net klinis dan visualisasi area waveform paling berpengaruh.';
  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/id/modul/ai-boo` },
  };
}

const content: Record<'id' | 'en', { title: string; sections: { heading: string; body: string }[] }> = {
  id: {
    title: 'AI-BOO Multimodal',
    sections: [
      {
        heading: 'Apa yang dideteksi',
        body: 'AI-BOO Multimodal menyaring kemungkinan Bladder Outlet Obstruction (BOO) dengan menggabungkan waveform uroflowmetry (file PDF atau .DTA dari alat uroflowmeter) dengan 10 data klinis pasien (IPSS, skor storage/voiding, QoL, usia, volume prostat, dll) dan 6 parameter uroflowmetry (Qmax, Qave, volume berkemih, PVR, waktu alir, waktu ke aliran puncak).',
      },
      {
        heading: 'Cara kerja teknis',
        body: 'Arsitektur model punya 3 encoder terpisah — cabang waveform (CNN 1D + residual + temporal attention), cabang tabular UFM, dan cabang tabular klinis — digabung di layer akhir. Output ke dokter: probabilitas BOO, prediksi biner BOO/Non-BOO, tingkat keyakinan (HIGH/MEDIUM/LOW), rekomendasi klinis (misalnya "Alpha-Blocker Trial", "UDS Recommended"), dan visualisasi bagian waveform yang paling memengaruhi prediksi.',
      },
      {
        heading: 'Safety net klinis',
        body: 'Kalau model memprediksi Non-BOO tapi skor Voiding ≥10 dan total IPSS ≥18, sistem tetap menandai kasus untuk pemeriksaan urodinamik (UDS) terlepas dari hasil model. Mekanisme ini sudah diverifikasi aktif di transaksi produksi nyata.',
      },
      {
        heading: 'Alur kerja end-to-end',
        body: 'Dokter/perawat membuat transaksi klinis di unit Urologi, mengunggah file waveform uroflowmetry, mengisi data klinis pasien, menandai siap diproses AI. Hasil (klasifikasi, confidence, rekomendasi, visualisasi waveform) keluar dalam hitungan detik dan tercatat otomatis di audit trail.',
      },
      {
        heading: 'Batasan dan transparansi',
        body: 'Modul ini berstatus pilot secara internal, bukan alat diagnostik final — keputusan klinis tetap di tangan dokter. Model saat ini punya AUC cross-validation 0,871 dan AUC validasi eksternal 0,656 di level dokumentasi rekayasa (angka ini sengaja tidak ditampilkan ke dokter di aplikasi karena dianggap belum relevan untuk konteks klinis harian). Belum ada registrasi BPOM/Kemenkes untuk modul ini. Varian model lain (Ver B dan seterusnya) masih dalam riset dan belum dipakai di layanan ini.',
      },
    ],
  },
  en: {
    title: 'AI-BOO Multimodal',
    sections: [
      {
        heading: 'What it screens for',
        body: 'AI-BOO Multimodal screens for likely Bladder Outlet Obstruction (BOO) by combining a uroflowmetry waveform (PDF or .DTA file from the uroflowmeter) with 10 patient clinical fields (IPSS, storage/voiding scores, QoL, age, prostate volume, etc.) and 6 uroflowmetry parameters (Qmax, Qave, voided volume, PVR, flow time, time to max flow).',
      },
      {
        heading: 'How it works technically',
        body: 'The model architecture has 3 separate encoders — a waveform branch (1D CNN + residual + temporal attention), a UFM tabular branch, and a clinical tabular branch — fused at a final layer. What the doctor sees: BOO probability, binary BOO/Non-BOO prediction, confidence tier (HIGH/MEDIUM/LOW), a clinical recommendation (e.g. "Alpha-Blocker Trial", "UDS Recommended"), and a visualization of the part of the waveform that most influenced the prediction.',
      },
      {
        heading: 'Clinical safety net',
        body: 'If the model predicts Non-BOO but the Voiding score is ≥10 and total IPSS is ≥18, the system still flags the case for urodynamic study (UDS) regardless of the model output. This mechanism has been verified active in real production transactions.',
      },
      {
        heading: 'End-to-end workflow',
        body: 'A clinician creates a clinical transaction in the Urology unit, uploads the uroflowmetry waveform file, fills in patient clinical data, and marks it ready for AI. Results (classification, confidence, recommendation, waveform visualization) come back within seconds and are logged automatically.',
      },
      {
        heading: 'Limitations and transparency',
        body: 'This module is internally labeled pilot status, not a final diagnostic tool — clinical decisions remain with the doctor. The current model has an engineering-documented cross-validation AUC of 0.871 and external validation AUC of 0.656 (deliberately not shown to doctors in the app, since it was judged not relevant to day-to-day clinical use). This module does not yet have BPOM/Kemenkes registration. Other model variants (Ver B and beyond) are still in research and not used in this service.',
      },
    ],
  },
};

export default async function AIBOOModulePage({ params }: { params: Promise<{ lang: 'en' | 'id' }> }) {
  const { lang } = await params;
  const c = content[lang];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <Link href={`/${lang}#modul`} className="text-sm font-semibold text-primary hover:text-accent-secondary transition-colors">
        {lang === 'id' ? '← Kembali ke modul AI' : '← Back to AI modules'}
      </Link>
      <div className="mt-6 text-xs tracking-widest uppercase text-primary font-semibold">Urologi / Urology</div>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{c.title}</h1>
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
