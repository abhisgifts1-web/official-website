import React from 'react';
import { Metadata } from 'next';
import LocalLandingPageView from '@/components/seo/LocalLandingPageView';
import { getAllProducts } from '@/lib/store';

export const metadata: Metadata = {
  title: "Acrylic Photo Frames in Hyderabad | 4mm Crystal Acrylic Art — Abhi's Gifts",
  description:
    'Best acrylic photo frames in Hyderabad. Handcrafted 4mm cast acrylic with diamond CNC beveled edges, invisible floating mounts & crystal clarity. Express delivery across Hyderabad & Telangana.',
  alternates: {
    canonical: 'https://abhigifts.com/acrylic-photo-frames-hyderabad',
  },
  openGraph: {
    title: 'Acrylic Photo Frames in Hyderabad | 4mm Crystal Acrylic Art',
    description: 'Looking for high-end acrylic photo frames in Hyderabad? Direct manufacturing, custom sizes, diamond-polished bevels & free doorstep delivery.',
    url: 'https://abhigifts.com/acrylic-photo-frames-hyderabad',
  },
};

export default function AcrylicPhotoFramesHyderabadPage() {
  const allProducts = getAllProducts();
  const relevantProducts = allProducts.filter(
    (p) => p.categorySlug.includes('custom') || p.categorySlug.includes('acrylic') || p.tags.some((t) => t.includes('acrylic') || t.includes('frame'))
  );

  return (
    <LocalLandingPageView
      slug="acrylic-photo-frames-hyderabad"
      keyword="Acrylic Photo Frames in Hyderabad"
      h1Title="Acrylic Photo Frames in Hyderabad — Premium 4mm Crystal Cast Frames"
      subtitle="Discover Hyderabad's highest-rated manufacturer of museum-grade 4mm cast acrylic photo frames. Crafted with diamond CNC beveled edges, 99.2% optical crystalline clarity, and heavy-duty floating stainless steel standoffs. Perfect for modern living rooms, villas, and apartments across Hyderabad."
      locationName="Hyderabad & Secunderabad"
      metaDescription="Shop custom acrylic photo frames in Hyderabad! Direct manufacturer prices, diamond-polished edges, same-day WhatsApp proofing & safe pan-Hyderabad delivery."
      introParagraphs={[
        "As Hyderabad's architectural and interior design landscape evolves with contemporary high-rises and luxury villas across Gachibowli, Jubilee Hills, Madhapur, and Banjara Hills, traditional bulky wooden and glass photo frames are being rapidly replaced by frameless acrylic photo frames. At Abhi's Gifts, we bring factory-direct precision to every home in Hyderabad.",
        "Engineered with 4mm imported cast acrylic (not brittle glass or flimsy extruded plastic), our frames produce an immersive 'floating' visual experience. Photorealistic 1200 DPI UV flatbed printing renders vibrant skin tones, high dynamic range landscapes, and intricate details that look backlit even without electric lighting.",
      ]}
      whyChoosePoints={[
        {
          title: 'Direct Hyderabad Manufacturer',
          desc: 'Save 40-50% compared to third-party retail frame shops. Manufactured in-house with state-of-the-art flatbed UV and CNC laser cutters.',
        },
        {
          title: '100% Transit Safe Replacement',
          desc: 'Shipped in heavy-duty 5-layer wood-reinforced packaging. In the rare event of transit damage, we dispatch a fresh reprint immediately for free.',
        },
        {
          title: 'All Hyderabad Neighborhoods Served',
          desc: 'Fast express courier and bike delivery across Banjara Hills, Jubilee Hills, Madhapur, Gachibowli, Kukatpally, Dilsukhnagar, and Secunderabad.',
        },
      ]}
      products={relevantProducts}
      popularSizes={[
        { size: '12x18 inches (Standard)', idealFor: 'Individual portraits, couple milestones & hallways', price: '₹2,299' },
        { size: '18x24 inches (Medium)', idealFor: 'Living room gallery walls & family vacation memories', price: '₹3,499' },
        { size: '24x36 inches (Large)', idealFor: 'Master bedroom bed backdrops & drawing room focal points', price: '₹5,499' },
        { size: '36x48 inches (Gallery)', idealFor: 'Luxury duplex staircases, villa double-height walls', price: '₹8,999' },
      ]}
      faqs={[
        {
          question: 'Where can I buy acrylic photo frames in Hyderabad?',
          answer:
            'You can order online directly from Abhi\'s Gifts (abhigifts.com) with doorstep delivery across Hyderabad, or visit our central studio in Dilsukhnagar near the Metro Station to see physical material samples.',
        },
        {
          question: 'How do acrylic photo frames compare to traditional glass photo frames in Hyderabad?',
          answer:
            'Acrylic photo frames provide 99.2% optical transparency without green-edge tinting, are 100% shatterproof, half the weight of glass, moisture-resistant, and feature modern diamond-beveled frameless edges that float off the wall.',
        },
        {
          question: 'What is the delivery time for acrylic photo frames in Hyderabad?',
          answer:
            'Orders across Hyderabad are typically manufactured, printed, and dispatched within 24 to 48 hours following your WhatsApp 1:1 proof approval. Same-day express dispatch is available for urgent requirements.',
        },
        {
          question: 'How are acrylic photo frames mounted on the wall?',
          answer:
            'Every acrylic frame includes solid brushed stainless steel standoffs, wall anchors, and mounting screws that create an elegant 1-inch floating separation from your wall.',
        },
      ]}
    />
  );
}
