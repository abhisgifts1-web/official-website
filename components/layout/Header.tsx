'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Sparkles,
  Flame,
  Heart,
  ShoppingBag,
  ChevronDown,
  ArrowRight,
  Layers,
  Camera,
  Home,
  Info,
  Phone,
} from 'lucide-react';
import { WhatsAppIcon, InstagramIcon, YouTubeIcon } from '@/components/icons/SocialIcons';
import { INITIAL_CATEGORIES } from '@/lib/data/categories';

import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      setActiveTab('customized');
    } else if (pathname === '/about') {
      setActiveTab('about');
    } else if (pathname === '/contact') {
      setActiveTab('contact');
    } else if (
      pathname.startsWith('/shop') ||
      pathname.startsWith('/category') ||
      pathname.startsWith('/collections') ||
      pathname.startsWith('/product')
    ) {
      setActiveTab('shop');
    } else {
      setActiveTab('');
    }
  }, [pathname]);

  // Recalculate sliding select animation pill position
  useEffect(() => {
    const targetKey = hoveredTab || activeTab;
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
    } else {
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [hoveredTab, activeTab, megaMenuOpen]);

  // Keyboard escape listener & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setMegaMenuOpen(false);
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

  // Hide storefront header on admin dashboard & portal routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  // Curated Navigation Options
  interface NavOption {
    id: string;
    label: string;
    href: string;
    icon: React.ReactNode;
    isMegaMenu?: boolean;
  }

  const NAV_OPTIONS: NavOption[] = [
    {
      id: 'home',
      label: 'Home',
      href: '/',
      icon: <Home className="w-3.5 h-3.5 text-[#EAB308] shrink-0" />,
    },
    {
      id: 'shop',
      label: 'Shop',
      href: '/shop',
      icon: <ShoppingBag className="w-3.5 h-3.5 text-[#EAB308] shrink-0" />,
    },
    {
      id: 'customized',
      label: 'Customized',
      href: '/customise',
      icon: <Sparkles className="w-3.5 h-3.5 text-[#EAB308] shrink-0" />,
    },
    {
      id: 'about',
      label: 'About',
      href: '/about',
      icon: <Info className="w-3.5 h-3.5 text-[#EAB308] shrink-0" />,
    },
    {
      id: 'contact',
      label: 'Contact',
      href: '/contact',
      icon: <Phone className="w-3.5 h-3.5 text-[#EAB308] shrink-0" />,
    },
  ];

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
                  src="/images/brand/logo-gold-v2.png"
                  alt="Abhi's Gifts - We Create Memorable Moments"
                  width={240}
                  height={50}
                  priority
                  className="h-8 sm:h-9.5 md:h-11 lg:h-12 xl:h-13 2xl:h-14 w-auto object-contain transition-transform group-hover:scale-[1.03]"
                />
              </Link>
            </div>

            {/* Middle: Clean Luxury Desktop Navigation with Sliding Select Animation */}
            <nav className="hidden lg:flex items-center justify-center flex-1 max-w-3xl 2xl:max-w-4xl mx-auto px-2">
              <div
                ref={navContainerRef}
                className="relative flex items-center bg-[#1A1A1A]/80 backdrop-blur-md p-1 rounded-full border border-[#EAB308]/40 shadow-2xs"
              >
                {/* Animated Sliding Selection Pill */}
                <div
                  className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-[#121212] via-[#262626] to-[#121212] shadow-[0_3px_14px_rgba(0,0,0,0.5)] border border-[#EAB308]/60 transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.3,1)] pointer-events-none"
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
                          className={`relative z-10 py-1.5 px-2 xl:px-3.5 2xl:px-4 rounded-full text-[11.5px] xl:text-[13px] font-semibold transition-all duration-200 flex items-center gap-1 xl:gap-1.5 whitespace-nowrap outline-none cursor-pointer active:scale-95 ${
                            isActive || megaMenuOpen
                              ? 'text-[#FFFFFF] font-bold drop-shadow-xs'
                              : 'text-[#FFFFFF] hover:text-[#EAB308]'
                          }`}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${
                              megaMenuOpen ? 'rotate-180 text-[#EAB308]' : 'text-[#D1D5DB]'
                            }`}
                          />
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

                        {/* Mega Menu Dropdown */}
                        {megaMenuOpen && (
                          <div
                            onMouseEnter={handleMenuEnter}
                            onMouseLeave={handleMenuLeave}
                            className="fixed top-[62px] sm:top-[68px] left-1/2 -translate-x-1/2 w-[96vw] max-w-6xl 2xl:max-w-7xl rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.6)] border-2 border-[#EAB308]/80 p-5 sm:p-7 z-50 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200 text-[#FFFFFF] select-auto"
                            style={{ backgroundColor: '#141414' }}
                          >
                            {/* Header Bar */}
                            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#2D2D2D]/80">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#181818] to-[#0A0A0A] flex items-center justify-center text-[#FACC15] border border-[#EAB308]/50 shadow-xs">
                                  <Layers className="w-4 h-4" />
                                </div>
                                <div>
                                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#FFFFFF] leading-tight">
                                    Explore Our Categories
                                  </h3>
                                  <p className="text-[11px] text-[#D1D5DB] font-sans">
                                    8 Featured Categories • Premium Acrylic Photo Frames &amp; Custom Gifts
                                  </p>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  setMegaMenuOpen(false);
                                  setHoveredTab(null);
                                }}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#FFFFFF] bg-[#1E1E1E] hover:bg-[#2A2A2A] border border-[#EAB308]/60 transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
                                aria-label="Close categories menu"
                              >
                                <X className="w-3.5 h-3.5 text-[#FFFFFF]" />
                                <span>Close</span>
                              </button>
                            </div>

                            <div className="space-y-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                                {INITIAL_CATEGORIES.map((cat) => (
                                  <Link
                                    key={cat.id}
                                    href={`/category/${cat.slug}`}
                                    onClick={() => {
                                      setMegaMenuOpen(false);
                                      setHoveredTab(null);
                                    }}
                                    className="group relative flex flex-col justify-between p-3.5 rounded-2xl border border-[#2D2D2D] hover:border-[#EAB308] shadow-2xs hover:shadow-xs transition-all duration-200 bg-[#1A1A1A] hover:bg-[#202020]"
                                  >
                                    <div>
                                      <div className="flex items-start justify-between gap-1.5">
                                        <span className="font-serif font-bold text-xs sm:text-sm text-[#FFFFFF] group-hover:text-[#EAB308] transition-colors line-clamp-1">
                                          {cat.name}
                                        </span>
                                        {cat.lightingType === 'backlight' && (
                                          <span className="text-[9px] font-bold text-yellow-400 bg-yellow-950/50 px-1.5 py-0.5 rounded border border-amber-300 shrink-0">
                                            LED
                                          </span>
                                        )}
                                      </div>
                                      <span className="text-[11px] text-[#D1D5DB] block line-clamp-2 mt-1.5 leading-snug">
                                        {cat.description}
                                      </span>
                                    </div>
                                    <div className="mt-3 pt-2 border-t border-[#2D2D2D] flex items-center justify-between text-[11px] font-semibold text-[#EAB308]">
                                      <span>Explore</span>
                                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                  </Link>
                                ))}
                              </div>

                              <div className="pt-3 flex items-center justify-between border-t border-[#2D2D2D]">
                                <Link
                                  href="/category"
                                  onClick={() => {
                                    setMegaMenuOpen(false);
                                    setHoveredTab(null);
                                  }}
                                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFFFFF] hover:text-[#EAB308] group"
                                >
                                  <Sparkles className="w-3.5 h-3.5 text-[#EAB308]" />
                                  <span>View All 8 Categories</span>
                                  <ArrowRight className="w-3.5 h-3.5 text-[#EAB308] group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <Link
                                  href="/shop"
                                  onClick={() => {
                                    setMegaMenuOpen(false);
                                    setHoveredTab(null);
                                  }}
                                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#EAB308] hover:underline"
                                >
                                  <span>Shop Full Catalog</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
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
                      className={`relative z-10 py-1.5 px-2 xl:px-3 2xl:px-4 rounded-full text-[11.5px] xl:text-[13px] font-semibold transition-colors duration-200 flex items-center gap-1 xl:gap-1.5 whitespace-nowrap outline-none active:scale-95 ${
                        isActive
                          ? 'text-[#FFFFFF] font-bold drop-shadow-xs'
                          : 'text-[#FFFFFF] hover:text-[#EAB308]'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      {/* Active Golden Shimmer Indicator */}
                      {isCurrentSelected && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-[#EAB308] rounded-full shadow-[0_0_8px_#D6AA55]" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Right: Social Channels (WhatsApp, Instagram, YouTube), Search, Wishlist, Cart */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* WhatsApp Quick Chat */}
              <a
                href="https://wa.me/919032372782?text=Hi%20Abhi%27s%20Gifts%2C%20I%20would%20like%20to%20inquire%20about%20ordering%20a%20personalized%20photo%20frame"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 min-[360px]:w-9 min-[360px]:h-9 sm:w-10 sm:h-10 p-1.5 text-[#25D366] bg-[#E8F5E9] hover:bg-[#C8E6C9] border border-[#81C784]/80 rounded-full transition-all shadow-2xs hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
                title="Chat on WhatsApp"
                aria-label="Chat on WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 fill-current shrink-0" />
              </a>

              {/* Instagram Option */}
              <a
                href="https://www.instagram.com/abhis_gifts_?cplk=MWtkNTJla2s3NTQw"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 min-[360px]:w-9 min-[360px]:h-9 sm:w-10 sm:h-10 p-1.5 text-white bg-gradient-to-tr from-[#fd5949] via-[#d6249f] to-[#285AEB] hover:opacity-90 border border-pink-400/50 rounded-full transition-all shadow-2xs hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
                title="Follow us on Instagram (@abhis_gifts_)"
                aria-label="Follow us on Instagram"
              >
                <InstagramIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current shrink-0" />
              </a>

              {/* YouTube Option */}
              <a
                href="https://youtube.com/@abhis_gifts?si=Ap98aZU7b21rJA_8"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 min-[360px]:w-9 min-[360px]:h-9 sm:w-10 sm:h-10 p-1.5 text-white bg-[#CC0000] hover:bg-[#FF0000] border border-red-500/60 rounded-full transition-all shadow-2xs hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
                title="Watch on YouTube (@abhis_gifts)"
                aria-label="Watch on YouTube"
              >
                <YouTubeIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current shrink-0" />
              </a>

              {/* Attractive Luxury Wishlist Button */}
              <Link
                href="/wishlist"
                className="group relative flex items-center justify-center w-9 h-9 min-[360px]:w-10 min-[360px]:h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-b from-[#222222] to-[#121212] hover:from-[#2A2A2A] hover:to-[#181818] border border-[#333333] hover:border-rose-400/60 text-[#FFFFFF] hover:text-rose-400 shadow-md shadow-black/40 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Wishlist"
                title="View Saved Wishlist"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110 group-hover:fill-rose-500/20" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-[10px] font-extrabold min-w-[20px] h-[20px] px-1 rounded-full flex items-center justify-center ring-2 ring-[#0D0D0D] shadow-[0_2px_8px_rgba(244,63,94,0.5)] animate-in zoom-in-75">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Attractive Luxury Cart / Atelier Bag Capsule */}
              <button
                type="button"
                onClick={openCart}
                className="group relative flex items-center justify-center gap-2 h-9 min-[360px]:h-10 px-3 sm:h-11 sm:px-4 rounded-2xl bg-gradient-to-r from-[#EAB308] via-[#FACC15] to-[#CA8A04] hover:from-[#FACC15] hover:to-[#EAB308] text-stone-950 font-extrabold shadow-[0_2px_14px_rgba(234,179,8,0.35)] hover:shadow-[0_4px_22px_rgba(234,179,8,0.55)] hover:scale-[1.04] active:scale-95 transition-all duration-300 cursor-pointer"
                aria-label="Shopping Cart"
                title="View Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-stone-950 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <span className="hidden sm:inline-block text-xs font-serif font-black tracking-wider uppercase text-stone-950">
                  Cart
                </span>
                <span className="bg-stone-950 text-[#FACC15] font-mono text-[10.5px] font-black min-w-[20px] h-[20px] px-1.5 rounded-full flex items-center justify-center shadow-xs border border-stone-800">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>
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
                  src="/images/brand/logo-gold-v2.png"
                  alt="Abhi's Gifts - We Create Memorable Moments"
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

            {/* Direct Social & Ordering Quick Actions */}
            <div className="px-3 pt-2.5 space-y-2">
              <a
                href="https://wa.me/919032372782?text=Hi%20Abhi%27s%20Gifts%2C%20I%20have%20an%20enquiry%20regarding%20custom%20photo%20frames"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 bg-[#E8F5E9] hover:bg-[#C8E6C9] text-[#1B5E20] border border-[#81C784]/80 rounded-xl font-bold text-xs shadow-2xs transition-colors"
              >
                <span className="flex items-center gap-2">
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>Chat on WhatsApp</span>
                </span>
                <span className="text-[11px] text-[#2E7D32] font-semibold">Support →</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://www.instagram.com/abhis_gifts_?cplk=MWtkNTJla2s3NTQw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-2 bg-[#1A1A1A] hover:bg-[#222222] text-[#FFFFFF] border border-pink-500/40 rounded-xl font-bold text-xs shadow-2xs transition-colors"
                >
                  <span className="w-5 h-5 rounded-md bg-gradient-to-tr from-[#fd5949] via-[#d6249f] to-[#285AEB] flex items-center justify-center shrink-0">
                    <InstagramIcon className="w-3.5 h-3.5 text-white fill-current" />
                  </span>
                  <span>Instagram</span>
                </a>

                <a
                  href="https://youtube.com/@abhis_gifts?si=Ap98aZU7b21rJA_8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-2 bg-[#1A1A1A] hover:bg-[#222222] text-[#FFFFFF] border border-red-500/40 rounded-xl font-bold text-xs shadow-2xs transition-colors"
                >
                  <span className="w-5 h-5 rounded-md bg-[#CC0000] flex items-center justify-center shrink-0">
                    <YouTubeIcon className="w-3.5 h-3.5 text-white fill-current" />
                  </span>
                  <span>YouTube</span>
                </a>
              </div>
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
                className="mt-2.5 inline-block bg-gradient-to-r from-[#EAB308] to-[#FACC15] text-black font-extrabold px-3.5 py-1.5 rounded-lg text-xs shadow-xs transition-all active:scale-95"
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
                  className={`block px-3 py-2 font-semibold rounded-xl text-xs sm:text-sm transition-colors ${
                    pathname === '/' ? 'bg-[#1E1E1E] text-[#EAB308]' : 'text-[#FFFFFF] hover:bg-[#1E1E1E]'
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 font-semibold rounded-xl text-xs sm:text-sm transition-colors ${
                    pathname === '/shop' ? 'bg-[#1E1E1E] text-[#EAB308]' : 'text-[#FFFFFF] hover:bg-[#1E1E1E]'
                  }`}
                >
                  Shop
                </Link>
                <Link
                  href="/customise"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 font-semibold rounded-xl text-xs sm:text-sm transition-colors ${
                    pathname === '/customise' ? 'bg-[#1E1E1E] text-[#EAB308]' : 'text-[#FFFFFF] hover:bg-[#1E1E1E]'
                  }`}
                >
                  Customized
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 font-semibold rounded-xl text-xs sm:text-sm transition-colors ${
                    pathname === '/about' ? 'bg-[#1E1E1E] text-[#EAB308]' : 'text-[#FFFFFF] hover:bg-[#1E1E1E]'
                  }`}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 font-semibold rounded-xl text-xs sm:text-sm transition-colors ${
                    pathname === '/contact' ? 'bg-[#1E1E1E] text-[#EAB308]' : 'text-[#FFFFFF] hover:bg-[#1E1E1E]'
                  }`}
                >
                  Contact
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
