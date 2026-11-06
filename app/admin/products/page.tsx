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
  Ruler,
  CheckCircle2,
  Tag,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Product, ProductOrientation, OrientationShape } from '@/types';
import { INITIAL_CATEGORIES } from '@/lib/data/categories';

const POPULAR_FRAME_SIZES = [
  { size: '8 x 12 inches', dimensionsCm: '20 x 30 cm', label: '8x12"' },
  { size: '10 x 15 inches', dimensionsCm: '25 x 38 cm', label: '10x15"' },
  { size: '12 x 18 inches', dimensionsCm: '30 x 45 cm', label: '12x18"' },
  { size: '16 x 20 inches', dimensionsCm: '40 x 50 cm', label: '16x20"' },
  { size: '16 x 24 inches', dimensionsCm: '40 x 60 cm', label: '16x24"' },
  { size: '18 x 24 inches', dimensionsCm: '45 x 60 cm', label: '18x24"' },
  { size: '20 x 30 inches', dimensionsCm: '50 x 75 cm', label: '20x30"' },
  { size: '24 x 36 inches', dimensionsCm: '60 x 90 cm', label: '24x36"' },
  { size: '30 x 48 inches (Grand Wall Size)', dimensionsCm: '75 x 120 cm', label: '30x48"' },
  { size: '36 x 48 inches (Palace Size)', dimensionsCm: '90 x 120 cm', label: '36x48"' },
];

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

  // Quick Add Size Option state (accessible directly from any product row in the table)
  const [quickSizeProduct, setQuickSizeProduct] = useState<Product | null>(null);
  const [quickSizeName, setQuickSizeName] = useState('');
  const [quickSizeCm, setQuickSizeCm] = useState('');
  const [quickSizePrice, setQuickSizePrice] = useState(2499);
  const [quickSizeMrp, setQuickSizeMrp] = useState(4999);
  const [quickSizeStock, setQuickSizeStock] = useState(25);
  const [quickSizeSaving, setQuickSizeSaving] = useState(false);
  const [quickSizeSuccess, setQuickSizeSuccess] = useState('');

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

  // Dynamically add a new size option to the current product
  const handleAddSizeOption = (prefill?: { size: string; dimensionsCm: string }) => {
    const currentCount = formData.variants.length;
    const baseP = formData.basePrice || 2499;
    const baseM = formData.baseMrp || 4999;
    const multiplier = 1 + currentCount * 0.35;
    const suggestedPrice = Math.max(999, Math.round((baseP * multiplier) / 100) * 100 - 1);
    const suggestedMrp = Math.max(1999, Math.round((baseM * multiplier) / 100) * 100 - 1);

    const newVariant: AdminFormVariant = {
      id: `size-${Date.now()}-${currentCount + 1}`,
      size: prefill?.size || '',
      dimensionsCm: prefill?.dimensionsCm || '',
      price: suggestedPrice,
      mrp: suggestedMrp,
      inStock: true,
      stockCount: 25,
    };

    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, newVariant],
    }));
  };

  // Remove a specific size option from the product
  const handleRemoveSizeOption = (index: number) => {
    if (formData.variants.length <= 1) {
      alert('Every product must have at least one size option.');
      return;
    }
    setFormData((prev) => {
      const updated = prev.variants.filter((_, i) => i !== index);
      return {
        ...prev,
        variants: updated,
        basePrice: updated[0]?.price || prev.basePrice,
        baseMrp: updated[0]?.mrp || prev.baseMrp,
      };
    });
  };

  // Open the Quick Add Size Option modal for a specific product directly from the table
  const handleOpenQuickAddSize = (prod: Product) => {
    setQuickSizeProduct(prod);
    setQuickSizeName('');
    setQuickSizeCm('');
    const baseP = prod.basePrice || 2499;
    const baseM = prod.baseMrp || 4999;
    const currentCount = prod.variants?.length || 4;
    const multiplier = 1 + currentCount * 0.35;
    setQuickSizePrice(Math.round((baseP * multiplier) / 100) * 100 - 1);
    setQuickSizeMrp(Math.round((baseM * multiplier) / 100) * 100 - 1);
    setQuickSizeStock(25);
    setQuickSizeSuccess('');
  };

  // Save the new size directly to the product in DB and memory
  const handleSaveQuickSize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickSizeProduct || !quickSizeName.trim()) return;

    setQuickSizeSaving(true);
    setQuickSizeSuccess('');

    try {
      const existing = quickSizeProduct.variants || [];
      const newVar = {
        id: `var-${Date.now()}`,
        size: quickSizeName.trim(),
        dimensionsCm: quickSizeCm.trim() || 'Custom cm',
        finish: 'Acrylic Ultra-Gloss' as const,
        lighting: quickSizeProduct.hasLedBacklight
          ? ('LED Backlit (12V Adapter)' as const)
          : ('No Lighting (Pure Art)' as const),
        price: Number(quickSizePrice),
        mrp: Number(quickSizeMrp),
        sku: `AG-${quickSizeProduct.slug.substring(0, 6).toUpperCase()}-${existing.length + 1}`,
        inStock: true,
        stockCount: Number(quickSizeStock) || 25,
      };

      const updatedVariants = [...existing, newVar];

      const res = await fetch(`/api/products/${quickSizeProduct.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          variants: updatedVariants,
          orientationVariants: {
            portrait: updatedVariants,
            landscape: updatedVariants,
            square: updatedVariants,
          },
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setQuickSizeSuccess(`Added size "${quickSizeName}" successfully!`);
        setTimeout(() => {
          setQuickSizeProduct(null);
          fetchProducts();
        }, 1100);
      } else {
        alert(data.error || 'Failed to add size option.');
      }
    } catch {
      alert('Failed to add size option. Please try again.');
    } finally {
      setQuickSizeSaving(false);
    }
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
          ? ('LED Backlit (12V Adapter)' as const)
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
              ? 'Epistar Ambient Glow LED Perimeter (12V Safe)'
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200 p-5 sm:p-6 rounded-3xl shadow-sm text-stone-900">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 font-bold text-[10px] tracking-wider uppercase flex items-center gap-1 shadow-2xs">
                <Sparkles className="w-3 h-3 text-amber-700" />
                Catalog Operations
              </span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
              Artwork Catalog &amp; Inventory Management
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Manage luxury acrylic artworks, sizes, pricing, and live inventory status across all collections.
            </p>
          </div>

          <button
            onClick={() => {
              setEditingSlug(null);
              setFormData(initialForm);
              setModalOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-[#EAB308] hover:bg-[#FACC15] text-black px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all shadow-sm hover:scale-[1.02] self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Masterpiece</span>
          </button>
        </div>

        {/* Toolbar & Filters (Orientation Filter Removed) */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, slug, or deity..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-amber-500 text-xs text-stone-900 placeholder-stone-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl outline-none text-xs text-stone-900"
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
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-xs text-stone-500">Loading catalog...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-12 text-center text-xs text-stone-500">No artworks match your criteria.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="bg-stone-100 border-b border-stone-200 text-stone-700 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Artwork</th>
                    <th className="py-3 px-4">Configured Sizes &amp; Pricing</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Lighting</th>
                    <th className="py-3 px-4 text-center">Total Stock</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredProducts.map((prod) => {
                    const primaryVariants =
                      prod.variants && prod.variants.length > 0
                        ? prod.variants
                        : getDefault4Variants(prod.basePrice, prod.baseMrp);

                    const totalStock = primaryVariants.reduce((acc, v) => acc + (v.stockCount || 0), 0);

                    return (
                      <tr key={prod.id} className="hover:bg-stone-50 transition-colors">
                        {/* Artwork column */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.images[0]}
                              alt={prod.title}
                              className="w-12 h-12 object-cover rounded-xl border border-stone-200 shrink-0 shadow-2xs"
                            />
                            <div className="min-w-0">
                              <p className="font-bold text-stone-900 truncate max-w-xs">{prod.title}</p>
                              <p className="text-[11px] text-stone-500 font-mono truncate">{prod.slug}</p>
                            </div>
                          </div>
                        </td>

                        {/* All Sizes & Prices Pills column with Quick Add Size button */}
                        <td className="py-3 px-4">
                          <div className="flex flex-col gap-1.5 max-w-md">
                            <div className="flex flex-wrap gap-1.5">
                              {primaryVariants.map((v, i) => (
                                <div
                                  key={i}
                                  className="px-2 py-1 bg-stone-50 border border-stone-200 rounded-lg text-[10.5px] flex items-center gap-1.5"
                                >
                                  <span className="text-stone-700 font-medium truncate max-w-[120px]" title={v.size}>
                                    {v.size.replace(' inches', '"').replace(' (Grand Wall Size)', ' Grand').replace(' (Grand Sanctum)', '')}
                                  </span>
                                  <span className="font-bold font-serif text-amber-800 shrink-0">
                                    ₹{v.price.toLocaleString('en-IN')}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <div>
                              <button
                                type="button"
                                onClick={() => handleOpenQuickAddSize(prod)}
                                className="inline-flex items-center gap-1 text-[10.5px] font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-md transition-colors cursor-pointer shadow-2xs"
                                title="Quickly add a new size option to this product"
                              >
                                <Plus className="w-3 h-3 text-amber-700" />
                                <span>+ Add Size Option</span>
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3 px-4 text-stone-700 font-medium">
                          <span className="text-xs">{prod.categoryName}</span>
                        </td>

                        {/* Lighting Type */}
                        <td className="py-3 px-4">
                          {prod.hasLedBacklight ? (
                            <span className="bg-amber-50 text-amber-800 border border-amber-300 font-bold px-2 py-0.5 rounded text-[10px] whitespace-nowrap shadow-2xs">
                              ✨ Ambient LED
                            </span>
                          ) : (
                            <span className="bg-stone-100 text-stone-600 border border-stone-200 px-2 py-0.5 rounded text-[10px] whitespace-nowrap">
                              Pure Acrylic
                            </span>
                          )}
                        </td>

                        {/* Stock */}
                        <td className="py-3 px-4 text-center">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[11px] font-bold shadow-2xs">
                            {totalStock} in stock
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenQuickAddSize(prod)}
                              className="px-2 py-1 text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                              title="Add Size Option"
                            >
                              <Plus className="w-3.5 h-3.5 text-amber-700" />
                              <span>+ Size</span>
                            </button>
                            <Link
                              href={`/product/${prod.slug}`}
                              target="_blank"
                              className="p-1.5 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
                              title="View on Storefront"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleEditProduct(prod)}
                              className="px-2.5 py-1 text-xs font-semibold bg-[#EAB308] hover:bg-[#FACC15] text-black rounded-lg flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                              title="Edit Artwork & Sizes"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(prod.slug)}
                              className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
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

        {/* Modal: Add / Edit Product (Light Theme with White Background) */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-7 shadow-2xl border border-stone-200 my-8 max-h-[92vh] overflow-y-auto text-stone-900">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-5">
                <div>
                  <h3 className="font-serif font-bold text-xl text-stone-900">
                    {editingSlug ? 'Edit Artwork & Pricing' : 'Add New Masterpiece'}
                  </h3>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Configure title, category, 4 standard sizes, selling prices, and inventory stock.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-6 text-xs">
                {/* 1. Basic Details */}
                <div className="space-y-3">
                  <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-xs flex items-center justify-center font-bold">1</span>
                    Artwork Information
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-stone-800 block mb-1">Title *</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-xs text-stone-900 placeholder-stone-400"
                        placeholder="e.g. Tirupati Balaji Divine Blessings"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-stone-800 block mb-1">URL Slug *</label>
                      <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl outline-none font-mono text-xs text-stone-900 placeholder-stone-400"
                        placeholder="e.g. tirupati-balaji-divine-blessings"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-stone-800 block mb-1">Primary Category *</label>
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
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl outline-none text-xs text-stone-900"
                      >
                        {INITIAL_CATEGORIES.map((c) => (
                          <option key={c.id} value={c.slug} className="bg-white text-stone-900">
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-stone-800 block mb-1">Artwork Image URL *</label>
                      <input
                        type="text"
                        required
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl outline-none font-mono text-[11px] text-stone-900 placeholder-stone-400"
                        placeholder="/images/products/..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-stone-800 block mb-1">Art Style / Finish</label>
                    <input
                      type="text"
                      value={formData.artStyle}
                      onChange={(e) => setFormData({ ...formData, artStyle: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl outline-none text-xs text-stone-900 placeholder-stone-400"
                      placeholder="e.g. High-Definition Cast Acrylic"
                    />
                  </div>
                </div>

                {/* 2. Sizes & Dynamic Pricing Engine */}
                <div className="space-y-4 pt-5 border-t border-stone-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-xs flex items-center justify-center font-bold">2</span>
                        <span>Artwork Sizes &amp; Individual Pricing (₹)</span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-900 border border-amber-300">
                          {formData.variants.length} {formData.variants.length === 1 ? 'Size' : 'Sizes'}
                        </span>
                      </h4>
                      <p className="text-[11px] text-stone-600">
                        Configure dimensions, selling price (₹), MRP (₹), and stock for each size option. Add as many sizes as needed.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleAddSizeOption()}
                        className="px-3 py-1.5 rounded-xl border border-amber-500 bg-[#EAB308] hover:bg-[#FACC15] text-stone-950 text-[11px] font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                        title="Add a new custom size option"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>+ Add Size Option</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleAutofillStandardSizes}
                        className="px-2.5 py-1.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 text-[11px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Reset dimensions to standard 4 default sizes"
                      >
                        <RotateCw className="w-3 h-3 text-stone-500" />
                        <span>Reset 4 Sizes</span>
                      </button>
                    </div>
                  </div>

                  {/* Popular Size Quick Add Presets */}
                  <div className="p-3 bg-amber-50/70 border border-amber-200/90 rounded-2xl">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Ruler className="w-3.5 h-3.5 text-amber-800" />
                      <span className="text-xs font-bold text-amber-950">Quick Add Popular Sizes:</span>
                      <span className="text-[10px] text-amber-800 font-medium">(click to append directly)</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {POPULAR_FRAME_SIZES.map((preset) => (
                        <button
                          key={preset.size}
                          type="button"
                          onClick={() => handleAddSizeOption(preset)}
                          className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 hover:border-amber-500 text-amber-950 text-[11px] font-semibold hover:bg-amber-400 hover:text-black transition-all cursor-pointer shadow-2xs flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3 text-amber-700" />
                          <span>{preset.size}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {formData.variants.map((v, i) => {
                      return (
                        <div
                          key={v.id || i}
                          className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 relative hover:border-amber-400 transition-colors shadow-xs"
                        >
                          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                            <span className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                              <span className="w-4 h-4 rounded-full bg-[#EAB308] text-stone-950 text-[10px] flex items-center justify-center font-bold">
                                {i + 1}
                              </span>
                              <span>Size Option {i + 1}</span>
                              {v.size && (
                                <span className="font-mono text-[10.5px] text-stone-600 bg-white px-1.5 py-0.5 rounded border border-stone-200">
                                  {v.size}
                                </span>
                              )}
                            </span>
                            <div className="flex items-center gap-2">
                              <label className="flex items-center gap-1.5 cursor-pointer text-[11px]">
                                <input
                                  type="checkbox"
                                  checked={v.inStock}
                                  onChange={(e) => handleVariantChange(i, 'inStock', e.target.checked)}
                                  className="rounded text-amber-600 accent-amber-500"
                                />
                                <span className={v.inStock ? 'text-emerald-700 font-bold' : 'text-stone-400'}>
                                  {v.inStock ? 'In Stock' : 'Out'}
                                </span>
                              </label>
                              {formData.variants.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveSizeOption(i)}
                                  className="p-1 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                  title="Remove this size option"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                                Size Dimensions *
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="e.g. 12 x 18 inches"
                                value={v.size}
                                onChange={(e) => handleVariantChange(i, 'size', e.target.value)}
                                className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-medium text-stone-900 focus:border-amber-500"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                                Dimensions (cm)
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. 30 x 45 cm"
                                value={v.dimensionsCm}
                                onChange={(e) => handleVariantChange(i, 'dimensionsCm', e.target.value)}
                                className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:border-amber-500"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <label className="text-[11px] font-semibold text-amber-800 block mb-1">
                                Selling Price (₹) *
                              </label>
                              <input
                                type="number"
                                required
                                value={v.price}
                                onChange={(e) => handleVariantChange(i, 'price', Number(e.target.value))}
                                className="w-full px-2.5 py-1.5 bg-white border border-amber-300 rounded-lg text-xs font-bold text-amber-900 focus:border-amber-500"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                                MRP (₹) *
                              </label>
                              <input
                                type="number"
                                required
                                value={v.mrp}
                                onChange={(e) => handleVariantChange(i, 'mrp', Number(e.target.value))}
                                className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-700 focus:border-amber-500"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                                Stock Count
                              </label>
                              <input
                                type="number"
                                value={v.stockCount}
                                onChange={(e) => handleVariantChange(i, 'stockCount', Number(e.target.value))}
                                className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:border-amber-500"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Add Another Size Option dashed button */}
                  <button
                    type="button"
                    onClick={() => handleAddSizeOption()}
                    className="w-full py-3 rounded-2xl border-2 border-dashed border-amber-300 hover:border-amber-500 bg-amber-50/50 hover:bg-amber-100/70 text-amber-950 font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-4 h-4 text-amber-800" />
                    <span>+ Add Another Size Option to this Product</span>
                  </button>
                </div>

                {/* 3. Options & Badges */}
                <div className="space-y-3 pt-5 border-t border-stone-200">
                  <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-xs flex items-center justify-center font-bold">3</span>
                    Lighting &amp; Storefront Badges
                  </h4>

                  <div className="flex flex-wrap items-center gap-6 p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-800">
                      <input
                        type="checkbox"
                        checked={formData.hasLedBacklight}
                        onChange={(e) => setFormData({ ...formData, hasLedBacklight: e.target.checked })}
                        className="rounded text-amber-600 accent-amber-500"
                      />
                      <span className="font-semibold text-stone-900">LED Backlight</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-800">
                      <input
                        type="checkbox"
                        checked={formData.isFeatured}
                        onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                        className="rounded text-amber-600 accent-amber-500"
                      />
                      <span className="font-semibold text-stone-900">Featured Atelier Piece</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-800">
                      <input
                        type="checkbox"
                        checked={formData.isBestseller}
                        onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
                        className="rounded text-amber-600 accent-amber-500"
                      />
                      <span className="font-semibold text-stone-900">Bestseller Badge</span>
                    </label>
                  </div>
                </div>

                {/* 4. Descriptions & Search Tags */}
                <div className="space-y-3 pt-5 border-t border-stone-200">
                  <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-xs flex items-center justify-center font-bold">4</span>
                    Descriptions &amp; Search Tags
                  </h4>

                  <div>
                    <label className="font-semibold text-stone-800 block mb-1">Short Description</label>
                    <input
                      type="text"
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-xs text-stone-900 placeholder-stone-400"
                      placeholder="Concise devotional summary for collection cards..."
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-800 block mb-1">Detailed Story &amp; Description</label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-xs text-stone-900 placeholder-stone-400"
                      placeholder="Craftsmanship details, spiritual significance, and luxury acrylic finish description..."
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-800 block mb-1">Search Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-xs font-mono text-stone-900 placeholder-stone-400"
                      placeholder="e.g. Balaji, Tirupati, LED Art, Pooja Room"
                    />
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end gap-3 pt-5 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2.5 border border-stone-300 rounded-xl text-stone-700 hover:bg-stone-100 hover:text-stone-900 font-medium transition-colors cursor-pointer text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 bg-[#EAB308] hover:bg-[#FACC15] disabled:opacity-50 text-stone-950 rounded-xl font-extrabold transition-all shadow-md cursor-pointer flex items-center gap-1.5 text-xs border border-amber-500 uppercase tracking-wider"
                  >
                    {saving ? 'Saving Changes...' : editingSlug ? 'Update Artwork & Sizes' : 'Save New Masterpiece'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Quick Add Size Option Modal */}
        {quickSizeProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 my-8 text-stone-900">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Ruler className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-stone-900">
                      Add Size Option
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      Add a custom or preset size to this product
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setQuickSizeProduct(null)}
                  className="p-1.5 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Product Info Preview */}
              <div className="flex items-center gap-3 p-2.5 bg-stone-50 rounded-2xl border border-stone-200 mb-4">
                <img
                  src={quickSizeProduct.images[0]}
                  alt={quickSizeProduct.title}
                  className="w-12 h-12 rounded-xl object-cover border border-stone-200 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="font-bold text-xs text-stone-900 truncate">{quickSizeProduct.title}</h4>
                  <p className="text-[11px] text-stone-500">
                    Currently has <span className="font-semibold text-amber-800">{quickSizeProduct.variants?.length || 4}</span> configured sizes
                  </p>
                </div>
              </div>

              {/* Success Banner */}
              {quickSizeSuccess && (
                <div className="p-3 mb-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>{quickSizeSuccess}</span>
                </div>
              )}

              {/* Quick Preset Selector */}
              <div className="mb-4">
                <label className="text-[11px] font-bold text-stone-700 block mb-1.5">
                  Select Popular Preset (or type custom below):
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_FRAME_SIZES.map((preset) => {
                    const isSelected = quickSizeName === preset.size;
                    return (
                      <button
                        key={preset.size}
                        type="button"
                        onClick={() => {
                          setQuickSizeName(preset.size);
                          setQuickSizeCm(preset.dimensionsCm);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#EAB308] border-amber-600 text-stone-950 font-bold shadow-xs'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-900'
                        }`}
                      >
                        {preset.size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSaveQuickSize} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                      Size Dimensions (inches) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 14 x 20 inches"
                      value={quickSizeName}
                      onChange={(e) => setQuickSizeName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-medium text-stone-900 focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                      Dimensions (cm)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 35 x 50 cm"
                      value={quickSizeCm}
                      onChange={(e) => setQuickSizeCm(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <label className="text-[11px] font-semibold text-amber-900 block mb-1">
                      Selling Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={quickSizePrice}
                      onChange={(e) => setQuickSizePrice(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-amber-300 rounded-xl text-xs font-bold text-amber-900 focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                      MRP (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={quickSizeMrp}
                      onChange={(e) => setQuickSizeMrp(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-700 focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                      Stock Count
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={quickSizeStock}
                      onChange={(e) => setQuickSizeStock(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setQuickSizeProduct(null)}
                    className="px-4 py-2 border border-stone-300 rounded-xl text-stone-700 hover:bg-stone-100 text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={quickSizeSaving || !quickSizeName.trim()}
                    className="px-5 py-2 bg-[#EAB308] hover:bg-[#FACC15] disabled:opacity-50 text-stone-950 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer border border-amber-500"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{quickSizeSaving ? 'Saving Size...' : 'Save Size Option'}</span>
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
