'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Sparkles, HelpCircle, MessageCircle } from 'lucide-react';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

export interface FaqItem {
  id: string;
  category: 'custom' | 'delivery' | 'specs' | 'orders';
  q: string;
  a: string;
}

export const HOMEPAGE_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'custom',
    q: 'How do I customize my acrylic photo frame?',
    a: 'Visit our dedicated Customizer (/customise). You can choose your preferred frame style (Crystal Acrylic, LED Backlit, or Liquid Gold Glitter), select your calibrated size in sq.ft, and upload your photo. Before manufacturing, our Hyderabad design team creates an exact 1:1 digital layout and sends it to your WhatsApp for sign-off.',
  },
  {
    id: 'faq-2',
    category: 'custom',
    q: 'What image formats and resolutions are supported for printing?',
    a: 'We accept JPEG, PNG, WebP, and HEIC files up to 25MB. High-resolution mobile and DSLR photos work best. Our design team applies automated 1200 DPI resolution scaling, color saturation enhancement, and noise reduction to ensure your final acrylic print is razor sharp.',
  },
  {
    id: 'faq-3',
    category: 'specs',
    q: 'What frame sizes are available and what does sq.ft mean?',
    a: 'We calibrate all frames in square feet (sq.ft) for precise wall proportion: 1.0 sq.ft (10" × 14"), 1.5 sq.ft (12" × 18"), 1.9 sq.ft (14" × 20"), 3.3 sq.ft (18" × 26"), 6.0 sq.ft (24" × 36"), and 9.8 sq.ft (30" × 47"). Custom dimensions for specific architectural walls can also be requested via WhatsApp.',
  },
  {
    id: 'faq-4',
    category: 'specs',
    q: 'How does the LED backlighting work and is an adapter included?',
    a: 'Our illuminated frames feature integrated perimeter Cool White LED illumination with an aluminum heatsink. Every LED frame package includes an external 12V 2A power adapter with a standard 2-pin wall plug, plus solid stainless-steel wall standoff studs and wall anchors.',
  },
  {
    id: 'faq-5',
    category: 'delivery',
    q: 'What is the delivery timeline for Hyderabad and other cities?',
    a: 'Orders within Hyderabad and Secunderabad are crafted and dispatched within 24–48 hours. Deliveries across other cities in Telangana, Andhra Pradesh, and pan-India arrive within 3–5 business days via trusted express courier partners (Bluedart, Delhivery, DTDC).',
  },
  {
    id: 'faq-6',
    category: 'orders',
    q: 'What payment methods are supported on the website?',
    a: 'We support all major Indian payment methods through bank-grade 256-bit encrypted checkout, including UPI (Google Pay, PhonePe, Paytm, BHIM), Credit & Debit Cards (Visa, MasterCard, RuPay), NetBanking from 50+ banks, and popular digital wallets.',
  },
  {
    id: 'faq-7',
    category: 'delivery',
    q: 'What happens if my frame is damaged during transit?',
    a: 'We offer a 100% Zero-Breakage Guarantee. In the rare event of transit damage or acrylic defect, simply share a quick unboxing photo or video on our WhatsApp (+91 90323 72782) within 24 hours of delivery. We will fabricate and dispatch a brand-new replacement immediately at zero extra charge.',
  },
  {
    id: 'faq-8',
    category: 'orders',
    q: 'Do you accept corporate gifting and bulk wedding orders?',
    a: 'Yes! We specialize in bulk personalized gifting for corporate milestones, real estate handovers, wedding favors, and temple trusts. Bulk orders receive special direct workshop pricing and custom branded gift box packaging. Reach out directly on WhatsApp for a custom quotation.',
  },
];

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeFilter, setActiveFilter] = useState<'all' | 'custom' | 'specs' | 'delivery' | 'orders'>('all');

  const cleanWaNumber = (INITIAL_SETTINGS.whatsappNumber || '919032372782').replace(/[^0-9]/g, '');

  const filteredFaqs =
    activeFilter === 'all'
      ? HOMEPAGE_FAQS
      : HOMEPAGE_FAQS.filter((f) => f.category === activeFilter);

  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-amber-900 bg-amber-50 border border-amber-300 px-3.5 py-1 rounded-full shadow-2xs mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>Customer Knowledge Base</span>
          </div>

          <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-900 tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 mt-1.5 font-sans">
            Everything you need to know about our Hyderabad workshop fabrication, photo customization, power adapters, and express delivery.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {[
              { key: 'all', label: 'All Questions' },
              { key: 'custom', label: 'Customization & Upload' },
              { key: 'specs', label: 'Sizes & LED Power' },
              { key: 'delivery', label: 'Shipping & Replacement' },
              { key: 'orders', label: 'Payments & Bulk Orders' },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  setActiveFilter(tab.key as any);
                  setOpenFaq(0);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeFilter === tab.key
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-amber-400 ring-1 ring-amber-300/40 shadow-xs'
                    : 'border-stone-200/90 hover:border-amber-300 shadow-2xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50/60 transition-colors"
                >
                  <span className="font-serif font-bold text-sm sm:text-base text-stone-900 leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-700 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-[13px] text-stone-600 leading-relaxed font-sans border-t border-stone-100 bg-stone-50/30">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Help CTA */}
        <div className="mt-8 text-center p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-stone-700 font-medium">
            Have a question not listed here? Our Hyderabad artisans are available on WhatsApp.
          </span>
          <a
            href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
              "Hello Abhi's Gifts, I have a question about custom photo frames."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold transition-all shadow-xs shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
