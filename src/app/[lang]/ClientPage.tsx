"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheckIcon, ChartBarIcon, ArrowRightIcon, Bars3Icon, XMarkIcon, ArrowTopRightOnSquareIcon, BoltIcon, LinkIcon, LockClosedIcon, CubeTransparentIcon, ServerStackIcon, BeakerIcon, UserIcon, EnvelopeIcon, BuildingOfficeIcon, ChatBubbleBottomCenterTextIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const statsKeys = ["real_time", "multi_model", "multi_unit", "full_audit"];

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



export default function ClientPage({ dict, currentLang }: { dict: any, currentLang: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <div className="bg-[#030917] text-white selection:bg-primary/30">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/10 bg-[#030917]/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Image
                  src="/brand/precia-logo.png"
                  alt="PRECIA"
                  width={140}
                  height={42}
                  className="h-auto w-auto max-h-7 object-contain brightness-0 invert"
                  priority
                />
              </div>

              {/* Desktop Nav - Centered */}
              <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
                <Link href="#home" className="text-sm font-medium text-white/60 hover:text-white transition-colors">{dict.nav.home}</Link>
                <Link href="#features" className="text-sm font-medium text-white/60 hover:text-white transition-colors">{dict.nav.ai_modules}</Link>
                <Link href="#benefits" className="text-sm font-medium text-white/60 hover:text-white transition-colors">{dict.nav.benefits}</Link>
                <Link href="#contact" className="text-sm font-medium text-white/60 hover:text-white transition-colors">{dict.nav.contact}</Link>
              </div>

              {/* Right actions */}
              <div className="hidden md:flex items-center space-x-6">
                <LanguageSwitcher currentLang={currentLang} />
                <Link href="/login" className="text-sm font-semibold px-5 py-2.5 rounded-full bg-[#0052ff] text-white hover:bg-[#4d7cff] transition-all">
                  {dict.nav.login}
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-white/60 hover:text-white focus:outline-none p-2"
                  aria-label="Toggle mobile menu"
                >
                  {isMobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Nav */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="md:hidden bg-[#030917] border-b border-white/5 px-4 pt-2 pb-6 space-y-4 absolute w-full left-0 right-0 z-50 shadow-2xl"
              >
                <Link href="#home" className="block text-base font-medium text-white/60 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>{dict.nav.home}</Link>
                <Link href="#features" className="block text-base font-medium text-white/60 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>{dict.nav.ai_modules}</Link>
                <Link href="#benefits" className="block text-base font-medium text-white/60 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>{dict.nav.benefits}</Link>
                <Link href="#contact" className="block text-base font-medium text-white/60 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>{dict.nav.contact}</Link>
                <div className="pt-4 border-t border-white/10">
                  <LanguageSwitcher currentLang={currentLang} />
                </div>
                <Link href="/login" className="block text-base font-medium text-white/60 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>{dict.nav.login}</Link>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Hero Section */}
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
      </div>

      {/* AI Modules Section */}
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

      {/* Benefits Section */}
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

      {/* Contact Us Section */}
      <section id="contact" className="py-32 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #f5f8fc 0%, #eef3f9 100%)" }}>
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, #0052ff 0%, transparent 70%)" }} />
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, #15acd6 0%, transparent 70%)" }} />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23000000\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#0a1b4e] mb-6 leading-[1.1]">
                {dict.contact.title_part1}{" "}
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #0052ff, #15acd6)" }}>
                  {dict.contact.title_highlight}
                </span>
              </h2>

              <p className="text-lg text-[#5f6e8c] font-light leading-relaxed mb-10 max-w-xl">
                {dict.contact.subtitle}
              </p>

              <div className="space-y-6">
                {[
                  { icon: ShieldCheckIcon, text: dict.contact.features[0] },
                  { icon: BoltIcon, text: dict.contact.features[1] },
                  { icon: ChatBubbleBottomCenterTextIcon, text: dict.contact.features[2] },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-white border border-[#000000]/10 flex items-center justify-center shadow-sm">
                      <item.icon className="w-5 h-5 text-[#0052ff]" />
                    </div>
                    <span className="text-[#0a1b4e]/80 font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              {/* Form container with glassmorphism */}
              <div className="relative rounded-3xl border border-[#000000]/10 bg-white/80 backdrop-blur-2xl p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
                {/* Top gradient accent */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#0052ff]/30 to-transparent" />

                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  {/* Name & Institution Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-semibold text-[#0a1b4e]/70 pl-1">{dict.contact.form.name_label}</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <UserIcon className="h-5 w-5 text-gray-400 group-focus-within:text-[#0052ff] transition-colors" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="block w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-[#0a1b4e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0052ff]/30 focus:border-[#0052ff]/50 transition-all font-medium"
                          placeholder={dict.contact.form.name_placeholder}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="institution" className="text-xs font-semibold text-[#0a1b4e]/70 pl-1">{dict.contact.form.institution_label}</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <BuildingOfficeIcon className="h-5 w-5 text-gray-400 group-focus-within:text-[#0052ff] transition-colors" />
                        </div>
                        <input
                          type="text"
                          id="institution"
                          name="institution"
                          className="block w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-[#0a1b4e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0052ff]/30 focus:border-[#0052ff]/50 transition-all font-medium"
                          placeholder={dict.contact.form.institution_placeholder}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-[#0a1b4e]/70 pl-1">{dict.contact.form.email_label}</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <EnvelopeIcon className="h-5 w-5 text-gray-400 group-focus-within:text-[#0052ff] transition-colors" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="block w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-[#0a1b4e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0052ff]/30 focus:border-[#0052ff]/50 transition-all font-medium"
                        placeholder={dict.contact.form.email_placeholder}
                        required
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-semibold text-[#0a1b4e]/70 pl-1">{dict.contact.form.message_label}</label>
                    <div className="relative group">
                      <div className="absolute top-4 left-4 pointer-events-none">
                        <ChatBubbleBottomCenterTextIcon className="h-5 w-5 text-gray-400 group-focus-within:text-[#0052ff] transition-colors" />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="block w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-[#0a1b4e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0052ff]/30 focus:border-[#0052ff]/50 transition-all font-medium resize-none"
                        placeholder={dict.contact.form.message_placeholder}
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 82, 255, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#0052ff] to-[#15acd6] px-8 py-4 rounded-xl flex items-center justify-center gap-2 mt-4 text-white font-semibold transition-all shadow-md group"
                  >
                    <span>{dict.contact.form.submit}</span>
                    <PaperAirplaneIcon className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </motion.button>


                </form>
              </div>

              {/* Decorative floating dots around the form */}
              <motion.div
                animate={{ y: [-10, 10, -10], opacity: [0.15, 0.4, 0.15] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-gradient-to-tr from-[#0052ff] to-[#15acd6] blur-lg pointer-events-none"
              />
              <motion.div
                animate={{ y: [10, -10, 10], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -left-8 w-16 h-16 rounded-full bg-gradient-to-tr from-[#8b5cf6] to-[#0052ff] blur-xl pointer-events-none"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/brand/precia-logo.png"
              alt="PRECIA"
              width={120}
              height={36}
              className="h-auto w-auto max-h-6 object-contain grayscale opacity-60"
            />
          </div>
          <p className="text-muted-foreground text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} {dict.footer.copyright}
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{dict.footer.privacy}</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{dict.footer.terms}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
