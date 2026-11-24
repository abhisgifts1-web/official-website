'use client';

import React from 'react';
import { MessageCircle, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

export default function ContactCtaSection() {
  const cleanWaNumber = (INITIAL_SETTINGS.whatsappNumber || '917780269927').replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
    "Hello Abhi's Gifts, I have a question regarding custom photo frame sizes and orders."
  )}`;

  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12">
      <div className="bg-stone-50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 border border-stone-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Info & Headline */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-800">
              Direct Hyderabad Store
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-900 tracking-tight leading-tight">
              Need Help or a Custom Frame Size?
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-lg font-sans leading-relaxed">
              Have specific wall dimensions, need a design proof, or want to order directly via chat? Connect with our Hyderabad artisans today.
            </p>

            {/* Quick Contact Details */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                <a
                  href="https://maps.app.goo.gl/fmGv35KsGabFna9E6?g_st=ac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-800 underline underline-offset-2 transition-colors"
                >
                  Moosarambagh, Dilsukhnagar, Hyderabad – 500036
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Mon – Sun: 10:00 AM – 8:00 PM</span>
              </div>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#FEE815] hover:bg-[#FFF04B] text-black font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-black text-black" />
              <span>Enquire in WhatsApp for Custom Order</span>
            </a>

            <a
              href={`tel:${INITIAL_SETTINGS.supportPhone || '+917780269927'}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-stone-50 text-stone-900 font-semibold text-xs sm:text-sm border border-stone-300 shadow-2xs transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-700" />
              <span>Call {INITIAL_SETTINGS.supportPhone || '+91 77802 69927'}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
