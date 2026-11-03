import React from 'react';
import { Metadata } from 'next';
import CustomizerStudio from '@/components/customise/CustomizerStudio';

export const metadata: Metadata = {
  title: 'Custom Acrylic Photo Frames & LED Backlit Designer | Abhi\'s Gifts',
  description:
    'Design custom acrylic photo frames, LED backlit night-glow frames, personalized wedding & family wall art at Abhi\'s Gifts. Upload your photo for instant 3D wall preview. Handcrafted in Hyderabad with express delivery.',
  keywords: [
    'Custom Acrylic Photo Frames',
    'LED Backlit Photo Frames',
    'Personalized Photo Frames',
    'Customized Photo Frames',
    'Acrylic Wall Photo Frames',
    'Wedding Photo Frames',
    'Family Photo Frames',
    'LED Night Glow Frames',
    'Premium Acrylic Photo Frames',
    'Photo Gifts Hyderabad',
    'Abhis Gifts Customizer',
  ],
  alternates: {
    canonical: 'https://abhisgifts.com/customise',
  },
  openGraph: {
    title: 'Custom Photo Frame Designer & 3D Wall Preview | Abhi\'s Gifts',
    description:
      'Turn your precious memories into timeless art. Create personalized acrylic photo frames, LED backlit frames, and floating wall displays with your own photographs.',
    url: 'https://abhisgifts.com/customise',
    siteName: "Abhi's Gifts",
    images: [
      {
        url: 'https://abhisgifts.com/images/wall-decor/products/custom/custom-led-photo-frame.jpg',
        width: 1200,
        height: 630,
        alt: "Abhi's Gifts Custom Acrylic Photo Frames Designer",
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Acrylic & LED Backlit Photo Frames | Abhi\'s Gifts',
    description:
      'Create personalized acrylic photo frames and LED backlit displays using your favorite photographs. 1:1 WhatsApp proof approval.',
    images: ['https://abhisgifts.com/images/wall-decor/products/custom/custom-led-photo-frame.jpg'],
  },
};

export default function CustomisePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Custom Acrylic & LED Backlit Photo Frame Designer',
    image: 'https://abhisgifts.com/images/wall-decor/products/custom/custom-led-photo-frame.jpg',
    description:
      'Personalized custom acrylic photo frames with optional warm LED illumination, beveled edges, and floating standoff mounts.',
    brand: {
      '@type': 'Brand',
      name: "Abhi's Gifts",
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: '999',
      highPrice: '5899',
      offerCount: '24',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-[#121212] min-h-screen">
        <CustomizerStudio />
      </div>
    </>
  );
}
