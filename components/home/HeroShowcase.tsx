'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

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

// Category strip data — matches the uploaded design
const HERO_CATEGORIES = [
  {
    label: 'Acrylic Photo\nFrames',
    slug: 'acrylic-photo-frames',
    image: '/images/collections/custom-portrait-frame.jpg',
  },
  {
    label: 'LED Photo Frames',
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
    label: 'God Photo Frames',
    slug: 'god-photo-frames',
    image: '/images/wall-decor/categories/devotional/balaji-category.jpg',
  },
  {
    label: 'Family & Baby\nFrames',
    slug: 'family-baby-frames',
    image: '/images/collections/family-photo-frame.jpg',
  },
  {
    label: 'Couple & Wedding',
    slug: 'couple-wedding-frames',
    image: '/images/mockups/custom-couple-wedding-vows-acrylic-keepsake-frame/primary-square.jpg',
  },
  {
    label: 'Personalized Gifts',
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
    subtitle: 'Celestial Vrindavan Flute • Divine Love & Harmony',
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

const AUTO_SCROLL_INTERVAL = 5000;

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
    <section className="bg-white">

      {/* ══════════════════════════════════════
          CATEGORY STRIP  (matches uploaded screenshot)
         ══════════════════════════════════════ */}
      <div className="border-b border-gray-100 py-5 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-center gap-5 sm:gap-8 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {HERO_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="flex flex-col items-center gap-2 group shrink-0 w-16 sm:w-20"
              >
                {/* Circle image */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-amber-400 transition-colors duration-200 shadow-sm">
                  <img
                    src={cat.image}
                    alt={cat.label.replace('\n', ' ')}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* Label */}
                <span className="text-[10px] sm:text-[11px] text-center text-gray-700 group-hover:text-amber-600 transition-colors font-medium leading-tight whitespace-pre-line">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          MAIN HERO
         ══════════════════════════════════════ */}
      <div className="py-10">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* Left — Text */}
          <div className="space-y-5">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Premium Acrylic &amp; Customized<br />
              <span className="text-amber-600">Photo Frames in Hyderabad</span>
            </h1>
            <p className="text-base text-gray-600 leading-relaxed">
              Discover beautifully crafted acrylic, LED and customized photo frames designed to make your memories unforgettable. Handcrafted at our Dilsukhnagar studio.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full transition-colors shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                Explore Collections
              </Link>
              <Link
                href="/customise"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-full transition-colors"
              >
                Customize Your Frame
              </Link>
            </div>
          </div>

          {/* Right — Carousel */}
          <div
            className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <img
              key={currentDeity.id}
              src={currentDeity.image}
              alt={currentDeity.name}
              className="w-full aspect-video object-cover"
            />
            {/* Deity name overlay */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
              <p className="text-white text-sm font-semibold">{currentDeity.name}</p>
              <p className="text-amber-300 text-xs">{currentDeity.price}</p>
            </div>
            {/* Prev / Next */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-8 h-8 rounded-full shadow flex items-center justify-center text-gray-700 transition"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-8 h-8 rounded-full shadow flex items-center justify-center text-gray-700 transition"
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="max-w-6xl mx-auto mt-5 px-4 flex justify-center gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {HERO_DEITIES.map((deity, idx) => (
            <button
              key={deity.id}
              type="button"
              onClick={() => handleSelect(idx)}
              className={`shrink-0 w-16 h-11 rounded-lg overflow-hidden border-2 transition-all ${
                currentIndex === idx
                  ? 'border-amber-500 scale-105 shadow-md'
                  : 'border-gray-200 hover:border-amber-300'
              }`}
              aria-label={`Select ${deity.shortName}`}
            >
              <img src={deity.image} alt={deity.shortName} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

    </section>
  );
}
