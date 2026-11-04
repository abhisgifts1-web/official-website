'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  MessageCircle,
  Mail,
  MapPin,
  ExternalLink,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Order } from '@/types';

interface CustomerAggregated {
  fullName: string;
  mobile: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  pincode: string;
  orderCount: number;
  totalSpent: number;
  lastOrderDate: string;
  lastOrderId: string;
  orders: Order[];
}

export default function AdminCustomersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        if (res.ok && data.success) {
          setOrders(data.orders);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  // Aggregate customers from placed orders
  const customerMap = new Map<string, CustomerAggregated>();

  orders.forEach((order) => {
    const key = order.customer.mobile.trim();
    if (!customerMap.has(key)) {
      customerMap.set(key, {
        fullName: order.customer.fullName,
        mobile: order.customer.mobile,
        email: order.customer.email,
        streetAddress: order.customer.streetAddress,
        city: order.customer.city,
        state: order.customer.state,
        pincode: order.customer.pincode,
        orderCount: 1,
        totalSpent: order.totalAmount,
        lastOrderDate: order.createdAt,
        lastOrderId: order.id,
        orders: [order],
      });
    } else {
      const existing = customerMap.get(key)!;
      existing.orderCount += 1;
      existing.totalSpent += order.totalAmount;
      if (new Date(order.createdAt) > new Date(existing.lastOrderDate)) {
        existing.lastOrderDate = order.createdAt;
        existing.lastOrderId = order.id;
        existing.fullName = order.customer.fullName;
        existing.streetAddress = order.customer.streetAddress;
        existing.city = order.customer.city;
        existing.state = order.customer.state;
        existing.pincode = order.customer.pincode;
      }
      existing.orders.push(order);
    }
  });

  const customerList = Array.from(customerMap.values()).sort(
    (a, b) => new Date(b.lastOrderDate).getTime() - new Date(a.lastOrderDate).getTime()
  );

  const filteredCustomers = customerList.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.fullName.toLowerCase().includes(q) ||
      c.mobile.includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    );
  });

  const totalSpentAll = customerList.reduce((acc, c) => acc + c.totalSpent, 0);

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141414] border border-[#2D2D2D] p-5 sm:p-6 rounded-3xl">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#EAB308]/15 border border-[#EAB308]/40 text-[#FACC15] font-bold text-[10px] tracking-wider uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#EAB308]" />
                Customer Directory
              </span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              Ordered Customers
            </h1>
            <p className="text-xs text-[#A1A1AA] mt-0.5">
              Verified buyers who have ordered custom photo frames and sacred wall art, with 1-click WhatsApp messaging.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#1A1A1A] px-4 py-2 rounded-xl border border-[#2D2D2D] shadow-sm text-xs">
              <span className="text-[#A1A1AA] block text-[10px] uppercase font-bold">Total Clients</span>
              <span className="font-serif font-bold text-base text-white">{customerList.length}</span>
            </div>
            <div className="bg-[#1A1A1A] px-4 py-2 rounded-xl border border-[#2D2D2D] shadow-sm text-xs">
              <span className="text-[#A1A1AA] block text-[10px] uppercase font-bold">Gross Lifetime Value</span>
              <span className="font-serif font-bold text-base text-emerald-400">
                ₹{totalSpentAll.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-[#A1A1AA] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name, mobile, email, or city..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#141414] border border-[#2D2D2D] rounded-xl text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#EAB308] shadow-sm"
          />
        </div>

        {/* Customers Table */}
        <div className="bg-[#141414] rounded-3xl border border-[#2D2D2D] shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-12 text-center text-xs text-[#A1A1AA]">Loading customer accounts...</div>
          ) : filteredCustomers.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#A1A1AA]">
              No customers found matching &quot;{search}&quot;.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#D1D5DB]">
                <thead className="bg-[#1C1C1E] text-[#A1A1AA] border-b border-[#2D2D2D] uppercase font-semibold text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Contact &amp; WhatsApp</th>
                    <th className="py-3 px-4">Delivery Destination</th>
                    <th className="py-3 px-4 text-center">Total Orders</th>
                    <th className="py-3 px-4">Total Spent</th>
                    <th className="py-3 px-4">Last Order</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262626]">
                  {filteredCustomers.map((c, i) => {
                    const cleanPhone = c.mobile.replace(/[^0-9]/g, '');
                    const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
                    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
                      `Hello ${c.fullName}! Thank you for choosing Abhi's Gifts. Let us know if you need assistance with your order #${c.lastOrderId}.`
                    )}`;

                    return (
                      <tr key={i} className="hover:bg-[#1A1A1A] transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-bold text-white text-sm">{c.fullName}</div>
                          {c.email && (
                            <div className="text-[11px] text-[#A1A1AA] flex items-center gap-1 mt-0.5">
                              <Mail className="w-3 h-3 text-[#71717A]" />
                              <span>{c.email}</span>
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-semibold text-white">{c.mobile}</span>
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold transition-colors hover:bg-emerald-900"
                              title="Chat with Customer on WhatsApp"
                            >
                              <MessageCircle className="w-3 h-3" />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </td>

                        <td className="py-3 px-4 max-w-xs">
                          <div className="flex items-start gap-1 text-[#D1D5DB] text-[11px]">
                            <MapPin className="w-3 h-3 text-[#EAB308] shrink-0 mt-0.5" />
                            <span className="truncate">
                              {c.city}, {c.state} ({c.pincode})
                            </span>
                          </div>
                          <p className="text-[10px] text-[#A1A1AA] truncate pl-4">
                            {c.streetAddress}
                          </p>
                        </td>

                        <td className="py-3 px-4 text-center">
                          <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-[#1E1E1E] border border-[#333333] text-white font-bold text-[11px]">
                            {c.orderCount}
                          </span>
                        </td>

                        <td className="py-3 px-4 font-serif font-bold text-white">
                          ₹{c.totalSpent.toLocaleString('en-IN')}
                        </td>

                        <td className="py-3 px-4">
                          <div className="text-white font-medium text-[11px]">
                            {new Date(c.lastOrderDate).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </div>
                          <span className="text-[10px] font-mono text-[#A1A1AA]">
                            #{c.lastOrderId}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <Link
                            href={`/admin/orders?search=${c.mobile}`}
                            className="inline-flex items-center gap-1 text-[#EAB308] hover:text-[#FACC15] font-semibold hover:underline text-[11px]"
                          >
                            <span>Orders</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
