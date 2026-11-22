'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Settings,
  Save,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  FileText,
  Tag,
  ToggleLeft,
  ToggleRight,
  Eye,
  EyeOff,
  Zap,
  Truck,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
  Loader2,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { SiteSettings, PromotionalOfferSettings } from '@/types';
import { INITIAL_SETTINGS, DEFAULT_PROMOTIONAL_OFFER } from '@/lib/data/settings';

const PRESET_BANNER_IMAGES = [
  {
    label: 'Custom LED Backlit Photo Frame',
    url: '/images/mockups/custom-led-backlit-acrylic-photo-frame/primary-square.jpg',
  },
  {
    label: 'Tirupati Balaji 3D LED Divine Wall Art',
    url: '/images/mockups/tirupati-balaji-divine-led-backlit-acrylic-wall-art/primary-square.jpg',
  },
  {
    label: 'Custom Couple Wedding Vows Keepsake',
    url: '/images/mockups/custom-couple-wedding-vows-acrylic-keepsake-frame/primary-square.jpg',
  },
  {
    label: 'Enchanted Liquid Gold Glitter Frame',
    url: '/images/mockups/enchanted-liquid-gold-glitter-acrylic-photo-frame/primary-square.jpg',
  },
  {
    label: 'Personalized Family Heirloom Gold Script',
    url: '/images/mockups/personalized-family-heirloom-gold-script-acrylic-frame/primary-square.jpg',
  },
];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [saving, setSaving] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/settings?t=${Date.now()}`, { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.settings) {
          setSettings({
            ...INITIAL_SETTINGS,
            ...d.settings,
            promotionalOffer: {
              ...DEFAULT_PROMOTIONAL_OFFER,
              ...(d.settings.promotionalOffer || {}),
            },
          });
        }
      })
      .catch(() => {});
  }, []);

  const offer: PromotionalOfferSettings =
    settings.promotionalOffer || DEFAULT_PROMOTIONAL_OFFER;

  const updateOffer = (updates: Partial<PromotionalOfferSettings>) => {
    setSettings((prev) => ({
      ...prev,
      promotionalOffer: {
        ...(prev.promotionalOffer || DEFAULT_PROMOTIONAL_OFFER),
        ...updates,
      },
    }));
  };

  // INSTANT AUTO-SAVE ON TOGGLE CLICK
  const handleToggleOffer = async () => {
    if (toggling) return;
    const nextActive = !offer.isActive;
    const updatedOffer: PromotionalOfferSettings = {
      ...offer,
      isActive: nextActive,
    };

    // 1. Optimistic UI update
    setSettings((prev) => ({
      ...prev,
      promotionalOffer: updatedOffer,
    }));

    // 2. Immediate persist to server
    setToggling(true);
    setErrorMessage(null);
    try {
      const payload: SiteSettings = {
        ...settings,
        promotionalOffer: updatedOffer,
      };

      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSavedMessage(
          nextActive
            ? '🟢 Offer banner is now LIVE on homepage!'
            : '⚪ Offer banner is now DISABLED & HIDDEN from homepage!'
        );
        setTimeout(() => setSavedMessage(null), 4000);
      } else {
        // Revert on failure
        setSettings((prev) => ({
          ...prev,
          promotionalOffer: { ...offer },
        }));
        setErrorMessage(data.error || 'Failed to update offer status. Please ensure you are logged in.');
      }
    } catch (err: any) {
      setSettings((prev) => ({
        ...prev,
        promotionalOffer: { ...offer },
      }));
      setErrorMessage('Network connection error: ' + (err.message || 'Could not reach server'));
    } finally {
      setToggling(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSavedMessage('Settings and Promotional Offer updated successfully!');
        setTimeout(() => setSavedMessage(null), 4000);
      } else {
        setErrorMessage(data.error || 'Failed to save settings. Please verify login credentials.');
      }
    } catch (err: any) {
      setErrorMessage('Network error: ' + (err.message || 'Could not connect'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6 text-stone-900 pb-12">
        {/* Header */}
        <div className="bg-white border border-stone-200 p-5 sm:p-6 rounded-3xl shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 font-bold text-[10px] tracking-wider uppercase flex items-center gap-1 shadow-2xs">
              <Sparkles className="w-3 h-3 text-amber-700" />
              Storefront Configurations
            </span>
          </div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
            Store Settings &amp; Promotional Offer Banner
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage your homepage promotional offer banner, announcement bar, WhatsApp hotline, and workshop details.
          </p>
        </div>

        {/* Global Alert Notification */}
        {savedMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2 shadow-xs animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{savedMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-xs font-semibold flex items-center gap-2 shadow-xs animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-xs text-stone-900">
          {/* ======================================================== */}
          {/* SECTION 1: HOMEPAGE PROMOTIONAL OFFER BANNER (SECTION 8) */}
          {/* ======================================================== */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-150 gap-4">
              <div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100/80 text-amber-900 border border-amber-300 text-[10px] font-bold tracking-wider uppercase mb-1">
                  <Tag className="w-3 h-3 text-amber-700" />
                  Homepage Section 8
                </span>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  Promotional Offer Banner Settings
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Click the toggle below to instantly enable or disable Section 8 on the homepage.
                </p>
              </div>

              {/* Master Offer Toggle with Instant Auto-Save */}
              <div className="flex items-center gap-3 shrink-0">
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 ${
                    offer.isActive
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-2xs'
                      : 'bg-stone-100 text-stone-600 border-stone-300'
                  }`}
                >
                  {toggling ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin text-amber-600" />
                      <span>Saving...</span>
                    </>
                  ) : offer.isActive ? (
                    '🟢 Live on Homepage'
                  ) : (
                    '⚪ Hidden on Homepage'
                  )}
                </span>

                <button
                  type="button"
                  onClick={handleToggleOffer}
                  disabled={toggling}
                  className="cursor-pointer transition-transform hover:scale-105 disabled:opacity-50"
                  title={offer.isActive ? 'Click to Disable & Hide from Homepage' : 'Click to Enable & Show on Homepage'}
                  aria-label="Toggle promotional banner on homepage"
                >
                  {offer.isActive ? (
                    <ToggleRight className="w-11 h-11 text-emerald-600" />
                  ) : (
                    <ToggleLeft className="w-11 h-11 text-stone-400 hover:text-stone-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Toggle Status Explanation Card */}
            <div
              className={`p-4 rounded-2xl border text-xs flex items-center justify-between transition-colors ${
                offer.isActive
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50/60 border-amber-200 text-amber-950'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {offer.isActive ? (
                  <Eye className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <EyeOff className="w-5 h-5 text-amber-700 shrink-0" />
                )}
                <div>
                  <p className="font-bold">
                    {offer.isActive
                      ? 'Banner is currently ACTIVE on the homepage.'
                      : 'Banner is currently DISABLED (Hidden).'}
                  </p>
                  <p className="text-[11px] opacity-80 mt-0.5">
                    {offer.isActive
                      ? 'Visitors can see Section 8 on the live website between New Arrivals and All Products.'
                      : 'Section 8 is completely hidden from the live website without any empty gaps.'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleToggleOffer}
                disabled={toggling}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs border transition-all cursor-pointer ${
                  offer.isActive
                    ? 'bg-white hover:bg-stone-50 text-stone-800 border-stone-300 shadow-2xs'
                    : 'bg-[#FEE815] hover:bg-[#FFF04B] text-black border-amber-300 shadow-xs'
                }`}
              >
                {toggling ? 'Saving...' : offer.isActive ? 'Disable Now' : 'Enable Now'}
              </button>
            </div>

            {/* Offer Form Fields */}
            <div className="space-y-4 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Offer Tag */}
                <div className="space-y-1">
                  <label className="font-semibold text-stone-700 block text-xs">
                    Offer Badge / Tag
                  </label>
                  <input
                    type="text"
                    value={offer.tag}
                    onChange={(e) => updateOffer({ tag: e.target.value })}
                    placeholder="e.g. Direct Hyderabad Workshop Special"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900"
                  />
                </div>

                {/* Discount Badge */}
                <div className="space-y-1">
                  <label className="font-semibold text-stone-700 block text-xs">
                    Discount Badge Text
                  </label>
                  <input
                    type="text"
                    value={offer.discountBadge}
                    onChange={(e) => updateOffer({ discountBadge: e.target.value })}
                    placeholder="e.g. 50% OFF or FESTIVE OFFER"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900 font-bold"
                  />
                </div>
              </div>

              {/* Offer Headline */}
              <div className="space-y-1">
                <label className="font-semibold text-stone-700 block text-xs">
                  Offer Headline / Title
                </label>
                <input
                  type="text"
                  value={offer.title}
                  onChange={(e) => updateOffer({ title: e.target.value })}
                  placeholder="e.g. Flat 50% OFF on Handcrafted Acrylic Photo Frames"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900 font-serif font-bold text-sm"
                />
              </div>

              {/* Highlighted Underline Text */}
              <div className="space-y-1">
                <label className="font-semibold text-stone-700 block text-xs">
                  Highlighted Word(s) in Title (Styled in Gold with Underline)
                </label>
                <input
                  type="text"
                  value={offer.highlightedText}
                  onChange={(e) => updateOffer({ highlightedText: e.target.value })}
                  placeholder="e.g. 50% OFF"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900 font-semibold text-amber-900"
                />
                <span className="text-[10px] text-stone-500 block">
                  The exact phrase inside the headline above that will receive the yellow highlighted styling.
                </span>
              </div>

              {/* Offer Description */}
              <div className="space-y-1">
                <label className="font-semibold text-stone-700 block text-xs">
                  Offer Description
                </label>
                <textarea
                  rows={3}
                  value={offer.description}
                  onChange={(e) => updateOffer({ description: e.target.value })}
                  placeholder="Describe your special promotion..."
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900 leading-relaxed font-sans"
                />
              </div>

              {/* Featured Product Details on Banner */}
              <div className="border border-stone-200 rounded-2xl p-4 bg-stone-50/60 space-y-3">
                <h4 className="font-bold text-stone-800 text-xs">
                  Featured Product Display on Banner
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 block mb-0.5">
                      Product Title
                    </label>
                    <input
                      type="text"
                      value={offer.productTitle}
                      onChange={(e) => updateOffer({ productTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 block mb-0.5">
                      Category Subtitle
                    </label>
                    <input
                      type="text"
                      value={offer.productCategory}
                      onChange={(e) => updateOffer({ productCategory: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 block mb-0.5">
                      Special Offer Price
                    </label>
                    <input
                      type="text"
                      value={offer.price}
                      onChange={(e) => updateOffer({ price: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 block mb-0.5">
                      Original MRP Price
                    </label>
                    <input
                      type="text"
                      value={offer.originalPrice}
                      onChange={(e) => updateOffer({ originalPrice: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900 line-through text-stone-500"
                    />
                  </div>
                </div>

                {/* Preset Banner Images Picker */}
                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    Featured Frame Image
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {PRESET_BANNER_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => updateOffer({ imageUrl: preset.url })}
                        className={`text-[10px] px-2.5 py-1 rounded-full border transition-all ${
                          offer.imageUrl === preset.url
                            ? 'bg-stone-900 text-white font-bold border-stone-900'
                            : 'bg-white text-stone-700 border-stone-300 hover:border-amber-400'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    value={offer.imageUrl}
                    onChange={(e) => updateOffer({ imageUrl: e.target.value })}
                    placeholder="/images/mockups/custom-led-backlit-acrylic-photo-frame/primary-square.jpg"
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Call-to-Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-semibold text-stone-700 block text-xs">
                    Button 1: Shop Button Text &amp; Link
                  </label>
                  <input
                    type="text"
                    value={offer.buttonText}
                    onChange={(e) => updateOffer({ buttonText: e.target.value })}
                    placeholder="Shop All Offers Now"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900"
                  />
                  <input
                    type="text"
                    value={offer.buttonLink}
                    onChange={(e) => updateOffer({ buttonLink: e.target.value })}
                    placeholder="/shop"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900 font-mono text-[11px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-semibold text-stone-700 block text-xs">
                    Button 2: WhatsApp CTA Text &amp; Message
                  </label>
                  <input
                    type="text"
                    value={offer.whatsappCtaText}
                    onChange={(e) => updateOffer({ whatsappCtaText: e.target.value })}
                    placeholder="Claim Offer on WhatsApp"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900"
                  />
                  <input
                    type="text"
                    value={offer.whatsappMessage}
                    onChange={(e) => updateOffer({ whatsappMessage: e.target.value })}
                    placeholder="Prefilled message when customer clicks WhatsApp button"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900 text-[11px]"
                  />
                </div>
              </div>

              {/* Live Preview Box */}
              <div className="border border-stone-300 rounded-2xl p-4 bg-stone-950 text-white space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-400 border-b border-stone-800 pb-2">
                  <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Live Banner Preview (How it looks on Homepage)
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      offer.isActive
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                        : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {offer.isActive ? 'Active on Homepage' : 'Disabled (Hidden)'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-1">
                  <div className="md:col-span-8 space-y-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#FEE815] bg-amber-400/20 border border-amber-400/30">
                      {offer.tag}
                    </span>
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-white leading-tight">
                      {offer.title}
                    </h3>
                    <p className="text-xs text-stone-300 line-clamp-2">{offer.description}</p>
                    <div className="flex items-center gap-2 pt-2">
                      <span className="px-4 py-2 rounded-full bg-[#FEE815] text-black font-bold text-xs">
                        {offer.buttonText}
                      </span>
                      <span className="px-3.5 py-2 rounded-full bg-white/10 text-white text-xs flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>{offer.whatsappCtaText}</span>
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-4 flex justify-center">
                    <div className="relative w-28 h-28 rounded-xl overflow-hidden border border-amber-400/40 bg-stone-900">
                      <Image
                        src={offer.imageUrl || '/images/mockups/custom-led-backlit-acrylic-photo-frame/primary-square.jpg'}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      <span className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-[#FEE815] text-stone-950 font-bold text-[9px]">
                        {offer.discountBadge}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SECTION 2: ANNOUNCEMENT BAR & GENERAL STORE SETTINGS     */}
          {/* ======================================================== */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <h3 className="font-serif font-bold text-lg text-stone-900 border-b border-stone-150 pb-3">
              Storefront Ticker &amp; Support Channels
            </h3>

            {/* Announcement Banner Text */}
            <div className="space-y-1.5">
              <label className="font-bold uppercase tracking-wider text-amber-900 text-[11px] block flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                Announcement Bar Notice Text
              </label>
              <input
                type="text"
                required
                value={settings.announcementText}
                onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900 font-medium"
              />
              <span className="text-[10px] text-stone-500 block">
                Displayed in the infinite marquee announcement bar across the top of all pages.
              </span>
            </div>

            {/* Contact Details */}
            <div className="border-t border-stone-100 pt-5 space-y-4">
              <h4 className="font-serif font-bold text-sm text-stone-900">
                Customer Support &amp; Direct Hotline
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    Customer Support Phone
                  </label>
                  <input
                    type="text"
                    value={settings.supportPhone}
                    onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    WhatsApp Business Hotline
                  </label>
                  <input
                    type="text"
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900 font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    Customer Support Email
                  </label>
                  <input
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    Business GST Number
                  </label>
                  <input
                    type="text"
                    value={settings.gstNumber || ''}
                    onChange={(e) => setSettings({ ...settings, gstNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none font-mono text-amber-900 font-bold"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    Instagram Profile URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.instagram.com/abhis_gifts_?cplk=MWtkNTJla2s3NTQw"
                    value={settings.instagramUrl || ''}
                    onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    YouTube Channel URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://youtube.com/@abhis_gifts?si=Ap98aZU7b21rJA_8"
                    value={settings.youtubeUrl || ''}
                    onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="border-t border-stone-100 pt-5 space-y-2">
              <label className="font-semibold text-stone-700 block">
                Registered Workshop &amp; Store Address
              </label>
              <input
                type="text"
                value={settings.businessAddress}
                onChange={(e) => setSettings({ ...settings, businessAddress: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900"
              />
            </div>
          </div>

          {/* Sticky Save Bar */}
          <div className="sticky bottom-6 z-20 bg-white p-4 rounded-2xl border border-stone-200 shadow-lg flex items-center justify-between">
            {savedMessage ? (
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {savedMessage}
              </span>
            ) : errorMessage ? (
              <span className="text-xs text-rose-700 font-semibold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-600" /> {errorMessage}
              </span>
            ) : (
              <span className="text-xs text-stone-500">
                Changes to the toggle are auto-saved instantly. Use the button to save text edits.
              </span>
            )}

            <button
              type="submit"
              disabled={saving}
              className="bg-[#FEE815] hover:bg-[#FFF04B] disabled:opacity-50 text-black font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving...' : 'Save Settings & Publish Offer'}</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
