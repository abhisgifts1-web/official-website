import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAllProducts, createProduct, syncStoreProducts } from '@/lib/store';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db/mongodb';
import { ProductModel } from '@/lib/db/models/Product';
import { Product } from '@/types';
import { filterProductsByCategory } from '@/lib/categoryRules';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;
    const orientation = searchParams.get('orientation') || undefined;
    const lighting = searchParams.get('lighting') || undefined;
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
    const sortBy = (searchParams.get('sortBy') as any) || undefined;
    const featured = searchParams.get('featured') === 'true' ? true : undefined;
    const bestseller = searchParams.get('bestseller') === 'true' ? true : undefined;
    const newArrival = searchParams.get('newArrival') === 'true' ? true : undefined;

    // 1. Fetch live products from MongoDB Atlas if available
    let products: Product[] = [];
    try {
      const conn = await connectToDatabase();
      if (conn) {
        const dbDocs = await ProductModel.find({}).sort({ createdAt: -1 }).lean();
        if (dbDocs && dbDocs.length > 0) {
          products = dbDocs.map((doc: any) => {
            const { _id, __v, ...p } = doc;
            return { ...p, id: p.id || String(_id) } as Product;
          });
          syncStoreProducts(products);
        }
      }
    } catch (dbErr) {
      console.warn('MongoDB products fetch error, falling back to cache:', dbErr);
    }

    // 2. Fallback to in-memory/JSON store if MongoDB returned 0 or failed
    if (!products || products.length === 0) {
      products = getAllProducts();
    }

    // 3. Apply filters
    let filtered = [...products];

    if (category) {
      filtered = filterProductsByCategory(filtered, category);
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.shortDescription?.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q)) ||
          (p.deity && p.deity.toLowerCase().includes(q))
      );
    }

    if (orientation) {
      filtered = filtered.filter((p) => p.orientation === orientation);
    }

    if (lighting) {
      if (lighting === 'led') {
        filtered = filtered.filter((p) => p.hasLedBacklight);
      } else if (lighting === 'none') {
        filtered = filtered.filter((p) => !p.hasLedBacklight);
      }
    }

    if (typeof minPrice === 'number') {
      filtered = filtered.filter((p) => p.basePrice >= minPrice);
    }

    if (typeof maxPrice === 'number') {
      filtered = filtered.filter((p) => p.basePrice <= maxPrice);
    }

    if (featured) {
      filtered = filtered.filter((p) => p.isFeatured);
    }

    if (bestseller) {
      filtered = filtered.filter((p) => p.isBestseller);
    }

    if (newArrival) {
      filtered = filtered.filter((p) => p.isNewArrival);
    }

    if (sortBy) {
      switch (sortBy) {
        case 'price-asc':
          filtered.sort((a, b) => a.basePrice - b.basePrice);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.basePrice - a.basePrice);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'bestseller':
          filtered.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
          break;
        case 'newest':
        default:
          filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
      }
    }

    return NextResponse.json({ success: true, count: filtered.length, products: filtered });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    if (!body.title || !body.slug || !body.categorySlug || !body.basePrice) {
      return NextResponse.json(
        { success: false, error: 'Title, slug, category, and base price are required' },
        { status: 400 }
      );
    }

    const newProduct = createProduct(body);

    // Save directly to MongoDB Atlas
    try {
      const conn = await connectToDatabase();
      if (conn) {
        const { _id, ...cleanProduct } = newProduct as any;
        await ProductModel.findOneAndUpdate({ slug: newProduct.slug }, cleanProduct, { upsert: true });
      }
    } catch (dbErr) {
      console.warn('MongoDB create product error:', dbErr);
    }

    // Invalidate Next.js cache
    try {
      revalidatePath('/shop');
      revalidatePath('/');
      revalidatePath('/admin/products');
      revalidatePath(`/category/${newProduct.categorySlug}`);
    } catch (revalErr) {
      console.warn('Cache revalidation notice:', revalErr);
    }

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
