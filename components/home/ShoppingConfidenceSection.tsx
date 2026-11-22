'use client';

import React from 'react';
import Link from 'next/link';
import {
  Truck,
  ShieldCheck,
  Lock,
  RotateCcw,
  Search,
  MessageCircle,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

export default function ShoppingConfidenceSection() {
  const cleanWaNumber = (INITIAL_SETTINGS.whatsappNumber || '919032372782').replace(/[^0-9]/g, '');

  const confidencePillars = [
    {
      icon: Truck,
      title: '24–48 Hours Hyderabad Dispatch',
      badge: 'Express In-City',
      description:
        'Orders crafted and dispatched within 24–48 hours across Hyderabad & Secunderabad. 3–5 business days across all Indian states.',
    },
    {
      icon: ShieldCheck,
      title: '100% Zero-Breakage Guarantee',
      badge: 'Free Replacement',
      description:
        'Reinforced 5-layer foam & wooden crate packaging. If any piece is damaged in transit, we replace it immediately without questions.',
    },
    {
      icon: Lock,
      title: '100% Encrypted Secure Checkout',
      badge: 'PCI-DSS Verified',
      description:
        'All UPI apps (Google Pay, PhonePe, Paytm), Credit/Debit Cards, NetBanking, and Wallets protected with bank-grade 256-bit encryption.',
    },
    {
      icon: Search,
      title: 'Real-Time Order Tracking',
      badge: 'Live Status',
      description:
        'Track your shipment from laser cutting to out-for-delivery with live AWB tracking links sent directly to your SMS and WhatsApp.',
      linkHref: '/track-order',
      linkText: 'Track Your Order →',
    },
    {
      icon: MessageCircle,
      title: 'Free 1:1 WhatsApp Proof',
      badge: 'Sign-Off First',
      description:
        'Our Hyderabad graphic designers share an exact 1:1 digital layout on WhatsApp for your sign-off before manufacturing.',
    },
  ];

  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12">
      <div className="bg-stone-50 rounded-3xl p-6 sm:p-10 lg:p-12 border border-stone-200/90 shadow-2xs relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-amber-900 bg-amber-100/80 border border-amber-300/70 shadow-2xs mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Guaranteed Peace of Mind</span>
          </div>

          <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-900 tracking-tight">
            Delivery &amp; Shopping Confidence
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 mt-2 font-sans max-w-md mx-auto leading-relaxed">
            Transparent shipping timelines, transit insurance, and dedicated artisan support for every order.
          </p>
        </div>

        {/* 5 Confidence Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {confidencePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-amber-400/80 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 shrink-0 shadow-2xs">
                      <Icon className="w-5 h-5 text-amber-700" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      {pillar.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900 leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-2 font-sans leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>

                {pillar.linkHref && (
                  <div className="pt-3 mt-3 border-t border-stone-100">
                    <Link
                      href={pillar.linkHref}
                      className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 hover:text-amber-700"
                    >
                      <span>{pillar.linkText}</span>
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Help Strip */}
        <div className="mt-8 pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Customer Support Hours: Mon – Sun, 10:00 AM – 8:00 PM IST</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/shipping-policy"
              className="hover:text-amber-800 underline underline-offset-2 transition-colors"
            >
              Shipping Policy
            </Link>
            <span className="text-stone-300">•</span>
            <Link
              href="/return-refund-policy"
              className="hover:text-amber-800 underline underline-offset-2 transition-colors"
            >
              Return &amp; Refund Policy
            </Link>
            <span className="text-stone-300">•</span>
            <a
              href={`https://wa.me/${cleanWaNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-800 underline underline-offset-2 transition-colors text-amber-800 font-semibold"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
