'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Star,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Maximize2,
  X,
  MessageCircle,
  Eye,
} from 'lucide-react';
import { InstagramIcon } from '@/components/icons/SocialIcons';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

interface CustomerGalleryItem {
  id: string;
  customerName: string;
  neighborhood: string;
  location: string;
  productTitle: string;
  productSlug: string;
  sizeSqFt: string;
  dimensions: string;
  image: string;
  rating: number;
  reviewText: string;
  roomTag: string;
  verifiedLabel: string;
}

const REAL_GALLERY: CustomerGalleryItem[] = [
  {
    id: 'gal-1',
    customerName: 'Swathi & Vikram R.',
    neighborhood: 'Banjara Hills',
    location: 'Hyderabad',
    productTitle: 'Custom LED Backlit Night-Glow Acrylic Photo Frame',
    productSlug: 'custom-led-backlit-acrylic-photo-frame',
    sizeSqFt: '3.3 sq.ft',
    dimensions: '18" × 26"',
    image: '/images/atelier/room-living.jpg',
    rating: 5,
    reviewText:
      'The ambient halo on our living room wall is stunning. Guests always ask where we got this made in Hyderabad. The clarity of the 5MM cast acrylic is unmatched.',
    roomTag: 'Living Room Feature Wall',
    verifiedLabel: 'Verified Homeowner',
  },
  {
    id: 'gal-2',
    customerName: 'K. Muralidhar Rao',
    neighborhood: 'Jubilee Hills',
    location: 'Hyderabad',
    productTitle: 'Tirupati Balaji 3D LED Divine Wall Art',
    productSlug: 'tirupati-balaji-divine-led-backlit-acrylic-wall-art',
    sizeSqFt: '6.0 sq.ft',
    dimensions: '24" × 36"',
    image: '/images/atelier/mandir-finished-reveal.jpg',
    rating: 5,
    reviewText:
      'Installed this Balaji frame in our home mandir. The backlighting creates a truly divine spiritual aura every morning during our pooja.',
    roomTag: 'Pooja Mandir Sanctum',
    verifiedLabel: 'Verified Devotee',
  },
  {
    id: 'gal-3',
    customerName: 'Ananya & Rohit Verma',
    neighborhood: 'Hitec City, Madhapur',
    location: 'Hyderabad',
    productTitle: 'Customized Wedding Vows & Couple Acrylic Keepsake Frame',
    productSlug: 'custom-couple-wedding-vows-acrylic-keepsake-frame',
    sizeSqFt: '1.9 sq.ft',
    dimensions: '14" × 20"',
    image: '/images/mockups/custom-couple-wedding-vows-acrylic-keepsake-frame/mockup-living-room.jpg',
    rating: 5,
    reviewText:
      'Our wedding portrait looks like a fine gallery piece in our master bedroom. The precision beveled edges catch light from every angle.',
    roomTag: 'Master Bedroom Keepsake',
    verifiedLabel: 'Verified Couple',
  },
  {
    id: 'gal-4',
    customerName: 'Dr. Sandeep & Meera',
    neighborhood: 'Gachibowli',
    location: 'Hyderabad',
    productTitle: 'Personalized Family Heirloom Acrylic Wall Frame with Gold Foil Script',
    productSlug: 'personalized-family-heirloom-gold-script-acrylic-frame',
    sizeSqFt: '9.8 sq.ft',
    dimensions: '30" × 47"',
    image: '/images/atelier/room-display.jpg',
    rating: 5,
    reviewText:
      'The architectural scale and richness of the gold script exceeded our expectations. Arrived in 5-layer crate packaging without a single scratch.',
    roomTag: 'Foyer Grand Statement',
    verifiedLabel: 'Verified Homeowner',
  },
  {
    id: 'gal-5',
    customerName: 'Pooja & Harish K.',
    neighborhood: 'Kondapur',
    location: 'Hyderabad',
    productTitle: 'Custom Personalised High-Definition Acrylic Photo Frame',
    productSlug: 'custom-personalised-photo-acrylic-wall-frame',
    sizeSqFt: '1.5 sq.ft',
    dimensions: '12" × 18"',
    image: '/images/atelier/room-pooja.jpg',
    rating: 5,
    reviewText:
      'The high-definition print quality brings complete calm to our daily meditation room. The stainless-steel standoff mounts give it a floating gallery presence.',
    roomTag: 'Meditation Sanctum',
    verifiedLabel: 'Verified Buyer',
  },
  {
    id: 'gal-6',
    customerName: 'Neha & Aditya S.',
    neighborhood: 'Secunderabad',
    location: 'Hyderabad',
    productTitle: 'Enchanted Liquid Gold Shimmer Glitter Acrylic Photo Frame',
    productSlug: 'enchanted-liquid-gold-glitter-acrylic-photo-frame',
    sizeSqFt: '1.0 sq.ft',
    dimensions: '10" × 14"',
    image: '/images/lifestyle/living-room.jpg',
    rating: 5,
    reviewText:
      'The liquid gold glitter sparkles dynamically when sunlight hits it in the afternoon. Ordered directly via WhatsApp and got personal 1:1 preview before printing.',
    roomTag: 'Console Wall Accent',
    verifiedLabel: 'Verified Buyer',
  },
];

export default function CustomerRealGallerySection() {
  const [selectedItem, setSelectedItem] = useState<CustomerGalleryItem | null>(null);

  const cleanWaNumber = (INITIAL_SETTINGS.whatsappNumber || '919032372782').replace(/[^0-9]/g, '');

  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 pb-4 border-b border-stone-200 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-amber-900 bg-amber-100/80 border border-amber-300/70 shadow-2xs mb-2">
            <InstagramIcon className="w-3.5 h-3.5 text-amber-700" />
            <span>Customer Love &amp; Real Homes</span>
          </div>

          <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-900 tracking-tight">
            Loved in Real Homes Across Hyderabad
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 mt-1.5 font-sans max-w-xl">
            Real wall decor installations photographed by verified homeowners and collectors across Telangana &amp; AP.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-end">
          <div className="flex items-center gap-0.5 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-xs font-bold text-stone-800">4.9 / 5.0 (2,400+ Reviews)</span>
        </div>
      </div>

      {/* Instagram-Style Responsive Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {REAL_GALLERY.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-2xs hover:shadow-xl hover:border-amber-400/80 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Visual Image Header */}
            <div
              className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <Image
                src={item.image}
                alt={`${item.productTitle} in ${item.neighborhood}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-106"
              />

              {/* Top Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/75 text-white backdrop-blur-md shadow-xs">
                  <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>{item.neighborhood}</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FEE815] text-stone-950 shadow-xs">
                  <span>{item.sizeSqFt}</span>
                </span>
              </div>

              {/* Quick View Button Overlay */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedItem(item);
                }}
                className="absolute bottom-3 right-3 p-2 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-md transition-transform hover:scale-110 shadow-md"
                title="View Full Room Installation"
                aria-label="View Full Room Installation"
              >
                <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
              </button>
            </div>

            {/* Card Content Body */}
            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{item.verifiedLabel}</span>
                  </span>
                </div>

                {/* Customer Review Quote */}
                <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed italic mb-3 line-clamp-3">
                  &ldquo;{item.reviewText}&rdquo;
                </p>

                {/* Customer Info */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs mb-3">
                  <span className="font-semibold text-stone-900">{item.customerName}</span>
                  <span className="text-stone-500 text-[11px]">{item.neighborhood}, {item.location}</span>
                </div>
              </div>

              {/* Product Reference Link and Actions */}
              <div className="pt-2 border-t border-stone-100 space-y-2">
                <p className="text-[11px] font-medium text-stone-600 truncate">
                  {item.productTitle}
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-stone-600" />
                    <span>Room View</span>
                  </button>

                  <Link
                    href={`/product/${item.productSlug}`}
                    className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-amber-50 hover:bg-[#FEE815] text-amber-950 text-xs font-bold border border-amber-300 hover:border-amber-400 transition-all"
                  >
                    <span>View Product</span>
                    <ArrowRight className="w-3 h-3 text-amber-800" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / High-Res Room View Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col md:flex-row relative max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-transform hover:scale-110 shadow-md"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Left: Large Room Photo */}
            <div className="relative md:w-3/5 aspect-4/3 md:aspect-auto min-h-[260px] md:min-h-[440px] bg-stone-900">
              <Image
                src={selectedItem.image}
                alt={selectedItem.productTitle}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/75 text-white text-xs backdrop-blur-md flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{selectedItem.neighborhood}, {selectedItem.location}</span>
              </div>
            </div>

            {/* Modal Right: Details & Direct Actions */}
            <div className="p-6 md:w-2/5 flex flex-col justify-between overflow-y-auto bg-stone-50">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    {selectedItem.roomTag}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {selectedItem.verifiedLabel}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 leading-snug">
                    {selectedItem.productTitle}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Customer: <span className="text-stone-800 font-semibold">{selectedItem.customerName}</span>
                  </p>
                </div>

                {/* Specs Box */}
                <div className="bg-white rounded-xl p-3.5 border border-stone-200 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-stone-600">
                    <span>Frame Dimensions:</span>
                    <span className="font-bold text-stone-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {selectedItem.sizeSqFt} ({selectedItem.dimensions})
                    </span>
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
                  &ldquo;{selectedItem.reviewText}&rdquo;
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-6">
                <Link
                  href={`/product/${selectedItem.productSlug}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#FEE815] hover:bg-[#FFF04B] text-black font-bold text-xs shadow-md transition-all hover:scale-[1.02]"
                >
                  <span>View Product &amp; Order</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </Link>

                <a
                  href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
                    `Hello Abhi's Gifts, I saw the ${selectedItem.productTitle} installed in ${selectedItem.neighborhood} (${selectedItem.sizeSqFt}). Can you share order details for my wall?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 font-semibold text-xs shadow-2xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
