'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Clock,
  Package,
  ArrowRight,
  TrendingUp,
  Users,
  Edit,
  Sparkles,
  Layers,
  Tag,
  Star,
  Settings,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  Zap,
  Truck,
  CheckCircle2,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Order, Product } from '@/types';
import { INITIAL_CATEGORIES } from '@/lib/data/categories';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<{
    totalRevenue: number;
    totalOrders: number;
    pendingOrders: number;
    deliveredOrders: number;
    lowStockCount: number;
    totalProducts: number;
    recentOrders: Order[];
  } | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsRes, prodsRes] = await Promise.all([
          fetch('/api/admin/stats'),
          fetch('/api/products'),
        ]);

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          if (statsData.success) setStats(statsData.stats);
        }

        if (prodsRes.ok) {
          const prodsData = await prodsRes.json();
          if (prodsData.success) setProducts(prodsData.products);
        }
      } catch (err) {
        console.error('Failed to load admin stats:', err);
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

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* 1. TOP STUDIO OVERVIEW & BANNER */}
        <div className="bg-gradient-to-r from-[#181818] via-[#141414] to-[#181818] border border-[#2D2D2D] p-5 sm:p-7 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-full bg-gradient-to-l from-[#EAB308]/10 to-transparent pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#EAB308]/15 border border-[#EAB308]/40 text-[#FACC15] font-bold text-[10.5px] tracking-wider uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#EAB308]" />
                  Abhi&apos;s Gifts Studio Management
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-semibold text-[10px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Dilsukhnagar, Hyderabad
                </span>
              </div>

              <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#FFFFFF]">
                Studio Operations &amp; Commerce Control
              </h1>
              <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
                Live oversight for catalog products across 8 official categories, customer custom orders, WhatsApp proof verification, and workshop fulfillment.
              </p>

              {/* Status pills reflecting current website configuration */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-[#A1A1AA]">
                <span className="bg-[#1F1F1F] px-2.5 py-0.5 rounded-lg border border-[#2D2D2D] text-[#E5E7EB]">
                  ✓ 38 Catalog Artworks
                </span>
                <span className="bg-[#1F1F1F] px-2.5 py-0.5 rounded-lg border border-[#2D2D2D] text-[#E5E7EB]">
                  ✓ 8 Official Categories Active
                </span>
                <span className="bg-[#1F1F1F] px-2.5 py-0.5 rounded-lg border border-[#2D2D2D] text-[#E5E7EB]">
                  ✓ ₹0 Storewide Delivery
                </span>
                <span className="bg-[#1F1F1F] px-2.5 py-0.5 rounded-lg border border-[#2D2D2D] text-[#E5E7EB]">
                  ✓ WhatsApp Proofing Engine
                </span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
              <Link
                href="/admin/products"
                className="inline-flex items-center justify-center gap-2 bg-[#EAB308] hover:bg-[#FACC15] text-black font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all shadow-[0_2px_12px_rgba(234,179,8,0.25)] hover:scale-[1.02]"
              >
                <Package className="w-4 h-4 text-black" />
                <span>Modify Artworks</span>
              </Link>
              <Link
                href="/admin/orders"
                className="inline-flex items-center justify-center gap-2 bg-[#202020] hover:bg-[#2A2A2A] text-white border border-[#333333] font-semibold text-xs px-5 py-2.5 rounded-xl transition-all"
              >
                <ShoppingBag className="w-4 h-4 text-[#EAB308]" />
                <span>Customer Orders</span>
              </Link>
              <Link
                href="/customise"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 bg-[#202020] hover:bg-[#2A2A2A] text-[#FACC15] border border-[#EAB308]/30 font-semibold text-xs px-5 py-2.5 rounded-xl transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#EAB308]" />
                <span>Customizer Studio →</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 2. KPI METRICS (Aligned with Dark Atelier Aesthetic) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {/* Revenue */}
          <div className="bg-[#141414] p-5 rounded-2xl border border-[#2D2D2D] shadow-sm space-y-1 relative group hover:border-[#EAB308]/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#A1A1AA]">Total Sales</span>
              <div className="w-8 h-8 rounded-lg bg-[#EAB308]/15 border border-[#EAB308]/30 text-[#FACC15] flex items-center justify-center font-bold text-sm">
                ₹
              </div>
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-extrabold text-[#FFFFFF]">
              ₹{(stats?.totalRevenue || 0).toLocaleString('en-IN')}
            </p>
            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Placed Customer Sales
            </span>
          </div>

          {/* Orders */}
          <div className="bg-[#141414] p-5 rounded-2xl border border-[#2D2D2D] shadow-sm space-y-1 relative group hover:border-[#EAB308]/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#A1A1AA]">Total Orders</span>
              <div className="w-8 h-8 rounded-lg bg-[#1E1E1E] border border-[#333333] text-[#EAB308] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-extrabold text-[#FFFFFF]">
              {stats?.totalOrders || 0}
            </p>
            <span className="text-[11px] text-[#A1A1AA]">
              {stats?.deliveredOrders || 0} fulfilled • {stats?.pendingOrders || 0} pending
            </span>
          </div>

          {/* Active Products */}
          <div className="bg-[#141414] p-5 rounded-2xl border border-[#2D2D2D] shadow-sm space-y-1 relative group hover:border-[#EAB308]/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#A1A1AA]">Active Artworks</span>
              <div className="w-8 h-8 rounded-lg bg-[#1E1E1E] border border-[#333333] text-[#FACC15] flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-extrabold text-[#FFFFFF]">
              {products.length > 0 ? products.length : stats?.totalProducts || 38}
            </p>
            <span className="text-[11px] text-[#A1A1AA] flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> All Mockups Verified
            </span>
          </div>

          {/* Categories */}
          <div className="bg-[#141414] p-5 rounded-2xl border border-[#2D2D2D] shadow-sm space-y-1 relative group hover:border-[#EAB308]/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#A1A1AA]">Store Categories</span>
              <div className="w-8 h-8 rounded-lg bg-[#1E1E1E] border border-[#333333] text-[#FACC15] flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-extrabold text-[#FFFFFF]">
              8
            </p>
            <span className="text-[11px] text-[#A1A1AA]">
              Official Curated Collections
            </span>
          </div>
        </div>

        {/* 3. OFFICIAL CATEGORIES OF CURRENT WEBSITE (Interactive Manager) */}
        <div className="bg-[#141414] rounded-3xl border border-[#2D2D2D] p-5 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#EAB308]" />
                <h2 className="font-serif font-bold text-lg text-[#FFFFFF]">
                  Official Website Categories (8 Collections)
                </h2>
              </div>
              <p className="text-xs text-[#A1A1AA] mt-0.5">
                Every category features active products mapped with verified local mockup images and pricing engines.
              </p>
            </div>
            <Link
              href="/admin/categories"
              className="text-xs font-semibold text-[#FACC15] hover:underline flex items-center gap-1 self-start sm:self-auto"
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
                  className="bg-[#1A1A1A] rounded-2xl border border-[#2D2D2D] hover:border-[#EAB308]/60 transition-all p-3.5 flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-2.5">
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/40 border border-[#333333]">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-xs text-[10px] font-bold border border-white/10 text-white flex items-center gap-1">
                        {isLed && <Zap className="w-2.5 h-2.5 text-[#EAB308]" />}
                        {count} Artworks
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif font-bold text-sm text-[#FFFFFF] group-hover:text-[#FACC15] transition-colors leading-snug">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-[#A1A1AA] line-clamp-2 mt-0.5 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#262626] flex items-center justify-between text-[11px]">
                    <Link
                      href={`/admin/products?cat=${cat.slug}`}
                      className="text-[#EAB308] hover:text-[#FACC15] font-semibold flex items-center gap-1"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Edit Items</span>
                    </Link>
                    <Link
                      href={`/category/${cat.slug}`}
                      target="_blank"
                      className="text-[#9CA3AF] hover:text-[#FFFFFF] flex items-center gap-0.5"
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

        {/* 4. WORKSHOP PRODUCTION & ORDER FULFILLMENT PIPELINE */}
        <div className="bg-[#141414] rounded-3xl border border-[#2D2D2D] p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#EAB308]" />
            <h2 className="font-serif font-bold text-lg text-[#FFFFFF]">
              Studio Production Pipeline
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
            <div className="bg-[#1A1A1A] p-3.5 rounded-xl border border-[#2D2D2D] space-y-1">
              <span className="w-6 h-6 rounded-full bg-[#EAB308]/20 text-[#FACC15] text-xs font-bold flex items-center justify-center mx-auto">
                1
              </span>
              <p className="text-xs font-bold text-white">Order Received</p>
              <p className="text-[10px] text-[#A1A1AA]">Customer address &amp; photo logged</p>
            </div>

            <div className="bg-[#1A1A1A] p-3.5 rounded-xl border border-[#2D2D2D] space-y-1">
              <span className="w-6 h-6 rounded-full bg-emerald-900/40 text-emerald-400 text-xs font-bold flex items-center justify-center mx-auto">
                2
              </span>
              <p className="text-xs font-bold text-white">WhatsApp Proof</p>
              <p className="text-[10px] text-[#A1A1AA]">1:1 digital layout approval</p>
            </div>

            <div className="bg-[#1A1A1A] p-3.5 rounded-xl border border-[#2D2D2D] space-y-1">
              <span className="w-6 h-6 rounded-full bg-blue-900/40 text-blue-400 text-xs font-bold flex items-center justify-center mx-auto">
                3
              </span>
              <p className="text-xs font-bold text-white">Laser &amp; Beveling</p>
              <p className="text-[10px] text-[#A1A1AA]">Precision crystal cast fabrication</p>
            </div>

            <div className="bg-[#1A1A1A] p-3.5 rounded-xl border border-[#2D2D2D] space-y-1">
              <span className="w-6 h-6 rounded-full bg-purple-900/40 text-purple-400 text-xs font-bold flex items-center justify-center mx-auto">
                4
              </span>
              <p className="text-xs font-bold text-white">5-Layer Crate</p>
              <p className="text-[10px] text-[#A1A1AA]">Corner guards &amp; shock absorption</p>
            </div>

            <div className="bg-[#1A1A1A] p-3.5 rounded-xl border border-[#2D2D2D] space-y-1 col-span-2 md:col-span-1">
              <span className="w-6 h-6 rounded-full bg-[#EAB308]/20 text-[#FACC15] text-xs font-bold flex items-center justify-center mx-auto">
                5
              </span>
              <p className="text-xs font-bold text-white">Safe Dispatch</p>
              <p className="text-[10px] text-[#A1A1AA]">WhatsApp tracking update sent</p>
            </div>
          </div>
        </div>

        {/* 5. RECENT ORDERS & 1-CLICK WHATSAPP DESK */}
        <div className="bg-[#141414] rounded-3xl border border-[#2D2D2D] shadow-sm overflow-hidden p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#EAB308]" />
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#FFFFFF]">
                  Recent Customer Orders
                </h3>
              </div>
              <p className="text-xs text-[#A1A1AA] mt-0.5">
                Review placed orders, customer delivery addresses, and initiate 1-click WhatsApp proof updates.
              </p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-semibold text-[#FACC15] hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View All Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto border border-[#262626] rounded-2xl">
            <table className="w-full text-left text-xs text-[#D1D5DB]">
              <thead className="bg-[#1C1C1E] text-[#A1A1AA] border-b border-[#2D2D2D] uppercase tracking-wider font-semibold text-[10px]">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Items Ordered</th>
                  <th className="py-3 px-4">Total Amount</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Fulfillment Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262626] bg-[#141414]">
                {!stats?.recentOrders || stats.recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-[#A1A1AA] text-xs">
                      No customer orders placed yet. Placed orders will appear here in real-time.
                    </td>
                  </tr>
                ) : (
                  stats.recentOrders.map((order) => {
                    const waText = encodeURIComponent(
                      `Hi ${order.customer.fullName}! This is Abhi's Gifts regarding your Order #${order.id}. Your artwork is currently in studio production.`
                    );
                    const cleanPhone = order.customer.mobile.replace(/[^0-9]/g, '');
                    const waLink = `https://wa.me/91${cleanPhone.slice(-10)}?text=${waText}`;

                    return (
                      <tr key={order.id} className="hover:bg-[#1A1A1A] transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-white">
                          #{order.id}
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-semibold text-white">{order.customer.fullName}</p>
                          <p className="text-[11px] text-[#A1A1AA] font-mono">
                            {order.customer.mobile} • {order.customer.city}
                          </p>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-medium text-white">
                            {order.items.length} {order.items.length > 1 ? 'pieces' : 'piece'}
                          </span>
                          <span className="text-[11px] text-[#A1A1AA] block truncate max-w-[200px]">
                            {order.items[0]?.title}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-serif font-bold text-white text-sm">
                          ₹{order.totalAmount.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              order.paymentStatus === 'Paid'
                                ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300'
                                : 'bg-[#EAB308]/15 border border-[#EAB308]/40 text-[#FACC15]'
                            }`}
                          >
                            {order.paymentMethod} • {order.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="bg-[#242424] border border-[#333333] text-stone-200 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-500/40 text-emerald-200 text-[10px] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                              title="Chat with Customer on WhatsApp"
                            >
                              <MessageCircle className="w-3 h-3 text-emerald-300" />
                              <span className="hidden sm:inline">WhatsApp</span>
                            </a>
                            <Link
                              href={`/admin/orders?search=${order.id}`}
                              className="text-[#EAB308] hover:text-[#FACC15] font-semibold hover:underline"
                            >
                              View →
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. QUICK OPERATIONS TOOLBAR (Coupons, Reviews, Settings, Customers) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <Link
            href="/admin/customers"
            className="bg-[#141414] hover:bg-[#1A1A1A] p-4 rounded-2xl border border-[#2D2D2D] hover:border-[#EAB308]/50 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-white group-hover:text-[#FACC15] transition-colors">
                  Customer Directory
                </h4>
                <p className="text-[10px] text-[#A1A1AA]">Order history &amp; WhatsApp</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#52525B] group-hover:text-[#FACC15] transition-colors" />
          </Link>

          <Link
            href="/admin/coupons"
            className="bg-[#141414] hover:bg-[#1A1A1A] p-4 rounded-2xl border border-[#2D2D2D] hover:border-[#EAB308]/50 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EAB308]/15 border border-[#EAB308]/30 text-[#FACC15] flex items-center justify-center">
                <Tag className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-white group-hover:text-[#FACC15] transition-colors">
                  Coupons &amp; Offers
                </h4>
                <p className="text-[10px] text-[#A1A1AA]">WELCOME10, ABHI500</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#52525B] group-hover:text-[#FACC15] transition-colors" />
          </Link>

          <Link
            href="/admin/reviews"
            className="bg-[#141414] hover:bg-[#1A1A1A] p-4 rounded-2xl border border-[#2D2D2D] hover:border-[#EAB308]/50 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <Star className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-white group-hover:text-[#FACC15] transition-colors">
                  Customer Reviews
                </h4>
                <p className="text-[10px] text-[#A1A1AA]">Feedback moderation</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#52525B] group-hover:text-[#FACC15] transition-colors" />
          </Link>

          <Link
            href="/admin/settings"
            className="bg-[#141414] hover:bg-[#1A1A1A] p-4 rounded-2xl border border-[#2D2D2D] hover:border-[#EAB308]/50 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400 flex items-center justify-center">
                <Settings className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-white group-hover:text-[#FACC15] transition-colors">
                  Studio Settings
                </h4>
                <p className="text-[10px] text-[#A1A1AA]">Phone, GST, notices</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#52525B] group-hover:text-[#FACC15] transition-colors" />
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
