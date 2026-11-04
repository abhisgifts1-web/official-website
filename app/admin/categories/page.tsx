'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, X, ExternalLink, Layers, Sparkles, Zap, Package, ArrowRight, Edit } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Category, Product } from '@/types';
import { INITIAL_CATEGORIES } from '@/lib/data/categories';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [products, setProducts] = useState<Product[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '/images/collections/custom-portrait-frame.jpg',
    parentType: 'custom-frames',
  });

  const fetchCategoriesAndProducts = async () => {
    try {
      const [catRes, prodRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/products'),
      ]);

      if (catRes.ok) {
        const catData = await catRes.json();
        if (catData.success && catData.categories?.length > 0) {
          setCategories(catData.categories);
        }
      }

      if (prodRes.ok) {
        const prodData = await prodRes.json();
        if (prodData.success) {
          setProducts(prodData.products);
        }
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchCategoriesAndProducts();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setModalOpen(false);
        fetchCategoriesAndProducts();
        setFormData({
          name: '',
          slug: '',
          description: '',
          image: '/images/collections/custom-portrait-frame.jpg',
          parentType: 'custom-frames',
        });
      }
    } catch {
      // ignore
    }
  };

  // Live item count calculation
  const getProductCount = (catSlug: string) => {
    if (products.length === 0) {
      const found = categories.find((c) => c.slug === catSlug);
      return found?.itemCount || 0;
    }
    return products.filter(
      (p) => p.categorySlug === catSlug || p.categorySlugs?.includes(catSlug)
    ).length;
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
                Storefront Taxonomies
              </span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              Official Store Categories
            </h1>
            <p className="text-xs text-[#A1A1AA] mt-0.5">
              Manage the 8 official collections published on the storefront. All products map directly to these categories.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="bg-[#EAB308] hover:bg-[#FACC15] text-black font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-[0_2px_12px_rgba(234,179,8,0.25)] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Collection</span>
            </button>
            <Link
              href="/category"
              target="_blank"
              className="bg-[#1E1E1E] hover:bg-[#262626] text-white border border-[#333333] text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <span>Explore Live</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#EAB308]" />
            </Link>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {categories.map((cat) => {
            const liveCount = getProductCount(cat.slug);
            const isLed = cat.lightingType === 'backlight' || cat.group === 'led-backlight';

            return (
              <div
                key={cat.id}
                className="bg-[#141414] rounded-2xl border border-[#2D2D2D] hover:border-[#EAB308]/50 overflow-hidden shadow-sm flex flex-col justify-between group transition-all"
              >
                <div className="relative aspect-[16/10] w-full bg-black/60 overflow-hidden border-b border-[#262626]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="bg-black/85 backdrop-blur-xs text-[#FACC15] border border-[#EAB308]/40 font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-md">
                      {cat.parentType || 'Category'}
                    </span>
                    {isLed && (
                      <span className="bg-amber-950/80 backdrop-blur-xs text-amber-300 border border-amber-500/40 font-bold text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Zap className="w-2.5 h-2.5 text-[#EAB308]" /> LED Glow
                      </span>
                    )}
                  </div>
                  <span className="absolute bottom-2.5 right-2.5 bg-black/85 backdrop-blur-xs text-white text-[10.5px] font-mono font-bold px-2.5 py-0.5 rounded-md border border-white/10 flex items-center gap-1">
                    <Package className="w-3 h-3 text-[#EAB308]" />
                    {liveCount} Items
                  </span>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-base text-white group-hover:text-[#FACC15] transition-colors leading-snug">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#A1A1AA] line-clamp-2 mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#262626] flex items-center justify-between text-xs">
                    <Link
                      href={`/admin/products?cat=${cat.slug}`}
                      className="text-[#EAB308] hover:text-[#FACC15] font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Edit Artworks</span>
                    </Link>
                    <a
                      href={`/category/${cat.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#9CA3AF] hover:text-white font-medium flex items-center gap-1 transition-colors"
                    >
                      <span>Storefront</span>
                      <ExternalLink className="w-3 h-3 text-[#EAB308]" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Category Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-[#141414] border border-[#2D2D2D] rounded-3xl shadow-2xl p-6 sm:p-8 z-10 space-y-4 text-white">
              <div className="flex items-center justify-between border-b border-[#2D2D2D] pb-3">
                <h3 className="font-serif font-bold text-lg text-white">Add New Category</h3>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="p-1 text-[#9CA3AF] hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-[#D1D5DB] block mb-1">Category Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gallery Wall Frames"
                    value={formData.name}
                    onChange={(e) => {
                      const n = e.target.value;
                      setFormData({
                        ...formData,
                        name: n,
                        slug: n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                      });
                    }}
                    className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl outline-none focus:border-[#EAB308] text-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#D1D5DB] block mb-1">Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl outline-none font-mono text-[#FACC15]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#D1D5DB] block mb-1">Section Group *</label>
                  <select
                    value={formData.parentType}
                    onChange={(e) => setFormData({ ...formData, parentType: e.target.value })}
                    className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl outline-none text-white"
                  >
                    <option value="custom-frames">Custom Photo Frames</option>
                    <option value="devotional">Devotional Wall Art</option>
                    <option value="wall-art-styles">Wall Art Styles</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#D1D5DB] block mb-1">Banner Image Path *</label>
                  <input
                    type="text"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl outline-none font-mono text-[11px] text-[#D1D5DB]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#D1D5DB] block mb-1">Short Description</label>
                  <textarea
                    rows={2}
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
                    Save Category
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
