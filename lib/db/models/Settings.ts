import mongoose, { Schema, Document } from 'mongoose';
import { SiteSettings } from '@/types';

export interface ISettingsDoc extends Document, SiteSettings {
  settingKey: string;
}

const SettingsSchema = new Schema(
  {
    settingKey: { type: String, required: true, unique: true, default: 'global_site_settings' },
    storeName: { type: String, default: "Abhi's Gifts" },
    tagline: { type: String, default: 'Frame Your Memories • Handcrafted in Hyderabad' },
    supportPhone: { type: String, default: '+91 91219 97791' },
    supportEmail: { type: String, default: 'support@abhigifts.com' },
    whatsappNumber: { type: String, default: '+91 91219 97791' },
    workingHours: { type: String, default: 'Mon - Sun: 10:00 AM - 9:00 PM' },
    announcementText: { type: String, default: '✨ Premium Acrylic Wall Art & LED Backlit Photo Frames • Free Express Delivery in Hyderabad & All India' },
    freeShippingThreshold: { type: Number, default: 0 },
    defaultShippingFee: { type: Number, default: 0 },
    codAvailable: { type: Boolean, default: false },
    codFee: { type: Number, default: 0 },
    businessAddress: { type: String, default: 'Dilsukhnagar, Hyderabad, Telangana - 500060, India' },
    googleMapsUrl: { type: String, default: 'https://maps.app.goo.gl/fmGv35KsGabFna9E6?g_st=ac' },
    gstNumber: { type: String, default: '36ABCDE1234F1Z5' },
    instagramUrl: { type: String, default: 'https://www.instagram.com/abhis_gifts_?cplk=MWtkNTJla2s3NTQw' },
    youtubeUrl: { type: String, default: 'https://youtube.com/@abhis_gifts?si=Ap98aZU7b21rJA_8' },
    promotionalOffer: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export const SettingsModel =
  mongoose.models.Settings || mongoose.model<ISettingsDoc>('Settings', SettingsSchema);
