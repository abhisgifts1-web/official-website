'use client';

import React, { useState, useEffect } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Product, ProductReview } from '@/types';

export default function AdminReviewsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setProducts(d.products);
      });
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
      <div className="space-y-6">
        <div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
            Reviews Moderation
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Audit customer testimonials and feedback across all published artworks.
          </p>
        </div>

        {allReviews.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-stone-200 text-center space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#121212] border border-[#2D2D2D] flex items-center justify-center mx-auto text-[#FFFFFF]">
              <MessageSquare className="w-6 h-6 text-[#EAB308]" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-800">No Reviews Submitted Yet</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              Your customer reviews list is currently empty. As customers purchase and share feedback on product pages, their testimonials will appear here for audit and moderation.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {allReviews.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-2">
                  <div>
                    <span className="font-bold text-stone-900">{item.review.authorName}</span>
                    <span className="text-stone-400"> ({item.review.city})</span>
                    <span className="text-stone-500 ml-2">on <strong>{item.productTitle}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-500">
                      {[...Array(item.review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-stone-400">{item.review.createdAt}</span>
                  </div>
                </div>

                <h4 className="font-bold text-stone-800">{item.review.title}</h4>
                <p className="text-stone-600 leading-relaxed">{item.review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
