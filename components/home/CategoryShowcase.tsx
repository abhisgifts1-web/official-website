'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface EditorialCategory {
  id: string;
  name: string;
  href: string;
  image: string;
  fallbackImage: string;
}

export const EDITORIAL_CATEGORIES: EditorialCategory[] = [
  {
    id: 'acrylic-photo-frames',
    name: 'Acrylic Photo Frames',
    href: '/category/acrylic-photo-frames',
    image: '/images/mockups/round-diamond-beveled-crystal-acrylic-photo-frame/primary-square.jpg',
    fallbackImage: '/images/mockups/round-diamond-beveled-crystal-acrylic-photo-frame/primary-square.jpg',
  },
  {
    id: 'led-acrylic-photo-frames',
    name: 'LED Photo Frames',
    href: '/category/led-acrylic-photo-frames',
    image: '/images/mockups/custom-led-backlit-acrylic-photo-frame/primary-square.jpg',
    fallbackImage: '/images/mockups/custom-led-backlit-acrylic-photo-frame/primary-square.jpg',
  },
  {
    id: 'glitter-photo-frames',
    name: 'Glitter Photo Frames',
    href: '/category/glitter-photo-frames',
    image: '/images/mockups/sparkling-diamond-glitter-wedding-photo-frame/primary-square.jpg',
    fallbackImage: '/images/mockups/sparkling-diamond-glitter-wedding-photo-frame/primary-square.jpg',
  },
  {
    id: '360-rotating-photo-lamps',
    name: '360° Rotating Lamps',
    href: '/category/360-rotating-photo-lamps',
    image: '/images/mockups/crystal-tower-hexagonal-rotating-photo-lamp/primary-square.jpg',
    fallbackImage: '/images/mockups/crystal-tower-hexagonal-rotating-photo-lamp/primary-square.jpg',
  },
  {
    id: 'god-photo-frames',
    name: 'God Photo Frames',
    href: '/category/god-photo-frames',
    image: '/images/divine/lord-balaji.jpg',
    fallbackImage: '/images/divine/lord-balaji.jpg',
  },
  {
    id: 'family-baby-frames',
    name: 'Family & Baby Frames',
    href: '/category/family-baby-frames',
    image: '/images/mockups/personalized-family-heirloom-gold-script-acrylic-frame/primary-square.jpg',
    fallbackImage: '/images/mockups/personalized-family-heirloom-gold-script-acrylic-frame/primary-square.jpg',
  },
  {
    id: 'couple-wedding-frames',
    name: 'Couple & Wedding',
    href: '/category/couple-wedding-frames',
    image: '/images/mockups/custom-couple-wedding-vows-acrylic-keepsake-frame/mockup-artistic.jpg',
    fallbackImage: '/images/mockups/custom-couple-wedding-vows-acrylic-keepsake-frame/mockup-artistic.jpg',
  },
  {
    id: 'personalized-gifts',
    name: 'Personalized Gifts',
    href: '/category/personalized-gifts',
    image: '/images/mockups/triptych-set-of-three-gallery-acrylic-photo-frames/primary-square.jpg',
    fallbackImage: '/images/mockups/triptych-set-of-three-gallery-acrylic-photo-frames/primary-square.jpg',
  },
];

export default function CategoryShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 lg:py-10">
      {/* Section Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight">
          Shop by Category
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 font-medium font-sans">
          Explore handcrafted acrylic, LED, and personalized frames
        </p>
      </div>

      {/* Circular Category Strip with Left / Right Scroll Controls */}
      <div className="relative group/carousel">
        {/* Left Arrow Button (Visible on hover on larger screens) */}
        <button
          type="button"
          onClick={() => scroll('left')}
          className="hidden md:flex absolute -left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-stone-700 hover:text-stone-900 border border-stone-200 shadow-md items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 hover:scale-105 cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Circular Items Container */}
        <div
          ref={scrollRef}
          className="flex items-start gap-4 sm:gap-6 md:gap-7 lg:gap-8 overflow-x-auto scroll-smooth scrollbar-none py-2 px-2 sm:px-4 justify-start md:justify-center"
        >
          {EDITORIAL_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group flex flex-col items-center shrink-0 text-center w-[84px] sm:w-[100px] md:w-[110px] lg:w-[120px] cursor-pointer"
            >
              {/* Circular Photo Container */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26 lg:w-28 lg:h-28 rounded-full p-1 bg-white border-2 border-stone-200 group-hover:border-amber-500 shadow-2xs group-hover:shadow-md transition-all duration-300 group-hover:scale-105 overflow-hidden flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden bg-stone-100 relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = cat.fallbackImage;
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Category Name Below Circle */}
              <span className="mt-2 sm:mt-2.5 text-center font-bold text-xs sm:text-[13px] text-stone-900 group-hover:text-amber-900 transition-colors leading-tight line-clamp-2">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Right Arrow Button (Visible on hover on larger screens) */}
        <button
          type="button"
          onClick={() => scroll('right')}
          className="hidden md:flex absolute -right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-stone-700 hover:text-stone-900 border border-stone-200 shadow-md items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 hover:scale-105 cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
