'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  Sun,
  Moon,
  ShieldCheck,
  Layers,
  Ruler,
  Camera,
  Truck,
  Eye,
  Check,
  Zap,
} from 'lucide-react';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

type FrameMode = 'led' | 'acrylic' | 'glitter';

export default function CustomizationProcessSection() {
  const [activeMode, setActiveMode] = useState<FrameMode>('led');
  const [activeStep, setActiveStep] = useState<number>(1);

  const cleanWaNumber = (INITIAL_SETTINGS.whatsappNumber || '919032372782').replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
    "Hello Abhi's Gifts, I want to customize a personalized photo frame. Please review my photo and share a free 1:1 digital WhatsApp proof."
  )}`;

  const frameModes: Record<
    FrameMode,
    {
      id: FrameMode;
      label: string;
      tagline: string;
      image: string;
      badge: string;
      haloColor: string;
      bgClass: string;
      features: string[];
    }
  > = {
    led: {
      id: 'led',
      label: 'LED Backlit Frame',
      tagline: 'Ambient Halo Illumination',
      image: '/images/collections/custom-led-photo-frame.jpg',
      badge: 'Cool White LED Halo Glow',
      haloColor: 'rgba(254, 232, 21, 0.45)',
      bgClass: 'from-stone-950 via-stone-900 to-amber-950/40',
      features: [
        'Hidden perimeter 12V Epistar LEDs',
        'Warm Golden or Cool White ambient glow',
        'Plug & play external 12V adapter included',
        'Direct UV printing with zero paper peeling',
      ],
    },
    acrylic: {
      id: 'acrylic',
      label: '5MM Crystal Acrylic',
      tagline: 'Direct UV Surface Printing',
      image: '/images/categories/circle-showcase/acrylic-photo-frames.jpg',
      badge: '5MM Crystal Optical Clarity',
      haloColor: 'rgba(255, 255, 255, 0.25)',
      bgClass: 'from-stone-900 via-stone-850 to-stone-900',
      features: [
        '5MM thick virgin crystal clear cast acrylic',
        'Diamond-polished CNC square-cut edges',
        'Solid stainless steel floating wall studs',
        'Vibrant 1200 DPI anti-fade archival inks',
      ],
    },
    glitter: {
      id: 'glitter',
      label: 'Liquid Gold Glitter',
      tagline: 'Floating Shimmer Particle Depth',
      image: '/images/categories/circle-showcase/glitter-photo-frames.jpg',
      badge: 'Enchanted Liquid Sparkle',
      haloColor: 'rgba(245, 158, 11, 0.4)',
      bgClass: 'from-stone-950 via-amber-950/50 to-stone-900',
      features: [
        'Floating gold foil & diamond shimmer particles',
        'Dynamic depth that catches room lighting',
        'Heirloom keepsake for weddings & milestones',
        'Ultra-clear acrylic seal with zero leakage',
      ],
    },
  };

  const steps = [
    {
      num: 1,
      title: 'Choose Canvas Style & Size',
      shortTitle: '1. Style & Size',
      desc: 'Select 5MM Crystal Acrylic, Ambient LED Halo, or Floating Glitter. Pick calibrated sq.ft dimensions matching your wall.',
      subText: 'Standard sizes: 1.0 sq.ft (10"×14"), 1.5 sq.ft (12"×18"), 3.0 sq.ft (18"×24"), 6.0 sq.ft (24"×36"), or custom.',
      icon: Ruler,
    },
    {
      num: 2,
      title: 'Upload Cherished Photo or Art',
      shortTitle: '2. Upload Photo',
      desc: 'Upload directly through our online studio or send your high-resolution portrait or sacred artwork via WhatsApp.',
      subText: 'Our artists perform free contrast & resolution optimization for high-density 1200 DPI print clarity.',
      icon: Camera,
    },
    {
      num: 3,
      title: 'Free 1:1 WhatsApp Proof Approval',
      shortTitle: '3. WhatsApp Proof',
      desc: 'Our Hyderabad designers create a digital mockup and message you on WhatsApp for approval before production begins.',
      subText: '100% risk-free. Request adjustments to crops, borders, or gold script until you are completely satisfied.',
      icon: MessageCircle,
    },
    {
      num: 4,
      title: 'Laser Precision Craft & Delivery',
      shortTitle: '4. Craft & Arrival',
      desc: 'Fabricated in our Hyderabad workshop, mounted with stainless standoffs, bubble-encased, and express-shipped.',
      subText: 'Zero-damage transit packaging guarantee. Includes complete wall-mounting hardware kit.',
      icon: Truck,
    },
  ];

  const currentMode = frameModes[activeMode];

  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-16">
      {/* Container with High-End Atelier Dark Gradient Background */}
      <div className="relative rounded-3xl sm:rounded-[36px] bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 border border-stone-800 shadow-2xl p-6 sm:p-10 lg:p-12 overflow-hidden text-white">
        {/* Ambient Glow Orbs */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-40"
          style={{ backgroundColor: currentMode.haloColor }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-30"
          style={{ backgroundColor: currentMode.haloColor }}
        />

        {/* Section Header */}
        <div className="relative z-10 text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#FEE815] bg-[#FEE815]/10 border border-[#FEE815]/30 mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FEE815]" />
            <span>Interactive Frame Studio &amp; Craft</span>
          </div>

          <h2 className="font-serif font-bold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            From Digital Memory to <span className="text-[#FEE815] italic">Acrylic Masterpiece</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-3 font-sans leading-relaxed">
            Every frame is customized with precision Direct UV surface inks, hand-beveled cast acrylic, and our signature free 1:1 WhatsApp digital proof before laser cutting.
          </p>

          {/* Interactive Material Mode Switcher */}
          <div className="mt-6 inline-flex items-center p-1.5 rounded-2xl bg-stone-900/90 border border-stone-700/80 shadow-inner gap-1.5">
            {(Object.keys(frameModes) as FrameMode[]).map((modeKey) => {
              const item = frameModes[modeKey];
              const isSelected = activeMode === modeKey;
              return (
                <button
                  key={modeKey}
                  type="button"
                  onClick={() => setActiveMode(modeKey)}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#FEE815] text-stone-950 shadow-md font-extrabold scale-102'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  {modeKey === 'led' && <Sun className="w-3.5 h-3.5" />}
                  {modeKey === 'acrylic' && <Layers className="w-3.5 h-3.5" />}
                  {modeKey === 'glitter' && <Sparkles className="w-3.5 h-3.5" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dual-Column Interactive Stage */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Live Visualizer with Glowing Backlight Simulation (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full relative group">
              {/* Outer Radiating Glow simulation */}
              <div
                className="absolute inset-0 rounded-3xl blur-2xl transition-all duration-700 pointer-events-none scale-105"
                style={{
                  backgroundColor: currentMode.haloColor,
                  opacity: activeMode === 'led' ? 0.85 : 0.4,
                }}
              />

              {/* Realistic Frame Canvas Container */}
              <div className="relative rounded-3xl bg-stone-900 border-2 border-stone-700/70 p-3 sm:p-4 shadow-2xl overflow-hidden backdrop-blur-md">
                {/* Active Style Badge */}
                <div className="absolute top-6 left-6 z-20 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-stone-950/80 text-white backdrop-blur-md border border-white/20 shadow-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{currentMode.badge}</span>
                  </span>
                </div>

                {/* Standoff Stud Embellishments on Corners */}
                <div className="absolute top-6 right-6 z-20 w-4 h-4 rounded-full bg-gradient-to-br from-stone-200 via-stone-400 to-stone-600 shadow-md border border-white/40" />
                <div className="absolute bottom-6 left-6 z-20 w-4 h-4 rounded-full bg-gradient-to-br from-stone-200 via-stone-400 to-stone-600 shadow-md border border-white/40" />
                <div className="absolute bottom-6 right-6 z-20 w-4 h-4 rounded-full bg-gradient-to-br from-stone-200 via-stone-400 to-stone-600 shadow-md border border-white/40" />

                {/* Main Visual Display */}
                <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-stone-950 shadow-inner">
                  <Image
                    src={currentMode.image}
                    alt={currentMode.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 500px"
                    priority
                  />

                  {/* Surface Sheen & Reflection Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none" />

                  {/* Glassmorphic Live Tag */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-stone-950/85 backdrop-blur-md border border-stone-700/70 text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-sm text-[#FEE815]">
                        {currentMode.label}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        Workshop Grade
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-300 mt-0.5 font-sans">
                      {currentMode.tagline} • Handcrafted in Hyderabad
                    </p>
                  </div>
                </div>
              </div>

              {/* Material Highlights Checklist */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-left">
                {currentMode.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-1.5 p-2 rounded-xl bg-stone-900/60 border border-stone-800 text-[11px] text-stone-300"
                  >
                    <Check className="w-3.5 h-3.5 text-[#FEE815] shrink-0 mt-0.5" />
                    <span className="leading-tight">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: 4-Step Interactive Customization Journey (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-stone-800">
              <span className="text-xs uppercase tracking-wider font-bold text-stone-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#FEE815]" />
                <span>Customization Journey</span>
              </span>
              <span className="text-[11px] font-mono text-stone-400">
                Click step to preview details
              </span>
            </div>

            {/* Stepper Cards */}
            <div className="space-y-3">
              {steps.map((st) => {
                const Icon = st.icon;
                const isCurrent = activeStep === st.num;

                return (
                  <div
                    key={st.num}
                    onClick={() => setActiveStep(st.num)}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer text-left relative overflow-hidden ${
                      isCurrent
                        ? 'bg-gradient-to-r from-stone-900 via-stone-850 to-amber-950/30 border-[#FEE815] shadow-lg ring-1 ring-[#FEE815]/30'
                        : 'bg-stone-900/60 hover:bg-stone-900 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-start gap-3.5 sm:gap-4">
                      {/* Step Number Badge with Icon */}
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isCurrent
                            ? 'bg-[#FEE815] text-stone-950 font-black shadow-md'
                            : 'bg-stone-800 text-stone-300'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3
                            className={`font-serif font-bold text-sm sm:text-base tracking-tight ${
                              isCurrent ? 'text-white' : 'text-stone-200'
                            }`}
                          >
                            {st.title}
                          </h3>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold shrink-0 ${
                              isCurrent
                                ? 'bg-[#FEE815]/20 text-[#FEE815] border border-[#FEE815]/40'
                                : 'bg-stone-800 text-stone-400'
                            }`}
                          >
                            Step 0{st.num}
                          </span>
                        </div>

                        <p className="text-xs text-stone-300 mt-1 leading-relaxed font-sans">
                          {st.desc}
                        </p>

                        {/* Interactive Extended Info when active */}
                        {isCurrent && (
                          <div className="mt-3 pt-3 border-t border-stone-800/80 text-[11px] text-amber-200/90 flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FEE815] shrink-0" />
                            <span>{st.subText}</span>
                          </div>
                        )}

                        {/* Step 3 WhatsApp Live Mockup Preview */}
                        {isCurrent && st.num === 3 && (
                          <div className="mt-3.5 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 font-sans space-y-2">
                            <div className="flex items-center justify-between text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                              <span className="flex items-center gap-1.5">
                                <MessageCircle className="w-3 h-3 text-emerald-400" />
                                WhatsApp Proofing Simulation
                              </span>
                              <span className="bg-emerald-500/20 px-2 py-0.5 rounded-full text-emerald-300">
                                Live In-House
                              </span>
                            </div>
                            <div className="bg-stone-950/90 rounded-lg p-2.5 text-xs text-stone-200 border border-stone-800 space-y-1">
                              <p className="text-[11px] text-stone-300">
                                <span className="font-bold text-[#FEE815]">Abhi&apos;s Gifts Studio:</span> &ldquo;Hi! Here is your 1:1 HD digital preview of the 18&times;24&quot; frame. Please confirm if alignment &amp; lighting look good.&rdquo;
                              </p>
                              <p className="text-[11px] text-emerald-400 font-semibold text-right">
                                &ldquo;Looks perfect! Approved for printing 👍&rdquo;
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Launchers */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Link
                href="/customise"
                className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#FEE815] hover:bg-[#FFF04B] text-stone-950 font-extrabold text-xs sm:text-sm transition-all shadow-md hover:shadow-amber-500/20 group cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-stone-950" />
                <span>Launch Frame Customizer Studio</span>
                <ArrowRight className="w-4 h-4 text-stone-950 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs sm:text-sm border border-stone-700 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                <span>Request Proof on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Trust Guarantee Strip */}
        <div className="relative z-10 mt-10 pt-6 border-t border-stone-800 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="space-y-0.5">
            <p className="font-serif font-bold text-lg text-white">12,000+</p>
            <p className="text-[11px] text-stone-400">Masterpieces Fabricated</p>
          </div>
          <div className="space-y-0.5">
            <p className="font-serif font-bold text-lg text-[#FEE815]">100% Free</p>
            <p className="text-[11px] text-stone-400">WhatsApp Proof Before Print</p>
          </div>
          <div className="space-y-0.5">
            <p className="font-serif font-bold text-lg text-emerald-400">24-48 Hours</p>
            <p className="text-[11px] text-stone-400">Hyderabad Workshop Dispatch</p>
          </div>
          <div className="space-y-0.5">
            <p className="font-serif font-bold text-lg text-white">Zero Damage</p>
            <p className="text-[11px] text-stone-400">5-Layer Foam Packaging</p>
          </div>
        </div>
      </div>
    </section>
  );
}
