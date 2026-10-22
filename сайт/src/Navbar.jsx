import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Send, ChevronDown, Facebook, Instagram, Youtube } from 'lucide-react';
import { useTours } from '../context/ToursContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t, openBookingModal } = useTours();

  const navLinks = [
    { name: language === 'ua' ? 'ГОЛОВНА' : 'ГЛАВНАЯ', path: '/' },
    { name: language === 'ua' ? 'КАЛЕНДАР ТУРІВ' : 'КАЛЕНДАРЬ ТУРОВ', path: '/catalog' },
    { name: language === 'ua' ? 'ПРО НАС' : 'О НАС', path: '/about' },
    { name: language === 'ua' ? 'БЛОГ' : 'БЛОГ', path: '/about' },
    { name: language === 'ua' ? 'ФОТОЗВІТИ' : 'ФОТООТЧЕТЫ', path: '/catalog' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between">
            {/* Логотип точно как на newwaytravel.com.ua */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-black text-2xl sm:text-3xl tracking-tight text-[#233876] hover:text-[#FA9A1B] transition-colors">
                NEW WAY
              </span>
            </Link>

            {/* Меню навигации в точности как на сайте */}
            <nav className="hidden xl:flex items-center space-x-6 text-[13px] font-extrabold tracking-wide text-slate-700">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path && link.name.includes('ГОЛОВ') || location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`transition-colors uppercase hover:text-[#FA9A1B] ${
                      location.pathname === link.path
                        ? 'text-[#233876] font-black'
                        : 'text-slate-700'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Правый блок: Язык, Кнопка ОНЛАЙН ЧАТ, Соцсети */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Переключатель языка выпадающий (Ua v / Ru v) */}
              <div className="relative group">
                <button
                  onClick={() => setLanguage(language === 'ua' ? 'ru' : 'ua')}
                  className="flex items-center space-x-1 text-xs font-bold text-slate-700 hover:text-[#FA9A1B] transition-colors py-1 px-2 rounded-md hover:bg-slate-50"
                >
                  <span>{language === 'ua' ? 'Ua' : 'Ru'}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
                </button>
              </div>

              {/* Кнопка ОНЛАЙН ЧАТ с иконкой Telegram как на скриншоте */}
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#233876] hover:text-[#FA9A1B] hover:bg-slate-50 transition-colors border border-slate-200/80"
              >
                <div className="w-5 h-5 rounded-full bg-[#29A9EA] text-white flex items-center justify-center">
                  <Send className="w-3 h-3 -ml-0.5" />
                </div>
                <span className="uppercase tracking-wider">
                  {language === 'ua' ? 'ОНЛАЙН ЧАТ' : 'ОНЛАЙН ЧАТ'}
                </span>
              </a>

              {/* Соцсети: Facebook, Instagram, YouTube, Telegram */}
              <div className="flex items-center space-x-2 text-slate-700 pl-1 border-l border-slate-200">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 hover:text-[#233876] hover:bg-slate-100 rounded-full transition-colors"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 hover:text-[#233876] hover:bg-slate-100 rounded-full transition-colors"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 hover:text-[#233876] hover:bg-slate-100 rounded-full transition-colors"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 hover:text-[#233876] hover:bg-slate-100 rounded-full transition-colors"
                  title="Telegram"
                >
                  <Send className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Мобильная кнопка меню */}
            <div className="flex xl:hidden items-center space-x-2">
              <button
                onClick={() => setLanguage(language === 'ua' ? 'ru' : 'ua')}
                className="px-2 py-1 text-xs font-bold text-slate-700 border border-slate-200 rounded"
              >
                {language.toUpperCase()}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-800 hover:bg-slate-100 rounded-lg"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Мобильное меню */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-x-0 top-[65px] z-30 bg-white border-b border-slate-200 p-5 xl:hidden shadow-xl"
          >
            <div className="flex flex-col space-y-3 font-bold text-sm text-slate-800">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 border-b border-slate-100 hover:text-[#FA9A1B]"
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-2 flex items-center justify-between">
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2 text-[#233876] font-bold text-xs"
                >
                  <div className="w-5 h-5 rounded-full bg-[#29A9EA] text-white flex items-center justify-center">
                    <Send className="w-3 h-3 -ml-0.5" />
                  </div>
                  <span>ОНЛАЙН ЧАТ</span>
                </a>

                <div className="flex space-x-3 text-slate-600">
                  <Instagram className="w-4 h-4" />
                  <Facebook className="w-4 h-4" />
                  <Youtube className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
