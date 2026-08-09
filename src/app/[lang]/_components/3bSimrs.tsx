"use client";

import type { Dictionary } from "@/lib/dictionary";

import Image from "next/image";

export default function Simrs({ dict }: { dict: Dictionary }) {
  return (
    <section id="simrs" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-xs tracking-widest uppercase text-primary font-semibold">{dict.simrs.eyebrow}</div>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground max-w-2xl text-balance">
          {dict.simrs.title}
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">{dict.simrs.subtitle}</p>

        <div className="mt-10 grid sm:grid-cols-3 gap-5">
          {dict.simrs.items.map((item, i: number) => (
            <div key={i} className="rounded-xl bg-card border border-border p-6 shadow-sm">
              <div className="h-9 flex items-center">
                {item.name === "SIMRS Khanza" && (
                  <Image src="/landingpage/simrs/khanza.jpg" alt="SIMRS Khanza" width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
                )}
                {item.name === "Open Hospital" && (
                  <Image src="/landingpage/simrs/openhospital.png" alt="Open Hospital" width={32} height={32} className="h-8 w-8 rounded object-contain" />
                )}
                {item.name === "MEDICCA" && (
                  <div className="h-9 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                    MEDICCA
                  </div>
                )}
              </div>
              <div className="mt-4 text-base font-semibold text-foreground">{item.name}</div>
              <div className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.note}</div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted-foreground max-w-2xl">{dict.simrs.note}</p>
      </div>
    </section>
  );
}
