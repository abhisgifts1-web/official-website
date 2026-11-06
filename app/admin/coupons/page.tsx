'use client';

import React, { useState, useEffect } from 'react';
import { Plus, X, Tag, Sparkles, Trash2, Calendar, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { INITIAL_COUPONS } from '@/lib/data/coupons';
import { Coupon } from '@/types';

function getTodayString(): string {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

function addDaysToDate(dateStr: string, days: number): string {
  const d = new Date(dateStr || getTodayString());
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

function calculateValidityStatus(validFrom?: string, expiresAt?: string) {
  const now = new Date().getTime();
  const start = validFrom ? new Date(validFrom).getTime() : 0;
  const end = expiresAt ? new Date(expiresAt).getTime() : 0;

  if (start && start > now) {
    const daysUntilStart = Math.ceil((start - now) / (1000 * 60 * 60 * 24));
    return {
      status: 'upcoming',
      label: `Starts in ${daysUntilStart} day${daysUntilStart === 1 ? '' : 's'}`,
      badgeClass: 'bg-blue-50 border-blue-300 text-blue-800',
    };
  }

  if (end && end < now) {
    return {
      status: 'expired',
      label: 'Expired',
      badgeClass: 'bg-rose-50 border-rose-300 text-rose-800',
    };
  }

  if (end) {
    const daysLeft = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return {
      status: 'active',
      label: `${daysLeft} day${daysLeft === 1 ? '' : 's'} left`,
      badgeClass: 'bg-emerald-50 border-emerald-300 text-emerald-800',
    };
  }

  return {
    status: 'active',
    label: 'Permanent',
    badgeClass: 'bg-stone-50 border-stone-300 text-stone-700',
  };
}

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmCode, setDeleteConfirmCode] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const initialForm: Coupon = {
    code: '',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 1999,
    maxDiscount: 1000,
    description: '',
    validFrom: getTodayString(),
    expiresAt: addDaysToDate(getTodayString(), 30),
    active: true,
  };

  const [formData, setFormData] = useState<Coupon>(initialForm);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/coupons');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.coupons)) {
          setCoupons(data.coupons);
        }
      }
    } catch {
      // fallback to initial
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleApplyPresetDays = (days: number) => {
    const from = formData.validFrom || getTodayString();
    setFormData((prev) => ({
      ...prev,
      expiresAt: addDaysToDate(from, days),
    }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code.trim()) return;

    const newCoupon: Coupon = {
      ...formData,
      code: formData.code.trim().toUpperCase(),
      validFrom: formData.validFrom || getTodayString(),
      expiresAt: formData.expiresAt || addDaysToDate(getTodayString(), 30),
    };

    try {
      const res = await fetch('/api/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCoupon),
      });

      if (res.ok) {
        setCoupons((prev) => [newCoupon, ...prev.filter((c) => c.code !== newCoupon.code)]);
        setNotification(`Coupon "${newCoupon.code}" created successfully!`);
      } else {
        // Fallback local update
        setCoupons((prev) => [newCoupon, ...prev.filter((c) => c.code !== newCoupon.code)]);
        setNotification(`Coupon "${newCoupon.code}" saved locally.`);
      }
    } catch {
      setCoupons((prev) => [newCoupon, ...prev.filter((c) => c.code !== newCoupon.code)]);
      setNotification(`Coupon "${newCoupon.code}" saved.`);
    }

    setModalOpen(false);
    setFormData(initialForm);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDeleteCoupon = async (code: string) => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/coupons?code=${encodeURIComponent(code)}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setCoupons((prev) => prev.filter((c) => c.code.toUpperCase() !== code.toUpperCase()));
        setNotification(`Coupon "${code}" deleted permanently.`);
      } else {
        setCoupons((prev) => prev.filter((c) => c.code.toUpperCase() !== code.toUpperCase()));
        setNotification(`Coupon "${code}" deleted.`);
      }
    } catch {
      setCoupons((prev) => prev.filter((c) => c.code.toUpperCase() !== code.toUpperCase()));
      setNotification(`Coupon "${code}" removed.`);
    } finally {
      setDeleting(false);
      setDeleteConfirmCode(null);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto text-stone-900">
        {/* Toast Notification */}
        {notification && (
          <div className="fixed top-5 right-5 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-top-2 border border-amber-400/30">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200 p-5 sm:p-6 rounded-3xl shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 font-bold text-[10px] tracking-wider uppercase flex items-center gap-1 shadow-2xs">
                <Sparkles className="w-3 h-3 text-amber-700" />
                Promotion Engine
              </span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
              Promotions &amp; Coupons
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Create and delete promotion codes, configure active time periods, minimum spend thresholds, and seasonal discounts.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setFormData({
                ...initialForm,
                validFrom: getTodayString(),
                expiresAt: addDaysToDate(getTodayString(), 30),
              });
              setModalOpen(true);
            }}
            className="bg-[#EAB308] hover:bg-[#FACC15] text-black font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Coupon</span>
          </button>
        </div>

        {/* Coupons List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {coupons.map((c) => {
            const validity = calculateValidityStatus(c.validFrom, c.expiresAt);

            return (
              <div
                key={c.code}
                className="bg-white rounded-2xl border border-stone-200 hover:border-amber-400 p-5 sm:p-6 shadow-xs space-y-4 flex flex-col justify-between transition-all group relative"
              >
                <div className="space-y-3">
                  {/* Top Bar with Code, Status & Delete button */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-base text-amber-900 bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl shadow-2xs">
                        {c.code}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${validity.badgeClass}`}
                      >
                        {validity.label}
                      </span>
                    </div>

                    {/* Delete Option Button */}
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmCode(c.code)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
                      title={`Delete coupon ${c.code}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-sm font-bold text-stone-900">
                    {c.discountType === 'percentage'
                      ? `${c.discountValue}% Off Artworks`
                      : `Flat ₹${c.discountValue} Off`}
                  </p>

                  <p className="text-xs text-stone-500 leading-relaxed min-h-[36px]">
                    {c.description || 'Valid on all acrylic artworks and framed photo collections.'}
                  </p>
                </div>

                {/* Details & Time Period Section */}
                <div className="pt-3 border-t border-stone-100 space-y-2.5 text-[11px] text-stone-600">
                  <div className="flex items-center justify-between">
                    <span>Min. Order Value:</span>
                    <strong className="text-stone-900">₹{c.minOrderValue.toLocaleString('en-IN')}</strong>
                  </div>

                  {c.maxDiscount && (
                    <div className="flex items-center justify-between">
                      <span>Max Savings:</span>
                      <strong className="text-stone-900">₹{c.maxDiscount.toLocaleString('en-IN')}</strong>
                    </div>
                  )}

                  {/* Configured Time Period Badge */}
                  <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/80 text-[11px] space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-amber-900">
                      <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>Time Period / Validity</span>
                    </div>
                    <div className="flex items-center justify-between text-stone-700 text-[10.5px]">
                      <span>From: <strong>{c.validFrom || 'Immediate'}</strong></span>
                      <span>To: <strong className="text-amber-800">{c.expiresAt}</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmCode && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setDeleteConfirmCode(null)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-sm bg-white border border-stone-200 text-stone-900 rounded-3xl shadow-2xl p-6 z-10 space-y-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 mx-auto flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900">Delete Coupon?</h3>
                <p className="text-xs text-stone-500 mt-1">
                  Are you sure you want to delete coupon <strong className="font-mono text-amber-900 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">{deleteConfirmCode}</strong>? Customers will no longer be able to use it at checkout.
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmCode(null)}
                  disabled={deleting}
                  className="px-4 py-2 border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteCoupon(deleteConfirmCode)}
                  disabled={deleting}
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{deleting ? 'Deleting...' : 'Delete Coupon'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Coupon Modal with Time Period Configuration */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setModalOpen(false)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-lg bg-white border border-stone-200 text-stone-900 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-300 flex items-center justify-center">
                    <Tag className="w-4 h-4 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-stone-900">Create Promotion Coupon</h3>
                    <p className="text-[11px] text-stone-500">Configure discount rules and validity time period</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="p-1 text-stone-400 hover:text-stone-900 transition-colors cursor-pointer"
                >
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
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none font-mono uppercase font-bold text-amber-900 focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Discount Type</label>
                    <select
                      value={formData.discountType}
                      onChange={(e) => setFormData({ ...formData, discountType: e.target.value as 'percentage' | 'fixed' })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none text-stone-900"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Flat Amount (₹)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Discount Value</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={formData.discountValue}
                      onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none text-stone-900 font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Min. Order Value (₹)</label>
                    <input
                      type="number"
                      value={formData.minOrderValue}
                      onChange={(e) => setFormData({ ...formData, minOrderValue: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Max Discount Cap (₹)</label>
                    <input
                      type="number"
                      value={formData.maxDiscount || ''}
                      onChange={(e) => setFormData({ ...formData, maxDiscount: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none text-stone-900"
                    />
                  </div>
                </div>

                {/* TIME PERIOD CONFIGURATION */}
                <div className="p-3.5 bg-amber-50/70 border border-amber-300/80 rounded-2xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-amber-950 flex items-center gap-1.5 text-xs">
                      <Calendar className="w-3.5 h-3.5 text-amber-700" />
                      <span>Coupon Time Period &amp; Validity *</span>
                    </label>
                    <span className="text-[10.5px] font-semibold text-amber-800">
                      {formData.validFrom && formData.expiresAt
                        ? `Valid: ${Math.max(1, Math.round((new Date(formData.expiresAt).getTime() - new Date(formData.validFrom).getTime()) / (1000 * 60 * 60 * 24)))} days`
                        : ''}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <span className="text-[11px] text-stone-600 block mb-1 font-medium">Valid From (Start Date)</span>
                      <input
                        type="date"
                        required
                        value={formData.validFrom}
                        onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg outline-none text-stone-900 text-xs"
                      />
                    </div>

                    <div>
                      <span className="text-[11px] text-stone-600 block mb-1 font-medium">Expires At (End Date)</span>
                      <input
                        type="date"
                        required
                        value={formData.expiresAt}
                        onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg outline-none text-stone-900 text-xs font-semibold"
                      />
                    </div>
                  </div>

                  {/* Quick Time Period Presets */}
                  <div>
                    <span className="text-[10px] text-stone-500 font-medium block mb-1">Quick Time Period Presets:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { label: '7 Days', days: 7 },
                        { label: '15 Days', days: 15 },
                        { label: '30 Days', days: 30 },
                        { label: '90 Days (3 Mo)', days: 90 },
                        { label: '6 Months', days: 180 },
                        { label: '1 Year', days: 365 },
                      ].map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => handleApplyPresetDays(preset.days)}
                          className="px-2 py-0.5 rounded-md bg-white hover:bg-amber-100 border border-stone-200 hover:border-amber-400 text-[10.5px] font-semibold text-stone-700 transition-colors cursor-pointer"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Offer Description</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Flat 10% off on all acrylic frames"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none text-stone-900"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 border border-stone-300 hover:bg-stone-50 text-stone-700 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#EAB308] hover:bg-[#FACC15] text-black font-extrabold rounded-xl transition-colors cursor-pointer shadow-xs"
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
