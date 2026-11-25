import sharp from 'sharp';

async function mapSquare(f) {
  console.log('=== ' + f + ' ===');
  const img = sharp(`public/images/official/${f}`).resize(50, 50);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const bg = [data[0], data[1], data[2]];
  let res = '';
  for (let y = 0; y < 50; y += 2) {
    let row = '';
    for (let x = 0; x < 50; x++) {
      const idx = (y * 50 + x) * info.channels;
      const diff = Math.sqrt((data[idx]-bg[0])**2 + (data[idx+1]-bg[1])**2 + (data[idx+2]-bg[2])**2);
      row += diff > 20 ? '#' : '.';
    }
    res += row + '\n';
  }
  console.log(res);
}

async function run() {
  await mapSquare('thank-first-responder.jpg');
  await mapSquare('st-michael-police.jpg');
}

run();
