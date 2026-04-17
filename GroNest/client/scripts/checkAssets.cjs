const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'public', 'assets', 'products');
console.log('Checking product assets in', assetsDir);
if (!fs.existsSync(assetsDir)) {
  console.error('Assets directory missing');
  process.exit(1);
}

const files = fs.readdirSync(assetsDir).filter(f => /\.(jpg|jpeg|png|svg)$/i.test(f));
if (!files.length) {
  console.error('No image files found in products assets');
  process.exit(1);
}

files.forEach(f => {
  const p = path.join(assetsDir, f);
  const stats = fs.statSync(p);
  console.log(f, '-', stats.size, 'bytes');
});

const catDir = path.join(__dirname, '..', 'public', 'assets', 'categories');
console.log('\nChecking category assets in', catDir);
if (fs.existsSync(catDir)) {
  const cfiles = fs.readdirSync(catDir).filter(f => /\.(jpg|jpeg|png|svg)$/i.test(f));
  cfiles.forEach(f => {
    const p = path.join(catDir, f);
    const stats = fs.statSync(p);
    console.log(f, '-', stats.size, 'bytes');
  });
} else {
  console.log('No categories directory');
}
