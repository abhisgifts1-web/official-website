'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  ChevronRight,
  Sparkles,
  Layers,
  Flame,
  ArrowRight,
  Sliders,
  CheckCircle2,
  X,
  Move3d,
} from 'lucide-react';

export interface CraftingLayer {
  index: string;
  name: string;
  tagline: string;
  description: string;
  startTime: number;
  icon: string;
}

export const CRAFTING_LAYERS: CraftingLayer[] = [
  {
    index: '01/05',
    name: 'White Backing Board',
    tagline: 'STRONG SUPPORT • DURABLE • WARP RESISTANT',
    description: '3mm warp-resistant composite panel with high-reflectance white core. Directs 98% of LED light forward for uniform illumination.',
    startTime: 5.9,
    icon: '🛡️',
  },
  {
    index: '02/05',
    name: 'Backlight Board',
    tagline: 'EVEN LIGHT DISTRIBUTION • ENHANCED VISUALS',
    description: 'warm golden Epistar LED matrix paired with an optical Light Guide Panel (LGP) to eliminate hotspots and harsh glare.',
    startTime: 8.0,
    icon: '💡',
  },
  {
    index: '03/05',
    name: 'HD UV Print',
    tagline: 'VIBRANT COLOURS • FADE RESISTANT • FINE DETAILS',
    description: 'Swiss 6-color curable UV inks printed at 2400 DPI with gold foil embellishments. Non-fading for long-lasting vibrancy.',
    startTime: 10.1,
    icon: '🎨',
  },
  {
    index: '04/05',
    name: '3MM Crystal Acrylic',
    tagline: 'HIGH GLOSS • SCRATCH RESISTANT • ULTRA HD CLARITY',
    description: 'Museum-grade optical cast acrylic with precision-polished beveled edges. 100% shatterproof safe alternative to heavy glass.',
    startTime: 11.6,
    icon: '💎',
  },
  {
    index: '05/05',
    name: 'Premium Aluminium Frame',
    tagline: 'REFINED METAL TEXTURE • MODERN ELEGANCE',
    description: 'Aerospace-grade anodized aluminium profile with brushed gold chamfered finish and concealed heavy-duty wall mounts.',
    startTime: 13.1,
    icon: '👑',
  },
];

export default function HeroExplodedLayersShowcase() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Video State
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const duration = 22.0;
  const [activeLayerIndex, setActiveLayerIndex] = useState<number | null>(null);
  const [isHeroPhase, setIsHeroPhase] = useState(true);

  // 3D Orbit Studio Modal state
  const [show3DModal, setShow3DModal] = useState(false);
  const [explosionDistance, setExplosionDistance] = useState(48);
  const [rotateX, setRotateX] = useState(12);
  const [rotateY, setRotateY] = useState(-24);
  const [isLedOn, setIsLedOn] = useState(true);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });

  // Handle Video Time Update
  const handleTimeUpdate = useCallback(() => {
    if (!videoRef.current) return;
    const time = videoRef.current.currentTime;
    setCurrentTime(time);

    // Phase detection
    const inBreakdown = time >= 5.8 && time <= 14.8;
    setIsHeroPhase(!inBreakdown);

    if (inBreakdown) {
      if (time >= 5.8 && time < 8.0) setActiveLayerIndex(0);
      else if (time >= 8.0 && time < 10.1) setActiveLayerIndex(1);
      else if (time >= 10.1 && time < 11.6) setActiveLayerIndex(2);
      else if (time >= 11.6 && time < 13.1) setActiveLayerIndex(3);
      else if (time >= 13.1 && time <= 14.8) setActiveLayerIndex(4);
      else setActiveLayerIndex(null);
    } else {
      setActiveLayerIndex(null);
    }
  }, []);

  // Jump to specific layer timestamp
  const seekToLayer = (layerIdx: number) => {
    if (!videoRef.current) return;
    const target = CRAFTING_LAYERS[layerIdx];
    if (target) {
      videoRef.current.currentTime = target.startTime;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
      setActiveLayerIndex(layerIdx);
    }
  };

  // Skip animation to assembled temple room view (16.5s)
  const handleSkip = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 16.5;
    videoRef.current.play().catch(() => {});
    setIsPlaying(true);
  };

  // Replay breakdown from 5.8s
  const handleReplayBreakdown = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 5.8;
    videoRef.current.play().catch(() => {});
    setIsPlaying(true);
  };

  // Toggle Play / Pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Toggle Mute / Unmute
  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Autoplay on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  // 3D drag handlers for modal
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY, rotX: rotateX, rotY: rotateY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setRotateY(Math.max(-55, Math.min(55, dragStartRef.current.rotY + dx * 0.4)));
    setRotateX(Math.max(-35, Math.min(35, dragStartRef.current.rotX - dy * 0.3)));
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#0A0704] text-white pt-2 sm:pt-4 pb-8 sm:pb-12 border-b border-amber-900/30">
      {/* Warm Ambient Golden Lighting Halo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1600px] h-[600px] bg-gradient-to-b from-amber-500/15 via-amber-700/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-10 xl:px-14">
        {/* Top Feature Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-amber-500/15 border border-amber-400/40 px-3.5 py-1 rounded-full text-xs font-semibold text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>ABHI&apos;S GIFTS • 5-LAYER CRAFTSMANSHIP SHOWCASE</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-stone-400 bg-stone-900/80 px-2.5 py-1 rounded-full border border-stone-800">
              <CheckCircle2 className="w-3 h-3 text-[#C8A96B]" />
              <span>cast Shatterproof Crystal Acrylic &amp; warm Backlighting</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShow3DModal(true)}
            className="inline-flex items-center gap-1.5 bg-stone-900/90 hover:bg-stone-800 text-amber-300 hover:text-amber-200 border border-amber-500/40 px-3.5 py-1 rounded-full text-xs font-semibold shadow-xs transition-all hover:scale-105 cursor-pointer"
          >
            <Move3d className="w-3.5 h-3.5 text-amber-400" />
            <span>Orbit &amp; Explode in 3D</span>
          </button>
        </div>

        {/* CINEMATIC VIDEO SHOWCASE WRAPPER */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black border border-amber-500/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(245,158,11,0.15)] group">
          {/* Native Widescreen 1858:740 Aspect Ratio Container */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.51/1] max-h-[720px] bg-black flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              src="/videos/hero-crafting-breakdown.mp4"
              playsInline
              autoPlay
              muted={isMuted}
              loop
              preload="auto"
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-cover object-center select-none cursor-pointer"
              onClick={togglePlay}
            />

            {/* Clickable "SKIP >" Overlay Button (Positioned over the video's top-right corner) */}
            <button
              type="button"
              onClick={handleSkip}
              className="absolute top-3 sm:top-5 right-3 sm:right-6 z-20 flex items-center gap-1 bg-stone-950/80 hover:bg-amber-950/90 backdrop-blur-md text-stone-200 hover:text-amber-300 font-semibold text-xs sm:text-sm px-3.5 sm:px-4 py-1.5 rounded-full border border-stone-600/70 hover:border-amber-400/80 transition-all duration-200 hover:scale-105 shadow-md cursor-pointer"
              title="Skip to Assembled Temple Sanctum View"
            >
              <span className="tracking-wider">SKIP</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Clickable "Shop Now" Hotzone (Over the video's left-side Shop Now button during hero phase) */}
            {isHeroPhase && (
              <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-10 z-20 pointer-events-auto">
                <Link
                  href="/product/tirupati-balaji-divine-led-backlit-acrylic-wall-art"
                  className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm px-5 sm:px-7 py-2.5 sm:py-3 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all hover:scale-105"
                >
                  <span>Shop Backlit Balaji</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* SYNCED BOTTOM TIMELINE & SCRUBBER STRIP */}
          <div className="bg-stone-950 border-t border-amber-900/40 p-3 sm:p-4 flex flex-col gap-2.5">
            {/* Real-time playback progress bar */}
            <div
              className="relative w-full h-1.5 bg-stone-900 rounded-full overflow-hidden cursor-pointer"
              onClick={(e) => {
                if (!videoRef.current) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const fraction = Math.max(0, Math.min(1, clickX / rect.width));
                videoRef.current.currentTime = fraction * duration;
              }}
            >
              <div
                className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 transition-all duration-150 rounded-full shadow-[0_0_8px_#f59e0b]"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-300">
              {/* Media Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-amber-300 border border-stone-800 transition-colors cursor-pointer"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={handleReplayBreakdown}
                  className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-amber-300 border border-stone-800 transition-colors cursor-pointer"
                  title="Replay 3D Layer Breakdown"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-amber-300 border border-stone-800 transition-colors cursor-pointer"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 text-stone-400" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
                </button>

                <span className="text-[11px] font-mono text-stone-400 hidden sm:inline ml-1">
                  {Math.floor(currentTime)}s / {Math.floor(duration)}s
                </span>
              </div>

              {/* Clickable 5-Layer Scrubbing Badges */}
              <div className="flex flex-wrap items-center gap-1.5">
                {CRAFTING_LAYERS.map((layer, idx) => {
                  const isActive = activeLayerIndex === idx;
                  return (
                    <button
                      key={layer.index}
                      type="button"
                      onClick={() => seekToLayer(idx)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all duration-200 border cursor-pointer ${
                        isActive
                          ? 'bg-amber-500/25 text-amber-200 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.4)] scale-105'
                          : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200 hover:border-stone-700'
                      }`}
                    >
                      <span className="font-bold">{layer.index}</span> {layer.name.split(' ')[0]}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={handleSkip}
                  className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-stone-900 text-stone-400 border border-stone-800 hover:text-amber-300 hover:border-amber-400 cursor-pointer"
                >
                  ✨ Assembled
                </button>
              </div>

              {/* Action Link */}
              <Link
                href="/category/led-backlit-wall-art"
                className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-amber-300 hover:text-amber-200 transition-colors"
              >
                <span>View All LED Backlit Art</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 5-LAYER CRAFTSMANSHIP SPECIFICATION CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-4 sm:pt-6">
          {CRAFTING_LAYERS.map((layer, index) => {
            const isHighlighted = activeLayerIndex === index;
            return (
              <div
                key={layer.index}
                onClick={() => seekToLayer(index)}
                className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer text-left flex flex-col justify-between ${
                  isHighlighted
                    ? 'bg-gradient-to-b from-amber-950/80 to-stone-950 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.35)] -translate-y-1'
                    : 'bg-stone-900/60 hover:bg-stone-900 border-stone-800 hover:border-amber-500/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">
                      {layer.index}
                    </span>
                    <span className="text-base">{layer.icon}</span>
                  </div>
                  <h4 className="font-serif font-bold text-white text-sm leading-snug">
                    {layer.name}
                  </h4>
                  <p className="text-[11px] text-amber-300/90 font-medium mt-1 leading-tight">
                    {layer.tagline}
                  </p>
                  <p className="text-[11px] text-stone-400 font-sans mt-2 leading-relaxed line-clamp-3">
                    {layer.description}
                  </p>
                </div>

                <div className="pt-2.5 mt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
                  <span className="hover:text-amber-300 transition-colors">Click to inspect</span>
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3D ORBIT & LAYER EXPLOSION STUDIO MODAL */}
      {show3DModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-stone-950 border border-amber-500/40 rounded-3xl p-5 sm:p-8 shadow-2xl flex flex-col items-center">
            {/* Modal Header */}
            <div className="w-full flex items-center justify-between pb-4 border-b border-stone-800">
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C8A96B] animate-pulse" />
                  <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
                    Real-Time 3D Engine
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-white mt-0.5">
                  5-Layer Exploded 3D Inspection
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShow3DModal(false)}
                className="p-2 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 3D Stage */}
            <div
              className="relative w-full h-[340px] sm:h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing my-4 select-none"
              style={{ perspective: '1400px' }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              {/* LED Ambient Corona */}
              <div
                className={`absolute w-72 sm:w-80 h-80 sm:h-96 rounded-3xl blur-3xl transition-opacity duration-500 pointer-events-none ${
                  isLedOn ? 'opacity-80 scale-110' : 'opacity-0'
                }`}
                style={{
                  background: 'radial-gradient(circle, rgba(245, 158, 11, 0.55) 0%, rgba(217, 119, 6, 0.15) 60%, transparent 100%)',
                }}
              />

              {/* 3D Artwork Root */}
              <div
                className="relative w-[230px] sm:w-[270px] h-[320px] sm:h-[380px] transition-transform duration-100 ease-out"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                }}
              >
                {/* 1. White Backing Board */}
                <div
                  className="absolute inset-0 rounded-2xl bg-[#EFECE6] border-2 border-[#D5CEBF] shadow-xl flex items-end p-2.5"
                  style={{ transform: `translateZ(${-2 * explosionDistance}px)` }}
                >
                  <span className="bg-stone-900/80 text-[10px] text-stone-200 px-2 py-0.5 rounded font-mono">
                    01 White Backing Board
                  </span>
                </div>

                {/* 2. Backlight Board */}
                <div
                  className={`absolute inset-0 rounded-2xl border-2 flex items-end p-2.5 transition-all ${
                    isLedOn
                      ? 'bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-500 border-amber-300 shadow-[0_0_35px_rgba(245,158,11,0.8)]'
                      : 'bg-stone-800 border-stone-700'
                  }`}
                  style={{ transform: `translateZ(${-1 * explosionDistance}px)` }}
                >
                  <span className="bg-stone-950/80 text-[10px] text-amber-300 px-2 py-0.5 rounded font-mono">
                    02 Backlight Board (warm)
                  </span>
                </div>

                {/* 3. HD UV Print */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden border border-amber-400/50 shadow-2xl flex items-end p-2.5"
                  style={{ transform: 'translateZ(0px)' }}
                >
                  <img
                    src="/images/hero/lord-balaji-acrylic-led.jpg"
                    alt="Lord Balaji Artwork"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <span className="relative z-10 bg-stone-950/85 text-[10px] text-amber-300 px-2 py-0.5 rounded font-mono">
                    03 HD UV Print (Balaji)
                  </span>
                </div>

                {/* 4. 3MM Crystal Acrylic */}
                <div
                  className="absolute inset-0 rounded-2xl border-2 border-cyan-400/70 bg-white/[0.08] shadow-[0_0_15px_rgba(56,189,248,0.3)] flex items-end p-2.5"
                  style={{ transform: `translateZ(${1 * explosionDistance}px)` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none rounded-2xl" />
                  <span className="relative z-10 bg-stone-950/85 text-[10px] text-cyan-300 px-2 py-0.5 rounded font-mono">
                    04 3MM Crystal Acrylic
                  </span>
                </div>

                {/* 5. Aluminium Frame */}
                <div
                  className="absolute -inset-1 rounded-[1.25rem] border-4 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.5)] flex items-end p-2.5"
                  style={{ transform: `translateZ(${2 * explosionDistance}px)` }}
                >
                  <span className="bg-stone-950/90 text-[10px] text-amber-300 px-2 py-0.5 rounded font-mono">
                    05 Premium Aluminium Frame
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Controls */}
            <div className="w-full bg-stone-900/90 rounded-2xl border border-stone-800 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-1/2 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-300 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-amber-400" />
                    <span>Layer Spacing:</span>
                  </span>
                  <span className="font-mono text-amber-400 font-bold">
                    {explosionDistance === 0 ? 'Fully Assembled (0mm)' : `${explosionDistance}mm Exploded`}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="70"
                  value={explosionDistance}
                  onChange={(e) => setExplosionDistance(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-2 bg-stone-800 rounded-lg"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsLedOn(!isLedOn)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    isLedOn
                      ? 'bg-amber-500/20 text-amber-200 border-amber-400'
                      : 'bg-stone-900 text-stone-400 border-stone-800'
                  }`}
                >
                  LED Halo: {isLedOn ? 'ON' : 'OFF'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRotateX(12);
                    setRotateY(-24);
                    setExplosionDistance(48);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium cursor-pointer"
                >
                  Reset Angle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
