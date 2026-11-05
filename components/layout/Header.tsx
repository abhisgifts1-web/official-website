'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Menu,
  X,
  Sparkles,
  Flame,
  Search,
  Heart,
  ShoppingBag,
} from 'lucide-react';

function WhatsAppIcon({ className = 'w-4 h-4 sm:w-5 sm:h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}
import { INITIAL_CATEGORIES } from '@/lib/data/categories';

import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function Header() {
  const router = useRouter();
  const { cartCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard escape listener & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 border-b select-none ${
          scrolled
            ? 'bg-[#121212]/95 backdrop-blur-md shadow-xs border-[#EAB308]/40 py-2'
            : 'bg-[#121212] border-[#EAB308]/30 py-2 sm:py-2.5'
        }`}
      >
        <div className="w-full max-w-[1760px] mx-auto px-2 sm:px-6 lg:px-4 xl:px-12 2xl:px-16">
          <div className="flex items-center justify-between gap-1.5 sm:gap-3 lg:gap-4 xl:gap-6">
            {/* Left: Mobile Menu Trigger + Brand Logo */}
            <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center p-2 text-[#FFFFFF] hover:text-[#EAB308] hover:bg-[#1A1A1A] rounded-xl focus:outline-none transition-colors cursor-pointer"
                aria-label="Open mobile menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <Link href="/" className="flex items-center group shrink-0" aria-label="Abhi's Gifts Home">
                <Image
                  src="/images/brand/logo-gold.png"
                  alt="Abhi's Gifts - We Create Memorable Movements"
                  width={240}
                  height={50}
                  priority
                  className="h-8 sm:h-9.5 md:h-11 lg:h-12 xl:h-13 2xl:h-14 w-auto object-contain transition-transform group-hover:scale-[1.03]"
                />
              </Link>
            </div>

            {/* Right: WhatsApp Hotline, Search, Wishlist, Cart */}
            <div className="flex items-center gap-0.5 min-[360px]:gap-1 sm:gap-2 shrink-0">
              {/* WhatsApp Quick Chat - Symbol Only */}
              <a
                href="https://wa.me/919032372782?text=Hi%20Abhi%27s%20Gifts%2C%20I%20would%20like%20to%20inquire%20about%20ordering%20a%20personalized%20photo%20frame"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 min-[360px]:w-10 min-[360px]:h-10 sm:w-11 sm:h-11 p-1.5 min-[360px]:p-2 text-[#25D366] bg-[#E8F5E9] hover:bg-[#C8E6C9] border border-[#81C784]/80 rounded-full transition-all shadow-2xs hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
                title="Chat on WhatsApp"
                aria-label="Chat on WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 fill-current shrink-0" />
              </a>

              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setSearchOpen((prev) => !prev)}
                className="w-9 h-9 min-[360px]:w-10 min-[360px]:h-10 sm:w-11 sm:h-11 p-1.5 min-[360px]:p-2 text-[#FFFFFF] hover:text-[#EAB308] hover:bg-[#1E1E1E] rounded-xl transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Search artworks"
                title="Search"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Wishlist with Badge */}
              <Link
                href="/wishlist"
                className="w-9 h-9 min-[360px]:w-10 min-[360px]:h-10 sm:w-11 sm:h-11 p-1.5 min-[360px]:p-2 text-[#FFFFFF] hover:text-[#EAB308] hover:bg-[#1E1E1E] rounded-xl transition-colors relative flex items-center justify-center cursor-pointer"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#EAB308] text-[#000000] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#EAB308]/50 shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Cart with Badge */}
              <button
                type="button"
                onClick={openCart}
                className="w-9 h-9 min-[360px]:w-10 min-[360px]:h-10 sm:w-11 sm:h-11 p-1.5 min-[360px]:p-2 text-[#FFFFFF] hover:text-[#EAB308] hover:bg-[#1E1E1E] rounded-xl transition-colors relative flex items-center justify-center cursor-pointer"
                aria-label="Shopping Cart"
                title="Cart"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#121212] text-[#FACC15] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#EAB308]/60 shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar Flyout */}
        {searchOpen && (
          <div className="w-full bg-[#141414] border-t border-b border-[#2D2D2D] py-3 px-4 sm:px-8 shadow-md animate-in slide-in-from-top-2 duration-150">
            <div className="w-full max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="w-4 h-4 text-[#D1D5DB] absolute left-3.5" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search Balaji, Shiva, Ram Mandir, Radha Krishna, 7 Horses, Bodhi Tree, LED frames..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-24 py-2.5 bg-[#121212] border border-[#2D2D2D] rounded-2xl text-xs sm:text-sm outline-none focus:border-[#EAB308] focus:bg-[#141414] transition-all font-medium text-[#FFFFFF]"
                />
                <div className="absolute right-2 flex items-center gap-1">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#181818] to-[#0A0A0A] hover:from-[#222222] hover:to-[#181818] text-[#FFFFFF] text-xs font-semibold px-3.5 py-1.5 rounded-xl border border-[#EAB308]/50 transition-colors cursor-pointer"
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="p-1.5 text-[#D1D5DB] hover:text-[#FFFFFF] rounded-lg cursor-pointer"
                    aria-label="Close search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Slide-Over Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="relative w-4/5 max-w-sm bg-[#141414] h-full shadow-2xl flex flex-col z-10 overflow-y-auto animate-in slide-in-from-left duration-300"
          >
            {/* Drawer Header */}
            <div className="p-4 border-b border-[#2D2D2D] flex items-center justify-between bg-[#121212]">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
                <Image
                  src="/images/brand/logo-gold.png"
                  alt="Abhi's Gifts - We Create Memorable Movements"
                  width={210}
                  height={44}
                  className="h-9 sm:h-10 w-auto object-contain"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-[#D1D5DB] hover:text-[#FFFFFF] rounded-lg cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Search Form */}
            <div className="p-3 bg-[#121212]/70 border-b border-[#2D2D2D]">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="w-4 h-4 text-[#D1D5DB] absolute left-3" />
                <input
                  type="text"
                  placeholder="Search artworks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#141414] border border-[#2D2D2D] rounded-xl outline-none focus:border-[#EAB308] font-medium text-[#FFFFFF]"
                />
              </form>
            </div>

            {/* Direct WhatsApp Ordering Quick Action */}
            <div className="px-3 pt-2.5">
              <a
                href="https://wa.me/919032372782?text=Hi%20Abhi%27s%20Gifts%2C%20I%20would%20like%20to%20order%20a%20personalized%20photo%20frame"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 bg-[#E8F5E9] hover:bg-[#C8E6C9] text-[#1B5E20] border border-[#81C784]/80 rounded-xl font-bold text-xs shadow-2xs transition-colors"
              >
                <span className="flex items-center gap-2">
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>Order on WhatsApp</span>
                </span>
                <span className="text-[11px] text-[#2E7D32] font-semibold">Chat Now →</span>
              </a>
            </div>

            {/* Customise Banner CTA */}
            <div className="p-3.5 bg-gradient-to-br from-[#181818] to-[#0A0A0A] text-[#FFFFFF] m-3 rounded-2xl shadow-sm border border-[#EAB308]/50">
              <div className="flex items-center gap-2 font-bold text-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#FACC15]" />
                <span>Personalise Photo Frames</span>
              </div>
              <p className="text-[11px] text-[#E5E7EB]/90 mt-1 leading-snug">
                Upload family photos &amp; turn them into illuminated crystal acrylic heirlooms.
              </p>
              <Link
                href="/customise"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2.5 inline-block bg-gradient-to-r from-[#EAB308] to-[#FACC15] text-[#FFFFFF] px-3.5 py-1 rounded-lg text-xs font-bold transition-all"
              >
                Customise Now →
              </Link>
            </div>

            {/* Nav links */}
            <div className="px-3 py-2 flex-1 space-y-1 divide-y divide-[#E8D5BD]/50">
              <div className="py-2 space-y-1">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-[#FFFFFF] font-semibold rounded-xl hover:bg-[#1E1E1E] text-xs sm:text-sm"
                >
                  Home
                </Link>
                <Link
                  href="/shop?lighting=led"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 bg-[#121212] text-[#FACC15] font-bold rounded-xl text-xs sm:text-sm border border-[#EAB308]/50 shadow-xs"
                >
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    <span>✨ LED Backlit Art</span>
                  </span>
                  <span className="text-[10px] bg-[#EAB308] text-[#000000] px-2 py-0.5 rounded-full font-bold">18 Designs</span>
                </Link>
                <Link
                  href="/shop?lighting=none"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 bg-[#141414] text-[#FFFFFF] font-bold rounded-xl text-xs sm:text-sm border border-[#2D2D2D] shadow-2xs"
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#EAB308]" />
                    <span>🖼️ Normal Acrylic Art</span>
                  </span>
                  <span className="text-[10px] bg-[#1E1E1E] text-[#FFFFFF] px-2 py-0.5 rounded-full">17 Designs</span>
                </Link>
                <Link
                  href="/customise"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-[#FFFFFF] font-semibold rounded-xl hover:bg-[#1E1E1E] text-xs sm:text-sm"
                >
                  🎨 Custom Photo Frames
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-[#FFFFFF] font-semibold rounded-xl hover:bg-[#1E1E1E] text-xs sm:text-sm"
                >
                  Shop Full Catalog
                </Link>
              </div>

              {/* God Wall Art Accordion Group */}
              <div className="py-2.5">
                <p className="text-[10px] font-bold uppercase text-[#EAB308] px-3 py-1 tracking-wider">
                  Categories
                </p>
                {INITIAL_CATEGORIES.map((c) => (
                  <Link
                    key={c.id}
                    href={`/category/${c.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-1.5 text-xs text-[#D1D5DB] hover:text-[#FFFFFF] hover:bg-[#1E1E1E] rounded-lg"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>

              

              {/* Customer Care */}
              <div className="py-2.5 space-y-0.5">
                <p className="text-[10px] font-bold uppercase text-[#EAB308] px-3 py-1 tracking-wider">
                  Support &amp; Saved
                </p>
                <Link
                  href="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 text-xs text-[#D1D5DB] hover:text-[#FFFFFF]"
                >
                  Wishlist ({wishlistCount})
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 text-xs text-[#D1D5DB] hover:text-[#FFFFFF]"
                >
                  Contact &amp; Support
                </Link>
              </div>
            </div>

            {/* Mobile Drawer Footer */}
            <div className="p-3.5 border-t border-[#2D2D2D] bg-[#121212] text-xs text-[#D1D5DB] flex items-center justify-between">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#FFFFFF] hover:text-[#EAB308] font-medium"
              >
                Staff Portal
              </Link>
              <span className="text-[11px] font-semibold">Tirupati, AP</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
