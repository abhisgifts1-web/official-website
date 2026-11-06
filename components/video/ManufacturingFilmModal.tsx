'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Maximize2,
  Volume2,
  VolumeX,
  ShieldCheck,
  CheckCircle2,
  Gem,
  Flame,
  Layers,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultScene?: number;
}

interface SceneData {
  id: number;
  timeRange: string;
  badge: string;
  title: string;
  subtitle: string;
  voiceover: string;
  specs: { label: string; value: string }[];
  visualHighlights: string[];
}

const FILM_SCENES: SceneData[] = [
  {
    id: 1,
    timeRange: '0:00 – 0:05',
    badge: 'SCENE 01: RAW MATERIALS',
    title: 'Raw Materials & Texture Inspection',
    subtitle: 'Virgin optical-grade cast acrylic, micro-pigment inks & gold foil accents',
    voiceover:
      'In our artisanal workshop, creation begins with uncompromising raw materials: cast acrylic high-density imported virgin cast acrylic with 99.2% optical purity, high-resolution Lord Ganesha artwork, gold foil foil leaf detailing, and calibrated LED LED light components.',
    specs: [
      { label: 'Acrylic Purity', value: '99.2% Cast' },
      { label: 'Gold Leaf', value: 'specular gold' },
      { label: 'LED Kelvin', value: 'LED' },
    ],
    visualHighlights: [
      'Cinematic macro shot of crystal acrylic edge grain',
      'Artisanal palette with sindoor red, saffron, and gold pigment trays',
      'Anti-static velvet foam and wooden transit armor',
    ],
  },
  {
    id: 2,
    timeRange: '0:05 – 0:10',
    badge: 'SCENE 02: ACRYLIC PREPARATION',
    title: 'Precision CNC Sizing & precision beveling',
    subtitle: 'Laser measuring, diamond polishing & 45-degree prism bevels',
    voiceover:
      'The optical cast sheet is measured to micrometer accuracy and precision-cut using diamond tooling. Edge polishing eliminates all micro-burrs, producing 45-degree beveled facets that catch room light like crystalline glass without any fragility hazards.',
    specs: [
      { label: 'Cutting Tolerance', value: '±0.05 mm' },
      { label: 'Edge Finish', value: 'precision CNC' },
      { label: 'Safety Index', value: '100% Shatterproof' },
    ],
    visualHighlights: [
      'Digital vernier caliper verifying 4.00mm exact thickness',
      'High-speed diamond polishing head gliding with coolant mist',
      'Prism reflections shimmering across crystalline chamfered bevels',
    ],
  },
  {
    id: 3,
    timeRange: '0:10 – 0:16',
    badge: 'SCENE 03: DEVOTIONAL PRINTING',
    title: '1200 DPI Japanese Flatbed UV Micro-Pigment Printing',
    subtitle: 'Vivid sindoor, turmeric gold & archival Lord Ganesha iconography',
    voiceover:
      'The sacred iconography of Lord Ganesha Vighnaharta is rendered via Japanese flatbed micro-piezo print heads. Curing instantly with 395nm UV photopolymerization, the colors achieve 98% DCI-P3 gamut fidelity with guaranteed Long-Lasting anti-fading durability.',
    specs: [
      { label: 'Print Resolution', value: '1200 DPI True' },
      { label: 'Ink Technology', value: 'UV Micro-Piezo' },
      { label: 'Fade Resistance', value: 'UV vibrancy assurance' },
    ],
    visualHighlights: [
      'Print carriage depositing rich saffron, vermillion, and golden yellow pigments',
      'Intricate Mor Pankh, Modak sweet, and Mushaka Vahana in high definition',
      'Instant UV lamp sweep curing pigments into the molecular substrate',
    ],
  },
  {
    id: 4,
    timeRange: '0:16 – 0:25',
    badge: 'SCENE 04: LAYER-BY-LAYER ASSEMBLY',
    title: '3D Exploded-View Vertical Alignment',
    subtitle: 'Hovering 5-layer convergence into a unified sacred masterpiece',
    voiceover:
      'All five engineering tiers align vertically in precision space: the acrylic panel shield, hand-embellished gold foil foil halos, the archival Ganesha print, the LED light-guide, and the moisture-armor backing plate, snapping into microscopic register with stainless studs.',
    specs: [
      { label: 'Layer Count', value: '5 Physical Tiers' },
      { label: 'Alignment Tolerance', value: '0.1 mm' },
      { label: 'Hardware', value: 'Stainless Standoffs' },
    ],
    visualHighlights: [
      'Layer 1: cast acrylic front optical acrylic shield with corner studs',
      'Layer 2: gold pure gold leaf mukut (crown) and divine prabhavali halo',
      'Layer 3: 1200 DPI archival devotional Lord Ganesha canvas',
      'Layer 4: LED perimeter LED diode light-guide',
      'Layer 5: Acoustic-damped moisture-seal backing with laser French cleat',
    ],
  },
  {
    id: 5,
    timeRange: '0:25 – 0:32',
    badge: 'SCENE 05: FINISHING & QUALITY AUDIT',
    title: 'Artisanal White-Glove Polish & Luminescence Testing',
    subtitle: 'Microfiber surface sanitization, gold adhesion & circuit certification',
    voiceover:
      'In a dust-free enclosure, white-gloved master artisans inspect every millimeter under calibrated raking light. The gold foil is tested for adhesion, the surface is polished with anti-static microfiber, and the 12V LED circuit is tested for warm golden illumination.',
    specs: [
      { label: 'Quality Standard', value: '100% Zero-Defect' },
      { label: 'Circuit Voltage', value: '12V Low Voltage' },
      { label: 'Handling', value: 'Cotton White-Glove' },
    ],
    visualHighlights: [
      'Artisan in white cotton gloves wiping crystal surface with microfiber',
      'Illuminating inspection lamp checking gold leaf mukut reflections',
      '12V toggle click igniting the golden LED halo with zero flicker',
    ],
  },
  {
    id: 6,
    timeRange: '0:32 – 0:40',
    badge: 'SCENE 06: CONSECRATED REVEAL',
    title: 'Final Reveal on Statuario Marble Mandir Altar',
    subtitle: 'Flanked by brass ghee diyas, fresh jasmine & warm nocturnal glow',
    voiceover:
      'The finished Lord Ganesha heirloom stands triumphant on Statuario cream marble. Flanked by flickering brass ghee lamps and fragrant jasmine blossoms, the LED golden halo illuminates the living wall, transforming the home into a sanctuary of peace, auspiciousness, and prosperity.',
    specs: [
      { label: 'Altar Surface', value: 'Italian Marble' },
      { label: 'Ambiance', value: 'LED Temple Aura' },
      { label: 'Vibration', value: 'Auspicious Shanti' },
    ],
    visualHighlights: [
      'Slow 360-degree orbital camera pan around the glowing Ganesha frame',
      'Warm golden light spilling across marble and living room textured walls',
      'Macro close-up on Lord Ganesha compassionate eyes and shimmering gold crown',
    ],
  },
];

export default function ManufacturingFilmModal({ isOpen, onClose, defaultScene = 1 }: Props) {
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(defaultScene - 1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(false);

  const activeScene = FILM_SCENES[activeSceneIndex] || FILM_SCENES[0];

  useEffect(() => {
    if (!isOpen) return;
    setActiveSceneIndex(defaultScene - 1);
    setCurrentTimeSec(0);
    setIsPlaying(true);
  }, [isOpen, defaultScene]);

  // Automatic timeline progression
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTimeSec((prev) => {
        const next = prev + 1;
        if (next >= 40) {
          setIsPlaying(false);
          return 40;
        }
        // Auto advance scene based on timestamp
        if (next < 5) setActiveSceneIndex(0);
        else if (next < 10) setActiveSceneIndex(1);
        else if (next < 16) setActiveSceneIndex(2);
        else if (next < 25) setActiveSceneIndex(3);
        else if (next < 32) setActiveSceneIndex(4);
        else setActiveSceneIndex(5);
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const whatsappInquiryUrl = `https://wa.me/917780269927?text=${encodeURIComponent(
    `Hi Abhi's Gifts! I watched your 4K Manufacturing Film for the Lord Ganesha 3D LED Backlit Frame. The 5-layer craftsmanship and LED lighting look exceptional. Can you share available sizes and pricing?`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn">
      {/* Outer Cinema Shell */}
      <div className="relative w-full max-w-5xl bg-gradient-to-b from-[#1C0912] via-[#12050B] to-[#0A0206] rounded-3xl sm:rounded-[32px] border-2 border-[#EAB308]/60 shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-[#EAB308]/30 bg-black/50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#FACC15] block font-mono">
                ABHI&apos;S GIFTS ATELIER • 4K MANUFACTURING FILM
              </span>
              <h3 className="font-serif font-bold text-sm sm:text-base text-[#FFFFFF] tracking-wide">
                Lord Ganesha Vighnaharta 3D LED Frame: Behind The Craft
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block bg-[#181818] text-[#FACC15] border border-[#EAB308] text-[11px] font-bold px-2.5 py-1 rounded-md">
              4K UHD • 60 FPS
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 16:9 Cinema Viewport */}
        <div className="relative w-full aspect-[16/9.5] sm:aspect-[16/9] bg-[#070204] overflow-hidden flex items-center justify-center select-none">
          
          {/* Ambient Warm Golden Glow Halo */}
          <div
            className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-1000 ${
              activeScene.id >= 4 ? 'opacity-100' : 'opacity-20'
            }`}
          >
            <div className="w-[500px] h-[500px] bg-gradient-to-r from-amber-500/35 via-yellow-400/40 to-amber-600/30 rounded-full blur-[90px] animate-pulse" />
          </div>

          {/* Central Artwork & Visual Staging */}
          <div className="relative z-10 flex flex-col items-center max-w-lg p-6 text-center">
            
            {/* Visual Representation by Scene */}
            {activeScene.id === 1 && (
              <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                <div className="p-3.5 rounded-2xl bg-white/[0.06] border border-white/20 backdrop-blur-md flex flex-col items-center">
                  <div className="w-16 h-18 rounded-lg bg-white/20 border border-white/40 mb-2 flex items-center justify-center shadow-inner">
                    <span className="text-[10px] font-mono font-bold text-white uppercase">cast acrylic</span>
                  </div>
                  <span className="text-xs font-serif font-bold text-white">Virgin Acrylic</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.08] border border-[#EAB308] backdrop-blur-md flex flex-col items-center scale-105 shadow-xl">
                  <div className="w-16 h-18 rounded-lg overflow-hidden border border-[#EAB308] mb-2 shadow">
                    <img
                      src="/images/mockups/lord-ganesha-vighnaharta-divine-led-backlit-acrylic-art/primary-square.jpg"
                      alt="Ganesha"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-serif font-bold text-[#FFE8A3]">Lord Ganesha</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.06] border border-amber-400/40 backdrop-blur-md flex flex-col items-center">
                  <div className="w-16 h-18 rounded-lg bg-amber-500/20 border border-amber-400/60 mb-2 flex items-center justify-center">
                    <span className="text-lg">✨</span>
                  </div>
                  <span className="text-xs font-serif font-bold text-amber-200">gold foil Foil</span>
                </div>
              </div>
            )}

            {activeScene.id === 2 && (
              <div className="relative w-80 h-56 rounded-2xl border-4 border-white/60 bg-white/5 backdrop-blur-md flex flex-col items-center justify-center p-4 shadow-2xl">
                <div className="absolute left-0 inset-y-0 w-1 bg-cyan-400 shadow-[0_0_20px_#22d3ee] animate-pulse" />
                <Gem className="w-10 h-10 text-cyan-300 animate-spin mb-2" />
                <h4 className="text-sm font-serif font-bold text-white uppercase tracking-wider">
                  precision CNC Edge Beveling
                </h4>
                <p className="text-xs text-cyan-200 mt-1">45° Chamfered Facets • 99.2% Crystalline Purity</p>
              </div>
            )}

            {activeScene.id === 3 && (
              <div className="relative w-64 h-72 rounded-2xl border-2 border-[#EAB308] overflow-hidden shadow-2xl bg-black flex items-center justify-center">
                <img
                  src="/images/mockups/lord-ganesha-vighnaharta-divine-led-backlit-acrylic-art/primary-square.jpg"
                  alt="Ganesha Print"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 bg-purple-900/90 border-y border-purple-400 flex items-center justify-between px-3">
                  <span className="text-[10px] font-mono text-purple-200 font-bold">1200 DPI UV Flatbed</span>
                  <span className="text-[10px] font-mono text-purple-300 font-bold">395nm Curing</span>
                </div>
              </div>
            )}

            {activeScene.id === 4 && (
              <div className="relative w-60 h-64 flex items-center justify-center" style={{ perspective: '900px' }}>
                <div
                  className="relative w-full h-full transition-all duration-700"
                  style={{ transformStyle: 'preserve-3d', transform: 'rotateX(18deg) rotateY(-20deg)' }}
                >
                  <div
                    className="absolute inset-0 rounded-xl border border-stone-700 bg-stone-900 flex items-center justify-center shadow-lg"
                    style={{ transform: 'translateZ(-60px)' }}
                  >
                    <span className="text-[10px] font-mono text-stone-400 uppercase font-bold">5. Moisture Backer</span>
                  </div>
                  <div
                    className="absolute inset-0 rounded-xl border-2 border-amber-400 bg-amber-500/20 shadow-lg flex items-center justify-center"
                    style={{ transform: 'translateZ(-25px)' }}
                  >
                    <span className="text-[10px] font-mono text-amber-300 uppercase font-bold">4. LED LED</span>
                  </div>
                  <div
                    className="absolute inset-0 rounded-xl border-2 border-[#EAB308] overflow-hidden shadow-xl"
                    style={{ transform: 'translateZ(10px)' }}
                  >
                    <img
                      src="/images/mockups/lord-ganesha-vighnaharta-divine-led-backlit-acrylic-art/primary-square.jpg"
                      alt="Ganesha"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className="absolute inset-0 rounded-xl border-2 border-[#FFE8A3] bg-amber-300/10 flex items-center justify-center"
                    style={{ transform: 'translateZ(45px)' }}
                  >
                    <span className="text-[10px] font-serif italic text-[#FFE8A3] font-bold">2. gold foil Leaf</span>
                  </div>
                  <div
                    className="absolute inset-0 rounded-xl border-2 border-white/60 bg-white/10 backdrop-blur-xs flex items-center justify-center"
                    style={{ transform: 'translateZ(80px)' }}
                  >
                    <span className="text-[10px] font-mono text-white uppercase font-bold">1. acrylic panel</span>
                  </div>
                </div>
              </div>
            )}

            {activeScene.id === 5 && (
              <div className="relative w-64 h-72 rounded-2xl border-2 border-[#EAB308] overflow-hidden shadow-2xl bg-black flex items-center justify-center">
                <img
                  src="/images/mockups/lord-ganesha-vighnaharta-divine-led-backlit-acrylic-art/primary-square.jpg"
                  alt="QC"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-emerald-950/90 text-emerald-300 border border-emerald-500 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                  ✓ QC CERTIFIED
                </div>
                <div className="absolute bottom-3 inset-x-3 bg-black/80 rounded-lg p-2 text-left">
                  <span className="text-[10px] text-amber-300 font-bold block">Hyderabad Guild Master Audit:</span>
                  <span className="text-[9px] text-stone-300 block">Dust-Free • Zero-Defect • high-efficiency LED tested</span>
                </div>
              </div>
            )}

            {activeScene.id === 6 && (
              <div className="relative flex flex-col items-center">
                <div className="relative w-64 sm:w-72 aspect-square rounded-2xl border-[12px] border-[#EAB308] shadow-[0_20px_60px_rgba(198,154,66,0.6)] overflow-hidden bg-black ring-1 ring-[#946F25]">
                  <img
                    src="/images/mockups/lord-ganesha-vighnaharta-divine-led-backlit-acrylic-art/primary-square.jpg"
                    alt="Final Reveal"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 border-2 border-amber-300/40 pointer-events-none" />
                </div>
                <div className="w-80 h-5 bg-gradient-to-r from-[#F4EBD9] via-[#181818] to-[#121212] rounded-t-md shadow-lg border-t border-amber-200 mt-1 flex items-center justify-around px-4">
                  <span className="text-xs">🪔</span>
                  <span className="text-[10px] font-serif font-bold text-amber-950">Italian Statuario Marble Altar</span>
                  <span className="text-xs">🪔</span>
                </div>
              </div>
            )}
          </div>

          {/* Subtitles Overlay */}
          <div className="absolute bottom-14 inset-x-6 flex justify-center pointer-events-none z-20">
            <div className="bg-black/85 backdrop-blur-md border border-[#EAB308]/50 px-5 py-2 rounded-xl max-w-2xl text-center shadow-2xl">
              <p className="text-xs sm:text-sm text-[#FFFFFF] font-medium leading-relaxed">
                {activeScene.voiceover}
              </p>
            </div>
          </div>

          {/* Scrubber & Controls */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/90 to-transparent p-3 sm:p-4 z-30 flex flex-col gap-2">
            <div className="relative w-full h-1.5 bg-stone-800 rounded-full cursor-pointer">
              <div
                className="h-full bg-gradient-to-r from-[#EAB308] via-[#FACC15] to-[#FFE8A3] rounded-full transition-all duration-300"
                style={{ width: `${(currentTimeSec / 40) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-[#EAB308] hover:bg-[#FACC15] text-[#000000] px-3 py-1.5 rounded-full border border-[#EAB308] text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentTimeSec(0);
                    setActiveSceneIndex(0);
                    setIsPlaying(true);
                  }}
                  className="text-stone-300 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Replay</span>
                </button>

                <span className="text-xs font-mono text-stone-300">
                  {`00:${currentTimeSec.toString().padStart(2, '0')}`} / <span className="text-[#FACC15]">00:40</span>
                </span>
              </div>

              {/* Scene Pills */}
              <div className="hidden sm:flex items-center gap-1">
                {FILM_SCENES.map((scene, i) => (
                  <button
                    key={scene.id}
                    onClick={() => {
                      setActiveSceneIndex(i);
                      setCurrentTimeSec(
                        i === 0 ? 0 : i === 1 ? 5 : i === 2 ? 10 : i === 3 ? 16 : i === 4 ? 25 : 32
                      );
                    }}
                    className={`text-[11px] px-2.5 py-1 rounded-md font-bold transition cursor-pointer ${
                      activeSceneIndex === i
                        ? 'bg-[#EAB308] text-black'
                        : 'bg-white/5 text-stone-400 hover:text-white'
                    }`}
                  >
                    Scene {scene.id}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scene Specs & Direct Order Callout */}
        <div className="p-4 sm:p-5 bg-[#14060C] border-t border-[#EAB308]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold uppercase text-[#FACC15]">
              {activeScene.badge}
            </span>
            <h4 className="font-serif font-bold text-sm text-[#FFFFFF]">
              {activeScene.title}
            </h4>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {activeScene.specs.map((sp, idx) => (
                <span
                  key={idx}
                  className="text-[10px] bg-black/60 border border-[#EAB308]/40 text-[#FFE8A3] px-2 py-0.5 rounded"
                >
                  {sp.label}: <strong>{sp.value}</strong>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="/product/lord-ganesha-vighnaharta-divine-led-backlit-acrylic-art"
              className="flex-1 sm:flex-initial bg-gradient-to-r from-[#EAB308] via-[#FACC15] to-[#EAB308] hover:brightness-110 text-[#000000] font-bold text-xs py-2.5 px-4 rounded-full shadow-md flex items-center justify-center gap-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Order Ganesha Frame</span>
            </a>

            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#1EBE5D] text-white p-2.5 rounded-full text-xs font-bold shadow-md transition"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
