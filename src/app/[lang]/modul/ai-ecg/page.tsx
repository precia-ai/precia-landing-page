import type { Metadata } from 'next';
import Link from 'next/link';
import { siteUrl } from '@/lib/site';

export function generateMetadata(): Metadata {
  const title = 'AI-ECG (EF Screening) — PRECIA';
  const description = 'Skrining indikasi ejection fraction rendah dari citra ECG 12-lead. Klasifikasi Normal/Abnormal dengan confidence score, alat bantu keputusan dokter.';
  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/id/modul/ai-ecg` },
  };
}

const content: Record<'id' | 'en', { title: string; sections: { heading: string; body: string }[] }> = {
  id: {
    title: 'AI-ECG (EF Screening)',
    sections: [
      {
        heading: 'Apa yang dideteksi',
        body: 'AI-ECG membantu dokter menyaring indikasi Ejection Fraction (EF) rendah, yaitu penurunan fungsi pompa jantung, langsung dari citra ECG 12-lead standar (bukan file digital 1D, tapi gambar hasil pemeriksaan ECG biasa). Model mengklasifikasikan hasil sebagai Normal atau Abnormal, di mana "Abnormal" adalah proxy untuk kemungkinan EF ≤40%.',
      },
      {
        heading: 'Cara kerja teknis',
        body: 'Model yang dipakai adalah DenseNet dengan ensemble 5-fold, dilayani lewat ONNX Runtime, dan sudah berjalan di produksi PRECIA sejak modul pertama diluncurkan (AI-ECG adalah modul AI pertama PRECIA yang live). Output yang ditampilkan ke dokter: confidence score, klasifikasi Normal/Abnormal, probabilitas tiap kelas, waktu inferensi, dan panduan membaca hasil.',
      },
      {
        heading: 'Panduan interpretasi yang ditampilkan ke dokter',
        body: 'Normal dengan confidence di atas 90% dibaca sebagai "EF kemungkinan besar di atas 40%". Normal dengan confidence 70-90% disarankan review manual. Abnormal dengan confidence di atas 80% disarankan konfirmasi lewat ekokardiografi. Abnormal dengan confidence 50-80% dibaca tidak konklusif dan disarankan pemeriksaan ulang.',
      },
      {
        heading: 'Alur kerja end-to-end',
        body: 'Dokter/perawat membuat transaksi klinis di unit Kardiologi, mengunggah citra ECG pasien, menandai transaksi siap diproses AI. Modul AI-ECG memproses citra dan mengembalikan hasil dalam hitungan detik hingga menit tergantung beban server. Hasil, termasuk ground truth yang bisa ditambahkan dokter untuk audit, tercatat otomatis di audit trail.',
      },
      {
        heading: 'Batasan dan transparansi',
        body: 'AI-ECG adalah alat bantu skrining (decision support), bukan pengganti diagnosis klinis — konfirmasi lewat pemeriksaan klinis standar (ekokardiografi) tetap diperlukan untuk kasus Abnormal. Kami belum memiliki data sensitivity/specificity yang terpublikasi khusus untuk model yang live ini, dan belum ada registrasi BPOM/Kemenkes untuk modul ini. Kami pilih transparan soal ini daripada mengklaim validasi yang belum ada.',
      },
      {
        heading: 'Status uji coba',
        body: 'AI-ECG sudah diuji end-to-end lewat alur transaksi klinis asli, termasuk oleh tenant RSUI (Rumah Sakit Universitas Indonesia) di lingkungan pengujian kami — dari unggah citra ECG sampai hasil AI keluar. Kalau institusi Anda tertarik uji coba serupa, hubungi tim kami.',
      },
    ],
  },
  en: {
    title: 'AI-ECG (EF Screening)',
    sections: [
      {
        heading: 'What it screens for',
        body: 'AI-ECG helps doctors screen for signs of reduced Ejection Fraction (EF) — a marker of reduced heart pumping function — directly from a standard 12-lead ECG image (not a 1D digital signal, an ordinary ECG printout/photo). The model classifies the result as Normal or Abnormal, where "Abnormal" is a proxy for likely EF ≤40%.',
      },
      {
        heading: 'How it works technically',
        body: 'The model is a DenseNet with a 5-fold ensemble, served via ONNX Runtime, and has been running in PRECIA production since our first AI module launched (AI-ECG is PRECIA\'s first live AI module). What the doctor sees: confidence score, Normal/Abnormal classification, per-class probabilities, inference time, and a reading guide.',
      },
      {
        heading: 'Interpretation guide shown to doctors',
        body: 'Normal with confidence above 90% reads as "EF is likely above 40%." Normal with 70-90% confidence is flagged for manual review. Abnormal with confidence above 80% is flagged to confirm via echocardiography. Abnormal with 50-80% confidence reads as inconclusive, retest recommended.',
      },
      {
        heading: 'End-to-end workflow',
        body: 'A clinician creates a clinical transaction in the Cardiology unit, uploads the patient\'s ECG image, and marks it ready for AI. AI-ECG processes the image and returns a result within seconds to minutes depending on server load. Results, including ground truth a doctor can add for audit purposes, are logged automatically.',
      },
      {
        heading: 'Limitations and transparency',
        body: 'AI-ECG is a screening decision-support tool, not a replacement for clinical diagnosis — echocardiography confirmation is still required for Abnormal results. We do not yet have published sensitivity/specificity data specific to this live model, and this module does not yet have BPOM/Kemenkes registration. We\'d rather be transparent about this than claim validation we don\'t have.',
      },
      {
        heading: 'Pilot status',
        body: 'AI-ECG has been tested end-to-end through real clinical transaction workflows, including by our RSUI (Universitas Indonesia Hospital) tenant in our test environment — from ECG image upload through to AI output. If your institution is interested in a similar trial, get in touch.',
      },
    ],
  },
};

export default async function AIECGModulePage({ params }: { params: Promise<{ lang: 'en' | 'id' }> }) {
  const { lang } = await params;
  const c = content[lang];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <Link href={`/${lang}#modul`} className="text-sm font-semibold text-primary hover:text-accent-secondary transition-colors">
        {lang === 'id' ? '← Kembali ke modul AI' : '← Back to AI modules'}
      </Link>
      <div className="mt-6 text-xs tracking-widest uppercase text-primary font-semibold">Kardiologi / Cardiology</div>
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
