'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  X,
  Upload,
  Camera,
  Sparkles,
  Check,
  CheckCircle2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Ruler,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Plus,
  AlertCircle,
  Images,
  Layers,
} from 'lucide-react';
import { Product, ProductVariant, FrameStockSettings } from '@/types';
import { INITIAL_SETTINGS } from '@/lib/data/settings';
import CustomSizeInput from './CustomSizeInput';
import { calculateCustomDimensions } from '@/lib/utils/customSize';
import { useCart } from '@/context/CartContext';
import { compressImageToDataUrl } from '@/lib/utils/imageCompress';

const MAX_PHOTOS = 10;

export interface PhotoSpecification {
  variant: ProductVariant;
  frame?: 'gold' | 'black' | 'without';
  isCustomSize: boolean;
  customWidth: number;
  customHeight: number;
  customText: string;
}

export interface UploadedPhoto {
  id: string;
  preview: string;
  cdnUrl: string | null;
  name: string;
  isUploading?: boolean;
  specs: PhotoSpecification;
}

interface AddPhotoModalProps {
  product: Product;
  selectedVariant?: ProductVariant;
  initialFrame?: 'gold' | 'black' | 'without';
  showFrameOption?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export default function AddPhotoModal({
  product,
  selectedVariant: initialVariant,
  initialFrame = 'gold',
  showFrameOption: showFrameOptionProp,
  isOpen,
  onClose,
}: AddPhotoModalProps) {
  const router = useRouter();
  const { addToCart, addMultipleToCart, openCart } = useCart();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultVariant = product.variants[0] || {
    id: 'default',
    size: 'Standard',
    dimensionsCm: '30 x 45 cm',
    finish: 'Acrylic Ultra-Gloss',
    lighting: product.hasLedBacklight ? 'LED Backlit (12V Adapter)' : 'No Lighting (Pure Art)',
    price: product.basePrice,
    mrp: product.baseMrp,
    sku: 'AG-DEF',
    inStock: true,
    stockCount: 20,
  };

  const [activeVariant, setActiveVariant] = useState<ProductVariant>(
    initialVariant || product.variants[0] || defaultVariant
  );
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [limitWarning, setLimitWarning] = useState<string | null>(null);
  const [appliedAllNotice, setAppliedAllNotice] = useState(false);
  const [customText, setCustomText] = useState('');
  const [selectedFrame, setSelectedFrame] = useState<'gold' | 'black' | 'without'>(initialFrame || 'gold');
  const [frameStock, setFrameStock] = useState<FrameStockSettings>(
    INITIAL_SETTINGS.frameStock || {
      gold: { name: 'Rose Gold', inStock: true, stockCount: 850 },
      black: { name: 'Black', inStock: true, stockCount: 720 },
    }
  );

  useEffect(() => {
    fetch('/api/settings?t=' + Date.now(), { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings?.frameStock) {
          setFrameStock(data.settings.frameStock);
        }
      })
      .catch(() => {});
  }, []);

  const isRotatingLamp = useMemo(() => {
    const catSlug = product.categorySlug?.toLowerCase();
    const catSlugs = (product.categorySlugs || []).map((s) => s.toLowerCase());
    return Boolean(
      catSlug === '360-rotating-photo-lamps' ||
      catSlug === 'rotating-photo-lamps' ||
      catSlugs.includes('360-rotating-photo-lamps') ||
      catSlugs.includes('rotating-photo-lamps') ||
      product.slug?.toLowerCase().includes('rotating') ||
      product.title?.toLowerCase().includes('rotating')
    );
  }, [product.categorySlug, product.categorySlugs, product.slug, product.title]);

  const isCategoryFrameEnabled = useMemo(() => {
    if (showFrameOptionProp !== undefined) return showFrameOptionProp;
    const catSlug = product.categorySlug;
    const catSlugs = product.categorySlugs || [];
    const visibility = frameStock?.categoryVisibility;
    if (visibility) {
      if (catSlug && visibility[catSlug] !== undefined) return Boolean(visibility[catSlug]);
      for (const s of catSlugs) {
        if (visibility[s] !== undefined) return Boolean(visibility[s]);
      }
    }
    const configs = frameStock?.categoryConfigs;
    if (configs) {
      if (catSlug && configs[catSlug] !== undefined) return Boolean(configs[catSlug]?.enabled);
      for (const s of catSlugs) {
        if (configs[s] !== undefined) return Boolean(configs[s]?.enabled);
      }
    }
    if (catSlug === '360-rotating-photo-lamps' || catSlugs.includes('360-rotating-photo-lamps')) return false;
    if (catSlug === 'glitter-photo-frames' || catSlugs.includes('glitter-photo-frames')) return false;
    return true;
  }, [showFrameOptionProp, product.categorySlug, product.categorySlugs, frameStock]);

  const isGoldOutOfStock = Boolean(!frameStock.gold?.inStock || (frameStock.gold?.stockCount ?? 0) <= 0);
  const isBlackOutOfStock = Boolean(!frameStock.black?.inStock || (frameStock.black?.stockCount ?? 0) <= 0);
  const hasOutOfStockFrame = isCategoryFrameEnabled ? (
    photos.length > 0
      ? photos.some((p) => {
          const frame = p.specs?.frame || selectedFrame;
          return (frame === 'gold' && isGoldOutOfStock) || (frame === 'black' && isBlackOutOfStock);
        })
      : (selectedFrame === 'gold' && isGoldOutOfStock) || (selectedFrame === 'black' && isBlackOutOfStock)
  ) : false;

  // Auto-switch to in-stock frame if active frame is out of stock
  useEffect(() => {
    if (selectedFrame === 'gold' && isGoldOutOfStock && !isBlackOutOfStock) {
      setSelectedFrame('black');
      setPhotos((prev) =>
        prev.map((p) => ({
          ...p,
          specs: { ...p.specs, frame: 'black' },
        }))
      );
    } else if (selectedFrame === 'black' && isBlackOutOfStock && !isGoldOutOfStock) {
      setSelectedFrame('gold');
      setPhotos((prev) =>
        prev.map((p) => ({
          ...p,
          specs: { ...p.specs, frame: 'gold' },
        }))
      );
    }
  }, [frameStock, isGoldOutOfStock, isBlackOutOfStock]);



  React.useEffect(() => {
    if (initialFrame) {
      setSelectedFrame(initialFrame);
    }
  }, [initialFrame]);
  const [ledEnabled] = useState(product.hasLedBacklight);
  const [isDragging, setIsDragging] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [isCustomSize, setIsCustomSize] = useState(false);

// Ensure custom size is disabled for 360 rotating lamps
  useEffect(() => {
    if (isRotatingLamp && isCustomSize) {
      setIsCustomSize(false);
    }
  }, [isRotatingLamp, isCustomSize]);
  const [customWidth, setCustomWidth] = useState<number>(24);
  const [customHeight, setCustomHeight] = useState<number>(36);

  // Sync if initialVariant changes
  React.useEffect(() => {
    if (initialVariant) {
      setActiveVariant(initialVariant);
    }
  }, [initialVariant]);

  // Keep activePhotoIndex within bounds
  React.useEffect(() => {
    if (photos.length === 0) {
      setActivePhotoIndex(0);
    } else if (activePhotoIndex >= photos.length) {
      setActivePhotoIndex(photos.length - 1);
    }
  }, [photos.length, activePhotoIndex]);

  // Global fallback custom size calculation
  const customSizeCalc = React.useMemo(() => {
    return calculateCustomDimensions(customWidth, customHeight, {
      hasLed: ledEnabled,
      frameType: activeVariant.finish,
      variants: product.variants,
      basePrice: product.basePrice,
      baseMrp: product.baseMrp,
    });
  }, [customWidth, customHeight, ledEnabled, activeVariant.finish, product.variants, product.basePrice, product.baseMrp]);

  const activePrice = isCustomSize ? customSizeCalc.price : (activeVariant.price || product.basePrice);
  const activeMrp = isCustomSize ? customSizeCalc.mrp : (activeVariant.mrp || product.baseMrp);
  const activeSizeLabel = isCustomSize
    ? `${customSizeCalc.widthInches}" × ${customSizeCalc.heightInches}" (${customSizeCalc.dimensionsCm}) [Custom Size]`
    : activeVariant.size;

  // Helper function to extract specs & calculate pricing for any photo
  const getPhotoDetails = (photo: UploadedPhoto) => {
    const specs = photo.specs || {
      variant: activeVariant,
      frame: selectedFrame,
      isCustomSize,
      customWidth,
      customHeight,
      customText,
    };

    if (specs.isCustomSize) {
      const calc = calculateCustomDimensions(specs.customWidth, specs.customHeight, {
        hasLed: ledEnabled,
        frameType: specs.variant.finish,
        variants: product.variants,
        basePrice: product.basePrice,
        baseMrp: product.baseMrp,
      });
      return {
        sizeLabel: `${calc.widthInches}" × ${calc.heightInches}" (${calc.dimensionsCm}) [Custom Size]`,
        shortSizeLabel: `${calc.widthInches}"×${calc.heightInches}" Custom`,
        price: calc.price,
        mrp: calc.mrp,
        variantId: `custom-size-${calc.widthInches}x${calc.heightInches}`,
        isCustomSize: true,
        customWidth: calc.widthInches,
        customHeight: calc.heightInches,
        calc,
      };
    } else {
      return {
        sizeLabel: specs.variant.size,
        shortSizeLabel: specs.variant.size.split('(')[0].trim(),
        price: specs.variant.price || product.basePrice,
        mrp: specs.variant.mrp || product.baseMrp,
        variantId: specs.variant.id,
        isCustomSize: false,
        customWidth: 24,
        customHeight: 36,
        calc: null,
      };
    }
  };

  // Active photo specifications & pricing
  const currentPhoto = photos[activePhotoIndex] || null;
  const currentSpecs = currentPhoto?.specs || {
    variant: activeVariant,
    frame: selectedFrame,
    isCustomSize,
    customWidth,
    customHeight,
    customText,
  };

  const activePhotoDetails = currentPhoto
    ? getPhotoDetails(currentPhoto)
    : {
        sizeLabel: activeSizeLabel,
        shortSizeLabel: isCustomSize ? `${customWidth}"×${customHeight}" Custom` : activeVariant.size.split('(')[0].trim(),
        price: activePrice,
        mrp: activeMrp,
        variantId: activeVariant.id,
        isCustomSize,
        customWidth,
        customHeight,
        calc: customSizeCalc,
      };

  // Combined total for all uploaded photos (each added separately to cart)
  const totalCombinedPrice = photos.length > 0
    ? photos.reduce((acc, p) => acc + getPhotoDetails(p).price, 0)
    : activePrice;

  const totalCombinedMrp = photos.length > 0
    ? photos.reduce((acc, p) => acc + getPhotoDetails(p).mrp, 0)
    : activeMrp;

  // Early return AFTER all hooks
  if (!isOpen) return null;

  // Handlers for modifying specifications of active photo
  const handleSelectVariant = (v: ProductVariant) => {
    setActiveVariant(v);
    setIsCustomSize(false);
    if (photos.length > 0) {
      setPhotos((prev) =>
        prev.map((p, idx) =>
          idx === activePhotoIndex
            ? {
                ...p,
                specs: {
                  ...p.specs,
                  variant: v,
                  isCustomSize: false,
                },
              }
            : p
        )
      );
    }
  };

  const handleToggleCustomSize = (custom: boolean) => {
    if (isRotatingLamp) return;
    setIsCustomSize(custom);
    if (photos.length > 0) {
      setPhotos((prev) =>
        prev.map((p, idx) =>
          idx === activePhotoIndex
            ? {
                ...p,
                specs: {
                  ...p.specs,
                  isCustomSize: custom,
                },
              }
            : p
        )
      );
    }
  };

  const handleCustomWidthChange = (w: number) => {
    setCustomWidth(w);
    if (photos.length > 0) {
      setPhotos((prev) =>
        prev.map((p, idx) =>
          idx === activePhotoIndex
            ? {
                ...p,
                specs: {
                  ...p.specs,
                  customWidth: w,
                },
              }
            : p
        )
      );
    }
  };

  const handleCustomHeightChange = (h: number) => {
    setCustomHeight(h);
    if (photos.length > 0) {
      setPhotos((prev) =>
        prev.map((p, idx) =>
          idx === activePhotoIndex
            ? {
                ...p,
                specs: {
                  ...p.specs,
                  customHeight: h,
                },
              }
            : p
        )
      );
    }
  };

  const handleSelectFrameColor = (f: 'gold' | 'black') => {
    if (f === 'gold' && isGoldOutOfStock) {
      alert('Rose Gold is currently Out of Stock. Please select an available in-stock frame.');
      return;
    }
    if (f === 'black' && isBlackOutOfStock) {
      alert('Black is currently Out of Stock. Please select an available in-stock frame.');
      return;
    }
    setSelectedFrame(f);
    if (photos.length > 0) {
      setPhotos((prev) =>
        prev.map((p, idx) =>
          idx === activePhotoIndex
            ? {
                ...p,
                specs: {
                  ...p.specs,
                  frame: f,
                },
              }
            : p
        )
      );
    }
  };

  const handleCustomTextChange = (text: string) => {
    setCustomText(text);
    if (photos.length > 0) {
      setPhotos((prev) =>
        prev.map((p, idx) =>
          idx === activePhotoIndex
            ? {
                ...p,
                specs: {
                  ...p.specs,
                  customText: text,
                },
              }
            : p
        )
      );
    }
  };

  // Apply active photo's size specifications to ALL uploaded photos with 1 click
  const handleApplyCurrentSizeToAll = () => {
    if (photos.length <= 1) return;
    const current = currentSpecs;
    setPhotos((prev) =>
      prev.map((p) => ({
        ...p,
        specs: {
          ...p.specs,
          variant: current.variant,
          frame: current.frame || selectedFrame,
          isCustomSize: current.isCustomSize,
          customWidth: current.customWidth,
          customHeight: current.customHeight,
        },
      }))
    );
    setAppliedAllNotice(true);
    setTimeout(() => setAppliedAllNotice(false), 3500);
  };

  // Process selected or dropped files up to MAX_PHOTOS
  const handleFiles = async (selectedFiles: FileList | File[]) => {
    const rawFiles = Array.from(selectedFiles).filter((f) => f.type.startsWith('image/'));
    if (rawFiles.length === 0) return;

    const remainingSlots = MAX_PHOTOS - photos.length;
    if (remainingSlots <= 0) {
      setLimitWarning(`You have already reached the maximum of ${MAX_PHOTOS} photos.`);
      setTimeout(() => setLimitWarning(null), 4000);
      return;
    }

    let filesToAdd = rawFiles;
    if (rawFiles.length > remainingSlots) {
      filesToAdd = rawFiles.slice(0, remainingSlots);
      setLimitWarning(`You can add up to ${MAX_PHOTOS} photos at a time. The first ${remainingSlots} photo(s) were added.`);
      setTimeout(() => setLimitWarning(null), 5000);
    } else {
      setLimitWarning(null);
    }

    // Process each file with fast compression & preview
    for (const file of filesToAdd) {
      try {
        const compressedDataUrl = await compressImageToDataUrl(file);
        const newPhotoItem: UploadedPhoto = {
          id: `photo-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          preview: compressedDataUrl,
          cdnUrl: null,
          name: file.name,
          isUploading: true,
          specs: {
            variant: activeVariant,
            frame: selectedFrame,
            isCustomSize: isCustomSize,
            customWidth: customWidth,
            customHeight: customHeight,
            customText: customText,
          },
        };

        setPhotos((prev) => [...prev, newPhotoItem]);

        // Background upload to server / CDN
        (async () => {
          try {
            const res = await fetch('/api/upload-photo', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ image: compressedDataUrl }),
            });
            const data = await res.json();
            const finalUrl = data?.cdnUrl || (data?.url ? `${window.location.origin}${data.url}` : null);
            if (finalUrl) {
              setPhotos((prev) =>
                prev.map((item) =>
                  item.id === newPhotoItem.id ? { ...item, cdnUrl: finalUrl, isUploading: false } : item
                )
              );
            } else {
              setPhotos((prev) =>
                prev.map((item) =>
                  item.id === newPhotoItem.id ? { ...item, isUploading: false } : item
                )
              );
            }
          } catch (uploadErr) {
            console.warn('Background upload notice:', uploadErr);
            setPhotos((prev) =>
              prev.map((item) =>
                item.id === newPhotoItem.id ? { ...item, isUploading: false } : item
              )
            );
          }
        })();
      } catch (err) {
        console.warn('Error processing image file:', err);
      }
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleRemovePhoto = (indexToRemove: number) => {
    setPhotos((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    if (activePhotoIndex >= indexToRemove && activePhotoIndex > 0) {
      setActivePhotoIndex((prev) => prev - 1);
    }
  };

  const handleClearAllPhotos = () => {
    setPhotos([]);
    setActivePhotoIndex(0);
    setLimitWarning(null);
  };

  const handleNextPhoto = () => {
    if (photos.length > 1) {
      const nextIdx = (activePhotoIndex + 1) % photos.length;
      setActivePhotoIndex(nextIdx);
      const s = photos[nextIdx]?.specs;
      if (s) {
        setActiveVariant(s.variant);
        if (s.frame) setSelectedFrame(s.frame);
        setIsCustomSize(s.isCustomSize);
        setCustomWidth(s.customWidth);
        setCustomHeight(s.customHeight);
        setCustomText(s.customText);
      }
    }
  };

  const handlePrevPhoto = () => {
    if (photos.length > 1) {
      const prevIdx = (activePhotoIndex - 1 + photos.length) % photos.length;
      setActivePhotoIndex(prevIdx);
      const s = photos[prevIdx]?.specs;
      if (s) {
        setActiveVariant(s.variant);
        if (s.frame) setSelectedFrame(s.frame);
        setIsCustomSize(s.isCustomSize);
        setCustomWidth(s.customWidth);
        setCustomHeight(s.customHeight);
        setCustomText(s.customText);
      }
    }
  };

  // Add each photo and its specifications SEPARATELY to cart
  const handleAddToCartWithPhoto = async (redirectCheckout = false) => {
    if (hasOutOfStockFrame) {
      alert('The selected frame finish is currently Out of Stock. Please choose an in-stock frame before proceeding.');
      return;
    }
    if (photos.length > 0) {
      // SEPARATELY ADD EACH PHOTO AND ITS SPECIFICATIONS TO CART
      const itemsToAdd = photos.map((photo, idx) => {
        const details = getPhotoDetails(photo);
        const photoImg = photo.cdnUrl || photo.preview;
        const specs = photo.specs || {
          variant: activeVariant,
          customText: '',
        };
        const title =
          photos.length === 1
            ? `${product.title} (With Custom Photo)`
            : `${product.title} (Custom Frame #${idx + 1} of ${photos.length})`;

        return {
          productId: product.id,
          slug: product.slug,
          title,
          image: photoImg,
          variantId: `${details.variantId}-${photo.id}`,
          size: details.sizeLabel,
          finish: !isCategoryFrameEnabled ? (specs.variant.finish || 'Frameless Acrylic (Metal Studs Included)') : `${specs.variant.finish || 'Acrylic'} (${(specs.frame || selectedFrame) === 'gold' ? 'Rose Gold Frame' : 'Black Frame'})`,
          lighting: ledEnabled ? 'LED Backlit (12V Adapter)' : 'No Lighting (Pure Art)',
          shape: (product.shape === 'portrait' || product.shape === 'landscape' || product.shape === 'square' || product.shape === 'round')
            ? product.shape
            : product.orientation === 'vertical'
            ? 'portrait'
            : product.orientation === 'horizontal'
            ? 'landscape'
            : 'portrait',
          unitPrice: details.price,
          unitMrp: details.mrp,
          quantity: 1,
          customization: {
            previewUrl: photoImg,
            photoUrls: [photoImg],
            photoCount: 1,
            customText: specs.customText?.trim() || undefined,
            frameType: !isCategoryFrameEnabled ? 'without' : (specs.frame || selectedFrame) === 'gold' ? 'Rose Gold Frame' : 'Black Frame',
            orientation: product.orientation,
            specialInstructions: `Product: ${product.title} | Frame #${idx + 1} of ${photos.length} | Frame: ${(specs.frame || selectedFrame) === 'gold' ? 'Rose Gold Frame' : 'Black Frame'} | Size: ${details.sizeLabel}${specs.customText?.trim() ? ` | Inscription: "${specs.customText.trim()}"` : ''}`,
          },
        };
      });

      addMultipleToCart(itemsToAdd, !redirectCheckout);
    } else {
      // Standard product or custom size without photo
      addToCart(
        {
          productId: product.id,
          slug: product.slug,
          title: isCustomSize ? `${product.title} (Custom Size: ${customWidth}" × ${customHeight}")` : product.title,
          image: product.images[0],
          variantId: isCustomSize ? `custom-size-${customWidth}x${customHeight}` : activeVariant.id,
          size: activeSizeLabel,
          finish: activeVariant.finish,
          lighting: ledEnabled ? 'LED Backlit (12V Adapter)' : 'No Lighting (Pure Art)',
          shape: (product.shape === 'portrait' || product.shape === 'landscape' || product.shape === 'square' || product.shape === 'round')
            ? product.shape
            : product.orientation === 'vertical'
            ? 'portrait'
            : product.orientation === 'horizontal'
            ? 'landscape'
            : 'portrait',
          unitPrice: activePrice,
          unitMrp: activeMrp,
          quantity: 1,
          customization: {
            previewUrl: product.images[0],
            specialInstructions: `Product: ${product.title} | Size: ${activeSizeLabel}`,
          },
        },
        !redirectCheckout
      );
    }

    if (redirectCheckout) {
      onClose();
      router.push('/checkout');
    } else {
      setAddedSuccess(true);
      setTimeout(() => {
        setAddedSuccess(false);
        onClose();
        openCart();
      }, 700);
    }
  };

  const activePhoto = photos[activePhotoIndex] || null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hidden Multiple File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          multiple
          className="hidden"
        />

        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 bg-stone-50 border-b border-stone-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-700 block truncate">
                Customise: Add Up to 10 Photos &amp; Custom Specifications
              </span>
              <h2 className="font-serif font-bold text-sm sm:text-base text-stone-900 truncate">
                {product.title}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 border border-stone-200 flex items-center justify-center transition-colors shrink-0 ml-2 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Limit Warning banner */}
          {limitWarning && (
            <div className="bg-amber-50 border border-amber-300 text-amber-900 px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{limitWarning}</span>
            </div>
          )}

          {/* Applied All Notice banner */}
          {appliedAllNotice && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2 animate-fade-in">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Size applied to all {photos.length} uploaded photos! Each will be added separately to cart.</span>
            </div>
          )}

          {/* Product context pill */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 flex items-center gap-3">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-12 h-12 object-cover rounded-lg border border-amber-300 shrink-0"
            />
            <div className="text-xs min-w-0 flex-1">
              <p className="text-stone-900 font-bold truncate">
                Personalized {product.title}
              </p>
              <p className="text-stone-600 text-[11px] mt-0.5">
                Upload <strong>up to 10 photos</strong>. Each photo and its specifications will be added <strong>separately to cart</strong>. Handcrafted with museum-grade acrylic in Hyderabad.
              </p>
            </div>
          </div>

          {/* Photo Upload & Live Mockup */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                <Images className="w-4 h-4 text-amber-600" />
                <span>1. Upload Photos</span>
                <span className="text-[11px] font-normal normal-case text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-full border border-amber-300">
                  {photos.length} / {MAX_PHOTOS} Photos
                </span>
              </label>

              {photos.length > 0 && (
                <div className="flex items-center gap-2">
                  {photos.length < MAX_PHOTOS && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[11px] font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add More ({MAX_PHOTOS - photos.length} left)
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleClearAllPhotos}
                    className="text-[11px] text-stone-500 hover:text-red-600 underline cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>

            {photos.length === 0 ? (
              /* Dropzone when no photos uploaded yet */
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 bg-stone-50 hover:bg-stone-100/70 ${
                  isDragging
                    ? 'border-amber-500 bg-amber-50 scale-[1.01]'
                    : 'border-stone-300 hover:border-amber-400'
                }`}
              >
                <div className="flex flex-col items-center justify-center space-y-2.5">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 shadow-xs">
                      <Camera className="w-7 h-7" />
                    </div>
                    <span className="absolute -top-1.5 -right-2 bg-stone-900 text-[#FEE815] text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-xs">
                      Up to 10
                    </span>
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-bold text-stone-900">
                      Click or Drag &amp; Drop Up to 10 Photos Here
                    </p>
                    <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
                      Select 1 to 10 photos simultaneously for your personalized frame order. Each photo adds separately to cart with its own size and specifications!
                    </p>
                  </div>
                  <button
                    type="button"
                    className="mt-1 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-xs transition-colors pointer-events-none"
                  >
                    <Upload className="w-4 h-4 text-amber-400" />
                    <span>Select Up to 10 Photos from Device</span>
                  </button>
                  <p className="text-[10px] text-stone-400">
                    Supports JPG, PNG, WEBP • Fast high-resolution processing
                  </p>
                </div>
              </div>
            ) : (
              /* Photos Uploaded: Main Mockup Preview + Thumbnail Strip */
              <div className="space-y-3">
                {/* Active Photo Mockup */}
                <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400 bg-stone-100 p-3 sm:p-4 flex flex-col items-center">
                  <div
                    className={`relative max-w-sm w-full aspect-[4/3] rounded-xl overflow-hidden border border-stone-300 shadow-md bg-stone-900 transition-all ${
                      ledEnabled ? 'ring-4 ring-amber-400/40 shadow-[0_0_35px_rgba(254,232,21,0.35)]' : ''
                    }`}
                  >
                    {activePhoto && (
                      <img
                        src={activePhoto.preview}
                        alt={`Photo ${activePhotoIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}

                    {/* Glass Sheen */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-white/20" />

                    {/* Top status & controls over photo */}
                    <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-auto">
                      <span className="bg-stone-900/85 backdrop-blur-xs text-[#FEE815] font-mono text-[10px] font-bold px-2 py-0.5 rounded-md border border-amber-400/50">
                        Photo {activePhotoIndex + 1} of {photos.length}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(activePhotoIndex)}
                        className="bg-stone-900/85 hover:bg-red-600 text-white p-1 rounded-md transition-colors border border-white/20 cursor-pointer"
                        title="Remove this photo"
                        aria-label="Remove this photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Next/Prev Navigation arrows if multiple photos */}
                    {photos.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={handlePrevPhoto}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-xs"
                          aria-label="Previous photo"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={handleNextPhoto}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-xs"
                          aria-label="Next photo"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}

                      
                    {/* Frame Badge */}
                    <div className="absolute bottom-2 left-2 bg-stone-900/90 border border-amber-400/60 px-2 py-0.5 rounded text-[10px] text-amber-300 font-bold flex items-center gap-1.5 max-w-[90%] truncate z-20">
                      <span className="truncate">{photos.length > 1 ? `Frame #${activePhotoIndex + 1}:` : ''} {product.title}</span>
                      <span>•</span>
                      <span className="text-white shrink-0">{activePhotoDetails.shortSizeLabel}</span>
                      <span>•</span>
                      <span className="text-[#FEE815] shrink-0">₹{activePhotoDetails.price.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between w-full text-xs">
                    <span className="text-stone-700 text-[11px] flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {photos.length === 1
                        ? '1 Custom Frame Ready • Will be added to Cart'
                        : `${photos.length} Custom Frames • Each will be added SEPARATELY to Cart with its photo & size`}
                    </span>
                    <span className="text-stone-500 text-[10px]">
                      Click any thumbnail below to select &amp; set size
                    </span>
                  </div>
                </div>

                {/* Thumbnail Strip (Up to 10 photos) */}
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-2.5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-stone-700">
                      Uploaded Photos ({photos.length} of {MAX_PHOTOS}) — Click to configure size:
                    </span>
                    {photos.length < MAX_PHOTOS && (
                      <span className="text-[10px] text-amber-700 font-medium">
                        Can add {MAX_PHOTOS - photos.length} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                    {photos.map((photo, index) => {
                      const isActive = index === activePhotoIndex;
                      const pDetails = getPhotoDetails(photo);
                      return (
                        <div
                          key={photo.id}
                          className={`relative group shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 cursor-pointer transition-all flex flex-col justify-between ${
                            isActive
                              ? 'border-amber-500 ring-2 ring-amber-400 shadow-md scale-105'
                              : 'border-stone-300 hover:border-amber-400 opacity-85 hover:opacity-100'
                          }`}
                          onClick={() => {
                            setActivePhotoIndex(index);
                            const s = photo.specs;
                            if (s) {
                              setActiveVariant(s.variant);
                              if (s.frame) setSelectedFrame(s.frame);
                              setIsCustomSize(s.isCustomSize);
                              setCustomWidth(s.customWidth);
                              setCustomHeight(s.customHeight);
                              setCustomText(s.customText);
                            }
                          }}
                        >
                          <img
                            src={photo.preview}
                            alt={`Thumb ${index + 1}`}
                            className="w-full h-full object-cover absolute inset-0"
                          />

                          {/* Top index badge & remove button */}
                          <div className="relative z-10 flex items-center justify-between p-1">
                            <span className="bg-stone-900/85 text-[#FEE815] font-mono text-[9px] font-bold px-1.5 py-0.2 rounded shadow-2xs">
                              #{index + 1}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemovePhoto(index);
                              }}
                              className="w-4 h-4 rounded-full bg-stone-900/90 text-white hover:bg-red-600 flex items-center justify-center transition-colors cursor-pointer"
                              title="Remove"
                              aria-label={`Remove photo ${index + 1}`}
                            >
                              <X className="w-2.5 h-2.5" />
                            </button>
                          </div>

                          {/* Bottom size badge */}
                          <div className="relative z-10 bg-stone-900/90 text-white text-[9px] font-medium px-1 py-0.5 text-center truncate backdrop-blur-xs">
                            {pDetails.shortSizeLabel}
                          </div>
                        </div>
                      );
                    })}

                    {/* "+ Add More" thumbnail slot if under MAX_PHOTOS */}
                    {photos.length < MAX_PHOTOS && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="shrink-0 w-20 h-20 rounded-xl border-2 border-dashed border-amber-300 hover:border-amber-500 bg-amber-50/50 hover:bg-amber-100/60 flex flex-col items-center justify-center text-amber-800 transition-colors cursor-pointer p-1"
                        title="Add more photos"
                      >
                        <Plus className="w-5 h-5" />
                        <span className="text-[10px] font-bold mt-0.5">Add Photo</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Size / Variant Selector with Custom Size */}
          <div className="space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-1.5">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                2. Frame Size for {photos.length > 1 ? `Photo #${activePhotoIndex + 1}` : 'Frame'}:{' '}
                <span className="text-amber-800 font-serif font-bold normal-case">
                  {activePhotoDetails.shortSizeLabel}
                </span>
              </label>

              <div className="flex items-center gap-2">
                {photos.length > 1 && (
                  <button
                    type="button"
                    onClick={handleApplyCurrentSizeToAll}
                    className="text-[10px] font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-2 py-0.5 rounded cursor-pointer transition-colors flex items-center gap-1 shadow-2xs"
                    title="Apply this size to all uploaded photos"
                  >
                    <Layers className="w-3 h-3 text-amber-700" />
                    <span>Apply size to all {photos.length} photos</span>
                  </button>
                )}
                {currentSpecs.isCustomSize && (
                  <button
                    type="button"
                    onClick={() => handleToggleCustomSize(false)}
                    className="text-[10px] font-bold text-amber-700 hover:underline uppercase tracking-wider cursor-pointer"
                  >
                    Standard Sizes
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {product.variants.map((v) => {
                const isSelected = !currentSpecs.isCustomSize && currentSpecs.variant.id === v.id;
                const inchesMatch = v.size.match(/(\d+(?:\.\d+)?)\s*(?:x|×|\*)\s*(\d+(?:\.\d+)?)/i);
                const inchesDisplay = inchesMatch ? `${inchesMatch[1]}" × ${inchesMatch[2]}"` : v.size.split('(')[0].trim();
                const sqFtDisplay = v.dimensionsCm?.includes('sq.ft')
                  ? v.dimensionsCm
                  : inchesMatch
                  ? `${(((parseFloat(inchesMatch[1]) * parseFloat(inchesMatch[2])) / 144) % 1 === 0 ? ((parseFloat(inchesMatch[1]) * parseFloat(inchesMatch[2])) / 144).toFixed(0) : ((parseFloat(inchesMatch[1]) * parseFloat(inchesMatch[2])) / 144).toFixed(1))} sq.ft`
                  : '';

                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => handleSelectVariant(v)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50 text-stone-950 ring-2 ring-amber-300 shadow-xs'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-amber-300'
                    }`}
                  >
                    <div className="font-bold text-xs truncate text-stone-900">{inchesDisplay}</div>
                    <div className="flex items-center justify-between mt-0.5">
                      {sqFtDisplay && (
                        <span className="text-[10px] text-stone-500 font-medium">{sqFtDisplay}</span>
                      )}
                      <span className="text-[11px] text-amber-800 font-bold ml-auto">
                        ₹{v.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </button>
                );
              })}

              {/* Custom Size Option */}
              {!isRotatingLamp && (
                <button
                  type="button"
                  onClick={() => handleToggleCustomSize(true)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    currentSpecs.isCustomSize
                      ? 'border-amber-500 bg-amber-50 text-stone-950 ring-2 ring-amber-300 shadow-xs'
                      : 'border-amber-300 bg-amber-50/50 text-stone-800 hover:border-amber-400'
                  }`}
                >
                  <div className="font-bold text-xs flex items-center gap-1 text-amber-800">
                    <Ruler className="w-3.5 h-3.5 text-amber-600" /> Custom Size
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
                    Calibrated Inches
                  </div>
                </button>
              )}
            </div>

            {/* Custom Size Interactive Input */}
            {!isRotatingLamp && currentSpecs.isCustomSize && (
              <CustomSizeInput
                width={currentSpecs.customWidth}
                height={currentSpecs.customHeight}
                onChangeWidth={handleCustomWidthChange}
                onChangeHeight={handleCustomHeightChange}
                calc={activePhotoDetails.calc || customSizeCalc}
                compact={true}
              />
            )}
          </div>

          {/* Frame Option (Rose Gold & Black) - Rendered only when enabled for category */}
          {isCategoryFrameEnabled && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center justify-between">
                <span>
                  3. Frame Option {photos.length > 1 ? `(Photo #${activePhotoIndex + 1})` : ''}:{' '}
                  <strong className="text-stone-900 font-bold normal-case">
                    {(currentSpecs.frame || selectedFrame) === 'gold' ? 'Rose Gold' : 'Black'}
                  </strong>
                </span>
                <span className="text-[10px] text-stone-500 font-normal">
                  {(currentSpecs.frame || selectedFrame) === 'gold' ? 'Rose Gold' : 'Matte Black'}
                </span>
              </label>

              <div className="grid grid-cols-2 gap-2 sm:gap-2.5 max-w-[280px] sm:max-w-[300px]">
                {/* Rose Gold */}
                <button
                  type="button"
                  onClick={() => !isGoldOutOfStock && handleSelectFrameColor('gold')}
                  disabled={isGoldOutOfStock}
                  className={`frame-card-hover btn-press-bounce relative group p-2 sm:p-2.5 rounded-xl text-center transition-all duration-200 flex flex-col items-center justify-center cursor-pointer ${
                    isGoldOutOfStock
                      ? 'border border-stone-200 bg-stone-100/70 text-stone-400 opacity-50 cursor-not-allowed'
                      : (currentSpecs.frame || selectedFrame) === 'gold'
                      ? 'border-2 border-stone-900 bg-white text-stone-900 shadow-sm ring-1 ring-stone-900/10'
                      : 'border border-stone-200 bg-white text-stone-900 hover:border-stone-400 hover:shadow-xs'
                  }`}
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-stone-50 overflow-hidden border border-stone-100 flex items-center justify-center p-1 mb-1.5 transition-transform duration-300 group-hover:scale-105">
                    <img
                      src="/images/frames/gold-border-ref.jpg"
                      alt="Rose Gold"
                      className="w-full h-full object-contain rounded-md"
                    />
                  </div>
                  <span className="font-bold text-[11px] sm:text-xs text-stone-900 leading-tight">Rose Gold</span>
                  <span className="text-[9.5px] sm:text-[10px] text-stone-500 mt-0.5 font-normal leading-tight">Rose Gold</span>
                  {isGoldOutOfStock && (
                    <span className="mt-1 text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-300">
                      Sold Out
                    </span>
                  )}
                </button>

                {/* Black */}
                <button
                  type="button"
                  onClick={() => !isBlackOutOfStock && handleSelectFrameColor('black')}
                  disabled={isBlackOutOfStock}
                  className={`frame-card-hover btn-press-bounce relative group p-2 sm:p-2.5 rounded-xl text-center transition-all duration-200 flex flex-col items-center justify-center cursor-pointer ${
                    isBlackOutOfStock
                      ? 'border border-stone-200 bg-stone-100/70 text-stone-400 opacity-50 cursor-not-allowed'
                      : (currentSpecs.frame || selectedFrame) === 'black'
                      ? 'border-2 border-stone-900 bg-white text-stone-900 shadow-sm ring-1 ring-stone-900/10'
                      : 'border border-stone-200 bg-white text-stone-900 hover:border-stone-400 hover:shadow-xs'
                  }`}
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-stone-50 overflow-hidden border border-stone-100 flex items-center justify-center p-1 mb-1.5 transition-transform duration-300 group-hover:scale-105">
                    <img
                      src="/images/frames/black-border-ref.jpg"
                      alt="Black"
                      className="w-full h-full object-contain rounded-md"
                    />
                  </div>
                  <span className="font-bold text-[11px] sm:text-xs text-stone-900 leading-tight">Black</span>
                  <span className="text-[9.5px] sm:text-[10px] text-stone-500 mt-0.5 font-normal leading-tight">Matte Black</span>
                  {isBlackOutOfStock && (
                    <span className="mt-1 text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-300">
                      Sold Out
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Optional Inscription / Custom Text */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center justify-between">
              <span>
                4. Custom Inscription / Text {photos.length > 1 ? `(Photo #${activePhotoIndex + 1})` : ''}{' '}
                <span className="text-stone-400 font-normal normal-case">(Optional)</span>
              </span>
            </label>
            <input
              type="text"
              value={currentSpecs.customText || ''}
              onChange={(e) => handleCustomTextChange(e.target.value)}
              placeholder='e.g. "Happy Anniversary Mom & Dad" or "24.11.2024"'
              className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-amber-500 bg-white text-stone-900 placeholder:text-stone-400"
              maxLength={100}
            />
          </div>

          {/* Price & Cart Items Summary */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] text-stone-500 block">
                  {photos.length > 1
                    ? `Total for All ${photos.length} Custom Frames (Added Separately to Cart)`
                    : currentSpecs.isCustomSize
                    ? 'Custom Size Price'
                    : 'Total Frame Price'}
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-lg font-bold text-stone-900 font-serif">
                    ₹{totalCombinedPrice.toLocaleString('en-IN')}
                  </span>
                  {totalCombinedMrp > totalCombinedPrice && (
                    <span className="text-xs text-stone-400 line-through">
                      ₹{totalCombinedMrp.toLocaleString('en-IN')}
                    </span>
                  )}
                  {totalCombinedMrp > totalCombinedPrice && (
                    <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300">
                      Save {Math.round(((totalCombinedMrp - totalCombinedPrice) / totalCombinedMrp) * 100)}%
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right text-[11px] text-stone-600">
                {photos.length > 1 ? (
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    ✓ {photos.length} Separate Cart Items
                  </span>
                ) : (
                  <span className="text-stone-900 font-semibold block">{activePhotoDetails.shortSizeLabel}</span>
                )}
                <span className="text-[10px] text-stone-500 block mt-0.5">1:1 WhatsApp proof before print</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 space-y-2 shrink-0">
          {hasOutOfStockFrame && (
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>The selected frame finish is Out of Stock. Please select an in-stock frame before proceeding to checkout.</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleAddToCartWithPhoto(false)}
              className="btn-luxury-primary btn-shimmer-sweep btn-press-bounce group w-full py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-stone-950 animate-bounce" />
                  <span className="font-bold">Added {photos.length > 1 ? `${photos.length} Items` : 'to Cart'}!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-stone-950 group-hover:scale-115 group-hover:-rotate-12 transition-transform duration-300 shrink-0" />
                  <span className="font-bold">
                    {photos.length > 1
                      ? `Add All ${photos.length} Frames Separately • ₹${totalCombinedPrice.toLocaleString('en-IN')}`
                      : `Add to Cart • ₹${activePrice.toLocaleString('en-IN')}`}
                  </span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleAddToCartWithPhoto(true)}
              disabled={hasOutOfStockFrame}
              className={`btn-luxury-dark btn-shimmer-sweep btn-press-bounce group w-full py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 ${
                hasOutOfStockFrame ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span className="font-bold">{hasOutOfStockFrame ? 'Frame Out of Stock' : `Proceed to Checkout ${photos.length > 1 ? `(${photos.length} Frames)` : ''}`}</span>
              <ArrowRight className="w-4 h-4 text-[#FEE815] group-hover:translate-x-1.5 transition-transform duration-300 shrink-0" />
            </button>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-stone-400 text-[11px] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>100% Insured Pan-India Safe Delivery</span>
            </span>

            <Link
              href={`/customise?product=${product.slug}&title=${encodeURIComponent(product.title)}`}
              onClick={onClose}
              className="text-[#D1D5DB] hover:text-[#FFFFFF] font-semibold flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-[#FEE815]" />
              <span>Open in Full 3D Customizer</span>
            </Link>
          </div>

          {/* Info note when photos are uploaded */}
          {photos.length > 0 && (
            <div className="mt-2 bg-[#FEE815]/10 border border-[#FEE815]/40 rounded-xl px-3 py-2 flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#FEE815] shrink-0" />
              <p className="text-[11px] text-[#D1D5DB]">
                <strong className="text-[#FEE815]">{photos.length} photo(s)</strong> attached. Clicking Add to Cart will add each photo as a separate cart item with its individual size and specifications!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const ProductCustomizerModal = AddPhotoModal;
