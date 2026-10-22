import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import LuckyGlobeWidget from './components/LuckyGlobeWidget';

import Home from './pages/Home';
import Catalog from './pages/Catalog';
import TourDetail from './pages/TourDetail';
import About from './pages/About';
import Reviews from './pages/Reviews';
import Randomizer from './pages/Randomizer';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname]);

  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-[#FA9A1B] selection:text-white overflow-x-hidden">
      <ScrollToTop />
      
      <Navbar />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/tour/:slug" element={<TourDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/lucky-globe" element={<Randomizer />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />

      {/* Плавающий мини-виджет «Глобус Удачі» */}
      <LuckyGlobeWidget />

      {/* Плавающая круглая кнопка Telegram чата */}
      <a
        href="https://t.me"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-24 right-6 z-30 w-14 h-14 rounded-full bg-[#29A9EA] hover:bg-[#2096d3] text-white shadow-2xl flex items-center justify-center transition-transform hover:scale-110 group"
        title="Онлайн чат у Telegram"
      >
        <Send className="w-6 h-6 -ml-0.5 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
      </a>

      <BookingModal />
    </div>
  );
}
