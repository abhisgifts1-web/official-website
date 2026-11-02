'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Clock,
  Package,
  ArrowRight,
  TrendingUp,
  Users,
  Edit,
  CheckCircle2,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Order } from '@/types';

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

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats');
        const data = await res.json();
        if (res.ok && data.success) {
          setStats(data.stats);
        }
      } catch {
        // ignore
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Top welcome */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[10px] tracking-wider uppercase">
                Staff Operations Portal
              </span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
              Staff Portal Overview
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Dedicated tools to modify product data and manage customers who have ordered.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/products"
              className="bg-stone-900 hover:bg-amber-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Package className="w-4 h-4 text-amber-300" />
              <span>Modify Products</span>
            </Link>
            <Link
              href="/admin/orders"
              className="bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4 text-amber-800" />
              <span>Customer Orders</span>
            </Link>
          </div>
        </div>

        {/* Two Primary Staff Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Card 1: Product Data Modifier */}
          <div className="bg-gradient-to-br from-amber-900/10 via-stone-50 to-white p-6 rounded-3xl border border-amber-800/20 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-stone-900 text-amber-300 flex items-center justify-center shadow-sm">
                <Edit className="w-5 h-5" />
              </div>
              <h2 className="font-serif font-bold text-lg text-stone-900">
                Modify Product Data
              </h2>
              <p className="text-xs text-stone-600 leading-relaxed">
                Update product titles, selling prices, MRP, 3000K LED options, high-resolution product photos, and stock status.
              </p>
            </div>

            <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500">
                {stats?.totalProducts || 0} Products in Catalog
              </span>
              <Link
                href="/admin/products"
                className="inline-flex items-center gap-1 bg-stone-900 hover:bg-amber-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
              >
                <span>Edit Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Ordered Customers & Orders */}
          <div className="bg-gradient-to-br from-emerald-900/10 via-stone-50 to-white p-6 rounded-3xl border border-emerald-800/20 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shadow-sm">
                <Users className="w-5 h-5" />
              </div>
              <h2 className="font-serif font-bold text-lg text-stone-900">
                Customers Who Ordered
              </h2>
              <p className="text-xs text-stone-600 leading-relaxed">
                Review buyers who placed orders, customer shipping addresses, order amounts, and initiate 1-click WhatsApp order updates.
              </p>
            </div>

            <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500">
                {stats?.totalOrders || 0} Orders Received
              </span>
              <Link
                href="/admin/customers"
                className="inline-flex items-center gap-1 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
              >
                <span>View Customers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* KPI Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-stone-400">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Total Revenue</span>
              <div className="w-8 h-8 rounded-lg bg-[#FCE7EA] text-[#651E2D] flex items-center justify-center font-bold text-sm">
                ₹
              </div>
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              ₹{(stats?.totalRevenue || 0).toLocaleString('en-IN')}
            </p>
            <span className="text-[11px] text-[#651E2D] font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Customer Sales
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-stone-400">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Total Orders</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {stats?.totalOrders || 0}
            </p>
            <span className="text-[11px] text-stone-500">Placed orders</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-stone-400">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Pending Fulfillment</span>
              <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-700 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-orange-900">
              {stats?.pendingOrders || 0}
            </p>
            <span className="text-[11px] text-stone-500">Requires framing &amp; dispatch</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-stone-400">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Active Products</span>
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {stats?.totalProducts || 0}
            </p>
            <span className="text-[11px] text-stone-500">Ready for editing</span>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden space-y-4 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900">
                Recent Customer Orders
              </h3>
              <p className="text-xs text-stone-500">
                Latest customer orders requiring packaging, printing, or courier dispatch.
              </p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-semibold text-amber-800 hover:underline flex items-center gap-1"
            >
              <span>View All Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-500 border-b border-stone-200 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {stats?.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-stone-900">
                      {order.id}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-stone-800">{order.customer.fullName}</p>
                      <p className="text-[11px] text-stone-400 font-mono">{order.customer.mobile} • {order.customer.city}</p>
                    </td>
                    <td className="py-3 px-4">
                      {order.items.length} {order.items.length > 1 ? 'pieces' : 'piece'}
                    </td>
                    <td className="py-3 px-4 font-serif font-bold text-stone-900">
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          order.paymentStatus === 'Paid'
                            ? 'bg-[#FCE7EA] text-[#651E2D]'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {order.paymentMethod} • {order.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-stone-100 text-stone-800 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/admin/orders?search=${order.id}`}
                        className="text-amber-800 hover:underline font-semibold"
                      >
                        Details →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
