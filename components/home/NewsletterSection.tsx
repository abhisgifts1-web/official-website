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
      <div className="bg-gradient-to-br from-[#0A0A0A] via-[#511B2A] to-[#641D30] text-[#FFFFFF] rounded-3xl p-8 sm:p-12 text-center shadow-[0_16px_45px_rgba(50,21,29,0.45)] border-2 border-[#EAB308]/50 relative overflow-hidden">
        {/* Ambient Gold Glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#EAB308]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-[#EAB308] bg-[#511B2A] border border-[#EAB308]/60 px-4 py-1 rounded-full inline-flex items-center gap-1.5 shadow-sm">
            <Mail className="w-3.5 h-3.5 text-[#EAB308]" />
            <span>VIP Collector Circle</span>
          </span>

          <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#FFFFFF] tracking-tight">
            Stay Inspired with New Sacred Creations
          </h2>

          <p className="text-xs sm:text-sm text-[#F9EFE0]/85 leading-relaxed font-sans">
            Subscribe to receive private previews of newly consecrated temple editions, festive privileges, and complimentary Vastu placement guidance for your home.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto pt-2">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-[#EAB308]/40 text-[#FFFFFF] placeholder-[#F9EFE0]/60 text-xs sm:text-sm outline-none focus:border-[#EAB308] focus:bg-white/15"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#EAB308] to-[#CA8A04] hover:brightness-105 text-[#250912] font-bold text-xs sm:text-sm px-7 py-3 rounded-xl transition-all shrink-0 flex items-center justify-center gap-1.5 shadow-md uppercase tracking-wider cursor-pointer"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {success && (
            <div className="pt-2 text-xs font-bold text-[#EAB308] flex items-center justify-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-[#EAB308]" />
              <span>Thank you for joining the VIP Collector Circle. Check your inbox for sacred blessings.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
