'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Layers,
  Tag,
  Star,
  Settings,
  ShieldCheck,
  Camera,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { AdminUser } from '@/types';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Catalog Artworks', href: '/admin/products', icon: Package },
  { label: '8 Store Collections', href: '/admin/categories', icon: Layers },
  { label: 'Team & Staff', href: '/admin/team', icon: ShieldCheck },
  { label: 'Promotions & Coupons', href: '/admin/coupons', icon: Tag },
  { label: 'Reviews Moderation', href: '/admin/reviews', icon: Star },
  { label: 'Store Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // If we're on /admin/login, don't wrap with sidebar
    if (pathname === '/admin/login') {
      setCheckingAuth(false);
      return;
    }

    const checkAdmin = async () => {
      try {
        const res = await fetch('/api/admin/me');
        const data = await res.json();
        if (res.ok && data.success) {
          setAdminUser(data.user);
        } else {
          router.push('/admin/login');
        }
      } catch {
        router.push('/admin/login');
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAdmin();
  }, [pathname, router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch {
      router.push('/admin/login');
    }
  };

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="flex flex-col items-center gap-2 text-stone-600">
          <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold">Verifying Staff Authorization...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex">
      {/* Sidebar for Desktop — Matte Black & Gold Luxury Atelier */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#101010] text-stone-200 border-r border-stone-800 shrink-0">
        {/* Brand Header */}
        <div className="p-5 border-b border-stone-800 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center group">
              <Image
                src="/images/brand/logo-gold.png"
                alt="Abhi's Gifts Admin Portal"
                width={160}
                height={32}
                className="h-8 w-auto object-contain brightness-105 group-hover:scale-105 transition-transform drop-shadow-[0_0_12px_rgba(234,179,8,0.3)]"
              />
            </Link>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#181818] border border-[#EAB308]/30 text-[#FACC15] text-[10px] font-bold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308] animate-pulse" />
              Store Operations
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-3.5 space-y-1.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#EAB308] text-stone-950 font-extrabold shadow-md shadow-[#EAB308]/20'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800/80 hover:border-l-2 hover:border-[#EAB308]'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-stone-950' : 'text-[#EAB308]'}`} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Card & Quick Links */}
        <div className="p-3.5 border-t border-stone-800 space-y-2.5 bg-[#0A0A0A]">
          <div className="flex items-center justify-between text-xs px-1">
            <div className="flex items-center gap-2.5 min-w-0">
              <Link
                href="/admin/team"
                className="relative group/userAvatar w-9 h-9 rounded-full bg-[#1E1E1E] border border-[#EAB308]/50 text-[#FACC15] flex items-center justify-center font-bold text-xs shrink-0 shadow-inner overflow-hidden cursor-pointer"
                title="Change My Profile Photo"
              >
                {adminUser?.avatar ? (
                  <img
                    src={adminUser.avatar}
                    alt={adminUser.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{adminUser?.name?.charAt(0).toUpperCase() || 'A'}</span>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/userAvatar:opacity-100 flex items-center justify-center text-white transition-opacity">
                  <Camera className="w-3.5 h-3.5 text-[#FACC15]" />
                </div>
              </Link>
              <div className="truncate">
                <Link
                  href="/admin/team"
                  className="font-bold text-stone-100 truncate text-[11px] block hover:text-[#FACC15] transition-colors"
                >
                  {adminUser?.name || 'Administrator'}
                </Link>
                <p className="text-[10px] text-stone-400 truncate">{adminUser?.email || 'admin@abhigifts.com'}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 text-stone-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-center gap-1 bg-[#181818] hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-800 hover:border-stone-700 text-[10.5px] font-semibold py-1.5 rounded-lg transition-colors"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3 h-3 text-[#EAB308]" />
            </Link>
            <Link
              href="/customise"
              target="_blank"
              className="flex items-center justify-center gap-1 bg-[#181818] hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-800 hover:border-stone-700 text-[10.5px] font-semibold py-1.5 rounded-lg transition-colors"
            >
              <span>Customizer</span>
              <ExternalLink className="w-3 h-3 text-[#EAB308]" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-stone-100">
        {/* Top Navbar — Black Header */}
        <header className="bg-[#0A0A0A] border-b border-stone-800 py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-md">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-stone-300 hover:text-white"
              aria-label="Open navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <Link href="/admin" className="hover:text-[#FACC15] font-semibold transition-colors">Abhi&apos;s Gifts</Link>
              <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
              <span className="text-white font-bold capitalize">
                {pathname.replace('/admin/', '').replace('/admin', 'Overview') || 'Dashboard'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#181818] border border-[#EAB308]/30 text-[#FACC15] text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308] animate-pulse" />
              Auto Custom Sizing Live
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Online Store Active
            </span>
            <Link
              href="/"
              target="_blank"
              className="text-xs font-semibold text-stone-200 hover:text-[#FACC15] flex items-center gap-1.5 bg-[#181818] hover:bg-stone-800 border border-stone-700 hover:border-[#EAB308]/40 px-3 py-1.5 rounded-lg transition-colors"
            >
              <span>Storefront</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#EAB308]" />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto bg-stone-100">
          {children}
        </main>
      </div>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-[#101010] text-stone-200 border-r border-stone-800 h-full shadow-2xl flex flex-col z-10 p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <Image
                src="/images/brand/logo-gold.png"
                alt="Abhi's Gifts Admin"
                width={140}
                height={28}
                className="h-7 w-auto object-contain brightness-105 drop-shadow-[0_0_10px_rgba(234,179,8,0.3)]"
              />
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 space-y-1.5 overflow-y-auto">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                      isActive
                        ? 'bg-[#EAB308] text-stone-950 font-extrabold shadow-sm'
                        : 'text-stone-300 hover:bg-stone-800/80 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-[#EAB308]'}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-2 border-t border-stone-800 flex items-center gap-2.5 px-1">
              <Link
                href="/admin/team"
                onClick={() => setSidebarOpen(false)}
                className="w-9 h-9 rounded-full bg-[#1E1E1E] border border-[#EAB308]/50 text-[#FACC15] flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden"
              >
                {adminUser?.avatar ? (
                  <img
                    src={adminUser.avatar}
                    alt={adminUser.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{adminUser?.name?.charAt(0).toUpperCase() || 'A'}</span>
                )}
              </Link>
              <div className="truncate min-w-0">
                <Link
                  href="/admin/team"
                  onClick={() => setSidebarOpen(false)}
                  className="font-bold text-stone-100 text-xs block truncate hover:text-[#FACC15]"
                >
                  {adminUser?.name || 'Administrator'}
                </Link>
                <p className="text-[10px] text-stone-400 truncate">{adminUser?.email || 'admin@abhigifts.com'}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/50 text-rose-300 text-xs font-semibold py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
