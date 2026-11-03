const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inPath = path.join(__dirname, '../public/images/brand/logo.png');
const outDir = path.join(__dirname, '../public/images/brand');

async function generateBrandLogos() {
  const { data, info } = await sharp(inPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Helpers for linear interpolation between two hex/RGB colors
  function hexToRgb(hex) {
    const num = parseInt(hex.replace('#', ''), 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  }

  function lerpColor(c1, c2, t) {
    t = Math.max(0, Math.min(1, t));
    return [
      Math.round(c1[0] + (c2[0] - c1[0]) * t),
      Math.round(c1[1] + (c2[1] - c1[1]) * t),
      Math.round(c1[2] + (c2[2] - c1[2]) * t)
    ];
  }

  function multiLerp(colors, t) {
    t = Math.max(0, Math.min(1, t));
    const segment = 1 / (colors.length - 1);
    const index = Math.min(Math.floor(t / segment), colors.length - 2);
    const localT = (t - index * segment) / segment;
    return lerpColor(colors[index], colors[index + 1], localT);
  }

  // Palettes in Website Colors
  // Gold Gradient: Highlight Champagne -> Rich Gold -> Burnished Warm Gold
  const goldPalette = [
    hexToRgb('#F8E4A8'), // 0.0 - Top champagne highlight
    hexToRgb('#E6BD68'), // 0.3 - Bright antique gold
    hexToRgb('#D6AA55'), // 0.6 - Core brand gold
    hexToRgb('#BA8B36'), // 0.85 - Warm burnished gold
    hexToRgb('#9E7224')  // 1.0 - Rich gold shadow
  ];

  // Burgundy Gradient: Vivid Wine -> Signature Burgundy -> Deep Velvet
  const burgundyPalette = [
    hexToRgb('#752136'), // 0.0 - Top wine highlight
    hexToRgb('#641D30'), // 0.3 - Royal wine
    hexToRgb('#511B2A'), // 0.6 - Core signature brand burgundy
    hexToRgb('#401320'), // 0.85 - Deep wine
    hexToRgb('#2D0B16')  // 1.0 - Velvet shadow
  ];

  // Warm Ivory / Soft Champagne (for text on dark surfaces)
  const champagneTextPalette = [
    hexToRgb('#FFF6E8'), // 0.0 - Soft warm ivory
    hexToRgb('#F7E3B5'), // 0.4 - Champagne cream
    hexToRgb('#E8C77E'), // 0.8 - Gold reflection
    hexToRgb('#D6AA55')  // 1.0 - Antique gold base
  ];

  // -------------------------------------------------------------
  // VARIANT 1: Signature Burgundy & Gold Logo (For Light Backgrounds & Default)
  // Bow: Antique Gold
  // Text "Abhis Gifts": Deep Royal Burgundy
  // Heart & Dots: Radiant Antique Gold
  // Tagline: Warm Antique Gold
  // -------------------------------------------------------------
  const burgGoldBuf = Buffer.from(data);
  for (let y = 0; y < height; y++) {
    const t = y / height;
    const goldCol = multiLerp(goldPalette, t);
    const burgCol = multiLerp(burgundyPalette, t);

    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const alpha = burgGoldBuf[idx + 3];
      if (alpha === 0) continue;

      const isBow = x < 258;
      const isTagline = y >= 156;
      const isGiftsHeart = x >= 785 && x <= 835 && y < 70;
      const isAbhisDot = x >= 548 && x <= 578 && y < 70;

      let chosenColor;
      if (isBow) {
        // Gold bow with subtle diagonal highlight
        const diagT = (y * 0.7 + (x / 258) * 0.3 * height) / height;
        chosenColor = multiLerp(goldPalette, diagT);
      } else if (isGiftsHeart || isAbhisDot) {
        // Accent gold for the heart & dot
        chosenColor = multiLerp(goldPalette, y / 70);
      } else if (isTagline) {
        // Tagline in rich warm antique gold
        const tagT = (y - 156) / (height - 156);
        chosenColor = multiLerp(goldPalette, 0.3 + tagT * 0.5);
      } else {
        // Main brand name in deep royal burgundy
        const textT = (y - 35) / 120;
        chosenColor = multiLerp(burgundyPalette, textT);
      }

      burgGoldBuf[idx] = chosenColor[0];
      burgGoldBuf[idx + 1] = chosenColor[1];
      burgGoldBuf[idx + 2] = chosenColor[2];
    }
  }

  // Save as logo-burgundy-gold.png
  await sharp(burgGoldBuf, { raw: { width, height, channels } })
    .png()
    .toFile(path.join(outDir, 'logo-burgundy-gold.png'));
  console.log('Saved logo-burgundy-gold.png');

  // Also save as primary logo.png so default light views instantly use the website colors!
  await sharp(burgGoldBuf, { raw: { width, height, channels } })
    .png()
    .toFile(path.join(outDir, 'logo.png'));
  console.log('Updated primary logo.png with website burgundy & gold colors');

  // -------------------------------------------------------------
  // VARIANT 2: All Royal Antique Gold Edition (For Dark Backgrounds & Luxury Badges)
  // Bow: Antique Gold
  // Text: Champagne Gold / Radiant Gold
  // Heart: Brilliant Champagne Gold
  // Tagline: Antique Gold
  // -------------------------------------------------------------
  const allGoldBuf = Buffer.from(data);
  for (let y = 0; y < height; y++) {
    const t = y / height;
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const alpha = allGoldBuf[idx + 3];
      if (alpha === 0) continue;

      const isBow = x < 258;
      const isTagline = y >= 156;
      const isGiftsHeart = x >= 785 && x <= 835 && y < 70;

      let chosenColor;
      if (isBow) {
        const diagT = (y * 0.7 + (x / 258) * 0.3 * height) / height;
        chosenColor = multiLerp(goldPalette, diagT);
      } else if (isGiftsHeart) {
        chosenColor = hexToRgb('#FFF1C2'); // bright glowing heart
      } else if (isTagline) {
        const tagT = (y - 156) / (height - 156);
        chosenColor = multiLerp(goldPalette, 0.4 + tagT * 0.4);
      } else {
        // Main text in champagne gold
        const textT = (y - 35) / 120;
        chosenColor = multiLerp(champagneTextPalette, textT);
      }

      allGoldBuf[idx] = chosenColor[0];
      allGoldBuf[idx + 1] = chosenColor[1];
      allGoldBuf[idx + 2] = chosenColor[2];
    }
  }

  // Save as logo-gold.png (for dark backgrounds like footer, dark modals, etc.)
  await sharp(allGoldBuf, { raw: { width, height, channels } })
    .png()
    .toFile(path.join(outDir, 'logo-gold.png'));
  console.log('Saved logo-gold.png');

  // -------------------------------------------------------------
  // VARIANT 3: The Bow Icon in Antique Gold
  // -------------------------------------------------------------
  const goldPngBuffer = await sharp(allGoldBuf, { raw: { width, height, channels } })
    .png()
    .toBuffer();

  const bowBuffer = await sharp(goldPngBuffer)
    .extract({ left: 0, top: 0, width: 258, height: height })
    .trim()
    .png()
    .toBuffer();

  const bowMeta = await sharp(bowBuffer).metadata();
  const maxDim = Math.max(bowMeta.width, bowMeta.height);
  const padding = Math.round(maxDim * 0.08);
  const squareSize = maxDim + padding * 2;

  // Transparent gold bow icon
  await sharp(bowBuffer)
    .resize({
      width: squareSize,
      height: squareSize,
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toFile(path.join(outDir, 'logo-icon.png'));
  console.log('Updated logo-icon.png with gold bow');

  // Squircle icon on burgundy background with gold border
  const squircleSvg = Buffer.from(`
    <svg width="${squareSize}" height="${squareSize}">
      <defs>
        <linearGradient id="burgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#511B2A"/>
          <stop offset="50%" stop-color="#3D1420"/>
          <stop offset="100%" stop-color="#230710"/>
        </linearGradient>
        <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F0D79B"/>
          <stop offset="50%" stop-color="#D6AA55"/>
          <stop offset="100%" stop-color="#9E7224"/>
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="${squareSize - 4}" height="${squareSize - 4}" rx="${Math.round(squareSize * 0.25)}" fill="url(#burgGrad)" stroke="url(#goldBorder)" stroke-width="4"/>
    </svg>
  `);

  const bowForSquircle = await sharp(bowBuffer)
    .resize({
      width: Math.round(squareSize * 0.72),
      height: Math.round(squareSize * 0.72),
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toBuffer();

  await sharp(squircleSvg)
    .composite([{ input: bowForSquircle, gravity: 'centre' }])
    .png()
    .toFile(path.join(outDir, 'logo-badge-icon.png'));
  console.log('Updated logo-badge-icon.png');

  // Update favicon.ico with the new gold ribbon bow on burgundy squircle
  await sharp(path.join(outDir, 'logo-badge-icon.png'))
    .resize(64, 64)
    .png()
    .toFile(path.join(__dirname, '../app/favicon.ico'));

  await sharp(path.join(outDir, 'logo-badge-icon.png'))
    .resize(32, 32)
    .png()
    .toFile(path.join(__dirname, '../public/favicon-32x32.png'));
  console.log('Updated favicon.ico & favicon-32x32.png');

  console.log('All brand logo variations created successfully!');
}

generateBrandLogos().catch(console.error);
