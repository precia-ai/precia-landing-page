"use client";

import type { Dictionary } from "@/lib/dictionary";

import Link from "next/link";
import Image from "next/image";
import { appUrl } from "@/lib/site";

export default function Footer({ dict, currentLang }: { dict: Dictionary; currentLang: string }) {
  const productLinks: { href: string; key: keyof Dictionary["nav"] }[] = [
    { href: "#platform", key: "platform" },
    { href: "#modul", key: "modules" },
    { href: "#cara-kerja", key: "how_it_works" },
    { href: "#kepatuhan", key: "security" },
  ];

  return (
    <footer className="bg-muted border-t border-border py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
          <div>
            <Image
              src="/brand/precia-logo.png"
              alt="PRECIA"
              width={120}
              height={36}
              className="h-auto w-auto max-h-6 object-contain"
            />
            <p className="mt-3.5 text-sm leading-relaxed text-muted-foreground max-w-xs">{dict.footer.tagline}</p>
            <div className="mt-4 flex items-center gap-5">
              <Image src="/landingpage/partner-fasilkom.webp" alt="Fasilkom UI" width={100} height={28} className="h-6 w-auto object-contain" />
              <Image src="/landingpage/partner-fkui.png" alt="FK UI" width={100} height={28} className="h-6 w-auto object-contain" />
              <Image src="/landingpage/partner-rsui.png" alt="RSUI" width={100} height={28} className="h-6 w-auto object-contain" />
            </div>
          </div>

          <div>
            <div className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">{dict.footer.product_label}</div>
            <div className="mt-3.5 flex flex-col gap-2.5 text-sm text-foreground/80">
              {productLinks.map((link) => (
                <Link key={link.key} href={link.href} className="hover:text-primary transition-colors">
                  {dict.nav[link.key]}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">{dict.footer.company_label}</div>
            <div className="mt-3.5 flex flex-col gap-2.5 text-sm text-foreground/80">
              <Link href="#kontak" className="hover:text-primary transition-colors">{dict.nav.contact}</Link>
              <Link href="#kontak" className="hover:text-primary transition-colors">{dict.nav.cta}</Link>
              <a href={appUrl} className="hover:text-primary transition-colors">{dict.footer.company_login}</a>
              {process.env.NEXT_PUBLIC_DOCS_URL && (
                <a
                  href={`${process.env.NEXT_PUBLIC_DOCS_URL}/${currentLang}`}
                  className="hover:text-primary transition-colors"
                >
                  {dict.footer.company_docs}
                </a>
              )}
            </div>
          </div>

          <div>
            <div className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">{dict.footer.contact_label}</div>
            <div className="mt-3.5 text-sm leading-loose text-foreground/80">
              {dict.contact.email_value}
              <br />
              {dict.contact.website_value}
              <br />
              {dict.footer.address}
            </div>
          </div>
        </div>

        <div className="mt-9 pt-5 border-t border-border flex flex-col sm:flex-row justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-4">
            <div>{dict.footer.disclaimer}</div>
            <div className="flex gap-4">
              <Link href={`/${currentLang}/privacy`} className="hover:text-primary transition-colors">
                {currentLang === "id" ? "Kebijakan Privasi" : "Privacy Policy"}
              </Link>
              <Link href={`/${currentLang}/terms`} className="hover:text-primary transition-colors">
                {currentLang === "id" ? "Syarat & Ketentuan" : "Terms of Service"}
              </Link>
            </div>
          </div>
          <div>{dict.footer.copyright}</div>
        </div>
      </div>
    </footer>
  );
}
