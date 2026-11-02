'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Flame, Layers, Award } from 'lucide-react';
import { INITIAL_PRODUCTS } from '@/lib/data/mockProducts';
import ProductCard from '@/components/product/ProductCard';

type FilterType = 'all' | 'led' | 'deities' | 'vastu';

export default function BestsellersShowcase() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const bestsellerSlugs = useMemo(() => [
    'tirupati-balaji-divine-led-backlit-acrylic-wall-art',
    'seven-running-horses-vastu-gold-acrylic-wall-art',
    'radha-krishna-divine-flute-acrylic-wall-decor',
    'ayodhya-ram-janmabhoomi-mandir-3d-led-wall-decor',
    'adiyogi-lord-shiva-meditation-led-wall-decor',
    'lord-ganesha-auspicious-gold-leaf-acrylic-wall-art',
    'ashta-lakshmi-wealth-prosperity-acrylic-wall-decor',
    'shri-hanuman-chalisa-full-inscribed-led-acrylic-frame',
    'sacred-om-swastik-divine-acrylic-diptych-set-of-2',
    'golden-bodhi-tree-ginkgo-leaves-acrylic-wall-art',
  ], []);

  const allBestsellers = useMemo(() => {
    return bestsellerSlugs
      .map((slug) => INITIAL_PRODUCTS.find((p) => p.slug === slug))
      .filter((p): p is (typeof INITIAL_PRODUCTS)[0] => !!p);
  }, [bestsellerSlugs]);

  const [bestsellerProducts, setBestsellerProducts] = useState(allBestsellers);

  useEffect(() => {
    fetch('/api/products?bestseller=true')
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.products?.length) {
          const mapped = bestsellerSlugs
            .map((slug) => d.products.find((p: any) => p.slug === slug))
            .filter(Boolean);
          if (mapped.length > 0) {
            setBestsellerProducts(mapped);
          }
        }
      })
      .catch(() => {});
  }, [bestsellerSlugs]);

  const filteredProducts = useMemo(() => {
    switch (activeFilter) {
      case 'led':
        return bestsellerProducts.filter((p) => p.hasLedBacklight);
      case 'deities':
        return bestsellerProducts.filter((p) => p.deity || p.categorySlug.includes('devotional') || p.categorySlug.includes('lord'));
      case 'vastu':
        return bestsellerProducts.filter((p) => p.categorySlug.includes('abstract') || p.tags.includes('Vastu'));
      default:
        return bestsellerProducts;
    }
  }, [activeFilter, bestsellerProducts]);

  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 lg:py-10">
      {/* Header with Title and Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#E8D5BD] gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-[#511B2A] bg-white border border-[#D6AA55] px-3.5 py-1 rounded-full shadow-2xs mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D6AA55]" />
            <span>Customer Favorites • Handcrafted Heirlooms</span>
          </div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#511B2A] tracking-tight">
            THE MOST LOVED DIVINE MASTERPIECES
          </h2>
          <p className="text-xs sm:text-sm text-[#533C36] mt-1.5 max-w-2xl font-sans leading-relaxed">
            Curated selection of our most revered sanctum heirlooms and collector favorites, gracing over 10,000+ homes and pooja mandirs across India.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#511B2A] text-[#FFF7EC] border border-[#D6AA55] shadow-xs'
                : 'bg-white text-[#533C36] border border-[#E8D5BD] hover:border-[#D6AA55]'
            }`}
          >
            All Masterpieces
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('led')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer ${
              activeFilter === 'led'
                ? 'bg-[#511B2A] text-[#FFF7EC] border border-[#D6AA55] shadow-xs'
                : 'bg-white text-[#533C36] border border-[#E8D5BD] hover:border-[#D6AA55]'
            }`}
          >
            <Flame className="w-3 h-3 text-[#D6AA55]" />
            <span>LED Backlit</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('deities')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === 'deities'
                ? 'bg-[#511B2A] text-[#FFF7EC] border border-[#D6AA55] shadow-xs'
                : 'bg-white text-[#533C36] border border-[#E8D5BD] hover:border-[#D6AA55]'
            }`}
          >
            Sacred Deities
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('vastu')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === 'vastu'
                ? 'bg-[#511B2A] text-[#FFF7EC] border border-[#D6AA55] shadow-xs'
                : 'bg-white text-[#533C36] border border-[#E8D5BD] hover:border-[#D6AA55]'
            }`}
          >
            Vastu &amp; Modern
          </button>
        </div>
      </div>

      {/* Responsive Grid of Real Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* View All Collection CTA Button */}
      <div className="mt-8 sm:mt-10 text-center">
        <Link
          href="/shop"
          className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#511B2A] via-[#641D30] to-[#511B2A] hover:from-[#3D1420] hover:to-[#511B2A] text-[#FFF7EC] font-bold text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-md border border-[#D6AA55]/80 transition-all hover:scale-[1.02] tracking-wider uppercase group"
        >
          <Sparkles className="w-4 h-4 text-[#D6AA55]" />
          <span>View All Divine Masterpieces</span>
          <ArrowRight className="w-4 h-4 text-[#D6AA55] group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
