import React from 'react';
import { Metadata } from 'next';
import LocalLandingPageView from '@/components/seo/LocalLandingPageView';
import { getAllProducts } from '@/lib/store';

export const metadata: Metadata = {
  title: "LED Photo Frames in Hyderabad | Cool White LED Halo Frames — Abhi's Gifts",
  description:
    'Best LED photo frames in Hyderabad. Imported clear virgin cast acrylic, advanced direct UV printing, Rose Gold aluminium side frame, and elegant Cool White halo glow with external power adapter included.',
  alternates: {
    canonical: 'https://abhigifts.com/led-photo-frames-hyderabad',
  },
  openGraph: {
    title: 'LED Photo Frames in Hyderabad | Cool White LED Halo Acrylic Frames',
    description: 'Custom illuminated LED photo frames and sacred backlit wall art in Hyderabad. Handcrafted in Dilsukhnagar with Cool White halo glow and Rose Gold aluminium border.',
    url: 'https://abhigifts.com/led-photo-frames-hyderabad',
  },
};

export default function LedPhotoFramesHyderabadPage() {
  const allProducts = getAllProducts();
  const relevantProducts = allProducts.filter(
    (p) => p.hasLedBacklight || p.categorySlug.includes('led') || p.tags.some((t) => t.includes('led') || t.includes('backlit'))
  );

  return (
    <LocalLandingPageView
      slug="led-photo-frames-hyderabad"
      keyword="LED Photo Frames in Hyderabad"
      h1Title="LED Photo Frames in Hyderabad — Cool White Ambient Halo Art"
      subtitle="Transform your family portraits, wedding vows, and sacred pooja mandir deities into breathtaking illuminated nocturnal art. Abhi's Gifts manufactures premium LED photo frames in Hyderabad with Imported Clear Virgin Cast Acrylic, Direct UV Printing, Rose Gold Aluminium Side Frames, and external power adapters included."
      locationName="Hyderabad & Telangana"
      metaDescription="Looking for LED photo frames in Hyderabad? Discover Cool White halo backlit acrylic frames, custom photo night-glow frames, and devotional LED wall art from Abhi's Gifts."
      introParagraphs={[
        "Ambient lighting plays a vital role in creating tranquility and elegance in modern Indian homes. At Abhi's Gifts in Hyderabad, our custom LED photo frames combine imported clear virgin cast acrylic with integrated Cool White LED backlighting and a premium Rose Gold aluminium side frame. During the day, the frame appears as a crisp, luxurious wall art piece; at night, switching it on transforms it into a serene, illuminated focal point with an elegant halo glow.",
        "Whether you want an illuminated bedside frame with your wedding photograph, a radiant Tirupati Balaji or Shiva Adiyogi for your pooja mandir, or a dramatic living room centerpiece, our LED acrylic frames in Hyderabad feature hidden perimeter illumination with external power adapters and wall plugs and screws included.",
      ]}
      whyChoosePoints={[
        {
          title: 'Cool White Halo Glow',
          desc: 'Carefully engineered hidden perimeter LEDs cast an elegant Cool White halo glow around the artwork with beautiful ambient depth.',
        },
        {
          title: 'Direct UV Printing',
          desc: 'Artwork printed directly onto imported virgin cast acrylic surface using UV-curable inks for lifelong vibrant colours and sharp details.',
        },
        {
          title: 'External Power Adapter Included',
          desc: 'Every frame comes with an external power adapter and complete wall plugs and screws for convenient, safe installation.',
        },
      ]}
      products={relevantProducts}
      popularSizes={[
        { size: '12x12 inches (Square LED)', idealFor: 'Bedside ambient night lamp & couple anniversary portraits', price: '₹2,699' },
        { size: '16x24 inches (Vertical LED)', idealFor: 'Pooja mandir sanctums (Balaji, Shiva, Ganesha, Lakshmi)', price: '₹3,799' },
        { size: '20x30 inches (Grand LED)', idealFor: 'Living room sofa backdrop & luxury foyer entrances', price: '₹5,299' },
        { size: '24x36 inches (Masterpiece)', idealFor: 'Double-height feature walls & luxury apartment drawing rooms', price: '₹6,999' },
      ]}
      faqs={[
        {
          question: 'Do your LED photo frames produce heat or glare in bedrooms?',
          answer:
            'No. Our LED backlighting runs cool to the touch. The Cool White halo temperature is elegant and gentle—ideal as ambient wall illumination.',
        },
        {
          question: 'Can I order a custom photo with LED backlighting in Hyderabad?',
          answer:
            'Yes! You can upload any high-resolution photo on our customizer or WhatsApp us. We will prepare a 1:1 digital proof showing the exact Cool White LED illumination effect before building it.',
        },
        {
          question: 'What is included in the LED photo frame package?',
          answer:
            'Each LED frame comes fully assembled with the imported virgin cast acrylic artwork, Rose Gold aluminium side frame, integrated Cool White LED backlighting, external power adapter, wall plugs and screws.',
        },
        {
          question: 'Do you deliver LED photo frames across Hyderabad with damage protection?',
          answer:
            'Yes! All LED frames are secured inside 5-layer shockproof honeycomb wooden packaging. If any transit issue occurs, we send a brand-new replacement immediately at zero cost.',
        },
      ]}
    />
  );
}
