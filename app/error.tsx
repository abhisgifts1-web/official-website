'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw, Home, MessageCircle } from 'lucide-react';

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled application error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-800 flex items-center justify-center mx-auto border border-amber-200 shadow-sm">
          <AlertCircle className="w-8 h-8 text-amber-700" />
        </div>

        <div className="space-y-2">
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight">
            Something Went Wrong
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            We encountered a temporary hiccup loading this page. Your cart and customizations remain safely saved.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-xl flex items-center gap-2 transition"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Storefront</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-stone-200">
          <p className="text-xs text-stone-500">
            Need urgent assistance?{' '}
            <a
              href="https://wa.me/919032372782?text=Hi%20Abhi%20Gifts%2C%20I%20encountered%20an%20error%20on%20the%20website."
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 font-semibold hover:underline inline-flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5 inline" />
              <span>Contact Abhi Gifts Support</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
