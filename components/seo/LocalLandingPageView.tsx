import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  MapPin,
  Phone,
  MessageCircle,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Home,
  ArrowRight,
  Star,
  Layers,
  Award,
} from 'lucide-react';
import { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';
import { getBreadcrumbSchema, getLocalBusinessSchema, getFaqSchema } from '@/lib/seo/schema';

export interface LocalLandingPageProps {
  slug: string;
  keyword: string;
  h1Title: string;
  subtitle: string;
  metaDescription: string;
  locationName: string;
  introParagraphs: string[];
  whyChoosePoints: { title: string; desc: string }[];
  products: Product[];
  faqs: { question: string; answer: string }[];
  popularSizes: { size: string; idealFor: string; price: string }[];
}

export default function LocalLandingPageView({
  slug,
  keyword,
  h1Title,
  subtitle,
  locationName,
  introParagraphs,
  whyChoosePoints,
  products,
  faqs,
  popularSizes,
}: LocalLandingPageProps) {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Hyderabad Local Hub', url: '/#local-hub' },
    { name: h1Title, url: `/${slug}` },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const localBusinessSchema = getLocalBusinessSchema();
  const faqSchema = getFaqSchema(faqs);

  const whatsappMessage = encodeURIComponent(
    `Hi Abhi's Gifts! I am looking for ${keyword} in ${locationName}. Can you share catalogue, price list & custom size options?`
  );

  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 space-y-12 select-none">
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-stone-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[#641E2E] flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="text-[#A06E28] font-medium">Local Hyderabad Hub</span>
        <span>/</span>
        <span className="text-[#511B2A] font-semibold">{keyword}</span>
      </nav>

      {/* Hero Banner with Rich Local Context */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#2E141D] via-[#1E0910] to-[#120409] text-white p-6 sm:p-10 lg:p-14 border-2 border-[#D6AA55]/50 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D6AA55]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#641E2E]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-widest font-bold text-[#E8C77E] bg-[#511B2A]/90 border border-[#D6AA55]/60 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-[#E8C77E]" />
              <span>{locationName} • Telangana Certified Studio</span>
            </span>
            <span className="text-xs font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Direct Manufacturer • No Middlemen</span>
            </span>
          </div>

          <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#FFF7EC] leading-tight">
            {h1Title}
          </h1>

          <p className="text-sm sm:text-base text-[#E8D5BD]/90 leading-relaxed max-w-3xl font-sans">
            {subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-3">
            <a
              href={`https://wa.me/917780269927?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg flex items-center gap-2 transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Quick Quote &amp; Digital Proof</span>
            </a>

            <Link
              href="/customise"
              className="bg-white/10 hover:bg-white/20 text-[#FFF7ED] border border-[#D6AA55] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#E8C77E]" />
              <span>Upload Your Photo Online</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Local Store Highlights Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#FFF8EF] border border-[#E8D1A5] rounded-2xl p-4 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[#641E2E] text-[#E8C77E] flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-[#511B2A]">Same-Day Proof</h4>
            <p className="text-[11px] text-[#785E59]">1:1 WhatsApp digital preview before laser cutting</p>
          </div>
        </div>

        <div className="bg-[#FFF8EF] border border-[#E8D1A5] rounded-2xl p-4 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[#641E2E] text-[#E8C77E] flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-[#511B2A]">4mm Cast Acrylic</h4>
            <p className="text-[11px] text-[#785E59]">Virgin cast sheet • Diamond CNC beveled edges</p>
          </div>
        </div>

        <div className="bg-[#FFF8EF] border border-[#E8D1A5] rounded-2xl p-4 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[#641E2E] text-[#E8C77E] flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-[#511B2A]">Hyderabad Express</h4>
            <p className="text-[11px] text-[#785E59]">Store pickup in Dilsukhnagar &amp; city delivery</p>
          </div>
        </div>

        <div className="bg-[#FFF8EF] border border-[#E8D1A5] rounded-2xl p-4 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[#641E2E] text-[#E8C77E] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-[#511B2A]">100% Safe Transit</h4>
            <p className="text-[11px] text-[#785E59]">Free instant replacement if damaged</p>
          </div>
        </div>
      </section>

      {/* Detailed Editorial & Local Relevance */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8D1A5] shadow-sm space-y-6">
        <div className="max-w-3xl space-y-4">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#511B2A]">
            Why Hyderabad &amp; Dilsukhnagar Families Choose Abhi&apos;s Gifts
          </h2>
          {introParagraphs.map((para, idx) => (
            <p key={idx} className="text-xs sm:text-sm text-[#533C36] leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#E8D1A5]/50">
          {whyChoosePoints.map((point, idx) => (
            <div key={idx} className="space-y-2 p-4 rounded-xl bg-[#FFF8EF] border border-[#E8D1A5]/60">
              <div className="flex items-center gap-2 text-[#641E2E] font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{point.title}</span>
              </div>
              <p className="text-xs text-[#785E59] leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Curated Products Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-[#E8D1A5]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#A06E28]">
              FEATURED DESIGNS AVAILABLE IN HYDERABAD
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#511B2A] mt-1">
              Top Trending {keyword}
            </h2>
          </div>
          <Link
            href="/customise"
            className="text-xs sm:text-sm font-bold text-[#641E2E] hover:text-[#A06E28] flex items-center gap-1.5"
          >
            <span>Have your own photo? Customize here</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* Popular Sizing & Price Guide Table */}
      <section className="bg-gradient-to-br from-[#FFF8EF] to-[#F8EFE3] rounded-3xl p-6 sm:p-10 border border-[#E8D1A5] space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#A06E28]">
            TRANSPARENT WORKSHOP PRICING
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#511B2A] mt-1">
            Popular Photo Frame Sizes &amp; Pricing in Hyderabad
          </h2>
          <p className="text-xs sm:text-sm text-[#785E59] mt-1">
            Every frame includes high-definition optical UV printing, 4mm cast acrylic, diamond beveling, and heavy-duty stainless steel floating wall mount standoffs.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse bg-white rounded-2xl overflow-hidden shadow-xs">
            <thead>
              <tr className="bg-[#511B2A] text-[#FFF7EC]">
                <th className="py-3 px-4 font-semibold">Frame Dimensions</th>
                <th className="py-3 px-4 font-semibold">Recommended Space / Purpose</th>
                <th className="py-3 px-4 font-semibold">Workshop Price</th>
                <th className="py-3 px-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8D1A5]/50">
              {popularSizes.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#FFFDF9] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#511B2A]">{row.size}</td>
                  <td className="py-3 px-4 text-[#785E59]">{row.idealFor}</td>
                  <td className="py-3 px-4 font-bold text-[#641E2E]">{row.price}</td>
                  <td className="py-3 px-4">
                    <a
                      href={`https://wa.me/917780269927?text=${encodeURIComponent(
                        `Hi Abhi's Gifts, I want to order a ${row.size} frame (${row.price}) in ${locationName}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#A06E28] hover:underline"
                    >
                      Order on WhatsApp →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Local Store & Workshop Information */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8D1A5] grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#A06E28] bg-[#FFF8EF] border border-[#E8D1A5] px-3 py-1 rounded-full">
            <MapPin className="w-3.5 h-3.5 text-[#641E2E]" />
            <span>VISIT OUR STUDIO IN DILSUKHNAGAR</span>
          </div>

          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#511B2A]">
            Abhi&apos;s Gifts Studio
          </h2>

          <p className="text-xs sm:text-sm text-[#533C36] leading-relaxed">
            Customers in Hyderabad are warmly welcome to visit our workshop studio in Dilsukhnagar to inspect physical material samples, compare 4mm cast acrylic against traditional glass, test warm 3000K LED backlighting, and pick up custom orders directly.
          </p>

          <div className="space-y-2 text-xs sm:text-sm text-[#511B2A]">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#A06E28] shrink-0 mt-0.5" />
              <span><strong>Address:</strong> Main Road, Near Dilsukhnagar Metro Station, Dilsukhnagar, Hyderabad, Telangana 500060</span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#A06E28] shrink-0" />
              <span><strong>Hours:</strong> Mon - Sat: 10:00 AM – 9:00 PM | Sun: 11:00 AM – 8:00 PM</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#A06E28] shrink-0" />
              <span><strong>Direct Support:</strong> +91 77802 69927 (Calls &amp; WhatsApp)</span>
            </p>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <a
              href="https://maps.google.com/?q=Dilsukhnagar+Hyderabad+Telangana"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#511B2A] text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-[#641E2E] transition-colors"
            >
              Get Google Maps Directions
            </a>
            <a
              href="tel:+917780269927"
              className="border border-[#511B2A] text-[#511B2A] px-5 py-2.5 rounded-full text-xs font-bold hover:bg-[#FFF8EF] transition-colors"
            >
              Call Studio Now
            </a>
          </div>
        </div>

        {/* Coverage Neighborhoods */}
        <div className="bg-[#FFF8EF] rounded-2xl p-6 border border-[#E8D1A5] space-y-4">
          <h3 className="font-serif font-bold text-base sm:text-lg text-[#511B2A]">
            Fast Local Express Delivery Across Hyderabad &amp; Telangana
          </h3>
          <p className="text-xs text-[#785E59] leading-relaxed">
            We provide same-day or 24-48 hour courier and bike dispatch across all key Hyderabad localities:
          </p>

          <div className="flex flex-wrap gap-2 text-[11px] text-[#511B2A]">
            {[
              'Dilsukhnagar',
              'Kothapet',
              'LB Nagar',
              'Chaitanyapuri',
              'Malakpet',
              'Saroornagar',
              'Vanasthalipuram',
              'Amberpet',
              'Uppal',
              'Secunderabad',
              'Banjara Hills',
              'Jubilee Hills',
              'Madhapur',
              'Gachibowli',
              'Kukatpally',
              'Kondapur',
              'Miyapur',
              'Begumpet',
              'Charminar',
              'Attapur',
            ].map((area) => (
              <span
                key={area}
                className="bg-white px-2.5 py-1 rounded-full border border-[#E8D1A5] font-medium"
              >
                📍 {area}
              </span>
            ))}
          </div>

          <div className="pt-2 border-t border-[#E8D1A5]/60 text-xs text-[#785E59]">
            ⚡ <strong>Searching for a &quot;Photo Frame Shop Near Me&quot;?</strong> We are conveniently located right near Dilsukhnagar Metro. You can also order online with free home delivery.
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8D1A5] space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#A06E28]">
            LOCAL HYDERABAD FAQ
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#511B2A] mt-1">
            Frequently Asked Questions about {keyword}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-[#FFF8EF] border border-[#E8D1A5]/70 space-y-2">
              <h3 className="font-serif font-bold text-sm sm:text-base text-[#511B2A]">
                {faq.question}
              </h3>
              <p className="text-xs sm:text-sm text-[#785E59] leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Internal Navigation to Sister Pages */}
      <section className="bg-[#FFF8EF] rounded-2xl p-6 border border-[#E8D1A5] space-y-3">
        <h4 className="font-serif font-bold text-sm text-[#511B2A] uppercase tracking-wider">
          Explore Other Local Photo Frame Services in Hyderabad
        </h4>
        <div className="flex flex-wrap gap-3 text-xs">
          <Link href="/acrylic-photo-frames-hyderabad" className="underline hover:text-[#A06E28] font-medium">
            Acrylic Photo Frames in Hyderabad
          </Link>
          <span>•</span>
          <Link href="/photo-frames-dilsukhnagar" className="underline hover:text-[#A06E28] font-medium">
            Photo Frames in Dilsukhnagar
          </Link>
          <span>•</span>
          <Link href="/led-photo-frames-hyderabad" className="underline hover:text-[#A06E28] font-medium">
            LED Photo Frames in Hyderabad
          </Link>
          <span>•</span>
          <Link href="/acrylic-photo-frames-dilsukhnagar" className="underline hover:text-[#A06E28] font-medium">
            Acrylic Photo Frames Dilsukhnagar
          </Link>
          <span>•</span>
          <Link href="/customized-gifts-dilsukhnagar" className="underline hover:text-[#A06E28] font-medium">
            Customized Gifts in Dilsukhnagar
          </Link>
        </div>
      </section>
    </div>
  );
}
