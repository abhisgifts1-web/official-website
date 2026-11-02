const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputPath = 'C:/Users/SHAHID/.gemini/antigravity/brain/28398a42-6bdf-42eb-8bdb-7992ae1bcf03/.user_uploaded/media_1793543610541_ca4d4ff4.png';
const outDir = path.join(__dirname, '../public/images/brand');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  const meta = await sharp(inputPath).metadata();
  console.log('Original dimensions:', meta.width, 'x', meta.height);

  // 1. Trimmed original logo (transparent background, exact bounds)
  const trimmedBuffer = await sharp(inputPath).trim().toBuffer();
  const trimmedMeta = await sharp(trimmedBuffer).metadata();
  console.log('Trimmed dimensions:', trimmedMeta.width, 'x', trimmedMeta.height);

  // Save the primary transparent trimmed logo
  await sharp(trimmedBuffer)
    .png()
    .toFile(path.join(outDir, 'logo.png'));
  console.log('Saved logo.png');

  // Also save a version with a subtle elegant dark drop shadow / contrast edge if needed,
  // or a version on a deep burgundy capsule / badge for high-contrast navbar usage!
  // Let's create:
  // - logo-badge.png (on luxury burgundy pill background #2A0812 with gold border)
  // - logo-dark.png (where the text is deep burgundy #511B2A for light backgrounds, keeping the bow yellow/gold)
  // Let's see: the user said "use this logo for entire website".
  // The logo is the yellow ribbon bow + yellow text "Abhis Gifts" + "We Create Memorable Movements".
  
  // Let's also crop out the ribbon bow as an icon mark for favicon / avatars:
  // The bow is on the left side of the trimmed image.
  // Let's detect where the bow ends (gap between bow and 'A' of Abhis).
  const { data, info } = await sharp(trimmedBuffer).raw().toBuffer({ resolveWithObject: true });
  const width = info.width;
  const height = info.height;
  
  // Find column with least density between x = 200 and x = 320 to isolate the bow
  let minColSum = Infinity;
  let splitX = 260;
  for (let x = 200; x < 320; x++) {
    let colSum = 0;
    for (let y = 0; y < height; y++) {
      const idx = (y * width + x) * 4;
      colSum += data[idx + 3]; // alpha channel
    }
    if (colSum < minColSum) {
      minColSum = colSum;
      splitX = x;
    }
  }
  console.log('Detected bow split at X:', splitX, 'with colSum alpha:', minColSum);

  // Extract the bow icon and trim it
  const bowBuffer = await sharp(trimmedBuffer)
    .extract({ left: 0, top: 0, width: splitX, height: height })
    .trim()
    .toBuffer();

  const bowMeta = await sharp(bowBuffer).metadata();
  console.log('Bow icon dimensions:', bowMeta.width, 'x', bowMeta.height);

  // Make the bow icon a perfect square with transparent padding
  const maxDim = Math.max(bowMeta.width, bowMeta.height);
  const padding = Math.round(maxDim * 0.08); // small breathing room
  const squareSize = maxDim + padding * 2;

  await sharp(bowBuffer)
    .resize({
      width: squareSize,
      height: squareSize,
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toFile(path.join(outDir, 'logo-icon.png'));
  console.log('Saved logo-icon.png');

  // Also create a luxury icon version on burgundy circle / squircle for app icons / favicon
  const squircleSvg = Buffer.from(`
    <svg width="${squareSize}" height="${squareSize}">
      <rect x="0" y="0" width="${squareSize}" height="${squareSize}" rx="${Math.round(squareSize * 0.25)}" fill="#511B2A" stroke="#D6AA55" stroke-width="4"/>
    </svg>
  `);

  const bowForSquircle = await sharp(bowBuffer)
    .resize({
      width: Math.round(squareSize * 0.75),
      height: Math.round(squareSize * 0.75),
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toBuffer();

  await sharp(squircleSvg)
    .composite([{ input: bowForSquircle, gravity: 'centre' }])
    .png()
    .toFile(path.join(outDir, 'logo-badge-icon.png'));
  console.log('Saved logo-badge-icon.png');

  // Create favicon.ico (or favicon.png) in public and app
  await sharp(bowBuffer)
    .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(__dirname, '../public/favicon.ico'));

  await sharp(bowBuffer)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(__dirname, '../public/favicon-32x32.png'));

  // Also create a version of the full logo on a dark luxury pill/capsule background for light navbars
  // so the bright yellow stands out vibrantly without clashing against white/ivory
  const pillPaddingX = 24;
  const pillPaddingY = 12;
  const pillW = trimmedMeta.width + pillPaddingX * 2;
  const pillH = trimmedMeta.height + pillPaddingY * 2;

  const pillSvg = Buffer.from(`
    <svg width="${pillW}" height="${pillH}">
      <rect x="0" y="0" width="${pillW}" height="${pillH}" rx="${Math.round(pillH / 2)}" fill="#2D0B16" stroke="#C99B45" stroke-width="3"/>
    </svg>
  `);

  await sharp(pillSvg)
    .composite([{ input: trimmedBuffer, gravity: 'centre' }])
    .png()
    .toFile(path.join(outDir, 'logo-dark-pill.png'));
  console.log('Saved logo-dark-pill.png');

  // Also let's create a version where we generate high contrast for light backgrounds
  // E.g. subtle dark stroke / halo around the yellow so it pops on any background (light or dark)
  // Let's create logo-contrast.png with a soft deep burgundy shadow filter
  console.log('All logo assets generated successfully.');
}

run().catch(console.error);
