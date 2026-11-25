import sharp from 'sharp';

async function cropCoin2() {
  const filePath = 'public/images/official/custom-showcase-coin-2.png';
  const img = sharp(filePath);
  const metadata = await img.metadata();
  const { width, height } = metadata; // 1024 x 853

  // In our earlier detection:
  // minX: 20, maxX: 987, minY: 128, maxY: 851
  // Center is roughly (503, 490).
  // Let's refine the center and radius:
  const cx = 503;
  const cy = 490;
  // Radius: let's test r = 360 to 380 so that it captures the full coin inside the circle with NO red border.
  const r = 360;
  const size = r * 2; // 720

  const left = cx - r; // 143
  const top = cy - r;  // 130

  // SVG circular mask:
  const circleMask = Buffer.from(
    `<svg width="${size}" height="${size}">
      <circle cx="${r}" cy="${r}" r="${r}" fill="#ffffff"/>
    </svg>`
  );

  await sharp(filePath)
    .extract({ left, top, width: size, height: size })
    .composite([
      {
        input: circleMask,
        blend: 'dest-in'
      }
    ])
    .png()
    .toFile('public/images/official/custom-showcase-coin-2-circle.png');

  console.log('Saved custom-showcase-coin-2-circle.png');
}

cropCoin2().catch(console.error);
