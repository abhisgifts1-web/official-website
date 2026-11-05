'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Star,
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

// Category strip data — matches the circular category design
const HERO_CATEGORIES = [
  {
    label: 'Acrylic Photo\nFrames',
    slug: 'acrylic-photo-frames',
    image: '/images/collections/custom-portrait-frame.jpg',
  },
  {
    label: 'LED Photo\nFrames',
    slug: 'led-acrylic-photo-frames',
    image: '/images/collections/custom-led-photo-frame.jpg',
  },
  {
    label: 'Glitter Photo\nFrames',
    slug: 'glitter-photo-frames',
    image: '/images/mockups/enchanted-liquid-gold-glitter-acrylic-photo-frame/primary-square.jpg',
  },
  {
    label: '360° Rotating\nLamps',
    slug: '360-rotating-photo-lamps',
    image: '/images/mockups/motorized-360-rotating-led-cylinder-photo-lamp/primary-square.jpg',
  },
  {
    label: 'God Photo\nFrames',
    slug: 'god-photo-frames',
    image: '/images/wall-decor/categories/devotional/balaji-category.jpg',
  },
  {
    label: 'Family & Baby\nFrames',
    slug: 'family-baby-frames',
    image: '/images/collections/family-photo-frame.jpg',
  },
  {
    label: 'Couple &\nWedding',
    slug: 'couple-wedding-frames',
    image: '/images/mockups/custom-couple-wedding-vows-acrylic-keepsake-frame/primary-square.jpg',
  },
  {
    label: 'Personalized\nGifts',
    slug: 'personalized-gifts',
    image: '/images/collections/gallery-set-photo-frames.jpg',
  },
];

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
    <section className="bg-white overflow-hidden w-full lg:min-h-[calc(100vh-115px)] flex flex-col justify-between">
      {/* ══════════════════════════════════════
          1. FULL WIDTH CATEGORY STRIP (TOP)
         ══════════════════════════════════════ */}
      <div className="w-full border-b border-stone-200/80 bg-stone-50/70 py-3 sm:py-4 px-3 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        <div className="w-full max-w-[1920px] mx-auto">
          <div
            className="flex items-start justify-start md:justify-around xl:justify-center gap-4 sm:gap-6 lg:gap-10 xl:gap-12 overflow-x-auto pb-1 scroll-smooth scrollbar-none"
            style={{ scrollbarWidth: 'none' }}
          >
            {HERO_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="flex flex-col items-center gap-2 group shrink-0 w-[74px] sm:w-[92px] lg:w-[104px] text-center cursor-pointer"
              >
                {/* Circle Frame */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-full p-0.5 bg-white shadow-xs border border-stone-200 group-hover:border-amber-500 group-hover:shadow-md transition-all duration-300 group-hover:scale-105 overflow-hidden flex items-center justify-center">
                  <img
                    src={cat.image}
                    alt={cat.label.replace('\n', ' ')}
                    className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                    loading="eager"
                  />
                  <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5" />
                </div>

                {/* Category Label */}
                <span className="text-[11px] sm:text-xs text-stone-700 group-hover:text-amber-700 font-medium leading-tight tracking-tight transition-colors whitespace-pre-line">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          2. FULL-WIDTH & VIEWPORT-HEIGHT HERO (TWO-COLUMN)
         ══════════════════════════════════════ */}
      <div className="w-full flex-1 flex items-center py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        <div className="w-full max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            
            {/* ── Left Column: Editorial Content & CTAs ── */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-4 sm:space-y-5 lg:space-y-6">
              
              {/* Studio Origin Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50/90 border border-amber-200 text-amber-900 text-xs font-semibold tracking-wide shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                <span>HYDERABAD’S PREMIER PHOTO ATELIER</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-stone-900 tracking-tight leading-[1.14]">
                  Premium Custom Photo Frames{' '}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-600">
                    in Hyderabad
                  </span>
                </h1>
              </div>

              {/* Primary & Secondary Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-stone-900 hover:bg-black text-white font-semibold rounded-full shadow-md hover:shadow-xl transition-all duration-200 group text-sm sm:text-base cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
                  <span>Explore Collections</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/customise"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-stone-50 text-stone-800 font-semibold rounded-full border-2 border-stone-200 hover:border-stone-400 transition-all duration-200 text-sm sm:text-base cursor-pointer"
                >
                  <span>Customize Your Frame</span>
                </Link>
              </div>

              {/* Trust & Social Proof Row */}
              <div className="pt-2 border-t border-stone-100 flex items-center gap-3">
                <div className="flex items-center text-amber-500 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-stone-600">
                  <strong className="text-stone-900 font-semibold">4.9/5 Rating</strong> · Trusted by 12,000+ Happy Homes in Telangana &amp; Andhra
                </p>
              </div>
            </div>

            {/* ── Right Column: Framed Masterpiece Showcase & Thumbnails ── */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-3 sm:space-y-4">
              
              {/* Luxury Frame Container */}
              <div
                className="relative bg-stone-950 p-2 sm:p-3 rounded-2xl shadow-2xl ring-1 ring-black/10 overflow-hidden group select-none cursor-pointer w-full"
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
                  <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

                  {/* Top Floating Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-[11px] font-semibold border border-amber-400/20 shadow-xs">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      3D LED Backlit Frame
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-[11px] font-medium border border-white/10 shadow-xs">
                      {currentDeity.dimension}
                    </span>
                  </div>

                  {/* Prev / Next Arrows */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-white text-stone-900 shadow-lg flex items-center justify-center backdrop-blur-sm transition-all hover:scale-105 active:scale-95 cursor-pointer z-10"
                    aria-label="Previous frame"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-white text-stone-900 shadow-lg flex items-center justify-center backdrop-blur-sm transition-all hover:scale-105 active:scale-95 cursor-pointer z-10"
                    aria-label="Next frame"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Bottom Info Bar Overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent pt-8 pb-3.5 px-4 sm:px-5">
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
                    className={`relative flex-1 min-w-[56px] h-11 sm:h-13 lg:h-14 rounded-lg overflow-hidden border border-white/10 cursor-pointer ${
                      currentIndex === idx
                        ? 'opacity-100'
                        : 'opacity-40 hover:opacity-75'
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
