'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Star,
  MapPin,
  CheckCircle2,
  Sparkles,
  Sun,
  Moon,
  ArrowRight,
  Eye,
  X,
  MessageCircle,
  ShieldCheck,
  Ruler,
  Maximize2,
} from 'lucide-react';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

interface HomeSpotlightItem {
  id: string;
  category: 'living' | 'pooja' | 'wedding' | 'grand';
  customerName: string;
  location: string;
  neighborhood: string;
  productTitle: string;
  productSlug: string;
  sizeSqFt: string;
  dimensionsInches: string;
  frameType: string;
  image: string;
  rating: number;
  quote: string;
  highlightBadge: string;
  verifiedBadge: string;
}

const SPOTLIGHT_ITEMS: HomeSpotlightItem[] = [
  {
    id: 'spotlight-1',
    category: 'living',
    customerName: 'Swathi & Vikram R.',
    location: 'Hyderabad',
    neighborhood: 'Banjara Hills',
    productTitle: 'Custom LED Backlit Night-Glow Acrylic Photo Frame',
    productSlug: 'custom-led-backlit-acrylic-photo-frame',
    sizeSqFt: '3.3 sq.ft',
    dimensionsInches: '18" × 26"',
    frameType: 'Cool White Ambient LED Halo Glow',
    image: '/images/atelier/room-living.jpg',
    rating: 5,
    quote:
      'The ambient halo on our living room wall is simply breathtaking. Guests constantly ask where in Hyderabad we got this made. The clarity of the 5MM cast acrylic is unmatched.',
    highlightBadge: 'Living Room Feature Wall',
    verifiedBadge: 'Verified Homeowner',
  },
  {
    id: 'spotlight-2',
    category: 'pooja',
    customerName: 'K. Muralidhar Rao',
    location: 'Hyderabad',
    neighborhood: 'Jubilee Hills',
    productTitle: 'Tirupati Balaji 3D LED Divine Wall Art',
    productSlug: 'tirupati-balaji-divine-led-backlit-acrylic-wall-art',
    sizeSqFt: '6.0 sq.ft',
    dimensionsInches: '24" × 36"',
    frameType: 'Divine Backlit Sanctum Illumination',
    image: '/images/atelier/mandir-finished-reveal.jpg',
    rating: 5,
    quote:
      'Installed this Balaji masterpiece in our pooja mandir. When the warm backlight turns on at dawn, the spiritual presence and golden detailing feel truly sacred.',
    highlightBadge: 'Pooja Mandir Sanctum',
    verifiedBadge: 'Verified Devotee',
  },
  {
    id: 'spotlight-3',
    category: 'wedding',
    customerName: 'Ananya & Rohit Verma',
    location: 'Hyderabad',
    neighborhood: 'Hitec City, Madhapur',
    productTitle: 'Customized Wedding Vows & Couple Acrylic Keepsake Frame',
    productSlug: 'custom-couple-wedding-vows-acrylic-keepsake-frame',
    sizeSqFt: '1.9 sq.ft',
    dimensionsInches: '14" × 20"',
    frameType: '5MM Beveled Diamond-Cut Acrylic',
    image: '/images/mockups/custom-couple-wedding-vows-acrylic-keepsake-frame/mockup-living-room.jpg',
    rating: 5,
    quote:
      'Our wedding portrait looks like a fine gallery piece in our master bedroom. The precision beveled edges catch light from every angle. Far superior to traditional glass frames.',
    highlightBadge: 'Master Bedroom Keepsake',
    verifiedBadge: 'Verified Couple',
  },
  {
    id: 'spotlight-4',
    category: 'grand',
    customerName: 'Dr. Sandeep & Meera',
    location: 'Hyderabad',
    neighborhood: 'Gachibowli',
    productTitle: 'Personalized Family Heirloom Acrylic Wall Frame with Gold Foil Script',
    productSlug: 'personalized-family-heirloom-gold-script-acrylic-frame',
    sizeSqFt: '9.8 sq.ft',
    dimensionsInches: '30" × 47"',
    frameType: 'Architectural Grand Wall Statement',
    image: '/images/atelier/room-display.jpg',
    rating: 5,
    quote:
      'A true conversation starter in our double-height foyer. The gold script foil under recessed ceiling lights is majestic. Delivered with 5-layer crate packaging without a single scratch.',
    highlightBadge: 'Foyer Architecture Statement',
    verifiedBadge: 'Verified Homeowner',
  },
  {
    id: 'spotlight-5',
    category: 'pooja',
    customerName: 'Pooja & Harish K.',
    location: 'Hyderabad',
    neighborhood: 'Kondapur',
    productTitle: 'Custom Personalised High-Definition Acrylic Photo Frame',
    productSlug: 'custom-personalised-photo-acrylic-wall-frame',
    sizeSqFt: '1.5 sq.ft',
    dimensionsInches: '12" × 18"',
    frameType: '1200 DPI Optical Clarity Shield',
    image: '/images/atelier/room-pooja.jpg',
    rating: 5,
    quote:
      'The optical depth in this acrylic frame brings complete calm to our daily meditation room. The stainless-steel standoff mounts give it a floating gallery presence.',
    highlightBadge: 'Serene Prayer Corner',
    verifiedBadge: 'Verified Buyer',
  },
  {
    id: 'spotlight-6',
    category: 'living',
    customerName: 'Neha & Aditya S.',
    location: 'Hyderabad',
    neighborhood: 'Secunderabad',
    productTitle: 'Enchanted Liquid Gold Shimmer Glitter Acrylic Photo Frame',
    productSlug: 'enchanted-liquid-gold-glitter-acrylic-photo-frame',
    sizeSqFt: '1.0 sq.ft',
    dimensionsInches: '10" × 14"',
    frameType: 'Liquid Gold Floating Shimmer',
    image: '/images/lifestyle/living-room.jpg',
    rating: 5,
    quote:
      'The liquid gold glitter sparkles dynamically when sunlight hits it in the afternoon. Ordered directly via WhatsApp and got personal 1:1 preview before printing.',
    highlightBadge: 'Living Room Console Decor',
    verifiedBadge: 'Verified Buyer',
  },
];

type FilterCategory = 'all' | 'living' | 'pooja' | 'wedding' | 'grand';

export default function RealHomesGallery() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [isNightGlowMode, setIsNightGlowMode] = useState<boolean>(false);
  const [selectedSpotlight, setSelectedSpotlight] = useState<HomeSpotlightItem | null>(null);

  const cleanWaNumber = (INITIAL_SETTINGS.whatsappNumber || '919032372782').replace(/[^0-9]/g, '');

  const filteredItems =
    activeFilter === 'all'
      ? SPOTLIGHT_ITEMS
      : SPOTLIGHT_ITEMS.filter((item) => item.category === activeFilter);

  const getWaInquiryUrl = (item: HomeSpotlightItem) => {
    const text = `Hello Abhi's Gifts, I saw the ${item.productTitle} installed in ${item.neighborhood} (${item.sizeSqFt} - ${item.dimensionsInches}). Could you please share pricing and order details for my wall?`;
    return `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12">
      <div className="bg-gradient-to-b from-stone-50 via-amber-50/20 to-stone-50 rounded-3xl p-6 sm:p-10 lg:p-12 border border-stone-200/90 shadow-xs relative overflow-hidden">
        {/* Ambient Decorative Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-amber-900 bg-amber-100/80 border border-amber-300/70 shadow-2xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>★ 4.9/5 RATED BY 12,000+ HOMES ACROSS HYDERABAD</span>
          </div>

          <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-900 tracking-tight leading-tight">
            Loved in Real Homes Across{' '}
            <span className="text-amber-800 italic underline decoration-amber-300 decoration-wavy underline-offset-4">
              Hyderabad
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 mt-2.5 font-sans leading-relaxed max-w-xl mx-auto">
            From luxury apartments in Jubilee Hills to sacred prayer corners in Gachibowli, see how Abhi&apos;s Gifts handcrafted 5MM crystal acrylic and illuminated frames transform everyday walls into living galleries.
          </p>

          {/* Mode Switcher: Daylight vs Ambient Night Glow */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center p-1 bg-white rounded-full border border-stone-200 shadow-2xs">
              <button
                type="button"
                onClick={() => setIsNightGlowMode(false)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  !isNightGlowMode
                    ? 'bg-amber-100 text-amber-900 font-semibold shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-600" />
                <span>☀️ Natural Daylight</span>
              </button>

              <button
                type="button"
                onClick={() => setIsNightGlowMode(true)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isNightGlowMode
                    ? 'bg-stone-900 text-amber-300 font-semibold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-amber-400" />
                <span>✨ Ambient Night Glow (LED On)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Space Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 relative z-10">
          {[
            { key: 'all', label: `All Spaces (${SPOTLIGHT_ITEMS.length})` },
            { key: 'living', label: 'Living Rooms' },
            { key: 'pooja', label: 'Pooja Mandir Decor' },
            { key: 'wedding', label: 'Weddings & Couples' },
            { key: 'grand', label: 'Grand Statements (3+ sq.ft)' },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveFilter(tab.key as FilterCategory)}
              className={`px-3.5 py-1.5 rounded-full text-xs transition-all duration-200 ${
                activeFilter === tab.key
                  ? 'bg-stone-900 text-white font-semibold shadow-xs scale-105'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200 hover:border-amber-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 relative z-10">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`group bg-white rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 ${
                isNightGlowMode
                  ? 'border-amber-400/60 ring-2 ring-amber-400/20 shadow-[0_4px_25px_rgba(245,158,11,0.12)]'
                  : 'border-stone-200/90 hover:border-amber-300/80 shadow-2xs'
              }`}
            >
              {/* Image Container with Badges */}
              <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden cursor-pointer">
                <Image
                  src={item.image}
                  alt={`${item.productTitle} in ${item.neighborhood} home`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
                    isNightGlowMode ? 'contrast-105 brightness-95' : ''
                  }`}
                  priority={item.id === 'spotlight-1'}
                />

                {/* Subtle Night Glow Halo Overlay when toggled */}
                {isNightGlowMode && (
                  <div className="absolute inset-0 bg-radial from-amber-400/15 via-transparent to-black/35 pointer-events-none" />
                )}

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/75 text-white backdrop-blur-md shadow-xs">
                    <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>{item.neighborhood}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FEE815] text-stone-950 shadow-xs">
                    <Ruler className="w-3 h-3 text-stone-900" />
                    <span>{item.sizeSqFt}</span>
                  </span>
                </div>

                {/* Bottom Frame Type Badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-medium bg-white/90 text-stone-900 backdrop-blur-md border border-white/60 shadow-2xs">
                    {item.highlightBadge}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSpotlight(item);
                    }}
                    className="pointer-events-auto p-1.5 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-md transition-transform hover:scale-110 shadow-xs"
                    title="View Full Room Installation"
                    aria-label="View Full Room Installation"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                <div>
                  {/* Rating & Verified Buyer */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="ml-1 text-xs font-bold text-stone-800">5.0</span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{item.verifiedBadge}</span>
                    </span>
                  </div>

                  {/* Customer Quote */}
                  <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed italic mb-4 line-clamp-3">
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  {/* Customer Meta */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs mb-4">
                    <span className="font-semibold text-stone-900">{item.customerName}</span>
                    <span className="text-stone-500 text-[11px]">{item.neighborhood}, {item.location}</span>
                  </div>
                </div>

                {/* Product Reference Link and Actions */}
                <div className="space-y-2 pt-1">
                  <div className="text-[11px] text-stone-500 flex items-center justify-between">
                    <span className="truncate max-w-[200px] text-stone-600 font-medium">{item.productTitle}</span>
                    <span className="text-amber-800 font-semibold">{item.dimensionsInches}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setSelectedSpotlight(item)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-stone-600" />
                      <span>Room View</span>
                    </button>

                    <Link
                      href={`/product/${item.productSlug}`}
                      className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-amber-50 hover:bg-[#FEE815] text-amber-950 text-xs font-bold border border-amber-300/80 hover:border-amber-400 transition-all"
                    >
                      <span>Shop Frame</span>
                      <ArrowRight className="w-3 h-3 text-amber-800" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust & Verification Banner */}
        <div className="mt-10 sm:mt-12 bg-white rounded-2xl p-5 sm:p-7 border border-stone-200/90 shadow-2xs relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y md:divide-y-0 md:divide-x divide-stone-100">
            <div className="flex items-center gap-3 pt-2 md:pt-0">
              <div className="w-10 h-10 rounded-xl bg-amber-100/70 border border-amber-300 flex items-center justify-center text-amber-800 shrink-0">
                <Sparkles className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <p className="font-serif font-bold text-base sm:text-lg text-stone-900 leading-none">12,000+</p>
                <p className="text-[11px] text-stone-500 mt-1 font-sans">Homes in TS &amp; AP Decorated</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 md:pt-0 md:pl-6">
              <div className="w-10 h-10 rounded-xl bg-amber-100/70 border border-amber-300 flex items-center justify-center text-amber-800 shrink-0">
                <Star className="w-5 h-5 fill-amber-500 text-amber-600" />
              </div>
              <div>
                <p className="font-serif font-bold text-base sm:text-lg text-stone-900 leading-none">4.9 / 5.0</p>
                <p className="text-[11px] text-stone-500 mt-1 font-sans">Over 2,400+ Verified Reviews</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 md:pt-0 md:pl-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/70 border border-emerald-300 flex items-center justify-center text-emerald-800 shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <p className="font-serif font-bold text-base sm:text-lg text-stone-900 leading-none">100% Zero-Damage</p>
                <p className="text-[11px] text-stone-500 mt-1 font-sans">5-Layer Bubble &amp; Wooden Crate</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 md:pt-0 md:pl-6">
              <div className="w-10 h-10 rounded-xl bg-amber-100/70 border border-amber-300 flex items-center justify-center text-amber-800 shrink-0">
                <MessageCircle className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <p className="font-serif font-bold text-base sm:text-lg text-stone-900 leading-none">Free WhatsApp Proof</p>
                <p className="text-[11px] text-stone-500 mt-1 font-sans">1:1 Approval Before Laser Cut</p>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Customer Share Callout */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/90 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
              <MessageCircle className="w-5 h-5 fill-white" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-stone-900">
                Decorated your wall with Abhi&apos;s Gifts?
              </p>
              <p className="text-[11px] sm:text-xs text-stone-600">
                Send us a picture of your wall on WhatsApp to get featured and receive a ₹300 gift coupon for your next piece!
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
              "Hello Abhi's Gifts, I'd like to share a photo of my custom frame mounted on our wall!"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-black text-amber-300 hover:text-amber-200 font-semibold text-xs transition-all shadow-xs shrink-0"
          >
            <span>Share Your Wall Photo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Lightbox / High-Res Room View Modal */}
      {selectedSpotlight && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={() => setSelectedSpotlight(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col md:flex-row relative max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedSpotlight(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-transform hover:scale-110 shadow-md"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Left: Large Room Photo */}
            <div className="relative md:w-3/5 aspect-4/3 md:aspect-auto min-h-[260px] md:min-h-[440px] bg-stone-900">
              <Image
                src={selectedSpotlight.image}
                alt={selectedSpotlight.productTitle}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/75 text-white text-xs backdrop-blur-md flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{selectedSpotlight.neighborhood}, {selectedSpotlight.location}</span>
              </div>
            </div>

            {/* Modal Right: Details & Direct Actions */}
            <div className="p-6 md:w-2/5 flex flex-col justify-between overflow-y-auto bg-stone-50">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    {selectedSpotlight.highlightBadge}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {selectedSpotlight.verifiedBadge}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 leading-snug">
                    {selectedSpotlight.productTitle}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Customer: <span className="text-stone-800 font-semibold">{selectedSpotlight.customerName}</span>
                  </p>
                </div>

                {/* Specs Box */}
                <div className="bg-white rounded-xl p-3.5 border border-stone-200 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-stone-600">
                    <span>Frame Dimensions:</span>
                    <span className="font-bold text-stone-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {selectedSpotlight.sizeSqFt} ({selectedSpotlight.dimensionsInches})
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-stone-600">
                    <span>Finish / Craft:</span>
                    <span className="font-medium text-stone-800">{selectedSpotlight.frameType}</span>
                  </div>
                  <div className="flex justify-between items-center text-stone-600">
                    <span>Customer Rating:</span>
                    <span className="font-bold text-amber-600 flex items-center gap-0.5">
                      ★★★★★ (5.0 / 5)
                    </span>
                  </div>
                </div>

                {/* Review */}
                <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100 text-stone-700 italic text-xs leading-relaxed">
                  &ldquo;{selectedSpotlight.quote}&rdquo;
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-6">
                <Link
                  href={`/product/${selectedSpotlight.productSlug}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#FEE815] hover:bg-[#FFF04B] text-black font-bold text-xs shadow-md transition-all hover:scale-[1.02]"
                >
                  <span>View Product Details &amp; Pricing</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </Link>

                <a
                  href={getWaInquiryUrl(selectedSpotlight)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 font-semibold text-xs shadow-2xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Ask About This Frame on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
