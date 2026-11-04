'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Layers,
  Tag,
  Users,
  Star,
  Settings,
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
  { label: 'Studio Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Modify Products', href: '/admin/products', icon: Package },
  { label: '8 Official Categories', href: '/admin/categories', icon: Layers },
  { label: 'Customer Orders', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Ordered Customers', href: '/admin/customers', icon: Users },
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
      <div className="min-h-screen flex items-center justify-center bg-[#121212]">
        <div className="flex flex-col items-center gap-2 text-stone-600">
          <div className="w-8 h-8 border-4 border-amber-700 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold">Verifying Staff Authorization...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFFFF] flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0D0D0E] text-[#D1D5DB] border-r border-[#2D2D2D] shrink-0">
        {/* Brand Header */}
        <div className="p-5 border-b border-[#2D2D2D] flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center group">
              <Image
                src="/images/brand/logo-gold.png"
                alt="Abhi's Gifts Admin Portal"
                width={160}
                height={32}
                className="h-8 w-auto object-contain brightness-110 group-hover:scale-105 transition-transform"
              />
            </Link>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#EAB308]/15 border border-[#EAB308]/40 text-[#FACC15] text-[10px] font-bold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308] animate-pulse" />
              Studio Operations
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
                    ? 'bg-[#EAB308] text-black font-extrabold shadow-[0_2px_12px_rgba(234,179,8,0.25)]'
                    : 'text-[#D1D5DB] hover:text-[#FFFFFF] hover:bg-[#1A1A1A]'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-black' : 'text-[#EAB308]'}`} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Card & Quick Links */}
        <div className="p-3.5 border-t border-[#2D2D2D] space-y-2.5 bg-[#121212]/80">
          <div className="flex items-center justify-between text-xs px-1">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#EAB308]/20 border border-[#EAB308]/40 text-[#FACC15] flex items-center justify-center font-bold text-xs shrink-0">
                A
              </div>
              <div className="truncate">
                <p className="font-bold text-white truncate text-[11px]">{adminUser?.name || 'Studio Administrator'}</p>
                <p className="text-[10px] text-[#A1A1AA] truncate">{adminUser?.email || 'admin@abhigifts.com'}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 text-[#9CA3AF] hover:text-rose-400 hover:bg-[#1F1F1F] rounded-lg transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-center gap-1 bg-[#1E1E1E] hover:bg-[#2A2A2A] text-[#D1D5DB] hover:text-[#FFFFFF] border border-[#2D2D2D] text-[10.5px] font-semibold py-1.5 rounded-lg transition-colors"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3 h-3 text-[#EAB308]" />
            </Link>
            <Link
              href="/customise"
              target="_blank"
              className="flex items-center justify-center gap-1 bg-[#1E1E1E] hover:bg-[#2A2A2A] text-[#D1D5DB] hover:text-[#FFFFFF] border border-[#2D2D2D] text-[10.5px] font-semibold py-1.5 rounded-lg transition-colors"
            >
              <span>Customizer</span>
              <ExternalLink className="w-3 h-3 text-[#EAB308]" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0A0A0A]">
        {/* Top Navbar */}
        <header className="bg-[#121212] border-b border-[#2D2D2D] py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-[#D1D5DB] hover:text-white"
              aria-label="Open navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
              <Link href="/admin" className="hover:text-[#FACC15] font-medium transition-colors">Abhi&apos;s Studio</Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#52525B]" />
              <span className="text-[#FFFFFF] font-bold capitalize">
                {pathname.replace('/admin/', '').replace('/admin', 'Overview') || 'Dashboard'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Online Studio Active
            </span>
            <Link
              href="/"
              target="_blank"
              className="text-xs font-semibold text-[#D1D5DB] hover:text-[#FACC15] flex items-center gap-1 bg-[#1E1E1E] hover:bg-[#262626] border border-[#2D2D2D] px-3 py-1.5 rounded-lg transition-colors"
            >
              <span>Storefront</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#EAB308]" />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto bg-[#0A0A0A]">
          {children}
        </main>
      </div>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-[#0D0D0E] text-[#D1D5DB] border-r border-[#2D2D2D] h-full shadow-2xl flex flex-col z-10 p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-[#2D2D2D] pb-3">
              <Image
                src="/images/brand/logo-gold.png"
                alt="Abhi's Gifts Admin"
                width={140}
                height={28}
                className="h-7 w-auto object-contain brightness-110"
              />
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 text-[#9CA3AF] hover:text-white"
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
                        ? 'bg-[#EAB308] text-black font-extrabold'
                        : 'text-[#D1D5DB] hover:bg-[#1E1E1E]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-[#EAB308]'}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full bg-rose-950/80 hover:bg-rose-900 border border-rose-800/40 text-rose-200 text-xs font-semibold py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
