"use client";

import type { Dictionary } from "@/lib/dictionary";

import Image from "next/image";

export default function AIModules({ dict }: { dict: Dictionary }) {
  return (
    <>
      {/* Masalah yang kami selesaikan */}
      <section id="platform" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground max-w-2xl text-balance">
            {dict.problems.title}
          </h2>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {dict.problems.items.map((item, i: number) => (
              <div
                key={i}
                className="rounded-xl bg-card p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-[11px] tracking-widest uppercase font-semibold text-amber-700">
                  {item.tag}
                </div>
                <div className="mt-2 text-lg font-semibold text-foreground leading-snug">{item.title}</div>
                <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</div>
                <div className="mt-4 pt-3.5 border-t border-border text-sm leading-relaxed">
                  <span className="font-semibold text-primary">{dict.problems.solution_prefix}</span>{" "}
                  {item.solution}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cara kerja */}
      <section id="cara-kerja" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted border-y border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground text-balance">
            {dict.how.title}
          </h2>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-0 lg:gap-6">
            {dict.how.steps.map((step, i: number) => (
              <div key={i} className="relative flex lg:flex-col gap-4 lg:gap-0 py-5 lg:py-0">
                <div className="flex flex-col items-center lg:items-start flex-none">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold shadow-accent">
                    {i + 1}
                  </div>
                  {i < dict.how.steps.length - 1 && (
                    <div className="mt-2 w-px flex-1 bg-border lg:hidden" aria-hidden="true" />
                  )}
                </div>
                {i < dict.how.steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-5 left-[calc(50%+20px)] right-[calc(-50%+20px)] h-px bg-border"
                    aria-hidden="true"
                  />
                )}
                <div className="lg:mt-4">
                  <div className="text-lg font-semibold text-foreground">{step.title}</div>
                  <div className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modul AI */}
      <section id="modul" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-between items-end gap-8">
            <div>
              <div className="text-xs tracking-widest uppercase text-primary font-semibold">{dict.modules.eyebrow}</div>
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground text-balance">
                {dict.modules.title}
              </h2>
            </div>
            <p className="text-muted-foreground max-w-sm leading-relaxed">{dict.modules.subtitle}</p>
          </div>

          {(() => {
            const mainModules = dict.modules.items.filter((m) => m.status !== "roadmap");
            const roadmapModules = dict.modules.items.filter((m) => m.status === "roadmap");
            const dotColors = ["bg-primary", "bg-brand-cyan", "bg-brand-turquoise"];

            return (
              <>
                <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {mainModules.map((mod, i: number) => {
                    const isAvailable = mod.status === "available";
                    return (
                      <div
                        key={i}
                        className={`rounded-xl bg-card p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 ${
                          isAvailable ? "ring-1 ring-primary/10" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-foreground">
                          <span className={`w-2 h-2 rounded-full ${dotColors[i % 3]}`} />
                          {mod.category}
                        </div>
                        <div className="mt-4 flex justify-between items-center gap-3">
                          <span className="text-lg font-semibold text-foreground">{mod.name}</span>
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
                              isAvailable ? "bg-teal-100 text-teal-700" : "bg-info-100 text-info-700"
                            }`}
                          >
                            {isAvailable ? dict.modules.status_available : dict.modules.status_research}
                          </span>
                        </div>
                        <div className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{mod.description}</div>
                        <div className="mt-4 pt-3.5 border-t border-border text-sm leading-relaxed text-muted-foreground">
                          {isAvailable ? (
                            <>
                              <span className="font-semibold text-foreground">{dict.modules.roadmap_prefix}</span>{" "}
                              {mod.roadmap}
                            </>
                          ) : (
                            mod.roadmap
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {roadmapModules.map((mod, i: number) => (
                  <div
                    key={i}
                    className="mt-5 rounded-xl border border-dashed border-border bg-muted/40 p-6 flex flex-wrap items-center justify-between gap-4"
                  >
                    <div>
                      <div className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                        {mod.category}
                      </div>
                      <div className="mt-1 text-base font-semibold text-foreground">{mod.description}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground whitespace-nowrap">
                        {dict.modules.status_roadmap}
                      </span>
                      <span className="text-sm text-muted-foreground">{mod.roadmap}</span>
                    </div>
                  </div>
                ))}
              </>
            );
          })()}
        </div>
      </section>

      {/* Tampilan produk */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground text-balance">
            {dict.showcase.title}
          </h2>

          <div className="mt-9 grid md:grid-cols-2 gap-6">
            <div className="group">
              <div className="rounded-xl border border-border overflow-hidden shadow-lg hover:shadow-accent-lg hover:-translate-y-0.5 transition-all duration-300 bg-card">
                <Image
                  src="/landingpage/ui-result-ecg.png"
                  alt={dict.showcase.ecg_alt}
                  width={1300}
                  height={460}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="w-full h-auto block group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{dict.showcase.ecg_caption}</div>
            </div>
            <div className="group">
              <div className="rounded-xl border border-border overflow-hidden shadow-lg hover:shadow-accent-lg hover:-translate-y-0.5 transition-all duration-300 bg-card">
                <Image
                  src="/landingpage/ui-result-uroflow.png"
                  alt={dict.showcase.uroflow_alt}
                  width={1320}
                  height={820}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="w-full h-auto block group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{dict.showcase.uroflow_caption}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
