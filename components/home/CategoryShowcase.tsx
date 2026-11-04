'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

export interface EditorialCategory {
  id: string;
  name: string;
  subtitle: string;
  badge?: string;
  href: string;
  image: string;
  fallbackImage: string;
}

export const EDITORIAL_CATEGORIES: EditorialCategory[] = [
  {
    id: 'acrylic-photo-frames',
    name: 'Acrylic Photo Frames',
    subtitle: 'Crystal clear shatterproof acrylic with beveled edges',
    badge: 'Classic',
    href: '/category/acrylic-photo-frames',
    image: '/images/collections/custom-portrait-frame.jpg',
    fallbackImage: '/images/collections/custom-portrait-frame.jpg',
  },
  {
    id: 'led-acrylic-photo-frames',
    name: 'LED Acrylic Photo Frames',
    subtitle: 'Warm golden halo backlights with 12V adapter',
    badge: 'Warm LED',
    href: '/category/led-acrylic-photo-frames',
    image: '/images/collections/custom-led-photo-frame.jpg',
    fallbackImage: '/images/collections/custom-led-photo-frame.jpg',
  },
  {
    id: 'glitter-photo-frames',
    name: 'Glitter Photo Frames',
    subtitle: 'Enchanted floating liquid gold & diamond shimmer',
    badge: 'Liquid Gold',
    href: '/category/glitter-photo-frames',
    image: '/images/mockups/enchanted-liquid-gold-glitter-acrylic-photo-frame/primary-square.jpg',
    fallbackImage: '/images/mockups/sparkling-diamond-glitter-wedding-photo-frame/primary-square.jpg',
  },
  {
    id: '360-rotating-photo-lamps',
    name: '360° Rotating Photo Lamps',
    subtitle: 'Motorized silent rotation showcasing multiple photos',
    badge: 'Rotating LED',
    href: '/category/360-rotating-photo-lamps',
    image: '/images/mockups/motorized-360-rotating-led-cylinder-photo-lamp/primary-square.jpg',
    fallbackImage: '/images/mockups/crystal-tower-hexagonal-rotating-photo-lamp/primary-square.jpg',
  },
  {
    id: 'god-photo-frames',
    name: 'Devotional Wall Art',
    subtitle: 'Sacred acrylic & warm LED sanctum frames',
    badge: 'Devotional',
    href: '/category/god-photo-frames',
    image: '/images/wall-decor/categories/devotional/balaji-category.jpg',
    fallbackImage: '/images/divine/ram-mandir.jpg',
  },
  {
    id: 'family-baby-frames',
    name: 'Family & Baby Frames',
    subtitle: 'Heartfelt heirlooms and baby milestone collages',
    badge: 'Heirlooms',
    href: '/category/family-baby-frames',
    image: '/images/collections/family-photo-frame.jpg',
    fallbackImage: '/images/collections/family-photo-frame.jpg',
  },
  {
    id: 'couple-wedding-frames',
    name: 'Couple & Wedding Frames',
    subtitle: 'Wedding vow keepsakes and anniversary portraits',
    badge: 'Wedding',
    href: '/category/couple-wedding-frames',
    image: '/images/mockups/custom-couple-wedding-vows-acrylic-keepsake-frame/primary-square.jpg',
    fallbackImage: '/images/mockups/sparkling-diamond-glitter-wedding-photo-frame/primary-square.jpg',
  },
  {
    id: 'personalized-gifts',
    name: 'Personalized Photo Gifts',
    subtitle: 'Bespoke custom names & dedication inscriptions',
    badge: 'Personalized',
    href: '/category/personalized-gifts',
    image: '/images/collections/gallery-set-photo-frames.jpg',
    fallbackImage: '/images/collections/custom-led-photo-frame.jpg',
  },
];

export default function CategoryShowcase() {
  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 lg:py-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 pb-3 border-b border-stone-200 gap-3">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-800">
            Handcrafted Collections
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight mt-0.5">
            Shop By Category
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl font-sans">
            From crystal clear acrylic frames to warm backlit LED art, explore collections designed for your home.
          </p>
        </div>

        <Link
          href="/category"
          className="text-xs sm:text-sm font-semibold text-stone-800 hover:text-amber-800 flex items-center gap-1.5 transition-colors shrink-0 group"
        >
          <span>View All Categories</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Clean 4-Column Grid with Equal Image Dimensions */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
        {EDITORIAL_CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            className="group flex flex-col bg-white rounded-xl sm:rounded-2xl border border-stone-200 hover:border-stone-300 hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            {/* Equal Aspect Ratio Image Container */}
            <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = cat.fallbackImage;
                }}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
              />
              {cat.badge && (
                <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-xs text-stone-800 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full border border-stone-200 shadow-2xs">
                  {cat.badge}
                </span>
              )}
            </div>

            {/* Product Category Content */}
            <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between bg-white">
              <div>
                <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                  {cat.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-stone-500 line-clamp-1 mt-0.5 font-sans">
                  {cat.subtitle}
                </p>
              </div>

              <div className="pt-2 sm:pt-3 flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-stone-700 group-hover:text-amber-800 transition-colors">
                <span>Explore Frames</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
