'use client';

import React from 'react';
import HeroShowcase from '@/components/home/HeroShowcase';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import BestsellersShowcase from '@/components/home/BestsellersShowcase';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import RealHomesGallery from '@/components/home/RealHomesGallery';
import ContactCtaSection from '@/components/home/ContactCtaSection';

export default function HomePage() {
  return (
    <div className="space-y-6 sm:space-y-10 lg:space-y-12 pb-12 sm:pb-16 bg-white text-stone-900">
      {/* 1. Hero Showcase Section */}
      <HeroShowcase />

      {/* 2. Shop by Category (Classically placed after Hero) */}
      <CategoryShowcase />

      {/* 3. Best-Selling Products Section */}
      <BestsellersShowcase />

      {/* 3. Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* 4. Real Homes & Customer Spotlight Gallery */}
      <RealHomesGallery />

      {/* 5. Contact and WhatsApp CTA Section */}
      <ContactCtaSection />
    </div>
  );
}
