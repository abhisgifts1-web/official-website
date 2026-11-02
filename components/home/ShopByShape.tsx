'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Check, Maximize2 } from 'lucide-react';
import { SHAPES_DATA } from '@/lib/data/shapes';

export default function ShopByShape() {
  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-stone-200/80 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-amber-900 bg-amber-100/90 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-2 shadow-xs">
            <Maximize2 className="w-3.5 h-3.5 text-amber-700" /> Architectural Proportions
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-4xl text-stone-900 tracking-tight mt-1">
            Shop by Shape &amp; Wall Layout
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
            Select the ideal frame silhouette and proportion tailored to your room layout, wall width, and ceiling height.
          </p>
        </div>

        <Link
          href="/shop"
          className="text-xs sm:text-sm font-semibold text-amber-900 hover:text-amber-700 flex items-center gap-1.5 shrink-0 transition-colors group"
        >
          <span>Explore All Wall Sizes</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid of 6 Shape Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {SHAPES_DATA.map((shape) => (
          <Link
            key={shape.id}
            href={shape.href}
            className="group relative flex flex-col bg-white rounded-3xl border border-stone-200/80 hover:border-amber-400 overflow-hidden shadow-sm hover:shadow-warm-lg transition-all duration-300 hover:-translate-y-1"
          >
            {/* Visual Aspect Ratio Mockup Banner */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
              <img
                src={shape.image}
                alt={shape.name}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/wall-decor/categories/frame-shapes/shape-portrait.jpg';
                }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

              {/* Aspect Ratio Badge Top Left */}
              <div className="absolute top-3 left-3">
                <span className="bg-stone-900/90 backdrop-blur-md text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                  {shape.aspectRatio}
                </span>
              </div>

              {/* Visual Geometric Silhouette Icon Bottom Right */}
              <div className="absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center">
                {shape.shape === 'portrait' && <div className="w-3.5 h-5 border-2 border-amber-300 rounded-sm" />}
                {shape.shape === 'landscape' && <div className="w-5 h-3.5 border-2 border-amber-300 rounded-sm" />}
                {shape.shape === 'square' && <div className="w-4 h-4 border-2 border-amber-300 rounded-sm" />}
                {shape.shape === 'round' && <div className="w-4 h-4 border-2 border-amber-300 rounded-full" />}
                {shape.shape === 'set-of-2' && (
                  <div className="flex gap-0.5">
                    <div className="w-2 h-4 border border-amber-300 rounded-xs" />
                    <div className="w-2 h-4 border border-amber-300 rounded-xs" />
                  </div>
                )}
                {shape.shape === 'set-of-3' && (
                  <div className="flex gap-0.5">
                    <div className="w-1.5 h-4 border border-amber-300 rounded-xs" />
                    <div className="w-1.5 h-4 border border-amber-300 rounded-xs" />
                    <div className="w-1.5 h-4 border border-amber-300 rounded-xs" />
                  </div>
                )}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-amber-800 transition-colors">
                    {shape.name}
                  </h3>
                </div>

                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  {shape.description}
                </p>

                {/* Dimensions pill */}
                <div className="pt-1">
                  <span className="text-[10px] text-amber-900 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md font-mono inline-block">
                    {shape.dimensions}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-stone-100">
                <span className="w-full bg-stone-50 group-hover:bg-stone-900 text-stone-800 group-hover:text-white text-xs font-semibold py-2 px-3 rounded-xl transition-all duration-200 flex items-center justify-between">
                  <span>{shape.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
