"use client";

import type { Dictionary } from "@/lib/dictionary";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ZoomableImage from "./ZoomableImage";

const partnerLogos = [
  { src: "/landingpage/partner-fasilkom.webp", alt: "Fakultas Ilmu Komputer Universitas Indonesia", href: "https://cs.ui.ac.id" },
  { src: "/landingpage/partner-fkui.png", alt: "Fakultas Kedokteran Universitas Indonesia", href: "https://fk.ui.ac.id" },
  { src: "/landingpage/partner-rsui.png", alt: "Rumah Sakit Universitas Indonesia", href: "https://rs.ui.ac.id" },
];

export default function Hero({ dict }: { dict: Dictionary }) {
  const stats = [
    { value: dict.hero.stat1_value, label: dict.hero.stat1_label },
    { value: dict.hero.stat2_value, label: dict.hero.stat2_label },
    { value: dict.hero.stat3_value, label: dict.hero.stat3_label },
  ];

  return (
    <>
      <section className="relative pt-36 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="mesh-glow" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-[#e8efff] text-primary text-xs font-semibold tracking-wider uppercase px-3.5 py-2 rounded-full">
              {dict.hero.badge}
            </span>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.1] tracking-tight font-medium text-foreground text-balance">
              {dict.hero.title_before ? `${dict.hero.title_before} ` : ""}
              <span className="text-primary italic">{dict.hero.title_accent}</span>{" "}
              {dict.hero.title_after}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-xl">
              {dict.hero.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link
                href="#kontak"
                className="px-7 py-3.5 rounded-full bg-primary hover:bg-accent-secondary active:scale-[0.97] text-primary-foreground font-semibold transition-all duration-200 shadow-accent hover:shadow-accent-lg"
              >
                {dict.hero.cta_primary}
              </Link>
              <Link
                href="#modul"
                className="px-7 py-3.5 rounded-full bg-secondary hover:bg-border active:scale-[0.97] text-secondary-foreground font-semibold transition-all duration-200"
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
          >
            <ZoomableImage
              src="/landingpage/ui-dashboard-macbook-v2.png"
              alt={dict.hero.dashboard_caption}
              width={2762}
              height={1586}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-full h-auto block drop-shadow-2xl"
              priority
            />
          </motion.div>
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-muted border-y border-border overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center gap-8">
          <div className="text-xs tracking-widest uppercase text-muted-foreground font-semibold flex-none">
            {dict.partners.label}
          </div>
          <div
            className="flex-1 overflow-hidden"
            style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
          >
            <div className="marquee-track flex items-center gap-16 w-max">
              {[...partnerLogos, ...partnerLogos].map((logo, i) => (
                <a key={i} href={logo.href} target="_blank" rel="noopener noreferrer" className="flex-none">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={260}
                    height={70}
                    className="h-16 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-4 text-sm leading-relaxed text-muted-foreground">
          {dict.partners.description}
        </div>
      </section>
    </>
  );
}
