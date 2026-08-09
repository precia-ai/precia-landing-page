"use client";

import Navbar from "./_components/Navbar";
import Hero from "./_components/1Hero";
import AIModules from "./_components/2AIModules";
import Benefits from "./_components/3Benefits";
import ContactUs from "./_components/4ContactUs";
import Footer from "./_components/5Footer";

export default function ClientPage({ dict, currentLang }: { dict: any, currentLang: string }) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <Navbar dict={dict} currentLang={currentLang} />
      <Hero dict={dict} />

      <AIModules dict={dict} />
      <Benefits dict={dict} />
      <ContactUs dict={dict} />
      <Footer dict={dict} />
    </div>
  );
}
