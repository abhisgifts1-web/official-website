import { NextRequest, NextResponse } from 'next/server';
import { addProductReview } from '@/lib/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productSlug, authorName, city, rating, title, comment } = body;

    if (!productSlug || !authorName || !rating || !comment) {
      return NextResponse.json(
        { success: false, error: 'Product, author name, rating, and comment are required' },
        { status: 400 }
      );
    }

    const review = addProductReview(productSlug, {
      authorName: authorName.trim(),
      city: (city || 'India').trim(),
      rating: Math.max(1, Math.min(5, Number(rating))),
      title: (title || 'Customer Review').trim(),
      comment: comment.trim(),
      verifiedBuyer: true,
      likes: 0,
    });

    if (!review) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
