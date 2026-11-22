import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ShieldCheck,
  Heart,
  Award,
  ArrowRight,
  Flame,
  Gem,
  PackageCheck,
  MapPin,
  CheckCircle2,
  Clock,
  Compass,
  Gift,
  Camera,
  Palette,
  Lightbulb,
  Check,
  MessageCircle,
  RotateCw,
  Smile,
  Star,
  Eye,
  Phone,
  Mail,
  Layers,
  Building2,
  ExternalLink,
  PhoneCall,
  CheckCheck,
} from 'lucide-react';
import { WhatsAppIcon, InstagramIcon, YouTubeIcon } from '@/components/icons/SocialIcons';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

export const metadata: Metadata = {
  title: "About Us • Abhi's Gifts | Frame Your Memories — Dilsukhnagar, Hyderabad",
  description:
    "Abhi's Gifts is Hyderabad's premier personalized photo framing atelier in Dilsukhnagar. Established in 2022, specializing in museum-grade 5MM cast acrylic frames, ambient LED backlit frames, liquid gold glitter frames, and bespoke keepsakes.",
  alternates: {
    canonical: 'https://abhigifts.com/about',
  },
  openGraph: {
    title: "About Us • Abhi's Gifts | Frame Your Memories",
    description:
      "Since 2022, Abhi's Gifts has been turning precious memories into long-lasting, illuminated acrylic masterpieces in Dilsukhnagar, Hyderabad.",
    url: 'https://abhigifts.com/about',
    images: [
      {
        url: '/images/atelier/room-living.jpg',
        width: 1200,
        height: 630,
        alt: "Abhi's Gifts Atelier - Dilsukhnagar, Hyderabad",
      },
    ],
  },
};

const SIGNATURE_COLLECTIONS = [
  {
    title: '5MM Cast Acrylic Photo Frames',
    desc: 'Diamond CNC-cut beveled edges with metal wall standoff studs for a modern floating aesthetic.',
    icon: Gem,
    tag: 'Bestseller',
    href: '/category/acrylic-photo-frames',
    image: '/images/mockups/custom-personalised-photo-acrylic-wall-frame/primary-square.jpg',
  },
  {
    title: 'Concealed LED Backlit Wall Art',
    desc: 'Soothing 3000K ambient halo illumination casting gentle light across your favorite portraits.',
    icon: Lightbulb,
    tag: 'Signature Craft',
    href: '/category/led-acrylic-photo-frames',
    image: '/images/mockups/custom-led-backlit-acrylic-photo-frame/primary-square.jpg',
  },
  {
    title: 'Liquid Gold Glitter Frames',
    desc: 'Dual-layer acrylic block infused with floating shimmer flakes for romantic and celebratory displays.',
    icon: Sparkles,
    tag: 'Luxury Edition',
    href: '/category/glitter-photo-frames',
    image: '/images/mockups/enchanted-liquid-gold-glitter-acrylic-photo-frame/primary-square.jpg',
  },
  {
    title: 'Pooja Room & Devotional Art',
    desc: 'Lord Balaji, Shiva, Ayodhya Ram Mandir and Ashta Lakshmi rendered with gold foil and sanctum lighting.',
    icon: Flame,
    tag: 'Sacred Mandir',
    href: '/category/god-photo-frames',
    image: '/images/mockups/tirupati-balaji-divine-led-backlit-acrylic-wall-art/primary-square.jpg',
  },
  {
    title: '360° Motorized Rotating Lamps',
    desc: 'Revolving cylindrical tower illuminating multiple family portraits with warm ambient glow.',
    icon: RotateCw,
    tag: 'Unique Gift',
    href: '/category/360-rotating-photo-lamps',
    image: '/images/mockups/crystal-tower-hexagonal-rotating-photo-lamp/primary-square.jpg',
  },
  {
    title: 'Wedding Vows & Couple Art',
    desc: 'Romantic dual portraits, vow inscriptions, and anniversary heirlooms engineered to last generations.',
    icon: Heart,
    tag: 'Romantic Keepsake',
    href: '/category/couple-wedding-frames',
    image: '/images/mockups/custom-couple-wedding-vows-acrylic-keepsake-frame/primary-square.jpg',
  },
  {
    title: 'Family & Milestone Baby Frames',
    desc: 'Celebrate tender newborn memories, birthdays, and multi-generation family bonds in vibrant clarity.',
    icon: Camera,
    tag: 'Family Heirloom',
    href: '/category/family-baby-frames',
    image: '/images/mockups/personalized-family-heirloom-gold-script-acrylic-frame/primary-square.jpg',
  },
  {
    title: 'Bulk Corporate & Event Gifting',
    desc: 'Custom branded plaques, employee appreciation frames, and wedding return gift packages.',
    icon: Gift,
    tag: 'Volume Pricing',
    href: '/enquiry',
    image: '/images/mockups/signature-24k-gold-embellished-crystal-acrylic-wall-art/primary-square.jpg',
  },
];

const CRAFT_LAYERS = [
  {
    step: '01',
    title: 'High-Density Cast Acrylic Sheet',
    desc: '5MM virgin grade cast acrylic with 92% optical light transmission. Shatterproof, scratch-resistant, and impervious to room moisture.',
    badge: 'Virgin Cast Acrylic',
  },
  {
    step: '02',
    title: '1200 DPI Micro-Piezo Direct UV Printing',
    desc: 'Archival fade-resistant pigments cured with high-intensity ultraviolet lamps directly onto the reverse acrylic surface.',
    badge: '1200 DPI Archival Inks',
  },
  {
    step: '03',
    title: 'Concealed Ambient LED Halo Guide',
    desc: 'For illuminated models: low-voltage 3000K warm white LED strips with micro-etched light diffusion plates for shadowless backlighting.',
    badge: '3000K Soothing Halo',
  },
  {
    step: '04',
    title: 'Architectural Stainless Steel Standoffs',
    desc: 'Solid metal wall mounting studs delivering an architectural 1-inch floating separation from your living room or pooja wall.',
    badge: 'Designer Wall Float',
  },
];

const WHY_CHOOSE_PILLARS = [
  {
    title: 'Direct Hyderabad Workshop',
    desc: 'Handcrafted in Dilsukhnagar without retail middlemen, giving you master artisan quality at honest studio prices.',
    icon: Building2,
  },
  {
    title: 'Free 1:1 WhatsApp Proof',
    desc: 'Our design team prepares a full digital proof and confirms cropping with you on WhatsApp before printing begins.',
    icon: Palette,
  },
  {
    title: 'Zero-Breakage Transit Guarantee',
    desc: 'Packaged in 5-layer honeycomb bubble crates with corner edge guards. 100% free immediate replacement if transit damaged.',
    icon: ShieldCheck,
  },
  {
    title: 'Custom Sizing (8" to 60")',
    desc: 'From compact desk photo blocks to grand 6-foot temple wall panels, we laser cut custom dimensions to the millimeter.',
    icon: Layers,
  },
  {
    title: 'Archival Fade Resistance',
    desc: 'High-grade ultraviolet curing shields your photographs from sunlight fading, room humidity, and aging yellow discoloration.',
    icon: Award,
  },
  {
    title: 'Dedicated Human Support',
    desc: 'Talk directly with real craftspeople on WhatsApp or telephone (+91 90323 72782) for design advice and swift updates.',
    icon: MessageCircle,
  },
];

export default function AboutPage() {
  const cleanWaNumber = (INITIAL_SETTINGS.whatsappNumber || '919032372782').replace(/[^0-9]/g, '');

  return (
    <div className="w-full bg-white text-stone-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* =========================================================================
          1. CINEMATIC EDITORIAL HERO SECTION
          ========================================================================= */}
      <section className="relative w-full pt-16 sm:pt-24 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden bg-gradient-to-b from-[#0D0D0E] via-[#151517] to-[#1D1D20] text-white border-b border-amber-500/20">
        {/* Ambient Warm Golden Glow Orbs */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-[#FEE815]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-10 relative z-10 text-center">
          
          {/* Brand Logo & Est. Badge */}
          <div className="inline-flex flex-col items-center gap-3">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-black/60 border border-amber-400/40 shadow-2xl backdrop-blur-md">
              <Image
                src="/images/brand/logo-gold-v2.png"
                alt="Abhi's Gifts - Frame Your Memories"
                width={260}
                height={55}
                priority
                className="h-10 sm:h-12 md:h-14 w-auto object-contain"
              />
            </div>
            
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[11px] sm:text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>EST. 2022 • DILSUKHNAGAR, HYDERABAD</span>
            </div>
          </div>

          {/* Main Headline & Signature Tagline */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="font-serif font-bold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08]">
              Where Cherished Memories Become{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FEE815] via-[#FFF275] to-[#E5C158]">
                Illuminated Art
              </span>
            </h1>
            <p className="font-serif italic text-xl sm:text-2xl text-amber-200/90 font-medium">
              &ldquo;Frame Your Memories.&rdquo;
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-stone-300 max-w-2xl mx-auto font-sans leading-relaxed pt-2">
              Based in <strong>Dilsukhnagar, Hyderabad</strong>, Abhi&apos;s Gifts is an artisan atelier dedicated to crafting museum-grade 5MM cast acrylic frames, warm halo LED backlighting, and liquid gold keepsakes that transform photographs into permanent heirlooms.
            </p>
          </div>

          {/* Core Numbers / Trust Counter Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center hover:border-amber-400/50 transition-colors">
              <span className="font-serif font-bold text-2xl sm:text-3xl text-amber-400 block">12,000+</span>
              <span className="text-xs text-stone-300 font-medium mt-0.5 block">Happy Homes Decorated</span>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center hover:border-amber-400/50 transition-colors">
              <span className="font-serif font-bold text-2xl sm:text-3xl text-amber-400 block">5MM</span>
              <span className="text-xs text-stone-300 font-medium mt-0.5 block">Virgin Cast Crystal Acrylic</span>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center hover:border-amber-400/50 transition-colors">
              <span className="font-serif font-bold text-2xl sm:text-3xl text-amber-400 block">100% Free</span>
              <span className="text-xs text-stone-300 font-medium mt-0.5 block">1:1 WhatsApp Proof Approval</span>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center hover:border-amber-400/50 transition-colors">
              <span className="font-serif font-bold text-2xl sm:text-3xl text-amber-400 block">24–48h</span>
              <span className="text-xs text-stone-300 font-medium mt-0.5 block">Fast Workshop Dispatch</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#FEE815] hover:bg-[#FFF04B] text-stone-950 font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full border border-amber-500 shadow-lg hover:shadow-xl uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Explore Collections</span>
              <ArrowRight className="w-4 h-4 text-stone-950" />
            </Link>

            <Link
              href="/enquiry"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-stone-950 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 fill-stone-950 text-stone-950" />
              <span>WhatsApp Custom Enquiry</span>
            </Link>

            <Link
              href="/customise"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-full border border-white/20 transition-all hover:border-amber-400"
            >
              <span>Add Your Photo Now</span>
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. THE ANATOMY OF CRAFTSMANSHIP (DECONSTRUCTED LAYERS)
          ========================================================================= */}
      <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 xl:px-16 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Our Artisan Technique
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            How Every Frame is Handcrafted
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans">
            Unlike cheap framed poster prints that warp and fade, every Abhi&apos;s Gifts frame is precision engineered using 4 specialized layers for museum-grade visual depth and lifelong durability.
          </p>
        </div>

        {/* 4 Layers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {CRAFT_LAYERS.map((layer) => (
            <div
              key={layer.step}
              className="relative p-6 rounded-3xl bg-white border border-stone-200 hover:border-amber-400 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 group hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-extrabold text-2xl text-amber-600">
                    {layer.step}
                  </span>
                  <span className="text-[10px] font-bold text-stone-700 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded-full">
                    {layer.badge}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-amber-800 transition-colors">
                  {layer.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed">
                  {layer.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center gap-1.5 text-xs text-amber-700 font-semibold">
                <CheckCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero-Defect Inspected</span>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Workshop Spotlight Banner */}
        <div className="rounded-3xl overflow-hidden bg-stone-900 text-white border border-stone-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-5">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
              <Gem className="w-4 h-4 text-amber-400" />
              THE DILSUKHNAGAR WORKSHOP DIFFERENCE
            </span>
            <h3 className="font-serif font-bold text-2xl sm:text-4xl text-white leading-tight">
              Crafted by Real Artisans in Hyderabad, Delivered Across India
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl">
              Every order is cut, polished, assembled, and light-tested right here in our Hyderabad studio. We take pride in 100% personalized customer care — you speak directly to the creators who craft your artwork.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/enquiry"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-stone-950 font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 fill-stone-950 text-stone-950" />
                <span>Talk with an Artisan</span>
              </Link>
              <a
                href="https://maps.app.goo.gl/fmGv35KsGabFna9E6?g_st=ac"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 underline font-semibold"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Visit Dilsukhnagar Workshop</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 h-72 sm:h-80 lg:h-full relative min-h-[300px]">
            <Image
              src="/images/atelier/room-living.jpg"
              alt="Abhi's Gifts Handcrafted Living Room Acrylic Art"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-stone-900 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs text-stone-200">
              <strong className="text-amber-400 block font-serif">Living Room Sanctum Installation</strong>
              <span>Custom 5MM LED illuminated frame installed in Jubilee Hills, Hyderabad.</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. SIGNATURE SPECIALTIES & COLLECTIONS
          ========================================================================= */}
      <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 xl:px-16 bg-stone-50 border-t border-b border-stone-200">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-800 flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-amber-600" />
                Master Catalog
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight mt-1">
                Our Signature Collections
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-800 hover:text-amber-900 group"
            >
              <span>Explore All Products in Store</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Collections Grid with Photos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SIGNATURE_COLLECTIONS.map((col, idx) => {
              const Icon = col.icon;
              return (
                <Link
                  key={idx}
                  href={col.href}
                  className="group rounded-3xl overflow-hidden bg-white border border-stone-200 hover:border-amber-400 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col hover:-translate-y-1.5"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                    <Image
                      src={col.image}
                      alt={col.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-xs text-[10px] font-bold text-amber-300 border border-white/10">
                      {col.tag}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-amber-700">
                        <Icon className="w-4 h-4 shrink-0" />
                        <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                          {col.title}
                        </h3>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                        {col.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-amber-800 group-hover:text-amber-900">
                      <span>View Collection</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. OUR STORY & FOUNDING PHILOSOPHY
          ========================================================================= */}
      <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 xl:px-16 max-w-6xl mx-auto space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              Our Hyderabad Story
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
              Started in 2022 with One Belief: Every Memory Deserves to Shine
            </h2>
            <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
              <p>
                In 2022, <strong>Abhi&apos;s Gifts</strong> was founded in Dilsukhnagar, Hyderabad, with a clear conviction: photographs are far more than pixels on a phone screen. They represent wedding vows, milestone birthdays, beloved parents, sacred temple prayers, and laughter with children.
              </p>
              <p>
                Traditional wooden and glass frames were heavy, fragile in transit, prone to moisture damage, and lacked the visual brilliance of modern interior design.
              </p>
              <p>
                We set out to master <strong>high-gloss crystal acrylic technology</strong> and <strong>calibrated LED backlighting</strong>. Over the years, our workshop has grown from a local artisan shop into a trusted personalized gifting destination across Telangana, Andhra Pradesh, and nationwide.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-300/80 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-amber-600 shrink-0" />
              <p className="font-serif italic text-sm sm:text-base text-amber-950 font-semibold">
                &ldquo;Our goal is not just to sell a frame, but to give your memories a permanent place of honor in your home.&rdquo;
              </p>
            </div>
          </div>

          {/* Visual Card / Founder Commitment */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 text-white p-6 sm:p-8 border border-amber-400/40 shadow-xl space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/15 border border-amber-400/40 text-amber-400 flex items-center justify-center font-serif font-bold text-xl">
                  AG
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-white">Abhi&apos;s Gifts Studio</h4>
                  <span className="text-xs text-amber-300">Dilsukhnagar, Hyderabad</span>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-stone-300 leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                  <span>100% Genuine 5MM Virgin Cast Acrylic</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                  <span>Precision Laser Square Cut &amp; Beveled Edges</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                  <span>Free WhatsApp Digital Proof Before Fabrication</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                  <span>Zero-Breakage Transit Guarantee Across India</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/customise"
                  className="w-full py-3 px-4 rounded-xl bg-[#FEE815] hover:bg-[#FFF04B] text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <span>Customise Your Frame Online</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. OUR MISSION & VISION (DUAL LUXURY GLASS CARDS)
          ========================================================================= */}
      <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 xl:px-16 bg-gradient-to-b from-[#111113] via-[#161619] to-[#0E0E10] text-white border-y border-amber-500/20">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-amber-400 block">
              OUR GUIDING LIGHT
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Guided by Purpose &amp; Heart
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Mission */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white/5 border border-white/10 hover:border-amber-400/60 shadow-xl backdrop-blur-md flex flex-col justify-between space-y-6 group transition-all">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-400/15 border border-amber-400/40 text-amber-400 flex items-center justify-center">
                  <Compass className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                    OUR CORE PURPOSE
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    Our Mission
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-sans">
                  To turn our customers&apos; most precious memories into museum-grade acrylic displays and sacred keepsakes through artisanal craftsmanship, transparent digital proofing, and reliable Hyderabad workshop service.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/25 text-xs sm:text-sm font-serif italic text-amber-200">
                &ldquo;We make personalized gifting easy, memorable, and affordable for every family.&rdquo;
              </div>
            </div>

            {/* Vision */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white/5 border border-white/10 hover:border-amber-400/60 shadow-xl backdrop-blur-md flex flex-col justify-between space-y-6 group transition-all">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-400/15 border border-amber-400/40 text-amber-400 flex items-center justify-center">
                  <Eye className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                    OUR ASPIRATION
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    Our Vision
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-sans">
                  To become India&apos;s premier personalized photo framing atelier, recognized nationwide for optical clarity, illuminated wall decor, and customer satisfaction in every home we touch.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/25 text-xs sm:text-sm font-serif italic text-amber-200">
                &ldquo;We want every special memory to have an everlasting place of light in people&apos;s homes and hearts.&rdquo;
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          6. WHY CHOOSE ABHI'S GIFTS? (6 DISTINCTIONS)
          ========================================================================= */}
      <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 xl:px-16 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            The Abhi&apos;s Gifts Promise
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Why Discerning Customers Choose Us
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            We hold ourselves to obsessive craftsmanship standards so you can proudly gift or hang your artwork with peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_PILLARS.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-3xl bg-white border border-stone-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all hover:-translate-y-1 space-y-3 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-amber-800 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          7. OFFICIAL WORKSHOP LOCATION & STUDIO IDENTITY
          ========================================================================= */}
      <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 xl:px-16 max-w-5xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 text-white border border-amber-400/40 shadow-2xl space-y-8 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          {/* Heading */}
          <div className="space-y-2 border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400 font-bold block">
                OFFICIAL HYDERABAD WORKSHOP
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">
                ABHI&apos;S GIFTS
              </h2>
              <p className="font-serif italic text-base sm:text-lg text-amber-200 mt-0.5">
                Frame Your Memories.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs font-bold self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span>Open 7 Days • 9:00 AM – 9:00 PM</span>
            </div>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm">
            
            {/* Location */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <MapPin className="w-4 h-4 shrink-0" />
                <span className="uppercase tracking-wider text-[11px] font-mono">Store &amp; Workshop Address</span>
              </div>
              <p className="text-stone-300 leading-relaxed">
                {INITIAL_SETTINGS.businessAddress || 'H.No: 16-11-419, SBI Officers Colony, Moosarambagh, Dilsukhnagar, Hyderabad, Telangana – 500036.'}
              </p>
              <a
                href={INITIAL_SETTINGS.googleMapsUrl || 'https://maps.app.goo.gl/fmGv35KsGabFna9E6?g_st=ac'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 underline font-semibold pt-1"
              >
                <span>Get Route on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Direct WhatsApp Consultation */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#25D366] font-bold">
                <WhatsAppIcon className="w-4 h-4 fill-[#25D366] shrink-0" />
                <span className="uppercase tracking-wider text-[11px] font-mono">WhatsApp Support &amp; Orders</span>
              </div>
              <p className="text-stone-300">
                Send your photo directly on WhatsApp for instantaneous size recommendations &amp; price quotes.
              </p>
              <a
                href={`https://wa.me/${cleanWaNumber}?text=Hello%20Abhi%27s%20Gifts%2C%20I%20would%20like%20to%20enquire%20about%20a%20custom%20photo%20frame.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#25D366] hover:underline pt-1"
              >
                <span>Chat on WhatsApp: +91 90323 72782</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Direct Telephone */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <PhoneCall className="w-4 h-4 shrink-0" />
                <span className="uppercase tracking-wider text-[11px] font-mono">Direct Phone Call</span>
              </div>
              <a
                href={`tel:${INITIAL_SETTINGS.supportPhone || '+919032372782'}`}
                className="text-stone-200 hover:text-amber-300 text-sm font-bold block"
              >
                {INITIAL_SETTINGS.supportPhone || '+91 90323 72782'}
              </a>
              <span className="text-[11px] text-stone-400 block">Mon – Sun: 9:00 AM – 9:00 PM IST</span>
            </div>

            {/* Email */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Mail className="w-4 h-4 shrink-0" />
                <span className="uppercase tracking-wider text-[11px] font-mono">Email Enquiries</span>
              </div>
              <a
                href={`mailto:${INITIAL_SETTINGS.supportEmail || 'abhisgifts@gmail.com'}`}
                className="text-stone-200 hover:text-amber-300 text-sm font-bold block truncate"
              >
                {INITIAL_SETTINGS.supportEmail || 'abhisgifts@gmail.com'}
              </a>
              <span className="text-[11px] text-stone-400 block">Guaranteed reply within 24 hours</span>
            </div>

          </div>

          {/* Social Links & Action Row */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/abhis_gifts_?cplk=MWtkNTJla2s3NTQw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-white fill-current" />
                <span>@abhis_gifts_</span>
              </a>
              <a
                href="https://youtube.com/@abhis_gifts?si=Ap98aZU7b21rJA_8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
              >
                <YouTubeIcon className="w-3.5 h-3.5 text-red-500 fill-current" />
                <span>@abhis_gifts</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-[#FEE815] hover:bg-[#FFF04B] text-stone-950 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Shop Catalog</span>
                <ArrowRight className="w-4 h-4 text-stone-950" />
              </Link>
              <Link
                href="/enquiry"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-stone-950 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-stone-950 text-stone-950" />
                <span>Enquiry via WhatsApp</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
