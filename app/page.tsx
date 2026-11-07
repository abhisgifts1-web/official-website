'use client';

import React from 'react';
import HeroShowcase from '@/components/home/HeroShowcase';
import BestsellersShowcase from '@/components/home/BestsellersShowcase';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import CustomizationProcessSection from '@/components/home/CustomizationProcessSection';
import ContactCtaSection from '@/components/home/ContactCtaSection';

export default function HomePage() {
  return (
    <div className="space-y-4 sm:space-y-8 lg:space-y-10 pb-12 sm:pb-16 bg-white text-stone-900">
      {/* 1. Hero Section with Top Category Strip */}
      <HeroShowcase />

      {/* 2. Best-Selling Products Section */}
      <BestsellersShowcase />

      {/* 3. Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* 4. Customization Process Section */}
      <CustomizationProcessSection />

      {/* 5. Contact and WhatsApp CTA Section */}
      <ContactCtaSection />
    </div>
  );
}
