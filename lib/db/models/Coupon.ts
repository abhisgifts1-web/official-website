import mongoose, { Schema, Document } from 'mongoose';
import { Coupon } from '@/types';

export interface CouponDocument extends Coupon, Document {}

const CouponSchema = new Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, index: true },
    discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
    discountValue: { type: Number, required: true },
    minOrderValue: { type: Number, default: 0 },
    maxDiscount: Number,
    description: { type: String, default: '' },
    startDate: { type: String },
    validFrom: { type: String },
    expiryDate: { type: String },
    expiresAt: { type: String, required: true },
    usageLimit: { type: Number, default: 0 },
    usageCount: { type: Number, default: 0 },
    perCustomerLimit: { type: Number, default: 1 },
    applicableProducts: [{ type: String }],
    usedBy: [
      {
        customer: String,
        orderId: String,
        date: String,
        discountAmount: Number,
      },
    ],
    totalDiscountGiven: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const CouponModel =
  mongoose.models.Coupon || mongoose.model<CouponDocument>('Coupon', CouponSchema);
