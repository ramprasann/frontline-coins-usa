import sharp from 'sharp';

async function mapCoin1() {
  const f = 'custom-showcase-coin-1.png';
  const img = sharp(`public/images/official/${f}`).resize(60, 40);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  // check colors
  let res = '';
  for (let y = 0; y < 40; y += 2) {
    let row = '';
    for (let x = 0; x < 60; x++) {
      const idx = (y * 60 + x) * info.channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      // if dark/metallic
      row += (r < 180 || g < 180 || b < 180) ? '#' : '.';
    }
    res += row + '\n';
  }
  console.log('=== ' + f + ' ===\n' + res);
}

mapCoin1();
