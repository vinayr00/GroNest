const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const categories = [
  { name: 'Fruits', query: 'fruits' },
  { name: 'Vegetables', query: 'vegetables' },
  { name: 'Snacks', query: 'snacks' },
  { name: 'Dairy Products', query: 'dairy' },
  { name: 'Rice & Grains', query: 'rice,grains' },
  { name: 'Beverages', query: 'beverages' },
  { name: 'Bakery', query: 'bakery' },
  { name: 'Packaged Foods', query: 'packaged foods' }
];

const outDir = path.join(__dirname, '..', 'public', 'assets', 'categories');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

categories.forEach((c) => {
  const fileName = c.query.replace(/[^a-z0-9]+/gi, '-').toLowerCase() + '.jpg';
  const dest = path.join(outDir, fileName);
  const url = `https://source.unsplash.com/1200x800/?${encodeURIComponent(c.query)}`;
  try {
    console.log(`Downloading category ${c.name} -> ${dest}`);
    execSync(`curl -sSL -o "${dest}" "${url}"`, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Failed to download ${c.name}:`, err.message);
  }
});

console.log('Category download complete.');
