'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowUp } from 'lucide-react';

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Hide on admin routes or when not scrolled
  if (pathname?.startsWith('/admin') || !showScrollTop) {
    return null;
  }

  return (
    <div
      className="fixed bottom-5 sm:bottom-6 right-5 sm:right-6 z-50 pointer-events-none"
      style={{
        right: 'max(1.25rem, calc(env(safe-area-inset-right, 0px) + 1.25rem))',
        bottom: 'max(1.25rem, calc(env(safe-area-inset-bottom, 0px) + 1.25rem))',
      }}
    >
      <button
        type="button"
        onClick={scrollToTop}
        className="pointer-events-auto w-10 h-10 rounded-full bg-stone-900/90 hover:bg-stone-900 text-amber-400 shadow-lg border border-stone-700 transition-all duration-200 hover:scale-105 flex items-center justify-center cursor-pointer backdrop-blur-sm"
        aria-label="Back to top"
        title="Back to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </div>
  );
}
