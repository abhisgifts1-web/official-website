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
        className="card-interactive-transform group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-[#FEE815] shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_-8px_rgba(0,0,0,0.12),0_0_24px_rgba(254,232,21,0.28)] transition-all duration-300 hover:-translate-y-1.5 focus-within:ring-2 focus-within:ring-[#FEE815]/50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Attractive Photoframe Matting Container with Calibrated Aspect Ratio */}
        <div className="relative aspect-[4/3.8] w-full p-1.5 bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100 border-b border-stone-200 overflow-hidden">
          {/* Inner Framed Core with Gold Accent Border */}
          <div className="relative w-full h-full rounded-xl overflow-hidden shadow-inner border border-stone-200 bg-white group/frame">
            <Link
              href={`/product/${product.slug}`}
              prefetch={true}
              className="block w-full h-full outline-none focus-visible:ring-2 focus-visible:ring-[#FEE815]"
              aria-label={`View details for ${product.title}`}
            >
              <img
                src={displayImage}
                alt={product.title}
                onError={() => setImgError(true)}
                className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 img-zoom-transform ${
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
          <div className="absolute top-2 left-2 flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-1.5 pointer-events-none z-10 max-w-[calc(100%-2.5rem)]">
            {hasRealDiscount && discountPercent > 0 && (
              <span className="bg-[#FEE815] text-black font-bold text-[8px] min-[360px]:text-[9px] sm:text-[10px] tracking-wider uppercase px-1.5 sm:px-2 py-0.5 rounded-full shadow-sm border border-[#FEE815]/50 backdrop-blur-sm">
                {discountPercent}% OFF
              </span>
            )}
            {product.hasLedBacklight ? (
              <span className="bg-amber-50 text-amber-900 font-bold text-[8px] min-[360px]:text-[9px] sm:text-[10px] tracking-wider uppercase px-1.5 sm:px-2 py-0.5 rounded-full shadow-sm border border-amber-300 backdrop-blur-sm flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-amber-600 animate-pulse" />
                <span>LED Backlit</span>
              </span>
            ) : (
              <span className="bg-stone-100 text-stone-800 font-bold text-[8px] min-[360px]:text-[9px] sm:text-[10px] tracking-wider uppercase px-1.5 sm:px-2 py-0.5 rounded-full shadow-sm border border-stone-300 backdrop-blur-sm flex items-center gap-1">
                <span>Normal Acrylic</span>
              </span>
            )}
            {!hasRealDiscount && product.isBestseller && (
              <span className="bg-amber-50 text-amber-900 font-bold text-[8px] min-[360px]:text-[9px] sm:text-[10px] tracking-wider uppercase px-1.5 sm:px-2 py-0.5 rounded-full shadow-sm border border-amber-300 backdrop-blur-sm">
                ★ Best
              </span>
            )}
          </div>

          {/* Top Right Wishlist Toggle with Active Feedback */}
          <button
            type="button"
            onClick={handleWishlistToggle}
            className={`btn-press-bounce absolute top-2 right-2 w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center p-1.5 sm:p-2 rounded-full transition-all duration-200 z-10 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-[#FEE815] cursor-pointer ${
              wishlisted
                ? 'bg-[#FEE815] text-black border border-[#FEE815] scale-105 shadow-sm'
                : 'bg-white/90 backdrop-blur-sm text-stone-700 hover:text-black hover:bg-[#FEE815] hover:scale-105 border border-stone-200'
            }`}
            aria-label={wishlisted ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
          >
            <Heart className={`w-3.5 h-3.5 transition-transform ${wishlisted ? 'fill-current scale-110 text-black' : ''}`} />
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
            className="btn-shimmer-sweep btn-press-bounce absolute bottom-2.5 left-1/2 -translate-x-1/2 hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 hover:bg-[#FEE815] hover:text-black text-stone-900 font-bold text-[11px] shadow-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-108 border border-stone-200 z-10 cursor-pointer translate-y-2 group-hover:translate-y-0"
          >
            <Eye className="w-3 h-3 text-stone-950" />
            <span>Quick View</span>
          </button>
        </div>

        {/* Content Details */}
        <div className="p-2.5 sm:p-3.5 flex-1 flex flex-col justify-between">
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
            <div className="flex flex-wrap items-baseline justify-between gap-1 pt-1">
              <div className="flex items-baseline gap-1 sm:gap-1.5 flex-wrap">
                <span className="font-serif text-xs min-[360px]:text-sm sm:text-base font-bold text-stone-900 whitespace-nowrap">
                  ₹{activePrice.toLocaleString('en-IN')}
                </span>
                {hasRealDiscount && (
                  <span className="text-[10px] sm:text-[11px] text-stone-500 line-through whitespace-nowrap">
                    ₹{activeMrp.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              {hasRealDiscount && discountPercent > 0 && (
                <span className="text-[9px] min-[360px]:text-[10px] font-bold text-black bg-[#FEE815] px-1.5 py-0.2 sm:py-0.5 rounded border border-[#FEE815]/60 shrink-0">
                  Save {discountPercent}%
                </span>
              )}
            </div>
          </div>

          {/* Action Button: View */}
          <div className="pt-2.5">
            <Link
              href={`/product/${product.slug}`}
              className="btn-luxury-primary btn-shimmer-sweep group w-full min-h-[32px] sm:min-h-[38px] py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg sm:rounded-xl font-sans text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer uppercase tracking-wider"
              aria-label={`View ${product.title}`}
              title="View"
            >
              <span>View</span>
              <ArrowRight className="w-3.5 h-3.5 text-black group-hover:translate-x-1.5 transition-transform duration-300 shrink-0 icon-bounce-right" />
            </Link>
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
