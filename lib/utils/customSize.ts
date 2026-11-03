/**
 * Custom Dimension & Sizing Utilities for Abhi's Gifts
 * Calculates dynamic area, metric conversions, and proportional pricing
 * for customized acrylic frames and LED artworks.
 */

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

export function calculateCustomDimensions(
  widthInches: number,
  heightInches: number,
  options: {
    hasLed?: boolean;
    frameType?: 'gold' | 'black' | 'without' | string;
    thickness?: '3mm' | '5mm' | string;
  } = {}
): CustomSizeCalculation {
  const w = Math.max(6, Math.min(120, Number(widthInches) || 12));
  const h = Math.max(6, Math.min(120, Number(heightInches) || 18));

  const sqInches = Math.max(36, w * h);
  const sqFeet = Number((sqInches / 144).toFixed(2));
  const cmWidth = Math.round(w * 2.54);
  const cmHeight = Math.round(h * 2.54);

  // Rate per square inch
  let baseRate = 7.5; // Framed (Gold or Black CNC)
  if (options.frameType === 'without') {
    baseRate = options.thickness === '5mm' ? 6.5 : 5.8;
  }

  // LED Backlight rate
  const ledAddition = options.hasLed ? 2.0 : 0;
  const totalRate = baseRate + ledAddition;

  // Raw price calculation
  const rawPrice = Math.max(999, Math.round(sqInches * totalRate));
  // Round to nearest aesthetically pleasing price ending in 99
  const price = Math.round(rawPrice / 100) * 100 - 1;
  const mrp = Math.round((price * 1.85) / 100) * 100 - 1;
  const discountPercent = Math.round(((mrp - price) / mrp) * 100);

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
