'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export interface EditorialCategory {
  id: string;
  name: string;
  href: string;
  image: string;
  fallbackImage: string;
}

export const EDITORIAL_CATEGORIES: EditorialCategory[] = [
  {
    id: 'all',
    name: 'All Categories',
    href: '/shop',
    image: '/images/categories/circle-showcase/all-categories.jpg',
    fallbackImage: '/images/categories/circle-showcase/acrylic-photo-frames.jpg',
  },
  {
    id: 'acrylic-photo-frames',
    name: 'Acrylic Photo Frames',
    href: '/shop?category=acrylic-photo-frames',
    image: '/images/categories/circle-showcase/acrylic-photo-frames.jpg',
    fallbackImage: '/images/mockups/round-diamond-beveled-crystal-acrylic-photo-frame/primary-square.jpg',
  },
  {
    id: 'led-acrylic-photo-frames',
    name: 'LED Photo Frames',
    href: '/shop?category=led-acrylic-photo-frames',
    image: '/images/categories/circle-showcase/led-photo-frames.jpg',
    fallbackImage: '/images/mockups/custom-led-backlit-acrylic-photo-frame/primary-square.jpg',
  },
  {
    id: 'glitter-photo-frames',
    name: 'Glitter Photo Frames',
    href: '/shop?category=glitter-photo-frames',
    image: '/images/categories/circle-showcase/glitter-photo-frames.jpg',
    fallbackImage: '/images/mockups/sparkling-diamond-glitter-wedding-photo-frame/primary-square.jpg',
  },
  {
    id: '360-rotating-photo-lamps',
    name: '360° Rotating Lamps',
    href: '/shop?category=360-rotating-photo-lamps',
    image: '/images/categories/circle-showcase/360-rotating-photo-lamps.jpg',
    fallbackImage: '/images/mockups/motorized-360-rotating-led-cylinder-photo-lamp/primary-square.jpg',
  },
  {
    id: 'god-photo-frames',
    name: 'God Photo Frames',
    href: '/shop?category=god-photo-frames',
    image: '/images/categories/circle-showcase/god-photo-frames.jpg',
    fallbackImage: '/images/divine/lord-balaji.jpg',
  },
  {
    id: 'family-baby-frames',
    name: 'Family & Baby Frames',
    href: '/shop?category=family-baby-frames',
    image: '/images/categories/circle-showcase/family-baby-frames.jpg',
    fallbackImage: '/images/collections/family-photo-frame.jpg',
  },
  {
    id: 'couple-wedding-frames',
    name: 'Couple & Wedding Frames',
    href: '/shop?category=couple-wedding-frames',
    image: '/images/categories/circle-showcase/couple-wedding.jpg',
    fallbackImage: '/images/wall-decor/products/custom/couple-wedding-keepsake.jpg',
  },
  {
    id: 'personalized-gifts',
    name: 'Personalized Gifts',
    href: '/shop?category=personalized-gifts',
    image: '/images/categories/circle-showcase/personalized-gifts.jpg',
    fallbackImage: '/images/wall-decor/products/custom/custom-square-grid.jpg',
  },
];

export default function CategoryShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 lg:py-12 border-b border-stone-200/70 bg-gradient-to-b from-stone-50/50 to-white">
      {/* Classical Section Header */}
      <div className="text-center mb-7 sm:mb-9">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50/90 border border-amber-200 text-amber-900 text-xs font-semibold tracking-wider uppercase mb-2.5 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
          <span>Curated Collections</span>
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-900 tracking-tight">
          Shop by Category
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 font-medium font-sans max-w-xl mx-auto">
          Explore handcrafted acrylic, illuminated LED, and personalized heirloom photo frames
        </p>
      </div>

      {/* Category Strip Carousel with Left / Right Scroll Controls */}
      <div className="relative group/carousel">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={() => scroll('left')}
          className="hidden md:flex absolute -left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-stone-700 hover:text-amber-800 border border-stone-200 shadow-md items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 btn-press-bounce hover:scale-115 active:scale-90 hover:border-[#FEE815] shadow-lg hover:shadow-xl cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Square Items Container */}
        <div
          ref={scrollRef}
          className="flex items-start gap-4 sm:gap-6 md:gap-7 lg:gap-8 overflow-x-auto scroll-smooth scrollbar-none py-4 px-2 sm:px-4 justify-start md:justify-around xl:justify-center"
          style={{ scrollbarWidth: 'none' }}
        >
          {EDITORIAL_CATEGORIES.map((cat, idx) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="category-wave-item group flex flex-col items-center shrink-0 text-center w-[96px] sm:w-[112px] lg:w-[126px] cursor-pointer select-none"
              style={{ animationDelay: `${idx * 0.22}s` }}
            >
              {/* Outer Golden Medallion with Shimmer & Breathing Aura */}
              <div className="relative flex items-center justify-center">
                {/* Ambient Soft Gold Halo Glow Backdrop */}
                <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-amber-400/30 via-yellow-300/40 to-amber-500/30 blur-md opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 pointer-events-none" />

                {/* 24K Gold Shimmering Border (Square Shape) */}
                <div className="relative w-[84px] h-[84px] sm:w-[98px] sm:h-[98px] lg:w-[112px] lg:h-[112px] aspect-square rounded-2xl p-[3px] category-gold-shimmer shadow-md group-hover:shadow-[0_14px_32px_rgba(254,232,21,0.45)] group-hover:-translate-y-2 group-hover:scale-108 transition-all duration-400 ease-out flex items-center justify-center animate-category-ring">
                  {/* Inner White Well / Clipping Square */}
                  <div className="w-full h-full rounded-[13px] overflow-hidden bg-white p-[1.5px] relative flex items-center justify-center shadow-inner">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = cat.fallbackImage;
                      }}
                      className="w-full h-full object-cover object-center rounded-[11px] group-hover:scale-115 transition-transform duration-700 ease-out"
                    />

                    {/* Diagonal Acrylic Light Sheen Sweep on Hover */}
                    <div className="absolute inset-0 rounded-[11px] bg-gradient-to-tr from-transparent via-white/70 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none z-10" />

                    {/* Subtle Inner Lens Bezel Rim */}
                    <div className="absolute inset-0 rounded-[11px] ring-1 ring-inset ring-black/15 pointer-events-none z-10" />
                  </div>
                </div>
              </div>

              {/* Category Name Below Square */}
              <span className="mt-2.5 sm:mt-3 text-center font-bold text-xs sm:text-[13px] text-stone-800 group-hover:text-amber-800 group-hover:underline underline-offset-4 decoration-amber-500 transition-colors leading-tight line-clamp-2 max-w-[115px]">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={() => scroll('right')}
          className="hidden md:flex absolute -right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-stone-700 hover:text-amber-800 border border-stone-200 shadow-md items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 btn-press-bounce hover:scale-115 active:scale-90 hover:border-[#FEE815] shadow-lg hover:shadow-xl cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
