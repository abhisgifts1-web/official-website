'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { INITIAL_PRODUCTS } from '@/lib/data/mockProducts';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types';

const ITEMS_PER_PAGE = 10;

const CATEGORY_TABS = [
  { id: 'all', label: 'All Products' },
  { id: 'acrylic-photo-frames', label: 'Acrylic Frames' },
  { id: 'led-acrylic-photo-frames', label: 'LED Frames' },
  { id: 'glitter-photo-frames', label: 'Glitter Frames' },
  { id: '360-rotating-photo-lamps', label: '360° Lamps' },
  { id: 'god-photo-frames', label: 'God Photo Frames' },
];

export default function AllProductsShowcase() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [allProducts, setAllProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((d) => {
        if (d.success && Array.isArray(d.products)) {
          setAllProducts(d.products);
        }
      })
      .catch(() => {});
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return allProducts;
    }
    return allProducts.filter(
      (p) =>
        p.categorySlug === selectedCategory ||
        (Array.isArray(p.categorySlugs) && p.categorySlugs.includes(selectedCategory))
    );
  }, [allProducts, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleTabChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section id="all-products" className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 lg:py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-stone-200 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-800 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            Full Catalog
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight mt-0.5">
            All Products
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl font-sans">
            Browse our complete collection of personalized gifts, LED backlit art, and crystal keepsakes.
          </p>
        </div>

        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-800 hover:text-amber-900 transition-colors group shrink-0"
        >
          <span>Open Full Store</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {CATEGORY_TABS.map((tab) => {
          const isSelected = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                isSelected
                  ? 'bg-stone-900 text-white font-semibold shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Responsive Grid of Product Cards */}
      {paginatedProducts.length === 0 ? (
        <div className="text-center py-12 text-stone-500 text-xs">
          No products found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
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
    </section>
  );
}
