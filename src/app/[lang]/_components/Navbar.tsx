"use client";

import type { Dictionary } from "@/lib/dictionary";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import LanguageSwitcher from "@/components/LanguageSwitcher";

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
    <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Image
              src="/brand/precia-logo.png"
              alt="PRECIA"
              width={140}
              height={42}
              className="h-auto w-auto max-h-7 object-contain"
              priority
            />
          </div>

          <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
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

          <div className="hidden md:flex items-center space-x-6">
            <LanguageSwitcher currentLang={currentLang} />
            <a
              href="https://app-dev.precia.site"
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

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground/70 hover:text-foreground focus:outline-none p-2"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-background border-b border-border px-4 pt-2 pb-6 space-y-4 absolute w-full left-0 right-0 z-50 shadow-lg"
          >
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="block text-base font-medium text-foreground/70 hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {dict.nav[link.key]}
              </Link>
            ))}
            <div className="pt-4 border-t border-border">
              <LanguageSwitcher currentLang={currentLang} />
            </div>
            <a
              href="https://app-dev.precia.site"
              className="block text-base font-medium text-foreground/70 hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {dict.nav.login}
            </a>
            <Link
              href="#kontak"
              className="block text-center text-base font-semibold px-5 py-3 rounded-full bg-primary text-primary-foreground"
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
