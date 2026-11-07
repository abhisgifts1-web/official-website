'use client';

import React, { useState } from 'react';
import { ChevronDown, Sparkles, HelpCircle } from 'lucide-react';

export interface FaqItem {
  q: string;
  a: string;
}

export const HOMEPAGE_FAQS: FaqItem[] = [
  {
    q: 'What material is used in Abhi Gifts art pieces?',
    a: 'We use premium imported cast acrylic with precision CNC beveled edges. Unlike ordinary glass that poses breakage hazards, our acrylic is shatterproof, UV-resistant, and reproduces vibrant colors with immense optical depth.',
  },
  {
    q: 'How does the LED backlighting work? What is included?',
    a: 'Our LED backlit art arrives fully assembled with energy-efficient warm golden SMD LED diodes pre-fitted behind the acrylic panel. Every piece includes a 12V 2A BIS-certified wall adapter with a 2.5-meter discreet transparent power cable and an inline ON/OFF switch.',
  },
  {
    q: 'How safe is shipping? What if it gets damaged in transit?',
    a: 'Artworks are packaged with scratch-resistant film, corner protective guards, and a rigid multi-layer reinforcement box. If you ever have any concern upon delivery, simply contact our support team on WhatsApp for prompt assistance.',
  },
  {
    q: 'How does custom photo frame ordering and proof approval work?',
    a: 'Visit our dedicated Customizer (/customise). You can upload your high-resolution photo (JPEG, PNG, WebP up to 15MB), preview it on walls, and select your frame style. Before manufacturing, our artisan team shares an exact 1:1 digital proof on WhatsApp for your sign-off.',
  },
  {
    q: 'How does ordering and delivery work?',
    a: 'We offer hassle-free direct WhatsApp ordering as well as online checkout. You can choose your artwork, dimensions, and click Order to connect with our artisan team with your details pre-filled. We provide express delivery with insured safe packaging across India.',
  },
];

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-amber-900 bg-amber-50 border border-amber-300 px-3.5 py-1 rounded-full shadow-2xs mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
          <span>Collector Knowledge Base</span>
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight">
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 font-sans">
          Everything you need to know about our sacred craftsmanship, LED power safety, and reliable delivery.
        </p>
      </div>

      <div className="space-y-3">
        {HOMEPAGE_FAQS.map((faq, i) => {
          const isOpen = openFaq === i;
          return (
            <div
              key={i}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:border-amber-400 transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(isOpen ? null : i)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50/80 transition-colors"
              >
                <span className="font-serif font-bold text-sm sm:text-base text-stone-900">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-amber-600 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-[13px] text-stone-600 leading-relaxed font-sans border-t border-stone-100 bg-stone-50/40">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
