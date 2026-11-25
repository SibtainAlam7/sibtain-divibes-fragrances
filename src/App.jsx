import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DrawersAndModals from './components/DrawersAndModals';
import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import {
  AboutPage,
  BlogsPage,
  ContactPage,
  ExchangePolicyPage,
} from './pages/BrandPages';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-ivory text-espresso">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<CollectionPage presetGender="all" />} />
              <Route path="/men" element={<CollectionPage presetGender="men" />} />
              <Route path="/women" element={<CollectionPage presetGender="women" />} />
              <Route path="/product/:slug" element={<ProductDetailPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/aboutus" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/exchange-policy" element={<ExchangePolicyPage />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/blog" element={<BlogsPage />} />
              <Route path="*" element={<CollectionPage presetGender="all" />} />
            </Routes>
          </main>
          <Footer />
          <DrawersAndModals />
        </div>
      </StoreProvider>
    </BrowserRouter>
  );
}
