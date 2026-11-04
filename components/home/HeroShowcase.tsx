// 'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

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
  // ... other deities omitted for brevity (retain original definitions)
];

const AUTO_SCROLL_INTERVAL = 5000;

export default function HeroShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLedGlowOn, setIsLedGlowOn] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [timerResetKey, setTimerResetKey] = useState(0);

  const currentDeity = HERO_DEITIES[currentIndex];

  // Preload images
  useEffect(() => {
    HERO_DEITIES.forEach((deity) => {
      const img = new Image();
      img.src = deity.image;
    });
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

  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left column – Textual content */}
        <div className="space-y-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Premium Acrylic & Customized Photo Frames
          </h1>
          <p className="text-lg text-gray-600">
            Discover beautifully crafted acrylic, LED and customized photo frames designed to make your memories unforgettable.
          </p>
          <div className="flex space-x-4">
            <Link
              href="/shop"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-md transition-colors"
            >
              Explore Collections
            </Link>
            <Link
              href="/customise"
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-md transition-colors flex items-center"
            >
              <Sparkles className="w-4 h-4 mr-1" /> Customize Your Frame
            </Link>
          </div>
          {/* Simple LED toggle */}
          <button
            type="button"
            onClick={() => setIsLedGlowOn(!isLedGlowOn)}
            className="mt-4 px-4 py-2 border rounded text-sm"
          >
            {isLedGlowOn ? 'Warm LED: ON' : 'Daylight: OFF'}
          </button>
        </div>
        {/* Right column – Image */}
        <div className="relative">
          <img
            src={currentDeity.image}
            alt={currentDeity.name}
            className="w-full rounded-lg shadow-lg object-cover"
          />
          {/* Simple navigation arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full"
            aria-label="Previous"
          >
            ◀
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full"
            aria-label="Next"
          >
            ▶
          </button>
        </div>
      </div>
      {/* Thumbnail navigation */}
      <div className="max-w-6xl mx-auto mt-6 px-4 flex justify-center space-x-2">
        {HERO_DEITIES.map((deity, idx) => (
          <button
            key={deity.id}
            onClick={() => handleSelect(idx)}
            className={`w-16 h-12 rounded overflow-hidden border ${currentIndex === idx ? 'border-amber-500' : 'border-gray-300'} transition`}
          >
            <img src={deity.image} alt={deity.shortName} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </section>
  );
}
