'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, Sparkles, MapPin, Phone, Mail, FileText } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { SiteSettings } from '@/types';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setSettings(d.settings);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6 text-stone-900">
        {/* Header */}
        <div className="bg-white border border-stone-200 p-5 sm:p-6 rounded-3xl shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 font-bold text-[10px] tracking-wider uppercase flex items-center gap-1 shadow-2xs">
              <Sparkles className="w-3 h-3 text-amber-700" />
              Storefront Configurations
            </span>
          </div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
            Store Settings &amp; Configuration
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage customer support contact channels, announcement bar ticker, workshop address, and fiscal tax details.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6 text-xs text-stone-900">
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
            <h4 className="font-serif font-bold text-sm text-stone-900">Customer Support &amp; Direct Hotline</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Customer Support Phone</label>
                <input
                  type="text"
                  value={settings.supportPhone}
                  onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">WhatsApp Business Hotline</label>
                <input
                  type="text"
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900 font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Customer Support Email</label>
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Business GST Number</label>
                <input
                  type="text"
                  value={settings.gstNumber || ''}
                  onChange={(e) => setSettings({ ...settings, gstNumber: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none font-mono text-amber-900 font-bold"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Instagram Profile URL</label>
                <input
                  type="url"
                  placeholder="https://www.instagram.com/abhis_gifts_?cplk=MWtkNTJla2s3NTQw"
                  value={settings.instagramUrl || ''}
                  onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">YouTube Channel URL</label>
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

          {/* Delivery Configuration */}
          <div className="border-t border-stone-100 pt-5 space-y-3">
            <h4 className="font-serif font-bold text-sm text-stone-900">Storewide Delivery Policy</h4>
            <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <p className="font-bold text-stone-900 text-xs">Standard Storewide Delivery Rate</p>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  ₹0 Delivery Fee active on all products across India. Pricing shown on artwork cards is fully inclusive.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold text-xs shadow-2xs">
                Active (₹0 Fee)
              </span>
            </div>
          </div>

          {/* Address */}
          <div className="border-t border-stone-100 pt-5 space-y-2">
            <label className="font-semibold text-stone-700 block">Registered Workshop &amp; Store Address</label>
            <input
              type="text"
              value={settings.businessAddress}
              onChange={(e) => setSettings({ ...settings, businessAddress: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900"
            />
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-stone-100">
            {saved ? (
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Settings updated successfully!
              </span>
            ) : (
              <span />
            )}

            <button
              type="submit"
              disabled={saving}
              className="bg-[#EAB308] hover:bg-[#FACC15] disabled:opacity-50 text-black font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving...' : 'Save Settings'}</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
