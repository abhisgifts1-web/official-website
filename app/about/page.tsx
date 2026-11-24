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
  MapPin,
  CheckCircle2,
  Clock,
  Compass,
  Gift,
  Camera,
  Palette,
  Lightbulb,
  Check,
  RotateCw,
  Smile,
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
    "Abhi's Gifts is a premium personalized photo frame and gifting store based in Dilsukhnagar, Hyderabad. Established in 2022, specializing in acrylic photo frames, LED photo frames, glitter frames, acrylic clocks, and unique customized gifts.",
  alternates: {
    canonical: 'https://abhigifts.com/about',
  },
  openGraph: {
    title: "About Us • Abhi's Gifts | Frame Your Memories",
    description:
      "Since 2022, Abhi's Gifts has been turning precious memories into beautiful, meaningful and long-lasting displays in Dilsukhnagar, Hyderabad.",
    url: 'https://abhigifts.com/about',
    images: [
      {
        url: '/images/atelier/room-living.jpg',
        width: 1200,
        height: 630,
        alt: "Abhi's Gifts - Dilsukhnagar, Hyderabad",
      },
    ],
  },
};

const SPECIALTIES = [
  {
    title: 'Premium Acrylic Photo Frames',
    desc: 'High-density cast acrylic with precision beveled edges and crystal optical clarity.',
    icon: Gem,
    href: '/category/acrylic-photo-frames',
  },
  {
    title: 'LED Acrylic Photo Frames',
    desc: 'Concealed LED illumination casting a soothing warm halo around your portraits.',
    icon: Lightbulb,
    href: '/category/led-acrylic-photo-frames',
  },
  {
    title: 'Customized Photo Frames',
    desc: 'Bespoke designs tailored from your favourite high-resolution photographs.',
    icon: Palette,
    href: '/customise',
  },
  {
    title: 'Acrylic Frames with Studs',
    desc: 'Sophisticated metal standoff studs delivering a modern floating wall display.',
    icon: ShieldCheck,
    href: '/category/acrylic-photo-frames',
  },
  {
    title: 'Glitter Photo Frames',
    desc: 'Luminous sparkle and metallic glitter effects adding celebration radiance.',
    icon: Sparkles,
    href: '/category/glitter-photo-frames',
  },
  {
    title: 'Rotating Photo Lamps',
    desc: 'Motorized 360-degree cylindrical lamps glowing warmly with multiple photos.',
    icon: RotateCw,
    href: '/category/360-rotating-photo-lamps',
  },
  {
    title: 'Acrylic Photo Clocks',
    desc: 'Functional timepiece and personalized artwork combined seamlessly on acrylic.',
    icon: Clock,
    href: '/shop',
  },
  {
    title: 'Personalized Birthday Gifts',
    desc: 'Memorable birthday keepsakes capturing milestone celebrations with heartfelt detail.',
    icon: Gift,
    href: '/category/personalized-gifts',
  },
  {
    title: 'Wedding and Anniversary Frames',
    desc: 'Eternal romantic displays immortalizing sacred wedding vows and anniversaries.',
    icon: Heart,
    href: '/category/couple-wedding-frames',
  },
  {
    title: 'Couple and Love Photo Frames',
    desc: 'Elegant dual portraits, romantic captions, and sentimental couple keepsakes.',
    icon: Smile,
    href: '/category/couple-wedding-frames',
  },
  {
    title: 'Baby and Family Photo Frames',
    desc: 'Tender childhood milestones, newborn memories, and family heirloom displays.',
    icon: Camera,
    href: '/category/family-baby-frames',
  },
  {
    title: 'God and Devotional Photo Frames',
    desc: 'Sacred deities rendered with golden detailing and soothing pooja room lighting.',
    icon: Flame,
    href: '/category/god-photo-frames',
  },
];

const WHY_CHOOSE_US = [
  {
    title: 'Premium Quality',
    desc: 'Carefully selected materials and quality finishing.',
    icon: Gem,
  },
  {
    title: 'Personalized Designs',
    desc: 'Customized frames made using your favourite photographs.',
    icon: Palette,
  },
  {
    title: 'Modern Products',
    desc: 'Stylish acrylic and LED photo frame collections.',
    icon: Lightbulb,
  },
  {
    title: 'Multiple Choices',
    desc: 'Different sizes, designs and gifting options.',
    icon: Layers,
  },
  {
    title: 'Attention to Detail',
    desc: 'Focus on printing, finishing and presentation.',
    icon: Award,
  },
  {
    title: 'Customer Support',
    desc: 'Assistance with design selection and order enquiries.',
    icon: PhoneCall,
  },
  {
    title: 'Trusted Experience',
    desc: 'Serving customers since 2022.',
    icon: ShieldCheck,
  },
];

const UNIQUE_FEATURES = [
  'Customized designs based on customer photographs.',
  'Premium acrylic photo frame options.',
  'LED illumination for an attractive display.',
  'Stylish glitter and studded frame designs.',
  'Multiple frame sizes for different spaces and occasions.',
  'Personalized gifting options for special celebrations.',
  'Designs suitable for homes, offices and devotional spaces.',
];

const EXPERIENCE_PILLARS = [
  {
    title: 'Customized photo frame production.',
    desc: 'Precision laser cutting, CNC beveled edges, and cleanroom assembly for flawless display clarity.',
    icon: Gem,
  },
  {
    title: 'Acrylic and LED frame solutions.',
    desc: 'Calibrated low-voltage LED guides delivering even light dispersion without glare or heating.',
    icon: Lightbulb,
  },
  {
    title: 'Personalized photo printing.',
    desc: 'High-definition archival UV printing with rich, fade-resistant color pigments directly on cast acrylic.',
    icon: Palette,
  },
  {
    title: 'Glitter and decorative frame designs.',
    desc: 'Artisanal floating shimmer flakes and decorative finishes that elevate portraits into showpieces.',
    icon: Sparkles,
  },
  {
    title: 'Customized gifting for different occasions.',
    desc: 'Tailored solutions for birthdays, weddings, anniversaries, corporate events, and devotional spaces.',
    icon: Gift,
  },
  {
    title: 'Customer-focused product design and finishing.',
    desc: '1:1 WhatsApp digital previews and responsive assistance before final production and safe dispatch.',
    icon: CheckCircle2,
  },
];

export default function AboutPage() {
  const cleanWaNumber = (INITIAL_SETTINGS.whatsappNumber || '917780269927').replace(/[^0-9]/g, '');

  return (
    <div className="w-full bg-white text-stone-900 font-sans selection:bg-amber-100 selection:text-amber-900">

      {/* =========================================================================
          HERO & 1. SHORT BUSINESS INTRODUCTION
          ========================================================================= */}
      <section className="relative w-full pt-14 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden bg-gradient-to-b from-[#0D0D0E] via-[#141416] to-[#1C1C1F] text-white border-b border-amber-500/20">
        {/* Ambient Golden Glows */}
        <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[350px] bg-[#FEE815]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto space-y-8 relative z-10 text-center">
          
          {/* Logo Badge */}
          <div className="inline-flex flex-col items-center gap-2.5">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-black/60 border border-amber-400/40 shadow-2xl backdrop-blur-md">
              <Image
                src="/images/brand/logo-brand.png"
                alt="Abhi's Gifts - Frame Your Memories"
                width={260}
                height={55}
                priority
                className="h-10 sm:h-12 md:h-14 w-auto object-contain"
              />
            </div>
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[11px] sm:text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>ESTABLISHED 2022 • DILSUKHNAGAR, HYDERABAD</span>
            </div>
          </div>

          {/* Main Title & Tagline */}
          <div className="space-y-3">
            <h1 className="font-serif font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
              ABOUT ABHI&apos;S GIFTS
            </h1>
            <p className="font-serif italic text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#FEE815] via-[#FFF275] to-[#E5C158] font-semibold">
              &ldquo;Frame Your Memories.&rdquo;
            </p>
          </div>

          {/* 1. Short Business Introduction Card */}
          <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl max-w-4xl mx-auto space-y-4 text-left">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>1. Short Business Introduction</span>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-stone-200 leading-relaxed font-sans">
              <strong className="text-white font-bold">Abhi&apos;s Gifts</strong> is a premium personalized photo frame and gifting store based in <strong>Dilsukhnagar, Hyderabad</strong>. Established in <strong>2022</strong>, we specialize in premium acrylic photo frames, LED photo frames, customized photo frames, glitter frames, acrylic clocks and unique personalized gifts.
            </p>
            <p className="text-sm sm:text-base text-amber-200/90 leading-relaxed pt-2 border-t border-white/10 font-serif italic">
              Our goal is to turn your precious memories into beautiful, meaningful and long-lasting displays.
            </p>

            {/* Quick Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3">
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-center">
                <span className="block text-xs font-mono font-bold text-amber-400">Est. 2022</span>
                <span className="text-[11px] text-stone-300">Trusted Store</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-center">
                <span className="block text-xs font-mono font-bold text-amber-400">Hyderabad</span>
                <span className="text-[11px] text-stone-300">Dilsukhnagar Hub</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-center">
                <span className="block text-xs font-mono font-bold text-amber-400">Acrylic &amp; LED</span>
                <span className="text-[11px] text-stone-300">Modern Products</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-center">
                <span className="block text-xs font-mono font-bold text-amber-400">Customized</span>
                <span className="text-[11px] text-stone-300">100% Personal</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#FEE815] hover:bg-[#FFF04B] text-stone-950 font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full border border-amber-500 shadow-md uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Explore All Collections</span>
              <ArrowRight className="w-4 h-4 text-stone-950" />
            </Link>
            <Link
              href="/enquiry"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-stone-950 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 fill-stone-950 text-stone-950" />
              <span>Chat on WhatsApp (+91 77802 69927)</span>
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. COMPLETE BUSINESS DESCRIPTION & 12 CORE SPECIALTIES
          ========================================================================= */}
      <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 xl:px-16 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-amber-700 block">
            2. COMPLETE BUSINESS DESCRIPTION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Making Special Moments Unforgettable
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans">
            Abhi&apos;s Gifts is a personalized photo frame and gifting brand dedicated to making special moments unforgettable. Since 2022, we have been creating customized photo frames and premium gifting products that help people celebrate their most precious memories.
          </p>
        </div>

        {/* 12 Specialties Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900">
              We Specialize In:
            </h3>
            <span className="text-xs font-mono text-amber-800 font-bold bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
              12 Signature Categories
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {SPECIALTIES.map((spec, i) => {
              const Icon = spec.icon;
              return (
                <Link
                  key={i}
                  href={spec.href}
                  className="group p-5 rounded-2xl bg-white border border-stone-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        #{String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-base text-stone-900 group-hover:text-amber-800 transition-colors">
                      {spec.title}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {spec.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-amber-800 group-hover:text-amber-900">
                    <span>Explore Products</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Narrative Summary Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-stone-50 border border-stone-200 text-center max-w-4xl mx-auto space-y-3">
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans">
            We focus on quality materials, attractive designs, customization and careful finishing. Whether it is a birthday, wedding, anniversary, family celebration or a devotional space, we help you transform your favourite photographs into special keepsakes.
          </p>
          <p className="font-serif italic text-base sm:text-lg text-stone-900 font-bold border-t border-stone-200 pt-3">
            Located in Dilsukhnagar, Hyderabad, Abhi&apos;s Gifts aims to provide quality personalized gifting solutions with a convenient customer experience.
          </p>
        </div>
      </section>

      {/* =========================================================================
          3. OUR MISSION AND VISION (DUAL GLASS CARDS)
          ========================================================================= */}
      <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 xl:px-16 bg-gradient-to-b from-[#111113] via-[#161619] to-[#0E0E10] text-white border-y border-amber-500/20">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-amber-400 block">
              3. OUR MISSION AND VISION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Guided by Purpose &amp; Heart
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Mission Card */}
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
                  Our mission is to transform customers&apos; precious photographs into beautiful personalized frames and meaningful gifts through quality products, creative designs and reliable service.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/25 text-xs sm:text-sm font-serif italic text-amber-200">
                &ldquo;We aim to make personalized gifting easy, memorable and affordable for everyone.&rdquo;
              </div>
            </div>

            {/* Vision Card */}
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
                  Our vision is to become a trusted and recognized personalized photo frame and gifting brand in Hyderabad and expand our presence across India.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/25 text-xs sm:text-sm font-serif italic text-amber-200">
                &ldquo;We want every special memory to have a beautiful place in people&apos;s homes and hearts.&rdquo;
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          4. WHY SHOULD CUSTOMERS CHOOSE ABHI'S GIFTS?
          ========================================================================= */}
      <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 xl:px-16 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-amber-700 block">
            4. WHY SHOULD CUSTOMERS CHOOSE US?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Why Should Customers Choose Abhi&apos;s Gifts?
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            Customers choose Abhi&apos;s Gifts because we focus on quality, customization and customer satisfaction.
          </p>
        </div>

        {/* 7 Key Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {WHY_CHOOSE_US.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all hover:-translate-y-1 space-y-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-amber-700" />
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-amber-800 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            );
          })}

          {/* Closing Promise Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 via-white to-amber-50 text-stone-900 border-2 border-amber-300 shadow-xs flex flex-col justify-center space-y-2">
            <span className="text-[11px] font-mono text-amber-800 uppercase tracking-wider font-bold">
              OUR PROMISE
            </span>
            <p className="font-serif italic text-sm sm:text-base text-stone-900 leading-snug">
              &ldquo;Our goal is not just to sell a photo frame but to help customers preserve their memories beautifully.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. WHAT MAKES OUR PRODUCTS UNIQUE?
          ========================================================================= */}
      <section className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-12 xl:px-16 bg-stone-50 border-t border-b border-stone-200">
        <div className="max-w-6xl mx-auto space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-amber-700 block">
              5. WHAT MAKES OUR PRODUCTS UNIQUE?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
              What Makes Our Products Unique?
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans">
              Our products combine personalized photographs, modern designs and attractive presentation.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            <h3 className="text-sm font-mono uppercase font-bold text-amber-800 tracking-wider text-center">
              What makes our collection special:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {UNIQUE_FEATURES.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 hover:border-amber-400 transition-all shadow-2xs"
                >
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-amber-800" />
                  </div>
                  <span className="text-xs sm:text-sm text-stone-800 font-medium leading-relaxed font-sans">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center pt-2">
            <div className="inline-block bg-white border border-amber-300 px-6 py-3 rounded-full text-sm font-serif italic text-stone-900 font-bold shadow-xs">
              ✦ Every frame is created to make your memories look special.
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          6. OUR BUSINESS STORY
          ========================================================================= */}
      <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 xl:px-16 max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-amber-700 block">
            6. OUR BUSINESS STORY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Our Business Story
          </h2>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6 text-stone-700 text-sm sm:text-base leading-relaxed font-sans">
          <p className="text-base sm:text-lg font-serif italic text-stone-900 font-semibold border-b border-stone-100 pb-4">
            Abhi&apos;s Gifts started in 2022 with a simple idea: to turn ordinary photographs into extraordinary memories.
          </p>

          <p>
            We understood that photographs are more than just pictures. They represent emotions, relationships, celebrations and unforgettable moments.
          </p>

          <p>
            With this idea, we started creating personalized photo frames and gifting products for customers.
          </p>

          <p>
            Over time, we expanded our product collection with acrylic photo frames, LED frames, glitter frames and other customized gifting solutions.
          </p>

          <p>
            Today, Abhi&apos;s Gifts continues to focus on creativity, product quality and customer satisfaction.
          </p>

          <div className="p-6 rounded-2xl bg-amber-50 text-stone-900 text-center border border-amber-300 shadow-xs space-y-1">
            <span className="text-xs font-mono text-amber-800 uppercase tracking-widest font-bold block">
              OUR JOURNEY IS DRIVEN BY ONE BELIEF
            </span>
            <h3 className="font-serif italic text-xl sm:text-2xl text-amber-950 font-bold">
              &ldquo;Every Memory Deserves a Beautiful Frame.&rdquo;
            </h3>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. OUR EXPERIENCE IN THIS INDUSTRY
          ========================================================================= */}
      <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 xl:px-16 bg-stone-50 border-t border-b border-stone-200">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-amber-700 block">
              7. OUR EXPERIENCE IN THIS INDUSTRY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
              Our Experience in This Industry
            </h2>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans">
              Abhi&apos;s Gifts has been serving customers in the personalized photo frame and gifting industry since 2022.
            </p>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
              With experience in customized photo frame design, printing, acrylic products and personalized gifting, we understand the importance of quality, presentation and customer requirements.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase font-bold text-amber-800 tracking-wider text-center">
              Our experience includes:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {EXPERIENCE_PILLARS.map((exp, i) => {
                const Icon = exp.icon;
                return (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all space-y-2.5 group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-serif font-bold text-sm sm:text-base text-stone-900 group-hover:text-amber-800 transition-colors">
                        {exp.title}
                      </h4>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed font-sans pl-10">
                      {exp.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-center text-xs sm:text-sm text-stone-600 italic max-w-2xl mx-auto pt-2">
            We continuously work to improve our products, designs and services to meet changing customer expectations.
          </p>

        </div>
      </section>

      {/* =========================================================================
          OFFICIAL BUSINESS IDENTITY & CONTACT HUB
          ========================================================================= */}
      <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 xl:px-16 max-w-5xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 text-white border border-amber-400/40 shadow-2xl space-y-8 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          {/* Heading */}
          <div className="space-y-2 border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400 font-bold block">
                OFFICIAL BUSINESS DETAILS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">
                ABHI&apos;S GIFTS
              </h2>
              <p className="font-serif italic text-base sm:text-lg text-amber-200 mt-0.5">
                Frame Your Memories.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold self-start sm:self-auto">
              <span>Established 2022</span>
            </div>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm">
            
            {/* Location */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <MapPin className="w-4 h-4 shrink-0" />
                <span className="uppercase tracking-wider text-[11px] font-mono">Location</span>
              </div>
              <p className="text-stone-300 leading-relaxed font-sans">
                Dilsukhnagar, Hyderabad, Telangana – 500036.
              </p>
              <a
                href="https://maps.app.goo.gl/fmGv35KsGabFna9E6?g_st=ac"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 underline font-semibold pt-1"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Phone & WhatsApp */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#25D366] font-bold">
                <WhatsAppIcon className="w-4 h-4 fill-[#25D366] shrink-0" />
                <span className="uppercase tracking-wider text-[11px] font-mono">Phone / WhatsApp</span>
              </div>
              <a
                href={`https://wa.me/${cleanWaNumber}?text=Hello%20Abhi%27s%20Gifts%2C%20I%20would%20like%20to%20enquire%20about%20a%20custom%20photo%20frame.`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-200 hover:text-amber-300 text-sm font-bold block"
              >
                +91 77802 69927
              </a>
              <span className="text-[11px] text-stone-400 block">Fast WhatsApp consultation available 7 days</span>
            </div>

            {/* Email */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Mail className="w-4 h-4 shrink-0" />
                <span className="uppercase tracking-wider text-[11px] font-mono">Email</span>
              </div>
              <a
                href="mailto:support@abhisgifts.com"
                className="text-stone-200 hover:text-amber-300 text-sm font-bold block truncate"
              >
                support@abhisgifts.com
              </a>
              <span className="text-[11px] text-stone-400 block">General &amp; bulk order enquiries</span>
            </div>

            {/* Instagram */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <InstagramIcon className="w-4 h-4 text-white fill-current shrink-0" />
                <span className="uppercase tracking-wider text-[11px] font-mono">Instagram</span>
              </div>
              <a
                href="https://www.instagram.com/abhis_gifts_?cplk=MWtkNTJla2s3NTQw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-200 hover:text-amber-300 text-sm font-bold block"
              >
                @abhis_gifts_
              </a>
              <span className="text-[11px] text-stone-400 block">Follow for new designs &amp; custom customer reels</span>
            </div>

          </div>

          {/* Social Links & Action Row */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono text-stone-400">
              Established in 2022 • Dilsukhnagar, Hyderabad, Telangana – 500036
            </span>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-[#FEE815] hover:bg-[#FFF04B] text-stone-950 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Shop Frames</span>
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
