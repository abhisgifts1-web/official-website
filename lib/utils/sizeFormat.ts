/**
 * Centralized utility for formatting dimensions and sizes into sq.ft
 * across storefront product pages, customer carts/checkouts, and dashboard views.
 */

export function calculateSqFt(w: number, h: number): number {
  return (w * h) / 144;
}

export function formatSqFtNumber(sqFt: number): string {
  if (sqFt <= 0 || isNaN(sqFt)) return '';
  const formatted = sqFt % 1 === 0 ? sqFt.toFixed(0) : sqFt.toFixed(1);
  return `${formatted} sq.ft`;
}

/**
 * Parses width and height from any size string (e.g. "12x18", "12 x 18 inches", "18x24", "16 x 20", etc.)
 */
export function extractDimensions(sizeStr: string): { width: number; height: number; sqFt: number } | null {
  if (!sizeStr) return null;
  const match = sizeStr.match(/(\d+(?:\.\d+)?)\s*(?:x|×|\*)\s*(\d+(?:\.\d+)?)/i);
  if (match) {
    const width = parseFloat(match[1]);
    const height = parseFloat(match[2]);
    if (width > 0 && height > 0) {
      const sqFt = (width * height) / 144;
      return { width, height, sqFt };
    }
  }
  return null;
}

/**
 * Returns formatted sq.ft string from any size label, e.g. "12x18" -> "1.5 sq.ft"
 */
export function getSqFt(sizeStr: string): string {
  if (!sizeStr) return '';
  const existingSqFt = sizeStr.match(/(\d+(?:\.\d+)?)\s*(?:sq\.ft|sqft|sq\s*ft)/i);
  if (existingSqFt) {
    const num = parseFloat(existingSqFt[1]);
    return formatSqFtNumber(num);
  }
  const dims = extractDimensions(sizeStr);
  if (dims) {
    return formatSqFtNumber(dims.sqFt);
  }
  return '';
}

/**
 * Returns full formatted size with sq.ft first or included:
 * e.g. "1.5 sq.ft (12\" × 18\")"
 */
export function formatSizeWithSqFt(sizeStr: string): string {
  if (!sizeStr) return '';
  const dims = extractDimensions(sizeStr);
  if (!dims) {
    return sizeStr.replace(/sq\s*ft/gi, 'sq.ft').replace(/sqft/gi, 'sq.ft');
  }
  const sqFtStr = formatSqFtNumber(dims.sqFt);
  return `${dims.width}" × ${dims.height}" (${sqFtStr})`;
}

/**
 * Short badge format, e.g. "1.5 sq.ft"
 */
export function formatSizeShort(sizeStr: string): string {
  const sq = getSqFt(sizeStr);
  return sq || sizeStr;
}
