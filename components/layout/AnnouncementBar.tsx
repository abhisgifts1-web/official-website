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
      {/* 1. Pan-India Delivery */}
      <span className="flex items-center gap-1.5 shrink-0 text-[#E5E7EB]">
        <Truck className="w-3.5 h-3.5 text-[#FACC15] shrink-0" />
        <span className="font-medium">Pan-India Express Delivery</span>
      </span>

      <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15]/50 shrink-0" />

      {/* 2. Transit Guarantee */}
      <span className="flex items-center gap-1.5 shrink-0 text-[#E5E7EB]">
        <ShieldCheck className="w-3.5 h-3.5 text-[#FACC15] shrink-0" />
        <span className="font-medium">100% Safe Transit Guarantee</span>
      </span>

      <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15]/50 shrink-0" />

      {/* 3. Festive Privilege Offer & CTA */}
      <span className="flex items-center gap-1.5 shrink-0 text-[#FFFFFF]">
        <Sparkles className="w-3.5 h-3.5 text-[#FACC15] animate-pulse shrink-0" />
        <span className="font-medium">
          Festive Privilege: Free Pan-India Delivery on orders above ₹1,999 • Damage-Free Guarantee
        </span>
        <Link
          href="/shop"
          className="inline-flex items-center gap-1 underline decoration-[#EAB308] hover:text-[#FACC15] text-[#FFFFFF] font-bold ml-1.5 transition-colors cursor-pointer"
        >
          <span>Shop Sacred Art</span>
          <ArrowRight className="w-3 h-3 text-[#FACC15]" />
        </Link>
      </span>

      <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15]/50 shrink-0" />

      {/* 4. 3000K LED Backlight */}
      <span className="flex items-center gap-1.5 shrink-0 text-[#E5E7EB]">
        <Flame className="w-3.5 h-3.5 text-[#FACC15] animate-pulse shrink-0" />
        <span className="font-medium">Soothing 3000K Warm LED Backlit Art</span>
      </span>

      <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15]/50 shrink-0" />

      {/* 6. Phone Support */}
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
