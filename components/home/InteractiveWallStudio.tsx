'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  Sun,
  Moon,
  Ruler,
  Palette,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Check,
  Zap,
} from 'lucide-react';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

interface ArtworkOption {
  id: string;
  title: string;
  tag: string;
  slug: string;
  image: string;
  ledHaloColor: string; // CSS color for glow
  aspectRatio: string; // e.g. 'aspect-4/3' | 'aspect-3/4' | 'aspect-square'
  description: string;
  finish: string;
}

interface SizeOption {
  sqft: string;
  dimensions: string;
  scalePercent: number; // For CSS scaling relative to wall
  price: string;
  mrp: string;
  bestFor: string;
}

interface WallColorOption {
  id: string;
  name: string;
  hex: string;
  textColor: string;
  isDark: boolean;
}

const ARTWORKS: ArtworkOption[] = [
  {
    id: 'led-backlit',
    title: 'Custom LED Backlit Night-Glow Frame',
    tag: 'Signature Ambient LED',
    slug: 'custom-led-backlit-acrylic-photo-frame',
    image: '/images/mockups/custom-led-backlit-acrylic-photo-frame/primary-square.jpg',
    ledHaloColor: 'rgba(254, 232, 21, 0.45)',
    aspectRatio: 'aspect-4/3',
    description: 'Precision perimeter LED lightguide with Cool White halo glow, external adapter, and 5MM virgin cast acrylic.',
    finish: '5MM Cast Acrylic + Cool White Perimeter LED',
  },
  {
    id: 'balaji-led',
    title: 'Tirupati Balaji 3D LED Divine Wall Art',
    tag: 'Sacred Sanctum Masterpiece',
    slug: 'tirupati-balaji-divine-led-backlit-acrylic-wall-art',
    image: '/images/mockups/tirupati-balaji-divine-led-backlit-acrylic-wall-art/primary-square.jpg',
    ledHaloColor: 'rgba(245, 158, 11, 0.55)',
    aspectRatio: 'aspect-3/4',
    description: 'Golden divine sanctum contour with luminous warm ambient backlighting designed for pooja rooms and grand foyers.',
    finish: 'Multi-Layer Gold Acrylic + Luminous Sanctum Halo',
  },
  {
    id: 'wedding-keepsake',
    title: 'Custom Couple Wedding Vows Keepsake Frame',
    tag: 'Anniversary & Couple',
    slug: 'custom-couple-wedding-vows-acrylic-keepsake-frame',
    image: '/images/mockups/custom-couple-wedding-vows-acrylic-keepsake-frame/primary-square.jpg',
    ledHaloColor: 'rgba(255, 235, 180, 0.4)',
    aspectRatio: 'aspect-3/4',
    description: 'Diamond-beveled crystal acrylic with 1200 DPI archival UV ink and stainless-steel wall standoff studs.',
    finish: '5MM Diamond-Beveled Crystal Cast Acrylic',
  },
  {
    id: 'family-heirloom',
    title: 'Personalized Family Heirloom Gold Script Frame',
    tag: 'Grand Wall Statement',
    slug: 'personalized-family-heirloom-gold-script-acrylic-frame',
    image: '/images/mockups/personalized-family-heirloom-gold-script-acrylic-frame/primary-square.jpg',
    ledHaloColor: 'rgba(245, 158, 11, 0.35)',
    aspectRatio: 'aspect-4/3',
    description: 'Architectural scale wall piece featuring 24K gold foil script accents and high-definition clarity.',
    finish: 'Cast Acrylic Shield + 24K Gold Script Foil',
  },
  {
    id: 'liquid-glitter',
    title: 'Enchanted Liquid Gold Shimmer Glitter Frame',
    tag: 'Floating Glitter Shimmer',
    slug: 'enchanted-liquid-gold-glitter-acrylic-photo-frame',
    image: '/images/mockups/enchanted-liquid-gold-glitter-acrylic-photo-frame/primary-square.jpg',
    ledHaloColor: 'rgba(251, 191, 36, 0.45)',
    aspectRatio: 'aspect-square',
    description: 'Interactive suspended metallic gold flakes that gently shimmer under living room spotlighting.',
    finish: 'Liquid Gold Suspension + Crystal Clear Acrylic',
  },
];

const SIZES: SizeOption[] = [
  {
    sqft: '1.0 sq.ft',
    dimensions: '10" × 14"',
    scalePercent: 65,
    price: '₹2,499',
    mrp: '₹4,999',
    bestFor: 'Bedside console, work desk, or entryway nook',
  },
  {
    sqft: '1.5 sq.ft',
    dimensions: '12" × 18"',
    scalePercent: 78,
    price: '₹3,449',
    mrp: '₹6,799',
    bestFor: 'Bedroom wall, hallway gallery, or pooja corner',
  },
  {
    sqft: '1.9 sq.ft',
    dimensions: '14" × 20"',
    scalePercent: 88,
    price: '₹4,199',
    mrp: '₹7,999',
    bestFor: 'Living room side wall or dining credenza',
  },
  {
    sqft: '3.3 sq.ft',
    dimensions: '18" × 26"',
    scalePercent: 100,
    price: '₹5,173',
    mrp: '₹9,998',
    bestFor: 'Centered above a 3-seater sofa or queen bed',
  },
  {
    sqft: '6.0 sq.ft',
    dimensions: '24" × 36"',
    scalePercent: 118,
    price: '₹7,747',
    mrp: '₹14,997',
    bestFor: 'Pooja mandir sanctum wall or grand living room',
  },
  {
    sqft: '9.8 sq.ft',
    dimensions: '30" × 47"',
    scalePercent: 135,
    price: '₹11,499',
    mrp: '₹22,999',
    bestFor: 'Double-height foyer, villa living room, or corporate office',
  },
];

const WALL_COLORS: WallColorOption[] = [
  {
    id: 'linen',
    name: 'Warm Linen',
    hex: '#F4EFEA',
    textColor: '#1C1917',
    isDark: false,
  },
  {
    id: 'sage',
    name: 'Muted Sage',
    hex: '#4A5B4E',
    textColor: '#FFFFFF',
    isDark: true,
  },
  {
    id: 'navy',
    name: 'Midnight Navy',
    hex: '#1E293B',
    textColor: '#FFFFFF',
    isDark: true,
  },
  {
    id: 'charcoal',
    name: 'Smoky Slate',
    hex: '#334155',
    textColor: '#FFFFFF',
    isDark: true,
  },
  {
    id: 'terracotta',
    name: 'Mandir Ochre',
    hex: '#78350F',
    textColor: '#FFFFFF',
    isDark: true,
  },
];

export default function InteractiveWallStudio() {
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkOption>(ARTWORKS[0]);
  const [selectedSize, setSelectedSize] = useState<SizeOption>(SIZES[3]); // Default 3.3 sq.ft
  const [selectedWallColor, setSelectedWallColor] = useState<WallColorOption>(WALL_COLORS[0]);
  const [isNightGlowMode, setIsNightGlowMode] = useState<boolean>(true); // Default with glow ON to showcase LED

  const cleanWaNumber = (INITIAL_SETTINGS.whatsappNumber || '919032372782').replace(/[^0-9]/g, '');

  const getWaInquiryUrl = () => {
    const text = `Hello Abhi's Gifts, I was testing the Interactive Wall Visualizer for "${selectedArtwork.title}". I am interested in ${selectedSize.sqft} (${selectedSize.dimensions}) on a ${selectedWallColor.name} wall. Can you share pricing and custom preview details?`;
    return `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12">
      <div className="bg-gradient-to-b from-stone-50 via-amber-50/20 to-stone-50 rounded-3xl p-6 sm:p-10 lg:p-12 border border-stone-200/90 shadow-xs relative overflow-hidden">
        {/* Subtle Ambient Decorative Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-amber-900 bg-amber-100/80 border border-amber-300/70 shadow-2xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>INTERACTIVE WALL &amp; SIZE VISUALIZER</span>
          </div>

          <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-900 tracking-tight leading-tight">
            See How Your Frame Fits on Your{' '}
            <span className="text-amber-800 italic underline decoration-amber-300 decoration-wavy underline-offset-4">
              Real Wall
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 mt-2.5 font-sans leading-relaxed max-w-xl mx-auto">
            Test true-to-scale calibrated sizes in <strong className="text-stone-800">sq.ft</strong>, match your interior paint color, and toggle day vs. evening ambient LED backlighting in real time.
          </p>
        </div>

        {/* Main Interactive Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          {/* Left Column (7 cols): The Live Wall Canvas */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {/* The Wall Canvas Container */}
            <div
              className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-stone-300 transition-colors duration-700 aspect-16/11 sm:aspect-16/10 flex flex-col justify-between p-6 sm:p-8"
              style={{
                backgroundColor: isNightGlowMode
                  ? selectedWallColor.isDark
                    ? '#0B111D'
                    : '#1F242D'
                  : selectedWallColor.hex,
              }}
            >
              {/* Room Lighting & Ambiance Controls Overlay (Top) */}
              <div className="flex items-center justify-between z-20">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium border border-white/10 shadow-xs">
                  <Palette className="w-3 h-3 text-amber-400" />
                  <span>Wall: {selectedWallColor.name}</span>
                </div>

                {/* Day / Night Glow Switcher */}
                <div className="inline-flex items-center p-0.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 shadow-xs">
                  <button
                    type="button"
                    onClick={() => setIsNightGlowMode(false)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                      !isNightGlowMode
                        ? 'bg-amber-400 text-stone-950 shadow-2xs'
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    <Sun className="w-3 h-3" />
                    <span>Daylight</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsNightGlowMode(true)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                      isNightGlowMode
                        ? 'bg-amber-400 text-stone-950 shadow-2xs'
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    <Moon className="w-3 h-3" />
                    <span>Night Glow</span>
                  </button>
                </div>
              </div>

              {/* Centered Wall Frame Display */}
              <div className="relative flex-1 flex items-center justify-center py-4 my-auto z-10">
                {/* Dynamically Scaled Frame Wrapper */}
                <div
                  className="relative transition-all duration-500 ease-out flex items-center justify-center"
                  style={{
                    transform: `scale(${selectedSize.scalePercent / 100})`,
                    maxWidth: '85%',
                    maxHeight: '78%',
                  }}
                >
                  {/* Glowing LED Halo Aura behind Frame when Night Glow is active */}
                  {isNightGlowMode && (
                    <div
                      className="absolute -inset-6 rounded-2xl blur-xl transition-opacity duration-700 pointer-events-none animate-pulse"
                      style={{
                        backgroundColor: selectedArtwork.ledHaloColor,
                        opacity: 0.85,
                      }}
                    />
                  )}

                  {/* Cast Acrylic Frame Card with Standoff Studs & Diamond Edge Reflections */}
                  <div className="relative rounded-xl overflow-hidden bg-white shadow-2xl border-4 border-white/80 ring-1 ring-black/20 group">
                    {/* The Artwork Photo */}
                    <div className="relative w-52 sm:w-64 md:w-72 aspect-square overflow-hidden bg-stone-900">
                      <Image
                        src={selectedArtwork.image}
                        alt={selectedArtwork.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 300px, 400px"
                        priority
                      />

                      {/* Acrylic Glass Surface Glare / Sheen effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/15 to-transparent pointer-events-none" />

                      {/* 4 Stainless-Steel Wall Standoff Corner Studs */}
                      <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-gradient-to-br from-stone-200 via-stone-400 to-stone-600 border border-stone-300 shadow-sm" />
                      <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-gradient-to-br from-stone-200 via-stone-400 to-stone-600 border border-stone-300 shadow-sm" />
                      <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-gradient-to-br from-stone-200 via-stone-400 to-stone-600 border border-stone-300 shadow-sm" />
                      <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-gradient-to-br from-stone-200 via-stone-400 to-stone-600 border border-stone-300 shadow-sm" />
                    </div>

                    {/* Frame Dimensions Badge on the Frame */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-bold text-[#FEE815] shadow-xs pointer-events-none whitespace-nowrap">
                      {selectedSize.sqft} ({selectedSize.dimensions})
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Room Furniture Reference (Stylized Console & Plant) */}
              <div className="relative z-10 pt-2 border-t border-black/10 flex items-center justify-between text-[11px]">
                <div
                  className={`flex items-center gap-2 transition-colors ${
                    isNightGlowMode || selectedWallColor.isDark ? 'text-stone-300' : 'text-stone-700'
                  }`}
                >
                  <Ruler className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    Scale: <strong>{selectedSize.sqft}</strong> calibrated relative to a 6-foot wall
                  </span>
                </div>

                <div
                  className={`hidden sm:flex items-center gap-1 font-medium transition-colors ${
                    isNightGlowMode || selectedWallColor.isDark ? 'text-amber-300' : 'text-amber-800'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>5MM Virgin Cast Acrylic</span>
                </div>
              </div>
            </div>

            {/* Interactive Wall Color Selector Bar */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-amber-700" />
                <span>Test Interior Wall Paint:</span>
              </span>

              <div className="flex items-center gap-2">
                {WALL_COLORS.map((color) => {
                  const isSelected = selectedWallColor.id === color.id;
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setSelectedWallColor(color)}
                      className={`relative w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center shadow-xs ${
                        isSelected
                          ? 'border-amber-500 ring-2 ring-amber-400/50 scale-105'
                          : 'border-stone-300 hover:border-stone-400'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                      aria-label={`Select ${color.name} wall color`}
                    >
                      {isSelected && (
                        <Check
                          className="w-4 h-4"
                          style={{ color: color.isDark ? '#FEE815' : '#1C1917' }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Interactive Artwork & Size Configuration */}
          <div className="lg:col-span-5 flex flex-col space-y-5">
            {/* 1. Artwork Selection Tabs */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  1. Select Frame Design
                </h3>
                <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  {selectedArtwork.tag}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2 max-h-[190px] overflow-y-auto pr-1">
                {ARTWORKS.map((art) => {
                  const isSelected = selectedArtwork.id === art.id;
                  return (
                    <button
                      key={art.id}
                      type="button"
                      onClick={() => setSelectedArtwork(art)}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'bg-amber-50/80 border-amber-400 shadow-xs'
                          : 'bg-white hover:bg-stone-50 border-stone-200'
                      }`}
                    >
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-stone-200 bg-stone-100">
                        <Image
                          src={art.image}
                          alt={art.title}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-stone-900 truncate">{art.title}</p>
                        <p className="text-[10px] text-stone-500 truncate">{art.finish}</p>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[#FEE815] text-stone-950 flex items-center justify-center shrink-0 shadow-2xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Calibrated Size Options in sq.ft */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  2. Pick Calibrated Size (sq.ft)
                </h3>
                <span className="text-xs font-serif font-bold text-amber-900">
                  {selectedSize.sqft} ({selectedSize.dimensions})
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {SIZES.map((size) => {
                  const isSelected = selectedSize.sqft === size.sqft;
                  return (
                    <button
                      key={size.sqft}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'bg-stone-900 text-white border-stone-900 shadow-xs scale-102'
                          : 'bg-stone-50 hover:bg-white text-stone-700 border-stone-200 hover:border-amber-300'
                      }`}
                    >
                      <p className={`text-xs font-bold ${isSelected ? 'text-[#FEE815]' : 'text-stone-900'}`}>
                        {size.sqft}
                      </p>
                      <p className={`text-[10px] ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                        {size.dimensions}
                      </p>
                      <p className={`text-[11px] font-semibold mt-1 ${isSelected ? 'text-white' : 'text-amber-800'}`}>
                        {size.price}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Placement Advice Callout */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900">Placement Guide:</strong> {selectedSize.bestFor}. Mounting hardware (wall plugs and screws) included in every package.
                </div>
              </div>
            </div>

            {/* 3. Live Price & Direct Action Launchers */}
            <div className="bg-gradient-to-br from-amber-50/80 to-white rounded-2xl p-5 border border-amber-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-stone-500">
                    Workshop Price ({selectedSize.sqft})
                  </p>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-serif font-bold text-2xl text-stone-950">
                      {selectedSize.price}
                    </span>
                    <span className="text-xs text-stone-400 line-through">
                      {selectedSize.mrp}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      50% OFF
                    </span>
                  </div>
                </div>

                <div className="text-right text-[11px] text-stone-500">
                  <span className="inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                    In Stock • Ready to Craft
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  href={`/product/${selectedArtwork.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#FEE815] hover:bg-[#FFF04B] text-black font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-102"
                >
                  <span>Shop {selectedArtwork.title} ({selectedSize.sqft})</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </Link>

                <a
                  href={getWaInquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 font-semibold text-xs shadow-2xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Enquire This Size on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
