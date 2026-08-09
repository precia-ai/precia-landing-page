"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero({ dict }: { dict: any }) {
  const stats = [
    { value: dict.hero.stat1_value, label: dict.hero.stat1_label },
    { value: dict.hero.stat2_value, label: dict.hero.stat2_label },
    { value: dict.hero.stat3_value, label: dict.hero.stat3_label },
  ];

  return (
    <>
      <section className="pt-36 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-[#e8efff] text-primary text-xs font-semibold tracking-wider uppercase px-3.5 py-2 rounded-full">
              {dict.hero.badge}
            </span>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.1] tracking-tight font-medium text-foreground text-balance">
              {dict.hero.title_before}{" "}
              <span className="text-primary italic font-serif">{dict.hero.title_accent}</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-xl">
              {dict.hero.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link
                href="#kontak"
                className="px-7 py-3.5 rounded-full bg-primary hover:bg-accent-secondary text-primary-foreground font-semibold transition-colors"
              >
                {dict.hero.cta_primary}
              </Link>
              <Link
                href="#modul"
                className="px-7 py-3.5 rounded-full bg-secondary hover:bg-border text-secondary-foreground font-semibold transition-colors"
              >
                {dict.hero.cta_secondary}
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl font-semibold text-primary">{stat.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground leading-snug">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-xl overflow-hidden border border-border shadow-lg bg-card"
          >
            <div className="flex items-center gap-2.5 bg-[#0a1b4e] text-white px-4 py-2.5 text-xs tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#3dc2c4]" />
              {dict.hero.dashboard_caption}
            </div>
            <Image
              src="/landingpage/app-dashboard.png"
              alt={dict.hero.dashboard_caption}
              width={1641}
              height={994}
              className="w-full h-auto block"
              priority
            />
          </motion.div>
        </div>
      </section>

      <section className="py-7 px-4 sm:px-6 lg:px-8 bg-muted border-y border-border">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-8">
          <div className="text-xs tracking-widest uppercase text-muted-foreground font-semibold flex-none">
            {dict.partners.label}
          </div>
          <div className="flex items-center gap-9 flex-wrap">
            <Image src="/landingpage/partner-fasilkom.webp" alt="Fakultas Ilmu Komputer Universitas Indonesia" width={160} height={40} className="h-9 w-auto object-contain" />
            <Image src="/landingpage/partner-fkui.png" alt="Fakultas Kedokteran Universitas Indonesia" width={160} height={40} className="h-9 w-auto object-contain" />
            <Image src="/landingpage/partner-rsui.png" alt="Rumah Sakit Universitas Indonesia" width={160} height={40} className="h-9 w-auto object-contain" />
          </div>
        </div>
      </section>
    </>
  );
}
