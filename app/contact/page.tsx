'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setError(data.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch {
      setError('An error occurred. Please reach us on WhatsApp directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-widest font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-800" /> We Are Here to Assist
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-5xl text-stone-900">
          Contact Our Studio
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          Have queries about custom temple measurements, bulk gifting, or delivery tracking? Reach out to our artisan team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info (5 cols) */}
        <div className="lg:col-span-5 bg-stone-950 text-stone-300 p-8 rounded-3xl space-y-6 shadow-warm border border-stone-800">
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-xl text-white">Abhi&apos;s Gifts Studio</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Dilsukhnagar, Hyderabad, Telangana – 500036.
            </p>
          </div>

          <div className="space-y-4 text-xs text-stone-300 pt-2">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Dilsukhnagar Workshop Address:</strong>
                <span>{INITIAL_SETTINGS.businessAddress}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Customer Care Hotline:</strong>
                <a href={`tel:${INITIAL_SETTINGS.supportPhone}`} className="hover:text-amber-300">
                  {INITIAL_SETTINGS.supportPhone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Email Desk:</strong>
                <a href={`mailto:${INITIAL_SETTINGS.supportEmail}`} className="hover:text-amber-300">
                  {INITIAL_SETTINGS.supportEmail}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Studio Hours:</strong>
                <span>Monday – Saturday: 9:30 AM – 7:00 PM IST</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-800">
            <a
              href={`https://wa.me/${INITIAL_SETTINGS.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                'Hi Abhi Gifts! I would like to inquire about your artworks.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#641E2E] hover:bg-[#32151D] text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-5">
          <h3 className="font-serif font-bold text-xl text-stone-900 border-b pb-3">
            Send an Enquiry
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-700 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="priya@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-700 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-700 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Custom Mandir Wall Dimensions"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-700 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">Message *</label>
              <textarea
                rows={4}
                required
                placeholder="Tell us about the size, deity, or questions you have..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-amber-700 focus:bg-white"
              />
            </div>

            {error && <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">{error}</p>}
            {success && (
              <div className="flex items-center gap-2 text-xs text-[#641E2E] bg-[#FCE7EA] p-3 rounded-xl border border-[#E8D5BD]">
                <CheckCircle2 className="w-4 h-4 text-[#B88A35] shrink-0" />
                <span>Thank you! Your message has been received. Our team will contact you within 24 hours.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="bg-stone-900 hover:bg-amber-800 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm px-8 py-3 rounded-xl shadow-warm flex items-center justify-center gap-2 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Submitting...' : 'Send Message'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
