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
  Sparkles,
  RotateCw,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Product, ProductOrientation, OrientationShape } from '@/types';
import { INITIAL_CATEGORIES } from '@/lib/data/categories';

interface AdminFormVariant {
  id: string;
  size: string;
  dimensionsCm: string;
  price: number;
  mrp: number;
  inStock: boolean;
  stockCount: number;
}


const getDefault4Variants = (
  basePrice: number = 2499,
  baseMrp: number = 4999
): AdminFormVariant[] => {
  const p1 = basePrice || 2499;
  const m1 = baseMrp || 4999;
  return [
    { id: 'size-1', size: '12 x 18 inches', dimensionsCm: '30 x 45 cm', price: p1, mrp: m1, inStock: true, stockCount: 45 },
    { id: 'size-2', size: '18 x 24 inches', dimensionsCm: '45 x 60 cm', price: Math.round(p1 * 1.38), mrp: Math.round(m1 * 1.36), inStock: true, stockCount: 60 },
    { id: 'size-3', size: '24 x 36 inches', dimensionsCm: '60 x 90 cm', price: Math.round(p1 * 2.07), mrp: Math.round(m1 * 2.0), inStock: true, stockCount: 30 },
    { id: 'size-4', size: '30 x 48 inches (Grand Wall Size)', dimensionsCm: '75 x 120 cm', price: Math.round(p1 * 3.1), mrp: Math.round(m1 * 3.0), inStock: true, stockCount: 15 },
  ];
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const initialForm = {
    title: '',
    slug: '',
    categorySlug: 'acrylic-photo-frames',
    categoryName: 'Acrylic Photo Frames',
    categorySlugs: ['acrylic-photo-frames'] as string[],
    artStyle: 'High-Definition Cast Acrylic',
    orientation: 'vertical' as ProductOrientation,
    shape: 'portrait' as OrientationShape,
    basePrice: 2499,
    baseMrp: 4999,
    hasLedBacklight: false,
    isFeatured: true,
    isBestseller: false,
    shortDescription: '',
    description: '',
    imageUrl: '/images/collections/custom-portrait-frame.jpg',
    tags: 'Acrylic Photo Frame, Hyderabad, Wall Decor',
    variants: getDefault4Variants(2499, 4999),
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products');
      const data = await res.json();
      if (res.ok && data.success) {
        setProducts(data.products);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const cat = urlParams.get('cat');
      if (cat) setSelectedCat(cat);
    }
  }, []);

  const handleEditProduct = (prod: Product) => {
    setEditingSlug(prod.slug);

    const baseP = prod.basePrice || 2499;
    const baseM = prod.baseMrp || 4999;

    const existingVariants: AdminFormVariant[] =
      prod.variants && prod.variants.length > 0
        ? prod.variants.map((v, i) => ({
            id: v.id || `var-${i + 1}`,
            size: v.size,
            dimensionsCm: v.dimensionsCm,
            price: v.price,
            mrp: v.mrp,
            inStock: v.inStock !== false,
            stockCount: v.stockCount || 25,
          }))
        : getDefault4Variants(baseP, baseM);

    setFormData({
      title: prod.title,
      slug: prod.slug,
      categorySlug: prod.categorySlug,
      categoryName: prod.categoryName,
      categorySlugs:
        prod.categorySlugs && prod.categorySlugs.length > 0
          ? prod.categorySlugs
          : [prod.categorySlug],
      artStyle: prod.artStyle || 'High-Definition Cast Acrylic',
      orientation: (prod.orientation || 'vertical') as ProductOrientation,
      shape: (prod.shape || 'portrait') as OrientationShape,
      basePrice: baseP,
      baseMrp: baseM,
      hasLedBacklight: Boolean(prod.hasLedBacklight),
      isFeatured: Boolean(prod.isFeatured),
      isBestseller: Boolean(prod.isBestseller),
      shortDescription: prod.shortDescription || '',
      description: prod.description || '',
      imageUrl: prod.images[0] || '',
      tags: (prod.tags || []).join(', '),
      variants: existingVariants,
    });

    setModalOpen(true);
  };

  // Update a single variant field in the 4 sizes
  const handleVariantChange = (
    index: number,
    field: keyof AdminFormVariant,
    value: string | number | boolean
  ) => {
    setFormData((prev) => {
      const updated = [...prev.variants];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      let baseP = prev.basePrice;
      let baseM = prev.baseMrp;

      if (index === 0) {
        if (field === 'price') baseP = Number(value);
        if (field === 'mrp') baseM = Number(value);
      }

      return {
        ...prev,
        variants: updated,
        basePrice: baseP,
        baseMrp: baseM,
      };
    });
  };

  // Reset to standard 4 sizes
  const handleAutofillStandardSizes = () => {
    const defaults = getDefault4Variants(formData.basePrice, formData.baseMrp);
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

      const formattedVariants = formData.variants.map((v, idx) => ({
        id: v.id || `var-${idx + 1}`,
        size: v.size.trim(),
        dimensionsCm: v.dimensionsCm.trim(),
        finish: 'Acrylic Ultra-Gloss' as const,
        lighting: formData.hasLedBacklight
          ? ('Warm LED Backlit (12V Adapter)' as const)
          : ('No Lighting (Pure Art)' as const),
        price: Number(v.price),
        mrp: Number(v.mrp),
        sku: `AG-${formData.slug.substring(0, 6).toUpperCase()}-${idx + 1}`,
        inStock: Boolean(v.inStock),
        stockCount: Number(v.stockCount) || 20,
      }));

      const primaryBasePrice = formattedVariants[0]?.price || Number(formData.basePrice);
      const primaryBaseMrp = formattedVariants[0]?.mrp || Number(formData.baseMrp);

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
        variants: formattedVariants,
        orientationVariants: {
          portrait: formattedVariants,
          landscape: formattedVariants,
          square: formattedVariants,
        },
        specifications: [
          { label: 'Art Material', value: 'Premium Acrylic with CNC Beveled Edges' },
          {
            label: 'Lighting Technology',
            value: formData.hasLedBacklight
              ? 'Epistar Warm Glow LED Perimeter (12V Safe)'
              : 'Non-Lit Museum Art',
          },
        ],
        materialAndCare: [
          'Clean gently with dry microfiber cloth',
          'Keep away from abrasive chemical cleaners',
        ],
        shippingHighlights: [
          'Safe multi-layer packaging standard',
          'Zero transit damage guarantee',
        ],
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

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(search.toLowerCase());

    const matchesCat = selectedCat
      ? p.categorySlug === selectedCat || p.categorySlugs?.includes(selectedCat)
      : true;

    return matchesSearch && matchesCat;
  });

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141414] border border-[#2D2D2D] p-5 sm:p-6 rounded-3xl">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#EAB308]/15 border border-[#EAB308]/40 text-[#FACC15] font-bold text-[10px] tracking-wider uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#EAB308]" />
                Catalog Operations
              </span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              Artwork Catalog &amp; Inventory Management
            </h1>
            <p className="text-xs text-[#A1A1AA] mt-1">
              Manage luxury acrylic artworks, sizes, pricing, and live inventory status across all collections.
            </p>
          </div>

          <button
            onClick={() => {
              setEditingSlug(null);
              setFormData(initialForm);
              setModalOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-[#EAB308] hover:bg-[#FACC15] text-black px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all shadow-[0_2px_12px_rgba(234,179,8,0.25)] hover:scale-[1.02] self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Masterpiece</span>
          </button>
        </div>

        {/* Toolbar & Filters (Orientation Filter Removed) */}
        <div className="bg-[#141414] p-4 rounded-2xl border border-[#2D2D2D] shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#A1A1AA] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, slug, or deity..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl outline-none focus:border-[#EAB308] text-xs text-white placeholder-[#71717A]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="px-3 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl outline-none text-xs text-white"
            >
              <option value="">All Categories ({INITIAL_CATEGORIES.length})</option>
              {INITIAL_CATEGORIES.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Table (Orientation Column Removed) */}
        <div className="bg-[#141414] rounded-2xl border border-[#2D2D2D] shadow-2xs overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-xs text-[#A1A1AA]">Loading catalog...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-12 text-center text-xs text-[#A1A1AA]">No artworks match your criteria.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#D1D5DB]">
                <thead className="bg-[#1C1C1E] border-b border-[#2D2D2D] text-[#A1A1AA] font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Artwork</th>
                    <th className="py-3 px-4">4 Sizes &amp; Pricing</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Lighting</th>
                    <th className="py-3 px-4 text-center">Total Stock</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262626]">
                  {filteredProducts.map((prod) => {
                    const primaryVariants =
                      prod.variants && prod.variants.length > 0
                        ? prod.variants
                        : getDefault4Variants(prod.basePrice, prod.baseMrp);

                    const fourSizes = primaryVariants.slice(0, 4);
                    const totalStock = fourSizes.reduce((acc, v) => acc + (v.stockCount || 0), 0);

                    return (
                      <tr key={prod.id} className="hover:bg-[#1A1A1A] transition-colors">
                        {/* Artwork column */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.images[0]}
                              alt={prod.title}
                              className="w-12 h-12 object-cover rounded-xl border border-[#333333] shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="font-bold text-white truncate max-w-xs">{prod.title}</p>
                              <p className="text-[11px] text-[#A1A1AA] font-mono truncate">{prod.slug}</p>
                            </div>
                          </div>
                        </td>

                        {/* 4 Sizes & Prices Pills column */}
                        <td className="py-3 px-4">
                          <div className="grid grid-cols-2 gap-1.5">
                            {fourSizes.map((v, i) => (
                              <div
                                key={i}
                                className="px-2 py-1 bg-[#1A1A1A] border border-[#2D2D2D] rounded-lg text-[10.5px] flex items-center justify-between gap-1.5"
                              >
                                <span className="text-[#A1A1AA] font-medium truncate max-w-[110px]" title={v.size}>
                                  {v.size.replace(' inches', '"').replace(' (Grand Wall Size)', ' Grand').replace(' (Grand Sanctum)', '')}
                                </span>
                                <span className="font-bold font-serif text-[#FACC15] shrink-0">
                                  ₹{v.price.toLocaleString('en-IN')}
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3 px-4 text-[#D1D5DB] font-medium">
                          <span className="text-xs">{prod.categoryName}</span>
                        </td>

                        {/* Lighting Type */}
                        <td className="py-3 px-4">
                          {prod.hasLedBacklight ? (
                            <span className="bg-[#EAB308]/15 text-[#FACC15] border border-[#EAB308]/40 font-bold px-2 py-0.5 rounded text-[10px] whitespace-nowrap">
                              ✨ Ambient LED
                            </span>
                          ) : (
                            <span className="bg-[#1E1E1E] text-[#A1A1AA] border border-[#333333] px-2 py-0.5 rounded text-[10px] whitespace-nowrap">
                              Pure Acrylic
                            </span>
                          )}
                        </td>

                        {/* Stock */}
                        <td className="py-3 px-4 text-center">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold">
                            {totalStock} in stock
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              href={`/product/${prod.slug}`}
                              target="_blank"
                              className="p-1.5 text-[#9CA3AF] hover:text-[#FFFFFF] hover:bg-[#1E1E1E] rounded-lg transition-colors"
                              title="View on Storefront"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleEditProduct(prod)}
                              className="px-2.5 py-1 text-xs font-semibold bg-[#EAB308] hover:bg-[#FACC15] text-black rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                              title="Edit Artwork & Sizes"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(prod.slug)}
                              className="p-1.5 text-[#71717A] hover:text-red-400 hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer"
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
          )}
        </div>

        {/* Modal: Add / Edit Product (Dark Atelier Theme & Orientation Removed) */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
            <div className="bg-[#141414] rounded-3xl max-w-4xl w-full p-6 sm:p-7 shadow-2xl border border-[#2D2D2D] my-8 max-h-[92vh] overflow-y-auto text-white">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-[#2D2D2D] pb-4 mb-5">
                <div>
                  <h3 className="font-serif font-bold text-xl text-white">
                    {editingSlug ? 'Edit Artwork & Pricing' : 'Add New Masterpiece'}
                  </h3>
                  <p className="text-xs text-[#A1A1AA] mt-0.5">
                    Configure title, category, 4 standard sizes, selling prices, and inventory stock.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="p-2 text-[#A1A1AA] hover:text-white hover:bg-[#1E1E1E] rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-6 text-xs">
                {/* 1. Basic Details */}
                <div className="space-y-3">
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#EAB308]/20 text-[#FACC15] text-xs flex items-center justify-center font-bold">1</span>
                    Artwork Information
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-[#D1D5DB] block mb-1">Title *</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl outline-none focus:border-[#EAB308] text-xs text-white placeholder-[#71717A]"
                        placeholder="e.g. Tirupati Balaji Divine Blessings"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-[#D1D5DB] block mb-1">URL Slug *</label>
                      <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl outline-none font-mono text-xs text-white placeholder-[#71717A]"
                        placeholder="e.g. tirupati-balaji-divine-blessings"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-[#D1D5DB] block mb-1">Primary Category *</label>
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
                        className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl outline-none text-xs text-white"
                      >
                        {INITIAL_CATEGORIES.map((c) => (
                          <option key={c.id} value={c.slug} className="bg-[#1A1A1A] text-white">
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-[#D1D5DB] block mb-1">Artwork Image URL *</label>
                      <input
                        type="text"
                        required
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl outline-none font-mono text-[11px] text-white placeholder-[#71717A]"
                        placeholder="/images/products/..."
                      />
                    </div>
                  </div>
                </div>

                {/* 2. 4 Sizes & Pricing Engine (Directly configured, no orientation clutter) */}
                <div className="space-y-4 pt-5 border-t border-[#2D2D2D]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-white text-sm flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#EAB308]/20 text-[#FACC15] text-xs flex items-center justify-center font-bold">2</span>
                        Artwork Sizes &amp; Individual Pricing (₹)
                      </h4>
                      <p className="text-[11px] text-[#A1A1AA]">
                        Configure dimensions, selling price (₹), original MRP (₹), and stock for each size tier.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAutofillStandardSizes}
                      className="px-3 py-1.5 rounded-xl border border-[#EAB308]/40 bg-[#EAB308]/10 hover:bg-[#EAB308]/20 text-[#FACC15] text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
                      title="Reset dimensions to standard default sizes"
                    >
                      <RotateCw className="w-3 h-3 text-[#EAB308]" />
                      <span>Reset Standard Sizes</span>
                    </button>
                  </div>

                  {/* 4 Size Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {formData.variants.map((v, i) => {
                      const tierTitles = [
                        'Size 1 (Small / Alcove)',
                        'Size 2 (Medium / Standard)',
                        'Size 3 (Large / Statement)',
                        'Size 4 (Grand Masterpiece)',
                      ];

                      return (
                        <div
                          key={i}
                          className="p-4 rounded-2xl bg-[#1A1A1A] border border-[#2D2D2D] space-y-3 relative hover:border-[#EAB308]/40 transition-colors"
                        >
                          <div className="flex items-center justify-between border-b border-[#282828] pb-2">
                            <span className="font-bold text-xs text-white flex items-center gap-1.5">
                              <span className="w-4 h-4 rounded-full bg-[#EAB308] text-black text-[10px] flex items-center justify-center font-bold">
                                {i + 1}
                              </span>
                              {tierTitles[i]}
                            </span>
                            <label className="flex items-center gap-1.5 cursor-pointer text-[11px]">
                              <input
                                type="checkbox"
                                checked={v.inStock}
                                onChange={(e) => handleVariantChange(i, 'inStock', e.target.checked)}
                                className="rounded text-[#EAB308] accent-[#EAB308]"
                              />
                              <span className={v.inStock ? 'text-emerald-400 font-bold' : 'text-[#71717A]'}>
                                {v.inStock ? 'In Stock' : 'Out of Stock'}
                              </span>
                            </label>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[11px] font-semibold text-[#A1A1AA] block mb-1">
                                Size Dimensions *
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="e.g. 12 x 18 inches"
                                value={v.size}
                                onChange={(e) => handleVariantChange(i, 'size', e.target.value)}
                                className="w-full px-2.5 py-1.5 bg-[#141414] border border-[#333333] rounded-lg text-xs font-medium text-white focus:border-[#EAB308]"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-semibold text-[#A1A1AA] block mb-1">
                                Dimensions (cm)
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. 30 x 45 cm"
                                value={v.dimensionsCm}
                                onChange={(e) => handleVariantChange(i, 'dimensionsCm', e.target.value)}
                                className="w-full px-2.5 py-1.5 bg-[#141414] border border-[#333333] rounded-lg text-xs text-white focus:border-[#EAB308]"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <label className="text-[11px] font-semibold text-[#FACC15] block mb-1">
                                Selling Price (₹) *
                              </label>
                              <input
                                type="number"
                                required
                                value={v.price}
                                onChange={(e) => handleVariantChange(i, 'price', Number(e.target.value))}
                                className="w-full px-2.5 py-1.5 bg-[#141414] border border-[#EAB308]/40 rounded-lg text-xs font-bold text-[#FACC15] focus:border-[#EAB308]"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-semibold text-[#A1A1AA] block mb-1">
                                MRP (₹) *
                              </label>
                              <input
                                type="number"
                                required
                                value={v.mrp}
                                onChange={(e) => handleVariantChange(i, 'mrp', Number(e.target.value))}
                                className="w-full px-2.5 py-1.5 bg-[#141414] border border-[#333333] rounded-lg text-xs text-[#D1D5DB] focus:border-[#EAB308]"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-semibold text-[#A1A1AA] block mb-1">
                                Stock Count
                              </label>
                              <input
                                type="number"
                                value={v.stockCount}
                                onChange={(e) => handleVariantChange(i, 'stockCount', Number(e.target.value))}
                                className="w-full px-2.5 py-1.5 bg-[#141414] border border-[#333333] rounded-lg text-xs text-white focus:border-[#EAB308]"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Options & Badges */}
                <div className="space-y-3 pt-5 border-t border-[#2D2D2D]">
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#EAB308]/20 text-[#FACC15] text-xs flex items-center justify-center font-bold">3</span>
                    Lighting &amp; Storefront Badges
                  </h4>

                  <div className="flex flex-wrap items-center gap-6 p-3.5 bg-[#1A1A1A] rounded-2xl border border-[#2D2D2D]">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-white">
                      <input
                        type="checkbox"
                        checked={formData.hasLedBacklight}
                        onChange={(e) => setFormData({ ...formData, hasLedBacklight: e.target.checked })}
                        className="rounded text-[#EAB308] accent-[#EAB308]"
                      />
                      <span className="font-semibold text-white">Warm LED Backlight</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs text-white">
                      <input
                        type="checkbox"
                        checked={formData.isFeatured}
                        onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                        className="rounded text-[#EAB308] accent-[#EAB308]"
                      />
                      <span className="font-semibold text-white">Featured Atelier Piece</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs text-white">
                      <input
                        type="checkbox"
                        checked={formData.isBestseller}
                        onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
                        className="rounded text-[#EAB308] accent-[#EAB308]"
                      />
                      <span className="font-semibold text-white">Bestseller Badge</span>
                    </label>
                  </div>
                </div>

                {/* 4. Descriptions & Search Tags */}
                <div className="space-y-3 pt-5 border-t border-[#2D2D2D]">
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#EAB308]/20 text-[#FACC15] text-xs flex items-center justify-center font-bold">4</span>
                    Descriptions &amp; Search Tags
                  </h4>

                  <div>
                    <label className="font-semibold text-[#D1D5DB] block mb-1">Short Description</label>
                    <input
                      type="text"
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl outline-none focus:border-[#EAB308] text-xs text-white placeholder-[#71717A]"
                      placeholder="Concise devotional summary for collection cards..."
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#D1D5DB] block mb-1">Detailed Story &amp; Description</label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl outline-none focus:border-[#EAB308] text-xs text-white placeholder-[#71717A]"
                      placeholder="Craftsmanship details, spiritual significance, and luxury acrylic finish description..."
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#D1D5DB] block mb-1">Search Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl outline-none focus:border-[#EAB308] text-xs font-mono text-white placeholder-[#71717A]"
                      placeholder="e.g. Balaji, Tirupati, LED Art, Pooja Room"
                    />
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end gap-3 pt-5 border-t border-[#2D2D2D]">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2.5 border border-[#333333] rounded-xl text-[#D1D5DB] hover:bg-[#1E1E1E] hover:text-white font-medium transition-colors cursor-pointer text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 bg-[#EAB308] hover:bg-[#FACC15] disabled:opacity-50 text-black rounded-xl font-extrabold transition-all shadow-[0_2px_12px_rgba(234,179,8,0.25)] cursor-pointer flex items-center gap-1.5 text-xs"
                  >
                    {saving ? 'Saving Changes...' : editingSlug ? 'Update Artwork & Sizes' : 'Save New Masterpiece'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
