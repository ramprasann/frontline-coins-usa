import sharp from 'sharp';

async function checkRimColors() {
  const img = sharp('public/images/official/custom-showcase-coin-2-circle.png');
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;
  const cx = w / 2, cy = h / 2, r = w / 2;

  let redCount = 0;
  let totalOpaque = 0;
  // check pixels with r > 150, g < 100, b < 100
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const a = data[idx + 3];
      if (a > 128) {
        totalOpaque++;
        const rVal = data[idx], gVal = data[idx+1], bVal = data[idx+2];
        if (rVal > 150 && gVal < 90 && bVal < 90) {
          redCount++;
        }
      }
    }
  }

  console.log({ totalOpaque, redCount, percentRed: (redCount / totalOpaque * 100).toFixed(2) + '%' });
}

checkRimColors();
