'use client';

import React from 'react';
import HeroShowcase from '@/components/home/HeroShowcase';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import BestsellersShowcase from '@/components/home/BestsellersShowcase';
import NewArrivalsShowcase from '@/components/home/NewArrivalsShowcase';
import PromotionalBanner from '@/components/home/PromotionalBanner';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import WhatsAppEnquirySection from '@/components/home/WhatsAppEnquirySection';

export default function HomePage() {
  return (
    <div className="space-y-6 sm:space-y-10 lg:space-y-12 pb-12 sm:pb-16 bg-white text-stone-900">
      {/* 4. Hero banner */}
      <HeroShowcase />

      {/* 5. Shop by category */}
      <CategoryShowcase />

      {/* 6. Bestsellers */}
      <BestsellersShowcase />

      {/* 7. New arrivals */}
      <NewArrivalsShowcase />

      {/* 8. Promotional banner */}
      <PromotionalBanner />

      {/* 10. Why choose us */}
      <WhyChooseUsSection />

      {/* 11. WhatsApp Enquiry */}
      <WhatsAppEnquirySection />
    </div>
  );
}
