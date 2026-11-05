'use client';

import React from 'react';
import { MessageSquareQuote } from 'lucide-react';

export default function TestimonialsSection() {
  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
        <span className="text-xs uppercase tracking-widest font-semibold text-amber-800">
          Customer Reflections
        </span>
        <h2 className="font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight mt-1">
          Reviews &amp; Ratings
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1.5 font-sans leading-relaxed">
          Real customer reviews and ratings will be showcased here as orders are delivered.
        </p>
      </div>

      {/* Reserved Review & Rating Space (3 Cards Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {[1, 2, 3].map((slot) => (
          <div
            key={slot}
            className="rounded-2xl border-2 border-dashed border-stone-200/90 bg-stone-50/60 p-6 sm:p-8 flex flex-col items-center justify-center text-center min-h-[190px] space-y-2.5 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-400 shadow-2xs">
              <MessageSquareQuote className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-stone-600">
              Reserved for Customer Review #{slot}
            </p>
            <p className="text-[11px] text-stone-400 max-w-[220px]">
              Verified customer feedback and star ratings will appear in this space.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
