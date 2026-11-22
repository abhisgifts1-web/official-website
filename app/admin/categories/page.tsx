'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ExternalLink, Sparkles, Zap, Package, Edit3 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Category, Product } from '@/types';
import { INITIAL_CATEGORIES } from '@/lib/data/categories';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchCategoriesAndProducts = async () => {
    try {
      const [catRes, prodRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/products'),
      ]);

      if (catRes.ok) {
        const catData = await catRes.json();
        if (catData.success && catData.categories?.length > 0) {
          const officialSlugs = INITIAL_CATEGORIES.map((c) => c.slug);
          const slugOrder = new Map(INITIAL_CATEGORIES.map((c, i) => [c.slug, i]));
          const filtered = catData.categories
            .filter((c: Category) => officialSlugs.includes(c.slug))
            .sort((a: Category, b: Category) => (slugOrder.get(a.slug) ?? 99) - (slugOrder.get(b.slug) ?? 99));
          setCategories(filtered.length === officialSlugs.length ? filtered : INITIAL_CATEGORIES);
        }
      }

      if (prodRes.ok) {
        const prodData = await prodRes.json();
        if (prodData.success) {
          setProducts(prodData.products);
        }
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchCategoriesAndProducts();
  }, []);

  // Live item count calculation
  const getProductCount = (catSlug: string) => {
    if (products.length === 0) {
      const found = INITIAL_CATEGORIES.find((c) => c.slug === catSlug);
      return found?.itemCount || 0;
    }
    return products.filter(
      (p) => p.categorySlug === catSlug || p.categorySlugs?.includes(catSlug)
    ).length;
  };

  // Strictly enforce displaying ONLY the 8 categories present in the live website
  const officialSlugs = INITIAL_CATEGORIES.map((c) => c.slug);
  const slugOrder = new Map(INITIAL_CATEGORIES.map((c, i) => [c.slug, i]));
  const displayedCategories = (categories.length > 0 ? categories : INITIAL_CATEGORIES)
    .filter((c) => officialSlugs.includes(c.slug))
    .sort((a, b) => (slugOrder.get(a.slug) ?? 99) - (slugOrder.get(b.slug) ?? 99));

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto text-stone-900">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200 p-5 sm:p-6 rounded-3xl shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 font-bold text-[10px] tracking-wider uppercase flex items-center gap-1 shadow-2xs">
                <Sparkles className="w-3 h-3 text-amber-700" />
                Storefront Collections
              </span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
              8 Official Store Collections
            </h1>
            <p className="text-xs text-stone-600 font-medium mt-0.5">
              The 8 official collections published on the live storefront. All products map directly to these categories.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-stone-700 bg-stone-100 border border-stone-200 px-3.5 py-2.5 rounded-xl">
              8 Collections Active
            </span>
            <Link
              href="/category"
              target="_blank"
              className="bg-[#FEE815] hover:bg-[#FFF04B] text-black font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Explore Live Store</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-900" />
            </Link>
          </div>
        </div>

        {/* Categories Grid - Only 8 Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {displayedCategories.map((cat) => {
            const liveCount = getProductCount(cat.slug);
            const isLed = cat.lightingType === 'backlight' || cat.group === 'led-backlight';

            return (
              <div
                key={cat.id}
                className="bg-white rounded-2xl border border-stone-200 hover:border-[#FEE815] overflow-hidden shadow-xs flex flex-col justify-between group transition-all"
              >
                <div className="relative aspect-square w-full bg-stone-100 overflow-hidden border-b border-stone-200">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="bg-stone-900/80 backdrop-blur-xs text-amber-300 border border-amber-400/40 font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-md">
                      {cat.parentType || 'Category'}
                    </span>
                    {isLed && (
                      <span className="bg-amber-100/90 backdrop-blur-xs text-amber-900 border border-amber-300 font-bold text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Zap className="w-2.5 h-2.5 text-amber-700" /> LED Glow
                      </span>
                    )}
                  </div>
                  <span className="absolute bottom-2.5 right-2.5 bg-stone-900/80 backdrop-blur-xs text-white text-[10.5px] font-mono font-bold px-2.5 py-0.5 rounded-md border border-stone-700 flex items-center gap-1">
                    <Package className="w-3 h-3 text-amber-400" />
                    {liveCount} {liveCount === 1 ? 'Item' : 'Items'}
                  </span>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-stone-600 font-medium line-clamp-2 mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 space-y-2.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-stone-500 font-medium flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                        Live in Store
                      </span>
                      <span className="font-mono text-[10.5px] font-bold text-stone-500">
                        {liveCount} Items
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <Link
                        href={`/admin/products?cat=${cat.slug}`}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold transition-all shadow-xs"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#FEE815]" />
                        <span>Edit Items</span>
                      </Link>
                      <a
                        href={`/category/${cat.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-950 bg-[#FEE815] hover:bg-[#FFF04B] font-bold px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs"
                      >
                        <span>Storefront</span>
                        <ExternalLink className="w-3.5 h-3.5 text-stone-900" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
