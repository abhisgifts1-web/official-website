'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!showScrollTop) return null;

  return (
    <div
      className="fixed bottom-5 sm:bottom-6 md:bottom-8 right-5 sm:right-6 md:right-8 z-50 flex flex-col items-end gap-3 pointer-events-none max-w-[calc(100vw-2.5rem)]"
      style={{
        right: 'max(1.25rem, calc(env(safe-area-inset-right, 0px) + 1.25rem))',
        bottom: 'max(1.25rem, calc(env(safe-area-inset-bottom, 0px) + 1.25rem))',
      }}
    >
      {/* Scroll to Top */}
      <button
        type="button"
        onClick={scrollToTop}
        className="pointer-events-auto p-2.5 sm:p-3 rounded-full bg-[#1F0B13]/90 hover:bg-[#35101C] text-[#F0D79B] shadow-xl border border-[#C99B45]/40 transition-all duration-300 hover:scale-110 cursor-pointer backdrop-blur-md"
        aria-label="Back to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </div>
  );
}

