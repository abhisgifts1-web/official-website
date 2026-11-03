'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Truck,
  UploadCloud,
  ShieldCheck,
  Gift,
  Sun,
  Zap,
  Image as ImageIcon,
  Check,
  Upload,
  RotateCcw,
  Maximize2,
  SlidersHorizontal,
  Flame,
  Award,
} from 'lucide-react';

interface CustomFrameOption {
  id: string;
  name: string;
  badge: string;
  price: string;
  defaultArtworkId: string;
  hasLed: boolean;
  shape: string;
  shapeType: 'portrait' | 'landscape' | 'square' | 'round';
  dimensionsLabel: string;
  description: string;
  highlights: string[];
  defaultInscription?: string;
}

interface ArtReference {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  defaultShape: 'portrait' | 'landscape' | 'square' | 'round';
  hasLed: boolean;
  tag: string;
  category: string;
}

const ART_REFERENCES: ArtReference[] = [
  {
    id: 'balaji',
    name: 'Lord Balaji',
    subtitle: 'Tirupati Venkateswara',
    image: '/images/mockups/tirupati-balaji-divine-led-backlit-acrylic-wall-art/primary-square.jpg',
    defaultShape: 'portrait',
    hasLed: true,
    tag: 'Sacred Icon',
    category: 'Lord Venkateswara',
  },
  {
    id: 'ganesha',
    name: 'Lord Ganesha',
    subtitle: 'Vighnaharta Divine LED',
    image: '/images/mockups/lord-ganesha-vighnaharta-divine-led-backlit-acrylic-art/primary-square.jpg',
    defaultShape: 'square',
    hasLed: true,
    tag: 'Auspicious Start',
    category: 'Vighnaharta',
  },
  {
    id: 'ram-mandir',
    name: 'Ayodhya Ram Mandir',
    subtitle: 'Sanctum Architecture',
    image: '/images/mockups/ayodhya-ram-janmabhoomi-mandir-3d-led-wall-decor/primary-square.jpg',
    defaultShape: 'landscape',
    hasLed: true,
    tag: 'Historic Heritage',
    category: 'Ayodhya Mandir',
  },
  {
    id: 'radha-krishna',
    name: 'Radha Krishna',
    subtitle: 'Divine Bansuri Melody',
    image: '/images/mockups/radha-krishna-divine-bansuri-3d-led-acrylic-wall-art/primary-square.jpg',
    defaultShape: 'portrait',
    hasLed: true,
    tag: 'Eternal Love',
    category: 'Vrindavan',
  },
  {
    id: 'shiva-adiyogi',
    name: 'Adiyogi Shiva',
    subtitle: 'Dhyana Mudra Meditation',
    image: '/images/mockups/adiyogi-lord-shiva-meditation-led-wall-decor/primary-square.jpg',
    defaultShape: 'landscape',
    hasLed: true,
    tag: 'Cosmic Shanti',
    category: 'Mahadev',
  },
  {
    id: 'lakshmi',
    name: 'Maha Lakshmi',
    subtitle: 'Ashta Lakshmi Prosperity',
    image: '/images/mockups/goddess-mahalakshmi-prosperity-divine-led-backlit-acrylic-art/primary-square.jpg',
    defaultShape: 'round',
    hasLed: true,
    tag: 'Wealth & Grace',
    category: 'Maha Lakshmi',
  },
  {
    id: 'vastu-horses',
    name: '7 Running Horses',
    subtitle: 'Vastu Shastra Prosperity',
    image: '/images/mockups/seven-running-horses-vastu-gold-acrylic-wall-art/primary-square.jpg',
    defaultShape: 'landscape',
    hasLed: false,
    tag: 'Vastu Success',
    category: 'Vastu Art',
  },
];

const CUSTOM_FRAMES: CustomFrameOption[] = [
  {
    id: 'frameless',
    name: 'Crystal Frameless Acrylic',
    badge: 'Most Popular',
    price: 'From ₹1,499',
    defaultArtworkId: 'balaji',
    hasLed: false,
    shape: 'Vertical Portrait',
    shapeType: 'portrait',
    dimensionsLabel: 'Standard 24" × 36" (Custom up to 4×6 ft)',
    description: 'Museum-grade 4mm cast acrylic with diamond CNC 45° beveled edges and brushed floating stainless steel standoffs.',
    highlights: ['4mm Optical Cast Acrylic', 'Diamond CNC Beveled Edges', 'Invisible Floating Standoffs', 'Shatterproof & Moisture-Proof'],
  },
  {
    id: 'night-glow',
    name: '3000K Warm LED Halo Frame',
    badge: 'Trending Gift',
    price: 'From ₹2,499',
    defaultArtworkId: 'ganesha',
    hasLed: true,
    shape: 'Illuminated Frame',
    shapeType: 'square',
    dimensionsLabel: 'Square 24" × 24" (Warm White Glow)',
    description: 'Concealed Epistar 3000K warm LEDs cast a serene golden halo around your sacred artwork or cherished memory.',
    highlights: ['3000K Warm Golden Backlight', '50,000-Hour Rated Epistar LEDs', 'Certified 12V BIS Low Voltage', 'Inline ON/OFF Switch'],
  },
  {
    id: 'gold-crest',
    name: '24K Gold Script Heirloom',
    badge: 'Artisan Exclusive',
    price: 'From ₹2,299',
    defaultArtworkId: 'ram-mandir',
    hasLed: true,
    shape: 'Horizontal Landscape',
    shapeType: 'landscape',
    dimensionsLabel: 'Panoramic 36" × 24" (Gold Foil Accents)',
    description: 'Personalized with real 24K gold foil surname script, temple shlokas, wedding vows, or auspicious family blessings.',
    highlights: ['24K Genuine Gold Foil Script', 'Custom Inscribed Surname / Shlokas', 'Brushed Champagne Standoffs', 'Archival UV Pigments'],
    defaultInscription: 'Shri Ram Janmabhoomi • Ayodhya Mandir Sanctum',
  },
  {
    id: 'round-medallion',
    name: 'Circular Medallion Frame',
    badge: 'Modern Silhouette',
    price: 'From ₹1,799',
    defaultArtworkId: 'lakshmi',
    hasLed: false,
    shape: 'Circular Medallion',
    shapeType: 'round',
    dimensionsLabel: 'Curved Round 24" Diameter',
    description: 'Continuous 360° laser-curved diamond beveling creating a fluid, modern halo silhouette for sacred mandir niches.',
    highlights: ['360° Continuous Diamond Bevel', 'Concealed Heavy-Duty French Cleat', 'Optically Flawless Clarity', 'Zero Warpage Guarantee'],
  },
];

export default function PersonalizedPhotoSection() {
  const [selectedFrame, setSelectedFrame] = useState<CustomFrameOption>(CUSTOM_FRAMES[0]);
  const [selectedArt, setSelectedArt] = useState<ArtReference>(ART_REFERENCES[0]);
  const [isLedOn, setIsLedOn] = useState<boolean>(true);
  const [wallMode, setWallMode] = useState<'pooja' | 'living' | 'studio'>('studio');
  const [userUploadedPhoto, setUserUploadedPhoto] = useState<string | null>(null);
  const [customInscription, setCustomInscription] = useState<string>(CUSTOM_FRAMES[2].defaultInscription || '');
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState<'frames' | 'artworks'>('frames');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserUploadedPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFrameSelect = (frame: CustomFrameOption) => {
    setSelectedFrame(frame);
    if (frame.hasLed) {
      setIsLedOn(true);
    }
    // Auto sync reference artwork to frame default if user hasn't uploaded custom photo
    const defaultMatch = ART_REFERENCES.find((a) => a.id === frame.defaultArtworkId);
    if (defaultMatch && !userUploadedPhoto) {
      setSelectedArt(defaultMatch);
    }
  };

  const handleArtSelect = (art: ArtReference) => {
    setUserUploadedPhoto(null);
    setSelectedArt(art);
    // Auto toggle LED on if artwork is an LED-enabled piece
    if (art.hasLed) {
      setIsLedOn(true);
    }
  };

  const activeImage = userUploadedPhoto || selectedArt.image;
  const activeTitle = userUploadedPhoto ? 'Your Custom Uploaded Photo' : `${selectedArt.name} — ${selectedArt.subtitle}`;

  const whatsappInquiryUrl = `https://wa.me/917780269927?text=${encodeURIComponent(
    `Hi Abhi's Gifts! I am exploring your Custom Photo & Sacred Frame Atelier:\n- Frame Style: ${selectedFrame.name} (${selectedFrame.price})\n- Artwork / Photo: ${activeTitle}\n- Dimensions: ${selectedFrame.dimensionsLabel}\n- Lighting: ${isLedOn ? '3000K LED On' : 'Non-Lit'}\nCan you share final pricing, custom sizing options, and a free WhatsApp digital proof?`
  )}`;

  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 py-8 sm:py-12 lg:py-16 select-none">
      {/* Outer Shell Container */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#181818] via-[#141414] to-[#181818] rounded-3xl sm:rounded-[40px] p-6 sm:p-10 lg:p-14 border border-[#2D2D2D] shadow-[0_16px_60px_rgba(81,27,42,0.07)]">
        {/* Ambient Decorative Shimmer Orbs */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#EAB308]/10 rounded-full blur-3xl pointer-events-none" />

        {/* =========================================================
            1. SECTION HERO HEADER & VALUE PROPOSITION
            ========================================================= */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#2D2D2D]/80">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#FFFFFF] bg-white border border-[#EAB308]/60 px-4 py-1.5 rounded-full shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#EAB308] animate-pulse" />
              <span>CUSTOM SACRED &amp; ARTISAN FRAMING ATELIER • HYDERABAD</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping ml-0.5" />
            </div>

            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#FFFFFF] tracking-tight leading-[1.15]">
              CRAFT YOUR SACRED SANCTUM.
              <span className="block mt-1 bg-gradient-to-r from-[#A06E28] via-[#FACC15] to-[#784B15] bg-clip-text text-transparent italic font-serif">
                Tailored In Premium Acrylic.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed max-w-2xl font-sans">
              Experience your sacred wall art or personal milestones at breathtaking scale. Choose from our iconic devotional masterpieces or upload your family portrait. Engineered with diamond CNC beveled cast acrylic, pre-installed floating mounts, and optional 3000K warm LED illumination.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/customise"
              className="inline-flex items-center gap-2 bg-[#EAB308] hover:bg-[#FACC15] text-[#000000] font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 group uppercase tracking-wider"
            >
              <span>Open Customizer Studio</span>
              <ArrowRight className="w-4 h-4 text-[#FACC15] group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white hover:bg-[#121212] text-[#FFFFFF] font-bold text-xs sm:text-sm px-5 py-3 rounded-full border border-[#EAB308] shadow-xs hover:border-[#A06E28] transition-colors uppercase tracking-wider"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
              <span>WhatsApp Artisan</span>
            </a>
          </div>
        </div>

        {/* =========================================================
            2. TOP SELECTOR STRIP: 4 CORE FRAMING STYLES
            ========================================================= */}
        <div className="relative z-10 pt-8 pb-6">
          <div className="flex items-center justify-between mb-3 text-xs font-bold uppercase tracking-wider text-[#D1D5DB]">
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#EAB308]" />
              <span>Select Framing Style &amp; Silhouette</span>
            </span>
            <span className="text-[11px] text-[#EAB308] font-semibold hidden sm:inline">
              Hand-Polished In Dilsukhnagar
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {CUSTOM_FRAMES.map((frame) => {
              const isSelected = selectedFrame.id === frame.id;
              return (
                <button
                  key={frame.id}
                  type="button"
                  onClick={() => handleFrameSelect(frame)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left flex flex-col justify-between cursor-pointer relative group ${
                    isSelected
                      ? 'border-[#EAB308] bg-white ring-2 ring-[#EAB308]/30 shadow-md -translate-y-1'
                      : 'border-[#2D2D2D]/80 bg-white/70 hover:bg-white hover:border-[#EAB308]/60 hover:-translate-y-0.5'
                  }`}
                >
                  {isSelected && (
                    <span className="absolute -top-1.5 right-3 w-3 h-3 rounded-full bg-[#EAB308] ring-2 ring-white shadow-xs" />
                  )}

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFFFFF] bg-[#181818] px-2.5 py-0.5 rounded-full border border-[#EAB308]/40 shadow-2xs">
                        {frame.badge}
                      </span>
                      {frame.hasLed && (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full flex items-center gap-1 border border-amber-300/50">
                          <Zap className="w-2.5 h-2.5 text-amber-600 fill-amber-600" />
                          <span>3000K LED</span>
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-[#FFFFFF] group-hover:text-[#FFFFFF] transition-colors leading-snug pt-0.5">
                      {frame.name}
                    </h3>
                    <p className="text-[11px] text-[#D1D5DB] line-clamp-2 leading-relaxed">
                      {frame.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#2D2D2D]/50 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#EAB308]">{frame.price}</span>
                    <span className="text-[11px] text-[#D1D5DB] font-medium">{frame.shape}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            3. GRAND INTERACTIVE WALL STAGE (EXPANSIVE & BIG DISPLAY)
            ========================================================= */}
        <div className="relative z-10 bg-white rounded-3xl border border-[#2D2D2D] p-4 sm:p-7 shadow-[0_12px_45px_rgba(81,27,42,0.06)] space-y-6">
          {/* Interactive Environment & Mode Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#2D2D2D]/60 text-xs">
            {/* Wall Environment Switcher */}
            <div className="flex items-center gap-1.5 bg-[#181818] p-1 rounded-xl border border-[#2D2D2D]">
              <span className="text-[11px] font-bold text-[#D1D5DB] px-2 uppercase tracking-wider hidden md:inline">
                Environment:
              </span>
              <button
                type="button"
                onClick={() => setWallMode('pooja')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  wallMode === 'pooja'
                    ? 'bg-white text-[#FFFFFF] shadow-2xs font-bold'
                    : 'text-[#D1D5DB] hover:text-[#FFFFFF]'
                }`}
              >
                Pooja Mandir
              </button>
              <button
                type="button"
                onClick={() => setWallMode('living')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  wallMode === 'living'
                    ? 'bg-white text-[#FFFFFF] shadow-2xs font-bold'
                    : 'text-[#D1D5DB] hover:text-[#FFFFFF]'
                }`}
              >
                Living Room
              </button>
              <button
                type="button"
                onClick={() => setWallMode('studio')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  wallMode === 'studio'
                    ? 'bg-white text-[#FFFFFF] shadow-2xs font-bold'
                    : 'text-[#D1D5DB] hover:text-[#FFFFFF]'
                }`}
              >
                Noir Atelier Wall
              </button>
            </div>

            {/* Right Tools: LED Toggle & Photo Upload */}
            <div className="flex items-center gap-2.5">
              {/* LED Lighting Toggle */}
              <button
                type="button"
                onClick={() => setIsLedOn(!isLedOn)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                  isLedOn
                    ? 'bg-[#1C0912] text-[#FACC15] border-[#EAB308] shadow-[0_0_20px_rgba(214,170,85,0.4)]'
                    : 'bg-white text-[#D1D5DB] border-[#2D2D2D] hover:text-[#FFFFFF]'
                }`}
                title="Toggle 3000K Warm Golden Backlight"
              >
                {isLedOn ? (
                  <>
                    <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>3000K Glow: ON</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>Daylight (Unlit)</span>
                  </>
                )}
              </button>

              {/* Upload Personal Photo */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-1.5 rounded-full bg-white hover:bg-[#121212] text-[#FFFFFF] border border-[#2D2D2D] hover:border-[#EAB308] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                title="Upload your family photo, wedding memory, or deity"
              >
                <Upload className="w-3.5 h-3.5 text-[#EAB308]" />
                <span>{userUploadedPhoto ? 'Change Photo' : 'Upload Your Photo'}</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              {userUploadedPhoto && (
                <button
                  type="button"
                  onClick={() => setUserUploadedPhoto(null)}
                  className="text-[#FFFFFF] hover:text-[#EAB308] underline text-xs cursor-pointer ml-1"
                  title="Revert back to website artwork"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* THE BIG, PROMINENT 3D FRAME STAGE */}
          <div
            className={`relative w-full h-[560px] sm:h-[640px] lg:h-[720px] rounded-3xl overflow-hidden transition-all duration-700 flex items-center justify-center p-4 sm:p-8 ${
              wallMode === 'pooja'
                ? 'bg-cover bg-center shadow-inner'
                : wallMode === 'living'
                ? 'bg-cover bg-center shadow-inner'
                : isLedOn && (selectedFrame.hasLed || selectedArt.hasLed)
                ? 'bg-gradient-to-b from-[#0A0A0A] via-[#141414] to-[#0A0A0A]'
                : 'bg-gradient-to-b from-[#141414] via-[#181818] to-[#141414]'
            }`}
            style={{
              backgroundImage:
                wallMode === 'pooja'
                  ? "url('/images/lifestyle/pooja-mandir.jpg')"
                  : wallMode === 'living'
                  ? "url('/images/lifestyle/living-room.jpg')"
                  : undefined,
            }}
          >
            {/* Ambient Dark Overlay for interior backgrounds when 3000K LED is active */}
            {(wallMode === 'pooja' || wallMode === 'living') && isLedOn && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] transition-all duration-700 pointer-events-none" />
            )}

            {/* 3000K Golden LED Halo radiating 360° across the Wall */}
            {isLedOn && (selectedFrame.hasLed || selectedArt.hasLed) && (
              <div
                className={`absolute pointer-events-none transition-all duration-700 ${
                  selectedFrame.shapeType === 'round'
                    ? 'w-[520px] sm:w-[660px] h-[520px] sm:h-[660px] rounded-full'
                    : selectedFrame.shapeType === 'landscape'
                    ? 'w-[640px] sm:w-[860px] h-[440px] sm:h-[560px] rounded-3xl'
                    : 'w-[480px] sm:w-[620px] h-[580px] sm:h-[720px] rounded-3xl'
                }`}
                style={{
                  background:
                    'radial-gradient(circle, rgba(255, 195, 75, 0.8) 0%, rgba(214, 170, 85, 0.45) 40%, rgba(184, 138, 53, 0.18) 65%, transparent 78%)',
                  filter: 'blur(60px)',
                }}
              />
            )}

            {/* THE BIGGER, CRYSTAL-CLEAR FLOATING 3D ACRYLIC FRAME */}
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`relative transition-all duration-500 group cursor-pointer z-20 flex items-center justify-center select-none ${
                selectedFrame.shapeType === 'portrait'
                  ? 'w-[300px] sm:w-[380px] md:w-[440px] lg:w-[480px] aspect-[3/4]'
                  : selectedFrame.shapeType === 'landscape'
                  ? 'w-[360px] sm:w-[540px] md:w-[680px] lg:w-[760px] aspect-[16/10]'
                  : selectedFrame.shapeType === 'round'
                  ? 'w-[320px] sm:w-[420px] md:w-[480px] lg:w-[520px] aspect-square rounded-full'
                  : 'w-[320px] sm:w-[420px] md:w-[480px] lg:w-[520px] aspect-square'
              }`}
              style={{
                boxShadow:
                  isLedOn && (selectedFrame.hasLed || selectedArt.hasLed)
                    ? '0 0 70px rgba(255, 195, 75, 0.6), 0 35px 70px rgba(0,0,0,0.7), 0 12px 30px rgba(0,0,0,0.55)'
                    : '0 30px 65px rgba(81,27,42,0.25), 0 10px 24px rgba(0,0,0,0.14)',
              }}
            >
              {/* Outer 4mm Diamond-Cut Cast Acrylic Border */}
              <div
                className={`relative w-full h-full overflow-hidden border-[3px] border-white/90 bg-stone-950 ring-1 ring-white/60 shadow-2xl ${
                  selectedFrame.shapeType === 'round' ? 'rounded-full' : 'rounded-3xl'
                }`}
              >
                {/* The Ultra-Crisp Artwork Image */}
                <img
                  src={activeImage}
                  alt={activeTitle}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* 24K Gold Foil Script Overlay (When Gold Script Heirloom is selected) */}
                {selectedFrame.id === 'gold-crest' && (
                  <div className="absolute bottom-5 inset-x-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 sm:p-5 rounded-b-2xl text-center">
                    <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#FFD782] drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] font-bold tracking-wider">
                      {customInscription || 'Shri Ram Janmabhoomi • Ayodhya Mandir Sanctum'}
                    </p>
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#E8D1A5] font-sans block mt-1">
                      ✦ 24K Gold Foil Inscribed Heirloom • Abhi's Gifts ✦
                    </span>
                  </div>
                )}

                {/* Realistic Brushed Stainless Steel Standoffs (4 Corners or 4 Radial for Round) */}
                {selectedFrame.shapeType === 'round' ? (
                  <>
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4.5 h-4.5 rounded-full bg-gradient-to-br from-white via-stone-200 to-stone-500 shadow-xl border border-stone-400 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-stone-700 shadow-inner" />
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4.5 h-4.5 rounded-full bg-gradient-to-br from-white via-stone-200 to-stone-500 shadow-xl border border-stone-400 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-stone-700 shadow-inner" />
                    </div>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 rounded-full bg-gradient-to-br from-white via-stone-200 to-stone-500 shadow-xl border border-stone-400 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-stone-700 shadow-inner" />
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 rounded-full bg-gradient-to-br from-white via-stone-200 to-stone-500 shadow-xl border border-stone-400 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-stone-700 shadow-inner" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute top-5 left-5 w-4.5 h-4.5 rounded-full bg-gradient-to-br from-white via-stone-200 to-stone-500 shadow-xl border border-stone-400 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-stone-700 shadow-inner" />
                    </div>
                    <div className="absolute top-5 right-5 w-4.5 h-4.5 rounded-full bg-gradient-to-br from-white via-stone-200 to-stone-500 shadow-xl border border-stone-400 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-stone-700 shadow-inner" />
                    </div>
                    <div className="absolute bottom-5 left-5 w-4.5 h-4.5 rounded-full bg-gradient-to-br from-white via-stone-200 to-stone-500 shadow-xl border border-stone-400 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-stone-700 shadow-inner" />
                    </div>
                    <div className="absolute bottom-5 right-5 w-4.5 h-4.5 rounded-full bg-gradient-to-br from-white via-stone-200 to-stone-500 shadow-xl border border-stone-400 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-stone-700 shadow-inner" />
                    </div>
                  </>
                )}

                {/* 4mm Crystal Optical Reflection Sweep */}
                <div
                  className={`absolute inset-0 pointer-events-none transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/18 to-white/35 ${
                    isHovered ? 'opacity-100' : 'opacity-70'
                  } ${selectedFrame.shapeType === 'round' ? 'rounded-full' : ''}`}
                />
              </div>
            </div>

            {/* Bottom Floating Info Pill */}
            <div className="absolute bottom-4 left-4 z-30 bg-white/95 backdrop-blur-md px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold text-[#FFFFFF] border border-[#2D2D2D] shadow-md flex items-center gap-2 max-w-[90%] sm:max-w-none truncate">
              <Sparkles className="w-3.5 h-3.5 text-[#EAB308] shrink-0" />
              <span className="truncate">{activeTitle}</span>
              <span className="text-[#EAB308]/60 shrink-0">•</span>
              <span className="text-[#D1D5DB] font-medium shrink-0">{selectedFrame.dimensionsLabel}</span>
              {userUploadedPhoto && (
                <span className="text-emerald-700 font-semibold shrink-0">• Custom Photo Active</span>
              )}
            </div>
          </div>

          {/* =========================================================
              4. ARTWORK REFERENCE CAROUSEL (WEBSITE ARTWORK REFERENCES)
              ========================================================= */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#D1D5DB]">
              <span className="flex items-center gap-2 font-bold text-[#FFFFFF]">
                <ImageIcon className="w-4 h-4 text-[#EAB308]" />
                <span>Test Reference Sacred Artworks from Our Catalog:</span>
              </span>
              <span className="text-[11px] text-[#EAB308]">
                Click any art below to see it inside the 3D frame
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {ART_REFERENCES.map((art) => {
                const isActive = activeImage === art.image;
                return (
                  <button
                    key={art.id}
                    type="button"
                    onClick={() => handleArtSelect(art)}
                    className={`p-2 rounded-2xl border transition-all flex flex-col items-center text-center gap-2 cursor-pointer group ${
                      isActive
                        ? 'border-[#EAB308] bg-[#181818] ring-2 ring-[#EAB308]/30 shadow-xs -translate-y-0.5'
                        : 'border-[#2D2D2D]/80 bg-white hover:bg-[#121212] hover:border-[#EAB308]/50'
                    }`}
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-[#2D2D2D] shadow-xs relative shrink-0">
                      <img
                        src={art.image}
                        alt={art.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {art.hasLed && (
                        <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
                      )}
                    </div>
                    <div className="w-full min-w-0">
                      <span className="text-xs font-bold text-[#FFFFFF] block truncate group-hover:text-[#FFFFFF]">
                        {art.name}
                      </span>
                      <span className="text-[10px] text-[#D1D5DB] block truncate">
                        {art.tag}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Real-Time Personalization Input (When Gold Script Heirloom is active) */}
          {selectedFrame.id === 'gold-crest' && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FFF8EF] to-[#FAF3E8] border border-[#EAB308]/80 space-y-2 animate-in fade-in duration-300">
              <div className="flex items-center justify-between text-xs font-bold text-[#FFFFFF]">
                <label className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#EAB308]" />
                  <span>Type Your 24K Gold Script Inscription (Real-time Live Preview):</span>
                </label>
                <span className="text-[11px] text-[#D1D5DB] font-normal">
                  {customInscription.length}/50 Characters
                </span>
              </div>
              <input
                type="text"
                maxLength={50}
                value={customInscription}
                onChange={(e) => setCustomInscription(e.target.value)}
                placeholder="e.g. The Sharma Family • Consecrated 2026"
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white border border-[#EAB308] rounded-xl outline-none focus:border-[#A06E28] focus:ring-1 focus:ring-[#A06E28] text-[#FFFFFF] font-serif"
              />
              <p className="text-[11px] text-[#D1D5DB]">
                ✦ Rendered with genuine 24-karat gold leaf foil beneath the 4mm acrylic shield. Perfect for housewarmings, temple sanctums &amp; wedding anniversaries.
              </p>
            </div>
          )}
        </div>

        {/* =========================================================
            5. THE 3-STEP ARTISAN JOURNEY & GUARANTEE ARCHITECTURE
            ========================================================= */}
        <div className="relative z-10 pt-10">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FFFFFF] bg-[#181818] px-3.5 py-1 rounded-full border border-[#EAB308]/40 shadow-2xs">
              Effortless Custom Fabrication
            </span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#FFFFFF]">
              How Your Custom Frame Is Handcrafted
            </h3>
            <p className="text-xs sm:text-sm text-[#D1D5DB]">
              From digital concept to factory-direct Hyderabad delivery in 3 seamless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-3xl border border-[#2D2D2D] shadow-sm hover:border-[#EAB308] hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#181818] text-[#EAB308] border border-[#EAB308]/40 font-serif font-bold text-base flex items-center justify-center shadow-xs">
                01
              </div>
              <h4 className="font-serif font-bold text-lg text-[#FFFFFF]">
                Upload Photo or Pick Sacred Art
              </h4>
              <p className="text-xs text-[#D1D5DB] leading-relaxed">
                Choose any sacred deity artwork from our catalog or upload your family portrait. Select custom dimensions up to 6×4 feet with portrait, landscape, or circular shapes.
              </p>
              <div className="pt-2 text-[11px] font-bold text-[#EAB308] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Instant 3D Wall Preview</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-3xl border border-[#2D2D2D] shadow-sm hover:border-[#EAB308] hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EAB308] text-[#FFFFFF] font-serif font-bold text-base flex items-center justify-center shadow-xs">
                02
              </div>
              <h4 className="font-serif font-bold text-lg text-[#FFFFFF]">
                1:1 WhatsApp Proof Approval
              </h4>
              <p className="text-xs text-[#D1D5DB] leading-relaxed">
                Our master graphic artisans inspect your image resolution, enhance color dynamics, and share an exact 1:1 digital layout on WhatsApp for your sign-off before printing.
              </p>
              <div className="pt-2 text-[11px] font-bold text-[#EAB308] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Visual Sign-off Guarantee</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-3xl border border-[#2D2D2D] shadow-sm hover:border-[#EAB308] hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#181818] text-[#EAB308] border border-[#EAB308]/40 font-serif font-bold text-base flex items-center justify-center shadow-xs">
                03
              </div>
              <h4 className="font-serif font-bold text-lg text-[#FFFFFF]">
                Diamond CNC Fabrication &amp; Delivery
              </h4>
              <p className="text-xs text-[#D1D5DB] leading-relaxed">
                Fabricated with premium acrylic and 50,000h Epistar warm LEDs. Packed in 5-layer wood-reinforced crates with direct studio pickup or pan-India delivery.
              </p>
              <div className="pt-2 text-[11px] font-bold text-[#EAB308] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Transit Safe Replacement</span>
              </div>
            </div>
          </div>

          {/* Bottom Luxury Action & Trust Bar */}
          <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-[#121212] via-[#181818] to-[#121212] text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-[#EAB308]">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="font-serif font-bold text-xl text-[#FFFFFF]">
                Need a specific temple size, gold inscription, or urgent express fabrication?
              </h4>
              <p className="text-xs sm:text-sm text-[#E5E7EB]/85">
                Our Dilsukhnagar workshop crafts any custom size up to 6×4 feet with same-day digital proofs.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/customise"
                className="bg-[#EAB308] hover:bg-[#FACC15] text-[#FFFFFF] font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-md transition-all hover:scale-105 uppercase tracking-wider"
              >
                Launch Studio Customizer →
              </Link>

              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-[#FFFFFF] border border-white/30 font-bold text-xs sm:text-sm px-5 py-3 rounded-full transition-colors flex items-center gap-1.5 uppercase tracking-wider"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
