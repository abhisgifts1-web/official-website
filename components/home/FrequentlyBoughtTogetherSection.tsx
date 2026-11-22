'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Plus,
  ShoppingBag,
  CheckCircle2,
  Tag,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface BundleProduct {
  productId: string;
  slug: string;
  title: string;
  image: string;
  size: string;
  finish: string;
  lighting: string;
  price: number;
  mrp: number;
}

interface BundleDeal {
  id: string;
  title: string;
  badge: string;
  description: string;
  savings: number;
  productA: BundleProduct;
  productB: BundleProduct;
}

const BUNDLE_DEALS: BundleDeal[] = [
  {
    id: 'bundle-duo',
    title: 'The Signature Illuminated & Shimmer Living Room Duo',
    badge: 'Most Popular Bundle',
    description: 'Combine an ambient Cool White LED Backlit frame for your central feature wall with a radiant liquid gold shimmer frame for your console.',
    savings: 999,
    productA: {
      productId: 'prod-custom-led-backlit',
      slug: 'custom-led-backlit-acrylic-photo-frame',
      title: 'Custom LED Backlit Night-Glow Frame',
      image: '/images/mockups/custom-led-backlit-acrylic-photo-frame/primary-square.jpg',
      size: '1.9 sq.ft (14" × 20")',
      finish: '5MM Cast Acrylic Shield',
      lighting: 'Cool White Ambient LED Halo',
      price: 4199,
      mrp: 7999,
    },
    productB: {
      productId: 'prod-liquid-gold-glitter',
      slug: 'enchanted-liquid-gold-glitter-acrylic-photo-frame',
      title: 'Enchanted Liquid Gold Shimmer Glitter Frame',
      image: '/images/mockups/enchanted-liquid-gold-glitter-acrylic-photo-frame/primary-square.jpg',
      size: '1.0 sq.ft (10" × 14")',
      finish: 'Floating Liquid Gold Glitter',
      lighting: 'No Lighting (Pure Art)',
      price: 2499,
      mrp: 4999,
    },
  },
  {
    id: 'bundle-wedding',
    title: 'The Wedding Keepsake & Milestone Duo',
    badge: 'Perfect Anniversary Gift',
    description: 'A grand wedding vows keepsake frame paired with a luxury crystal milestone plaque with diamond-beveled edges.',
    savings: 999,
    productA: {
      productId: 'prod-couple-vows',
      slug: 'custom-couple-wedding-vows-acrylic-keepsake-frame',
      title: 'Custom Couple Wedding Vows Keepsake Frame',
      image: '/images/mockups/custom-couple-wedding-vows-acrylic-keepsake-frame/primary-square.jpg',
      size: '1.9 sq.ft (14" × 20")',
      finish: '5MM Beveled Cast Acrylic',
      lighting: 'No Lighting (Pure Art)',
      price: 4199,
      mrp: 7999,
    },
    productB: {
      productId: 'prod-milestone-keepsake',
      slug: 'luxury-beveled-floating-border-acrylic-masterpiece-frame',
      title: 'Personalized Luxury Milestone Keepsake Plaque',
      image: '/images/mockups/luxury-beveled-floating-border-acrylic-masterpiece-frame/primary-square.jpg',
      size: '1.0 sq.ft (10" × 14")',
      finish: 'Floating Border Crystal Plaque',
      lighting: 'No Lighting (Pure Art)',
      price: 2499,
      mrp: 4999,
    },
  },
  {
    id: 'bundle-mandir',
    title: 'Sacred Mandir Sanctum Blessing Set',
    badge: 'Auspicious Gruhapravesam',
    description: 'Tirupati Balaji 3D LED backlighting paired with Lord Ganesha Vighnaharta divine art for double domestic prosperity.',
    savings: 1293,
    productA: {
      productId: 'prod-balaji-led',
      slug: 'tirupati-balaji-divine-led-backlit-acrylic-wall-art',
      title: 'Tirupati Balaji 3D LED Divine Wall Art',
      image: '/images/mockups/tirupati-balaji-divine-led-backlit-acrylic-wall-art/primary-square.jpg',
      size: '3.3 sq.ft (18" × 26")',
      finish: 'Multi-Layer Gold Acrylic',
      lighting: 'Divine Backlit LED Sanctum',
      price: 5173,
      mrp: 9998,
    },
    productB: {
      productId: 'prod-custom-photo',
      slug: 'custom-personalised-photo-acrylic-wall-frame',
      title: 'Custom Personalised High-Definition Acrylic Frame',
      image: '/images/mockups/round-diamond-beveled-crystal-acrylic-photo-frame/primary-square.jpg',
      size: '1.5 sq.ft (12" × 18")',
      finish: '1200 DPI Optical Clarity Shield',
      lighting: 'No Lighting (Pure Art)',
      price: 3449,
      mrp: 6799,
    },
  },
];

export default function FrequentlyBoughtTogetherSection() {
  const { addToCart, openCart } = useCart();
  const [selectedBundleId, setSelectedBundleId] = useState<string>(BUNDLE_DEALS[0].id);
  const [addedSuccessId, setAddedSuccessId] = useState<string | null>(null);

  const activeBundle = BUNDLE_DEALS.find((b) => b.id === selectedBundleId) || BUNDLE_DEALS[0];

  const regularCombined = activeBundle.productA.price + activeBundle.productB.price;
  const bundlePrice = regularCombined - activeBundle.savings;
  const regularMrpCombined = activeBundle.productA.mrp + activeBundle.productB.mrp;

  const handleAddBundleToCart = () => {
    // Add product A without opening drawer
    addToCart(
      {
        productId: activeBundle.productA.productId,
        slug: activeBundle.productA.slug,
        title: activeBundle.productA.title,
        image: activeBundle.productA.image,
        variantId: `${activeBundle.productA.productId}-bundle`,
        size: activeBundle.productA.size,
        finish: activeBundle.productA.finish,
        lighting: activeBundle.productA.lighting,
        unitPrice: activeBundle.productA.price,
        unitMrp: activeBundle.productA.mrp,
        quantity: 1,
      },
      false
    );

    // Add product B and open the cart drawer
    addToCart(
      {
        productId: activeBundle.productB.productId,
        slug: activeBundle.productB.slug,
        title: activeBundle.productB.title,
        image: activeBundle.productB.image,
        variantId: `${activeBundle.productB.productId}-bundle`,
        size: activeBundle.productB.size,
        finish: activeBundle.productB.finish,
        lighting: activeBundle.productB.lighting,
        unitPrice: activeBundle.productB.price - activeBundle.savings, // Apply bundle discount
        unitMrp: activeBundle.productB.mrp,
        quantity: 1,
      },
      true
    );

    setAddedSuccessId(activeBundle.id);
    setTimeout(() => setAddedSuccessId(null), 3000);
  };

  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12">
      <div className="bg-gradient-to-b from-stone-50 via-amber-50/20 to-stone-50 rounded-3xl p-6 sm:p-10 lg:p-12 border border-stone-200/90 shadow-xs relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-stone-200 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-amber-900 bg-amber-100/80 border border-amber-300/70 shadow-2xs mb-2">
              <Tag className="w-3.5 h-3.5 text-amber-700" />
              <span>Bundle &amp; Save 15%</span>
            </div>

            <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-900 tracking-tight">
              Frequently Bought Together
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 mt-1.5 font-sans max-w-xl">
              Curated paired collections matched by our Hyderabad interior stylists with instant bundle savings.
            </p>
          </div>

          {/* Bundle Switcher Tabs */}
          <div className="flex flex-wrap gap-2 self-start md:self-end">
            {BUNDLE_DEALS.map((deal) => (
              <button
                key={deal.id}
                type="button"
                onClick={() => setSelectedBundleId(deal.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedBundleId === deal.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:text-stone-950 border border-stone-200'
                }`}
              >
                {deal.badge}
              </button>
            ))}
          </div>
        </div>

        {/* Bundle Content Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Products Pairing Visual (7 cols) */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            {/* Product A */}
            <div className="w-full sm:w-1/2 bg-stone-50 rounded-xl p-4 border border-stone-200/90 flex flex-col justify-between">
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-stone-100 mb-3">
                <Image
                  src={activeBundle.productA.image}
                  alt={activeBundle.productA.title}
                  fill
                  className="object-cover"
                  sizes="260px"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/75 text-white backdrop-blur-md">
                  Item 1
                </span>
              </div>
              <div>
                <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900 line-clamp-1">
                  {activeBundle.productA.title}
                </h4>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Size: <strong className="text-stone-800">{activeBundle.productA.size}</strong>
                </p>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="font-serif font-bold text-sm text-stone-900">
                    ₹{activeBundle.productA.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-stone-400 line-through">
                    ₹{activeBundle.productA.mrp.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Plus Icon Divider */}
            <div className="w-9 h-9 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 shrink-0 shadow-xs">
              <Plus className="w-5 h-5" />
            </div>

            {/* Product B */}
            <div className="w-full sm:w-1/2 bg-stone-50 rounded-xl p-4 border border-stone-200/90 flex flex-col justify-between">
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-stone-100 mb-3">
                <Image
                  src={activeBundle.productB.image}
                  alt={activeBundle.productB.title}
                  fill
                  className="object-cover"
                  sizes="260px"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/75 text-white backdrop-blur-md">
                  Item 2
                </span>
              </div>
              <div>
                <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900 line-clamp-1">
                  {activeBundle.productB.title}
                </h4>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Size: <strong className="text-stone-800">{activeBundle.productB.size}</strong>
                </p>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="font-serif font-bold text-sm text-stone-900">
                    ₹{activeBundle.productB.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-stone-400 line-through">
                    ₹{activeBundle.productB.mrp.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Add Bundle Action (5 cols) */}
          <div className="lg:col-span-5 bg-amber-50/70 rounded-xl p-6 border border-amber-200/90 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-200/80 text-amber-900">
                  {activeBundle.badge}
                </span>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Instant ₹{activeBundle.savings} Off
                </span>
              </div>

              <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 leading-snug">
                {activeBundle.title}
              </h3>

              <p className="text-xs text-stone-600 mt-1 font-sans leading-relaxed">
                {activeBundle.description}
              </p>
            </div>

            {/* Price Calculations */}
            <div className="pt-2 border-t border-amber-200 space-y-1.5 text-xs text-stone-700">
              <div className="flex justify-between">
                <span>Combined Price:</span>
                <span className="line-through text-stone-400">
                  ₹{regularCombined.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-emerald-800 font-semibold">
                <span>Bundle Savings:</span>
                <span>-₹{activeBundle.savings.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-baseline pt-1 border-t border-amber-200 font-bold text-sm sm:text-base text-stone-950">
                <span>Bundle Total:</span>
                <span className="font-serif text-xl sm:text-2xl text-amber-950">
                  ₹{bundlePrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleAddBundleToCart}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#FEE815] hover:bg-[#FFF04B] text-black font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-102 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-black" />
                <span>
                  {addedSuccessId === activeBundle.id
                    ? '✓ Both Items Added to Cart!'
                    : `Add Both Items to Cart (₹${bundlePrice.toLocaleString('en-IN')})`}
                </span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Free Safe Wooden Crate Packaging &amp; Wall Hardware Included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
