'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Trash2,
  ExternalLink,
  X,
  Edit2,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Product, ProductOrientation } from '@/types';
import { INITIAL_CATEGORIES } from '@/lib/data/categories';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const initialForm = {
    title: '',
    slug: '',
    categorySlug: 'lord-venkateswara-balaji',
    categoryName: 'Lord Venkateswara (Balaji)',
    categorySlugs: ['lord-venkateswara-balaji'] as string[],
    artStyle: 'LED Backlit Acrylic',
    orientation: 'vertical' as ProductOrientation,
    shape: 'portrait',
    basePrice: 2999,
    baseMrp: 5999,
    hasLedBacklight: true,
    isFeatured: true,
    isBestseller: false,
    shortDescription: '',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    tags: 'Balaji, Tirupati, LED Art',
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (res.ok && data.success) {
        setProducts(data.products);
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditProduct = (prod: Product) => {
    setEditingSlug(prod.slug);
    setFormData({
      title: prod.title,
      slug: prod.slug,
      categorySlug: prod.categorySlug,
      categoryName: prod.categoryName,
      categorySlugs: prod.categorySlugs && prod.categorySlugs.length > 0 ? prod.categorySlugs : [prod.categorySlug],
      artStyle: prod.artStyle,
      orientation: prod.orientation,
      shape: prod.shape || 'portrait',
      basePrice: prod.basePrice,
      baseMrp: prod.baseMrp,
      hasLedBacklight: Boolean(prod.hasLedBacklight),
      isFeatured: Boolean(prod.isFeatured),
      isBestseller: Boolean(prod.isBestseller),
      shortDescription: prod.shortDescription || '',
      description: prod.description || '',
      imageUrl: prod.images[0] || '',
      tags: prod.tags.join(', '),
    });
    setModalOpen(true);
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const categoryObj = INITIAL_CATEGORIES.find((c) => c.slug === formData.categorySlug);

      const payload = {
        title: formData.title.trim(),
        slug: formData.slug.trim().toLowerCase(),
        subtitle: 'Handcrafted Museum Grade Cast Acrylic',
        shortDescription: formData.shortDescription.trim() || formData.title.trim(),
        description: formData.description.trim() || formData.shortDescription.trim(),
        categorySlug: formData.categorySlug,
        categoryName: categoryObj ? categoryObj.name : 'Devotional Art',
        categorySlugs: Array.from(new Set([formData.categorySlug, ...formData.categorySlugs])),
        shape: formData.shape as any,
        artStyle: formData.artStyle,
        orientation: formData.orientation as ProductOrientation,
        images: [formData.imageUrl.trim()],
        tags: formData.tags.split(',').map((t) => t.trim()),
        isFeatured: formData.isFeatured,
        isBestseller: formData.isBestseller,
        isNewArrival: true,
        hasLedBacklight: formData.hasLedBacklight,
        basePrice: Number(formData.basePrice),
        baseMrp: Number(formData.baseMrp),
        discountPercentage: Math.round(((formData.baseMrp - formData.basePrice) / formData.baseMrp) * 100),
      };

      if (editingSlug) {
        const res = await fetch(`/api/products/${editingSlug}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setModalOpen(false);
          setEditingSlug(null);
          fetchProducts();
          setFormData(initialForm);
        }
      } else {
        const createPayload = {
          ...payload,
          rating: 0,
          reviewCount: 0,
          variants: [
            {
              id: `var-${Date.now()}-1`,
              size: '12 x 18 inches',
              dimensionsCm: '30 x 45 cm',
              finish: 'Acrylic Ultra-Gloss',
              lighting: formData.hasLedBacklight ? 'Warm LED Backlit (12V Adapter)' : 'No Lighting (Pure Art)',
              price: Number(formData.basePrice),
              mrp: Number(formData.baseMrp),
              sku: `AG-${formData.slug.substring(0, 6).toUpperCase()}-1218`,
              inStock: true,
              stockCount: 25,
            },
          ],
          specifications: [
            { label: 'Art Material', value: '4mm Pure Crystal Glass Acrylic' },
            { label: 'Print Technology', value: '6-Color Swiss UV Direct Print' },
          ],
          materialAndCare: ['Clean gently with dry microfiber cloth'],
          shippingHighlights: ['100% Transit Safe Guarantee'],
          reviews: [],
        };

        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(createPayload),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setModalOpen(false);
          fetchProducts();
          setFormData(initialForm);
        }
      }
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (slug: string) => {
    if (!confirm('Are you sure you want to permanently delete this product?')) return;

    try {
      const res = await fetch(`/api/products/${slug}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.slug !== slug));
      }
    } catch {
      // ignore
    }
  };

  const filtered = products.filter((p) => {
    const matchesSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());
    const matchesCat = !selectedCat || p.categorySlug === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
              Product Catalogue
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Manage devotional wall art, LED variants, dimensions, pricing, and stock.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setEditingSlug(null);
              setFormData(initialForm);
              setModalOpen(true);
            }}
            className="bg-stone-900 hover:bg-amber-800 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-warm flex items-center justify-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by title or slug..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-700"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl outline-none cursor-pointer"
            >
              <option value="">All Categories ({products.length})</option>
              {INITIAL_CATEGORIES.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-500 border-b border-stone-200 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Artwork</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Base Price</th>
                  <th className="py-3.5 px-4">Stock</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filtered.map((prod) => (
                  <tr key={prod.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.images[0]}
                          alt={prod.title}
                          className="w-12 h-12 object-cover rounded-xl border border-stone-200"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-stone-900 truncate max-w-xs">{prod.title}</p>
                          <p className="text-[11px] text-stone-400 font-mono">{prod.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-stone-600 font-medium">
                      <div>{prod.categoryName}</div>
                      {prod.categorySlugs && prod.categorySlugs.length > 1 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          <span className="text-[10px] text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded font-mono">
                            +{prod.categorySlugs.length - 1} more categories
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {prod.hasLedBacklight ? (
                        <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded text-[10px]">
                          ✨ LED Backlit
                        </span>
                      ) : (
                        <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded text-[10px]">
                          Pure Acrylic
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-serif font-bold text-stone-900">
                      ₹{prod.basePrice.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[#651E2D] font-semibold bg-[#FCE7EA] px-2 py-0.5 rounded">
                        {prod.variants.reduce((s, v) => s + v.stockCount, 0)} in stock
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/product/${prod.slug}`}
                          target="_blank"
                          className="p-1.5 text-stone-400 hover:text-stone-800"
                          title="View on Storefront"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleEditProduct(prod)}
                          className="p-1.5 text-stone-400 hover:text-amber-800"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(prod.slug)}
                          className="p-1.5 text-stone-400 hover:text-red-600"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 z-10 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-serif font-bold text-xl text-stone-900">
                  {editingSlug ? 'Update Wall Art Creation' : 'Add New Wall Art Creation'}
                </h3>
                <button type="button" onClick={() => setModalOpen(false)} className="p-1 text-stone-400 hover:text-stone-800">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Artwork Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord Venkateswara Swamy 3D Crystal LED Wall Art"
                    value={formData.title}
                    onChange={(e) => {
                      const t = e.target.value;
                      setFormData({
                        ...formData,
                        title: t,
                        slug: t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                      });
                    }}
                    className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none focus:border-amber-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">URL Slug *</label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Primary Category *</label>
                    <select
                      value={formData.categorySlug}
                      onChange={(e) => {
                        const val = e.target.value;
                        const catObj = INITIAL_CATEGORIES.find((c) => c.slug === val);
                        setFormData({
                          ...formData,
                          categorySlug: val,
                          categoryName: catObj ? catObj.name : 'Wall Art',
                          categorySlugs: Array.from(new Set([val, ...formData.categorySlugs])),
                        });
                      }}
                      className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none"
                    >
                      {INITIAL_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Additional Categories Multi-Assignment */}
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    Assign to Multiple Categories (Select All That Apply)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 p-2 bg-stone-50 border border-stone-200 rounded-xl max-h-32 overflow-y-auto">
                    {INITIAL_CATEGORIES.map((c) => {
                      const isChecked = formData.categorySlugs.includes(c.slug);
                      return (
                        <label key={c.id} className="flex items-center gap-1.5 cursor-pointer text-[11px] p-1 rounded hover:bg-stone-100">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData({ ...formData, categorySlugs: [...formData.categorySlugs, c.slug] });
                              } else {
                                setFormData({ ...formData, categorySlugs: formData.categorySlugs.filter((s) => s !== c.slug) });
                              }
                            }}
                            className="rounded text-amber-700 focus:ring-amber-500"
                          />
                          <span className="truncate">{c.name}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Selling Price (₹) *</label>
                    <input
                      type="number"
                      required
                      value={formData.basePrice}
                      onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Original MRP (₹) *</label>
                    <input
                      type="number"
                      required
                      value={formData.baseMrp}
                      onChange={(e) => setFormData({ ...formData, baseMrp: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Orientation</label>
                    <select
                      value={formData.orientation}
                      onChange={(e) => setFormData({ ...formData, orientation: e.target.value as ProductOrientation })}
                      className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none"
                    >
                      <option value="vertical">Portrait (Vertical)</option>
                      <option value="horizontal">Landscape (Horizontal)</option>
                      <option value="square">Square</option>
                      <option value="round">Round</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Shape / Layout</label>
                    <select
                      value={formData.shape}
                      onChange={(e) => setFormData({ ...formData, shape: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none"
                    >
                      <option value="portrait">Portrait</option>
                      <option value="landscape">Landscape</option>
                      <option value="square">Square</option>
                      <option value="round">Round</option>
                      <option value="set-of-2">Set of 2</option>
                      <option value="set-of-3">Set of 3</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Artwork Image URL *</label>
                  <input
                    type="url"
                    required
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Short Description</label>
                  <textarea
                    rows={2}
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none"
                  />
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hasLedBacklight}
                      onChange={(e) => setFormData({ ...formData, hasLedBacklight: e.target.checked })}
                      className="rounded text-amber-700"
                    />
                    <span className="font-semibold">Warm LED Backlit Option</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="rounded text-amber-700"
                    />
                    <span className="font-semibold">Featured on Homepage</span>
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border text-stone-700 hover:bg-stone-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-amber-800 text-white font-semibold"
                  >
                    {saving ? 'Saving...' : editingSlug ? 'Update Product' : 'Save & Publish Product'}
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
