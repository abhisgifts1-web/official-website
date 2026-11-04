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
      <div className="space-y-6 max-w-7xl mx-auto text-stone-900">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200 p-5 sm:p-6 rounded-3xl shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 font-bold text-[10px] tracking-wider uppercase flex items-center gap-1 shadow-2xs">
                <Sparkles className="w-3 h-3 text-amber-700" />
                Storefront Taxonomies
              </span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
              Official Store Categories
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Manage the 8 official collections published on the storefront. All products map directly to these categories.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="bg-[#EAB308] hover:bg-[#FACC15] text-black font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Collection</span>
            </button>
            <Link
              href="/category"
              target="_blank"
              className="bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <span>Explore Live</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-700" />
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
                className="bg-white rounded-2xl border border-stone-200 hover:border-amber-400 overflow-hidden shadow-xs flex flex-col justify-between group transition-all"
              >
                <div className="relative aspect-[16/10] w-full bg-stone-100 overflow-hidden border-b border-stone-200">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="bg-stone-900/80 backdrop-blur-xs text-amber-300 border border-amber-400/40 font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-md">
                      {cat.parentType || 'Category'}
                    </span>
                    {isLed && (
                      <span className="bg-amber-100/90 backdrop-blur-xs text-amber-900 border border-amber-300 font-bold text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Zap className="w-2.5 h-2.5 text-amber-700" /> LED Glow
                      </span>
                    )}
                  </div>
                  <span className="absolute bottom-2.5 right-2.5 bg-stone-900/80 backdrop-blur-xs text-white text-[10.5px] font-mono font-bold px-2.5 py-0.5 rounded-md border border-stone-700 flex items-center gap-1">
                    <Package className="w-3 h-3 text-amber-400" />
                    {liveCount} Items
                  </span>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <Link
                      href={`/admin/products?cat=${cat.slug}`}
                      className="text-amber-800 hover:text-amber-900 font-bold flex items-center gap-1 transition-colors"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Edit Artworks</span>
                    </Link>
                    <a
                      href={`/category/${cat.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-500 hover:text-stone-900 font-medium flex items-center gap-1 transition-colors"
                    >
                      <span>Storefront</span>
                      <ExternalLink className="w-3 h-3 text-amber-700" />
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
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setModalOpen(false)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-white border border-stone-200 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 space-y-4 text-stone-900">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <h3 className="font-serif font-bold text-lg text-stone-900">Add New Category</h3>
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
                  <label className="font-semibold text-stone-700 block mb-1">Category Name *</label>
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
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none font-mono text-amber-900 font-bold"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Section Group *</label>
                  <select
                    value={formData.parentType}
                    onChange={(e) => setFormData({ ...formData, parentType: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none text-stone-900"
                  >
                    <option value="custom-frames">Custom Photo Frames</option>
                    <option value="devotional">Devotional Wall Art</option>
                    <option value="wall-art-styles">Wall Art Styles</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Banner Image Path *</label>
                  <input
                    type="text"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none font-mono text-[11px] text-stone-700"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Short Description</label>
                  <textarea
                    rows={2}
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
