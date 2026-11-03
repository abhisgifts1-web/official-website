'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Camera,
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2,
  MessageCircle,
  Truck,
  Eye,
  SlidersHorizontal,
  Sun,
  Moon,
  UploadCloud,
  Check,
} from 'lucide-react';

interface FrameStyle {
  id: string;
  name: string;
  badge: string;
  price: number;
  mrp: number;
  image: string;
  hasLed: boolean;
  shape: string;
  tagline: string;
  features: string[];
}

const FRAME_STYLES: FrameStyle[] = [
  {
    id: 'frameless',
    name: 'Crystal Frameless',
    badge: 'Most Popular',
    price: 1499,
    mrp: 2999,
    image: '/images/wall-decor/products/custom/custom-portrait-frame.jpg',
    hasLed: false,
    shape: 'Vertical Portrait',
    tagline: 'Museum-grade 4mm cast acrylic with floating stainless standoffs',
    features: ['Diamond CNC Beveled Edges', 'Invisible Floating Mount', 'Zero Reflections'],
  },
  {
    id: 'night-glow',
    name: 'LED Night-Glow',
    badge: 'Trending Gift',
    price: 2499,
    mrp: 4999,
    image: '/images/wall-decor/products/custom/custom-led-photo-frame.jpg',
    hasLed: true,
    shape: 'Illuminated Portrait',
    tagline: '3000K warm perimeter halo turns your memory into ambient night art',
    features: ['12V Low Voltage Adapter', 'Inline ON/OFF Switch', '50,000h Epistar LEDs'],
  },
  {
    id: 'family-gold',
    name: 'Gold Script Heirloom',
    badge: 'Artisan Exclusive',
    price: 2299,
    mrp: 4599,
    image: '/images/wall-decor/products/custom/family-heirloom-frame.jpg',
    hasLed: false,
    shape: 'Horizontal Landscape',
    tagline: 'Cherished family portrait personalized with 24K gold foil surname',
    features: ['24K Real Gold Foil Script', 'Anniversary Inscription', 'Brushed Gold Standoffs'],
  },
  {
    id: 'round-circle',
    name: 'Circular Medallion',
    badge: 'Modern Silhouette',
    price: 1799,
    mrp: 3599,
    image: '/images/wall-decor/products/custom/round-crystal-frame.jpg',
    hasLed: false,
    shape: 'Laser Round',
    tagline: 'Soft curved silhouette perfect for baby milestones & couple memories',
    features: ['Continuous Curved Bevel', 'Concealed Center Bracket', 'Shatterproof Cast Glass'],
  },
];

export default function CustomPhotoStudioShowcase() {
  const [activeStyle, setActiveStyle] = useState<FrameStyle>(FRAME_STYLES[0]);
  const [isNightMode, setIsNightMode] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(1);

  // Automatically sync night mode when user clicks LED style
  const handleSelectStyle = (style: FrameStyle) => {
    setActiveStyle(style);
    if (style.hasLed) {
      setIsNightMode(true);
    } else {
      setIsNightMode(false);
    }
  };

  const steps = [
    {
      num: 1,
      title: 'Upload Your Photo',
      subtitle: 'Accepts JPEG, PNG or WebP up to 15MB with auto resolution check.',
      icon: <UploadCloud className="w-4 h-4 text-[#EAB308]" />,
    },
    {
      num: 2,
      title: 'Interactive 3D Preview',
      subtitle: 'Simulate your photo on living room or mandir walls in real time.',
      icon: <Eye className="w-4 h-4 text-[#EAB308]" />,
    },
    {
      num: 3,
      title: 'WhatsApp Proof Review',
      subtitle: 'Digital layout proof shared on WhatsApp for your final approval.',
      icon: <MessageCircle className="w-4 h-4 text-[#EAB308]" />,
    },
    {
      num: 4,
      title: '100% Safe Transit Guarantee',
      subtitle: '5-layer reinforced wooden crate packaging delivered pan-India.',
      icon: <Truck className="w-4 h-4 text-[#D1D5DB]" />,
    },
  ];

  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-4 sm:py-6">
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-[#FCFBF8] via-[#F8F4ED] to-[#F1E8DC] p-5 sm:p-7 lg:p-9 border border-[#EAB308]/60 shadow-xl">
        {/* Subtle decorative background ambient glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E8D5BD]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* LEFT: Heading, Interactive Steps, & Action Buttons */}
          <div className="lg:col-span-7 space-y-4 text-left">
            {/* Top Badge & Live Status */}
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <span className="text-[11px] uppercase tracking-widest font-bold text-[#FFFFFF] bg-[#E8D5BD] border border-[#EAB308]/60 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 shadow-2xs">
                <Camera className="w-3.5 h-3.5 text-[#D1D5DB] animate-pulse" />
                <span>Dedicated Artisan Studio</span>
              </span>

              {/* Day / Night View Toggle */}
              <button
                type="button"
                onClick={() => setIsNightMode(!isNightMode)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-300 cursor-pointer ${
                  isNightMode
                    ? 'bg-stone-900 text-[#F4DFE4] border-[#EAB308]/60 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                    : 'bg-white/90 text-stone-700 border-stone-300 hover:border-amber-400'
                }`}
                title="Toggle Day vs Night Light Simulation"
              >
                {isNightMode ? (
                  <>
                    <Moon className="w-3.5 h-3.5 text-[#EAB308] animate-pulse" />
                    <span>Night Glow: <strong className="text-[#EAB308]">ACTIVE</strong></span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5 text-[#EAB308]" />
                    <span>Daylight: <strong className="text-stone-900">NATURAL</strong></span>
                  </>
                )}
              </button>
            </div>

            {/* Headline */}
            <div>
              <h2 className="font-serif font-bold text-xl sm:text-2xl lg:text-3xl text-stone-900 tracking-tight leading-snug">
                Turn Cherished Moments into Glowing Acrylic Photo Frames
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed font-sans max-w-2xl">
                Upload your wedding, family, baby, or travel memories. We transform them into premium crystal acrylic wall frames and warm LED night-glow pieces, delivered safely to your doorstep.
              </p>
            </div>

            {/* Interactive Frame Style Selector Tabs */}
            <div className="space-y-1.5 pt-0.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                <span>Select Frame Finish:</span>
                <span className="text-[#FFFFFF] font-semibold">{activeStyle.shape}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {FRAME_STYLES.map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => handleSelectStyle(style)}
                    className={`relative p-2 rounded-xl text-left border transition-all duration-200 cursor-pointer ${
                      activeStyle.id === style.id
                        ? 'bg-[#121212] text-white border-[#EAB308] shadow-md scale-[1.02]'
                        : 'bg-white/90 hover:bg-white text-stone-800 border-stone-200/90 hover:border-amber-400/60 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        activeStyle.id === style.id ? 'bg-[#EAB308] text-[#000000] font-bold' : 'bg-[#1E1E1E] text-[#FFFFFF]'
                      }`}>
                        {style.badge}
                      </span>
                      {activeStyle.id === style.id && (
                        <Check className="w-3 h-3 text-[#EAB308]" />
                      )}
                    </div>
                    <span className="block font-serif font-bold text-xs mt-1 truncate">
                      {style.name}
                    </span>
                    <span className={`text-[11px] block mt-0.5 font-semibold ${
                      activeStyle.id === style.id ? 'text-[#EAB308]' : 'text-[#D1D5DB]'
                    }`}>
                      ₹{style.price.toLocaleString('en-IN')}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4-Step Interactive Workflow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {steps.map((st) => (
                <div
                  key={st.num}
                  onMouseEnter={() => setActiveStep(st.num)}
                  className={`p-2.5 sm:p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                    activeStep === st.num
                      ? 'bg-white shadow-sm border-[#EAB308]/60 -translate-y-0.5 ring-1 ring-[#EAB308]/40'
                      : 'bg-white/70 hover:bg-white/95 border-stone-200/80 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      activeStep === st.num
                        ? 'bg-[#EAB308] text-[#000000] font-bold shadow-xs'
                        : 'bg-[#1E1E1E] text-[#FFFFFF]'
                    }`}>
                      {st.num}
                    </span>
                    <span className="font-bold text-xs text-stone-900 tracking-wide uppercase">
                      {st.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 mt-1 leading-snug font-sans">
                    {st.subtitle}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/customise"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#181818] via-[#222222] to-[#0A0A0A] hover:from-[#222222] hover:to-[#181818] text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-warm transition-all duration-300 hover:shadow-[0_0_20px_rgba(180,83,9,0.35)] hover:-translate-y-0.5 group"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#EAB308] animate-pulse" />
                <span>Launch Customizer Studio</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/category/custom-portrait-frames"
                className="text-xs font-semibold text-[#FFFFFF] hover:text-[#EAB308] px-3 py-2 transition-colors flex items-center gap-1 group"
              >
                <span>Browse All Custom Sizes</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* RIGHT: Interactive 3D Acrylic Frame Stage */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Ambient Backlight Aura when Night Mode is active or LED style is selected */}
            <div
              className={`absolute inset-0 m-auto w-56 sm:w-68 h-72 sm:h-84 rounded-3xl blur-2xl transition-all duration-700 pointer-events-none ${
                isNightMode || activeStyle.hasLed
                  ? 'opacity-85 scale-105 animate-led-halo shadow-[0_0_60px_rgba(245,158,11,0.55)]'
                  : 'opacity-0 scale-95'
              }`}
              style={{
                background: 'radial-gradient(circle, rgba(251,191,36,0.55) 0%, rgba(217,119,6,0.25) 60%, transparent 100%)',
              }}
            />

            {/* The Floating Luxury Acrylic Frame Container */}
            <div
              className={`group relative rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 aspect-[4/5] w-56 sm:w-64 md:w-72 shadow-2xl transition-all duration-500 ${
                isNightMode || activeStyle.hasLed
                  ? 'bg-gradient-to-br from-[#F5E6AB] via-[#B88A35] to-[#8C620B] shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_35px_rgba(200,169,107,0.45)] ring-1 ring-[#FFF7CC] animate-divine-float'
                  : 'bg-gradient-to-br from-[#FAF6E9] via-[#E8DCB8] to-[#C8B27A] shadow-[0_15px_35px_-5px_rgba(0,0,0,0.2)] hover:-translate-y-1 ring-1 ring-[#E8D5BD]'
              }`}
            >
              <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-stone-950 border border-[#EAB308]/60 shadow-inner">
                {/* Product Frame Image */}
                <img
                  key={activeStyle.id}
                  src={activeStyle.image}
                  alt={`${activeStyle.name} — Customized Acrylic Wall Frame`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                  width={360}
                  height={450}
                />

                {/* Glossy Acrylic Glass Light Sweep Animation */}
                <div className="absolute inset-0 pointer-events-none animate-acrylic-shine opacity-35 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full h-full" />

                {/* Realistic 4 Standoff Screw Pins in Corners */}
                <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-100 via-amber-300 to-amber-600 border border-white/80 shadow-xs flex items-center justify-center pointer-events-none z-20">
                  <span className="w-1.5 h-0.5 bg-[#EAB308] block rounded-full" />
                </div>
                <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-100 via-amber-300 to-amber-600 border border-white/80 shadow-xs flex items-center justify-center pointer-events-none z-20">
                  <span className="w-1.5 h-0.5 bg-[#EAB308] block rounded-full" />
                </div>
                <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-100 via-amber-300 to-amber-600 border border-white/80 shadow-xs flex items-center justify-center pointer-events-none z-20">
                  <span className="w-1.5 h-0.5 bg-[#EAB308] block rounded-full" />
                </div>
                <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-100 via-amber-300 to-amber-600 border border-white/80 shadow-xs flex items-center justify-center pointer-events-none z-20">
                  <span className="w-1.5 h-0.5 bg-[#EAB308] block rounded-full" />
                </div>

              {/* Top Status Pill */}
              <div className="absolute top-3 inset-x-8 flex items-center justify-center z-10">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-stone-950/85 backdrop-blur-md text-[#EAB308] px-3 py-0.5 rounded-full border border-[#EAB308]/60 shadow-xs">
                  <Sparkles className="w-2.5 h-2.5 text-[#EAB308] animate-pulse" />
                  <span>{activeStyle.name}</span>
                </span>
              </div>

              {/* Bottom Details Overlay Bar */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/95 via-stone-950/70 to-transparent p-3.5 pt-8 z-10 text-left">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-[#EAB308]/90 font-semibold block uppercase tracking-wider">Starting from</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-white font-serif font-bold text-base sm:text-lg">
                        ₹{activeStyle.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-stone-400 text-xs line-through">
                        ₹{activeStyle.mrp.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/customise"
                    className="bg-[#EAB308] hover:bg-[#AF8E4E] text-[#FFFFFF] text-xs font-bold px-3 py-1.5 rounded-full shadow-xs transition-colors"
                  >
                    Customize
                  </Link>
                </div>

                <p className="text-[11px] text-stone-300/90 mt-1 line-clamp-1">
                  {activeStyle.tagline}
                </p>
              </div>
            </div>
          </div>

            {/* Quick feature pills below the frame */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 max-w-xs text-center">
              {activeStyle.features.map((feat, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-medium bg-white/80 border border-stone-200 text-stone-700 px-2.5 py-0.5 rounded-full shadow-2xs"
                >
                  ✓ {feat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
