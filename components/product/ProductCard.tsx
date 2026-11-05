'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, Eye, ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import QuickViewModal from './QuickViewModal';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const router = useRouter();
  const { addToCart, closeCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

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

  const [selectedVariant, setSelectedVariant] = useState(product.variants[0] || defaultVariant);
  const activeVariant = selectedVariant || defaultVariant;

  const handleInstantBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(
      {
        productId: product.id,
        slug: product.slug,
        title: product.title,
        image: product.images[0],
        variantId: activeVariant.id,
        size: activeVariant.size,
        finish: activeVariant.finish,
        lighting: activeVariant.lighting,
        unitPrice: activeVariant.price,
        unitMrp: activeVariant.mrp,
        quantity: 1,
      },
      false
    );

    closeCart();
    router.push('/checkout');
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(
      {
        productId: product.id,
        slug: product.slug,
        title: product.title,
        image: product.images[0],
        variantId: activeVariant.id,
        size: activeVariant.size,
        finish: activeVariant.finish,
        lighting: activeVariant.lighting,
        unitPrice: activeVariant.price,
        unitMrp: activeVariant.mrp,
        quantity: 1,
      },
      true
    );
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.slug);
  };

  const hasSecondaryImage = product.images.length > 1;
  const currentImage = isHovered && hasSecondaryImage ? product.images[1] : product.images[0];
  const wishlisted = isInWishlist(product.slug);

  // Accurate discount calculation - calculated live for the selected size/variant
  const activePrice = activeVariant.price || product.basePrice;
  const activeMrp = activeVariant.mrp || product.baseMrp;
  const hasRealDiscount = activeMrp > activePrice;
  const discountPercent = hasRealDiscount
    ? Math.round(((activeMrp - activePrice) / activeMrp) * 100)
    : 0;

  // Authentic fallback image if remote network fails
  const displayImage = imgError ? (product.images[0] || '') : currentImage;

  return (
    <>
      <div
        className="group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-[#EAB308] shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-[#EAB308]/50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Attractive Photoframe Matting Container with Calibrated Aspect Ratio */}
        <div className="relative aspect-[4/3.8] w-full p-2 bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100 border-b border-stone-200 overflow-hidden">
          {/* Inner Framed Core with Gold Accent Border */}
          <div className="relative w-full h-full rounded-xl overflow-hidden shadow-inner border border-stone-200 bg-white group/frame">
            <Link
              href={`/product/${product.slug}`}
              prefetch={true}
              className="block w-full h-full outline-none focus-visible:ring-2 focus-visible:ring-[#EAB308]"
              aria-label={`View details for ${product.title}`}
            >
              <img
                src={displayImage}
                alt={product.title}
                onError={() => setImgError(true)}
                className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106 ${
                  product.hasLedBacklight ? 'led-glow-warm' : ''
                }`}
                loading={priority ? 'eager' : 'lazy'}
                width={400}
                height={450}
              />
            </Link>

            {/* Premium Acrylic Glass Sheen Sweep */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-white/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Genuine Badges Overlay — Clean Horizontal Layout */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 pointer-events-none z-10">
            {hasRealDiscount && discountPercent > 0 && (
              <span className="bg-[#EAB308] text-black font-bold text-[9px] sm:text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full shadow-sm border border-[#EAB308]/50 backdrop-blur-sm">
                {discountPercent}% OFF
              </span>
            )}
            {product.hasLedBacklight ? (
              <span className="bg-amber-50 text-amber-900 font-bold text-[9px] sm:text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full shadow-sm border border-amber-300 backdrop-blur-sm flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-amber-600 animate-pulse" />
                <span>LED Backlit</span>
              </span>
            ) : (
              <span className="bg-stone-100 text-stone-800 font-bold text-[9px] sm:text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full shadow-sm border border-stone-300 backdrop-blur-sm flex items-center gap-1">
                <span>Normal Acrylic</span>
              </span>
            )}
            {!hasRealDiscount && product.isBestseller && (
              <span className="bg-amber-50 text-amber-900 font-bold text-[9px] sm:text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full shadow-sm border border-amber-300 backdrop-blur-sm">
                ★ Best
              </span>
            )}
          </div>

          {/* Top Right Wishlist Toggle with Active Feedback */}
          <button
            type="button"
            onClick={handleWishlistToggle}
            className={`absolute top-2.5 right-2.5 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center p-2 rounded-full transition-all duration-200 z-10 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-[#EAB308] cursor-pointer ${
              wishlisted
                ? 'bg-rose-50 text-rose-600 border border-rose-200 scale-105 shadow-rose-100'
                : 'bg-white/90 backdrop-blur-sm text-stone-700 hover:text-[#EAB308] hover:bg-white hover:scale-105 border border-stone-200'
            }`}
            aria-label={wishlisted ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
          >
            <Heart className={`w-3.5 h-3.5 transition-transform ${wishlisted ? 'fill-current scale-110' : ''}`} />
          </button>

          {/* Desktop Hover Floating Quick Preview Pill */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsQuickViewOpen(true);
            }}
            aria-label={`Quick view ${product.title}`}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 hidden md:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/95 hover:bg-[#EAB308] hover:text-black text-stone-900 font-semibold text-[11px] shadow-md backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 border border-stone-200 z-10 cursor-pointer"
          >
            <Eye className="w-3 h-3 text-[#EAB308]" />
            <span>Quick View</span>
          </button>
        </div>

        {/* Content Details */}
        <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between">
          <div className="space-y-1">
            {/* Category Tag */}
            <p className="text-[10px] sm:text-[11px] font-bold text-stone-700 uppercase tracking-wider truncate">
              {product.categoryName}
            </p>

            {/* Product Title */}
            <Link href={`/product/${product.slug}`} prefetch={true} className="block group-hover:text-amber-800 transition-colors">
              <h3 className="font-serif font-bold text-xs sm:text-sm text-stone-900 leading-snug line-clamp-1">
                {product.title}
              </h3>
            </Link>

            {/* Pricing */}
            <div className="flex items-baseline justify-between pt-1">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-sm sm:text-base font-bold text-stone-900 whitespace-nowrap">
                  ₹{activePrice.toLocaleString('en-IN')}
                </span>
                {hasRealDiscount && (
                  <span className="text-[11px] text-stone-500 line-through whitespace-nowrap">
                    ₹{activeMrp.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              {hasRealDiscount && discountPercent > 0 && (
                <span className="text-[10px] font-bold text-amber-900 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 shrink-0">
                  Save {discountPercent}%
                </span>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2.5">
            <button
              type="button"
              onClick={handleInstantBuyNow}
              className="w-full min-h-[38px] py-2 px-3 rounded-xl font-sans text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 shadow-2xs active:scale-[0.98] bg-[#EAB308] hover:bg-[#FACC15] text-black hover:shadow-xs border border-[#EAB308] cursor-pointer"
              aria-label={`Buy ${product.title} now`}
              title="Buy It Now"
            >
              <span>Buy Now</span>
              <ArrowRight className="w-3.5 h-3.5 text-black shrink-0" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
