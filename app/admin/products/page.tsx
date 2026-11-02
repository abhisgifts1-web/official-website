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
  Sliders,
  Check,
  Sparkles,
  Layers,
  RotateCw,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Product, ProductOrientation } from '@/types';
import { INITIAL_CATEGORIES } from '@/lib/data/categories';

export interface AdminFormVariant {
  id: string;
  size: string;
  dimensionsCm: string;
  price: number;
  mrp: number;
  inStock: boolean;
  stockCount: number;
}

const getDefault4Variants = (
  orientation: string,
  basePrice: number = 2899,
  baseMrp: number = 5499
): AdminFormVariant[] => {
  if (orientation === 'square') {
    const p1 = basePrice || 2499;
    const m1 = baseMrp || 4999;
    return [
      { id: 'size-1', size: '12 x 12 inches', dimensionsCm: '30 x 30 cm', price: p1, mrp: m1, inStock: true, stockCount: 40 },
      { id: 'size-2', size: '18 x 18 inches', dimensionsCm: '45 x 45 cm', price: Math.round(p1 * 1.4), mrp: Math.round(m1 * 1.35), inStock: true, stockCount: 50 },
      { id: 'size-3', size: '24 x 24 inches', dimensionsCm: '60 x 60 cm', price: Math.round(p1 * 2.0), mrp: Math.round(m1 * 1.9), inStock: true, stockCount: 25 },
      { id: 'size-4', size: '30 x 30 inches (Grand Sanctum)', dimensionsCm: '75 x 75 cm', price: Math.round(p1 * 3.0), mrp: Math.round(m1 * 2.8), inStock: true, stockCount: 15 },
    ];
  }
  if (orientation === 'round') {
    const p1 = basePrice || 2699;
    const m1 = baseMrp || 5299;
    return [
      { id: 'size-1', size: '12" Dia Circular', dimensionsCm: '30 cm Diameter', price: p1, mrp: m1, inStock: true, stockCount: 35 },
      { id: 'size-2', size: '18" Dia Circular', dimensionsCm: '45 cm Diameter', price: Math.round(p1 * 1.4), mrp: Math.round(m1 * 1.35), inStock: true, stockCount: 45 },
      { id: 'size-3', size: '20" Dia Circular', dimensionsCm: '50 cm Diameter', price: Math.round(p1 * 1.95), mrp: Math.round(m1 * 1.85), inStock: true, stockCount: 20 },
      { id: 'size-4', size: '24" Dia Circular Halo', dimensionsCm: '60 cm Diameter', price: Math.round(p1 * 2.9), mrp: Math.round(m1 * 2.7), inStock: true, stockCount: 10 },
    ];
  }
  if (orientation === 'horizontal' || orientation === 'landscape') {
    const p1 = basePrice || 2899;
    const m1 = baseMrp || 5499;
    return [
      { id: 'size-1', size: '18 x 12 inches', dimensionsCm: '45 x 30 cm', price: p1, mrp: m1, inStock: true, stockCount: 45 },
      { id: 'size-2', size: '24 x 18 inches', dimensionsCm: '60 x 45 cm', price: Math.round(p1 * 1.38), mrp: Math.round(m1 * 1.36), inStock: true, stockCount: 60 },
      { id: 'size-3', size: '36 x 24 inches', dimensionsCm: '90 x 60 cm', price: Math.round(p1 * 2.07), mrp: Math.round(m1 * 2.0), inStock: true, stockCount: 30 },
      { id: 'size-4', size: '48 x 30 inches (Grand Wall Size)', dimensionsCm: '120 x 75 cm', price: Math.round(p1 * 3.1), mrp: Math.round(m1 * 3.0), inStock: true, stockCount: 15 },
    ];
  }
  // Default: Portrait / vertical
  const p1 = basePrice || 2899;
  const m1 = baseMrp || 5499;
  return [
    { id: 'size-1', size: '12 x 18 inches', dimensionsCm: '30 x 45 cm', price: p1, mrp: m1, inStock: true, stockCount: 45 },
    { id: 'size-2', size: '18 x 24 inches', dimensionsCm: '45 x 60 cm', price: Math.round(p1 * 1.38), mrp: Math.round(m1 * 1.36), inStock: true, stockCount: 60 },
    { id: 'size-3', size: '24 x 36 inches', dimensionsCm: '60 x 90 cm', price: Math.round(p1 * 2.07), mrp: Math.round(m1 * 2.0), inStock: true, stockCount: 30 },
    { id: 'size-4', size: '30 x 48 inches (Grand Wall Size)', dimensionsCm: '75 x 120 cm', price: Math.round(p1 * 3.1), mrp: Math.round(m1 * 3.0), inStock: true, stockCount: 15 },
  ];
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [selectedOrientationFilter, setSelectedOrientationFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state with 4 size variants & orientation
  const initialForm = {
    title: '',
    slug: '',
    categorySlug: 'lord-venkateswara-balaji',
    categoryName: 'Lord Venkateswara (Balaji)',
    categorySlugs: ['lord-venkateswara-balaji'] as string[],
    artStyle: 'LED Backlit Acrylic',
    orientation: 'vertical' as ProductOrientation,
    shape: 'portrait',
    basePrice: 2899,
    baseMrp: 5499,
    hasLedBacklight: true,
    isFeatured: true,
    isBestseller: false,
    shortDescription: '',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    tags: 'Balaji, Tirupati, LED Art',
    variants: getDefault4Variants('vertical', 2899, 5499),
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

    // Extract or build 4 variants
    const rawVariants = prod.variants && prod.variants.length > 0 ? prod.variants : [];
    const orientation = (prod.orientation || 'vertical') as ProductOrientation;
    const defaults = getDefault4Variants(orientation, prod.basePrice, prod.baseMrp);

    const variants: AdminFormVariant[] = [0, 1, 2, 3].map((idx) => {
      if (rawVariants[idx]) {
        return {
          id: rawVariants[idx].id || `size-${idx + 1}`,
          size: rawVariants[idx].size,
          dimensionsCm: rawVariants[idx].dimensionsCm,
          price: rawVariants[idx].price,
          mrp: rawVariants[idx].mrp,
          inStock: rawVariants[idx].inStock !== false,
          stockCount: rawVariants[idx].stockCount || 25,
        };
      }
      return defaults[idx];
    });

    setFormData({
      title: prod.title,
      slug: prod.slug,
      categorySlug: prod.categorySlug,
      categoryName: prod.categoryName,
      categorySlugs:
        prod.categorySlugs && prod.categorySlugs.length > 0
          ? prod.categorySlugs
          : [prod.categorySlug],
      artStyle: prod.artStyle,
      orientation: orientation,
      shape: prod.shape || (orientation === 'vertical' ? 'portrait' : orientation === 'horizontal' ? 'landscape' : orientation),
      basePrice: prod.basePrice,
      baseMrp: prod.baseMrp,
      hasLedBacklight: Boolean(prod.hasLedBacklight),
      isFeatured: Boolean(prod.isFeatured),
      isBestseller: Boolean(prod.isBestseller),
      shortDescription: prod.shortDescription || '',
      description: prod.description || '',
      imageUrl: prod.images[0] || '',
      tags: prod.tags.join(', '),
      variants,
    });

    setModalOpen(true);
  };

  // Change orientation and optionally update 4 size labels
  const handleOrientationChange = (newOrientation: ProductOrientation) => {
    const newShape =
      newOrientation === 'vertical'
        ? 'portrait'
        : newOrientation === 'horizontal'
        ? 'landscape'
        : newOrientation;

    setFormData((prev) => {
      const defaults = getDefault4Variants(newOrientation, prev.basePrice, prev.baseMrp);
      // Keep user's custom prices if already set, but update size labels and dimensions
      const updatedVariants = prev.variants.map((v, i) => ({
        ...v,
        size: defaults[i]?.size || v.size,
        dimensionsCm: defaults[i]?.dimensionsCm || v.dimensionsCm,
      }));

      return {
        ...prev,
        orientation: newOrientation,
        shape: newShape,
        variants: updatedVariants,
      };
    });
  };

  // Update a single variant field
  const handleVariantChange = (
    index: number,
    field: keyof AdminFormVariant,
    value: string | number | boolean
  ) => {
    setFormData((prev) => {
      const updated = [...prev.variants];
      updated[index] = { ...updated[index], [field]: value };

      // Keep primary basePrice & baseMrp in sync with Size 1
      let baseP = prev.basePrice;
      let baseM = prev.baseMrp;
      if (index === 0 && field === 'price') baseP = Number(value);
      if (index === 0 && field === 'mrp') baseM = Number(value);

      return {
        ...prev,
        variants: updated,
        basePrice: baseP,
        baseMrp: baseM,
      };
    });
  };

  // Reset/autofill standard 4 sizes
  const handleAutofillStandardSizes = () => {
    const defaults = getDefault4Variants(formData.orientation, formData.basePrice, formData.baseMrp);
    setFormData((prev) => ({
      ...prev,
      variants: defaults,
    }));
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const categoryObj = INITIAL_CATEGORIES.find((c) => c.slug === formData.categorySlug);

      const lowestPrice = Math.min(...formData.variants.map((v) => Number(v.price) || 999999));
      const primaryBasePrice = lowestPrice === 999999 ? Number(formData.basePrice) : lowestPrice;
      const primaryBaseMrp = Number(formData.variants[0]?.mrp || formData.baseMrp);

      const payload = {
        title: formData.title.trim(),
        slug: formData.slug.trim().toLowerCase(),
        subtitle: 'Handcrafted Museum Grade Cast Acrylic',
        shortDescription: formData.shortDescription.trim() || formData.title.trim(),
        description: formData.description.trim() || formData.shortDescription.trim(),
        categorySlug: formData.categorySlug,
        categoryName: categoryObj ? categoryObj.name : 'Wall Art',
        categorySlugs: Array.from(new Set([formData.categorySlug, ...formData.categorySlugs])),
        shape: formData.shape,
        artStyle: formData.artStyle,
        orientation: formData.orientation,
        images: [formData.imageUrl.trim()],
        tags: formData.tags.split(',').map((t) => t.trim()),
        isFeatured: formData.isFeatured,
        isBestseller: formData.isBestseller,
        isNewArrival: true,
        hasLedBacklight: formData.hasLedBacklight,
        basePrice: primaryBasePrice,
        baseMrp: primaryBaseMrp,
        discountPercentage: Math.round(((primaryBaseMrp - primaryBasePrice) / primaryBaseMrp) * 100),
        variants: formData.variants.map((v, idx) => ({
          id: v.id || `var-${Date.now()}-${idx + 1}`,
          size: v.size.trim(),
          dimensionsCm: v.dimensionsCm.trim(),
          finish: 'Acrylic Ultra-Gloss',
          lighting: formData.hasLedBacklight
            ? 'Warm LED Backlit (12V Adapter)'
            : 'No Lighting (Pure Art)',
          price: Number(v.price),
          mrp: Number(v.mrp),
          sku: `AG-${formData.slug.substring(0, 6).toUpperCase()}-${idx + 1}`,
          inStock: Boolean(v.inStock),
          stockCount: Number(v.stockCount) || 20,
        })),
        specifications: [
          { label: 'Art Material', value: '4mm Pure Crystal Cast Acrylic with CNC Beveled Edges' },
          { label: 'Lighting Technology', value: formData.hasLedBacklight ? '3000K Epistar Warm Glow LED Perimeter (12V Safe)' : 'Non-Lit Museum Art' },
          { label: 'Shape & Ratio', value: `${formData.shape.toUpperCase()} (${formData.orientation})` },
        ],
        materialAndCare: ['Clean gently with dry microfiber cloth', 'Keep away from abrasive chemical cleaners'],
        shippingHighlights: ['100% Transit Safe Guarantee', 'Free replacement if damaged in courier transit'],
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
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...payload,
            rating: 0,
            reviewCount: 0,
            reviews: [],
          }),
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
    const matchesOrientation =
      !selectedOrientationFilter ||
      p.orientation === selectedOrientationFilter ||
      p.shape === selectedOrientationFilter;

    return matchesSearch && matchesCat && matchesOrientation;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[10px] tracking-wider uppercase">
                Product Data &amp; 4-Size Pricing Engine
              </span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
              Modify Product Data
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Configure product orientations, 4 individual size dimensions, tiered pricing (₹), and live stock counts.
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
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search by title or slug..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-700"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {/* Category Filter */}
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

            {/* Orientation Filter */}
            <select
              value={selectedOrientationFilter}
              onChange={(e) => setSelectedOrientationFilter(e.target.value)}
              className="px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl outline-none cursor-pointer font-medium"
            >
              <option value="">All Orientations</option>
              <option value="vertical">Vertical / Portrait (2:3)</option>
              <option value="horizontal">Horizontal / Landscape (3:2)</option>
              <option value="square">Square (1:1)</option>
              <option value="round">Round (Halo)</option>
            </select>
          </div>
        </div>

        {/* Products Table with 4 Sizes & Orientation */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 border-b border-stone-200 uppercase tracking-wider font-semibold text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Artwork</th>
                  <th className="py-3.5 px-4">Orientation / Shape</th>
                  <th className="py-3.5 px-4 min-w-[280px]">4 Available Sizes &amp; Prices</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Lighting</th>
                  <th className="py-3.5 px-4 text-center">Total Stock</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filtered.map((prod) => {
                  const orientationLabel =
                    prod.orientation === 'horizontal' || prod.shape === 'landscape'
                      ? 'Landscape ↔️'
                      : prod.orientation === 'square' || prod.shape === 'square'
                      ? 'Square ⏹️'
                      : prod.orientation === 'round' || prod.shape === 'round'
                      ? 'Round ⚪'
                      : 'Portrait ↕️';

                  const fourSizes =
                    prod.variants && prod.variants.length > 0
                      ? prod.variants.slice(0, 4)
                      : getDefault4Variants(prod.orientation || 'vertical', prod.basePrice, prod.baseMrp);

                  const totalStock = prod.variants?.reduce((s, v) => s + (v.stockCount || 0), 0) || 40;

                  return (
                    <tr key={prod.id} className="hover:bg-amber-50/30 transition-colors">
                      {/* Artwork column */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.images[0]}
                            alt={prod.title}
                            className="w-12 h-12 object-cover rounded-xl border border-stone-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="font-bold text-stone-900 truncate max-w-xs">{prod.title}</p>
                            <p className="text-[11px] text-stone-400 font-mono truncate">{prod.slug}</p>
                          </div>
                        </div>
                      </td>

                      {/* Orientation column */}
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-200 text-stone-800 font-bold text-[11px] whitespace-nowrap">
                          {orientationLabel}
                        </span>
                      </td>

                      {/* 4 Sizes & Prices Pills column */}
                      <td className="py-3 px-4">
                        <div className="grid grid-cols-2 gap-1.5">
                          {fourSizes.map((v, i) => (
                            <div
                              key={i}
                              className="px-2 py-1 bg-stone-50 border border-stone-200 rounded-lg text-[10.5px] flex items-center justify-between gap-1.5"
                            >
                              <span className="text-stone-600 font-medium truncate max-w-[110px]" title={v.size}>
                                {v.size.replace(' inches', '"').replace(' (Grand Wall Size)', ' Grand').replace(' (Grand Sanctum)', '')}
                              </span>
                              <span className="font-bold font-serif text-amber-900 shrink-0">
                                ₹{v.price.toLocaleString('en-IN')}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4 text-stone-600 font-medium">
                        <span className="text-xs">{prod.categoryName}</span>
                      </td>

                      {/* Lighting Type */}
                      <td className="py-3 px-4">
                        {prod.hasLedBacklight ? (
                          <span className="bg-amber-100 text-amber-900 border border-amber-300 font-bold px-2 py-0.5 rounded text-[10px] whitespace-nowrap">
                            ✨ Warm 3000K LED
                          </span>
                        ) : (
                          <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded text-[10px] whitespace-nowrap">
                            Pure Acrylic
                          </span>
                        )}
                      </td>

                      {/* Stock */}
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                          {totalStock} in stock
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/product/${prod.slug}`}
                            target="_blank"
                            className="p-1.5 text-stone-400 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors"
                            title="View on Storefront"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleEditProduct(prod)}
                            className="px-2.5 py-1 text-xs font-semibold bg-stone-900 hover:bg-amber-800 text-white rounded-lg flex items-center gap-1 transition-colors"
                            title="Edit 4 Sizes & Product Data"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit Sizes</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(prod.slug)}
                            className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Product & 4-Size Modifier Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="flex min-h-full items-center justify-center p-3 sm:p-4">
            <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-5 sm:p-8 z-10 space-y-6 my-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900">
                    {editingSlug ? 'Modify Product Data & 4 Size Variants' : 'Add New Product with 4 Sizes'}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Customize the 4 dimensions, prices, and orientation for this product.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-6 text-xs">
                {/* 1. Basic Product Info */}
                <div className="space-y-3">
                  <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 text-xs flex items-center justify-center font-bold">1</span>
                    Basic Product Information
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">Product Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Divine Tirupati Balaji 3D Acrylic LED Backlit Wall Art"
                        value={formData.title}
                        onChange={(e) => {
                          const t = e.target.value;
                          setFormData({
                            ...formData,
                            title: t,
                            slug: t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                          });
                        }}
                        className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none focus:border-amber-700 text-xs"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">URL Slug *</label>
                      <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                        className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none text-xs"
                      >
                        {INITIAL_CATEGORIES.map((c) => (
                          <option key={c.id} value={c.slug}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">Artwork Image URL *</label>
                      <input
                        type="text"
                        required
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none font-mono text-[11px]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Orientation & Shape Selector */}
                <div className="space-y-3 pt-4 border-t border-stone-200">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 text-xs flex items-center justify-center font-bold">2</span>
                      Product Orientation &amp; Aspect Ratio
                    </h4>
                    <span className="text-[11px] text-stone-500">
                      Selecting orientation configures the recommended dimensions
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: 'vertical', shape: 'portrait', label: 'Portrait (2:3)', subtitle: 'Vertical Wall Frame', icon: '↕️' },
                      { id: 'horizontal', shape: 'landscape', label: 'Landscape (3:2)', subtitle: 'Horizontal Sofa Backdrop', icon: '↔️' },
                      { id: 'square', shape: 'square', label: 'Square (1:1)', subtitle: 'Balanced Sacred Mandala', icon: '⏹️' },
                      { id: 'round', shape: 'round', label: 'Round (Halo)', subtitle: 'Circular Diya & Halo', icon: '⚪' },
                    ].map((opt) => {
                      const isSelected = formData.orientation === opt.id || formData.shape === opt.shape;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleOrientationChange(opt.id as ProductOrientation)}
                          className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between gap-1 cursor-pointer ${
                            isSelected
                              ? 'border-amber-700 bg-amber-50/80 shadow-xs ring-1 ring-amber-700 font-bold'
                              : 'border-stone-200 bg-white hover:border-amber-500/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-base">{opt.icon}</span>
                            {isSelected && <span className="w-2 h-2 rounded-full bg-amber-700" />}
                          </div>
                          <div>
                            <span className="block font-bold text-xs text-stone-900">{opt.label}</span>
                            <span className="block text-[10px] text-stone-500 font-normal">{opt.subtitle}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. The Four (4) Sizes & Pricing Tier Editor */}
                <div className="space-y-3 pt-4 border-t border-stone-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 text-xs flex items-center justify-center font-bold">3</span>
                        4 Product Sizes &amp; Individual Pricing (₹)
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        Each size has its own custom selling price, original MRP, and stock availability.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAutofillStandardSizes}
                      className="px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-[11px] font-bold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
                    >
                      <RotateCw className="w-3 h-3" />
                      <span>Auto-fill Standard 4 Sizes</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {formData.variants.map((v, i) => {
                      const tierTitles = ['Size 1 (Small / Alcove)', 'Size 2 (Medium / Standard)', 'Size 3 (Large / Statement)', 'Size 4 (Grand Masterpiece)'];

                      return (
                        <div
                          key={i}
                          className="p-4 rounded-2xl bg-stone-50/70 border border-stone-200 space-y-3 relative hover:border-amber-400 transition-colors"
                        >
                          <div className="flex items-center justify-between border-b border-stone-200/80 pb-2">
                            <span className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                              <span className="w-4 h-4 rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center font-bold">
                                {i + 1}
                              </span>
                              {tierTitles[i]}
                            </span>
                            <label className="flex items-center gap-1.5 cursor-pointer text-[11px]">
                              <input
                                type="checkbox"
                                checked={v.inStock}
                                onChange={(e) => handleVariantChange(i, 'inStock', e.target.checked)}
                                className="rounded text-amber-700"
                              />
                              <span className={v.inStock ? 'text-emerald-700 font-bold' : 'text-stone-400'}>
                                {v.inStock ? 'In Stock' : 'Out of Stock'}
                              </span>
                            </label>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                                Size Dimensions *
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="e.g. 12 x 18 inches"
                                value={v.size}
                                onChange={(e) => handleVariantChange(i, 'size', e.target.value)}
                                className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-medium"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                                Dimensions (cm)
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. 30 x 45 cm"
                                value={v.dimensionsCm}
                                onChange={(e) => handleVariantChange(i, 'dimensionsCm', e.target.value)}
                                className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                                Selling Price (₹) *
                              </label>
                              <input
                                type="number"
                                required
                                value={v.price}
                                onChange={(e) => handleVariantChange(i, 'price', Number(e.target.value))}
                                className="w-full px-2.5 py-1.5 bg-white border border-amber-300 rounded-lg text-xs font-bold text-amber-950"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-semibold text-stone-500 block mb-1">
                                Original MRP (₹) *
                              </label>
                              <input
                                type="number"
                                required
                                value={v.mrp}
                                onChange={(e) => handleVariantChange(i, 'mrp', Number(e.target.value))}
                                className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-600"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-semibold text-stone-500 block mb-1">
                                Stock Count
                              </label>
                              <input
                                type="number"
                                value={v.stockCount}
                                onChange={(e) => handleVariantChange(i, 'stockCount', Number(e.target.value))}
                                className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Options & Badges */}
                <div className="space-y-3 pt-4 border-t border-stone-200">
                  <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 text-xs flex items-center justify-center font-bold">4</span>
                    Lighting &amp; Storefront Badges
                  </h4>

                  <div className="flex flex-wrap items-center gap-6 p-3 bg-stone-50 rounded-2xl border border-stone-200">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.hasLedBacklight}
                        onChange={(e) => setFormData({ ...formData, hasLedBacklight: e.target.checked })}
                        className="rounded text-amber-700"
                      />
                      <span className="font-semibold text-stone-800">Warm 3000K LED Backlight Option</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isFeatured}
                        onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                        className="rounded text-amber-700"
                      />
                      <span className="font-semibold text-stone-800">Featured on Homepage</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isBestseller}
                        onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
                        className="rounded text-amber-700"
                      />
                      <span className="font-semibold text-stone-800">Bestseller Badge</span>
                    </label>
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Short Description</label>
                    <textarea
                      rows={2}
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none text-xs"
                      placeholder="Brief customer-facing summary..."
                    />
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border text-stone-700 hover:bg-stone-50 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-amber-800 text-white font-bold transition-colors shadow-sm"
                  >
                    {saving ? 'Saving...' : editingSlug ? 'Update Product & 4 Sizes' : 'Save & Publish Product'}
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
