'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
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
  Upload,
  Image as ImageIcon,
  Loader2,
  Check,
  Star,
  ArrowLeft,
  ArrowRight,
  Eye,
  Layers,
  Flame,
  Camera,
  LayoutGrid,
  List,
  Package,
  ChevronDown,
  ChevronUp,
  Minus,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Product, ProductOrientation, OrientationShape, ProductModel, FrameStockSettings } from '@/types';
import { INITIAL_SETTINGS } from '@/lib/data/settings';
import { getProductModels, STANDARD_MODEL_ORDER } from '@/lib/data/productModels';
import { INITIAL_CATEGORIES } from '@/lib/data/categories';
import { formatSizeWithSqFt, getSqFt } from '@/lib/utils/sizeFormat';

const POPULAR_FRAME_SIZES = [
  { size: '8 x 12 inches', dimensionsCm: '0.7 sq.ft', label: '8x12"' },
  { size: '10 x 15 inches', dimensionsCm: '1.0 sq.ft', label: '10x15"' },
  { size: '12 x 18 inches', dimensionsCm: '1.5 sq.ft', label: '12x18"' },
  { size: '16 x 20 inches', dimensionsCm: '2.2 sq.ft', label: '16x20"' },
  { size: '16 x 24 inches', dimensionsCm: '2.7 sq.ft', label: '16x24"' },
  { size: '18 x 24 inches', dimensionsCm: '3.0 sq.ft', label: '18x24"' },
  { size: '20 x 30 inches', dimensionsCm: '4.2 sq.ft', label: '20x30"' },
  { size: '24 x 36 inches', dimensionsCm: '6.0 sq.ft', label: '24x36"' },
  { size: '30 x 48 inches (Grand Wall Size)', dimensionsCm: '10.0 sq.ft', label: '30x48"' },
  { size: '36 x 48 inches (Palace Size)', dimensionsCm: '12.0 sq.ft', label: '36x48"' },
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
    { id: 'size-1', size: '12 x 18 inches', dimensionsCm: '1.5 sq.ft', price: p1, mrp: m1, inStock: true, stockCount: 45 },
    { id: 'size-2', size: '18 x 24 inches', dimensionsCm: '3.0 sq.ft', price: Math.round(p1 * 1.38), mrp: Math.round(m1 * 1.36), inStock: true, stockCount: 60 },
    { id: 'size-3', size: '24 x 36 inches', dimensionsCm: '6.0 sq.ft', price: Math.round(p1 * 2.07), mrp: Math.round(m1 * 2.0), inStock: true, stockCount: 30 },
    { id: 'size-4', size: '30 x 48 inches (Grand Wall Size)', dimensionsCm: '10.0 sq.ft', price: Math.round(p1 * 3.1), mrp: Math.round(m1 * 3.0), inStock: true, stockCount: 15 },
  ];
};

const ensureJpgExtension = (url: string): string => {
  const trimmed = (url || '').trim();
  if (
    !trimmed ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://')
  ) {
    return trimmed;
  }
  if (/\.(jpg|jpeg|png|webp|svg|gif|avif)$/i.test(trimmed)) {
    return trimmed;
  }
  return `${trimmed}.jpg`;
};

function AdminProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Read ?cat= or ?category= from URL query params
  const initialCat = searchParams.get('cat') || searchParams.get('category') || '';
  const [selectedCat, setSelectedCat] = useState(initialCat);

  // Sync state if URL query changes
  useEffect(() => {
    const urlCat = searchParams.get('cat') || searchParams.get('category') || '';
    if (urlCat !== selectedCat) {
      setSelectedCat(urlCat);
    }
  }, [searchParams]);

  // Handle category filter change and update URL
  const handleCategoryFilterChange = (catSlug: string) => {
    setSelectedCat(catSlug);
    if (catSlug) {
      router.replace(`/admin/products?cat=${encodeURIComponent(catSlug)}`, { scroll: false });
    } else {
      router.replace('/admin/products', { scroll: false });
    }
  };

  const activeCategoryObj = INITIAL_CATEGORIES.find((c) => c.slug === selectedCat);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [filterTab, setFilterTab] = useState<'all' | 'led' | 'acrylic' | 'trending' | 'low-stock'>('all');
  const [expandedSizesSlug, setExpandedSizesSlug] = useState<string | null>(null);
  // Frame Stock Availability Settings
  const [frameStock, setFrameStock] = useState<FrameStockSettings>(
    INITIAL_SETTINGS.frameStock || {
      gold: { name: 'Rose Gold', inStock: true, stockCount: 850 },
      black: { name: 'Black', inStock: true, stockCount: 720 },
    }
  );
  const [savingFrameStock, setSavingFrameStock] = useState(false);
  const [frameStockSavedSuccess, setFrameStockSavedSuccess] = useState(false);
  const [togglingGold, setTogglingGold] = useState(false);
  const [togglingBlack, setTogglingBlack] = useState(false);

  const fetchFrameStock = async () => {
    try {
      const res = await fetch('/api/settings?t=' + Date.now(), { cache: 'no-store' });
      const data = await res.json();
      if (res.ok && data.success && data.settings?.frameStock) {
        setFrameStock(data.settings.frameStock);
      }
    } catch (err) {
      console.warn('Error fetching frame stock settings:', err);
    }
  };

  const handleSaveFrameStock = async (overrideStock?: FrameStockSettings) => {
    const payload = overrideStock || frameStock;
    try {
      setSavingFrameStock(true);
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ frameStock: payload }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (data.settings?.frameStock) {
          setFrameStock(data.settings.frameStock);
        }
        setFrameStockSavedSuccess(true);
        setTimeout(() => setFrameStockSavedSuccess(false), 3000);
      } else {
        alert(data.error || 'Failed to update frame stock');
      }
    } catch (err: any) {
      alert('Error saving frame stock: ' + (err.message || 'Network error'));
    } finally {
      setSavingFrameStock(false);
    }
  };

  const toggleGoldStock = async () => {
    try {
      setTogglingGold(true);
      const isCurrentlyInStock = Boolean(frameStock.gold.inStock && frameStock.gold.stockCount > 0);
      const nextInStock = !isCurrentlyInStock;
      const nextCount = nextInStock ? (frameStock.gold.stockCount > 0 ? frameStock.gold.stockCount : 500) : 0;
      const nextStock: FrameStockSettings = {
        ...frameStock,
        gold: {
          ...frameStock.gold,
          inStock: nextInStock,
          stockCount: nextCount,
        },
      };
      setFrameStock(nextStock);
      await handleSaveFrameStock(nextStock);
    } finally {
      setTogglingGold(false);
    }
  };

  const updateGoldCount = async (count: number, autoSave = false) => {
    const validCount = Math.max(0, count);
    const nextStock: FrameStockSettings = {
      ...frameStock,
      gold: {
        ...frameStock.gold,
        stockCount: validCount,
        inStock: validCount > 0,
      },
    };
    setFrameStock(nextStock);
    if (autoSave) {
      await handleSaveFrameStock(nextStock);
    }
  };

  const toggleCategoryVisibility = async (catSlug: string) => {
    const currentVis = frameStock.categoryVisibility || {};
    const currentVal = currentVis[catSlug] !== undefined ? currentVis[catSlug] : true;
    const nextVal = !currentVal;
    const nextVis = { ...currentVis, [catSlug]: nextVal };
    const nextConfigs = {
      ...(frameStock.categoryConfigs || {}),
      [catSlug]: {
        ...(frameStock.categoryConfigs?.[catSlug] || { showGold: true, showBlack: true }),
        enabled: nextVal,
      },
    };
    const nextStock: FrameStockSettings = {
      ...frameStock,
      categoryVisibility: nextVis,
      categoryConfigs: nextConfigs,
    };
    setFrameStock(nextStock);
    await handleSaveFrameStock(nextStock);
  };

  const toggleCategoryFrameOption = async (catSlug: string, frameType: 'gold' | 'black') => {
    const currentConfigs = frameStock.categoryConfigs || {};
    const currentCfg = currentConfigs[catSlug] || { enabled: true, showGold: true, showBlack: true };
    const nextCfg = {
      ...currentCfg,
      [frameType === 'gold' ? 'showGold' : 'showBlack']: !(frameType === 'gold' ? (currentCfg.showGold !== false) : (currentCfg.showBlack !== false)),
    };
    const nextEnabled = Boolean((nextCfg.showGold ?? true) || (nextCfg.showBlack ?? true));
    nextCfg.enabled = nextEnabled;

    const nextConfigs = { ...currentConfigs, [catSlug]: nextCfg };
    const nextVis = { ...(frameStock.categoryVisibility || {}), [catSlug]: nextEnabled };

    const nextStock: FrameStockSettings = {
      ...frameStock,
      categoryVisibility: nextVis,
      categoryConfigs: nextConfigs,
    };
    setFrameStock(nextStock);
    await handleSaveFrameStock(nextStock);
  };

  const setAllCategoriesVisibility = async (enable: boolean) => {
    const officialSlugs = INITIAL_CATEGORIES.map((c) => c.slug);
    const nextVis: Record<string, boolean> = {};
    const nextConfigs: Record<string, any> = {};

    officialSlugs.forEach((slug) => {
      nextVis[slug] = enable;
      nextConfigs[slug] = {
        enabled: enable,
        showGold: enable,
        showBlack: enable,
      };
    });

    const nextStock: FrameStockSettings = {
      ...frameStock,
      categoryVisibility: nextVis,
      categoryConfigs: nextConfigs,
    };
    setFrameStock(nextStock);
    await handleSaveFrameStock(nextStock);
  };

  const toggleBlackStock = async () => {
    try {
      setTogglingBlack(true);
      const isCurrentlyInStock = Boolean(frameStock.black.inStock && frameStock.black.stockCount > 0);
      const nextInStock = !isCurrentlyInStock;
      const nextCount = nextInStock ? (frameStock.black.stockCount > 0 ? frameStock.black.stockCount : 500) : 0;
      const nextStock: FrameStockSettings = {
        ...frameStock,
        black: {
          ...frameStock.black,
          inStock: nextInStock,
          stockCount: nextCount,
        },
      };
      setFrameStock(nextStock);
      await handleSaveFrameStock(nextStock);
    } finally {
      setTogglingBlack(false);
    }
  };

  const updateBlackCount = async (count: number, autoSave = false) => {
    const validCount = Math.max(0, count);
    const nextStock: FrameStockSettings = {
      ...frameStock,
      black: {
        ...frameStock.black,
        stockCount: validCount,
        inStock: validCount > 0,
      },
    };
    setFrameStock(nextStock);
    if (autoSave) {
      await handleSaveFrameStock(nextStock);
    }
  };


  // Artwork Image Upload & Format States (Support up to 30 images per product)
  const MAX_PRODUCT_IMAGES = 30;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState('');
  const [imagePreviewError, setImagePreviewError] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleMainCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      setUploadProgressText('Uploading cover image...');

      const rawDataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      if (rawDataUrl) {
        let finalUrl = rawDataUrl;
        try {
          const res = await fetch('/api/upload-photo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: rawDataUrl }),
          });
          const data = await res.json();
          if (data && data.success && (data.cdnUrl || data.url)) {
            finalUrl = data.cdnUrl || data.url;
          }
        } catch (e) {
          console.warn('API upload error, using local data URL', e);
        }

        setFormData((prev) => ({
          ...prev,
          images: [finalUrl],
          imageUrl: finalUrl,
        }));
      }
    } catch (err: any) {
      alert('Failed to upload image: ' + (err.message || 'Unknown error'));
    } finally {
      setUploadingImage(false);
      setUploadProgressText('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAddImage = (urlToAdd?: string) => {
    const raw = (urlToAdd || newImageUrl).trim();
    if (!raw) return;

    // Supports pasting single or multiple URLs (comma, newline, or space separated)
    const urls = raw
      .split(/[\r\n,\s]+/)
      .map((u) => u.trim())
      .filter(Boolean)
      .map(ensureJpgExtension);

    if (urls.length === 0) return;

    setFormData((prev) => {
      const currentList = Array.isArray(prev.images) && prev.images.length > 0
        ? prev.images
        : [prev.imageUrl].filter(Boolean);

      const combined = Array.from(new Set([...currentList, ...urls])).slice(0, MAX_PRODUCT_IMAGES);
      if (combined.length >= MAX_PRODUCT_IMAGES && currentList.length + urls.length > MAX_PRODUCT_IMAGES) {
        alert(`Images capped at maximum allowed ${MAX_PRODUCT_IMAGES} images.`);
      }

      return {
        ...prev,
        images: combined,
        imageUrl: combined[0] || prev.imageUrl || '',
      };
    });
    setNewImageUrl('');
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => {
      const currentList = Array.isArray(prev.images) && prev.images.length > 0
        ? prev.images
        : [prev.imageUrl].filter(Boolean);
      if (currentList.length <= 1) {
        alert('A product must have at least one image in its gallery.');
        return prev;
      }
      const updated = currentList.filter((_, i) => i !== index);
      return {
        ...prev,
        images: updated,
        imageUrl: updated[0] || '',
      };
    });
  };

  const handleClearExtraImages = () => {
    if (!confirm('Keep only the primary cover image and remove all other secondary images?')) return;
    setFormData((prev) => {
      const first = (prev.images && prev.images[0]) || prev.imageUrl;
      return {
        ...prev,
        images: [first],
        imageUrl: first,
      };
    });
  };

  const handleAddCraftAndSpecs = () => {
    const craftViews = [
      '/images/promo-aluminium-frames-clean.png',
      '/images/print-size-options-clean.jpg',
      '/images/trust-badges-clean.png',
      '/images/frames/gold-border-ref.jpg',
      '/images/frames/black-border-ref.jpg',
      '/images/frames/acrylic-border-ref.jpg',
    ];
    setFormData((prev) => {
      const currentList = Array.isArray(prev.images) && prev.images.length > 0
        ? prev.images
        : [prev.imageUrl].filter(Boolean);
      const combined = Array.from(new Set([...currentList, ...craftViews])).slice(0, MAX_PRODUCT_IMAGES);
      return {
        ...prev,
        images: combined,
        imageUrl: combined[0] || prev.imageUrl,
      };
    });
  };

  const handleSetPrimaryImage = (index: number) => {
    if (index === 0) return;
    setFormData((prev) => {
      const currentList = Array.isArray(prev.images) && prev.images.length > 0
        ? [...prev.images]
        : [prev.imageUrl].filter(Boolean);
      const [chosen] = currentList.splice(index, 1);
      if (!chosen) return prev;
      currentList.unshift(chosen);
      return {
        ...prev,
        images: currentList,
        imageUrl: currentList[0] || '',
      };
    });
  };

  const handleMoveImage = (index: number, direction: 'left' | 'right') => {
    setFormData((prev) => {
      const currentList = Array.isArray(prev.images) && prev.images.length > 0
        ? [...prev.images]
        : [prev.imageUrl].filter(Boolean);
      const targetIdx = direction === 'left' ? index - 1 : index + 1;
      if (targetIdx < 0 || targetIdx >= currentList.length) return prev;
      const temp = currentList[index];
      currentList[index] = currentList[targetIdx];
      currentList[targetIdx] = temp;
      return {
        ...prev,
        images: currentList,
        imageUrl: currentList[0] || '',
      };
    });
  };

  const handleAutoAddStandardMockups = () => {
    const slug = formData.slug.trim().toLowerCase();
    if (!slug) {
      alert('Please enter or select a product with a valid slug first.');
      return;
    }
    const standardSuffixes = [
      'primary-square.jpg',
      'mockup-living-room.jpg',
      'mockup-interior.jpg',
      'mockup-foyer.jpg',
      'mockup-detail.jpg',
      'mockup-artistic.jpg',
      'mockup-suite.jpg',
    ];
    const generated = standardSuffixes.map((s) => `/images/mockups/${slug}/${s}`);
    setFormData((prev) => {
      const currentList = Array.isArray(prev.images) && prev.images.length > 0
        ? prev.images
        : [prev.imageUrl].filter(Boolean);
      const combined = Array.from(new Set([...currentList, ...generated])).slice(0, MAX_PRODUCT_IMAGES);
      return {
        ...prev,
        images: combined,
        imageUrl: combined[0] || prev.imageUrl,
      };
    });
  };

  // Quick Add Size Option state (accessible directly from any product row in the table)
  const [quickSizeProduct, setQuickSizeProduct] = useState<Product | null>(null);
  const [quickSizeName, setQuickSizeName] = useState('');
  const [quickSizeCm, setQuickSizeCm] = useState('');
  const [quickSizePrice, setQuickSizePrice] = useState(2499);
  const [quickSizeMrp, setQuickSizeMrp] = useState(4999);
  const [quickSizeStock, setQuickSizeStock] = useState(25);
  const [quickSizeSaving, setQuickSizeSaving] = useState(false);
  const [quickSizeSuccess, setQuickSizeSuccess] = useState('');

  // Models State & Management (M-1 to M-25 / M-30)
  const [newModelName, setNewModelName] = useState('');
  const [newModelImage, setNewModelImage] = useState('');
  const [newModelPopular, setNewModelPopular] = useState(false);
  const [uploadingModelIdx, setUploadingModelIdx] = useState<number | null>(null);
  const bulkModelFileInputRef = useRef<HTMLInputElement | null>(null);

  // Upload an individual image specifically for one model
  const handleSingleModelImageUpload = async (index: number, file: File) => {
    if (!file) return;
    try {
      setUploadingModelIdx(index);
      const rawDataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      let finalUrl = rawDataUrl;
      try {
        const res = await fetch('/api/upload-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: rawDataUrl }),
        });
        const data = await res.json();
        if (data && data.success && (data.cdnUrl || data.url)) {
          finalUrl = data.cdnUrl || data.url;
        }
      } catch {
        // fallback to data url
      }

      setFormData((prev) => {
        const updated = [...(prev.models || [])];
        if (updated[index]) {
          updated[index] = {
            ...updated[index],
            image: finalUrl,
            mockups: [finalUrl, ...(updated[index].mockups || []).slice(1)],
          };
        }
        return { ...prev, models: updated };
      });
    } catch (err: any) {
      alert('Failed to upload image for model: ' + (err.message || 'Error'));
    } finally {
      setUploadingModelIdx(null);
    }
  };

  // Bulk upload multiple images and assign each file to a different model in order
  const handleBulkModelImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const files = Array.from(fileList);
    try {
      setUploadingImage(true);
      setUploadProgressText(`Uploading ${files.length} model image(s)...`);

      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgressText(`Uploading image ${i + 1} of ${files.length} for models...`);
        const rawDataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        let finalUrl = rawDataUrl;
        try {
          const res = await fetch('/api/upload-photo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: rawDataUrl }),
          });
          const data = await res.json();
          if (data && data.success && (data.cdnUrl || data.url)) {
            finalUrl = data.cdnUrl || data.url;
          }
        } catch {
          // fallback
        }
        uploadedUrls.push(finalUrl);
      }

      setFormData((prev) => {
        let existingModels = [...(prev.models || [])];
        if (existingModels.length === 0) {
          existingModels = STANDARD_MODEL_ORDER.map((item) => ({
            id: item.id,
            name: item.name,
            image: prev.imageUrl || '/images/placeholder.jpg',
            isPopular: item.isPopular || false,
          }));
        }

        const updatedModels = existingModels.map((m, idx) => {
          if (idx < uploadedUrls.length) {
            return {
              ...m,
              image: uploadedUrls[idx],
              mockups: [uploadedUrls[idx]],
            };
          }
          return m;
        });

        for (let j = existingModels.length; j < uploadedUrls.length; j++) {
          const name = `M-${j + 1}`;
          updatedModels.push({
            id: name,
            name,
            image: uploadedUrls[j],
            mockups: [uploadedUrls[j]],
            isPopular: j === 0 || j === 9 || j === 17,
          });
        }

        return {
          ...prev,
          models: updatedModels,
        };
      });
      alert(`Successfully assigned ${uploadedUrls.length} different image(s) to models!`);
    } catch (err: any) {
      alert('Error during bulk model upload: ' + (err.message || 'Error'));
    } finally {
      setUploadingImage(false);
      setUploadProgressText('');
      if (bulkModelFileInputRef.current) bulkModelFileInputRef.current.value = '';
    }
  };

  const handleUpdateModelField = (index: number, field: keyof ProductModel, value: any) => {
    setFormData((prev) => {
      const list = [...(prev.models || [])];
      if (list[index]) {
        list[index] = { ...list[index], [field]: value };
      }
      return { ...prev, models: list };
    });
  };

  const handleAddModel = () => {
    const name = newModelName.trim().toUpperCase();
    if (!name) {
      alert('Please enter a model name (e.g. M-26).');
      return;
    }
    const img = (newModelImage.trim() || formData.imageUrl || '/images/placeholder.jpg');
    const newM: ProductModel = {
      id: name,
      name,
      image: img,
      isPopular: newModelPopular,
    };
    setFormData((prev) => ({
      ...prev,
      models: [...(prev.models || []), newM],
    }));
    setNewModelName('');
    setNewModelImage('');
    setNewModelPopular(false);
  };

  const handleRemoveModel = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      models: (prev.models || []).filter((_, i) => i !== index),
    }));
  };

  const handleToggleModelPopular = (index: number) => {
    setFormData((prev) => {
      const updated = [...(prev.models || [])];
      if (updated[index]) {
        updated[index] = { ...updated[index], isPopular: !updated[index].isPopular };
      }
      return { ...prev, models: updated };
    });
  };

  const handleMoveModel = (index: number, direction: 'left' | 'right') => {
    setFormData((prev) => {
      const list = [...(prev.models || [])];
      const target = direction === 'left' ? index - 1 : index + 1;
      if (target < 0 || target >= list.length) return prev;
      const tmp = list[index];
      list[index] = list[target];
      list[target] = tmp;
      return { ...prev, models: list };
    });
  };

  const handleAutoGenerate25Models = () => {
    const dummyProduct = {
      id: formData.slug || 'prod-custom',
      slug: formData.slug || 'custom-art',
      title: formData.title || 'Custom Art',
      categorySlug: formData.categorySlug,
      categoryName: formData.categoryName,
      images: Array.isArray(formData.images) && formData.images.length > 0 ? formData.images : [formData.imageUrl],
      basePrice: formData.basePrice,
      baseMrp: formData.baseMrp,
      hasLedBacklight: formData.hasLedBacklight,
      tags: [],
      variants: [],
      specifications: [],
      materialAndCare: [],
      shortDescription: '',
      description: '',
      orientation: formData.orientation,
      discountPercentage: 0,
      rating: 5,
      reviewCount: 20,
      artStyle: formData.artStyle,
    } as unknown as Product;

    const generated = getProductModels(dummyProduct);
    setFormData((prev) => ({
      ...prev,
      models: generated,
    }));
  };

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
    images: ['/images/collections/custom-portrait-frame.jpg'] as string[],
    tags: 'Acrylic Photo Frame, Hyderabad, Wall Decor',
    variants: getDefault4Variants(2499, 4999),
    models: [] as ProductModel[],
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
    fetchFrameStock();
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const cat = urlParams.get('cat');
      if (cat) setSelectedCat(cat);
    }
  }, []);

  const handleNewProduct = (categorySlugToUse?: string) => {
    const catSlug = categorySlugToUse || selectedCat || 'acrylic-photo-frames';
    const catObj = INITIAL_CATEGORIES.find((c) => c.slug === catSlug);
    setEditingSlug(null);
    setFormData({
      ...initialForm,
      categorySlug: catSlug,
      categoryName: catObj ? catObj.name : 'Acrylic Photo Frames',
      categorySlugs: [catSlug],
    });
    setModalOpen(true);
  };

  const handleEditProduct = (prod: Product) => {
    setEditingSlug(prod.slug);

    const baseP = prod.basePrice || 2499;
    const baseM = prod.baseMrp || 4999;

    const existingVariants: AdminFormVariant[] =
      prod.variants && prod.variants.length > 0
        ? prod.variants.map((v, i) => {
            const sqFromSize = v.size ? getSqFt(v.size) : '';
            const dimSq = v.dimensionsCm && !v.dimensionsCm.toLowerCase().includes('cm')
              ? v.dimensionsCm
              : (sqFromSize || (v.dimensionsCm ? getSqFt(v.dimensionsCm) : '') || '1.5 sq.ft');
            return {
              id: v.id || `var-${i + 1}`,
              size: v.size,
              dimensionsCm: dimSq,
              price: v.price,
              mrp: v.mrp,
              inStock: v.inStock !== false,
              stockCount: v.stockCount || 25,
            };
          })
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
      imageUrl: (prod.images && prod.images[0]) || '',
      images: Array.isArray(prod.images) && prod.images.length > 0 ? prod.images.filter(Boolean) : [prod.images?.[0] || '/images/collections/custom-portrait-frame.jpg'],
      tags: (prod.tags || []).join(', '),
      variants: existingVariants,
      models: prod.models && prod.models.length > 0 ? prod.models : getProductModels(prod),
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

      if (field === 'size') {
        const sq = getSqFt(String(value));
        if (sq) {
          updated[index].dimensionsCm = sq;
        }
      }

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

    const prefillSq = prefill?.dimensionsCm || (prefill?.size ? getSqFt(prefill.size) : '') || '';

    const newVariant: AdminFormVariant = {
      id: `size-${Date.now()}-${currentCount + 1}`,
      size: prefill?.size || '',
      dimensionsCm: prefillSq,
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
        dimensionsCm: quickSizeCm.trim() || getSqFt(quickSizeName.trim()) || '1.5 sq.ft',
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
        dimensionsCm: v.dimensionsCm.trim() || getSqFt(v.size.trim()) || '1.5 sq.ft',
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

      const cleanedImages = Array.from(
        new Set(
          (formData.images && formData.images.length > 0 ? formData.images : [formData.imageUrl])
            .map((img) => img.trim())
            .filter(Boolean)
            .map(ensureJpgExtension)
        )
      );

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
        images: cleanedImages.length > 0 ? cleanedImages : [ensureJpgExtension(formData.imageUrl)],
        tags: formData.tags.split(',').map((t) => t.trim()),
        isFeatured: formData.isFeatured,
        isBestseller: formData.isBestseller,
        isNewArrival: true,
        hasLedBacklight: formData.hasLedBacklight,
        basePrice: primaryBasePrice,
        baseMrp: primaryBaseMrp,
        discountPercentage: Math.round(((primaryBaseMrp - primaryBasePrice) / primaryBaseMrp) * 100),
        variants: formattedVariants,
        models: Array.isArray(formData.models) && formData.models.length > 0
          ? formData.models
          : getProductModels({ slug: formData.slug, title: formData.title, images: cleanedImages } as Product),
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
          await fetchProducts();
          setFormData(initialForm);
          alert('✓ Product updated and synchronized to live website!');
        } else {
          alert('Error updating product: ' + (data?.error || 'Failed to update'));
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
          await fetchProducts();
          setFormData(initialForm);
          alert('✓ New product created and published to live website!');
        } else {
          alert('Error creating product: ' + (data?.error || 'Failed to create'));
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

  // KPI Metrics
  const totalCatalogStock = products.reduce((acc, p) => {
    const vars = p.variants && p.variants.length > 0 ? p.variants : getDefault4Variants(p.basePrice, p.baseMrp);
    return acc + vars.reduce((sum, v) => sum + (v.stockCount || 0), 0);
  }, 0);

  const totalModelsCount = products.reduce((acc, p) => acc + (p.models?.length || 25), 0);
  const totalLedProducts = products.filter((p) => p.hasLedBacklight).length;

  const filteredProducts = products.filter((p) => {
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      Boolean(p.deity && p.deity.toLowerCase().includes(q));

    const matchesCat = selectedCat
      ? p.categorySlug === selectedCat || p.categorySlugs?.includes(selectedCat)
      : true;

    let matchesTab = true;
    if (filterTab === 'led') matchesTab = Boolean(p.hasLedBacklight);
    else if (filterTab === 'acrylic') matchesTab = !p.hasLedBacklight;
    else if (filterTab === 'trending') matchesTab = Boolean(p.isBestseller || p.isFeatured || p.models?.some((m) => m.isPopular));
    else if (filterTab === 'low-stock') {
      const vars = p.variants && p.variants.length > 0 ? p.variants : getDefault4Variants(p.basePrice, p.baseMrp);
      matchesTab = vars.some((v) => (v.stockCount || 0) <= 5);
    }

    return matchesSearch && matchesCat && matchesTab;
  });

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200 p-5 sm:p-6 rounded-3xl shadow-sm text-stone-900">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <Link
                href="/admin/categories"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-500 hover:text-stone-950 transition-colors"
              >
                <span>← 8 Store Collections</span>
              </Link>
              {selectedCat && (
                <>
                  <span className="text-stone-300">•</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300 font-black text-[10.5px] uppercase tracking-wider flex items-center gap-1.5 shadow-2xs">
                    <Tag className="w-3 h-3 text-amber-800" />
                    Category: {activeCategoryObj?.name || selectedCat}
                  </span>
                </>
              )}
              <span className="text-stone-300">•</span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 font-bold text-[10px] tracking-wider uppercase flex items-center gap-1 shadow-2xs">
                <Sparkles className="w-3 h-3 text-amber-700" />
                Catalog Operations
              </span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight">
              Artwork Catalog &amp; Products
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Manage luxury acrylic artworks, model variations (M-1 to M-25), sizes, live pricing, and inventory.
            </p>
          </div>

          <button
            onClick={() => handleNewProduct()} 
            className="inline-flex items-center gap-2 bg-[#FEE815] hover:bg-[#FFF04B] text-stone-950 px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all shadow-sm hover:scale-[1.02] self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4 text-stone-950" />
            <span>+ Add New Artwork</span>
          </button>
        </div>

        {/* 4-Column KPI Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white border border-stone-200 p-3.5 rounded-2xl shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
              <Package className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Total Artworks</p>
              <p className="text-lg font-extrabold text-stone-900 font-serif leading-none mt-0.5">{products.length} Products</p>
            </div>
          </div>

          <div className="bg-white border border-stone-200 p-3.5 rounded-2xl shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Design Models</p>
              <p className="text-lg font-extrabold text-stone-900 font-serif leading-none mt-0.5">{totalModelsCount} Variations</p>
            </div>
          </div>

          <div className="bg-white border border-stone-200 p-3.5 rounded-2xl shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Ambient LED</p>
              <p className="text-lg font-extrabold text-stone-900 font-serif leading-none mt-0.5">{totalLedProducts} Illuminated</p>
            </div>
          </div>

          <div className="bg-white border border-stone-200 p-3.5 rounded-2xl shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Inventory Stock</p>
              <p className="text-lg font-extrabold text-stone-900 font-serif leading-none mt-0.5">{totalCatalogStock.toLocaleString()} In Stock</p>
            </div>
          </div>
        </div>


        {/* Frame Options & Stock Availability Card (Gold, Black & Stock Count) */}
        <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-stone-900 font-serif">
                    Frame Options & Stock Availability
                  </h3>
                  <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                    Live Storefront Sync
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  Configure live customer availability and real-time inventory counts for Gold and Black frame choices.
                </p>
              </div>
            </div>

            <button
              onClick={() => handleSaveFrameStock()}
              disabled={savingFrameStock}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer ${
                frameStockSavedSuccess
                  ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                  : 'bg-stone-900 text-amber-400 hover:bg-stone-800 active:scale-98'
              }`}
            >
              {savingFrameStock ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : frameStockSavedSuccess ? (
                <Check className="w-3.5 h-3.5 text-white" />
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>
                {savingFrameStock ? 'Saving Stock...' : frameStockSavedSuccess ? 'Stock Changes Saved!' : 'Save Frame Stock'}
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Rose Gold */}
            {(() => {
              const isGoldInStock = Boolean(frameStock.gold.inStock && frameStock.gold.stockCount > 0);
              return (
                <div className={`p-4 rounded-xl border transition-all ${
                  isGoldInStock
                    ? 'border-amber-300 bg-amber-50/40 shadow-xs'
                    : 'border-stone-200 bg-stone-50/60 opacity-80'
                }`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl bg-gradient-to-tr from-[#99772B] via-[#E6CA65] to-[#FEE815] border-2 border-amber-400 shadow-md flex items-center justify-center shrink-0">
                        <span className="w-5 h-5 rounded-md bg-stone-900/20 border border-white/40 shadow-inner" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-stone-900">{frameStock.gold.name || 'Rose Gold'}</h4>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            isGoldInStock
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : 'bg-rose-100 text-rose-800 border-rose-300'
                          }`}>
                            {isGoldInStock
                              ? `In Stock • ${frameStock.gold.stockCount.toLocaleString()} units`
                              : 'Out of Stock'}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          Rose Gold metallic finish • Unified warehouse stock (Single update for entire store)
                        </p>
                      </div>
                    </div>

                    {/* Stock Status Toggle */}
                    <button
                      type="button"
                      onClick={toggleGoldStock}
                      disabled={togglingGold || savingFrameStock}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${
                        isGoldInStock
                          ? 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                          : 'bg-stone-200 text-stone-600 border-stone-300 hover:bg-stone-300'
                      }`}
                    >
                      {togglingGold ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : isGoldInStock ? (
                        '✓ In Stock'
                      ) : (
                        '✕ Out of Stock'
                      )}
                    </button>
                  </div>

                  {/* Stock Quantity Controls */}
                  <div className="mt-4 pt-3 border-t border-stone-200/80 flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-stone-700">Stock Availability Count:</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateGoldCount(frameStock.gold.stockCount - 10, true)}
                        disabled={frameStock.gold.stockCount <= 0 || savingFrameStock}
                        className="w-8 h-8 rounded-lg bg-white border border-stone-200 text-stone-700 font-bold hover:bg-stone-100 flex items-center justify-center disabled:opacity-40 cursor-pointer shadow-2xs"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="0"
                        value={frameStock.gold.stockCount}
                        onChange={(e) => updateGoldCount(parseInt(e.target.value) || 0, false)}
                        onBlur={() => handleSaveFrameStock()}
                        className="w-24 px-2 py-1.5 bg-white border border-stone-300 rounded-lg text-center font-bold text-xs text-stone-900 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => updateGoldCount(frameStock.gold.stockCount + 10, true)}
                        disabled={savingFrameStock}
                        className="w-8 h-8 rounded-lg bg-white border border-stone-200 text-stone-700 font-bold hover:bg-stone-100 flex items-center justify-center cursor-pointer shadow-2xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* 2. Black */}
            {(() => {
              const isBlackInStock = Boolean(frameStock.black.inStock && frameStock.black.stockCount > 0);
              return (
                <div className={`p-4 rounded-xl border transition-all ${
                  isBlackInStock
                    ? 'border-stone-800 bg-stone-900 text-white shadow-xs'
                    : 'border-stone-200 bg-stone-50/60 opacity-80'
                }`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl bg-gradient-to-tr from-black via-stone-900 to-stone-800 border-2 border-stone-700 shadow-md flex items-center justify-center shrink-0">
                        <span className="w-5 h-5 rounded-md bg-stone-800 border border-stone-600 shadow-inner" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className={`font-bold text-sm ${isBlackInStock ? 'text-white' : 'text-stone-900'}`}>
                            {frameStock.black.name || 'Black'}
                          </h4>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            isBlackInStock
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          }`}>
                            {isBlackInStock
                              ? `In Stock • ${frameStock.black.stockCount.toLocaleString()} units`
                              : 'Out of Stock'}
                          </span>
                        </div>
                        <p className={`text-[11px] mt-0.5 ${isBlackInStock ? 'text-stone-400' : 'text-stone-500'}`}>
                          Matte Obsidian Profile • Unified warehouse stock (Single update for entire store)
                        </p>
                      </div>
                    </div>

                    {/* Stock Status Toggle */}
                    <button
                      type="button"
                      onClick={toggleBlackStock}
                      disabled={togglingBlack || savingFrameStock}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${
                        isBlackInStock
                          ? 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                          : 'bg-stone-700 text-stone-300 border-stone-600 hover:bg-stone-600'
                      }`}
                    >
                      {togglingBlack ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : isBlackInStock ? (
                        '✓ In Stock'
                      ) : (
                        '✕ Out of Stock'
                      )}
                    </button>
                  </div>

                  {/* Stock Quantity Controls */}
                  <div className={`mt-4 pt-3 border-t flex items-center justify-between gap-3 ${
                    isBlackInStock ? 'border-stone-800' : 'border-stone-200/80'
                  }`}>
                    <span className={`text-xs font-semibold ${isBlackInStock ? 'text-stone-300' : 'text-stone-700'}`}>
                      Stock Availability Count:
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateBlackCount(frameStock.black.stockCount - 10, true)}
                        disabled={frameStock.black.stockCount <= 0 || savingFrameStock}
                        className={`w-8 h-8 rounded-lg border font-bold flex items-center justify-center disabled:opacity-40 cursor-pointer shadow-2xs ${
                          isBlackInStock
                            ? 'bg-stone-800 border-stone-700 text-white hover:bg-stone-700'
                            : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="0"
                        value={frameStock.black.stockCount}
                        onChange={(e) => updateBlackCount(parseInt(e.target.value) || 0, false)}
                        onBlur={() => handleSaveFrameStock()}
                        className={`w-24 px-2 py-1.5 border rounded-lg text-center font-bold text-xs outline-none focus:ring-1 ${
                          isBlackInStock
                            ? 'bg-stone-800 border-stone-700 text-white focus:border-amber-400 focus:ring-amber-400'
                            : 'bg-white border-stone-300 text-stone-900 focus:border-amber-500 focus:ring-amber-500'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => updateBlackCount(frameStock.black.stockCount + 10, true)}
                        disabled={savingFrameStock}
                        className={`w-8 h-8 rounded-lg border font-bold flex items-center justify-center cursor-pointer shadow-2xs ${
                          isBlackInStock
                            ? 'bg-stone-800 border-stone-700 text-white hover:bg-stone-700'
                            : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Category Display Settings (Display in Live Website or Not) */}
          <div className="mt-6 pt-5 border-t border-stone-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-600" />
                  <h4 className="text-sm font-bold text-stone-900 font-serif">
                    Category Live Website Display
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    Per-Category Display Toggle
                  </span>
                </div>
                <p className="text-xs text-stone-500">
                  Choose separately for each category whether to display Frame Options (Gold &amp; Black) on the live website. Stock counts above remain unified for the entire store.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setAllCategoriesVisibility(true)}
                  disabled={savingFrameStock}
                  className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer shadow-2xs"
                >
                  ✓ Enable All
                </button>
                <button
                  type="button"
                  onClick={() => setAllCategoriesVisibility(false)}
                  disabled={savingFrameStock}
                  className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-stone-300 bg-stone-50 text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer shadow-2xs"
                >
                  ✕ Disable All
                </button>
              </div>
            </div>

            {/* Category Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {INITIAL_CATEGORIES.map((cat) => {
                const isSelectedCat = selectedCat === cat.slug;
                const visibility = frameStock.categoryVisibility || {};
                const isEnabled = visibility[cat.slug] !== undefined ? visibility[cat.slug] : true;
                const config = frameStock.categoryConfigs?.[cat.slug];
                const showGold = config?.showGold ?? true;
                const showBlack = config?.showBlack ?? true;
                const catProductsCount = products.filter(
                  (p) => p.categorySlug === cat.slug || p.categorySlugs?.includes(cat.slug)
                ).length;

                return (
                  <div
                    key={cat.id || cat.slug}
                    className={`relative p-3 rounded-xl border transition-all flex flex-col justify-between gap-2.5 ${
                      isSelectedCat
                        ? 'border-amber-400 bg-amber-50/60 shadow-xs ring-2 ring-amber-400/40'
                        : isEnabled
                        ? 'border-emerald-200 bg-white hover:border-emerald-300 shadow-2xs'
                        : 'border-stone-200 bg-stone-50/70 opacity-75'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-10 h-10 rounded-lg object-cover border border-stone-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <h5 className="font-bold text-xs text-stone-900 truncate" title={cat.name}>
                            {cat.name}
                          </h5>
                          <span className="text-[10px] text-stone-500 font-mono">
                            {catProductsCount} {catProductsCount === 1 ? 'artwork' : 'artworks'}
                          </span>
                        </div>
                      </div>

                      {/* Master Category Display Toggle Switch */}
                      <button
                        type="button"
                        onClick={() => toggleCategoryVisibility(cat.slug)}
                        disabled={savingFrameStock}
                        title={isEnabled ? `Disable frame options for ${cat.name}` : `Enable frame options for ${cat.name}`}
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                          isEnabled ? 'bg-emerald-600' : 'bg-stone-300'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                            isEnabled ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Status Pill & Frame Color Sub-toggles */}
                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] gap-1">
                      <span className={`font-semibold px-2 py-0.5 rounded-md border text-[9.5px] flex items-center gap-1 ${
                        isEnabled
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-stone-100 text-stone-600 border-stone-200'
                      }`}>
                        {isEnabled ? (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>Live: ON</span>
                          </>
                        ) : (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                            <span>Live: OFF</span>
                          </>
                        )}
                      </span>

                      {/* Sub-toggles for Gold and Black when Category is Enabled */}
                      {isEnabled ? (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => toggleCategoryFrameOption(cat.slug, 'gold')}
                            title={showGold ? 'Gold frame displayed in live store' : 'Gold frame hidden for this category'}
                            className={`px-1.5 py-0.5 rounded text-[9px] font-bold border transition-colors cursor-pointer ${
                              showGold
                                ? 'bg-amber-100 text-amber-900 border-amber-300'
                                : 'bg-stone-100 text-stone-400 border-stone-200 line-through'
                            }`}
                          >
                            Gold
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleCategoryFrameOption(cat.slug, 'black')}
                            title={showBlack ? 'Black frame displayed in live store' : 'Black frame hidden for this category'}
                            className={`px-1.5 py-0.5 rounded text-[9px] font-bold border transition-colors cursor-pointer ${
                              showBlack
                                ? 'bg-stone-900 text-white border-stone-700'
                                : 'bg-stone-100 text-stone-400 border-stone-200 line-through'
                            }`}
                          >
                            Black
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-stone-400 italic">Hidden on live site</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Clear Workspace Banner: When a specific category is selected */}
        {selectedCat && (
          <div className="bg-gradient-to-r from-amber-500/15 via-amber-400/5 to-white border-2 border-amber-400 rounded-3xl p-5 sm:p-6 shadow-sm space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#FEE815] text-stone-950 font-bold flex items-center justify-center shrink-0 shadow-xs border border-amber-400">
                  <Layers className="w-6 h-6 text-stone-900" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-950 font-black text-[10px] tracking-wider uppercase shadow-2xs">
                      Category Workspace Active
                    </span>
                    <span className="text-xs font-semibold text-stone-600">
                      Catalog Filter
                    </span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-800 border border-stone-200">
                      {filteredProducts.length} {filteredProducts.length === 1 ? 'Artwork' : 'Artworks'} in this category
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-serif font-black text-stone-950 mt-1 flex items-center gap-2 flex-wrap">
                    <span>Currently Editing Category:</span>
                    <span className="text-amber-900 bg-amber-100/70 px-2.5 py-0.5 rounded-lg border border-amber-300 underline decoration-amber-500 underline-offset-4">
                      {activeCategoryObj?.name || selectedCat}
                    </span>
                  </h2>
                  <p className="text-xs text-stone-600 mt-1 max-w-2xl leading-relaxed font-medium">
                    {activeCategoryObj?.description ||
                      'You are currently viewing and modifying artworks in this specific collection. All size additions, live prices, and inventory stock changes apply directly to this collection.'}
                  </p>

                  <div className="mt-2.5 flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-stone-700">Live Website Frame Option:</span>
                    <button
                      type="button"
                      onClick={() => toggleCategoryVisibility(selectedCat)}
                      disabled={savingFrameStock}
                      className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                        (frameStock.categoryVisibility?.[selectedCat] !== undefined ? frameStock.categoryVisibility[selectedCat] : true)
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                          : 'bg-stone-200 text-stone-700 border-stone-300 hover:bg-stone-300'
                      }`}
                    >
                      {(frameStock.categoryVisibility?.[selectedCat] !== undefined ? frameStock.categoryVisibility[selectedCat] : true)
                        ? '✓ Displayed in Live Store'
                        : '✕ Hidden in Live Store'}
                    </button>
                    <span className="text-[11px] text-stone-500">
                      (Unified frame stock applies storewide)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 self-stretch sm:self-auto flex-wrap">
                <button
                  type="button"
                  onClick={() => handleNewProduct(selectedCat)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#FEE815]" />
                  <span>Add Product to {activeCategoryObj?.name ? activeCategoryObj.name.split(' ')[0] : 'Category'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCategoryFilterChange('')}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 font-bold text-xs transition-all cursor-pointer shadow-2xs"
                  title="Show All Products Across All Categories"
                >
                  <X className="w-4 h-4 text-stone-500" />
                  <span>Clear Category Filter</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Smart Toolbar: Search, Filters, Tabs & View Switcher */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search artworks, deities, sizes, slugs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-amber-500 text-xs text-stone-900 placeholder-stone-400"
              />
            </div>

            {/* Category Dropdown & View Mode Switcher */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={selectedCat}
                  onChange={(e) => handleCategoryFilterChange(e.target.value)}
                  className={`px-3 py-2 rounded-xl outline-none text-xs transition-all cursor-pointer ${
                    selectedCat
                      ? 'bg-amber-100/90 border-2 border-amber-500 text-amber-950 font-bold shadow-2xs pr-7'
                      : 'bg-stone-50 border border-stone-200 text-stone-900 font-medium'
                  }`}
                >
                  <option value="">All Categories ({INITIAL_CATEGORIES.length})</option>
                  {INITIAL_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {selectedCat && (
                  <button
                    type="button"
                    onClick={() => handleCategoryFilterChange('')}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-0.5 hover:bg-amber-200 rounded-full text-amber-900 transition-colors cursor-pointer"
                    title="Clear category filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* View Switcher: Table vs Grid */}
              <div className="flex items-center bg-stone-100 p-0.5 rounded-xl border border-stone-200 shrink-0">
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === 'table'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                  title="Compact Table View"
                >
                  <List className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Table</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                  title="Visual Cards Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-semibold border-t border-stone-100 pt-2.5">
            {[
              { id: 'all', label: `All Artworks (${products.length})` },
              { id: 'led', label: `✨ Ambient LED (${totalLedProducts})` },
              { id: 'acrylic', label: `Pure Acrylic (${products.length - totalLedProducts})` },
              { id: 'trending', label: `🔥 Trending / Bestsellers` },
              { id: 'low-stock', label: `⚠️ Low Stock` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterTab(tab.id as any)}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  filterTab === tab.id
                    ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300'
                    : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content View: Table or Grid */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-xs text-stone-500">
            <Loader2 className="w-6 h-6 animate-spin text-amber-500 mx-auto mb-2" />
            <p>Loading artworks catalog...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-xs text-stone-500 space-y-3">
            <p className="font-bold text-stone-800 text-base">
              {selectedCat
                ? `No artworks found in "${activeCategoryObj?.name || selectedCat}"`
                : 'No artworks found'}
            </p>
            <p className="text-stone-500 max-w-md mx-auto">
              {selectedCat
                ? 'There are currently no artworks matching this category filter or search query.'
                : 'Try adjusting your search query or category filters.'}
            </p>
            {selectedCat && (
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleNewProduct(selectedCat)}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold text-xs inline-flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#FEE815]" />
                  <span>Add First Product to {activeCategoryObj?.name || 'Category'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCategoryFilterChange('')}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-bold text-xs transition-all cursor-pointer"
                >
                  View All Products
                </button>
              </div>
            )}
          </div>
        ) : viewMode === 'table' ? (
          /* 1. Sleek Modern Table View */
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4 w-[360px]">Product Artwork</th>
                    <th className="py-3 px-4">Category &amp; Style</th>
                    <th className="py-3 px-4 w-[280px]">Pricing &amp; Sizes</th>
                    <th className="py-3 px-4 text-center">Stock</th>
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
                    const isExpanded = expandedSizesSlug === prod.slug;
                    const minPrice = primaryVariants.length > 0
                      ? Math.min(...primaryVariants.map((v) => v.price))
                      : prod.basePrice;
                    const maxPrice = primaryVariants.length > 0
                      ? Math.max(...primaryVariants.map((v) => v.price))
                      : prod.basePrice;

                    return (
                      <tr key={prod.id} className="hover:bg-amber-50/20 transition-colors">
                        {/* Artwork Thumbnail & Details */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative shrink-0 w-14 h-14 rounded-xl overflow-hidden border border-stone-200 bg-stone-100 shadow-2xs group/thumb">
                              <img
                                src={prod.images[0]}
                                alt={prod.title}
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                                }}
                                className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-200"
                              />
                              {prod.images.length > 1 && (
                                <span
                                  className="absolute bottom-1 right-1 bg-black/75 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full"
                                  title={`${prod.images.length} photos in carousel`}
                                >
                                  {prod.images.length}
                                </span>
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="font-extrabold text-stone-900 text-xs truncate max-w-xs" title={prod.title}>
                                {prod.title}
                              </p>
                              <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-stone-500 mt-1">
                                <span className="text-amber-800 font-bold bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded text-[10px] flex items-center gap-0.5">
                                  <span>{prod.models?.length || 25} Models</span>
                                  <span className="text-amber-500">🔥</span>
                                </span>
                                <span className="font-mono text-[10px] text-stone-400 truncate max-w-[140px]" title={prod.slug}>
                                  {prod.slug}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Category & Style */}
                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            <span className="font-semibold text-stone-800 text-xs block truncate max-w-[150px]">
                              {prod.categoryName}
                            </span>
                            {prod.hasLedBacklight ? (
                              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-300 font-bold px-2 py-0.5 rounded text-[10px] shadow-2xs">
                                <Sparkles className="w-3 h-3 text-amber-600" />
                                <span>Ambient LED</span>
                              </span>
                            ) : (
                              <span className="inline-block bg-stone-100 text-stone-600 border border-stone-200 px-2 py-0.5 rounded text-[10px]">
                                Pure Acrylic
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Pricing & Configured Sizes (Compact Dropdown Pill) */}
                        <td className="py-3 px-4">
                          <div className="space-y-1.5">
                            <div className="flex items-baseline gap-2">
                              <span className="font-serif font-extrabold text-stone-950 text-sm">
                                ₹{minPrice.toLocaleString('en-IN')}
                              </span>
                              {maxPrice > minPrice && (
                                <span className="text-stone-400 text-[11px] font-sans">
                                  – ₹{maxPrice.toLocaleString('en-IN')}
                                </span>
                              )}
                            </div>

                            {/* Collapsible Sizes Dropdown Pill */}
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => setExpandedSizesSlug(isExpanded ? null : prod.slug)}
                                className="px-2 py-0.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-700 font-bold text-[10.5px] rounded-md transition-colors cursor-pointer flex items-center gap-1"
                                title="Click to view/hide all configured sizes"
                              >
                                <span>{primaryVariants.length} Sizes</span>
                                {isExpanded ? <ChevronUp className="w-3 h-3 text-stone-500" /> : <ChevronDown className="w-3 h-3 text-stone-500" />}
                              </button>

                              <button
                                type="button"
                                onClick={() => handleOpenQuickAddSize(prod)}
                                className="px-1.5 py-0.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-[10.5px] font-bold rounded-md transition-colors cursor-pointer flex items-center gap-0.5"
                                title="Add another size to this product"
                              >
                                <Plus className="w-3 h-3 text-amber-700" />
                                <span>Size</span>
                              </button>
                            </div>

                            {/* Expanded Size Pills */}
                            {isExpanded && (
                              <div className="p-2 bg-stone-50 border border-stone-200 rounded-xl space-y-1 mt-1 text-[10.5px]">
                                {primaryVariants.map((v, i) => (
                                  <div key={i} className="flex items-center justify-between gap-2 border-b border-stone-100 last:border-0 pb-0.5">
                                    <span className="font-medium text-stone-700 truncate max-w-[130px]" title={v.size}>
                                      {formatSizeWithSqFt(v.size)}
                                    </span>
                                    <span className="font-bold font-serif text-amber-800">
                                      ₹{v.price.toLocaleString('en-IN')}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Stock Status */}
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border shadow-2xs ${
                              totalStock > 10
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : totalStock > 0
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : 'bg-rose-50 text-rose-800 border-rose-300'
                            }`}
                          >
                            {totalStock} in stock
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleEditProduct(prod)}
                              className="px-3 py-1.5 text-xs font-bold bg-[#FEE815] hover:bg-[#FFF04B] text-stone-950 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                              title="Edit Artwork, Models & Pricing"
                            >
                              <Edit2 className="w-3.5 h-3.5 text-stone-950" />
                              <span>Edit</span>
                            </button>

                            <Link
                              href={`/product/${prod.slug}`}
                              target="_blank"
                              className="p-1.5 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
                              title="View Live on Storefront"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>

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
          </div>
        ) : (
          /* 2. Visual Cards Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((prod) => {
              const primaryVariants =
                prod.variants && prod.variants.length > 0
                  ? prod.variants
                  : getDefault4Variants(prod.basePrice, prod.baseMrp);
              const totalStock = primaryVariants.reduce((acc, v) => acc + (v.stockCount || 0), 0);
              const minPrice = primaryVariants.length > 0
                ? Math.min(...primaryVariants.map((v) => v.price))
                : prod.basePrice;

              return (
                <div
                  key={prod.id}
                  className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group"
                >
                  {/* Card Thumbnail */}
                  <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
                    <img
                      src={prod.images[0]}
                      alt={prod.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Lighting Badge */}
                    <div className="absolute top-2 left-2">
                      {prod.hasLedBacklight ? (
                        <span className="bg-amber-500 text-stone-950 font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>LED Glow</span>
                        </span>
                      ) : (
                        <span className="bg-white/90 backdrop-blur-xs text-stone-700 font-bold text-[10px] px-2 py-0.5 rounded-full shadow-xs">
                          Pure Acrylic
                        </span>
                      )}
                    </div>

                    {/* Models Count Badge */}
                    <div className="absolute top-2 right-2">
                      <span className="bg-black/75 backdrop-blur-xs text-amber-400 font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-xs flex items-center gap-0.5">
                        <span>{prod.models?.length || 25} Models</span>
                        <span>🔥</span>
                      </span>
                    </div>

                    {/* Photos Count */}
                    {prod.images.length > 1 && (
                      <div className="absolute bottom-2 right-2">
                        <span className="bg-black/70 backdrop-blur-xs text-white font-bold text-[9px] px-1.5 py-0.2 rounded-full">
                          {prod.images.length} Photos
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <p className="text-[10.5px] font-semibold text-stone-400 uppercase tracking-wider">{prod.categoryName}</p>
                      <h4 className="font-extrabold text-stone-900 text-sm leading-snug line-clamp-2 mt-0.5" title={prod.title}>
                        {prod.title}
                      </h4>
                    </div>

                    <div className="pt-2 border-t border-stone-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] text-stone-400">Starting from</p>
                          <p className="font-serif font-extrabold text-stone-950 text-base">
                            ₹{minPrice.toLocaleString('en-IN')}
                          </p>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            totalStock > 10
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : 'bg-amber-50 text-amber-800 border-amber-300'
                          }`}
                        >
                          {totalStock} in stock
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 pt-1">
                        <button
                          type="button"
                          onClick={() => handleEditProduct(prod)}
                          className="flex-1 py-1.5 px-2 bg-[#FEE815] hover:bg-[#FFF04B] text-stone-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-2xs"
                        >
                          <Edit2 className="w-3 h-3 text-stone-950" />
                          <span>Edit Artwork</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenQuickAddSize(prod)}
                          className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition-colors cursor-pointer"
                          title="Add Size"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>

                        <Link
                          href={`/product/${prod.slug}`}
                          target="_blank"
                          className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition-colors"
                          title="Preview"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal: Add / Edit Product (Light Theme with White Background) */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-7 shadow-2xl border border-stone-200 my-8 max-h-[92vh] overflow-y-auto text-stone-900">
              {/* Modal Header with Clear Category Display */}
              <div className="border-b border-stone-200 pb-4 mb-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300 font-black text-[10.5px] uppercase tracking-wider flex items-center gap-1.5 shadow-2xs">
                        <Tag className="w-3 h-3 text-amber-800" />
                        Category: {formData.categoryName || 'Acrylic Photo Frames'}
                      </span>
                      {selectedCat && selectedCat !== formData.categorySlug && (
                        <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200 text-[10px] font-medium">
                          Workspace Filter: {activeCategoryObj?.name || selectedCat}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900">
                      {editingSlug ? (
                        <span>
                          Editing Artwork in &ldquo;<span className="text-amber-800">{formData.categoryName}</span>&rdquo;
                        </span>
                      ) : (
                        <span>
                          Add New Artwork to &ldquo;<span className="text-amber-800">{formData.categoryName}</span>&rdquo;
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Configure artwork details, assign categories, manage 4 standard sizes, selling prices, and inventory stock.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors cursor-pointer shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Category Confirmation Card */}
                <div className="bg-gradient-to-r from-amber-50 via-amber-100/40 to-stone-50 border border-amber-200/90 rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-bold shrink-0">
                      <Layers className="w-4 h-4 text-stone-900" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                        Assigned Storefront Collection
                      </p>
                      <p className="text-xs font-bold text-stone-900">
                        {formData.categoryName} <span className="font-mono text-[11px] font-normal text-stone-500">({formData.categorySlug})</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10.5px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Live Store Collection Mapped
                    </span>
                  </div>
                </div>
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
                        onChange={(e) => {
                          const newTitle = e.target.value;
                          const toSlug = (s: string) =>
                            s
                              .toLowerCase()
                              .trim()
                              .replace(/[^\w\s-]/g, '')
                              .replace(/[\s_-]+/g, '-')
                              .replace(/^-+|-+$/g, '');
                          setFormData((prev) => ({
                            ...prev,
                            title: newTitle,
                            slug: !editingSlug && (!prev.slug || prev.slug === toSlug(prev.title)) ? toSlug(newTitle) : prev.slug,
                          }));
                        }}
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
                        onChange={(e) => {
                          const sanitized = e.target.value
                            .toLowerCase()
                            .replace(/[\s_-]+/g, '-')
                            .replace(/[^\w-]/g, '');
                          setFormData({ ...formData, slug: sanitized });
                        }}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl outline-none font-mono text-xs text-stone-900 placeholder-stone-400"
                        placeholder="e.g. tirupati-balaji-divine-blessings"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="font-semibold text-stone-800 block">Primary Category *</label>
                        <span className="text-[10px] font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-md">
                          Selected: {formData.categoryName}
                        </span>
                      </div>
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
                        className="w-full px-3 py-2 bg-white border-2 border-stone-300 focus:border-amber-500 rounded-xl outline-none text-xs text-stone-900 font-medium"
                      >
                        {INITIAL_CATEGORIES.map((c) => (
                          <option key={c.id} value={c.slug} className="bg-white text-stone-900">
                            {c.name}
                          </option>
                        ))}
                      </select>
                      <p className="text-[11px] text-stone-500 mt-1">
                        This product is published under the <strong className="text-stone-900 font-bold">{formData.categoryName}</strong> collection on the website.
                      </p>
                    </div>

                    {/* Main Product Cover Image */}
                    <div className="md:col-span-2 border border-stone-200 rounded-2xl p-4 bg-stone-50/70 space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                            <ImageIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <label className="font-bold text-stone-900 text-sm block">
                              Main Product Cover Image
                            </label>
                            <p className="text-[11px] text-stone-500">
                              Primary product cover image. (Model variations and their artwork images are managed below).
                            </p>
                          </div>
                        </div>

                        <div>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleMainCoverImageUpload}
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadingImage}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-stone-900 hover:bg-stone-800 text-white rounded-xl shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
                          >
                            {uploadingImage ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                                <span>{uploadProgressText || 'Uploading...'}</span>
                              </>
                            ) : (
                              <>
                                <Upload className="w-3.5 h-3.5 text-amber-400" />
                                <span>Upload Main Cover Image</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-3.5 rounded-xl border border-stone-200">
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-stone-100 border-2 border-amber-400 shadow-sm shrink-0">
                          <img
                            src={formData.images[0] || formData.imageUrl || '/images/placeholder.jpg'}
                            alt="Main product cover"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                            }}
                          />
                          <span className="absolute bottom-1 right-1 bg-amber-500 text-stone-950 text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                            ★ Main Cover
                          </span>
                        </div>

                        <div className="flex-1 w-full space-y-1.5">
                          <label className="text-[11px] font-bold text-stone-700 block">
                            Main Image URL or Path:
                          </label>
                          <input
                            type="text"
                            value={formData.images[0] || formData.imageUrl || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                images: [val],
                                imageUrl: val,
                              }));
                            }}
                            placeholder="/images/... or https://..."
                            className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none font-mono text-xs text-stone-900 focus:border-amber-500 focus:bg-white transition-colors"
                          />
                          <p className="text-[10px] text-stone-500">
                            Enter an image path or click &quot;Upload Main Cover Image&quot; to pick from your computer.
                          </p>
                        </div>
                      </div>
                    </div>

                  <div className="sm:col-span-2">
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
              </div>

                {/* 2. Models & Design Variations Manager (M-1 to M-25 / M-30) */}
                <div className="space-y-4 pt-5 border-t border-stone-200">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                        <Flame className="w-4 h-4 text-amber-500" />
                        <span>Design Models &amp; Variations (M-1 to M-25 / M-30)</span>
                        <span className="text-[10px] text-stone-700 font-semibold bg-stone-100 border border-stone-300 px-2 py-0.5 rounded-full font-mono">
                          {formData.models?.length || 0} Models Active
                        </span>
                      </h4>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Add a distinct image for every model design. Customers switch between designs on the product page.
                      </p>
                    </div>

                    {/* Quick Action Helpers */}
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Bulk upload different images for models */}
                      <label
                        htmlFor="bulk-models-input"
                        className="px-2.5 py-1.5 rounded-lg bg-[#262626] hover:bg-black text-white text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                        title="Select multiple images from computer to automatically assign each image to M-1, M-2, M-3..."
                      >
                        <Upload className="w-3.5 h-3.5 text-amber-400" />
                        <span>+ Bulk Upload Images for Models</span>
                        <input
                          type="file"
                          id="bulk-models-input"
                          multiple
                          accept="image/*"
                          ref={bulkModelFileInputRef}
                          className="hidden"
                          onChange={handleBulkModelImagesUpload}
                        />
                      </label>

                      <button
                        type="button"
                        onClick={handleAutoGenerate25Models}
                        className="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                        title="Reset or auto-populate standard 25 models"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>Sync 25 Models</span>
                      </button>

                      {formData.models && formData.models.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, models: [] }))}
                          className="px-2 py-1.5 rounded-lg text-stone-500 hover:text-red-600 hover:bg-red-50 text-[11px] transition-colors cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Add Single Model Bar */}
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
                    <div className="text-[11px] font-bold text-stone-700 flex items-center justify-between">
                      <span>Add Individual Model:</span>
                      <span className="text-stone-400 font-normal">Enter ID and image URL or upload directly</span>
                    </div>
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                      <input
                        type="text"
                        placeholder="Model ID (e.g. M-26)"
                        value={newModelName}
                        onChange={(e) => setNewModelName(e.target.value)}
                        className="w-28 sm:w-32 bg-white border border-stone-300 focus:border-amber-500 rounded-lg px-2.5 py-1.5 text-xs font-bold text-stone-900 outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Model Artwork URL / Path..."
                        value={newModelImage}
                        onChange={(e) => setNewModelImage(e.target.value)}
                        className="flex-1 bg-white border border-stone-300 focus:border-amber-500 rounded-lg px-2.5 py-1.5 text-xs text-stone-900 outline-none"
                      />
                      <label className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-semibold text-stone-700 cursor-pointer shrink-0">
                        <input
                          type="checkbox"
                          checked={newModelPopular}
                          onChange={(e) => setNewModelPopular(e.target.checked)}
                          className="rounded text-amber-500 focus:ring-amber-400"
                        />
                        <span>Trending 🔥</span>
                      </label>
                      <button
                        type="button"
                        onClick={handleAddModel}
                        className="px-3.5 py-1.5 rounded-lg bg-[#262626] hover:bg-black text-white font-bold text-xs shrink-0 cursor-pointer flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Model</span>
                      </button>
                    </div>
                  </div>

                  {/* Models Cards Grid with Individual Image Upload & URL editing */}
                  {formData.models && formData.models.length > 0 ? (
                    <div className="grid grid-cols-2 min-[480px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2.5 max-h-[460px] overflow-y-auto pr-1">
                      {formData.models.map((model, idx) => (
                        <div
                          key={model.id || idx}
                          className={`p-2 rounded-xl border relative group flex flex-col items-center text-center transition-all ${
                            model.isPopular
                              ? 'border-amber-400 bg-amber-50/50 shadow-xs ring-1 ring-amber-300'
                              : 'border-stone-200 bg-white hover:border-stone-400'
                          }`}
                        >
                          {/* Thumbnail preview with 1-click Upload / Replace Image */}
                          <div className="w-full aspect-[4/5] rounded-lg overflow-hidden bg-stone-100 border border-stone-200 mb-1.5 relative group/img">
                            <img
                              src={model.image}
                              alt={model.name}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                              }}
                              className="w-full h-full object-cover"
                            />

                            {/* Loading state while uploading image for this specific model */}
                            {uploadingModelIdx === idx && (
                              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white z-20">
                                <Loader2 className="w-5 h-5 animate-spin text-amber-400 mb-1" />
                                <span className="text-[9px] font-bold">Uploading...</span>
                              </div>
                            )}

                            {/* Hover overlay with Upload & Delete buttons */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-1.5 z-10 p-1">
                              <label
                                htmlFor={`model-overlay-upload-${idx}`}
                                className="p-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold cursor-pointer transition-colors shadow-xs"
                                title="Upload new image from computer for this model"
                              >
                                <Upload className="w-3.5 h-3.5" />
                                <input
                                  type="file"
                                  id={`model-overlay-upload-${idx}`}
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => e.target.files?.[0] && handleSingleModelImageUpload(idx, e.target.files[0])}
                                />
                              </label>

                              <button
                                type="button"
                                onClick={() => handleRemoveModel(idx)}
                                className="p-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white cursor-pointer transition-colors shadow-xs"
                                title={`Delete Model ${model.name}`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Model info & actions */}
                          <div className="w-full flex items-center justify-between text-xs">
                            <input
                              type="text"
                              value={model.name}
                              onChange={(e) => handleUpdateModelField(idx, 'name', e.target.value.toUpperCase())}
                              className="font-extrabold text-stone-900 text-xs w-16 bg-transparent hover:bg-stone-100 focus:bg-white border-b border-transparent focus:border-amber-500 outline-none"
                              title="Edit model code"
                            />
                            <button
                              type="button"
                              onClick={() => handleToggleModelPopular(idx)}
                              className={`p-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                                model.isPopular
                                  ? 'text-amber-600 hover:text-amber-800'
                                  : 'text-stone-300 hover:text-amber-500'
                              }`}
                              title={model.isPopular ? 'Trending / Hot active (Click to toggle)' : 'Mark as Trending'}
                            >
                              🔥
                            </button>
                          </div>

                          {/* Editable Image URL / Path box */}
                          <div className="w-full mt-1">
                            <input
                              type="text"
                              value={model.image}
                              onChange={(e) => handleUpdateModelField(idx, 'image', e.target.value)}
                              placeholder="Image URL / Path..."
                              className="w-full text-[9px] px-1.5 py-0.5 border border-stone-200 rounded font-mono truncate bg-stone-50 hover:bg-white focus:bg-white focus:border-amber-500 outline-none"
                              title={model.image}
                            />
                          </div>

                          {/* 1-Click Upload Button for this Model */}
                          <label
                            htmlFor={`model-btn-upload-${idx}`}
                            className="w-full mt-1 py-1 px-1.5 rounded-md bg-stone-100 hover:bg-amber-50 hover:border-amber-300 border border-stone-200 text-stone-700 hover:text-amber-900 text-[9.5px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-all"
                            title="Upload image from computer for this model"
                          >
                            <Camera className="w-3 h-3 text-amber-600" />
                            <span>Upload Image</span>
                            <input
                              type="file"
                              id={`model-btn-upload-${idx}`}
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => e.target.files?.[0] && handleSingleModelImageUpload(idx, e.target.files[0])}
                            />
                          </label>

                          {/* Order controls */}
                          <div className="flex items-center justify-between w-full mt-1 pt-1 border-t border-stone-100 text-[10px] text-stone-500">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => handleMoveModel(idx, 'left')}
                              className="px-1 text-stone-500 hover:text-stone-900 disabled:opacity-30 cursor-pointer"
                              title="Move model earlier"
                            >
                              ←
                            </button>
                            <span className="font-mono text-[9px] text-stone-400">#{idx + 1}</span>
                            <button
                              type="button"
                              disabled={idx === formData.models.length - 1}
                              onClick={() => handleMoveModel(idx, 'right')}
                              className="px-1 text-stone-500 hover:text-stone-900 disabled:opacity-30 cursor-pointer"
                              title="Move model later"
                            >
                              →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl border border-dashed border-stone-300 text-center text-stone-500 text-xs">
                      <p>No custom models configured. Click below to automatically generate 25 standard models:</p>
                      <button
                        type="button"
                        onClick={handleAutoGenerate25Models}
                        className="mt-2 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>+ Generate 25 Models for this Artwork</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* 3. Sizes & Dynamic Pricing Engine */}
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
                        className="px-3 py-1.5 rounded-xl border border-amber-500 bg-[#FEE815] hover:bg-[#FFF04B] text-stone-950 text-[11px] font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
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

                  {/* Automated Custom Size Pricing Engine Notice */}
                  <div className="p-3 bg-emerald-50/80 border border-emerald-200/90 rounded-2xl flex items-start gap-2.5 text-xs text-emerald-950 shadow-2xs">
                    <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      <strong>Automated Custom Size Pricing Engine:</strong> When customers select &ldquo;Custom Size&rdquo; on the storefront and enter custom width &amp; height dimensions, their price is automatically calculated and proportionally calibrated based on these sizes and prices you configure.
                    </p>
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
                              <span className="w-4 h-4 rounded-full bg-[#FEE815] text-stone-950 text-[10px] flex items-center justify-center font-bold">
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
                                Dimensions (sq.ft)
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. 1.5 sq.ft"
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
                    className="px-6 py-2.5 bg-[#FEE815] hover:bg-[#FFF04B] disabled:opacity-50 text-stone-950 rounded-xl font-extrabold transition-all shadow-md cursor-pointer flex items-center gap-1.5 text-xs border border-amber-500 uppercase tracking-wider"
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
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[9.5px] font-bold uppercase text-amber-900 bg-amber-100 border border-amber-300 px-1.5 py-0.2 rounded">
                      {quickSizeProduct.categoryName}
                    </span>
                  </div>
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
                            ? 'bg-[#FEE815] border-amber-600 text-stone-950 font-bold shadow-xs'
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
                      onChange={(e) => { const val = e.target.value; setQuickSizeName(val); const sq = getSqFt(val); if (sq) setQuickSizeCm(sq); }}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-medium text-stone-900 focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                      Dimensions (sq.ft)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 1.5 sq.ft"
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
                    className="px-5 py-2 bg-[#FEE815] hover:bg-[#FFF04B] disabled:opacity-50 text-stone-950 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer border border-amber-500"
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

export default function AdminProductsPage() {
  return (
    <Suspense
      fallback={
        <AdminLayout>
          <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center text-xs text-stone-500 max-w-7xl mx-auto mt-6">
            <Loader2 className="w-6 h-6 animate-spin text-amber-500 mx-auto mb-2" />
            <p>Loading Product Management Catalog...</p>
          </div>
        </AdminLayout>
      }
    >
      <AdminProductsContent />
    </Suspense>
  );
}
