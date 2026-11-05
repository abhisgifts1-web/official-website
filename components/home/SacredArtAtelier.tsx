'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Layers,
  ShieldCheck,
  Check,
  Zap,
  ArrowRight,
  Eye,
  Sliders,
  CheckCircle2,
  Gem,
  Sun,
  Moon,
  ShoppingBag,
  Play,
  RotateCcw,
  Compass,
  Palette,
  Truck,
  Flame,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from 'lucide-react';

export interface DivineArtwork {
  id: string;
  deityName: string;
  subtitle: string;
  editorialTitle: string;
  description: string;
  heroImage: string;
  hasLed: boolean;
  basePrice: number;
  baseMrp: number;
  productSlug: string;
  productId: string;
  sku: string;
}

const ARTWORKS: DivineArtwork[] = [
  {
    id: 'ganesha',
    deityName: 'Lord Ganesha',
    subtitle: 'Vighnaharta • Siddhi Vinayaka',
    editorialTitle: 'Lord Ganesha Vighnaharta Divine LED Wall Art',
    description:
      'Consecrated with auspicious vibrations, featuring Lord Ganesha adorned in sacred sindoor red, turmeric gold, and deep saffron pigments. Finished with precision-cut acrylic clarity and a soothing warm golden halo.',
    heroImage: '/images/atelier/hero-ganesha-legacy.jpg',
    hasLed: true,
    basePrice: 3299,
    baseMrp: 6499,
    productSlug: 'lord-ganesha-vighnaharta-divine-led-backlit-acrylic-art',
    productId: 'prod-ganesha-vighnaharta-led',
    sku: 'AG-GAN-LED-SQ',
  },
  {
    id: 'lakshmi',
    deityName: 'Goddess Lakshmi',
    subtitle: 'Maha Lakshmi • Ashta Lakshmi Prosperity',
    editorialTitle: 'Goddess Mahalakshmi Prosperity Divine LED Backlit Acrylic Art',
    description:
      'Consecrate your home with the benevolent grace of Goddess Lakshmi seated on a consecrated pink lotus. Detailed with pure gold leaf embellishments on the sacred Kalash, halos, and temple filigree with radiant warm warm backlighting.',
    heroImage: '/images/atelier/hero-lakshmi-legacy.jpg',
    hasLed: true,
    basePrice: 3499,
    baseMrp: 6999,
    productSlug: 'goddess-mahalakshmi-prosperity-divine-led-backlit-acrylic-art',
    productId: 'prod-lakshmi-prosperity-led',
    sku: 'AG-LAK-LED-SQ',
  },
  {
    id: 'krishna',
    deityName: 'Lord Krishna',
    subtitle: 'Radha Krishna • Vrindavan Melody',
    editorialTitle: 'Radha Krishna Divine Bansuri & Kamadhenu 3D LED Art',
    description:
      'Celebrate eternal divine harmony with delicate emerald tones, gentle cow companion (Kamadhenu), and golden flute accents. An enchanting nocturnal artwork that glows softly with warm sacred serenity.',
    heroImage: '/images/atelier/hero-krishna-legacy.jpg',
    hasLed: true,
    basePrice: 3299,
    baseMrp: 6599,
    productSlug: 'radha-krishna-divine-bansuri-3d-led-acrylic-wall-art',
    productId: 'prod-radha-krishna-divine-led',
    sku: 'AG-RK-LED-SQ',
  },
  {
    id: 'ram',
    deityName: 'Lord Ram',
    subtitle: 'Ayodhya Mandir • Nagara Architecture',
    editorialTitle: 'Ayodhya Ram Mandir Architectural 3D LED Wall Art',
    description:
      'Commemorate the historic Shri Ram Janmabhoomi Mandir with majestic Nagara-style stone carvings, towering Shikhara spires, and consecrated saffron flag illuminated by warm amber temple lighting.',
    heroImage: '/images/atelier/hero-ram-legacy.jpg',
    hasLed: true,
    basePrice: 3499,
    baseMrp: 6999,
    productSlug: 'ayodhya-ram-janmabhoomi-mandir-3d-led-wall-decor',
    productId: 'prod-ayodhya-ram-mandir-illuminated',
    sku: 'AG-RAM-LED-SQ',
  },
];


interface LayerItem {
  id: string;
  number: string;
  numBadge: number;
  title: string;
  subtitle: string;
  oneLiner: string;
  description: string;
  material: string;
  image: string;
  hotspot: { top: string; left: string };
  explodedOffset: { x: number; y: number; z: number };
}

const LAYERS_DATA: LayerItem[] = [
  {
    id: 'acrylic',
    number: '01',
    numBadge: 1,
    title: 'crystal Diamond Cast Acrylic Shield',
    subtitle: 'Transparent front panel & optical protection',
    oneLiner: 'Zero-glass hazard with CNC 45° precision-polished beveled edges.',
    description:
      'Engineered from crystal virgin optical-grade cast acrylic with 99.2% crystalline optical purity. precision-cut CNC 45-degree beveled edges capture ambient room light like a gemstone while shielding sacred pigments from moisture and dust.',
    material: 'crystal Virgin Optical-Grade Cast Acrylic',
    image: '/images/atelier/layer-1-acrylic-shield.jpg',
    hotspot: { top: '16%', left: '18%' },
    explodedOffset: { x: -60, y: -30, z: 80 },
  },
  {
    id: 'artwork',
    number: '02',
    numBadge: 2,
    title: '1200 DPI Archival Micro-Pigment Layer',
    subtitle: 'High-definition sacred print on archival medium',
    oneLiner: 'Direct flatbed UV cured micro-piezo print that never fades.',
    description:
      'Consecrated imagery of Lord Ganesha rendered with Japanese micro-piezo technology at 1200 DPI. UV-cured nanometer pigments lock in rich sindoor reds, saffron turmeric tones, and intricate divine expressions with long-lasting vibrancy of color stability.',
    material: '1200 DPI Direct Flatbed UV-Cured Pigments',
    image: '/images/atelier/layer-2-devotional-art.jpg',
    hotspot: { top: '48%', left: '50%' },
    explodedOffset: { x: -30, y: -15, z: 40 },
  },
  {
    id: 'gold',
    number: '03',
    numBadge: 3,
    title: 'pure gold leaf Embellishment',
    subtitle: 'Metallic gold ornamental detailing on halos & crown',
    oneLiner: 'Hand-applied pure gold leaf filigree on crown, halos & mantras.',
    description:
      'Master guild artisans hand-lay authentic pure gold leaf along Lord Ganesha’s sacred Mukut crown, radiant aureole halo, and traditional temple arch borders, creating a reverent golden sheen that glimmers under ambient sanctum lighting.',
    material: 'Authentic pure gold leaf Foil',
    image: '/images/atelier/layer-3-gold-embellishment.jpg',
    hotspot: { top: '30%', left: '72%' },
    explodedOffset: { x: 0, y: 0, z: 0 },
  },
  {
    id: 'lighting',
    number: '04',
    numBadge: 4,
    title: 'Calibrated warm Epistar LED Light-Guide',
    subtitle: 'Calibrated warm warm ambient halo glow',
    oneLiner: 'Even perimeter dispersion emulating the sacred warmth of brass temple diyas.',
    description:
      'Concealed low-voltage warm Epistar LED perimeter diodes paired with an optical light-guide plate cast a tranquil, glare-free golden aura across walls—recreating the sacred meditative glow of sanctum oil lamps.',
    material: 'Low-Voltage Calibrated warm Epistar LED Array',
    image: '/images/atelier/layer-4-led-lightguide.jpg',
    hotspot: { top: '70%', left: '88%' },
    explodedOffset: { x: 30, y: 15, z: -40 },
  },
  {
    id: 'finishing',
    number: '05',
    numBadge: 5,
    title: 'Moisture-Armor Backing & Solid Standoffs',
    subtitle: 'Rear moisture support & brass-finish corner standoffs',
    oneLiner: 'French cleat wall lock with solid brass-finish standoff studs.',
    description:
      'Reinforced composite backplane seals the artwork hermetically against wall dampness. Outfitted with solid brass-finish corner standoff bolts and an integrated French cleat for safe, effortless 1-inch floating suspension.',
    material: 'Moisture-Armor Composite Panel & Solid Brass Standoffs',
    image: '/images/atelier/layer-5-standoffs-backing.jpg',
    hotspot: { top: '85%', left: '16%' },
    explodedOffset: { x: 60, y: 30, z: -80 },
  },
];

interface CraftsmanshipStage {
  id: number;
  stageNumber: string;
  stageLabel: string;
  title: string;
  shortDesc: string;
  fullStory: string;
  image: string;
  imageHd: string;
  specs: string[];
}

const CRAFTSMANSHIP_STAGES: CraftsmanshipStage[] = [
  {
    id: 1,
    stageNumber: '01',
    stageLabel: 'THE MATERIAL',
    title: 'Clarity Begins Here',
    shortDesc:
      'Carefully prepared acrylic and selected materials create the foundation for a refined finish.',
    fullStory:
      'We select crystal high-density imported virgin cast acrylic, inspected under polarized lighting to guarantee 99.2% crystalline optical purity. Each sheet undergoes precision-cut CNC 45-degree beveling that polishes the perimeter to gemstone clarity, ensuring scratch resistance and zero discoloration over long-lasting vibrancy.',
    image: '/images/atelier/stage-1-clarity.jpg',
    imageHd: '/images/atelier/stage-1-clarity-hd.jpg',
    specs: ['crystal Virgin Cast Acrylic', '99.2% Optical Clarity', 'precision-cut 45° CNC Edges'],
  },
  {
    id: 2,
    stageNumber: '02',
    stageLabel: 'THE ARTWORK',
    title: 'Every Detail Matters',
    shortDesc:
      'Rich devotional artwork brings colour, expression, and intricate ornamentation to life.',
    fullStory:
      'Lord Ganesha’s auspicious iconography is rendered with high-precision Japanese flatbed micro-piezo technology at 1200 DPI. Nanometer-fine pigment droplets cure directly into the cast acrylic, producing deep sindoor reds, saffron turmeric tones, and gold ornaments that radiate sacred serenity from every perspective.',
    image: '/images/atelier/stage-2-artwork.jpg',
    imageHd: '/images/atelier/stage-2-artwork-hd.jpg',
    specs: ['1200 DPI Micro-Piezo Print', 'Archival UV-Cured Pigments', 'long-lasting vibrancy Color Lock'],
  },
  {
    id: 3,
    stageNumber: '03',
    stageLabel: 'THE CRAFT',
    title: 'Precision in Every Layer',
    shortDesc:
      'Decorative elements and carefully aligned components come together in a considered assembly.',
    fullStory:
      'Inside our anti-static Hyderabad cleanroom, master guild artisans hand-apply genuine pure gold leaf embellishments to the sacred Mukut crown, divine halos, and Vedic mantras. Low-voltage warm Epistar LED perimeter channels are calibrated and sealed with moisture-resistant composite armor.',
    image: '/images/atelier/stage-3-craft.jpg',
    imageHd: '/images/atelier/stage-3-craft-hd.jpg',
    specs: ['pure gold leaf Embellishment', 'Calibrated warm Epistar LEDs', 'Hermetic Cleanroom Assembly'],
  },
  {
    id: 4,
    stageNumber: '04',
    stageLabel: 'THE MASTERPIECE',
    title: 'Made to Be Cherished',
    shortDesc:
      'The completed frame becomes a beautiful centrepiece for a home or pooja room.',
    fullStory:
      'Fitted with stainless steel standoffs and an integrated French cleat lock, the finished consecrated Lord Ganesha artwork floats effortlessly 1 inch off the wall. As evening brass diyas glow, the ambient warm backlight illuminates sacred walls with holy temple warmth.',
    image: '/images/atelier/stage-4-masterpiece.jpg',
    imageHd: '/images/atelier/stage-4-masterpiece-hd.jpg',
    specs: ['1-Inch Floating French Cleat', 'Sanctum & Pooja Room Ready', 'Consecrated Temple Aesthetics'],
  },
];

export default function SacredArtAtelier() {
  // Selected artwork (Lord Ganesha as default)
  const [selectedArtwork, setSelectedArtwork] = useState<DivineArtwork>(ARTWORKS[0]);

  // Selected layer in Section 2
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number | null>(null);

  // Viewing mode: 'complete' vs 'exploded'
  const [viewMode, setViewMode] = useState<'complete' | 'exploded'>('complete');

  const handleSelectLayer = (idx: number) => {
    setSelectedLayerIndex((prev) => (prev === idx ? null : idx));
  };

  const handlePrevLayer = () => {
    setSelectedLayerIndex((prev) =>
      prev === null ? LAYERS_DATA.length - 1 : (prev - 1 + LAYERS_DATA.length) % LAYERS_DATA.length
    );
  };

  const handleNextLayer = () => {
    setSelectedLayerIndex((prev) =>
      prev === null ? 0 : (prev + 1) % LAYERS_DATA.length
    );
  };

  const handleViewComplete = () => {
    setViewMode('complete');
    setSelectedLayerIndex(null);
  };

  // Craftsmanship stage modal and hover states
  const [selectedStageModal, setSelectedStageModal] = useState<CraftsmanshipStage | null>(null);
  const [hoveredStageId, setHoveredStageId] = useState<number | null>(null);

  // Modal keyboard accessibility
  useEffect(() => {
    if (!selectedStageModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedStageModal(null);
      } else if (e.key === 'ArrowLeft') {
        const idx = CRAFTSMANSHIP_STAGES.findIndex((s) => s.id === selectedStageModal.id);
        const prevIdx = (idx - 1 + CRAFTSMANSHIP_STAGES.length) % CRAFTSMANSHIP_STAGES.length;
        setSelectedStageModal(CRAFTSMANSHIP_STAGES[prevIdx]);
      } else if (e.key === 'ArrowRight') {
        const idx = CRAFTSMANSHIP_STAGES.findIndex((s) => s.id === selectedStageModal.id);
        const nextIdx = (idx + 1) % CRAFTSMANSHIP_STAGES.length;
        setSelectedStageModal(CRAFTSMANSHIP_STAGES[nextIdx]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedStageModal]);

  // Mouse parallax for Hero
  const [heroTilt, setHeroTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const heroContainerRef = useRef<HTMLDivElement>(null);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroContainerRef.current) return;
    const rect = heroContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setHeroTilt({ x: -y * 6, y: x * 8 });
  };

  const handleHeroMouseLeave = () => {
    setHeroTilt({ x: 0, y: 0 });
  };

  // Scroll helpers
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const activeLayer = selectedLayerIndex !== null ? LAYERS_DATA[selectedLayerIndex] : null;

  return (
    <div className="w-full bg-white text-stone-900 select-none font-sans overflow-x-hidden">
      
      {/* =========================================================================
          PANEL 1: SECTION ONE — CINEMATIC HERO (Matching Top-Left Quadrant)
          ========================================================================= */}
      <section
        ref={heroContainerRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative min-h-[85vh] lg:min-h-[90vh] w-full flex items-center justify-center px-4 sm:px-8 lg:px-14 py-12 lg:py-16 overflow-hidden bg-stone-50 border-y border-stone-200 text-stone-900"
      >
        {/* Warm Candlelit Bokeh & Golden Atmosphere */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-amber-200/25 rounded-full blur-[120px] pointer-events-none animate-led-halo" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-100/40 rounded-full blur-[130px] pointer-events-none" />

        {/* Ambient Floating Gold Dust Particles */}
        <div className="absolute top-1/5 left-[12%] w-1.5 h-1.5 rounded-full bg-amber-400/70 blur-[0.5px] pointer-events-none animate-sparkle-float" />
        <div className="absolute top-2/5 right-[15%] w-2 h-2 rounded-full bg-amber-500/60 blur-[0.5px] pointer-events-none animate-sparkle-float [animation-delay:1.8s]" />
        <div className="absolute bottom-1/3 left-[28%] w-1 h-1 rounded-full bg-amber-300/80 pointer-events-none animate-sparkle-float [animation-delay:3.2s]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Side: Editorial Typography & Actions */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
            
            {/* Overline with Lotus Divider: — 🪷 — */}
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-serif font-bold uppercase tracking-[0.25em] text-amber-800 block">
                THE ART OF DIVINE CRAFTSMANSHIP
              </span>
              <div className="flex items-center gap-3 text-amber-600 max-w-xs">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-amber-400" />
                <span className="text-sm animate-pulse">🪷</span>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-amber-400" />
              </div>
            </div>

            {/* Large Editorial Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl leading-[1.08] tracking-tight text-stone-900">
              Not Just a Frame.{' '}
              <span className="block font-serif italic font-normal text-amber-800 drop-shadow-xs">
                A Legacy of Devotion.
              </span>
            </h1>

            {/* Subtitle Paragraph */}
            <p className="font-sans text-sm sm:text-base lg:text-lg text-stone-600 leading-relaxed max-w-xl font-normal">
              Every detail is thoughtfully crafted to transform sacred art into a timeless centrepiece for your home.
            </p>

            {/* Buttons (Matching Reference Design) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => scrollToSection('section-craft')}
                className="relative group inline-flex items-center gap-2 bg-[#EAB308] hover:bg-[#FACC15] text-[#000000] font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full shadow-md transition-all cursor-pointer active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 font-extrabold">EXPLORE THE CRAFT</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] pointer-events-none animate-acrylic-shine" />
              </button>

              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 hover:border-amber-500 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow-xs transition-all cursor-pointer"
              >
                <span>DISCOVER ALL FRAMES</span>
                <span>→</span>
              </Link>
            </div>

            {/* Horizontal 4-Deity Selector (Quick Switcher) */}
            <div className="pt-6 border-t border-stone-200 space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-900 block">
                SELECT DIVINE ICONOGRAPHY:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {ARTWORKS.map((art) => {
                  const isSelected = selectedArtwork.id === art.id;
                  return (
                    <button
                      key={art.id}
                      onClick={() => setSelectedArtwork(art)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#EAB308] text-stone-950 font-bold shadow-xs scale-105'
                          : 'bg-white text-stone-700 hover:text-stone-900 border border-stone-200 hover:border-amber-400'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-stone-950' : 'bg-amber-500'}`} />
                      <span>{art.deityName}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Showcase for the 4 Divine Masterpieces */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-4">
            <div
              className="relative w-full max-w-[520px] aspect-[4/3] sm:aspect-[16/11] transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1000px) rotateX(${heroTilt.x}deg) rotateY(${heroTilt.y}deg)`,
              }}
            >
              {/* Soft Golden Halo Glow Spill */}
              <div className="absolute -inset-4 sm:-inset-6 rounded-3xl bg-gradient-to-r from-[#C99B45]/30 via-[#F0D79B]/45 to-[#C99B45]/30 blur-[50px] pointer-events-none animate-aarti-corona" />

              {/* Realistic Shadow on Table */}
              <div className="absolute -bottom-6 inset-x-6 h-8 bg-stone-400/30 rounded-full blur-[20px] pointer-events-none" />

              {/* Ultra-Realistic Luxury Altar Frame Container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-amber-300 shadow-xl ring-1 ring-amber-100 bg-stone-900 flex items-center justify-center group">
                
                {/* Selected Deity Artwork */}
                <img
                  src={selectedArtwork.heroImage}
                  alt={selectedArtwork.editorialTitle}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />

                {/* Ambient Subtle Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Animated Diagonal Specular Sheen Sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] pointer-events-none animate-acrylic-shine" />

                {/* 4 Corner Gold Standoff Studs with Twinkle */}
                <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-gradient-to-br from-[#F0D79B] via-[#C99B45] to-[#8C6737] shadow border border-amber-950/60 pointer-events-none animate-stud-twinkle-1" />
                <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-gradient-to-br from-[#F0D79B] via-[#C99B45] to-[#8C6737] shadow border border-amber-950/60 pointer-events-none animate-stud-twinkle-2" />
                <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-gradient-to-br from-[#F0D79B] via-[#C99B45] to-[#8C6737] shadow border border-amber-950/60 pointer-events-none animate-stud-twinkle-3" />
                <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-gradient-to-br from-[#F0D79B] via-[#C99B45] to-[#8C6737] shadow border border-amber-950/60 pointer-events-none animate-stud-twinkle-4" />

                {/* Top-Right Badge: LED Aura */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-stone-900/85 backdrop-blur-md px-3 py-1 rounded-full border border-amber-400/50 text-[10px] font-mono text-amber-300 flex items-center gap-1.5 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15] animate-pulse" />
                  <span>warm Backlit Aura</span>
                </div>
              </div>

              {/* Decorative Diya & Consecrated Sanctum Badge */}
              <div className="absolute -bottom-4 inset-x-6 z-20 flex justify-center animate-badge-float">
                <div className="bg-white/95 backdrop-blur-md border border-stone-200 px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2">
                  <span className="text-sm animate-pulse">🪔</span>
                  <span className="text-xs font-serif font-bold text-stone-900 tracking-wide">
                    {selectedArtwork.deityName} • Consecrated 3D LED Frame
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive 4-Deity Mini Gallery Strip Below Frame */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full max-w-[520px] pt-4">
              {ARTWORKS.map((art) => {
                const isSelected = selectedArtwork.id === art.id;
                return (
                  <button
                    key={art.id}
                    type="button"
                    onClick={() => setSelectedArtwork(art)}
                    className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer text-left focus:outline-none ${
                      isSelected
                        ? 'border-amber-400 ring-2 ring-amber-300 scale-105 shadow-md'
                        : 'border-stone-200 hover:border-amber-400/70 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="relative aspect-[4/3] bg-stone-900">
                      <img
                        src={art.heroImage}
                        alt={art.deityName}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                      <div className="absolute bottom-1 inset-x-1 text-center">
                        <span className="text-[10px] font-serif font-bold text-white line-clamp-1">
                          {art.deityName}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#F0D79B] ring-1 ring-black" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PANEL 2: "INSIDE THE CRAFT" — Beauty, Built Layer by Layer (Interactive Product Anatomy)
          ========================================================================= */}
      <section
        id="section-layers"
        className="relative w-full pt-10 sm:pt-14 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-12 xl:px-16 bg-white border-b border-stone-200 text-stone-900 overflow-hidden"
      >
        {/* Subtle Ambient Golden Glow in Background */}
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[400px] bg-amber-50/60 rounded-full blur-[140px] pointer-events-none" />

        {/* Ambient Floating Gold Dust Particles */}
        <div className="absolute top-1/4 right-[20%] w-1.5 h-1.5 rounded-full bg-[#F0D79B]/60 blur-[0.5px] pointer-events-none animate-sparkle-float" />
        <div className="absolute bottom-1/3 left-[15%] w-1.5 h-1.5 rounded-full bg-[#EAB308]/50 blur-[0.5px] pointer-events-none animate-sparkle-float [animation-delay:2.2s]" />

        <div className="max-w-[1440px] mx-auto space-y-8 sm:space-y-10 relative z-10">
          
          {/* 1. Refined Editorial Heading */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] text-amber-800 uppercase block">
              INSIDE THE CRAFT
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
              Beauty, Built <span className="font-serif italic text-amber-800">Layer by Layer.</span>
            </h2>
            <p className="font-serif italic text-sm sm:text-base text-stone-600 max-w-xl mx-auto">
              Discover the details that make every frame special.
            </p>
            {/* Small decorative gold divider */}
            <div className="flex items-center justify-center gap-3 pt-2 text-amber-600">
              <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-amber-400" />
              <span className="w-1.5 h-1.5 rotate-45 bg-amber-500 animate-pulse" />
              <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent to-amber-400" />
            </div>
          </div>

          {/* 2. Main Visual: Product Viewer (~60% Desktop) + Layer Navigator (~40% Desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
            
            {/* Left Column: Interactive Product Viewer (60% Desktop) */}
            <div className="lg:col-span-7 flex flex-col items-center">
              
              {/* Viewing Mode Switcher Toggle Pill */}
              <div className="mb-4 inline-flex items-center p-1 rounded-full bg-stone-100 border border-stone-200 shadow-inner">
                <button
                  type="button"
                  onClick={handleViewComplete}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-serif font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                    viewMode === 'complete'
                      ? 'bg-[#EAB308] text-stone-950 font-extrabold shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Complete Frame</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('exploded');
                    if (selectedLayerIndex === null) setSelectedLayerIndex(0);
                  }}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-serif font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                    viewMode === 'exploded'
                      ? 'bg-[#EAB308] text-stone-950 font-extrabold shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Explore Layers</span>
                </button>
              </div>

              {/* Gallery Product Stage Container */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] max-w-[660px] rounded-3xl p-4 sm:p-6 bg-stone-50 border border-stone-200 shadow-sm overflow-hidden flex items-center justify-center group">
                
                {/* MODE A: Complete Assembled Frame with 5 Precise Functional Hotspots */}
                {viewMode === 'complete' ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    
                    {/* Frame Container with warm Warm Ambient Corona Glow */}
                    <div className="relative w-full h-full max-h-[380px] sm:max-h-[420px] rounded-2xl overflow-hidden border-[10px] sm:border-[12px] border-[#EAB308] shadow-[0_20px_60px_rgba(0,0,0,0.95)] ring-2 ring-[#F0D79B]/50 bg-black flex items-center justify-center">
                      
                      {/* Assembled Lord Ganesha Photo Frame Image */}
                      <img
                        src="/images/atelier/ganesha-complete-framed.jpg"
                        alt="Assembled Consecrated Lord Ganesha Photo Frame"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      />

                      {/* Acrylic Diagonal Specular Gloss Sheen Reflection */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/18 to-transparent skew-x-[-25deg] pointer-events-none animate-acrylic-shine" />

                      {/* 4 Corner Solid Brass Standoff Studs */}
                      <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#F0D79B] via-[#C99B45] to-[#8C6737] shadow-md border border-amber-950/60 pointer-events-none" />
                      <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#F0D79B] via-[#C99B45] to-[#8C6737] shadow-md border border-amber-950/60 pointer-events-none" />
                      <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#F0D79B] via-[#C99B45] to-[#8C6737] shadow-md border border-amber-950/60 pointer-events-none" />
                      <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#F0D79B] via-[#C99B45] to-[#8C6737] shadow-md border border-amber-950/60 pointer-events-none" />
                    </div>

                    {/* Precise Functional Hotspot Pins Anchored Near Relevant Components */}
                    {LAYERS_DATA.map((layer, idx) => {
                      const isSelected = selectedLayerIndex === idx;
                      return (
                        <div
                          key={layer.id}
                          className="absolute z-20"
                          style={{ top: layer.hotspot.top, left: layer.hotspot.left }}
                        >
                          <button
                            type="button"
                            onClick={() => handleSelectLayer(idx)}
                            aria-label={`Inspect layer ${layer.number}: ${layer.title}`}
                            className={`relative group/pin p-1 transition-all duration-300 cursor-pointer focus:outline-none ${
                              isSelected ? 'scale-125' : 'hover:scale-115'
                            }`}
                          >
                            {/* Pulsing Concentric Outer Ring */}
                            <span
                              className={`absolute inset-0 rounded-full animate-ping opacity-75 ${
                                isSelected ? 'bg-[#F0D79B]' : 'bg-[#EAB308]/50'
                              }`}
                            />
                            {/* Hotspot Badge Circle */}
                            <span
                              className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shadow-md border transition-all ${
                                isSelected
                                  ? 'bg-[#EAB308] text-stone-950 border-white ring-4 ring-amber-300 shadow-md'
                                  : 'bg-white text-stone-900 border-amber-400 hover:bg-stone-50'
                              }`}
                            >
                              {layer.number}
                            </span>
                            {/* Tooltip on Hover */}
                            <span className="hidden sm:group-hover/pin:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-md bg-stone-900 text-[10px] font-mono text-white whitespace-nowrap pointer-events-none shadow-md border border-stone-700">
                              {layer.title}
                            </span>
                          </button>
                        </div>
                      );
                    })}

                    {/* Prompt Hint when no layer is selected */}
                    {selectedLayerIndex === null && (
                      <div className="absolute bottom-2.5 inset-x-4 flex items-center justify-between text-[11px] font-mono text-stone-800 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-200 pointer-events-none shadow-xs">
                        <span>Click any gold hotspot (01–05) to inspect anatomy</span>
                        <span className="hidden sm:inline text-amber-800 font-bold">5-Layer Structure</span>
                      </div>
                    )}
                  </div>
                ) : (
                  /* MODE B: Real Exploded View — Components Separated Along Depth Axis */
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    
                    {/* Isometric Stacked Separated Layers */}
                    <div className="relative w-full h-[280px] sm:h-[320px] flex items-center justify-center overflow-hidden">
                      {LAYERS_DATA.map((layer, idx) => {
                        const isSelected = selectedLayerIndex === idx;
                        const hasSelection = selectedLayerIndex !== null;
                        
                        // Oblique horizontal offsets
                        const baseOffsetX = (idx - 2) * 55; // Spread horizontally
                        const baseOffsetY = (idx - 2) * 15;
                        const isElevated = isSelected;

                        return (
                          <div
                            key={layer.id}
                            onClick={() => handleSelectLayer(idx)}
                            role="button"
                            tabIndex={0}
                            aria-label={`Select layer ${layer.number}: ${layer.title}`}
                            style={{
                              transform: `translateX(${baseOffsetX + (isElevated ? -10 : 0)}px) translateY(${baseOffsetY + (isElevated ? -15 : 0)}px) scale(${isElevated ? 1.08 : 0.96})`,
                              zIndex: isElevated ? 30 : idx + 5,
                            }}
                            className={`absolute w-[180px] sm:w-[220px] aspect-[4/5] rounded-2xl overflow-hidden border-2 transition-all duration-500 cursor-pointer shadow-xl ${
                              isElevated
                                ? 'border-amber-400 ring-4 ring-amber-300 shadow-md'
                                : hasSelection
                                ? 'border-stone-200 opacity-50 hover:opacity-90'
                                : 'border-stone-200 hover:border-amber-400 hover:scale-100'
                            }`}
                          >
                            {/* Layer Visual Texture / Image */}
                            <img
                              src={layer.image}
                              alt={layer.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                            {/* Top Number Pin */}
                            <div className="absolute top-2.5 left-2.5 bg-stone-900/90 backdrop-blur-md px-2 py-0.5 rounded-full border border-amber-400 text-[10px] font-mono font-bold text-amber-300">
                              L{layer.number}
                            </div>

                            {/* Bottom Label */}
                            <div className="absolute bottom-2 inset-x-2 text-center">
                              <span className="text-[10px] font-serif font-bold text-white line-clamp-1">
                                {layer.title}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Exploded Mode Indicator */}
                    <div className="absolute bottom-2.5 inset-x-4 flex items-center justify-between text-[11px] font-mono text-stone-800 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-200 pointer-events-none shadow-xs">
                      <span>Exploded View: Front Acrylic to Rear Backplane</span>
                      <span className="hidden sm:inline text-amber-800 font-bold">Select any layer</span>
                    </div>
                  </div>
                )}

                {/* Floating Detail Panel (When a Hotspot or Layer is Selected) */}
                {activeLayer && (
                  <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-5 z-30 bg-white/95 backdrop-blur-xl p-3.5 sm:p-4 rounded-2xl border border-stone-200 shadow-xl animate-fadeIn">
                    <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-stone-950 bg-[#EAB308] px-2 py-0.5 rounded-full">
                          LAYER {activeLayer.number}
                        </span>
                        <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900">
                          {activeLayer.title}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedLayerIndex(null)}
                        className="text-stone-500 hover:text-stone-900 p-1 rounded-full hover:bg-stone-100 transition cursor-pointer"
                        aria-label="Close layer detail"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-start gap-3 mt-2.5">
                      {/* High-definition layer preview */}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-stone-200 shrink-0 bg-stone-900 shadow-xs">
                        <img
                          src={activeLayer.image}
                          alt={activeLayer.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                      </div>

                      {/* Deep description & material */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <p className="text-[11px] sm:text-xs font-sans text-stone-700 leading-relaxed line-clamp-2 sm:line-clamp-3">
                          {activeLayer.description}
                        </p>
                        <div className="text-[10px] font-mono text-stone-500">
                          Material: <strong className="text-amber-800">{activeLayer.material}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-stone-100">
                      <span className="text-[10px] font-mono text-amber-800 uppercase tracking-wider font-semibold">
                        Layer {activeLayer.number} of 05
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handlePrevLayer}
                          className="px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 text-[10px] font-mono text-stone-800 border border-stone-200 transition cursor-pointer font-bold"
                        >
                          ← Prev
                        </button>
                        <button
                          type="button"
                          onClick={handleNextLayer}
                          className="px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 text-[10px] font-mono text-stone-800 border border-stone-200 transition cursor-pointer font-bold"
                        >
                          Next →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Redesigned Vertical Layer Navigator (40% Desktop) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-2.5 sm:space-y-3">
              
              {/* 5 Compact Layer Rows with Thumbnails */}
              <div className="space-y-2.5">
                {LAYERS_DATA.map((layer, idx) => {
                  const isSelected = selectedLayerIndex === idx;
                  return (
                    <button
                      key={layer.id}
                      type="button"
                      onClick={() => handleSelectLayer(idx)}
                      className={`group w-full p-2.5 sm:p-3 rounded-xl border text-left transition-all duration-300 flex items-center gap-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-300 ${
                        isSelected
                          ? 'bg-amber-50/80 border-amber-300 ring-1 ring-amber-200 shadow-sm translate-x-1.5'
                          : 'bg-white border-stone-200 hover:border-amber-300 hover:bg-stone-50'
                      }`}
                    >
                      {/* Gold Index Badge */}
                      <span
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[#EAB308] text-stone-950'
                            : 'bg-stone-100 text-stone-800 border border-stone-200'
                        }`}
                      >
                        {layer.number}
                      </span>

                      {/* Layer Image Thumbnail */}
                      <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-lg overflow-hidden border border-stone-200 shrink-0 bg-stone-900 shadow-2xs group-hover:border-amber-400 transition-colors">
                        <img
                          src={layer.image}
                          alt={layer.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                      </div>

                      {/* Title & One-line Summary */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4
                            className={`font-serif font-bold text-xs sm:text-sm tracking-wide transition-colors ${
                              isSelected ? 'text-amber-900' : 'text-stone-900'
                            }`}
                          >
                            {layer.title}
                          </h4>
                          {isSelected && (
                            <span className="text-[10px] font-mono text-amber-700 font-bold">
                              ● ACTIVE
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-sans text-stone-500 mt-0.5 line-clamp-1">
                          {layer.oneLiner}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* View Complete Frame Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleViewComplete}
                  className="w-full py-3.5 px-6 rounded-full border border-amber-300 hover:border-amber-400 bg-[#EAB308] hover:bg-[#FACC15] text-xs font-serif font-bold tracking-wider text-[#000000] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-[1.01] active:scale-95"
                >
                  <span>VIEW COMPLETE FRAME</span>
                  <span>→</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          PANEL 3: "FROM CRAFT TO MASTERPIECE" — Luxury Artisanal Journey & Final Reveal
          ========================================================================= */}
      <section
        id="section-craft"
        className="relative w-full pt-12 sm:pt-16 pb-20 sm:pb-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-stone-50 border-b border-stone-200 text-stone-900 overflow-hidden"
      >
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-100/50 rounded-full blur-[140px] pointer-events-none" />

        {/* Ambient Floating Gold Dust Particles */}
        <div className="absolute top-1/6 right-[14%] w-1.5 h-1.5 rounded-full bg-amber-400/70 blur-[0.5px] pointer-events-none animate-sparkle-float" />
        <div className="absolute top-1/2 left-[10%] w-2 h-2 rounded-full bg-amber-500/60 blur-[0.5px] pointer-events-none animate-sparkle-float [animation-delay:2s]" />
        <div className="absolute bottom-1/4 right-[25%] w-1 h-1 rounded-full bg-amber-300/80 pointer-events-none animate-sparkle-float [animation-delay:3.5s]" />

        <div className="max-w-[1440px] mx-auto space-y-12 sm:space-y-16 relative z-10">
          
          {/* 1. Refined Editorial Heading */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] text-amber-800 uppercase block">
              THE ART OF DEVOTIONAL CRAFTSMANSHIP
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
              From Craft to <span className="font-serif italic text-amber-800">Masterpiece</span>
            </h2>
            <p className="font-serif italic text-sm sm:text-base text-stone-600 max-w-xl mx-auto">
              Every detail tells a story. Every layer honours the art.
            </p>
            {/* Small decorative gold divider */}
            <div className="flex items-center justify-center gap-3 pt-3 text-amber-600">
              <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-amber-400" />
              <span className="w-1.5 h-1.5 rotate-45 bg-amber-500 animate-pulse" />
              <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent to-amber-400" />
            </div>
          </div>

          {/* 2. Four-Stage Horizontal Craftsmanship Journey */}
          <div className="relative">
            {/* Delicate gold progress line (Desktop) */}
            <div className="hidden lg:block absolute top-[18px] inset-x-16 h-[1px] bg-gradient-to-r from-transparent via-[#C99B45]/50 to-transparent pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 items-stretch">
              {CRAFTSMANSHIP_STAGES.map((stage) => {
                const isHovered = hoveredStageId === stage.id;
                return (
                  <div
                    key={stage.id}
                    onClick={() => setSelectedStageModal(stage)}
                    onMouseEnter={() => setHoveredStageId(stage.id)}
                    onMouseLeave={() => setHoveredStageId(null)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedStageModal(stage);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`View stage ${stage.stageNumber}: ${stage.title}`}
                    className={`group relative rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-300 ${
                      isHovered
                        ? 'bg-white border-2 border-amber-400 shadow-xl -translate-y-2'
                        : 'bg-white hover:border-amber-300 border border-stone-200 shadow-sm'
                    }`}
                  >
                    {/* Top Row: Stage Number & Stage Label */}
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-stone-100">
                      <span className="font-mono text-xs font-bold text-amber-800 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 group-hover:border-amber-400 transition-colors">
                        STAGE {stage.stageNumber}
                      </span>
                      <span className="font-mono text-[10px] tracking-widest text-amber-800 uppercase font-semibold">
                        {stage.stageLabel}
                      </span>
                    </div>

                    {/* Stage Image with 4:3 Proportion */}
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-stone-200 bg-stone-900 my-3.5 shadow-2xs">
                      <img
                        src={stage.image}
                        alt={`${stage.title} - ${stage.stageLabel}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Small "Discover the detail" pill that reveals on hover */}
                      <div className="absolute bottom-2.5 right-2.5 bg-stone-900/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-stone-700 text-[10px] font-mono font-medium text-white opacity-90 group-hover:opacity-100 group-hover:border-amber-400 flex items-center gap-1.5 transition-all">
                        <Maximize2 className="w-2.5 h-2.5 text-amber-400" />
                        <span>Inspect Detail</span>
                      </div>
                    </div>

                    {/* Typography: Title & Short Description */}
                    <div className="space-y-1.5 flex-1 flex flex-col justify-start">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 group-hover:text-amber-900 transition-colors leading-snug">
                        {stage.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] font-sans text-stone-600 leading-relaxed">
                        {stage.shortDesc}
                      </p>
                    </div>

                    {/* Bottom Action Accent */}
                    <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-amber-800 font-bold">
                      <span className="text-amber-800 group-hover:text-amber-900 transition-colors">
                        Discover the detail
                      </span>
                      <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Cinematic Final Reveal Showcase */}
          <div className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-stone-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Editorial Storytelling & CTA */}
              <div className="lg:col-span-6 space-y-6">
                <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-amber-800 uppercase block">
                  CONSECRATED HEIRLOOM MASTERPIECE
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
                  The Journey Ends in{' '}
                  <span className="font-serif italic text-amber-800">Timeless Beauty.</span>
                </h3>
                <p className="text-sm sm:text-base font-sans text-stone-600 leading-relaxed">
                  Explore the craftsmanship behind a frame created to make your most meaningful moments stand out. Handcrafted in our Hyderabad atelier with premium cast acrylic, archival micro-pigments, pure gold leaf accents, and LED illumination.
                </p>

                {/* Craftsmanship Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-white border border-stone-200 hover:border-amber-300 transition-all text-left shadow-xs hover:-translate-y-1">
                    <span className="block text-sm font-mono font-bold text-stone-900">99.2%</span>
                    <span className="text-[11px] text-stone-500">Optical Clarity</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-stone-200 hover:border-amber-300 transition-all text-left shadow-xs hover:-translate-y-1">
                    <span className="block text-sm font-mono font-bold text-stone-900">Gold Leaf</span>
                    <span className="text-[11px] text-stone-500">Pure Leaf Foil</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-stone-200 hover:border-amber-300 transition-all text-left shadow-xs hover:-translate-y-1">
                    <span className="block text-sm font-mono font-bold text-stone-900">Long-Lasting</span>
                    <span className="text-[11px] text-stone-500">UV Protected</span>
                  </div>
                </div>

                {/* Primary CTA with animated shimmer */}
                <div className="pt-3">
                  <Link
                    href="/shop"
                    className="relative group inline-flex items-center gap-3 bg-gradient-to-r from-[#EAB308] via-[#FEF08A] to-[#EAB308] text-[#000000] font-bold text-xs sm:text-sm uppercase tracking-widest px-8 py-4 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 font-extrabold">EXPLORE THE COLLECTION</span>
                    <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1.5" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] pointer-events-none animate-acrylic-shine" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Sharp Finished Devotional Frame in Luxury Indian Sanctum Altar */}
              <div className="lg:col-span-6 flex items-center justify-center relative">
                {/* Ambient Breathing warm Halo Aura */}
                <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-r from-amber-200/30 via-amber-300/40 to-amber-200/30 rounded-[32px] blur-2xl pointer-events-none" />

                <div className="relative w-full aspect-[3/2] rounded-3xl overflow-hidden border-2 border-amber-300 shadow-xl ring-1 ring-amber-100 bg-stone-900 group">
                  {/* Masterpiece Devotional Image (New Photograph) */}
                  <img
                    src="/images/atelier/ganesha-sanctum-masterpiece.jpg"
                    alt="Lord Ganesha Consecrated Masterpiece in Luxury Indian Sanctum"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Subtle Gradient Shadow for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Specular Acrylic Sheen Sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] pointer-events-none animate-acrylic-shine" />

                  {/* Glowing Corner Badge with Floating Diya & Live Pulse */}
                  <div className="absolute bottom-3.5 left-3.5 sm:bottom-5 sm:left-5 bg-white/95 backdrop-blur-md px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-stone-200 text-xs font-mono text-stone-900 shadow-lg flex items-center gap-2.5 animate-badge-float">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
                    </span>
                    <span className="text-sm">🪔</span>
                    <span className="font-semibold tracking-wide text-stone-900">
                      Lord Ganesha Vighnaharta • Sanctum Radiance
                    </span>
                  </div>

                  {/* Top-Right precision-cut Indicator Pill */}
                  <div className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 bg-stone-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-stone-700 text-[10px] font-mono text-white flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15] animate-pulse" />
                    <span>Precision-Beveled Cast Acrylic</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE CRAFTSMANSHIP STORY MODAL
          ========================================================================= */}
      {selectedStageModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-stage-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedStageModal(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-white border-2 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto text-stone-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedStageModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200 border border-stone-200 transition-all cursor-pointer z-10"
              aria-label="Close craftsmanship detail modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="space-y-6">
              
              {/* Header Badges */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-amber-900 px-3 py-1 rounded-full bg-amber-50 border border-amber-200">
                  STAGE {selectedStageModal.stageNumber}
                </span>
                <span className="font-mono text-xs tracking-widest text-amber-800 uppercase font-semibold">
                  {selectedStageModal.stageLabel}
                </span>
              </div>

              {/* Title */}
              <h3
                id="modal-stage-title"
                className="font-serif text-2xl sm:text-3xl font-bold text-stone-900"
              >
                {selectedStageModal.title}
              </h3>

              {/* HD Image */}
              <div className="relative w-full aspect-[16/10] max-h-[340px] rounded-2xl overflow-hidden border border-stone-200 bg-stone-900 shadow-inner">
                <img
                  src={selectedStageModal.imageHd}
                  alt={selectedStageModal.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Full Detailed Story Narrative */}
              <p className="text-sm sm:text-base font-sans text-stone-700 leading-relaxed">
                {selectedStageModal.fullStory}
              </p>

              {/* Specs Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {selectedStageModal.specs.map((spec, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-semibold"
                  >
                    ✓ {spec}
                  </span>
                ))}
              </div>

              {/* Navigation Footer */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    const idx = CRAFTSMANSHIP_STAGES.findIndex((s) => s.id === selectedStageModal.id);
                    const prevIdx = (idx - 1 + CRAFTSMANSHIP_STAGES.length) % CRAFTSMANSHIP_STAGES.length;
                    setSelectedStageModal(CRAFTSMANSHIP_STAGES[prevIdx]);
                  }}
                  className="flex items-center gap-1.5 text-xs font-mono font-bold text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Stage</span>
                </button>

                {/* Stage Indicators */}
                <div className="flex items-center gap-1.5">
                  {CRAFTSMANSHIP_STAGES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedStageModal(s)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        s.id === selectedStageModal.id
                          ? 'bg-[#EAB308] w-6'
                          : 'bg-stone-300 hover:bg-stone-400 w-2.5'
                      }`}
                      aria-label={`Go to stage ${s.stageNumber}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const idx = CRAFTSMANSHIP_STAGES.findIndex((s) => s.id === selectedStageModal.id);
                    const nextIdx = (idx + 1) % CRAFTSMANSHIP_STAGES.length;
                    setSelectedStageModal(CRAFTSMANSHIP_STAGES[nextIdx]);
                  }}
                  className="flex items-center gap-1.5 text-xs font-mono font-bold text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
                >
                  <span>Next Stage</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
