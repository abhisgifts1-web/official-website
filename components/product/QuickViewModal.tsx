'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, ShieldCheck, Sparkles, ArrowRight, Camera, Ruler, MessageCircle } from 'lucide-react';
import AddPhotoModal from './AddPhotoModal';
import CustomSizeInput from './CustomSizeInput';
import { calculateCustomDimensions } from '@/lib/utils/customSize';
import { Product, ProductVariant } from '@/types';
import { useCart } from '@/context/CartContext';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const router = useRouter();
  const { addToCart, closeCart } = useCart();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isCustomSize, setIsCustomSize] = useState(false);
  const [customWidth, setCustomWidth] = useState<number>(24);
  const [customHeight, setCustomHeight] = useState<number>(36);

  // Hooks MUST all execute before any conditional early return (Rules of Hooks)
  const currentVariant = selectedVariant || (product?.variants?.[0]) || {
    id: 'default',
    size: 'Standard',
    dimensionsCm: '30 x 45 cm',
    finish: 'Acrylic Ultra-Gloss',
    lighting: product?.hasLedBacklight ? 'LED Backlit (12V Adapter)' : 'No Lighting (Pure Art)',
    price: product?.basePrice || 0,
    mrp: product?.baseMrp || 0,
    sku: 'AG-DEF',
    inStock: true,
    stockCount: 20,
  };

  const customSizeCalc = React.useMemo(() => {
    return calculateCustomDimensions(customWidth, customHeight, {
      hasLed: Boolean(product?.hasLedBacklight),
      frameType: currentVariant.finish,
      variants: product?.variants,
      basePrice: product?.basePrice,
      baseMrp: product?.baseMrp,
    });
  }, [customWidth, customHeight, product?.hasLedBacklight, currentVariant.finish, product?.variants, product?.basePrice, product?.baseMrp]);

  // Early return safely AFTER all React hooks
  if (!isOpen || !product) return null;

  const activePrice = isCustomSize ? customSizeCalc.price : currentVariant.price;
  const activeMrp = isCustomSize ? customSizeCalc.mrp : currentVariant.mrp;
  const activeSize = isCustomSize ? `${customSizeCalc.widthInches}" × ${customSizeCalc.heightInches}" (${customSizeCalc.dimensionsCm}) [Custom Size]` : currentVariant.size;

  const currentImg = activeImage || product.images[0];

  const handleBuyNow = () => {
    addToCart(
      {
        productId: product.id,
        slug: product.slug,
        title: product.title,
        image: currentImg,
        variantId: isCustomSize ? `custom-size-${customWidth}x${customHeight}` : currentVariant.id,
        size: activeSize,
        finish: currentVariant.finish,
        lighting: currentVariant.lighting,
        unitPrice: activePrice,
        unitMrp: activeMrp,
        quantity,
      },
      false
    );
    closeCart();
    onClose();
    router.push('/checkout');
  };

  return (
    <>
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-3xl bg-white text-stone-900 rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 p-2 text-stone-500 hover:text-stone-900 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors shadow-xs cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Image View */}
            <div className="p-6 bg-stone-50 border-r border-stone-200 flex flex-col justify-between">
              <div className="aspect-square w-full relative rounded-xl overflow-hidden bg-white shadow-xs border border-stone-200">
                <img
                  src={currentImg}
                  alt={product.title}
                  onError={(e) => {
                    if (product.images?.[0]) { (e.target as HTMLImageElement).src = product.images[0]; }
                  }}
                  className="w-full h-full object-cover"
                />
                {product.hasLedBacklight && (
                  <span className="absolute top-3 left-3 bg-[#EAB308] text-stone-950 font-bold text-[10px] uppercase px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Warm Backlit LED
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImage(img)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                        currentImg === img ? 'border-amber-500 scale-105' : 'border-stone-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Details */}
            <div className="p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-700 bg-stone-100 border border-stone-200 px-2.5 py-0.5 rounded-full inline-block">
                    {product.categoryName}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full inline-block capitalize">
                    {product.shape || (product.orientation === 'vertical' ? 'portrait' : product.orientation === 'horizontal' ? 'landscape' : product.orientation)}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-xl text-stone-900 leading-tight">
                  {product.title}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-2.5 pt-1">
                  <span className="font-serif text-2xl font-bold text-stone-900">
                    ₹{activePrice.toLocaleString('en-IN')}
                  </span>
                  {activeMrp > activePrice && (
                    <>
                      <span className="text-sm text-stone-400 line-through">
                        ₹{activeMrp.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                        Save {Math.round(((activeMrp - activePrice) / activeMrp) * 100)}%
                      </span>
                    </>
                  )}
                </div>

                <p className="text-xs text-stone-600 line-clamp-2">
                  {product.shortDescription}
                </p>

                {/* Size options */}
                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-semibold text-stone-900 block">
                    Choose Size ({product.shape || product.orientation}): <span className="font-normal text-stone-600">{currentVariant.size}</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => {
                          setIsCustomSize(false);
                          setSelectedVariant(v);
                        }}
                        className={`px-3 py-2 text-xs font-medium rounded-lg border text-left transition-all cursor-pointer ${
                          !isCustomSize && currentVariant.id === v.id
                            ? 'border-amber-500 bg-amber-50 text-stone-900 font-bold ring-1 ring-amber-400'
                            : 'border-stone-200 text-stone-700 hover:border-amber-300 bg-white'
                        }`}
                      >
                        <div className="text-stone-900 font-semibold">{v.size.split('(')[0]}</div>
                        <div className="text-[11px] text-amber-700 font-bold">₹{v.price.toLocaleString('en-IN')}</div>
                      </button>
                    ))}

                    {/* Custom Size Option */}
                    <button
                      type="button"
                      onClick={() => setIsCustomSize(true)}
                      className={`px-3 py-2 text-xs font-medium rounded-lg border text-left transition-all cursor-pointer ${
                        isCustomSize
                          ? 'border-amber-500 bg-amber-50 text-stone-900 font-bold ring-1 ring-amber-400'
                          : 'border-stone-200 text-stone-700 hover:border-amber-300 bg-white'
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1 text-amber-700">
                        <Ruler className="w-3 h-3 text-amber-600" /> Custom Size
                      </div>
                      <div className="text-[11px] text-[#25D366] font-medium">Price in WhatsApp chat</div>
                    </button>
                  </div>

                  {isCustomSize && (
                    <div className="pt-2">
                      <CustomSizeInput
                        width={customWidth}
                        height={customHeight}
                        onChangeWidth={setCustomWidth}
                        onChangeHeight={setCustomHeight}
                        calc={customSizeCalc}
                        compact={true}
                      />
                    </div>
                  )}
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-xs font-semibold text-stone-900">Quantity:</span>
                  <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 py-1 text-stone-700 hover:bg-stone-200 rounded-l-lg cursor-pointer font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-semibold text-stone-900">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="px-2.5 py-1 text-stone-700 hover:bg-stone-200 rounded-r-lg cursor-pointer font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Button: Direct Buy Now with WhatsApp Order Option */}
              <div className="space-y-2 pt-4">
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full bg-[#EAB308] hover:bg-[#FACC15] text-stone-950 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md border border-amber-500 transition-all cursor-pointer uppercase tracking-wider"
                >
                  <span>Buy Now • ₹{(activePrice * quantity).toLocaleString('en-IN')}</span>
                  <ArrowRight className="w-4 h-4 text-stone-950" />
                </button>

                {isCustomSize && (
                  <a
                    href={`https://wa.me/${(INITIAL_SETTINGS.whatsappNumber || '919032372782').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hello Abhi's Gifts! I would like to order "${product.title}" in Custom Size (${customWidth}x${customHeight} inches, ₹${activePrice.toLocaleString('en-IN')}). Please assist with proofing.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 text-[#128C7E] py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current text-[#25D366]" />
                    <span>Order via WhatsApp (₹{activePrice.toLocaleString('en-IN')})</span>
                  </a>
                )}

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="flex items-center gap-1 text-stone-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> Protective Packaging
                  </span>
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="text-stone-800 hover:text-amber-700 font-semibold flex items-center gap-0.5 transition-colors"
                  >
                    <span>Full Product Specifications</span>
                    <ArrowRight className="w-3 h-3 text-amber-600" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      {/* Unified Custom Photo & Size Modal */}
      <AddPhotoModal
        product={product}
        selectedVariant={currentVariant}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
      />
    </>
  );
}
