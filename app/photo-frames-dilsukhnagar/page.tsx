import React from 'react';
import { Metadata } from 'next';
import LocalLandingPageView from '@/components/seo/LocalLandingPageView';
import { getAllProducts } from '@/lib/store';

export const metadata: Metadata = {
  title: "Photo Frames in Dilsukhnagar | Photo Frame Shop Near Me — Abhi's Gifts",
  description:
    'Searching for the best photo frames in Dilsukhnagar or a photo frame shop near you? Abhi\'s Gifts offers custom acrylic frames, LED frames, wedding keepsakes & fast pickup near Dilsukhnagar Metro.',
  alternates: {
    canonical: 'https://abhigifts.com/photo-frames-dilsukhnagar',
  },
  openGraph: {
    title: 'Photo Frames in Dilsukhnagar | Photo Frame Shop Near Me',
    description: 'Custom acrylic photo frames, LED backlit frames & personalized gifts in Dilsukhnagar, Hyderabad. Visit our store or order online.',
    url: 'https://abhigifts.com/photo-frames-dilsukhnagar',
  },
};

export default function PhotoFramesDilsukhnagarPage() {
  const allProducts = getAllProducts();
  const relevantProducts = allProducts.filter(
    (p) => p.categorySlug.includes('custom') || p.categorySlug.includes('led') || p.tags.some((t) => t.includes('frame'))
  );

  return (
    <LocalLandingPageView
      slug="photo-frames-dilsukhnagar"
      keyword="Photo Frames in Dilsukhnagar"
      h1Title="Photo Frames in Dilsukhnagar — Abhi's Gifts"
      subtitle="Looking for a reliable photo frame shop near you in Dilsukhnagar? Abhi's Gifts brings you museum-grade cast acrylic photo frames, LED backlit frames, and personalized family heirlooms with same-day digital WhatsApp preview and direct workshop pickup."
      locationName="Dilsukhnagar, Hyderabad"
      metaDescription="Looking for photo frames in Dilsukhnagar? Visit Abhi's Gifts near Dilsukhnagar Metro Station for custom acrylic frames, LED frames, and wedding keepsakes."
      introParagraphs={[
        "Nestled right in the commercial heart of Dilsukhnagar near the Metro Station, Abhi's Gifts has been the go-to destination for families, newlyweds, and interior decor enthusiasts seeking premium photo frames in Dilsukhnagar. Unlike generic framing shops that use fragile glass and cheap synthetic plastic moldings, our workshop specializes in premium high-density imported cast acrylic that is 100% shatterproof, optically crystalline, and precision beveled.",
        "Whether you are framing a child's milestone birthday, a sacred Tirupati Balaji or Ganesha pooja room portrait, an anniversary keepsake, or a prestigious corporate award, we provide bespoke sizing from compact 8x10 inch desks to grand 6x4 foot living room feature walls. Customers in Dilsukhnagar, Kothapet, Chaitanyapuri, and Malakpet can easily walk in to check physical samples or order online for same-day delivery.",
      ]}
      whyChoosePoints={[
        {
          title: 'Prime Dilsukhnagar Location',
          desc: 'Conveniently located near Dilsukhnagar Metro Station on the main road for easy walk-in visits, consultations, and quick order pickups.',
        },
        {
          title: 'Shatterproof cast acrylic',
          desc: 'Zero dangerous fragile glass. Our museum-grade acrylic is safe for homes with children and pets, and guaranteed never to yellow or crack.',
        },
        {
          title: '1:1 WhatsApp Proofing Before Print',
          desc: 'Our design team verifies resolution, optimizes contrast, crops proportions, and shares a 1:1 preview on WhatsApp for your sign-off before printing.',
        },
      ]}
      products={relevantProducts}
      popularSizes={[
        { size: '8x12 inches (A4)', idealFor: 'Bedside tables, study desks & intimate gifts', price: '₹1,499' },
        { size: '12x18 inches', idealFor: 'Individual portraits, couple milestones & mandir walls', price: '₹2,299' },
        { size: '18x24 inches', idealFor: 'Living room feature walls & family vacation keepsakes', price: '₹3,499' },
        { size: '24x36 inches (Grand)', idealFor: 'Master bedroom headboard & drawing room centerpieces', price: '₹5,499' },
      ]}
      faqs={[
        {
          question: 'Where is your photo frame shop located in Dilsukhnagar?',
          answer:
            'Our store and workshop is situated on Main Road, near Dilsukhnagar Metro Station, Hyderabad 500060. We are easily accessible from Kothapet, Malakpet, Chaitanyapuri, and LB Nagar with dedicated parking nearby.',
        },
        {
          question: 'Can I pick up my photo frame order directly from your Dilsukhnagar store?',
          answer:
            'Yes! You can choose direct store pickup at our Dilsukhnagar workshop once your order is crafted and inspected. Alternatively, we provide express local delivery directly to your doorstep across Hyderabad.',
        },
        {
          question: 'How do I search for a "photo frame shop near me" in Dilsukhnagar?',
          answer:
            'Abhi\'s Gifts is centrally located in Dilsukhnagar. If you are anywhere in Dilsukhnagar, Chaitanyapuri, Kothapet, or Saroornagar, our store is just minutes away. You can also send your photo on WhatsApp to +91 77802 69927 to get an instant digital proof without visiting.',
        },
        {
          question: 'Do you offer LED photo frames in Dilsukhnagar?',
          answer:
            'Yes, we manufacture LED backlit acrylic photo frames equipped with 12V low-voltage safety adapters and high-efficiency Epistar LEDs that create a gentle golden ambient halo around your photo.',
        },
      ]}
    />
  );
}
