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
  Download,
  Phone,
  X,
  Package,
  Calendar,
  IndianRupee,
  ShieldCheck,
  Check,
  Copy,
  ChevronRight,
  Filter,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { formatSizeWithSqFt } from '@/lib/utils/sizeFormat';
import { Order } from '@/types';

export interface CustomerAggregated {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  streetAddress: string;
  apartment?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  orderCount: number;
  totalSpent: number;
  averageOrderValue: number;
  firstOrderDate: string;
  lastOrderDate: string;
  lastOrderId: string;
  lastOrderStatus: string;
  customerTier: 'VIP' | 'Repeat' | 'New';
  orders: Order[];
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<CustomerAggregated[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState<'All' | 'VIP' | 'Repeat' | 'New'>('All');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerAggregated | null>(null);
  const [copiedText, setCopiedText] = useState(false);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        setLoading(true);
        // 1. Try dedicated customers endpoint
        const res = await fetch('/api/admin/customers');
        const data = await res.json();
        if (res.ok && data.success && Array.isArray(data.customers)) {
          setCustomers(data.customers);
          return;
        }

        // 2. Fallback to /api/orders and aggregate on client
        const ordersRes = await fetch('/api/orders');
        const ordersData = await ordersRes.json();
        if (ordersRes.ok && ordersData.success && Array.isArray(ordersData.orders)) {
          const map = new Map<string, CustomerAggregated>();
          ordersData.orders.forEach((o: Order) => {
            if (!o.customer) return;
            const rawPhone = (o.customer.mobile || '').trim();
            const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
            const key = cleanPhone || (o.customer.email || '').trim().toLowerCase();
            if (!key) return;

            const amt = Number(o.totalAmount) || 0;
            const oDate = o.createdAt || new Date().toISOString();

            if (!map.has(key)) {
              map.set(key, {
                id: `cust-${cleanPhone || Math.random().toString(36).substring(2, 9)}`,
                fullName: o.customer.fullName || 'Valued Client',
                mobile: o.customer.mobile || '',
                email: o.customer.email || '',
                streetAddress: o.customer.streetAddress || '',
                apartment: o.customer.apartment || '',
                landmark: o.customer.landmark || '',
                city: o.customer.city || '',
                state: o.customer.state || '',
                pincode: o.customer.pincode || '',
                orderCount: 1,
                totalSpent: amt,
                averageOrderValue: amt,
                firstOrderDate: oDate,
                lastOrderDate: oDate,
                lastOrderId: o.id,
                lastOrderStatus: o.orderStatus || 'Confirmed',
                customerTier: 'New',
                orders: [o],
              });
            } else {
              const ex = map.get(key)!;
              ex.orderCount += 1;
              ex.totalSpent += amt;
              ex.orders.push(o);
              if (new Date(oDate) > new Date(ex.lastOrderDate)) {
                ex.lastOrderDate = oDate;
                ex.lastOrderId = o.id;
                ex.lastOrderStatus = o.orderStatus || ex.lastOrderStatus;
                if (o.customer.fullName) ex.fullName = o.customer.fullName;
                if (o.customer.email) ex.email = o.customer.email;
                if (o.customer.streetAddress) ex.streetAddress = o.customer.streetAddress;
                if (o.customer.apartment) ex.apartment = o.customer.apartment;
                if (o.customer.landmark) ex.landmark = o.customer.landmark;
                if (o.customer.city) ex.city = o.customer.city;
                if (o.customer.state) ex.state = o.customer.state;
                if (o.customer.pincode) ex.pincode = o.customer.pincode;
              }
            }
          });

          const list = Array.from(map.values()).map((c) => {
            c.averageOrderValue = Math.round(c.totalSpent / (c.orderCount || 1));
            c.customerTier =
              c.totalSpent >= 5000 || c.orderCount >= 3
                ? 'VIP'
                : c.orderCount >= 2
                ? 'Repeat'
                : 'New';
            c.orders.sort(
              (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            return c;
          });

          list.sort(
            (a, b) => new Date(b.lastOrderDate).getTime() - new Date(a.lastOrderDate).getTime()
          );

          setCustomers(list);
        }
      } catch (err) {
        console.error('Error loading customers:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, []);

  // Filter customers
  const filteredCustomers = customers.filter((c) => {
    if (tierFilter !== 'All' && c.customerTier !== tierFilter) return false;
    if (!search.trim()) return true;

    const q = search.trim().toLowerCase();
    return (
      c.fullName.toLowerCase().includes(q) ||
      c.mobile.includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.state.toLowerCase().includes(q) ||
      c.pincode.includes(q) ||
      c.lastOrderId.toLowerCase().includes(q)
    );
  });

  // KPI calculations
  const totalClients = customers.length;
  const repeatCount = customers.filter((c) => c.orderCount > 1).length;
  const repeatRate = totalClients > 0 ? Math.round((repeatCount / totalClients) * 100) : 0;
  const totalSpentAll = customers.reduce((acc, c) => acc + c.totalSpent, 0);
  const averageClientValue = totalClients > 0 ? Math.round(totalSpentAll / totalClients) : 0;

  // Export to CSV
  const handleExportCSV = () => {
    if (customers.length === 0) return;

    const headers = [
      'Customer Name',
      'Mobile Phone',
      'Email',
      'Total Orders',
      'Total Spent (INR)',
      'Customer Tier',
      'Last Order ID',
      'Last Order Date',
      'Street Address',
      'City',
      'State',
      'Pincode',
    ];

    const rows = customers.map((c) => [
      `"${c.fullName.replace(/"/g, '""')}"`,
      `"${c.mobile}"`,
      `"${c.email || ''}"`,
      c.orderCount,
      c.totalSpent,
      `"${c.customerTier}"`,
      `"${c.lastOrderId}"`,
      `"${new Date(c.lastOrderDate).toLocaleDateString('en-IN')}"`,
      `"${(c.streetAddress || '').replace(/"/g, '""')}"`,
      `"${c.city || ''}"`,
      `"${c.state || ''}"`,
      `"${c.pincode || ''}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `AbhiGifts_Ordered_Customers_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto text-stone-900 pb-12">
        {/* 1. Header & Live Connect Overview */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200 p-5 sm:p-6 rounded-3xl shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 font-bold text-[10px] tracking-wider uppercase flex items-center gap-1 shadow-2xs">
                <Sparkles className="w-3 h-3 text-amber-700" />
                Live Customer Operations
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold text-[10px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Storefront Connected
              </span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
              Ordered Customers
            </h1>
            <p className="text-xs text-stone-500 mt-0.5 max-w-2xl">
              Verified clients who ordered custom acrylic wall art and photo frames. Inspect order history, full delivery addresses, and initiate 1-click WhatsApp follow-ups.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExportCSV}
              disabled={customers.length === 0}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50"
              title="Download full customer spreadsheet"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* 2. KPI Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-stone-500">
                Total Ordered Clients
              </span>
              <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center">
                <Users className="w-3.5 h-3.5 text-[#E0CC04]" />
              </div>
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900">
              {totalClients}
            </p>
            <span className="text-[10.5px] text-emerald-700 font-semibold flex items-center gap-1">
              Active verified buyers
            </span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-stone-500">
                Repeat Buyer Rate
              </span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
              </div>
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900">
              {repeatRate}%
            </p>
            <span className="text-[10.5px] text-stone-500 font-medium">
              {repeatCount} customers with 2+ orders
            </span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-stone-500">
                Avg Client Value (AOV)
              </span>
              <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 flex items-center justify-center">
                <IndianRupee className="w-3.5 h-3.5 text-blue-700" />
              </div>
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900">
              ₹{averageClientValue.toLocaleString('en-IN')}
            </p>
            <span className="text-[10.5px] text-stone-500 font-medium">
              Per verified customer
            </span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-stone-500">
                Gross Client Spend
              </span>
              <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-[#E0CC04]" />
              </div>
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-extrabold text-amber-800">
              ₹{totalSpentAll.toLocaleString('en-IN')}
            </p>
            <span className="text-[10.5px] text-stone-500 font-medium">
              Total lifetime revenue
            </span>
          </div>
        </div>

        {/* 3. Search Bar & Segment Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by customer name, mobile, email, city, order ID..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-500 shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'All', label: 'All Clients', count: totalClients },
              { id: 'VIP', label: 'VIP (₹5k+)', count: customers.filter((c) => c.customerTier === 'VIP').length },
              { id: 'Repeat', label: 'Repeat Buyers', count: repeatCount },
              { id: 'New', label: 'New Clients', count: customers.filter((c) => c.customerTier === 'New').length },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTierFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 border ${
                  tierFilter === tab.id
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    tierFilter === tab.id
                      ? 'bg-stone-700 text-amber-300'
                      : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Customers Table */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
          {loading ? (
            <div className="py-16 text-center text-xs text-stone-500 space-y-2">
              <div className="w-6 h-6 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p>Loading verified customer profiles...</p>
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="py-16 text-center text-xs text-stone-500 space-y-1">
              <Users className="w-8 h-8 text-stone-300 mx-auto mb-2" />
              <p className="font-bold text-stone-700 text-sm">No customers found</p>
              <p>No client records match your search query &quot;{search}&quot;.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="bg-stone-100 text-stone-700 border-b border-stone-200 uppercase font-bold text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Client Profile</th>
                    <th className="py-3.5 px-4">Contact &amp; WhatsApp</th>
                    <th className="py-3.5 px-4">Delivery Destination</th>
                    <th className="py-3.5 px-4 text-center">Orders</th>
                    <th className="py-3.5 px-4">Total Spent</th>
                    <th className="py-3.5 px-4">Latest Order</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredCustomers.map((c) => {
                    const cleanPhone = c.mobile.replace(/[^0-9]/g, '');
                    const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
                    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
                      `Hello ${c.fullName}! Thank you for choosing Abhi's Gifts. Let us know if you need assistance with your order #${c.lastOrderId}.`
                    )}`;

                    const initials = c.fullName
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase();

                    return (
                      <tr
                        key={c.id}
                        className="hover:bg-stone-50/80 transition-colors cursor-pointer group"
                        onClick={() => setSelectedCustomer(c)}
                      >
                        {/* Customer */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-200 text-amber-900 font-bold font-serif text-xs flex items-center justify-center shrink-0">
                              {initials}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-stone-900 text-sm group-hover:text-amber-800 transition-colors">
                                  {c.fullName}
                                </span>
                                {c.customerTier === 'VIP' && (
                                  <span className="px-1.5 py-0.2 rounded-md bg-amber-100 text-amber-800 text-[9px] font-bold border border-amber-300">
                                    VIP
                                  </span>
                                )}
                                {c.customerTier === 'Repeat' && (
                                  <span className="px-1.5 py-0.2 rounded-md bg-emerald-50 text-emerald-800 text-[9px] font-bold border border-emerald-300">
                                    Repeat
                                  </span>
                                )}
                              </div>
                              {c.email && (
                                <div className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                                  <Mail className="w-3 h-3 text-stone-400" />
                                  <span className="truncate max-w-[180px]">{c.email}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-semibold text-stone-900">{c.mobile}</span>
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10px] font-bold transition-colors hover:bg-emerald-100 shadow-2xs"
                              title="Chat with Customer on WhatsApp"
                            >
                              <MessageCircle className="w-3 h-3 text-emerald-600" />
                              <span>WhatsApp</span>
                            </a>
                            <a
                              href={`tel:${c.mobile}`}
                              className="p-1 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors"
                              title="Call customer"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </td>

                        {/* Delivery Destination */}
                        <td className="py-3.5 px-4 max-w-xs">
                          <div className="flex items-start gap-1 text-stone-700 text-[11px]">
                            <MapPin className="w-3 h-3 text-amber-700 shrink-0 mt-0.5" />
                            <span className="font-semibold text-stone-900 truncate">
                              {c.city ? `${c.city}, ${c.state}` : 'Hyderabad'} {c.pincode ? `(${c.pincode})` : ''}
                            </span>
                          </div>
                          <p className="text-[10.5px] text-stone-500 truncate pl-4">
                            {c.streetAddress || 'Address on file'}
                          </p>
                        </td>

                        {/* Total Orders */}
                        <td className="py-3.5 px-4 text-center">
                          <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-800 font-bold text-[11px]">
                            {c.orderCount}
                          </span>
                        </td>

                        {/* Total Spent */}
                        <td className="py-3.5 px-4 font-serif font-bold text-stone-900 text-sm">
                          ₹{c.totalSpent.toLocaleString('en-IN')}
                        </td>

                        {/* Last Order */}
                        <td className="py-3.5 px-4">
                          <div className="text-stone-900 font-medium text-[11px]">
                            {new Date(c.lastOrderDate).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px] font-mono text-stone-500">
                              #{c.lastOrderId}
                            </span>
                            <span className="text-[9.5px] px-1.5 py-0.2 rounded-md bg-stone-100 text-stone-700 font-bold">
                              {c.lastOrderStatus}
                            </span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedCustomer(c)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-[11px] border border-amber-200 transition-colors cursor-pointer"
                            >
                              <span>View Profile</span>
                              <ChevronRight className="w-3 h-3 text-amber-700" />
                            </button>
                            <Link
                              href={`/admin/orders?search=${c.mobile}`}
                              className="p-1.5 rounded-xl hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors"
                              title="View all orders in orders manager"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 5. Customer Profile Modal / Slideover */}
        {selectedCustomer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
              {/* Modal Header */}
              <div className="p-5 sm:p-6 bg-stone-50 border-b border-stone-200 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 text-amber-900 font-bold font-serif text-base flex items-center justify-center shrink-0">
                    {selectedCustomer.fullName
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif font-bold text-lg text-stone-900">
                        {selectedCustomer.fullName}
                      </h3>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          selectedCustomer.customerTier === 'VIP'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : selectedCustomer.customerTier === 'Repeat'
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-stone-200 text-stone-800'
                        }`}
                      >
                        {selectedCustomer.customerTier} Client
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Client ID: <span className="font-mono">{selectedCustomer.id}</span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCustomer(null)}
                  className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
                {/* Contact & Direct Actions */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {(() => {
                    const cleanPhone = selectedCustomer.mobile.replace(/[^0-9]/g, '');
                    const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
                    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
                      `Hello ${selectedCustomer.fullName}! Thank you for your orders with Abhi's Gifts. Let us know how we can assist you.`
                    )}`;
                    return (
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-2xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    );
                  })()}

                  <a
                    href={`tel:${selectedCustomer.mobile}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-stone-600" />
                    <span>Call {selectedCustomer.mobile}</span>
                  </a>

                  {selectedCustomer.email && (
                    <a
                      href={`mailto:${selectedCustomer.email}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-stone-600" />
                      <span>Email Client</span>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `${selectedCustomer.fullName}\n${selectedCustomer.mobile}\n${selectedCustomer.streetAddress}${
                          selectedCustomer.apartment ? `, ${selectedCustomer.apartment}` : ''
                        }\n${selectedCustomer.city}, ${selectedCustomer.state} ${selectedCustomer.pincode}`
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {copiedText ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Address Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-500" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                      Lifetime Spend
                    </span>
                    <span className="font-serif font-bold text-lg text-stone-900 mt-0.5 block">
                      ₹{selectedCustomer.totalSpent.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                      Total Orders
                    </span>
                    <span className="font-serif font-bold text-lg text-stone-900 mt-0.5 block">
                      {selectedCustomer.orderCount}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                      Avg Order Value
                    </span>
                    <span className="font-serif font-bold text-lg text-emerald-700 mt-0.5 block">
                      ₹{selectedCustomer.averageOrderValue.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Delivery Destination */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-700" />
                    Delivery Destination
                  </span>
                  <p className="font-bold text-stone-900 pt-0.5">
                    {selectedCustomer.streetAddress}
                    {selectedCustomer.apartment ? `, ${selectedCustomer.apartment}` : ''}
                  </p>
                  {selectedCustomer.landmark && (
                    <p className="text-stone-500 text-[11px]">Landmark: {selectedCustomer.landmark}</p>
                  )}
                  <p className="text-stone-700 text-[11px]">
                    {selectedCustomer.city}, {selectedCustomer.state} - {selectedCustomer.pincode}
                  </p>
                </div>

                {/* Order History */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-sm text-stone-900 flex items-center gap-2">
                      <Package className="w-4 h-4 text-amber-700" />
                      <span>Order History ({selectedCustomer.orders.length})</span>
                    </h4>
                    <Link
                      href={`/admin/orders?search=${selectedCustomer.mobile}`}
                      className="text-xs text-amber-800 hover:underline font-bold flex items-center gap-1"
                    >
                      <span>Manage in Orders Tab</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="space-y-3">
                    {selectedCustomer.orders.map((order) => (
                      <div
                        key={order.id}
                        className="p-4 rounded-2xl border border-stone-200 bg-white space-y-3 shadow-2xs"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2.5">
                          <div>
                            <span className="font-mono font-bold text-xs text-stone-900">
                              #{order.id}
                            </span>
                            <span className="text-[11px] text-stone-500 ml-2">
                              {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                              {order.orderStatus}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                order.paymentStatus === 'Paid'
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                  : 'bg-stone-100 text-stone-700'
                              }`}
                            >
                              {order.paymentStatus}
                            </span>
                            <span className="font-serif font-bold text-xs text-stone-900">
                              ₹{(Number(order.totalAmount) || 0).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-2">
                          {order.items?.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-xs">
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-10 h-10 rounded-lg object-cover border border-stone-200 shrink-0"
                                />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-stone-900 truncate">{item.title}</p>
                                <p className="text-[10.5px] text-stone-500">
                                  {formatSizeWithSqFt(item.size || 'Standard')} • {item.finish || 'Acrylic'} • Qty: {item.quantity}
                                </p>
                              </div>
                              <span className="font-medium text-stone-800 shrink-0">
                                ₹{((item.unitPrice || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                              </span>
                            </div>
                          ))}
                        </div>

                        {order.notes && (
                          <div className="text-[11px] bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-stone-600">
                            <strong>Note:</strong> {order.notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedCustomer(null)}
                  className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
