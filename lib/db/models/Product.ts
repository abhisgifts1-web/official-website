import mongoose, { Schema, Document } from 'mongoose';
import { Product } from '@/types';

export interface ProductDocument extends Omit<Product, 'id'>, Document {}

const VariantSchema = new Schema({
  id: { type: String, required: true },
  size: { type: String, required: true },
  dimensionsCm: { type: String, required: true },
  finish: { type: String, required: true },
  lighting: { type: String, required: true },
  price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  sku: { type: String, required: true },
  inStock: { type: Boolean, default: true },
  stockCount: { type: Number, default: 20 },
});

const ReviewSchema = new Schema({
  id: { type: String, required: true },
  authorName: { type: String, required: true },
  city: { type: String, default: 'India' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: { type: String, required: true },
  verifiedBuyer: { type: Boolean, default: true },
  likes: { type: Number, default: 0 },
});

const ProductSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    categorySlug: { type: String, required: true, index: true },
    categoryName: { type: String, required: true },
    deity: { type: String },
    artStyle: { type: String, required: true },
    orientation: { type: String, enum: ['vertical', 'horizontal', 'square', 'round'], required: true },
    images: [{ type: String }],
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    hasLedBacklight: { type: Boolean, default: false },
    basePrice: { type: Number, required: true },
    baseMrp: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    variants: [VariantSchema],
    orientationVariants: {
      portrait: [VariantSchema],
      landscape: [VariantSchema],
      square: [VariantSchema],
      round: [VariantSchema],
    },
    specifications: [{ label: String, value: String }],
    materialAndCare: [{ type: String }],
    shippingHighlights: [{ type: String }],
    reviews: [ReviewSchema],
  },
  { timestamps: true }
);

export const ProductModel =
  mongoose.models.Product || mongoose.model<ProductDocument>('Product', ProductSchema);
