'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2 } from 'lucide-react';
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
      <div className="max-w-3xl space-y-6">
        <div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
            Store Settings & Configuration
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage contact channels, announcement bar notices, delivery rules, and tax information.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6 text-xs">
          {/* Announcement Banner Text */}
          <div className="space-y-1">
            <label className="font-bold uppercase tracking-wider text-amber-900 block">
              Announcement Bar Notice Text
            </label>
            <input
              type="text"
              required
              value={settings.announcementText}
              onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-700 font-medium"
            />
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-stone-700 block mb-1">Customer Support Phone</label>
              <input
                type="text"
                value={settings.supportPhone}
                onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">WhatsApp Hotline Number</label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">Customer Support Email</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">Business GST Number</label>
              <input
                type="text"
                value={settings.gstNumber || ''}
                onChange={(e) => setSettings({ ...settings, gstNumber: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none font-mono"
              />
            </div>
          </div>

          {/* Shipping Configuration */}
          <div className="border-t pt-4 space-y-4">
            <h4 className="font-serif font-bold text-sm text-stone-900">Delivery Rules & Rates</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Free Delivery Threshold (₹)</label>
                <input
                  type="number"
                  value={settings.freeShippingThreshold}
                  onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none font-bold"
                />
                <span className="text-[10px] text-stone-400">Orders above this amount get free shipping.</span>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Standard Shipping Fee (₹)</label>
                <input
                  type="number"
                  value={settings.defaultShippingFee}
                  onChange={(e) => setSettings({ ...settings, defaultShippingFee: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="font-semibold text-stone-700 block mb-1">Registered Workshop Address</label>
            <input
              type="text"
              value={settings.businessAddress}
              onChange={(e) => setSettings({ ...settings, businessAddress: e.target.value })}
              className="w-full px-3 py-2 bg-stone-50 border rounded-xl outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-between border-t">
            {saved ? (
              <span className="text-xs text-[#651E2D] font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C8A96B]" /> Settings updated successfully!
              </span>
            ) : (
              <span />
            )}

            <button
              type="submit"
              disabled={saving}
              className="bg-stone-900 hover:bg-amber-800 disabled:opacity-50 text-white font-semibold text-xs px-6 py-2.5 rounded-xl shadow-warm flex items-center gap-1.5 transition-colors"
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
