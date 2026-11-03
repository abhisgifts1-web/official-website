'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import {
  Flame,
  Zap,
  Sun,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Sliders,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';

interface LedComparisonItem {
  id: string;
  name: string;
  tagline: string;
  dayImage: string;
  ledImage: string;
  slug: string;
}

const COMPARISON_ITEMS: LedComparisonItem[] = [
  {
    id: 'balaji',
    name: 'Divine Tirupati Balaji',
    tagline: '3D Gold Detailing with Sacred Sanctum 3000K Halo',
    dayImage: '/images/wall-decor/products/balaji/balaji-daylight-unlit.jpg',
    ledImage: '/images/wall-decor/categories/led-backlight/balaji-led-category.jpg',
    slug: 'tirupati-balaji-divine-led-backlit-acrylic-wall-art',
  },
  {
    id: 'radha-krishna',
    name: 'Divine Radha Krishna',
    tagline: 'Vrindavan Flute Grace with Luminous Warm Amber Glow',
    dayImage: '/images/wall-decor/categories/devotional/radha-krishna-category.jpg',
    ledImage: '/images/wall-decor/products/led/radha-krishna-divine-melody-led.jpg',
    slug: 'radha-krishna-divine-bansuri-3d-led-acrylic-wall-art',
  },
  {
    id: 'shiva',
    name: 'Adiyogi Lord Shiva',
    tagline: 'Meditative Stillness with Ambient Nocturnal Aura',
    dayImage: '/images/wall-decor/categories/devotional/shiva-category.jpg',
    ledImage: '/images/wall-decor/categories/led-backlight/shiva-led-category.jpg',
    slug: 'adiyogi-lord-shiva-meditation-led-wall-decor',
  },
  {
    id: 'ganesha',
    name: 'Lord Ganesha Vighnaharta',
    tagline: 'Auspicious Remover of Obstacles with 3000K Halo',
    dayImage: '/images/wall-decor/products/ganesha/ganesha-acrylic-gold-frame.jpg',
    ledImage: '/images/wall-decor/categories/led-backlight/ganesha-led-category.jpg',
    slug: 'lord-ganesha-vighnaharta-divine-led-backlit-acrylic-art',
  },
];

export default function InteractiveLedExperience() {
  const [selectedItem, setSelectedItem] = useState<LedComparisonItem>(COMPARISON_ITEMS[0]);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const onPointerMove = (e: MouseEvent) => {
      handleMove(e.clientX);
    };

    const onPointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    return () => {
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
    };
  }, [isDragging, handleMove]);

  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-14">
      <div className="bg-gradient-to-br from-[#2D0F19] via-[#4A1624] to-[#250912] rounded-3xl sm:rounded-[36px] p-6 sm:p-10 lg:p-12 border-2 border-[#EAB308]/50 shadow-[0_25px_70px_rgba(37,9,18,0.5)] text-[#FFFFFF] relative overflow-hidden">
        {/* Subtle Background Golden Ambient Glows */}
        <div className="absolute -top-24 right-10 w-96 h-96 bg-[#EAB308]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-10 w-96 h-96 bg-[#EAB308]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* =========================================================
              LEFT: Section Header & Illumination Engineering Specs
              ========================================================= */}
          <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#511B2A] border border-[#EAB308]/60 px-3.5 py-1 rounded-full text-xs font-bold text-[#EAB308] shadow-xs">
              <Flame className="w-3.5 h-3.5 text-[#EAB308] animate-pulse" />
              <span className="uppercase tracking-widest text-[11px]">IMMERSIVE 3000K SANCTUM TECHNOLOGY</span>
            </div>

            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-[44px] text-[#FFFFFF] leading-tight tracking-tight">
              LIGHT THAT BRINGS DEVOTION ALIVE
            </h2>

            <p className="text-xs sm:text-[14px] text-[#F9EFE0]/85 font-sans leading-relaxed">
              Experience how calming 3000K warm golden illumination awakens sacred deity iconography into an ethereal, living sanctum aura. Drag the interactive slider to witness the transformation.
            </p>

            {/* Quick Artwork Selector */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-[#EAB308] uppercase tracking-wider block">
                Select Deity Masterpiece to Compare:
              </span>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {COMPARISON_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      selectedItem.id === item.id
                        ? 'bg-[#EAB308] text-[#250912] shadow-sm font-bold'
                        : 'bg-white/10 text-[#FFFFFF] border border-[#EAB308]/40 hover:bg-white/20'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Engineering Highlights */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-left">
              <div className="p-3 rounded-2xl bg-white/5 border border-[#EAB308]/30">
                <span className="font-bold text-[#EAB308] text-xs block">3000K Epistar LEDs</span>
                <span className="text-[11px] text-[#F9EFE0]/75 block mt-0.5">Warm temple garbhagriha halo</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-[#EAB308]/30">
                <span className="font-bold text-[#EAB308] text-xs block">12V 2A BIS Adapter</span>
                <span className="text-[11px] text-[#F9EFE0]/75 block mt-0.5">100% low-voltage touch-safe</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-[#EAB308]/30">
                <span className="font-bold text-[#EAB308] text-xs block">Concealed Heatsink</span>
                <span className="text-[11px] text-[#F9EFE0]/75 block mt-0.5">Zero heat transfer to acrylic</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-[#EAB308]/30">
                <span className="font-bold text-[#EAB308] text-xs block">50,000h Diode Life</span>
                <span className="text-[11px] text-[#F9EFE0]/75 block mt-0.5">25+ years of nightly blessings</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href="/category/led-backlit-wall-art"
                className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#EAB308] via-[#FEF08A] to-[#EAB308] hover:brightness-105 text-[#250912] font-bold text-xs sm:text-sm px-8 py-4 rounded-full shadow-[0_6px_25px_rgba(214,170,85,0.4)] tracking-wider uppercase transition-all hover:scale-[1.02] group"
              >
                <Flame className="w-4 h-4 text-[#250912]" />
                <span>EXPLORE LED BACKLIT ART</span>
                <ArrowRight className="w-4 h-4 text-[#250912] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* =========================================================
              RIGHT: Interactive Draggable Before / After Comparison Slider
              ========================================================= */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Quick State Buttons (0%, 50%, 100%) */}
            <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 mb-3">
              <button
                type="button"
                onClick={() => setSliderPosition(0)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all border flex items-center gap-1 cursor-pointer ${
                  sliderPosition === 0
                    ? 'bg-amber-100 text-stone-900 border-amber-300 shadow-sm'
                    : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20'
                }`}
              >
                <Sun className="w-3 h-3 text-amber-500" />
                <span>Daylight Only (0%)</span>
              </button>
              <button
                type="button"
                onClick={() => setSliderPosition(50)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all border flex items-center gap-1 cursor-pointer ${
                  sliderPosition === 50
                    ? 'bg-[#EAB308] text-[#250912] border-[#EAB308] shadow-sm'
                    : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20'
                }`}
              >
                <SlidersHorizontal className="w-3 h-3 text-[#EAB308]" />
                <span>Split Comparison (50%)</span>
              </button>
              <button
                type="button"
                onClick={() => setSliderPosition(100)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all border flex items-center gap-1 cursor-pointer ${
                  sliderPosition === 100
                    ? 'bg-[#511B2A] text-[#FFFFFF] border-[#EAB308] shadow-sm'
                    : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20'
                }`}
              >
                <Zap className="w-3 h-3 text-[#EAB308]" />
                <span>3000K LED Glow (100%)</span>
              </button>
            </div>

            {/* Draggable Split Comparison Box */}
            <div
              ref={containerRef}
              onMouseDown={(e) => {
                setIsDragging(true);
                handleMove(e.clientX);
              }}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onClick={(e) => handleMove(e.clientX)}
              className="relative w-full aspect-[4/3] sm:aspect-[16/11] max-w-[640px] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#EAB308] shadow-[0_20px_60px_rgba(0,0,0,0.6)] cursor-ew-resize select-none"
            >
              {/* Layer 1: AFTER — 3000K Warm LED Backlit Image (Full Container) */}
              <div className="absolute inset-0 w-full h-full bg-[#18060C]">
                <img
                  src={selectedItem.ledImage}
                  alt={`${selectedItem.name} 3000K LED Illuminated`}
                  className="w-full h-full object-cover"
                />

                {/* 3000K Ambient Halo Glow Layer */}
                <div className="absolute inset-0 bg-radial from-[#EAB308]/25 via-transparent to-transparent pointer-events-none" />

                {/* Top Right Label: 3000K LED BACKLIT */}
                <div className="absolute top-2.5 sm:top-3.5 right-2.5 sm:right-3.5 z-20 bg-[#511B2A]/90 text-[#FFD58A] border border-[#EAB308] px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-md backdrop-blur-xs flex items-center gap-1 sm:gap-1.5 pointer-events-none">
                  <Flame className="w-3.5 h-3.5 text-[#EAB308]" />
                  <span>AFTER: 3000K LED GLOW</span>
                </div>
              </div>

              {/* Layer 2: BEFORE — Daylight Unlit Image (Clipped by sliderPosition) */}
              <div
                className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src={selectedItem.dayImage}
                  alt={`${selectedItem.name} Daylight Unlit`}
                  className="w-full h-full object-cover"
                />

                {/* Top Left Label: DAYLIGHT UNLIT */}
                <div className="absolute top-2.5 sm:top-3.5 left-2.5 sm:left-3.5 z-20 bg-white/90 text-[#FFFFFF] border border-[#2D2D2D] px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-md backdrop-blur-xs flex items-center gap-1 sm:gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>BEFORE: DAYLIGHT UNLIT</span>
                </div>
              </div>

              {/* Central Draggable Slider Divider & Handle */}
              <div
                className="absolute top-0 bottom-0 z-30 pointer-events-none flex items-center justify-center"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
              >
                <div className="w-0.5 h-full bg-[#EAB308] shadow-[0_0_10px_#D6AA55]" />
                <div className="absolute w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#511B2A] border-2 border-[#EAB308] shadow-[0_4px_16px_rgba(0,0,0,0.6)] flex items-center justify-center text-[#EAB308] cursor-ew-resize">
                  <span className="text-[11px] font-bold tracking-tighter">↔</span>
                </div>
              </div>

              {/* Instruction Pill at Bottom */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 bg-black/70 text-white/90 px-3.5 py-1 rounded-full text-[11px] font-medium backdrop-blur-xs pointer-events-none">
                Drag slider ↔ to compare daylight vs 3000K LED
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
