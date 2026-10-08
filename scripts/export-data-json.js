import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ts from 'typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const catTsPath = path.join(rootDir, 'src', 'data', 'categories.ts');
const prodTsPath = path.join(rootDir, 'src', 'data', 'products.ts');

const outDir = path.join(rootDir, 'backend', 'src', 'main', 'resources', 'data');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function loadTsModule(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const transpiled = ts.transpileModule(content, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;

  const m = { exports: {} };
  const fn = new Function('module', 'exports', transpiled);
  fn(m, m.exports);
  return m.exports;
}

try {
  const categoriesModule = loadTsModule(catTsPath);
  const productsModule = loadTsModule(prodTsPath);

  const categories = categoriesModule.CATEGORIES || [];
  const products = productsModule.PRODUCTS || [];

  fs.writeFileSync(
    path.join(outDir, 'categories.json'),
    JSON.stringify(categories, null, 2),
    'utf-8'
  );
  console.log(`Successfully exported ${categories.length} categories to categories.json`);

  // Transform products for backend: price in paise (Math.round(price * 100)), etc.
  const backendProducts = products.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    categorySlug: p.categoryId,
    categoryName: p.category,
    price: Math.round(p.price * 100),
    originalPrice: p.originalPrice ? Math.round(p.originalPrice * 100) : null,
    rating: p.rating,
    reviewCount: p.reviewCount,
    shortDescription: p.shortDescription,
    detailedDescription: p.detailedDescription,
    specifications: p.specifications || {},
    stockQuantity: p.stock,
    imageUrl: p.image,
    imageAltText: p.alt,
    tags: p.tags || [],
    badge: p.badge || null,
  }));

  fs.writeFileSync(
    path.join(outDir, 'products.json'),
    JSON.stringify(backendProducts, null, 2),
    'utf-8'
  );
  console.log(`Successfully exported ${backendProducts.length} products to products.json`);
} catch (err) {
  console.error('Export failed:', err);
  process.exit(1);
}
