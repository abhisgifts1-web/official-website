'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Sun,
  Moon,
  Layers,
  MapPin,
  Compass,
  ArrowRight,
  MessageCircle,
  Eye,
  CheckCircle2,
  Maximize2,
  Flame,
  ShieldCheck,
  Award,
  Upload,
  RotateCcw,
} from 'lucide-react';

interface VisualizerArtwork {
  id: string;
  name: string;
  shortName: string;
  category: string;
  image: string;
  productUrl: string;
  price: string;
  vastuZone: string;
  vastuDirection: string;
  vastuSignificance: string;
  idealRoom: string;
  tag: string;
}

interface WallEnvironment {
  id: string;
  name: string;
  label: string;
  wallColorDay: string;
  wallColorNight: string;
  wallTexture: string;
  ambientLightDay: string;
  ambientLightNight: string;
  furnitureType: string;
  accentDetail: string;
}

const ARTWORKS: VisualizerArtwork[] = [
  {
    id: 'balaji-led',
    name: 'Divine Tirupati Balaji 3D LED Backlit Art',
    shortName: 'Tirupati Balaji',
    category: 'Sacred Devotional',
    image: '/images/mockups/tirupati-balaji-divine-led-backlit-acrylic-wall-art/primary-square.jpg',
    productUrl: '/product/tirupati-balaji-divine-led-backlit-acrylic-wall-art',
    price: '₹3,499',
    vastuZone: 'North-East (Ishanya)',
    vastuDirection: 'North-East Wall',
    vastuSignificance: 'Attracts Vaikuntha abundance, shields against planetary doshas & brings divine tranquility.',
    idealRoom: 'Pooja Mandir & Living Room',
    tag: 'Flagship Sanctum',
  },
  {
    id: 'radha-krishna-led',
    name: 'Radha Krishna Divine Bansuri 3D LED Art',
    shortName: 'Radha Krishna',
    category: 'Divine Harmony',
    image: '/images/mockups/radha-krishna-divine-bansuri-3d-led-acrylic-wall-art/primary-square.jpg',
    productUrl: '/product/radha-krishna-divine-bansuri-3d-led-acrylic-wall-art',
    price: '₹3,299',
    vastuZone: 'North / East',
    vastuDirection: 'East or North-East Wall',
    vastuSignificance: 'Infuses unconditional affection, domestic warmth, harmony & emotional healing.',
    idealRoom: 'Living Room & Bedroom',
    tag: 'Bestseller',
  },
  {
    id: 'ram-mandir-led',
    name: 'Ayodhya Ram Mandir Architectural 3D LED Art',
    shortName: 'Ram Mandir',
    category: 'Sanctum Heritage',
    image: '/images/mockups/ayodhya-ram-janmabhoomi-mandir-3d-led-wall-decor/primary-square.jpg',
    productUrl: '/product/ayodhya-ram-janmabhoomi-mandir-3d-led-wall-decor',
    price: '₹3,499',
    vastuZone: 'East (Indra Zone)',
    vastuDirection: 'East Wall',
    vastuSignificance: 'Bestows moral strength, righteous dharma, family unity & fearless domestic protection.',
    idealRoom: 'Pooja Mandir & Grand Foyer',
    tag: 'Consecrated Art',
  },
  {
    id: 'ganesha-led',
    name: 'Lord Ganesha Vighnaharta Divine LED Art',
    shortName: 'Vighnaharta Ganesha',
    category: 'Auspicious Beginnings',
    image: '/images/mockups/lord-ganesha-vighnaharta-divine-led-backlit-acrylic-art/primary-square.jpg',
    productUrl: '/product/lord-ganesha-vighnaharta-divine-led-backlit-acrylic-art',
    price: '₹3,299',
    vastuZone: 'North-East / North',
    vastuDirection: 'Main Entrance or North Wall',
    vastuSignificance: 'Removes career stumbling blocks, ushers in Shubh-Labh prosperity & new beginnings.',
    idealRoom: 'Foyer, Office & Mandir',
    tag: 'Trending',
  },
  {
    id: 'lakshmi-led',
    name: 'Goddess Mahalakshmi Prosperity Divine LED Art',
    shortName: 'Goddess Mahalakshmi',
    category: 'Wealth Abundance',
    image: '/images/mockups/goddess-mahalakshmi-prosperity-divine-led-backlit-acrylic-art/primary-square.jpg',
    productUrl: '/product/goddess-mahalakshmi-prosperity-divine-led-backlit-acrylic-art',
    price: '₹3,399',
    vastuZone: 'North (Kuber Sthana)',
    vastuDirection: 'North Wall',
    vastuSignificance: 'Awakens 8-fold wealth (Ashta Lakshmi), business growth, nourishment & eternal prosperity.',
    idealRoom: 'Pooja Room & Living Room',
    tag: 'Diwali Special',
  },
  {
    id: 'seven-horses',
    name: '7 Running Horses Vastu 24K Gold Acrylic Art',
    shortName: '7 Running Horses Vastu',
    category: 'Success & Power',
    image: '/images/mockups/seven-running-horses-vastu-gold-acrylic-wall-art/primary-square.jpg',
    productUrl: '/product/seven-running-horses-vastu-gold-acrylic-wall-art',
    price: '₹2,999',
    vastuZone: 'South or East',
    vastuDirection: 'South or East Wall',
    vastuSignificance: 'Generates unstoppable momentum, career victory, financial growth & vitality.',
    idealRoom: 'Living Room & Home Office',
    tag: 'Vastu Essential',
  },
  {
    id: 'custom-photo',
    name: 'Custom Acrylic Keepsake Photo Frame',
    shortName: 'Your Personal Photo',
    category: 'Bespoke Keepsake',
    image: '/images/wall-decor/products/custom/custom-portrait-frame.jpg',
    productUrl: '/customise',
    price: 'From ₹1,499',
    vastuZone: 'South-West (Nairutya)',
    vastuDirection: 'South-West Wall',
    vastuSignificance: 'Anchors family bonds, deep relationship trust, marital love & generational stability.',
    idealRoom: 'Living Room & Bedroom',
    tag: 'Personalized Gift',
  },
];

const WALL_ENVIRONMENTS: WallEnvironment[] = [
  {
    id: 'pooja-sanctum',
    name: 'Pooja Mandir Sanctum',
    label: 'Sacred Mandir',
    wallColorDay: 'from-[#FDFBF7] via-[#F7EFE2] to-[#ECE1CE]',
    wallColorNight: 'from-[#1E0F14] via-[#14080D] to-[#0A0407]',
    wallTexture: 'radial-gradient(ellipse at 50% 30%, rgba(214,170,85,0.18), transparent 70%)',
    ambientLightDay: 'bg-amber-100/30',
    ambientLightNight: 'bg-amber-500/10',
    furnitureType: 'Carved Makrana White Marble Altar & Brass Diya Lamps',
    accentDetail: 'Ornate Temple Carvings & Holy Brass Bells',
  },
  {
    id: 'living-room',
    name: 'Contemporary Living Room',
    label: 'Modern Living Wall',
    wallColorDay: 'from-[#FAF6F0] via-[#F3ECE0] to-[#E9DFCE]',
    wallColorNight: 'from-[#171314] via-[#0F0B0C] to-[#080506]',
    wallTexture: 'radial-gradient(ellipse at 50% 40%, rgba(200,160,80,0.14), transparent 75%)',
    ambientLightDay: 'bg-amber-50/20',
    ambientLightNight: 'bg-amber-600/15',
    furnitureType: 'Italian Nero Marquina Marble Console & Designer Fluted Paneling',
    accentDetail: 'Architectural Vertical Brass Sconces',
  },
  {
    id: 'bedroom-suite',
    name: 'Luxury Bedroom Suite',
    label: 'Master Bedroom',
    wallColorDay: 'from-[#FBF8F3] via-[#F4ECE1] to-[#EBE0CF]',
    wallColorNight: 'from-[#181115] via-[#10090D] to-[#090508]',
    wallTexture: 'radial-gradient(ellipse at 50% 35%, rgba(220,180,100,0.15), transparent 70%)',
    ambientLightDay: 'bg-rose-50/20',
    ambientLightNight: 'bg-amber-500/15',
    furnitureType: 'Tufted Belgian Linen Headboard & Warm Bedside Ambient Nightstand',
    accentDetail: 'Soft Nocturnal Relaxation Glow',
  },
  {
    id: 'foyer-hall',
    name: 'Grand Foyer & Gallery Hall',
    label: 'Entrance Foyer',
    wallColorDay: 'from-[#FCFAF5] via-[#F5EEE2] to-[#EAE0D0]',
    wallColorNight: 'from-[#150F12] via-[#0E090B] to-[#060405]',
    wallTexture: 'radial-gradient(ellipse at 50% 45%, rgba(210,170,90,0.16), transparent 70%)',
    ambientLightDay: 'bg-amber-50/25',
    ambientLightNight: 'bg-amber-500/12',
    furnitureType: 'Floating Minimalist Console with Natural Indoor Fiddle Fig',
    accentDetail: 'First Impression Statement Wall',
  },
];

const FRAME_SIZES = [
  { id: '12x18', label: '12x18 in', scaleClass: 'scale-75 sm:scale-80', desc: 'Compact • Bedside & Study', priceOffset: 'Standard' },
  { id: '18x24', label: '18x24 in', scaleClass: 'scale-90 sm:scale-95', desc: 'Popular • Mandir & Foyers', priceOffset: '+₹800' },
  { id: '24x36', label: '24x36 in', scaleClass: 'scale-105 sm:scale-110', desc: 'Grand • Living Feature Wall', priceOffset: '+₹1,800' },
  { id: '30x45', label: '30x45 in', scaleClass: 'scale-120 sm:scale-125', desc: 'Masterpiece • Villa Scale', priceOffset: '+₹3,200' },
];

const FRAME_FINISHES = [
  { id: 'matte-black', name: 'Sleek Matte Black', borderClass: 'border-[#1A1A1A]', shadowClass: 'shadow-2xl' },
  { id: 'champagne-gold', name: 'Champagne 24K Gold', borderClass: 'border-[#EAB308]', shadowClass: 'shadow-[0_0_25px_rgba(198,154,66,0.3)]' },
  { id: 'frameless-crystal', name: 'Frameless Diamond Bevel', borderClass: 'border-white/40', shadowClass: 'shadow-[0_15px_40px_rgba(0,0,0,0.4)]' },
];

export default function RoomVisualizerSection() {
  const [selectedArtwork, setSelectedArtwork] = useState<VisualizerArtwork>(ARTWORKS[0]);
  const [selectedRoom, setSelectedRoom] = useState<WallEnvironment>(WALL_ENVIRONMENTS[0]);
  const [selectedSize, setSelectedSize] = useState(FRAME_SIZES[1]); // default 18x24
  const [selectedFinish, setSelectedFinish] = useState(FRAME_FINISHES[0]); // default matte black
  const [isLedOn, setIsLedOn] = useState<boolean>(true);
  const [userUploadedPhoto, setUserUploadedPhoto] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCustomPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserUploadedPhoto(reader.result as string);
        setSelectedArtwork(ARTWORKS[6]); // switch to custom photo option
      };
      reader.readAsDataURL(file);
    }
  };

  const activeImage =
    selectedArtwork.id === 'custom-photo' && userUploadedPhoto
      ? userUploadedPhoto
      : selectedArtwork.image;

  const whatsappInquiryUrl = `https://wa.me/917780269927?text=${encodeURIComponent(
    `Hi Abhi's Gifts! I used the Sacred Space Visualizer on your website. I am interested in:\n- Artwork: ${selectedArtwork.name}\n- Room Environment: ${selectedRoom.name}\n- Size: ${selectedSize.label} (${selectedSize.desc})\n- Finish: ${selectedFinish.name}\n- Lighting: ${isLedOn ? '3000K LED On' : 'Non-Lit'}\nCan you share final price, WhatsApp digital proof & delivery time to Hyderabad?`
  )}`;

  return (
    <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 py-8 sm:py-12 lg:py-14 select-none">
      {/* Outer Luxury Shell */}
      <div className="bg-gradient-to-br from-[#181818] via-[#141414] to-[#181818] rounded-3xl sm:rounded-[36px] p-6 sm:p-8 lg:p-12 border border-[#2D2D2D] shadow-[0_16px_50px_rgba(81,27,42,0.08)] relative overflow-hidden">
        {/* Subtle Ambient Decorative Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#EAB308]/10 rounded-full blur-3xl pointer-events-none" />

        {/* SECTION HEADER: Editorial Title & Concept Badge */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10 pb-6 border-b border-[#2D2D2D]/80 relative z-10">
          <div className="space-y-2.5 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FFFFFF] bg-white border border-[#EAB308]/60 px-4 py-1.5 rounded-full shadow-2xs">
              <Compass className="w-3.5 h-3.5 text-[#EAB308] animate-spin-slow" />
              <span>INTERACTIVE SACRED SPACE VISUALIZER • VASTU STUDIO</span>
            </div>

            <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-[#FFFFFF] tracking-tight leading-tight">
              SEE IT ON YOUR WALL. <span className="font-normal italic text-[#EAB308]">FEEL THE DIVINE AURA.</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed font-sans">
              Test-fit sacred 3D acrylic art, customize dimensions against real furniture scale, switch between Day and 3000K Warm Nocturnal LED illumination, and discover recommended Vastu cardinal directions for your home.
            </p>
          </div>

          {/* Quick Upload Action */}
          <div className="flex items-center gap-3 shrink-0">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleCustomPhotoUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 bg-white hover:bg-[#121212] border border-[#EAB308] text-[#FFFFFF] px-5 py-2.5 rounded-full text-xs font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-[#EAB308]" />
              <span>Test Your Own Photo</span>
            </button>
          </div>
        </div>

        {/* =========================================================
            MAIN VISUALIZER WORKSPACE: Two-Column Responsive Layout
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start relative z-10">
          {/* =========================================================
              LEFT COLUMN (7 COLS): The Interactive Visual Canvas Viewport
              ========================================================= */}
          <div className="lg:col-span-7 space-y-4">
            {/* Environment Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-white/90 rounded-2xl border border-[#2D2D2D] shadow-2xs">
              {WALL_ENVIRONMENTS.map((env) => (
                <button
                  key={env.id}
                  onClick={() => setSelectedRoom(env)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedRoom.id === env.id
                      ? 'bg-[#EAB308] text-[#000000] shadow-xs'
                      : 'text-[#D1D5DB] hover:text-[#FFFFFF] hover:bg-[#121212]'
                  }`}
                >
                  {env.label}
                </button>
              ))}
            </div>

            {/* Interactive Wall Stage Viewport */}
            <div
              className={`relative w-full aspect-[4/3.4] sm:aspect-[4/3] rounded-3xl overflow-hidden border-2 border-[#EAB308]/60 shadow-2xl transition-all duration-700 bg-gradient-to-b ${
                isLedOn ? selectedRoom.wallColorNight : selectedRoom.wallColorDay
              }`}
            >
              {/* Dynamic Wall Pattern / Texture */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                style={{
                  backgroundImage: selectedRoom.wallTexture,
                  opacity: isLedOn ? 0.9 : 0.4,
                }}
              />

              {/* Day / Night Mood Lighting Overlay */}
              <div
                className={`absolute inset-0 pointer-events-none transition-colors duration-700 ${
                  isLedOn ? selectedRoom.ambientLightNight : selectedRoom.ambientLightDay
                }`}
              />

              {/* Architectural Ceiling Molding / Lighting Bar */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />

              {/* Top Bar Indicator Pills */}
              <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                <span className="bg-black/75 backdrop-blur-md text-[#FFFFFF] text-[11px] font-bold px-3 py-1 rounded-full border border-[#EAB308]/50 flex items-center gap-1.5 shadow-sm">
                  <MapPin className="w-3 h-3 text-[#EAB308]" />
                  <span>{selectedRoom.name}</span>
                </span>

                {/* Day / Night Switch */}
                <button
                  onClick={() => setIsLedOn(!isLedOn)}
                  className="pointer-events-auto bg-[#EAB308] hover:bg-[#FACC15] text-[#000000] border border-[#EAB308] px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer active:scale-95"
                >
                  {isLedOn ? (
                    <>
                      <Moon className="w-3.5 h-3.5 text-[#FACC15] animate-pulse" />
                      <span>3000K LED: ON</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-300" />
                      <span>Daylight: OFF</span>
                    </>
                  )}
                </button>
              </div>

              {/* =====================================================
                  CENTERPIECE: Framed Artwork on Wall with 3000K Halo Glow
                  ===================================================== */}
              <div className="absolute inset-0 flex items-center justify-center pb-12 sm:pb-16 z-10">
                <div
                  className={`relative transition-all duration-500 transform ${selectedSize.scaleClass}`}
                >
                  {/* Outer 3000K Golden LED Halo Backlight Glow (When LED ON) */}
                  {isLedOn && (
                    <div className="absolute -inset-8 sm:-inset-12 bg-gradient-to-r from-[#FFC857]/30 via-[#FFD78A]/45 to-[#FFB732]/30 rounded-3xl blur-2xl pointer-events-none animate-pulse-slow" />
                  )}

                  {/* Secondary Ambient Wall Spill */}
                  {isLedOn && (
                    <div className="absolute -inset-16 sm:-inset-24 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
                  )}

                  {/* Frame Shell Container */}
                  <div
                    className={`relative w-52 sm:w-64 md:w-72 aspect-square rounded-2xl overflow-hidden border-4 ${selectedFinish.borderClass} ${selectedFinish.shadowClass} bg-stone-900 transition-all duration-300`}
                  >
                    {/* The Active Artwork Image */}
                    <img
                      src={activeImage}
                      alt={selectedArtwork.name}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />

                    {/* Specular Acrylic Gloss Sweep Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />

                    {/* Inner Warm LED Perimeter Strip when ON */}
                    {isLedOn && (
                      <div className="absolute inset-0 border-2 border-amber-300/40 pointer-events-none shadow-[inset_0_0_15px_rgba(255,215,130,0.5)]" />
                    )}

                    {/* Corner Standoff Studs for Frameless Crystal */}
                    {selectedFinish.id === 'frameless-crystal' && (
                      <>
                        <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-gradient-to-br from-amber-200 to-amber-600 shadow-sm" />
                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br from-amber-200 to-amber-600 shadow-sm" />
                        <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-gradient-to-br from-amber-200 to-amber-600 shadow-sm" />
                        <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br from-amber-200 to-amber-600 shadow-sm" />
                      </>
                    )}
                  </div>

                  {/* Dimensions Scale Badge Below Frame */}
                  <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 backdrop-blur-xs text-[#FACC15] text-[10.5px] font-bold px-2.5 py-0.5 rounded-full border border-[#EAB308]/40 shadow-sm pointer-events-none">
                    {selectedSize.label} • {selectedFinish.name}
                  </div>
                </div>
              </div>

              {/* Bottom Console Table & Accents (Furniture Scale Reference) */}
              <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-between px-6 pb-2 pointer-events-none z-10">
                <span className="text-[10px] text-white/70 italic flex items-center gap-1">
                  <span>Furniture Reference:</span>
                  <span className="font-semibold text-white/90">{selectedRoom.furnitureType}</span>
                </span>
                <span className="text-[10px] text-[#EAB308] font-semibold">
                  Eye-Level 5ft Hanging Guide
                </span>
              </div>
            </div>

            {/* Vastu Shastra Placement Recommendation Card */}
            <div className="bg-gradient-to-br from-[#181818] to-[#141414] rounded-2xl p-4 sm:p-5 border border-[#EAB308]/50 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#FFFFFF] uppercase tracking-wider">
                  <Compass className="w-4 h-4 text-[#EAB308]" />
                  <span>VASTU SHASTRA ENERGY GUIDE • {selectedArtwork.vastuZone}</span>
                </div>
                <p className="text-xs text-[#D1D5DB] leading-relaxed">
                  <strong>Recommended Wall:</strong> {selectedArtwork.vastuDirection}. {selectedArtwork.vastuSignificance}
                </p>
              </div>

              <div className="shrink-0 bg-white px-3 py-1.5 rounded-xl border border-[#2D2D2D] text-[11px] font-bold text-[#FFFFFF]">
                Energy Rating: 100% Auspicious
              </div>
            </div>
          </div>

          {/* =========================================================
              RIGHT COLUMN (5 COLS): Interactive Customization Controls
              ========================================================= */}
          <div className="lg:col-span-5 space-y-6">
            {/* 1. SELECT ARTWORK CAROUSEL / GRID */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="font-serif font-bold text-sm text-[#FFFFFF] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#EAB308]" />
                  <span>1. Choose Sacred Art or Photo</span>
                </label>
                <span className="text-[11px] text-[#D1D5DB]">{ARTWORKS.length} Styles Available</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[220px] overflow-y-auto pr-1">
                {ARTWORKS.map((art) => (
                  <button
                    key={art.id}
                    onClick={() => setSelectedArtwork(art)}
                    className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedArtwork.id === art.id
                        ? 'bg-[#181818] border-[#EAB308] ring-2 ring-[#EAB308]/40 shadow-xs'
                        : 'bg-white/80 border-[#2D2D2D] hover:bg-white hover:border-[#EAB308]'
                    }`}
                  >
                    <img
                      src={art.image}
                      alt={art.name}
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-[#FFFFFF] truncate">{art.shortName}</p>
                      <p className="text-[10px] text-[#EAB308] font-semibold">{art.price}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. CHOOSE FRAME SIZE */}
            <div className="space-y-2.5">
              <label className="font-serif font-bold text-sm text-[#FFFFFF] uppercase tracking-wider flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-[#EAB308]" />
                <span>2. Select Frame Dimensions</span>
              </label>

              <div className="grid grid-cols-2 gap-2">
                {FRAME_SIZES.map((sz) => (
                  <button
                    key={sz.id}
                    onClick={() => setSelectedSize(sz)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedSize.id === sz.id
                        ? 'bg-[#EAB308] text-[#000000] border-[#EAB308] shadow-sm'
                        : 'bg-white text-[#FFFFFF] border-[#2D2D2D] hover:border-[#EAB308]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs">{sz.label}</span>
                      <span
                        className={`text-[10px] font-bold ${
                          selectedSize.id === sz.id ? 'text-[#FACC15]' : 'text-[#EAB308]'
                        }`}
                      >
                        {sz.priceOffset}
                      </span>
                    </div>
                    <p
                      className={`text-[10.5px] mt-0.5 truncate ${
                        selectedSize.id === sz.id ? 'text-white/80' : 'text-[#785E59]'
                      }`}
                    >
                      {sz.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. CHOOSE FRAME FINISH */}
            <div className="space-y-2.5">
              <label className="font-serif font-bold text-sm text-[#FFFFFF] uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#EAB308]" />
                <span>3. Frame Border &amp; Finish</span>
              </label>

              <div className="grid grid-cols-3 gap-2">
                {FRAME_FINISHES.map((fin) => (
                  <button
                    key={fin.id}
                    onClick={() => setSelectedFinish(fin)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedFinish.id === fin.id
                        ? 'bg-[#EAB308] text-[#000000] border-[#EAB308] shadow-sm'
                        : 'bg-white text-[#FFFFFF] border-[#2D2D2D] hover:border-[#EAB308]'
                    }`}
                  >
                    <span className="text-[11px] font-bold block">{fin.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* SUMMARY & DIRECT CONVERSION ACTIONS */}
            <div className="bg-white rounded-2xl p-5 border border-[#2D2D2D] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#2D2D2D]/60">
                <div>
                  <span className="text-[11px] text-[#785E59] uppercase tracking-wider block">Selected Configuration:</span>
                  <h4 className="font-serif font-bold text-base text-[#FFFFFF]">{selectedArtwork.name}</h4>
                  <p className="text-xs text-[#785E59]">
                    {selectedSize.label} • {selectedFinish.name} • {isLedOn ? '3000K Warm LED' : 'Premium Acrylic'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#785E59] block">Total Estimate:</span>
                  <span className="font-serif font-bold text-xl text-[#FFFFFF]">{selectedArtwork.price}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <Link
                  href={selectedArtwork.productUrl}
                  className="w-full bg-[#EAB308] hover:bg-[#FACC15] text-[#000000] py-3 px-5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#EAB308]" />
                  <span>Customize &amp; Order This Setup</span>
                  <ArrowRight className="w-4 h-4 text-[#EAB308]" />
                </Link>

                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-2.5 px-4 rounded-full font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Ask Artisan for 1:1 WhatsApp Proof</span>
                </a>
              </div>

              {/* Micro Trust Pills */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-[#785E59]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Transit Safe</span>
                </span>
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#EAB308]" />
                  <span>Premium Acrylic</span>
                </span>
                <span className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>50,000h LEDs</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
