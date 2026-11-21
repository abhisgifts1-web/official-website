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

          // Compute customer metrics
          const customerMap = new Map<string, any>();
          formattedOrders.forEach((o) => {
            const rawPhone = (o.customer?.mobile || '').trim();
            const phone = rawPhone.replace(/[^0-9]/g, '') || (o.customer?.email || '').trim().toLowerCase();
            if (!phone) return;

            if (!customerMap.has(phone)) {
              customerMap.set(phone, {
                fullName: o.customer.fullName || 'Valued Client',
                mobile: o.customer.mobile || '',
                email: o.customer.email || '',
                city: o.customer.city || '',
                state: o.customer.state || '',
                totalOrders: 1,
                totalSpent: Number(o.totalAmount) || 0,
                lastOrderDate: o.createdAt || new Date().toISOString(),
                lastOrderId: o.id,
                lastOrderStatus: o.orderStatus || 'Confirmed',
              });
            } else {
              const existing = customerMap.get(phone);
              existing.totalOrders += 1;
              existing.totalSpent += Number(o.totalAmount) || 0;
              const oDate = o.createdAt || new Date().toISOString();
              if (new Date(oDate) > new Date(existing.lastOrderDate)) {
                existing.lastOrderDate = oDate;
                existing.lastOrderId = o.id;
                existing.lastOrderStatus = o.orderStatus || existing.lastOrderStatus;
                if (o.customer.fullName) existing.fullName = o.customer.fullName;
                if (o.customer.city) existing.city = o.customer.city;
                if (o.customer.state) existing.state = o.customer.state;
              }
            }
          });

          const totalCustomers = customerMap.size;
          const repeatCustomers = Array.from(customerMap.values()).filter((c) => c.totalOrders > 1).length;
          const recentCustomers = Array.from(customerMap.values())
            .sort((a, b) => new Date(b.lastOrderDate).getTime() - new Date(a.lastOrderDate).getTime())
            .slice(0, 5);

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
              totalCustomers,
              repeatCustomers,
              recentCustomers,
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
