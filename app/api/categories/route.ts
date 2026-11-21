import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAllCategories, createCategory } from '@/lib/store';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db/mongodb';
import { CategoryModel } from '@/lib/db/models/Category';
import { Category } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let categories: Category[] = [];
    try {
      const conn = await connectToDatabase();
      if (conn) {
        const docs = await CategoryModel.find({}).lean();
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
