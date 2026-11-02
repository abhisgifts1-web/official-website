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
  Copy,
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

interface OrientationVariantsState {
  portrait: AdminFormVariant[];
  landscape: AdminFormVariant[];
  square: AdminFormVariant[];
  round: AdminFormVariant[];
}

const getDefault4Variants = (
  orientation: string,
  basePrice: number = 2499,
  baseMrp: number = 4999
): AdminFormVariant[] => {
  if (orientation === 'square') {
    const p1 = basePrice || 2499;
    const m1 = baseMrp || 4999;
    return [
      { id: 'size-sq-1', size: '12 x 12 inches', dimensionsCm: '30 x 30 cm', price: p1, mrp: m1, inStock: true, stockCount: 40 },
      { id: 'size-sq-2', size: '18 x 18 inches', dimensionsCm: '45 x 45 cm', price: Math.round(p1 * 1.4), mrp: Math.round(m1 * 1.35), inStock: true, stockCount: 50 },
      { id: 'size-sq-3', size: '24 x 24 inches', dimensionsCm: '60 x 60 cm', price: Math.round(p1 * 2.0), mrp: Math.round(m1 * 1.9), inStock: true, stockCount: 25 },
      { id: 'size-sq-4', size: '30 x 30 inches (Grand Sanctum)', dimensionsCm: '75 x 75 cm', price: Math.round(p1 * 3.0), mrp: Math.round(m1 * 2.8), inStock: true, stockCount: 15 },
    ];
  }
  if (orientation === 'round') {
    const p1 = basePrice || 2699;
    const m1 = baseMrp || 5299;
    return [
      { id: 'size-rd-1', size: '12" Dia Circular', dimensionsCm: '30 cm Diameter', price: p1, mrp: m1, inStock: true, stockCount: 35 },
      { id: 'size-rd-2', size: '18" Dia Circular', dimensionsCm: '45 cm Diameter', price: Math.round(p1 * 1.4), mrp: Math.round(m1 * 1.35), inStock: true, stockCount: 45 },
      { id: 'size-rd-3', size: '20" Dia Circular', dimensionsCm: '50 cm Diameter', price: Math.round(p1 * 1.95), mrp: Math.round(m1 * 1.85), inStock: true, stockCount: 20 },
      { id: 'size-rd-4', size: '24" Dia Circular Halo', dimensionsCm: '60 cm Diameter', price: Math.round(p1 * 2.9), mrp: Math.round(m1 * 2.7), inStock: true, stockCount: 10 },
    ];
  }
  if (orientation === 'horizontal' || orientation === 'landscape') {
    const p1 = basePrice || 2499;
    const m1 = baseMrp || 4999;
    return [
      { id: 'size-ls-1', size: '18 x 12 inches', dimensionsCm: '45 x 30 cm', price: p1, mrp: m1, inStock: true, stockCount: 45 },
      { id: 'size-ls-2', size: '24 x 18 inches', dimensionsCm: '60 x 45 cm', price: Math.round(p1 * 1.38), mrp: Math.round(m1 * 1.36), inStock: true, stockCount: 60 },
      { id: 'size-ls-3', size: '36 x 24 inches', dimensionsCm: '90 x 60 cm', price: Math.round(p1 * 2.07), mrp: Math.round(m1 * 2.0), inStock: true, stockCount: 30 },
      { id: 'size-ls-4', size: '48 x 30 inches (Grand Wall Size)', dimensionsCm: '120 x 75 cm', price: Math.round(p1 * 3.1), mrp: Math.round(m1 * 3.0), inStock: true, stockCount: 15 },
    ];
  }

  // Default: vertical / portrait
  const p1 = basePrice || 2499;
  const m1 = baseMrp || 4999;
  return [
    { id: 'size-pt-1', size: '12 x 18 inches', dimensionsCm: '30 x 45 cm', price: p1, mrp: m1, inStock: true, stockCount: 45 },
    { id: 'size-pt-2', size: '18 x 24 inches', dimensionsCm: '45 x 60 cm', price: Math.round(p1 * 1.38), mrp: Math.round(m1 * 1.36), inStock: true, stockCount: 60 },
    { id: 'size-pt-3', size: '24 x 36 inches', dimensionsCm: '60 x 90 cm', price: Math.round(p1 * 2.07), mrp: Math.round(m1 * 2.0), inStock: true, stockCount: 30 },
    { id: 'size-pt-4', size: '30 x 48 inches (Grand Wall Size)', dimensionsCm: '75 x 120 cm', price: Math.round(p1 * 3.1), mrp: Math.round(m1 * 3.0), inStock: true, stockCount: 15 },
  ];
};

const getInitial4Orientations = (
  basePrice: number = 2499,
  baseMrp: number = 4999
): OrientationVariantsState => ({
  portrait: getDefault4Variants('vertical', basePrice, baseMrp),
  landscape: getDefault4Variants('horizontal', basePrice, baseMrp),
  square: getDefault4Variants('square', basePrice, baseMrp),
  round: getDefault4Variants('round', basePrice, baseMrp),
});

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [selectedOrientationFilter, setSelectedOrientationFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeOrientationTab, setActiveOrientationTab] = useState<OrientationShape>('portrait');

  // Form state with all 4 orientations and individual size pricing
  const initialForm = {
    title: '',
    slug: '',
    categorySlug: 'lord-venkateswara-balaji',
    categoryName: 'Lord Venkateswara (Balaji)',
    categorySlugs: ['lord-venkateswara-balaji'] as string[],
    artStyle: 'LED Backlit Acrylic',
    orientation: 'vertical' as ProductOrientation,
    shape: 'portrait' as OrientationShape,
    basePrice: 2499,
    baseMrp: 4999,
    hasLedBacklight: true,
    isFeatured: true,
    isBestseller: false,
    shortDescription: '',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    tags: 'Balaji, Tirupati, LED Art',
    variants: getDefault4Variants('vertical', 2499, 4999),
    orientationVariants: getInitial4Orientations(2499, 4999),
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
  }, []);

  const handleEditProduct = (prod: Product) => {
    setEditingSlug(prod.slug);

    const orientation = (prod.orientation || 'vertical') as ProductOrientation;
    const baseP = prod.basePrice || 2499;
    const baseM = prod.baseMrp || 4999;
    const primaryShape: OrientationShape =
      prod.shape === 'landscape' || orientation === 'horizontal'
        ? 'landscape'
        : prod.shape === 'square' || orientation === 'square'
        ? 'square'
        : prod.shape === 'round' || orientation === 'round'
        ? 'round'
        : 'portrait';

    const ov = prod.orientationVariants || {};

    const orientationVariants: OrientationVariantsState = {
      portrait:
        ov.portrait && ov.portrait.length === 4
          ? ov.portrait.map((v, i) => ({
              id: v.id || `var-portrait-${i + 1}`,
              size: v.size,
              dimensionsCm: v.dimensionsCm,
              price: v.price,
              mrp: v.mrp,
              inStock: v.inStock !== false,
              stockCount: v.stockCount || 25,
            }))
          : primaryShape === 'portrait' && prod.variants && prod.variants.length === 4
          ? prod.variants.map((v, i) => ({
              id: v.id || `var-portrait-${i + 1}`,
              size: v.size,
              dimensionsCm: v.dimensionsCm,
              price: v.price,
              mrp: v.mrp,
              inStock: v.inStock !== false,
              stockCount: v.stockCount || 25,
            }))
          : getDefault4Variants('vertical', baseP, baseM),

      landscape:
        ov.landscape && ov.landscape.length === 4
          ? ov.landscape.map((v, i) => ({
              id: v.id || `var-landscape-${i + 1}`,
              size: v.size,
              dimensionsCm: v.dimensionsCm,
              price: v.price,
              mrp: v.mrp,
              inStock: v.inStock !== false,
              stockCount: v.stockCount || 25,
            }))
          : primaryShape === 'landscape' && prod.variants && prod.variants.length === 4
          ? prod.variants.map((v, i) => ({
              id: v.id || `var-landscape-${i + 1}`,
              size: v.size,
              dimensionsCm: v.dimensionsCm,
              price: v.price,
              mrp: v.mrp,
              inStock: v.inStock !== false,
              stockCount: v.stockCount || 25,
            }))
          : getDefault4Variants('horizontal', baseP, baseM),

      square:
        ov.square && ov.square.length === 4
          ? ov.square.map((v, i) => ({
              id: v.id || `var-square-${i + 1}`,
              size: v.size,
              dimensionsCm: v.dimensionsCm,
              price: v.price,
              mrp: v.mrp,
              inStock: v.inStock !== false,
              stockCount: v.stockCount || 25,
            }))
          : primaryShape === 'square' && prod.variants && prod.variants.length === 4
          ? prod.variants.map((v, i) => ({
              id: v.id || `var-square-${i + 1}`,
              size: v.size,
              dimensionsCm: v.dimensionsCm,
              price: v.price,
              mrp: v.mrp,
              inStock: v.inStock !== false,
              stockCount: v.stockCount || 25,
            }))
          : getDefault4Variants('square', baseP, baseM),

      round:
        ov.round && ov.round.length === 4
          ? ov.round.map((v, i) => ({
              id: v.id || `var-round-${i + 1}`,
              size: v.size,
              dimensionsCm: v.dimensionsCm,
              price: v.price,
              mrp: v.mrp,
              inStock: v.inStock !== false,
              stockCount: v.stockCount || 25,
            }))
          : primaryShape === 'round' && prod.variants && prod.variants.length === 4
          ? prod.variants.map((v, i) => ({
              id: v.id || `var-round-${i + 1}`,
              size: v.size,
              dimensionsCm: v.dimensionsCm,
              price: v.price,
              mrp: v.mrp,
              inStock: v.inStock !== false,
              stockCount: v.stockCount || 25,
            }))
          : getDefault4Variants('round', baseP, baseM),
    };

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
      shape: primaryShape,
      basePrice: prod.basePrice,
      baseMrp: prod.baseMrp,
      hasLedBacklight: Boolean(prod.hasLedBacklight),
      isFeatured: Boolean(prod.isFeatured),
      isBestseller: Boolean(prod.isBestseller),
      shortDescription: prod.shortDescription || '',
      description: prod.description || '',
      imageUrl: prod.images[0] || '',
      tags: prod.tags.join(', '),
      variants: orientationVariants[primaryShape],
      orientationVariants,
    });

    setActiveOrientationTab(primaryShape);
    setModalOpen(true);
  };

  // Change primary orientation
  const handlePrimaryOrientationChange = (newOrientation: ProductOrientation) => {
    const newShape: OrientationShape =
      newOrientation === 'vertical'
        ? 'portrait'
        : newOrientation === 'horizontal'
        ? 'landscape'
        : (newOrientation as OrientationShape);

    setFormData((prev) => ({
      ...prev,
      orientation: newOrientation,
      shape: newShape,
      variants: prev.orientationVariants[newShape] || prev.variants,
    }));

    // Auto-focus the active orientation tab on the primary shape
    setActiveOrientationTab(newShape);
  };

  // Update a single variant field inside a specific orientation tab
  const handleVariantChange = (
    tab: OrientationShape,
    index: number,
    field: keyof AdminFormVariant,
    value: string | number | boolean
  ) => {
    setFormData((prev) => {
      const currentTabList = [...prev.orientationVariants[tab]];
      currentTabList[index] = {
        ...currentTabList[index],
        [field]: value,
      };

      const newOv: OrientationVariantsState = {
        ...prev.orientationVariants,
        [tab]: currentTabList,
      };

      const primaryKey = prev.shape as OrientationShape;
      let baseP = prev.basePrice;
      let baseM = prev.baseMrp;

      if (tab === primaryKey && index === 0) {
        if (field === 'price') baseP = Number(value);
        if (field === 'mrp') baseM = Number(value);
      }

      return {
        ...prev,
        orientationVariants: newOv,
        variants: newOv[primaryKey] || currentTabList,
        basePrice: baseP,
        baseMrp: baseM,
      };
    });
  };

  // Auto-fill standard 4 sizes for the currently selected orientation tab
  const handleAutofillForActiveOrientation = () => {
    const defaultDims = getDefault4Variants(
      activeOrientationTab === 'portrait'
        ? 'vertical'
        : activeOrientationTab === 'landscape'
        ? 'horizontal'
        : activeOrientationTab,
      formData.basePrice,
      formData.baseMrp
    );

    setFormData((prev) => {
      const currentList = prev.orientationVariants[activeOrientationTab];
      const updated = defaultDims.map((d, i) => ({
        ...d,
        price: currentList[i]?.price || d.price,
        mrp: currentList[i]?.mrp || d.mrp,
        inStock: currentList[i]?.inStock ?? true,
        stockCount: currentList[i]?.stockCount ?? d.stockCount,
      }));

      const newOv = {
        ...prev.orientationVariants,
        [activeOrientationTab]: updated,
      };

      return {
        ...prev,
        orientationVariants: newOv,
        variants: newOv[prev.shape as OrientationShape] || updated,
      };
    });
  };

  // Helper: Copy the 4 prices & MRPs from the active orientation tab across all 4 orientations
  const handleCopyPricesToAll = () => {
    const activePrices = formData.orientationVariants[activeOrientationTab].map((v) => ({
      price: Number(v.price),
      mrp: Number(v.mrp),
      inStock: Boolean(v.inStock),
      stockCount: Number(v.stockCount),
    }));

    setFormData((prev) => {
      const newOv: OrientationVariantsState = {
        portrait: prev.orientationVariants.portrait.map((v, i) => ({ ...v, ...activePrices[i] })),
        landscape: prev.orientationVariants.landscape.map((v, i) => ({ ...v, ...activePrices[i] })),
        square: prev.orientationVariants.square.map((v, i) => ({ ...v, ...activePrices[i] })),
        round: prev.orientationVariants.round.map((v, i) => ({ ...v, ...activePrices[i] })),
      };

      return {
        ...prev,
        orientationVariants: newOv,
        variants: newOv[prev.shape as OrientationShape],
      };
    });
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const categoryObj = INITIAL_CATEGORIES.find((c) => c.slug === formData.categorySlug);

      // Map all 4 orientations into ProductVariant shape
      const formatVariants = (list: AdminFormVariant[], shapeKey: string) =>
        list.map((v, idx) => ({
          id: v.id || `var-${shapeKey}-${idx + 1}`,
          size: v.size.trim(),
          dimensionsCm: v.dimensionsCm.trim(),
          finish: 'Acrylic Ultra-Gloss' as const,
          lighting: formData.hasLedBacklight
            ? ('Warm LED Backlit (12V Adapter)' as const)
            : ('No Lighting (Pure Art)' as const),
          price: Number(v.price),
          mrp: Number(v.mrp),
          sku: `AG-${formData.slug.substring(0, 6).toUpperCase()}-${shapeKey.substring(0, 2).toUpperCase()}-${idx + 1}`,
          inStock: Boolean(v.inStock),
          stockCount: Number(v.stockCount) || 20,
        }));

      const fullOrientationVariants = {
        portrait: formatVariants(formData.orientationVariants.portrait, 'portrait'),
        landscape: formatVariants(formData.orientationVariants.landscape, 'landscape'),
        square: formatVariants(formData.orientationVariants.square, 'square'),
        round: formatVariants(formData.orientationVariants.round, 'round'),
      };

      const primaryVariants =
        fullOrientationVariants[formData.shape as OrientationShape] ||
        fullOrientationVariants.portrait;
      const primaryBasePrice = primaryVariants[0]?.price || Number(formData.basePrice);
      const primaryBaseMrp = primaryVariants[0]?.mrp || Number(formData.baseMrp);

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
        variants: primaryVariants,
        orientationVariants: fullOrientationVariants,
        specifications: [
          { label: 'Art Material', value: '4mm Pure Crystal Cast Acrylic with CNC Beveled Edges' },
          {
            label: 'Lighting Technology',
            value: formData.hasLedBacklight
              ? '3000K Epistar Warm Glow LED Perimeter (12V Safe)'
              : 'Non-Lit Museum Art',
          },
          { label: 'Shape & Ratio', value: `${formData.shape.toUpperCase()} (${formData.orientation})` },
        ],
        materialAndCare: [
          'Clean gently with dry microfiber cloth',
          'Keep away from abrasive chemical cleaners',
        ],
        shippingHighlights: [
          '100% Transit Safe Guarantee',
          'Free replacement if damaged in courier transit',
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

    const matchesCat = selectedCat ? p.categorySlug === selectedCat : true;

    const matchesOrientation = selectedOrientationFilter
      ? p.orientation === selectedOrientationFilter ||
        p.shape === selectedOrientationFilter
      : true;

    return matchesSearch && matchesCat && matchesOrientation;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
              Product Catalog &amp; 4-Orientation Engine
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Configure 4 orientations (Portrait, Landscape, Square, Round) with distinct sizes, dimensions, and ₹ pricing for each artwork.
            </p>
          </div>

          <button
            onClick={() => {
              setEditingSlug(null);
              setFormData(initialForm);
              setActiveOrientationTab('portrait');
              setModalOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-stone-900 hover:bg-amber-800 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-colors self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Masterpiece</span>
          </button>
        </div>

        {/* Toolbar & Filters */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, slug, or deity..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-amber-700 text-xs"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl outline-none text-xs"
            >
              <option value="">All Categories ({INITIAL_CATEGORIES.length})</option>
              {INITIAL_CATEGORIES.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              value={selectedOrientationFilter}
              onChange={(e) => setSelectedOrientationFilter(e.target.value)}
              className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl outline-none text-xs font-medium"
            >
              <option value="">All Orientations</option>
              <option value="vertical">Portrait (2:3)</option>
              <option value="horizontal">Landscape (3:2)</option>
              <option value="square">Square (1:1)</option>
              <option value="round">Round (Circle)</option>
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-xs text-stone-400">Loading catalog...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-12 text-center text-xs text-stone-400">No artworks match your criteria.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Artwork</th>
                    <th className="py-3 px-4">Primary Orientation</th>
                    <th className="py-3 px-4">4 Sizes &amp; Pricing (Primary)</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Lighting</th>
                    <th className="py-3 px-4 text-center">Total Stock</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredProducts.map((prod) => {
                    const orientationLabel =
                      prod.orientation === 'horizontal' || prod.shape === 'landscape'
                        ? 'Landscape 3:2'
                        : prod.orientation === 'square' || prod.shape === 'square'
                        ? 'Square 1:1'
                        : prod.orientation === 'round' || prod.shape === 'round'
                        ? 'Round Halo'
                        : 'Portrait 2:3';

                    const primaryVariants =
                      prod.orientationVariants?.[prod.shape as OrientationShape] ||
                      prod.variants ||
                      getDefault4Variants(prod.orientation || 'vertical', prod.basePrice, prod.baseMrp);

                    const fourSizes = primaryVariants.slice(0, 4);
                    const totalStock = fourSizes.reduce((acc, v) => acc + (v.stockCount || 0), 0);

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
                          <div className="space-y-1">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-200 text-stone-800 font-bold text-[11px] whitespace-nowrap">
                              {orientationLabel}
                            </span>
                            <div className="text-[10px] text-amber-900 font-medium flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5 text-amber-700" />
                              <span>4 Orientations Ready</span>
                            </div>
                          </div>
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
                              className="px-2.5 py-1 text-xs font-semibold bg-stone-900 hover:bg-amber-800 text-white rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                              title="Edit All 4 Orientations & Sizes"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                              <span>Edit Sizes</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(prod.slug)}
                              className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
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

        {/* Modal: Add / Edit Product with 4 Orientations Engine */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-4xl w-full p-6 shadow-2xl border border-stone-200 my-8 max-h-[92vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-4">
                <div>
                  <h3 className="font-serif font-bold text-xl text-stone-900">
                    {editingSlug ? 'Edit Artwork & 4-Orientation Sizes' : 'Add New Masterpiece'}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Customize dimensions, ₹ pricing, and stock independently for Portrait, Landscape, Square, and Round.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-6 text-xs">
                {/* 1. Basic Details */}
                <div className="space-y-3">
                  <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 text-xs flex items-center justify-center font-bold">1</span>
                    Artwork Information
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">Title *</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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

                {/* 2. Primary Orientation Selector */}
                <div className="space-y-3 pt-4 border-t border-stone-200">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 text-xs flex items-center justify-center font-bold">2</span>
                      Default Storefront Orientation
                    </h4>
                    <span className="text-[11px] text-stone-500">
                      The shape selected by default when customers open the page
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: 'vertical', shape: 'portrait' as OrientationShape, label: 'Portrait (2:3)', subtitle: 'Vertical Wall Frame', icon: '↕️' },
                      { id: 'horizontal', shape: 'landscape' as OrientationShape, label: 'Landscape (3:2)', subtitle: 'Horizontal Backdrop', icon: '↔️' },
                      { id: 'square', shape: 'square' as OrientationShape, label: 'Square (1:1)', subtitle: 'Balanced Sacred Mandala', icon: '⏹️' },
                      { id: 'round', shape: 'round' as OrientationShape, label: 'Round (Halo)', subtitle: 'Circular Diya & Halo', icon: '⭕' },
                    ].map((opt) => {
                      const isSelected = formData.orientation === opt.id || formData.shape === opt.shape;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handlePrimaryOrientationChange(opt.id as ProductOrientation)}
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

                {/* 3. The 4 Orientations & 4 Sizes Pricing Engine */}
                <div className="space-y-4 pt-4 border-t border-stone-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 text-xs flex items-center justify-center font-bold">3</span>
                        4 Orientations &amp; Individual Size Pricing (₹)
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        Click any of the 4 orientation tabs below to edit that orientation&apos;s 4 sizes, dimensions, and prices.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                      <button
                        type="button"
                        onClick={handleAutofillForActiveOrientation}
                        className="px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Reset dimensions to standard for the selected orientation tab"
                      >
                        <RotateCw className="w-3 h-3" />
                        <span>Auto-fill Standard Sizes</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleCopyPricesToAll}
                        className="px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-800 text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                        title="Copy these 4 prices to the other 3 orientations"
                      >
                        <Copy className="w-3 h-3 text-amber-700" />
                        <span>Copy Prices to All 4 Orientations</span>
                      </button>
                    </div>
                  </div>

                  {/* 4 Orientation Tabs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-stone-100/90 rounded-2xl border border-stone-200">
                    {[
                      { id: 'portrait' as OrientationShape, label: 'Portrait (Vertical)', ratio: '2:3', icon: '↕️' },
                      { id: 'landscape' as OrientationShape, label: 'Landscape (Horizontal)', ratio: '3:2', icon: '↔️' },
                      { id: 'square' as OrientationShape, label: 'Square (Equal)', ratio: '1:1', icon: '⏹️' },
                      { id: 'round' as OrientationShape, label: 'Round (Halo)', ratio: 'Circle', icon: '⭕' },
                    ].map((tab) => {
                      const isActive = activeOrientationTab === tab.id;
                      const isPrimary =
                        formData.shape === tab.id ||
                        (formData.orientation === 'vertical' && tab.id === 'portrait') ||
                        (formData.orientation === 'horizontal' && tab.id === 'landscape') ||
                        formData.orientation === tab.id;

                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActiveOrientationTab(tab.id)}
                          className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex flex-col justify-between gap-1 text-left cursor-pointer border ${
                            isActive
                              ? 'bg-white text-stone-900 shadow-xs border-amber-400 ring-2 ring-amber-500/20'
                              : 'bg-transparent text-stone-600 hover:text-stone-900 hover:bg-white/60 border-transparent'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="text-sm">{tab.icon}</span>
                            {isPrimary && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold uppercase tracking-wider">
                                Primary
                              </span>
                            )}
                          </div>
                          <div>
                            <span className="block font-bold text-xs truncate">{tab.label}</span>
                            <span className="text-[10px] text-stone-500 font-normal">{tab.ratio}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* 4 Size Cards for currently active orientation tab */}
                  <div className="p-3.5 bg-amber-50/40 rounded-2xl border border-amber-200/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                        Editing: <span className="text-amber-900 underline font-extrabold">{activeOrientationTab.toUpperCase()}</span> Sizes &amp; Prices
                      </span>
                      <span className="text-[11px] text-stone-500">
                        Changes here apply when customers select {activeOrientationTab.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {formData.orientationVariants[activeOrientationTab].map((v, i) => {
                        const tierTitles = [
                          'Size 1 (Small / Alcove)',
                          'Size 2 (Medium / Standard)',
                          'Size 3 (Large / Statement)',
                          'Size 4 (Grand Masterpiece)',
                        ];

                        return (
                          <div
                            key={i}
                            className="p-4 rounded-2xl bg-white border border-stone-200 space-y-3 relative hover:border-amber-400 shadow-2xs transition-colors"
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
                                  onChange={(e) =>
                                    handleVariantChange(activeOrientationTab, i, 'inStock', e.target.checked)
                                  }
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
                                  onChange={(e) =>
                                    handleVariantChange(activeOrientationTab, i, 'size', e.target.value)
                                  }
                                  className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium focus:bg-white"
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
                                  onChange={(e) =>
                                    handleVariantChange(activeOrientationTab, i, 'dimensionsCm', e.target.value)
                                  }
                                  className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs focus:bg-white"
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
                                  onChange={(e) =>
                                    handleVariantChange(activeOrientationTab, i, 'price', Number(e.target.value))
                                  }
                                  className="w-full px-2.5 py-1.5 bg-white border border-amber-300 rounded-lg text-xs font-bold text-amber-950 focus:ring-1 focus:ring-amber-500"
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
                                  onChange={(e) =>
                                    handleVariantChange(activeOrientationTab, i, 'mrp', Number(e.target.value))
                                  }
                                  className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-600 focus:bg-white"
                                />
                              </div>

                              <div>
                                <label className="text-[11px] font-semibold text-stone-500 block mb-1">
                                  Stock Count
                                </label>
                                <input
                                  type="number"
                                  value={v.stockCount}
                                  onChange={(e) =>
                                    handleVariantChange(activeOrientationTab, i, 'stockCount', Number(e.target.value))
                                  }
                                  className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs focus:bg-white"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
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
                      <span className="font-semibold text-stone-800">Warm 3000K LED Backlight</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isFeatured}
                        onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                        className="rounded text-amber-700"
                      />
                      <span className="font-semibold text-stone-800">Featured Atelier Piece</span>
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
                </div>

                {/* 5. Short & Long Descriptions */}
                <div className="space-y-3 pt-4 border-t border-stone-200">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Short Description</label>
                    <input
                      type="text"
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none text-xs"
                      placeholder="Concise devotional summary for collection cards..."
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Detailed Story &amp; Description</label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none text-xs"
                      placeholder="Craftsmanship details, spiritual significance, and luxury acrylic finish description..."
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Search Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none text-xs font-mono"
                      placeholder="e.g. Balaji, Tirupati, LED Art, Pooja Room"
                    />
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 border border-stone-200 rounded-xl text-stone-600 hover:bg-stone-50 font-medium transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2 bg-stone-900 hover:bg-amber-800 disabled:opacity-50 text-white rounded-xl font-bold transition-colors shadow-sm cursor-pointer flex items-center gap-1.5"
                  >
                    {saving ? 'Saving 4 Orientations...' : 'Save All Orientations & Sizes'}
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
