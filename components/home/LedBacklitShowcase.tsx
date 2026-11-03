'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Flame,
  Zap,
  ShieldCheck,
  ArrowRight,
  Power,
  Sparkles,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

interface ArtItem {
  id: string;
  name: string;
  tagline: string;
  image: string;
  slug: string;
}

const ARTWORKS: ArtItem[] = [
  {
    id: 'ganesha',
    name: 'Lord Ganesha Vighnaharta',
    tagline: 'Auspicious Remover of Obstacles with 3000K Golden Halo Radiance',
    image: '/images/wall-decor/categories/led-backlight/ganesha-led-category.jpg',
    slug: 'lord-ganesha-vighnaharta-divine-led-backlit-acrylic-art',
  },
  {
    id: 'om-swastik',
    name: 'Om & Swastik Diptych',
    tagline: 'Twin Sacred Auspicious Panels with Warm 3000K Perimeter Halo',
    image: '/images/wall-decor/products/led/om-swastik-diptych-pair.jpg',
    slug: 'sacred-om-swastik-divine-acrylic-diptych-set-of-2',
  },
  {
    id: 'hanuman',
    name: 'Shri Hanuman Chalisa',
    tagline: 'Complete 40 Chaupais Inscribed with Amber Sanctum Backlight',
    image: '/images/wall-decor/products/led/hanuman-chalisa-led-frame.jpg',
    slug: 'shri-hanuman-chalisa-full-inscribed-led-acrylic-frame',
  },
  {
    id: 'celestial',
    name: 'Celestial Horizon',
    tagline: 'Golden Lunar Eclipse & Horizon Glow for Modern Living Walls',
    image: '/images/wall-decor/products/led/modern-celestial-horizon.jpg',
    slug: 'modern-illuminated-celestial-horizon-acrylic-art',
  },
  {
    id: 'balaji',
    name: 'Divine Tirupati Balaji',
    tagline: '3D Embossed Lord Venkateswara with Sanctum 3000K Golden Halo',
    image: '/images/wall-decor/categories/led-backlight/balaji-led-category.jpg',
    slug: 'tirupati-balaji-divine-led-backlit-acrylic-wall-art',
  },
  {
    id: 'shiva',
    name: 'Adiyogi Lord Shiva',
    tagline: 'Meditative Adiyogi Sanctum with Mystic Amber Backlight Glow',
    image: '/images/wall-decor/products/shiva/shiva-led-backlight-frame.jpg',
    slug: 'adiyogi-lord-shiva-meditation-led-wall-decor',
  },
  {
    id: 'radha-krishna',
    name: 'Shri Radha Krishna Bansuri',
    tagline: 'Divine Bansuri & Kamadhenu Blessing with 3000K Golden Halo',
    image: '/images/mockups/radha-krishna-divine-bansuri-3d-led-acrylic-wall-art/primary-square.jpg',
    slug: 'radha-krishna-divine-bansuri-3d-led-acrylic-wall-art',
  },
];

type GlowColor = 'temple-gold' | 'deep-amber' | 'celestial-white';

export default function LedBacklitShowcase() {
  const [isLedOn, setIsLedOn] = useState(true);
  const [selectedArt, setSelectedArt] = useState<ArtItem>(ARTWORKS[0]);
  const [glowTone, setGlowTone] = useState<GlowColor>('temple-gold');

  // Tone styling
  const getGlowStyles = () => {
    if (!isLedOn) {
      return {
        haloBg: 'bg-transparent',
        haloShadow: 'none',
        frameBorder: 'border-stone-700/80',
        badgeColor: 'text-stone-400 bg-stone-900 border-stone-800',
      };
    }

    switch (glowTone) {
      case 'deep-amber':
        return {
          haloBg: 'bg-amber-600/30',
          haloShadow: '0 0 35px rgba(217,119,6,0.6), 0 0 70px rgba(180,83,9,0.35)',
          frameBorder: 'border-amber-400/80',
          badgeColor: 'text-amber-300 bg-amber-950/80 border-amber-600/40',
        };
      case 'celestial-white':
        return {
          haloBg: 'bg-amber-100/25',
          haloShadow: '0 0 35px rgba(254,243,199,0.5), 0 0 65px rgba(245,158,11,0.25)',
          frameBorder: 'border-amber-200/70',
          badgeColor: 'text-amber-100 bg-stone-900/90 border-amber-300/40',
        };
      case 'temple-gold':
      default:
        return {
          haloBg: 'bg-amber-500/25',
          haloShadow: '0 0 35px rgba(245,158,11,0.65), 0 0 75px rgba(217,119,6,0.35)',
          frameBorder: 'border-amber-300/90',
          badgeColor: 'text-amber-300 bg-amber-950/80 border-amber-500/40',
        };
    }
  };

  const glowStyles = getGlowStyles();

  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-4 sm:py-6">
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#181818] to-[#121212] p-5 sm:p-7 lg:p-9 border border-[#EAB308]/35 shadow-xl">
        {/* Dynamic animated ambient background aura */}
        <div
          className={`absolute top-1/2 right-1/4 -translate-y-1/2 w-[420px] h-[260px] rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
            isLedOn ? glowStyles.haloBg : 'opacity-0'
          }`}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* LEFT: Copy, Live Controls & Interactive Toggles */}
          <div className="lg:col-span-7 space-y-4 text-left">
            {/* Top Interactive Controls Row */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-[11px] uppercase tracking-widest font-bold text-[#FFFFFF] bg-[#121212] border border-[#EAB308]/80 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 shadow-2xs">
                <Flame className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
                <span>Warm Golden LED Ambient Glow</span>
              </span>

              {/* Master Power Toggle */}
              <button
                type="button"
                onClick={() => setIsLedOn(!isLedOn)}
                className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold transition-all duration-300 border cursor-pointer ${
                  isLedOn
                    ? 'bg-amber-500/20 text-amber-200 border-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.35)]'
                    : 'bg-stone-900 text-stone-400 border-stone-800'
                }`}
                title="Toggle LED Backlighting ON/OFF"
              >
                <Power className={`w-3.5 h-3.5 ${isLedOn ? 'text-amber-400 animate-pulse' : 'text-stone-500'}`} />
                <span>LED Halo: <strong className={isLedOn ? 'text-amber-300' : 'text-stone-400'}>{isLedOn ? 'ON' : 'OFF'}</strong></span>
              </button>
            </div>

            {/* Headline and Narrative */}
            <div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                Sacred Illumination That Transforms Any Room
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed font-sans max-w-2xl">
                Bring the peaceful glow of the temple sanctum into your home. Hidden warm golden LEDs radiate behind crystal acrylic, casting a gentle aura that creates a serene spiritual atmosphere day and night.
              </p>
            </div>

            {/* Interactive Tone Switcher */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="text-xs text-stone-400 font-semibold flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span>Select Glow Tone:</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setGlowTone('temple-gold')}
                  disabled={!isLedOn}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border cursor-pointer ${
                    glowTone === 'temple-gold' && isLedOn
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400/80 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                      : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:border-stone-700'
                  } disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  Temple Gold (3000K)
                </button>
                <button
                  type="button"
                  onClick={() => setGlowTone('deep-amber')}
                  disabled={!isLedOn}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border cursor-pointer ${
                    glowTone === 'deep-amber' && isLedOn
                      ? 'bg-amber-600/20 text-amber-300 border-amber-500/80 shadow-[0_0_10px_rgba(217,119,6,0.3)]'
                      : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:border-stone-700'
                  } disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  Deep Amber (2700K)
                </button>
                <button
                  type="button"
                  onClick={() => setGlowTone('celestial-white')}
                  disabled={!isLedOn}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border cursor-pointer ${
                    glowTone === 'celestial-white' && isLedOn
                      ? 'bg-stone-800 text-stone-200 border-amber-200/60 shadow-[0_0_10px_rgba(254,243,199,0.2)]'
                      : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:border-stone-700'
                  } disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  Warm White (3500K)
                </button>
              </div>
            </div>

            {/* Quick Artwork Preview Thumbnails */}
            <div className="space-y-1.5 pt-0.5">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                Select Artwork to Preview:
              </span>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {ARTWORKS.map((art) => (
                  <button
                    key={art.id}
                    type="button"
                    onClick={() => setSelectedArt(art)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border cursor-pointer ${
                      selectedArt.id === art.id
                        ? 'bg-amber-500/25 text-amber-200 border-amber-400 shadow-sm scale-105'
                        : 'bg-stone-900/80 text-stone-400 border-stone-800 hover:text-stone-200 hover:border-stone-700'
                    }`}
                  >
                    {art.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 3 Compact Feature Cards with Micro-Interactions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-stone-300 text-left">
              <div className="group bg-stone-900/80 hover:bg-stone-900 p-2.5 sm:p-3 rounded-xl border border-stone-800 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                    <Flame className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-amber-300 font-bold text-xs sm:text-sm">3000K Warm Glow</span>
                </div>
                <span className="text-[11px] text-stone-400 mt-1 block leading-snug">
                  Eye-friendly golden halo for pooja room tranquility.
                </span>
              </div>

              <div className="group bg-stone-900/80 hover:bg-stone-900 p-2.5 sm:p-3 rounded-xl border border-stone-800 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-amber-300 font-bold text-xs sm:text-sm">Concealed Wiring</span>
                </div>
                <span className="text-[11px] text-stone-400 mt-1 block leading-snug">
                  2.5m clear cord with inline ON/OFF toggle switch.
                </span>
              </div>

              <div className="group bg-stone-900/80 hover:bg-stone-900 p-2.5 sm:p-3 rounded-xl border border-stone-800 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-amber-300 font-bold text-xs sm:text-sm">12V BIS Certified</span>
                </div>
                <span className="text-[11px] text-stone-400 mt-1 block leading-snug">
                  Low-voltage safe draw with 50,000h diode life.
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/category/led-backlit-wall-art"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-warm transition-all duration-300 hover:shadow-[0_0_20px_rgba(217,119,6,0.5)] hover:-translate-y-0.5 group"
              >
                <span>Explore All LED Backlit Art</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href={`/product/${selectedArt.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-100 px-3 py-2 transition-colors"
              >
                <span>View {selectedArt.name} Details</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* RIGHT: Compact, Animated Artwork Stage with Attractive Royal Photoframe */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Ambient Aura Ring - Breathing Animation */}
            <div
              className={`absolute inset-0 m-auto w-56 sm:w-68 h-68 sm:h-84 rounded-3xl blur-2xl transition-all duration-700 pointer-events-none ${
                isLedOn ? 'opacity-85 scale-105 animate-led-halo' : 'opacity-0 scale-95'
              }`}
              style={{
                boxShadow: isLedOn ? glowStyles.haloShadow : 'none',
                background: isLedOn ? 'radial-gradient(circle, rgba(245,158,11,0.45) 0%, rgba(217,119,6,0.2) 70%, transparent 100%)' : 'none',
              }}
            />

            {/* LUXURY ROYAL PHOTOFRAME */}
            <div
              className={`group relative rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 aspect-[4/5] w-56 sm:w-64 md:w-72 shadow-2xl transition-all duration-500 ${
                isLedOn
                  ? 'bg-gradient-to-br from-[#F5E6AB] via-[#B88A35] to-[#8C620B] shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_35px_rgba(200,169,107,0.45)] ring-1 ring-[#FFF7CC] animate-divine-float'
                  : 'bg-gradient-to-br from-[#E2D299] via-[#B89738] to-[#6E4E08] shadow-lg'
              }`}
            >
              {/* 4 Corner Ornate Brackets */}
              <div className="absolute top-1 left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-white/80 rounded-tl-sm pointer-events-none z-20" />
              <div className="absolute top-1 right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-white/80 rounded-tr-sm pointer-events-none z-20" />
              <div className="absolute bottom-1 left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-white/80 rounded-bl-sm pointer-events-none z-20" />
              <div className="absolute bottom-1 right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-white/80 rounded-br-sm pointer-events-none z-20" />

              {/* Inner Matting Rim with Charcoal Core */}
              <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-stone-950 border border-amber-300/80 shadow-inner">
                {/* Product Image */}
                <img
                  key={selectedArt.id}
                  src={selectedArt.image}
                  alt={`${selectedArt.name} — Premium Acrylic LED Backlit Art`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                  width={360}
                  height={450}
                />

                {/* Glossy Acrylic Glass Sheen Sweep Animation */}
                {isLedOn && (
                  <div
                    className="absolute inset-0 pointer-events-none animate-acrylic-shine opacity-40 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full h-full"
                  />
                )}

                {/* Subtle Bottom Vignette */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent pointer-events-none" />

                {/* Top Status Pill */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-stone-950/85 backdrop-blur-md text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-400/30 shadow-xs">
                    <Sparkles className="w-2.5 h-2.5 text-amber-400 animate-pulse" />
                    <span>{isLedOn ? '3000K Illuminated' : 'Daylight View'}</span>
                  </span>

                  <span className="text-[10px] font-semibold bg-stone-950/80 backdrop-blur-md text-stone-300 px-2 py-0.5 rounded-full border border-stone-700/60">
                    4mm Cast Acrylic
                  </span>
                </div>

                {/* Bottom Artwork Nameplate */}
                <div className="absolute bottom-3 inset-x-3 z-10">
                  <p className="font-serif font-bold text-white text-sm sm:text-base leading-snug drop-shadow-md">
                    {selectedArt.name}
                  </p>
                  <p className="text-[11px] text-amber-300/90 font-sans mt-0.5 line-clamp-1 drop-shadow-sm">
                    {selectedArt.tagline}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
