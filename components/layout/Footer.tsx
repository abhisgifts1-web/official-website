'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Sparkles,
  Truck,
  RotateCcw,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
} from 'lucide-react';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const whatsappUrl = `https://wa.me/${INITIAL_SETTINGS.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hi Abhi Gifts! I would like to inquire about custom photo frames and gifts.'
  )}`;

  return (
    <footer className="bg-[#0D0D0E] text-[#E5E7EB] border-t border-[#EAB308]/30 relative overflow-hidden select-none">
      {/* 1. TOP VALUE PROPOSITION STRIP (2 columns on mobile, 4 columns on tablet & desktop) */}
      <div className="border-b border-white/[0.08] bg-black/20 py-4 sm:py-5 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {/* Value 1 */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#EAB308]/15 border border-[#EAB308]/30 flex items-center justify-center text-[#FACC15] shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[11px] sm:text-xs md:text-sm font-semibold text-[#FFFFFF] leading-snug">Secure Packaging</h4>
              <p className="text-[10px] sm:text-[11px] text-[#E5E7EB]/70 leading-tight">Carefully Boxed & Shipped</p>
            </div>
          </div>

          {/* Value 2 */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#EAB308]/15 border border-[#EAB308]/30 flex items-center justify-center text-[#FACC15] shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[11px] sm:text-xs md:text-sm font-semibold text-[#FFFFFF] leading-snug">Premium Acrylic</h4>
              <p className="text-[10px] sm:text-[11px] text-[#E5E7EB]/70 leading-tight">Precision Handcrafted</p>
            </div>
          </div>

          {/* Value 3 */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#EAB308]/15 border border-[#EAB308]/30 flex items-center justify-center text-[#FACC15] shrink-0">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[11px] sm:text-xs md:text-sm font-semibold text-[#FFFFFF] leading-snug">Express Delivery</h4>
              <p className="text-[10px] sm:text-[11px] text-[#E5E7EB]/70 leading-tight">Reliable Courier Tracking</p>
            </div>
          </div>

          {/* Value 4 */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#EAB308]/15 border border-[#EAB308]/30 flex items-center justify-center text-[#FACC15] shrink-0">
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[11px] sm:text-xs md:text-sm font-semibold text-[#FFFFFF] leading-snug">
                Artisan Quality Check
              </h4>
              <p className="text-[10px] sm:text-[11px] text-[#E5E7EB]/70 leading-tight">
                1:1 Proof approval
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER CONTENT (Adaptive Grid for Mobile, Tablet & Desktop) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 lg:py-14">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-4 gap-y-8 sm:gap-8 lg:gap-10">
          {/* Section 1: Brand Info & Contacts (Full width on mobile/tablet, 4 cols on desktop) */}
          <div className="col-span-2 lg:col-span-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6 lg:gap-4">
              <div className="space-y-3">
                <Link href="/" className="inline-block">
                  <Image
                    src="/images/brand/logo-gold.png"
                    alt="Abhi's Gifts"
                    width={190}
                    height={38}
                    className="h-8 sm:h-9 md:h-10 w-auto object-contain brightness-105"
                  />
                </Link>
                <p className="text-xs sm:text-[13px] text-[#E5E7EB]/80 leading-relaxed max-w-sm">
                  Handcrafted personalized acrylic photo frames, warm LED illuminated memories, and luxury wall art. Made with care in Hyderabad.
                </p>
              </div>

              <div className="space-y-2 text-xs text-[#E5E7EB]/85 sm:pt-1">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#EAB308] shrink-0 mt-0.5" />
                  <span className="leading-snug">{INITIAL_SETTINGS.businessAddress}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#EAB308] shrink-0" />
                  <a href={`tel:${INITIAL_SETTINGS.supportPhone}`} className="hover:text-[#FFFFFF] transition-colors truncate">
                    {INITIAL_SETTINGS.supportPhone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#EAB308] shrink-0" />
                  <a href={`mailto:${INITIAL_SETTINGS.supportEmail}`} className="hover:text-[#FFFFFF] transition-colors truncate">
                    {INITIAL_SETTINGS.supportEmail}
                  </a>
                </div>
                <div className="pt-1.5">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/40 hover:bg-emerald-700/50 border border-emerald-500/40 text-emerald-200 text-xs font-medium transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
                    <span>WhatsApp: +91 90323 72782</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Photo Frames & Gifts (1 col on mobile, 1 col on tablet, 3 cols on desktop) */}
          <div className="col-span-1 lg:col-span-3 space-y-2.5 sm:space-y-3">
            <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#FFFFFF] pb-1 border-b border-[#EAB308]/20">
              Photo Frames &amp; Gifts
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px] text-[#E5E7EB]/80 pt-1">
              <li>
                <Link href="/customise" className="hover:text-[#FACC15] transition-colors font-medium text-[#FACC15] block py-0.5">
                  ✨ Customise Frame
                </Link>
              </li>
              <li>
                <Link href="/customise" className="hover:text-[#FACC15] transition-colors block py-0.5">
                  Acrylic Photo Frames
                </Link>
              </li>
              <li>
                <Link href="/category/led-backlit-wall-art" className="hover:text-[#FACC15] transition-colors block py-0.5">
                  LED Backlit Frames
                </Link>
              </li>
              <li>
                <Link href="/category/glitter-photo-frames" className="hover:text-[#FACC15] transition-colors block py-0.5">
                  Glitter Photo Frames
                </Link>
              </li>
              <li>
                <Link href="/category/rotating-photo-lamps" className="hover:text-[#FACC15] transition-colors block py-0.5">
                  360° Rotating Lamps
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-[#FACC15] transition-colors block py-0.5">
                  All Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Sacred & Devotional Wall Art (1 col on mobile, 1 col on tablet, 2 cols on desktop) */}
          <div className="col-span-1 lg:col-span-2 space-y-2.5 sm:space-y-3">
            <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#FFFFFF] pb-1 border-b border-[#EAB308]/20">
              Devotional Art
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px] text-[#E5E7EB]/80 pt-1">
              <li>
                <Link href="/category/lord-venkateswara-balaji" className="hover:text-[#FACC15] transition-colors block py-0.5">
                  Lord Balaji (Venkateswara)
                </Link>
              </li>
              <li>
                <Link href="/category/lord-shiva-shiv-parivar" className="hover:text-[#FACC15] transition-colors block py-0.5">
                  Lord Shiva Adiyogi
                </Link>
              </li>
              <li>
                <Link href="/category/lord-ganesha" className="hover:text-[#FACC15] transition-colors block py-0.5">
                  Lord Ganesha Art
                </Link>
              </li>
              <li>
                <Link href="/category/lord-hanuman" className="hover:text-[#FACC15] transition-colors block py-0.5">
                  Hanuman Chalisa
                </Link>
              </li>
              <li>
                <Link href="/category/radha-krishna" className="hover:text-[#FACC15] transition-colors block py-0.5">
                  Radha Krishna Decor
                </Link>
              </li>
              <li>
                <Link href="/category/abstract-wall-decor" className="hover:text-[#FACC15] transition-colors block py-0.5">
                  Abstract &amp; Vastu Art
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 4: Customer Care & Newsletter (Full width on mobile/tablet, 3 cols on desktop) */}
          <div className="col-span-2 lg:col-span-3 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6 lg:gap-4">
              <div className="space-y-2.5 sm:space-y-3">
                <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#FFFFFF] pb-1 border-b border-[#EAB308]/20">
                  Customer Support
                </h4>
                <ul className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-2 text-xs sm:text-[13px] text-[#E5E7EB]/80 pt-1">
                  <li>
                    <Link href="/track-order" className="hover:text-[#FACC15] transition-colors block py-0.5">
                      Track Your Order
                    </Link>
                  </li>
                  <li>
                    <Link href="/shipping-policy" className="hover:text-[#FACC15] transition-colors block py-0.5">
                      Shipping Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/return-refund-policy" className="hover:text-[#FACC15] transition-colors block py-0.5">
                      Returns &amp; Refunds
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="hover:text-[#FACC15] transition-colors block py-0.5">
                      Help &amp; FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-[#FACC15] transition-colors block py-0.5">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:text-[#FACC15] transition-colors block py-0.5">
                      About Our Studio
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Newsletter Subscription */}
              <div className="space-y-2 sm:pt-1">
                <span className="text-[11px] font-semibold text-[#FFFFFF] block">
                  Stay updated on new designs &amp; offers
                </span>
                <form onSubmit={handleSubscribe} className="relative flex items-center max-w-sm w-full">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full pl-3 pr-16 py-2 text-xs bg-white/[0.05] border border-white/15 rounded-lg text-[#FFFFFF] placeholder-[#A8928A] focus:outline-none focus:border-[#EAB308] transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 px-2.5 py-1 text-xs font-semibold bg-[#EAB308] hover:bg-[#FACC15] text-[#FFFFFF] rounded-md transition-colors cursor-pointer flex items-center gap-1"
                    aria-label="Subscribe"
                  >
                    <span>Join</span>
                    <Send className="w-2.5 h-2.5" />
                  </button>
                </form>
                {subscribed && (
                  <p className="text-[11px] text-emerald-400 font-medium">
                    ✓ Thank you for subscribing!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3. LOCAL SEO STRIP (Responsive Wrap) */}
        <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5 sm:gap-3 text-xs text-[#E5E7EB]/70">
          <div className="flex items-center gap-1.5 text-xs text-[#FACC15] font-medium shrink-0">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>Hyderabad &amp; Dilsukhnagar Workshop:</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-x-3 gap-y-1.5 text-[11px] text-[#E5E7EB]/75">
            <Link href="/acrylic-photo-frames-hyderabad" className="hover:text-[#FACC15] transition-colors">
              Acrylic Photo Frames Hyderabad
            </Link>
            <span className="opacity-40">•</span>
            <Link href="/photo-frames-dilsukhnagar" className="hover:text-[#FACC15] transition-colors">
              Photo Frames Dilsukhnagar
            </Link>
            <span className="opacity-40">•</span>
            <Link href="/led-photo-frames-hyderabad" className="hover:text-[#FACC15] transition-colors">
              LED Photo Frames
            </Link>
            <span className="opacity-40">•</span>
            <Link href="/customized-gifts-dilsukhnagar" className="hover:text-[#FACC15] transition-colors">
              Customized Gifts
            </Link>
            <span className="opacity-40">•</span>
            <Link href="/guides" className="text-[#FACC15] hover:underline font-medium">
              Buying Guides →
            </Link>
          </div>
        </div>

        {/* 4. BOTTOM COPYRIGHT & LEGAL BAR (Safe area inset for mobile phones) */}
        <div
          className="mt-5 sm:mt-6 pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#E5E7EB]/65"
          style={{
            paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 0px))',
          }}
        >
          <p className="text-center sm:text-left text-[11px]">
            © {new Date().getFullYear()} <strong>Abhi&apos;s Gifts</strong>. All rights reserved. Handcrafted with care in Hyderabad, India.
          </p>

          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center text-[11px]">
            <Link href="/privacy-policy" className="hover:text-[#FACC15] transition-colors py-0.5">
              Privacy Policy
            </Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/terms-and-conditions" className="hover:text-[#FACC15] transition-colors py-0.5">
              Terms &amp; Conditions
            </Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/shipping-policy" className="hover:text-[#FACC15] transition-colors py-0.5">
              Shipping Policy
            </Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/return-refund-policy" className="hover:text-[#FACC15] transition-colors py-0.5">
              Returns &amp; Refunds
            </Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/admin/login" className="text-[#EAB308]/80 hover:text-[#FFFFFF] transition-colors py-0.5">
              Staff
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
