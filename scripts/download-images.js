import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.resolve(__dirname, '../public/images/products');
const heroOutPath = path.resolve(__dirname, '../public/images/hero.jpg');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 60 distinct Unsplash images curated for each product
const items = [
  // Electronics (8)
  { slug: 'sonic-shield-anc-headphones', photoId: 'photo-1505740420928-5e560c06d30e', photographer: 'KISS Miklós', desc: 'Over-ear headphones' },
  { slug: 'pulse-sync-smartwatch', photoId: 'photo-1523275335684-37898b6baf30', photographer: 'Rachit Tank', desc: 'Smartwatch device' },
  { slug: 'tactile-pro-mechanical-keyboard', photoId: 'photo-1587829741301-dc798b83add3', photographer: 'Jay Zhang', desc: 'Mechanical keyboard' },
  { slug: 'viewmax-4k-ultraslim-monitor', photoId: 'photo-1527443224154-c4a3942d3acf', photographer: 'Alexandru Acea', desc: '4K computer monitor' },
  { slug: 'boomwave-waterproof-speaker', photoId: 'photo-1608043152269-423dbba4e7e1', photographer: 'Devin Avery', desc: 'Bluetooth portable speaker' },
  { slug: 'lumix-creator-mirrorless-camera', photoId: 'photo-1516035069371-29a1b244cc32', photographer: 'Enis Yavuz', desc: 'Mirrorless camera kit' },
  { slug: 'ergodesk-vertical-wireless-mouse', photoId: 'photo-1615663245857-ac93bb7c39e7', photographer: 'Oscar Ivan Esquivel Arteaga', desc: 'Ergonomic wireless mouse' },
  { slug: 'nestview-smart-video-doorbell', photoId: 'photo-1558002038-1055907df827', photographer: 'Sebastian Scholz', desc: 'Smart IoT video doorbell' },

  // Fashion (8)
  { slug: 'tailored-linen-blazer', photoId: 'photo-1507679799987-c73779587ccf', photographer: 'Hunters Race', desc: 'Tailored slim blazer' },
  { slug: 'organic-cotton-hoodie', photoId: 'photo-1556905055-8f358a7a47b2', photographer: 'Faith Yarn', desc: 'Organic cotton hoodie' },
  { slug: 'mulberry-silk-saree', photoId: 'photo-1610030469983-98e550d6193c', photographer: 'Pravin Shah', desc: 'Traditional silk saree drape' },
  { slug: 'classic-denim-trucker-jacket', photoId: 'photo-1576995853123-5a10305d93c0', photographer: 'Clem Onojeghuo', desc: 'Classic denim trucker jacket' },
  { slug: 'ribbed-merino-wool-sweater', photoId: 'photo-1434389677669-e08b4cac3105', photographer: 'Rocknwool', desc: 'Merino wool sweater' },
  { slug: 'floral-chiffon-maxi-dress', photoId: 'photo-1572804013309-59a88b7e92f1', photographer: 'Tamara Bellis', desc: 'Floral summer dress' },
  { slug: 'leather-shearling-biker-jacket', photoId: 'photo-1551028719-00167b16eac5', photographer: 'Garry Gheboian', desc: 'Leather biker jacket' },
  { slug: 'relaxed-pleated-cargo-trousers', photoId: 'photo-1624378439575-d8705ad7ae80', photographer: 'Marlon Schmeiski', desc: 'Cargo utility trousers' },

  // Footwear (8)
  { slug: 'pro-cushion-running-shoes', photoId: 'photo-1542291026-7eec264c27ff', photographer: 'Hermes Rivera', desc: 'Red performance running shoes' },
  { slug: 'handcrafted-tan-oxfords', photoId: 'photo-1533867617858-e7b97e060509', photographer: 'Giammarco Boscaro', desc: 'Handcrafted leather oxford shoes' },
  { slug: 'trail-summit-hiking-boots', photoId: 'photo-1520639888713-7851133b1ed0', photographer: 'Jake Melara', desc: 'Trail summit hiking boots' },
  { slug: 'minimalist-white-leather-sneakers', photoId: 'photo-1525966222134-fcfa99b8ae77', photographer: 'Shoe Art', desc: 'Classic white leather sneakers' },
  { slug: 'casual-suede-slipon-loafers', photoId: 'photo-1560343090-f0409e92791a', photographer: 'Lina Verovaya', desc: 'Suede casual slip-on loafers' },
  { slug: 'all-weather-chelsea-boots', photoId: 'photo-1638247025967-b4e38f787b76', photographer: 'Nathan Dumlao', desc: 'All weather chelsea leather boots' },
  { slug: 'retro-high-top-streetwear-sneakers', photoId: 'photo-1552346154-21d32810aba3', photographer: 'Imanuel May', desc: 'Retro high top streetwear sneakers' },
  { slug: 'orthopedic-cushion-cork-sandals', photoId: 'photo-1603808033192-082d6919d3e1', photographer: 'Jakob Owens', desc: 'Ergonomic cork sandals' },

  // Home & Living (8)
  { slug: 'ceramic-pour-over-carafe', photoId: 'photo-1514432324607-a09d9b4aefdd', photographer: 'Nathan Dumlao', desc: 'Ceramic pour-over coffee maker' },
  { slug: 'smart-ambient-sunset-lamp', photoId: 'photo-1507473885765-e6ed057f782c', photographer: 'Federico Respini', desc: 'Warm ambient projector lamp' },
  { slug: 'cast-iron-enameled-dutch-oven', photoId: 'photo-1584990347449-399066f36ee3', photographer: 'Cooker Art', desc: 'Enameled cast iron dutch oven' },
  { slug: 'egyptian-cotton-bedding-set', photoId: 'photo-1631679706909-1844bbd07221', photographer: 'Spacejoy', desc: 'Pure cotton duvet bedding set' },
  { slug: 'solid-teak-minimalist-wall-clock', photoId: 'photo-1563861826100-9cb868fdbe1c', photographer: 'Kevin Bhagat', desc: 'Minimalist wooden wall clock' },
  { slug: 'velvet-tufted-accent-cushions', photoId: 'photo-1584100936595-c0654b55a2e2', photographer: 'Diogo Brandao', desc: 'Velvet decorative cushions' },
  { slug: 'ultrasonic-aromatherapy-diffuser', photoId: 'photo-1608571423902-eed4a5ad8108`', photographer: 'Kari Shea', desc: 'Aroma diffuser device' },
  { slug: 'bohemian-cotton-throw-blanket', photoId: 'photo-1580301762395-21ce84d00bc6', photographer: 'Melina Kiefer', desc: 'Textured woven throw blanket' },

  // Beauty & Personal Care (7)
  { slug: 'vitamin-c-glow-serum', photoId: 'photo-1620916566398-39f1143ab7be', photographer: 'Curology', desc: 'Vitamin C facial serum' },
  { slug: 'hyaluronic-hydration-water-cream', photoId: 'photo-1556228720-195a672e8a03', photographer: 'Mathilde Langevin', desc: 'Hydrating skincare cream' },
  { slug: 'sonic-silicone-facial-cleanser', photoId: 'photo-1570172619644-dfd03ed5d881', photographer: 'Fleur Kaan', desc: 'Skincare cleansing device' },
  { slug: 'cold-pressed-argan-hair-elixir', photoId: 'photo-1608248597359-2169b9175404', photographer: 'Deanna Alys', desc: 'Cold pressed organic hair oil' },
  { slug: 'velour-matte-lipstick-trio', photoId: 'photo-1586495777744-4413f21062fa', photographer: 'Laura Chouette', desc: 'Matte velvet lipstick set' },
  { slug: 'mineral-matte-sunscreen-spf50', photoId: 'photo-1598440947619-2c35fc9aa908', photographer: 'Fleur Kaan', desc: 'Mineral sunscreen lotion' },
  { slug: 'exfoliating-arabica-coffee-body-scrub', photoId: 'photo-1567928815116-f6d2f664a784', photographer: 'Content Pixie', desc: 'Natural coffee body scrub' },

  // Sports & Fitness (7)
  { slug: 'pro-grip-alignment-yoga-mat', photoId: 'photo-1601925260368-ae2f83cf8b7f', photographer: 'Dylan Gillis', desc: 'Eco friendly yoga mat' },
  { slug: 'adjustable-dial-dumbbell-pair', photoId: 'photo-1583454110551-21f2fa2afe61', photographer: 'Sven Mieke', desc: 'Adjustable metal dumbbells' },
  { slug: 'multi-tension-resistance-bands', photoId: 'photo-1598289431512-b97b0917affc', photographer: 'Anastase Maragos', desc: 'Workout resistance bands' },
  { slug: 'insulated-sports-tumbler-1000ml', photoId: 'photo-1602143407151-7111542de6e8', photographer: 'Bluewater Globe', desc: 'Stainless steel water bottle' },
  { slug: 'smart-digital-speed-jump-rope', photoId: 'photo-1518611012118-696072aa579a', photographer: 'Gabin Vallet', desc: 'Speed skipping jump rope' },
  { slug: 'high-impact-athletic-compression-top', photoId: 'photo-1506152983158-b4a74a01c721', photographer: 'Edgar Chaparro', desc: 'Performance athletic top' },
  { slug: 'quick-dry-microfiber-gym-towels', photoId: 'photo-1517838277536-f5f99be501cd', photographer: 'Victor Freitas', desc: 'Fitness workout towels' },

  // Books & Stationery (7)
  { slug: 'hardbound-dot-grid-bullet-journal', photoId: 'photo-1544716278-ca5e3f4abd8c', photographer: 'Kelly Sikkema', desc: 'Dot grid hardcover notebook' },
  { slug: 'vintage-brass-fountain-pen', photoId: 'photo-1585336261026-6fb73d8e578c', photographer: 'Aaron Burden', desc: 'Vintage brass fountain pen' },
  { slug: 'solid-bamboo-ergonomic-lap-desk', photoId: 'photo-1589578527966-fdac0f44566c', photographer: 'Bench Accounting', desc: 'Bamboo laptop work desk' },
  { slug: 'architectural-precision-fineliner-set', photoId: 'photo-1583485088034-697b5bc54ccd', photographer: 'Kelli McClintock', desc: 'Drawing and drafting pens' },
  { slug: 'amber-led-clip-reading-lamp', photoId: 'photo-1513542789411-b6a5d4f31634', photographer: 'Patrick Perkins', desc: 'Desk reading lamp' },
  { slug: 'pastel-study-stationery-suite', photoId: 'photo-1586075010923-2dd4570fb338', photographer: 'Joanna Kosinska', desc: 'Pastel stationery set' },
  { slug: 'minimalist-walnut-desk-organizer', photoId: 'photo-1505373877841-8d25f7d46678', photographer: 'Alexandre Debiève', desc: 'Wood desktop dock organizer' },

  // Accessories (7)
  { slug: 'top-grain-leather-bifold-wallet', photoId: 'photo-1627123424574-724758594e93', photographer: 'Two Men and a Little Shop', desc: 'Brown leather wallet' },
  { slug: 'aviator-polarized-sunglasses', photoId: 'photo-1511499767150-a48a237f0083', photographer: 'Ethan Robertson', desc: 'Aviator sunglasses' },
  { slug: 'aerospace-chronograph-watch', photoId: 'photo-1522335789203-aabd1fc54bc9', photographer: 'John Torcasio', desc: 'Chronograph stainless steel watch' },
  { slug: 'commute-pro-waterproof-backpack', photoId: 'photo-1553062407-98eeb64c6a62', photographer: 'Sun Lingyan', desc: 'Waterproof laptop backpack' },
  { slug: 'geometric-brass-pendant-necklace', photoId: 'photo-1599643478518-a784e5dc4c8f', photographer: 'Castorly Stock', desc: 'Handcrafted pendant jewelry' },
  { slug: 'silk-pocket-square-cufflink-set', photoId: 'photo-1596755094514-f87e34085b2c', photographer: 'NordWood Themes', desc: 'Silk formal accessories' },
  { slug: 'modular-tech-travel-organizer', photoId: 'photo-1544816155-12df9643f363', photographer: 'Kari Shea', desc: 'Cable and gadget travel pouch' },
];

// Clean photoId if any stray backtick
for (const item of items) {
  item.photoId = item.photoId.replace(/`/g, '');
}

async function downloadImage(url, destPath) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'PrismCart-Downloader/1.0' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(destPath, buffer);
    return true;
  } catch (err) {
    console.error(`Failed downloading ${url}:`, err.message);
    return false;
  }
}

// Attractive SVG fallback generator if offline or rate-limited
function createFallbackSvg(slug, desc) {
  const words = desc.split(' ');
  const title = words.slice(0, 3).join(' ');
  const subtitle = words.slice(3).join(' ');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#14213D"/>
        <stop offset="50%" stop-color="#243456"/>
        <stop offset="100%" stop-color="#6D28D9"/>
      </linearGradient>
    </defs>
    <rect width="600" height="600" fill="url(#g)"/>
    <circle cx="300" cy="240" r="90" fill="#ffffff" fill-opacity="0.1"/>
    <path d="M260 240 L340 240 M300 200 L300 280" stroke="#FBBF24" stroke-width="6" stroke-linecap="round"/>
    <text x="300" y="380" font-family="system-ui, sans-serif" font-size="28" font-weight="700" fill="#ffffff" text-anchor="middle">${title}</text>
    <text x="300" y="420" font-family="system-ui, sans-serif" font-size="18" fill="#F7F8FC" fill-opacity="0.8" text-anchor="middle">${subtitle}</text>
    <text x="300" y="520" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#FBBF24" letter-spacing="2" text-anchor="middle">PRISMCART VERIFIED</text>
  </svg>`;
}

async function run() {
  console.log(`Starting download of ${items.length} product images...`);
  let successCount = 0;
  let fallbackCount = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const targetFile = path.join(outDir, `${item.slug}.jpg`);

    // Check if already exists and has valid size
    if (fs.existsSync(targetFile) && fs.statSync(targetFile).size > 2000) {
      console.log(`[${i + 1}/${items.length}] Already exists: ${item.slug}.jpg`);
      successCount++;
      continue;
    }

    const unsplashUrl = `https://images.unsplash.com/${item.photoId}?auto=format&fit=crop&w=600&h=600&q=80`;
    console.log(`[${i + 1}/${items.length}] Fetching ${item.slug}...`);
    const ok = await downloadImage(unsplashUrl, targetFile);
    if (ok) {
      successCount++;
    } else {
      // Write high-quality SVG fallback
      fs.writeFileSync(targetFile, createFallbackSvg(item.slug, item.desc));
      fallbackCount++;
      console.log(`Saved styled fallback for ${item.slug}`);
    }
  }

  // Hero image
  if (!fs.existsSync(heroOutPath) || fs.statSync(heroOutPath).size < 2000) {
    const heroUrl = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&h=600&q=85';
    console.log('Fetching hero image...');
    const ok = await downloadImage(heroUrl, heroOutPath);
    if (!ok) {
      fs.writeFileSync(heroOutPath, createFallbackSvg('hero', 'PrismCart Curated Storefront'));
    }
  }

  console.log(`Done! Success: ${successCount}, Fallback: ${fallbackCount}. Total files: ${items.length}`);
}

run();
