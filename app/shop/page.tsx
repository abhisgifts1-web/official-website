'use client';

import React, { useState, useMemo, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  SlidersHorizontal,
  X,
  Search,
  ChevronDown,
  Sparkles,
  RotateCcw,
  Flame,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { INITIAL_CATEGORIES } from '@/lib/data/categories';
import { INITIAL_PRODUCTS } from '@/lib/data/mockProducts';
import { filterProductsByCategory } from '@/lib/categoryRules';
import ProductGrid from '@/components/product/ProductGrid';
import { ProductOrientation } from '@/types';
import { EDITORIAL_CATEGORIES } from '@/components/home/CategoryShowcase';

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
  const categoryScrollRef = useRef<HTMLDivElement>(null);

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
      list = filterProductsByCategory(list, selectedCategory);
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
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 bg-white text-stone-900">
      {/* Sleek Compact Luxury Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 text-white border border-amber-500/25 py-4 sm:py-5 px-5 sm:px-8 mb-6 shadow-sm">
        {/* Subtle ambient gold aura */}
        <div className="absolute -top-16 -right-16 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400/15 text-amber-300 border border-amber-400/30">
                <Sparkles className="w-3 h-3 text-amber-400" /> Full Catalog
              </span>
            </div>
            <h1 className="font-serif font-bold text-xl sm:text-2xl md:text-3xl text-white tracking-tight">
              All Wall Art Creations
            </h1>
            <p className="text-xs sm:text-sm text-stone-300/80 mt-0.5 max-w-xl font-light">
              Handcrafted acrylic photo frames, warm backlit LED panels &amp; sacred heirlooms.
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 self-start sm:self-center">
            <div className="px-3.5 py-1.5 rounded-xl bg-stone-900/90 border border-amber-500/30 text-left sm:text-right">
              <span className="block text-amber-400 font-bold text-xs sm:text-sm leading-tight">
                {totalArtworksCount} Masterpieces
              </span>
              <span className="text-[10px] text-stone-400">Hyderabad Atelier</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Square Category Showcase Strip */}
      <div className="mb-6 sm:mb-8 pb-5 border-b border-stone-200/80">
        {selectedCategory && (
          <div className="flex justify-end mb-3 px-1">
            <button
              type="button"
              onClick={() => setSelectedCategory('')}
              className="text-xs font-semibold text-amber-700 hover:text-amber-800 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Show All Categories</span>
            </button>
          </div>
        )}

        <div className="relative group/categoryCarousel">
          {/* Scroll Left Button */}
          <button
            type="button"
            onClick={() => {
              if (categoryScrollRef.current) {
                categoryScrollRef.current.scrollBy({ left: -260, behavior: 'smooth' });
              }
            }}
            className="hidden md:flex absolute -left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-stone-700 hover:text-amber-800 border border-stone-200 shadow-md items-center justify-center transition-all opacity-0 group-hover/categoryCarousel:opacity-100 hover:scale-110 cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Square Category Items */}
          <div
            ref={categoryScrollRef}
            className="flex items-start gap-3 sm:gap-5 md:gap-6 lg:gap-7 overflow-x-auto scroll-smooth scrollbar-none py-2 px-1 sm:px-2 justify-start md:justify-around xl:justify-center"
            style={{ scrollbarWidth: 'none' }}
          >
            {EDITORIAL_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(isSelected ? '' : cat.id)}
                  className={`group flex flex-col items-center shrink-0 text-center w-[90px] sm:w-[106px] lg:w-[120px] cursor-pointer select-none transition-transform duration-300 ${
                    isSelected ? 'scale-105' : 'hover:scale-102'
                  }`}
                >
                  {/* Outer Luxury Golden Ring (Circle Shape) */}
                  <div
                    className={`relative w-[78px] h-[78px] sm:w-[92px] sm:h-[92px] lg:w-[104px] lg:h-[104px] aspect-square rounded-full p-[2.5px] transition-all duration-300 flex items-center justify-center ${
                      isSelected
                        ? 'bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-600 ring-2 ring-amber-500 shadow-[0_6px_20px_rgba(234,179,8,0.45)]'
                        : 'bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 hover:from-amber-500 hover:via-yellow-300 hover:to-amber-600 shadow-xs hover:shadow-md'
                    }`}
                  >
                    {/* Inner Clipping Circle */}
                    <div className="w-full h-full rounded-full overflow-hidden bg-white p-[1.5px] relative flex items-center justify-center">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = cat.fallbackImage;
                        }}
                        className="w-full h-full object-cover object-center rounded-full group-hover:scale-110 transition-transform duration-500 ease-out"
                      />
                      {/* Active Overlay Checkmark or Accent */}
                      {isSelected && (
                        <div className="absolute inset-0 rounded-full bg-amber-500/20 ring-1 ring-inset ring-amber-500/60 flex items-center justify-center pointer-events-none" />
                      )}
                      {/* Diagonal Acrylic Light Sheen on Hover */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                      <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/10 pointer-events-none" />
                    </div>
                  </div>

                  {/* Category Name Below Circle */}
                  <span
                    className={`mt-2 sm:mt-2.5 text-center font-bold text-xs sm:text-[13px] transition-colors leading-tight line-clamp-2 max-w-[105px] ${
                      isSelected ? 'text-amber-800 underline underline-offset-2' : 'text-stone-800 group-hover:text-amber-800'
                    }`}
                  >
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          <button
            type="button"
            onClick={() => {
              if (categoryScrollRef.current) {
                categoryScrollRef.current.scrollBy({ left: 260, behavior: 'smooth' });
              }
            }}
            className="hidden md:flex absolute -right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-stone-700 hover:text-amber-800 border border-stone-200 shadow-md items-center justify-center transition-all opacity-0 group-hover/categoryCarousel:opacity-100 hover:scale-110 cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-6 gap-8 xl:gap-10 items-start">
        {/* DESKTOP SIDEBAR FILTERS (1 col) */}
        <aside className="hidden lg:block sticky top-24 space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-stone-200/80 pb-3">
              <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-amber-600" />
                <span>Filters</span>
              </h3>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs text-stone-600 hover:text-amber-700 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3 text-amber-600" /> Reset
                </button>
              )}
            </div>

            {/* Search Input */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-900 block mb-1.5">
                Search Artworks
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Balaji, Shiva, Radha..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900 placeholder:text-stone-400 transition-colors"
                />
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Lighting Style Selector (Luxury Pills) */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-900 block mb-2">
                Lighting Style
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'all', label: 'All Artworks', count: totalArtworksCount },
                  { id: 'led', label: '✨ LED Backlit', count: ledArtworksCount },
                  { id: 'none', label: '🖼️ Non-Lit Acrylic', count: normalArtworksCount },
                ].map((item) => {
                  const isSelected = selectedLighting === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedLighting(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-stone-950 shadow-xs'
                          : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                          isSelected ? 'bg-amber-600/30 text-stone-950' : 'bg-stone-200/60 text-stone-600'
                        }`}
                      >
                        {item.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-900 block mb-2">
                Collections
              </label>
              <div className="space-y-1 max-h-72 overflow-y-auto pr-1 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                    !selectedCategory ? 'bg-amber-500 text-stone-950 font-bold shadow-2xs' : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span>All Collections</span>
                  <span className="text-[10px] opacity-80 font-semibold">{INITIAL_PRODUCTS.length}</span>
                </button>

                <div className="pt-1 space-y-1">
                  {INITIAL_CATEGORIES.map((c) => {
                    const count = INITIAL_PRODUCTS.filter(
                      (p) =>
                        p.categorySlug === c.slug ||
                        p.categorySlugs?.includes(c.slug) ||
                        (c.slug === 'led-acrylic-photo-frames' && p.hasLedBacklight) ||
                        (c.slug === 'acrylic-photo-frames' && !p.hasLedBacklight) ||
                        (c.slug === 'god-photo-frames' && (Boolean(p.deity) || p.categorySlug.includes('lord') || p.categorySlug.includes('goddess') || p.categorySlug.includes('radha') || p.categorySlug.includes('hanuman') || p.categorySlug.includes('ram') || p.categorySlug.includes('shiva') || p.categorySlug.includes('balaji') || p.categorySlug.includes('ganesha') || p.categorySlug.includes('devotional'))) ||
                        (c.slug === 'family-baby-frames' && (p.categorySlug.includes('family') || p.tags?.some((t) => t.toLowerCase().includes('family') || t.toLowerCase().includes('baby')))) ||
                        (c.slug === 'couple-wedding-frames' && (p.categorySlug.includes('wedding') || p.categorySlug.includes('couple'))) ||
                        (c.slug === 'glitter-photo-frames' && (p.categorySlug.includes('glitter') || p.tags?.some((t) => t.toLowerCase().includes('glitter')))) ||
                        (c.slug === '360-rotating-photo-lamps' && (p.categorySlug.includes('rotating') || p.tags?.some((t) => t.toLowerCase().includes('rotating') || t.toLowerCase().includes('lamp')))) ||
                        (c.slug === 'personalized-gifts' && (p.categorySlug.includes('photo') || p.tags?.some((t) => t.toLowerCase().includes('custom') || t.toLowerCase().includes('gift'))))
                    ).length;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => handleCategorySelect(c.slug)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between text-xs cursor-pointer ${
                          selectedCategory === c.slug
                            ? 'bg-amber-500 text-stone-950 font-bold shadow-2xs'
                            : 'text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        <span className="truncate">{c.name}</span>
                        <span className="text-[10px] text-stone-500 font-semibold ml-1 shrink-0">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Max Price Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <label className="font-bold uppercase tracking-wider text-stone-900">
                  Max Price
                </label>
                <span className="font-bold text-amber-800">₹{priceRange.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min={1499}
                max={10000}
                step={250}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                <span>₹1,499</span>
                <span>₹10,000+</span>
              </div>
            </div>
          </div>
        </aside>

        {/* PRODUCTS AREA (4 cols on lg, 5 cols on xl) */}
        <div className="lg:col-span-4 xl:col-span-5 space-y-4">
          {/* Top Single-Line Controls Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-50/80 border border-stone-200/80 rounded-xl px-4 py-2.5 shadow-2xs">
            {/* Left: Mobile Filter Button & Results Counter */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg text-xs font-bold text-stone-900 border border-stone-300 shadow-2xs cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600" />
                <span>Filters</span>
              </button>
              <span className="text-xs text-stone-600">
                Showing <strong className="text-stone-950 font-bold">{filteredProducts.length}</strong> of {totalArtworksCount} creations
              </span>
            </div>

            {/* Right: Compact Sort Dropdown */}
            <div className="flex items-center justify-between sm:justify-end gap-2">
              <span className="text-xs text-stone-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-stone-300 text-stone-800 text-xs font-medium rounded-lg px-2.5 py-1.5 outline-none focus:border-amber-500 cursor-pointer shadow-2xs"
              >
                <option value="bestseller">Popular &amp; Bestselling</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
                <option value="featured">Curated Feature</option>
              </select>
            </div>
          </div>

          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 text-xs py-1">
              <span className="text-stone-500 font-medium">Active:</span>
              {search && (
                <span className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full flex items-center gap-1 font-medium">
                  &ldquo;{search}&rdquo;
                  <button type="button" onClick={() => setSearch('')} className="hover:text-black cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedCategory && (
                <span className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full flex items-center gap-1 font-medium">
                  Category: {selectedCategory}
                  <button type="button" onClick={() => setSelectedCategory('')} className="hover:text-black cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              )}
              
              {selectedLighting !== 'all' && (
                <span className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full flex items-center gap-1 font-medium">
                  {selectedLighting === 'led' ? '✨ LED Backlit' : '🖼️ Non-Lit Acrylic'}
                  <button type="button" onClick={() => setSelectedLighting('all')} className="hover:text-black cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              )}
              
              {priceRange < 10000 && (
                <span className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full flex items-center gap-1 font-medium">
                  Under ₹{priceRange.toLocaleString('en-IN')}
                  <button type="button" onClick={() => setPriceRange(10000)} className="hover:text-black cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              )}
              <button
                type="button"
                onClick={resetFilters}
                className="text-amber-800 hover:text-amber-950 underline font-semibold text-xs ml-1 cursor-pointer"
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
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto p-6 space-y-6 border-r border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
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
