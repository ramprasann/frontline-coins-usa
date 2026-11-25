import sharp from 'sharp';
import fs from 'fs';

async function analyzeAndCrop(filename) {
  const filePath = `public/images/official/${filename}`;
  const image = sharp(filePath);
  const metadata = await image.metadata();
  console.log(filename, metadata.width, metadata.height, metadata.format);

  // Let's get raw pixel buffer
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  console.log('Channels:', info.channels, 'Size:', data.length);

  // We want to detect the coin bounds or crop the circular coin out cleanly.
  // The background is red velvet cloth.
  // Let's sample colors in the corners:
  // Top-left (x=20, y=20), Top-right (x=width-20, y=20), Bottom-left, Bottom-right
  const getPixel = (x, y) => {
    const idx = (y * info.width + x) * info.channels;
    return [data[idx], data[idx+1], data[idx+2]];
  };

  console.log('Corner TL:', getPixel(20, 20));
  console.log('Corner TR:', getPixel(info.width - 20, 20));
  console.log('Center:', getPixel(Math.floor(info.width/2), Math.floor(info.height/2)));
}

async function main() {
  await analyzeAndCrop('custom-showcase-coin-1.png');
  await analyzeAndCrop('custom-showcase-coin-2.png');
}

main().catch(console.error);
