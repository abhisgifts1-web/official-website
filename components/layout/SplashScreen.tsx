'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Sparkles, ShieldCheck, Zap, X } from 'lucide-react';

const LOADING_STEPS = [
  'Initializing atelier...',
  'Polishing museum-grade acrylic...',
  'Illuminating LED brilliance...',
  'Welcome to Abhi\'s Gifts',
];

export default function SplashScreen() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  const dismissSplash = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = '';
    }, 600); // 600ms exit fade & scale
  }, []);

  useEffect(() => {
    // Skip on admin routes
    if (pathname?.startsWith('/admin')) {
      return;
    }

    // Check if user requested force splash or already seen in this session
    const searchParams = new URLSearchParams(window.location.search);
    const forceShow = searchParams.get('splash') === 'true' || searchParams.get('splash') === 'force';
    const hasSeen = sessionStorage.getItem('abhi_gifts_splash_seen');

    if (hasSeen && !forceShow) {
      return;
    }

    // Mark as seen for session
    sessionStorage.setItem('abhi_gifts_splash_seen', 'true');
    setIsVisible(true);
    document.body.style.overflow = 'hidden';

    // Loading progress simulation
    const startTime = Date.now();
    const duration = 2100; // 2.1 seconds total display time

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(currentProgress);

      const step = Math.min(
        Math.floor((currentProgress / 100) * LOADING_STEPS.length),
        LOADING_STEPS.length - 1
      );
      setStepIndex(step);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(dismissSplash, 250);
      }
    }, 35);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, [pathname, dismissSplash]);

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      aria-label="Loading Abhi's Gifts"
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0c] text-white select-none transition-all duration-700 ease-out ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient Luxury Lighting Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] md:w-[700px] md:h-[700px] bg-gradient-to-tr from-[#FEE815]/15 via-[#FFF04B]/5 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#FEE815]/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FFF04B]/5 rounded-full blur-[90px] pointer-events-none" />

      {/* Subtle Geometric Framing Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Top Bar with Skip Action */}
      <div className="absolute top-6 right-6 md:top-8 md:right-10 z-20">
        <button
          type="button"
          onClick={dismissSplash}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium tracking-wider text-stone-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors cursor-pointer backdrop-blur-md focus:outline-none focus:ring-1 focus:ring-[#FEE815]/50"
          aria-label="Skip splash screen"
        >
          <span>Skip</span>
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Central Brand Showcase Card */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center">
        {/* Animated Badge Icon with Glowing Rings */}
        <div className="relative mb-6">
          {/* Pulsing Aura Rings */}
          <div className="absolute inset-0 rounded-2xl bg-[#FEE815]/20 blur-xl animate-pulse" />
          <div className="absolute -inset-2 rounded-3xl border border-[#FEE815]/30 animate-spin" style={{ animationDuration: '12s' }} />

          {/* Icon Acrylic Container */}
          <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-b from-[#1C1C20] to-[#111114] border border-[#FEE815]/40 shadow-2xl shadow-[#FEE815]/10 flex items-center justify-center p-3.5 backdrop-blur-md">
            <Image
              src="/images/brand/logo-badge-icon.png"
              alt="Abhi's Gifts Seal"
              width={100}
              height={100}
              priority
              className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(254,232,21,0.3)] transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* Brand Name Logo */}
        <div className="relative mb-3 flex items-center justify-center">
          <Image
            src="/images/brand/logo-brand.png"
            alt="Abhi's Gifts - Frame Your Memories"
            width={260}
            height={56}
            priority
            className="h-10 md:h-12 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          />
        </div>

        {/* Tagline */}
        <div className="flex items-center gap-2 mb-8">
          <span className="h-[1px] w-6 bg-gradient-to-r from-transparent to-[#FEE815]/60" />
          <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase font-medium text-stone-300">
            Acrylic Photo Frames & Custom Gifts
          </p>
          <span className="h-[1px] w-6 bg-gradient-to-l from-transparent to-[#FEE815]/60" />
        </div>

        {/* High-Precision Loading Bar */}
        <div className="w-full max-w-[280px] space-y-2 mb-6">
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden p-[1px] backdrop-blur-xs">
            <div
              className="h-full bg-gradient-to-r from-[#FEE815]/80 via-[#FEE815] to-[#FFF04B] rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_rgba(254,232,21,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step status and percentage */}
          <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
            <span className="text-stone-300 flex items-center gap-1.5 truncate">
              <Sparkles className="w-3 h-3 text-[#FEE815] shrink-0 animate-spin" style={{ animationDuration: '4s' }} />
              {LOADING_STEPS[stepIndex]}
            </span>
            <span className="text-[#FEE815] font-semibold tabular-nums ml-2">
              {progress}%
            </span>
          </div>
        </div>

        {/* Hyderabad Atelier Trust Highlights */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-stone-400">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FEE815]" />
            <span>Cast Acrylic</span>
          </div>
          <span className="text-white/20">•</span>
          <div className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-[#FEE815]" />
            <span>Express Dispatch</span>
          </div>
          <span className="text-white/20">•</span>
          <span className="text-stone-400">Hyderabad, TG</span>
        </div>
      </div>
    </aside>
  );
}
