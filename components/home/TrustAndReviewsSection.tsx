'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Truck,
  Award,
  Headphones,
  Lock,
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  MessageSquareQuote,
  ArrowRight,
} from 'lucide-react';

export interface CustomerTestimonial {
  id: string;
  authorName: string;
  city: string;
  rating: number;
  title: string;
  comment: string;
  productName: string;
  date: string;
}

// Clean default: empty reviews until verified customers leave real reviews
export const AUTHENTIC_REVIEWS: CustomerTestimonial[] = [];

export default function TrustAndReviewsSection() {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  // Auto scroll testimonials every 4 seconds if reviews exist
  useEffect(() => {
    if (AUTHENTIC_REVIEWS.length === 0) return;
    const timer = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % AUTHENTIC_REVIEWS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prevReview = () => {
    if (AUTHENTIC_REVIEWS.length === 0) return;
    setCurrentReviewIndex((prev) => (prev - 1 + AUTHENTIC_REVIEWS.length) % AUTHENTIC_REVIEWS.length);
  };

  const nextReview = () => {
    if (AUTHENTIC_REVIEWS.length === 0) return;
    setCurrentReviewIndex((prev) => (prev + 1) % AUTHENTIC_REVIEWS.length);
  };

  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16 space-y-12 sm:space-y-16">
      {/* =========================================================
          PART 1: Premium Horizontal Trust Pillars (Requirement 10)
          ========================================================= */}
      <div className="bg-stone-50 rounded-3xl p-6 sm:p-8 lg:p-10 border border-stone-200 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Pillar 1: Secure Payments */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-white text-stone-900 border border-stone-200 flex items-center justify-center shadow-2xs">
              <Lock className="w-5 h-5 text-amber-700" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-stone-900">Secure Payments</h4>
            <p className="text-[11px] text-stone-600 leading-snug">
              100% encrypted UPI, cards, Net Banking &amp; direct WhatsApp order confirmation.
            </p>
          </div>

          {/* Pillar 2: Safe Packaging */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-white text-stone-900 border border-stone-200 flex items-center justify-center shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-amber-700" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-stone-900">Safe Packaging</h4>
            <p className="text-[11px] text-stone-600 leading-snug">
              Reinforced multi-layer packaging with protective corner guards.
            </p>
          </div>

          {/* Pillar 3: Studio Craftsmanship */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-white text-stone-900 border border-stone-200 flex items-center justify-center shadow-2xs">
              <Sparkles className="w-5 h-5 text-amber-700" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-stone-900">Direct Workshop</h4>
            <p className="text-[11px] text-stone-600 leading-snug">
              Custom fabricated directly at our Hyderabad studio with proof preview.
            </p>
          </div>

          {/* Pillar 4: Dedicated Support */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-white text-stone-900 border border-stone-200 flex items-center justify-center shadow-2xs">
              <Headphones className="w-5 h-5 text-amber-700" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-stone-900">Artisan Support</h4>
            <p className="text-[11px] text-stone-600 leading-snug">
              Direct Hyderabad studio assistance on WhatsApp &amp; phone for custom sizing.
            </p>
          </div>

          {/* Pillar 5: Quality Craftsmanship */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2 col-span-2 md:col-span-1">
            <div className="w-12 h-12 rounded-2xl bg-white text-stone-900 border border-stone-200 flex items-center justify-center shadow-2xs">
              <Award className="w-5 h-5 text-amber-700" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-stone-900">Quality Craftsmanship</h4>
            <p className="text-[11px] text-stone-600 leading-snug">
              Premium shatterproof acrylic with long-lasting UV vibrancy.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================
          PART 2: Authentic Collector Testimonials / Default State
          ========================================================= */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left pb-4 border-b border-stone-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-amber-900 bg-amber-50 border border-amber-300 px-3.5 py-1 rounded-full shadow-2xs mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Verified Customer Reflections</span>
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-900 tracking-tight">
              VOICES OF DEVOTION &amp; TRUST
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 font-sans">
              Authentic reviews and reflections from homes and temples blessed with Abhi Gifts creations.
            </p>
          </div>

          {/* Carousel Arrows */}
          {AUTHENTIC_REVIEWS.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevReview}
                className="p-2.5 rounded-full bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 hover:border-[#EAB308] shadow-xs transition-all cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextReview}
                className="p-2.5 rounded-full bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 hover:border-[#EAB308] shadow-xs transition-all cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {AUTHENTIC_REVIEWS.length === 0 ? (
          /* Default Empty State */
          <div className="bg-stone-50 rounded-3xl p-8 sm:p-12 border border-stone-200 text-center space-y-5 shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-white border border-stone-200 text-amber-700 mx-auto flex items-center justify-center shadow-xs">
              <MessageSquareQuote className="w-8 h-8 text-amber-600" />
            </div>

            <div className="max-w-xl mx-auto space-y-2">
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900">
                No Reviews Yet • Be The First To Share
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                Every piece is handcrafted with precision cast acrylic and warm LED lighting at our Dilsukhnagar workshop. Bring home a sacred masterpiece and be the first to share your reflections.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-[#EAB308] hover:bg-[#FACC15] text-[#000000] font-bold text-xs px-6 py-3 rounded-full border border-[#EAB308] shadow-xs transition-all hover:scale-105"
              >
                <span>Explore Collections</span>
                <ArrowRight className="w-3.5 h-3.5 text-black" />
              </Link>
              <Link
                href="/customise"
                className="inline-flex items-center gap-2 bg-white hover:bg-stone-50 text-stone-900 font-bold text-xs px-6 py-3 rounded-full border border-stone-300 shadow-xs transition-all hover:border-[#EAB308]"
              >
                <span>Customize Your Photo Frame</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Carousel Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[0, 1, 2].map((offset) => {
              const index = (currentReviewIndex + offset) % AUTHENTIC_REVIEWS.length;
              const review = AUTHENTIC_REVIEWS[index];
              if (!review) return null;

              return (
                <div
                  key={review.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 hover:border-[#EAB308] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-500">
                        {'★'.repeat(review.rating)}
                      </div>
                      <span className="text-[11px] font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                        📍 {review.city}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-base text-stone-900 leading-snug">
                      &ldquo;{review.title}&rdquo;
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed font-sans">
                      {review.comment}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-stone-900 block">{review.authorName}</span>
                      <span className="text-[10px] text-stone-500 block">{review.productName}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Verified</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
