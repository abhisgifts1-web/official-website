'use client';

import React, { useState } from 'react';
import { Mail, Sparkles, Send, CheckCircle2 } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSuccess(true);
      setEmail('');
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  return (
    <section className="w-full max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
      <div className="bg-stone-50 text-stone-900 rounded-3xl p-8 sm:p-12 text-center shadow-sm border border-stone-200 relative overflow-hidden">
        {/* Ambient Gold Glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-800 bg-amber-50 border border-amber-300 px-4 py-1 rounded-full inline-flex items-center gap-1.5 shadow-2xs">
            <Mail className="w-3.5 h-3.5 text-amber-700" />
            <span>VIP Collector Circle</span>
          </span>

          <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-900 tracking-tight">
            Stay Inspired with New Sacred Creations
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
            Subscribe to receive private previews of newly consecrated temple editions, festive privileges, and complimentary Vastu placement guidance for your home.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto pt-2">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-xl bg-white border border-stone-300 text-stone-900 placeholder-stone-400 text-xs sm:text-sm outline-none focus:border-amber-500 shadow-2xs"
            />
            <button
              type="submit"
              className="bg-[#EAB308] hover:bg-[#FACC15] text-[#000000] font-bold text-xs sm:text-sm px-7 py-3 rounded-xl transition-all shrink-0 flex items-center justify-center gap-1.5 shadow-sm uppercase tracking-wider cursor-pointer"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {success && (
            <div className="pt-2 text-xs font-bold text-amber-800 flex items-center justify-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Thank you for joining the VIP Collector Circle. Check your inbox for sacred blessings.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
