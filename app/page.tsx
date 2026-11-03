'use client';

import React from 'react';
import HeroShowcase from '@/components/home/HeroShowcase';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import BestsellersShowcase from '@/components/home/BestsellersShowcase';
import InteractiveLedExperience from '@/components/home/InteractiveLedExperience';
import CustomGiftsShowcase from '@/components/home/CustomGiftsShowcase';
import SacredArtAtelier from '@/components/home/SacredArtAtelier';
import TrustAndReviewsSection from '@/components/home/TrustAndReviewsSection';
import FaqSection from '@/components/home/FaqSection';
import ContactSupportSection from '@/components/support/ContactSupportSection';
import NewsletterSection from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <div className="space-y-6 sm:space-y-10 lg:space-y-12 pb-14 bg-[#FFF7EC] text-[#511B2A]">
      {/* 1. REVOLUTIONARY HERO SECTION — Two-Column Cinematic Masterpiece */}
      <HeroShowcase />

      {/* 2. PREMIUM CATEGORY SHOWCASE — Asymmetrical Editorial Bento Grid */}
      <CategoryShowcase />

      {/* 3. BESTSELLERS / FEATURED COLLECTION — The Most Loved Divine Masterpieces */}
      <BestsellersShowcase />

      {/* 4. IMMERSIVE LED EXPERIENCE — Interactive Before / After Draggable Lighting Comparison */}
      <InteractiveLedExperience />

      {/* 5. CUSTOM GIFTS & PERSONALIZED KEEPSAKES — Trending Rotating Lamps, Glitter Frames & Keepsakes */}
      <CustomGiftsShowcase />

      {/* 6. THE SACRED ART ATELIER — Immersive Luxury Campaign & Interactive Craftsmanship */}
      <SacredArtAtelier />

      {/* 7. TRUST AND CUSTOMER EXPERIENCE — 5 Horizontal Pillars + Verified Collector Reviews */}
      <TrustAndReviewsSection />

      {/* 8. COLLECTOR KNOWLEDGE BASE — Frequently Asked Questions */}
      <FaqSection />

      {/* 9. DEDICATED CUSTOMER SUPPORT & FAQ PILLARS — WhatsApp, Phone, Location & Tracking */}
      <ContactSupportSection />

      {/* 10. VIP COLLECTOR CIRCLE — Newsletter Subscription */}
      <NewsletterSection />
    </div>
  );
}
