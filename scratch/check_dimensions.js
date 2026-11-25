import sharp from 'sharp';

async function checkAll() {
  const list = [
    'custom-showcase-coin-1.png',
    'custom-showcase-coin-2.png',
    'custom-showcase-coin-3.png',
    'custom-showcase-coin-4.png',
    'thank-first-responder.jpg',
    'st-michael-police.jpg',
    'baltimore-sports-coin.jpg',
    'fifa-antique-nickel.jpg',
    'custom-die-struck-coin.jpg'
  ];

  for (const f of list) {
    const meta = await sharp(`public/images/official/${f}`).metadata();
    console.log(f, meta.width, 'x', meta.height);
  }
}

checkAll();
