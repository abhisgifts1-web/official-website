/**
 * Custom Dimension & Sizing Utilities for Abhi's Gifts
 * Automatically calculates dynamic pricing, metric conversions, and discounts
 * for custom-sized acrylic frames and LED artworks based directly on
 * the admin-configured prices of existing sizes / variants.
 */

export interface CustomSizeVariantReference {
  id?: string;
  size?: string;
  label?: string;
  dimensionsCm?: string;
  price?: number;
  mrp?: number;
  prices?: {
    gold?: { price: number; mrp: number };
    black?: { price: number; mrp: number };
    without_3mm?: { price: number; mrp: number };
    without_5mm?: { price: number; mrp: number };
  };
}

export interface CustomSizeOptions {
  hasLed?: boolean;
  frameType?: 'gold' | 'black' | 'without' | string;
  thickness?: '3mm' | '5mm' | string;
  variants?: CustomSizeVariantReference[];
  basePrice?: number;
  baseMrp?: number;
}

export interface CustomSizeCalculation {
  widthInches: number;
  heightInches: number;
  cmWidth: number;
  cmHeight: number;
  sqInches: number;
  sqFeet: number;
  price: number;
  mrp: number;
  discountPercent: number;
  label: string;
  dimensionsCm: string;
}

/**
 * Extracts width, height, and area in square inches from a size string or dimensionsCm string.
 */
export function parseDimensionsInches(
  sizeStr?: string,
  dimensionsCmStr?: string
): { width: number; height: number; area: number } | null {
  if (sizeStr) {
    // Matches "12 x 18 inches", "18x24", "24 × 36", "30*48", etc.
    const match = sizeStr.match(/(\d+(?:\.\d+)?)\s*(?:x|×|\*)\s*(\d+(?:\.\d+)?)/i);
    if (match) {
      const w = parseFloat(match[1]);
      const h = parseFloat(match[2]);
      if (w > 0 && h > 0) {
        return { width: w, height: h, area: w * h };
      }
    }

    // Diameter circle e.g. "18 inch Diameter"
    const diaMatch = sizeStr.match(/(\d+(?:\.\d+)?)\s*(?:in|inch|inches)?\s*dia/i);
    if (diaMatch) {
      const d = parseFloat(diaMatch[1]);
      if (d > 0) {
        return { width: d, height: d, area: Math.PI * Math.pow(d / 2, 2) };
      }
    }
  }

  // Fallback to dimensionsCm e.g. "30 x 45 cm"
  if (dimensionsCmStr) {
    const cmMatch = dimensionsCmStr.match(/(\d+(?:\.\d+)?)\s*(?:x|×|\*)\s*(\d+(?:\.\d+)?)/i);
    if (cmMatch) {
      const wCm = parseFloat(cmMatch[1]);
      const hCm = parseFloat(cmMatch[2]);
      if (wCm > 0 && hCm > 0) {
        const wIn = wCm / 2.54;
        const hIn = hCm / 2.54;
        return { width: Math.round(wIn), height: Math.round(hIn), area: (wCm * hCm) / 6.4516 };
      }
    }
  }

  return null;
}

/**
 * Resolves the relevant price and MRP for a variant given the selected frameType and thickness.
 */
function getVariantPriceAndMrp(
  v: CustomSizeVariantReference,
  frameType?: string,
  thickness?: string
): { price: number; mrp: number } | null {
  if (v.prices) {
    if (frameType === 'gold' && v.prices.gold && v.prices.gold.price > 0) {
      return { price: Number(v.prices.gold.price), mrp: Number(v.prices.gold.mrp) };
    }
    if (frameType === 'black' && v.prices.black && v.prices.black.price > 0) {
      return { price: Number(v.prices.black.price), mrp: Number(v.prices.black.mrp) };
    }
    if (frameType === 'without') {
      if (thickness === '5mm' && v.prices.without_5mm && v.prices.without_5mm.price > 0) {
        return { price: Number(v.prices.without_5mm.price), mrp: Number(v.prices.without_5mm.mrp) };
      }
      if (thickness === '3mm' && v.prices.without_3mm && v.prices.without_3mm.price > 0) {
        return { price: Number(v.prices.without_3mm.price), mrp: Number(v.prices.without_3mm.mrp) };
      }
      if (v.prices.without_5mm && v.prices.without_5mm.price > 0) {
        return { price: Number(v.prices.without_5mm.price), mrp: Number(v.prices.without_5mm.mrp) };
      }
      if (v.prices.without_3mm && v.prices.without_3mm.price > 0) {
        return { price: Number(v.prices.without_3mm.price), mrp: Number(v.prices.without_3mm.mrp) };
      }
    }

    const fallback = v.prices.gold || v.prices.black || v.prices.without_5mm || v.prices.without_3mm;
    if (fallback && fallback.price > 0) {
      return { price: Number(fallback.price), mrp: Number(fallback.mrp) };
    }
  }

  if (v.price && Number(v.price) > 0) {
    const p = Number(v.price);
    const m = Number(v.mrp) || Math.round(p * 1.85);
    return { price: p, mrp: m };
  }

  return null;
}

/**
 * Calculates custom size area, metric conversions, and price derived directly from existing admin-set variants.
 */
export function calculateCustomDimensions(
  widthInches: number,
  heightInches: number,
  options: CustomSizeOptions = {}
): CustomSizeCalculation {
  const w = Math.max(6, Math.min(120, Number(widthInches) || 12));
  const h = Math.max(6, Math.min(120, Number(heightInches) || 18));

  const sqInches = Math.max(36, w * h);
  const sqFeet = Number((sqInches / 144).toFixed(2));
  const cmWidth = Math.round(w * 2.54);
  const cmHeight = Math.round(h * 2.54);

  // 1. Build list of reference points from existing variants configured by admin
  interface PricePoint {
    area: number;
    price: number;
    mrp: number;
  }

  const rawPoints: PricePoint[] = [];

  if (options.variants && options.variants.length > 0) {
    for (const v of options.variants) {
      const dim = parseDimensionsInches(v.size || v.label, v.dimensionsCm);
      const pr = getVariantPriceAndMrp(v, options.frameType, options.thickness);

      if (dim && pr && dim.area > 0 && pr.price > 0) {
        rawPoints.push({
          area: Math.round(dim.area),
          price: pr.price,
          mrp: pr.mrp || Math.round(pr.price * 1.85),
        });
      }
    }
  }

  // Deduplicate and sort by area ascending
  const points = rawPoints
    .sort((a, b) => a.area - b.area)
    .filter((pt, index, self) => index === self.findIndex((o) => Math.abs(o.area - pt.area) < 2));

  // If no valid variant points found, fallback to basePrice / baseMrp at standard 12x18 (216 sq in)
  if (points.length === 0) {
    const bPrice = Number(options.basePrice) || 2499;
    const bMrp = Number(options.baseMrp) || Math.round(bPrice * 1.85);
    points.push({ area: 216, price: bPrice, mrp: bMrp });
  }

  // 2. Interpolate or scale according to existing sizes
  let rawPrice = 0;
  let rawMrp = 0;

  // Check for exact match with an existing variant
  const exactMatch = points.find((pt) => Math.abs(pt.area - sqInches) <= 2);

  if (exactMatch) {
    rawPrice = exactMatch.price;
    rawMrp = exactMatch.mrp;
  } else if (points.length === 1) {
    // Only 1 reference point available: scale linearly by area
    const p0 = points[0];
    const rateP = p0.price / p0.area;
    const rateM = p0.mrp / p0.area;
    rawPrice = Math.max(799, Math.round(sqInches * rateP));
    rawMrp = Math.max(1499, Math.round(sqInches * rateM));
  } else if (sqInches <= points[0].area) {
    // Smaller than smallest known variant: scale using smallest variant's rate
    const p0 = points[0];
    const rateP = p0.price / p0.area;
    const rateM = p0.mrp / p0.area;
    rawPrice = Math.max(699, Math.round(sqInches * rateP));
    rawMrp = Math.max(1299, Math.round(sqInches * rateM));
  } else if (sqInches >= points[points.length - 1].area) {
    // Larger than largest known variant: extrapolate using incremental rate of top 2 variants
    const pLast = points[points.length - 1];
    const pPrev = points[points.length - 2];
    const deltaArea = Math.max(1, pLast.area - pPrev.area);
    const rateP = Math.max(2, (pLast.price - pPrev.price) / deltaArea);
    const rateM = Math.max(3, (pLast.mrp - pPrev.mrp) / deltaArea);

    rawPrice = Math.round(pLast.price + (sqInches - pLast.area) * rateP);
    rawMrp = Math.round(pLast.mrp + (sqInches - pLast.area) * rateM);
  } else {
    // Between two known variants: interpolate linearly
    let lower = points[0];
    let upper = points[1];

    for (let i = 0; i < points.length - 1; i++) {
      if (sqInches >= points[i].area && sqInches <= points[i + 1].area) {
        lower = points[i];
        upper = points[i + 1];
        break;
      }
    }

    const t = (sqInches - lower.area) / Math.max(1, upper.area - lower.area);
    rawPrice = Math.round(lower.price + t * (upper.price - lower.price));
    rawMrp = Math.round(lower.mrp + t * (upper.mrp - lower.mrp));
  }

  // 3. Aesthetically pleasing rounding to standard e-commerce prices ending in 99
  // e.g. 2499, 2999, 3499, etc.
  const price = Math.max(699, Math.round(rawPrice / 100) * 100 - 1);
  const mrp = Math.max(price + 200, Math.round(Math.max(rawMrp, price * 1.6) / 100) * 100 - 1);
  const discountPercent = Math.max(10, Math.round(((mrp - price) / mrp) * 100));

  const label = `${w}" × ${h}" (Custom Size)`;
  const dimensionsCm = `${cmWidth} × ${cmHeight} cm`;

  return {
    widthInches: w,
    heightInches: h,
    cmWidth,
    cmHeight,
    sqInches,
    sqFeet,
    price,
    mrp,
    discountPercent,
    label,
    dimensionsCm,
  };
}
