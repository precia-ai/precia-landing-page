import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6 text-center gap-6">
      <Image src="/brand/precia-logo.png" alt="PRECIA" width={140} height={42} className="h-7 w-auto object-contain" />
      <div>
        <div className="text-sm font-semibold tracking-widest uppercase text-primary">404</div>
        <h1 className="mt-2 text-2xl sm:text-3xl font-medium text-foreground">Halaman tidak ditemukan</h1>
        <p className="mt-3 text-muted-foreground max-w-md">
          Halaman yang Anda cari sudah dipindahkan atau tidak pernah ada.
        </p>
      </div>
      <Link
        href="/id"
        className="px-6 py-3 rounded-full bg-primary hover:bg-accent-secondary text-primary-foreground font-semibold transition-colors"
      >
        Kembali ke beranda
      </Link>
    </div>
  );
}
