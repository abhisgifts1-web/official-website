import mongoose, { Schema, Document } from 'mongoose';
import { Order } from '@/types';

export interface OrderDocument extends Omit<Order, 'id'>, Document {
  orderId: string;
}

const CartItemSchema = new Schema({
  id: String,
  productId: String,
  slug: String,
  title: String,
  image: String,
  variantId: String,
  size: String,
  finish: String,
  lighting: String,
  unitPrice: Number,
  unitMrp: Number,
  quantity: Number,
  customization: {
    previewUrl: String,
    customText: String,
    frameType: String,
    orientation: String,
    aspectRatio: String,
    specialInstructions: String,
  },
});

const ShippingAddressSchema = new Schema({
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  streetAddress: { type: String, required: true },
  apartment: String,
  landmark: String,
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
});

const OrderSchema = new Schema(
  {
    orderId: { type: String, required: true, unique: true, index: true },
    customer: { type: ShippingAddressSchema, required: true },
    items: [CartItemSchema],
    subtotal: { type: Number, required: true },
    discountAmount: { type: Number, default: 0 },
    couponCode: String,
    shippingFee: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['WhatsApp', 'Razorpay', 'COD'], required: true },
    paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed', 'Refunded'], default: 'Pending' },
    razorpayPaymentId: String,
    razorpayOrderId: String,
    orderStatus: {
      type: String,
      enum: [
        'Pending',
        'Confirmed',
        'Framing & Production',
        'Quality Checked',
        'Shipped',
        'Out for Delivery',
        'Delivered',
        'Cancelled',
      ],
      default: 'Confirmed',
    },
    trackingNumber: String,
    courierPartner: String,
    notes: String,
  },
  { timestamps: true }
);

export const OrderModel =
  mongoose.models.Order || mongoose.model<OrderDocument>('Order', OrderSchema);
