'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Flame,
  ArrowRight,
  Search,
  Heart,
  ShoppingBag,
  Star,
  Shapes,
  Palette,
  MessageCircle,
  Camera,
  Image as ImageIcon,
  Layers,
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
import { SHAPES_DATA } from '@/lib/data/shapes';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Active Tab & Select Animation State
  const [activeTab, setActiveTab] = useState<string>('home');
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMenuEnter = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setHoveredTab('categories');
    setMegaMenuOpen(true);
  };

  const handleMenuLeave = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    menuTimeoutRef.current = setTimeout(() => {
      setHoveredTab(null);
      setMegaMenuOpen(false);
    }, 220);
  };

  useEffect(() => {
    return () => {
      if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync active tab with current URL route
  useEffect(() => {
    if (!pathname) return;
    if (pathname === '/') {
      setActiveTab('home');
    } else if (pathname === '/customise') {
      setActiveTab('custom');
    } else if (pathname.startsWith('/category') || pathname === '/collections') {
      setActiveTab('categories');
    } else if (pathname === '/shop') {
      if (typeof window !== 'undefined' && window.location.search.includes('lighting=led')) {
        setActiveTab('led');
      } else if (typeof window !== 'undefined' && window.location.search.includes('lighting=none')) {
        setActiveTab('normal');
      } else {
        setActiveTab('shop');
      }
    }
  }, [pathname]);

  // Recalculate sliding select animation pill position
  useEffect(() => {
    const targetKey = hoveredTab || (activeTab !== 'home' ? activeTab : null);
    if (!targetKey) {
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const targetEl = tabRefs.current[targetKey];
    const containerEl = navContainerRef.current;

    if (targetEl && containerEl) {
      const containerRect = containerEl.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();

      setPillStyle({
        left: targetRect.left - containerRect.left,
        width: targetRect.width,
        opacity: 1,
      });
    }
  }, [activeTab, hoveredTab]);

  // Keyboard escape listener & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setMegaMenuOpen(false);
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

  const devotionalCategories = INITIAL_CATEGORIES.filter((c) => c.group === 'god-wall-art' || c.parentType === 'devotional');

  // Professional Curated Navigation Options (Non-redundant, High Value)
  const NAV_OPTIONS = [
    {
      id: 'led',
      label: 'LED Backlit Art',
      href: '/shop?lighting=led',
      icon: <Flame className="w-3.5 h-3.5 text-[#D6AA55] animate-pulse shrink-0" />,
      highlight: true,
    },
    {
      id: 'normal',
      label: 'Normal Acrylic Art',
      href: '/shop?lighting=none',
      icon: <Sparkles className="w-3.5 h-3.5 text-[#D6AA55] shrink-0" />,
    },
    {
      id: 'custom',
      label: 'Custom Photos',
      href: '/customise',
      icon: <Camera className="w-3.5 h-3.5 text-[#D6AA55] shrink-0" />,
    },
    {
      id: 'categories',
      label: 'All Categories',
      isMegaMenu: true,
    },
    {
      id: 'shop',
      label: 'Shop All',
      href: '/shop',
    },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 border-b select-none ${
          scrolled
            ? 'bg-[#FFF7EC]/95 backdrop-blur-md shadow-xs border-[#D6AA55]/40 py-2'
            : 'bg-[#FFF7EC] border-[#D6AA55]/30 py-2 sm:py-2.5'
        }`}
      >
        <div className="w-full max-w-[1760px] mx-auto px-3 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between gap-2.5 sm:gap-4 lg:gap-6">
            {/* Left: Mobile Menu Trigger + Brand Logo */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-[#511B2A] hover:text-[#D6AA55] hover:bg-[#F9EFE0] rounded-xl focus:outline-none transition-colors cursor-pointer"
                aria-label="Open mobile menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <Link href="/" className="flex items-center group shrink-0" aria-label="Abhi's Gifts Home">
                <Image
                  src="/images/brand/logo.png"
                  alt="Abhi's Gifts - We Create Memorable Movements"
                  width={200}
                  height={39}
                  priority
                  className="h-7 sm:h-9 md:h-10 w-auto object-contain transition-transform group-hover:scale-[1.03]"
                />
              </Link>
            </div>

            {/* Middle: Clean Luxury Desktop Navigation with Sliding Select Animation */}
            <nav className="hidden lg:flex items-center justify-center flex-1 max-w-3xl 2xl:max-w-4xl mx-auto px-2">
              <div
                ref={navContainerRef}
                className="relative flex items-center bg-[#F9EFE0]/80 backdrop-blur-md p-1 rounded-full border border-[#D6AA55]/40 shadow-2xs"
              >
                {/* Animated Sliding Selection Pill */}
                <div
                  className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-[#511B2A] via-[#641D30] to-[#511B2A] shadow-[0_3px_14px_rgba(81,27,42,0.35)] border border-[#D6AA55]/60 transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.3,1)] pointer-events-none"
                  style={{
                    left: `${pillStyle.left}px`,
                    width: `${pillStyle.width}px`,
                    opacity: pillStyle.opacity,
                  }}
                />

                {NAV_OPTIONS.map((item) => {
                  const isActive = (hoveredTab || activeTab) === item.id;
                  const isCurrentSelected = activeTab === item.id;

                  if (item.isMegaMenu) {
                    return (
                      <div
                        key={item.id}
                        className="relative"
                        onMouseEnter={handleMenuEnter}
                        onMouseLeave={handleMenuLeave}
                      >
                        <button
                          ref={(el) => {
                            tabRefs.current[item.id] = el;
                          }}
                          type="button"
                          aria-haspopup="true"
                          aria-expanded={megaMenuOpen}
                          onClick={() => {
                            setActiveTab(item.id);
                            setMegaMenuOpen((prev) => !prev);
                          }}
                          className={`relative z-10 py-1.5 px-3.5 xl:px-4 rounded-full text-xs xl:text-[13px] font-semibold transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap outline-none cursor-pointer active:scale-95 ${
                            isActive || megaMenuOpen
                              ? 'text-[#FFF7EC] font-bold drop-shadow-xs'
                              : 'text-[#511B2A] hover:text-[#D6AA55]'
                          }`}
                        >
                          <Layers className="w-3.5 h-3.5 text-[#D6AA55]" />
                          <span>{item.label}</span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${
                              isActive || megaMenuOpen ? 'text-[#D6AA55]' : 'text-[#533C36]'
                            } ${megaMenuOpen ? 'rotate-180' : ''}`}
                          />
                          {/* Active Golden Shimmer Indicator */}
                          {(isCurrentSelected || megaMenuOpen) && (
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-[#D6AA55] rounded-full shadow-[0_0_8px_#D6AA55]" />
                          )}
                        </button>

                        {/* Click-Outside Dimmed Page Backdrop */}
                        {megaMenuOpen && (
                          <div
                            className="fixed inset-0 top-[60px] bg-black/60 backdrop-blur-xs z-40 transition-opacity animate-in fade-in duration-200"
                            onClick={() => {
                              setMegaMenuOpen(false);
                              setHoveredTab(null);
                            }}
                            aria-hidden="true"
                          />
                        )}

                        {/* Mega Menu Dropdown — 100% Solid Opaque Ivory Cream with High Contrast */}
                        {megaMenuOpen && (
                          <div
                            onMouseEnter={handleMenuEnter}
                            onMouseLeave={handleMenuLeave}
                            className="fixed top-[62px] sm:top-[68px] left-1/2 -translate-x-1/2 w-[96vw] max-w-6xl 2xl:max-w-7xl rounded-3xl shadow-[0_25px_80px_rgba(40,10,18,0.5)] border-2 border-[#B88A35]/80 p-5 sm:p-7 z-50 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200 text-[#32151D] select-auto"
                            style={{ backgroundColor: '#FFFDF9' }}
                          >
                            {/* Header Bar */}
                            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#E8D5BD]/80">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#641E2E] to-[#32151D] flex items-center justify-center text-[#E8C77E] border border-[#B88A35]/50 shadow-xs">
                                  <Layers className="w-4 h-4" />
                                </div>
                                <div>
                                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#641E2E] leading-tight">
                                    Explore Sacred Art Collections
                                  </h3>
                                  <p className="text-[11px] text-[#795D58] font-sans">
                                    35 Authentic Collections • Consecrated 4mm Crystal Acrylic &amp; 3000K LED Radiance
                                  </p>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  setMegaMenuOpen(false);
                                  setHoveredTab(null);
                                }}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#641E2E] bg-[#FCE7EA] hover:bg-[#F9D2D9] border border-[#B88A35]/60 transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
                                aria-label="Close categories menu"
                              >
                                <X className="w-3.5 h-3.5 text-[#641E2E]" />
                                <span>Close</span>
                              </button>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:divide-x lg:divide-[#E8D5BD]/80">
                              {/* LEFT SIDE: ✨ LED BACKLIT ART CATEGORIES (8) */}
                              <div className="lg:pr-6 space-y-3.5">
                                <div className="flex items-center justify-between p-2.5 rounded-2xl bg-gradient-to-r from-[#FCE7EA] to-[#FFF7ED] border border-[#B88A35]/60 shadow-2xs">
                                  <div className="flex items-center gap-2">
                                    <Flame className="w-4 h-4 text-amber-600 animate-pulse" />
                                    <span className="font-serif font-bold text-xs sm:text-sm text-[#641E2E] uppercase tracking-wide">
                                      ✨ LED Backlit Categories (8)
                                    </span>
                                  </div>
                                  <span className="text-[10px] font-bold text-[#E8C77E] bg-[#32151D] px-2.5 py-0.5 rounded-full border border-[#B88A35]/40 shadow-2xs">
                                    3000K Warm Glow
                                  </span>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-xs max-h-[360px] overflow-y-auto pr-1">
                                  {INITIAL_CATEGORIES.filter((c) => c.lightingType === 'backlight' || c.group === 'led-backlight').map((cat) => (
                                    <Link
                                      key={cat.id}
                                      href={`/category/${cat.slug}`}
                                      onClick={() => {
                                        setMegaMenuOpen(false);
                                        setHoveredTab(null);
                                      }}
                                      className="group relative flex flex-col justify-between p-2.5 rounded-xl border border-[#E8D5BD] hover:border-[#B88A35] shadow-2xs hover:shadow-xs transition-all duration-200"
                                      style={{ backgroundColor: '#ffffff' }}
                                    >
                                      <div className="flex items-start justify-between gap-1.5">
                                        <span className="font-serif font-bold text-xs text-[#641E2E] group-hover:text-[#B88A35] transition-colors line-clamp-1">
                                          {cat.name}
                                        </span>
                                        <span className="text-[9px] font-bold text-amber-800 bg-amber-50 px-1 py-0.2 rounded border border-amber-300 shrink-0">
                                          LED
                                        </span>
                                      </div>
                                      <span className="text-[10.5px] text-[#795D58] block line-clamp-1 mt-1 leading-snug">
                                        {cat.description}
                                      </span>
                                    </Link>
                                  ))}
                                </div>

                                <div className="pt-2.5 flex items-center justify-between border-t border-[#E8D5BD]">
                                  <Link
                                    href="/shop?lighting=led"
                                    onClick={() => {
                                      setMegaMenuOpen(false);
                                      setHoveredTab(null);
                                    }}
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#641E2E] hover:text-[#B88A35] group"
                                  >
                                    <Sparkles className="w-3.5 h-3.5 text-[#B88A35]" />
                                    <span>Explore All LED Backlit Artworks</span>
                                    <ArrowRight className="w-3.5 h-3.5 text-[#B88A35] group-hover:translate-x-1 transition-transform" />
                                  </Link>
                                </div>
                              </div>

                              {/* RIGHT SIDE: 🖼️ NORMAL PURE ACRYLIC CATEGORIES (27) */}
                              <div className="lg:pl-6 space-y-3.5">
                                <div className="flex items-center justify-between p-2.5 rounded-2xl bg-gradient-to-r from-[#FAF7F0] to-[#F4EDE2] border border-[#E8D5BD] shadow-2xs">
                                  <div className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-[#B88A35]" />
                                    <span className="font-serif font-bold text-xs sm:text-sm text-[#641E2E] uppercase tracking-wide">
                                      🖼️ Normal Acrylic Categories (27)
                                    </span>
                                  </div>
                                  <span className="text-[10px] font-bold text-[#641E2E] bg-[#FCE7EA] px-2.5 py-0.5 rounded-full border border-[#B88A35]/40 shadow-2xs">
                                    24K Gold &amp; Crystal
                                  </span>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-xs max-h-[360px] overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-[#B88A35]/40">
                                  {INITIAL_CATEGORIES.filter((c) => c.lightingType !== 'backlight' && c.group !== 'led-backlight').map((cat) => (
                                    <Link
                                      key={cat.id}
                                      href={`/category/${cat.slug}`}
                                      onClick={() => {
                                        setMegaMenuOpen(false);
                                        setHoveredTab(null);
                                      }}
                                      className="group relative flex flex-col justify-between p-2.5 rounded-xl border border-[#E8D5BD] hover:border-[#B88A35] shadow-2xs hover:shadow-xs transition-all duration-200"
                                      style={{ backgroundColor: '#ffffff' }}
                                    >
                                      <div className="flex items-start justify-between gap-1.5">
                                        <span className="font-serif font-bold text-xs text-[#641E2E] group-hover:text-[#B88A35] transition-colors line-clamp-1">
                                          {cat.name}
                                        </span>
                                        <span className="text-[9px] font-bold text-stone-700 bg-stone-100 px-1 py-0.2 rounded border border-stone-200 shrink-0">
                                          Acrylic
                                        </span>
                                      </div>
                                      <span className="text-[10.5px] text-[#795D58] block line-clamp-1 mt-1 leading-snug">
                                        {cat.description}
                                      </span>
                                    </Link>
                                  ))}
                                </div>

                                <div className="pt-2.5 flex items-center justify-between border-t border-[#E8D5BD]">
                                  <Link
                                    href="/shop?lighting=none"
                                    onClick={() => {
                                      setMegaMenuOpen(false);
                                      setHoveredTab(null);
                                    }}
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#641E2E] hover:text-[#B88A35] group"
                                  >
                                    <Sparkles className="w-3.5 h-3.5 text-[#B88A35]" />
                                    <span>Browse All 27 Normal Acrylic Collections</span>
                                    <ArrowRight className="w-3.5 h-3.5 text-[#B88A35] group-hover:translate-x-1 transition-transform" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.id}
                      ref={(el) => {
                        tabRefs.current[item.id] = el;
                      }}
                      href={item.href || '/'}
                      onMouseEnter={() => setHoveredTab(item.id)}
                      onMouseLeave={() => setHoveredTab(null)}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMegaMenuOpen(false);
                      }}
                      className={`relative z-10 py-1.5 px-3 xl:px-4 rounded-full text-xs xl:text-[13px] font-semibold transition-colors duration-200 flex items-center gap-1.5 whitespace-nowrap outline-none active:scale-95 ${
                        isActive
                          ? 'text-[#FFF7EC] font-bold drop-shadow-xs'
                          : 'text-[#511B2A] hover:text-[#D6AA55]'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      {/* Active Golden Shimmer Indicator */}
                      {isCurrentSelected && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-[#D6AA55] rounded-full shadow-[0_0_8px_#D6AA55]" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Right: WhatsApp Hotline, Search, Wishlist, Cart */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* WhatsApp Quick Chat - Symbol Only */}
              <a
                href="https://wa.me/919032372782?text=Hi%20Abhi%27s%20Gifts%2C%20I%20would%20like%20to%20inquire%20about%20ordering%20a%20personalized%20photo%20frame"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#25D366] bg-[#E8F5E9] hover:bg-[#C8E6C9] border border-[#81C784]/80 rounded-full transition-all shadow-2xs hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
                title="Chat on WhatsApp"
                aria-label="Chat on WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 fill-current shrink-0" />
              </a>

              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setSearchOpen((prev) => !prev)}
                className="p-2 text-[#641E2E] hover:text-[#B88A35] hover:bg-[#FCE7EA] rounded-xl transition-colors cursor-pointer"
                aria-label="Search artworks"
                title="Search"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Wishlist with Badge */}
              <Link
                href="/wishlist"
                className="p-2 text-[#641E2E] hover:text-[#B88A35] hover:bg-[#FCE7EA] rounded-xl transition-colors relative flex items-center justify-center cursor-pointer"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#641E2E] text-[#FFF7ED] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#B88A35]/50 shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Cart with Badge */}
              <button
                type="button"
                onClick={openCart}
                className="p-2 text-[#641E2E] hover:text-[#B88A35] hover:bg-[#FCE7EA] rounded-xl transition-colors relative flex items-center justify-center cursor-pointer"
                aria-label="Shopping Cart"
                title="Cart"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#32151D] text-[#E8C77E] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#B88A35]/60 shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar Flyout */}
        {searchOpen && (
          <div className="w-full bg-white border-t border-b border-[#E8D5BD] py-3 px-4 sm:px-8 shadow-md animate-in slide-in-from-top-2 duration-150">
            <div className="w-full max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="w-4 h-4 text-[#795D58] absolute left-3.5" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search Balaji, Shiva, Ram Mandir, Radha Krishna, 7 Horses, Bodhi Tree, LED frames..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-24 py-2.5 bg-[#FFF7ED] border border-[#E8D5BD] rounded-2xl text-xs sm:text-sm outline-none focus:border-[#B88A35] focus:bg-white transition-all font-medium text-[#641E2E]"
                />
                <div className="absolute right-2 flex items-center gap-1">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#641E2E] to-[#32151D] hover:from-[#4B1622] hover:to-[#1F0A11] text-[#FFF7ED] text-xs font-semibold px-3.5 py-1.5 rounded-xl border border-[#B88A35]/50 transition-colors cursor-pointer"
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="p-1.5 text-[#795D58] hover:text-[#641E2E] rounded-lg cursor-pointer"
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
            className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto animate-in slide-in-from-left duration-300"
          >
            {/* Drawer Header */}
            <div className="p-4 border-b border-[#E8D5BD] flex items-center justify-between bg-[#FFF7ED]">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
                <Image
                  src="/images/brand/logo.png"
                  alt="Abhi's Gifts"
                  width={160}
                  height={32}
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-[#795D58] hover:text-[#641E2E] rounded-lg cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Search Form */}
            <div className="p-3 bg-[#FFF7ED]/70 border-b border-[#E8D5BD]">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="w-4 h-4 text-[#795D58] absolute left-3" />
                <input
                  type="text"
                  placeholder="Search artworks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#E8D5BD] rounded-xl outline-none focus:border-[#B88A35] font-medium text-[#641E2E]"
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
            <div className="p-3.5 bg-gradient-to-br from-[#641E2E] to-[#32151D] text-[#FFF7ED] m-3 rounded-2xl shadow-sm border border-[#B88A35]/50">
              <div className="flex items-center gap-2 font-bold text-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#E8C77E]" />
                <span>Personalise Photo Frames</span>
              </div>
              <p className="text-[11px] text-[#E8D5BD]/90 mt-1 leading-snug">
                Upload family photos &amp; turn them into illuminated crystal acrylic heirlooms.
              </p>
              <Link
                href="/customise"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2.5 inline-block bg-gradient-to-r from-[#B88A35] to-[#E8C77E] text-[#32151D] px-3.5 py-1 rounded-lg text-xs font-bold transition-all"
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
                  className="block px-3 py-2 text-[#641E2E] font-semibold rounded-xl hover:bg-[#FCE7EA] text-xs sm:text-sm"
                >
                  Home
                </Link>
                <Link
                  href="/shop?lighting=led"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 bg-[#32151D] text-[#E8C77E] font-bold rounded-xl text-xs sm:text-sm border border-[#B88A35]/50 shadow-xs"
                >
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    <span>✨ LED Backlit Art</span>
                  </span>
                  <span className="text-[10px] bg-[#641E2E] text-white px-2 py-0.5 rounded-full">18 Designs</span>
                </Link>
                <Link
                  href="/shop?lighting=none"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 bg-white text-[#641E2E] font-bold rounded-xl text-xs sm:text-sm border border-[#E8D5BD] shadow-2xs"
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#B88A35]" />
                    <span>🖼️ Normal Acrylic Art</span>
                  </span>
                  <span className="text-[10px] bg-[#FCE7EA] text-[#641E2E] px-2 py-0.5 rounded-full">17 Designs</span>
                </Link>
                <Link
                  href="/customise"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-[#641E2E] font-semibold rounded-xl hover:bg-[#FCE7EA] text-xs sm:text-sm"
                >
                  🎨 Custom Photo Frames
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-[#641E2E] font-semibold rounded-xl hover:bg-[#FCE7EA] text-xs sm:text-sm"
                >
                  Shop Full Catalog
                </Link>
              </div>

              {/* God Wall Art Accordion Group */}
              <div className="py-2.5">
                <p className="text-[10px] font-bold uppercase text-[#B88A35] px-3 py-1 tracking-wider">
                  Sacred Devotional Art
                </p>
                {devotionalCategories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/category/${c.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-1.5 text-xs text-[#795D58] hover:text-[#641E2E] hover:bg-[#FCE7EA] rounded-lg"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>

              {/* Shop by Shape */}
              <div className="py-2.5">
                <p className="text-[10px] font-bold uppercase text-[#B88A35] px-3 py-1 tracking-wider">
                  Shop by Shape
                </p>
                <div className="grid grid-cols-2 gap-1 px-1">
                  {SHAPES_DATA.map((s) => (
                    <Link
                      key={s.id}
                      href={s.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-2.5 py-1 text-xs text-[#795D58] hover:text-[#641E2E] hover:bg-[#FCE7EA] rounded-lg"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Customer Care */}
              <div className="py-2.5 space-y-0.5">
                <p className="text-[10px] font-bold uppercase text-[#B88A35] px-3 py-1 tracking-wider">
                  Support &amp; Saved
                </p>
                <Link
                  href="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 text-xs text-[#795D58] hover:text-[#641E2E]"
                >
                  Wishlist ({wishlistCount})
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 text-xs text-[#795D58] hover:text-[#641E2E]"
                >
                  Contact &amp; Support
                </Link>
              </div>
            </div>

            {/* Mobile Drawer Footer */}
            <div className="p-3.5 border-t border-[#E8D5BD] bg-[#FFF7ED] text-xs text-[#795D58] flex items-center justify-between">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#641E2E] hover:text-[#B88A35] font-medium"
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
