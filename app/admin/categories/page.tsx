'use client';

import React, { useState, useEffect } from 'react';
import { Plus, X, ExternalLink } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Category } from '@/types';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    parentType: 'devotional',
  });

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (res.ok && data.success) {
        setCategories(data.categories);
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchCategories();
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
        fetchCategories();
        setFormData({
          name: '',
          slug: '',
          description: '',
          image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
          parentType: 'devotional',
        });
      }
    } catch {
      // ignore
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
              Categories & Collections
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Organize devotional wall art, modern styles, and customized frame series.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="bg-stone-900 hover:bg-amber-800 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-warm flex items-center justify-center gap-2 transition-colors self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div className="relative aspect-video w-full bg-stone-100">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                <span className="absolute top-2.5 left-2.5 bg-stone-900/90 text-amber-300 font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full">
                  {cat.parentType}
                </span>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-stone-900">{cat.name}</h3>
                  <p className="text-xs text-stone-500 line-clamp-2 mt-1">{cat.description}</p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-400 font-mono text-[11px]">/{cat.slug}</span>
                  <a
                    href={`/category/${cat.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-800 hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>View</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Category Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 z-10 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-serif font-bold text-lg text-stone-900">Add New Category</h3>
                <button type="button" onClick={() => setModalOpen(false)} className="p-1 text-stone-400 hover:text-stone-800">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Category Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord Kartikeya (Murugan)"
                    value={formData.name}
                    onChange={(e) => {
                      const n = e.target.value;
                      setFormData({
                        ...formData,
                        name: n,
                        slug: n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                      });
                    }}
                    className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none focus:border-amber-700"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Section Group *</label>
                  <select
                    value={formData.parentType}
                    onChange={(e) => setFormData({ ...formData, parentType: e.target.value as 'devotional' | 'wall-art-styles' | 'custom-frames' })}
                    className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none"
                  >
                    <option value="devotional">Devotional Wall Art</option>
                    <option value="wall-art-styles">Wall Art Styles</option>
                    <option value="custom-frames">Custom Photo Frames</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Banner Image URL *</label>
                  <input
                    type="url"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Short Description</label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 border rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-stone-900 hover:bg-amber-800 text-white font-semibold rounded-xl"
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
