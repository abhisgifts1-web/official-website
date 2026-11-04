'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Flame,
  ShieldCheck,
  Award,
  Truck,
  Sun,
  Zap,
  Eye,
  Star,
  MessageCircle,
  Maximize2,
} from 'lucide-react';

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

// Six individual landscape 16:9 divine devotional masterpieces
export const HERO_DEITIES: HeroDeity[] = [
  {
    id: 'radha-krishna',
    name: 'Radha Krishna — Divine Vrindavan',
    shortName: 'Radha Krishna',
    subtitle: 'Celestial Vrindavan Flute • Divine Love & Harmony',
    blessing: 'Infuses your home with unconditional affection, emotional healing & joyful tranquility.',
    image: '/images/divine/radha-krishna.jpg',
    slug: 'radha-krishna-divine-flute-acrylic-wall-decor',
    accent: '#D6AA55',
    mantra: '॥ రాధే రాధే • హరే కృష్ణ హరే రామ ॥',
    deityIcon: '🦚',
    dimension: '18" × 12"',
    price: '₹2,799',
    originalPrice: '₹4,299',
  },
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
  {
    id: 'adiyogi-shiva',
    name: 'Adiyogi Shiva — Eternal Meditation',
    shortName: 'Adiyogi Shiva',
    subtitle: 'Crescent Moon Sanctum • Mahadev Cosmic Energy',
    blessing: 'Dissolves mental stress and chaotic energy, awakening deep meditative stillness.',
    image: '/images/divine/adiyogi-shiva.jpg',
    slug: 'adiyogi-lord-shiva-meditation-led-wall-decor',
    accent: '#D6AA55',
    mantra: '॥ ఓం నమః శివాయ • కర్పూర గౌరం కరుణావతారమ్ ॥',
    deityIcon: '🌙',
    dimension: '20" × 14"',
    price: '₹2,999',
    originalPrice: '₹4,799',
  },
  {
    id: 'lord-ganesha',
    name: 'Lord Ganesha — Vighnaharta',
    shortName: 'Lord Ganesha',
    subtitle: 'Prathama Pujya • Remover of All Obstacles',
    blessing: 'Clears stumbling blocks in business & career, ushering in auspicious Shubh-Labh prosperity.',
    image: '/images/divine/lord-ganesha.jpg',
    slug: 'lord-ganesha-vighnaharta-divine-led-backlit-acrylic-art',
    accent: '#D6AA55',
    mantra: '॥ ఓం గం గణపతయే నమః • వక్రతుండ మహాకాయ ॥',
    deityIcon: '🐘',
    dimension: '18" × 12"',
    price: '₹2,799',
    originalPrice: '₹4,299',
  },
  {
    id: 'maa-lakshmi',
    name: 'Maa Lakshmi — Goddess of Prosperity',
    shortName: 'Maa Lakshmi',
    subtitle: 'Ashta Lakshmi Abundance • Sacred Kuber Zone',
    blessing: 'Bestows 8-fold wealth, nourishment, courage, wisdom and domestic auspiciousness.',
    image: '/images/divine/maa-lakshmi.jpg',
    slug: 'ashta-lakshmi-wealth-prosperity-acrylic-wall-decor',
    accent: '#D6AA55',
    mantra: '॥ ఓం శ్రీం హ్రీం క్లీం మహాలక్ష్మ్యై నమః ॥',
    deityIcon: '🌸',
    dimension: '24" × 16"',
    price: '₹3,299',
    originalPrice: '₹4,999',
  },
  {
    id: 'ram-mandir',
    name: 'Ram Mandir — Ayodhya Divine Heritage',
    shortName: 'Ram Mandir',
    subtitle: 'Consecrated Ram Lalla • Maryada Purushottam',
    blessing: 'Infuses household with moral fortitude, fearless protection and righteous dharma.',
    image: '/images/divine/ram-mandir.jpg',
    slug: 'ayodhya-ram-janmabhoomi-mandir-3d-led-wall-decor',
    accent: '#D6AA55',
    mantra: '॥ శ్రీరామ జయరామ జయ జయ రామ ॥',
    deityIcon: '🏹',
    dimension: '20" × 14"',
    price: '₹2,999',
    originalPrice: '₹4,699',
  },
];

const AUTO_SCROLL_INTERVAL = 5000;

export default function HeroShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLedGlowOn, setIsLedGlowOn] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [timerResetKey, setTimerResetKey] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const showcaseContainerRef = useRef<HTMLDivElement>(null);

  const currentDeity = HERO_DEITIES[currentIndex];

  // Preload all 6 images on mount for instantaneous, flicker-free transitions
  useEffect(() => {
    if (typeof window !== 'undefined') {
      HERO_DEITIES.forEach((deity) => {
        const img = new window.Image();
        img.src = deity.image;
      });
    }
  }, []);

  // Automatic image switching every 5 seconds; pause on hover/interaction
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_DEITIES.length);
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused, timerResetKey]);

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectDeity = (index: number) => {
    setCurrentIndex(index);
    setTimerResetKey((prev) => prev + 1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_DEITIES.length);
    setTimerResetKey((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_DEITIES.length) % HERO_DEITIES.length);
    setTimerResetKey((prev) => prev + 1);
  };

  // Interactive 3D physical parallax tilt on mouse movement across the frame
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showcaseContainerRef.current) return;
    const rect = showcaseContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Controlled physical 3D tilt between -4deg and +4deg
    const rotateX = ((y - centerY) / centerY) * -3.8;
    const rotateY = ((x - centerX) / centerX) * 3.8;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Mobile touch swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-50 via-white to-stone-50 py-8 sm:py-10 lg:py-14 border-b border-stone-200">
      {/* Ambient Radial Golden Aura Lights */}
      <div className="absolute top-1/3 right-10 w-[600px] lg:w-[800px] h-[600px] lg:h-[800px] bg-gradient-to-br from-amber-200/20 via-amber-100/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10 animate-subtle-float" />
      <div className="absolute top-1/4 left-4 w-[500px] h-[400px] bg-amber-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Floating Gold Sparkle Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 -z-10">
        <div className="absolute top-16 left-[22%] w-2 h-2 rounded-full bg-[#EAB308] animate-ping" style={{ animationDuration: '5s' }} />
        <div className="absolute top-44 right-[30%] w-1.5 h-1.5 rounded-full bg-[#FFE8A3] animate-ping" style={{ animationDuration: '6.5s' }} />
        <div className="absolute bottom-28 left-[38%] w-2 h-2 rounded-full bg-[#EAB308] animate-ping" style={{ animationDuration: '7.5s' }} />
        <div className="absolute bottom-16 right-[15%] w-1.5 h-1.5 rounded-full bg-[#EAB308] animate-ping" style={{ animationDuration: '8s' }} />
      </div>

      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-14 items-center">
          
          {/* =========================================================
              LEFT COLUMN (5 Cols Desktop): Editorial Headline, Social Proof & CTAs
              ========================================================= */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-5 text-center lg:text-left">
            
            {/* 1. Prestige Overline Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-stone-200 shadow-xs backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#EAB308] animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span className="font-mono text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-stone-900">
                ESTD 2022 • DILSUKHNAGAR, HYDERABAD
              </span>
            </div>

            {/* 2. Main Hero Headline with High-Contrast Golden Aura */}
            <div className="space-y-1">
              <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[40px] xl:text-[46px] 2xl:text-[52px] text-stone-900 leading-[1.12] tracking-tight">
                <span className="block animate-headline-line-1">
                  Premium Acrylic &amp; Customized
                </span>
                <span className="block mt-1 animate-headline-line-2">
                  <span className="relative inline-block font-serif italic text-amber-800 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 bg-clip-text text-transparent drop-shadow-xs animate-gold-text-shimmer">
                    Photo Frames in Hyderabad
                  </span>
                </span>
              </h1>
            </div>

            {/* 3. Artisan Trust Strip */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 py-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-50 border border-stone-200 shadow-2xs text-stone-800 text-xs font-semibold">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>Handcrafted in Hyderabad</span>
              </div>
              <div className="text-xs sm:text-[13px] text-stone-600 font-medium flex items-center gap-1.5">
                <strong className="text-stone-900 font-bold">Handcrafted in Hyderabad</strong>
                <span className="text-[#EAB308]">•</span>
                <span>100% Quality Guarantee</span>
              </div>
            </div>

            {/* 4. Refined Editorial Narrative */}
            <p className="text-xs sm:text-[14px] lg:text-[15px] text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Hyderabad&apos;s premier destination for custom <strong className="text-stone-900 font-semibold">acrylic photo frames</strong>, <strong className="text-stone-900 font-semibold">warm LED illuminated frames</strong>, and sacred devotional heirlooms. Handcrafted with precision beveled edges and golden foil embellishments at our Dilsukhnagar studio with fast local delivery across Telangana.
            </p>

            {/* 5. Animated CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              {/* Primary CTA */}
              <Link
                href="/shop"
                className="relative overflow-hidden w-full sm:w-auto bg-[#EAB308] hover:bg-[#FACC15] text-black font-extrabold text-xs sm:text-[13.5px] px-7 py-4 rounded-full shadow-[0_4px_18px_rgba(234,179,8,0.3)] border border-[#EAB308] flex items-center justify-center gap-2.5 transition-all hover:scale-[1.03] active:scale-[0.98] tracking-wider uppercase group cursor-pointer"
              >
                {/* Continuous Gold Sheen Beam */}
                <span className="absolute inset-0 pointer-events-none overflow-hidden">
                  <span className="block w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent animate-btn-shine" />
                </span>
                <Sparkles className="w-4 h-4 text-black" />
                <span>EXPLORE PHOTO FRAMES</span>
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1.5 transition-transform" />
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/customise"
                className="w-full sm:w-auto bg-white hover:bg-stone-50 text-stone-900 border-2 border-stone-300 hover:border-stone-400 font-bold text-xs sm:text-[13.5px] px-6 py-4 rounded-full shadow-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.03] active:scale-[0.98] tracking-wider uppercase group cursor-pointer"
              >
                <Flame className="w-4 h-4 text-amber-600 animate-pulse" />
                <span>CUSTOMIZE YOUR FRAME</span>
              </Link>
            </div>

            {/* Direct Artisan WhatsApp Proofing Strip */}
            <div className="flex items-center justify-center lg:justify-start gap-2 pt-1">
              <a
                href="https://wa.me/919032372782?text=Hi%20Abhi%27s%20Gifts%2C%20I%20would%20like%20to%20order%20a%20customized%20photo%20frame."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-stone-800 hover:text-amber-800 transition-colors"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Quick WhatsApp Consultation &amp; Digital Proofing (+91 90323 72782)</span>
              </a>
            </div>

            {/* 6. Three Interactive Value Pillars */}
            <div className="pt-4 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center sm:text-left">
              <div className="group flex items-center gap-3 p-3 rounded-2xl bg-white border border-stone-200 hover:border-[#EAB308] transition-all duration-300 shadow-xs hover:-translate-y-1 hover:shadow-md">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Award className="w-4 h-4 text-amber-700" />
                </div>
                <div className="text-left">
                  <span className="font-bold text-stone-900 text-xs block leading-tight tracking-tight uppercase">
                    Premium Acrylic
                  </span>
                  <span className="text-[11px] text-stone-500 block mt-0.5 font-medium">Precision Bevel</span>
                </div>
              </div>

              <div className="group flex items-center gap-3 p-3 rounded-2xl bg-white border border-stone-200 hover:border-[#EAB308] transition-all duration-300 shadow-xs hover:-translate-y-1 hover:shadow-md">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Zap className="w-4 h-4 text-amber-700" />
                </div>
                <div className="text-left">
                  <span className="font-bold text-stone-900 text-xs block leading-tight tracking-tight uppercase">
                    Warm LED Glow
                  </span>
                  <span className="text-[11px] text-stone-500 block mt-0.5 font-medium">Concealed Backlight</span>
                </div>
              </div>

              <div className="group flex items-center gap-3 p-3 rounded-2xl bg-white border border-stone-200 hover:border-[#EAB308] transition-all duration-300 shadow-xs hover:-translate-y-1 hover:shadow-md">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                </div>
                <div className="text-left">
                  <span className="font-bold text-stone-900 text-xs block leading-tight tracking-tight uppercase">
                    Safe Packaging
                  </span>
                  <span className="text-[11px] text-stone-500 block mt-0.5 font-medium">5-Layer Crate Pack</span>
                </div>
              </div>
            </div>

          </div>

          {/* =========================================================
              RIGHT COLUMN (7 Cols Desktop): UNIQUE CINEMATIC SANCTUARY STAGE
              ========================================================= */}
          <div
            className="lg:col-span-7 xl:col-span-7 relative flex flex-col items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Header Bar: Active Deity Title & Tactile Light Controller */}
            <div className="w-full flex items-center justify-between mb-3 px-1 gap-2 z-20">
              {/* Deity Title & Auto-cycle Status Pill */}
              <div className="flex items-center gap-2 min-w-0">
                <span
                  key={`title-${currentDeity.id}`}
                  className="text-xs sm:text-[13px] font-serif font-bold text-stone-900 bg-white px-3.5 py-1.5 rounded-full border border-stone-200 shadow-xs flex items-center gap-2 transition-all truncate"
                >
                  <span className="text-base shrink-0">{currentDeity.deityIcon}</span>
                  <span className="truncate">{currentDeity.name}</span>
                </span>
                
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-stone-600 font-medium bg-stone-100 px-3 py-1 rounded-full border border-stone-200 shrink-0">
                  <span className={`w-1.5 h-1.5 rounded-full ${isPaused ? 'bg-amber-600' : 'bg-emerald-500 animate-ping'}`} />
                  <span>{isPaused ? 'Paused on Hover' : 'Auto-Cycles (5s)'}</span>
                </span>
              </div>

              {/* Warm LED Glow Simulator Switch */}
              <button
                type="button"
                onClick={() => setIsLedGlowOn(!isLedGlowOn)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md border transition-all duration-300 flex items-center gap-1.5 cursor-pointer shrink-0 active:scale-95 ${
                  isLedGlowOn
                    ? 'bg-[#EAB308] text-[#000000] border-[#EAB308] shadow-[0_0_20px_rgba(234,179,8,0.55)]'
                    : 'bg-white text-stone-700 border-stone-200 hover:text-stone-900 shadow-xs'
                }`}
                title="Toggle Warm LED Glow Backlight Simulation"
              >
                {isLedGlowOn ? (
                  <>
                    <Zap className="w-3.5 h-3.5 fill-[#EAB308] text-[#EAB308] animate-pulse" />
                    <span>Warm LED: ON</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>Daylight: OFF</span>
                  </>
                )}
              </button>
            </div>

            {/* =========================================================
                THE GRAND SANCTUM NICHE STAGE
                ========================================================= */}
            <div
              ref={showcaseContainerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`relative w-full max-w-[760px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#0A0A0A] via-[#141414] to-[#0A0A0A] border-2 border-[#EAB308]/80 transition-all duration-700 flex flex-col items-center justify-between p-4 sm:p-7 shadow-[0_30px_70px_rgba(0,0,0,0.85)] group select-none ${
                isLedGlowOn ? 'ring-4 ring-[#EAB308]/40 shadow-[0_0_50px_rgba(214,170,85,0.3)]' : ''
              }`}
            >
              {/* Radial Sanctum Wall Illumination */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#121212]/40 via-transparent to-black/80 pointer-events-none" />

              {/* Floating Golden Light Embers / Sacred Dhoop Simulation */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                <div className="absolute bottom-6 left-[12%] w-1.5 h-1.5 rounded-full bg-[#FFE8A3] blur-[0.5px] animate-ember-1" />
                <div className="absolute bottom-16 right-[15%] w-2 h-2 rounded-full bg-[#EAB308] blur-[0.5px] animate-ember-2" />
                <div className="absolute bottom-20 left-[50%] w-1.5 h-1.5 rounded-full bg-[#FFD58A] blur-[0.5px] animate-ember-3" />
                <div className="absolute bottom-8 right-[42%] w-1.5 h-1.5 rounded-full bg-[#FFE8A3] blur-[0.5px] animate-ember-4" />
              </div>

              {/* warm Radiating Warm Halo Blooming Behind Frame */}
              {isLedGlowOn && (
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-150 ease-out"
                  style={{
                    transform: isHovered
                      ? `translate(${(tilt.y * -2.5).toFixed(1)}px, ${(tilt.x * 2.5).toFixed(1)}px) scale(1.05)`
                      : 'translate(0px, 0px) scale(1)',
                  }}
                >
                  <div className="w-[85%] h-[85%] rounded-full bg-gradient-to-r from-[#EAB308]/40 via-[#FFE29A]/30 to-[#EAB308]/40 blur-3xl animate-gold-bloom" />
                  <div className="absolute w-[65%] h-[65%] rounded-full bg-[#FFD58A]/25 blur-2xl animate-led-halo" />
                </div>
              )}

              {/* Top Spec Pill: Completely Unobtrusive Header Tag */}
              <div className="w-full flex items-center justify-between mb-3 z-30 px-1">
                
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#181818] to-[#222222] border border-[#EAB308]/80 text-[#FFFFFF] text-xs font-bold shadow-xs">
                  <span className="text-[#FACC15]">{currentDeity.price}</span>
                  <span className="line-through text-white/50 text-[10px]">{currentDeity.originalPrice}</span>
                </div>
              </div>

              {/* =========================================================
                  THE SACRED DEVOTIONAL MASTERPIECE FRAME (100% CLEAR & UNBLOCKED)
                  ========================================================= */}
              <div className="relative w-full flex items-center justify-center my-1 z-20">
                {/* 3D Physical Photo Frame Container */}
                <div
                  className="relative w-full max-w-[680px] will-change-transform z-20"
                  style={{
                    transform: isHovered
                      ? `perspective(1200px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
                      : 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                    transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Outer Antique Gold Bevelled Frame Border (Border thickness = padding) */}
                  <div
                    className={`relative rounded-2xl p-2 sm:p-2.5 md:p-3 bg-gradient-to-br from-[#FFE8A3] via-[#FACC15] to-[#7D4E12] border border-[#FFE8A3]/80 shadow-[0_20px_50px_rgba(0,0,0,0.95)] ${
                      isLedGlowOn ? 'shadow-[0_0_40px_rgba(214,170,85,0.7),0_20px_50px_rgba(0,0,0,0.95)] animate-led-breathe' : ''
                    }`}
                  >
                    {/* 4 Corner Raised Gold Studs on the Frame Border */}
                    <div className="absolute top-1 left-1 sm:top-1.5 sm:left-1.5 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-br from-[#FFF4D0] via-[#FACC15] to-[#593409] shadow-md border border-amber-950/60 z-30 pointer-events-none animate-stud-twinkle-1" />
                    <div className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-br from-[#FFF4D0] via-[#FACC15] to-[#593409] shadow-md border border-amber-950/60 z-30 pointer-events-none animate-stud-twinkle-2" />
                    <div className="absolute bottom-1 left-1 sm:bottom-1.5 sm:left-1.5 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-br from-[#FFF4D0] via-[#FACC15] to-[#593409] shadow-md border border-amber-950/60 z-30 pointer-events-none animate-stud-twinkle-3" />
                    <div className="absolute bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-br from-[#FFF4D0] via-[#FACC15] to-[#593409] shadow-md border border-amber-950/60 z-30 pointer-events-none animate-stud-twinkle-4" />

                    {/* Inner Dark Velvet Liner & Crystal Clear Acrylic Art Pane */}
                    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-black ring-1 ring-black/80 group/pane shadow-inner">
                      
                      {/* Sacred Deity Artwork Image — 100% VISIBLE, SHARP, AND VIBRANT */}
                      <img
                        key={`artwork-${currentDeity.id}`}
                        src={currentDeity.image}
                        alt={currentDeity.name}
                        className="w-full h-full object-cover animate-ken-burns animate-sanctum-reveal select-none"
                      />

                      {/* Dynamic Specular Acrylic Reflection (Tracks Cursor Coordinates Across Glass) */}
                      <div
                        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
                        style={{
                          background: isHovered
                            ? `radial-gradient(circle at ${(50 + tilt.y * 7).toFixed(1)}% ${(50 + tilt.x * -7).toFixed(1)}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.06) 45%, transparent 75%)`
                            : 'radial-gradient(circle at 50% 25%, rgba(255,255,255,0.12) 0%, transparent 65%)',
                        }}
                      />

                      {/* Crystal Acrylic Sweeping Diagonal Light Glint */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                        <div className="w-[85%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-acrylic-sheen-sweep" />
                      </div>

                      {/* Floating Quick Action CTA Badge on Hover */}
                      <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover/pane:opacity-100 transition-all duration-300 translate-y-2 group-hover/pane:translate-y-0">
                        <Link
                          href={`/product/${currentDeity.slug}`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EAB308] hover:bg-[#FACC15] text-[#000000] text-xs font-bold shadow-xl border border-[#EAB308] hover:scale-105 transition-all backdrop-blur-md"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#FACC15]" />
                          <span>View Sizes &amp; Pricing →</span>
                        </Link>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              {/* =========================================================
                  CONSECRATED GOLDEN INSCRIPTION PEDESTAL (NON-WRAPPING & BALANCED)
                  ========================================================= */}
              <div className="w-full mt-3.5 p-2.5 sm:p-3 rounded-2xl bg-gradient-to-r from-[#141414] via-[#1E1E1E] to-[#141414] border border-[#EAB308]/70 shadow-lg text-center space-y-1 z-30">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-amber-400 text-xs sm:text-sm">🪔</span>
                  <h3 className="font-serif font-bold text-xs sm:text-sm md:text-[15px] text-[#F0D79B] tracking-wider animate-gold-text-shimmer leading-normal">
                    {currentDeity.mantra}
                  </h3>
                  <span className="text-amber-400 text-xs sm:text-sm">🪔</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-[#E5E7EB]/90">
                  <span className="italic">{currentDeity.subtitle}</span>
                  <span className="text-[#EAB308]">•</span>
                  <Link
                    href={`/product/${currentDeity.slug}`}
                    className="font-bold text-[#FACC15] hover:underline flex items-center gap-1"
                  >
                    <span>Order Now {currentDeity.price}</span>
                    <ArrowRight className="w-3 h-3 text-[#FACC15]" />
                  </Link>
                </div>
              </div>

            </div>

            {/* =========================================================
                THUMBNAIL NAVIGATION: Six Individual Previews with Gold Progress Bar
                ========================================================= */}
            <div className="w-full mt-4 px-1">
              <div className="grid grid-cols-6 gap-2 sm:gap-2.5">
                {HERO_DEITIES.map((deity, index) => {
                  const isSelected = currentIndex === index;
                  return (
                    <button
                      key={deity.id}
                      type="button"
                      onClick={() => handleSelectDeity(index)}
                      className={`group relative aspect-[16/10] rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'ring-2 ring-[#EAB308] shadow-[0_0_20px_rgba(214,170,85,0.9)] scale-[1.05] animate-thumbnail-active'
                          : 'border border-[#EAB308]/40 opacity-70 hover:opacity-100 hover:border-[#EAB308] hover:scale-102'
                      }`}
                      title={deity.name}
                      aria-label={`Select ${deity.name}`}
                    >
                      <img
                        src={deity.image}
                        alt={deity.shortName}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {/* Active Frame Highlight */}
                      {isSelected && (
                        <div className="absolute inset-0 border-2 border-[#EAB308] rounded-xl pointer-events-none shadow-inner" />
                      )}
                      {/* Active 5s Progress Bar on Selected Thumbnail */}
                      {isSelected && !isPaused && (
                        <span
                          key={`progress-${currentIndex}-${timerResetKey}`}
                          className="absolute top-0 inset-x-0 h-[2.5px] bg-[#EAB308]/30 overflow-hidden z-20"
                        >
                          <span className="block h-full bg-gradient-to-r from-[#EAB308] via-amber-200 to-[#EAB308] animate-hero-progress" />
                        </span>
                      )}
                      {/* Thumbnail Deity Title */}
                      <div
                        className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent py-1 px-0.5 text-center transition-opacity ${
                          isSelected ? 'opacity-100' : 'opacity-85 group-hover:opacity-100'
                        }`}
                      >
                        <span className="text-[9px] sm:text-[10px] font-bold text-white block truncate leading-tight">
                          {deity.shortName}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
