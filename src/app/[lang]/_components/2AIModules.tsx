"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const aiModulesConfig = [
  { code: "CARD", image: "/modules/cardiology.png", color: "#ef4444", gradient: "from-red-500/20 to-rose-500/20" },
  { code: "DENT", image: "/modules/dentistry.png", color: "#06b6d4", gradient: "from-cyan-500/20 to-teal-500/20" },
  { code: "EMER", image: "/modules/emergency.png", color: "#f97316", gradient: "from-orange-500/20 to-amber-500/20" },
  { code: "SURG", image: "/modules/surgery.png", color: "#8b5cf6", gradient: "from-violet-500/20 to-purple-500/20" },
  { code: "ICU", image: "/modules/icu.png", color: "#ec4899", gradient: "from-pink-500/20 to-rose-500/20" },
  { code: "NEUR", image: "/modules/neurology.png", color: "#4d7cff", gradient: "from-blue-500/20 to-indigo-500/20" },
  { code: "ONCO", image: "/modules/oncology.png", color: "#10b981", gradient: "from-emerald-500/20 to-green-500/20" },
  { code: "ORTH", image: "/modules/orthopedics.png", color: "#f59e0b", gradient: "from-amber-500/20 to-yellow-500/20" },
  { code: "PEDI", image: "/modules/pediatrics.png", color: "#14b8a6", gradient: "from-teal-500/20 to-cyan-500/20" },
  { code: "RADI", image: "/modules/radiology.png", color: "#6366f1", gradient: "from-indigo-500/20 to-violet-500/20" },
  { code: "URO", image: "/modules/urology.png", color: "#0ea5e9", gradient: "from-sky-500/20 to-blue-500/20" },
];

function AIModulesShowcase({ dict }: { dict: any }) {
  const [activeModule, setActiveModule] = useState<number | null>(0);

  const aiModules = aiModulesConfig.map(config => ({
    ...config,
    ...dict.modules.items[config.code]
  }));

  return (
    <div className="space-y-8">
      {/* Module Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
        {aiModules.map((module, index) => {
          const isActive = activeModule === index;
          return (
            <motion.button
              key={module.code}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05, type: "spring", stiffness: 200, damping: 20 }}
              onClick={() => setActiveModule(isActive ? null : index)}
              className="relative group text-left cursor-pointer focus:outline-none"
            >
              {/* Card */}
              <motion.div
                animate={{
                  borderColor: isActive ? module.color + "50" : "rgba(0,0,0,0.08)",
                  backgroundColor: isActive ? module.color + "0c" : "rgba(255,255,255,0.9)",
                }}
                whileHover={{
                  scale: 1.05,
                  borderColor: module.color + "40",
                  backgroundColor: module.color + "08",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative overflow-hidden rounded-2xl border p-4 sm:p-5 backdrop-blur-xl"
                style={{ boxShadow: isActive ? `0 0 24px ${module.color}18, 0 4px 20px rgba(0,0,0,0.08)` : "0 4px 16px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)" }}
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute -top-8 -right-8 w-24 h-24 rounded-full pointer-events-none"
                  animate={{ opacity: isActive ? 0.15 : 0, scale: isActive ? 1 : 0.5 }}
                  transition={{ duration: 0.4 }}
                  style={{ background: `radial-gradient(circle, ${module.color}, transparent)` }}
                />

                {/* Module Code Badge */}
                <motion.div
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest mb-3"
                  style={{
                    backgroundColor: module.color + "18",
                    color: module.color,
                    border: `1px solid ${module.color}25`,
                  }}
                >
                  {module.code}
                </motion.div>

                {/* Module Name */}
                <h3 className="text-sm sm:text-base font-semibold text-[#0a1b4e] leading-tight relative z-10">
                  {module.name}
                </h3>

                {/* Active indicator line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, transparent, ${module.color}, transparent)` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      {/* Expanded Detail Panel */}
      <AnimatePresence mode="wait">
        {activeModule !== null && (
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 25 }}
            className="overflow-hidden"
          >
            <div
              className="relative rounded-3xl border backdrop-blur-2xl overflow-hidden"
              style={{
                borderColor: aiModules[activeModule].color + "25",
                backgroundColor: "rgba(255,255,255,0.95)",
                boxShadow: `0 0 40px ${aiModules[activeModule].color}10, 0 20px 50px rgba(0,0,0,0.08)`,
              }}
            >
              {/* Top decorative bar */}
              <motion.div
                className="h-[2px] w-full"
                style={{ background: `linear-gradient(90deg, transparent, ${aiModules[activeModule].color}, transparent)` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />

              {/* Background glow */}
              <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none opacity-[0.07]" style={{ background: `radial-gradient(circle, ${aiModules[activeModule].color}, transparent 70%)` }} />
              <div className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none opacity-[0.05]" style={{ background: `radial-gradient(circle, ${aiModules[activeModule].color}, transparent 70%)` }} />

              <div className="relative z-10 grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                {/* Left: Info */}
                <div className="flex flex-col justify-center space-y-6">
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  >
                    <div className="flex items-center gap-3 mb-4">

                      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${aiModules[activeModule].color}30, transparent)` }} />
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-semibold text-[#0a1b4e] mb-4">
                      {aiModules[activeModule].name}
                    </h3>
                  </motion.div>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="text-[#5f6e8c] leading-relaxed text-base"
                  >
                    {aiModules[activeModule].description}
                  </motion.p>

                  {/* Feature pills */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="flex flex-wrap gap-2"
                  >
                    {aiModules[activeModule].features.map((feature: string, i: number) => (
                      <motion.span
                        key={feature}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.35 + i * 0.08, type: "spring", stiffness: 300 }}
                        className="px-3 py-1.5 rounded-full text-[9px] md:text-xs font-semibold border"
                        style={{
                          backgroundColor: aiModules[activeModule].color + "10",
                          borderColor: aiModules[activeModule].color + "20",
                          color: aiModules[activeModule].color,
                        }}
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                  >
                    <button
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95"
                      style={{
                        background: `linear-gradient(135deg, ${aiModules[activeModule].color}, ${aiModules[activeModule].color}99)`,
                        boxShadow: `0 4px 20px ${aiModules[activeModule].color}40`,
                      }}
                    >
                      {dict.modules.explore_features} {aiModules[activeModule].name}
                      <ArrowRightIcon className="w-4 h-4" />
                    </button>
                  </motion.div>
                </div>

                {/* Right: Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                  className="flex items-center justify-center"
                >
                  <div className="relative w-full max-w-sm mx-auto">
                    {/* Image glow ring */}
                    <motion.div
                      className="absolute -inset-4 rounded-3xl opacity-20 pointer-events-none"
                      style={{ background: `conic-gradient(from 0deg, ${aiModules[activeModule].color}00, ${aiModules[activeModule].color}40, ${aiModules[activeModule].color}00)` }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Image container */}
                    <div
                      className="relative rounded-2xl overflow-hidden border aspect-square"
                      style={{ borderColor: aiModules[activeModule].color + "30" }}
                    >
                      <Image
                        src={aiModules[activeModule].image}
                        alt={`${aiModules[activeModule].name} AI Module`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />

                      {/* Overlay gradient */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(180deg, transparent 50%, ${aiModules[activeModule].color}20 100%)`,
                        }}
                      />


                    </div>

                    {/* Floating stats particles */}
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full pointer-events-none"
                        style={{ backgroundColor: aiModules[activeModule].color }}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: [0, 0.6, 0],
                          y: [-20 - i * 30, -60 - i * 30],
                          x: [10 + i * 20, -10 + i * 15],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: i * 0.8,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom prompt text */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-center text-[#5f6e8c]/60 text-sm font-light"
      >
        {activeModule === null ? "Select a module" : dict.modules.close}
      </motion.p>
    </div>
  );
}

export default function AIModules({ dict }: { dict: any }) {
  return (
    <section id="features" className="relative py-32 overflow-hidden" style={{ background: "linear-gradient(180deg, #f5f8fc 0%, #eef3f9 50%, #f5f8fc 100%)" }}>
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(ellipse, #0052ff 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, #4d7cff 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, #15acd6 0%, transparent 70%)" }} />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.06) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#0a1b4e] mb-6 leading-[1.1]">
            {dict.modules.title}{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #0052ff, #15acd6, #3dc2c4)" }}>
              {dict.modules.title_highlight}
            </span>
          </h2>
          <p className="text-lg text-[#5f6e8c] font-light leading-relaxed">
            {dict.modules.subtitle}
          </p>
        </motion.div>

        {/* Modules Interactive Grid */}
        <AIModulesShowcase dict={dict} />
      </div>
    </section>
  );
}
