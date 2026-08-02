"use client";

import { motion } from "framer-motion";
import { LinkIcon, LockClosedIcon, CubeTransparentIcon, ServerStackIcon, BeakerIcon } from "@heroicons/react/24/outline";

export default function Benefits({ dict }: { dict: any }) {
  return (
    <section id="benefits" className="relative py-32 overflow-hidden" style={{ background: "linear-gradient(180deg, #030917 0%, #0a1628 40%, #0a1628 60%, #030917 100%)" }}>
      {/* Blue gradient at TOP — inverted from hero */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background: "radial-gradient(ellipse at top, #0052ff 0%, transparent 65%)",
        }}
      />
      {/* Secondary ambient glows */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, #4d7cff 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, #15acd6 0%, transparent 70%)" }} />
      {/* Grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#4d7cff]/20 bg-white/[0.04] backdrop-blur-sm mb-6"
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-[#4d7cff]"
              animate={{ boxShadow: ["0 0 4px rgba(77,124,255,0.4)", "0 0 12px rgba(77,124,255,0.8)", "0 0 4px rgba(77,124,255,0.4)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs font-medium text-[#a5bfff] tracking-wider uppercase">{dict.benefits.badge}</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-6 leading-[1.1]">
            {dict.benefits.title_part1}{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #4d7cff, #a5bfff, #15acd6)" }}>
              {dict.benefits.title_highlight}
            </span>
          </h2>
          <p className="text-lg text-white/50 font-light leading-relaxed">
            {dict.benefits.subtitle}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Card 1 — Large */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="lg:row-span-2"
          >
            <div className="group relative h-full rounded-3xl border border-white/[0.06] overflow-hidden" style={{ backgroundColor: "rgba(10,22,40,0.5)" }}>
              {/* Animated shimmer border */}
              <motion.div
                className="absolute -inset-[1px] rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: "conic-gradient(from 0deg, transparent 0%, #4d7cff40 25%, transparent 50%, #4d7cff40 75%, transparent 100%)",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "xor",
                    padding: "1.5px",
                    borderRadius: "1.5rem",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>

              <div className="relative p-8 lg:p-10 h-full flex flex-col justify-between">
                {/* Top glow */}
                <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none opacity-0 group-hover:opacity-[0.08] transition-opacity duration-700" style={{ background: "radial-gradient(circle, #4d7cff, transparent 70%)" }} />

                <div className="relative z-10 space-y-6">
                  {/* Icon + Number */}
                  <div className="flex items-center justify-between">
                    <motion.div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center border"
                      style={{ backgroundColor: "#4d7cff12", borderColor: "#4d7cff25" }}
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <LinkIcon className="w-7 h-7" style={{ color: "#4d7cff" }} />
                    </motion.div>
                    <span className="text-7xl font-black tracking-tighter" style={{ color: "#4d7cff12" }}>01</span>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl lg:text-3xl font-semibold text-white leading-tight">
                      {dict.benefits.items["01"].title}
                    </h3>
                    <p className="text-white/45 leading-relaxed text-sm lg:text-base font-light">
                      {dict.benefits.items["01"].description}
                    </p>
                  </div>

                  {/* Keywords */}
                  <div className="flex flex-wrap gap-2">
                    {dict.benefits.items["01"].keywords.map((kw: string) => (
                      <span key={kw} className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide border" style={{ color: "#4d7cff", backgroundColor: "#4d7cff0d", borderColor: "#4d7cff20" }}>
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Decorative bottom */}
                <div className="relative z-10 mt-8 pt-6 border-t border-white/[0.04]">
                  <div className="flex items-center gap-3">
                    <div className="h-[2px] flex-1" style={{ background: "linear-gradient(90deg, #4d7cff30, transparent)" }} />
                    <span className="text-[10px] text-white/20 tracking-widest uppercase">{dict.benefits.items["01"].footer}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2 — Regular */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 100 }}
          >
            <div className="group relative h-full rounded-3xl border border-white/[0.06] overflow-hidden" style={{ backgroundColor: "rgba(10,22,40,0.5)" }}>
              <motion.div className="absolute -inset-[1px] rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  style={{ background: "conic-gradient(from 180deg, transparent 0%, #15acd640 25%, transparent 50%, #15acd640 75%, transparent 100%)", mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude", WebkitMaskComposite: "xor", padding: "1.5px", borderRadius: "1.5rem" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>

              <div className="relative p-8 lg:p-10 h-full">
                <div className="absolute top-0 left-0 w-64 h-64 rounded-full pointer-events-none opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700" style={{ background: "radial-gradient(circle, #15acd6, transparent 70%)" }} />

                <div className="relative z-10 space-y-5">
                  <div className="flex items-center justify-between">
                    <motion.div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center border"
                      style={{ backgroundColor: "#15acd612", borderColor: "#15acd625" }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <LockClosedIcon className="w-7 h-7" style={{ color: "#15acd6" }} />
                    </motion.div>
                    <span className="text-6xl font-black tracking-tighter" style={{ color: "#15acd60f" }}>02</span>
                  </div>

                  <h3 className="text-xl lg:text-2xl font-semibold text-white leading-tight">
                    {dict.benefits.items["02"].title}
                  </h3>
                  <p className="text-white/45 leading-relaxed text-sm font-light">
                    {dict.benefits.items["02"].description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {dict.benefits.items["02"].keywords.map((kw: string) => (
                      <span key={kw} className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide border" style={{ color: "#15acd6", backgroundColor: "#15acd60d", borderColor: "#15acd620" }}>
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3 — Regular */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
          >
            <div className="group relative h-full rounded-3xl border border-white/[0.06] overflow-hidden" style={{ backgroundColor: "rgba(10,22,40,0.5)" }}>
              <motion.div className="absolute -inset-[1px] rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  style={{ background: "conic-gradient(from 90deg, transparent 0%, #8b5cf640 25%, transparent 50%, #8b5cf640 75%, transparent 100%)", mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude", WebkitMaskComposite: "xor", padding: "1.5px", borderRadius: "1.5rem" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>

              <div className="relative p-8 lg:p-10 h-full">
                <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full pointer-events-none opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700" style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }} />

                <div className="relative z-10 space-y-5">
                  <div className="flex items-center justify-between">
                    <motion.div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center border"
                      style={{ backgroundColor: "#8b5cf612", borderColor: "#8b5cf625" }}
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <CubeTransparentIcon className="w-7 h-7" style={{ color: "#8b5cf6" }} />
                    </motion.div>
                    <span className="text-6xl font-black tracking-tighter" style={{ color: "#8b5cf60f" }}>03</span>
                  </div>

                  <h3 className="text-xl lg:text-2xl font-semibold text-white leading-tight">
                    {dict.benefits.items["03"].title}
                  </h3>
                  <p className="text-white/45 leading-relaxed text-sm font-light">
                    {dict.benefits.items["03"].description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {dict.benefits.items["03"].keywords.map((kw: string) => (
                      <span key={kw} className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide border" style={{ color: "#8b5cf6", backgroundColor: "#8b5cf60d", borderColor: "#8b5cf620" }}>
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 4 — Regular */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 100 }}
          >
            <div className="group relative h-full rounded-3xl border border-white/[0.06] overflow-hidden" style={{ backgroundColor: "rgba(10,22,40,0.5)" }}>
              <motion.div className="absolute -inset-[1px] rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  style={{ background: "conic-gradient(from 270deg, transparent 0%, #3dc2c440 25%, transparent 50%, #3dc2c440 75%, transparent 100%)", mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude", WebkitMaskComposite: "xor", padding: "1.5px", borderRadius: "1.5rem" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>

              <div className="relative p-8 lg:p-10 h-full">
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700" style={{ background: "radial-gradient(circle, #3dc2c4, transparent 70%)" }} />

                <div className="relative z-10 space-y-5">
                  <div className="flex items-center justify-between">
                    <motion.div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center border"
                      style={{ backgroundColor: "#3dc2c412", borderColor: "#3dc2c425" }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <ServerStackIcon className="w-7 h-7" style={{ color: "#3dc2c4" }} />
                    </motion.div>
                    <span className="text-6xl font-black tracking-tighter" style={{ color: "#3dc2c40f" }}>04</span>
                  </div>

                  <h3 className="text-xl lg:text-2xl font-semibold text-white leading-tight">
                    {dict.benefits.items["04"].title}
                  </h3>
                  <p className="text-white/45 leading-relaxed text-sm font-light">
                    {dict.benefits.items["04"].description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {dict.benefits.items["04"].keywords.map((kw: string) => (
                      <span key={kw} className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide border" style={{ color: "#3dc2c4", backgroundColor: "#3dc2c40d", borderColor: "#3dc2c420" }}>
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 5 — Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 100 }}
            className="lg:col-span-2"
          >
            <div className="group relative rounded-3xl border border-white/[0.06] overflow-hidden" style={{ backgroundColor: "rgba(10,22,40,0.5)" }}>
              <motion.div className="absolute -inset-[1px] rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  style={{ background: "conic-gradient(from 45deg, transparent 0%, #10b98140 20%, transparent 40%, #4d7cff40 60%, transparent 80%, #10b98140 100%)", mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude", WebkitMaskComposite: "xor", padding: "1.5px", borderRadius: "1.5rem" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>

              <div className="relative p-8 lg:p-12">
                {/* Multiple glow points */}
                <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full pointer-events-none opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700" style={{ background: "radial-gradient(circle, #10b981, transparent 70%)" }} />
                <div className="absolute bottom-0 right-1/4 w-60 h-60 rounded-full pointer-events-none opacity-0 group-hover:opacity-[0.04] transition-opacity duration-700" style={{ background: "radial-gradient(circle, #4d7cff, transparent 70%)" }} />

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">
                  {/* Left */}
                  <div className="flex items-center gap-6 lg:min-w-[200px]">
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center border shrink-0"
                      style={{ backgroundColor: "#10b98112", borderColor: "#10b98125" }}
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <BeakerIcon className="w-8 h-8" style={{ color: "#10b981" }} />
                    </motion.div>
                    <span className="text-8xl font-black tracking-tighter hidden lg:block" style={{ color: "#10b9810c" }}>05</span>
                  </div>

                  {/* Right */}
                  <div className="flex-1 space-y-4">
                    <h3 className="text-2xl lg:text-3xl font-semibold text-white leading-tight">
                      {dict.benefits.items["05"].title}
                    </h3>
                    <p className="text-white/45 leading-relaxed text-sm lg:text-base font-light max-w-3xl">
                      {dict.benefits.items["05"].description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {dict.benefits.items["05"].keywords.map((kw: string) => (
                        <span key={kw} className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide border" style={{ color: "#10b981", backgroundColor: "#10b9810d", borderColor: "#10b98120" }}>
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom floating stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-20"
        >
          <div className="rounded-2xl border border-white/[0.06] p-8 lg:p-10 backdrop-blur-xl" style={{ backgroundColor: "rgba(10,22,40,0.4)" }}>
            <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-0 lg:divide-x lg:divide-white/[0.06]">
              {[
                { value: "11+", label: "AI Modules", color: "#4d7cff" },
                { value: "End-to-End", label: "Encryption", color: "#15acd6" },
                { value: "API-first", label: "Architecture", color: "#8b5cf6" },
                { value: "On-Prem / Hybrid", label: "Deployment", color: "#3dc2c4" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="text-center flex-1 min-w-[140px] lg:px-8"
                >
                  <p className="text-2xl lg:text-3xl font-bold tracking-tight" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-white/35 mt-1.5 font-light tracking-wider uppercase">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
