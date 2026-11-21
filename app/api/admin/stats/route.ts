import { NextResponse } from 'next/server';
import { getDashboardStats } from '@/lib/store';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db/mongodb';
import { OrderModel } from '@/lib/db/models/Order';
import { ProductModel } from '@/lib/db/models/Product';
import { Order, Product } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // 1. Try computing live stats from MongoDB Atlas
    try {
      const conn = await connectToDatabase();
      if (conn) {
        const [dbOrders, dbProducts] = await Promise.all([
          OrderModel.find({}).sort({ createdAt: -1 }).lean(),
          ProductModel.find({}).lean(),
        ]);

        if (dbOrders && dbOrders.length > 0) {
          const formattedOrders: Order[] = dbOrders.map((doc: any) => {
            const { _id, __v, ...o } = doc;
            return { ...o, id: o.orderId || o.id || String(_id) } as Order;
          });

          const totalRevenue = formattedOrders
            .filter((o) => o.paymentStatus === 'Paid' || o.orderStatus === 'Delivered')
            .reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);

          const totalOrders = formattedOrders.length;
          const pendingOrders = formattedOrders.filter(
            (o) =>
              o.orderStatus === 'Pending' ||
              o.orderStatus === 'Confirmed' ||
              o.orderStatus === 'Framing & Production'
          ).length;
          const deliveredOrders = formattedOrders.filter((o) => o.orderStatus === 'Delivered').length;

          let lowStockCount = 0;
          (dbProducts || []).forEach((p: any) => {
            const variants = p.variants || [];
            if (variants.some((v: any) => v.stockCount <= 5)) lowStockCount++;
          });

          return NextResponse.json({
            success: true,
            stats: {
              totalRevenue,
              totalOrders,
              pendingOrders,
              deliveredOrders,
              lowStockCount,
              totalProducts: dbProducts?.length || 0,
              recentOrders: formattedOrders.slice(0, 5),
            },
          });
        }
      }
    } catch (dbErr) {
      console.warn('MongoDB stats calculation warning, using fallback:', dbErr);
    }

    // 2. Fallback to in-memory stats
    const stats = getDashboardStats();
    return NextResponse.json({ success: true, stats });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
