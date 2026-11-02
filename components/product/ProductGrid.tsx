'use client';

import React from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import { Sparkles } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
  columns?: '3' | '4';
}

export default function ProductGrid({
  products,
  emptyMessage = 'No artworks found matching your current filter criteria.',
  columns = '4',
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center bg-white rounded-2xl border border-stone-200 p-8 max-w-lg mx-auto">
        <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center mx-auto mb-3">
          <Sparkles className="w-6 h-6" />
        </div>
        <h4 className="font-serif font-bold text-lg text-stone-900">No matching artworks</h4>
        <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">{emptyMessage}</p>
      </div>
    );
  }

  const colClass =
    columns === '3'
      ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-6'
      : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-5 sm:gap-6';

  return (
    <div className={colClass}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
