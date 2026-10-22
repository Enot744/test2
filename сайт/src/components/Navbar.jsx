import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Send, ChevronDown, Facebook, Instagram, Youtube, Compass, Sparkles } from 'lucide-react';
import { useTours } from '../context/ToursContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage } = useTours();

  const navLinks = [
    { 
      name: language === 'ua' ? 'БЛИЖЧІ ТУРИ' : 'БЛИЖАЙШИЕ ТУРЫ', 
      path: '/catalog' 
    },
    { 
      name: language === 'ua' ? 'ПРО НАС' : 'О НАС', 
      path: '/about' 
    },
    { 
      name: language === 'ua' ? 'ВІДГУКИ' : 'ОТЗЫВЫ', 
      path: '/reviews' 
    },
    { 
      name: language === 'ua' ? 'ГЛОБУС УДАЧІ' : 'ГЛОБУС УДАЧИ', 
      path: '/lucky-globe',
      isHot: true
    }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
          <div className="flex items-center justify-between">
            {/* Уникальное название бренда: OUTWAY TRAVEL */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FA9A1B] flex items-center justify-center font-black text-slate-950 text-xl shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
                <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl sm:text-2xl md:text-3xl tracking-tight text-[#233876] group-hover:text-[#FA9A1B] transition-colors leading-none">
                  OUTWAY
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-slate-500 uppercase mt-0.5">
                  TRAVEL CLUB
                </span>
              </div>
            </Link>

            {/* Десктоп Меню */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-[13px] font-extrabold tracking-wide text-slate-700">
              <Link 
                to="/" 
                className={`transition-colors uppercase hover:text-[#FA9A1B] ${
                  location.pathname === '/' ? 'text-[#233876] font-black' : 'text-slate-700'
                }`}
              >
                {language === 'ua' ? 'ГОЛОВНА' : 'ГЛАВНАЯ'}
              </Link>

              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative transition-colors uppercase flex items-center space-x-1.5 ${
                      link.isHot 
                        ? 'text-amber-600 hover:text-amber-500 font-black' 
                        : isActive 
                          ? 'text-[#233876] font-black' 
                          : 'text-slate-700 hover:text-[#FA9A1B]'
                    }`}
                  >
                    {link.isHot && <Compass className="w-4 h-4 text-[#FA9A1B] animate-spin duration-[8000ms]" />}
                    <span>{link.name}</span>
                    {link.isHot && (
                      <span className="bg-gradient-to-r from-red-500 to-amber-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded-md shadow-sm uppercase animate-pulse">
                        HOT
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Десктоп правый блок */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={() => setLanguage(language === 'ua' ? 'ru' : 'ua')}
                className="flex items-center space-x-1 text-xs font-bold text-slate-700 hover:text-[#FA9A1B] transition-colors py-1 px-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer"
              >
                <span>{language === 'ua' ? 'Ua' : 'Ru'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#233876] hover:text-[#FA9A1B] hover:bg-slate-50 transition-colors border border-slate-200/90 shadow-sm"
              >
                <div className="w-5 h-5 rounded-full bg-[#29A9EA] text-white flex items-center justify-center">
                  <Send className="w-3 h-3 -ml-0.5" />
                </div>
                <span className="uppercase tracking-wider">
                  ОНЛАЙН ЧАТ
                </span>
              </a>

              <div className="flex items-center space-x-2 text-slate-700 pl-2 border-l border-slate-200">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-1.5 hover:text-[#233876] hover:bg-slate-100 rounded-full transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-1.5 hover:text-[#233876] hover:bg-slate-100 rounded-full transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-1.5 hover:text-[#233876] hover:bg-slate-100 rounded-full transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Мобильная шапка: Кнопка переключения языка и бургер */}
            <div className="flex md:hidden items-center space-x-2">
              <button
                onClick={() => setLanguage(language === 'ua' ? 'ru' : 'ua')}
                className="px-2.5 py-1 text-xs font-extrabold text-[#233876] border border-slate-200 rounded-lg active:scale-95 transition-all bg-slate-50 cursor-pointer"
              >
                {language.toUpperCase()}
              </button>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer active:scale-95"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6 text-[#233876]" /> : <Menu className="w-6 h-6 text-[#233876]" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Мобильное всплывающее меню с оверлеем */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Затемняющий оверлей */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 top-[57px] bg-slate-950/50 backdrop-blur-sm z-30 md:hidden"
            />

            {/* Меню-панель */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 top-[57px] z-40 bg-white border-b border-slate-200 p-5 md:hidden shadow-2xl max-h-[calc(100vh-65px)] overflow-y-auto"
            >
              <div className="flex flex-col space-y-3 font-bold text-sm text-slate-800">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-2.5 border-b border-slate-100 uppercase tracking-wide flex items-center justify-between ${
                    location.pathname === '/' ? 'text-[#233876] font-black' : 'hover:text-[#FA9A1B]'
                  }`}
                >
                  <span>{language === 'ua' ? 'Головна' : 'Главная'}</span>
                  <span className="text-xs text-slate-400">→</span>
                </Link>

                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`py-2.5 border-b border-slate-100 flex items-center justify-between uppercase tracking-wide ${
                      link.isHot 
                        ? 'text-amber-600 font-black' 
                        : location.pathname === link.path
                          ? 'text-[#233876] font-black'
                          : 'hover:text-[#FA9A1B]'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {link.isHot && <Compass className="w-4 h-4 text-[#FA9A1B] animate-spin" />}
                      <span>{link.name}</span>
                    </div>
                    {link.isHot ? (
                      <span className="bg-gradient-to-r from-red-500 to-amber-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase shadow-sm">
                        HOT
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">→</span>
                    )}
                  </Link>
                ))}

                {/* Выбор языка в мобильном меню */}
                <div className="pt-2 flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase">
                    {language === 'ua' ? 'Мова сайту:' : 'Язык сайта:'}
                  </span>
                  <div className="flex space-x-1.5">
                    <button
                      onClick={() => setLanguage('ua')}
                      className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                        language === 'ua' 
                          ? 'bg-[#233876] text-white shadow-sm' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      UA
                    </button>
                    <button
                      onClick={() => setLanguage('ru')}
                      className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                        language === 'ru' 
                          ? 'bg-[#233876] text-white shadow-sm' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      RU
                    </button>
                  </div>
                </div>

                {/* Кнопка онлайн-чата в Telegram */}
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 bg-[#29A9EA] hover:bg-[#2096d3] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center space-x-2 mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>ОНЛАЙН ЧАТ У TELEGRAM</span>
                </a>

                {/* Иконки соцсетей */}
                <div className="flex items-center justify-center space-x-4 pt-2 text-slate-500">
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 hover:text-[#233876] transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 hover:text-[#233876] transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2 hover:text-[#233876] transition-colors">
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
