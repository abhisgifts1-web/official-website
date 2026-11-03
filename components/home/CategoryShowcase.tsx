'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Flame } from 'lucide-react';

export interface EditorialCategory {
  id: string;
  name: string;
  subtitle: string;
  badge?: string;
  href: string;
  image: string;
  fallbackImage: string;
  spanClass: string;
  hasLedBadge?: boolean;
}

export const EDITORIAL_CATEGORIES: EditorialCategory[] = [
  {
    id: 'acrylic-photo-frames',
    name: 'Acrylic Photo Frames',
    subtitle: 'Ultra-clear crystal shatterproof acrylic photo frames with laser diamond-beveled edges and vibrant depth.',
    badge: 'Diamond Beveled',
    href: '/category/acrylic-photo-frames',
    image: '/images/collections/custom-portrait-frame.jpg',
    fallbackImage: '/images/collections/custom-portrait-frame.jpg',
    spanClass: 'lg:col-span-6 md:col-span-6',
  },
  {
    id: 'led-acrylic-photo-frames',
    name: 'LED Acrylic Photo Frames',
    subtitle: 'Warm golden halo backlights creating an authentic ambient aura with low-voltage 12V BIS certified power adapter.',
    badge: 'Warm LED Glow',
    href: '/category/led-acrylic-photo-frames',
    image: '/images/collections/custom-led-photo-frame.jpg',
    fallbackImage: '/images/collections/custom-led-photo-frame.jpg',
    spanClass: 'lg:col-span-6 md:col-span-6',
    hasLedBadge: true,
  },
  {
    id: 'glitter-photo-frames',
    name: 'Glitter Photo Frames',
    subtitle: 'Enchanted floating liquid gold & diamond shimmer glitter acrylic photo frames bringing luminous sparkle to special memories.',
    badge: 'Liquid Gold Shimmer',
    href: '/category/glitter-photo-frames',
    image: '/images/mockups/enchanted-liquid-gold-glitter-acrylic-photo-frame/primary-square.jpg',
    fallbackImage: '/images/mockups/sparkling-diamond-glitter-wedding-photo-frame/primary-square.jpg',
    spanClass: 'lg:col-span-6 md:col-span-6',
  },
  {
    id: '360-rotating-photo-lamps',
    name: '360° Rotating Photo Lamps',
    subtitle: 'Motorized 360-degree rotating cylinder LED photo lamps with whisper-silent rotation showcasing multiple cherished memories.',
    badge: '360° Motorized Warm LED',
    href: '/category/360-rotating-photo-lamps',
    image: '/images/mockups/motorized-360-rotating-led-cylinder-photo-lamp/primary-square.jpg',
    fallbackImage: '/images/mockups/crystal-tower-hexagonal-rotating-photo-lamp/primary-square.jpg',
    spanClass: 'lg:col-span-6 md:col-span-6',
    hasLedBadge: true,
  },
  {
    id: 'god-photo-frames',
    name: 'God Photo Frames',
    subtitle: 'Sacred 3D crystal acrylic & warm LED backlit wall art of Tirupati Balaji, Lord Shiva, Ganesha, Hanuman, Rama & Lakshmi.',
    badge: 'Sacred Devotion',
    href: '/category/god-photo-frames',
    image: '/images/wall-decor/categories/devotional/balaji-category.jpg',
    fallbackImage: '/images/divine/ram-mandir.jpg',
    spanClass: 'lg:col-span-6 md:col-span-6',
    hasLedBadge: true,
  },
  {
    id: 'family-baby-frames',
    name: 'Family & Baby Frames',
    subtitle: 'Heartfelt personalized family heirloom frames, baby milestone memories, and multi-photo wall gallery collages.',
    badge: 'Family Heirlooms',
    href: '/category/family-baby-frames',
    image: '/images/collections/family-photo-frame.jpg',
    fallbackImage: '/images/collections/family-photo-frame.jpg',
    spanClass: 'lg:col-span-6 md:col-span-6',
  },
  {
    id: 'couple-wedding-frames',
    name: 'Couple & Wedding Frames',
    subtitle: 'Cherished wedding vow acrylic keepsakes, romantic anniversary milestones, and elegant couple portraits in crystal depth.',
    badge: 'Wedding & Love',
    href: '/category/couple-wedding-frames',
    image: '/images/mockups/custom-couple-wedding-vows-acrylic-keepsake-frame/primary-square.jpg',
    fallbackImage: '/images/mockups/sparkling-diamond-glitter-wedding-photo-frame/primary-square.jpg',
    spanClass: 'lg:col-span-6 md:col-span-6',
  },
  {
    id: 'personalized-gifts',
    name: 'Personalized Gifts',
    subtitle: 'Bespoke personalized photo gifts, custom names & dedication inscriptions precision-crafted in Hyderabad with proof on WhatsApp.',
    badge: 'Bespoke Gifts',
    href: '/category/personalized-gifts',
    image: '/images/collections/gallery-set-photo-frames.jpg',
    fallbackImage: '/images/collections/custom-led-photo-frame.jpg',
    spanClass: 'lg:col-span-6 md:col-span-6',
  },
];

export default function CategoryShowcase() {
  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 lg:py-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 pb-4 border-b border-[#2D2D2D] gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-[#FFFFFF] bg-[#181818] border border-[#EAB308] px-3.5 py-1 rounded-full shadow-2xs mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#EAB308]" />
            <span>Featured Collections</span>
          </div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#FFFFFF] tracking-tight">
            EXPLORE OUR CATEGORIES
          </h2>
          <p className="text-xs sm:text-sm text-[#D1D5DB] mt-1.5 max-w-2xl font-sans leading-relaxed">
            Find the perfect expression of faith, love, and cherished memories. Handcrafted with museum-grade crystal acrylic and precision illumination.
          </p>
        </div>

        <Link
          href="/category"
          className="text-xs sm:text-sm font-bold text-[#FFFFFF] hover:text-[#EAB308] flex items-center gap-2 group transition-colors shrink-0 uppercase tracking-wider"
        >
          <span>View All Categories</span>
          <ArrowRight className="w-4 h-4 text-[#EAB308] group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
        {EDITORIAL_CATEGORIES.map((cat) => {
          return (
            <Link
              key={cat.id}
              href={cat.href}
              className={`group relative rounded-3xl overflow-hidden bg-[#181818] border border-[#2D2D2D] hover:border-[#EAB308] shadow-sm hover:shadow-[0_16px_36px_rgba(0,0,0,0.6)] transition-all duration-500 flex flex-col justify-end min-h-[280px] sm:min-h-[320px] lg:min-h-[340px] p-5 sm:p-6 lg:p-7 ${cat.spanClass}`}
            >
              {/* Background Artwork Image with Hover Zoom */}
              <img
                src={cat.image}
                alt={cat.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = cat.fallbackImage;
                }}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />

              {/* Multi-Stop Cinematic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/95 via-[#121212]/60 to-transparent transition-opacity duration-300" />

              {/* Subtle Golden Sheen on Hover */}
              <div className="absolute inset-0 bg-[#EAB308]/0 group-hover:bg-[#EAB308]/10 transition-colors duration-500 pointer-events-none" />

              {/* Top Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                {cat.badge && (
                  <span className="bg-[#181818]/90 text-[#FFFFFF] text-[11px] font-bold px-3 py-1 rounded-full border border-[#EAB308]/60 shadow-md backdrop-blur-xs flex items-center gap-1.5">
                    {cat.hasLedBadge ? (
                      <Flame className="w-3.5 h-3.5 text-[#EAB308] animate-pulse" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-[#EAB308]" />
                    )}
                    <span>{cat.badge}</span>
                  </span>
                )}
              </div>

              {/* Bottom Content Area */}
              <div className="relative z-20 space-y-2">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#FFFFFF] group-hover:text-[#EAB308] transition-colors leading-snug drop-shadow-sm">
                  {cat.name}
                </h3>

                <p className="text-xs sm:text-[13px] text-[#F9EFE0]/85 line-clamp-2 leading-relaxed font-sans max-w-xl">
                  {cat.subtitle}
                </p>

                {/* Explore Collection Link with Animated Gold Arrow */}
                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#EAB308] group-hover:text-white uppercase tracking-wider transition-colors">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 text-[#EAB308] group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>

              {/* Gold Accent Corner Border on Hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#EAB308]/70 rounded-3xl transition-colors duration-500 pointer-events-none" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
