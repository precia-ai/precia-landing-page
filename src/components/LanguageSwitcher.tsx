'use client';

import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    // If the path doesn't have a locale yet, we might be at root but middleware caught it.
    // However, in client side, pathname already includes the locale if middleware redirected.
    if (!pathname) return;
    
    // Replace the current locale in the path with the new one
    // We assume the first segment is the locale (e.g., /id/something)
    const segments = pathname.split('/');
    if (segments.length > 1 && (segments[1] === 'en' || segments[1] === 'id')) {
      segments[1] = newLocale;
    } else {
      // Fallback
      segments.splice(1, 0, newLocale);
    }
    
    // Use replace to avoid adding to history unnecessarily, or push if we want history
    router.replace(segments.join('/') || '/');
  };

  return (
    <div className="flex items-center gap-1 bg-muted rounded-full p-1 border border-border">
      <button
        onClick={() => switchLanguage('id')}
        className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-colors z-10 ${
          currentLang === 'id' ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        {currentLang === 'id' && (
          <motion.div
            layoutId="lang-bg"
            className="absolute inset-0 bg-primary rounded-full -z-10"
            initial={false}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
        ID
      </button>
      <button
        onClick={() => switchLanguage('en')}
        className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-colors z-10 ${
          currentLang === 'en' ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        {currentLang === 'en' && (
          <motion.div
            layoutId="lang-bg"
            className="absolute inset-0 bg-primary rounded-full -z-10"
            initial={false}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
        EN
      </button>
    </div>
  );
}
