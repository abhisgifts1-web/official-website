'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowLeft,
  SlidersHorizontal,
  X,
  RotateCcw,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { Category, Product } from '@/types';
import ProductGrid from '@/components/product/ProductGrid';

interface CategoryClientViewProps {
  category: Category;
  products: Product[];
}

export default function CategoryClientView({ category, products }: CategoryClientViewProps) {
  const [selectedShape, setSelectedShape] = useState<string>('all');
  const [selectedLighting, setSelectedLighting] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number>(10000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('bestseller');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by shape / orientation
    if (selectedShape !== 'all') {
      const s = selectedShape.toLowerCase();
      if (s === 'portrait' || s === 'vertical') {
        list = list.filter((p) => p.shape === 'portrait' || p.orientation === 'vertical');
      } else if (s === 'landscape' || s === 'horizontal') {
        list = list.filter((p) => p.shape === 'landscape' || p.orientation === 'horizontal');
      } else if (s === 'square') {
        list = list.filter((p) => p.shape === 'square' || p.orientation === 'square');
      } else if (s === 'round') {
        list = list.filter(
          (p) =>
            p.shape === 'round' ||
            p.orientation === 'round' ||
            p.tags.some((t) => t.toLowerCase().includes('round'))
        );
      } else if (s === 'set-of-2') {
        list = list.filter(
          (p) =>
            p.shape === 'set-of-2' ||
            p.tags.some((t) => t.toLowerCase().includes('set of 2') || t.toLowerCase().includes('diptych'))
        );
      } else if (s === 'set-of-3') {
        list = list.filter(
          (p) =>
            p.shape === 'set-of-3' ||
            p.tags.some((t) => t.toLowerCase().includes('set of 3') || t.toLowerCase().includes('triptych'))
        );
      }
    }

    // Filter by lighting
    if (selectedLighting !== 'all') {
      if (selectedLighting === 'led') {
        list = list.filter((p) => p.hasLedBacklight);
      } else if (selectedLighting === 'none') {
        list = list.filter((p) => !p.hasLedBacklight);
      }
    }

    // Filter by max price
    if (priceRange < 10000) {
      list = list.filter((p) => p.basePrice <= priceRange);
    }

    // Filter by in-stock
    if (inStockOnly) {
      list = list.filter((p) => p.variants.some((v) => v.inStock && v.stockCount > 0));
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case 'price-desc':
        list.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case 'newest':
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'bestseller':
      default:
        list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
    }

    return list;
  }, [products, selectedShape, selectedLighting, priceRange, inStockOnly, sortBy]);

  const hasActiveFilters =
    selectedShape !== 'all' ||
    selectedLighting !== 'all' ||
    priceRange < 10000 ||
    inStockOnly;

  const resetFilters = () => {
    setSelectedShape('all');
    setSelectedLighting('all');
    setPriceRange(10000);
    setInStockOnly(false);
    setSortBy('bestseller');
  };

  return (
    <div className="space-y-6">
      {/* Filter and Count Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8D5BD] gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
              showFilters || hasActiveFilters
                ? 'bg-[#FCE7EA] text-amber-950 border-[#B88A35]'
                : 'bg-white text-[#795D58] border-[#E8D5BD] hover:border-[#B88A35]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#B88A35]" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
            )}
          </button>

          <span className="text-xs text-[#795D58] font-medium">
            Showing <strong className="text-[#641E2E]">{filteredProducts.length}</strong> of{' '}
            {products.length} creations
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#795D58] hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs bg-white border border-[#E8D5BD] rounded-xl px-3 py-1.5 font-medium outline-none text-[#641E2E] focus:border-[#B88A35] cursor-pointer shadow-xs"
            >
              <option value="bestseller">Popular &amp; Bestselling</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          <Link
            href="/shop"
            className="text-xs font-semibold text-[#B88A35] hover:underline flex items-center gap-1 shrink-0 ml-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden md:inline">All Artworks</span>
          </Link>
        </div>
      </div>

      {/* Expandable Filter Drawer Panel */}
      {showFilters && (
        <div className="bg-[#FFF7ED] border border-[#E8D5BD] rounded-2xl p-5 space-y-4 animate-in fade-in duration-200 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8D5BD]/60">
            <h4 className="font-serif font-bold text-sm text-[#641E2E] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B88A35]" /> Refine {category.name} Artworks
            </h4>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-[#641E2E] hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" /> Reset Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            {/* Shape Filter */}
            <div>
              <label className="font-bold uppercase tracking-wider text-[#641E2E] block mb-1.5 text-[11px]">
                Shape &amp; Layout
              </label>
              <select
                value={selectedShape}
                onChange={(e) => setSelectedShape(e.target.value)}
                className="w-full bg-white border border-[#E8D5BD] rounded-xl px-3 py-2 outline-none font-medium text-[#641E2E]"
              >
                <option value="all">All Shapes &amp; Proportions</option>
                <option value="portrait">Portrait (Vertical)</option>
                <option value="landscape">Landscape (Horizontal)</option>
                <option value="square">Square (1:1 Symmetry)</option>
                <option value="round">Round (Circular Frame)</option>
                <option value="set-of-2">Set of 2 Frames</option>
                <option value="set-of-3">Set of 3 Frames</option>
              </select>
            </div>

            {/* Lighting Style */}
            <div>
              <label className="font-bold uppercase tracking-wider text-[#641E2E] block mb-1.5 text-[11px]">
                Artwork Style
              </label>
              <select
                value={selectedLighting}
                onChange={(e) => setSelectedLighting(e.target.value)}
                className="w-full bg-white border border-[#E8D5BD] rounded-xl px-3 py-2 outline-none font-medium text-[#641E2E]"
              >
                <option value="all">All Styles</option>
                <option value="led">✨ 3000K LED Backlit</option>
                <option value="none">Pure Crystal Acrylic</option>
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="font-bold uppercase tracking-wider text-[#641E2E] block mb-1.5 text-[11px]">
                Max Budget
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full bg-white border border-[#E8D5BD] rounded-xl px-3 py-2 outline-none font-medium text-[#641E2E]"
              >
                <option value={10000}>All Prices (Up to ₹10,000+)</option>
                <option value={3000}>Under ₹3,000</option>
                <option value={4500}>Under ₹4,500</option>
                <option value={6000}>Under ₹6,000</option>
              </select>
            </div>

            {/* In-Stock Toggle */}
            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 cursor-pointer bg-white border border-[#E8D5BD] rounded-xl px-3 py-2 hover:border-[#B88A35] transition-colors">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-[#B88A35] focus:ring-amber-500"
                />
                <span className="font-medium text-[#641E2E] text-xs">Ready to Ship Only</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[#795D58] font-medium">Applied Filters:</span>

          {selectedShape !== 'all' && (
            <span className="bg-[#FCE7EA] text-[#641E2E] px-3 py-1 rounded-full flex items-center gap-1.5 font-medium">
              Shape: {selectedShape}
              <button type="button" onClick={() => setSelectedShape('all')}>
                <X className="w-3 h-3 hover:text-[#B88A35]" />
              </button>
            </span>
          )}

          {selectedLighting !== 'all' && (
            <span className="bg-[#FCE7EA] text-[#641E2E] px-3 py-1 rounded-full flex items-center gap-1.5 font-medium">
              {selectedLighting === 'led' ? '✨ Warm LED Backlit' : 'Pure Crystal Acrylic'}
              <button type="button" onClick={() => setSelectedLighting('all')}>
                <X className="w-3 h-3 hover:text-[#B88A35]" />
              </button>
            </span>
          )}

          {priceRange < 10000 && (
            <span className="bg-[#FCE7EA] text-[#641E2E] px-3 py-1 rounded-full flex items-center gap-1.5 font-medium">
              Under ₹{priceRange.toLocaleString('en-IN')}
              <button type="button" onClick={() => setPriceRange(10000)}>
                <X className="w-3 h-3 hover:text-[#B88A35]" />
              </button>
            </span>
          )}

          {inStockOnly && (
            <span className="bg-[#FCE7EA] text-[#641E2E] px-3 py-1 rounded-full flex items-center gap-1.5 font-medium">
              In Stock Only
              <button type="button" onClick={() => setInStockOnly(false)}>
                <X className="w-3 h-3 hover:text-[#B88A35]" />
              </button>
            </span>
          )}

          <button
            type="button"
            onClick={resetFilters}
            className="text-xs font-semibold text-[#641E2E] underline ml-1 hover:text-[#B88A35]"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Products Grid */}
      <ProductGrid
        products={filteredProducts}
        emptyMessage={`No artworks matched your selected filters for ${category.name}. Try resetting filters to explore all available designs.`}
      />
    </div>
  );
}
