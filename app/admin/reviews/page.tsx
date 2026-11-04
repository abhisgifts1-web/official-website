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
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141414] border border-[#2D2D2D] p-5 sm:p-6 rounded-3xl">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#EAB308]/15 border border-[#EAB308]/40 text-[#FACC15] font-bold text-[10px] tracking-wider uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#EAB308]" />
                Customer Voices
              </span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              Reviews &amp; Testimonials
            </h1>
            <p className="text-xs text-[#A1A1AA] mt-0.5">
              Audit customer feedback, 5-star ratings, and unboxing reviews across all published artworks.
            </p>
          </div>

          <div className="bg-[#1A1A1A] px-4 py-2 rounded-xl border border-[#2D2D2D] shadow-sm text-xs">
            <span className="text-[#A1A1AA] block text-[10px] uppercase font-bold">Total Reviews</span>
            <span className="font-serif font-bold text-base text-[#FACC15]">{allReviews.length} Verified</span>
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs text-[#A1A1AA]">Loading reviews...</div>
        ) : allReviews.length === 0 ? (
          <div className="bg-[#141414] p-12 rounded-3xl border border-[#2D2D2D] text-center space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-[#333333] flex items-center justify-center mx-auto text-[#FFFFFF]">
              <MessageSquare className="w-6 h-6 text-[#EAB308]" />
            </div>
            <h3 className="font-serif font-bold text-base text-white">No Reviews Submitted Yet</h3>
            <p className="text-xs text-[#A1A1AA] max-w-md mx-auto">
              Your customer reviews list is currently clean. As buyers place orders and share feedback on product detail pages, their testimonials will appear here for audit and moderation.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {allReviews.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#141414] p-5 rounded-2xl border border-[#2D2D2D] hover:border-[#EAB308]/40 shadow-sm space-y-3 text-xs transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#262626] pb-2.5">
                  <div>
                    <span className="font-bold text-white text-sm">{item.review.authorName}</span>
                    <span className="text-[#A1A1AA]"> ({item.review.city})</span>
                    <span className="text-[#D1D5DB] ml-2">
                      on <strong className="text-white">{item.productTitle}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex text-[#EAB308]">
                      {[...Array(item.review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[#A1A1AA] text-[11px] font-mono">{item.review.createdAt}</span>
                    <Link
                      href={`/product/${item.productSlug}`}
                      target="_blank"
                      className="text-[#9CA3AF] hover:text-white"
                      title="View on site"
                    >
                      <ExternalLink className="w-3 h-3 text-[#EAB308]" />
                    </Link>
                  </div>
                </div>

                <h4 className="font-bold text-white text-sm">{item.review.title}</h4>
                <p className="text-[#D1D5DB] leading-relaxed">{item.review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
