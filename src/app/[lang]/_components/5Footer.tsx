"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer({ dict }: { dict: any }) {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Image
            src="/brand/precia-logo.png"
            alt="PRECIA"
            width={120}
            height={36}
            className="h-auto w-auto max-h-6 object-contain grayscale opacity-60"
          />
        </div>
        <p className="text-muted-foreground text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} {dict.footer.copyright}
        </p>
        <div className="flex items-center gap-6">
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{dict.footer.privacy}</Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{dict.footer.terms}</Link>
        </div>
      </div>
    </footer>
  );
}
