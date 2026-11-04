'use client';

import React, { useState } from 'react';
import { Plus, X, Tag, Sparkles } from 'lucide-react';
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
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141414] border border-[#2D2D2D] p-5 sm:p-6 rounded-3xl">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#EAB308]/15 border border-[#EAB308]/40 text-[#FACC15] font-bold text-[10px] tracking-wider uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#EAB308]" />
                Promotion Engine
              </span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              Promotions &amp; Coupons
            </h1>
            <p className="text-xs text-[#A1A1AA] mt-0.5">
              Create instant discount codes, set minimum purchase thresholds, and configure seasonal customer promotions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="bg-[#EAB308] hover:bg-[#FACC15] text-black font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-[0_2px_12px_rgba(234,179,8,0.25)] flex items-center justify-center gap-2 transition-all self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Coupon</span>
          </button>
        </div>

        {/* Coupons List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {coupons.map((c) => (
            <div
              key={c.code}
              className="bg-[#141414] rounded-2xl border border-[#2D2D2D] hover:border-[#EAB308]/50 p-6 shadow-sm space-y-4 flex flex-col justify-between transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-extrabold text-base text-[#FACC15] bg-[#EAB308]/15 border border-[#EAB308]/40 px-3.5 py-1 rounded-xl">
                    {c.code}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      c.active
                        ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300'
                        : 'bg-[#242424] text-[#A1A1AA]'
                    }`}
                  >
                    {c.active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <p className="text-sm font-bold text-white">
                  {c.discountType === 'percentage' ? `${c.discountValue}% Off Artworks` : `Flat ₹${c.discountValue} Off`}
                </p>

                <p className="text-xs text-[#A1A1AA] leading-relaxed">{c.description}</p>
              </div>

              <div className="pt-3 border-t border-[#262626] text-[11px] text-[#D1D5DB] space-y-1">
                <p>Min. Order Value: <strong className="text-white">₹{c.minOrderValue.toLocaleString('en-IN')}</strong></p>
                {c.maxDiscount && <p>Max Savings: <strong className="text-white">₹{c.maxDiscount.toLocaleString('en-IN')}</strong></p>}
                <p>Valid until: <strong className="text-[#FACC15]">{c.expiresAt}</strong></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Coupon Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-[#141414] border border-[#2D2D2D] text-white rounded-3xl shadow-2xl p-6 sm:p-8 z-10 space-y-4">
              <div className="flex items-center justify-between border-b border-[#2D2D2D] pb-3">
                <h3 className="font-serif font-bold text-lg text-white">Create Promotion Coupon</h3>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="p-1 text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-[#D1D5DB] block mb-1">Coupon Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. FESTIVE20"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl outline-none font-mono uppercase font-bold text-[#FACC15] focus:border-[#EAB308]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#D1D5DB] block mb-1">Discount Type</label>
                    <select
                      value={formData.discountType}
                      onChange={(e) => setFormData({ ...formData, discountType: e.target.value as 'percentage' | 'fixed' })}
                      className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl outline-none text-white"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Flat Amount (₹)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-[#D1D5DB] block mb-1">Discount Value</label>
                    <input
                      type="number"
                      required
                      value={formData.discountValue}
                      onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl outline-none text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#D1D5DB] block mb-1">Min. Order Value (₹)</label>
                    <input
                      type="number"
                      value={formData.minOrderValue}
                      onChange={(e) => setFormData({ ...formData, minOrderValue: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl outline-none text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#D1D5DB] block mb-1">Max Discount Cap (₹)</label>
                    <input
                      type="number"
                      value={formData.maxDiscount || ''}
                      onChange={(e) => setFormData({ ...formData, maxDiscount: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl outline-none text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#D1D5DB] block mb-1">Offer Description</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Flat 10% off on all acrylic frames"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl outline-none text-white"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-[#2D2D2D]">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 border border-[#333333] hover:bg-[#1E1E1E] text-[#D1D5DB] rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#EAB308] hover:bg-[#FACC15] text-black font-extrabold rounded-xl transition-colors cursor-pointer"
                  >
                    Save Coupon
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
