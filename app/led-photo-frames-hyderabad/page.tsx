import React from 'react';
import { Metadata } from 'next';
import LocalLandingPageView from '@/components/seo/LocalLandingPageView';
import { getAllProducts } from '@/lib/store';

export const metadata: Metadata = {
  title: "LED Photo Frames in Hyderabad | warm Backlit Acrylic Frames — Abhi's Gifts",
  description:
    'Best LED photo frames in Hyderabad. Radiant warm night-glow illuminated acrylic frames for bedrooms, pooja rooms & living rooms. Low-voltage 12V adapter with BIS safety certification.',
  alternates: {
    canonical: 'https://abhigifts.com/led-photo-frames-hyderabad',
  },
  openGraph: {
    title: 'LED Photo Frames in Hyderabad | warm Backlit Acrylic Frames',
    description: 'Custom illuminated LED photo frames and sacred backlit wall art in Hyderabad. Handcrafted in Dilsukhnagar with warm golden glow.',
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
      h1Title="LED Photo Frames in Hyderabad — warm Ambient Backlit Art"
      subtitle="Transform your family portraits, wedding vows, and sacred pooja mandir deities into breathtaking illuminated nocturnal art. Abhi's Gifts manufactures premium LED photo frames in Hyderabad with concealed light-guides, high-efficiency Epistar LEDs, and safe 12V BIS certified power adapters."
      locationName="Hyderabad & Telangana"
      metaDescription="Looking for LED photo frames in Hyderabad? Discover warm backlit acrylic frames, custom photo night-glow frames, and devotional LED wall art from Abhi's Gifts."
      introParagraphs={[
        "Ambient lighting plays a vital role in creating tranquility and warmth in modern Indian homes. At Abhi's Gifts in Hyderabad, our custom LED photo frames combine optical cast acrylic with concealed high-density Epistar warm-white LED strips. During the day, the frame appears as a crisp, diamond-beveled luxury portrait; at night, flicking the switch transforms it into a serene, glowing golden sanctuary.",
        "Whether you want an illuminated bedside night-glow frame with your wedding photograph, a radiant Tirupati Balaji or Shiva Adiyogi for your pooja mandir, or a dramatic living room centerpiece, our LED acrylic frames in Hyderabad feature energy-efficient 12V low-voltage operation with zero heat generation and zero eye glare.",
      ]}
      whyChoosePoints={[
        {
          title: 'Concealed warm Glow',
          desc: 'Carefully engineered internal light-guide acrylic layers distribute illumination evenly without hotspots, shadows, or blinding glare.',
        },
        {
          title: 'high-efficiency Rated LEDs',
          desc: 'Equipped with commercial-grade Epistar SMD LEDs engineered for over 12+ years of continuous evening use with zero lumen degradation.',
        },
        {
          title: 'Safe 12V BIS Low Voltage',
          desc: 'Powered by a certified low-voltage 12V adapter with an inline switch and 2-meter braided power cord, safe around children and pooja diyas.',
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
            'No. Our 12V low-voltage LED drivers run cool to the touch even after 10 hours of continuous operation. The warm golden temperature is soft and soothing—ideal as a bedside night light.',
        },
        {
          question: 'Can I order a custom photo with LED backlighting in Hyderabad?',
          answer:
            'Yes! You can upload any high-resolution photo on our customizer or WhatsApp us. We will prepare a 1:1 backlit digital proof showing the exact LED illumination effect before building it.',
        },
        {
          question: 'What is included in the LED photo frame package?',
          answer:
            'Each LED frame comes fully assembled with the acrylic artwork, integrated warm Epistar LED strip, 12V BIS-certified power adapter, inline on/off toggle switch, wall mounting bracket, and rawl plugs.',
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
