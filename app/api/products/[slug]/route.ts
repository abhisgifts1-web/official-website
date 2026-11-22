import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getProductBySlug, updateProduct, deleteProduct } from '@/lib/store';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db/mongodb';
import { ProductModel } from '@/lib/db/models/Product';
import { Product } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // 1. Try fetching directly from MongoDB Atlas for real-time live data
    let product: Product | null = null;
    try {
      const conn = await connectToDatabase();
      if (conn) {
        const doc = await ProductModel.findOne({ slug: params.slug }).lean();
        if (doc) {
          const { _id, __v, ...rest } = doc as any;
          product = { ...rest, id: rest.id || String(_id) } as Product;
        }
      }
    } catch (dbErr) {
      console.warn('MongoDB single product fetch error:', dbErr);
    }

    // 2. Fallback to in-memory/persisted store if MongoDB is offline or item not in DB
    if (!product) {
      product = getProductBySlug(params.slug);
    }

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
    const updates = await req.json();

    // 1. Update in-memory / JSON store
    let updated: Product | null = null;
    if (currentProduct) {
      updated = updateProduct(currentProduct.id, updates);
    } else {
      updated = updateProduct(params.slug, updates);
    }

    // 2. Persist directly to MongoDB Atlas
    try {
      const conn = await connectToDatabase();
      if (conn) {
        const { _id, ...cleanUpdates } = updates as any;
        const dbDoc = await ProductModel.findOneAndUpdate(
          { $or: [{ slug: params.slug }, { id: params.slug }, ...(currentProduct ? [{ id: currentProduct.id }] : [])] },
          cleanUpdates,
          { new: true, upsert: true }
        ).lean();

        if (dbDoc && !updated) {
          const { _id: docId, __v, ...rest } = dbDoc as any;
          updated = { ...rest, id: rest.id || String(docId) } as Product;
        }
      }
    } catch (dbErr) {
      console.warn('MongoDB update error:', dbErr);
    }

    // 3. Instantly invalidate Next.js caches across all storefront routes
    try {
      revalidatePath(`/product/${params.slug}`);
      revalidatePath('/shop');
      revalidatePath('/');
      revalidatePath('/admin/products');
      if (updates.categorySlug || currentProduct?.categorySlug) {
        revalidatePath(`/category/${updates.categorySlug || currentProduct?.categorySlug}`);
      }
    } catch (revalErr) {
      console.warn('Cache revalidation notice:', revalErr);
    }

    return NextResponse.json({ success: true, product: updated || updates });
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
    deleteProduct(params.slug);
    if (currentProduct && currentProduct.id !== params.slug) {
      deleteProduct(currentProduct.id);
    }

    // Persist deletion to MongoDB Atlas
    try {
      const conn = await connectToDatabase();
      if (conn) {
        await ProductModel.deleteMany({
          $or: [{ slug: params.slug }, { id: params.slug }, ...(currentProduct ? [{ id: currentProduct.id }] : [])],
        });
      }
    } catch (dbErr) {
      console.warn('MongoDB delete error:', dbErr);
    }

    // Invalidate Next.js cache
    try {
      revalidatePath(`/product/${params.slug}`);
      revalidatePath('/shop');
      revalidatePath('/');
      revalidatePath('/admin/products');
      if (currentProduct?.categorySlug) {
        revalidatePath(`/category/${currentProduct.categorySlug}`);
      }
    } catch (revalErr) {
      console.warn('Cache revalidation notice:', revalErr);
    }

    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
