'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MessageCircle,
  Sparkles,
  Send,
  Clock,
  ShieldCheck,
  PhoneCall,
  CheckCircle2,
  ArrowRight,
  Layers,
  Palette,
} from 'lucide-react';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

const QUICK_ENQUIRY_TOPICS = [
  { id: 'custom-acrylic', label: 'Custom Acrylic Frame', desc: 'Frameless 5MM direct UV photo print' },
  { id: 'led-backlit', label: 'LED Backlit Photo Frame', desc: 'Warm halo glow with power adapter' },
  { id: 'glitter-frame', label: 'Liquid Gold Glitter Frame', desc: 'Floating shimmer for desktop & wall' },
  { id: 'god-frame', label: 'Temple / Divine Wall Art', desc: 'Lord Balaji, Shiva, Ayodhya Mandir' },
  { id: 'bulk-orders', label: 'Bulk / Wedding Return Gifts', desc: 'Exclusive volume pricing & custom boxes' },
  { id: 'custom-dimension', label: 'Custom Dimensions Quote', desc: 'Tailored inches matching your room wall' },
];

export default function WhatsAppEnquirySection() {
  const [selectedTopic, setSelectedTopic] = useState('custom-acrylic');
  const [userNote, setUserNote] = useState('');
  const [customDimensions, setCustomDimensions] = useState('');

  const cleanWaNumber = (INITIAL_SETTINGS.whatsappNumber || '919032372782').replace(/[^0-9]/g, '');

  const getWhatsAppUrl = () => {
    const topicObj = QUICK_ENQUIRY_TOPICS.find((t) => t.id === selectedTopic);
    const topicLabel = topicObj ? topicObj.label : 'Custom Photo Frame Enquiry';
    let message = `Hello Abhi's Gifts! 🙏\nI have an enquiry regarding: *${topicLabel}*`;
    if (customDimensions.trim()) {
      message += `\n• Desired Dimensions: ${customDimensions.trim()}`;
    }
    if (userNote.trim()) {
      message += `\n• Details / Questions: ${userNote.trim()}`;
    }
    message += `\n\nPlease share price estimate and digital proof details. Thank you!`;

    return `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="whatsapp-enquiry" className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-6 sm:py-10">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#121212] via-[#1A1A1A] to-[#0D0D0D] text-white border border-amber-500/30 p-6 sm:p-10 lg:p-14 shadow-xl">
        {/* Decorative Ambient Background Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#25D366]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Value Props & Fast WhatsApp CTA */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span>DIRECT ARTISAN WHATSAPP ENQUIRY</span>
            </div>

            <div className="space-y-3">
              <h2 className="font-serif font-bold text-2xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight">
                Need a Custom Photo Frame or Specific Dimensions?
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
                Chat directly with our Hyderabad master framing studio. Send us your cherished photo, room wall dimensions, or sacred art request for an <strong className="text-amber-400 font-semibold">instant price quote and free 1:1 digital proof</strong> before laser cutting.
              </p>
            </div>

            {/* Studio Guarantees */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-medium text-stone-200">15-Min Fast Reply</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <Palette className="w-4 h-4 text-[#25D366] shrink-0" />
                <span className="font-medium text-stone-200">Free 1:1 Digital Proof</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs col-span-2 sm:col-span-1">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-medium text-stone-200">Zero-Breakage Transit</span>
              </div>
            </div>

            {/* Direct WhatsApp Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da850] text-stone-950 font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5 fill-stone-950 text-[#25D366]" />
                <span>Chat on WhatsApp Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/enquiry"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 transition-all hover:border-amber-400"
              >
                <span>Open Full Enquiry Page</span>
              </Link>
            </div>

            <p className="text-xs text-stone-400 flex items-center gap-2 pt-1">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>Prefer calling? Reach workshop directly at <a href="tel:+919032372782" className="text-amber-300 font-semibold underline underline-offset-2">+91 90323 72782</a></span>
            </p>
          </div>

          {/* Right Column: Interactive Quick Enquiry Builder */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Quick Enquiry Selector
              </span>
              <span className="text-[11px] text-stone-400">Step 1 of 2</span>
            </div>

            {/* Topic Pills */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-300 block">
                Select Frame Type or Requirement:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {QUICK_ENQUIRY_TOPICS.map((topic) => {
                  const isSelected = selectedTopic === topic.id;
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => setSelectedTopic(topic.id)}
                      className={`p-2.5 rounded-xl text-left transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-amber-400/20 border-amber-400 text-white shadow-xs'
                          : 'bg-white/5 border-white/10 hover:border-white/30 text-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold leading-tight">{topic.label}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-1" />}
                      </div>
                      <span className="text-[10px] text-stone-400 block mt-0.5 leading-snug">{topic.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Dimensions (Optional) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300 block">
                Dimensions or Wall Space (Optional):
              </label>
              <input
                type="text"
                value={customDimensions}
                onChange={(e) => setCustomDimensions(e.target.value)}
                placeholder="e.g. 18x24 inches or 3 sq.ft wall space"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-stone-500 text-xs focus:outline-none focus:border-[#25D366] transition-colors"
              />
            </div>

            {/* Message / Photo Details */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300 block">
                Details or Special Instructions (Optional):
              </label>
              <textarea
                value={userNote}
                onChange={(e) => setUserNote(e.target.value)}
                rows={2}
                placeholder="e.g. Wedding portrait with warm gold border, or Lord Balaji pooja room frame..."
                className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white placeholder-stone-500 text-xs focus:outline-none focus:border-[#25D366] transition-colors resize-none"
              />
            </div>

            {/* Submit to WhatsApp Button */}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da850] text-stone-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-stone-950 text-[#25D366]" />
              <span>Send Enquiry on WhatsApp (+91 90323 72782)</span>
              <Send className="w-3.5 h-3.5" />
            </a>

            <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
              <span>📍 Hyderabad Studio</span>
              <span>🔒 100% Privacy Protected</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
