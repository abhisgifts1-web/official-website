'use client';

import React from 'react';
import HeroShowcase from '@/components/home/HeroShowcase';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import GiftByOccasionSection from '@/components/home/GiftByOccasionSection';
import BestsellersShowcase from '@/components/home/BestsellersShowcase';
import BeforeAfterCraftSection from '@/components/home/BeforeAfterCraftSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import FrequentlyBoughtTogetherSection from '@/components/home/FrequentlyBoughtTogetherSection';
import CustomerRealGallerySection from '@/components/home/CustomerRealGallerySection';
import WorkshopCraftSection from '@/components/home/WorkshopCraftSection';
import ShoppingConfidenceSection from '@/components/home/ShoppingConfidenceSection';
import FaqSection from '@/components/home/FaqSection';
import ContactCtaSection from '@/components/home/ContactCtaSection';

export default function HomePage() {
  return (
    <div className="space-y-6 sm:space-y-10 lg:space-y-12 pb-12 sm:pb-16 bg-white text-stone-900">
      {/* 1. Flagship Hero Section */}
      <HeroShowcase />

      {/* 2. Shop by Category */}
      <CategoryShowcase />

      {/* 3. Section A: Find the Perfect Gift (Occasion-Based Gifting Guide) */}
      <GiftByOccasionSection />

      {/* 4. Best-Selling Products Showcase */}
      <BestsellersShowcase />

      {/* 5. Section B: Your Memories, Our Craft (Interactive Before-and-After Customization) */}
      <BeforeAfterCraftSection />

      {/* 6. Why Choose Us (5-Pillar Visual Craftsmanship & Trust) */}
      <WhyChooseUsSection />

      {/* 7. Section E: Frequently Bought Together (Curated Product Bundles) */}
      <FrequentlyBoughtTogetherSection />

      {/* 8. Section C: Customer Love & Real Gallery (Verified Hyderabad Installations) */}
      <CustomerRealGallerySection />

      {/* 9. Section D: Behind the Scenes (Hyderabad Workshop Craftsmanship) */}
      <WorkshopCraftSection />

      {/* 10. Section F: Delivery & Shopping Confidence */}
      <ShoppingConfidenceSection />

      {/* 11. Section G: Interactive Frequently Asked Questions */}
      <FaqSection />

      {/* 12. Direct Store Location & WhatsApp Support CTA */}
      <ContactCtaSection />
    </div>
  );
}
