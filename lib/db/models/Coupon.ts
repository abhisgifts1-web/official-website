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
    description: { type: String, required: true },
    expiresAt: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const CouponModel =
  mongoose.models.Coupon || mongoose.model<CouponDocument>('Coupon', CouponSchema);
