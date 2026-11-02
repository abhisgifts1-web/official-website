import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-amber-100/70 text-amber-800 flex items-center justify-center font-serif font-bold text-2xl mx-auto border border-amber-300">
          404
        </div>
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
          Sacred Artwork Not Found
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
          The wall decor page or collection you are looking for might have been moved or is currently in production.
        </p>
        <div className="pt-2 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="bg-stone-900 hover:bg-stone-950 text-white text-xs font-semibold px-6 py-3 rounded-full flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
          <Link
            href="/shop"
            className="bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 text-xs font-semibold px-6 py-3 rounded-full transition-colors"
          >
            Explore Catalog →
          </Link>
        </div>
      </div>
    </div>
  );
}
