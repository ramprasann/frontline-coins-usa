import sharp from 'sharp';

async function inspect(filename) {
  const filePath = `public/images/official/${filename}`;
  const image = sharp(filePath);
  const metadata = await image.metadata();
  console.log('=== ' + filename + ' ===', metadata.width, 'x', metadata.height);

  // Resize to 200x200 or 100x100 to quickly find the coin
  const small = await sharp(filePath).resize(100, 100, { fit: 'fill' }).raw().toBuffer({ resolveWithObject: true });
  const { data, info } = small;

  // Print a small ASCII map of colors
  let map = '';
  for (let y = 0; y < 100; y += 4) {
    let row = '';
    for (let x = 0; x < 100; x += 2) {
      const idx = (y * 100 + x) * info.channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      // check if reddish (for coin 2) or dark/metallic (for coin 1)
      if (filename.includes('2')) {
        // bg is bright red (r > 150, g < 100, b < 100)
        if (r > 150 && g < 100 && b < 100) {
          row += '.';
        } else {
          row += '#';
        }
      } else {
        // bg is light grey (r > 200, g > 200, b > 200)
        if (r > 200 && g > 200 && b > 200) {
          row += '.';
        } else {
          row += '#';
        }
      }
    }
    map += row + '\n';
  }
  console.log(map);
}

async function main() {
  await inspect('custom-showcase-coin-2.png');
  await inspect('custom-showcase-coin-1.png');
}

main().catch(console.error);
