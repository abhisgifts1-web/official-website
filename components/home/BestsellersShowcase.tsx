'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Flame, Layers, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { INITIAL_PRODUCTS } from '@/lib/data/mockProducts';
import ProductCard from '@/components/product/ProductCard';

type FilterType = 'all' | 'led' | 'deities' | 'vastu';

const ITEMS_PER_PAGE = 5;

export default function BestsellersShowcase() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);

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

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 lg:py-10">
      {/* Header with Title and Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#2D2D2D] gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-[#FFFFFF] bg-[#181818] border border-[#EAB308] px-3.5 py-1 rounded-full shadow-2xs mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#EAB308]" />
            <span>Customer Favorites • Handcrafted Heirlooms</span>
          </div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#FFFFFF] tracking-tight">
            THE MOST LOVED DIVINE MASTERPIECES
          </h2>
          <p className="text-xs sm:text-sm text-[#D1D5DB] mt-1.5 max-w-2xl font-sans leading-relaxed">
            Curated selection of our most revered sanctum heirlooms and collector favorites, gracing over 10,000+ homes and pooja mandirs across India.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto min-w-0 max-w-full pb-1 sm:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => handleFilterChange('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#511B2A] text-[#FFFFFF] border border-[#EAB308] shadow-xs'
                : 'bg-[#181818] text-[#D1D5DB] border border-[#2D2D2D] hover:border-[#EAB308]'
            }`}
          >
            All Masterpieces
          </button>
          <button
            type="button"
            onClick={() => handleFilterChange('led')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer ${
              activeFilter === 'led'
                ? 'bg-[#511B2A] text-[#FFFFFF] border border-[#EAB308] shadow-xs'
                : 'bg-[#181818] text-[#D1D5DB] border border-[#2D2D2D] hover:border-[#EAB308]'
            }`}
          >
            <Flame className="w-3 h-3 text-[#EAB308]" />
            <span>LED Backlit</span>
          </button>
          <button
            type="button"
            onClick={() => handleFilterChange('deities')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === 'deities'
                ? 'bg-[#511B2A] text-[#FFFFFF] border border-[#EAB308] shadow-xs'
                : 'bg-[#181818] text-[#D1D5DB] border border-[#2D2D2D] hover:border-[#EAB308]'
            }`}
          >
            Sacred Deities
          </button>
          <button
            type="button"
            onClick={() => handleFilterChange('vastu')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === 'vastu'
                ? 'bg-[#511B2A] text-[#FFFFFF] border border-[#EAB308] shadow-xs'
                : 'bg-[#181818] text-[#D1D5DB] border border-[#2D2D2D] hover:border-[#EAB308]'
            }`}
          >
            Vastu &amp; Modern
          </button>
        </div>
      </div>

      {/* Responsive Grid of Real Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Interactive Page Navigation Controls (Page 1 / Page 2) */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              currentPage === 1
                ? 'bg-[#222222] text-[#8C7A70] cursor-not-allowed opacity-60'
                : 'bg-[#181818] text-[#FFFFFF] border border-[#2D2D2D] hover:border-[#EAB308] shadow-xs'
            }`}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4 text-[#EAB308]" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            const isActive = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => goToPage(pageNum)}
                className={`w-9 h-9 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                  isActive
                    ? 'bg-[#511B2A] text-[#FFFFFF] border border-[#EAB308] shadow-xs scale-105'
                    : 'bg-[#181818] text-[#D1D5DB] border border-[#2D2D2D] hover:border-[#EAB308]'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              currentPage === totalPages
                ? 'bg-[#222222] text-[#8C7A70] cursor-not-allowed opacity-60'
                : 'bg-[#181818] text-[#FFFFFF] border border-[#2D2D2D] hover:border-[#EAB308] shadow-xs'
            }`}
            aria-label="Next page"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4 text-[#EAB308]" />
          </button>
        </div>
      )}

      {/* View All Collection CTA Button */}
      <div className="mt-8 sm:mt-10 text-center">
        <Link
          href="/shop"
          className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#121212] via-[#641D30] to-[#121212] hover:from-[#3D1420] hover:to-[#121212] text-[#FFFFFF] font-bold text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-md border border-[#EAB308]/80 transition-all hover:scale-[1.02] tracking-wider uppercase group"
        >
          <Sparkles className="w-4 h-4 text-[#EAB308]" />
          <span>View All Divine Masterpieces</span>
          <ArrowRight className="w-4 h-4 text-[#EAB308] group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
