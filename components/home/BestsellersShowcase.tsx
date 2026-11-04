'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
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
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 pb-3 border-b border-stone-200 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-800">
            Customer Favorites
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight mt-0.5">
            Best-Selling Photo Frames
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl font-sans">
            Our most popular handcrafted acrylic and LED photo frames, created with museum-grade precision.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto min-w-0 max-w-full pb-1 sm:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => handleFilterChange('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-stone-900 text-white shadow-2xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            All Frames
          </button>
          <button
            type="button"
            onClick={() => handleFilterChange('led')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === 'led'
                ? 'bg-stone-900 text-white shadow-2xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            LED Backlit
          </button>
          <button
            type="button"
            onClick={() => handleFilterChange('deities')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === 'deities'
                ? 'bg-stone-900 text-white shadow-2xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Devotional Art
          </button>
          <button
            type="button"
            onClick={() => handleFilterChange('vastu')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === 'vastu'
                ? 'bg-stone-900 text-white shadow-2xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Vastu &amp; Keepsakes
          </button>
        </div>
      </div>

      {/* Responsive Grid of Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Page Navigation Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              currentPage === 1
                ? 'bg-stone-100 text-stone-400 cursor-not-allowed opacity-60'
                : 'bg-white text-stone-800 border border-stone-200 hover:bg-stone-50 shadow-2xs'
            }`}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-stone-600" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            const isActive = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => goToPage(pageNum)}
                className={`w-8 h-8 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center justify-center ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-2xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
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
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              currentPage === totalPages
                ? 'bg-stone-100 text-stone-400 cursor-not-allowed opacity-60'
                : 'bg-white text-stone-800 border border-stone-200 hover:bg-stone-50 shadow-2xs'
            }`}
            aria-label="Next page"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
          </button>
        </div>
      )}

      {/* View All Collection CTA Button */}
      <div className="mt-8 sm:mt-10 text-center">
        <Link
          href="/shop"
          className="inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-50 text-stone-900 font-semibold text-xs sm:text-sm px-6 py-3 rounded-full border border-stone-300 transition-colors shadow-2xs group"
        >
          <span>Explore All Collections</span>
          <ArrowRight className="w-4 h-4 text-stone-600 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
