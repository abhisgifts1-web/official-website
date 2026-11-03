'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Flame,
  Sun,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Layers,
  X,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

export interface DeityArtItem {
  id: string;
  name: string;
  shortName: string;
  categoryLabel: string;
  titleBadge: string;
  sanskritMantra: string;
  mantraMeaning: string;
  blessing: string;
  vastuZone: string;
  deityIcon: string;
  dayImage: string;
  ledImage: string;
  slug: string;
  accentColor: string;
  haloRays: string;
}

export const DEITIES: DeityArtItem[] = [
  {
    id: 'lakshmi',
    name: 'Maha Lakshmi Ashta Vaibhavam',
    shortName: 'Maa Lakshmi',
    categoryLabel: 'Maa Lakshmi',
    titleBadge: 'Ashtalakshmi Vaibhavam • Kuber Zone',
    sanskritMantra: '॥ ఓం శ్రీం హ్రీం క్లీం మహాలక్ష్మ్యై నమః ॥',
    mantraMeaning: 'Goddess of Supreme Abundance, Purity & Divine Fortune',
    blessing: 'Bestows 8-fold Ashta Lakshmi blessings — wealth, grain, lineage, courage & domestic peace.',
    vastuZone: 'North / Northeast Sanctum (Kuber Zone)',
    deityIcon: '🌸',
    dayImage: '/images/wall-decor/products/balaji/lakshmi-ashta-gold-frame.jpg',
    ledImage: '/images/wall-decor/categories/led-backlight/lakshmi-led-category.jpg',
    slug: 'ashta-lakshmi-wealth-prosperity-acrylic-wall-decor',
    accentColor: '#B88A35',
    haloRays: 'rgba(232, 199, 126, 0.35)',
  },
  {
    id: 'balaji',
    name: 'Divine Tirupati Balaji (Sri Venkateswara)',
    shortName: 'Lord Balaji',
    categoryLabel: 'Lord Balaji',
    titleBadge: 'Kaliyuga Varada • Flagship Heirloom',
    sanskritMantra: '॥ ఓం నమో భగవతే వేంకటేశాయ • గోవింద హరి గోవింద ॥',
    mantraMeaning: 'The Supreme Kaliyuga Protector & Dispeller of Debts and Sorrows',
    blessing: 'Shields family against negative planetary doshas, relieves debts & preserves eternal Vaikuntha tranquility.',
    vastuZone: 'East Wall or Main Entrance Foyer',
    deityIcon: '🔱',
    dayImage: '/images/wall-decor/products/balaji/balaji-acrylic-gold-frame.jpg',
    ledImage: '/images/wall-decor/categories/led-backlight/balaji-led-category.jpg',
    slug: 'tirupati-balaji-divine-led-backlit-acrylic-wall-art',
    accentColor: '#B88A35',
    haloRays: 'rgba(184, 138, 53, 0.4)',
  },
  {
    id: 'ram',
    name: 'Ayodhya Ram Mandir Sanctum Sanctorum',
    shortName: 'Ram Mandir',
    categoryLabel: 'Ram Mandir',
    titleBadge: 'Consecrated Ram Lalla • Maryada Purushottam',
    sanskritMantra: '॥ శ్రీరామ జయరామ జయ జయ రామ • మర్యాదా పురుషోత్తమ ॥',
    mantraMeaning: 'Embodiment of Dharma, Truth, Courage & Familial Righteousness',
    blessing: 'Infuses your household with victorious moral fortitude, fearlessness, integrity & family unity.',
    vastuZone: 'Pooja Mandir Center or East Living Wall',
    deityIcon: '🏹',
    dayImage: '/images/wall-decor/products/led/ayodhya-ram-mandir-sanctum.jpg',
    ledImage: '/images/wall-decor/categories/led-backlight/temple-designs-category.jpg',
    slug: 'ayodhya-ram-janmabhoomi-mandir-3d-led-wall-decor',
    accentColor: '#E67E22',
    haloRays: 'rgba(230, 126, 34, 0.35)',
  },
  {
    id: 'shiva',
    name: 'Adiyogi Lord Shiva (Cosmic Stillness)',
    shortName: 'Adiyogi Shiva',
    categoryLabel: 'Adiyogi Shiva',
    titleBadge: 'Crescent Moon & Sanctum Halo • Mahadev',
    sanskritMantra: '॥ ఓం నమః శివాయ • కర్పూర గౌరం కరుణావతారమ్ ॥',
    mantraMeaning: 'Primordial Master of Consciousness, Meditation & Inner Peace',
    blessing: 'Dissolves mental stress, anxiety & chaotic energy, awakening profound meditative stillness.',
    vastuZone: 'Northeast (Ishanya) or Meditation Alcove',
    deityIcon: '🌙',
    dayImage: '/images/wall-decor/products/shiva/shiva-led-backlight-frame.jpg',
    ledImage: '/images/wall-decor/categories/led-backlight/shiva-led-category.jpg',
    slug: 'adiyogi-lord-shiva-meditation-led-wall-decor',
    accentColor: '#85A392',
    haloRays: 'rgba(133, 163, 146, 0.35)',
  },
  {
    id: 'ganesha',
    name: 'Vighnaharta Ganesha (Shubh Labh)',
    shortName: 'Lord Ganesha',
    categoryLabel: 'Lord Ganesha',
    titleBadge: 'Prathama Pujya • Obstacle Remover',
    sanskritMantra: '॥ ఓం గం గణపతయే నమః • వక్రతుండ మహాకాయ ॥',
    mantraMeaning: 'Lord of Auspicious Beginnings, Intellect & Remover of Obstacles',
    blessing: 'Removes stumbling blocks in career & business, welcoming auspicious Shubh-Labh prosperity.',
    vastuZone: 'Main Entrance Facing Inward or Pooja Ghar',
    deityIcon: '🐘',
    dayImage: '/images/wall-decor/products/ganesha/ganesha-acrylic-gold-frame.jpg',
    ledImage: '/images/wall-decor/categories/led-backlight/ganesha-led-category.jpg',
    slug: 'lord-ganesha-auspicious-gold-leaf-acrylic-wall-art',
    accentColor: '#F1C40F',
    haloRays: 'rgba(241, 196, 15, 0.35)',
  },
  {
    id: 'radhakrishna',
    name: 'Divine Radha Krishna (Vrindavan Prem)',
    shortName: 'Radha Krishna',
    categoryLabel: 'Radha Krishna',
    titleBadge: 'Celestial Vrindavan Flute • Divine Love',
    sanskritMantra: '॥ రాధే రాధే • హరే కృష్ణ హరే రామ ॥',
    mantraMeaning: 'Supreme Archetype of Unconditional Devotion, Grace & Joy',
    blessing: 'Nurtures marital affection, emotional healing, mutual empathy & joyful home vibrations.',
    vastuZone: 'Living Room / North Sanctum',
    deityIcon: '🦚',
    dayImage: '/images/wall-decor/products/balaji/radha-krishna-acrylic-frame.jpg',
    ledImage: '/images/wall-decor/categories/devotional/radha-krishna-category.jpg',
    slug: 'radha-krishna-divine-flute-acrylic-wall-decor',
    accentColor: '#E8B4B8',
    haloRays: 'rgba(232, 180, 184, 0.35)',
  },
];

export interface CraftingLayer {
  id: string;
  num: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  thickness: string;
}

export const CRAFTING_LAYERS: CraftingLayer[] = [
  {
    id: 'acrylic',
    num: '01',
    title: '4mm Crystal Acrylic',
    tagline: 'DIAMOND POLISHED • 100% SHATTERPROOF • ULTRA HD',
    description: 'Museum-grade optical cast acrylic with diamond-polished beveled edges. Completely eliminates heavy glass breakage hazards while delivering deep 3D optical clarity.',
    icon: '💎',
    thickness: '4.0 mm',
  },
  {
    id: 'uvprint',
    num: '02',
    title: '24K Gold Foil & Swiss UV Print',
    tagline: '2400 DPI RESOLUTION • 25+ YEAR UV RESISTANT',
    description: 'Swiss 6-color curable UV inks paired with hand-embossed 24K pure gold leaf foil detailing. Sacred gold foils will never yellow, fade, or peel for 25+ years.',
    icon: '🪙',
    thickness: '0.3 mm',
  },
  {
    id: 'led',
    num: '03',
    title: '3000K Epistar LED Matrix',
    tagline: 'UNIFORM WARM GLOW • NO HOTSPOTS • ENERGY EFFICIENT',
    description: 'Concealed 3000K warm golden Epistar SMD LED diode matrix paired with an optical Light Guide Panel (LGP) to illuminate the sacred artwork and wall evenly without glare.',
    icon: '💡',
    thickness: '8.0 mm',
  },
  {
    id: 'backing',
    num: '04',
    title: 'White High-Reflectance Backing',
    tagline: 'RIGID SUPPORT • WARP RESISTANT • LIGHT MULTIPLIER',
    description: '3mm warp-resistant composite core with 98% forward light reflectance, directing diode radiance forward through the acrylic and out to create the sacred halo.',
    icon: '🛡️',
    thickness: '3.0 mm',
  },
  {
    id: 'frame',
    num: '05',
    title: 'Aluminium Profile & Brass Mounts',
    tagline: 'AEROSPACE GRADE • BRUSHED GOLD • CONCEALED MOUNTS',
    description: 'Precision-extruded brushed champagne-gold aluminium profile with concealed keyhole wall mounts and 4 solid brass corner standoff screw pins.',
    icon: '👑',
    thickness: '22.0 mm',
  },
];

export default function HeroRotatingFrames() {
  const [activeIndex, setActiveIndex] = useState(5); // Default to Radha Krishna matching reference
  const [isAartiMode, setIsAartiMode] = useState(true);
  const [isEntered, setIsEntered] = useState(false);
  const [transitionState, setTransitionState] = useState<'idle' | 'dissolving' | 'burst' | 'emerging'>('idle');
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });
  const [mouseCanvasPos, setMouseCanvasPos] = useState<{ x: number; y: number } | null>(null);
  const [showInspectModal, setShowInspectModal] = useState(false);
  const [inspectExplosion, setInspectExplosion] = useState(55);
  const [inspectActiveLayer, setInspectActiveLayer] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isTransformingRef = useRef(false);

  const total = DEITIES.length;
  const activeDeity = DEITIES[activeIndex];

  // Retrieve lighting mode preference from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('abhi_lighting_mode');
      if (saved !== null) {
        setIsAartiMode(saved === 'aarti');
      }
    } catch (e) {}
  }, []);

  const toggleLightingMode = (mode: 'day' | 'aarti') => {
    const isAarti = mode === 'aarti';
    setIsAartiMode(isAarti);
    try {
      localStorage.setItem('abhi_lighting_mode', isAarti ? 'aarti' : 'day');
    } catch (e) {}
  };

  // Homepage Entrance Animation (1.5s sequence)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEntered(true);
    }, 120);
    return () => clearTimeout(timer);
  }, []);

  // Preload all deity artwork images in the background so switching options is instantaneous
  useEffect(() => {
    DEITIES.forEach((d) => {
      if (typeof window !== 'undefined') {
        const img1 = new window.Image();
        img1.src = d.dayImage;
        const img2 = new window.Image();
        img2.src = d.ledImage;
      }
    });
  }, []);

  // Update transformation ref for canvas animation sync
  useEffect(() => {
    isTransformingRef.current = transitionState !== 'idle';
  }, [transitionState]);

  // =========================================================================
  // ANIMATION 3 & SIGNATURE ANIMATION: Golden Artwork Transformation (700-1000ms)
  // =========================================================================
  const handleSelectDeity = useCallback((targetIndex: number) => {
    if (targetIndex === activeIndex || transitionState !== 'idle') return;

    // Stage 1: Artwork Dissolution & Energy Gathering (0ms - 350ms)
    setTransitionState('dissolving');

    setTimeout(() => {
      // Stage 2: Radiant Golden Center Reveal & Index Switch (350ms - 500ms)
      setActiveIndex(targetIndex);
      setTransitionState('burst');

      setTimeout(() => {
        // Stage 3: Divine Emergence & Scaling into Place (500ms - 850ms)
        setTransitionState('emerging');

        setTimeout(() => {
          // Stage 4: Restored to Idle
          setTransitionState('idle');
        }, 350);
      }, 150);
    }, 350);
  }, [activeIndex, transitionState]);

  const handleNext = () => {
    handleSelectDeity((activeIndex + 1) % total);
  };

  const handlePrev = () => {
    handleSelectDeity((activeIndex - 1 + total) % total);
  };

  // =========================================================================
  // ANIMATION 1: 3D Parallax Tilt Physics & Floating Levitation
  // ANIMATION 4: Mouse-Based Specular Glass Reflection
  // =========================================================================
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -10;
    const tiltY = ((x - centerX) / centerX) * 10;
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;

    setTilt({ x: tiltX, y: tiltY });
    setShinePos({ x: shineX, y: shineY });

    if (containerRef.current) {
      const cRect = containerRef.current.getBoundingClientRect();
      setMouseCanvasPos({
        x: e.clientX - cRect.left,
        y: e.clientY - cRect.top,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setShinePos({ x: 50, y: 50 });
    setMouseCanvasPos(null);
  };

  // =========================================================================
  // ANIMATION 5: Floating Golden Particles (HTML5 Canvas 60 FPS)
  // Palette updated: Warm Amber #FFD58A, Champagne Accent #E8C77E, Gold #B88A35
  // =========================================================================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = 38;
    const colors = ['#FFF7ED', '#FFD58A', '#E8C77E', '#B88A35', '#D6AB54'];

    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      baseRadius: Math.random() * 1.8 + 0.8,
      radius: Math.random() * 1.8 + 0.8,
      speedY: Math.random() * 0.4 + 0.18,
      speedX: (Math.random() - 0.5) * 0.28,
      angle: Math.random() * Math.PI * 2,
      orbitRadius: Math.random() * 85 + 50,
      orbitSpeed: (Math.random() * 0.05 + 0.03) * (Math.random() > 0.5 ? 1 : -1),
      alpha: Math.random() * 0.75 + 0.25,
      sparklePhase: Math.random() * Math.PI * 2,
      sparkleSpeed: Math.random() * 0.04 + 0.02,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let frameCount = 0;

    const render = () => {
      frameCount++;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height * 0.38;
      const isTransforming = isTransformingRef.current;

      particles.forEach((p) => {
        p.sparklePhase += p.sparkleSpeed;
        const currentAlpha = Math.max(
          0.12,
          Math.min(0.95, p.alpha + Math.sin(p.sparklePhase) * 0.22)
        );

        if (isTransforming) {
          p.angle += p.orbitSpeed * 3.5;
          const targetX = centerX + Math.cos(p.angle) * p.orbitRadius;
          const targetY = centerY + Math.sin(p.angle) * p.orbitRadius;
          p.x += (targetX - p.x) * 0.14;
          p.y += (targetY - p.y) * 0.14;
        } else {
          p.y -= p.speedY;
          p.x += Math.sin(frameCount * 0.02 + p.sparklePhase) * 0.35 + p.speedX;

          if (mouseCanvasPos) {
            const dx = p.x - mouseCanvasPos.x;
            const dy = p.y - mouseCanvasPos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 90 && dist > 0) {
              const force = (90 - dist) / 90;
              p.x += (dx / dist) * force * 1.5;
              p.y += (dy / dist) * force * 1.5;
            }
          }

          if (p.y < -15) {
            p.y = height + 15;
            p.x = Math.random() * width;
          }
          if (p.x < -15) p.x = width + 15;
          if (p.x > width + 15) p.x = -15;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = isTransforming ? Math.min(1, currentAlpha * 1.4) : currentAlpha;
        ctx.shadowColor = '#FFD58A';
        ctx.shadowBlur = isTransforming ? 12 : 6;
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mouseCanvasPos]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowInspectModal(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[500px] sm:max-w-[540px] lg:max-w-[580px] flex flex-col items-center select-none"
    >
      {/* Lightweight HTML5 Canvas for Floating Golden Stardust Particles (60 FPS) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-85"
      />

      {/* =========================================================================
          1. TOP BAR: Sacred Mantra Pill, Daylight / 3000K Aarti Switch & Inspect Craft
         ========================================================================= */}
      <div
        className={`w-full flex items-center justify-between px-1 mb-1.5 z-20 transition-all duration-700 ${
          isEntered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        {/* Active Deity Sacred Mantra Pill */}
        <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-[#2D2D2D] shadow-xs max-w-[240px] sm:max-w-[280px] truncate">
          <Sparkles className="w-3 h-3 text-[#EAB308] shrink-0 animate-pulse" />
          <span className="font-telugu font-bold text-[11px] sm:text-[11.5px] text-[#FFFFFF] tracking-normal truncate">
            {activeDeity.sanskritMantra}
          </span>
        </div>

        {/* Right Controls: Daylight / 3000K Aarti Glow Toggle & Inspect Craft */}
        <div className="flex items-center gap-1.5">
          {/* Daylight vs 3000K Aarti Glow Switch */}
          <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-full border border-[#2D2D2D] shadow-xs">
            <button
              type="button"
              onClick={() => toggleLightingMode('day')}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-[10.5px] sm:text-[11px] font-bold transition-all duration-300 cursor-pointer ${
                !isAartiMode
                  ? 'bg-gradient-to-r from-[#181818] to-[#0A0A0A] text-[#FFFFFF] shadow-xs scale-[1.02]'
                  : 'text-[#D1D5DB] hover:text-[#FFFFFF]'
              }`}
              title="Daylight: Natural clear artwork visibility"
            >
              <Sun className="w-3 h-3 text-amber-500" />
              <span className="hidden xs:inline">Daylight</span>
            </button>

            <button
              type="button"
              onClick={() => toggleLightingMode('aarti')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[10.5px] sm:text-[11px] font-bold transition-all duration-300 cursor-pointer ${
                isAartiMode
                  ? 'bg-gradient-to-r from-[#EAB308] to-[#FACC15] text-[#FFFFFF] shadow-[0_0_14px_rgba(255,213,138,0.65)] scale-[1.02]'
                  : 'text-[#D1D5DB] hover:text-[#FFFFFF]'
              }`}
              title="3000K Aarti Glow: Warm golden illuminated atmosphere"
            >
              <Flame className="w-3 h-3 text-[#FFFFFF] animate-pulse" />
              <span>3000K Glow</span>
            </button>
          </div>

          {/* Inspect Craft Studio Button */}
          <button
            type="button"
            onClick={() => setShowInspectModal(true)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#181818] to-[#222222] hover:from-[#222222] hover:to-[#181818] text-[#FACC15] border border-[#EAB308]/70 px-2.5 sm:px-3 py-1.5 rounded-full text-[10.5px] sm:text-[11px] font-bold shadow-xs transition-all hover:scale-[1.03] cursor-pointer group"
            title="Open 3D craftsmanship inspection"
          >
            <Layers className="w-3 h-3 text-[#EAB308] group-hover:rotate-45 transition-transform" />
            <span className="hidden xs:inline">Inspect Craft</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          2. THE MAIN 3D PRODUCT FRAME (Visual Center of the Experience)
         ========================================================================= */}
      <div
        className="relative w-full h-[280px] sm:h-[310px] lg:h-[330px] xl:h-[345px] flex items-center justify-center my-1.5 sm:my-2 overflow-visible"
        style={{ perspective: '1200px' }}
      >
        {/* Soft Golden Outer Glow Halo & Rotating Conic Sunburst Rays (3000K LED Radiance #FFD58A) */}
        <div
          className={`absolute w-[270px] sm:w-[310px] lg:w-[340px] h-[270px] sm:h-[310px] lg:h-[340px] rounded-full blur-3xl pointer-events-none transition-all duration-700 -z-10 ${
            isAartiMode
              ? 'opacity-95 scale-100 animate-led-halo'
              : 'opacity-20 scale-85'
          }`}
          style={{
            background: `radial-gradient(circle, #FDE047 0%, #FACC15 30%, #EAB308 55%, #181818 75%, transparent 100%)`,
          }}
        />

        {/* Ambient Rotating Sunburst Rays (Visible in 3000K Aarti Mode) */}
        {isAartiMode && (
          <div
            className="absolute w-[340px] sm:w-[390px] lg:w-[420px] h-[340px] sm:h-[390px] lg:h-[420px] rounded-full pointer-events-none -z-10 opacity-35 animate-sunburst-rays"
            style={{
              background: `conic-gradient(from 0deg, rgba(184,138,53,0.2) 0deg, transparent 20deg, rgba(255,213,138,0.28) 45deg, transparent 65deg, rgba(184,138,53,0.2) 90deg, transparent 110deg, rgba(255,213,138,0.28) 135deg, transparent 155deg, rgba(184,138,53,0.2) 180deg, transparent 200deg, rgba(255,213,138,0.28) 225deg, transparent 245deg, rgba(184,138,53,0.2) 270deg, transparent 290deg, rgba(255,213,138,0.28) 315deg, transparent 335deg, rgba(184,138,53,0.2) 360deg)`,
            }}
          />
        )}

        {/* Circular Golden Energy Vortex Ring (Fires During Signature Transformation) */}
        {transitionState !== 'idle' && (
          <div className="absolute w-[230px] sm:w-[260px] h-[230px] sm:h-[260px] rounded-full border-2 border-[#FACC15] pointer-events-none z-30 animate-vortex-ring shadow-[0_0_25px_rgba(255,213,138,0.85)]" />
        )}

        {/* Radial Golden Pulse Burst (Fires at center reveal) */}
        {transitionState === 'burst' && (
          <div className="absolute w-[160px] h-[160px] rounded-full bg-gradient-to-r from-[#FFF7ED] via-[#FFD58A] to-[#FACC15] pointer-events-none z-30 animate-golden-burst" />
        )}

        {/* Left Peeking Frame (Clickable) */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-1 sm:left-2 lg:left-0 w-[45px] sm:w-[55px] lg:w-[65px] h-[190px] sm:h-[220px] lg:h-[240px] rounded-xl overflow-hidden opacity-35 hover:opacity-75 transition-all duration-300 transform -rotate-y-[22deg] scale-[0.85] shadow-md border border-[#2D2D2D]/60 cursor-pointer hidden xs:block z-10"
          aria-label="Previous Sacred Artwork"
        >
          <img
            src={DEITIES[(activeIndex - 1 + total) % total].dayImage}
            alt="Previous artwork"
            className="w-full h-full object-cover object-top filter brightness-75"
          />
        </button>

        {/* Continuous Smooth Vertical Levitation Wrapper */}
        <div className="relative animate-divine-float z-20">
          {/* Masterpiece 3D Floating Frame with Cursor Tilt & Specular Reflection */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: isEntered
                ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${
                    transitionState === 'dissolving'
                      ? 0.93
                      : transitionState === 'emerging'
                      ? 1.04
                      : isHovered
                      ? 1.03
                      : 1
                  })`
                : 'rotateX(8deg) rotateY(-8deg) scale(0.86)',
              transition:
                transitionState !== 'idle'
                  ? 'transform 350ms cubic-bezier(0.16, 1, 0.3, 1)'
                  : isHovered
                  ? 'transform 90ms ease-out'
                  : 'transform 750ms cubic-bezier(0.22, 1, 0.36, 1)',
              transformStyle: 'preserve-3d',
            }}
            className={`relative w-[190px] sm:w-[215px] lg:w-[235px] xl:w-[245px] aspect-[3/4.2] max-h-[265px] sm:max-h-[295px] lg:max-h-[315px] xl:max-h-[330px] rounded-2xl cursor-pointer select-none transition-opacity duration-500 ${
              isEntered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Dynamic Multi-Layer Shadow that shifts with mouse tilt & lighting mode */}
            <div
              className={`absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none -z-10 ${
                isAartiMode ? 'led-frame-glow-aarti' : 'led-frame-glow-day'
              }`}
              style={{
                transform: `translate3d(${-tilt.y * 1.5}px, ${tilt.x * 1.5 + 8}px, -20px)`,
              }}
            />

            {/* Double Ornate Gold Foil Outer Bevel Rim with 3000K LED Illumination */}
            <div
              className={`relative w-full h-full rounded-2xl p-2 transition-all duration-500 ${
                isAartiMode
                  ? 'bg-gradient-to-br from-[#FFF7ED] via-[#FEF08A] to-[#7D5B1E] ring-2 ring-[#FFF7CC] ring-offset-1 ring-offset-[#7D5B1E]'
                  : 'bg-gradient-to-br from-[#FAF7F0] via-[#E8D5BD] to-[#8C620B] ring-1 ring-[#EAB308]/80'
              }`}
            >
              {/* 4 Metallic Corner Brackets with Specular Gleam Highlights */}
              <div className="absolute top-1 left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-white/95 rounded-tl-sm pointer-events-none z-30 shadow-xs" />
              <div className="absolute top-1 right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-white/95 rounded-tr-sm pointer-events-none z-30 shadow-xs" />
              <div className="absolute bottom-1 left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-white/95 rounded-bl-sm pointer-events-none z-30 shadow-xs" />
              <div className="absolute bottom-1 right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-white/95 rounded-br-sm pointer-events-none z-30 shadow-xs" />

              {/* Inner Crystal Acrylic Artwork Stage */}
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#121212] border border-amber-300/80 shadow-inner">
                {/* Authentic Deity Product Artwork with Smooth Transformation Transition */}
                <div
                  className={`w-full h-full transition-all duration-350 ease-out ${
                    transitionState === 'dissolving'
                      ? 'opacity-0 scale-95 blur-xs'
                      : transitionState === 'burst'
                      ? 'opacity-85 scale-102 blur-0'
                      : 'opacity-100 scale-100 blur-0'
                  }`}
                >
                  <img
                    src={isAartiMode ? activeDeity.ledImage : activeDeity.dayImage}
                    alt={activeDeity.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-104"
                    width={520}
                    height={700}
                  />
                </div>

                {/* 4 Solid Brass Standoff Screw Pins with Light Reflections */}
                <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-[#7D5B1E] via-[#FEF08A] to-[#EAB308] border border-white/90 shadow-xs pointer-events-none z-30" />
                <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-[#7D5B1E] via-[#FEF08A] to-[#EAB308] border border-white/90 shadow-xs pointer-events-none z-30" />
                <div className="absolute bottom-10 left-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-[#7D5B1E] via-[#FEF08A] to-[#EAB308] border border-white/90 shadow-xs pointer-events-none z-30" />
                <div className="absolute bottom-10 right-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-[#7D5B1E] via-[#FEF08A] to-[#EAB308] border border-white/90 shadow-xs pointer-events-none z-30" />

                {/* ANIMATION 4: Dynamic Specular Glass Reflection Layer (Tracks Cursor) */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-250"
                  style={{
                    background: `radial-gradient(circle 240px at ${shinePos.x}% ${shinePos.y}%, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.08) 45%, transparent 70%)`,
                    opacity: isHovered ? 1 : 0.45,
                  }}
                />

                {/* Occasional Acrylic Glare Sweep Animation Across Glass */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                  <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] animate-acrylic-shine" />
                </div>

                {/* 24K Gold Foil Consecration Badge */}
                <div className="absolute top-2 right-2 bg-[#121212]/90 backdrop-blur-md px-2 py-0.5 rounded-full border border-[#EAB308]/60 text-[8.5px] font-bold text-[#FACC15] z-20 flex items-center gap-1 shadow-xs">
                  <Sparkles className="w-2.5 h-2.5 text-[#FACC15]" />
                  <span>24K Gold Foil</span>
                </div>

                {/* Bottom Artwork Information Plaque */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A0A0A] via-[#121212]/85 to-transparent p-2 text-left pointer-events-none z-20">
                  <span className="text-[#FACC15] font-bold text-[9px] tracking-wide block truncate">
                    {activeDeity.deityIcon} {activeDeity.titleBadge}
                  </span>
                  <h3 className="font-serif font-bold text-white text-[11.5px] sm:text-[12px] drop-shadow-md line-clamp-1 mt-0.5">
                    {activeDeity.name}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Peeking Frame (Clickable) */}
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-1 sm:right-2 lg:right-0 w-[45px] sm:w-[55px] lg:w-[65px] h-[190px] sm:h-[220px] lg:h-[240px] rounded-xl overflow-hidden opacity-35 hover:opacity-75 transition-all duration-300 transform rotate-y-[22deg] scale-[0.85] shadow-md border border-[#2D2D2D]/60 cursor-pointer hidden xs:block z-10"
          aria-label="Next Sacred Artwork"
        >
          <img
            src={DEITIES[(activeIndex + 1) % total].dayImage}
            alt="Next artwork"
            className="w-full h-full object-cover object-top filter brightness-75"
          />
        </button>
      </div>

      {/* =========================================================================
          3. INTERACTIVE DEITY CATEGORY NAVIGATION (Preserving Exact Categories)
         ========================================================================= */}
      <div className="w-full mt-1 sm:mt-1.5 flex flex-col items-center gap-1 z-20">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 sm:gap-1.5 w-full max-w-[440px] sm:max-w-[540px]">
          {DEITIES.map((deity, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={deity.id}
                type="button"
                onClick={() => handleSelectDeity(idx)}
                style={{
                  transitionDelay: `${idx * 40}ms`,
                }}
                className={`flex items-center justify-center gap-1 py-1 sm:py-1.5 px-1.5 sm:px-2 rounded-xl text-[10.5px] sm:text-[11px] font-semibold transition-all duration-300 outline-none cursor-pointer truncate ${
                  isEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                } ${
                  isActive
                    ? 'bg-gradient-to-r from-[#181818] to-[#0A0A0A] text-[#FFFFFF] border border-[#EAB308] shadow-[0_4px_14px_rgba(100,30,46,0.35)] font-bold scale-[1.03] ring-1 ring-[#E8C77E]/60'
                    : 'bg-white/95 hover:bg-white text-[#FFFFFF] border border-[#2D2D2D] hover:border-[#EAB308]/70 shadow-2xs hover:-translate-y-0.5'
                }`}
                aria-label={`Select ${deity.categoryLabel}`}
              >
                <span className="shrink-0 text-xs">{deity.deityIcon}</span>
                <span className="truncate">{deity.shortName}</span>
              </button>
            );
          })}
        </div>

        {/* Slim Progress Indicator Line */}
        <div className="w-24 h-1 bg-[#E8D5BD]/80 rounded-full overflow-hidden my-0.5">
          <div
            className="h-full bg-gradient-to-r from-[#EAB308] to-[#181818] rounded-full transition-all duration-500"
            style={{
              width: `${((activeIndex + 1) / total) * 100}%`,
            }}
          />
        </div>

        {/* =========================================================================
            4. NAVIGATION CONTROLS & DIRECT EXPLORE FRAME CTA
           ========================================================================= */}
        <div
          className={`flex items-center justify-between w-full max-w-[440px] sm:max-w-[540px] px-1 text-xs mt-0.5 sm:mt-1 transition-all duration-500 ${
            isEntered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            type="button"
            onClick={handlePrev}
            className="p-1.5 rounded-full bg-white hover:bg-[#121212] text-[#FFFFFF] shadow-xs border border-[#2D2D2D] hover:border-[#EAB308] transition-all hover:scale-105 active:scale-95 outline-none cursor-pointer"
            aria-label="Previous Sacred Artwork"
            title="Previous artwork"
          >
            <ChevronLeft className="w-4 h-4 text-[#FFFFFF]" />
          </button>

          <Link
            href={`/product/${activeDeity.slug}`}
            className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[#181818] to-[#0A0A0A] hover:from-[#222222] hover:to-[#181818] text-[#FFFFFF] font-semibold text-xs px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-[#EAB308]/70 shadow-xs transition-all hover:scale-[1.03] active:scale-95 group"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FACC15]" />
            <span>Explore {activeDeity.shortName} Frame</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FACC15] group-hover:translate-x-1 transition-transform" />
          </Link>

          <button
            type="button"
            onClick={handleNext}
            className="p-1.5 rounded-full bg-white hover:bg-[#121212] text-[#FFFFFF] shadow-xs border border-[#2D2D2D] hover:border-[#EAB308] transition-all hover:scale-105 active:scale-95 outline-none cursor-pointer"
            aria-label="Next Sacred Artwork"
            title="Next artwork"
          >
            <ChevronRight className="w-4 h-4 text-[#FFFFFF]" />
          </button>
        </div>
      </div>

      {/* =========================================================================
          6. INSPECT CRAFT 3D EXPLODED LAYER STUDIO MODAL
         ========================================================================= */}
      {showInspectModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setShowInspectModal(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-gradient-to-b from-[#121212] via-[#181818] to-[#121212] border border-[#EAB308]/70 rounded-3xl p-5 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-[#FFFFFF] animate-in zoom-in-95 duration-200 select-none overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Ambient Golden Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#EAB308]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-[#EAB308]/30 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#181818] text-[#FACC15] border border-[#EAB308]/50 flex items-center justify-center shadow-xs">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#FACC15]">
                    3D Craftsmanship &amp; Layer Architecture
                  </h3>
                  <p className="text-[11px] text-[#E5E7EB]/80">
                    Precision engineering behind Abhi Gifts 4mm Crystal Acrylic Heirlooms
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowInspectModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#E5E7EB] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Inspection Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 3D Exploded Layer Visualizer */}
            <div className="relative py-4 z-10">
              {/* Explosion Distance Slider */}
              <div className="flex items-center justify-between gap-4 mb-4 bg-white/5 p-2.5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2 text-xs text-[#FACC15] font-bold">
                  <Sliders className="w-3.5 h-3.5 text-[#EAB308]" />
                  <span>3D Layer Explosion:</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="85"
                  value={inspectExplosion}
                  onChange={(e) => setInspectExplosion(Number(e.target.value))}
                  className="flex-1 accent-[#B88A35] cursor-pointer"
                />
                <span className="text-xs font-mono text-[#E5E7EB] w-8 text-right">
                  {inspectExplosion}%
                </span>
              </div>

              {/* 5 Layer Stack Cards */}
              <div className="space-y-2 max-h-[310px] overflow-y-auto pr-1">
                {CRAFTING_LAYERS.map((layer, idx) => {
                  const isSelected = idx === inspectActiveLayer;
                  return (
                    <div
                      key={layer.id}
                      onClick={() => setInspectActiveLayer(idx)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#181818]/90 to-[#0A0A0A]/90 border-[#EAB308] shadow-[0_0_18px_rgba(184,138,53,0.3)] ring-1 ring-[#EAB308]/50'
                          : 'bg-white/5 hover:bg-white/10 border-white/10'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="text-lg">{layer.icon}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-serif font-bold text-sm text-[#FACC15]">
                                Layer {layer.num}: {layer.title}
                              </span>
                              <span className="text-[10px] font-mono text-[#EAB308] bg-black/40 px-1.5 py-0.5 rounded-md border border-[#EAB308]/30">
                                {layer.thickness}
                              </span>
                            </div>
                            <span className="text-[10px] text-[#EAB308] font-semibold tracking-wider block mt-0.5">
                              {layer.tagline}
                            </span>
                          </div>
                        </div>

                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs border ${
                            isSelected
                              ? 'bg-[#EAB308] text-[#FFFFFF] border-[#EAB308]'
                              : 'bg-transparent text-transparent border-white/20'
                          }`}
                        >
                          ✓
                        </span>
                      </div>

                      {isSelected && (
                        <p className="text-xs text-[#E5E7EB] mt-2 pt-2 border-t border-white/10 leading-relaxed font-sans">
                          {layer.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer Trust Guarantees */}
            <div className="pt-3 border-t border-[#EAB308]/30 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#E5E7EB] relative z-10">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#EAB308]" />
                <span>100% Shatterproof Guarantee</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#EAB308]" />
                <span>25+ Year Non-Fade Guarantee</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#EAB308]" />
                <span>BIS-Certified 12V 2A Adapter</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
