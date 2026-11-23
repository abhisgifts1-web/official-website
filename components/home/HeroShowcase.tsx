'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Flame,
  ArrowRight,
  Gem,
  Palette,
  ShieldCheck,
  Truck,
} from 'lucide-react';

export interface FeaturedArtwork {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  image: string;
  frameMockup: string;
  slug: string;
  price: string;
  originalPrice: string;
  dimensions: string;
  isBestseller: boolean;
}

export const FEATURED_ARTWORKS: FeaturedArtwork[] = [
  {
    id: 'radha-krishna',
    name: 'Radha Krishna — Divine Vrindavan',
    subtitle: 'Celestial Flute • 3D LED Backlit Acrylic',
    tagline: 'Infuses unconditional affection, emotional healing & joyful tranquility into your home.',
    image: '/images/divine/radha-krishna.jpg',
    frameMockup: '/images/mockups/radha-krishna-divine-bansuri-3d-led-acrylic-wall-art/primary-square.jpg',
    slug: 'radha-krishna-divine-bansuri-3d-led-acrylic-wall-art',
    price: '₹2,799',
    originalPrice: '₹4,299',
    dimensions: '24" × 16"',
    isBestseller: true,
  },
  {
    id: 'lord-balaji',
    name: 'Lord Balaji — Tirupati Blessings',
    subtitle: 'Kaliyuga Varada • Flagship 3D Gold Heirloom',
    tagline: 'Shields family against negativity & welcomes Vaikuntha abundance.',
    image: '/images/divine/lord-balaji.jpg',
    frameMockup: '/images/divine/lord-balaji.jpg',
    slug: 'tirupati-balaji-divine-led-backlit-acrylic-wall-art',
    price: '₹3,499',
    originalPrice: '₹5,499',
    dimensions: '24" × 16"',
    isBestseller: true,
  },
  {
    id: 'adiyogi-shiva',
    name: 'Adiyogi Shiva — Eternal Meditation',
    subtitle: 'Crescent Moon Sanctum • Mahadev Cosmic Energy',
    tagline: 'Dissolves mental stress, awakening deep stillness and serenity.',
    image: '/images/divine/adiyogi-shiva.jpg',
    frameMockup: '/images/divine/adiyogi-shiva.jpg',
    slug: 'adiyogi-lord-shiva-meditation-led-wall-decor',
    price: '₹2,999',
    originalPrice: '₹4,799',
    dimensions: '20" × 14"',
    isBestseller: false,
  },
  {
    id: 'lord-ganesha',
    name: 'Lord Ganesha — Vighnaharta',
    subtitle: 'Prathama Pujya • Remover of All Obstacles',
    tagline: 'Ushers in auspicious Shubh-Labh prosperity & auspicious blessings.',
    image: '/images/divine/lord-ganesha.jpg',
    frameMockup: '/images/divine/lord-ganesha.jpg',
    slug: 'lord-ganesha-vighnaharta-divine-led-backlit-acrylic-art',
    price: '₹2,799',
    originalPrice: '₹4,299',
    dimensions: '18" × 12"',
    isBestseller: true,
  },
  {
    id: 'maa-lakshmi',
    name: 'Maa Lakshmi — Goddess of Prosperity',
    subtitle: 'Ashta Lakshmi Abundance • Sacred Kuber Zone',
    tagline: 'Bestows 8-fold wealth, nourishment, courage and domestic grace.',
    image: '/images/divine/maa-lakshmi.jpg',
    frameMockup: '/images/divine/maa-lakshmi.jpg',
    slug: 'ashta-lakshmi-wealth-prosperity-acrylic-wall-decor',
    price: '₹3,299',
    originalPrice: '₹4,999',
    dimensions: '24" × 16"',
    isBestseller: true,
  },
  {
    id: 'ram-mandir',
    name: 'Ram Mandir — Ayodhya Divine Heritage',
    subtitle: 'Consecrated Ram Lalla • Maryada Purushottam',
    tagline: 'Infuses households with moral fortitude and righteous protection.',
    image: '/images/divine/ram-mandir.jpg',
    frameMockup: '/images/divine/ram-mandir.jpg',
    slug: 'ayodhya-ram-janmabhoomi-mandir-3d-led-wall-decor',
    price: '₹2,999',
    originalPrice: '₹4,699',
    dimensions: '20" × 14"',
    isBestseller: false,
  },
];

export default function HeroShowcase() {
  const [selectedArtworkIndex, setSelectedArtworkIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeArtwork = FEATURED_ARTWORKS[selectedArtworkIndex];

  // Auto-rotate through artworks continuously
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSelectedArtworkIndex((prev) => (prev + 1) % FEATURED_ARTWORKS.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Preload primary high-resolution imagery
  useEffect(() => {
    if (typeof window !== 'undefined') {
      FEATURED_ARTWORKS.forEach((artwork) => {
        const img = new window.Image();
        img.src = artwork.image;
        if (artwork.frameMockup && artwork.frameMockup !== artwork.image) {
          const frameImg = new window.Image();
          frameImg.src = artwork.frameMockup;
        }
      });
    }
  }, []);

  return (
    <section
      aria-label="Hero Section"
      className="relative w-full bg-[#08080A] text-white overflow-hidden select-none"
    >
      {/* ═════════════════════════════════════════════════════════════════════
          1. LUXURY AMBIENT BACKGROUND
          Clean deep charcoal backdrop with subtle golden ambient light & depth
         ═════════════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Subtle Warm Golden Ambient Light & Depth on right side */}
        <div className="absolute top-1/4 right-[5%] sm:right-[15%] w-72 sm:w-96 lg:w-[32rem] h-72 sm:h-96 lg:h-[32rem] rounded-full bg-radial from-amber-400/15 via-amber-500/5 to-transparent blur-3xl pointer-events-none animate-pulse duration-4000" />

        {/* Subtle golden breathing flare */}
        <div className="absolute -top-24 right-1/4 w-80 h-80 rounded-full bg-amber-300/10 blur-3xl pointer-events-none" />

        {/* Subtle ambient glow on left bottom */}
        <div className="absolute bottom-10 left-[5%] w-72 h-72 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

        {/* Top & Bottom seamless blending vignettes */}
        <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-[#08080A] to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#08080A] via-[#08080A]/70 to-transparent" />
      </div>

      {/* ═════════════════════════════════════════════════════════════════════
          2. MAIN HERO CONTENT CONTAINER (TWO-COLUMN CINEMATIC COMPOSITION)
         ═════════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* ─────────────────────────────────────────────────────────────
              LEFT CONTENT SECTION: Typography & Conversion Hierarchy
             ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-5 sm:space-y-6">
            
            {/* Small Premium Badge with smooth shimmer & breathing pulse */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 border border-amber-400/50 text-amber-300 text-[10px] sm:text-xs font-semibold tracking-widest uppercase shadow-sm backdrop-blur-md animate-hero-badge-shine">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin [animation-duration:8s] shrink-0" />
              <span>HYDERABAD&apos;S PREMIUM PHOTO FRAME STUDIO</span>
            </div>

            {/* Main Heading with Staggered Kinetic Depth & 24K Liquid Gold Shimmer Animation */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-6xl font-bold tracking-tight text-white leading-[1.14]">
              <span className="block text-white drop-shadow-sm transition-transform duration-500 hover:translate-x-1">
                Turn Your Precious
              </span>
              <span className="block text-stone-100 drop-shadow-sm transition-transform duration-500 hover:translate-x-1">
                Moments Into
              </span>
              <span className="block pt-1 animate-hero-gold-shimmer font-extrabold tracking-tight">
                Timeless Memories.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-stone-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-normal drop-shadow-xs">
              Discover beautifully crafted LED photo frames, divine acrylic artwork, and personalized gifts designed to make every moment unforgettable.
            </p>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1 w-full sm:w-auto">
              {/* Primary CTA */}
              <Link
                href="/shop"
                className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-[#F5D061] via-[#FEE815] to-[#D97706] hover:from-[#FFF04B] hover:to-[#FEE815] text-stone-950 font-bold text-sm sm:text-base shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer text-center"
              >
                <span>Explore Collections</span>
                <ArrowRight className="w-4 h-4 text-stone-950 group-hover:translate-x-1.5 transition-transform duration-300 shrink-0" />
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white hover:text-amber-200 font-semibold text-sm sm:text-base border border-amber-400/40 hover:border-amber-300/80 backdrop-blur-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer text-center shadow-xs"
              >
                <Flame className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Trending Bestsellers</span>
              </Link>
            </div>

          </div>

          {/* ─────────────────────────────────────────────────────────────
              RIGHT CONTENT SECTION: Floating Visual Product Showcase
             ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center pt-4 lg:pt-0">
            
            {/* Realistic Floating Master Frame Container */}
            <div
              className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-[540px] group"
            >
              
              {/* Soft Ambient Golden LED Halo (3000K Pulse Aura) with Breathing Animation */}
              <div className="absolute -inset-2.5 sm:-inset-4 rounded-3xl bg-gradient-to-tr from-amber-500/35 via-yellow-400/25 to-amber-600/30 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none animate-led-halo" />

              {/* Dimensional Realistic Frame Bezel & Acrylic Panel */}
              <div className="relative rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 bg-gradient-to-b from-[#252528] via-[#141417] to-[#0A0A0C] border border-amber-400/40 shadow-2xl transition-all duration-500 animate-divine-float motion-reduce:animate-none">
                
                {/* Outer Frame Lip / Bevel Glare with Proportional 3:2 Aspect Ratio */}
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[3/2] bg-stone-900 border border-amber-500/30 shadow-inner">
                  
                  {/* Master Framed Artwork Images with smooth cross-fade animation */}
                  {FEATURED_ARTWORKS.map((artwork, idx) => (
                    <div
                      key={artwork.id}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        idx === selectedArtworkIndex
                          ? 'opacity-100 scale-100 z-10'
                          : 'opacity-0 scale-98 pointer-events-none z-0'
                      }`}
                    >
                      <img
                        src={artwork.frameMockup || artwork.image}
                        alt={artwork.name}
                        className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                      />
                    </div>
                  ))}

                  {/* Crystal Acrylic Glass Light Sweep / Sheen Animation */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                    <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] animate-acrylic-shine" />
                  </div>

                  {/* Realistic Acrylic Specular Reflection Highlight */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-20" />


                </div>

              </div>

              {/* Artwork Image Thumbnails - Larger & Cleaner */}
              <div className="mt-3 sm:mt-4 w-full">
                <div className="grid grid-cols-6 gap-2 sm:gap-2.5">
                  {FEATURED_ARTWORKS.map((artwork, idx) => {
                    const isActive = selectedArtworkIndex === idx;
                    return (
                      <button
                        key={artwork.id}
                        type="button"
                        onClick={() => setSelectedArtworkIndex(idx)}
                        aria-label={`Select ${artwork.name}`}
                        className={`relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 border cursor-pointer hover:scale-105 active:scale-95 ${
                          isActive
                            ? 'border-amber-400 ring-2 ring-amber-400/70 scale-105 shadow-md shadow-amber-500/25'
                            : 'border-stone-700/60 opacity-60 hover:opacity-100 hover:border-amber-400/50'
                        }`}
                      >
                        <img
                          src={artwork.image}
                          alt={artwork.name}
                          className="w-full h-full object-cover"
                        />
                        {isActive && (
                          <div className="absolute inset-0 bg-amber-500/15 pointer-events-none" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════
          3. PREMIUM TRUST INDICATORS (BOTTOM HORIZONTAL ROW)
          Subtle minimal row highlighting genuine core customer assurances.
         ═════════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full border-t border-amber-500/20 bg-[#0C0C0F]/90 backdrop-blur-md py-4 sm:py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:divide-x lg:divide-stone-800">
            
            {/* 1. Premium Quality */}
            <div className="flex items-center gap-3 sm:px-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center shrink-0">
                <Gem className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              </div>
              <div className="min-w-0">
                <p className="text-white font-bold text-xs sm:text-sm">Premium Quality</p>
                <p className="text-stone-400 text-[11px] sm:text-xs truncate">5mm Ultra-Gloss Acrylic</p>
              </div>
            </div>

            {/* 2. Custom Personalization */}
            <div className="flex items-center gap-3 sm:px-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center shrink-0">
                <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              </div>
              <div className="min-w-0">
                <p className="text-white font-bold text-xs sm:text-sm">Custom Personalization</p>
                <p className="text-stone-400 text-[11px] sm:text-xs truncate">Tailored to Any Photo</p>
              </div>
            </div>

            {/* 3. Secure Payments */}
            <div className="flex items-center gap-3 sm:px-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              </div>
              <div className="min-w-0">
                <p className="text-white font-bold text-xs sm:text-sm">Secure Payments</p>
                <p className="text-stone-400 text-[11px] sm:text-xs truncate">100% Encrypted UPI & Cards</p>
              </div>
            </div>

            {/* 4. Safe Delivery */}
            <div className="flex items-center gap-3 sm:px-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              </div>
              <div className="min-w-0">
                <p className="text-white font-bold text-xs sm:text-sm">Safe Delivery</p>
                <p className="text-stone-400 text-[11px] sm:text-xs truncate">Insured All-India Transit</p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
