"use client";

import type { Dictionary } from "@/lib/dictionary";

export default function Benefits({ dict }: { dict: Dictionary }) {
  return (
    <section id="kepatuhan" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a1b4e] text-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14">
        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white text-balance">
            {dict.platform.title}
          </h2>

          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            {dict.platform.features.map((feature, i: number) => (
              <div key={i}>
                <div className="text-base font-semibold">{feature.title}</div>
                <div className="mt-1.5 text-sm leading-relaxed text-white/60">{feature.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4">
          {dict.platform.stats.map((stat, i: number) => (
            <div
              key={i}
              className={`flex items-baseline gap-5 ${
                i < dict.platform.stats.length - 1 ? "border-b border-white/10 pb-4" : ""
              }`}
            >
              <div className="text-3xl font-semibold text-[#7fb6ff] min-w-[110px]">{stat.value}</div>
              <div className="text-sm leading-relaxed text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
