'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  Sun,
  Moon,
  Ruler,
  Layers,
  CheckCircle2,
  SlidersHorizontal,
  UploadCloud,
  MessageCircle,
} from 'lucide-react';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

type ViewMode = 'before-after' | 'day-night';

interface FrameSizeSpec {
  sqft: string;
  dimensions: string;
  idealFor: string;
  price: string;
}

const FRAME_SIZES: FrameSizeSpec[] = [
  { sqft: '1.0 sq.ft', dimensions: '10" × 14"', idealFor: 'Bedside console or desk', price: '₹2,499' },
  { sqft: '1.5 sq.ft', dimensions: '12" × 18"', idealFor: 'Bedroom wall or pooja nook', price: '₹3,449' },
  { sqft: '3.3 sq.ft', dimensions: '18" × 26"', idealFor: 'Living room above 3-seater sofa', price: '₹5,173' },
  { sqft: '6.0 sq.ft', dimensions: '24" × 36"', idealFor: 'Grand gallery feature wall', price: '₹7,747' },
];

export default function BeforeAfterCraftSection() {
  const [viewMode, setViewMode] = useState<ViewMode>('before-after');
  const [selectedSize, setSelectedSize] = useState<FrameSizeSpec>(FRAME_SIZES[2]); // Default 3.3 sq.ft
  const [sliderPosition, setSliderPosition] = useState<number>(50); // Percent

  const cleanWaNumber = (INITIAL_SETTINGS.whatsappNumber || '919032372782').replace(/[^0-9]/g, '');

  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12">
      <div className="bg-gradient-to-b from-stone-50 via-amber-50/25 to-stone-50 rounded-3xl p-6 sm:p-10 lg:p-12 border border-stone-200/90 shadow-xs relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-amber-900 bg-amber-100/80 border border-amber-300/70 shadow-2xs mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive Customization Craft</span>
          </div>

          <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-900 tracking-tight">
            Your Cherished Memories,{' '}
            <span className="text-amber-800 italic underline decoration-amber-300 decoration-wavy underline-offset-4">
              Our Master Craft
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 mt-2 font-sans max-w-xl mx-auto leading-relaxed">
            See the transformative difference when your mobile photograph is color-calibrated at 1200 DPI, diamond-beveled on 5MM crystal acrylic, and illuminated with our Cool White LED halo.
          </p>

          {/* Interactive Mode Pills */}
          <div className="mt-5 inline-flex items-center p-1 bg-white rounded-full border border-stone-200 shadow-2xs">
            <button
              type="button"
              onClick={() => setViewMode('before-after')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                viewMode === 'before-after'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
              <span>Original Photo vs. 5MM Acrylic Masterpiece</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('day-night')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                viewMode === 'day-night'
                  ? 'bg-amber-400 text-stone-950 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-stone-900" />
              <span>Daylight vs. Night LED Glow Preview</span>
            </button>
          </div>
        </div>

        {/* Comparison Showcase Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left: Interactive Visual Comparison (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full aspect-16/11 sm:aspect-16/10 rounded-2xl overflow-hidden bg-stone-900 shadow-xl border-4 border-white select-none">
              {viewMode === 'before-after' ? (
                <>
                  {/* Right side: Finished 5MM Acrylic Masterpiece */}
                  <div className="absolute inset-0">
                    <Image
                      src="/images/mockups/custom-couple-wedding-vows-acrylic-keepsake-frame/mockup-living-room.jpg"
                      alt="Finished 5MM Crystal Acrylic Frame on Living Room Wall"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority
                    />
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-[#FEE815] text-stone-950 shadow-md">
                      ✨ 5MM Diamond Acrylic Reveal
                    </div>
                  </div>

                  {/* Left side: Original Raw Photo (clipped by slider) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <div className="relative w-full h-full min-w-full">
                      <Image
                        src="/images/categories/circle-showcase/couple-wedding-full.jpg"
                        alt="Original Raw Photograph"
                        fill
                        className="object-cover object-left"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                    </div>
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-black/75 text-white backdrop-blur-md shadow-md border border-white/20">
                      📷 Original Uploaded Photo
                    </div>
                  </div>

                  {/* Interactive Draggable / Slider Divider */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-ew-resize flex items-center justify-center"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-white text-stone-900 shadow-lg border border-stone-300 flex items-center justify-center text-xs font-bold -ml-3.5 cursor-pointer hover:scale-110 transition-transform">
                      ⇄
                    </div>
                  </div>

                  {/* Hidden range input covering container for smooth scrubbing */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                    aria-label="Drag before and after comparison"
                  />
                </>
              ) : (
                <>
                  {/* Day vs Night LED Preview */}
                  <div className="relative w-full h-full bg-stone-950">
                    <Image
                      src="/images/atelier/room-living.jpg"
                      alt="Cool White LED Ambient Halo Glow in Dimmed Living Room"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />

                    {/* Ambient Glow Aura */}
                    <div className="absolute inset-0 bg-radial from-amber-400/20 via-transparent to-black/40 pointer-events-none" />

                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-stone-900/90 text-amber-300 shadow-md border border-amber-400/40 flex items-center gap-1.5">
                      <Moon className="w-3.5 h-3.5 text-amber-400" />
                      <span>Cool White Perimeter LED Halo Glow (ON)</span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md rounded-xl p-3 border border-white/10 text-white text-xs flex items-center justify-between">
                      <span className="font-medium text-stone-200">
                        Concealed Perimeter Lightguide with external 12V 2A power adapter included
                      </span>
                      <span className="font-bold text-[#FEE815]">Zero Flicker</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <p className="text-[11px] text-stone-500 mt-2 font-sans flex items-center gap-1">
              <span>💡 Tip:</span> Drag the divider horizontally to compare the mobile snapshot with the final crystal frame.
            </p>
          </div>

          {/* Right: Craft Specifications & Size Selector (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* 3 Craft Pillars */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                Why Abhi&apos;s Gifts Custom Frames Excel:
              </h3>

              <div className="space-y-2.5 text-xs text-stone-700">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-stone-900">1200 DPI Contrast Boost:</strong> Our Hyderabad designers manually optimize shadows, brightness, and skin tones before printing.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-stone-900">5MM Cast Virgin Acrylic:</strong> Never yellowing, shatterproof, and finished with optical diamond-beveled borders.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-stone-900">Free 1:1 WhatsApp Proof:</strong> We message you an exact digital proof before any laser cutting begins.
                  </div>
                </div>
              </div>
            </div>

            {/* Size Preview Selector */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  Select Calibrated Size (sq.ft)
                </span>
                <span className="text-xs font-serif font-bold text-amber-900">
                  {selectedSize.sqft} ({selectedSize.dimensions})
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {FRAME_SIZES.map((sz) => {
                  const isSelected = selectedSize.sqft === sz.sqft;
                  return (
                    <button
                      key={sz.sqft}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                          : 'bg-stone-50 hover:bg-white text-stone-700 border-stone-200 hover:border-amber-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${isSelected ? 'text-[#FEE815]' : 'text-stone-900'}`}>
                          {sz.sqft}
                        </span>
                        <span className={`text-[10px] font-semibold ${isSelected ? 'text-stone-300' : 'text-amber-800'}`}>
                          {sz.price}
                        </span>
                      </div>
                      <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-stone-400' : 'text-stone-500'}`}>
                        {sz.dimensions}
                      </p>
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] text-stone-500 font-sans">
                💡 Recommended placement: <strong>{selectedSize.idealFor}</strong>.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-1">
              <Link
                href="/customise"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#FEE815] hover:bg-[#FFF04B] text-black font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-102"
              >
                <UploadCloud className="w-4 h-4 text-black" />
                <span>Create Your Custom Frame ({selectedSize.sqft})</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </Link>

              <a
                href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
                  `Hello Abhi's Gifts, I want to create a custom photo frame in ${selectedSize.sqft} (${selectedSize.dimensions}). Please share proof guidelines.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 font-semibold text-xs shadow-2xs transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Get Free 1:1 Design Proof on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
