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
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 space-y-12 bg-white text-stone-900 select-none">
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
        <Link href="/" className="hover:text-stone-900 flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="text-amber-700 font-medium">Local Hyderabad Hub</span>
        <span>/</span>
        <span className="text-stone-900 font-semibold">{keyword}</span>
      </nav>

      {/* Hero Banner with Rich Local Context */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-50 via-white to-amber-50 text-stone-900 p-6 sm:p-10 lg:p-14 border-2 border-amber-300 shadow-sm">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#EAB308]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-widest font-bold text-stone-900 bg-white border border-amber-300 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>{locationName} • Telangana Certified Studio</span>
            </span>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Direct Manufacturer • No Middlemen</span>
            </span>
          </div>

          <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-stone-900 leading-tight">
            {h1Title}
          </h1>

          <p className="text-sm sm:text-base text-stone-700 leading-relaxed max-w-3xl font-sans">
            {subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-3">
            <a
              href={`https://wa.me/917780269927?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-md flex items-center gap-2 transition-all hover:scale-105 cursor-pointer uppercase tracking-wider"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Quick Quote &amp; Digital Proof</span>
            </a>

            <Link
              href="/customise"
              className="bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full transition-all flex items-center gap-2 cursor-pointer shadow-xs uppercase tracking-wider"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Upload Your Photo Online</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Local Store Highlights Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-stone-900">Same-Day Proof</h4>
            <p className="text-[11px] text-stone-500">1:1 WhatsApp digital preview before laser cutting</p>
          </div>
        </div>

        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-stone-900">Premium Cast Acrylic</h4>
            <p className="text-[11px] text-stone-500">Virgin cast sheet • Precision beveled edges</p>
          </div>
        </div>

        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-stone-900">Hyderabad Express</h4>
            <p className="text-[11px] text-stone-500">Store pickup in Dilsukhnagar &amp; city delivery</p>
          </div>
        </div>

        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-stone-900">Careful Packaging</h4>
            <p className="text-[11px] text-stone-500">protective multi-layer packaging</p>
          </div>
        </div>
      </section>

      {/* Detailed Editorial & Local Relevance */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-6">
        <div className="max-w-3xl space-y-4">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
            Why Hyderabad &amp; Dilsukhnagar Families Choose Abhi&apos;s Gifts
          </h2>
          {introParagraphs.map((para, idx) => (
            <p key={idx} className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-stone-200">
          {whyChoosePoints.map((point, idx) => (
            <div key={idx} className="space-y-2 p-4 rounded-xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{point.title}</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Curated Products Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-stone-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              FEATURED DESIGNS AVAILABLE IN HYDERABAD
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 mt-1">
              Top Trending {keyword}
            </h2>
          </div>
          <Link
            href="/customise"
            className="text-xs sm:text-sm font-bold text-stone-800 hover:text-amber-700 flex items-center gap-1.5 transition-colors"
          >
            <span>Have your own photo? Customize here</span>
            <ArrowRight className="w-4 h-4 text-amber-600" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* Popular Sizing & Price Guide Table */}
      <section className="bg-stone-50 rounded-3xl p-6 sm:p-10 border border-stone-200 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
            TRANSPARENT WORKSHOP PRICING
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 mt-1">
            Popular Photo Frame Sizes &amp; Pricing in Hyderabad
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Every frame includes high-definition optical UV printing, cast acrylic, precision beveling, and heavy-duty stainless steel floating wall mount standoffs.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse bg-white rounded-2xl overflow-hidden shadow-xs border border-stone-200">
            <thead>
              <tr className="bg-stone-100 text-stone-900 border-b border-stone-200">
                <th className="py-3 px-4 font-semibold">Frame Dimensions</th>
                <th className="py-3 px-4 font-semibold">Recommended Space / Purpose</th>
                <th className="py-3 px-4 font-semibold">Workshop Price</th>
                <th className="py-3 px-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {popularSizes.map((row, idx) => (
                <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-stone-900">{row.size}</td>
                  <td className="py-3 px-4 text-stone-600">{row.idealFor}</td>
                  <td className="py-3 px-4 font-bold text-stone-900">{row.price}</td>
                  <td className="py-3 px-4">
                    <a
                      href={`https://wa.me/917780269927?text=${encodeURIComponent(
                        `Hi Abhi's Gifts, I want to order a ${row.size} frame (${row.price}) in ${locationName}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-amber-700 hover:underline"
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
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow-sm">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            <span>VISIT OUR STUDIO IN DILSUKHNAGAR</span>
          </div>

          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
            Abhi&apos;s Gifts Studio
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Customers in Hyderabad are warmly welcome to visit our workshop studio in Dilsukhnagar to inspect physical material samples, inspect physical acrylic samples, compare against traditional glass, test warm LED backlighting, and pick up custom orders directly.
          </p>

          <div className="space-y-2 text-xs sm:text-sm text-stone-800">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span><strong>Address:</strong> Main Road, Near Dilsukhnagar Metro Station, Dilsukhnagar, Hyderabad, Telangana 500060</span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span><strong>Hours:</strong> Mon - Sat: 10:00 AM – 9:00 PM | Sun: 11:00 AM – 8:00 PM</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-600 shrink-0" />
              <span><strong>Direct Support:</strong> +91 77802 69927 (Calls &amp; WhatsApp)</span>
            </p>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <a
              href="https://maps.google.com/?q=Dilsukhnagar+Hyderabad+Telangana"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#EAB308] text-stone-950 px-5 py-2.5 rounded-full text-xs font-bold hover:bg-[#FACC15] transition-colors border border-amber-500 uppercase tracking-wider cursor-pointer"
            >
              Get Google Maps Directions
            </a>
            <a
              href="tel:+917780269927"
              className="border border-stone-300 text-stone-800 px-5 py-2.5 rounded-full text-xs font-bold hover:bg-stone-50 transition-colors uppercase tracking-wider cursor-pointer"
            >
              Call Studio Now
            </a>
          </div>
        </div>

        {/* Coverage Neighborhoods */}
        <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-4">
          <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900">
            Local Hyderabad Studio Service &amp; Dispatch
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            We provide prompt workshop dispatch across all key Hyderabad localities:
          </p>

          <div className="flex flex-wrap gap-2 text-[11px] text-stone-800">
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
                className="bg-white px-2.5 py-1 rounded-full border border-stone-200 font-medium shadow-xs"
              >
                📍 {area}
              </span>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-200 text-xs text-stone-600">
            ⚡ <strong>Searching for a &quot;Photo Frame Shop Near Me&quot;?</strong> We are conveniently located right near Dilsukhnagar Metro. You can also order online with free home delivery.
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 space-y-6 shadow-sm">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
            LOCAL HYDERABAD FAQ
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 mt-1">
            Frequently Asked Questions about {keyword}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900">
                {faq.question}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Internal Navigation to Sister Pages */}
      <section className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-3">
        <h4 className="font-serif font-bold text-sm text-stone-900 uppercase tracking-wider">
          Explore Other Local Photo Frame Services in Hyderabad
        </h4>
        <div className="flex flex-wrap gap-3 text-xs">
          <Link href="/acrylic-photo-frames-hyderabad" className="underline text-stone-700 hover:text-amber-700 font-medium">
            Acrylic Photo Frames in Hyderabad
          </Link>
          <span>•</span>
          <Link href="/photo-frames-dilsukhnagar" className="underline text-stone-700 hover:text-amber-700 font-medium">
            Photo Frames in Dilsukhnagar
          </Link>
          <span>•</span>
          <Link href="/led-photo-frames-hyderabad" className="underline text-stone-700 hover:text-amber-700 font-medium">
            LED Photo Frames in Hyderabad
          </Link>
          <span>•</span>
          <Link href="/acrylic-photo-frames-dilsukhnagar" className="underline text-stone-700 hover:text-amber-700 font-medium">
            Acrylic Photo Frames Dilsukhnagar
          </Link>
          <span>•</span>
          <Link href="/customized-gifts-dilsukhnagar" className="underline text-stone-700 hover:text-amber-700 font-medium">
            Customized Gifts in Dilsukhnagar
          </Link>
        </div>
      </section>
    </div>
  );
}
