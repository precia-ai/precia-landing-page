"use client";

import type { Dictionary } from "@/lib/dictionary";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { appUrl } from "@/lib/site";

const navLinks: { href: string; key: keyof Dictionary["nav"] }[] = [
  { href: "#platform", key: "platform" },
  { href: "#modul", key: "modules" },
  { href: "#cara-kerja", key: "how_it_works" },
  { href: "#kepatuhan", key: "security" },
  { href: "#kontak", key: "contact" },
];

export default function Navbar({ dict, currentLang }: { dict: Dictionary; currentLang: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-4 sm:top-6 left-0 right-0 z-50 w-full px-4">
      <div className="max-w-4xl mx-auto rounded-full border border-white/60 bg-white/70 backdrop-blur-xl shadow-lg">
        <div className="flex justify-between items-center h-16 px-3 sm:px-4">
          <Link href="#" className="flex-shrink-0 flex items-center pl-2">
            <Image
              src="/brand/precia-logo.png"
              alt="PRECIA"
              width={140}
              height={42}
              className="h-auto w-auto max-h-6 object-contain"
              priority
            />
          </Link>

          <div className="hidden lg:flex flex-1 justify-center items-center space-x-7">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                {dict.nav[link.key]}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-5">
            <LanguageSwitcher currentLang={currentLang} />
            <a
              href={appUrl}
              className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
            >
              {dict.nav.login}
            </a>
            <Link
              href="#kontak"
              className="text-sm font-semibold px-5 py-2.5 rounded-full bg-primary text-primary-foreground hover:bg-accent-secondary active:scale-[0.97] transition-all duration-200"
            >
              {dict.nav.cta}
            </Link>
          </div>

          <div className="lg:hidden flex items-center pr-1">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative w-9 h-9 flex items-center justify-center text-foreground focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <span
                className={`absolute block h-0.5 w-5 bg-current transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  isMobileMenuOpen ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute block h-0.5 w-5 bg-current transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  isMobileMenuOpen ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="lg:hidden mt-3 mx-auto max-w-4xl rounded-3xl border border-white/60 bg-white/85 backdrop-blur-2xl shadow-lg px-6 pt-5 pb-7 space-y-1"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.3 }}
              >
                <Link
                  href={link.href}
                  className="block py-2.5 text-base font-medium text-foreground/80 hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {dict.nav[link.key]}
                </Link>
              </motion.div>
            ))}
            <div className="pt-3 pb-1 border-t border-border/70 mt-3">
              <LanguageSwitcher currentLang={currentLang} />
            </div>
            <a
              href={appUrl}
              className="block py-2 text-base font-medium text-foreground/80 hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {dict.nav.login}
            </a>
            <Link
              href="#kontak"
              className="block text-center mt-3 text-base font-semibold px-5 py-3 rounded-full bg-primary text-primary-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {dict.nav.cta}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
