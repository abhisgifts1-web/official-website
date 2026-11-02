import { NextRequest, NextResponse } from 'next/server';
import { getProductBySlug, updateProduct, deleteProduct } from '@/lib/store';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db/mongodb';
import { ProductModel } from '@/lib/db/models/Product';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const product = getProductBySlug(params.slug);
    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, product });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const currentProduct = getProductBySlug(params.slug);
    if (!currentProduct) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    const updates = await req.json();
    const updated = updateProduct(currentProduct.id, updates);

    // Persist to MongoDB Atlas if connected
    try {
      const conn = await connectToDatabase();
      if (conn) {
        await ProductModel.findOneAndUpdate({ slug: params.slug }, updates, { new: true });
      }
    } catch (dbErr) {
      console.warn('MongoDB update error (in-memory updated):', dbErr);
    }

    return NextResponse.json({ success: true, product: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const currentProduct = getProductBySlug(params.slug);
    if (!currentProduct) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    deleteProduct(currentProduct.id);

    // Persist deletion to MongoDB Atlas if connected
    try {
      const conn = await connectToDatabase();
      if (conn) {
        await ProductModel.findOneAndDelete({ slug: params.slug });
      }
    } catch (dbErr) {
      console.warn('MongoDB delete error (in-memory deleted):', dbErr);
    }

    return NextResponse.json({ success: true, message: 'Product deleted' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
