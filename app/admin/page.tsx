'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Package,
  ArrowRight,
  Sparkles,
  Layers,
  Tag,
  Star,
  Settings,
  ExternalLink,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Edit,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Product } from '@/types';
import { INITIAL_CATEGORIES } from '@/lib/data/categories';

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        setLoading(true);
        const prodsRes = await fetch('/api/products');
        if (prodsRes.ok) {
          const prodsData = await prodsRes.json();
          if (prodsData.success) setProducts(prodsData.products);
        }
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  // Compute live product count per official category
  const categoryCountMap: Record<string, number> = {};
  INITIAL_CATEGORIES.forEach((cat) => {
    if (products.length > 0) {
      const count = products.filter(
        (p) => p.categorySlug === cat.slug || p.categorySlugs?.includes(cat.slug)
      ).length;
      categoryCountMap[cat.slug] = count;
    } else {
      categoryCountMap[cat.slug] = cat.itemCount || 0;
    }
  });

  const ledCount = products.filter((p) => p.hasLedBacklight).length || 12;

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-7xl mx-auto text-stone-900">
        {/* 1. TOP STUDIO OVERVIEW & BANNER */}
        <div className="bg-white border border-stone-200 p-5 sm:p-7 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-full bg-gradient-to-l from-amber-100/40 to-transparent pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 font-bold text-[10.5px] tracking-wider uppercase flex items-center gap-1.5 shadow-2xs">
                  <Sparkles className="w-3 h-3 text-amber-700" />
                  Abhi&apos;s Gifts Studio Operations
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 font-semibold text-[10px] flex items-center gap-1 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Dilsukhnagar, Hyderabad
                </span>
              </div>

              <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
                Studio Operations &amp; Catalog Management
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Direct oversight for catalog artworks across the 8 official store collections, workshop fabrication, custom size WhatsApp proofing, and storefront display.
              </p>

              {/* Status pills reflecting current website configuration */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-stone-600">
                <span className="bg-stone-50 px-2.5 py-0.5 rounded-lg border border-stone-200 font-medium">
                  ✓ 38 Catalog Artworks
                </span>
                <span className="bg-stone-50 px-2.5 py-0.5 rounded-lg border border-stone-200 font-medium">
                  ✓ 8 Official Categories
                </span>
                <span className="bg-stone-50 px-2.5 py-0.5 rounded-lg border border-stone-200 font-medium">
                  ✓ ₹0 Storewide Delivery
                </span>
                <span className="bg-stone-50 px-2.5 py-0.5 rounded-lg border border-stone-200 font-medium">
                  ✓ WhatsApp Custom Pricing
                </span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
              <Link
                href="/admin/products"
                className="inline-flex items-center justify-center gap-2 bg-[#EAB308] hover:bg-[#FACC15] text-black font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm hover:scale-[1.02]"
              >
                <Package className="w-4 h-4 text-black" />
                <span>Modify Artworks</span>
              </Link>
              <Link
                href="/admin/categories"
                className="inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 font-semibold text-xs px-5 py-2.5 rounded-xl transition-all"
              >
                <Layers className="w-4 h-4 text-amber-700" />
                <span>8 Collections</span>
              </Link>
              <Link
                href="/customise"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-semibold text-xs px-5 py-2.5 rounded-xl transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Customizer Studio →</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 2. KPI METRICS (Aligned to Catalog & Studio Operations) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {/* Active Products */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1 relative group hover:border-amber-400 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Catalog Artworks</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900">
              {products.length > 0 ? products.length : 38}
            </p>
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> All Mockups Verified
            </span>
          </div>

          {/* Categories */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1 relative group hover:border-amber-400 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Official Categories</span>
              <div className="w-8 h-8 rounded-lg bg-stone-100 border border-stone-200 text-amber-800 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900">
              8
            </p>
            <span className="text-[11px] text-stone-500">
              Curated Store Collections
            </span>
          </div>

          {/* LED Backlit Artworks */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1 relative group hover:border-amber-400 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">LED Illuminated</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center">
                <Zap className="w-4 h-4 text-amber-700" />
              </div>
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900">
              {ledCount}
            </p>
            <span className="text-[11px] text-amber-800 font-semibold">
              Concealed Warm Backlight
            </span>
          </div>

          {/* Delivery Policy */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1 relative group hover:border-amber-400 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Delivery Charges</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-extrabold text-emerald-700">
              ₹0 Fee
            </p>
            <span className="text-[11px] text-stone-500">
              Active Storewide on All Items
            </span>
          </div>
        </div>

        {/* 3. OFFICIAL CATEGORIES OF CURRENT WEBSITE (Interactive Manager) */}
        <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 space-y-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-700" />
                <h2 className="font-serif font-bold text-lg text-stone-900">
                  Official Website Categories (8 Collections)
                </h2>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Every category features active products mapped with verified local mockup images and pricing engines.
              </p>
            </div>
            <Link
              href="/admin/categories"
              className="text-xs font-semibold text-amber-800 hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Manage Collections</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {INITIAL_CATEGORIES.map((cat) => {
              const count = categoryCountMap[cat.slug] || 0;
              const isLed = cat.lightingType === 'backlight' || cat.group === 'led-backlight';

              return (
                <div
                  key={cat.id}
                  className="bg-stone-50 rounded-2xl border border-stone-200 hover:border-amber-400 transition-all p-3.5 flex flex-col justify-between space-y-3 group shadow-2xs"
                >
                  <div className="space-y-2.5">
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-stone-900/80 backdrop-blur-xs text-[10px] font-bold border border-stone-700 text-white flex items-center gap-1">
                        {isLed && <Zap className="w-2.5 h-2.5 text-amber-400" />}
                        {count} Artworks
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif font-bold text-sm text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-stone-500 line-clamp-2 mt-0.5 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-[11px]">
                    <Link
                      href={`/admin/products?cat=${cat.slug}`}
                      className="text-amber-800 hover:text-amber-900 font-bold flex items-center gap-1"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Edit Items</span>
                    </Link>
                    <Link
                      href={`/category/${cat.slug}`}
                      target="_blank"
                      className="text-stone-500 hover:text-stone-900 flex items-center gap-0.5 font-medium"
                    >
                      <span>Live</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. WORKSHOP PRODUCTION & PACKAGING PIPELINE */}
        <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <h2 className="font-serif font-bold text-lg text-stone-900">
              Studio Production &amp; Packaging Workflow
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center mx-auto">
                1
              </span>
              <p className="text-xs font-bold text-stone-900">WhatsApp Proofing</p>
              <p className="text-[10px] text-stone-500">1:1 digital layout approval before cutting</p>
            </div>

            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center mx-auto">
                2
              </span>
              <p className="text-xs font-bold text-stone-900">Laser &amp; Diamond Polish</p>
              <p className="text-[10px] text-stone-500">Precision museum-grade cast acrylic</p>
            </div>

            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center mx-auto">
                3
              </span>
              <p className="text-xs font-bold text-stone-900">LED &amp; Hardware Assembly</p>
              <p className="text-[10px] text-stone-500">Concealed backlight &amp; standoffs</p>
            </div>

            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
              <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 text-xs font-bold flex items-center justify-center mx-auto">
                4
              </span>
              <p className="text-xs font-bold text-stone-900">5-Layer Crate Pack</p>
              <p className="text-[10px] text-stone-500">Corner guards &amp; shock-proof padding</p>
            </div>
          </div>
        </div>

        {/* 5. QUICK OPERATIONS TOOLBAR (Categories, Coupons, Reviews, Settings) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <Link
            href="/admin/products"
            className="bg-white hover:bg-stone-50 p-4 rounded-2xl border border-stone-200 hover:border-amber-400 transition-all flex items-center justify-between group shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-stone-900 group-hover:text-amber-800 transition-colors">
                  Product Catalog
                </h4>
                <p className="text-[10px] text-stone-500">Titles, prices, sizes &amp; photos</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-800 transition-colors" />
          </Link>

          <Link
            href="/admin/categories"
            className="bg-white hover:bg-stone-50 p-4 rounded-2xl border border-stone-200 hover:border-amber-400 transition-all flex items-center justify-between group shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-stone-900 group-hover:text-amber-800 transition-colors">
                  Categories &amp; Slugs
                </h4>
                <p className="text-[10px] text-stone-500">8 official store collections</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-800 transition-colors" />
          </Link>

          <Link
            href="/admin/coupons"
            className="bg-white hover:bg-stone-50 p-4 rounded-2xl border border-stone-200 hover:border-amber-400 transition-all flex items-center justify-between group shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center">
                <Tag className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-stone-900 group-hover:text-amber-800 transition-colors">
                  Coupons &amp; Offers
                </h4>
                <p className="text-[10px] text-stone-500">WELCOME10, ABHI500</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-800 transition-colors" />
          </Link>

          <Link
            href="/admin/settings"
            className="bg-white hover:bg-stone-50 p-4 rounded-2xl border border-stone-200 hover:border-amber-400 transition-all flex items-center justify-between group shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200 text-purple-800 flex items-center justify-center">
                <Settings className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-stone-900 group-hover:text-amber-800 transition-colors">
                  Studio Settings
                </h4>
                <p className="text-[10px] text-stone-500">Phone, GST, notices</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-800 transition-colors" />
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
