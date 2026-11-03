'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Truck,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

const SUPPORT_FAQS = [
  {
    q: 'Can I get a preview proof of my custom photo frame before printing?',
    a: 'Yes, absolutely! For every custom photo frame or engraved keepsake, our senior graphic designers create a 1:1 high-resolution digital mock-up and share it with you directly on WhatsApp for your review and approval before laser cutting.',
  },
  {
    q: 'Do you deliver across Hyderabad and other parts of India?',
    a: 'Yes! We provide Free Express Shipping across all of India on orders above ₹1,999. In Hyderabad & Dilsukhnagar, we dispatch within 24–48 hours. Across other states, delivery takes 3 to 5 business days via BlueDart, Delhivery, and DTDC Express.',
  },
  {
    q: 'What happens if my acrylic photo frame arrives damaged?',
    a: 'We offer a 100% Transit Safe Replacement Guarantee. Every frame is packaged in protective film, high-density bubble wrap, corner armor, and wooden crates. In the rare event of transit damage, share an unboxing video on WhatsApp within 48 hours for an instant, free replacement.',
  },
  {
    q: 'What power supply is required for LED Backlit photo frames?',
    a: 'Our LED Backlit frames come complete with a certified 12V 2A power adapter and a 2-meter concealed cord. It connects directly to any standard domestic 220V wall socket and consumes minimal power while remaining completely cool to touch.',
  },
  {
    q: 'Can I visit your physical studio in Hyderabad?',
    a: "Yes, you are warmly invited! Our studio is located at Dilsukhnagar, Hyderabad, Telangana – 500036. You can explore our gallery of physical 4mm cast acrylic samples, warm backlit LED setups, rotating lamps, and glitter frames in person.",
  },
];

export default function ContactSupportSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const cleanNumber = (INITIAL_SETTINGS.whatsappNumber || '919032372782').replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    "Hello Abhi's Gifts, I need assistance regarding your custom acrylic photo frames and orders."
  )}`;

  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-[#511B2A] bg-white border border-[#D6AA55] px-3.5 py-1 rounded-full shadow-2xs mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-[#D6AA55]" />
          <span>Dedicated Customer Support</span>
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#511B2A] tracking-tight">
          WE ARE HERE TO HELP YOU
        </h2>
        <p className="text-xs sm:text-sm text-[#533C36] mt-2 font-sans leading-relaxed">
          Have a question about frame sizing, LED lighting, or an ongoing order? Our Hyderabad team is available 7 days a week.
        </p>
      </div>

      {/* 4 Pillars of Contact Support */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
        {/* 1. Direct WhatsApp */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8D5BD] shadow-2xs hover:border-[#25D366] transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
              <MessageCircle className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#511B2A]">WhatsApp Priority Support</h3>
              <p className="text-xs text-[#533C36] mt-1 font-sans">
                Fastest response for design proofs, price estimates, and custom sizing.
              </p>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-[#E8D5BD]/60">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 w-full bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-bold py-2.5 rounded-full transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* 2. Direct Phone Call */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8D5BD] shadow-2xs hover:border-[#D6AA55] transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF7EC] text-[#511B2A] border border-[#D6AA55] flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#511B2A]">Phone Assistance</h3>
              <p className="text-xs text-[#533C36] mt-1 font-sans">
                Speak directly with our frame specialists for corporate or bulk gifting.
              </p>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-[#E8D5BD]/60">
            <a
              href={`tel:${INITIAL_SETTINGS.supportPhone.replace(/\s+/g, '')}`}
              className="inline-flex items-center justify-center gap-1.5 w-full bg-[#511B2A] hover:bg-[#3D1420] text-[#FFF7EC] text-xs font-bold py-2.5 rounded-full transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D6AA55]" />
              <span>{INITIAL_SETTINGS.supportPhone}</span>
            </a>
          </div>
        </div>

        {/* 3. Studio Location */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8D5BD] shadow-2xs hover:border-[#D6AA55] transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF7EC] text-[#511B2A] border border-[#D6AA55] flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#511B2A]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#511B2A]">Hyderabad Studio</h3>
              <p className="text-xs text-[#533C36] mt-1 font-sans leading-relaxed">
                {INITIAL_SETTINGS.businessAddress}
              </p>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-[#E8D5BD]/60">
            <span className="text-[11px] font-semibold text-[#8C7A70] flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#D6AA55]" /> Mon–Sat 9:30 AM–8:30 PM
            </span>
          </div>
        </div>

        {/* 4. Order Tracking & Email */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8D5BD] shadow-2xs hover:border-[#D6AA55] transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF7EC] text-[#511B2A] border border-[#D6AA55] flex items-center justify-center">
              <Truck className="w-5 h-5 text-[#511B2A]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#511B2A]">Track Existing Order</h3>
              <p className="text-xs text-[#533C36] mt-1 font-sans">
                Real-time tracking of production, laser cutting, and courier transit.
              </p>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-[#E8D5BD]/60">
            <Link
              href="/track-order"
              className="inline-flex items-center justify-center gap-1.5 w-full bg-[#FFF7EC] hover:bg-[#511B2A] text-[#511B2A] hover:text-[#FFF7EC] border border-[#D6AA55] text-xs font-bold py-2.5 rounded-full transition-colors"
            >
              <Truck className="w-3.5 h-3.5 text-[#D6AA55]" />
              <span>Track Your Order →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Accordion FAQs */}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-[#E8D5BD] shadow-xs">
        <div className="flex items-center gap-2 mb-6 pb-3 border-b border-[#E8D5BD]">
          <HelpCircle className="w-5 h-5 text-[#D6AA55]" />
          <h3 className="font-serif font-bold text-lg text-[#511B2A]">
            Quick Support Answers &amp; Store Policies
          </h3>
        </div>

        <div className="space-y-3">
          {SUPPORT_FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="border border-[#E8D5BD]/80 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-left font-serif font-semibold text-xs sm:text-sm text-[#511B2A] hover:bg-[#FFF7EC]/50 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#D6AA55] shrink-0 transition-transform duration-200 ${
                    openFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openFaq === idx && (
                <div className="p-4 pt-1 text-xs text-[#533C36] font-sans leading-relaxed border-t border-[#E8D5BD]/40 bg-[#FFFBF5]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
