'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  X,
  Ruler,
  Sparkles,
  Check,
  CheckCircle2,
  MessageCircle,
  ShoppingBag,
  ArrowRight,
  Sun,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { Product, ProductVariant } from '@/types';
import { useCart } from '@/context/CartContext';
import { INITIAL_SETTINGS } from '@/lib/data/settings';
import { calculateCustomDimensions } from '@/lib/utils/customSize';

interface CustomSizeModalProps {
  product: Product;
  selectedVariant?: ProductVariant;
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_CUSTOM_SIZES = [
  { w: 12, h: 18, label: '12" × 18"' },
  { w: 16, h: 24, label: '16" × 24"' },
  { w: 18, h: 24, label: '18" × 24"' },
  { w: 20, h: 30, label: '20" × 30"' },
  { w: 24, h: 36, label: '24" × 36"' },
  { w: 30, h: 48, label: '30" × 48"' },
  { w: 36, h: 60, label: '36" × 60"' },
];

export default function CustomSizeModal({
  product,
  selectedVariant,
  isOpen,
  onClose,
}: CustomSizeModalProps) {
  const router = useRouter();
  const { addToCart, openCart } = useCart();

  const [width, setWidth] = useState<number>(24);
  const [height, setHeight] = useState<number>(36);
  const [selectedFrame, setSelectedFrame] = useState<'gold' | 'black' | 'without'>('gold');
  const [thickness, setThickness] = useState<'3mm' | '5mm'>('3mm');
  const [ledEnabled, setLedEnabled] = useState<boolean>(product.hasLedBacklight);
  const [notes, setNotes] = useState<string>('');
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  const calc = useMemo(() => {
    return calculateCustomDimensions(width, height, {
      hasLed: ledEnabled,
      frameType: selectedFrame,
      thickness,
    });
  }, [width, height, ledEnabled, selectedFrame, thickness]);

  if (!isOpen) return null;

  const handleAddToCartCustomSize = (redirectCheckout = false) => {
    const frameLabel =
      selectedFrame === 'gold'
        ? 'Gold Frame'
        : selectedFrame === 'black'
        ? 'Black Frame'
        : `Without Frame (${thickness})`;

    const customSizeTitle = `${product.title} (Custom Size: ${calc.widthInches}" × ${calc.heightInches}")`;
    const customSizeLabel = `${calc.widthInches}" × ${calc.heightInches}" (${calc.dimensionsCm}) [Custom Size]`;

    addToCart(
      {
        productId: product.id,
        slug: product.slug,
        title: customSizeTitle,
        image: product.images[0],
        variantId: `custom-size-${calc.widthInches}x${calc.heightInches}-${selectedFrame}`,
        size: customSizeLabel,
        finish: frameLabel,
        lighting: ledEnabled ? 'Warm LED Backlit (12V Adapter)' : 'No Lighting (Pure Art)',
        shape:
          product.shape === 'portrait' || product.shape === 'landscape' || product.shape === 'square' || product.shape === 'round'
            ? product.shape
            : product.orientation === 'vertical'
            ? 'portrait'
            : product.orientation === 'horizontal'
            ? 'landscape'
            : 'portrait',
        unitPrice: calc.price,
        unitMrp: calc.mrp,
        quantity: 1,
        customization: {
          previewUrl: product.images[0],
          frameType: frameLabel,
          orientation: product.orientation,
          specialInstructions: `Custom Dimension Order: ${calc.widthInches}x${calc.heightInches} inches (${calc.dimensionsCm}) | Area: ${calc.sqFeet} sq ft | Frame: ${frameLabel}${notes.trim() ? ` | Notes: ${notes.trim()}` : ''}`,
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

  const cleanWaNumber = (INITIAL_SETTINGS.whatsappNumber || '919032372782').replace(/[^0-9]/g, '');
  const waText = `Hello Abhi's Gifts, I want to order "${product.title}" in Custom Dimensions:
- Custom Size: ${calc.widthInches}" × ${calc.heightInches}" inches (${calc.dimensionsCm})
- Frame Style: ${selectedFrame === 'gold' ? 'Gold Frame' : selectedFrame === 'black' ? 'Black Frame' : 'Frameless Acrylic'}
- Price: ₹${calc.price.toLocaleString('en-IN')}
${ledEnabled ? '- Lighting: Warm LED Backlit (12V Adapter)\n' : ''}${notes.trim() ? `- Wall Notes: "${notes.trim()}"\n` : ''}
Please assist me with precision laser fabrication.`;

  const waUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(waText)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-[#121212] border border-[#EAB308] rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 bg-[#181818] border-b border-[#2D2D2D] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308] animate-pulse shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#EAB308] block truncate">
                Enter Custom Dimensions
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
                {product.title}
              </p>
              <p className="text-[#D1D5DB] text-[11px] mt-0.5">
                Precision laser-cut to your exact millimeter dimensions. Ideal for mandir pillars, custom wall niches, and grand living halls.
              </p>
            </div>
          </div>

          {/* Step 1: Width & Height Inputs */}
          <div className="bg-[#161616] border-2 border-[#EAB308] rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#2D2D2D] pb-2">
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-[#EAB308]" />
                <span className="text-xs font-bold text-[#FFFFFF] uppercase tracking-wider">
                  1. Enter Width &amp; Height (Inches)
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#EAB308] bg-[#1E1E1E] px-2 py-0.5 rounded border border-[#EAB308]/40">
                Precision Cut
              </span>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Width */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#FFFFFF] uppercase tracking-wider block">
                  Width (Inches)
                </label>
                <div className="flex items-center border border-[#2D2D2D] focus-within:border-[#EAB308] rounded-xl bg-[#1A1A1A] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setWidth((prev) => Math.max(6, prev - 1))}
                    className="px-3 py-2 text-[#D1D5DB] hover:text-[#FFFFFF] hover:bg-[#222222] font-bold text-sm transition-colors cursor-pointer"
                    aria-label="Decrease width"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={6}
                    max={120}
                    value={width}
                    onChange={(e) => setWidth(Math.max(6, Math.min(120, Number(e.target.value) || 6)))}
                    className="w-full bg-transparent text-center font-bold text-base text-[#FFFFFF] outline-none py-1.5"
                  />
                  <button
                    type="button"
                    onClick={() => setWidth((prev) => Math.min(120, prev + 1))}
                    className="px-3 py-2 text-[#D1D5DB] hover:text-[#FFFFFF] hover:bg-[#222222] font-bold text-sm transition-colors cursor-pointer"
                    aria-label="Increase width"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Height */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#FFFFFF] uppercase tracking-wider block">
                  Height (Inches)
                </label>
                <div className="flex items-center border border-[#2D2D2D] focus-within:border-[#EAB308] rounded-xl bg-[#1A1A1A] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setHeight((prev) => Math.max(6, prev - 1))}
                    className="px-3 py-2 text-[#D1D5DB] hover:text-[#FFFFFF] hover:bg-[#222222] font-bold text-sm transition-colors cursor-pointer"
                    aria-label="Decrease height"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={6}
                    max={120}
                    value={height}
                    onChange={(e) => setHeight(Math.max(6, Math.min(120, Number(e.target.value) || 6)))}
                    className="w-full bg-transparent text-center font-bold text-base text-[#FFFFFF] outline-none py-1.5"
                  />
                  <button
                    type="button"
                    onClick={() => setHeight((prev) => Math.min(120, prev + 1))}
                    className="px-3 py-2 text-[#D1D5DB] hover:text-[#FFFFFF] hover:bg-[#222222] font-bold text-sm transition-colors cursor-pointer"
                    aria-label="Increase height"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-semibold text-[#D1D5DB] block">Popular Presets:</span>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
                {PRESET_CUSTOM_SIZES.map((preset) => {
                  const isMatch = width === preset.w && height === preset.h;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setWidth(preset.w);
                        setHeight(preset.h);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all shrink-0 cursor-pointer ${
                        isMatch
                          ? 'bg-[#EAB308] text-black font-bold shadow-xs'
                          : 'bg-[#1C1C1C] hover:bg-[#262626] text-[#FFFFFF] border border-[#2D2D2D]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Metric Conversions Bar */}
            <div className="bg-[#181818] border border-[#2D2D2D] rounded-xl p-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[#EAB308] font-bold font-serif text-sm">
                  {calc.widthInches}&quot; × {calc.heightInches}&quot; in
                </span>
                <span className="text-stone-500">•</span>
                <span className="text-[#D1D5DB] font-mono">
                  {calc.cmWidth} × {calc.cmHeight} cm
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-[#D1D5DB]">
                <span>Surface Area:</span>
                <strong className="text-[#FFFFFF]">{calc.sqFeet} sq ft</strong>
                <span className="text-stone-500">({calc.sqInches} sq in)</span>
              </div>
            </div>
          </div>

          {/* Step 2: Frame Finish */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#FFFFFF] uppercase tracking-wider block">
              2. Select Frame Finish
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedFrame('gold')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  selectedFrame === 'gold'
                    ? 'border-[#EAB308] bg-[#1E1E1E] text-[#FFFFFF] ring-2 ring-[#EAB308]/60 font-bold'
                    : 'border-[#2D2D2D] bg-[#161616] text-[#D1D5DB] hover:border-[#EAB308]/50'
                }`}
              >
                <div className="text-xs font-bold text-[#EAB308]">Gold Frame</div>
                <div className="text-[10px] text-[#D1D5DB] mt-0.5">CNC Beveled</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedFrame('black')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  selectedFrame === 'black'
                    ? 'border-[#EAB308] bg-[#1E1E1E] text-[#FFFFFF] ring-2 ring-[#EAB308]/60 font-bold'
                    : 'border-[#2D2D2D] bg-[#161616] text-[#D1D5DB] hover:border-[#EAB308]/50'
                }`}
              >
                <div className="text-xs font-bold text-[#FFFFFF]">Black Frame</div>
                <div className="text-[10px] text-[#D1D5DB] mt-0.5">Modern Matt</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedFrame('without')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  selectedFrame === 'without'
                    ? 'border-[#EAB308] bg-[#1E1E1E] text-[#FFFFFF] ring-2 ring-[#EAB308]/60 font-bold'
                    : 'border-[#2D2D2D] bg-[#161616] text-[#D1D5DB] hover:border-[#EAB308]/50'
                }`}
              >
                <div className="text-xs font-bold text-[#FFFFFF]">Frameless</div>
                <div className="text-[10px] text-[#D1D5DB] mt-0.5">Pure Acrylic</div>
              </button>
            </div>
          </div>

          {/* Step 3: LED Backlight if product has LED */}
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

          {/* Step 4: Optional Specific Wall Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#FFFFFF] uppercase tracking-wider block">
              3. Wall / Sanctum Notes <span className="text-[#D1D5DB] font-normal lowercase">(optional)</span>
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Mandir niche cutout • 2.5 inch margin required"
              className="w-full bg-[#161616] border border-[#2D2D2D] focus:border-[#EAB308] rounded-xl px-3 py-2 text-xs text-[#FFFFFF] placeholder:text-stone-500 outline-none transition-colors"
              maxLength={100}
            />
          </div>

          {/* Pricing Summary */}
          <div className="bg-[#181818] border border-[#2D2D2D] rounded-xl p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[#D1D5DB] block">Calculated Custom Price</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-lg font-bold text-[#FFFFFF] font-serif">
                  ₹{calc.price.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-[#D1D5DB] line-through">
                  ₹{calc.mrp.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] font-bold text-[#EAB308] bg-[#EAB308]/15 px-1.5 py-0.5 rounded">
                  Save {calc.discountPercent}%
                </span>
              </div>
            </div>

            <div className="text-right text-[11px] text-[#D1D5DB]">
              <span className="text-[#FFFFFF] font-semibold block">
                {calc.widthInches}&quot; × {calc.heightInches}&quot; in
              </span>
              <span>100% precision tolerance guarantee</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#181818] border-t border-[#2D2D2D] space-y-2 shrink-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleAddToCartCustomSize(false)}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-[#EAB308] hover:bg-[#FACC15] text-black shadow-md border border-[#EAB308] transition-all cursor-pointer"
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-black" />
                  <span>Added in Custom Size!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-black" />
                  <span>Add to Cart • ₹{calc.price.toLocaleString('en-IN')}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleAddToCartCustomSize(true)}
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
              <span>Order Custom Size on WhatsApp</span>
            </a>

            <Link
              href={`/product/${product.slug}`}
              onClick={onClose}
              className="text-[#D1D5DB] hover:text-[#FFFFFF] font-semibold flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-[#EAB308]" />
              <span>View Product Details</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
