'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
  ShieldCheck,
  Palette,
  ExternalLink,
  HelpCircle,
  Ruler,
  Layers,
} from 'lucide-react';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

const FRAME_TYPES = [
  { id: 'acrylic-5mm', name: '5MM Crystal Acrylic Frame', desc: 'Direct UV printed, diamond beveled edges with metal wall studs' },
  { id: 'led-backlit', name: 'LED Backlit Photo Frame', desc: 'Warm halo glow, plug & play power adapter included' },
  { id: 'glitter-frame', name: 'Liquid Gold Glitter Frame', desc: 'Dual-layer acrylic block with floating shimmer flakes' },
  { id: 'god-frame', name: 'Temple & Pooja Room Sacred Art', desc: 'Lord Balaji, Shiva, Ayodhya Mandir, Ashta Lakshmi' },
  { id: 'rotating-lamp', name: '360° Rotating Photo Lamp', desc: 'Motorized revolving tower with ambient illumination' },
  { id: 'triptych-set', name: 'Sets of 2 & 3 Frames', desc: 'Coordinated wall gallery sets' },
  { id: 'bulk-gifting', name: 'Bulk / Wedding Return Gifts', desc: 'Special volume pricing with custom gift packaging' },
];

const STANDARD_SIZES = [
  '8 x 12 inches (0.7 sq.ft)',
  '12 x 18 inches (1.5 sq.ft)',
  '16 x 24 inches (2.7 sq.ft)',
  '18 x 24 inches (3.0 sq.ft)',
  '20 x 30 inches (4.2 sq.ft)',
  '24 x 36 inches (6.0 sq.ft)',
  'Custom Dimensions (Laser Cut)',
];

export default function EnquiryPage() {
  const [frameType, setFrameType] = useState('acrylic-5mm');
  const [size, setSize] = useState('12 x 18 inches (1.5 sq.ft)');
  const [customSize, setCustomSize] = useState('');
  const [finish, setFinish] = useState('frameless');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [message, setMessage] = useState('');

  const cleanWaNumber = (INITIAL_SETTINGS.whatsappNumber || '917780269927').replace(/[^0-9]/g, '');

  const buildWhatsAppUrl = () => {
    const selectedFrameObj = FRAME_TYPES.find((f) => f.id === frameType);
    const frameName = selectedFrameObj ? selectedFrameObj.name : 'Custom Acrylic Frame';
    const effectiveSize = size === 'Custom Dimensions (Laser Cut)' ? (customSize.trim() || 'Custom Size') : size;

    let text = `Hello Abhi's Gifts! 🙏\nI would like to make an enquiry for a custom photo frame:`;
    text += `\n\n📌 *Product Details:*`;
    text += `\n• Frame Type: ${frameName}`;
    text += `\n• Desired Size: ${effectiveSize}`;
    text += `\n• Finish Preference: ${finish === 'frameless' ? 'Frameless Acrylic with Metal Studs' : finish === 'gold' ? 'Beveled Gold Border' : 'Matte Black Border'}`;

    if (customerName.trim()) {
      text += `\n\n👤 *Customer Information:*`;
      text += `\n• Name: ${customerName.trim()}`;
    }
    if (customerPhone.trim()) {
      text += `\n• Contact: ${customerPhone.trim()}`;
    }
    if (customerCity.trim()) {
      text += `\n• Delivery City: ${customerCity.trim()}`;
    }

    if (message.trim()) {
      text += `\n\n📝 *Notes / Special Instructions:*`;
      text += `\n${message.trim()}`;
    }

    text += `\n\nPlease share estimated pricing, photo requirements, and 1:1 digital proof. Thank you!`;

    return `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="w-full bg-white text-stone-900 min-h-screen">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 text-white border-b border-amber-500/30 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            Direct WhatsApp Studio Enquiry
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-white tracking-tight">
            Custom Framing &amp; Order Enquiry
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Have a photo to frame, wedding portrait, temple wall art requirement, or bulk gifting order? Fill your details below to start an instant WhatsApp chat with our Hyderabad master craftsmen.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3 text-xs text-stone-300">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> Replies within 15 Minutes
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-[#25D366]" /> Free 1:1 Digital Proof
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Zero-Breakage Shipping
            </span>
          </div>
        </div>
      </div>

      {/* Main Form Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden p-6 sm:p-10 space-y-8">
          {/* Step 1: Select Frame Type */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs flex items-center justify-center font-bold">1</span>
                <span>Select Frame Type or Collection</span>
              </h2>
              <span className="text-xs text-amber-800 font-semibold">Choose one</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {FRAME_TYPES.map((type) => {
                const isSelected = frameType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFrameType(type.id)}
                    className={`p-3.5 rounded-2xl text-left transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-amber-50/80 border-amber-500 ring-1 ring-amber-400 text-stone-950 shadow-xs'
                        : 'bg-stone-50 border-stone-200 hover:border-amber-300 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold text-stone-900">{type.name}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 ml-1" />}
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1 leading-snug">{type.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Dimensions & Size */}
          <div className="space-y-3 pt-4 border-t border-stone-200">
            <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs flex items-center justify-center font-bold">2</span>
              <span>Dimensions &amp; Wall Sizing</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {STANDARD_SIZES.map((sz) => {
                const isSelected = size === sz;
                return (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSize(sz)}
                    className={`p-2.5 rounded-xl text-center text-xs font-semibold transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>

            {size === 'Custom Dimensions (Laser Cut)' && (
              <div className="pt-2">
                <input
                  type="text"
                  value={customSize}
                  onChange={(e) => setCustomSize(e.target.value)}
                  placeholder="Specify custom width × height (e.g., 20 x 48 inches)"
                  className="w-full px-4 py-2.5 rounded-xl border border-amber-400 bg-amber-50/50 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            )}
          </div>

          {/* Step 3: Finish Preference */}
          <div className="space-y-3 pt-4 border-t border-stone-200">
            <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs flex items-center justify-center font-bold">3</span>
              <span>Frame Edge Finish Preference</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'frameless', name: 'Frameless 5MM Acrylic', desc: 'Modern floating look with metal wall studs' },
                { id: 'gold', name: 'Luxury Gold Border', desc: 'Warm metallic beveled border' },
                { id: 'black', name: 'Contemporary Black Border', desc: 'Minimalist gallery look' },
              ].map((f) => {
                const isSelected = finish === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFinish(f.id)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-50/80 border-amber-500 ring-1 ring-amber-400 text-stone-900'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    <span className="text-xs font-bold block text-stone-900">{f.name}</span>
                    <span className="text-[11px] text-stone-500 block mt-0.5">{f.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Your Contact Info & Notes */}
          <div className="space-y-4 pt-4 border-t border-stone-200">
            <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs flex items-center justify-center font-bold">4</span>
              <span>Your Information &amp; Photo Notes</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Your Name (Optional)</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Ramesh Reddy"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">WhatsApp Mobile Number</label>
                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">City / Location</label>
                <input
                  type="text"
                  value={customerCity}
                  onChange={(e) => setCustomerCity(e.target.value)}
                  placeholder="e.g. Hyderabad, Bengaluru, etc."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Photo Description or Specific Query
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Mention any questions, like photo resolution check, pooja room lighting, or custom text inscription..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs text-stone-900 focus:outline-none focus:border-stone-900 resize-none"
              />
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2 space-y-3 text-center">
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da850] text-stone-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-[1.01]"
            >
              <MessageCircle className="w-5 h-5 fill-stone-950 text-[#25D366]" />
              <span>Send Enquiry via WhatsApp (+91 77802 69927)</span>
              <Send className="w-4 h-4" />
            </a>

            <p className="text-xs text-stone-500">
              🔒 Clicking above opens WhatsApp with your pre-filled inquiry. You can attach your photo directly in the chat.
            </p>
          </div>

          {/* Direct Support & Workshop Info */}
          <div className="pt-6 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <Phone className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block font-bold">Direct Phone Consultation</strong>
                <span>Call our artisan workshop directly at </span>
                <a href="tel:+917780269927" className="text-amber-800 font-bold underline">+91 77802 69927</a>
                <span className="block text-[11px] text-stone-500 mt-0.5">Mon – Sun: 9:00 AM – 9:00 PM IST</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block font-bold">Hyderabad Workshop &amp; Studio</strong>
                <span>Dilsukhnagar, Hyderabad, Telangana – 500036.</span>
                <a
                  href="https://maps.app.goo.gl/fmGv35KsGabFna9E6?g_st=ac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 hover:text-amber-900 block mt-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
