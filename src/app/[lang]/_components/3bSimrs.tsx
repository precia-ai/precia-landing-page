"use client";

import type { Dictionary } from "@/lib/dictionary";

import Image from "next/image";

const LOGO_DIR = "/landingpage/simrs";

// How a logo file is presented. "badge" is opaque square artwork masked into a
// circle, "icon" is a transparent mark shown as it is. An item whose logo is
// null, or whose kind is unknown, falls back to a name pill, so a new SIMRS
// only needs a dictionary entry plus its file in LOGO_DIR.
const LOGO_KINDS: Record<string, { size: number; className: string }> = {
  badge: { size: 36, className: "h-9 w-9 rounded-full object-cover" },
  icon: { size: 32, className: "h-8 w-8 rounded object-contain" },
};

export default function Simrs({ dict }: { dict: Dictionary }) {
  return (
    <section id="simrs" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-xs tracking-widest uppercase text-primary font-semibold">{dict.simrs.eyebrow}</div>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground max-w-2xl text-balance">
          {dict.simrs.title}
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">{dict.simrs.subtitle}</p>

        {/* The column count follows the number of cards. A track is never
            narrower than 11rem and never narrower than a quarter of the row,
            where 60px covers the three 1.25rem gaps of gap-5, so three cards
            still fill the row and eight wrap into rows of four. */}
        <div className="mt-10 grid gap-5 sm:grid-cols-[repeat(auto-fit,minmax(max(11rem,(100%_-_60px)/4),1fr))]">
          {dict.simrs.items.map((item) => {
            const logo = item.logo;
            const kind = logo ? LOGO_KINDS[logo.kind] : undefined;

            return (
              <div key={item.key} className="rounded-xl bg-card border border-border p-6 shadow-sm">
                <div className="h-9 flex items-center">
                  {logo && kind ? (
                    <Image
                      src={`${LOGO_DIR}/${logo.file}`}
                      alt={item.name}
                      width={kind.size}
                      height={kind.size}
                      className={kind.className}
                    />
                  ) : (
                    <div className="h-9 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                      {item.name}
                    </div>
                  )}
                </div>
                <div className="mt-4 text-base font-semibold text-foreground">{item.name}</div>
                <div className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.note}</div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-sm text-muted-foreground max-w-2xl">{dict.simrs.note}</p>
      </div>
    </section>
  );
}
