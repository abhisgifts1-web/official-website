import React from 'react';
import { Metadata } from 'next';
import LocalLandingPageView from '@/components/seo/LocalLandingPageView';
import { getAllProducts } from '@/lib/store';

export const metadata: Metadata = {
  title: 'Customized Gifts in Dilsukhnagar | Personalized Photo Gifts Hyderabad',
  description:
    'Best customized gifts in Dilsukhnagar, Hyderabad. Personalized acrylic photo frames, LED night-glow keepsakes, wedding anniversary gifts & gold gold script frames with luxury gift packaging.',
  alternates: {
    canonical: 'https://abhigifts.com/customized-gifts-dilsukhnagar',
  },
  openGraph: {
    title: 'Customized Gifts in Dilsukhnagar | Personalized Photo Gifts Hyderabad',
    description: "Looking for thoughtful personalized gifts in Dilsukhnagar? Custom acrylic frames, LED keepsakes, and heirloom gifts from Abhi's Gifts.",
    url: 'https://abhigifts.com/customized-gifts-dilsukhnagar',
  },
};

export default function CustomizedGiftsDilsukhnagarPage() {
  const allProducts = getAllProducts();
  const relevantProducts = allProducts.filter(
    (p) => p.categorySlug.includes('couple') || p.categorySlug.includes('family') || p.tags.some((t) => t.includes('gift') || t.includes('heirloom') || t.includes('vow'))
  );

  return (
    <LocalLandingPageView
      slug="customized-gifts-dilsukhnagar"
      keyword="Customized Gifts in Dilsukhnagar"
      h1Title="Customized Gifts in Dilsukhnagar — Meaningful Personalized Keepsakes"
      subtitle="Celebrate life's most precious milestones with customized gifts in Dilsukhnagar from Abhi's Gifts. From personalized wedding vow acrylic plaques and LED night-glow frames to gold foil surname heirlooms, give a gift that shines forever."
      locationName="Dilsukhnagar, Hyderabad"
      metaDescription="Order customized gifts in Dilsukhnagar! Personalized wedding keepsakes, couple acrylic frames, and gold foil photo plaques with luxury gift box packaging."
      introParagraphs={[
        "Finding a memorable, high-quality gift for weddings, anniversaries, housewarmings, or birthdays in Dilsukhnagar used to mean settling for generic mugs, cushions, or ordinary printed frames. Abhi's Gifts reimagined personalized gifting by merging museum-grade crystal acrylic craftsmanship with emotional storytelling and luxury packaging.",
        "Every customized gift crafted at our Dilsukhnagar workshop can be personalized with couple names, wedding dates, customized vows, special anniversary messages, or sacred Sanskrit shlokas rendered in genuine gold foil. Arrives sealed with a gold satin ribbon and certificate of artisanal authenticity—ready to bring tears of joy to your loved ones.",
      ]}
      whyChoosePoints={[
        {
          title: 'gold foil Personalization',
          desc: 'Add names, dates, or wedding vows in delicate 24-karat gold leaf detailing that shimmers as ambient room light reflects off the acrylic.',
        },
        {
          title: 'Ready-to-Gift Luxury Packaging',
          desc: 'Delivered in reinforced 5-layer honeycomb presentation boxes sealed with gold satin ribbon and protective micro-fiber polishing cloths.',
        },
        {
          title: 'Zero Last-Minute Stress',
          desc: 'Express 24-hour turnaround for anniversary and birthday emergencies. Pick up directly near Dilsukhnagar Metro or get swift bike delivery.',
        },
      ]}
      products={relevantProducts}
      popularSizes={[
        { size: 'Circle Medallion (10" Dia)', idealFor: 'Romantic anniversary & newborn baby keepsakes', price: '₹1,799' },
        { size: 'Landscape Heirloom (12x18")', idealFor: 'Personalized family surname crest with gold gold script', price: '₹2,499' },
        { size: 'LED Night-Glow Keepsake (12x12")', idealFor: 'Bedside ambient night light for couples & weddings', price: '₹2,699' },
        { size: 'Luxury Diptych Pair (2-Frame Set)', idealFor: 'Sacred housewarming gifts & parents 25th anniversary', price: '₹3,799' },
      ]}
      faqs={[
        {
          question: 'What types of customized gifts can I order in Dilsukhnagar?',
          answer:
            'We create personalized acrylic photo frames, LED night-glow photo frames, circular medallion anniversary plaques, gold foil family crest heirlooms, and consecrated devotional wall art.',
        },
        {
          question: 'Can I add custom text, names, and wedding dates to the frame?',
          answer:
            'Yes! You can add couple names, dates, customized vows, or quotes in English, Telugu, or Hindi. Our designers layout the typography and share a digital mock on WhatsApp for your approval.',
        },
        {
          question: 'Do you provide gift packaging for orders in Dilsukhnagar?',
          answer:
            'Yes! Every customized gift includes premium presentation packaging sealed with gold satin ribbons, a personalized gift card, and microfiber cleaning cloth—ready for gifting directly.',
        },
        {
          question: 'Can you deliver a customized gift directly to the recipient in Hyderabad?',
          answer:
            'Yes, we deliver across all Hyderabad pin codes. We can also exclude billing invoices from the package and include your personalized handwritten greeting card message inside.',
        },
      ]}
    />
  );
}
