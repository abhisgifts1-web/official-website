'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Search,
  X,
  SlidersHorizontal,
  Flame,
  Camera,
  Layers,
  ArrowRight,
  Maximize2,
  CheckCircle2,
} from 'lucide-react';
import { Category, CategoryGroup } from '@/types';

import CategoryCard from './CategoryCard';

interface CategoryExplorerProps {
  initialCategories: Category[];
}

export default function CategoryExplorer({ initialCategories }: CategoryExplorerProps) {
  const [lightingFilter, setLightingFilter] = useState<'all' | 'backlight' | 'normal'>('all');
  const [activeGroup, setActiveGroup] = useState<'all' | CategoryGroup>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'alpha-asc' | 'alpha-desc' | 'most-designs'>('featured');

  // Compute real counts per group & lighting type
  const backlightCount = useMemo(
    () => initialCategories.filter((c) => c.lightingType === 'backlight' || c.group === 'led-backlight').length,
    [initialCategories]
  );
  const normalCount = useMemo(
    () => initialCategories.filter((c) => c.lightingType !== 'backlight' && c.group !== 'led-backlight').length,
    [initialCategories]
  );

  const groupCounts = useMemo(() => {
    return {
      all: initialCategories.length,
      'god-wall-art': initialCategories.filter((c) => c.group === 'god-wall-art').length,
      'led-backlight': initialCategories.filter((c) => c.group === 'led-backlight').length,
      'custom-frames': initialCategories.filter((c) => c.group === 'custom-frames').length,
      'abstract-wall-art': initialCategories.filter((c) => c.group === 'abstract-wall-art').length,
    };
  }, [initialCategories]);

  // Filter tabs definition with genuine real counts
  const filterTabs = [
    {
      id: 'all' as const,
      label: 'All Collections',
      count: groupCounts.all,
      icon: <Sparkles className="w-3.5 h-3.5" />,
    },
    {
      id: 'god-wall-art' as const,
      label: 'God Wall Art',
      count: groupCounts['god-wall-art'],
      icon: <span className="text-xs">🔱</span>,
    },
    {
      id: 'led-backlight' as const,
      label: 'LED Backlight Wall Art',
      count: groupCounts['led-backlight'],
      icon: <Flame className="w-3.5 h-3.5 text-amber-500" />,
    },
    {
      id: 'custom-frames' as const,
      label: 'Custom Photo Frames',
      count: groupCounts['custom-frames'],
      icon: <Camera className="w-3.5 h-3.5 text-amber-600" />,
    },
    {
      id: 'abstract-wall-art' as const,
      label: 'Abstract Wall Art',
      count: groupCounts['abstract-wall-art'],
      icon: <Layers className="w-3.5 h-3.5 text-amber-600" />,
    },
  ];

  // Filter and sort categories
  const filteredCategories = useMemo(() => {
    let list = [...initialCategories];

    // Filter by lighting mode
    if (lightingFilter === 'backlight') {
      list = list.filter((c) => c.lightingType === 'backlight' || c.group === 'led-backlight');
    } else if (lightingFilter === 'normal') {
      list = list.filter((c) => c.lightingType !== 'backlight' && c.group !== 'led-backlight');
    }

    // Filter by group
    if (activeGroup !== 'all') {
      list = list.filter((c) => c.group === activeGroup);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((c) => {
        const nameMatch = c.name.toLowerCase().includes(q);
        const descMatch = c.description.toLowerCase().includes(q);
        const slugMatch = c.slug.toLowerCase().includes(q);
        const groupMatch = c.group ? c.group.toLowerCase().includes(q) : false;
        return nameMatch || descMatch || slugMatch || groupMatch;
      });
    }

    // Sort
    switch (sortBy) {
      case 'alpha-asc':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'alpha-desc':
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'most-designs':
        list.sort((a, b) => (b.itemCount || 0) - (a.itemCount || 0));
        break;
      case 'featured':
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return list;
  }, [initialCategories, activeGroup, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setActiveGroup('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 space-y-12">
      {/* 1. Header Section with refined spacing & hierarchy */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest font-bold text-amber-950 bg-amber-100/90 border border-amber-300/80 px-4 py-1.5 rounded-full inline-flex items-center gap-2 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
          <span>Curated Portfolios &amp; Masterpieces</span>
        </span>

        <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight">
          Shop by Product Category
        </h1>

        <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto font-normal">
          Discover sacred temple heirlooms, illuminated modern statements, customized family keepsakes, and contemporary acrylic masterpieces.
        </p>
      </div>

      {/* 2. Interactive Filter Bar & Search Controls */}
      <div className="space-y-4 pt-2">
        {/* Master Lighting Segregation Switch: Backlight vs Normal Collections */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 p-2 bg-stone-100 rounded-3xl border border-stone-200 max-w-2xl mx-auto shadow-xs">
          <button
            type="button"
            onClick={() => {
              setLightingFilter('all');
              setActiveGroup('all');
            }}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              lightingFilter === 'all'
                ? 'bg-[#EAB308] text-stone-950 shadow-sm border border-amber-400'
                : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>All Master Collections ({initialCategories.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setLightingFilter('backlight');
              setActiveGroup('all');
            }}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              lightingFilter === 'backlight'
                ? 'bg-gradient-to-r from-[#EAB308] to-amber-500 text-stone-950 shadow-md border border-amber-300 ring-2 ring-amber-400/40 scale-102'
                : 'bg-white text-amber-800 hover:bg-amber-50 border border-amber-200'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-600 animate-pulse" />
            <span>✨ LED Backlit Collections ({backlightCount})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setLightingFilter('normal');
              setActiveGroup('all');
            }}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              lightingFilter === 'normal'
                ? 'bg-[#EAB308] text-stone-950 shadow-md border border-amber-400 ring-2 ring-amber-400/30 scale-102'
                : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>🖼️ Normal Acrylic Collections ({normalCount})</span>
          </button>
        </div>

        {/* Filter Pills with Horizontal Scroll on Mobile */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = activeGroup === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveGroup(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-amber-700 ${
                  isActive
                    ? 'bg-stone-900 text-amber-300 shadow-md border border-stone-800'
                    : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200/90 shadow-xs'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-amber-950 text-amber-200' : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search, Sort & Results Counter Bar */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-stone-200 p-3 sm:p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search Balaji, Shiva, LED frames, family photos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm bg-stone-50 hover:bg-white focus:bg-white border border-stone-200 focus:border-amber-600 rounded-xl outline-none transition-all shadow-2xs"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Right Side: Sorting & Count */}
          <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-4 text-xs">
            {/* Live Result Count */}
            <span className="text-stone-500 font-medium whitespace-nowrap">
              Showing <span className="font-bold text-stone-900">{filteredCategories.length}</span> of {initialCategories.length} Collections
            </span>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-700 py-1.5 px-2.5 rounded-lg outline-none cursor-pointer font-medium text-xs focus-visible:ring-2 focus-visible:ring-amber-700"
                aria-label="Sort collections"
              >
                <option value="featured">Featured Collections</option>
                <option value="alpha-asc">Alphabetical (A - Z)</option>
                <option value="alpha-desc">Alphabetical (Z - A)</option>
                <option value="most-designs">Most Designs</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Category Cards Grid — Clearly separated into Backlight & Normal */}
      {filteredCategories.length > 0 ? (
        lightingFilter === 'all' && activeGroup === 'all' && !searchQuery ? (
          <div className="space-y-12">
            {/* Section 1: LED Backlit Wall Art Collections */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b-2 border-amber-300 gap-2">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-900 bg-amber-50 border border-amber-300 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-2xs">
                    <Flame className="w-3 h-3 text-amber-600 animate-pulse" /> warm Illuminated Series
                  </span>
                  <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 mt-1">
                    ✨ LED Backlit Wall Art Collections ({backlightCount})
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                    Illuminated sacred temple frames with warm golden halo glow, concealed wiring, and 12V BIS power adapters.
                  </p>
                </div>
                <Link
                  href="/shop?lighting=led"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-stone-900 shrink-0"
                >
                  <span>Shop All LED Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6">
                {filteredCategories
                  .filter((c) => c.lightingType === 'backlight' || c.group === 'led-backlight')
                  .map((cat, idx) => (
                    <CategoryCard key={cat.id} category={cat} priority={idx < 4} />
                  ))}
              </div>
            </div>

            {/* Section 2: Normal Pure Crystal Acrylic Wall Art Collections */}
            <div className="space-y-6 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b-2 border-stone-200 gap-2">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-stone-700 bg-stone-100 border border-stone-200 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-2xs">
                    <Sparkles className="w-3 h-3 text-amber-600" /> Museum Glass Clarity • Non-Lit
                  </span>
                  <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 mt-1">
                    🖼️ Normal Crystal Acrylic Collections ({normalCount})
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                    Non-lit premium acrylic photo frames with pure gold foil embellishments and precision-polished bevel edges. No wiring required.
                  </p>
                </div>
                <Link
                  href="/shop?lighting=none"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-900 hover:text-amber-800 shrink-0"
                >
                  <span>Shop All Normal Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6">
                {filteredCategories
                  .filter((c) => c.lightingType !== 'backlight' && c.group !== 'led-backlight')
                  .map((cat, idx) => (
                    <CategoryCard key={cat.id} category={cat} priority={idx < 5} />
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6">
            {filteredCategories.map((cat, idx) => (
              <CategoryCard key={cat.id} category={cat} priority={idx < 5} />
            ))}
          </div>
        )
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center max-w-md mx-auto space-y-4 shadow-sm my-8">
          <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-xl text-stone-900">No Matching Collections</h3>
          <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
            We couldn’t find any collections matching &ldquo;{searchQuery}&rdquo;. Try another search term or reset your filters.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="bg-stone-900 hover:bg-amber-800 text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-colors shadow-xs"
          >
            Reset Filters &amp; View All Collections
          </button>
        </div>
      )}

      
    </div>
  );
}
