"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const statsKeys = ["real_time", "multi_model", "multi_unit", "full_audit"];

export default function Hero({ dict }: { dict: any }) {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  const stats = statsKeys.map(key => dict.stats[key]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (cardContainerRef.current && !cardContainerRef.current.contains(e.target as Node)) {
        setActiveCard(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section id="home" className="relative pt-24 pb-32 lg:pt-36 lg:pb-48 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          background: "radial-gradient(ellipse at bottom, #0052ff 0%, transparent 80%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left text section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl lg:text-7xl xl:text-8xl font-medium tracking-tight text-white mb-8 leading-[1.1]">
              Precision &amp; <span className="text-[#4d7cff] italic font-serif">intelligent</span>
              <br />
              analytics for medicine
            </h1>

            <p className="text-lg md:text-xl text-white/60 mb-12 leading-relaxed max-w-2xl font-light">
              {dict.hero.subtitle.split('PRECIA')[0]}<span className="font-semibold text-transparent bg-clip-text tracking-wide" style={{ backgroundImage: "linear-gradient(135deg, #4d7cff, #a5bfff)" }}>PRECIA</span>{dict.hero.subtitle.split('PRECIA')[1]}
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm font-medium mt-16">
              <Link
                href="/login"
                className="px-8 py-3.5 rounded-full bg-[#0052ff] text-white hover:bg-[#4d7cff] transition-all text-center w-full sm:w-auto font-semibold shadow-[0_0_20px_rgba(0,82,255,0.4)]"
              >
                {dict.nav.login}
              </Link>

              <Link
                href="#contact"
                className="px-8 py-3.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all text-center w-full sm:w-auto font-semibold border border-white/5 backdrop-blur-sm"
              >
                {dict.nav.contact}
              </Link>
            </div>
          </motion.div>

          {/* Right image and stats section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center w-full mt-12 lg:mt-0"
          >
            <div ref={cardContainerRef} className="relative w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[280px] xl:max-w-[320px]">
              {/* Subtle glow behind the image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#0052ff]/20 blur-[100px] rounded-full pointer-events-none" />

              <Image
                src="/landingpage/ui-ai-list.png"
                alt="PRECIA AI Features"
                width={720}
                height={1280}
                className="w-full h-auto object-contain rounded-[2rem] shadow-2xl border border-white/10 relative z-10"
                priority
              />

              {/* Floating Glassmorphism Cards */}
              {stats.map(({ value, label, description }, i) => {
                const positionClasses = [
                  "-left-8 sm:-left-20 lg:-left-24 top-[10%]",
                  "-right-8 sm:-right-20 lg:-right-24 top-[35%]",
                  "-left-6 sm:-left-16 lg:-left-20 bottom-[25%]",
                  "-right-6 sm:-right-16 lg:-right-20 bottom-[5%]",
                ];
                const tooltipOrigin = [
                  "origin-bottom-right",
                  "origin-bottom-left",
                  "origin-top-right",
                  "origin-top-left",
                ];
                const delays = [0, 1.5, 3, 2];
                const isActive = activeCard === i;

                return (
                  <motion.div
                    key={value}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: isActive ? 1.05 : 1,
                      y: isActive ? 0 : [0, -15, 0]
                    }}
                    transition={{
                      opacity: { duration: 0.5, delay: 0.5 + i * 0.1 },
                      scale: { type: "spring", stiffness: 400, damping: 25 },
                      y: isActive
                        ? { type: "spring", stiffness: 300, damping: 20 }
                        : { duration: 4 + (i % 2), repeat: Infinity, ease: "easeInOut", delay: delays[i] }
                    }}
                    onClick={() => setActiveCard(isActive ? null : i)}
                    className={`absolute z-20 cursor-pointer select-none ${positionClasses[i]}`}
                  >
                    {/* Card */}
                    <motion.div
                      className={`relative backdrop-blur-xl rounded-2xl p-3 sm:p-4 transition-colors duration-300 ${isActive
                        ? "bg-[#0a1628]/95 border-[#4d7cff]/40 border shadow-[0_0_30px_rgba(0,82,255,0.25)]"
                        : "bg-[#030917]/80 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] hover:border-[#4d7cff]/30 hover:shadow-[0_0_20px_rgba(0,82,255,0.15)]"
                        }`}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      {/* Animated gradient border shimmer on active */}
                      {isActive && (
                        <motion.div
                          className="absolute -inset-[1px] rounded-2xl pointer-events-none overflow-hidden"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <motion.div
                            className="absolute inset-0"
                            style={{
                              background: "conic-gradient(from 0deg, transparent, #4d7cff, #a5bfff, #4d7cff, transparent)",
                              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                              maskComposite: "exclude",
                              WebkitMaskComposite: "xor",
                              padding: "1.5px",
                              borderRadius: "1rem",
                            }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          />
                        </motion.div>
                      )}

                      <div className="whitespace-nowrap relative z-10">
                        <p
                          className="text-lg sm:text-xl font-semibold tracking-tight"
                          style={{ color: "#a5bfff" }}
                        >
                          {value}
                        </p>
                        <p className="text-[10px] sm:text-xs text-white/80 mt-0.5 sm:mt-1 font-light">
                          {label}
                        </p>
                      </div>

                      {/* Pulse ring on active */}
                      {isActive && (
                        <motion.div
                          className="absolute -inset-2 rounded-3xl border border-[#4d7cff]/20 pointer-events-none"
                          initial={{ opacity: 1, scale: 1 }}
                          animate={{ opacity: 0, scale: 1.3 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                        />
                      )}
                    </motion.div>

                    {/* Expanding Tooltip */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.6, y: -5 }}
                          animate={{ opacity: 1, scale: 1, y: 8 }}
                          exit={{ opacity: 0, scale: 0.6, y: -5 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[260px] sm:w-[300px] z-30 ${tooltipOrigin[i]}`}
                        >
                          <div className="relative backdrop-blur-2xl bg-[#0a1628]/95 border border-white/10 rounded-2xl p-5 shadow-[0_16px_64px_rgba(0,82,255,0.2)]">
                            {/* Decorative top accent */}
                            <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#4d7cff]/60 to-transparent" />

                            {/* Header */}
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1, duration: 0.3 }}
                              className="flex items-center gap-2 mb-3"
                            >
                              <div className="w-2 h-2 rounded-full bg-[#4d7cff] shadow-[0_0_8px_rgba(77,124,255,0.6)]" />
                              <p className="text-sm font-semibold text-white">
                                {value} <span className="text-white/50 font-normal">· {label}</span>
                              </p>
                            </motion.div>

                            {/* Divider */}
                            <motion.div
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}
                              className="h-[1px] bg-gradient-to-r from-[#4d7cff]/30 via-white/10 to-transparent mb-3 origin-left"
                            />

                            {/* Description with typing reveal */}
                            <motion.p
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.25, duration: 0.4 }}
                              className="text-xs leading-relaxed text-white/70 font-light"
                            >
                              {description}
                            </motion.p>

                            {/* Bottom subtle indicator */}
                            <motion.div
                              className="flex items-center gap-1.5 mt-3 pt-2 border-t border-white/5"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.4, duration: 0.3 }}
                            >
                              <div className="flex gap-1">
                                {[0, 1, 2].map((dot) => (
                                  <motion.div
                                    key={dot}
                                    className="w-1 h-1 rounded-full bg-[#4d7cff]/60"
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: dot * 0.2 }}
                                  />
                                ))}
                              </div>
                              <span className="text-[10px] text-white/30">Click to dismiss</span>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
