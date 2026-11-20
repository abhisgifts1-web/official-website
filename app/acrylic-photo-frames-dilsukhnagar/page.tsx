import React from 'react';
import { Metadata } from 'next';
import LocalLandingPageView from '@/components/seo/LocalLandingPageView';
import { getAllProducts } from '@/lib/store';

export const metadata: Metadata = {
  title: "5MM Acrylic Photo Frames Dilsukhnagar | Direct UV Printing — Abhi's Gifts",
  description:
    'Best 5MM acrylic photo frames in Dilsukhnagar. Manufactured with premium 5MM crystal clear acrylic, precision square-cut edges & metal installation studs included. Order with WhatsApp proof.',
  alternates: {
    canonical: 'https://abhigifts.com/acrylic-photo-frames-dilsukhnagar',
  },
  openGraph: {
    title: "5MM Acrylic Photo Frames Dilsukhnagar | Direct UV Printing — Abhi's Gifts",
    description: 'Factory-direct 5MM acrylic photo frames in Dilsukhnagar, Hyderabad. Advanced Direct UV printing, precision square-cut edges & metal mounting studs included.',
    url: 'https://abhigifts.com/acrylic-photo-frames-dilsukhnagar',
  },
};

export default function AcrylicPhotoFramesDilsukhnagarPage() {
  const allProducts = getAllProducts();
  const relevantProducts = allProducts.filter(
    (p) => !p.hasLedBacklight && (p.categorySlug.includes('custom') || p.categorySlug.includes('acrylic') || p.shape === 'portrait' || p.shape === 'square')
  );

  return (
    <LocalLandingPageView
      slug="acrylic-photo-frames-dilsukhnagar"
      keyword="Acrylic Photo Frames Dilsukhnagar"
      h1Title="5MM Acrylic Photo Frames Dilsukhnagar — Premium Crystal Clear Acrylic"
      subtitle="Upgrade to modern, frameless 5MM crystal clear acrylic photo frames in Dilsukhnagar. Handcrafted with 5MM premium acrylic, advanced Direct UV printing on acrylic surface, precision square-cut edges, and metal installation studs included."
      locationName="Dilsukhnagar, Hyderabad"
      metaDescription="Looking for 5MM acrylic photo frames in Dilsukhnagar? Abhi's Gifts crafts 5MM crystal clear acrylic photo frames with precision square-cut edges and metal installation studs included."
      introParagraphs={[
        "Modern home interiors demand sleek, frameless aesthetics that let the artwork and memories speak for themselves. At Abhi's Gifts in Dilsukhnagar, our acrylic photo frames are engineered from imported premium high-density cast acrylic that offers 99.2% optical transparency—surpassing standard window glass while being 17 times stronger and completely shatterproof.",
        "We employ industrial-grade high-definition flatbed UV printing that cures microscopic ink droplets directly onto the acrylic substrate. The result is ultra-deep blacks, vibrant lifelike skin tones, and specular reflections that give photos an astonishing 3D depth effect. Whether for wedding vows, vacation memories, or corporate milestones, our Dilsukhnagar workshop delivers uncompromising quality.",
      ]}
      whyChoosePoints={[
        {
          title: 'precision CNC Edge Beveling',
          desc: 'Each acrylic frame edge is cut and polished with precision CNC diamond bits, resulting in silky-smooth, crystal-clear light refraction on all four sides.',
        },
        {
          title: 'Invisible Floating Standoffs',
          desc: 'Supplied with solid brushed stainless steel standoffs that suspend the frame 1 inch away from your wall, casting elegant natural soft shadows.',
        },
        {
          title: 'UV protected 25+ Year Inks',
          desc: 'Archival Japanese UV pigments resistant to ambient moisture, humidity, and sunlight yellowing, ensuring your memories stay pristine for decades.',
        },
      ]}
      products={relevantProducts}
      popularSizes={[
        { size: '8x12 inches (A4)', idealFor: 'Individual portraits & compact desk displays', price: '₹1,499' },
        { size: '12x18 inches', idealFor: 'Wedding portraits, couple vows & hallway walls', price: '₹2,299' },
        { size: '16x24 inches', idealFor: 'Family milestones & living room gallery walls', price: '₹3,199' },
        { size: '20x30 inches', idealFor: 'Statement master bedroom & dining room feature art', price: '₹4,499' },
      ]}
      faqs={[
        {
          question: 'Why should I choose acrylic photo frames over traditional glass frames in Dilsukhnagar?',
          answer:
            'Acrylic frames offer superior 99.2% optical clarity without green-tint distortion, are completely shatterproof (safe around kids), 50% lighter than glass, and feature modern frameless floating mounts that suit contemporary interiors.',
        },
        {
          question: 'What acrylic sheet thickness do you use at your Dilsukhnagar workshop?',
          answer:
            'We strictly use premium and 5mm high-density imported virgin cast acrylic. We never use cheap 2mm or 3mm extruded sheets that bend, warp, or scratch easily.',
        },
        {
          question: 'Can I upload a phone photo for acrylic printing?',
          answer:
            'Yes! You can share your photo via WhatsApp or upload on our site. Our graphic artisans enhance DPI, remove compression artifacts, adjust brightness and send you a 1:1 proof before manufacturing in Dilsukhnagar.',
        },
        {
          question: 'How fast can I get an acrylic photo frame in Dilsukhnagar?',
          answer:
            'Standard turnaround is 24 to 48 hours. For urgent occasions, same-day express crafting and direct store pickup is available at our Dilsukhnagar workshop.',
        },
      ]}
    />
  );
}
