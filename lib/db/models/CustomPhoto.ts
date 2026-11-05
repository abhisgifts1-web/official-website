import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomPhoto extends Document {
  filename: string;
  mimeType: string;
  data: string; // base64 payload
  size: number;
  cdnUrl?: string;
  createdAt: Date;
}

const CustomPhotoSchema = new Schema<ICustomPhoto>({
  filename: { type: String, required: true, index: true },
  mimeType: { type: String, required: true, default: 'image/jpeg' },
  data: { type: String, required: true },
  size: { type: Number, required: true },
  cdnUrl: { type: String },
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 60 }, // Retain for 60 days
});

export default (mongoose.models.CustomPhoto as mongoose.Model<ICustomPhoto>) ||
  mongoose.model<ICustomPhoto>('CustomPhoto', CustomPhotoSchema);
