'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Layers,
  Sparkles,
  ArrowRight,
  Flame,
  Star,
  CheckCircle2,
  ExternalLink,
  Lightbulb,
} from 'lucide-react';

interface RoomScene {
  id: 'living' | 'pooja' | 'bedroom' | 'foyer';
  label: string;
  icon: string;
  title: string;
  subtitle: string;
  artworkName: string;
  artworkSlug: string;
  artworkSize: string;
  artworkPrice: number;
  artworkMrp: number;
  image: string;
  guideTip: string;
  hotspotLabel: string;
}

const ROOMS: RoomScene[] = [
  {
    id: 'living',
    label: 'Living Room',
    icon: '🛋️',
    title: 'Grand Living Room Wall',
    subtitle: 'Tirupati Lord Balaji 3D Acrylic with Golden 3000K LED Halo',
    artworkName: 'Lord Venkateswara Balaji 3D LED Backlit Art',
    artworkSlug: 'lord-venkateswara-balaji',
    artworkSize: '24 x 36 Inches (60 x 90 cm)',
    artworkPrice: 3299,
    artworkMrp: 6499,
    image: '/images/lifestyle/living-room.jpg',
    guideTip: 'Mount 8–10 inches above sofa backrest for balanced sightline.',
    hotspotLabel: 'Tirupati Balaji 48" Backlit Panel',
  },
  {
    id: 'pooja',
    label: 'Pooja Mandir',
    icon: '🪔',
    title: 'Sanctum Pooja Mandir',
    subtitle: 'Divine Tirupati Balaji Acrylic with 24K Gold Leaf & Warm Sanctum Glow',
    artworkName: 'Divine Tirupati Balaji Sacred Sanctum Panel',
    artworkSlug: 'lord-venkateswara-balaji',
    artworkSize: '18 x 24 Inches (45 x 60 cm)',
    artworkPrice: 2499,
    artworkMrp: 4999,
    image: '/images/lifestyle/pooja-mandir.jpg',
    guideTip: 'Pairs with brass diyas and marble mandir backdrops.',
    hotspotLabel: 'Sanctum Mandir 3D Acrylic',
  },
  {
    id: 'bedroom',
    label: 'Master Suite',
    icon: '🛏️',
    title: 'Serene Master Suite',
    subtitle: 'Meditative Adiyogi Lord Shiva with Soothing Warm Halo Night Glow',
    artworkName: 'Adiyogi Lord Shiva Meditative LED Wall Art',
    artworkSlug: 'lord-shiva-shiv-parivar',
    artworkSize: '20 x 30 Inches (50 x 75 cm)',
    artworkPrice: 2899,
    artworkMrp: 5699,
    image: '/images/lifestyle/master-suite.jpg',
    guideTip: 'Equipped with inline dimmer for calming bedtime ambiance.',
    hotspotLabel: 'Adiyogi Shiva Ambient Glow',
  },
  {
    id: 'foyer',
    label: 'Entrance Foyer',
    icon: '🚪',
    title: 'Auspicious Entrance Foyer',
    subtitle: 'Vighnaharta Lord Ganesha in 24K Gold Detailing on Fluted Teak Wall',
    artworkName: 'Vighnaharta Ganesha Auspicious Acrylic Panel',
    artworkSlug: 'lord-ganesha',
    artworkSize: '16 x 24 Inches (40 x 60 cm)',
    artworkPrice: 2199,
    artworkMrp: 4299,
    image: '/images/lifestyle/entrance-foyer.jpg',
    guideTip: 'Brings Vastu positivity and positive energy to home entrances.',
    hotspotLabel: 'Vighnaharta Ganesha 24K Gold',
  },
];

export default function InSituShowcase() {
  const [activeRoom, setActiveRoom] = useState<RoomScene>(ROOMS[0]);
  const [glowActive, setGlowActive] = useState(true);

  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-3 sm:py-5">
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto">
        {/* Compact, Well-Proportioned Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-3.5 sm:mb-4">
          <span className="text-[11px] uppercase tracking-widest font-bold text-[#FFFFFF] bg-[#1E1E1E] border border-[#EAB308]/80 px-3 py-1 rounded-full inline-flex items-center gap-1.5 shadow-2xs">
            <Layers className="w-3.5 h-3.5 text-[#EAB308]" />
            <span>Interior In Situ Inspiration</span>
          </span>
          <h2 className="font-serif font-bold text-xl sm:text-2xl lg:text-3xl text-[#FFFFFF] mt-1.5 tracking-tight">
            Artwork in Realistic Living Spaces
          </h2>
          <p className="text-xs sm:text-sm text-[#D1D5DB] mt-0.5 font-sans leading-relaxed">
            See how our illuminated acrylic pieces anchor living rooms, sanctum pooja mandirs, master suites, and foyers.
          </p>

          {/* Room Tab Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-2.5 sm:mt-3">
            {ROOMS.map((room) => (
              <button
                key={room.id}
                type="button"
                onClick={() => setActiveRoom(room)}
                className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  activeRoom.id === room.id
                    ? 'bg-[#641E2E] text-[#FFFFFF] border border-[#EAB308] shadow-sm scale-102'
                    : 'bg-white hover:bg-[#121212] border border-[#2D2D2D] text-[#FFFFFF] shadow-2xs'
                }`}
              >
                <span>{room.icon}</span>
                <span>{room.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Showcase Stage with Proportional Width and Height */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-[#EAB308]/40 bg-[#121212] w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[2.05/1] max-h-[350px] sm:max-h-[390px] lg:max-h-[415px] group">
          {/* Architectural Room Image */}
          <img
            key={activeRoom.id}
            src={activeRoom.image}
            alt={`${activeRoom.title} — Abhi Gifts In Situ Showcase`}
            className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-[1.02]"
            width={1280}
            height={720}
          />

          {/* Dynamic Warm Ambient Glow Simulation Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#32151D]/25 to-transparent transition-opacity duration-500 pointer-events-none ${
              glowActive ? 'opacity-100' : 'opacity-60'
            }`}
          />

          {/* Top Control Bar: Room Badge & Light Switch */}
          <div className="absolute top-2.5 sm:top-3.5 inset-x-2.5 sm:inset-x-4 flex items-center justify-between z-10">
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-[#121212]/85 backdrop-blur-md text-[#EAB308] px-2.5 sm:px-3 py-1 rounded-full border border-[#EAB308]/40 shadow-xs">
              <span>{activeRoom.icon}</span>
              <span>{activeRoom.title}</span>
            </span>

            <button
              type="button"
              onClick={() => setGlowActive(!glowActive)}
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md border transition-all cursor-pointer ${
                glowActive
                  ? 'bg-[#641E2E]/90 text-[#EAB308] border-[#EAB308]/60 shadow-[0_0_12px_rgba(200,169,107,0.4)]'
                  : 'bg-[#121212]/80 text-[#E5E7EB]/70 border-[#2D2D2D]/30'
              }`}
            >
              <Lightbulb className={`w-3 h-3 ${glowActive ? 'text-[#EAB308] animate-pulse' : 'text-stone-500'}`} />
              <span>LED Halo: <strong>{glowActive ? 'ON' : 'OFF'}</strong></span>
            </button>
          </div>

          {/* Interactive Floating Hotspot Beacon positioned over the wall art */}
          <div className="absolute top-1/4 sm:top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none animate-divine-float">
            <div className="flex items-center gap-1.5 sm:gap-2 bg-[#121212]/90 backdrop-blur-md text-[#EAB308] border border-[#EAB308]/50 px-2.5 sm:px-3 py-1 rounded-full shadow-lg text-[10px] sm:text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#EAB308] shadow-[0_0_8px_#B88A35] animate-ping" />
              <span>{activeRoom.hotspotLabel}</span>
            </div>
          </div>

          {/* Bottom Details Glassmorphic Overlay Bar */}
          <div className="absolute bottom-2.5 sm:bottom-3 inset-x-2.5 sm:inset-x-3.5 z-10">
            <div className="bg-[#121212]/85 backdrop-blur-md border border-[#EAB308]/30 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 sm:py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 text-left">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#EAB308] bg-[#641E2E] border border-[#EAB308]/40 px-2 py-0.5 rounded">
                    Featured Piece
                  </span>
                  <span className="text-[11px] text-[#E5E7EB] font-sans hidden sm:inline">
                    {activeRoom.artworkSize}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-xs sm:text-sm text-[#FFFFFF] leading-snug drop-shadow-sm">
                  {activeRoom.subtitle}
                </h3>
                <p className="text-[11px] text-[#E5E7EB]/90 font-sans hidden md:block">
                  💡 <span className="text-[#EAB308] font-medium">Styling Tip:</span> {activeRoom.guideTip}
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                <div className="text-right hidden xs:block">
                  <span className="text-[9px] text-[#E5E7EB]/70 block uppercase leading-tight">Starting from</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[#FFFFFF] font-serif font-bold text-xs sm:text-sm">
                      ₹{activeRoom.artworkPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[#E5E7EB]/60 text-[11px] line-through">
                      ₹{activeRoom.artworkMrp.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/category/${activeRoom.artworkSlug}`}
                  className="inline-flex items-center gap-1.5 bg-[#641E2E] hover:bg-[#121212] text-[#FFFFFF] border border-[#EAB308]/60 font-semibold text-xs px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-[0_4px_14px_rgba(101,30,45,0.35)] transition-all duration-200 hover:-translate-y-0.5"
                >
                  <span>Shop Artwork</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#EAB308]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
