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
} from 'lucide-react';

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
        url: '/images/lifestyle/living-room.jpg',
        width: 1200,
        height: 630,
        alt: "Abhi's Gifts Studio - Dilsukhnagar, Hyderabad",
      },
    ],
  },
};

const SPECIALTIES = [
  {
    title: 'Premium Acrylic Photo Frames',
    description: 'High-density cast acrylic sheets with precision beveled edges for crystal clarity.',
    icon: Gem,
  },
  {
    title: 'LED Acrylic Photo Frames',
    description: 'Concealed warm LED illumination casting a soothing halo around your most treasured memories.',
    icon: Lightbulb,
  },
  {
    title: 'Customized Photo Frames',
    description: 'Bespoke designs tailored from your favourite high-resolution photographs and personal messages.',
    icon: Palette,
  },
  {
    title: 'Acrylic Frames with Studs',
    description: 'Sophisticated metal standoff studs delivering a floating 1-inch designer wall separation.',
    icon: ShieldCheck,
  },
  {
    title: 'Glitter Photo Frames',
    description: 'Luminous sparkle and metallic glitter effects adding celebration radiance to special portraits.',
    icon: Sparkles,
  },
  {
    title: 'Rotating Photo Lamps',
    description: 'Motorized 360-degree cylindrical lamps glowing warmly with multiple cherished photographs.',
    icon: RotateCw,
  },
  {
    title: 'Acrylic Photo Clocks',
    description: 'Functional timepiece and personalized artwork combined seamlessly on crystal acrylic.',
    icon: Clock,
  },
  {
    title: 'Personalized Birthday Gifts',
    description: 'Memorable birthday keepsakes capturing milestone celebrations with heartfelt customization.',
    icon: Gift,
  },
  {
    title: 'Wedding & Anniversary Frames',
    description: 'Eternal romantic displays immortalizing sacred wedding vows and anniversary celebrations.',
    icon: Heart,
  },
  {
    title: 'Couple & Love Photo Frames',
    description: 'Elegant dual portraits, song plaques, and romantic collages designed for couples.',
    icon: Smile,
  },
  {
    title: 'Baby & Family Photo Frames',
    description: 'Tender childhood milestones, newborn memories, and multi-generation family heirloom frames.',
    icon: Camera,
  },
  {
    title: 'God & Devotional Photo Frames',
    description: 'Consecrated deities rendered with golden foil detailing and soothing sanctum lighting.',
    icon: Flame,
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
    icon: MessageCircle,
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
    title: 'Customized photo frame production',
    desc: 'Precision laser cutting, CNC beveling, and cleanroom assembly for flawless edge clarity.',
  },
  {
    title: 'Acrylic and LED frame solutions',
    desc: 'Calibrated low-voltage LED guides delivering even light dispersion without glare or heat.',
  },
  {
    title: 'Personalized photo printing',
    desc: 'High-definition 1200 DPI archival micro-piezo printing with vibrant, fade-resistant pigments.',
  },
  {
    title: 'Glitter and decorative frame designs',
    desc: 'Artisanal embellishments and decorative textures that elevate ordinary prints into showpieces.',
  },
  {
    title: 'Customized gifting for different occasions',
    desc: 'Tailored solutions for birthdays, anniversaries, corporate milestones, and devotional altars.',
  },
  {
    title: 'Customer-focused product design & finishing',
    desc: '1:1 digital WhatsApp previews and responsive customer support before final fabrication.',
  },
];

export default function AboutPage() {
  return (
    <div className="w-full bg-[#121212] text-[#FFFFFF] font-sans selection:bg-[#FACC15] selection:text-[#FFFFFF]">
      
      {/* =========================================================================
          1. SHORT BUSINESS INTRODUCTION & HERO BANNER
          ========================================================================= */}
      <section className="relative w-full pt-12 sm:pt-16 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden bg-gradient-to-b from-[#121212] via-[#161616] to-[#121212] border-b border-[#2D2D2D]">
        {/* Soft Background Accents */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#FACC15]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#EAB308]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          
          {/* Official Brand Logo */}
          <div className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-gradient-to-r from-[#181818] via-[#222222] to-[#181818] border border-[#EAB308]/60 shadow-xl mx-auto mb-2">
            <Image
              src="/images/brand/logo-gold.png"
              alt="Abhi's Gifts - We Create Memorable Movements"
              width={300}
              height={63}
              priority
              className="h-12 sm:h-14 md:h-16 w-auto object-contain"
            />
          </div>

          {/* Overline Badge */}
          <div className="inline-flex items-center gap-2 bg-[#181818] border border-[#EAB308] px-4 py-1.5 rounded-full text-xs font-bold text-[#FACC15] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#FACC15] animate-pulse" />
            <span className="uppercase tracking-[0.2em] text-[11px] sm:text-xs">
              ESTABLISHED 2022 • DILSUKHNAGAR, HYDERABAD
            </span>
          </div>

          {/* Main Title & Official Tagline */}
          <div className="space-y-3">
            <h1 className="font-serif font-bold text-4xl sm:text-6xl lg:text-7xl text-[#FFFFFF] tracking-tight leading-[1.08]">
              ABOUT ABHI&apos;S GIFTS
            </h1>
            <p className="font-serif italic text-2xl sm:text-3xl text-[#EAB308] font-medium">
              &ldquo;Frame Your Memories.&rdquo;
            </p>
          </div>

          {/* Short Business Introduction Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#181818]/90 backdrop-blur-md border border-[#2D2D2D] shadow-xl max-w-3xl mx-auto space-y-4 text-left">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#EAB308] uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-[#EAB308]" />
              <span>1. Short Business Introduction</span>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-[#D1D5DB] leading-relaxed">
              <strong className="text-[#FFFFFF]">Abhi&apos;s Gifts</strong> is a premium personalized photo frame and gifting store based in <strong>Dilsukhnagar, Hyderabad</strong>. Established in <strong>2022</strong>, we specialize in premium acrylic photo frames, LED photo frames, customized photo frames, glitter frames, acrylic clocks and unique personalized gifts.
            </p>
            <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed pt-1 border-t border-[#2D2D2D]/60">
              Our goal is to turn your precious memories into beautiful, meaningful and long-lasting displays.
            </p>

            {/* Quick Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              <div className="p-2.5 rounded-xl bg-[#121212] border border-[#2D2D2D] text-center">
                <span className="block text-xs font-mono font-bold text-[#EAB308]">Est. 2022</span>
                <span className="text-[11px] text-[#D1D5DB]">Trusted Store</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#121212] border border-[#2D2D2D] text-center">
                <span className="block text-xs font-mono font-bold text-[#EAB308]">Hyderabad</span>
                <span className="text-[11px] text-[#D1D5DB]">Dilsukhnagar Hub</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#121212] border border-[#2D2D2D] text-center">
                <span className="block text-xs font-mono font-bold text-[#EAB308]">Acrylic &amp; LED</span>
                <span className="text-[11px] text-[#D1D5DB]">Modern Products</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#121212] border border-[#2D2D2D] text-center">
                <span className="block text-xs font-mono font-bold text-[#EAB308]">Customized</span>
                <span className="text-[11px] text-[#D1D5DB]">100% Personal</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#EAB308] hover:bg-[#FACC15] text-[#000000] font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full border border-[#EAB308] shadow-lg uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
            >
              <span>EXPLORE ALL COLLECTIONS</span>
              <ArrowRight className="w-4 h-4 text-[#FACC15]" />
            </Link>
            <a
              href="https://wa.me/919032372782?text=Hi%20Abhi%27s%20Gifts%2C%20I%20would%20like%20to%20order%20a%20personalized%20photo%20frame."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>CHAT ON WHATSAPP (+91 9032372782)</span>
            </a>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. COMPLETE BUSINESS DESCRIPTION & 12 CORE SPECIALTIES
          ========================================================================= */}
      <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 xl:px-16 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#EAB308] block">
            2. COMPLETE BUSINESS DESCRIPTION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFFFF] tracking-tight">
            Making Special Moments Unforgettable
          </h2>
          <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
            Abhi&apos;s Gifts is a personalized photo frame and gifting brand dedicated to making special moments unforgettable. Since 2022, we have been creating customized photo frames and premium gifting products that help people celebrate their most precious memories.
          </p>
        </div>

        {/* 12 Specialties Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#2D2D2D] pb-3">
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#FFFFFF]">
              We Specialize In:
            </h3>
            <span className="text-xs font-mono text-[#EAB308] font-bold">12 Signature Categories</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {SPECIALTIES.map((spec, i) => {
              const Icon = spec.icon;
              return (
                <div
                  key={i}
                  className="group p-5 rounded-2xl bg-[#181818] border border-[#2D2D2D] hover:border-[#EAB308] shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#1E1E1E] text-[#FACC15] flex items-center justify-center border border-[#EAB308]/50 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#EAB308] bg-[#121212] px-2 py-0.5 rounded-full border border-[#2D2D2D]">
                      #{String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#FFFFFF] group-hover:text-[#EAB308] transition-colors">
                    {spec.title}
                  </h4>
                  <p className="text-xs text-[#D1D5DB] leading-relaxed">
                    {spec.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Closing Narrative */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#181818] via-[#1E1E1E] to-[#181818] border border-[#2D2D2D] text-center max-w-4xl mx-auto space-y-3">
          <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
            We focus on quality materials, attractive designs, customization and careful finishing. Whether it is a birthday, wedding, anniversary, family celebration or a devotional space, we help you transform your favourite photographs into special keepsakes.
          </p>
          <p className="font-serif italic text-base sm:text-lg text-[#FFFFFF] font-bold">
            Located in Dilsukhnagar, Hyderabad, Abhi&apos;s Gifts aims to provide quality personalized gifting solutions with a convenient customer experience.
          </p>
        </div>
      </section>

      {/* =========================================================================
          3. OUR MISSION AND VISION (Side-by-Side Dual Pillar Cards)
          ========================================================================= */}
      <section className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-12 xl:px-16 bg-[#121212] text-[#FFFFFF] overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#EAB308]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#EAB308]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#FACC15] block">
              3. OUR MISSION AND VISION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFFFF] tracking-tight">
              Guided by Purpose &amp; Heart
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Mission Card */}
            <div className="relative p-8 sm:p-10 rounded-3xl bg-[#181818] border-2 border-[#EAB308]/60 shadow-2xl flex flex-col justify-between space-y-6 group hover:border-[#FACC15] transition-all">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#1E1E1E] text-[#FACC15] flex items-center justify-center border border-[#EAB308] shadow-lg">
                  <Compass className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#FACC15] font-bold">
                    OUR CORE PURPOSE
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
                    Our Mission
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
                  Our mission is to transform customers&apos; precious photographs into beautiful personalized frames and meaningful gifts through quality products, creative designs and reliable service.
                </p>
                <div className="p-4 rounded-2xl bg-black/30 border border-white/10 text-xs sm:text-sm font-serif italic text-[#FACC15]">
                  &ldquo;We aim to make personalized gifting easy, memorable and affordable for everyone.&rdquo;
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="relative p-8 sm:p-10 rounded-3xl bg-[#181818] border-2 border-[#EAB308]/60 shadow-2xl flex flex-col justify-between space-y-6 group hover:border-[#FACC15] transition-all">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#1E1E1E] text-[#FACC15] flex items-center justify-center border border-[#EAB308] shadow-lg">
                  <Eye className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#FACC15] font-bold">
                    OUR ASPIRATION
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
                    Our Vision
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
                  Our vision is to become a trusted and recognized personalized photo frame and gifting brand in Hyderabad and expand our presence across India.
                </p>
                <div className="p-4 rounded-2xl bg-black/30 border border-white/10 text-xs sm:text-sm font-serif italic text-[#FACC15]">
                  &ldquo;We want every special memory to have a beautiful place in people&apos;s homes and hearts.&rdquo;
                </div>
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
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#EAB308] block">
            4. WHY SHOULD CUSTOMERS CHOOSE US?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFFFF] tracking-tight">
            Why Choose Abhi&apos;s Gifts?
          </h2>
          <p className="text-sm sm:text-base text-[#D1D5DB]">
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
                className="p-6 rounded-2xl bg-white border border-[#2D2D2D] hover:border-[#EAB308] shadow-xs hover:shadow-lg transition-all hover:-translate-y-1 space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#121212] text-[#FFFFFF] flex items-center justify-center border border-[#2D2D2D]">
                  <Icon className="w-5 h-5 text-[#EAB308]" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#FFFFFF]">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}

          {/* 8th Closing Quote Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#121212] to-[#1E1E1E] text-[#FFFFFF] border border-[#EAB308] shadow-md flex flex-col justify-center space-y-2">
            <span className="text-[11px] font-mono text-[#FACC15] uppercase tracking-wider font-bold">
              OUR PROMISE
            </span>
            <p className="font-serif italic text-sm sm:text-base text-[#FFFFFF] leading-snug">
              &ldquo;Our goal is not just to sell a photo frame but to help customers preserve their memories beautifully.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. WHAT MAKES OUR PRODUCTS UNIQUE?
          ========================================================================= */}
      <section className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-12 xl:px-16 bg-[#121212] border-t border-b border-[#2D2D2D]">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#EAB308] block">
              5. PRODUCT UNIQUENESS &amp; EXCELLENCE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFFFF] tracking-tight">
              What Makes Our Products Unique?
            </h2>
            <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
              Our products combine personalized photographs, modern designs and attractive presentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {UNIQUE_FEATURES.map((feat, i) => (
              <div
                key={i}
                className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-[#121212] border border-[#2D2D2D] hover:border-[#EAB308] transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-[#1E1E1E] text-[#FACC15] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm text-[#D1D5DB] font-medium leading-relaxed">
                  {feat}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <div className="inline-block bg-[#1E1E1E] border border-[#EAB308]/30 px-6 py-3 rounded-full text-sm font-serif italic text-[#FFFFFF] font-bold shadow-xs">
              ✦ Every frame is created to make your memories look special.
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. OUR BUSINESS STORY
          ========================================================================= */}
      <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 xl:px-16 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#EAB308] block">
            6. OUR JOURNEY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFFFF] tracking-tight">
            Our Business Story
          </h2>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-[#181818] border border-[#2D2D2D] shadow-xl space-y-6 text-[#D1D5DB] text-sm sm:text-base leading-relaxed">
          <p className="text-base sm:text-lg font-serif italic text-[#FFFFFF] font-semibold">
            Abhi&apos;s Gifts started in 2022 with a simple idea: to turn ordinary photographs into extraordinary memories.
          </p>

          <p>
            We understood that photographs are more than just pictures. They represent emotions, relationships, celebrations and unforgettable moments.
          </p>

          <p>
            With this idea, we started creating personalized photo frames and gifting products for customers. Over time, we expanded our product collection with acrylic photo frames, LED frames, glitter frames and other customized gifting solutions.
          </p>

          <p>
            Today, Abhi&apos;s Gifts continues to focus on creativity, product quality and customer satisfaction.
          </p>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#121212] to-[#1E1E1E] text-[#FFFFFF] text-center border border-[#EAB308] shadow-lg space-y-1">
            <span className="text-xs font-mono text-[#FACC15] uppercase tracking-widest font-bold">
              OUR GUIDING BELIEF
            </span>
            <h3 className="font-serif italic text-xl sm:text-2xl text-[#FACC15] font-bold">
              &ldquo;Every Memory Deserves a Beautiful Frame.&rdquo;
            </h3>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. OUR EXPERIENCE IN THIS INDUSTRY
          ========================================================================= */}
      <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 xl:px-16 bg-gradient-to-b from-[#121212] to-[#141414] border-t border-b border-[#2D2D2D]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#EAB308] block">
              7. PROFESSIONAL EXPERTISE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFFFF] tracking-tight">
              Our Experience in This Industry
            </h2>
            <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
              Abhi&apos;s Gifts has been serving customers in the personalized photo frame and gifting industry since 2022. With experience in customized photo frame design, printing, acrylic products and personalized gifting, we understand the importance of quality, presentation and customer requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXPERIENCE_PILLARS.map((exp, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-[#2D2D2D] hover:border-[#EAB308] shadow-sm hover:shadow-lg transition-all space-y-2.5"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#EAB308]" />
                  <h3 className="font-serif font-bold text-base text-[#FFFFFF]">
                    {exp.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
                  {exp.desc}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center text-xs sm:text-sm text-[#D1D5DB] italic max-w-2xl mx-auto">
            We continuously work to improve our products, designs and services to meet changing customer expectations.
          </p>
        </div>
      </section>

      {/* =========================================================================
          8. OFFICIAL BUSINESS DETAILS & CONTACT HUB
          ========================================================================= */}
      <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 xl:px-16 max-w-5xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#121212] via-[#181818] to-[#141414] text-[#FFFFFF] border-2 border-[#EAB308] shadow-2xl space-y-8 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#EAB308]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Heading */}
          <div className="space-y-2 border-b border-white/10 pb-6">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FACC15] font-bold block">
              OFFICIAL BUSINESS IDENTITY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FFFFFF] tracking-tight">
              ABHI&apos;S GIFTS
            </h2>
            <p className="font-serif italic text-lg sm:text-xl text-[#FACC15]">
              Frame Your Memories.
            </p>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
            
            {/* Location */}
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
              <MapPin className="w-5 h-5 text-[#FACC15] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-mono text-[#FACC15] uppercase block font-bold">
                  Location
                </span>
                <p className="text-[#D1D5DB] mt-0.5">
                  Dilsukhnagar, Hyderabad, Telangana – 500036.
                </p>
              </div>
            </div>

            {/* Phone & WhatsApp */}
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
              <Phone className="w-5 h-5 text-[#FACC15] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-mono text-[#FACC15] uppercase block font-bold">
                  Phone / WhatsApp
                </span>
                <a
                  href="https://wa.me/919032372782"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D1D5DB] hover:text-[#FACC15] transition-colors mt-0.5 block font-semibold"
                >
                  +91 9032372782
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
              <Mail className="w-5 h-5 text-[#FACC15] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-mono text-[#FACC15] uppercase block font-bold">
                  Email Enquiries
                </span>
                <a
                  href="mailto:abhisgifts@gmail.com"
                  className="text-[#D1D5DB] hover:text-[#FACC15] transition-colors mt-0.5 block font-semibold"
                >
                  abhisgifts@gmail.com
                </a>
              </div>
            </div>

            {/* Instagram */}
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
              <Camera className="w-5 h-5 text-[#FACC15] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-mono text-[#FACC15] uppercase block font-bold">
                  Instagram
                </span>
                <a
                  href="https://instagram.com/abhis_gifts_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D1D5DB] hover:text-[#FACC15] transition-colors mt-0.5 block font-semibold"
                >
                  @abhis_gifts_
                </a>
              </div>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono text-[#FACC15]">
              Established in 2022 • Serving Hyderabad &amp; Shipping Across India
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-[#EAB308] hover:bg-[#FACC15] text-[#000000] font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-md transition-all hover:scale-105 active:scale-95"
              >
                <span>Shop Frames</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/customise"
                className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full border border-white/30 transition-all hover:scale-105 active:scale-95"
              >
                <span>Custom Studio</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
