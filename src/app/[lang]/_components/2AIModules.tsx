"use client";

import type { Dictionary } from "@/lib/dictionary";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function HowItWorks({ dict }: { dict: Dictionary }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const gsapModule = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;

      const gsap = gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);

      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      ctx = gsap.context(() => {
        const scrollAmount = track.scrollWidth - container.offsetWidth;
        if (scrollAmount <= 0) return;

        gsap.to(track, {
          x: -scrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${scrollAmount}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      }, container);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="cara-kerja"
      ref={containerRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-muted border-y border-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground text-balance">
          {dict.how.title}
        </h2>
      </div>

      <div ref={trackRef} className="mt-12 flex gap-6 w-max pl-4 sm:pl-6 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] pr-10">
        {dict.how.steps.map((step, i: number) => (
          <div
            key={i}
            className="w-[78vw] sm:w-[380px] flex-none rounded-[1.75rem] bg-card border border-border p-8 shadow-sm"
          >
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold shadow-accent">
              {i + 1}
            </div>
            <div className="mt-6 text-xl font-semibold text-foreground">{step.title}</div>
            <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ShowcaseStack({ dict }: { dict: Dictionary }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -56]);

  return (
    <div ref={containerRef} className="mt-9 grid md:grid-cols-2 gap-6 md:gap-0">
      <motion.div style={{ y: y1 }} className="group md:relative md:z-10">
        <div className="rounded-[1.75rem] p-1.5 bg-white/60 backdrop-blur-md border border-white/70 shadow-lg hover:shadow-accent-lg hover:-translate-y-0.5 transition-all duration-300">
          <div className="rounded-[calc(1.75rem-0.375rem)] border border-border overflow-hidden bg-card">
            <Image
              src="/landingpage/ui-result-ecg.png"
              alt={dict.showcase.ecg_alt}
              width={1300}
              height={460}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="w-full h-auto block group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        </div>
        <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{dict.showcase.ecg_caption}</div>
      </motion.div>

      <motion.div style={{ y: y2 }} className="group md:-ml-10 md:mt-16 md:relative md:z-20">
        <div className="rounded-[1.75rem] p-1.5 bg-white/60 backdrop-blur-md border border-white/70 shadow-lg hover:shadow-accent-lg hover:-translate-y-0.5 transition-all duration-300">
          <div className="rounded-[calc(1.75rem-0.375rem)] border border-border overflow-hidden bg-card">
            <Image
              src="/landingpage/ui-result-uroflow.png"
              alt={dict.showcase.uroflow_alt}
              width={1320}
              height={820}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="w-full h-auto block group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        </div>
        <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{dict.showcase.uroflow_caption}</div>
      </motion.div>
    </div>
  );
}

export default function AIModules({ dict }: { dict: Dictionary }) {
  return (
    <>
      {/* Masalah yang kami selesaikan - horizontal accordion */}
      <section id="platform" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground max-w-2xl text-balance">
            {dict.problems.title}
          </h2>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            {dict.problems.items.map((item, i: number) => (
              <div
                key={i}
                className="group relative flex-1 sm:hover:flex-[2.2] sm:min-w-0 rounded-2xl bg-card border border-border overflow-hidden transition-[flex-grow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] p-6"
              >
                <div className="text-[11px] tracking-widest uppercase font-semibold text-amber-700">
                  {item.tag}
                </div>
                <div className="mt-2 text-lg font-semibold text-foreground leading-snug whitespace-nowrap sm:whitespace-normal">
                  {item.title}
                </div>
                <div className="mt-2 text-sm leading-relaxed text-muted-foreground sm:max-w-[260px] sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {item.description}
                </div>
                <div className="mt-4 pt-3.5 border-t border-border text-sm leading-relaxed sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 delay-150">
                  <span className="font-semibold text-primary">{dict.problems.solution_prefix}</span>{" "}
                  {item.solution}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cara kerja - GSAP horizontal scroll pin */}
      <HowItWorks dict={dict} />

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
                        className={`rounded-2xl p-1.5 bg-white/50 backdrop-blur-sm border border-white/60 shadow-sm hover:shadow-lg transition-all duration-300 ${
                          isAvailable ? "ring-1 ring-primary/10" : ""
                        }`}
                      >
                        <div className="rounded-[calc(1rem-0.375rem)] bg-card p-5">
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

      {/* Tampilan produk - card stacking */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground text-balance">
            {dict.showcase.title}
          </h2>

          <ShowcaseStack dict={dict} />
        </div>
      </section>
    </>
  );
}
