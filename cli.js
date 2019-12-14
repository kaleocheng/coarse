const fs = require('fs').promises;
const path = require('path');
const coarse = require('./lib/index');

async function roughSVG(file) {
  try {
    const svg = await fs.readFile(file);
    const roughened = coarse(svg, { fillStyle: 'solid' });
    const filename = path.basename(file);
    await fs.writeFile(`rough/${filename}`, roughened);
  } catch (err) {
    console.error('rough svg file failed', err);
  }
}

if (process.argv.length <= 2) {
  console.log('need svg file');
  process.exit(0);
}
const files = process.argv.slice(2);

files.forEach(file => {
  roughSVG(file);
});
