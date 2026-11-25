import sharp from 'sharp';

async function cropCoinToCircle(inputName, outputName) {
  const filePath = `public/images/official/${inputName}`;
  const image = sharp(filePath);
  const metadata = await image.metadata();
  const { width, height } = metadata;
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

  // Let's find the coin center and radius.
  // The coin is approximately centered. Let's scan along horizontal and vertical lines through the center.
  const cx = Math.floor(width / 2);
  const cy = Math.floor(height / 2);

  // Let's sample background color from the 4 corners:
  const cornerColor = [
    (data[0] + data[(width - 1) * 3] + data[(height - 1) * width * 3] + data[((height - 1) * width + width - 1) * 3]) / 4,
    (data[1] + data[(width - 1) * 3 + 1] + data[(height - 1) * width * 3 + 1] + data[((height - 1) * width + width - 1) * 3 + 1]) / 4,
    (data[2] + data[(width - 1) * 3 + 2] + data[(height - 1) * width * 3 + 2] + data[((height - 1) * width + width - 1) * 3 + 2]) / 4,
  ];

  console.log(inputName, 'Corner avg color:', cornerColor);

  const colorDiff = (r, g, b, bg) => {
    return Math.sqrt((r - bg[0]) ** 2 + (g - bg[1]) ** 2 + (b - bg[2]) ** 2);
  };

  // Scan from top to bottom through cx to find coin top and bottom edge
  let topY = 0;
  for (let y = 0; y < height; y++) {
    const idx = (y * width + cx) * 3;
    if (colorDiff(data[idx], data[idx+1], data[idx+2], cornerColor) > 40) {
      topY = y;
      break;
    }
  }

  let bottomY = height - 1;
  for (let y = height - 1; y >= 0; y--) {
    const idx = (y * width + cx) * 3;
    if (colorDiff(data[idx], data[idx+1], data[idx+2], cornerColor) > 40) {
      bottomY = y;
      break;
    }
  }

  // Scan from left to right through cy to find coin left and right edge
  let leftX = 0;
  for (let x = 0; x < width; x++) {
    const idx = (cy * width + x) * 3;
    if (colorDiff(data[idx], data[idx+1], data[idx+2], cornerColor) > 40) {
      leftX = x;
      break;
    }
  }

  let rightX = width - 1;
  for (let x = width - 1; x >= 0; x--) {
    const idx = (cy * width + x) * 3;
    if (colorDiff(data[idx], data[idx+1], data[idx+2], cornerColor) > 40) {
      rightX = x;
      break;
    }
  }

  console.log(inputName, { leftX, rightX, topY, bottomY, coinW: rightX - leftX, coinH: bottomY - topY });

  const coinCenterX = Math.round((leftX + rightX) / 2);
  const coinCenterY = Math.round((topY + bottomY) / 2);
  const radius = Math.round(Math.max(rightX - leftX, bottomY - topY) / 2);

  // We want to crop a square around the coin:
  // Add a slight margin (2-3px) or tight to the coin rim
  const r = radius - 2; // slightly inset so none of the background shows
  const size = r * 2;
  const extractLeft = Math.max(0, coinCenterX - r);
  const extractTop = Math.max(0, coinCenterY - r);

  // Create an SVG circular mask with antialiased edges
  const circleMask = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${r}" cy="${r}" r="${r}" fill="#ffffff"/></svg>`
  );

  // Crop and apply circular mask with transparent background!
  await sharp(filePath)
    .extract({ left: extractLeft, top: extractTop, width: size, height: size })
    .composite([
      {
        input: circleMask,
        blend: 'dest-in'
      }
    ])
    .png()
    .toFile(`public/images/official/${outputName}`);

  console.log(`Saved transparent circular coin to public/images/official/${outputName} (${size}x${size})`);
}

async function run() {
  await cropCoinToCircle('custom-showcase-coin-1.png', 'custom-showcase-coin-1-circle.png');
  await cropCoinToCircle('custom-showcase-coin-2.png', 'custom-showcase-coin-2-circle.png');
  await cropCoinToCircle('custom-showcase-coin-3.png', 'custom-showcase-coin-3-circle.png');
  await cropCoinToCircle('custom-showcase-coin-4.png', 'custom-showcase-coin-4-circle.png');
}

run().catch(console.error);
