'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Store, Sparkles, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { cartCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();

  // Hide on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const isHome = pathname === '/';
  const isShop = pathname?.startsWith('/shop') || pathname?.startsWith('/category');
  const isCustomise = pathname?.startsWith('/customise');
  const isWishlist = pathname?.startsWith('/wishlist');

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#121212]/95 backdrop-blur-md border-t border-[#FEE815]/30 text-white shadow-[0_-4px_20px_rgba(0,0,0,0.5)] select-none print:hidden"
      style={{
        paddingBottom: 'max(0.35rem, calc(env(safe-area-inset-bottom, 0px) + 0.2rem))',
      }}
    >
      <div className="grid grid-cols-5 items-center h-14 max-w-lg mx-auto px-2">
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 transition-all active:scale-90 ${
            isHome ? 'text-[#FEE815]' : 'text-stone-400 hover:text-stone-200'
          }`}
          aria-label="Home"
        >
          <Home className={`w-5 h-5 ${isHome ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Home</span>
        </Link>

        {/* 2. Shop */}
        <Link
          href="/shop"
          className={`flex flex-col items-center justify-center py-1 transition-all active:scale-90 ${
            isShop ? 'text-[#FEE815]' : 'text-stone-400 hover:text-stone-200'
          }`}
          aria-label="Shop All"
        >
          <Store className={`w-5 h-5 ${isShop ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Shop</span>
        </Link>

        {/* 3. Central Elevated Customise CTA */}
        <div className="flex flex-col items-center justify-center -mt-4">
          <Link
            href="/customise"
            className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#FEE815] via-[#FFF04B] to-[#FEE815] text-stone-950 shadow-[0_2px_14px_rgba(254,232,21,0.5)] border-2 border-[#121212] transition-transform active:scale-95"
            aria-label="Customise Photo Frame"
          >
            <Sparkles className="w-5 h-5 text-stone-950 animate-pulse" />
          </Link>
          <span
            className={`text-[9.5px] font-bold tracking-tight mt-0.5 ${
              isCustomise ? 'text-[#FEE815]' : 'text-stone-300'
            }`}
          >
            Customise
          </span>
        </div>

        {/* 4. Wishlist */}
        <Link
          href="/wishlist"
          className={`relative flex flex-col items-center justify-center py-1 transition-all active:scale-90 ${
            isWishlist ? 'text-[#FEE815]' : 'text-stone-400 hover:text-stone-200'
          }`}
          aria-label="Wishlist"
        >
          <div className="relative">
            <Heart className={`w-5 h-5 ${isWishlist ? 'stroke-[2.5] fill-[#FEE815]/30' : 'stroke-2'}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#FEE815] text-stone-950 text-[9px] font-black min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center ring-1 ring-[#121212] shadow-xs">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Saved</span>
        </Link>

        {/* 5. Cart / Bag */}
        <button
          type="button"
          onClick={openCart}
          className="relative flex flex-col items-center justify-center py-1 text-stone-400 hover:text-stone-200 transition-all active:scale-90 cursor-pointer"
          aria-label="Cart"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-2" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#FEE815] text-stone-950 text-[9px] font-black min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center ring-1 ring-[#121212] shadow-xs">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Cart</span>
        </button>
      </div>
    </nav>
  );
}
