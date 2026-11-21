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
    if (categorySlug === 'all' || categorySlug === selectedCategory) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(categorySlug);
    }
    setSelectedLighting('all');
  };

  useEffect(() => {
    if (initialSearch) setSearch(initialSearch);
    if (initialCategory) setSelectedCategory(initialCategory === 'all' ? '' : initialCategory);
    
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

    if (selectedCategory && selectedCategory !== 'all') {
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
    (Boolean(selectedCategory) && selectedCategory !== 'all') ||
    
    
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
        {selectedCategory && selectedCategory !== 'all' && (
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
            className="flex items-start gap-4 sm:gap-6 md:gap-7 lg:gap-8 overflow-x-auto scroll-smooth scrollbar-none py-3 px-2 sm:px-4 justify-start md:justify-around xl:justify-center"
            style={{ scrollbarWidth: 'none' }}
          >
            {EDITORIAL_CATEGORIES.map((cat, idx) => {
              const isSelected =
                cat.id === 'all'
                  ? !selectedCategory || selectedCategory === 'all'
                  : selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat.id === 'all' ? '' : isSelected ? '' : cat.id)}
                  className={`category-wave-item group flex flex-col items-center shrink-0 text-center w-[94px] sm:w-[110px] lg:w-[124px] cursor-pointer select-none transition-all duration-300 ${
                    isSelected ? 'scale-105' : 'hover:scale-102'
                  }`}
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  {/* Outer Golden Medallion with Shimmer & Breathing Aura */}
                  <div className="relative flex items-center justify-center">
                    {/* Ambient Soft Gold Halo Glow Backdrop */}
                    <div
                      className={`absolute -inset-1.5 rounded-3xl transition-all duration-500 pointer-events-none ${
                        isSelected
                          ? 'bg-gradient-to-tr from-amber-400/50 via-yellow-300/60 to-amber-500/50 blur-md opacity-100 scale-105'
                          : 'bg-gradient-to-tr from-amber-400/25 via-yellow-300/35 to-amber-500/25 blur-sm opacity-50 group-hover:opacity-100 group-hover:scale-108'
                      }`}
                    />

                    {/* 24K Gold Shimmering Border (Square Shape) */}
                    <div
                      className={`relative w-[80px] h-[80px] sm:w-[94px] sm:h-[94px] lg:w-[108px] lg:h-[108px] aspect-square rounded-2xl p-[3px] category-gold-shimmer shadow-md transition-all duration-400 ease-out flex items-center justify-center animate-category-ring ${
                        isSelected
                          ? 'ring-2 ring-amber-500 shadow-[0_12px_28px_rgba(234,179,8,0.55)] scale-105'
                          : 'group-hover:shadow-[0_12px_28px_rgba(217,119,6,0.42)] group-hover:-translate-y-1.5 group-hover:scale-105'
                      }`}
                    >
                      {/* Inner Clipping Square */}
                      <div className="w-full h-full rounded-[13px] overflow-hidden bg-white p-[1.5px] relative flex items-center justify-center shadow-inner">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = cat.fallbackImage;
                          }}
                          className="w-full h-full object-cover object-center rounded-[11px] group-hover:scale-115 transition-transform duration-700 ease-out"
                        />
                        {/* Active Overlay Accent */}
                        {isSelected && (
                          <div className="absolute inset-0 rounded-[11px] bg-amber-500/20 ring-1 ring-inset ring-amber-500/60 flex items-center justify-center pointer-events-none z-10" />
                        )}
                        {/* Diagonal Acrylic Light Sheen on Hover */}
                        <div className="absolute inset-0 rounded-[11px] bg-gradient-to-tr from-transparent via-white/70 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none z-10" />
                        <div className="absolute inset-0 rounded-[11px] ring-1 ring-inset ring-black/15 pointer-events-none z-10" />
                      </div>
                    </div>
                  </div>

                  {/* Category Name Below Square */}
                  <span
                    className={`mt-2.5 sm:mt-3 text-center font-bold text-xs sm:text-[13px] transition-all leading-tight line-clamp-2 max-w-[115px] ${
                      isSelected
                        ? 'text-amber-800 underline underline-offset-4 decoration-amber-500 font-extrabold'
                        : 'text-stone-800 group-hover:text-amber-800 group-hover:underline underline-offset-4 decoration-amber-400'
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

      {/* FULL-WIDTH PRODUCTS CATALOG */}
      <div className="w-full space-y-5">
        {selectedCategory && selectedCategory !== 'all' && (
          <div className="flex items-center justify-between bg-amber-50/60 border border-amber-200/80 px-4 py-2.5 rounded-xl">
            <span className="text-xs font-semibold text-stone-700">
              Filtering by:{' '}
              <span className="font-bold text-stone-900">
                {EDITORIAL_CATEGORIES.find((c) => c.id === selectedCategory)?.name || selectedCategory}
              </span>{' '}
              ({filteredProducts.length} {filteredProducts.length === 1 ? 'artwork' : 'artworks'})
            </span>
            <button
              type="button"
              onClick={() => setSelectedCategory('')}
              className="text-xs font-bold text-amber-800 hover:text-amber-950 underline cursor-pointer"
            >
              Show All Artworks
            </button>
          </div>
        )}

        {/* Products Grid - Full Width Luxury 4-Column Layout */}
        <ProductGrid products={filteredProducts} columns="4" />
      </div>
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
