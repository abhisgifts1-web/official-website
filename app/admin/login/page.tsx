'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, Key, Sparkles } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@abhigifts.com');
  const [password, setPassword] = useState('AbhiGifts@2026!Admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Invalid administrator credentials');
        setLoading(false);
        return;
      }

      router.push('/admin');
    } catch {
      setError('Connection failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-[#0A0A0A] via-[#121212] to-[#0A0A0A]">
      <div className="w-full max-w-md bg-[#141414] rounded-3xl p-8 sm:p-10 border border-[#2D2D2D] shadow-2xl space-y-6 text-white">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#0D0D0E] border border-[#EAB308]/40 shadow-lg mx-auto">
            <Image
              src="/images/brand/logo-gold.png"
              alt="Abhi's Gifts"
              width={180}
              height={36}
              className="h-8 sm:h-9 w-auto object-contain brightness-105"
            />
          </div>
          <h1 className="font-serif font-bold text-2xl text-white">
            Studio Admin Portal
          </h1>
          <p className="text-xs text-[#A1A1AA]">
            Abhi Gifts Business &amp; Operations Console
          </p>
        </div>

        {/* Demo Credentials Notice */}
        <div className="bg-[#1A1A1A] border border-[#EAB308]/30 p-3.5 rounded-2xl text-xs space-y-1">
          <p className="font-bold flex items-center gap-1.5 text-[#FACC15]">
            <Sparkles className="w-3.5 h-3.5 text-[#EAB308]" /> Staff Authorization Credentials:
          </p>
          <p className="font-mono text-[11px] text-[#D1D5DB]">
            Email: <strong className="text-white">admin@abhigifts.com</strong>
          </p>
          <p className="font-mono text-[11px] text-[#D1D5DB]">
            Password: <strong className="text-white">AbhiGifts@2026!Admin</strong>
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#D1D5DB] block mb-1">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl outline-none focus:border-[#EAB308] text-white"
              />
              <Mail className="w-4 h-4 text-[#A1A1AA] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#D1D5DB] block mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl outline-none focus:border-[#EAB308] text-white font-mono"
              />
              <Key className="w-4 h-4 text-[#A1A1AA] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-950/80 text-rose-200 text-xs rounded-xl border border-rose-800/40 font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#EAB308] hover:bg-[#FACC15] disabled:opacity-50 text-black font-extrabold text-xs sm:text-sm py-3.5 rounded-xl shadow-[0_2px_12px_rgba(234,179,8,0.25)] flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Lock className="w-4 h-4 text-black" />
            <span>{loading ? 'Authenticating...' : 'Sign In to Studio Portal'}</span>
          </button>
        </form>

        <div className="text-center pt-2">
          <Link
            href="/"
            className="text-xs text-[#A1A1AA] hover:text-[#FACC15] transition-colors"
          >
            ← Return to Live Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
