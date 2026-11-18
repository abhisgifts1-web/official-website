'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export interface HeroDeity {
  id: string;
  name: string;
  shortName: string;
  subtitle: string;
  blessing: string;
  image: string;
  slug: string;
  accent: string;
  mantra: string;
  deityIcon: string;
  dimension: string;
  price: string;
  originalPrice: string;
}

// Six individual landscape 16:9 divine devotional masterpieces
export const HERO_DEITIES: HeroDeity[] = [
  {
    id: 'radha-krishna',
    name: 'Radha Krishna — Divine Vrindavan',
    shortName: 'Radha Krishna',
    subtitle: 'Celestial Flute • Divine Love & Harmony',
    blessing: 'Infuses your home with unconditional affection, emotional healing & joyful tranquility.',
    image: '/images/divine/radha-krishna.jpg',
    slug: 'radha-krishna-divine-flute-acrylic-wall-decor',
    accent: '#D6AA55',
    mantra: '॥ రాధే రాధే • హరే కృష్ణ హరే రామ ॥',
    deityIcon: '🦚',
    dimension: '18" × 12"',
    price: '₹2,799',
    originalPrice: '₹4,299',
  },
  {
    id: 'lord-balaji',
    name: 'Lord Balaji — Tirupati Blessings',
    shortName: 'Lord Balaji',
    subtitle: 'Kaliyuga Varada • Flagship 3D Gold Heirloom',
    blessing: 'Shields family against planetary doshas, relieves debts & welcomes Vaikuntha abundance.',
    image: '/images/divine/lord-balaji.jpg',
    slug: 'tirupati-balaji-divine-led-backlit-acrylic-wall-art',
    accent: '#D6AA55',
    mantra: '॥ ఓం నమో భగవతే వేంకటేశాయ • గోవింద హరి గోవింద ॥',
    deityIcon: '🔱',
    dimension: '24" × 16"',
    price: '₹3,499',
    originalPrice: '₹5,499',
  },
  {
    id: 'adiyogi-shiva',
    name: 'Adiyogi Shiva — Eternal Meditation',
    shortName: 'Adiyogi Shiva',
    subtitle: 'Crescent Moon Sanctum • Mahadev Cosmic Energy',
    blessing: 'Dissolves mental stress and chaotic energy, awakening deep meditative stillness.',
    image: '/images/divine/adiyogi-shiva.jpg',
    slug: 'adiyogi-lord-shiva-meditation-led-wall-decor',
    accent: '#D6AA55',
    mantra: '॥ ఓం నమః శివాయ • కర్పూర గౌరం కరుణావతారమ్ ॥',
    deityIcon: '🌙',
    dimension: '20" × 14"',
    price: '₹2,999',
    originalPrice: '₹4,799',
  },
  {
    id: 'lord-ganesha',
    name: 'Lord Ganesha — Vighnaharta',
    shortName: 'Lord Ganesha',
    subtitle: 'Prathama Pujya • Remover of All Obstacles',
    blessing: 'Clears stumbling blocks in business & career, ushering in auspicious Shubh-Labh prosperity.',
    image: '/images/divine/lord-ganesha.jpg',
    slug: 'lord-ganesha-vighnaharta-divine-led-backlit-acrylic-art',
    accent: '#D6AA55',
    mantra: '॥ ఓం గం గణపతయే నమః • వక్రతుండ మహాకాయ ॥',
    deityIcon: '🐘',
    dimension: '18" × 12"',
    price: '₹2,799',
    originalPrice: '₹4,299',
  },
  {
    id: 'maa-lakshmi',
    name: 'Maa Lakshmi — Goddess of Prosperity',
    shortName: 'Maa Lakshmi',
    subtitle: 'Ashta Lakshmi Abundance • Sacred Kuber Zone',
    blessing: 'Bestows 8-fold wealth, nourishment, courage, wisdom and domestic auspiciousness.',
    image: '/images/divine/maa-lakshmi.jpg',
    slug: 'ashta-lakshmi-wealth-prosperity-acrylic-wall-decor',
    accent: '#D6AA55',
    mantra: '॥ ఓం శ్రీం హ్రీం క్లీం మహాలక్ష్మ్యై నమః ॥',
    deityIcon: '🌸',
    dimension: '24" × 16"',
    price: '₹3,299',
    originalPrice: '₹4,999',
  },
  {
    id: 'ram-mandir',
    name: 'Ram Mandir — Ayodhya Divine Heritage',
    shortName: 'Ram Mandir',
    subtitle: 'Consecrated Ram Lalla • Maryada Purushottam',
    blessing: 'Infuses household with moral fortitude, fearless protection and righteous dharma.',
    image: '/images/divine/ram-mandir.jpg',
    slug: 'ayodhya-ram-janmabhoomi-mandir-3d-led-wall-decor',
    accent: '#D6AA55',
    mantra: '॥ శ్రీరామ జయరామ జయ జయ రామ ॥',
    deityIcon: '🏹',
    dimension: '20" × 14"',
    price: '₹2,999',
    originalPrice: '₹4,699',
  },
];

const AUTO_SCROLL_INTERVAL = 5500;

export default function HeroShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timerResetKey, setTimerResetKey] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const currentDeity = HERO_DEITIES[currentIndex];

  // Preload images
  useEffect(() => {
    if (typeof window !== 'undefined') {
      HERO_DEITIES.forEach((deity) => {
        const img = new window.Image();
        img.src = deity.image;
      });
    }
  }, []);

  // Auto scroll
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_DEITIES.length);
    }, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, timerResetKey]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_DEITIES.length);
    setTimerResetKey((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_DEITIES.length) % HERO_DEITIES.length);
    setTimerResetKey((prev) => prev + 1);
  };

  const handleSelect = (index: number) => {
    setCurrentIndex(index);
    setTimerResetKey((prev) => prev + 1);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 45) handleNext();
    else if (diff < -45) handlePrev();
    setTouchStartX(null);
  };

  return (
    <section className="relative bg-stone-950 overflow-hidden w-full lg:min-h-[calc(100vh-115px)] flex flex-col justify-center">
      {/* ── Background Rotating Deity Masterpieces with Same Animation ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {HERO_DEITIES.map((deity, idx) => (
          <div
            key={deity.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentIndex === idx ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={deity.image}
              alt={deity.name}
              className={`w-full h-full object-cover object-center transition-transform duration-7000 ease-out ${
                currentIndex === idx ? 'scale-105' : 'scale-100'
              }`}
            />
          </div>
        ))}

        {/* Ambient Dark Scrim & Gradient Overlays for High Legibility */}
        <div className="absolute inset-0 bg-stone-950/75 sm:bg-gradient-to-r sm:from-stone-950/95 sm:via-stone-950/80 sm:to-stone-950/45" />
        <div className="absolute inset-0 bg-radial-[circle_at_70%_50%] from-transparent via-stone-950/20 to-stone-950/70" />
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-stone-950/90 to-transparent" />
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-stone-950/50 to-transparent" />
      </div>

      {/* ══════════════════════════════════════
          FULL-WIDTH & VIEWPORT-HEIGHT HERO (TWO-COLUMN)
         ══════════════════════════════════════ */}
      <div className="relative z-10 w-full flex-1 flex items-center py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        <div className="w-full max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            
            {/* ── Left Column: Editorial Content & CTAs ── */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-4 sm:space-y-5 lg:space-y-6">
              
              {/* Studio Origin Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wide shadow-2xs backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>HYDERABAD’S PREMIER PHOTO ATELIER</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.14]">
                  <span className="block overflow-hidden">
                    <span className="inline-block animate-headline-line-1 text-white">
                      Premium Custom
                    </span>
                  </span>
                  <span className="block overflow-hidden">
                    <span className="inline-block animate-headline-line-2 text-stone-100">
                      Photo Frames
                    </span>
                  </span>
                  <span className="block overflow-hidden pt-0.5 sm:pt-1">
                    <span className="inline-block animate-headline-line-3">
                      <span className="inline-block text-amber-300 font-extrabold animate-gold-text-shimmer">
                        in Hyderabad
                      </span>
                    </span>
                  </span>
                </h1>
              </div>

              {/* Active Deity Blessing & Mantra Highlight */}
              <div className="space-y-1.5 max-w-xl">
                <p className="text-amber-200/90 font-serif text-sm sm:text-base italic tracking-wide">
                  {currentDeity.mantra}
                </p>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed line-clamp-2">
                  {currentDeity.blessing}
                </p>
              </div>

              {/* Primary & Secondary Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold rounded-full shadow-lg shadow-amber-500/20 hover:shadow-xl transition-all duration-200 group text-sm sm:text-base cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-stone-950 group-hover:rotate-12 transition-transform" />
                  <span>Explore Collections</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/customise"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border border-white/25 hover:border-white/40 backdrop-blur-md transition-all duration-200 text-sm sm:text-base cursor-pointer"
                >
                  <span>Customize Your Frame</span>
                </Link>
              </div>
            </div>

            {/* ── Right Column: Framed Masterpiece Showcase & Thumbnails ── */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-3 sm:space-y-4">
              
              {/* Luxury Frame Container */}
              <div
                className="relative bg-stone-950/80 backdrop-blur-md p-2 sm:p-3 rounded-2xl shadow-2xl ring-1 ring-amber-400/20 border border-white/10 overflow-hidden group select-none cursor-pointer w-full"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {/* 16:9 Image Viewport with Acrylic Sheen */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full max-h-[560px] rounded-xl overflow-hidden bg-stone-900">
                  <img
                    key={currentDeity.id}
                    src={currentDeity.image}
                    alt={currentDeity.name}
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                  
                  {/* Subtle top glare reflection line */}
                  <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />

                  {/* Top Floating Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-[11px] font-semibold border border-amber-400/20 shadow-xs">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      Premium Acrylic Frame
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-[11px] font-medium border border-white/10 shadow-xs">
                      {currentDeity.dimension}
                    </span>
                  </div>

                  {/* Bottom Info Bar Overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950 via-stone-950/85 to-transparent pt-8 pb-3.5 px-4 sm:px-5">
                    <div className="flex items-end justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-white text-sm sm:text-base lg:text-lg font-semibold truncate tracking-tight">
                          {currentDeity.name}
                        </p>
                        <p className="text-amber-300 text-xs sm:text-sm font-medium truncate">
                          {currentDeity.subtitle}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <span className="text-amber-400 text-lg sm:text-xl font-bold">
                          {currentDeity.price}
                        </span>
                        <span className="text-stone-400 text-xs sm:text-sm line-through ml-2">
                          {currentDeity.originalPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tightly Bound Thumbnails Directly Under The Frame */}
              <div className="flex items-center justify-between gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
                {HERO_DEITIES.map((deity, idx) => (
                  <button
                    key={deity.id}
                    type="button"
                    onClick={() => handleSelect(idx)}
                    className={`relative flex-1 min-w-[56px] h-11 sm:h-13 lg:h-14 rounded-lg overflow-hidden border transition-all duration-300 cursor-pointer ${
                      currentIndex === idx
                        ? 'opacity-100 border-amber-400 ring-2 ring-amber-400/40 scale-105 shadow-md shadow-amber-500/20'
                        : 'opacity-40 hover:opacity-75 border-white/20'
                    }`}
                    aria-label={`Select ${deity.shortName}`}
                  >
                    <img
                      src={deity.image}
                      alt={deity.shortName}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
