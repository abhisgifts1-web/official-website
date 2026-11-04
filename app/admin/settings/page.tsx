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
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-[#141414] border border-[#2D2D2D] p-5 sm:p-6 rounded-3xl">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#EAB308]/15 border border-[#EAB308]/40 text-[#FACC15] font-bold text-[10px] tracking-wider uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#EAB308]" />
              Storefront Configurations
            </span>
          </div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white">
            Studio Settings &amp; Configuration
          </h1>
          <p className="text-xs text-[#A1A1AA] mt-0.5">
            Manage customer support contact channels, announcement bar ticker, studio address, and fiscal tax details.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#141414] p-6 sm:p-8 rounded-3xl border border-[#2D2D2D] shadow-sm space-y-6 text-xs text-white">
          {/* Announcement Banner Text */}
          <div className="space-y-1.5">
            <label className="font-bold uppercase tracking-wider text-[#FACC15] text-[11px] block flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#EAB308]" />
              Announcement Bar Notice Text
            </label>
            <input
              type="text"
              required
              value={settings.announcementText}
              onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl outline-none focus:border-[#EAB308] text-white font-medium"
            />
            <span className="text-[10px] text-[#A1A1AA] block">
              Displayed in the infinite marquee announcement bar across the top of all pages.
            </span>
          </div>

          {/* Contact Details */}
          <div className="border-t border-[#262626] pt-5 space-y-4">
            <h4 className="font-serif font-bold text-sm text-white">Customer Support &amp; Studio Hotline</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-[#D1D5DB] block mb-1">Customer Support Phone</label>
                <input
                  type="text"
                  value={settings.supportPhone}
                  onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                  className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl outline-none focus:border-[#EAB308] text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-[#D1D5DB] block mb-1">WhatsApp Business Hotline</label>
                <input
                  type="text"
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl outline-none focus:border-[#EAB308] text-white font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-[#D1D5DB] block mb-1">Customer Support Email</label>
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                  className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl outline-none focus:border-[#EAB308] text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-[#D1D5DB] block mb-1">Business GST Number</label>
                <input
                  type="text"
                  value={settings.gstNumber || ''}
                  onChange={(e) => setSettings({ ...settings, gstNumber: e.target.value })}
                  className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl outline-none font-mono text-[#FACC15]"
                />
              </div>
            </div>
          </div>

          {/* Delivery Configuration */}
          <div className="border-t border-[#262626] pt-5 space-y-3">
            <h4 className="font-serif font-bold text-sm text-white">Storewide Delivery Policy</h4>
            <div className="bg-[#1A1A1A] border border-[#2D2D2D] p-4 rounded-2xl flex items-center justify-between">
              <div>
                <p className="font-bold text-white text-xs">Standard Storewide Delivery Rate</p>
                <p className="text-[11px] text-[#A1A1AA] mt-0.5">
                  ₹0 Delivery Fee active on all products across India. Pricing shown on artwork cards is fully inclusive.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold text-xs">
                Active (₹0 Fee)
              </span>
            </div>
          </div>

          {/* Address */}
          <div className="border-t border-[#262626] pt-5 space-y-2">
            <label className="font-semibold text-[#D1D5DB] block">Registered Workshop &amp; Studio Address</label>
            <input
              type="text"
              value={settings.businessAddress}
              onChange={(e) => setSettings({ ...settings, businessAddress: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl outline-none focus:border-[#EAB308] text-white"
            />
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-[#262626]">
            {saved ? (
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Settings updated successfully!
              </span>
            ) : (
              <span />
            )}

            <button
              type="submit"
              disabled={saving}
              className="bg-[#EAB308] hover:bg-[#FACC15] disabled:opacity-50 text-black font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-[0_2px_12px_rgba(234,179,8,0.25)] flex items-center gap-1.5 transition-all cursor-pointer"
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
