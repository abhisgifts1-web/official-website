'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  X,
  Upload,
  Camera,
  Sparkles,
  Check,
  CheckCircle2,
  MessageCircle,
  ShoppingBag,
  ArrowRight,
  Sun,
  ShieldCheck,
  RotateCcw,
  Ruler,
  Image as ImageIcon,
  Download,
  Send,
} from 'lucide-react';
import { Product, ProductVariant } from '@/types';
import CustomSizeInput from './CustomSizeInput';
import { calculateCustomDimensions } from '@/lib/utils/customSize';
import { useCart } from '@/context/CartContext';
import { INITIAL_SETTINGS } from '@/lib/data/settings';
import { compressImageToDataUrl } from '@/lib/utils/imageCompress';

interface AddPhotoModalProps {
  product: Product;
  selectedVariant?: ProductVariant;
  isOpen: boolean;
  onClose: () => void;
}

export default function AddPhotoModal({
  product,
  selectedVariant: initialVariant,
  isOpen,
  onClose,
}: AddPhotoModalProps) {
  const router = useRouter();
  const { addToCart, openCart } = useCart();
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
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [customText, setCustomText] = useState('');
  const [ledEnabled, setLedEnabled] = useState(product.hasLedBacklight);
  const [isDragging, setIsDragging] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [isCustomSize, setIsCustomSize] = useState(false);
  const [customWidth, setCustomWidth] = useState<number>(24);
  const [customHeight, setCustomHeight] = useState<number>(36);
  const [waUploading, setWaUploading] = useState(false);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);

  // Sync if initialVariant changes
  React.useEffect(() => {
    if (initialVariant) {
      setActiveVariant(initialVariant);
    }
  }, [initialVariant]);

  // ⚠️ ALL hooks MUST be called before any conditional early return (Rules of Hooks)
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

  const hasRealDiscount = activeMrp > activePrice;
  const discountPercent = hasRealDiscount
    ? Math.round(((activeMrp - activePrice) / activeMrp) * 100)
    : 0;

  const cleanWaNumber = (INITIAL_SETTINGS.whatsappNumber || '919032372782').replace(/[^0-9]/g, '');

  // Early return AFTER all hooks
  if (!isOpen) return null;

  // Pre-upload photo in the background as soon as user selects it
  const processAndPreUpload = async (file: File) => {
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const rawResult = event.target?.result as string;
        if (!rawResult) return;
        setPhotoPreview(rawResult);
        setUploadedPhotoUrl(null);

        try {
          setWaUploading(true);
          const compressed = await compressImageToDataUrl(rawResult);
          const res = await fetch('/api/upload-photo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: compressed }),
          });
          const data = await res.json();
          const finalUrl = data?.cdnUrl || (data?.url ? `${window.location.origin}${data.url}` : null);
          if (finalUrl) {
            setUploadedPhotoUrl(finalUrl);
          }
        } catch (uploadErr) {
          console.warn('Pre-uploading photo notice:', uploadErr);
        } finally {
          setWaUploading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.warn('File read error:', err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processAndPreUpload(file);
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
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processAndPreUpload(file);
    }
  };

  // WhatsApp order handler — uploads photo to server, includes public URL in message
  const handleWhatsAppOrder = async () => {
    let photoUrl = uploadedPhotoUrl;

    if (!photoUrl && photoPreview) {
      if (photoPreview.startsWith('data:')) {
        setWaUploading(true);
        try {
          const compressed = await compressImageToDataUrl(photoPreview);
          const res = await fetch('/api/upload-photo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: compressed }),
          });
          const data = await res.json();
          photoUrl = data?.cdnUrl || (data?.url ? `${window.location.origin}${data.url}` : null);
          if (photoUrl) setUploadedPhotoUrl(photoUrl);
        } catch (err) {
          console.error('Error uploading custom photo for WhatsApp order:', err);
        } finally {
          setWaUploading(false);
        }
      } else {
        photoUrl = photoPreview.startsWith('http')
          ? photoPreview
          : `${window.location.origin}${photoPreview.startsWith('/') ? '' : '/'}${photoPreview}`;
      }
    }

    // Build WhatsApp message with photo URL if available
    const lines = [
      `Hello Abhi's Gifts! 🙏`,
      `I want to place an order for:`,
      `📦 *${product.title}*`,
      ``,
      photoUrl
        ? `📸 *Custom Customer Photo Link:* ${photoUrl}\n👉 *(Click link to view/download original high-res customer photo)*`
        : photoPreview
        ? `📸 *Custom Photo:* [Customer photo attached with order]`
        : `🖼️ *Artwork:* Using catalog artwork`,
      `📐 *Size:* ${activeSizeLabel}`,
      `💰 *Price:* ₹${activePrice.toLocaleString('en-IN')}`,
      ledEnabled ? `💡 *Lighting:* LED Backlit (12V Adapter)` : '',
      customText.trim() ? `✍️ *Text/Dedication:* "${customText.trim()}"` : '',
      ``,
      `Please confirm my order and share proofing layout before printing. Thank you!`,
    ].filter(Boolean).join('\n');

    const waNum = (INITIAL_SETTINGS.whatsappNumber || '919032372782').replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${waNum}?text=${encodeURIComponent(lines)}`, '_blank');
  };

  const handleAddToCartWithPhoto = async (redirectCheckout = false) => {
    let finalImage = uploadedPhotoUrl || photoPreview || product.images[0];
    if (!uploadedPhotoUrl && photoPreview && photoPreview.startsWith('data:')) {
      try {
        const compressed = await compressImageToDataUrl(photoPreview);
        const res = await fetch('/api/upload-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: compressed }),
        });
        const uploadRes = await res.json();
        const uploadedLink = uploadRes?.cdnUrl || (uploadRes?.url ? `${window.location.origin}${uploadRes.url}` : null);
        if (uploadedLink) {
          finalImage = uploadedLink;
          setUploadedPhotoUrl(uploadedLink);
        }
      } catch (err) {
        console.warn('Pre-uploading custom photo failed', err);
      }
    }
    const itemTitle = photoPreview
      ? `${product.title} (With Custom Photo${isCustomSize ? ` • ${customWidth}x${customHeight}` : ''})`
      : isCustomSize
      ? `${product.title} (Custom Size: ${customWidth}" × ${customHeight}")`
      : product.title;

    addToCart(
      {
        productId: product.id,
        slug: product.slug,
        title: itemTitle,
        image: finalImage,
        variantId: isCustomSize ? `custom-size-${customWidth}x${customHeight}-photo` : `${activeVariant.id}-custom-photo`,
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
          previewUrl: finalImage,
          customText: customText.trim() || undefined,
          frameType: activeVariant.finish,
          orientation: product.orientation,
          specialInstructions: `Product: ${product.title} | Photo: ${photoPreview ? 'Custom User Upload' : 'Original Artwork'} | Size: ${activeSizeLabel}${customText.trim() ? ` | Text: ${customText.trim()}` : ''}`,
        },
      },
      !redirectCheckout
    );

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 bg-stone-50 border-b border-stone-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-700 block truncate">
                Customise: Photo & Size
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
                Customise this frame with your own photo, custom width & height dimensions, or both. Precision crafted in Hyderabad.
              </p>
            </div>
          </div>

          {/* Photo Upload & Live Mockup */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center justify-between">
              <span>1. Personal Photo <span className="text-stone-500 font-normal lowercase">(optional — upload your photo or keep original artwork)</span></span>
              {photoPreview && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[11px] font-medium text-amber-700 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Change Photo
                </button>
              )}
            </label>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {!photoPreview ? (
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
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-stone-900">
                      Click or Drag &amp; Drop Your Photo Here
                    </p>
                    <p className="text-[11px] text-stone-500 mt-1">
                      Upload any family, wedding, birthday, portrait, or devotional photo (JPG, PNG, WebP)
                    </p>
                  </div>
                  <button
                    type="button"
                    className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-xs transition-colors pointer-events-none"
                  >
                    <Upload className="w-3.5 h-3.5 text-amber-400" />
                    <span>Select Photo from Device</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400 bg-stone-100 p-3 flex flex-col items-center">
                {/* Acrylic Frame Mockup */}
                <div
                  className={`relative max-w-sm w-full aspect-[4/3] rounded-xl overflow-hidden border border-stone-300 shadow-md bg-stone-900 transition-all ${
                    ledEnabled ? 'ring-4 ring-amber-400/40 shadow-[0_0_35px_rgba(234,179,8,0.35)]' : ''
                  }`}
                >
                  <img
                    src={photoPreview}
                    alt="Uploaded photo preview"
                    className="w-full h-full object-cover"
                  />

                  {/* Glass Sheen */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-white/20" />

                  {/* Frame Badge */}
                  <div className="absolute bottom-2 left-2 bg-stone-900/90 border border-amber-400/60 px-2 py-0.5 rounded text-[10px] text-amber-300 font-bold">
                    {product.title} • {activeSizeLabel}
                  </div>
                </div>

                <div className="mt-2.5 flex items-center justify-between w-full text-xs">
                  <span className="text-stone-600 text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Photo ready for {product.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[11px] font-bold text-amber-700 hover:text-stone-900 underline cursor-pointer"
                  >
                    Replace Photo
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Size / Variant Selector with Custom Size */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                2. Frame Size:{' '}
                <span className="text-amber-800 font-serif font-bold normal-case">
                  {isCustomSize ? `${customWidth}" × ${customHeight}" Custom Size` : activeVariant.size}
                </span>
              </label>
              {isCustomSize && (
                <button
                  type="button"
                  onClick={() => setIsCustomSize(false)}
                  className="text-[10px] font-bold text-amber-700 hover:underline uppercase tracking-wider cursor-pointer"
                >
                  Standard Sizes
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {product.variants.map((v) => {
                const isSelected = !isCustomSize && activeVariant.id === v.id;
                const cleanSize = v.size.split('(')[0].trim();
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => {
                      setIsCustomSize(false);
                      setActiveVariant(v);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50 text-stone-950 ring-2 ring-amber-300 shadow-xs'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-amber-300'
                    }`}
                  >
                    <div className="font-bold text-xs truncate">{cleanSize}</div>
                    <div className="text-[11px] text-amber-800 font-bold mt-0.5">
                      ₹{v.price.toLocaleString('en-IN')}
                    </div>
                  </button>
                );
              })}

              {/* Custom Size Option */}
              <button
                type="button"
                onClick={() => setIsCustomSize(true)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isCustomSize
                    ? 'border-amber-500 bg-amber-50 text-stone-950 ring-2 ring-amber-300 shadow-xs'
                    : 'border-amber-300 bg-amber-50/50 text-stone-800 hover:border-amber-400'
                }`}
              >
                <div className="font-bold text-xs flex items-center gap-1 text-amber-800">
                  <Ruler className="w-3.5 h-3.5 text-amber-600" /> Custom Size
                </div>
                <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
                  Price in WhatsApp
                </div>
              </button>
            </div>

            {/* Custom Size Interactive Input */}
            {isCustomSize && (
              <CustomSizeInput
                width={customWidth}
                height={customHeight}
                onChangeWidth={setCustomWidth}
                onChangeHeight={setCustomHeight}
                calc={customSizeCalc}
                compact={true}
              />
            )}
          </div>

          {/* Lighting Toggle if product has LED */}
          {product.hasLedBacklight && (
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-stone-900">
                  LED Backlit Illumination
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLedEnabled(!ledEnabled)}
                className={`px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                  ledEnabled
                    ? 'bg-[#EAB308] text-stone-950 border-amber-400'
                    : 'bg-stone-200 text-stone-700 border-stone-300'
                }`}
              >
                {ledEnabled ? 'ON' : 'OFF'}
              </button>
            </div>
          )}

          {/* Optional Personalization Text */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
              3. Custom Text / Dedication <span className="text-stone-500 font-normal lowercase">(optional)</span>
            </label>
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="e.g. Ramesh &amp; Priya • 25th Anniversary • 12 May 2026"
              className="w-full bg-white border border-stone-300 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-stone-900 placeholder:text-stone-400 outline-none transition-colors"
              maxLength={80}
            />
          </div>

          {/* Price Summary */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-stone-500 block">
                {isCustomSize ? 'Custom Size Price with Photo' : 'Item Price with Custom Photo'}
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-lg font-bold text-stone-900 font-serif">
                  ₹{activePrice.toLocaleString('en-IN')}
                </span>
                {hasRealDiscount && (
                  <span className="text-xs text-stone-400 line-through">
                    ₹{activeMrp.toLocaleString('en-IN')}
                  </span>
                )}
                {hasRealDiscount && discountPercent > 0 && (
                  <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300">
                    Save {discountPercent}%
                  </span>
                )}
              </div>
            </div>

            <div className="text-right text-[11px] text-stone-500">
              <span className="text-stone-900 font-semibold block">{activeSizeLabel}</span>
              <span>1:1 WhatsApp proof before print</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 space-y-2 shrink-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleAddToCartWithPhoto(false)}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-[#EAB308] hover:bg-[#CA8A04] text-stone-950 shadow-md border border-amber-400 transition-all cursor-pointer"
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-stone-950" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-stone-950" />
                  <span>Add to Cart • ₹{activePrice.toLocaleString('en-IN')}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleAddToCartWithPhoto(true)}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white border border-stone-900 transition-all cursor-pointer shadow-xs"
            >
              <span>Instant Buy Now</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleWhatsAppOrder}
            disabled={waUploading}
            className="w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] border border-[#25D366]/40 transition-all cursor-pointer disabled:opacity-60"
          >
            {waUploading ? (
              <>
                <svg className="animate-spin w-4 h-4 text-[#128C7E]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                <span>Uploading Photo for WhatsApp...</span>
              </>
            ) : (
              <>
                <MessageCircle className="w-4 h-4 fill-current text-[#25D366]" />
                <span>Order via WhatsApp (₹{activePrice.toLocaleString('en-IN')})</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-between text-xs pt-1">
            {/* WhatsApp Order — uploads photo to server, includes direct link in message */}
            <button
              type="button"
              onClick={handleWhatsAppOrder}
              disabled={waUploading}
              className={`font-semibold flex items-center gap-1.5 transition-colors ${
                waUploading
                  ? 'text-amber-600/50 cursor-wait'
                  : 'text-amber-800 hover:underline cursor-pointer'
              }`}
            >
              {waUploading ? (
                <>
                  <svg className="animate-spin w-3.5 h-3.5 text-amber-600" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <span>Uploading photo…</span>
                </>
              ) : (
                <>
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Order via WhatsApp{photoPreview ? ' + Photo' : ''}</span>
                </>
              )}
            </button>

            <Link
              href={`/customise?product=${product.slug}&title=${encodeURIComponent(product.title)}`}
              onClick={onClose}
              className="text-[#D1D5DB] hover:text-[#FFFFFF] font-semibold flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-[#EAB308]" />
              <span>Open in Full 3D Studio</span>
            </Link>
          </div>

          {/* Info note when photo is uploaded */}
          {photoPreview && (
            <div className="mt-2 bg-[#EAB308]/10 border border-[#EAB308]/40 rounded-xl px-3 py-2 flex items-center gap-2">
              <Send className="w-3.5 h-3.5 text-[#EAB308] shrink-0" />
              <p className="text-[11px] text-[#D1D5DB]">
                Your photo will be <span className="text-[#EAB308] font-semibold">automatically included</span> as a direct link in the WhatsApp message — we can view it instantly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export const ProductCustomizerModal = AddPhotoModal;
