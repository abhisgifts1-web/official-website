'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, MessageCircle, Upload, CheckCircle2, Box } from 'lucide-react';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

export default function CustomizationProcessSection() {
  const steps = [
    {
      num: '01',
      title: 'Choose Frame & Size',
      description: 'Select acrylic or LED backlit style, pick from standard sizes or specify your custom wall dimensions.',
      icon: Box,
    },
    {
      num: '02',
      title: 'Upload Your Photo',
      description: 'Upload your favorite photo, wedding portrait, or sacred artwork directly through our online customizer.',
      icon: Upload,
    },
    {
      num: '03',
      title: 'Free WhatsApp Proof',
      description: 'Our Hyderabad designers create a 1:1 digital preview and share it with you on WhatsApp for approval.',
      icon: MessageCircle,
    },
    {
      num: '04',
      title: 'Handcrafted & Delivered',
      description: 'Upon confirmation, your frame is precision laser cut, safely packaged, and dispatched to your doorstep.',
      icon: CheckCircle2,
    },
  ];

  const cleanWaNumber = (INITIAL_SETTINGS.whatsappNumber || '917780269927').replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
    "Hello Abhi's Gifts, I would like to customize a photo frame with my photo. Please assist me with sizes and proofing."
  )}`;

  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
        <span className="text-xs uppercase tracking-widest font-semibold text-amber-800">
          Simple 4-Step Process
        </span>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight mt-1">
          How to Customize Your Frame
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1.5 font-sans leading-relaxed">
          From photo upload to final dispatch, we ensure a seamless and personalized experience.
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-2xs relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                    Step {step.num}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700">
                    <Icon className="w-4 h-4 text-amber-700" />
                  </div>
                </div>

                <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900">
                  {step.title}
                </h3>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed font-sans">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <Link
          href="/customise"
          className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-stone-900 hover:bg-black text-white font-semibold text-xs sm:text-sm transition-all shadow-sm group"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Open Customizer Studio</span>
          <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
        </Link>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white hover:bg-stone-50 text-stone-900 font-semibold text-xs sm:text-sm border border-stone-300 transition-colors shadow-2xs"
        >
          <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
          <span>Order via WhatsApp Chat</span>
        </a>
      </div>
    </section>
  );
}
