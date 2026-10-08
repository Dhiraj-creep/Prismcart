import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useParams, useNavigate, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/Toast';

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const CataloguePage = lazy(() => import('./pages/CataloguePage').then((m) => ({ default: m.CataloguePage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage })));
const WishlistPage = lazy(() => import('./pages/WishlistPage').then((m) => ({ default: m.WishlistPage })));
const CartPage = lazy(() => import('./pages/CartPage').then((m) => ({ default: m.CartPage })));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage').then((m) => ({ default: m.CheckoutPage })));
const OrderConfirmationPage = lazy(() => import('./pages/OrderConfirmationPage').then((m) => ({ default: m.OrderConfirmationPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

// Route loading fallback
function PageFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin" />
        <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">Loading PrismCart...</span>
      </div>
    </div>
  );
}

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Seamless redirect from /category/:categoryId to /catalogue?category=:categoryId
function CategoryRedirect() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryId) {
      navigate(`/catalogue?category=${categoryId}`, { replace: true });
    }
  }, [categoryId, navigate]);

  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <WishlistProvider>
          <CartProvider>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col bg-[#F7F8FC] text-slate-800 font-sans antialiased selection:bg-violet-600 selection:text-white">
              <Header />
              <main id="main-content" className="flex-1">
                <Suspense fallback={<PageFallback />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/catalogue" element={<CataloguePage />} />
                    <Route path="/category/:categoryId" element={<CategoryRedirect />} />
                    <Route path="/product/:slug" element={<ProductDetailPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
              <ToastContainer />
            </div>
          </CartProvider>
        </WishlistProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
