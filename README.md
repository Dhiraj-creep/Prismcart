# PrismCart — Enterprise E-Commerce Platform

[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Spring Boot](https://img.shields.io/badge/SpringBoot-3.2-6DB33F?logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-17%20%2F%2021-ED8B00?logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Database](https://img.shields.io/badge/Database-H2%20%2F%20MySQL-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)

**PrismCart** is a modern, high-performance, full-stack e-commerce catalog and ordering platform. Built with **React 19**, **TypeScript**, and **Tailwind CSS v4** on the frontend, paired with a robust **Spring Boot 3 REST API** and dual **H2 / MySQL** database layer on the backend.

Designed with a **hybrid resilient architecture**: PrismCart connects to live Spring Boot REST endpoints when active, and features a zero-dependency offline fallback engine ensuring 100% demo uptime and resilience.

---

## 🚀 Key Highlights & Architecture

- **60 Distinct Curated Products across 8 Niches**: Electronics, Fashion, Footwear, Home & Living, Beauty & Personal Care, Sports & Fitness, Books & Stationery, and Accessories.
- **Financial Precision (Integer Paise Arithmetic)**: All monetary operations (subtotals, discounts, delivery rules, and order lines) execute using integer paise (`Math.round(rupees * 100)`) preventing IEEE 754 floating-point precision bugs.
- **Compound Faceted Filtering & JPA Specifications**: Simultaneous multi-criteria filtering by category, search keyword, price brackets, customer ratings, in-stock availability, and badge tags.
- **Two-Way URL State Synchronization**: Filter parameters (`search`, `category`, `minPrice`, `maxPrice`, `rating`, `inStock`, `sort`, `page`) are bound to `URLSearchParams` for shareable links and browser history navigation.
- **Hybrid Live / Offline Architecture**: Real-time heartbeat checking displays a live status indicator (`Live Spring Boot API :8088` vs `Offline Demo Ready`). Order placement seamlessly syncs with Spring Boot or falls back locally.
- **Stock Capping & Inventory Protection**: Prevents overselling by bounding cart increments to available inventory.
- **Code-Splitting & High Performance**: Route-level lazy loading (`React.lazy` + `Suspense`) keeps the initial bundle compact with fast sub-second page loads.
- **Zero-Setup Database Out-of-the-Box**: Uses embedded persistent H2 database by default (with web console at `/h2-console`) with auto-seeding on startup. Switch to MySQL with a single configuration flag.

---

## 🏛️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   PrismCart Client (React 19)               │
│  - Vite 8 + TypeScript + Tailwind CSS v4                   │
│  - URL SearchParams 2-Way Sync Engine                       │
│  - Integer Paise Math Utilities                             │
│  - Resilient LocalStorage Schema Validation                 │
└──────────────┬──────────────────────────────▲───────────────┘
               │                              │
     HTTP REST │ (Port 8088)       Fallback   │ (Offline Mode)
     JSON APIs │                              │
               ▼                              │
┌──────────────────────────────────────────┐  │
│       Spring Boot 3.2 REST API Server    │  │
│  - CategoryController & ProductController │  │
│  - OrderController (Inventory deduction) │  │
│  - CouponController (Discount validation)│  │
│  - Dynamic JPA Specification Engine      │  │
│  - Automated Catalog DataSeeder          │  │
└──────────────┬───────────────────────────┘  │
               │                              │
               ▼                              │
┌──────────────────────────────────────────┐  │
│              Database Layer              │  │
│  - Default: Embedded H2 File DB          │  │
│  - Production: MySQL (active profile)    │  │
└──────────────────────────────────────────┴──┘
```

---

## 📂 Project Structure

```
prismcart/
├── backend/                               # Spring Boot 3 Backend
│   ├── src/main/java/com/example/prismcart/
│   │   ├── config/WebMvcConfig.java       # Global CORS & HTTP settings
│   │   ├── controller/                    # REST Controllers (Product, Category, Order, Coupon, Health)
│   │   ├── dto/                           # Data Transfer Objects
│   │   ├── entity/                        # JPA Entities (Product, Category, Order, OrderItem, Coupon)
│   │   ├── repository/                    # Spring Data Repositories & JPA Specification Executors
│   │   ├── seeder/DataSeeder.java         # Auto-seeds 60 products & categories on startup
│   │   ├── service/                       # Business Logic Layer
│   │   └── specification/                 # Dynamic multi-facet JPA Criteria Queries
│   ├── src/main/resources/
│   │   ├── application.properties         # Default profile (H2 embedded DB, port 8088)
│   │   ├── application-mysql.properties   # Production profile for MySQL
│   │   └── data/                          # Seed datasets (categories.json, products.json)
│   └── pom.xml                            # Maven dependencies & build configuration
│
├── src/                                   # React 19 Frontend
│   ├── components/
│   │   ├── cart/                          # CartItemRow, CouponInput, OrderSummaryCard
│   │   ├── catalogue/                     # ProductCard, FilterSidebar, SearchBar, Pagination...
│   │   └── common/                        # Header, Footer, Toast, RatingDisplay, Badges...
│   ├── context/                           # CartContext, WishlistContext, ToastContext
│   ├── data/                              # Typed fallback datasets (60 products, 8 categories)
│   ├── pages/                             # Lazy-loaded route views (Home, Catalogue, ProductDetail...)
│   ├── services/                          # api.ts (Hybrid live REST / offline client)
│   ├── types/                             # TypeScript interfaces & domain contracts
│   └── utils/                             # currency.ts (paise math), filterProducts.ts, storage.ts
│
├── public/images/products/                # 60 high-resolution local product photographs
├── scripts/                               # download-images.js, export-data-json.js
├── PRESENTATION.md                        # Presentation guide, judging script, and FAQ defense
└── ATTRIBUTION.md                         # Photography credits under Unsplash Commercial License
```

---

## ⚡ Quick Start Guide

### 1. Prerequisites
- **Node.js** 18+ (tested on Node 20+)
- **Java JDK** 17 or 21
- **Maven** 3.8+ (optional if running pre-packaged JAR)

### 2. Running the Backend

#### Option A: Running the Packaged JAR (Fastest)
```bash
cd backend
java -jar target/prismcart-0.0.1-SNAPSHOT.jar
```
*The Spring Boot server will start on `http://localhost:8088`. On first boot, it automatically seeds 8 categories, 60 products, and demo coupons.*

#### Option B: Running with Maven
```bash
cd backend
mvn spring-boot:run
```

#### Option C: Running with MySQL
Create a database named `prismcart`, then start with the MySQL profile:
```bash
cd backend
java -jar -Dspring.profiles.active=mysql target/prismcart-0.0.1-SNAPSHOT.jar
```

- **API Health**: [http://localhost:8088/api/health](http://localhost:8088/api/health)
- **H2 Web Console**: [http://localhost:8088/h2-console](http://localhost:8088/h2-console)  
  *(JDBC URL: `jdbc:h2:file:./prismcart-data`, User: `sa`, Password: empty)*

---

### 3. Running the Frontend

In the root directory:
```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev
```

Open your browser to:
**`http://localhost:5173`**

The header will show:
- 🟢 **Live Spring Boot API (:8088)** when backend is running.
- 🟣 **Offline Demo Ready** if backend is stopped.

---

## 📡 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health check |
| `GET` | `/api/categories` | Retrieve all 8 categories with product counts |
| `GET` | `/api/categories/{idOrSlug}` | Retrieve single category details |
| `GET` | `/api/products` | Dynamic query (`category`, `brand`, `search`, `minPrice`, `maxPrice`, `minRating`, `inStockOnly`, `sort`) |
| `GET` | `/api/products/{slug}` | Retrieve single product with specifications |
| `GET` | `/api/products/badge/{badge}` | Filter by badge (`Featured`, `Bestseller`, `New`) |
| `POST` | `/api/orders` | Create order, validate stock, compute discounts, return order receipt |
| `GET` | `/api/orders/{orderNumber}` | Retrieve order details by order number |
| `GET` | `/api/coupons/validate` | Validate promo code (`?code=WELCOME10&subtotalPaise=200000`) |

---

## 🧪 Testing & Code Quality

```bash
# Run Vitest unit tests (27 passing tests)
npm test

# Run Oxlint high-speed linter (0 errors, 0 warnings)
npm run lint

# Production build and bundle size check
npm run build
```

---

## 🎁 Demo Credentials & Coupons

- **Demo Coupon Code**: `WELCOME10` — 10% discount capped at ₹500
- **Second Coupon**: `SUPER20` — 20% discount on orders above ₹1,500 (capped at ₹1,000)
- **Free Shipping Rule**: Orders ₹999 and above receive free shipping (standard: ₹79)
- **Reset Demo Data**: Click **"Reset Demo"** in header or footer to wipe local storage back to fresh state.

---

## 📄 License & Attribution

- **Source Code**: MIT License.
- **Photography**: All product images are sourced under the **Unsplash Commercial License**. Complete photographer credits are documented in [ATTRIBUTION.md](ATTRIBUTION.md).