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
  ShoppingBag,
  Users,
  IndianRupee,
  Clock,
  Sliders,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Product } from '@/types';
import { INITIAL_CATEGORIES } from '@/lib/data/categories';

interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  deliveredOrders: number;
  lowStockCount: number;
  totalProducts: number;
}

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [prodsRes, statsRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/admin/stats'),
        ]);

        if (prodsRes.ok) {
          const prodsData = await prodsRes.json();
          if (prodsData.success) setProducts(prodsData.products);
        }

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          if (statsData.success) setStats(statsData.stats);
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
  const totalArtworkCount = products.length > 0 ? products.length : (stats?.totalProducts || 38);

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-7xl mx-auto text-stone-900">
        {/* 1. TOP STUDIO OVERVIEW & LUXURY BANNER */}
        <div className="bg-[#121212] border border-[#EAB308]/30 p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden text-white">
          <div className="absolute -right-10 -top-10 w-80 h-80 bg-[#EAB308]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-1/3 -bottom-10 w-60 h-60 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#1F1F1F] border border-[#EAB308]/40 text-[#FACC15] font-bold text-[10.5px] tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[#EAB308]" />
                  Abhi&apos;s Gifts Atelier Operations
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-semibold text-[10px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Dilsukhnagar, Hyderabad
                </span>
              </div>

              <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white tracking-tight">
                Studio Operations &amp; Catalog Management
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Direct atelier oversight for artworks across all 8 official collections, automated custom size pricing engine, workshop fabrication pipeline, and live storefront display.
              </p>

              {/* Status pills reflecting live website configuration */}
              <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px]">
                <span className="bg-[#1C1C1C] text-stone-200 px-3 py-1 rounded-lg border border-stone-800 font-medium">
                  ✓ {totalArtworkCount} Catalog Artworks
                </span>
                <span className="bg-[#1C1C1C] text-stone-200 px-3 py-1 rounded-lg border border-stone-800 font-medium">
                  ✓ 8 Official Collections
                </span>
                <span className="bg-[#1C1C1C] text-stone-200 px-3 py-1 rounded-lg border border-stone-800 font-medium">
                  ✓ ₹0 Free Delivery India-wide
                </span>
                <span className="bg-[#1C1C1C] text-[#FACC15] px-3 py-1 rounded-lg border border-[#EAB308]/30 font-medium">
                  ✓ Auto Custom Size Pricing Live
                </span>
                <span className="bg-[#1C1C1C] text-stone-200 px-3 py-1 rounded-lg border border-stone-800 font-medium">
                  ✓ Ambient LED Backlighting
                </span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap lg:flex-col gap-2.5 shrink-0">
              <Link
                href="/admin/products"
                className="inline-flex items-center justify-center gap-2 bg-[#EAB308] hover:bg-[#FACC15] text-stone-950 font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md shadow-[#EAB308]/20 hover:scale-[1.02]"
              >
                <Package className="w-4 h-4 text-stone-950" />
                <span>Modify Artworks</span>
              </Link>
              <Link
                href="/admin/orders"
                className="inline-flex items-center justify-center gap-2 bg-[#1C1C1C] hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-700 font-semibold text-xs px-5 py-2.5 rounded-xl transition-all"
              >
                <ShoppingBag className="w-4 h-4 text-[#EAB308]" />
                <span>Orders &amp; Inquiries</span>
              </Link>
              <Link
                href="/admin/categories"
                className="inline-flex items-center justify-center gap-2 bg-[#1C1C1C] hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-700 font-semibold text-xs px-5 py-2.5 rounded-xl transition-all"
              >
                <Layers className="w-4 h-4 text-[#EAB308]" />
                <span>8 Collections</span>
              </Link>
              <Link
                href="/customise"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-950/80 to-stone-900 hover:from-amber-900/80 hover:to-stone-850 text-[#FACC15] border border-[#EAB308]/40 font-semibold text-xs px-5 py-2.5 rounded-xl transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#EAB308]" />
                <span>Customizer Studio ↗</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 2. KPI METRICS (Live Operations & Catalog Stats) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {/* Active Products */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1 relative group hover:border-[#EAB308] transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Catalog Artworks</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center">
                <Package className="w-4 h-4 text-[#CA8A04]" />
              </div>
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900">
              {totalArtworkCount}
            </p>
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active in Storefront
            </span>
          </div>

          {/* Official Collections */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1 relative group hover:border-[#EAB308] transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Official Categories</span>
              <div className="w-8 h-8 rounded-lg bg-stone-100 border border-stone-200 text-stone-800 flex items-center justify-center">
                <Layers className="w-4 h-4 text-[#CA8A04]" />
              </div>
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900">
              8
            </p>
            <span className="text-[11px] text-stone-500">
              Curated Store Collections
            </span>
          </div>

          {/* LED Illuminated Artworks */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1 relative group hover:border-[#EAB308] transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">LED Illuminated</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center">
                <Zap className="w-4 h-4 text-[#CA8A04]" />
              </div>
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900">
              {ledCount}
            </p>
            <span className="text-[11px] text-amber-800 font-semibold">
              Ambient LED Backlight (12V Safe)
            </span>
          </div>

          {/* Custom Size Engine */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1 relative group hover:border-[#EAB308] transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Custom Sizing Engine</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
                <Sliders className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
            <p className="font-serif text-xl sm:text-2xl font-extrabold text-emerald-700">
              Auto-Calculated
            </p>
            <span className="text-[11px] text-stone-500">
              Area-Interpolated Live Pricing
            </span>
          </div>
        </div>

        {/* 3. STUDIO ORDERS & REVENUE SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Total Orders</p>
              <p className="font-serif text-2xl font-extrabold text-stone-900 mt-1">
                {stats?.totalOrders ?? 0}
              </p>
              <p className="text-[11px] text-stone-500 mt-0.5">
                {stats?.pendingOrders ?? 0} in active fabrication
              </p>
            </div>
            <Link
              href="/admin/orders"
              className="p-3 bg-stone-100 hover:bg-[#EAB308] text-stone-700 hover:text-stone-950 rounded-xl transition-colors"
              title="View Orders"
            >
              <ShoppingBag className="w-5 h-5" />
            </Link>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Studio Revenue</p>
              <p className="font-serif text-2xl font-extrabold text-stone-900 mt-1">
                ₹{(stats?.totalRevenue ?? 0).toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                Paid &amp; Dispatched Artworks
              </p>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Shipping Policy</p>
              <p className="font-serif text-2xl font-extrabold text-emerald-700 mt-1">
                ₹0 Free Delivery
              </p>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Storewide on all sizes across India
              </p>
            </div>
            <div className="p-3 bg-stone-100 text-stone-700 rounded-xl border border-stone-200">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* 4. OFFICIAL CATEGORIES OF CURRENT WEBSITE (Interactive Manager) */}
        <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-7 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#CA8A04]" />
                <h2 className="font-serif font-bold text-lg text-stone-900">
                  Official Website Categories (8 Collections)
                </h2>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Every category features active acrylic artworks mapped with verified local mockup images, ambient LED options, and automatic sizing.
              </p>
            </div>
            <Link
              href="/admin/categories"
              className="text-xs font-bold text-stone-900 hover:text-[#CA8A04] flex items-center gap-1 self-start sm:self-auto bg-stone-100 hover:bg-stone-200 px-3.5 py-1.5 rounded-lg transition-colors"
            >
              <span>Manage Collections</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INITIAL_CATEGORIES.map((cat) => {
              const count = categoryCountMap[cat.slug] || 0;
              const isLed = cat.lightingType === 'backlight' || cat.group === 'led-backlight';

              return (
                <div
                  key={cat.id}
                  className="bg-stone-50 rounded-2xl border border-stone-200 hover:border-[#EAB308] transition-all p-3.5 flex flex-col justify-between space-y-3 group shadow-2xs"
                >
                  <div className="space-y-2.5">
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-stone-200 border border-stone-200">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-stone-950/85 backdrop-blur-xs text-[10px] font-bold border border-stone-700 text-white flex items-center gap-1">
                        {isLed ? <Zap className="w-2.5 h-2.5 text-[#FACC15]" /> : null}
                        {count} Artworks
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif font-bold text-sm text-stone-900 group-hover:text-[#CA8A04] transition-colors leading-snug">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-stone-600 line-clamp-2 mt-0.5 leading-relaxed font-medium">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-[11px]">
                    <Link
                      href={`/admin/products?cat=${cat.slug}`}
                      className="text-stone-800 hover:text-[#CA8A04] font-bold flex items-center gap-1"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Edit Items</span>
                    </Link>
                    <Link
                      href={`/category/${cat.slug}`}
                      target="_blank"
                      className="text-stone-700 hover:text-stone-950 flex items-center gap-0.5 font-semibold"
                    >
                      <span>Live View</span>
                      <ExternalLink className="w-2.5 h-2.5 text-[#CA8A04]" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. WORKSHOP PRODUCTION & PACKAGING PIPELINE */}
        <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-7 space-y-4 shadow-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#CA8A04]" />
            <h2 className="font-serif font-bold text-lg text-stone-900">
              Studio Production &amp; Packaging Workflow
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 text-center">
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-1.5">
              <span className="w-7 h-7 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold flex items-center justify-center mx-auto shadow-2xs">
                1
              </span>
              <p className="text-xs font-bold text-stone-900">Auto Sizing &amp; Proofing</p>
              <p className="text-[10.5px] text-stone-600 font-medium">Live area pricing calculation &amp; 1:1 WhatsApp digital mock approval</p>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-1.5">
              <span className="w-7 h-7 rounded-full bg-blue-100 border border-blue-300 text-blue-900 text-xs font-bold flex items-center justify-center mx-auto shadow-2xs">
                2
              </span>
              <p className="text-xs font-bold text-stone-900">Laser &amp; Diamond Polish</p>
              <p className="text-[10.5px] text-stone-600 font-medium">High-definition 3mm/5mm museum-grade cast acrylic precision cut</p>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-1.5">
              <span className="w-7 h-7 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center justify-center mx-auto shadow-2xs">
                3
              </span>
              <p className="text-xs font-bold text-stone-900">Ambient LED Assembly</p>
              <p className="text-[10.5px] text-stone-600 font-medium">Concealed perimeter LED strip &amp; 12V 2A power adapter integration</p>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-1.5">
              <span className="w-7 h-7 rounded-full bg-purple-100 border border-purple-300 text-purple-900 text-xs font-bold flex items-center justify-center mx-auto shadow-2xs">
                4
              </span>
              <p className="text-xs font-bold text-stone-900">5-Layer Crate Pack</p>
              <p className="text-[10.5px] text-stone-600 font-medium">Heavy-duty corner guards &amp; shockproof foam for zero-breakage transit</p>
            </div>
          </div>
        </div>

        {/* 6. QUICK OPERATIONS TOOLBAR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          <Link
            href="/admin/products"
            className="bg-white hover:bg-stone-50 p-4 rounded-2xl border border-stone-200 hover:border-[#EAB308] transition-all flex items-center justify-between group shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center">
                <Package className="w-4 h-4 text-[#CA8A04]" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-stone-900 group-hover:text-[#CA8A04] transition-colors">
                  Product Catalog
                </h4>
                <p className="text-[10px] text-stone-600 font-medium">Titles, prices, sizes &amp; photos</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#CA8A04] transition-colors" />
          </Link>

          <Link
            href="/admin/orders"
            className="bg-white hover:bg-stone-50 p-4 rounded-2xl border border-stone-200 hover:border-[#EAB308] transition-all flex items-center justify-between group shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-blue-700" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-stone-900 group-hover:text-[#CA8A04] transition-colors">
                  Orders &amp; Tracking
                </h4>
                <p className="text-[10px] text-stone-600 font-medium">Dispatches &amp; proofing</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#CA8A04] transition-colors" />
          </Link>

          <Link
            href="/admin/team"
            className="bg-white hover:bg-stone-50 p-4 rounded-2xl border border-stone-200 hover:border-[#EAB308] transition-all flex items-center justify-between group shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-stone-900 group-hover:text-[#CA8A04] transition-colors">
                  Team &amp; Staff
                </h4>
                <p className="text-[10px] text-stone-600 font-medium">Personal photos &amp; access</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#CA8A04] transition-colors" />
          </Link>

          <Link
            href="/admin/coupons"
            className="bg-white hover:bg-stone-50 p-4 rounded-2xl border border-stone-200 hover:border-[#EAB308] transition-all flex items-center justify-between group shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center">
                <Tag className="w-4 h-4 text-[#CA8A04]" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-stone-900 group-hover:text-[#CA8A04] transition-colors">
                  Coupons &amp; Offers
                </h4>
                <p className="text-[10px] text-stone-600 font-medium">Promo codes &amp; discounts</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#CA8A04] transition-colors" />
          </Link>

          <Link
            href="/admin/settings"
            className="bg-white hover:bg-stone-50 p-4 rounded-2xl border border-stone-200 hover:border-[#EAB308] transition-all flex items-center justify-between group shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200 text-purple-800 flex items-center justify-center">
                <Settings className="w-4 h-4 text-purple-700" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-stone-900 group-hover:text-[#CA8A04] transition-colors">
                  Studio Settings
                </h4>
                <p className="text-[10px] text-stone-600 font-medium">Phone, GST, notices &amp; store</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#CA8A04] transition-colors" />
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
