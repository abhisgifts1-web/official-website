import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAllCategories, createCategory } from '@/lib/store';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db/mongodb';
import { CategoryModel } from '@/lib/db/models/Category';
import { Category } from '@/types';
import { INITIAL_CATEGORIES } from '@/lib/data/categories';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let categories: Category[] = [];
    const officialSlugs = INITIAL_CATEGORIES.map((c) => c.slug);
    const slugOrder = new Map(INITIAL_CATEGORIES.map((c, i) => [c.slug, i]));

    try {
      const conn = await connectToDatabase();
      if (conn) {
        // Lazy seed official categories only if database collection is empty
        try {
          const count = await CategoryModel.countDocuments();
          if (count === 0) {
            for (const cat of INITIAL_CATEGORIES) {
              const { id, ...data } = cat;
              await CategoryModel.findOneAndUpdate(
                { slug: cat.slug },
                { ...data, id: id || cat.id },
                { upsert: true }
              );
            }
          }
        } catch (syncErr) {
          console.warn('MongoDB category sync warning:', syncErr);
        }

        const docs = await CategoryModel.find({ slug: { $in: officialSlugs } }).lean();
        if (docs && docs.length > 0) {
          categories = docs.map((doc: any) => {
            const { _id, __v, ...c } = doc;
            return { ...c, id: c.id || String(_id) } as Category;
          });
        }
      }
    } catch (dbErr) {
      console.warn('MongoDB categories fetch notice:', dbErr);
    }

    if (!categories || categories.length === 0) {
      categories = getAllCategories();
    }

    // STRICTLY filter and order to the exact 8 official categories in the live website
    categories = categories
      .filter((c) => officialSlugs.includes(c.slug))
      .sort((a, b) => (slugOrder.get(a.slug) ?? 99) - (slugOrder.get(b.slug) ?? 99));

    // Fallback to INITIAL_CATEGORIES if incomplete
    if (categories.length < officialSlugs.length) {
      categories = [...INITIAL_CATEGORIES];
    }

    return NextResponse.json({ success: true, categories });
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
    if (!body.name || !body.slug) {
      return NextResponse.json({ success: false, error: 'Name and slug are required' }, { status: 400 });
    }

    const newCat = createCategory(body);

    try {
      const conn = await connectToDatabase();
      if (conn) {
        const { _id, ...cleanCat } = newCat as any;
        await CategoryModel.findOneAndUpdate({ slug: newCat.slug }, cleanCat, { upsert: true });
      }
    } catch (dbErr) {
      console.warn('MongoDB category save warning:', dbErr);
    }

    try {
      revalidatePath('/');
      revalidatePath('/shop');
      revalidatePath(`/category/${newCat.slug}`);
    } catch (revalErr) {}

    return NextResponse.json({ success: true, category: newCat }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
