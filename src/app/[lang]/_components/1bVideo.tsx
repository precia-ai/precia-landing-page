import type { Dictionary } from "@/lib/dictionary";

export default function Video({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <div className="text-xs tracking-widest uppercase text-primary font-semibold">{dict.video.eyebrow}</div>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground text-balance">
          {dict.video.title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
          {dict.video.subtitle}
        </p>

        <div className="mt-9 rounded-[1.75rem] p-1.5 bg-white/60 backdrop-blur-md border border-white/70 shadow-lg">
          <div className="rounded-[calc(1.75rem-0.375rem)] overflow-hidden bg-card aspect-video">
            <iframe
              src="https://www.youtube-nocookie.com/embed/MD4K5GdgQf4"
              title={dict.video.iframe_title}
              className="w-full h-full"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
