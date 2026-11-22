'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const cleanWaNumber = (INITIAL_SETTINGS.whatsappNumber || '919032372782').replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
    "Hello Abhi's Gifts, I have an inquiry regarding custom photo frames and orders."
  )}`;

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

  // Hide on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <aside
      aria-label="Quick Actions"
      className="fixed bottom-5 sm:bottom-6 right-5 sm:right-6 z-40 flex flex-col items-center gap-2.5 pointer-events-none"
      style={{
        right: 'max(1.25rem, calc(env(safe-area-inset-right, 0px) + 1.25rem))',
        bottom: 'max(1.25rem, calc(env(safe-area-inset-bottom, 0px) + 1.25rem))',
      }}
    >
      {/* Back to Top Button (shows when scrolled down) */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="pointer-events-auto w-10 h-10 rounded-full bg-stone-900/90 hover:bg-stone-900 text-amber-400 shadow-md border border-stone-700 transition-all duration-200 hover:scale-105 flex items-center justify-center cursor-pointer backdrop-blur-sm"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Floating WhatsApp Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto group relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Chat with Abhi's Gifts Artisan on WhatsApp"
        title="Chat on WhatsApp"
      >
        {/* Pulsing Ambient Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none opacity-75" />

        <MessageCircle className="w-6 h-6 fill-white text-white relative z-10" />

        {/* Hover Tooltip on Desktop */}
        <span className="hidden md:group-hover:block absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-stone-900/95 text-white text-xs font-semibold whitespace-nowrap shadow-lg border border-stone-700 pointer-events-none">
          Artisan WhatsApp Support
        </span>
      </a>
    </aside>
  );
}
