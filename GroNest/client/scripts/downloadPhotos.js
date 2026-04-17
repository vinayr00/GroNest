const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const productsPath = path.join(__dirname, '..', 'src', 'data', 'products.json');
const outDir = path.join(__dirname, '..', 'public', 'assets', 'products');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const raw = fs.readFileSync(productsPath, 'utf8');
const products = JSON.parse(raw);

products.forEach((p) => {
  const slug = slugify(p.name || 'product');
  const dest = path.join(outDir, `${slug}.jpg`);
  const url = `https://source.unsplash.com/1200x800/?${encodeURIComponent(p.name)}`;
  try {
    console.log(`Downloading ${p.name} -> ${dest}`);
    execSync(`curl -sSL -o "${dest}" "${url}"`, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Failed to download ${p.name}:`, err.message);
  }
});

console.log('Download complete.');
