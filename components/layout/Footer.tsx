'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Sparkles,
  RotateCcw,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  ArrowUpRight,
} from 'lucide-react';
import { WhatsAppIcon, InstagramIcon, YouTubeIcon } from '@/components/icons/SocialIcons';
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
  const instagramUrl = INITIAL_SETTINGS.instagramUrl || 'https://www.instagram.com/abhis_gifts_?cplk=MWtkNTJla2s3NTQw';
  const youtubeUrl = INITIAL_SETTINGS.youtubeUrl || 'https://youtube.com/@abhis_gifts?si=Ap98aZU7b21rJA_8';

  return (
    <footer className="bg-black text-stone-300 border-t border-stone-800 relative overflow-hidden select-none">
      {/* 1. TOP VALUE PROPOSITION STRIP */}
      <div className="border-b border-stone-800/80 bg-[#0F0F0F] py-4 sm:py-5 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {/* Value 1 */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#1A1A1A] border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[11px] sm:text-xs md:text-sm font-semibold text-white leading-snug">Secure Packaging</h4>
              <p className="text-[10px] sm:text-[11px] text-stone-400 leading-tight">Carefully Boxed &amp; Shipped</p>
            </div>
          </div>

          {/* Value 2 */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#1A1A1A] border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[11px] sm:text-xs md:text-sm font-semibold text-white leading-snug">Premium Acrylic</h4>
              <p className="text-[10px] sm:text-[11px] text-stone-400 leading-tight">Precision Handcrafted</p>
            </div>
          </div>

          {/* Value 3 */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#1A1A1A] border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[11px] sm:text-xs md:text-sm font-semibold text-white leading-snug">Direct Workshop</h4>
              <p className="text-[10px] sm:text-[11px] text-stone-400 leading-tight">Handcrafted in Hyderabad</p>
            </div>
          </div>

          {/* Value 4 */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#1A1A1A] border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[11px] sm:text-xs md:text-sm font-semibold text-white leading-snug">
                Artisan Quality Check
              </h4>
              <p className="text-[10px] sm:text-[11px] text-stone-400 leading-tight">
                1:1 Proof approval
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 lg:py-14 bg-black">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-4 gap-y-8 sm:gap-8 lg:gap-10">
          {/* Section 1: Brand Info & Contacts */}
          <div className="col-span-2 lg:col-span-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6 lg:gap-4">
              <div className="space-y-3">
                <Link href="/" className="inline-block">
                  <Image
                    src="/images/brand/logo-gold.png"
                    alt="Abhi's Gifts - We Create Memorable Movements"
                    width={240}
                    height={50}
                    className="h-9 sm:h-10 md:h-11 w-auto object-contain"
                  />
                </Link>
                <p className="text-xs sm:text-[13px] text-stone-400 leading-relaxed max-w-sm">
                  Handcrafted personalized acrylic photo frames, LED illuminated memories, and luxury wall art. Made with care in Hyderabad.
                </p>
              </div>

              <div className="space-y-2 text-xs text-stone-300 sm:pt-1">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{INITIAL_SETTINGS.businessAddress}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <a href={`tel:${INITIAL_SETTINGS.supportPhone}`} className="hover:text-amber-300 transition-colors truncate font-semibold">
                    {INITIAL_SETTINGS.supportPhone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <a href={`mailto:${INITIAL_SETTINGS.supportEmail}`} className="hover:text-amber-300 transition-colors truncate font-semibold">
                    {INITIAL_SETTINGS.supportEmail}
                  </a>
                </div>
                <div className="pt-2 space-y-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B5E20]/30 hover:bg-[#1B5E20]/60 border border-[#4CAF50]/60 text-[#A5D6A7] text-xs font-bold transition-all shadow-xs"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                    <span>WhatsApp: +91 90323 72782</span>
                  </a>

                  <div className="flex items-center gap-2">
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1A1A1A] hover:bg-[#252525] border border-pink-500/50 text-white text-xs font-bold transition-all shadow-xs hover:border-pink-400 group"
                    >
                      <span className="w-4 h-4 rounded-sm bg-gradient-to-tr from-[#fd5949] via-[#d6249f] to-[#285AEB] flex items-center justify-center shrink-0">
                        <InstagramIcon className="w-2.5 h-2.5 text-white fill-current" />
                      </span>
                      <span>Instagram</span>
                    </a>

                    <a
                      href={youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1A1A1A] hover:bg-[#252525] border border-red-500/50 text-white text-xs font-bold transition-all shadow-xs hover:border-red-400 group"
                    >
                      <span className="w-4 h-4 rounded-sm bg-[#CC0000] flex items-center justify-center shrink-0">
                        <YouTubeIcon className="w-2.5 h-2.5 text-white fill-current" />
                      </span>
                      <span>YouTube</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Featured Categories 1 */}
          <div className="col-span-1 lg:col-span-3 space-y-2.5 sm:space-y-3">
            <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-amber-400 pb-1 border-b border-amber-500/30">
              Categories
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px] text-stone-300 pt-1">
              <li>
                <Link href="/category/acrylic-photo-frames" className="hover:text-amber-300 transition-colors block py-0.5">
                  Acrylic Photo Frames
                </Link>
              </li>
              <li>
                <Link href="/category/led-acrylic-photo-frames" className="hover:text-amber-300 transition-colors block py-0.5">
                  LED Acrylic Photo Frames
                </Link>
              </li>
              <li>
                <Link href="/category/glitter-photo-frames" className="hover:text-amber-300 transition-colors block py-0.5">
                  Glitter Photo Frames
                </Link>
              </li>
              <li>
                <Link href="/category/360-rotating-photo-lamps" className="hover:text-amber-300 transition-colors block py-0.5">
                  360° Rotating Photo Lamps
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Special Keepsakes */}
          <div className="col-span-1 lg:col-span-2 space-y-2.5 sm:space-y-3">
            <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-amber-400 pb-1 border-b border-amber-500/30">
              Special Keepsakes
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px] text-stone-300 pt-1">
              <li>
                <Link href="/category/god-photo-frames" className="hover:text-amber-300 transition-colors block py-0.5">
                  God Photo Frames
                </Link>
              </li>
              <li>
                <Link href="/category/family-baby-frames" className="hover:text-amber-300 transition-colors block py-0.5">
                  Family &amp; Baby Frames
                </Link>
              </li>
              <li>
                <Link href="/category/couple-wedding-frames" className="hover:text-amber-300 transition-colors block py-0.5">
                  Couple &amp; Wedding Frames
                </Link>
              </li>
              <li>
                <Link href="/category/personalized-gifts" className="hover:text-amber-300 transition-colors block py-0.5">
                  Personalized Gifts
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 4: Customer Care & Newsletter */}
          <div className="col-span-2 lg:col-span-3 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6 lg:gap-4">
              <div className="space-y-2.5 sm:space-y-3">
                <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-amber-400 pb-1 border-b border-amber-500/30">
                  Customer Support
                </h4>
                <ul className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-2 text-xs sm:text-[13px] text-stone-300 pt-1">
                  <li>
                    <Link href="/customise" className="hover:text-amber-300 font-semibold text-amber-400 transition-colors block py-0.5">
                      ✨ Customise Photo Frame
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="hover:text-amber-300 transition-colors block py-0.5">
                      Help &amp; FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-amber-300 transition-colors block py-0.5">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:text-amber-300 transition-colors block py-0.5">
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Newsletter Subscription */}
              <div className="space-y-2 sm:pt-1">
                <span className="text-[11px] font-semibold text-stone-200 block">
                  Stay updated on new designs &amp; offers
                </span>
                <form onSubmit={handleSubscribe} className="relative flex items-center max-w-sm w-full">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full pl-3 pr-16 py-2 text-xs bg-[#1A1A1A] border border-stone-700 rounded-lg text-white placeholder-stone-500 focus:outline-none focus:border-[#EAB308] transition-colors shadow-2xs"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 px-2.5 py-1 text-xs font-semibold bg-[#EAB308] hover:bg-[#FACC15] text-black rounded-md transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                    aria-label="Subscribe"
                  >
                    <span>Join</span>
                    <Send className="w-2.5 h-2.5 text-black" />
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

        {/* 3. LOCAL SEO STRIP */}
        <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5 sm:gap-3 text-xs text-stone-400 font-medium">
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold shrink-0">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-amber-400" />
            <span>Hyderabad &amp; Dilsukhnagar Workshop:</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-x-3 gap-y-1.5 text-[11px] text-stone-300">
            <Link href="/acrylic-photo-frames-hyderabad" className="hover:text-amber-300 transition-colors">
              Acrylic Photo Frames Hyderabad
            </Link>
            <span className="opacity-40">•</span>
            <Link href="/photo-frames-dilsukhnagar" className="hover:text-amber-300 transition-colors">
              Photo Frames Dilsukhnagar
            </Link>
            <span className="opacity-40">•</span>
            <Link href="/led-photo-frames-hyderabad" className="hover:text-amber-300 transition-colors">
              LED Photo Frames
            </Link>
            <span className="opacity-40">•</span>
            <Link href="/customized-gifts-dilsukhnagar" className="hover:text-amber-300 transition-colors">
              Customized Gifts
            </Link>
            <span className="opacity-40">•</span>
            <Link href="/guides" className="text-amber-400 hover:underline font-semibold">
              Buying Guides →
            </Link>
          </div>
        </div>

        {/* 4. BOTTOM COPYRIGHT & LEGAL BAR */}
        <div className="mt-5 sm:mt-6 pt-5 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
          <p className="text-center sm:text-left text-[11px] text-stone-400 font-medium">
            © {new Date().getFullYear()} <strong className="text-stone-200">Abhi&apos;s Gifts</strong>. All rights reserved. Handcrafted with care in Hyderabad, India.
          </p>

          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center text-[11px]">
            <Link href="/privacy-policy" className="hover:text-amber-300 transition-colors py-0.5">
              Privacy Policy
            </Link>
            <span className="w-1 h-1 rounded-full bg-stone-700" />
            <Link href="/terms-and-conditions" className="hover:text-amber-300 transition-colors py-0.5">
              Terms &amp; Conditions
            </Link>
            <span className="w-1 h-1 rounded-full bg-stone-700" />
            <Link href="/faq" className="hover:text-amber-300 transition-colors py-0.5">
              FAQs
            </Link>
            <span className="w-1 h-1 rounded-full bg-stone-700" />
            <Link href="/admin/login" className="text-amber-400 hover:text-white transition-colors py-0.5 font-semibold">
              Staff
            </Link>
          </div>
        </div>

        {/* 5. DEVELOPED BY SLRJ DIGITAL BRANDING STRIP */}
        <div
          className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-stone-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{
            paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 0px))',
          }}
        >
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-2.5 text-[11px] text-stone-400">
            <span className="text-stone-400 font-normal">Developed by</span>
            <a
              href="https://www.slrjdigital.in"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="SLRJ Digital — Website Development Company in India"
              title="SLRJ Digital — Learn. Build. Grow."
              className="group inline-flex items-center gap-1.5 text-stone-200 hover:text-white transition-colors"
            >
              <Image
                src="/images/slrj/slrj-mark-white.png"
                alt="SLRJ Digital Logo"
                width={16}
                height={17}
                className="w-3.5 h-auto object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-200"
              />
              <span className="font-semibold text-stone-200 group-hover:text-amber-400 transition-colors">
                SLRJ Digital
              </span>
            </a>
            <span className="text-stone-700 hidden sm:inline" aria-hidden="true">•</span>
            <span className="text-stone-400 text-[11px] font-medium tracking-wide">
              Learn. Build. Grow.
            </span>
          </div>

          <a
            href="https://www.slrjdigital.in/contact"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact SLRJ Digital for website development"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium text-stone-300 hover:text-white bg-stone-900/90 hover:bg-stone-800 border border-stone-800 hover:border-stone-700 transition-all duration-200 group shadow-2xs hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Contact Us</span>
            <ArrowUpRight className="w-3 h-3 text-stone-400 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>
        </div>
      </div>
    </footer>
  );
}
