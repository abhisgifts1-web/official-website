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
import { InstagramIcon, YouTubeIcon } from '@/components/icons/SocialIcons';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

const SUPPORT_FAQS = [
  {
    q: 'Can I get a preview proof of my custom photo frame before printing?',
    a: 'Yes, absolutely! For every custom photo frame or engraved keepsake, our senior graphic designers create a 1:1 high-resolution digital mock-up and share it with you directly on WhatsApp for your review and approval before laser cutting.',
  },
  {
    q: 'Do you deliver across Hyderabad and other parts of India?',
    a: 'Yes! We provide insured Express Shipping across all of India. In Hyderabad & Dilsukhnagar, we dispatch within 24–48 hours. Across other states, delivery takes 3 to 5 business days via BlueDart, Delhivery, and DTDC Express.',
  },
  {
    q: 'What happens if my acrylic photo frame arrives damaged?',
    a: 'Every frame is packaged in protective film, high-density bubble wrap, corner armor, and heavy-duty boxes. In the rare event of any delivery concern, share an unboxing video on WhatsApp within 48 hours for prompt customer support.',
  },
  {
    q: 'What power supply is required for LED Backlit photo frames?',
    a: 'Our LED Backlit frames come complete with a certified 12V 2A power adapter and a 2-meter concealed cord. It connects directly to any standard domestic 220V wall socket and consumes minimal power while remaining completely cool to touch.',
  },
  {
    q: 'Can I visit your physical store in Hyderabad?',
    a: "Yes, you are warmly invited! Our store is located at Dilsukhnagar, Hyderabad, Telangana – 500036. You can explore our gallery of physical cast acrylic samples, warm backlit LED setups, rotating lamps, and glitter frames in person.",
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
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-amber-900 bg-amber-50 border border-amber-300 px-3.5 py-1 rounded-full shadow-2xs mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Dedicated Customer Support</span>
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-900 tracking-tight">
          WE ARE HERE TO HELP YOU
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 font-sans leading-relaxed">
          Have a question about frame sizing, LED lighting, or an ongoing order? Our Hyderabad team is available 7 days a week.
        </p>
      </div>

      {/* 4 Pillars of Contact Support */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
        {/* 1. Direct WhatsApp */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm hover:border-[#25D366] transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
              <MessageCircle className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-stone-900">WhatsApp Priority Support</h3>
              <p className="text-xs text-stone-600 mt-1 font-sans">
                Fastest response for design proofs, price estimates, and custom sizing.
              </p>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-stone-100">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 w-full bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-bold py-2.5 rounded-full transition-colors shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* 2. Direct Phone Call */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm hover:border-[#EAB308] transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-stone-900">Phone Assistance</h3>
              <p className="text-xs text-stone-600 mt-1 font-sans">
                Speak directly with our frame specialists for corporate or bulk gifting.
              </p>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-stone-100">
            <a
              href={`tel:${INITIAL_SETTINGS.supportPhone.replace(/\s+/g, '')}`}
              className="inline-flex items-center justify-center gap-1.5 w-full bg-[#EAB308] hover:bg-[#CA8A04] text-stone-950 text-xs font-bold py-2.5 rounded-full transition-colors shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{INITIAL_SETTINGS.supportPhone}</span>
            </a>
          </div>
        </div>

        {/* 3. Studio Location */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm hover:border-[#EAB308] transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 border border-stone-200 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-stone-700" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-stone-900">Hyderabad Store</h3>
              <p className="text-xs text-stone-600 mt-1 font-sans leading-relaxed">
                {INITIAL_SETTINGS.businessAddress}
              </p>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-stone-100">
            <span className="text-[11px] font-semibold text-stone-500 flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-600" /> Mon–Sat 9:30 AM–8:30 PM
            </span>
          </div>
        </div>

        {/* 4. Custom Photo Frame & Artisan Studio */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm hover:border-[#EAB308] transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-stone-900">Custom Photo Frames</h3>
              <p className="text-xs text-stone-600 mt-1 font-sans">
                Upload your picture for customized acrylic frames with 1:1 WhatsApp proofing.
              </p>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-stone-100">
            <Link
              href="/customise"
              className="inline-flex items-center justify-center gap-1.5 w-full bg-stone-900 hover:bg-stone-800 text-white border border-stone-300 text-xs font-bold py-2.5 rounded-full transition-colors shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Customise Your Frame →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Social Community Channels: Instagram & YouTube */}
      <div className="max-w-3xl mx-auto mb-10 bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 rounded-3xl p-5 sm:p-6 text-white border border-stone-700 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h4 className="font-serif font-bold text-base sm:text-lg text-amber-400">
            Follow Our Official Channels
          </h4>
          <p className="text-xs text-stone-300 mt-0.5">
            Watch real customer unboxing videos, custom frame crafting, and latest promotions.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://www.instagram.com/abhis_gifts_?cplk=MWtkNTJla2s3NTQw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-tr from-[#fd5949] via-[#d6249f] to-[#285AEB] text-white text-xs font-bold shadow-sm hover:scale-105 active:scale-95 transition-all"
          >
            <InstagramIcon className="w-4 h-4 fill-current" />
            <span>Instagram</span>
          </a>

          <a
            href="https://youtube.com/@abhis_gifts?si=Ap98aZU7b21rJA_8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#CC0000] hover:bg-[#FF0000] text-white text-xs font-bold shadow-sm hover:scale-105 active:scale-95 transition-all"
          >
            <YouTubeIcon className="w-4 h-4 fill-current" />
            <span>YouTube</span>
          </a>
        </div>
      </div>

      {/* Accordion FAQs */}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
        <div className="flex items-center gap-2 mb-6 pb-3 border-b border-stone-100">
          <HelpCircle className="w-5 h-5 text-amber-600" />
          <h3 className="font-serif font-bold text-lg text-stone-900">
            Quick Support Answers &amp; Store Policies
          </h3>
        </div>

        <div className="space-y-3">
          {SUPPORT_FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="border border-stone-200 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-left font-serif font-semibold text-xs sm:text-sm text-stone-900 hover:bg-stone-50 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-amber-600 shrink-0 transition-transform duration-200 ${
                    openFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openFaq === idx && (
                <div className="p-4 pt-1 text-xs text-stone-600 font-sans leading-relaxed border-t border-stone-100 bg-stone-50/50">
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
