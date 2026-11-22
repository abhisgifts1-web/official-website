'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Gift,
  Heart,
  Sparkles,
  Cake,
  Home,
  Baby,
  Flame,
  ArrowRight,
} from 'lucide-react';

interface OccasionCard {
  id: string;
  title: string;
  tagline: string;
  href: string;
  image: string;
  badge: string;
  startingPrice: string;
  icon: React.ElementType;
}

const OCCASIONS: OccasionCard[] = [
  {
    id: 'birthday',
    title: 'Birthday Gifts',
    tagline: 'Vibrant acrylic photo memories with floating shimmer depth',
    href: '/shop?category=acrylic-photo-frames',
    image: '/images/categories/circle-showcase/acrylic-photo-frames-full.jpg',
    badge: 'Popular for Birthdays',
    startingPrice: '₹1,499',
    icon: Cake,
  },
  {
    id: 'anniversary',
    title: 'Anniversary Gifts',
    tagline: 'Timeless couple portraits with radiant diamond-beveled edges',
    href: '/shop?category=acrylic-photo-frames',
    image: '/images/categories/circle-showcase/couple-wedding-full.jpg',
    badge: 'Romantic Milestone',
    startingPrice: '₹2,499',
    icon: Heart,
  },
  {
    id: 'wedding',
    title: 'Wedding Gifts',
    tagline: 'Grand vows and wedding ceremony portraits encased in crystal acrylic',
    href: '/shop?category=acrylic-photo-frames',
    image: '/images/mockups/custom-couple-wedding-vows-acrylic-keepsake-frame/primary-square.jpg',
    badge: 'Luxury Heirloom',
    startingPrice: '₹3,449',
    icon: Sparkles,
  },
  {
    id: 'housewarming',
    title: 'Housewarming Gifts',
    tagline: 'Illuminated sacred Balaji and auspicious mandir wall decor',
    href: '/shop?category=god-photo-frames',
    image: '/images/mockups/tirupati-balaji-divine-led-backlit-acrylic-wall-art/primary-square.jpg',
    badge: 'Gruhapravesam',
    startingPrice: '₹3,449',
    icon: Home,
  },
  {
    id: 'baby',
    title: 'Baby & Family Gifts',
    tagline: 'First smiles, baby milestones, and heartwarming family memories',
    href: '/shop?category=family-baby-frames',
    image: '/images/categories/circle-showcase/family-baby-full.jpg',
    badge: 'Cherished Moments',
    startingPrice: '₹1,499',
    icon: Baby,
  },
  {
    id: 'festival',
    title: 'Festival & Divine Gifts',
    tagline: 'Sacred deity art crafted with luminous warm LED halo sanctum glow',
    href: '/shop?category=god-photo-frames',
    image: '/images/categories/circle-showcase/god-photo-frames.jpg',
    badge: 'Devotional Sacred',
    startingPrice: '₹2,999',
    icon: Flame,
  },
  {
    id: 'personalized',
    title: 'Custom Personalized Gifts',
    tagline: 'Upload your cherished photograph for 1:1 Hyderabad artisan crafting',
    href: '/customise',
    image: '/images/categories/circle-showcase/personalized-gifts-full.jpg',
    badge: '1:1 WhatsApp Proof',
    startingPrice: '₹1,999',
    icon: Gift,
  },
];

export default function GiftByOccasionSection() {
  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 pb-4 border-b border-stone-200 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-amber-900 bg-amber-100/80 border border-amber-300/70 shadow-2xs mb-2">
            <Gift className="w-3.5 h-3.5 text-amber-700" />
            <span>Curated Gifting Guide</span>
          </div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-900 tracking-tight">
            Find the Perfect Gift by Occasion
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1.5 font-sans max-w-xl">
            Thoughtfully crafted crystal acrylic and LED illuminated keepsakes tailored for life&apos;s most memorable moments.
          </p>
        </div>

        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-900 hover:text-amber-800 transition-colors group self-start md:self-end"
        >
          <span>Explore All Gifts</span>
          <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Occasions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
        {OCCASIONS.map((item, index) => {
          const Icon = item.icon;
          const isFeatured = index === 0 || index === 6;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`group relative rounded-2xl overflow-hidden bg-white border border-stone-200/90 shadow-2xs hover:shadow-xl hover:border-amber-400/80 transition-all duration-300 flex flex-col justify-between ${
                isFeatured ? 'sm:col-span-2 lg:col-span-1 xl:col-span-1' : ''
              }`}
            >
              {/* Image Aspect Box */}
              <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-108"
                />

                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/95 text-stone-900 backdrop-blur-md shadow-xs border border-white/60">
                    <Icon className="w-3 h-3 text-amber-700" />
                    <span>{item.badge}</span>
                  </span>
                </div>

                {/* Bottom Starting Price Overlay */}
                <div className="absolute bottom-3 right-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FEE815] text-stone-950 shadow-xs">
                    Starts {item.startingPrice}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 group-hover:text-amber-900 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 font-sans line-clamp-2 leading-relaxed">
                    {item.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-amber-900 group-hover:text-amber-800">
                  <span>Shop Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
