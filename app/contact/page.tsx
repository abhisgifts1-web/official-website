'use client';

import React, { useState, useEffect } from 'react';
import { SiteSettings } from '@/types';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { INITIAL_SETTINGS } from '@/lib/data/settings';
import ContactSupportSection from '@/components/support/ContactSupportSection';

export default function ContactPage() {
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.settings) {
          setSettings(d.settings);
        }
      })
      .catch(() => {});
  }, []);
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
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-16 space-y-12 bg-white text-stone-900">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-widest font-bold text-stone-900 bg-stone-100 border border-amber-300 px-3 py-1 rounded-full inline-flex items-center gap-1.5 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" /> We Are Here to Assist
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-5xl text-stone-900">
          Contact Us
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          We are happy to assist you with orders, customization, payments, shipping and customer support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info (5 cols) */}
        <div className="lg:col-span-5 bg-stone-50 text-stone-700 p-5 sm:p-8 rounded-2xl sm:rounded-3xl space-y-6 shadow-sm border border-stone-200">
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-xl text-stone-900">Abhi&apos;s Gifts – Frame Your Memories</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Near Old RTA Office Moosarambagh, Hyderabad, Telangana – 500036.
            </p>
          </div>

          <div className="space-y-4 text-xs text-stone-700 pt-2">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1.5">
                <strong className="text-stone-900 block font-bold">Business Address:</strong>
                <span className="block leading-relaxed">{settings.businessAddress || INITIAL_SETTINGS.businessAddress}</span>
                <a
                  href={settings.googleMapsUrl || INITIAL_SETTINGS.googleMapsUrl || "https://maps.app.goo.gl/fmGv35KsGabFna9E6?g_st=ac"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-stone-950 font-bold text-xs transition-colors border border-amber-300 shadow-2xs mt-1"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-800" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-800" />
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block">WhatsApp / Mobile:</strong>
                <a href={`tel:${settings.supportPhone || INITIAL_SETTINGS.supportPhone}`} className="hover:text-amber-700 font-semibold">
                  {settings.supportPhone || INITIAL_SETTINGS.supportPhone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block">Email:</strong>
                <a href={`mailto:${settings.supportEmail || INITIAL_SETTINGS.supportEmail}`} className="hover:text-amber-700 font-semibold">
                  {settings.supportEmail || INITIAL_SETTINGS.supportEmail}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
              <div>
                <strong className="text-stone-900 block">Instagram:</strong>
                <a
                  href={settings.instagramUrl || INITIAL_SETTINGS.instagramUrl || 'https://www.instagram.com/abhis_gifts_'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-700 font-semibold"
                >
                  @abhis_gifts_
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block">Business Hours:</strong>
                <span>Monday to Saturday, 10:00 AM – 08:00 PM</span>
              </div>
            </div>
          </div>

          {/* Complaint Resolution Notice */}
          <div className="bg-amber-50/70 border border-amber-200/70 rounded-xl p-3 flex items-start gap-2.5">
            <svg className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-xs text-stone-700 leading-relaxed">
              We aim to acknowledge complaints within <strong>48 hours</strong> and resolve them within <strong>30 days</strong>, subject to applicable requirements.
            </p>
          </div>

          <div className="pt-4 border-t border-stone-200">
            <a
              href={`https://wa.me/${(settings.whatsappNumber || INITIAL_SETTINGS.whatsappNumber).replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                'Hi Abhi Gifts! I would like to inquire about your artworks.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#FEE815] hover:bg-[#FFF04B] text-stone-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-colors border border-amber-500 uppercase tracking-wider cursor-pointer shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-stone-200 shadow-sm space-y-5">
          <h3 className="font-serif font-bold text-xl text-stone-900 border-b border-stone-200 pb-3">
            Send an Enquiry
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-900 block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm sm:text-xs min-h-[44px] bg-white border border-stone-300 text-stone-900 rounded-xl outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-900 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="priya@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm sm:text-xs min-h-[44px] bg-white border border-stone-300 text-stone-900 rounded-xl outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-900 block mb-1">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm sm:text-xs min-h-[44px] bg-white border border-stone-300 text-stone-900 rounded-xl outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-900 block mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Custom Mandir Wall Dimensions"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm sm:text-xs min-h-[44px] bg-white border border-stone-300 text-stone-900 rounded-xl outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-900 block mb-1">Message *</label>
              <textarea
                rows={4}
                required
                placeholder="Tell us about the size, deity, or questions you have..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm sm:text-xs min-h-[44px] bg-white border border-stone-300 text-stone-900 rounded-xl outline-none focus:border-amber-500"
              />
            </div>

            {error && <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">{error}</p>}
            {success && (
              <div className="flex items-center gap-2 text-xs text-emerald-900 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Thank you! Your message has been received. Our team will contact you within 24 hours.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="bg-[#FEE815] hover:bg-[#FFF04B] disabled:opacity-50 text-stone-950 font-bold text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors border border-amber-500 uppercase tracking-wider cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Submitting...' : 'Send Message'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Google Maps Location Section */}
      <div className="rounded-2xl sm:rounded-3xl border border-stone-200 overflow-hidden bg-stone-50 shadow-sm p-4 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">STORE LOCATION &amp; WORKSHOP</span>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 mt-0.5">
              Visit Abhi&apos;s Gifts in Hyderabad
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Near Old RTA Office Moosarambagh, West Prasanth Nagar, Moosarambagh, Hyderabad, Telangana – 500036
            </p>
          </div>
          <a
            href="https://maps.app.goo.gl/fmGv35KsGabFna9E6?g_st=ac"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FEE815] hover:bg-[#FFF04B] text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors border border-amber-500 shrink-0 shadow-xs"
          >
            <MapPin className="w-4 h-4" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="w-full h-[320px] sm:h-[400px] rounded-xl overflow-hidden border border-stone-200 shadow-inner bg-stone-100">
          <iframe
            title="Abhis Gifts Google Maps Location"
            src="https://maps.google.com/maps?q=Abhis+Gifts,+West+Prasanth+Nagar,+Moosarambagh,+Hyderabad,+Telangana+500036&t=&z=16&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
