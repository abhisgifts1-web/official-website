'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Package, Truck, Phone } from 'lucide-react';
import { Order } from '@/types';

export default function AccountPage() {
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/orders?phone=${encodeURIComponent(phone.trim())}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setOrders(data.orders);
      } else {
        setOrders([]);
      }
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-16 space-y-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="border-b border-stone-200 pb-4">
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
            Customer Portal & Orders
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Look up your past purchases, shipment statuses, and digital invoices.
          </p>
        </div>

      {/* Lookup Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
        <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
          <Phone className="w-4 h-4 text-amber-800" />
          <span>Find Orders by Mobile Number</span>
        </h3>
        <p className="text-xs text-stone-500">
          Enter the 10-digit mobile number you used while placing your order.
        </p>

        <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3">
          <input
            type="tel"
            required
            maxLength={10}
            placeholder="Enter 10-digit mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
            className="flex-1 px-4 py-3 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-700"
          />
          <button
            type="submit"
            disabled={loading || phone.length < 10}
            className="bg-stone-900 hover:bg-amber-800 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm px-7 py-3 rounded-xl transition-colors whitespace-nowrap"
          >
            {loading ? 'Searching...' : 'Find My Orders'}
          </button>
        </form>
      </div>

      {/* Results */}
      {searched && (
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-lg text-stone-900">
            Order History ({orders?.length || 0})
          </h3>

          {!orders || orders.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl border border-stone-200 text-center space-y-2">
              <Package className="w-8 h-8 text-stone-400 mx-auto" />
              <p className="text-xs text-stone-600 font-medium">No orders found for mobile: {phone}</p>
              <p className="text-[11px] text-stone-400">
                Please verify your number or contact our WhatsApp support desk.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((o) => (
                <div key={o.id} className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
                    <div>
                      <span className="font-mono font-bold text-sm text-stone-900">{o.id}</span>
                      <p className="text-[11px] text-stone-400">
                        {new Date(o.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="bg-amber-100 text-amber-950 font-bold px-2.5 py-1 rounded-full text-xs">
                        {o.orderStatus}
                      </span>
                      <Link
                        href={`/track-order?id=${o.id}`}
                        className="text-xs text-amber-800 hover:underline font-semibold flex items-center gap-0.5 ml-2"
                      >
                        <Truck className="w-3.5 h-3.5" /> Track
                      </Link>
                    </div>
                  </div>

                  <div className="divide-y divide-stone-100 text-xs">
                    {o.items.map((it) => (
                      <div key={it.id} className="py-2 flex items-center gap-3">
                        <img
                          src={it.customization?.previewUrl || it.image}
                          alt=""
                          className="w-12 h-12 object-cover rounded-lg border border-stone-200"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-stone-900 truncate">{it.title}</p>
                          <p className="text-stone-400">{it.size} • Qty: {it.quantity}</p>
                        </div>
                        <span className="font-bold text-stone-900">
                          ₹{(it.unitPrice * it.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t text-xs font-semibold">
                    <span>Total Amount:</span>
                    <span className="font-serif font-bold text-sm text-amber-900">
                      ₹{o.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
}
