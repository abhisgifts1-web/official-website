'use client';

import React from 'react';
import { Star, CheckCircle2, MessageSquareQuote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  city: string;
  product: string;
  rating: number;
  text: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Suresh Reddy',
    city: 'Dilsukhnagar, Hyderabad',
    product: 'Tirupati Balaji 3D LED Frame',
    rating: 5,
    text: 'The crystal acrylic quality is outstanding. The warm LED lighting looks magnificent in our pooja mandir. Prompt delivery and excellent WhatsApp coordination for size confirmation.',
  },
  {
    id: '2',
    name: 'Priyanka Sharma',
    city: 'Madhapur, Hyderabad',
    product: 'Custom Couple Wedding Acrylic Keepsake',
    rating: 5,
    text: 'Ordered an anniversary frame with our wedding photo. They sent a clear proof on WhatsApp before printing. The laser beveled edges and glossy finish are truly premium.',
  },
  {
    id: '3',
    name: 'Ramesh Varma',
    city: 'Banjara Hills, Hyderabad',
    product: 'Lord Ganesha Auspicious Acrylic Art',
    rating: 5,
    text: 'Extremely well-packaged with corner protectors. The color vibrancy and optical depth of the cast acrylic are far better than ordinary glass framing.',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
        <span className="text-xs uppercase tracking-widest font-semibold text-amber-800">
          Customer Reflections
        </span>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight mt-1">
          What Our Customers Say
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1.5 font-sans leading-relaxed">
          Trusted by families and art enthusiasts across Hyderabad for authentic quality and service.
        </p>
      </div>

      {/* 3 Review Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {TESTIMONIALS.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-2xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed font-sans">
                &ldquo;{item.text}&rdquo;
              </p>
            </div>

            {/* Author and Product */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-stone-900 block">{item.name}</span>
                <span className="text-[11px] text-stone-500 block">{item.city}</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Verified Order</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
