'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Package,
  Layers,
  Flame,
  Cpu,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

interface CraftStage {
  step: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  specs: string[];
}

const CRAFT_STAGES: CraftStage[] = [
  {
    step: '01',
    title: 'Precision CNC Laser Cutting',
    tagline: 'Millimeter-Accurate Virgin Cast Acrylic',
    description:
      'Every frame begins with high-grade imported virgin cast acrylic, cut using high-precision CNC laser optics in our Hyderabad workshop for glass-like square edges and flawless geometry.',
    image: '/images/atelier/stage-1-clarity-hd.jpg',
    specs: ['Imported Clear Cast Acrylic', 'High-Precision Laser Edges', 'Zero Warp Guarantee'],
  },
  {
    step: '02',
    title: 'Diamond Beveling & Edge Polishing',
    tagline: 'Optical Clarity Without Sharp Edges',
    description:
      'Our artisans bevel and diamond-polish all perimeter borders to create pristine reflective facets that catch the light from every perspective, ensuring safe, silky-smooth edges.',
    image: '/images/atelier/stage-2-artwork-hd.jpg',
    specs: ['Diamond-Polished Bevels', 'Reflective Border Radiance', 'Child & Pet Safe Edges'],
  },
  {
    step: '03',
    title: '1200 DPI Direct UV Ink Infusion',
    tagline: 'Archival Non-Fading Color Depth',
    description:
      'Photographs and sacred motifs are cured directly onto the acrylic substrate using multi-pass industrial UV inks, delivering 100+ year archival color longevity, rich shadows, and luminous skin tones.',
    image: '/images/atelier/stage-4-masterpiece-hd.jpg',
    specs: ['1200 DPI High-Definition', 'Fade-Resistant UV Curing', 'Dynamic Micro-Contrast'],
  },
  {
    step: '04',
    title: 'Concealed LED Lightguide Installation',
    tagline: 'Cool White Ambient Halo Illumination',
    description:
      'For our illuminated collections, an ultra-slim aluminum heatsink channel and high-density perimeter LED lightguide are meticulously bonded behind the panel with an external 12V 2A power adapter included.',
    image: '/images/atelier/layer-4-led-lightguide.jpg',
    specs: ['Cool White Perimeter LEDs', 'Concealed Heat Channel', '12V Power Adapter Included'],
  },
  {
    step: '05',
    title: 'Stainless Standoff Hardware Fitting',
    tagline: 'Architectural Floating Gallery Standoffs',
    description:
      'We pre-fit precision-machined solid brushed stainless-steel wall standoff studs that project the frame 1 inch forward from the wall, creating an authentic art-gallery floating presence.',
    image: '/images/atelier/layer-standoff-corner.jpg',
    specs: ['Brushed Stainless Steel', '1" Floating Projection', 'Wall Plugs & Screws Included'],
  },
  {
    step: '06',
    title: '5-Layer Zero-Breakage Packaging',
    tagline: 'Double-Reinforced Transit Protection',
    description:
      'Every finished frame undergoes rigid inspection, followed by scratch-resistant protective film, corner guards, high-density EPE foam encasing, and a wooden-reinforced transit crate.',
    image: '/images/atelier/layers-exploded-diagram.jpg',
    specs: ['Scratch-Resistant Film', '5-Layer Foam Encasing', '100% Free Replacement Cover'],
  },
];

export default function WorkshopCraftSection() {
  const [activeStage, setActiveStage] = useState<number>(0);
  const current = CRAFT_STAGES[activeStage];

  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12">
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-xl">
        {/* Subtle Ambient Backlighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 pb-6 border-b border-stone-800 gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-amber-300 bg-amber-950/80 border border-amber-500/30 shadow-2xs mb-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Direct Hyderabad Workshop Craft</span>
            </div>

            <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
              Behind the Scenes at Abhi&apos;s Gifts Atelier
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 mt-2 font-sans max-w-xl leading-relaxed">
              Every frame is fabricated from raw virgin cast acrylic sheets to final inspection inside our Moosarambagh, Dilsukhnagar workshop. Zero middlemen, authentic quality.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-amber-300 bg-stone-800/80 px-3.5 py-1.5 rounded-full border border-stone-700 self-start md:self-end">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% In-House Hyderabad Craftsmanship</span>
          </div>
        </div>

        {/* Interactive 6-Stage Timeline Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8 relative z-10">
          {CRAFT_STAGES.map((stg, idx) => {
            const isActive = activeStage === idx;
            return (
              <button
                key={stg.step}
                type="button"
                onClick={() => setActiveStage(idx)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  isActive
                    ? 'bg-amber-400 text-stone-950 border-amber-400 shadow-md scale-102'
                    : 'bg-stone-800/70 hover:bg-stone-800 text-stone-300 border-stone-700/80'
                }`}
              >
                <span className={`text-[11px] font-bold block ${isActive ? 'text-stone-900' : 'text-amber-400'}`}>
                  STEP {stg.step}
                </span>
                <span className="text-xs font-serif font-bold block mt-0.5 truncate">
                  {stg.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Showcase Card */}
        <div className="bg-stone-800/90 rounded-2xl p-6 sm:p-8 border border-stone-700 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Stage Visual */}
          <div className="lg:col-span-6 relative aspect-4/3 w-full rounded-xl overflow-hidden bg-stone-950 border border-stone-700 shadow-lg">
            <Image
              src={current.image}
              alt={current.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-amber-300 text-xs font-bold border border-white/10">
              Step {current.step} / 06
            </div>
          </div>

          {/* Right: Stage Detail & Specs */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
                {current.tagline}
              </span>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-white mt-1">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-2.5 font-sans leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Spec Badges */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                Hyderabad Workshop Quality Standard:
              </span>
              <div className="flex flex-wrap gap-2">
                {current.specs.map((spec, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-stone-900 text-stone-200 border border-stone-700"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>{spec}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Workshop Visit / Customizer Link */}
            <div className="pt-3 border-t border-stone-700 flex flex-wrap items-center gap-4">
              <Link
                href="/customise"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FEE815] hover:bg-[#FFF04B] text-black font-bold text-xs shadow-md transition-all hover:scale-105"
              >
                <span>Upload Photo for Fabrication</span>
                <ArrowRight className="w-3.5 h-3.5 text-black" />
              </Link>

              <a
                href="https://maps.app.goo.gl/fmGv35KsGabFna9E6?g_st=ac"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-stone-300 hover:text-amber-300 underline underline-offset-4 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Visit Dilsukhnagar Workshop</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
