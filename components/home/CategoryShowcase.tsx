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

// 100% Unique, distinctive, category-relevant divine images — Zero duplicate assets
export const EDITORIAL_CATEGORIES: EditorialCategory[] = [
  {
    id: 'led-backlit-art',
    name: 'LED Backlit Art',
    subtitle: 'Warm 3000K golden halo backlights creating an authentic temple sanctum aura in your living space.',
    badge: '3000K Warm Glow',
    href: '/category/led-backlit-wall-art',
    image: '/images/wall-decor/products/led/ayodhya-ram-mandir-sanctum.jpg',
    fallbackImage: '/images/divine/ram-mandir.jpg',
    spanClass: 'lg:col-span-8 md:col-span-12',
    hasLedBadge: true,
  },
  {
    id: 'normal-acrylic-art',
    name: 'Normal Acrylic Art',
    subtitle: 'Shatterproof 4mm crystal cast sheets with 24K gold foil embellishments and diamond beveled edges.',
    badge: '24K Gold Embellished',
    href: '/category/devotional-wall-art',
    image: '/images/wall-decor/products/abstract/golden-bodhi-ginkgo-art.jpg',
    fallbackImage: '/images/divine/radha-krishna.jpg',
    spanClass: 'lg:col-span-4 md:col-span-6',
  },
  {
    id: 'custom-photos',
    name: 'Custom Photo Frames',
    subtitle: 'Turn your cherished weddings, family legacies & personal portraits into archival glowing heirlooms.',
    badge: 'Bespoke Personalization',
    href: '/customise',
    image: '/images/collections/family-photo-frame.jpg',
    fallbackImage: '/images/collections/custom-led-photo-frame.jpg',
    spanClass: 'lg:col-span-4 md:col-span-6',
  },
  {
    id: 'radha-krishna',
    name: 'Radha Krishna Collection',
    subtitle: 'Celestial Vrindavan flute harmonies and eternal unconditional devotion for joyful marital bliss.',
    badge: 'Divine Love & Harmony',
    href: '/category/radha-krishna',
    image: '/images/divine/radha-krishna.jpg',
    fallbackImage: '/images/wall-decor/categories/devotional/radha-krishna-category.jpg',
    spanClass: 'lg:col-span-4 md:col-span-6',
  },
  {
    id: 'lord-shiva',
    name: 'Lord Shiva Collection',
    subtitle: 'Meditative Adiyogi, Mahadev crescent moon and Shiv Parivar sacred wall panels for cosmic peace.',
    badge: 'Cosmic Meditation',
    href: '/category/lord-shiva-shiv-parivar',
    image: '/images/divine/adiyogi-shiva.jpg',
    fallbackImage: '/images/wall-decor/categories/devotional/shiva-category.jpg',
    spanClass: 'lg:col-span-4 md:col-span-6',
  },
  {
    id: 'lord-venkateswara',
    name: 'Lord Venkateswara Collection',
    subtitle: 'Divine Tirupati Balaji with Shanku, Chakra & Namam radiating timeless Vaikuntha abundance.',
    badge: 'Kaliyuga Varada',
    href: '/category/lord-venkateswara-balaji',
    image: '/images/divine/lord-balaji.jpg',
    fallbackImage: '/images/wall-decor/categories/devotional/balaji-category.jpg',
    spanClass: 'lg:col-span-4 md:col-span-6',
  },
  {
    id: 'goddess-lakshmi',
    name: 'Goddess Lakshmi Collection',
    subtitle: 'Ashta Lakshmi golden lotus motifs welcoming eternal prosperity, food security and domestic wealth.',
    badge: 'Ashta Vaibhavam',
    href: '/category/goddess-lakshmi',
    image: '/images/divine/maa-lakshmi.jpg',
    fallbackImage: '/images/wall-decor/categories/devotional/lakshmi-category.jpg',
    spanClass: 'lg:col-span-4 md:col-span-6',
  },
  {
    id: 'ganesha',
    name: 'Ganesha Collection',
    subtitle: 'Vighnaharta Ganesha removing stumbling blocks and welcoming auspicious Shubh-Labh beginnings.',
    badge: 'Obstacle Remover',
    href: '/category/lord-ganesha',
    image: '/images/divine/lord-ganesha.jpg',
    fallbackImage: '/images/wall-decor/categories/devotional/ganesha-category.jpg',
    spanClass: 'lg:col-span-4 md:col-span-6',
  },
  {
    id: 'ram-mandir',
    name: 'Ram Mandir & Shri Ram',
    subtitle: 'Grand Ayodhya Ram Janmabhoomi Darbar panels infusing righteousness, moral strength & peace.',
    badge: 'Ayodhya Ram Darbar',
    href: '/category/lord-rama',
    image: '/images/divine/ram-mandir.jpg',
    fallbackImage: '/images/wall-decor/categories/devotional/rama-category.jpg',
    spanClass: 'lg:col-span-6 md:col-span-6',
  },
  {
    id: 'hanuman',
    name: 'Lord Hanuman Chalisa',
    subtitle: 'Complete inscribed 40 chaupais with Sankat Mochan Hanuman providing fearless protection.',
    badge: 'Sankat Mochan',
    href: '/category/lord-hanuman',
    image: '/images/wall-decor/categories/devotional/hanuman-category.jpg',
    fallbackImage: '/images/wall-decor/categories/devotional/hanuman-category.jpg',
    spanClass: 'lg:col-span-6 md:col-span-12',
    hasLedBadge: true,
  },
  {
    id: 'glitter-photo-frames',
    name: 'Glitter Photo Frames',
    subtitle: 'Luminous sparkle and metallic glitter effects adding celebration radiance to special portraits.',
    badge: 'Luminous Sparkle',
    href: '/category/glitter-photo-frames',
    image: '/images/mockups/enchanted-liquid-gold-glitter-acrylic-photo-frame/primary-square.jpg',
    fallbackImage: '/images/products/prod-sparkling-diamond-glitter-frame/primary-square.jpg',
    spanClass: 'lg:col-span-6 md:col-span-6',
  },
  {
    id: 'rotating-photo-lamps',
    name: 'Rotating Photo Lamps',
    subtitle: 'Motorized 360-degree cylindrical lamps glowing warmly with multiple cherished photographs.',
    badge: '360° Motorized Warm LED',
    href: '/category/rotating-photo-lamps',
    image: '/images/mockups/motorized-360-rotating-led-cylinder-photo-lamp/primary-square.jpg',
    fallbackImage: '/images/products/prod-hexagonal-tower-rotating-lamp/primary-square.jpg',
    spanClass: 'lg:col-span-6 md:col-span-6',
    hasLedBadge: true,
  },
];

export default function CategoryShowcase() {
  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 lg:py-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 pb-4 border-b border-[#E8D5BD] gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-[#511B2A] bg-[#FFFFFF] border border-[#D6AA55] px-3.5 py-1 rounded-full shadow-2xs mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D6AA55]" />
            <span>Curated Sanctum Portfolios</span>
          </div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#511B2A] tracking-tight">
            EXPLORE THE WORLD OF DIVINE ART
          </h2>
          <p className="text-xs sm:text-sm text-[#533C36] mt-1.5 max-w-2xl font-sans leading-relaxed">
            Find the perfect expression of faith, devotion and timeless beauty. Handcrafted with museum-grade crystal acrylic and 24K gold foil embellishments.
          </p>
        </div>

        <Link
          href="/category"
          className="text-xs sm:text-sm font-bold text-[#511B2A] hover:text-[#D6AA55] flex items-center gap-2 group transition-colors shrink-0 uppercase tracking-wider"
        >
          <span>View All Categories</span>
          <ArrowRight className="w-4 h-4 text-[#D6AA55] group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Asymmetrical Editorial Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
        {EDITORIAL_CATEGORIES.map((cat) => {
          return (
            <Link
              key={cat.id}
              href={cat.href}
              className={`group relative rounded-3xl overflow-hidden bg-[#2A0E17] border border-[#E8D5BD] hover:border-[#D6AA55] shadow-sm hover:shadow-[0_16px_36px_rgba(81,27,42,0.22)] transition-all duration-500 flex flex-col justify-end min-h-[300px] sm:min-h-[340px] lg:min-h-[380px] p-5 sm:p-6 lg:p-7 ${cat.spanClass}`}
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#250912]/95 via-[#3D1420]/50 to-transparent transition-opacity duration-300" />

              {/* Subtle Golden Sheen on Hover */}
              <div className="absolute inset-0 bg-[#D6AA55]/0 group-hover:bg-[#D6AA55]/10 transition-colors duration-500 pointer-events-none" />

              {/* Top Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                {cat.badge && (
                  <span className="bg-[#511B2A]/90 text-[#FFF7EC] text-[11px] font-bold px-3 py-1 rounded-full border border-[#D6AA55]/60 shadow-md backdrop-blur-xs flex items-center gap-1.5">
                    {cat.hasLedBadge ? (
                      <Flame className="w-3.5 h-3.5 text-[#D6AA55] animate-pulse" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-[#D6AA55]" />
                    )}
                    <span>{cat.badge}</span>
                  </span>
                )}
              </div>

              {/* Bottom Content Area */}
              <div className="relative z-20 space-y-2">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#FFF7EC] group-hover:text-[#D6AA55] transition-colors leading-snug drop-shadow-sm">
                  {cat.name}
                </h3>

                <p className="text-xs sm:text-[13px] text-[#F9EFE0]/85 line-clamp-2 leading-relaxed font-sans max-w-xl">
                  {cat.subtitle}
                </p>

                {/* Explore Collection Link with Animated Gold Arrow */}
                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#D6AA55] group-hover:text-white uppercase tracking-wider transition-colors">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 text-[#D6AA55] group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>

              {/* Gold Accent Corner Border on Hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#D6AA55]/70 rounded-3xl transition-colors duration-500 pointer-events-none" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
