import { NextRequest, NextResponse } from 'next/server';
import { getOrderById, updateOrderStatus, deleteOrder } from '@/lib/store';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db/mongodb';
import { OrderModel } from '@/lib/db/models/Order';
import { Order } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Check MongoDB Atlas first
    let order: Order | null = null;
    try {
      const conn = await connectToDatabase();
      if (conn) {
        const doc = await OrderModel.findOne({
          $or: [{ orderId: params.id }, { id: params.id }],
        }).lean();
        if (doc) {
          const { _id, __v, ...rest } = doc as any;
          order = { ...rest, id: rest.orderId || rest.id || String(_id) } as Order;
        }
      }
    } catch (dbErr) {
      console.warn('MongoDB single order fetch error:', dbErr);
    }

    if (!order) {
      order = getOrderById(params.id);
    }

    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    const admin = await getAuthenticatedAdmin();
    if (admin) {
      return NextResponse.json({ success: true, order });
    }

    // Public / customer lookup: sanitize sensitive customer address & phone numbers
    const rawMobile = order.customer?.mobile || '';
    const maskedMobile = rawMobile.length >= 4 ? `******${rawMobile.slice(-4)}` : '******';
    const sanitizedOrder = {
      ...order,
      customer: {
        fullName: order.customer?.fullName ? `${order.customer.fullName.split(' ')[0]} ***` : 'Customer',
        mobile: maskedMobile,
        email: order.customer?.email ? `${order.customer.email.slice(0, 2)}***@***` : '',
        streetAddress: 'Protected Customer Address',
        city: order.customer?.city || 'Hyderabad',
        state: order.customer?.state || 'Telangana',
        pincode: order.customer?.pincode ? `***${order.customer.pincode.slice(-3)}` : '******',
      },
    };

    return NextResponse.json({ success: true, order: sanitizedOrder });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { orderStatus, trackingNumber, courierPartner, paymentStatus } = body;

    // 1. Update in-memory store
    const updated = updateOrderStatus(params.id, orderStatus, trackingNumber, courierPartner);

    // 2. Persist directly to MongoDB Atlas
    let dbUpdated = null;
    try {
      const conn = await connectToDatabase();
      if (conn) {
        const updateFields: any = {};
        if (orderStatus) updateFields.orderStatus = orderStatus;
        if (trackingNumber !== undefined) updateFields.trackingNumber = trackingNumber;
        if (courierPartner !== undefined) updateFields.courierPartner = courierPartner;
        if (paymentStatus) updateFields.paymentStatus = paymentStatus;

        const doc = await OrderModel.findOneAndUpdate(
          { $or: [{ id: params.id }, { orderId: params.id }] },
          { $set: updateFields },
          { new: true }
        ).lean();

        if (doc) {
          const { _id, __v, ...rest } = doc as any;
          dbUpdated = { ...rest, id: rest.orderId || rest.id || String(_id) } as Order;
        }
      }
    } catch (dbErr) {
      console.warn('MongoDB order update error:', dbErr);
    }

    const finalOrder = dbUpdated || updated;
    if (!finalOrder) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, order: finalOrder });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const orderId = params.id;
    if (!orderId) {
      return NextResponse.json({ success: false, error: 'Order ID is required' }, { status: 400 });
    }

    // 1. Permanently delete from MongoDB Atlas
    try {
      const conn = await connectToDatabase();
      if (conn) {
        await OrderModel.deleteMany({
          $or: [{ orderId }, { id: orderId }]
        });
        if (conn.connection?.db) {
          await conn.connection.db.collection('orders').deleteMany({
            $or: [{ orderId }, { id: orderId }]
          });
        }
      }
    } catch (dbErr) {
      console.warn('MongoDB order delete notice:', dbErr);
    }

    // 2. Permanently delete from store and record in deleted blacklist
    deleteOrder(orderId);

    return NextResponse.json({
      success: true,
      message: `Order #${orderId} permanently deleted.`,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
