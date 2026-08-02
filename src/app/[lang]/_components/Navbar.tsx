"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Navbar({ dict, currentLang }: { dict: any; currentLang: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
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
  );
}
