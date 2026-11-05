'use client';

import React from 'react';
import { ShieldCheck, Sparkles, MessageCircle, Sun, Truck, Award } from 'lucide-react';

export default function WhyChooseUsSection() {
  const features = [
    {
      icon: Sparkles,
      title: 'Direct Workshop Fabrication',
      description:
        'Crafted in-house at our Dilsukhnagar, Hyderabad studio. No middlemen, ensuring authentic quality and direct pricing.',
    },
    {
      icon: ShieldCheck,
      title: 'Museum-Grade Cast Acrylic',
      description:
        'Shatterproof crystal acrylic with diamond-beveled edges for stunning depth, clarity, and lifelong durability.',
    },
    {
      icon: Sun,
      title: 'LED Backlighting',
      description:
        'Certified low-voltage 12V ambient LEDs that produce a soothing golden halo while remaining cool to the touch.',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Proof Preview',
      description:
        'Review a 1:1 digital proof of your custom frame directly on WhatsApp for your approval before laser cutting.',
    },
  ];

  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12">
      <div className="bg-stone-50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 border border-stone-200">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-800">
            Craftsmanship &amp; Trust
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight mt-1">
            Why Choose Abhi&apos;s Gifts
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1.5 font-sans leading-relaxed">
            Every frame is fabricated with precision materials, strict quality checks, and personalized attention.
          </p>
        </div>

        {/* 4 Feature Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-2xs flex flex-col items-start space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-800 shrink-0">
                  <Icon className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed font-sans">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
