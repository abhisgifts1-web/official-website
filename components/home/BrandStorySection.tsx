'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Award,
  ShieldCheck,
  Flame,
  CheckCircle2,
  ArrowRight,
  Eye,
  MessageCircle,
  Gem,
  PackageCheck,
  Layers,
} from 'lucide-react';

interface CraftPillar {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  specs: { label: string; value: string }[];
  image: string;
  fallbackImage: string;
  imageAlt: string;
  badge1: string;
  badge2: string;
  mantraAnnotation: string;
}

const CRAFT_PILLARS: CraftPillar[] = [
  {
    id: 'acrylic',
    number: '01',
    title: 'Museum-Grade 4mm Cast Acrylic',
    tagline: 'Zero Fragile Glass Hazards • Diamond CNC Beveling',
    description:
      'Engineered with high-density imported virgin cast acrylic. Crystalline 99.2% optical transparency reveals sacred pigment depth without distorting reflection, while diamond-cut CNC beveled edges will never yellow, shatter, or degrade over 25+ years.',
    icon: Gem,
    specs: [
      { label: 'Optical Purity', value: '99.2% Clarity' },
      { label: 'Safety Rating', value: '100% Shatterproof' },
      { label: 'Durability', value: '25-Year Guarantee' },
    ],
    image: '/images/lifestyle/pooja-mandir.jpg',
    fallbackImage: '/images/lifestyle/living-room.jpg',
    imageAlt: 'Consecrated devotional wall art inside a luxury Indian pooja mandir',
    badge1: '4mm High-Density Cast Acrylic',
    badge2: 'Diamond-Cut CNC Beveling',
    mantraAnnotation: 'Crystal Clarity • Zero Reflection Warping',
  },
  {
    id: 'gold-foil',
    number: '02',
    title: '24K Pure Gold Leaf Embellishment',
    tagline: 'Delicate Specular Sheen on Halos & Sanskrit Verses',
    description:
      'Master artisans individually apply genuine 24-karat gold leaf detailing to sacred crowns, divine auras, and Vedic mantras. As morning daylight or evening brass diyas flicker, the gold comes alive with a reverent specular sheen that shimmers from every angle.',
    icon: Sparkles,
    specs: [
      { label: 'Gold Purity', value: '24-Karat Certified' },
      { label: 'Craft Technique', value: 'Hand Leaf Gilding' },
      { label: 'Specular Sheen', value: 'Aarti Diya Responsive' },
    ],
    image: '/images/wall-decor/products/balaji/balaji-acrylic-gold-frame.jpg',
    fallbackImage: '/images/divine/lord-balaji.jpg',
    imageAlt: '24K Gold foil leaf embellishment on Lord Venkateswara Balaji frame',
    badge1: '24K Pure Gold Leaf Gilding',
    badge2: 'Specular Aarti Reflection',
    mantraAnnotation: 'Hand-Applied 24K Leaf • Temple Gold Sheen',
  },
  {
    id: 'led-aura',
    number: '03',
    title: 'Calibrated 3000K Warm LED Aura',
    tagline: 'Authentic Brass Temple Diya Luminescence',
    description:
      'Low-voltage certified 12V Epistar LED diodes calibrated to precisely 3000 Kelvins — reproducing the holy golden hue of ghee lamps in Indian sanctums. Hidden rear channels prevent heat emission and cast a serene corona halo across living walls without glare.',
    icon: Flame,
    specs: [
      { label: 'Color Temp', value: '3000K Diya Kelvin' },
      { label: 'Diode Lifespan', value: '50,000+ Hours' },
      { label: 'Heat Output', value: '0% Cool Operation' },
    ],
    image: '/images/wall-decor/products/led/ayodhya-ram-mandir-sanctum.jpg',
    fallbackImage: '/images/divine/ram-mandir.jpg',
    imageAlt: 'Calibrated 3000K warm LED illuminated sanctum frame',
    badge1: 'Calibrated 3000K Warm LED',
    badge2: 'Concealed Heat-Sink Wiring',
    mantraAnnotation: '3000K Temple Diya Light • Zero Eye Glare',
  },
  {
    id: 'vault-crate',
    number: '04',
    title: '5-Layer Honeycomb Crate Protection',
    tagline: '100% Transit-Safe Doorstep Pan-India Assurance',
    description:
      'Every consecrated heirloom is wrapped in anti-static velvet foam, cushioned with reinforced corner armor, and housed inside a 5-layer heavy-duty wooden honeycomb crate. Fully insured against transit damage with zero-risk instant replacement.',
    icon: PackageCheck,
    specs: [
      { label: 'Packaging Armor', value: '5-Layer Honeycomb' },
      { label: 'Drop Tested', value: '1.5-Meter Certified' },
      { label: 'Pan-India Reach', value: '19,000+ Pincodes' },
    ],
    image: '/images/lifestyle/living-room.jpg',
    fallbackImage: '/images/lifestyle/entrance-foyer.jpg',
    imageAlt: '5-Layer transit-safe wooden honeycomb crated packaging',
    badge1: '5-Layer Honeycomb Crate',
    badge2: '100% Transit Safe Insured',
    mantraAnnotation: 'Reinforced Corner Armor • Zero-Damage Guarantee',
  },
];

export default function BrandStorySection() {
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activePillar = CRAFT_PILLARS[activePillarIndex];

  // 3D Tilt on the craftsmanship viewport
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 py-8 sm:py-12 lg:py-14">
      {/* Outer Luxury Card Container */}
      <div className="bg-gradient-to-br from-[#FFF7EC] via-[#FDF5E8] to-[#F9EFE0] rounded-3xl sm:rounded-[36px] p-6 sm:p-8 lg:p-12 border border-[#2D2D2D] shadow-[0_16px_50px_rgba(81,27,42,0.08)] overflow-hidden relative">
        {/* Subtle Luxury Ambient Glow Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#EAB308]/20 via-[#FFD58A]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#121212]/10 via-[#641D30]/05 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />

        {/* =========================================================
            TOP HEADER: Editorial Heritage Badge & Gold Shimmer Headline
            ========================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-8 sm:mb-10 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#511B2A] border border-[#EAB308] px-4 py-1.5 rounded-full text-xs font-bold text-[#EAB308] shadow-xs">
            <Award className="w-3.5 h-3.5 text-[#EAB308] animate-pulse" />
            <span className="uppercase tracking-widest text-[11px] sm:text-[11.5px] font-bold">
              OUR HERITAGE &amp; ARTISANAL PHILOSOPHY • EST. 2018
            </span>
          </div>

          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[46px] text-[#FFFFFF] leading-[1.15] tracking-tight">
            MORE THAN ART.
            <span className="block mt-1 animate-gold-text-shimmer font-serif">
              A SACRED LEGACY OF DEVOTION.
            </span>
          </h2>

          <p className="text-xs sm:text-[14px] lg:text-[15px] text-[#D1D5DB] font-sans leading-relaxed max-w-2xl mx-auto">
            At Abhi&apos;s Gifts, located in Dilsukhnagar, Hyderabad, we believe sacred iconography and personalized photo keepsakes in the home are never mere decoration. They are consecrated focal points that awaken tranquility (Shanti), divine protection (Raksha), and eternal prosperity. Serving collectors and families across Hyderabad, Secunderabad, and Telangana.
          </p>
        </div>

        {/* =========================================================
            MAIN BENTO GRID: Balanced 6-6 Desktop Columns & Flush Top Alignment
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start relative z-10">
          {/* =========================================================
              LEFT COLUMN (6 Cols Desktop): 3D Artisanal Sanctum Viewport
              ========================================================= */}
          <div className="lg:col-span-6 xl:col-span-6 lg:sticky lg:top-24 space-y-3.5">
            {/* Viewport Frame Container with 3D Tilt */}
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative w-full aspect-[4/4.2] sm:aspect-[4/3.8] lg:h-[530px] rounded-3xl overflow-hidden border-2 border-[#EAB308] shadow-[0_20px_50px_rgba(81,27,42,0.25)] group select-none transition-all duration-500 bg-[#2E141D]"
              style={{
                transform: isHovered
                  ? `perspective(1000px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`
                  : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Dynamic Image revealing with Celestial Sanctum animation */}
              <img
                key={activePillar.id}
                src={activePillar.image}
                alt={activePillar.imageAlt}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = activePillar.fallbackImage;
                }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 animate-sanctum-reveal"
              />

              {/* Multi-layered Warm LED Corona Backdrop */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35 pointer-events-none" />

              {/* Dynamic Acrylic Specular Sheen */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="w-[85%] h-full bg-gradient-to-r from-transparent via-white/18 to-transparent animate-acrylic-sheen-sweep" />
              </div>

              {/* 4 Corner 24K Gold Standoff Studs with Specular Twinkle */}
              <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-gradient-to-br from-[#FFE8A3] via-[#FACC15] to-[#7A551E] shadow-md border border-amber-900/40 pointer-events-none animate-stud-twinkle-1" />
              <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-gradient-to-br from-[#FFE8A3] via-[#FACC15] to-[#7A551E] shadow-md border border-amber-900/40 pointer-events-none animate-stud-twinkle-2" />
              <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-gradient-to-br from-[#FFE8A3] via-[#FACC15] to-[#7A551E] shadow-md border border-amber-900/40 pointer-events-none animate-stud-twinkle-3" />
              <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-gradient-to-br from-[#FFE8A3] via-[#FACC15] to-[#7A551E] shadow-md border border-amber-900/40 pointer-events-none animate-stud-twinkle-4" />

              {/* Floating Craftsmanship Callouts (Synchronized with selected pillar) */}
              <div className="absolute top-3.5 left-3.5 z-20 flex flex-col gap-1.5 pointer-events-none">
                <span className="bg-[#511B2A]/95 text-[#FFFFFF] text-[10.5px] sm:text-xs font-bold px-3 py-1.5 rounded-full border border-[#EAB308] shadow-md backdrop-blur-xs flex items-center gap-1.5 animate-sanctum-reveal">
                  <Sparkles className="w-3.5 h-3.5 text-[#EAB308]" />
                  <span>{activePillar.badge1}</span>
                </span>
                <span className="bg-[#511B2A]/95 text-[#FFFFFF] text-[10.5px] sm:text-xs font-bold px-3 py-1.5 rounded-full border border-[#EAB308] shadow-md backdrop-blur-xs flex items-center gap-1.5 animate-sanctum-reveal">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#EAB308]" />
                  <span>{activePillar.badge2}</span>
                </span>
              </div>

              {/* Top-Right Craft Pill Indicator */}
              <div className="absolute top-3.5 right-3.5 z-20">
                <span className="bg-black/60 text-[#EAB308] text-[10.5px] font-bold px-2.5 py-1 rounded-full border border-[#EAB308]/50 backdrop-blur-xs">
                  Pillar {activePillar.number} of 04
                </span>
              </div>

              {/* Bottom Inscription: Artisan Guild Quote */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20 bg-black/75 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-[#EAB308]/40 text-[#FFFFFF] shadow-lg">
                <p className="font-serif italic text-xs sm:text-[13px] text-[#F9EFE0] leading-snug">
                  &ldquo;When sacred art enters a home, it transforms living walls into an eternal sanctum of peace, protection, and divine radiance.&rdquo;
                </p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/15">
                  <span className="text-[10px] sm:text-[10.5px] text-[#EAB308] font-bold tracking-wider uppercase">
                    — ABHI GIFTS ARTISAN GUILD
                  </span>
                  <span className="text-[9.5px] text-[#FFD58A] bg-[#511B2A]/90 px-2 py-0.5 rounded-full border border-[#EAB308]/50 font-medium">
                    Tirupati, India
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Spec Pills under the image */}
            <div className="w-full grid grid-cols-3 gap-2 px-0.5">
              {activePillar.specs.map((spec, i) => (
                <div
                  key={i}
                  className="bg-white/95 rounded-2xl p-2.5 border border-[#2D2D2D] text-center shadow-2xs hover:border-[#EAB308] transition-colors"
                >
                  <span className="text-[9.5px] text-[#D1D5DB] block font-medium uppercase tracking-tight">
                    {spec.label}
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold text-[#FFFFFF] block mt-0.5 truncate">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* =========================================================
              RIGHT COLUMN (6 Cols Desktop): 4 Interactive Craft Pillars
              ========================================================= */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-3">
            {CRAFT_PILLARS.map((pillar, index) => {
              const isSelected = activePillarIndex === index;
              const IconComponent = pillar.icon;

              return (
                <div
                  key={pillar.id}
                  onClick={() => setActivePillarIndex(index)}
                  onMouseEnter={() => setActivePillarIndex(index)}
                  className={`group relative p-3.5 sm:p-4 rounded-2xl transition-all duration-300 cursor-pointer border text-left ${
                    isSelected
                      ? 'bg-white shadow-[0_10px_30px_rgba(81,27,42,0.12)] border-[#EAB308] ring-2 ring-[#EAB308]/40 scale-[1.01]'
                      : 'bg-white/80 hover:bg-white border-[#2D2D2D] hover:border-[#EAB308] shadow-2xs'
                  }`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Pillar Icon Box with Number Badge */}
                    <div className="relative shrink-0">
                      <div
                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-[#511B2A] text-[#EAB308] border-2 border-[#EAB308] shadow-md'
                            : 'bg-[#121212] text-[#FFFFFF] border border-[#2D2D2D] group-hover:border-[#EAB308]'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="absolute -bottom-1.5 -right-1.5 text-[8.5px] font-bold px-1.5 py-0.2 rounded-full bg-[#EAB308] text-[#FFFFFF] border border-[#FFF7EC]">
                        {pillar.number}
                      </span>
                    </div>

                    {/* Content Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3
                          className={`font-serif font-bold text-sm sm:text-[15.5px] transition-colors truncate ${
                            isSelected ? 'text-[#FFFFFF]' : 'text-[#FFFFFF] group-hover:text-[#FFFFFF]'
                          }`}
                        >
                          {pillar.title}
                        </h3>
                        {isSelected && (
                          <span className="shrink-0 text-[10px] font-bold text-[#EAB308] bg-[#511B2A] px-2 py-0.5 rounded-full border border-[#EAB308]/50 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308] animate-ping" />
                            <span>Inspecting</span>
                          </span>
                        )}
                      </div>

                      <span className="text-[11px] sm:text-[12px] font-semibold text-[#EAB308] block mt-0.5 leading-tight">
                        {pillar.tagline}
                      </span>

                      <p className="text-[11.5px] sm:text-xs text-[#D1D5DB] mt-1.5 leading-relaxed font-sans">
                        {pillar.description}
                      </p>

                      {/* Expanded View Specs when selected */}
                      {isSelected && (
                        <div className="mt-2.5 pt-2 border-t border-[#2D2D2D]/60 flex flex-wrap gap-2 animate-sanctum-reveal">
                          {pillar.specs.map((spec, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-bold bg-[#121212] text-[#FFFFFF] px-2 py-0.5 rounded-md border border-[#EAB308]/40"
                            >
                              ✓ {spec.label}: <span className="text-[#EAB308]">{spec.value}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* CTA Buttons: Read Full Story + WhatsApp Artisan Consultation */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Link
                href="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#641D30] via-[#511B2A] to-[#641D30] hover:from-[#121212] hover:to-[#3D1420] text-[#FFFFFF] font-bold text-xs sm:text-[13.5px] px-7 py-3.5 rounded-full border border-[#EAB308] shadow-[0_6px_22px_rgba(81,27,42,0.30)] uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] group"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4 text-[#EAB308] group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="https://wa.me/919491767676?text=Namaste%20Abhi%20Gifts%2C%20I%20would%20like%20to%20consult%20with%20your%20master%20artisans%20regarding%20sacred%20wall%20art%20craftsmanship."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#121212] text-[#FFFFFF] font-bold text-xs sm:text-[13.5px] px-6 py-3.5 rounded-full border-2 border-[#EAB308] shadow-2xs uppercase tracking-wider transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Talk with Artisan Guild</span>
              </a>
            </div>
          </div>
        </div>

        {/* =========================================================
            BOTTOM TRUST BANNER: 4 Consecrated Pillars Strip
            ========================================================= */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-[#2D2D2D] grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 relative z-10">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/90 border border-[#2D2D2D] shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-[#121212] border border-[#EAB308]/50 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4 text-[#EAB308]" />
            </div>
            <div>
              <span className="font-bold text-[#FFFFFF] text-xs sm:text-[13px] block leading-tight">
                25,000+ Homes
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#D1D5DB] font-medium block mt-0.5">
                Consecrated Sanctums
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/90 border border-[#2D2D2D] shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-[#121212] border border-[#EAB308]/50 flex items-center justify-center shrink-0">
              <Gem className="w-4 h-4 text-[#EAB308]" />
            </div>
            <div>
              <span className="font-bold text-[#FFFFFF] text-xs sm:text-[13px] block leading-tight">
                4mm Virgin Cast
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#D1D5DB] font-medium block mt-0.5">
                Zero Fragile Glass
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/90 border border-[#2D2D2D] shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-[#121212] border border-[#EAB308]/50 flex items-center justify-center shrink-0">
              <Flame className="w-4 h-4 text-[#EAB308]" />
            </div>
            <div>
              <span className="font-bold text-[#FFFFFF] text-xs sm:text-[13px] block leading-tight">
                3000K Diya Kelvin
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#D1D5DB] font-medium block mt-0.5">
                Temple Brass Aura
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/90 border border-[#2D2D2D] shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-[#121212] border border-[#EAB308]/50 flex items-center justify-center shrink-0">
              <PackageCheck className="w-4 h-4 text-[#EAB308]" />
            </div>
            <div>
              <span className="font-bold text-[#FFFFFF] text-xs sm:text-[13px] block leading-tight">
                19,000+ Pincodes
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#D1D5DB] font-medium block mt-0.5">
                5-Layer Vault Crating
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
