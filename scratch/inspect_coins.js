import sharp from 'sharp';

async function inspectCoins() {
  const coins = [
    'thank-first-responder.jpg',
    'st-michael-police.jpg',
    'baltimore-sports-coin.jpg',
    'fifa-antique-nickel.jpg'
  ];

  for (const c of coins) {
    const meta = await sharp(`public/images/official/${c}`).metadata();
    const { data, info } = await sharp(`public/images/official/${c}`).raw().toBuffer({ resolveWithObject: true });
    // check corner color:
    const cornerTL = [data[0], data[1], data[2]];
    console.log(c, meta.width, 'x', meta.height, 'cornerTL:', cornerTL);
  }
}

inspectCoins();
