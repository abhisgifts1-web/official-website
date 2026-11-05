'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { INITIAL_PRODUCTS } from '@/lib/data/mockProducts';
import { filterProductsByCategory } from '@/lib/categoryRules';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types';

const SHOWCASE_TABS = [
  { id: 'all', label: 'All Popular' },
  { id: 'acrylic-photo-frames', label: 'Acrylic Frames' },
  { id: 'led-acrylic-photo-frames', label: 'LED Frames' },
  { id: 'glitter-photo-frames', label: 'Glitter Frames' },
  { id: '360-rotating-photo-lamps', label: 'Rotating Lamps' },
  { id: 'god-photo-frames', label: 'God Photo Frames' },
  { id: 'family-baby-frames', label: 'Family & Baby' },
  { id: 'couple-wedding-frames', label: 'Couple & Wedding' },
  { id: 'personalized-gifts', label: 'Personalized Gifts' },
];

const ITEMS_PER_PAGE = 10;

export default function BestsellersShowcase() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allProducts, setAllProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.products?.length) {
          setAllProducts(d.products);
        }
      })
      .catch(() => {});
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') {
      // Return bestsellers first
      return [...allProducts].sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }
    return filterProductsByCategory(allProducts, activeFilter);
  }, [activeFilter, allProducts]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section id="category-showcase" className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 lg:py-10">
      {/* Header with Title and Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 pb-3 border-b border-stone-200 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Curated Collections
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight mt-0.5">
            {activeFilter === 'all'
              ? 'Best-Selling Photo Frames & Sacred Art'
              : SHOWCASE_TABS.find((t) => t.id === activeFilter)?.label || 'Artworks'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl font-sans">
            Handcrafted with museum-grade diamond-polished acrylic and vibrant depth in Hyderabad.
          </p>
        </div>

        {/* Filter Pills matching the 8 Core Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto min-w-0 max-w-full pb-1 sm:pb-0 scrollbar-none">
          {SHOWCASE_TABS.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleFilterChange(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer shadow-2xs ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Responsive Grid of Product Cards */}
      {paginatedProducts.length === 0 ? (
        <div className="text-center py-12 text-stone-500 text-xs">
          No artworks found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* View Full Category Link */}
      {activeFilter !== 'all' && (
        <div className="mt-6 text-center">
          <Link
            href={`/category/${activeFilter}`}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-xs rounded-full transition-colors"
          >
            <span>Explore all {SHOWCASE_TABS.find((t) => t.id === activeFilter)?.label}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

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
