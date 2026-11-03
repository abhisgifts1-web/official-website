'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { Product, ProductVariant } from '@/types';
import { useCart } from '@/context/CartContext';

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

  if (!isOpen || !product) return null;

  const currentVariant = selectedVariant || product.variants[0] || {
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

  const currentImg = activeImage || product.images[0];

  const handleBuyNow = () => {
    addToCart(
      {
        productId: product.id,
        slug: product.slug,
        title: product.title,
        image: currentImg,
        variantId: currentVariant.id,
        size: currentVariant.size,
        finish: currentVariant.finish,
        lighting: currentVariant.lighting,
        unitPrice: currentVariant.price,
        unitMrp: currentVariant.mrp,
        quantity,
      },
      false
    );
    closeCart();
    onClose();
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-3xl bg-[#181818] rounded-2xl shadow-2xl border border-[#2D2D2D] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 p-2 text-gray-500 hover:text-white rounded-full bg-[#222222] hover:bg-[#333333] text-white shadow-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Image View */}
            <div className="p-6 bg-[#141414] flex flex-col justify-between">
              <div className="aspect-square w-full relative rounded-xl overflow-hidden bg-[#181818] shadow-sm border border-[#2D2D2D]">
                <img
                  src={currentImg}
                  alt={product.title}
                  onError={(e) => {
                    if (product.images?.[0]) { (e.target as HTMLImageElement).src = product.images[0]; }
                  }}
                  className="w-full h-full object-cover"
                />
                {product.hasLedBacklight && (
                  <span className="absolute top-3 left-3 bg-amber-500 text-stone-950 font-bold text-[10px] uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
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
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                        currentImg === img ? 'border-amber-600 scale-105' : 'border-[#2D2D2D] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Details */}
            <div className="p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#FFFFFF] bg-[#1E1E1E] border border-[#EAB308]/50 px-2.5 py-0.5 rounded-full inline-block">
                    {product.categoryName}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#EAB308] bg-[#181818] border border-[#2D2D2D] px-2.5 py-0.5 rounded-full inline-block capitalize">
                    {product.shape || (product.orientation === 'vertical' ? 'portrait' : product.orientation === 'horizontal' ? 'landscape' : product.orientation)}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-xl text-[#FFFFFF] leading-tight">
                  {product.title}
                </h3>

                

                {/* Price */}
                <div className="flex items-baseline gap-2.5 pt-1">
                  <span className="font-serif text-2xl font-bold text-[#FFFFFF]">
                    ₹{currentVariant.price.toLocaleString('en-IN')}
                  </span>
                  {currentVariant.mrp > currentVariant.price && (
                    <>
                      <span className="text-sm text-[#D1D5DB]/70 line-through">
                        ₹{currentVariant.mrp.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-bold text-[#FFFFFF] bg-[#1E1E1E] px-2 py-0.5 rounded border border-[#EAB308]/40">
                        Save {Math.round(((currentVariant.mrp - currentVariant.price) / currentVariant.mrp) * 100)}%
                      </span>
                    </>
                  )}
                </div>

                <p className="text-xs text-[#D1D5DB] line-clamp-2">
                  {product.shortDescription}
                </p>

                {/* Size options */}
                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-semibold text-[#FFFFFF] block">
                    Choose Size ({product.shape || product.orientation}): <span className="font-normal text-[#D1D5DB]">{currentVariant.size}</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        className={`px-3 py-2 text-xs font-medium rounded-lg border text-left transition-all ${
                          currentVariant.id === v.id
                            ? 'border-[#EAB308] bg-[#1E1E1E] text-[#FFFFFF] font-bold ring-1 ring-[#EAB308]'
                            : 'border-[#2D2D2D] text-[#FFFFFF] hover:border-[#EAB308]'
                        }`}
                      >
                        <div>{v.size.split('(')[0]}</div>
                        <div className="text-[11px] text-[#FFFFFF] font-bold">₹{v.price.toLocaleString('en-IN')}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-xs font-semibold text-[#FFFFFF]">Quantity:</span>
                  <div className="flex items-center border border-[#2D2D2D] rounded-lg">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 py-1 text-[#FFFFFF] hover:bg-[#121212] rounded-l-lg"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-semibold text-[#FFFFFF]">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="px-2.5 py-1 text-[#FFFFFF] hover:bg-[#121212] rounded-r-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Button: Direct Buy Now */}
              <div className="space-y-2 pt-4">
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full bg-[#EAB308] hover:bg-[#FACC15] text-[#000000] py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(101,30,45,0.3)] border border-[#EAB308]/50 transition-all cursor-pointer"
                >
                  <span>Buy Now • ₹{(currentVariant.price * quantity).toLocaleString('en-IN')}</span>
                  <ArrowRight className="w-4 h-4 text-[#EAB308]" />
                </button>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="flex items-center gap-1 text-[#D1D5DB]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#EAB308]" /> Transit Safe Guarantee
                  </span>
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="text-[#FFFFFF] hover:text-[#EAB308] font-semibold flex items-center gap-0.5 transition-colors"
                  >
                    <span>Full Product Specifications</span>
                    <ArrowRight className="w-3 h-3 text-[#EAB308]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
