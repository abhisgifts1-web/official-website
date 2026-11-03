'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Phone,
  ShieldCheck,
  Truck,
  Flame,
  ArrowRight,
} from 'lucide-react';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

export default function AnnouncementBar() {
    const tickerItems = (
    <div className="flex items-center gap-6 sm:gap-10 shrink-0 px-3">
      {/* 1. Craftsmanship */}
      <span className="flex items-center gap-1.5 shrink-0 text-[#E5E7EB]">
        <Sparkles className="w-3.5 h-3.5 text-[#FACC15] shrink-0" />
        <span className="font-medium">Handcrafted Acrylic Photo Frames</span>
      </span>

      <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15]/50 shrink-0" />

      {/* 2. Studio Location */}
      <span className="flex items-center gap-1.5 shrink-0 text-[#E5E7EB]">
        <ShieldCheck className="w-3.5 h-3.5 text-[#FACC15] shrink-0" />
        <span className="font-medium">Dilsukhnagar, Hyderabad Studio</span>
      </span>

      <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15]/50 shrink-0" />

      {/* 3. Products & CTA */}
      <span className="flex items-center gap-1.5 shrink-0 text-[#FFFFFF]">
        <Flame className="w-3.5 h-3.5 text-[#FACC15] animate-pulse shrink-0" />
        <span className="font-medium">
          Custom Photo Frames • Warm LED Light Frames
        </span>
        <Link
          href="/shop"
          className="inline-flex items-center gap-1 underline decoration-[#EAB308] hover:text-[#FACC15] text-[#FFFFFF] font-bold ml-1.5 transition-colors cursor-pointer"
        >
          <span>Explore Frames</span>
          <ArrowRight className="w-3 h-3 text-[#FACC15]" />
        </Link>
      </span>

      <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15]/50 shrink-0" />

      {/* 4. Delivery */}
      <span className="flex items-center gap-1.5 shrink-0 text-[#E5E7EB]">
        <Truck className="w-3.5 h-3.5 text-[#FACC15] shrink-0" />
        <span className="font-medium">Express Courier Delivery</span>
      </span>

      <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15]/50 shrink-0" />

      {/* 5. Phone Support */}
      <a
        href={`tel:${INITIAL_SETTINGS.supportPhone}`}
        className="flex items-center gap-1.5 shrink-0 text-[#E5E7EB] hover:text-[#FACC15] transition-colors cursor-pointer"
      >
        <Phone className="w-3 h-3 text-[#FACC15] shrink-0" />
        <span>{INITIAL_SETTINGS.supportPhone}</span>
      </a>

      <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15]/50 shrink-0" />
    </div>
  );

  return (
    <div
      className="relative w-full max-w-full overflow-hidden bg-gradient-to-r from-[#0A0A0A] via-[#181818] to-[#0A0A0A] text-[#FFFFFF] text-[10.5px] sm:text-[11.5px] font-medium py-1 sm:py-1.5 border-b border-[#2D2D2D]/35 select-none z-30"
      style={{ overflow: 'clip', contain: 'paint', maxWidth: '100vw' }}
    >
      {/* Left Subtle Gradient Edge Shadow */}
      <div className="absolute left-0 top-0 w-8 sm:w-16 h-full bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

      {/* Right Subtle Gradient Edge Shadow */}
      <div className="absolute right-0 top-0 w-8 sm:w-16 h-full bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

      {/* Infinite Seamless Scrolling Marquee Ticker */}
      <div className="animate-announcement-ticker flex items-center">
        {/* Track 1 */}
        {tickerItems}
        {/* Track 2 (Clone for infinite seamless loop) */}
        {tickerItems}
      </div>
    </div>
  );
}
