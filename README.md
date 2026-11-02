# Abhi Gifts — Production E-Commerce Platform

A production-grade, full-stack e-commerce application for **Abhi Gifts**, featuring premium devotional and modern acrylic & LED wall art, custom photo frames, and a complete e-commerce experience.

Crafted with Next.js 14 App Router, TypeScript, Tailwind CSS, Mongoose / MongoDB Atlas, Jose JWT Admin Authentication, Zod, and Canvas Custom Photo Framing.

---

## Key Features

### 1. Storefront & Sacred Catalog
- **Sacred Devotional Art:** Lord Venkateswara (Tirupati Balaji), Adiyogi Shiva & Shiv Parivar, Vighnaharta Ganesha, Veer Hanuman & Hanuman Chalisa, Shri Ram & Ayodhya Mandir, Goddess Mahalakshmi, Radha Krishna, Lord Murugan, and Swami Ayyappa.
- **Illuminated Wall Art Styles:** LED Backlit Wall Art (warm 3000K golden halo), 4mm Museum Crystal Acrylic panels, Liquid Gold Marble Abstracts, and Modern Botanical Triptychs.
- **Dynamic Product Variant Selector:** Interactive recalculation of prices, MRP discounts, dimensions (12x18" to 30x48"), and finish types.
- **Instant Pincode Delivery Checker:** Live transit estimation for Indian pincodes.
- **Live Search with Suggestions:** Instant debounced product and deity search dropdown.
- **Product Reviews & Ratings:** Verified buyer reviews with star ratings and live submission form.

### 2. Dedicated Custom Photo Frame Studio (`/customise`)
- Interactive studio to turn personal wedding, family, or couple photos into frameless acrylic or backlit LED heirlooms.
- **File Upload & Validation:** Supports JPEG, PNG, WebP up to 15MB with client-side format checks.
- **Interactive Wall Canvas:** Pan, zoom, and rotate photo with living room, pooja mandir, and studio lighting simulation.
- **Custom Inscription:** Add family names, anniversary dates, or Sanskrit mantras to appear on the finished artwork.
- **Live Pricing:** Calculated instantly based on dimensions, orientation, and LED options.

### 3. Shopping Bag & Checkout
- **Slide-Over Bag & Dedicated Cart Page:** Item preview, variant details, quantity controls, and custom photo thumbnails.
- **Free Delivery Progress Meter:** Visual indicator showing amount remaining to unlock free pan-India shipping.
- **Verified Promo Coupons:** Server-side coupon verification (`WELCOME10`, `ABHI500`, `FESTIVE15`).
- **Encrypted Checkout:** 2-step checkout collecting shipping address and payment method.
- **Payment Methods Supported:**
  * Cash on Delivery (COD)
  * Razorpay Online Payment (UPI, Credit/Debit Cards, NetBanking, Wallets)
- **Idempotent Order Creation:** Unique tracking IDs (e.g. `AG-2026-XXXXX`).

### 4. Order Confirmation & Live Tracking
- **Order Confirmation Page (`/order-confirmation/[orderId]`):** Confetti celebration, printable digital invoice, WhatsApp order update trigger.
- **Live Status Tracking (`/track-order`):** 6-stage visual timeline (*Confirmed* -> *Framing & Production* -> *Quality Checked* -> *Shipped* -> *Out for Delivery* -> *Delivered*), courier partner name, and AWB tracking number.

### 5. Protected Admin Dashboard (`/admin`)
- **Dashboard Overview:** KPI stats (Total Revenue, Total Orders, In-Production Orders, Active Products) and recent orders.
- **Product Manager (`/admin/products`):** Create, edit, and delete products, manage multi-size variants, SKUs, and featured/bestseller badges.
- **Order Manager (`/admin/orders`):** Search by customer or Order ID, update fulfilment status, record courier & AWB tracking codes, and export orders to CSV.
- **Category Manager (`/admin/categories`):** Manage collection banners, slugs, and grouping.
- **Promotion & Coupon Manager (`/admin/coupons`):** Create percentage or flat discounts with minimum order thresholds.
- **Customers & Enquiries (`/admin/customers`):** View customer order directory and reply to `/contact` messages.
- **Review Moderation (`/admin/reviews`):** Moderate customer reviews.
- **Store Settings (`/admin/settings`):** Live announcement banner text, WhatsApp hotline, shipping rates, and GST information.

---

## Technology Stack

- **Framework:** Next.js 14 (App Router, Server & Client Components)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS with custom Indian heritage color tokens (Warm Ivory, Terracotta, Metallic Gold, Deep Navy)
- **Icons:** Lucide React
- **Database & Data Layer:** Mongoose with MongoDB Atlas support + Resilient in-memory singleton cache with full CRUD fallback
- **Authentication:** Edge-compatible JWT via `jose` + `bcryptjs` password hashing + secure HttpOnly cookies
- **Validation:** Zod schemas for order and API verification
- **Effects:** Canvas Confetti for celebrations

---

## Getting Started

### 1. Installation
Clone the repository and install dependencies:
\`\`\`bash
npm install
\`\`\`

### 2. Environment Variables
Copy `.env.example` to `.env.local`:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Set your credentials or leave them blank to use the built-in resilient demo mode:
\`\`\`env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/abhi_gifts
ADMIN_JWT_SECRET=abhi-gifts-super-secure-production-jwt-key-2026
RAZORPAY_KEY_ID=rzp_test_YourTestKeyId123
RAZORPAY_KEY_SECRET=YourRazorpaySecretKeyHere
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
\`\`\`

### 3. Run Development Server
\`\`\`bash
npm run dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Staff & Admin Portal Credentials

- **URL:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Email:** `admin@abhigifts.com`
- **Password:** `AbhiGifts@2026!Admin`

---

## Active Discount Codes for Testing

- `WELCOME10`: 10% instant discount (Min. order ₹1,999)
- `ABHI500`: Flat ₹500 off (Min. order ₹3,999)
- `FESTIVE15`: 15% festive discount (Min. order ₹4,999)

---

## Verification & Build
To verify type safety and build for production:
\`\`\`bash
npm run build
\`\`\`
