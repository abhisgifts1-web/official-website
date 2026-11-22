'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight, MessageCircle, ShieldCheck, Zap, Truck, CheckCircle2 } from 'lucide-react';
import { INITIAL_SETTINGS, DEFAULT_PROMOTIONAL_OFFER } from '@/lib/data/settings';
import { SiteSettings, PromotionalOfferSettings } from '@/types';

export default function PromotionalBanner() {
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.settings) {
          setSettings(d.settings);
        }
      })
      .catch(() => {});
  }, []);

  const offer: PromotionalOfferSettings = settings.promotionalOffer || DEFAULT_PROMOTIONAL_OFFER;

  // If the admin has not given/enabled an offer, do not display this section on the homepage
  if (!offer.isActive) {
    return null;
  }

  const cleanWaNumber = (settings.whatsappNumber || '919032372782').replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
    offer.whatsappMessage ||
      `Hello Abhi's Gifts, I saw the ${offer.discountBadge} offer on your website and would like to place an order!`
  )}`;

  const features = offer.features && offer.features.length > 0
    ? offer.features
    : ['Free WhatsApp Proof', '5MM Crystal Acrylic', '24-48h Dispatch', 'Zero-Breakage Transit'];

  return (
    <section id="promotional-banner" className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 lg:py-10">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 text-white p-6 sm:p-10 lg:p-14 border border-stone-800 shadow-xl">
        {/* Ambient Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#FEE815]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Promotional Messaging & Offer */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-[#FEE815] bg-amber-400/10 border border-amber-400/30 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FEE815]" />
              <span>{offer.tag || 'Direct Hyderabad Workshop Special'}</span>
            </div>

            <h2 className="font-serif font-bold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              {offer.title.includes(offer.highlightedText) ? (
                <>
                  {offer.title.split(offer.highlightedText)[0]}
                  <span className="text-[#FEE815] underline decoration-amber-400 decoration-wavy underline-offset-6">
                    {offer.highlightedText}
                  </span>
                  {offer.title.split(offer.highlightedText)[1]}
                </>
              ) : (
                offer.title
              )}
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 max-w-xl font-sans leading-relaxed">
              {offer.description}
            </p>

            {/* Value Highlights Pill Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-xs text-stone-300">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-1.5 bg-white/5 backdrop-blur-md rounded-xl p-2.5 border border-white/10">
                  {idx === 0 && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  {idx === 1 && <Zap className="w-4 h-4 text-[#FEE815] shrink-0" />}
                  {idx === 2 && <Truck className="w-4 h-4 text-sky-400 shrink-0" />}
                  {idx >= 3 && <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />}
                  <span className="text-[11px] font-medium truncate">{feat}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Link
                href={offer.buttonLink || '/shop'}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#FEE815] hover:bg-[#FFF04B] text-black font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95"
              >
                <span>{offer.buttonText || 'Shop All Offers Now'}</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </Link>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 backdrop-blur-md transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>{offer.whatsappCtaText || 'Claim Offer on WhatsApp'}</span>
              </a>
            </div>
          </div>

          {/* Right: Featured Visual Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-4/3 rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-2xl group">
              <Image
                src={offer.imageUrl || '/images/mockups/custom-led-backlit-acrylic-photo-frame/primary-square.jpg'}
                alt={offer.productTitle || 'Promotional Offer Frame'}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#FEE815] text-stone-950 font-bold text-xs shadow-md">
                {offer.discountBadge || '50% OFF'}
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-left">
                <p className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider">
                  {offer.productCategory || 'Signature LED Series'}
                </p>
                <p className="text-sm sm:text-base font-serif font-bold text-white">
                  {offer.productTitle || 'Custom LED Backlit Acrylic Photo Frame'}
                </p>
                <p className="text-xs text-stone-300 mt-0.5">
                  Starting at <strong className="text-[#FEE815]">{offer.price}</strong>{' '}
                  <span className="line-through text-stone-400 text-[11px]">{offer.originalPrice}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
