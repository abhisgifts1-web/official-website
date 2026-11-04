'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, MessageSquare, Sparkles, ExternalLink } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Product, ProductReview } from '@/types';

export default function AdminReviewsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setProducts(d.products);
      })
      .finally(() => setLoading(false));
  }, []);

  const allReviews: { productTitle: string; productSlug: string; review: ProductReview }[] = [];
  products.forEach((p) => {
    if (p.reviews && p.reviews.length > 0) {
      p.reviews.forEach((r) => {
        allReviews.push({ productTitle: p.title, productSlug: p.slug, review: r });
      });
    }
  });

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto text-stone-900">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200 p-5 sm:p-6 rounded-3xl shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 font-bold text-[10px] tracking-wider uppercase flex items-center gap-1 shadow-2xs">
                <Sparkles className="w-3 h-3 text-amber-700" />
                Customer Voices
              </span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
              Reviews &amp; Testimonials
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Audit customer feedback, 5-star ratings, and unboxing reviews across all published artworks.
            </p>
          </div>

          <div className="bg-stone-50 px-4 py-2 rounded-xl border border-stone-200 shadow-2xs text-xs">
            <span className="text-stone-500 block text-[10px] uppercase font-bold">Total Reviews</span>
            <span className="font-serif font-bold text-base text-amber-800">{allReviews.length} Verified</span>
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs text-stone-500">Loading reviews...</div>
        ) : allReviews.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-stone-200 text-center space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center mx-auto text-amber-700">
              <MessageSquare className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">No Reviews Submitted Yet</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              Your customer reviews list is currently clean. As buyers place orders and share feedback on product detail pages, their testimonials will appear here for audit and moderation.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {allReviews.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-amber-400 shadow-xs space-y-3 text-xs transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-2.5">
                  <div>
                    <span className="font-bold text-stone-900 text-sm">{item.review.authorName}</span>
                    <span className="text-stone-500"> ({item.review.city})</span>
                    <span className="text-stone-700 ml-2">
                      on <strong className="text-stone-900">{item.productTitle}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex text-[#EAB308]">
                      {[...Array(item.review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-stone-400 text-[11px] font-mono">{item.review.createdAt}</span>
                    <Link
                      href={`/product/${item.productSlug}`}
                      target="_blank"
                      className="text-stone-400 hover:text-stone-900"
                      title="View on site"
                    >
                      <ExternalLink className="w-3 h-3 text-amber-700" />
                    </Link>
                  </div>
                </div>

                <h4 className="font-bold text-stone-900 text-sm">{item.review.title}</h4>
                <p className="text-stone-600 leading-relaxed">{item.review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
