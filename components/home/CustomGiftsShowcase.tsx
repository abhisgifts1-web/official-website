'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  RotateCw,
  Stars,
  Sun,
  Heart,
  ChevronLeft,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { INITIAL_PRODUCTS } from '@/lib/data/mockProducts';
import ProductCard from '@/components/product/ProductCard';

type CustomFilterType = 'all' | 'lamps' | 'glitter' | 'led' | 'couple_family';

const ITEMS_PER_PAGE = 5;

export default function CustomGiftsShowcase() {
  const [activeFilter, setActiveFilter] = useState<CustomFilterType>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Curated list of 10 premium custom gifts & personalized keepsakes
  const customGiftSlugs = useMemo(
    () => [
      'motorized-360-rotating-led-cylinder-photo-lamp',
      'enchanted-liquid-gold-glitter-acrylic-photo-frame',
      'custom-led-backlit-acrylic-photo-frame',
      'sparkling-diamond-glitter-wedding-photo-frame',
      'custom-couple-wedding-vows-acrylic-keepsake-frame',
      'crystal-tower-hexagonal-rotating-photo-lamp',
      'personalized-family-heirloom-gold-script-acrylic-frame',
      'custom-personalised-photo-acrylic-wall-frame',
      'luxury-circular-round-acrylic-photo-frame',
      'personalized-golden-family-crest-photo-acrylic-heirloom',
    ],
    []
  );

  const allCustomGifts = useMemo(() => {
    return customGiftSlugs
      .map((slug) => INITIAL_PRODUCTS.find((p) => p.slug === slug))
      .filter((p): p is (typeof INITIAL_PRODUCTS)[0] => !!p);
  }, [customGiftSlugs]);

  const [productsList, setProductsList] = useState(allCustomGifts);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.products?.length) {
          const mapped = customGiftSlugs
            .map((slug) => d.products.find((p: any) => p.slug === slug))
            .filter(Boolean);
          if (mapped.length > 0) {
            setProductsList(mapped);
          }
        }
      })
      .catch(() => {});
  }, [customGiftSlugs]);

  // Filter products based on sub-category tab
  const filteredProducts = useMemo(() => {
    switch (activeFilter) {
      case 'lamps':
        return productsList.filter(
          (p) =>
            p.slug.includes('lamp') ||
            p.categorySlug.includes('lamp') ||
            p.title.toLowerCase().includes('lamp') ||
            p.tags.some((t) => t.toLowerCase().includes('lamp'))
        );
      case 'glitter':
        return productsList.filter(
          (p) =>
            p.slug.includes('glitter') ||
            p.categorySlug.includes('glitter') ||
            p.title.toLowerCase().includes('glitter') ||
            p.tags.some((t) => t.toLowerCase().includes('glitter'))
        );
      case 'led':
        return productsList.filter((p) => p.hasLedBacklight);
      case 'couple_family':
        return productsList.filter(
          (p) =>
            p.slug.includes('couple') ||
            p.slug.includes('family') ||
            p.slug.includes('wedding') ||
            p.title.toLowerCase().includes('family') ||
            p.title.toLowerCase().includes('couple') ||
            p.tags.some((t) => ['wedding', 'couple', 'family'].includes(t.toLowerCase()))
        );
      default:
        return productsList;
    }
  }, [activeFilter, productsList]);

  // Total pages based on items per page
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));

  // Current page items
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleFilterChange = (filter: CustomFilterType) => {
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
            <span>100% Bespoke • Handcrafted Memories</span>
          </div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#FFFFFF] tracking-tight">
            TRENDING CUSTOM GIFTS &amp; ACRYLIC KEEPSAKES
          </h2>
          <p className="text-xs sm:text-sm text-[#D1D5DB] mt-1.5 max-w-2xl font-sans leading-relaxed">
            Preserve your cherished moments with magical 360° motorized rotating photo lamps, liquid gold shimmer glitter frames, and warm backlit portrait heirlooms.
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
            All Keepsakes
          </button>

          <button
            type="button"
            onClick={() => handleFilterChange('lamps')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeFilter === 'lamps'
                ? 'bg-[#511B2A] text-[#FFFFFF] border border-[#EAB308] shadow-xs'
                : 'bg-[#181818] text-[#D1D5DB] border border-[#2D2D2D] hover:border-[#EAB308]'
            }`}
          >
            <RotateCw className="w-3 h-3 text-[#EAB308]" />
            <span>Rotating Lamps</span>
          </button>

          <button
            type="button"
            onClick={() => handleFilterChange('glitter')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeFilter === 'glitter'
                ? 'bg-[#511B2A] text-[#FFFFFF] border border-[#EAB308] shadow-xs'
                : 'bg-[#181818] text-[#D1D5DB] border border-[#2D2D2D] hover:border-[#EAB308]'
            }`}
          >
            <Stars className="w-3 h-3 text-[#EAB308]" />
            <span>Glitter Frames</span>
          </button>

          <button
            type="button"
            onClick={() => handleFilterChange('led')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeFilter === 'led'
                ? 'bg-[#511B2A] text-[#FFFFFF] border border-[#EAB308] shadow-xs'
                : 'bg-[#181818] text-[#D1D5DB] border border-[#2D2D2D] hover:border-[#EAB308]'
            }`}
          >
            <Sun className="w-3 h-3 text-[#EAB308]" />
            <span>LED Backlit</span>
          </button>

          <button
            type="button"
            onClick={() => handleFilterChange('couple_family')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeFilter === 'couple_family'
                ? 'bg-[#511B2A] text-[#FFFFFF] border border-[#EAB308] shadow-xs'
                : 'bg-[#181818] text-[#D1D5DB] border border-[#2D2D2D] hover:border-[#EAB308]'
            }`}
          >
            <Heart className="w-3 h-3 text-[#EAB308]" />
            <span>Couple &amp; Family</span>
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
                ? 'bg-[#F2E5D5] text-[#8C7A70] cursor-not-allowed opacity-60'
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
                ? 'bg-[#F2E5D5] text-[#8C7A70] cursor-not-allowed opacity-60'
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
          href="/customise"
          className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#121212] via-[#641D30] to-[#121212] hover:from-[#3D1420] hover:to-[#121212] text-[#FFFFFF] font-bold text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-md border border-[#EAB308]/80 transition-all hover:scale-[1.02] tracking-wider uppercase group"
        >
          <Sparkles className="w-4 h-4 text-[#EAB308]" />
          <span>Customize Your Acrylic Keepsake</span>
          <ArrowRight className="w-4 h-4 text-[#EAB308] group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
