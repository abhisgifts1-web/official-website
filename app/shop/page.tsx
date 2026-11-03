'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  SlidersHorizontal,
  X,
  Search,
  ChevronDown,
  Sparkles,
  RotateCcw,
  Flame,
} from 'lucide-react';
import { INITIAL_CATEGORIES } from '@/lib/data/categories';
import { INITIAL_PRODUCTS } from '@/lib/data/mockProducts';
import ProductGrid from '@/components/product/ProductGrid';
import { ProductOrientation } from '@/types';

function ShopContent() {
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialShape = searchParams.get('shape') || '';
  const initialSort = (searchParams.get('sortBy') as any) || 'bestseller';

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  
  
  const [selectedLighting, setSelectedLighting] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number>(10000);
  const [sortBy, setSortBy] = useState<string>(initialSort);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [liveProducts, setLiveProducts] = useState(INITIAL_PRODUCTS);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.products?.length) {
          setLiveProducts(d.products);
        }
      })
      .catch(() => {});
  }, []);

  const totalArtworksCount = liveProducts.length;
  const ledArtworksCount = liveProducts.filter((p) => p.hasLedBacklight).length;
  const normalArtworksCount = liveProducts.filter((p) => !p.hasLedBacklight).length;

  const handleCategorySelect = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setSelectedLighting('all');
  };

  useEffect(() => {
    if (initialSearch) setSearch(initialSearch);
    if (initialCategory) setSelectedCategory(initialCategory);
    
  }, [initialSearch, initialCategory, initialShape]);

  const filteredProducts = useMemo(() => {
    let list = [...liveProducts];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          (p.deity && p.deity.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedCategory) {
      list = list.filter(
        (p) =>
          p.categorySlug === selectedCategory ||
          p.categorySlugs?.includes(selectedCategory) ||
          p.categoryName.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase() === selectedCategory.toLowerCase())
      );
    }

    

    if (selectedLighting !== 'all') {
      if (selectedLighting === 'led') {
        list = list.filter((p) => p.hasLedBacklight);
      } else if (selectedLighting === 'none') {
        list = list.filter((p) => !p.hasLedBacklight);
      }
    }

    list = list.filter((p) => p.basePrice <= priceRange);

    switch (sortBy) {
      case 'featured':
        list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
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
  }, [liveProducts, search, selectedCategory,  selectedLighting, priceRange, sortBy]);

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('');
    
    
    setSelectedLighting('all');
    setPriceRange(10000);
    setSortBy('bestseller');
  };

  const hasActiveFilters =
    Boolean(search) ||
    Boolean(selectedCategory) ||
    
    
    selectedLighting !== 'all' ||
    priceRange < 10000;

  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12">
      {/* Page Header Banner */}
      <div className="bg-gradient-to-r from-[#0A0A0A] via-[#181818] to-[#141414] text-[#FFFFFF] rounded-3xl p-8 sm:p-12 mb-8 sm:mb-12 border border-[#EAB308]/40 relative overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.7)]">
        {/* Ambient Gold Halo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#EAB308]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <span className="text-[#EAB308] font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#EAB308]" /> Full Sacred &amp; Modern Catalog
          </span>
          <h1 className="font-serif font-bold text-2xl sm:text-4xl lg:text-5xl text-[#FFFFFF]">
            All Wall Art Creations
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-[#E5E7EB] mt-2 leading-relaxed font-sans">
            Browse our complete collection of acrylic photo frames, warm backlit LED panels, and personal photo heirlooms.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-6 gap-8 xl:gap-10">
        {/* DESKTOP SIDEBAR FILTERS (1 col) */}
        <aside className="hidden lg:block space-y-6">
          <div className="bg-[#181818] p-6 rounded-2xl border border-[#2D2D2D] shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[#2D2D2D]/70 pb-3">
              <h3 className="font-serif font-bold text-base text-[#FFFFFF] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#EAB308]" />
                <span>Filters</span>
              </h3>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs text-[#FFFFFF] hover:text-[#EAB308] hover:underline flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3 h-3 text-[#EAB308]" /> Reset All
                </button>
              )}
            </div>

            {/* Search Input */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#FFFFFF] block mb-1.5">
                Search Artworks
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Balaji, Shiva, Ganesha..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-[#121212] border border-[#2D2D2D] rounded-xl outline-none focus:border-[#EAB308] text-[#FFFFFF]"
                />
                <Search className="w-3.5 h-3.5 text-[#D1D5DB] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Lighting Filter */}
            <div className="p-3 bg-[#121212] rounded-xl border border-[#EAB308]/40 space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#FFFFFF] block">
                Lighting Category
              </label>
              <div className="space-y-1.5 text-xs">
                {[
                  { id: 'all', label: `All Artwork Types (${totalArtworksCount})` },
                  { id: 'led', label: `✨ Warm LED Backlit (${ledArtworksCount})` },
                  { id: 'none', label: `🖼️ Normal Crystal Acrylic (${normalArtworksCount})` },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-[#181818] transition-colors">
                    <input
                      type="radio"
                      name="lighting"
                      checked={selectedLighting === item.id}
                      onChange={() => setSelectedLighting(item.id)}
                      className="text-[#FFFFFF] focus:ring-[#EAB308] accent-[#EAB308]"
                    />
                    <span className={`font-semibold ${selectedLighting === item.id ? 'text-[#FFFFFF]' : 'text-[#D1D5DB]'}`}>
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Categories — Grouped by Backlight vs Normal */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#FFFFFF] block mb-2">
                Categories
              </label>
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    !selectedCategory ? 'bg-[#EAB308] text-[#000000] font-bold' : 'text-[#D1D5DB] hover:bg-[#121212]'
                  }`}
                >
                  <span>All Categories</span>
                  <span>{INITIAL_PRODUCTS.length}</span>
                </button>

                {/* Subgroup 1: LED Backlight Categories */}
                <div className="pt-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 block bg-[#121212] text-[#FACC15] rounded-md mb-1">
                    ✨ LED Backlit Categories (8)
                  </span>
                  {INITIAL_CATEGORIES.filter((c) => c.lightingType === 'backlight' || c.group === 'led-backlight').map((c) => {
                    const count = INITIAL_PRODUCTS.filter((p) => p.categorySlug === c.slug || p.categorySlugs?.includes(c.slug)).length;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => handleCategorySelect(c.slug)}
                        className={`w-full text-left px-2.5 py-1 rounded-lg transition-colors flex items-center justify-between text-xs ${
                          selectedCategory === c.slug
                            ? 'bg-[#EAB308] text-[#000000] font-bold shadow-2xs'
                            : 'text-[#D1D5DB] hover:bg-[#121212]'
                        }`}
                      >
                        <span className="truncate">{c.name}</span>
                        <span className="text-[10px] text-stone-400 font-semibold ml-1 shrink-0">({count})</span>
                      </button>
                    );
                  })}
                </div>

                {/* Subgroup 2: Normal Pure Acrylic Categories */}
                <div className="pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFFFFF] px-2 py-0.5 block bg-[#1E1E1E] rounded-md mb-1">
                    🖼️ Normal Acrylic Categories (27)
                  </span>
                  {INITIAL_CATEGORIES.filter((c) => c.lightingType !== 'backlight' && c.group !== 'led-backlight').map((c) => {
                    const count = INITIAL_PRODUCTS.filter((p) => p.categorySlug === c.slug || p.categorySlugs?.includes(c.slug)).length;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => handleCategorySelect(c.slug)}
                        className={`w-full text-left px-2.5 py-1 rounded-lg transition-colors flex items-center justify-between text-xs ${
                          selectedCategory === c.slug
                            ? 'bg-[#EAB308] text-[#000000] font-bold shadow-2xs'
                            : 'text-[#D1D5DB] hover:bg-[#121212]'
                        }`}
                      >
                        <span className="truncate">{c.name}</span>
                        <span className="text-[10px] text-stone-400 font-semibold ml-1 shrink-0">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            

            {/* Max Price Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <label className="font-bold uppercase tracking-wider text-[#FFFFFF]">
                  Max Price
                </label>
                <span className="font-bold text-[#FFFFFF]">₹{priceRange.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min={1499}
                max={10000}
                step={250}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#EAB308]"
              />
              <div className="flex justify-between text-[10px] text-[#D1D5DB] mt-1">
                <span>₹1,499</span>
                <span>₹10,000+</span>
              </div>
            </div>
          </div>
        </aside>

        {/* PRODUCTS AREA (4 cols on lg, 5 cols on xl) */}
        <div className="lg:col-span-4 xl:col-span-5 space-y-6">
          {/* Master Lighting Mode Quick Switch Bar */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#121212] rounded-2xl border border-[#2D2D2D] shadow-2xs">
            <button
              type="button"
              onClick={() => {
                setSelectedLighting('all');
                setSelectedCategory('');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedLighting === 'all'
                  ? 'bg-[#EAB308] text-[#000000] shadow-xs border border-[#EAB308]'
                  : 'bg-[#181818] text-[#FFFFFF] hover:bg-[#1E1E1E] border border-[#2D2D2D]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#EAB308]" />
              <span>All Artworks ({totalArtworksCount})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedLighting('led');
                setSelectedCategory('');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedLighting === 'led'
                  ? 'bg-gradient-to-r from-[#EAB308] via-[#A87928] to-[#181818] text-[#FFFFFF] shadow-md border border-[#FFF7CC] ring-2 ring-[#EAB308]/40 scale-102'
                  : 'bg-[#181818] text-[#CA8A04] hover:bg-[#121212] border border-[#EAB308]/60'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>✨ LED Backlit Art ({ledArtworksCount})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedLighting('none');
                setSelectedCategory('');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedLighting === 'none'
                  ? 'bg-[#EAB308] text-[#000000] shadow-md border border-[#EAB308] ring-2 ring-[#EAB308]/30 scale-102'
                  : 'bg-[#181818] text-[#FFFFFF] hover:bg-[#121212] border border-[#2D2D2D]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#EAB308]" />
              <span>🖼️ Normal Acrylic Art ({normalArtworksCount})</span>
            </button>
          </div>

          {/* Controls Bar */}
          <div className="bg-[#181818] p-4 rounded-2xl border border-[#2D2D2D] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center justify-center gap-1.5 bg-[#1E1E1E] px-3.5 py-2 min-h-[40px] rounded-xl text-xs font-bold text-[#FFFFFF] border border-[#EAB308]/40 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#EAB308]" />
                <span>Filters</span>
              </button>
              <span className="text-xs text-[#D1D5DB] font-medium">
                Showing <strong className="text-[#FFFFFF]">{filteredProducts.length}</strong> of {INITIAL_PRODUCTS.length} artworks
              </span>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <label htmlFor="shop-sort" className="text-xs text-[#D1D5DB] whitespace-nowrap">Sort by:</label>
              <select
                id="shop-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 min-h-[40px] text-xs bg-[#121212] border border-[#2D2D2D] rounded-xl text-[#FFFFFF] outline-none focus:border-[#EAB308] font-medium cursor-pointer"
              >
                <option value="featured">Featured Artworks</option>
                <option value="bestseller">Popular &amp; Bestselling</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-stone-500 font-medium">Active Filters:</span>
              {search && (
                <span className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full flex items-center gap-1">
                  &ldquo;{search}&rdquo;
                  <button type="button" onClick={() => setSearch('')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedCategory && (
                <span className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full flex items-center gap-1">
                  Category: {selectedCategory}
                  <button type="button" onClick={() => setSelectedCategory('')}><X className="w-3 h-3" /></button>
                </span>
              )}
              
              {selectedLighting !== 'all' && (
                <span className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full flex items-center gap-1">
                  Lighting: {selectedLighting === 'led' ? 'LED Backlit' : 'Non-Lit'}
                  <button type="button" onClick={() => setSelectedLighting('all')}><X className="w-3 h-3" /></button>
                </span>
              )}
              
              {priceRange < 10000 && (
                <span className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full flex items-center gap-1">
                  Under ₹{priceRange.toLocaleString('en-IN')}
                  <button type="button" onClick={() => setPriceRange(10000)}><X className="w-3 h-3" /></button>
                </span>
              )}
              <button
                type="button"
                onClick={resetFilters}
                className="text-amber-800 underline font-semibold text-xs ml-1"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Products Grid */}
          <ProductGrid products={filteredProducts} columns="3" />
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#181818] h-full shadow-2xl flex flex-col z-10 overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif font-bold text-lg text-stone-900">Filters</h3>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-amber-900 block mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border rounded-lg"
              >
                <option value="">All Categories</option>
                <optgroup label="✨ LED Backlit Categories (8)">
                  {INITIAL_CATEGORIES.filter((c) => c.lightingType === 'backlight' || c.group === 'led-backlight').map((c) => {
                    const count = INITIAL_PRODUCTS.filter((p) => p.categorySlug === c.slug || p.categorySlugs?.includes(c.slug)).length;
                    return (
                      <option key={c.id} value={c.slug}>
                        {c.name} ({count})
                      </option>
                    );
                  })}
                </optgroup>
                <optgroup label="🖼️ Normal Acrylic Categories (27)">
                  {INITIAL_CATEGORIES.filter((c) => c.lightingType !== 'backlight' && c.group !== 'led-backlight').map((c) => {
                    const count = INITIAL_PRODUCTS.filter((p) => p.categorySlug === c.slug || p.categorySlugs?.includes(c.slug)).length;
                    return (
                      <option key={c.id} value={c.slug}>
                        {c.name} ({count})
                      </option>
                    );
                  })}
                </optgroup>
              </select>
            </div>

            {/* Mobile Lighting */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-amber-900 block mb-2">
                Lighting
              </label>
              <select
                value={selectedLighting}
                onChange={(e) => setSelectedLighting(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border rounded-lg"
              >
                <option value="all">All Styles</option>
                <option value="led">LED Backlit Only</option>
                <option value="none">Non-Lit Only</option>
              </select>
            </div>


            {/* Mobile Price */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-bold text-amber-900">Max Price</span>
                <span>₹{priceRange.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min={1499}
                max={10000}
                step={250}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-amber-700"
              />
            </div>

            <div className="pt-4 space-y-2">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-stone-900 text-white py-2.5 rounded-xl text-xs font-semibold"
              >
                Show {filteredProducts.length} Results
              </button>
              <button
                type="button"
                onClick={resetFilters}
                className="w-full bg-stone-100 text-stone-700 py-2 rounded-xl text-xs font-medium"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="w-full max-w-[1760px] mx-auto p-12 text-center text-xs text-stone-500">Loading catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
