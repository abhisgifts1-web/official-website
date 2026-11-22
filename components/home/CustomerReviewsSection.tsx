'use client';

import React from 'react';
import Link from 'next/link';
import { Star, CheckCircle2, MessageCircle, Sparkles, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

interface CustomerReviewItem {
  id: string;
  name: string;
  neighborhood: string;
  city: string;
  rating: number;
  date: string;
  productTitle: string;
  productSlug: string;
  review: string;
  verified: boolean;
}

const REVIEWS: CustomerReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Swathi & Vikram R.',
    neighborhood: 'Banjara Hills',
    city: 'Hyderabad',
    rating: 5,
    date: 'Verified Order • 3 days ago',
    productTitle: 'Custom LED Backlit Night-Glow Acrylic Photo Frame',
    productSlug: 'custom-led-backlit-acrylic-photo-frame',
    review:
      'The warm ambient halo on our living room wall is simply breathtaking. Guests constantly ask where in Hyderabad we got this made. The optical clarity of the 5MM virgin cast acrylic is unmatched.',
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'K. Muralidhar Rao',
    neighborhood: 'Jubilee Hills',
    city: 'Hyderabad',
    rating: 5,
    date: 'Verified Order • 1 week ago',
    productTitle: 'Tirupati Balaji 3D LED Divine Wall Art',
    productSlug: 'tirupati-balaji-divine-led-backlit-acrylic-wall-art',
    review:
      'Installed this Balaji masterpiece in our pooja mandir. When the warm backlight turns on at dawn, the spiritual presence and golden detailing feel truly sacred. 10/10 craftsmanship.',
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Ananya & Rohit Verma',
    neighborhood: 'Hitec City, Madhapur',
    city: 'Hyderabad',
    rating: 5,
    date: 'Verified Order • 2 weeks ago',
    productTitle: 'Customized Wedding Vows & Couple Acrylic Keepsake Frame',
    productSlug: 'custom-couple-wedding-vows-acrylic-keepsake-frame',
    review:
      'Our wedding portrait looks like a fine museum piece in our master bedroom. The precision diamond-cut beveled edges catch light from every angle. Far superior to traditional glass frames.',
    verified: true,
  },
  {
    id: 'rev-4',
    name: 'Dr. Sandeep & Meera',
    neighborhood: 'Gachibowli',
    city: 'Hyderabad',
    rating: 5,
    date: 'Verified Order • 2 weeks ago',
    productTitle: 'Personalized Family Heirloom Acrylic Wall Frame with Gold Foil Script',
    productSlug: 'personalized-family-heirloom-gold-script-acrylic-frame',
    review:
      'A true conversation starter in our double-height foyer. The gold script foil under recessed ceiling lights is majestic. Delivered with 5-layer crate packaging without a single scratch.',
    verified: true,
  },
  {
    id: 'rev-5',
    name: 'Pooja & Harish K.',
    neighborhood: 'Kondapur',
    city: 'Hyderabad',
    rating: 5,
    date: 'Verified Order • 3 weeks ago',
    productTitle: 'Custom Personalised High-Definition Acrylic Photo Frame',
    productSlug: 'custom-personalised-photo-acrylic-wall-frame',
    review:
      'The optical depth in this acrylic frame brings complete calm to our daily meditation room. The stainless-steel standoff mounts give it that floating gallery depth on our wall.',
    verified: true,
  },
  {
    id: 'rev-6',
    name: 'Neha & Aditya S.',
    neighborhood: 'Secunderabad',
    city: 'Hyderabad',
    rating: 5,
    date: 'Verified Order • 1 month ago',
    productTitle: 'Enchanted Liquid Gold Shimmer Glitter Acrylic Photo Frame',
    productSlug: 'enchanted-liquid-gold-glitter-acrylic-photo-frame',
    review:
      'The floating liquid gold glitter sparkles dynamically when sunlight hits it in the afternoon. Ordered directly via WhatsApp and received personal 1:1 digital proof before manufacturing.',
    verified: true,
  },
];

export default function CustomerReviewsSection() {
  const cleanWaNumber = (INITIAL_SETTINGS.whatsappNumber || '919032372782').replace(/[^0-9]/g, '');

  return (
    <section id="customer-reviews" className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12">
      <div className="bg-stone-50 rounded-3xl p-6 sm:p-10 lg:p-12 border border-stone-200/90 shadow-2xs">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-amber-900 bg-amber-100/80 border border-amber-300/70 shadow-2xs mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>★ 4.9/5 RATED BY 12,000+ CUSTOMERS</span>
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-900 tracking-tight mt-1">
            Customer Reviews
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 font-sans leading-relaxed">
            Read verified feedback from homeowners, newly married couples, and families across Hyderabad who trust Abhi&apos;s Gifts for handcrafted acrylic masterworks.
          </p>
        </div>

        {/* Rating Overview Summary Strip */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y md:divide-y-0 md:divide-x divide-stone-100">
            <div className="flex items-center gap-3 pt-2 md:pt-0">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                <span className="font-serif font-bold text-xl text-amber-900">4.9</span>
              </div>
              <div>
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">2,400+ Verified Reviews</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 md:pt-0 md:pl-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-sm text-stone-900">100% Verified Buyers</p>
                <p className="text-[11px] text-stone-500 mt-0.5">Authentic Hyderabad Orders</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 md:pt-0 md:pl-6">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-sm text-stone-900">Zero Breakage Guarantee</p>
                <p className="text-[11px] text-stone-500 mt-0.5">5-Layer Bubble &amp; Foam Crate</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 md:pt-0 md:pl-6">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-sm text-stone-900">12,000+ Homes</p>
                <p className="text-[11px] text-stone-500 mt-0.5">Across Telangana &amp; AP</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating & Verified Buyer */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="ml-1.5 text-xs font-bold text-stone-800">5.0</span>
                  </div>

                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Verified Buyer</span>
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed italic mb-4">
                  &ldquo;{rev.review}&rdquo;
                </p>
              </div>

              <div>
                {/* Author Info */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-stone-900">{rev.name}</p>
                    <p className="text-stone-500 text-[11px] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-amber-700" />
                      <span>{rev.neighborhood}, {rev.city}</span>
                    </p>
                  </div>
                  <span className="text-[10px] text-stone-400">{rev.date}</span>
                </div>

                {/* Purchased Product Link */}
                <div className="mt-3 pt-2.5 border-t border-dashed border-stone-150">
                  <Link
                    href={`/product/${rev.productSlug}`}
                    className="text-[11px] font-medium text-amber-800 hover:text-amber-950 flex items-center justify-between group"
                  >
                    <span className="truncate max-w-[230px]">{rev.productTitle}</span>
                    <ArrowRight className="w-3 h-3 text-amber-600 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Photo Share Banner */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
              <MessageCircle className="w-5 h-5 fill-white" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-stone-900">
                Share your wall photo &amp; get ₹300 OFF!
              </p>
              <p className="text-[11px] sm:text-xs text-stone-600">
                Send us a picture of your Abhi&apos;s Gifts frame on WhatsApp to get featured and receive a ₹300 coupon for your next piece.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
              "Hello Abhi's Gifts, I'd like to share a review and photo of my custom frame!"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-black text-amber-300 hover:text-amber-200 font-semibold text-xs transition-all shadow-xs shrink-0"
          >
            <span>Share Your Review</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
