import mongoose, { Schema, Document } from 'mongoose';
import { Category } from '@/types';

export interface CategoryDocument extends Omit<Category, 'id'>, Document {}

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    parentType: { type: String, enum: ['devotional', 'wall-art-styles', 'custom-frames'], required: true },
    itemCount: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    metaTitle: String,
    metaDescription: String,
  },
  { timestamps: true }
);

export const CategoryModel =
  mongoose.models.Category || mongoose.model<CategoryDocument>('Category', CategorySchema);
