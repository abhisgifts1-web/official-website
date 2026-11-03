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
} from 'lucide-react';
import { Product, ProductVariant } from '@/types';
import CustomSizeInput from './CustomSizeInput';
import { calculateCustomDimensions } from '@/lib/utils/customSize';
import { useCart } from '@/context/CartContext';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

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
    lighting: product.hasLedBacklight ? 'Warm LED Backlit (12V Adapter)' : 'No Lighting (Pure Art)',
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
    });
  }, [customWidth, customHeight, ledEnabled, activeVariant.finish]);

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
  const photoLine = photoPreview ? '- Custom Photo: Personal photo uploaded' : '- Artwork: Original artwork';
  const waOrderText = [
    `Hello Abhi's Gifts, I want to customise "${product.title}":`,
    photoLine,
    `- Size: ${activeSizeLabel}`,
    `- Price: ₹${activePrice.toLocaleString('en-IN')}`,
    ledEnabled ? '- Lighting: Warm LED Backlit (12V Adapter)' : '',
    customText.trim() ? `- Personalization Text: "${customText.trim()}"` : '',
    'Please assist me with proofing and placing the order.',
  ].filter(Boolean).join('\n');
  const waUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(waOrderText)}`;

  // Early return AFTER all hooks
  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
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
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCartWithPhoto = (redirectCheckout = false) => {
    const finalImage = photoPreview || product.images[0];
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
        lighting: ledEnabled ? 'Warm LED Backlit (12V Adapter)' : 'No Lighting (Pure Art)',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-[#121212] border border-[#EAB308] rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 bg-[#181818] border-b border-[#2D2D2D] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308] animate-pulse shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#EAB308] block truncate">
                Customise: Photo & Size
              </span>
              <h2 className="font-serif font-bold text-sm sm:text-base text-[#FFFFFF] truncate">
                {product.title}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#222222] hover:bg-[#EAB308] text-white hover:text-black border border-[#2D2D2D] flex items-center justify-center transition-colors shrink-0 ml-2 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Product context pill */}
          <div className="bg-[#181818] border border-[#2D2D2D] rounded-xl p-3 flex items-center gap-3">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-12 h-12 object-cover rounded-lg border border-[#EAB308]/40 shrink-0"
            />
            <div className="text-xs min-w-0 flex-1">
              <p className="text-[#FFFFFF] font-bold truncate">
                Personalized {product.title}
              </p>
              <p className="text-[#D1D5DB] text-[11px] mt-0.5">
                Customise this frame with your own photo, custom width & height dimensions, or both. Precision crafted in Hyderabad.
              </p>
            </div>
          </div>

          {/* Photo Upload & Live Mockup */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#FFFFFF] uppercase tracking-wider flex items-center justify-between">
              <span>1. Personal Photo <span className="text-[#D1D5DB] font-normal lowercase">(optional — upload your photo or keep original artwork)</span></span>
              {photoPreview && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[11px] font-medium text-[#EAB308] hover:underline flex items-center gap-1 cursor-pointer"
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
                className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 bg-[#161616] hover:bg-[#1E1E1E] ${
                  isDragging
                    ? 'border-[#EAB308] bg-[#1E1E1E] scale-[1.01]'
                    : 'border-[#333333] hover:border-[#EAB308]/70'
                }`}
              >
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-[#EAB308]/15 border border-[#EAB308]/40 flex items-center justify-center text-[#EAB308]">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-[#FFFFFF]">
                      Click or Drag &amp; Drop Your Photo Here
                    </p>
                    <p className="text-[11px] text-[#D1D5DB] mt-1">
                      Upload any family, wedding, birthday, portrait, or devotional photo (JPG, PNG, WebP)
                    </p>
                  </div>
                  <button
                    type="button"
                    className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#EAB308] hover:bg-[#FACC15] text-black font-bold text-xs shadow-md transition-colors pointer-events-none"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Select Photo from Device</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#EAB308] bg-[#0A0A0A] p-3 flex flex-col items-center">
                {/* Acrylic Frame Mockup */}
                <div
                  className={`relative max-w-sm w-full aspect-[4/3] rounded-xl overflow-hidden border border-[#EAB308]/80 shadow-[0_8px_30px_rgba(0,0,0,0.9)] bg-[#121212] transition-all ${
                    ledEnabled ? 'ring-4 ring-[#EAB308]/40 shadow-[0_0_35px_rgba(234,179,8,0.35)]' : ''
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
                  <div className="absolute bottom-2 left-2 bg-[#121212]/90 border border-[#EAB308]/60 px-2 py-0.5 rounded text-[10px] text-[#EAB308] font-bold">
                    {product.title} • {activeSizeLabel}
                  </div>
                </div>

                <div className="mt-2.5 flex items-center justify-between w-full text-xs">
                  <span className="text-[#D1D5DB] text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#EAB308]" />
                    Photo ready for {product.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[11px] font-bold text-[#EAB308] hover:text-[#FFFFFF] underline cursor-pointer"
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
              <label className="text-xs font-bold text-[#FFFFFF] uppercase tracking-wider block">
                2. Frame Size:{' '}
                <span className="text-[#EAB308] font-serif font-bold normal-case">
                  {isCustomSize ? `${customWidth}" × ${customHeight}" Custom Size` : activeVariant.size}
                </span>
              </label>
              {isCustomSize && (
                <button
                  type="button"
                  onClick={() => setIsCustomSize(false)}
                  className="text-[10px] font-bold text-[#EAB308] hover:underline uppercase tracking-wider cursor-pointer"
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
                        ? 'border-[#EAB308] bg-[#1E1E1E] text-[#FFFFFF] ring-2 ring-[#EAB308]/60 shadow-sm'
                        : 'border-[#2D2D2D] bg-[#161616] text-[#D1D5DB] hover:border-[#EAB308]/50 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-xs truncate">{cleanSize}</div>
                    <div className="text-[11px] text-[#EAB308] font-bold mt-0.5">
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
                    ? 'border-[#EAB308] bg-[#1E1E1E] text-[#FFFFFF] ring-2 ring-[#EAB308]/60 shadow-sm'
                    : 'border-[#2D2D2D] bg-[#161616] text-[#D1D5DB] hover:border-[#EAB308]/50 hover:text-white'
                }`}
              >
                <div className="font-bold text-xs flex items-center gap-1 text-[#EAB308]">
                  <Ruler className="w-3.5 h-3.5 text-[#EAB308]" /> Custom Size
                </div>
                <div className="text-[11px] text-[#FFFFFF] font-medium mt-0.5">
                  Enter W × H
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
            <div className="bg-[#181818] border border-[#2D2D2D] rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-[#EAB308]" />
                <span className="text-xs font-bold text-[#FFFFFF]">
                  Warm LED Backlit Illumination
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLedEnabled(!ledEnabled)}
                className={`px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                  ledEnabled
                    ? 'bg-[#EAB308] text-black border-[#EAB308]'
                    : 'bg-[#222222] text-[#D1D5DB] border-[#333333]'
                }`}
              >
                {ledEnabled ? 'ON' : 'OFF'}
              </button>
            </div>
          )}

          {/* Optional Personalization Text */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#FFFFFF] uppercase tracking-wider block">
              3. Custom Text / Dedication <span className="text-[#D1D5DB] font-normal lowercase">(optional)</span>
            </label>
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="e.g. Ramesh &amp; Priya • 25th Anniversary • 12 May 2026"
              className="w-full bg-[#161616] border border-[#2D2D2D] focus:border-[#EAB308] rounded-xl px-3 py-2 text-xs text-[#FFFFFF] placeholder:text-stone-500 outline-none transition-colors"
              maxLength={80}
            />
          </div>

          {/* Price Summary */}
          <div className="bg-[#181818] border border-[#2D2D2D] rounded-xl p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[#D1D5DB] block">Item Price with Custom Photo</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-lg font-bold text-[#FFFFFF] font-serif">
                  ₹{activePrice.toLocaleString('en-IN')}
                </span>
                {hasRealDiscount && (
                  <span className="text-xs text-[#D1D5DB] line-through">
                    ₹{activeMrp.toLocaleString('en-IN')}
                  </span>
                )}
                {hasRealDiscount && discountPercent > 0 && (
                  <span className="text-[10px] font-bold text-[#EAB308] bg-[#EAB308]/15 px-1.5 py-0.5 rounded">
                    Save {discountPercent}%
                  </span>
                )}
              </div>
            </div>

            <div className="text-right text-[11px] text-[#D1D5DB]">
              <span className="text-[#FFFFFF] font-semibold block">{activeSizeLabel}</span>
              <span>1:1 WhatsApp proof before print</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#181818] border-t border-[#2D2D2D] space-y-2 shrink-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleAddToCartWithPhoto(false)}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-[#EAB308] hover:bg-[#FACC15] text-black shadow-md border border-[#EAB308] transition-all cursor-pointer"
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-black" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-black" />
                  <span>Add to Cart • ₹{activePrice.toLocaleString('en-IN')}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleAddToCartWithPhoto(true)}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-[#121212] hover:bg-[#222222] text-[#FFFFFF] hover:text-[#EAB308] border border-[#EAB308] transition-all cursor-pointer"
            >
              <span>Instant Buy Now</span>
              <ArrowRight className="w-4 h-4 text-[#EAB308]" />
            </button>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#EAB308] hover:underline font-semibold flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Order via WhatsApp with Photo</span>
            </a>

            <Link
              href={`/customise?product=${product.slug}&title=${encodeURIComponent(product.title)}`}
              onClick={onClose}
              className="text-[#D1D5DB] hover:text-[#FFFFFF] font-semibold flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-[#EAB308]" />
              <span>Open in Full 3D Studio</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


export const ProductCustomizerModal = AddPhotoModal;
