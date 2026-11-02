'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  ShoppingBag,
  ExternalLink,
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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
              Ordered Customers
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Customers who have placed orders on Abhi&apos;s Gifts with direct contact &amp; order history.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white px-3.5 py-2 rounded-xl border border-stone-200 shadow-sm text-xs">
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Total Customers</span>
              <span className="font-serif font-bold text-base text-stone-900">{customerList.length}</span>
            </div>
            <div className="bg-white px-3.5 py-2 rounded-xl border border-stone-200 shadow-sm text-xs">
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Total Sales</span>
              <span className="font-serif font-bold text-base text-emerald-800">
                ₹{totalSpentAll.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name, mobile, email, or city..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-700 shadow-sm"
          />
        </div>

        {/* Customers Table */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-12 text-center text-xs text-stone-400">Loading customers...</div>
          ) : filteredCustomers.length === 0 ? (
            <div className="py-12 text-center text-xs text-stone-500">
              No customers found matching &quot;{search}&quot;.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-600 border-b border-stone-200 uppercase font-semibold text-[11px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Contact &amp; WhatsApp</th>
                    <th className="py-3 px-4">Delivery Location</th>
                    <th className="py-3 px-4 text-center">Orders</th>
                    <th className="py-3 px-4">Total Spent</th>
                    <th className="py-3 px-4">Last Order</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredCustomers.map((c, i) => {
                    const cleanPhone = c.mobile.replace(/[^0-9]/g, '');
                    const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
                    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
                      `Hello ${c.fullName}, thank you for your order on Abhi's Gifts!`
                    )}`;

                    return (
                      <tr key={i} className="hover:bg-amber-50/40 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-bold text-stone-900 text-sm">{c.fullName}</div>
                          {c.email && (
                            <div className="text-[11px] text-stone-400 flex items-center gap-1 mt-0.5">
                              <Mail className="w-3 h-3 text-stone-300" />
                              <span>{c.email}</span>
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-semibold text-stone-800">{c.mobile}</span>
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[10px] font-bold transition-colors"
                              title="Chat with Customer on WhatsApp"
                            >
                              <MessageCircle className="w-3 h-3 text-emerald-600" />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </td>

                        <td className="py-3 px-4 max-w-xs">
                          <div className="flex items-start gap-1 text-stone-600 text-[11px]">
                            <MapPin className="w-3 h-3 text-amber-700 shrink-0 mt-0.5" />
                            <span className="truncate">
                              {c.city}, {c.state} ({c.pincode})
                            </span>
                          </div>
                          <p className="text-[10px] text-stone-400 truncate pl-4">
                            {c.streetAddress}
                          </p>
                        </td>

                        <td className="py-3 px-4 text-center">
                          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-stone-100 text-stone-800 font-bold text-[11px]">
                            {c.orderCount}
                          </span>
                        </td>

                        <td className="py-3 px-4 font-serif font-bold text-stone-900">
                          ₹{c.totalSpent.toLocaleString('en-IN')}
                        </td>

                        <td className="py-3 px-4">
                          <div className="text-stone-700 font-medium text-[11px]">
                            {new Date(c.lastOrderDate).toLocaleDateString('en-IN')}
                          </div>
                          <span className="text-[10px] font-mono text-stone-400">
                            ID: {c.lastOrderId}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <Link
                            href={`/admin/orders?search=${c.mobile}`}
                            className="inline-flex items-center gap-1 text-amber-800 hover:text-amber-900 font-semibold hover:underline text-[11px]"
                          >
                            <span>View Orders</span>
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
