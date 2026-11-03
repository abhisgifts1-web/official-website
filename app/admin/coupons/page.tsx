'use client';

import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { INITIAL_COUPONS } from '@/lib/data/coupons';
import { Coupon } from '@/types';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<Coupon>({
    code: '',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 1999,
    maxDiscount: 1000,
    description: '',
    expiresAt: '2027-12-31',
    active: true,
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code.trim()) return;

    const newCoupon: Coupon = {
      ...formData,
      code: formData.code.trim().toUpperCase(),
    };

    setCoupons((prev) => [newCoupon, ...prev]);
    setModalOpen(false);
    setFormData({
      code: '',
      discountType: 'percentage',
      discountValue: 10,
      minOrderValue: 1999,
      maxDiscount: 1000,
      description: '',
      expiresAt: '2027-12-31',
      active: true,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
              Promotions & Coupons
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Create instant discount codes, set minimum purchase limits, and manage promotions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="bg-stone-900 hover:bg-amber-800 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-warm flex items-center justify-center gap-2 transition-colors self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create Coupon</span>
          </button>
        </div>

        {/* Coupons List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((c) => (
            <div
              key={c.code}
              className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-extrabold text-base text-amber-900 bg-amber-100 px-3 py-1 rounded-xl">
                    {c.code}
                  </span>
                  <span className="text-[10px] font-bold text-[#651E2D] bg-[#1E1E1E] px-2.5 py-0.5 rounded-full">
                    {c.active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <p className="text-xs font-semibold text-stone-800">
                  {c.discountType === 'percentage' ? `${c.discountValue}% Off` : `Flat ₹${c.discountValue} Off`}
                </p>

                <p className="text-xs text-stone-500 leading-relaxed">{c.description}</p>
              </div>

              <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-500 space-y-1">
                <p>Min. Order Value: <strong>₹{c.minOrderValue.toLocaleString('en-IN')}</strong></p>
                {c.maxDiscount && <p>Max Discount: <strong>₹{c.maxDiscount.toLocaleString('en-IN')}</strong></p>}
                <p>Valid until: <strong>{c.expiresAt}</strong></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Coupon Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 z-10 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-serif font-bold text-lg text-stone-900">Create Promotion Coupon</h3>
                <button type="button" onClick={() => setModalOpen(false)} className="p-1 text-stone-400 hover:text-stone-800">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Coupon Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. FESTIVE20"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none font-mono uppercase font-bold text-amber-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Discount Type</label>
                    <select
                      value={formData.discountType}
                      onChange={(e) => setFormData({ ...formData, discountType: e.target.value as 'percentage' | 'fixed' })}
                      className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Flat Amount (₹)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Value</label>
                    <input
                      type="number"
                      required
                      value={formData.discountValue}
                      onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Min. Order Value (₹)</label>
                    <input
                      type="number"
                      required
                      value={formData.minOrderValue}
                      onChange={(e) => setFormData({ ...formData, minOrderValue: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Max Discount Cap (₹)</label>
                    <input
                      type="number"
                      value={formData.maxDiscount || ''}
                      onChange={(e) => setFormData({ ...formData, maxDiscount: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Description</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Flat ₹500 off for festival shoppers"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t">
                  <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 border rounded-xl">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 bg-stone-900 hover:bg-amber-800 text-white font-semibold rounded-xl">
                    Publish Coupon
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
