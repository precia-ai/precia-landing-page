"use client";

import type { Dictionary } from "@/lib/dictionary";

export default function FAQ({ dict }: { dict: Dictionary }) {
  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-3xl mx-auto">
        <div className="text-xs tracking-widest uppercase text-primary font-semibold">{dict.faq.eyebrow}</div>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground text-balance">
          {dict.faq.title}
        </h2>

        <div className="mt-10 space-y-3">
          {dict.faq.items.map((item, i: number) => (
            <details key={i} className="group rounded-xl border border-border bg-card px-5 py-4">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-foreground">
                {item.question}
                <span className="flex-none text-muted-foreground transition-transform duration-200 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
