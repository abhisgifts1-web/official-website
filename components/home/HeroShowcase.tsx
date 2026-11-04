'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Check, Sparkles } from 'lucide-react';

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

export const HERO_DEITIES: HeroDeity[] = [
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
];

export default function HeroShowcase() {
  const featured = HERO_DEITIES[0];

  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-6 sm:pt-10 lg:pt-12 pb-8 sm:pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
        {/* =========================================================
            LEFT COLUMN: Headline, Description & Direct Action CTAs
            ========================================================= */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-5 sm:space-y-6">
          {/* Location & Studio Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-stone-700 bg-stone-100 border border-stone-200">
            <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span>Dilsukhnagar, Hyderabad • Direct Workshop Fabrication</span>
          </div>

          {/* Clean, Readable Heading */}
          <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-stone-900 tracking-tight leading-[1.15]">
            Premium Custom Photo Frames in Hyderabad
          </h1>

          {/* Concise Description */}
          <p className="text-sm sm:text-base text-stone-600 max-w-xl font-sans leading-relaxed">
            Discover beautifully crafted acrylic, LED and customized photo frames designed to make your memories unforgettable.
          </p>

          {/* Two Clear CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-stone-900 hover:bg-black text-white font-semibold text-xs sm:text-sm transition-all shadow-sm group"
            >
              <span>Explore Collections</span>
              <ArrowRight className="w-4 h-4 text-stone-300 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/customise"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white hover:bg-stone-50 text-stone-900 font-semibold text-xs sm:text-sm border border-stone-300 transition-colors shadow-2xs"
            >
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Customize Your Frame</span>
            </Link>
          </div>

          {/* Essential Trust Indicators */}
          <div className="pt-3 sm:pt-4 border-t border-stone-100 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-stone-600 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 stroke-[2.5]" />
              </span>
              <span>Ultra-Clear Cast Acrylic</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 stroke-[2.5]" />
              </span>
              <span>Handcrafted in Hyderabad</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 stroke-[2.5]" />
              </span>
              <span>Safe Doorstep Delivery</span>
            </div>
          </div>
        </div>

        {/* =========================================================
            RIGHT COLUMN: One Featured Product Showcase Image with Simple Frame
            ========================================================= */}
        <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end">
          <div className="w-full max-w-md sm:max-w-lg bg-stone-50 p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-stone-200 shadow-sm">
            <Link
              href={`/product/${featured.slug}`}
              className="group block relative rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-stone-200"
            >
              {/* Product Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                <Image
                  src={featured.image}
                  alt={featured.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
                  className="object-cover transition-transform duration-500 group-hover:scale-103"
                />
              </div>

              {/* Product Info Bar */}
              <div className="p-3.5 sm:p-4 bg-white flex items-center justify-between gap-3 border-t border-stone-100">
                <div>
                  <h2 className="font-serif font-bold text-sm sm:text-base text-stone-900 group-hover:text-amber-800 transition-colors">
                    {featured.name}
                  </h2>
                  <p className="text-xs text-stone-500 font-sans mt-0.5">
                    Flagship 3D Gold Heirloom • Warm Ambient LED
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs text-stone-400 line-through block">{featured.originalPrice}</span>
                  <span className="font-bold text-sm sm:text-base text-stone-900">{featured.price}</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
