'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Sparkles, MessageCircle } from 'lucide-react';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqCategories = [
    {
      category: 'Product & Materials',
      items: [
        {
          q: 'What makes cast acrylic superior to regular glass framing?',
          a: 'Our cast acrylic is impact-resistant and shatterproof compared to ordinary glass. It has precision beveled edges and high optical light transmittance, delivering vibrant depth without glass breakage hazards.',
        },
        {
          q: 'Will the artwork colors fade over time under sunlight?',
          a: 'No. We use direct Swiss UV curable inks that bond molecularly with the acrylic sheet. They are 100% UV resistant and tested to endure 25+ years without yellowing, discoloration, or peeling.',
        },
        {
          q: 'How heavy is an acrylic wall art panel?',
          a: 'Cast acrylic is roughly half the weight of traditional glass. For example, an 18x24 inches panel weighs around 2.2 kg, while a large 24x36 inches piece weighs approximately 3.8 kg, making hanging completely safe and effortless.',
        },
      ],
    },
    {
      category: 'LED Backlighting & Power',
      items: [
        {
          q: 'Can I keep the LED backlighting turned on 24/7?',
          a: 'Yes! Our high-efficiency Epistar SMD LED diodes produce minimal heat and have a rated operational lifespan of an extended lifespan with low energy consumption.',
        },
        {
          q: 'How long is the power wire? How is it powered?',
          a: 'Every LED art piece includes a 2.5-meter long discreet transparent wire connected to a BIS-certified 12V 2A wall adapter that plugs directly into any standard Indian 2-pin/3-pin wall socket.',
        },
        {
          q: 'Does it come with a remote control or dimmer?',
          a: 'Yes, our LED models include an inline rocker switch or remote touch controller to turn on/off and adjust ambient brightness to your mood.',
        },
      ],
    },
    {
      category: 'Shipping & Damage Protection',
      items: [
        {
          q: 'How do you ensure safe packaging?',
          a: 'We pack every order in multi-layer heavy cartons with corner protective cushions. If your artwork is received damaged in transit, simply share photos with us on WhatsApp within 48 hours for prompt support and resolution.',
        },
        {
          q: 'How long does delivery take?',
          a: 'Standard dispatch occurs in 24 to 48 hours. Transit takes 2-3 business days for South India and 3-5 days for North/East/West India.',
        },
        {
          q: 'Is Online & WhatsApp Payment (UPI) available?',
          a: 'Yes, Online & WhatsApp Payment is available across all serviceable Indian pincodes.',
        },
      ],
    },
    {
      category: 'Customization & Photo Frames',
      items: [
        {
          q: 'Can I print my wedding or family photo in a customized size?',
          a: 'Yes! Visit our /customise page where you can upload your personal photo, preview it in simulated room interiors, add custom text or dates, and place your order directly.',
        },
        {
          q: 'Do you offer preview approval before printing?',
          a: 'Yes, for all custom photo uploads, our design team performs complimentary brightness and color grading checks. If needed, we send a WhatsApp proof before final production.',
        },
      ],
    },
  ];

  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-16 space-y-12 bg-white text-stone-900">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-widest font-bold text-stone-900 bg-stone-100 border border-amber-300 px-3 py-1 rounded-full inline-flex items-center gap-1.5 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Help & Support
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-5xl text-stone-900">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto">
          Find answers regarding our materials, LED specifications, packaging, and custom photo prints.
        </p>
      </div>

      {/* Accordion Categories */}
      <div className="max-w-4xl mx-auto space-y-8">
        {faqCategories.map((cat, catIdx) => (
          <div key={catIdx} className="space-y-3">
            <h3 className="font-serif font-bold text-lg text-stone-900 border-b border-stone-200 pb-2">
              {cat.category}
            </h3>

            <div className="bg-white rounded-2xl border border-stone-200 shadow-xs divide-y divide-stone-200 overflow-hidden">
              {cat.items.map((item, itemIdx) => {
                const uniqueId = catIdx * 10 + itemIdx;
                const isOpen = openIndex === uniqueId;

                return (
                  <div key={itemIdx} className="p-4 sm:p-5">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : uniqueId)}
                      className="w-full flex items-center justify-between text-left gap-4 font-serif font-bold text-sm sm:text-base text-stone-900 cursor-pointer"
                    >
                      <span>{item.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-amber-700 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <p className="text-xs sm:text-sm text-stone-600 mt-2.5 leading-relaxed">
                        {item.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Still have questions */}
      <div className="bg-stone-50 p-6 sm:p-8 rounded-3xl border border-stone-200 text-center space-y-3">
        <h4 className="font-serif font-bold text-lg text-stone-900">Still have questions?</h4>
        <p className="text-xs text-stone-600 max-w-md mx-auto">
          Our friendly customer artisans are happy to assist you with wall measurements, deity recommendations, or custom sizing.
        </p>
        <div className="pt-2">
          <a
            href={`https://wa.me/${INITIAL_SETTINGS.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              'Hi Abhi Gifts! I have a question about my wall decor selection.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#EAB308] hover:bg-[#FACC15] text-stone-950 text-xs font-bold px-6 py-3 rounded-full transition-colors border border-amber-500 uppercase tracking-wider shadow-xs cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat with Customer Desk on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
