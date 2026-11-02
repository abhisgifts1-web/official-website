'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { INITIAL_PRODUCTS } from '@/lib/data/mockProducts';
import ProductGrid from '@/components/product/ProductGrid';

export default function WishlistPage() {
  const { wishlistSlugs } = useWishlist();

  const wishlistedProducts = INITIAL_PRODUCTS.filter((p) =>
    wishlistSlugs.includes(p.slug)
  );

  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 space-y-8">
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-amber-900 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-amber-700 fill-current" /> Saved Pieces
          </span>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 mt-1">
            My Wishlist ({wishlistedProducts.length})
          </h1>
        </div>
        <Link href="/shop" className="text-xs font-semibold text-amber-800 hover:underline">
          Explore More Art →
        </Link>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="py-16 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
            <Heart className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-900">Your wishlist is empty</h3>
            <p className="text-xs text-stone-500 mt-1">
              Click the heart icon on any sacred artwork to save it here for later.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-block bg-stone-900 hover:bg-amber-800 text-white text-xs font-semibold px-6 py-2.5 rounded-full transition-colors"
          >
            Browse Sacred Collection →
          </Link>
        </div>
      ) : (
        <ProductGrid products={wishlistedProducts} />
      )}
    </div>
  );
}
