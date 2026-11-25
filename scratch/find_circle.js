import sharp from 'sharp';

async function findCircle() {
  const filePath = 'public/images/official/custom-showcase-coin-2.png';
  const img = sharp(filePath);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;

  // Background is red velvet:
  // red is high (> 140), green is low (< 90), blue is low (< 110)
  const isBg = (x, y) => {
    const idx = (y * w + x) * info.channels;
    const r = data[idx], g = data[idx+1], b = data[idx+2];
    return (r > 130 && g < 100 && b < 120);
  };

  // Find coin bounds by scanning lines
  // Let's find for each y, minX and maxX that are NOT bg
  let minX = w, maxX = 0, minY = h, maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (!isBg(x, y)) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log('custom-showcase-coin-2 bounds:', { minX, maxX, minY, maxY, coinW: maxX - minX, coinH: maxY - minY });
}

findCircle();
