'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Category } from '@/types';
import { getProductSlugForCategory, getViewProductLabel } from '@/lib/data/categoryProductMapping';

interface CategoryCardProps {
  category: Category;
  priority?: boolean;
}

export default function CategoryCard({ category, priority = false }: CategoryCardProps) {
  const [imgError, setImgError] = useState(false);

  // Group label and icon
  const getGroupBadge = () => {
    switch (category.group) {
      case 'god-wall-art':
        return { label: 'God Wall Art', icon: '🔱' };
      case 'led-backlight':
        return { label: 'LED Backlit', icon: '✨' };
      case 'custom-frames':
        return { label: 'Custom Photo', icon: '📸' };
      case 'abstract-wall-art':
      default:
        return { label: 'Abstract Art', icon: '🎨' };
    }
  };

  const isBacklight = category.lightingType === 'backlight' || category.group === 'led-backlight';
  const productSlug = getProductSlugForCategory(category.slug);
  const buttonLabel = getViewProductLabel(category.name);

  return (
    <Link
      href={`/product/${productSlug}`}
      prefetch={true}
      className="group relative flex flex-col justify-between bg-white rounded-3xl p-3 sm:p-3.5 border border-stone-200 hover:border-[#EAB308] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#EAB308] outline-none"
      aria-label={`View ${category.name} product details`}
    >
      {/* Framed Acrylic Art Viewport (100% Unobscured Artwork) */}
      <div className="relative aspect-[4/3.6] w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 group-hover:border-[#EAB308]/80 transition-all duration-300 shadow-inner">
        {/* Background Artwork */}
        {!imgError ? (
          <img
            src={category.image}
            alt={`${category.name} — Premium Acrylic Wall Art`}
            loading={priority ? 'eager' : 'lazy'}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
          />
        ) : (
          <div className="w-full h-full bg-stone-100 flex flex-col items-center justify-center p-6 text-center">
            <Sparkles className="w-10 h-10 text-amber-500 mb-2 animate-pulse" />
            <span className="font-serif font-bold text-stone-900 text-sm">{category.name}</span>
            <span className="text-[11px] text-amber-700 mt-1">Abhi Gifts Exclusive</span>
          </div>
        )}

        {/* Acrylic Glass Gloss Reflection Sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Floating Jewel Badges */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-1.5 z-10 pointer-events-none">
          <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-sm backdrop-blur-md ${
            isBacklight
              ? 'bg-amber-950/90 text-amber-300 border-amber-500/50'
              : 'bg-white/95 text-stone-800 border-stone-200'
          }`}>
            <span>{isBacklight ? '✨ LED Backlit' : '🖼️ Normal Acrylic'}</span>
          </span>

          {/* Real Design Count badge */}
          {category.itemCount && category.itemCount > 0 ? (
            <span className="text-[10px] font-bold bg-stone-900/85 backdrop-blur-md text-amber-300 px-2.5 py-1 rounded-full border border-amber-500/30 shadow-sm flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
              <span>{category.itemCount} {category.itemCount === 1 ? 'Design' : 'Designs'}</span>
            </span>
          ) : null}
        </div>
      </div>

      {/* Dedicated Gallery Info Plaque (100% High-Contrast, Crystal Clear Typography) */}
      <div className="pt-3.5 flex flex-col justify-between flex-1">
        <div>
          {/* Gold Foil Accent Line */}
          <div className="h-[2px] w-10 bg-gradient-to-r from-[#EAB308] via-amber-200 to-[#EAB308] rounded-full mb-2 group-hover:w-full transition-all duration-500" />

          {/* Deity / Collection Title */}
          <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1">
            {category.name}
          </h3>

          {/* Curated Description */}
          <p className="text-xs text-stone-600 line-clamp-2 mt-1.5 leading-relaxed font-sans min-h-[2.25rem]">
            {category.description}
          </p>
        </div>

        {/* Attractive Interactive CTA Button */}
        <div className="mt-3.5 w-full py-2.5 px-3.5 rounded-xl bg-stone-900 group-hover:bg-[#EAB308] text-white group-hover:text-stone-950 text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-xs group-hover:shadow-md border border-stone-800 group-hover:border-amber-400">
          <span>{buttonLabel}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-amber-400 group-hover:text-stone-950" />
        </div>
      </div>
    </Link>
  );
}
