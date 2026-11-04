'use client';

import React from 'react';
import HeroShowcase from '@/components/home/HeroShowcase';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import BestsellersShowcase from '@/components/home/BestsellersShowcase';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import CustomizationProcessSection from '@/components/home/CustomizationProcessSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ContactCtaSection from '@/components/home/ContactCtaSection';

export default function HomePage() {
  return (
    <div className="space-y-4 sm:space-y-8 lg:space-y-10 pb-12 sm:pb-16 bg-white text-stone-900">
      {/* 1. Minimal Hero Section with One Featured Product Image */}
      <HeroShowcase />

      {/* 2. Clean Product Categories Section */}
      <CategoryShowcase />

      {/* 3. Best-Selling Products Section */}
      <BestsellersShowcase />

      {/* 4. Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* 5. Customization Process Section */}
      <CustomizationProcessSection />

      {/* 6. Customer Testimonials */}
      <TestimonialsSection />

      {/* 7. Contact and WhatsApp CTA Section */}
      <ContactCtaSection />
    </div>
  );
}
