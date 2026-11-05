'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

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

  // Hide on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const cleanNumber = (INITIAL_SETTINGS.whatsappNumber || '919032372782').replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    "Hello Abhi's Gifts, I want to inquire about custom acrylic photo frames and orders."
  )}`;

  return (
    <div
      className="fixed bottom-5 sm:bottom-6 right-5 sm:right-6 z-50 flex flex-col items-end gap-2.5 pointer-events-none"
      style={{
        right: 'max(1.25rem, calc(env(safe-area-inset-right, 0px) + 1.25rem))',
        bottom: 'max(1.25rem, calc(env(safe-area-inset-bottom, 0px) + 1.25rem))',
      }}
    >
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="pointer-events-auto w-10 h-10 rounded-full bg-stone-900/90 hover:bg-stone-900 text-amber-400 shadow-lg border border-stone-700 transition-all duration-200 hover:scale-105 flex items-center justify-center cursor-pointer backdrop-blur-sm"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Direct WhatsApp Action Button (No AI Chatbot) */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer group"
        aria-label="Chat directly on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white text-[#25D366] group-hover:rotate-6 transition-transform" />
        <span className="text-xs font-bold font-sans tracking-wide pr-1 hidden sm:inline">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
