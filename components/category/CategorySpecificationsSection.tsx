'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Layers,
  Ruler,
  Zap,
  HelpCircle,
  Info,
  Clock,
  Truck,
  Heart,
  Flame,
  Award,
} from 'lucide-react';
import { CATEGORY_SLUG_ALIASES } from '@/lib/data/categories';

interface CategorySpecificationsSectionProps {
  categorySlug: string;
  categoryName?: string;
}

interface SpecItem {
  label: string;
  value: string;
}

interface SizeGuideItem {
  size: string;
  sqft: string;
  placement: string;
  w: string;
  h: string;
}

interface CraftHighlight {
  title: string;
  desc: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface CategoryProfile {
  techBadge: string;
  specBadge: string;
  techTitle: string;
  techIntro1: string;
  techIntro2: string;
  benefits: string[];
  card1Title: string;
  card1Desc: string;
  card2Title: string;
  card2Points: string[];
  sectionTitle: string;
  storyHeading: string;
  storySubheading: string;
  storyCardTitle: string;
  storyParagraphs: string[];
  storyBannerText: string;
  placementTitle: string;
  placementText: string;
  specs: SpecItem[];
  sizing: SizeGuideItem[];
  craftHighlights: CraftHighlight[];
  mountSteps: { step: number; title: string; desc: string }[];
  faqs: FaqItem[];
}

const CATEGORY_PROFILES: Record<string, CategoryProfile> = {
  'acrylic-photo-frames': {
    techBadge: 'Direct UV Technology',
    specBadge: '5MM Crystal Acrylic • Non-LED',
    techTitle: 'Advanced Direct UV Printing Technology',
    techIntro1:
      'Our Acrylic Frames are produced using advanced Direct UV Printing Technology, where high-quality UV-curable inks are printed directly onto the acrylic surface.',
    techIntro2:
      'Unlike traditional paper prints or separately pasted photo sheets, the artwork is printed directly onto the acrylic, creating a clean, premium and seamless appearance. Combined with premium 5MM thick crystal-clear acrylic, this printing process gives your wall art a sophisticated and elegant appearance.',
    benefits: [
      'Direct printing onto the acrylic surface.',
      'High-definition image reproduction with sharp details.',
      'Vibrant colours and rich visual depth.',
      'Excellent colour reproduction.',
      'Smooth and premium print finish.',
      'UV-curable inks cured instantly using UV light.',
      'No separate paper print or photo sheet required.',
    ],
    card1Title: 'Precision Square Cut Edges',
    card1Desc:
      'Every Acrylic Frame features clean, precision square-cut edges, maintaining a sharp and minimal geometric appearance that complements modern interiors.',
    card2Title: 'Installation Studs Included',
    card2Points: [
      'Premium Metal Mounting Studs Included.',
      'Wall Mounting Hardware Provided with Every Frame.',
      'No need to purchase mounting studs separately.',
      'Easy, elegant floating-style wall installation.',
    ],
    sectionTitle: 'Acrylic Specifications & Product Details',
    storyHeading: 'Acrylic Product Description & Story',
    storySubheading: 'Premium 5MM crystal clear acrylic, UV direct print & modern wall styling',
    storyCardTitle: 'Premium 5MM Crystal Clear Acrylic Wall Art',
    storyParagraphs: [
      'Upgrade your walls with our Premium 5MM Crystal Clear Acrylic Frames, designed to bring elegance, clarity, and a luxurious gallery appearance to your interiors.',
      'Each frame is crafted using 5MM thick crystal-clear acrylic and advanced Direct UV Printing Technology. The artwork is printed directly onto the acrylic surface, delivering high-definition image quality, vibrant colours, and sharp details.',
      'The premium glossy finish enhances the depth of the artwork, while precision square-cut edges provide a clean, modern aesthetic.',
      'Every frame comes with premium metal wall mounting studs included, making wall installation convenient and giving your artwork an elegant floating appearance.',
    ],
    storyBannerText: 'Premium Quality • Advanced Direct UV Printing • Precision Square-Cut Edges • Metal Studs Included',
    placementTitle: 'Placement & Interior Styling Guidance',
    placementText:
      'Ideal for installation in living rooms, bedrooms, modern offices, gallery corridors, and pooja rooms to elevate your space with timeless elegance.',
    specs: [
      { label: 'Material', value: 'Premium Crystal Clear Acrylic' },
      { label: 'Thickness', value: '5MM Premium Acrylic (Rigid & Deep)' },
      { label: 'Printing Technology', value: 'Advanced Direct UV Printing' },
      { label: 'Print Quality', value: 'High-Definition UV Printing (1440 DPI)' },
      { label: 'Print Method', value: 'Direct Printing on Acrylic Surface (No Paper / Peeling)' },
      { label: 'Colour Quality', value: 'Vibrant Colours & Razor-Sharp Details' },
      { label: 'Finish', value: 'Diamond Polished Ultra-Glossy Finish' },
      { label: 'Edges', value: 'Precision Square Cut Minimal Edges' },
      { label: 'Mounting Hardware', value: 'Premium Metal Wall Mounting Studs Included' },
      { label: 'Installation', value: 'Mounting Studs, Plugs & Screws Included with Every Frame' },
      { label: 'Lighting', value: 'Pure Non-LED Art' },
      { label: 'Customization', value: 'Custom Sizes 12 to 60 inches Available' },
      { label: 'Recommended Placement', value: 'Living Room, Bedroom, Office, Home Decor and Pooja Room' },
    ],
    sizing: [
      { size: '12 × 18 In', sqft: '1.5 sq.ft', placement: 'Pooja Mandir or Entry Foyer', w: 'w-10', h: 'h-14' },
      { size: '16 × 24 In', sqft: '2.6 sq.ft', placement: 'Corridor & Dining Wall', w: 'w-12', h: 'h-18' },
      { size: '20 × 30 In', sqft: '4.2 sq.ft', placement: 'Above 3-Seater Sofa / Bed', w: 'w-14', h: 'h-20' },
      { size: '24 × 36 In', sqft: '6.0 sq.ft', placement: 'Grand Living Room Centerpiece', w: 'w-16', h: 'h-22' },
    ],
    craftHighlights: [
      { title: '5MM Premium Acrylic', desc: 'Crafted exclusively with 5MM thick crystal-clear acrylic for rich visual depth and rigidity.' },
      { title: 'Advanced Direct UV Printing', desc: 'High-definition UV-curable inks printed directly onto the acrylic surface with instant curing.' },
      { title: 'Precision Square Cut Edges', desc: 'Clean, precision square-cut edges maintaining a sharp, minimal geometric design.' },
      { title: 'Metal Installation Studs Included', desc: 'Premium metal wall mounting studs and hardware included with every frame for a floating look.' },
    ],
    mountSteps: [
      { step: 1, title: 'Mark & Drill', desc: 'Align frame to your desired wall height and mark the drill hole positions accurately.' },
      { step: 2, title: 'Mount Stud Barrels', desc: 'Fasten the metal mounting stud barrels firmly to the wall with included wall plugs and screws.' },
      { step: 3, title: 'Fasten & Float', desc: 'Position acrylic frame onto studs and hand-tighten the screw caps for an elegant floating look.' },
    ],
    faqs: [
      { q: 'Is this paper pasted on acrylic or direct print?', a: 'This is 100% Direct UV Printing directly on the acrylic surface with UV-cured inks. There is zero paper sheet or risk of peeling.' },
      { q: 'Are mounting studs provided in the box?', a: 'Yes! All 4 stainless steel standoff studs, wall plugs, and screws are included inside the box for immediate installation.' },
      { q: 'How do I clean and maintain the frame?', a: 'Simply wipe gently with a soft dry or slightly damp microfiber cloth. Avoid abrasive detergents or alcohol wipes.' },
      { q: 'Can I order custom dimensions?', a: 'Yes! We craft frames from 12x18 inches up to 6x4 feet at our Dilsukhnagar workshop. WhatsApp us for custom sizes.' },
    ],
  },

  'led-acrylic-photo-frames': {
    techBadge: 'LED Halo Technology',
    specBadge: '5MM Virgin Cast Acrylic • Cool White LED',
    techTitle: 'Illuminated LED Halo & Direct UV Engineering',
    techIntro1:
      'Our LED Photo Frames combine Imported Clear Virgin Cast Acrylic with advanced Direct UV Printing and a luxury Rose Gold Aluminium Side Border.',
    techIntro2:
      'An integrated high-efficiency 6500K Cool White LED core casts a soft, even halo glow that illuminates your photos with breathtaking depth and elegance, day and night. Low-voltage 12V BIS-certified adapter included.',
    benefits: [
      'Imported Clear Virgin Cast Acrylic with 92% optical clarity.',
      'Precision Direct UV Printing cured with high-density pigments.',
      'Integrated 6500K Cool White LED backlighting for uniform edge illumination.',
      'Luxury brushed Rose Gold Aluminium side frame for structural prestige.',
      'Low-voltage, energy-efficient 12V Bureau of Indian Standards power adapter included.',
      'Concealed cable channel for a clean, floating aesthetic on any wall.',
      'Zero heat emission; safe for continuous 24/7 ambient display.',
    ],
    card1Title: 'Rose Gold Aluminium Border',
    card1Desc:
      'Precision-engineered aerospace-grade aluminium frame in elegant rose gold that protects acrylic edges while enhancing wall depth.',
    card2Title: 'Complete 12V Power Kit Included',
    card2Points: [
      '12V BIS-certified adapter with 2-meter power cable included.',
      'Wall mounting plugs and heavy-duty screws provided.',
      'No need to purchase external drivers or lighting accessories.',
      'Plug-and-play installation with standard 2-pin wall socket.',
    ],
    sectionTitle: 'LED Photo Frame Specifications & Details',
    storyHeading: 'LED Photo Frame Description & Glow',
    storySubheading: 'Virgin cast acrylic, Cool White halo glow & brushed Rose Gold aluminium border',
    storyCardTitle: 'Illuminated LED Backlit Acrylic Wall Art',
    storyParagraphs: [
      'Transform your space with our Illuminated LED Photo Frames. By combining optical-grade cast acrylic with perimeter-diffused Cool White LEDs, memories radiate with lifelike vibrancy.',
      'The rose gold aluminium frame adds structural rigidity while the concealed 12V halo system creates an ethereal ambient aura on your walls.',
      'Each frame is hand-assembled in Hyderabad and pre-tested for 48 hours continuous burn-in before dispatch to ensure lifetime reliability.',
    ],
    storyBannerText: 'Cool White LED Halo Glow • 5MM Virgin Cast Acrylic • Rose Gold Aluminium • 12V Adapter Included',
    placementTitle: 'Living Room & Bedroom Ambient Guidance',
    placementText:
      'Ideal as a glowing accent above master beds, living room sofas, pooja rooms, and reception lobbies. Doubles as a gentle night lamp.',
    specs: [
      { label: 'Acrylic Type', value: 'Imported Clear Virgin Cast Acrylic' },
      { label: 'Thickness', value: '5MM Optical Grade Cast Acrylic' },
      { label: 'Side Frame', value: 'Luxury Brushed Rose Gold Aluminium' },
      { label: 'Lighting System', value: 'Integrated Cool White 6500K LED Halo Glow' },
      { label: 'Power Supply', value: 'External 12V DC BIS-Certified Adapter Included' },
      { label: 'Cable Length', value: '2-Meter Flexible White Power Cord' },
      { label: 'Print Method', value: 'Direct UV Surface Inks with Opaque Backing' },
      { label: 'Wall Mounting', value: 'Heavy-Duty Keyhole Brackets & Screws Included' },
      { label: 'Operating Life', value: '50,000+ Hours Continuous LED Rating' },
      { label: 'Energy Consumption', value: 'Ultra-Low 12W Power Consumption' },
    ],
    sizing: [
      { size: '12 × 18 In', sqft: '1.5 sq.ft', placement: 'Bedside Night Accent / Foyer', w: 'w-10', h: 'h-14' },
      { size: '16 × 24 In', sqft: '2.6 sq.ft', placement: 'Bedroom Headboard / Dining Wall', w: 'w-12', h: 'h-18' },
      { size: '20 × 30 In', sqft: '4.2 sq.ft', placement: 'Above 3-Seater Living Room Sofa', w: 'w-14', h: 'h-20' },
      { size: '24 × 36 In', sqft: '6.0 sq.ft', placement: 'Grand Feature Wall Centerpiece', w: 'w-16', h: 'h-22' },
    ],
    craftHighlights: [
      { title: 'Virgin Cast Acrylic Core', desc: 'Superior light transmission without clouding or edge distortion over time.' },
      { title: 'Rose Gold Aluminium Frame', desc: 'Anodized side casing protects wiring and provides structural luxury.' },
      { title: 'Cool White 6500K LED', desc: 'Balanced halo illumination that brings out vivid contrast in your photographs.' },
      { title: '12V Safe Power Adapter', desc: 'Short-circuit protected external adapter with universal Indian plug.' },
    ],
    mountSteps: [
      { step: 1, title: 'Mount Wall Brackets', desc: 'Drill and install the heavy-duty wall plugs and screws at the marked level.' },
      { step: 2, title: 'Hang Frame', desc: 'Slot the rear keyhole brackets securely over the mounting screws.' },
      { step: 3, title: 'Plug & Illuminate', desc: 'Connect the 12V power adapter to the discreet lower socket and switch on the halo glow.' },
    ],
    faqs: [
      { q: 'Is the power adapter included in the price?', a: 'Yes! Every LED frame arrives with an external 12V BIS-certified adapter with a 2-meter power cable.' },
      { q: 'Can I keep the LED on all night?', a: 'Yes. The LEDs run on cool low-voltage 12V power with virtually no heat generation, making it safe for 24/7 continuous use.' },
      { q: 'What happens if the LEDs fail?', a: 'Our LEDs are rated for 50,000+ hours (over 6 years of continuous 24/7 usage). We also provide repair and service support at our Hyderabad workshop.' },
      { q: 'Is the side frame plastic or metal?', a: 'It is genuine aerospace-grade brushed aluminium in a luxury rose gold finish, not cheap painted plastic.' },
    ],
  },

  'glitter-photo-frames': {
    techBadge: 'Liquid Shimmer Technology',
    specBadge: 'Floating Gold & Diamond Glitter • Optical Acrylic',
    techTitle: 'Enchanted Liquid Gold Shimmer Craftsmanship',
    techIntro1:
      'Our Glitter Photo Frames feature an innovative sealed liquid chamber filled with floating 24K liquid gold particles and diamond-faceted micro-shimmer.',
    techIntro2:
      'Every gentle tilt creates a dynamic, sparkling cascade around your photographs, transforming milestone portraits and wedding memories into living, luminous heirlooms.',
    benefits: [
      'Hermetically sealed crystal chamber engineered to prevent leaks or evaporation.',
      'High-purity suspended gold and diamond-cut micro-particles with eternal float time.',
      'Twin layers of 5MM optical-clarity cast acrylic for crystal-deep refraction.',
      'Ultra-high resolution 1440 DPI photographic print core embedded within.',
      'Dual desktop easel display and integrated flush wall-hanging hardware.',
      'Scratch-resistant outer acrylic face with diamond-polished beveled borders.',
      'Perfect luxury gift packaging with velvet protective pouch included.',
    ],
    card1Title: 'Dynamic Shimmer Cascade',
    card1Desc:
      'Floating particles move freely in crystal mineral fluid, creating a gentle sparkling cascade every time the frame is viewed.',
    card2Title: 'Dual Display System Included',
    card2Points: [
      'Free-standing desktop display base included.',
      'Reinforced wall hanging brackets provided.',
      'Effortless transition between desk and wall.',
      'Stable self-standing base for tabletops & consoles.',
    ],
    sectionTitle: 'Glitter Frame Specifications & Product Details',
    storyHeading: 'Glitter Photo Frame Story & Magic',
    storySubheading: 'Floating liquid gold & diamond particles suspended in crystal optical acrylic',
    storyCardTitle: 'Enchanted Liquid Shimmer Keepsake Frame',
    storyParagraphs: [
      'Celebrate life’s most radiant milestones with our Enchanted Liquid Gold Glitter Frames. Specially calibrated mineral fluid allows faceted shimmer flakes to cascade slowly across your picture.',
      'Ideal for wedding portraits, anniversary gifts, baby milestone captures, and festive keepsakes that catch ambient light from every angle.',
    ],
    storyBannerText: 'Floating Liquid Gold • Diamond Micro-Shimmer • Hermetically Sealed • Dual Desktop & Wall Mount',
    placementTitle: 'Desktop, Console & Vanity Guidance',
    placementText:
      'Stunning on bedside tables, office work desks, living room display units, and entryway consoles where room lighting makes the particles sparkle.',
    specs: [
      { label: 'Chamber Material', value: 'Twin-Layered Crystal Optical Acrylic' },
      { label: 'Thickness', value: 'Combined 25MM Solid Acrylic Depth' },
      { label: 'Suspension Fluid', value: 'Purified Non-Toxic Mineral Fluid (Zero Evaporation)' },
      { label: 'Glitter Composition', value: '24K Liquid Gold & Diamond Cut Micro-Flakes' },
      { label: 'Print Core', value: 'High-Density Waterproof Photographic Inks' },
      { label: 'Display Options', value: 'Self-Standing Desktop & Wall Flush Brackets' },
      { label: 'Finish', value: 'Diamond Beveled Edge Polishing' },
      { label: 'Gift Packaging', value: 'Deluxe Padded Gift Box Included' },
    ],
    sizing: [
      { size: '6 × 8 In', sqft: '0.33 sq.ft', placement: 'Bedside Nightstand & Study Desk', w: 'w-8', h: 'h-10' },
      { size: '8 × 10 In', sqft: '0.55 sq.ft', placement: 'Office Executive Desk / Vanity', w: 'w-10', h: 'h-12' },
      { size: '8 × 12 In', sqft: '0.66 sq.ft', placement: 'Living Room Console / Display Unit', w: 'w-10', h: 'h-14' },
      { size: '12 × 18 In', sqft: '1.5 sq.ft', placement: 'Wall Centerpiece Display', w: 'w-12', h: 'h-18' },
    ],
    craftHighlights: [
      { title: 'Hermetic Ultrasonic Sealing', desc: 'Guarantees the mineral liquid never leaks or evaporates over decades of display.' },
      { title: 'Suspended Mineral Viscosity', desc: 'Calibrated fluid density causes particles to gently drift rather than sink instantly.' },
      { title: 'Diamond Faceted Edges', desc: 'Hand-beveled edges refract room light like fine crystal glassware.' },
      { title: 'Archival Photo Core', desc: 'Your image stays 100% dry and protected in an isolated internal chamber.' },
    ],
    mountSteps: [
      { step: 1, title: 'Unpack Gift Box', desc: 'Carefully remove the frame from its velvet presentation pouch.' },
      { step: 2, title: 'Shake or Tilt', desc: 'Gently tilt the frame to activate the golden floating glitter cascade.' },
      { step: 3, title: 'Position Anywhere', desc: 'Place on your desk or mount onto any wall using the rear brass brackets.' },
    ],
    faqs: [
      { q: 'Will the liquid leak or dry out over time?', a: 'No. The chamber is ultrasonically bonded and hermetically sealed. The non-toxic mineral fluid will never leak or evaporate.' },
      { q: 'Can I replace the photo later?', a: 'The photograph is permanently sealed inside during manufacturing for maximum clarity and water resistance. It arrives fully personalized with your photo.' },
      { q: 'Does it stand on its own without a kickstand?', a: 'Yes! The thick 25mm solid acrylic block stands firmly on any flat tabletop without needing any unsightly back prop.' },
    ],
  },

  '360-rotating-photo-lamps': {
    techBadge: '360° Automatic Rotation',
    specBadge: 'Bright White LED • 5 Photos • Premium Plastic Body',
    techTitle: 'Personalized 360° Rotating Photo Lamp Engineering',
    techIntro1:
      'Make your beautiful memories shine with our Personalized Rotating Photo Lamp!',
    techIntro2:
      'Display your favourite 5 photos with a beautiful 360° rotating design and bright white LED lighting.',
    benefits: [
      'Premium Plastic Body engineered for lightweight durability and smooth tabletop presentation.',
      '360° Automatic Rotation displaying your 5 favorite photographs from every angle.',
      'Normal Rotation Speed delivering a steady, smooth, and relaxing memory showcase.',
      'Bright White LED Light providing crystal-clear illumination for all photographs.',
      'Built-in Power Cable for hassle-free direct plug-and-play operation.',
      'Customized with 5 Photos carefully arranged for a complete keepsake display.',
      'Perfect for Birthday Gifts, Anniversary Gifts, Couple Gifts, Wedding Gifts and Special Occasions.',
    ],
    card1Title: '360° Automatic Rotation',
    card1Desc:
      'Smooth automatic 360° rotation at normal speed keeps your 5 favorite memories gently revolving in crystal clarity.',
    card2Title: 'Bright White LED & Built-in Cable',
    card2Points: [
      'Bright White LED Light illumination.',
      'Built-in power cable included.',
      'Premium durable plastic body.',
      'Customized with 5 Photos.',
    ],
    sectionTitle: 'Personalized 360° Rotating Photo Lamp Specifications',
    storyHeading: 'Make Your Beautiful Memories Shine',
    storySubheading: '360° rotating design with bright white LED lighting customized with 5 photos',
    storyCardTitle: 'Personalized 360° Rotating Photo Lamp',
    storyParagraphs: [
      'Make your beautiful memories shine with our Personalized Rotating Photo Lamp!',
      'Display your favourite 5 photos with a beautiful 360° rotating design and bright white LED lighting. Perfect for Birthday Gifts, Anniversary Gifts, Couple Gifts, Wedding Gifts and Special Occasions.',
      "Customize your memories with Abhi's Gifts – Frame Your Memories!",
    ],
    storyBannerText: 'Personalized 360° Rotating Photo Lamp • Bright White LED • 5 Photos • Built-in Power Cable',
    placementTitle: 'Bedside Nightstand & Living Room Guidance',
    placementText:
      'A wonderful centerpiece for bedside tables, living room coffee tables, dining sideboards, and reception desks.',
    specs: [
      { label: 'Product Name', value: 'Personalized 360° Rotating Photo Lamp' },
      { label: 'Body Material', value: 'Premium Plastic Body' },
      { label: 'Rotation', value: '360° Automatic Rotation (Normal Speed)' },
      { label: 'Lighting', value: 'Bright White LED Light' },
      { label: 'Power Supply', value: 'Built-in Power Cable' },
      { label: 'Photo Capacity', value: 'Customized with 5 Photos' },
      { label: 'Perfect For', value: 'Birthday Gifts, Anniversary Gifts, Couple Gifts, Wedding Gifts & Special Occasions' },
      { label: 'Brand', value: "Abhi's Gifts – Frame Your Memories" },
    ],
    sizing: [
      { size: 'Standard Size', sqft: '5 Photos', placement: 'Bedside Nightstand / Study Table / Living Room', w: 'w-12', h: 'h-18' },
    ],
    craftHighlights: [
      { title: 'Premium Plastic Body', desc: 'Durable, lightweight structure crafted for clean aesthetic appeal.' },
      { title: '360° Automatic Rotation', desc: 'Continuously and smoothly rotates at normal speed to display every angle.' },
      { title: 'Bright White LED Light', desc: 'Vibrant internal LED lighting illuminating all 5 photos with crisp clarity.' },
      { title: 'Built-in Power Cable', desc: 'Pre-fitted power cable for seamless plug-and-play operation out of the box.' },
    ],
    mountSteps: [
      { step: 1, title: 'Unbox Rotating Lamp', desc: 'Carefully remove the lamp from the shockproof protective packaging.' },
      { step: 2, title: 'Connect Built-in Cable', desc: 'Plug the built-in power cable directly into any standard power socket.' },
      { step: 3, title: 'Enjoy the Rotation', desc: 'Watch your 5 favourite photos automatically rotate in bright white LED light.' },
    ],
    faqs: [
      { q: 'How many photos can I customize on this lamp?', a: 'This lamp is customized with your favourite 5 photos neatly aligned around the body.' },
      { q: 'What lighting and rotation speed does it have?', a: 'It features bright white LED lighting and automatic 360° rotation at a normal, steady speed.' },
      { q: 'What material is the body made of?', a: 'The lamp body is crafted from premium, high-grade plastic with a built-in power cable.' },
      { q: 'What occasions is this lamp ideal for?', a: 'It makes the perfect gift for birthdays, anniversaries, couples, weddings, and special celebrations.' },
    ],
  },

  'god-photo-frames': {
    techBadge: 'Sanctum 3D Embossed Art',
    specBadge: 'Divine Halo Glow • 5MM Cast Acrylic',
    techTitle: 'Sacred Temple 3D Relief & Sanctum Halo Engineering',
    techIntro1:
      'Our God Photo Frames are crafted with sacred reverence at our Hyderabad workshop. Featuring 3D embossed deity relief artwork of Tirupati Balaji, Lord Shiva, Ganesha, Hanuman, Rama, and Lakshmi.',
    techIntro2:
      'Layered over virgin optical acrylic and illuminated by divine warm & cool white LED halo backlighting, recreating the sacred ambiance of an authentic temple sanctum.',
    benefits: [
      'Sacred 3D embossed deity relief with authentic temple iconography & Vastu orientation.',
      'Direct UV printing with sacred metallic gold pigments that never fade or discolor.',
      'Dual-tone sanctum halo LED backlighting for celestial pooja room ambiance.',
      '5MM premium optical cast acrylic resistant to incense smoke and moisture.',
      'Stainless steel standoff studs providing a revered floating mandir presentation.',
      'Energy-efficient 12V power supply tested for continuous 24/7 pooja room operation.',
      'Traditional Vastu Shastra compliant dimensions and sacred proportion geometry.',
    ],
    card1Title: 'Sacred 3D Embossed Relief',
    card1Desc:
      'Multi-layer optical cast acrylic creates authentic three-dimensional depth for temple mandirs and pooja rooms.',
    card2Title: 'Sanctum Wall Mounting Included',
    card2Points: [
      'Heavy-duty metal standoffs and anchors included.',
      'Wall mounting hardware provided for mandir walls.',
      'Durable moisture & incense smoke resistant acrylic.',
      'Safe 12V low-voltage BIS power adapter included.',
    ],
    sectionTitle: 'God Photo Frame Specifications & Vastu Guide',
    storyHeading: 'Divine Mandir Description & Iconography',
    storySubheading: 'Authentic 3D embossed sacred deity relief with celestial LED sanctum halo',
    storyCardTitle: 'Sanctum 3D LED Sacred Temple Wall Art',
    storyParagraphs: [
      'Bring divine blessings and positive spiritual energy into your home with our Sacred God Photo Frames. Handcrafted in Hyderabad following traditional temple iconography.',
      'The multi-layer 3D gold relief reflects light with sacred radiance, while the halo LED backlighting creates the peaceful atmosphere of an illuminated temple sanctum.',
    ],
    storyBannerText: 'Sacred 3D Relief • Temple Sanctum Halo • Vastu Shastra Compliant • 12V BIS Adapter Included',
    placementTitle: 'Vastu Shastra & Mandir Placement Guidance',
    placementText:
      'Best installed on the East or North wall of your Pooja Room, living room, or home foyer to invite spiritual harmony, peace, and prosperity.',
    specs: [
      { label: 'Deity Iconography', value: 'Authentic Traditional Temple Relief (Balaji, Shiva, Ganesha, Rama)' },
      { label: 'Craft Technique', value: '3D Embossed Gold Relief on Optical Cast Acrylic' },
      { label: 'Acrylic Thickness', value: '5MM Rigid Clear Cast Acrylic Face' },
      { label: 'Illumination', value: 'Celestial Sanctum Halo LED Backlight (Warm & Cool)' },
      { label: 'Vastu Alignment', value: 'East / North Wall Compliant Sacred Geometry' },
      { label: 'Power Input', value: '12V DC Safe Low-Voltage BIS Adapter Included' },
      { label: 'Maintenance', value: 'Wipe with soft cloth; resistant to incense smoke' },
      { label: 'Mounting', value: 'Heavy-Duty Brass & Chrome Standoff Studs Included' },
    ],
    sizing: [
      { size: '12 × 18 In', sqft: '1.5 sq.ft', placement: 'Pooja Room Mandir Niche', w: 'w-10', h: 'h-14' },
      { size: '16 × 24 In', sqft: '2.6 sq.ft', placement: 'Main Mandir Wall / Entrance Foyer', w: 'w-12', h: 'h-18' },
      { size: '20 × 30 In', sqft: '4.2 sq.ft', placement: 'Grand Family Mandir / Living Room', w: 'w-14', h: 'h-20' },
      { size: '24 × 36 In', sqft: '6.0 sq.ft', placement: 'Temple Hall & Spiritual Centerpiece', w: 'w-16', h: 'h-22' },
    ],
    craftHighlights: [
      { title: '3D Embossed Sacred Relief', desc: 'Intricate crown, jewelry, and shanka-chakra details raised above the acrylic plane.' },
      { title: 'Non-Fading Gold Pigments', desc: 'UV-cured metallic gold inks that never tarnish or oxidize over years of pooja display.' },
      { title: 'Incense & Smoke Resistant', desc: 'Optical cast acrylic cleans effortlessly and withstands pooja room lamp emissions.' },
      { title: '24/7 Tested Electronics', desc: 'Engineered with low-draw LEDs tested for continuous day-and-night pooja room lighting.' },
    ],
    mountSteps: [
      { step: 1, title: 'Check Vastu Orientation', desc: 'Select an East or North facing wall inside your pooja room or living hall.' },
      { step: 2, title: 'Mount Standoff Screws', desc: 'Drill wall anchors and attach the brass mounting barrels firmly.' },
      { step: 3, title: 'Fasten & Plug In', desc: 'Mount the sacred frame and plug in the 12V adapter for instant sanctum radiance.' },
    ],
    faqs: [
      { q: 'Can I keep the light on 24 hours in the pooja room?', a: 'Yes! The LED system runs on low-voltage 12V power and is specifically engineered for continuous 24/7 pooja room illumination.' },
      { q: 'Will the colours fade from pooja dhoop/deepam smoke?', a: 'No. The UV-cured pigments are bonded beneath optical-grade acrylic, which wipes clean easily with a soft cloth and does not absorb smoke.' },
      { q: 'Is it appropriate as a housewarming gift?', a: 'Absolutely! Our Balaji and Ganesha 3D LED frames are the #1 most gifted sacred heirloom for Gruhapravesam in Hyderabad.' },
    ],
  },

  'family-baby-frames': {
    techBadge: 'Heirloom Archival Printing',
    specBadge: '5MM Crystal Cast Acrylic • Gold Foil Script',
    techTitle: 'Personalized Family Heirloom & Milestone Architecture',
    techIntro1:
      'Our Family & Baby Frames are designed to celebrate generations of love, milestones, and growing families.',
    techIntro2:
      'Crafted on 5MM crystal-clear cast acrylic with customized family surnames, established years, and multi-photo collages rendered in high-definition direct UV and metallic gold foil script.',
    benefits: [
      'Custom personalized family name, established dates, and baby birth details.',
      'Multi-photo gallery layout preserving up to 10 family memories in one cohesive frame.',
      '5MM thick crystal cast acrylic with diamond-polished edges for archival durability.',
      'Scratch-resistant and child-safe shatterproof acrylic construction.',
      'High-definition 1440 DPI photographic reproduction capturing true skin tones.',
      'Stainless steel floating standoff mounting hardware included with every frame.',
      '1:1 WhatsApp proofing preview with our master layout designer before printing.',
    ],
    card1Title: '24K Gold Foil Typography',
    card1Desc:
      'Surname and milestone inscriptions rendered in genuine reflective metallic gold foil calligraphy.',
    card2Title: 'Metal Wall Standoffs Included',
    card2Points: [
      '4 precision chrome standoffs provided in box.',
      'Clean 1-inch floating projection from wall.',
      'Wall plugs and heavy-duty screws included.',
      'No extra hardware needed for mounting.',
    ],
    sectionTitle: 'Family & Baby Frame Specifications & Details',
    storyHeading: 'Family Heirloom Story & Keepsake',
    storySubheading: 'Generational memories, custom surname script & multi-photo gallery collages',
    storyCardTitle: 'Generational Family Wall Gallery Keepsake',
    storyParagraphs: [
      'Celebrate your family’s most precious milestones with our bespoke Family & Baby Frames. From newborn birth statistics to generational family portraits, our artisans craft pieces that become cherished heirlooms.',
      'Personalized with your family surname, established year, or heartfelt quotes, printed directly onto crystal-clear 5MM acrylic.',
    ],
    storyBannerText: 'Family Surname Script • Multi-Photo Collage • 5MM Crystal Acrylic • 1:1 WhatsApp Proofing',
    placementTitle: 'Living Room Gallery & Staircase Wall Guidance',
    placementText:
      'Perfect for living room family photo walls, dining corridors, master bedrooms, and nursery rooms.',
    specs: [
      { label: 'Personalization', value: 'Family Name, Established Year, Baby Birth Stats, Quotes' },
      { label: 'Photo Capacity', value: '1 to 10 High-Definition Family Photographs' },
      { label: 'Material', value: '5MM Premium Optical Cast Acrylic' },
      { label: 'Text Inscription', value: 'Metallic Gold Foil & High-Density White Calligraphy' },
      { label: 'Proofing Process', value: '1:1 Digital Layout Preview on WhatsApp Before Printing' },
      { label: 'Mounting', value: '4 Stainless Steel Floating Standoff Studs Included' },
      { label: 'Safety', value: 'Shatterproof & Child-Safe (Unlike fragile glass frames)' },
      { label: 'Edge Finish', value: 'Diamond Polished Square-Cut Minimal Edges' },
    ],
    sizing: [
      { size: '12 × 18 In', sqft: '1.5 sq.ft', placement: 'Nursery / Bedroom Milestone Display', w: 'w-10', h: 'h-14' },
      { size: '16 × 24 In', sqft: '2.6 sq.ft', placement: 'Dining Area / Staircase Landing', w: 'w-12', h: 'h-18' },
      { size: '20 × 30 In', sqft: '4.2 sq.ft', placement: 'Main Living Room Family Feature Wall', w: 'w-14', h: 'h-20' },
      { size: '24 × 36 In', sqft: '6.0 sq.ft', placement: 'Grand Generational Family Tree Centerpiece', w: 'w-16', h: 'h-22' },
    ],
    craftHighlights: [
      { title: 'Custom Typography Design', desc: 'Each surname is tailored with custom serif or cursive gold lettering by our designers.' },
      { title: 'True Skin Tone Reproduction', desc: '1440 DPI photographic inks ensure baby and family portraits appear natural and vivid.' },
      { title: 'Shatterproof Safety', desc: 'Safe for children’s bedrooms and high-traffic family corridors.' },
      { title: 'Floating Wall Standoffs', desc: 'Projects the frame 1 inch away from the wall for modern gallery elegance.' },
    ],
    mountSteps: [
      { step: 1, title: 'Approve WhatsApp Proof', desc: 'Review your personalized layout preview sent on WhatsApp by our design team.' },
      { step: 2, title: 'Mark Wall Drill Points', desc: 'Hold the template to the wall and mark the 4 standoff hole positions.' },
      { step: 3, title: 'Mount & Enjoy', desc: 'Fix the standoffs and tighten the cap nuts for a lifetime of memories.' },
    ],
    faqs: [
      { q: 'Will I see a preview before printing?', a: 'Yes! We never print without your 100% approval. Our designers will send a 1:1 preview on WhatsApp for you to review and confirm.' },
      { q: 'Can I include multiple photos in one frame?', a: 'Yes! We create custom multi-photo collages (from 2 up to 10 photos) with custom names, dates, and baby milestones.' },
      { q: 'Is acrylic safer than glass for a baby room?', a: 'Yes! High-grade cast acrylic is 17 times stronger than glass and shatterproof, making it completely safe for nursery and children’s rooms.' },
    ],
  },

  'couple-wedding-frames': {
    techBadge: 'Couple Heirloom Keepsake',
    specBadge: '5MM Beveled Acrylic • Gold Calligraphy',
    techTitle: 'Customized Wedding Vows & Romantic Keepsake Craft',
    techIntro1:
      'Our Couple & Wedding Frames transform your sacred vows, pre-wedding captures, and anniversary milestones into timeless works of art.',
    techIntro2:
      'Printed on 5MM crystal acrylic with diamond-beveled edges, personalized couple names, wedding date, and customized romantic vows rendered in radiant metallic script.',
    benefits: [
      'Bespoke couple personalization: couple names, wedding date, venue, and vows.',
      'Diamond-beveled 5MM crystal acrylic creating mesmerizing prismatic light edges.',
      'Direct UV photographic printing capturing rich bridal hues and delicate textures.',
      'Archival quality that preserves cherished anniversary memories without yellowing.',
      'Floating wall standoff hardware or desktop acrylic easel base included.',
      'Digital proof verification shared on WhatsApp for 100% customer satisfaction.',
      'Luxury presentation packaging suitable for weddings and anniversary gifts.',
    ],
    card1Title: 'Diamond-Beveled Prismatic Edges',
    card1Desc:
      'Laser-faceted 45-degree beveled edges catch ambient room light, adding luxury jewelry-like brilliance.',
    card2Title: 'Complete Installation Hardware',
    card2Points: [
      'Floating standoff screws and anchors included.',
      'Wall mounting hardware provided in package.',
      'Smooth, polished edges safe to handle.',
      'Easy 3-minute floating wall installation.',
    ],
    sectionTitle: 'Couple & Wedding Frame Specifications',
    storyHeading: 'Romantic Wedding Keepsake Story',
    storySubheading: 'Custom vows, wedding date typography & diamond-beveled crystal acrylic',
    storyCardTitle: 'Customized Wedding Vows & Anniversary Frame',
    storyParagraphs: [
      'Your wedding day is one of life’s most cherished chapters. Our Couple & Wedding Frames immortalize your favorite portrait alongside your names, wedding date, and customized vows.',
      'Crafted with 45-degree diamond-beveled edges, it catches room light to create a luminous, jewelry-like aura in your bedroom or living space.',
    ],
    storyBannerText: 'Couple Names & Vows • Diamond-Beveled Edges • 5MM Crystal Acrylic • WhatsApp Proofing',
    placementTitle: 'Master Bedroom & Living Suite Guidance',
    placementText:
      'Stunning when mounted directly above the master bed headboard or placed on a vanity console.',
    specs: [
      { label: 'Personalization', value: 'Couple Names, Wedding Date, Vows, Location' },
      { label: 'Material', value: '5MM Optical-Grade Cast Acrylic' },
      { label: 'Edge Treatment', value: '45-Degree Diamond-Beveled Prismatic Edges' },
      { label: 'Calligraphy', value: 'Reflective Metallic Gold Foil Inscriptions' },
      { label: 'Print Clarity', value: '1440 DPI Direct UV for Bridal Fabric Details' },
      { label: 'Mounting Style', value: 'Stainless Steel Floating Standoff Studs' },
      { label: 'Packaging', value: 'Luxury Gift Box with Protective Velvet Pouch' },
      { label: 'Proofing', value: 'Digital Proof on WhatsApp Before Printing' },
    ],
    sizing: [
      { size: '8 × 12 In', sqft: '0.66 sq.ft', placement: 'Bedside Nightstand / Dresser Console', w: 'w-10', h: 'h-14' },
      { size: '12 × 18 In', sqft: '1.5 sq.ft', placement: 'Master Bedroom Headboard Wall', w: 'w-12', h: 'h-18' },
      { size: '16 × 24 In', sqft: '2.6 sq.ft', placement: 'Living Room Couple Showcase', w: 'w-14', h: 'h-20' },
      { size: '20 × 30 In', sqft: '4.2 sq.ft', placement: 'Grand Anniversary Centerpiece', w: 'w-16', h: 'h-22' },
    ],
    craftHighlights: [
      { title: 'Diamond Prismatic Facets', desc: 'Precision CNC-beveled edges refract light like a fine gemstone.' },
      { title: 'Gold Foil Vows Calligraphy', desc: 'Your sacred promises rendered in timeless metallic gold script.' },
      { title: 'Bridal Color Fidelity', desc: 'Preserves the rich silks, embroidery, and skin tones of your wedding photography.' },
      { title: 'Ready to Gift', desc: 'Arrives in luxury presentation packaging ideal for anniversary surprises.' },
    ],
    mountSteps: [
      { step: 1, title: 'Share Couple Details', desc: 'Send couple names, wedding date, and vows during order or via WhatsApp.' },
      { step: 2, title: 'Review WhatsApp Proof', desc: 'Confirm the digital typography proof sent by our master designers.' },
      { step: 3, title: 'Hang Above Headboard', desc: 'Fasten the chrome standoffs for a floating romantic centerpiece.' },
    ],
    faqs: [
      { q: 'Can we customize our own wedding vows or quotes?', a: 'Yes! You can share your personal vows, wedding quotes, song lyrics, or date format. We customize the typography specifically for you.' },
      { q: 'Will wedding photo colors look accurate?', a: 'Our calibrated 1440 DPI UV printers are fine-tuned for wedding photography, accurately reproducing gold jewelry, zardozi work, and bridal lehengas.' },
      { q: 'Is it suitable as a 1st or 25th anniversary gift?', a: 'It is our most popular romantic gift for newlyweds and milestone anniversaries, complete with luxury gift box packaging.' },
    ],
  },

  'personalized-gifts': {
    techBadge: 'Bespoke Gift Craftsmanship',
    specBadge: '5MM Optical Acrylic • Luxury Gift Packaging',
    techTitle: 'Bespoke Personalized Acrylic Gift Engineering',
    techIntro1:
      'Our Personalized Gifts collection features tailor-made acrylic plaques, milestone keepsakes, and personalized photo gifts crafted with museum precision in Hyderabad.',
    techIntro2:
      'Every piece is customized with your photos, personal dedication message, and dates, delivered in signature luxury velvet-lined gift packaging with WhatsApp proofing.',
    benefits: [
      'Custom personalized photo, names, dates, and dedicated heartfelt messages.',
      '5MM optical-grade virgin acrylic with ultra-gloss diamond polishing.',
      'High-definition Direct UV cured printing that resists scratches and fading.',
      'Includes luxury gift packaging with ribbon and protective velvet pouch.',
      'Dual desktop display stand and wall mounting hardware included with every piece.',
      'Same-day digital proof shared on WhatsApp before precision manufacturing.',
      'Safe express pan-India insured shipping with breakage guarantee.',
    ],
    card1Title: 'Luxury Gift Box Packaging',
    card1Desc:
      'Delivered in our signature rigid gift box with gold ribbon and velvet lining, ready to gift directly.',
    card2Title: 'Universal Display Hardware Included',
    card2Points: [
      'Metal desktop easel stand included.',
      'Wall mounting studs provided in package.',
      'Suitable for desks, shelves, or walls.',
      'No assembly required; ready to enjoy.',
    ],
    sectionTitle: 'Personalized Gift Specifications & Details',
    storyHeading: 'Personalized Gifting Story & Occasions',
    storySubheading: 'Custom milestone plaques, heartfelt inscriptions & presentation gift boxes',
    storyCardTitle: 'Bespoke Personalized Milestone Acrylic Keepsake',
    storyParagraphs: [
      'A personalized gift speaks directly to the heart. Whether celebrating birthdays, housewarmings, graduations, or corporate milestones, our acrylic keepsakes turn your memories into enduring art.',
      'Each piece is custom designed with your photo and personalized message, crafted with diamond-faceted edges and packaged in our signature luxury presentation box.',
    ],
    storyBannerText: 'Custom Dedication Messages • 5MM Optical Acrylic • Luxury Gift Packaging • WhatsApp Proofing',
    placementTitle: 'Work Desk, Bookshelf & Home Guidance',
    placementText:
      'Versatile for office executive desks, living room display shelves, bedroom bedside tables, and home galleries.',
    specs: [
      { label: 'Customization', value: 'Custom Photo, Dedication Message, Names, Dates' },
      { label: 'Material', value: '5MM Optical-Grade Virgin Cast Acrylic' },
      { label: 'Printing', value: 'Direct UV Cured Photographic High-Definition Inks' },
      { label: 'Edge Finish', value: 'Laser-Faceted Diamond Polished Bevels' },
      { label: 'Gift Box', value: 'Signature Rigid Gift Box with Ribbon & Velvet Lining' },
      { label: 'Display Options', value: 'Desktop Metal Stand & Wall Mounting Studs Both Included' },
      { label: 'Proofing', value: 'Instant Digital Proof Preview via WhatsApp' },
      { label: 'Shipping', value: 'Express Pan-India Insured Dispatch within 24-48 Hours' },
    ],
    sizing: [
      { size: '8 × 12 In', sqft: '0.66 sq.ft', placement: 'Executive Desk / Bookshelf Plaque', w: 'w-10', h: 'h-14' },
      { size: '12 × 18 In', sqft: '1.5 sq.ft', placement: 'Bedroom / Living Room Feature Display', w: 'w-12', h: 'h-18' },
      { size: '16 × 24 In', sqft: '2.6 sq.ft', placement: 'Grand Housewarming / Milestone Centerpiece', w: 'w-14', h: 'h-20' },
      { size: '20 × 30 In', sqft: '4.2 sq.ft', placement: 'Corporate Gala & Generational Tribute', w: 'w-16', h: 'h-22' },
    ],
    craftHighlights: [
      { title: 'Personalized Dedications', desc: 'Add personalized congratulatory notes, quotes, or corporate milestones.' },
      { title: 'Luxury Unboxing Experience', desc: 'Premium velvet pouch and rigid gift box make unboxing memorable.' },
      { title: 'Scratch & Fade Proof', desc: 'UV-cured surface ensures colors remain vibrant for decades.' },
      { title: 'Desk & Wall Versatility', desc: 'Display on any flat surface with the included metal stand or hang with studs.' },
    ],
    mountSteps: [
      { step: 1, title: 'Upload Your Photo', desc: 'Select your photo and enter your custom dedication inscription.' },
      { step: 2, title: 'Approve WhatsApp Proof', desc: 'Our designers share a 1:1 preview within hours on WhatsApp for confirmation.' },
      { step: 3, title: 'Gift Directly', desc: 'Delivered in a pristine gift box ready to present to your loved one.' },
    ],
    faqs: [
      { q: 'Can I add a custom message or name on the gift?', a: 'Yes! You can add any message, date, name, or quote. We format it professionally to complement your photo.' },
      { q: 'Is the gift box included or extra?', a: 'Our signature luxury rigid gift box with velvet lining and gold accents is included free of charge with every personalized gift.' },
      { q: 'Can you ship directly to the recipient?', a: 'Yes! We can ship directly to your recipient with no invoice included in the package upon request.' },
    ],
  },
};

export default function CategorySpecificationsSection({
  categorySlug,
  categoryName,
}: CategorySpecificationsSectionProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'sizing' | 'craft' | 'shipping'>('overview');

  // Normalize slug using canonical aliases
  const canonicalSlug = CATEGORY_SLUG_ALIASES[categorySlug] || categorySlug;
  const profile = CATEGORY_PROFILES[canonicalSlug] || CATEGORY_PROFILES['acrylic-photo-frames'];

  return (
    <div className="w-full space-y-12 sm:space-y-16 pt-8 pb-4">
      {/* 1. TOP HIGHLIGHT CARD: TECHNOLOGY & CRAFTSMANSHIP (Yellow Border Box) */}
      <div className="border border-[#FEE815] rounded-3xl p-6 sm:p-9 bg-gradient-to-br from-[#FEFCE8]/60 via-white to-[#FEFCE8]/40 shadow-xs space-y-6">
        {/* Top Badges & Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200/80 pb-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-900 bg-[#FEE815]/40 border border-[#FEE815] px-3 py-1 rounded-full inline-block mb-1.5">
              {profile.techBadge}
            </span>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              {profile.techTitle}
            </h3>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-3.5 py-1.5 rounded-full self-start sm:self-auto shadow-2xs">
            {profile.specBadge}
          </span>
        </div>

        {/* Technical Explanations */}
        <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
          <p>{profile.techIntro1}</p>
          <p>{profile.techIntro2}</p>
        </div>

        {/* Key Benefits Grid */}
        <div className="space-y-3 pt-1">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Key Benefits:</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {profile.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-white/95 border border-amber-100/90 shadow-2xs hover:border-[#FEE815] transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-stone-800 leading-snug">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom 2 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Card 1 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 space-y-2 shadow-2xs">
            <h4 className="font-serif font-bold text-sm sm:text-base text-stone-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{profile.card1Title}</span>
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">{profile.card1Desc}</p>
          </div>

          {/* Card 2 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 space-y-2 shadow-2xs">
            <h4 className="font-serif font-bold text-sm sm:text-base text-stone-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{profile.card2Title}</span>
            </h4>
            <ul className="text-xs text-stone-600 space-y-1.5 leading-relaxed">
              {profile.card2Points.map((pt, pIdx) => (
                <li key={pIdx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 2. BOTTOM SECTION: EVERYTHING YOU NEED TO KNOW (Interactive Tabbed Showcase) */}
      <div className="space-y-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-amber-900 bg-[#FEE815]/30 border border-[#FEE815] px-3.5 py-1 rounded-full inline-block shadow-2xs">
            Everything You Need to Know
          </span>
          <h3 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight">
            {profile.sectionTitle}
          </h3>
          <p className="text-xs sm:text-sm text-stone-500">
            Explore craftsmanship, material engineering, dimensions, wall mounting, and FAQs.
          </p>
        </div>

        {/* 5 Segmented Tabs Navigation */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 pt-2 scrollbar-none px-1">
          {[
            { id: 'overview', label: 'Story & Overview', icon: Sparkles, subtitle: 'Iconography & Vastu' },
            { id: 'specs', label: 'Specifications', icon: Layers, subtitle: 'Materials & Finish' },
            { id: 'sizing', label: 'Size & Room Guide', icon: Ruler, subtitle: 'Wall Dimensions' },
            { id: 'craft', label: 'Craft & Installation', icon: Zap, subtitle: '3-Minute Mounting' },
            { id: 'shipping', label: 'Shipping & FAQs', icon: HelpCircle, subtitle: 'Packaging & Answers' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`group px-4 py-2.5 rounded-2xl text-left transition-all cursor-pointer shrink-0 flex items-center gap-2.5 border ${
                  isActive
                    ? 'bg-[#FEFCE8] border-[#FEE815] text-stone-950 shadow-xs ring-2 ring-[#FEE815]/30'
                    : 'bg-white border-stone-200 text-stone-600 hover:text-stone-950 hover:bg-stone-50 hover:border-stone-300'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isActive ? 'bg-[#FEE815] text-stone-950 font-bold' : 'bg-stone-100 text-stone-500 group-hover:text-stone-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className={`text-xs block font-bold leading-tight ${isActive ? 'text-stone-950' : 'text-stone-700'}`}>
                    {tab.label}
                  </span>
                  <span className="text-[10px] text-stone-400 hidden md:block leading-none mt-0.5">
                    {tab.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tab Content Container */}
        <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-8 shadow-sm transition-all duration-300 min-h-[340px]">
          {/* TAB 1: STORY & OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
                <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-stone-900">{profile.storyHeading}</h4>
                  <p className="text-xs text-stone-500">{profile.storySubheading}</p>
                </div>
              </div>

              {/* Story Description Card */}
              <div className="p-4 sm:p-6 rounded-2xl bg-amber-50/40 border border-amber-200/80 space-y-3">
                <h5 className="font-serif font-bold text-base text-stone-900">{profile.storyCardTitle}</h5>
                {profile.storyParagraphs.map((par, pIdx) => (
                  <p key={pIdx} className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                    {par}
                  </p>
                ))}
                <div className="pt-2 text-xs font-bold text-amber-950 flex items-center gap-2 border-t border-amber-200/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{profile.storyBannerText}</span>
                </div>
              </div>

              {/* Placement & Styling Guidance */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3 text-xs">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-stone-900">{profile.placementTitle}</p>
                  <p className="text-stone-600 leading-relaxed text-[11px] sm:text-xs">{profile.placementText}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SPECIFICATIONS */}
          {activeTab === 'specs' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
                <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-stone-900">Specifications &amp; Engineering</h4>
                  <p className="text-xs text-stone-500">Materials, manufacturing standards, and finishes</p>
                </div>
              </div>

              <div className="divide-y divide-stone-100 border border-stone-200 rounded-2xl overflow-hidden text-xs sm:text-sm bg-stone-50/30">
                {profile.specs.map((spec, i) => (
                  <div key={i} className="grid grid-cols-3 p-3.5 hover:bg-white transition-colors">
                    <span className="font-bold text-stone-900 col-span-1">{spec.label}</span>
                    <span className="text-stone-700 col-span-2 font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SIZE & ROOM SCALE GUIDE */}
          {activeTab === 'sizing' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
                <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                  <Ruler className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-stone-900">Size &amp; Room Scale Guide</h4>
                  <p className="text-xs text-stone-500">Recommended dimensions for wall niches, foyers, and living spaces.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {profile.sizing.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-center space-y-2 flex flex-col items-center justify-between"
                  >
                    <div className="h-28 flex items-center justify-center">
                      <div
                        className={`${item.w} ${item.h} rounded-lg border-2 border-amber-500 bg-amber-50 shadow-xs flex flex-col items-center justify-center text-[10px] font-extrabold text-stone-900`}
                      >
                        <span className="text-amber-900 font-extrabold">{item.sqft}</span>
                        <span className="text-[8px] font-medium text-stone-500">{item.size.replace(' In', '"')}</span>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-bold text-stone-900 text-xs sm:text-sm">{item.sqft} ({item.size})</h5>
                      <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">{item.placement}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3.5 bg-amber-50/50 border border-amber-200/60 rounded-xl text-xs text-stone-700 flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  Looking for custom sizing? We craft sizes from 12x18 inches up to 6x4 feet at our Dilsukhnagar workshop.
                </span>
              </div>
            </div>
          )}

          {/* TAB 4: CRAFT & 3-MINUTE INSTALLATION */}
          {activeTab === 'craft' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
                <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-stone-900">Craft, Materials &amp; Quick Installation</h4>
                  <p className="text-xs text-stone-500">Material engineering and simple setup instructions</p>
                </div>
              </div>

              {/* Material Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                {profile.craftHighlights.map((craft, cIdx) => (
                  <div key={cIdx} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                    <h5 className="font-bold text-stone-900">{craft.title}</h5>
                    <p className="text-xs text-stone-600 leading-relaxed">{craft.desc}</p>
                  </div>
                ))}
              </div>

              {/* 3 Steps Mounting Guide */}
              <div className="pt-2">
                <h5 className="font-bold text-xs uppercase tracking-wider text-stone-500 mb-3">
                  Easy 3-Step Setup &amp; Installation Guide
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {profile.mountSteps.map((m) => (
                    <div key={m.step} className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/60 space-y-1.5">
                      <span className="w-6 h-6 rounded-full bg-[#FEE815] text-stone-950 font-bold inline-flex items-center justify-center text-xs">
                        {m.step}
                      </span>
                      <h6 className="font-bold text-stone-900 text-sm">{m.title}</h6>
                      <p className="text-stone-600 text-[11px] leading-relaxed">{m.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SHIPPING, PACKAGING & FAQS */}
          {activeTab === 'shipping' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
                <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-stone-900">Shipping, Safe Packaging &amp; FAQs</h4>
                  <p className="text-xs text-stone-500">Zero damage transit guarantee and answers to common questions.</p>
                </div>
              </div>

              {/* Safe Transit Packaging */}
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <h5 className="font-bold text-stone-900 text-sm">5-Layer Safe Transit Packaging</h5>
                <ul className="space-y-1.5 text-xs text-stone-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Reinforced with 5-layer honeycomb protective wooden crate and thick shockproof bubble wrap.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Protected with heavy-duty corner guards prior to courier dispatch.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>
                      <strong>100% Free Pan-India Replacement Guarantee</strong> in the rare event of transit damage.
                    </span>
                  </li>
                </ul>
              </div>

              {/* FAQs Grid */}
              <div className="space-y-3 pt-1">
                <h5 className="font-bold text-xs uppercase tracking-wider text-stone-500">Frequently Asked Questions</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {profile.faqs.map((faq, fIdx) => (
                    <div key={fIdx} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 text-xs text-stone-700 space-y-1">
                      <h6 className="font-bold text-stone-900">{faq.q}</h6>
                      <p className="text-[11px] leading-relaxed text-stone-600">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
