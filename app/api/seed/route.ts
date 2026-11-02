import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { ProductModel } from '@/lib/db/models/Product';
import { CategoryModel } from '@/lib/db/models/Category';
import { OrderModel } from '@/lib/db/models/Order';
import { CouponModel } from '@/lib/db/models/Coupon';
import { UserModel } from '@/lib/db/models/User';
import { INITIAL_PRODUCTS } from '@/lib/data/mockProducts';
import { INITIAL_CATEGORIES } from '@/lib/data/categories';
import { INITIAL_ORDERS } from '@/lib/data/mockOrders';
import { INITIAL_COUPONS } from '@/lib/data/coupons';
import { DEFAULT_ADMIN } from '@/lib/auth';

export async function POST() {
  try {
    const conn = await connectToDatabase();

    if (!conn) {
      return NextResponse.json({
        success: true,
        message: 'Running in resilient in-memory store mode. All seed data is active and loaded!',
      });
    }

    // If MongoDB is connected, populate collections
    await ProductModel.deleteMany({});
    await CategoryModel.deleteMany({});
    await OrderModel.deleteMany({});
    await CouponModel.deleteMany({});
    await UserModel.deleteMany({});

    await ProductModel.insertMany(INITIAL_PRODUCTS);
    await CategoryModel.insertMany(INITIAL_CATEGORIES);
    await OrderModel.insertMany(INITIAL_ORDERS.map((o) => ({ ...o, orderId: o.id })));
    await CouponModel.insertMany(INITIAL_COUPONS);
    await UserModel.create({
      email: DEFAULT_ADMIN.email,
      passwordHash: DEFAULT_ADMIN.passwordHash,
      name: DEFAULT_ADMIN.name,
      role: DEFAULT_ADMIN.role,
    });

    return NextResponse.json({
      success: true,
      message: 'MongoDB Atlas successfully seeded with Abhi Gifts catalog and admin account!',
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET() {
  return POST();
}
