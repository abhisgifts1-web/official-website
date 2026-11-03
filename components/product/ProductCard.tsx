'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, Eye, ArrowRight, Sparkles, Truck, ShoppingBag, Camera, Ruler } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import QuickViewModal from './QuickViewModal';
import AddPhotoModal from './AddPhotoModal';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const router = useRouter();
  const { addToCart, closeCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

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
        className="group relative flex flex-col h-full bg-[#181818] rounded-2xl overflow-hidden border border-[#2D2D2D] hover:border-[#EAB308] shadow-[0_2px_12px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_28px_rgba(234,179,8,0.15)] transition-all duration-300 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-[#EAB308]/50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Attractive Photoframe Matting Container with Calibrated Aspect Ratio */}
        <div className="relative aspect-[4/3.8] w-full p-2 bg-gradient-to-b from-[#161616] via-[#121212] to-[#141414] border-b border-[#EAB308]/40 overflow-hidden">
          {/* Inner Framed Core with Gold Accent Border */}
          <div className="relative w-full h-full rounded-xl overflow-hidden shadow-inner border border-[#EAB308]/70 bg-[#121212] group/frame">
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
              <span className="bg-[#EAB308] text-black font-bold text-[9px] sm:text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full shadow-md border border-[#EAB308]/50 backdrop-blur-sm">
                {discountPercent}% OFF
              </span>
            )}
            {product.hasLedBacklight ? (
              <span className="bg-[#121212]/95 text-[#FACC15] font-bold text-[9px] sm:text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full shadow-md border border-[#EAB308]/60 backdrop-blur-sm flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-[#FACC15] animate-pulse" />
                <span>LED Backlit</span>
              </span>
            ) : (
              <span className="bg-[#222222] text-white font-bold text-[9px] sm:text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full shadow-md border border-[#2D2D2D] backdrop-blur-sm flex items-center gap-1">
                <span>Normal Acrylic</span>
              </span>
            )}
            {!hasRealDiscount && product.isBestseller && (
              <span className="bg-[#121212]/90 text-[#FACC15] font-bold text-[9px] sm:text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full shadow-md border border-[#EAB308]/50 backdrop-blur-sm">
                ★ Best
              </span>
            )}
          </div>

          {/* Top Right Wishlist Toggle with Active Feedback */}
          <button
            type="button"
            onClick={handleWishlistToggle}
            className={`absolute top-2.5 right-2.5 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center p-2 rounded-full transition-all duration-200 z-10 shadow-md outline-none focus-visible:ring-2 focus-visible:ring-[#EAB308] cursor-pointer ${
              wishlisted
                ? 'bg-rose-50 text-rose-600 border border-rose-200 scale-105 shadow-rose-100'
                : 'bg-[#222222]/90 backdrop-blur-sm text-[#FFFFFF] hover:text-[#EAB308] hover:bg-white hover:scale-105 border border-[#2D2D2D]'
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
            className="absolute bottom-2 left-1/2 -translate-x-1/2 hidden md:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#222222] hover:bg-[#EAB308] hover:text-[#FFFFFF] text-[#FFFFFF] font-semibold text-[11px] shadow-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 border border-[#2D2D2D] z-10 cursor-pointer"
          >
            <Eye className="w-3 h-3 text-[#EAB308]" />
            <span>Quick View</span>
          </button>
        </div>

        {/* Content Details */}
        <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between">
          <div className="space-y-1.5">
            {/* Category Tag & Orientation Badge */}
            <div className="flex items-center justify-between gap-1.5">
              <span className="text-[9px] sm:text-[10px] font-bold tracking-wider uppercase text-[#FFFFFF] bg-[#1E1E1E] border border-[#EAB308]/50 px-2 py-0.5 rounded-md truncate max-w-[130px]">
                {product.deity || product.categoryName}
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#EAB308] bg-[#181818] border border-[#2D2D2D] px-2 py-0.5 rounded-md shrink-0 capitalize">
                {product.shape || (product.orientation === 'vertical' ? 'portrait' : product.orientation === 'horizontal' ? 'landscape' : product.orientation)}
              </span>
            </div>

            {/* Product Title */}
            <Link href={`/product/${product.slug}`} prefetch={true} className="block group-hover:text-[#EAB308] transition-colors">
              <h3 className="font-serif font-bold text-xs sm:text-sm text-[#FFFFFF] leading-snug line-clamp-1">
                {product.title}
              </h3>
            </Link>

            {/* Category & Size Indicator */}
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#D1D5DB]">
              <span className="text-white/70">
                {product.categoryName}
              </span>
              <span className="font-medium text-[#EAB308]">
                {activeVariant.size.split('(')[0].trim()}
              </span>
            </div>

            {/* Interactive Size Chips calibrated for this card's orientation */}
            {product.variants.length > 1 && (
              <div className="pt-1 flex items-center gap-1 overflow-x-auto no-scrollbar">
                {product.variants.map((v) => {
                  const isSelected = activeVariant.id === v.id;
                  const cleanSize = v.size.split('(')[0].replace('inches', 'in').replace('Diameter', 'Dia').trim();
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedVariant(v);
                      }}
                      className={`px-1.5 py-0.5 rounded-md text-[10px] font-semibold border transition-all shrink-0 cursor-pointer ${
                        isSelected
                          ? 'border-[#EAB308] bg-[#1E1E1E] text-[#FFFFFF] font-bold ring-1 ring-[#EAB308]/40 shadow-2xs'
                          : 'border-[#2D2D2D] bg-[#1A1A1A] text-[#D1D5DB] hover:border-[#EAB308]/60 hover:text-[#FFFFFF]'
                      }`}
                      title={`${v.size} - ₹${v.price}`}
                    >
                      {cleanSize}
                    </button>
                  );
                })}

                {/* Custom Size Chip */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsCustomizerOpen(true);
                  }}
                  className="px-1.5 py-0.5 rounded-md text-[10px] font-semibold border border-[#EAB308]/70 bg-[#161616] text-[#EAB308] hover:bg-[#EAB308] hover:text-black transition-all shrink-0 cursor-pointer flex items-center gap-0.5"
                  title={`Enter custom dimensions for ${product.title}`}
                >
                  <Ruler className="w-2.5 h-2.5" />
                  <span>Custom Size</span>
                </button>
              </div>
            )}
          </div>

          {/* Pricing, Delivery & Always-Visible Action Section */}
          <div className="mt-2.5 pt-2 border-t border-[#2D2D2D]/70 flex flex-col gap-2">
            {/* Pricing Row */}
            <div className="flex items-baseline justify-between gap-1.5">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-base sm:text-lg font-bold text-[#FFFFFF] whitespace-nowrap">
                  ₹{activePrice.toLocaleString('en-IN')}
                </span>
                {hasRealDiscount && (
                  <span className="text-[11px] text-[#D1D5DB]/70 line-through whitespace-nowrap">
                    ₹{activeMrp.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              {hasRealDiscount && discountPercent > 0 && (
                <span className="text-[10px] font-bold text-[#FFFFFF] bg-[#1E1E1E] px-1.5 py-0.5 rounded border border-[#EAB308]/40 shrink-0">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            {/* Delivery Signal */}
            <div className="flex items-center gap-1 text-[10px]">
              <span className="font-semibold text-[#D1D5DB] flex items-center gap-1 truncate">
                <Truck className="w-3 h-3 text-[#EAB308] shrink-0" /> Express Courier Delivery
              </span>
            </div>

            {/* Combined Option: Custom Photo & Size */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsCustomizerOpen(true);
              }}
              className="w-full min-h-[38px] py-2 px-2.5 rounded-xl font-sans text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 border border-[#EAB308] bg-[#121212] hover:bg-[#EAB308] text-[#FACC15] hover:text-black shadow-xs cursor-pointer group/custom active:scale-[0.98]"
              title={`Customise photo & size for ${product.title}`}
              aria-label={`Customise photo & size for ${product.title}`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#EAB308] group-hover/custom:text-black transition-colors shrink-0" />
              <span className="truncate font-extrabold">Customise: Photo &amp; Size</span>
              <Camera className="w-3.5 h-3.5 text-[#EAB308] group-hover/custom:text-black transition-colors shrink-0" />
            </button>

            {/* Action Buttons: Always Visible on Screen */}
            <div className="flex items-center gap-1.5 pt-0.5">
              <button
                type="button"
                onClick={handleInstantBuyNow}
                className="flex-1 min-h-[40px] sm:min-h-[42px] py-2 px-2 sm:px-2.5 rounded-xl font-sans text-xs sm:text-xs font-bold flex items-center justify-center gap-1 sm:gap-1.5 transition-all duration-200 shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-[#EAB308] active:scale-[0.98] bg-[#EAB308] hover:bg-[#FACC15] text-black hover:shadow-md border border-[#EAB308] cursor-pointer min-w-0"
                aria-label={`Buy ${product.title} now`}
                title="Buy It Now"
              >
                <span className="truncate">Buy Now</span>
                <ArrowRight className="w-3.5 h-3.5 text-black shrink-0" />
              </button>

              <button
                type="button"
                onClick={handleAddToCartClick}
                className="min-w-[40px] min-h-[40px] p-2 rounded-xl border border-[#2D2D2D] hover:border-[#EAB308] bg-[#222222] hover:bg-[#333333] text-white hover:text-[#EAB308] transition-colors shadow-2xs outline-none focus-visible:ring-2 focus-visible:ring-[#EAB308] flex items-center justify-center shrink-0 cursor-pointer"
                aria-label={`Add ${product.title} to cart`}
                title="Add to Cart"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsQuickViewOpen(true)}
                className="hidden sm:flex min-w-[40px] min-h-[40px] p-2 rounded-xl border border-[#2D2D2D] hover:border-[#EAB308] bg-[#222222] hover:bg-[#333333] text-white hover:text-[#EAB308] transition-colors shadow-2xs outline-none focus-visible:ring-2 focus-visible:ring-[#EAB308] items-center justify-center shrink-0 cursor-pointer"
                aria-label={`Quick view ${product.title}`}
                title="Quick View"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />

      {/* Unified Photo & Size Customization Modal */}
      <AddPhotoModal
        product={product}
        selectedVariant={activeVariant}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
      />
    </>
  );
}
