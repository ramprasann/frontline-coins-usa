import sharp from 'sharp';

async function checkCircleResult() {
  const f = 'custom-showcase-coin-2-circle.png';
  const img = sharp(`public/images/official/${f}`).resize(50, 50);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  console.log('Channels:', info.channels); // should be 4 (RGBA)
  let res = '';
  for (let y = 0; y < 50; y += 2) {
    let row = '';
    for (let x = 0; x < 50; x++) {
      const idx = (y * 50 + x) * info.channels;
      const alpha = data[idx + 3];
      row += alpha > 128 ? '#' : ' ';
    }
    res += row + '\n';
  }
  console.log(res);
}

checkCircleResult();
