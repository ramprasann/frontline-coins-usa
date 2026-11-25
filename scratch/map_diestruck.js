import sharp from 'sharp';

async function mapDieStruck() {
  const f = 'custom-die-struck-coin.jpg';
  const img = sharp(`public/images/official/${f}`).resize(50, 50);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  console.log('=== ' + f + ' ===');
  let res = '';
  for (let y = 0; y < 50; y += 2) {
    let row = '';
    for (let x = 0; x < 50; x++) {
      const idx = (y * 50 + x) * info.channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      row += (r > 200 && g > 200 && b > 200) ? '.' : '#';
    }
    res += row + '\n';
  }
  console.log(res);
}

mapDieStruck();
