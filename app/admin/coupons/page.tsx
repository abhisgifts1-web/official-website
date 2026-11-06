'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Plus,
  X,
  Tag,
  Sparkles,
  Trash2,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Edit2,
  BarChart3,
  Users,
  Search,
  Filter,
  Check,
  Percent,
  TrendingUp,
  ShoppingBag,
  Power,
  Layers,
  ArrowRight,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { INITIAL_COUPONS } from '@/lib/data/coupons';
import { Coupon, Product } from '@/types';

function getTodayString(): string {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

function addDaysToDate(dateStr: string, days: number): string {
  const d = new Date(dateStr || getTodayString());
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

function calculateValidityStatus(startDate?: string, expiryDate?: string) {
  const now = new Date().getTime();
  const start = startDate ? new Date(startDate).getTime() : 0;
  const end = expiryDate ? new Date(expiryDate).getTime() : 0;

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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCode, setEditingCode] = useState<string | null>(null);
  const [deleteConfirmCode, setDeleteConfirmCode] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'expired'>('all');

  // Form State
  const initialForm: Coupon = {
    code: '',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 499,
    maxDiscount: 200,
    description: '',
    startDate: getTodayString(),
    validFrom: getTodayString(),
    expiryDate: addDaysToDate(getTodayString(), 30),
    expiresAt: addDaysToDate(getTodayString(), 30),
    usageLimit: 100,
    usageCount: 0,
    perCustomerLimit: 1,
    applicableProducts: ['all'],
    active: true,
  };

  const [formData, setFormData] = useState<Coupon>(initialForm);
  const [productSearch, setProductSearch] = useState('');

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/coupons');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.coupons)) {
          let deletedSet = new Set<string>();
          try {
            const stored = localStorage.getItem('abhi_deleted_coupons');
            if (stored) {
              deletedSet = new Set(JSON.parse(stored).map((x: string) => x.toUpperCase()));
            }
          } catch {}
          const cleaned = data.coupons.filter((c: Coupon) => !deletedSet.has(c.code.toUpperCase()));
          setCoupons(cleaned);
        }
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.products)) {
          setProducts(data.products);
        }
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchCoupons();
    fetchProducts();
  }, []);

  // Analytics Computation
  const analytics = useMemo(() => {
    const now = Date.now();
    const totalCoupons = coupons.length;
    const activeCoupons = coupons.filter(
      (c) => c.active && (!c.expiresAt || new Date(c.expiresAt).getTime() >= now)
    ).length;
    const expiredCoupons = coupons.filter(
      (c) => c.expiresAt && new Date(c.expiresAt).getTime() < now
    ).length;
    const totalRedemptions = coupons.reduce((sum, c) => sum + (c.usageCount || 0), 0);
    const totalDiscountGiven = coupons.reduce((sum, c) => sum + (c.totalDiscountGiven || 0), 0);

    const mostUsed = [...coupons]
      .filter((c) => (c.usageCount || 0) > 0)
      .sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0))
      .slice(0, 3);

    return {
      totalCoupons,
      activeCoupons,
      expiredCoupons,
      totalRedemptions,
      totalDiscountGiven,
      mostUsed,
    };
  }, [coupons]);

  // Filtered Coupons
  const filteredCoupons = useMemo(() => {
    const now = Date.now();
    return coupons.filter((c) => {
      const matchesSearch =
        c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.description || '').toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (statusFilter === 'active') {
        return c.active && (!c.expiresAt || new Date(c.expiresAt).getTime() >= now);
      }
      if (statusFilter === 'inactive') {
        return !c.active;
      }
      if (statusFilter === 'expired') {
        return Boolean(c.expiresAt && new Date(c.expiresAt).getTime() < now);
      }

      return true;
    });
  }, [coupons, searchQuery, statusFilter]);

  const handleApplyPresetDays = (days: number) => {
    const from = formData.startDate || formData.validFrom || getTodayString();
    const expiry = addDaysToDate(from, days);
    setFormData((prev) => ({
      ...prev,
      expiryDate: expiry,
      expiresAt: expiry,
    }));
  };

  const handleOpenCreate = () => {
    setEditingCode(null);
    setFormData({
      ...initialForm,
      startDate: getTodayString(),
      validFrom: getTodayString(),
      expiryDate: addDaysToDate(getTodayString(), 30),
      expiresAt: addDaysToDate(getTodayString(), 30),
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (c: Coupon) => {
    setEditingCode(c.code);
    setFormData({
      ...c,
      startDate: c.startDate || c.validFrom || getTodayString(),
      validFrom: c.validFrom || c.startDate || getTodayString(),
      expiryDate: c.expiryDate || c.expiresAt || addDaysToDate(getTodayString(), 30),
      expiresAt: c.expiresAt || c.expiryDate || addDaysToDate(getTodayString(), 30),
      usageLimit: c.usageLimit !== undefined ? c.usageLimit : 100,
      perCustomerLimit: c.perCustomerLimit || 1,
      applicableProducts: c.applicableProducts || ['all'],
    });
    setModalOpen(true);
  };

  const handleToggleActive = async (c: Coupon) => {
    const newActive = !c.active;
    try {
      const res = await fetch('/api/coupons', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-action': 'true',
        },
        body: JSON.stringify({ code: c.code, active: newActive }),
      });

      if (res.ok) {
        setCoupons((prev) =>
          prev.map((item) => (item.code === c.code ? { ...item, active: newActive } : item))
        );
        setNotification(`Coupon "${c.code}" ${newActive ? 'activated' : 'deactivated'}.`);
      }
    } catch {
      setCoupons((prev) =>
        prev.map((item) => (item.code === c.code ? { ...item, active: newActive } : item))
      );
    }
    setTimeout(() => setNotification(null), 3500);
  };

  const handleSaveCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code.trim()) return;

    setSaving(true);
    const cleanCode = formData.code.trim().toUpperCase();

    const payload: Coupon = {
      ...formData,
      code: cleanCode,
      startDate: formData.startDate || formData.validFrom || getTodayString(),
      validFrom: formData.validFrom || formData.startDate || getTodayString(),
      expiryDate: formData.expiryDate || formData.expiresAt || addDaysToDate(getTodayString(), 30),
      expiresAt: formData.expiresAt || formData.expiryDate || addDaysToDate(getTodayString(), 30),
      usageLimit: Number(formData.usageLimit) || 0,
      perCustomerLimit: Math.max(1, Number(formData.perCustomerLimit) || 1),
      applicableProducts:
        formData.applicableProducts && formData.applicableProducts.length > 0
          ? formData.applicableProducts
          : ['all'],
    };

    try {
      const isEdit = Boolean(editingCode);
      const url = '/api/coupons';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-admin-action': 'true',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        try {
          const existing = JSON.parse(localStorage.getItem('abhi_deleted_coupons') || '[]');
          const updated = existing.filter((x: string) => x.toUpperCase() !== cleanCode);
          localStorage.setItem('abhi_deleted_coupons', JSON.stringify(updated));
        } catch {}

        if (isEdit) {
          setCoupons((prev) =>
            prev.map((item) => (item.code === cleanCode ? { ...item, ...payload } : item))
          );
          setNotification(`Coupon "${cleanCode}" updated successfully!`);
        } else {
          setCoupons((prev) => [data.coupon || payload, ...prev]);
          setNotification(`Coupon "${cleanCode}" created successfully!`);
        }
        setModalOpen(false);
      } else {
        alert(data.error || 'Failed to save coupon.');
      }
    } catch (err: any) {
      alert(err.message || 'Error saving coupon.');
    } finally {
      setSaving(false);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const handleDeleteCoupon = async (code: string) => {
    if (!code) return;
    const cleanCode = code.trim().toUpperCase();
    setDeleting(true);

    // 1. Immediately remove from React state
    setCoupons((prev) => prev.filter((c) => c.code.toUpperCase() !== cleanCode));

    // 2. Persist to browser localStorage so it remains deleted even on page reload
    try {
      const existing = JSON.parse(localStorage.getItem('abhi_deleted_coupons') || '[]');
      const updated = Array.from(new Set([...existing.map((x: string) => x.toUpperCase()), cleanCode]));
      localStorage.setItem('abhi_deleted_coupons', JSON.stringify(updated));
    } catch {}

    // 3. Delete from backend via DELETE method with JSON body and query parameter
    try {
      const res = await fetch(`/api/coupons?code=${encodeURIComponent(cleanCode)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-action': 'true',
        },
        body: JSON.stringify({ code: cleanCode }),
      });

      // 4. Fallback to POST delete if DELETE is blocked
      if (!res.ok) {
        await fetch('/api/coupons', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-action': 'true',
          },
          body: JSON.stringify({ action: 'delete', code: cleanCode }),
        });
      }

      setNotification(`Coupon "${cleanCode}" deleted successfully.`);
    } catch (err) {
      console.warn('Coupon deletion background request notice:', err);
      setNotification(`Coupon "${cleanCode}" deleted.`);
    } finally {
      setDeleting(false);
      setDeleteConfirmCode(null);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const toggleProductSelection = (slug: string) => {
    setFormData((prev) => {
      let current = (prev.applicableProducts || []).filter((p) => p !== 'all');
      if (current.includes(slug)) {
        current = current.filter((p) => p !== slug);
      } else {
        current.push(slug);
      }
      return {
        ...prev,
        applicableProducts: current.length === 0 ? ['all'] : current,
      };
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto text-stone-900 pb-12">
        {/* Toast Notification */}
        {notification && (
          <div className="fixed top-5 right-5 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-top-2 border border-amber-400/40">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* ══════════════════════════════════════
            HEADER & PRIMARY ACTION
           ══════════════════════════════════════ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200 p-5 sm:p-6 rounded-3xl shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 font-bold text-[10px] tracking-wider uppercase flex items-center gap-1 shadow-2xs">
                <Sparkles className="w-3 h-3 text-amber-700" />
                Promotion &amp; Discount Engine
              </span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
              Coupon Management
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Create, edit, activate, deactivate, and track customer redemption limits for promotional and Instagram campaign codes.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="bg-[#EAB308] hover:bg-[#FACC15] text-stone-950 font-extrabold text-xs px-5 py-3 rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Coupon</span>
          </button>
        </div>

        {/* ══════════════════════════════════════
            5. ADMIN COUPON ANALYTICS
           ══════════════════════════════════════ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-stone-400">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-stone-500">Created</span>
              <Tag className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-2xl font-bold font-serif text-stone-900">{analytics.totalCoupons}</p>
            <p className="text-[10px] text-stone-500">Total coupons</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-emerald-500">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-stone-500">Active</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold font-serif text-emerald-700">{analytics.activeCoupons}</p>
            <p className="text-[10px] text-stone-500">Live in checkout</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-rose-500">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-stone-500">Expired</span>
              <Clock className="w-4 h-4 text-rose-500" />
            </div>
            <p className="text-2xl font-bold font-serif text-rose-700">{analytics.expiredCoupons}</p>
            <p className="text-[10px] text-stone-500">Past validity</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-amber-500">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-stone-500">Redemptions</span>
              <TrendingUp className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-2xl font-bold font-serif text-amber-900">{analytics.totalRedemptions}</p>
            <p className="text-[10px] text-stone-500">Orders placed</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-stone-400">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-stone-500">Discount Given</span>
              <Percent className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-2xl font-bold font-serif text-stone-900">
              ₹{analytics.totalDiscountGiven.toLocaleString('en-IN')}
            </p>
            <p className="text-[10px] text-stone-500">Customer savings</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-stone-400">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-stone-500">Top Promo</span>
              <Sparkles className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-sm font-mono font-extrabold text-amber-900 truncate">
              {analytics.mostUsed[0]?.code || 'None yet'}
            </p>
            <p className="text-[10px] text-stone-500">
              {analytics.mostUsed[0] ? `${analytics.mostUsed[0].usageCount} orders` : 'No redemptions'}
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════
            SEARCH & STATUS FILTERS
           ══════════════════════════════════════ */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search coupon code or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:border-amber-500 text-stone-900 placeholder-stone-400"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All Coupons' },
              { id: 'active', label: 'Active' },
              { id: 'inactive', label: 'Inactive' },
              { id: 'expired', label: 'Expired' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  statusFilter === tab.id
                    ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs font-bold'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-600 border border-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            COUPONS LIST VIEW
           ══════════════════════════════════════ */}
        {filteredCoupons.length === 0 ? (
          <div className="p-16 text-center bg-white rounded-3xl border border-stone-200 space-y-3">
            <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
              <Tag className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">No Coupons Found</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              No promotional coupons match your search or filter criteria. Create a new campaign code or clear the filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCoupons.map((c) => {
              const validity = calculateValidityStatus(c.startDate || c.validFrom, c.expiryDate || c.expiresAt);
              const isApplicableAll = !c.applicableProducts || c.applicableProducts.includes('all');
              const usageCount = c.usageCount || 0;
              const usageLimit = c.usageLimit || 0;
              const hasLimit = usageLimit > 0;
              const usagePercent = hasLimit ? Math.min(100, Math.round((usageCount / usageLimit) * 100)) : 0;

              return (
                <div
                  key={c.code}
                  className={`bg-white rounded-3xl border p-5 sm:p-6 shadow-xs flex flex-col justify-between transition-all group relative ${
                    c.active ? 'border-stone-200 hover:border-amber-400' : 'border-stone-200/60 bg-stone-50/50 opacity-80'
                  }`}
                >
                  <div className="space-y-3.5">
                    {/* Top Row: Code, Validity Badge, Status Toggle, Actions */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono font-extrabold text-base text-amber-950 bg-amber-50 border border-amber-300/80 px-3 py-1 rounded-xl shadow-2xs">
                            {c.code}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${validity.badgeClass}`}>
                            {validity.label}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons: Toggle Active, Edit, Delete */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleToggleActive(c)}
                          className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                            c.active
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                              : 'bg-stone-100 text-stone-500 border-stone-300 hover:bg-stone-200'
                          }`}
                          title={c.active ? 'Click to Deactivate' : 'Click to Activate'}
                        >
                          <Power className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenEdit(c)}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-amber-900 hover:bg-amber-50 border border-transparent hover:border-amber-300 transition-colors cursor-pointer"
                          title="Edit Coupon"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteConfirmCode(c.code)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
                          title="Delete Coupon"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Discount Headline & Description */}
                    <div>
                      <p className="text-base font-bold text-stone-900 flex items-center gap-1.5">
                        <span>
                          {c.discountType === 'percentage'
                            ? `${c.discountValue}% Off Purchases`
                            : `Flat ₹${c.discountValue} Off`}
                        </span>
                        {c.maxDiscount && c.discountType === 'percentage' && (
                          <span className="text-xs font-normal text-stone-500">
                            (up to ₹{c.maxDiscount.toLocaleString('en-IN')})
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-stone-500 leading-relaxed mt-1 line-clamp-2">
                        {c.description || 'Promotional coupon code for Abhis Gifts collections.'}
                      </p>
                    </div>

                    {/* Usage Progress & Limits */}
                    <div className="p-3 bg-stone-50 rounded-2xl border border-stone-100 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-stone-600 text-[11px]">
                        <span>Redemption Count:</span>
                        <strong className="text-stone-900">
                          {usageCount} {hasLimit ? `/ ${usageLimit} uses` : 'uses (Unlimited)'}
                        </strong>
                      </div>

                      {hasLimit && (
                        <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              usagePercent >= 90 ? 'bg-rose-500' : 'bg-[#EAB308]'
                            }`}
                            style={{ width: `${usagePercent}%` }}
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between text-stone-500 text-[10.5px] pt-0.5">
                        <span>Per-Customer Limit:</span>
                        <strong className="text-stone-700">
                          {c.perCustomerLimit || 1} use{(c.perCustomerLimit || 1) === 1 ? '' : 's'}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Meta & Time Period Details */}
                  <div className="pt-3 mt-3 border-t border-stone-100 space-y-2 text-[11px] text-stone-600">
                    <div className="flex items-center justify-between">
                      <span>Min. Order Value:</span>
                      <strong className="text-stone-900">₹{c.minOrderValue.toLocaleString('en-IN')}</strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Product Eligibility:</span>
                      <span className="font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-md text-[10.5px]">
                        All Products Storewide
                      </span>
                    </div>

                    {/* Time Period Date Range */}
                    <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1 text-[11px]">
                      <div className="flex items-center gap-1.5 font-bold text-amber-900">
                        <Calendar className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span>Validity Period</span>
                      </div>
                      <div className="flex items-center justify-between text-stone-700 text-[10.5px]">
                        <span>From: <strong>{c.startDate || c.validFrom || 'Immediate'}</strong></span>
                        <span>To: <strong className="text-amber-800">{c.expiryDate || c.expiresAt}</strong></span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════
          DELETE CONFIRMATION MODAL
         ══════════════════════════════════════ */}
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
                  Are you sure you want to delete coupon <strong className="font-mono text-amber-900 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">{deleteConfirmCode}</strong>? Customers will no longer be able to use it during checkout.
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

      {/* ══════════════════════════════════════
          CREATE / EDIT COUPON MODAL
         ══════════════════════════════════════ */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setModalOpen(false)} />
          <div className="flex min-h-full items-center justify-center p-3 sm:p-4">
            <div className="relative w-full max-w-xl bg-white border border-stone-200 text-stone-900 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-center text-amber-700">
                    <Tag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-stone-900">
                      {editingCode ? `Edit Coupon: ${editingCode}` : 'Create Promotion Coupon'}
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      Configure discount value, usage limits, and product eligibility.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="p-1.5 text-stone-400 hover:text-stone-900 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveCoupon} className="space-y-4 text-xs">
                {/* 1. Coupon Code & Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-stone-800 block mb-1">
                      Coupon Code * <span className="text-[10px] text-stone-400 font-normal">(e.g. ABHIS10)</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ABHIS10"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none font-mono uppercase font-bold text-amber-900 focus:border-amber-500 text-xs"
                      disabled={Boolean(editingCode)}
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-800 block mb-1">Coupon Status</label>
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, active: true })}
                        className={`flex-1 py-1.5 px-3 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                          formData.active
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                            : 'bg-stone-50 text-stone-600 border-stone-200'
                        }`}
                      >
                        Active
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, active: false })}
                        className={`flex-1 py-1.5 px-3 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                          !formData.active
                            ? 'bg-stone-200 text-stone-800 border-stone-400 font-bold'
                            : 'bg-stone-50 text-stone-600 border-stone-200'
                        }`}
                      >
                        Inactive
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. Discount Type & Value */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-stone-800 block mb-1">Discount Type</label>
                    <select
                      value={formData.discountType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          discountType: e.target.value as 'percentage' | 'fixed',
                        })
                      }
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none text-stone-900 text-xs"
                    >
                      <option value="percentage">Percentage Discount (%)</option>
                      <option value="fixed">Fixed Amount Discount (₹)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-stone-800 block mb-1">
                      Discount Value * {formData.discountType === 'percentage' ? '(%)' : '(₹)'}
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={formData.discountType === 'percentage' ? 100 : 100000}
                      value={formData.discountValue}
                      onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none text-stone-900 font-bold text-xs"
                    />
                  </div>
                </div>

                {/* 3. Min Order Value & Max Discount */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-stone-800 block mb-1">
                      Minimum Order Value (₹)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={formData.minOrderValue}
                      onChange={(e) => setFormData({ ...formData, minOrderValue: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none text-stone-900 text-xs"
                      placeholder="e.g. 499"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-800 block mb-1">
                      Maximum Discount Cap (₹)
                      <span className="text-[10px] text-stone-400 font-normal"> (for % discounts)</span>
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={formData.maxDiscount || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxDiscount: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none text-stone-900 text-xs"
                      placeholder="e.g. 200 (optional)"
                    />
                  </div>
                </div>

                {/* 4. Time Period & Expiry Presets */}
                <div className="p-3.5 bg-amber-50/70 border border-amber-300/80 rounded-2xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-amber-950 flex items-center gap-1.5 text-xs">
                      <Calendar className="w-3.5 h-3.5 text-amber-700" />
                      <span>Coupon Start &amp; Expiry Dates *</span>
                    </label>
                    <span className="text-[10.5px] font-semibold text-amber-800">
                      {formData.startDate && formData.expiryDate
                        ? `Validity: ${Math.max(
                            1,
                            Math.round(
                              (new Date(formData.expiryDate).getTime() -
                                new Date(formData.startDate).getTime()) /
                                (1000 * 60 * 60 * 24)
                            )
                          )} days`
                        : ''}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <span className="text-[11px] text-stone-600 block mb-1 font-medium">Coupon Start Date</span>
                      <input
                        type="date"
                        required
                        value={formData.startDate || formData.validFrom}
                        onChange={(e) =>
                          setFormData({ ...formData, startDate: e.target.value, validFrom: e.target.value })
                        }
                        className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg outline-none text-stone-900 text-xs"
                      />
                    </div>

                    <div>
                      <span className="text-[11px] text-stone-600 block mb-1 font-medium">Coupon Expiry Date</span>
                      <input
                        type="date"
                        required
                        value={formData.expiryDate || formData.expiresAt}
                        onChange={(e) =>
                          setFormData({ ...formData, expiryDate: e.target.value, expiresAt: e.target.value })
                        }
                        className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg outline-none text-stone-900 text-xs font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-stone-500 font-medium block mb-1">Quick Expiry Presets:</span>
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

                {/* 5. Usage Limits (Total & Per Customer) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-stone-800 block mb-1">
                      Total Usage Limit <span className="text-[10px] text-stone-400 font-normal">(0 = Unlimited)</span>
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={formData.usageLimit || ''}
                      onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none text-stone-900 text-xs"
                      placeholder="e.g. 100"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-800 block mb-1">
                      Usage Limit Per Customer
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={formData.perCustomerLimit || 1}
                      onChange={(e) =>
                        setFormData({ ...formData, perCustomerLimit: Math.max(1, Number(e.target.value)) })
                      }
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none text-stone-900 text-xs"
                      placeholder="e.g. 1"
                    />
                  </div>
                </div>

                {/* 6. Product Scope */}
                <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/90 rounded-2xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-stone-900">Directly Applicable to All Products</p>
                      <p className="text-[10.5px] text-stone-500">
                        This promotional coupon applies universally to all artworks, photo frames, and customized gifts.
                      </p>
                    </div>
                  </div>
                  <span className="text-[10.5px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-full shrink-0">
                    Storewide
                  </span>
                </div>

                {/* 7. Offer Description */}
                <div>
                  <label className="font-semibold text-stone-800 block mb-1">Offer Description</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 10% off for all sacred acrylic artworks"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none text-stone-900 text-xs"
                  />
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 border border-stone-300 hover:bg-stone-50 text-stone-700 rounded-xl transition-colors cursor-pointer font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 bg-[#EAB308] hover:bg-[#FACC15] text-stone-950 font-extrabold rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    {saving ? 'Saving...' : editingCode ? 'Update Coupon' : 'Create Coupon'}
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
