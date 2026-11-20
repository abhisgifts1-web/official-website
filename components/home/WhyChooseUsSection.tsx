'use client';

import React from 'react';
import { ShieldCheck, Sparkles, MessageCircle, Sun, CheckCircle2 } from 'lucide-react';

export default function WhyChooseUsSection() {
  const features = [
    {
      icon: Sparkles,
      title: 'Direct Workshop Fabrication',
      tag: 'In-House Hyderabad',
      description:
        'Crafted in-house at our Dilsukhnagar, Hyderabad workshop. No middlemen, ensuring authentic quality and direct workshop pricing.',
    },
    {
      icon: ShieldCheck,
      title: 'Premium Virgin Cast Acrylic',
      tag: 'Square-Cut Edges',
      description:
        'Imported clear virgin cast acrylic and 5MM premium crystal acrylic featuring precision square-cut edges for maximum optical clarity.',
    },
    {
      icon: Sun,
      title: 'Cool White LED Backlighting',
      tag: 'Cool White Halo Glow',
      description:
        'Hidden perimeter LED illumination producing an elegant Cool White halo glow with external power adapter included.',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Proof Preview',
      tag: 'Approval Before Craft',
      description:
        'Review a 1:1 digital proof of your custom frame directly on WhatsApp for your approval before production.',
    },
  ];

  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12">
      <div className="bg-gradient-to-b from-stone-50 via-amber-50/20 to-stone-50 rounded-3xl p-6 sm:p-10 lg:p-12 border border-stone-200/90 shadow-xs relative overflow-hidden">
        {/* Subtle Ambient Decorative Glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-amber-900 bg-amber-100/80 border border-amber-300/70 shadow-2xs mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Craftsmanship &amp; Trust</span>
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-900 tracking-tight mt-1">
            Why Choose Abhi&apos;s Gifts
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 font-sans leading-relaxed">
            Every frame is fabricated in our Hyderabad workshop with precision materials, strict quality checks, and personalized proof approval.
          </p>
        </div>

        {/* 4 Feature Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 relative z-10">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/90 hover:border-amber-400/80 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/10 via-amber-400/15 to-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-700 group-hover:scale-105 group-hover:border-amber-500/50 transition-all duration-300 shrink-0 shadow-2xs">
                      <Icon className="w-5 h-5 text-amber-700" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/80">
                      {feat.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-amber-900 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-2 leading-relaxed font-sans">
                      {feat.description}
                    </p>
                  </div>
                </div>

                {/* Subtle Interactive Gold Accent Line */}
                <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-300 rounded-full mt-4" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
