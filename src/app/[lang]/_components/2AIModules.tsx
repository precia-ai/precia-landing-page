"use client";

import Image from "next/image";

export default function AIModules({ dict }: { dict: any }) {
  return (
    <>
      {/* Masalah yang kami selesaikan */}
      <section id="platform" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs tracking-widest uppercase text-primary font-semibold">
            {dict.problems.eyebrow}
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground max-w-2xl text-balance">
            {dict.problems.title}
          </h2>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {dict.problems.items.map((item: any, i: number) => (
              <div key={i} className="rounded-xl border border-border bg-card p-6">
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
      <section id="cara-kerja" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs tracking-widest uppercase text-primary font-semibold">{dict.how.eyebrow}</div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground text-balance">
            {dict.how.title}
          </h2>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {dict.how.steps.map((step: any, i: number) => (
              <div key={i} className="rounded-xl border border-border bg-card p-6">
                <div className="w-9 h-9 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  {i + 1}
                </div>
                <div className="mt-3.5 text-lg font-semibold text-foreground">{step.title}</div>
                <div className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.description}</div>
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

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {dict.modules.items.map((mod: any, i: number) => {
              const dotColor = ["bg-primary", "bg-brand-cyan", "bg-brand-turquoise", "bg-muted-foreground"][i % 4];
              const isRoadmap = mod.status === "roadmap";
              const statusLabel =
                mod.status === "available"
                  ? dict.modules.status_available
                  : mod.status === "research"
                  ? dict.modules.status_research
                  : dict.modules.status_roadmap;
              const statusClass =
                mod.status === "available"
                  ? "bg-teal-100 text-teal-700"
                  : mod.status === "research"
                  ? "bg-info-100 text-info-700"
                  : "bg-muted text-muted-foreground";
              return (
                <div
                  key={i}
                  className={`rounded-xl border p-6 ${
                    isRoadmap ? "border-dashed border-border bg-muted/40" : "border-border bg-card"
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-foreground">
                    <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                    {mod.category}
                  </div>
                  <div className="mt-4 flex justify-between items-center gap-3">
                    <span className="text-lg font-semibold text-foreground">{mod.name}</span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${statusClass}`}>
                      {statusLabel}
                    </span>
                  </div>
                  <div className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{mod.description}</div>
                  <div className="mt-4 pt-3.5 border-t border-border text-sm leading-relaxed text-muted-foreground">
                    {mod.status === "available" ? (
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
        </div>
      </section>

      {/* Tampilan produk */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs tracking-widest uppercase text-primary font-semibold">{dict.showcase.eyebrow}</div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground text-balance">
            {dict.showcase.title}
          </h2>

          <div className="mt-9 grid md:grid-cols-2 gap-6">
            <div>
              <div className="rounded-xl border border-border overflow-hidden shadow-lg bg-card">
                <Image
                  src="/landingpage/ui-result-ecg.png"
                  alt={dict.showcase.ecg_alt}
                  width={1300}
                  height={460}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="w-full h-auto block"
                />
              </div>
              <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{dict.showcase.ecg_caption}</div>
            </div>
            <div>
              <div className="rounded-xl border border-border overflow-hidden shadow-lg bg-card">
                <Image
                  src="/landingpage/ui-result-uroflow.png"
                  alt={dict.showcase.uroflow_alt}
                  width={1320}
                  height={820}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="w-full h-auto block"
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
