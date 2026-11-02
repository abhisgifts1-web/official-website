import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts, createProduct } from '@/lib/store';
import { getAuthenticatedAdmin } from '@/lib/auth';

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

    const products = getAllProducts({
      category,
      search,
      orientation,
      lighting,
      minPrice,
      maxPrice,
      sortBy,
      featured,
      bestseller,
      newArrival,
    });

    return NextResponse.json({ success: true, count: products.length, products });
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
    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
