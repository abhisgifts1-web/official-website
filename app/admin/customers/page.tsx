'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { ContactEnquiry, Order } from '@/types';

export default function AdminCustomersPage() {
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [tab, setTab] = useState<'customers' | 'enquiries'>('customers');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [enqRes, ordRes] = await Promise.all([
          fetch('/api/contact'),
          fetch('/api/orders'),
        ]);

        const enqData = await enqRes.json();
        const ordData = await ordRes.json();

        if (enqData.success) setEnquiries(enqData.enquiries);
        if (ordData.success) setOrders(ordData.orders);
      } catch {
        // ignore
      }
    };

    loadData();
  }, []);

  // Distinct customers from orders
  const uniqueCustomers = Array.from(
    new Map(orders.map((o) => [o.customer.mobile, o.customer])).values()
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
            Customers & Enquiries
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage customer contact records and respond to custom artwork enquiries.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-200 gap-6 text-xs sm:text-sm font-semibold">
          <button
            type="button"
            onClick={() => setTab('customers')}
            className={`pb-3 border-b-2 transition-colors ${
              tab === 'customers' ? 'border-amber-700 text-amber-950 font-bold' : 'border-transparent text-stone-400'
            }`}
          >
            Registered Order Customers ({uniqueCustomers.length})
          </button>
          <button
            type="button"
            onClick={() => setTab('enquiries')}
            className={`pb-3 border-b-2 transition-colors ${
              tab === 'enquiries' ? 'border-amber-700 text-amber-950 font-bold' : 'border-transparent text-stone-400'
            }`}
          >
            Artwork Enquiries ({enquiries.length})
          </button>
        </div>

        {tab === 'customers' ? (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-500 border-b uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4">Customer Name</th>
                    <th className="py-3 px-4">Mobile</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {uniqueCustomers.map((c, i) => (
                    <tr key={i} className="hover:bg-stone-50/60">
                      <td className="py-3 px-4 font-bold text-stone-900">{c.fullName}</td>
                      <td className="py-3 px-4 font-mono">{c.mobile}</td>
                      <td className="py-3 px-4 text-stone-600">{c.email || '—'}</td>
                      <td className="py-3 px-4 text-stone-600">{c.city}, {c.state} ({c.pincode})</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {enquiries.map((enq) => (
              <div key={enq.id} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-stone-900 text-sm">{enq.name}</span>
                    <span className="text-stone-400 ml-2">• {enq.email} {enq.phone && `• ${enq.phone}`}</span>
                  </div>
                  <span className="text-stone-400 font-mono">
                    {new Date(enq.createdAt).toLocaleDateString('en-IN')}
                  </span>
                </div>

                <p className="font-semibold text-xs text-amber-900">{enq.subject}</p>
                <p className="text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-100 leading-relaxed">
                  {enq.message}
                </p>

                <div className="pt-2 flex justify-end">
                  <a
                    href={`mailto:${enq.email}?subject=${encodeURIComponent(`Regarding your Abhi Gifts enquiry: ${enq.subject}`)}`}
                    className="bg-stone-900 hover:bg-amber-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
                  >
                    Reply via Email →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
