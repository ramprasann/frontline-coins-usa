import sharp from 'sharp';

async function cropDieStruck() {
  const filePath = 'public/images/official/custom-die-struck-coin.jpg';
  const img = sharp(filePath);
  const metadata = await img.metadata();
  const { width, height } = metadata; // 768 x 1024
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

  // Find non-white bounds:
  // white background: r > 240, g > 240, b > 240
  let minX = width, maxX = 0, minY = height, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * info.channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      if (r < 235 || g < 235 || b < 235) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log('Die struck bounds:', { minX, maxX, minY, maxY, w: maxX - minX, h: maxY - minY });

  const cx = Math.round((minX + maxX) / 2);
  const cy = Math.round((minY + maxY) / 2);
  const r = Math.round(Math.min(maxX - minX, maxY - minY) / 2) - 2;
  const size = r * 2;
  const left = cx - r;
  const top = cy - r;

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
    .toFile('public/images/official/custom-die-struck-coin-circle.png');

  console.log('Saved custom-die-struck-coin-circle.png');
}

cropDieStruck();
