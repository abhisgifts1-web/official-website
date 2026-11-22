import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db/mongodb';
import { OrderModel } from '@/lib/db/models/Order';
import { getAllOrders, resetCustomerActivity, deleteCustomerData } from '@/lib/store';
import { CouponModel } from '@/lib/db/models/Coupon';
import { Order } from '@/types';

export const dynamic = 'force-dynamic';

export interface CustomerAggregated {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  streetAddress: string;
  apartment?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  orderCount: number;
  totalSpent: number;
  averageOrderValue: number;
  firstOrderDate: string;
  lastOrderDate: string;
  lastOrderId: string;
  lastOrderStatus: string;
  customerTier: 'VIP' | 'Repeat' | 'New';
  orders: Order[];
}

export async function GET(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin();
    // Allow admin access
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search')?.toLowerCase() || '';
    const tier = searchParams.get('tier') || '';

    // 1. Gather all orders from MongoDB Atlas and fallback store
    let allOrders: Order[] = [];
    try {
      const conn = await connectToDatabase();
      if (conn) {
        const dbOrders = await OrderModel.find({}).sort({ createdAt: -1 }).lean();
        if (dbOrders && dbOrders.length > 0) {
          allOrders = dbOrders.map((doc: any) => {
            const { _id, __v, ...o } = doc;
            return { ...o, id: o.orderId || o.id || String(_id) } as Order;
          });
        }
      }
    } catch (dbErr) {
      console.warn('MongoDB orders fetch notice in customers API:', dbErr);
    }

    // Merge with in-memory store orders (avoid duplicates)
    const storeOrders = getAllOrders();
    const orderIdSet = new Set(allOrders.map((o) => o.id));
    storeOrders.forEach((so) => {
      if (!orderIdSet.has(so.id)) {
        allOrders.push(so);
      }
    });

    // 2. Aggregate customers by normalized phone number (fallback to email)
    const customerMap = new Map<string, CustomerAggregated>();

    allOrders.forEach((order) => {
      if (!order.customer) return;

      const rawPhone = (order.customer.mobile || '').trim();
      const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
      const key = cleanPhone || (order.customer.email || '').trim().toLowerCase();
      if (!key) return;

      const orderAmount = Number(order.totalAmount) || 0;
      const orderDate = order.createdAt || new Date().toISOString();

      if (!customerMap.has(key)) {
        customerMap.set(key, {
          id: `cust-${cleanPhone || Math.random().toString(36).substring(2, 9)}`,
          fullName: order.customer.fullName || 'Valued Customer',
          mobile: order.customer.mobile || '',
          email: order.customer.email || '',
          streetAddress: order.customer.streetAddress || '',
          apartment: order.customer.apartment || '',
          landmark: order.customer.landmark || '',
          city: order.customer.city || '',
          state: order.customer.state || '',
          pincode: order.customer.pincode || '',
          orderCount: 1,
          totalSpent: orderAmount,
          averageOrderValue: orderAmount,
          firstOrderDate: orderDate,
          lastOrderDate: orderDate,
          lastOrderId: order.id,
          lastOrderStatus: order.orderStatus || 'Confirmed',
          customerTier: 'New',
          orders: [order],
        });
      } else {
        const existing = customerMap.get(key)!;
        existing.orderCount += 1;
        existing.totalSpent += orderAmount;
        existing.orders.push(order);

        // Keep earliest order date
        if (new Date(orderDate) < new Date(existing.firstOrderDate)) {
          existing.firstOrderDate = orderDate;
        }

        // Keep latest order info and most recent delivery address
        if (new Date(orderDate) >= new Date(existing.lastOrderDate)) {
          existing.lastOrderDate = orderDate;
          existing.lastOrderId = order.id;
          existing.lastOrderStatus = order.orderStatus || existing.lastOrderStatus;
          if (order.customer.fullName) existing.fullName = order.customer.fullName;
          if (order.customer.email) existing.email = order.customer.email;
          if (order.customer.streetAddress) existing.streetAddress = order.customer.streetAddress;
          if (order.customer.apartment) existing.apartment = order.customer.apartment;
          if (order.customer.landmark) existing.landmark = order.customer.landmark;
          if (order.customer.city) existing.city = order.customer.city;
          if (order.customer.state) existing.state = order.customer.state;
          if (order.customer.pincode) existing.pincode = order.customer.pincode;
        }
      }
    });

    // 3. Compute tier, AOV, and sort customer orders
    let customerList = Array.from(customerMap.values()).map((c) => {
      c.averageOrderValue = Math.round(c.totalSpent / (c.orderCount || 1));
      c.customerTier =
        c.totalSpent >= 5000 || c.orderCount >= 3
          ? 'VIP'
          : c.orderCount >= 2
          ? 'Repeat'
          : 'New';
      c.orders.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      return c;
    });

    // Sort by most recent activity
    customerList.sort(
      (a, b) => new Date(b.lastOrderDate).getTime() - new Date(a.lastOrderDate).getTime()
    );

    // Apply filters
    if (tier && (tier === 'VIP' || tier === 'Repeat' || tier === 'New')) {
      customerList = customerList.filter((c) => c.customerTier === tier);
    }

    if (search) {
      customerList = customerList.filter(
        (c) =>
          c.fullName.toLowerCase().includes(search) ||
          c.mobile.includes(search) ||
          c.email.toLowerCase().includes(search) ||
          c.city.toLowerCase().includes(search) ||
          c.state.toLowerCase().includes(search) ||
          c.pincode.includes(search) ||
          c.lastOrderId.toLowerCase().includes(search)
      );
    }

    const totalSpentAll = customerList.reduce((acc, c) => acc + c.totalSpent, 0);
    const repeatCount = customerList.filter((c) => c.orderCount > 1).length;

    return NextResponse.json({
      success: true,
      count: customerList.length,
      repeatCount,
      totalSpentAll,
      customers: customerList,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const mobile = searchParams.get('mobile');
    const email = searchParams.get('email');

    // Individual customer deletion
    if (mobile || email) {
      const cleanMobile = (mobile || '').replace(/[^0-9]/g, '');
      const cleanEmail = (email || '').trim().toLowerCase();

      try {
        const conn = await connectToDatabase();
        if (conn) {
          const orConditions: any[] = [];
          if (cleanMobile) {
            const tenDigits = cleanMobile.slice(-10);
            orConditions.push({ 'customer.mobile': new RegExp(tenDigits, 'i') });
          }
          if (cleanEmail) {
            orConditions.push({ 'customer.email': cleanEmail });
          }
          if (orConditions.length > 0) {
            await OrderModel.deleteMany({ $or: orConditions });
          }
        }
      } catch (dbErr) {
        console.warn('MongoDB delete customer notice:', dbErr);
      }

      const deletedCount = deleteCustomerData(mobile || '', email || '');

      return NextResponse.json({
        success: true,
        message: `Customer data deleted successfully (${deletedCount} orders removed).`,
      });
    }

    // Reset all customers
    try {
      const conn = await connectToDatabase();
      if (conn) {
        await OrderModel.deleteMany({});
        await CouponModel.updateMany({}, { $set: { usageCount: 0, totalDiscountGiven: 0, usedBy: [] } });
        if (conn.connection?.db) {
          try {
            await conn.connection.db.collection('customphotos').deleteMany({});
          } catch (e) {}
        }
      }
    } catch (dbErr) {
      console.warn('MongoDB customer reset notice:', dbErr);
    }

    resetCustomerActivity();

    return NextResponse.json({
      success: true,
      message: 'All customer activity, orders, and test histories have been reset successfully.',
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get('action') === 'reset' || req.headers.get('x-admin-action') === 'reset') {
    return DELETE(req);
  }
  return DELETE(req);
}
