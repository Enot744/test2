import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, ChevronDown, Send, ShieldCheck, MapPin, Users, Calendar, Fuel, Utensils } from 'lucide-react';
import { useTours } from '../context/ToursContext';

export default function TourDetail() {
  const { slug } = useParams();
  const { tours, language, openBookingModal } = useTours();

  const tour = tours.find((t) => t.slug === slug);
  const [openDays, setOpenDays] = useState({ 1: true });

  const toggleDay = (dayNum) => {
    setOpenDays((prev) => ({
      ...prev,
      [dayNum]: !prev[dayNum],
    }));
  };

  if (!tour) {
    return (
      <div className="pt-36 pb-24 text-center max-w-md mx-auto px-4">
        <h2 className="text-2xl font-black text-slate-900 mb-4">
          {language === 'ua' ? "Тур не знайдено" : "Тур не найден"}
        </h2>
        <Link to="/catalog" className="px-6 py-2.5 bg-brand-500 text-slate-950 font-bold text-xs rounded-xl">
          {language === 'ua' ? "До всіх турів" : "Ко всем турам"}
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pb-24"
    >
      {/* 1. HERO ОБЛОЖКА ТУРА В СТИЛЕ NEW WAY */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-end pb-12 pt-28 px-4 sm:px-6 lg:px-8 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={tour.heroImage}
            alt={tour.title[language]}
            className="w-full h-full object-cover filter brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-slate-950/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full text-white">
          <Link
            to="/catalog"
            className="inline-flex items-center space-x-1.5 text-slate-300 hover:text-brand-500 text-xs font-bold uppercase tracking-wider mb-5 transition-colors bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'ua' ? "Назад до календаря турів" : "Назад в календарь туров"}</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-brand-500 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">
              {tour.formatTag[language]}
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-brand-500" />
              <span>{tour.country}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white max-w-4xl leading-tight mb-4">
            {tour.title[language]}
          </h1>

          <p className="text-slate-200 text-sm sm:text-base max-w-2xl leading-relaxed mb-6 font-medium">
            {tour.subtitle[language]}
          </p>

          {/* Плашка основных характеристик */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 max-w-3xl text-xs">
            <div>
              <span className="text-slate-300 block mb-0.5">Тривалість:</span>
              <span className="text-base font-extrabold text-white">{tour.durationDays} днів</span>
            </div>
            <div>
              <span className="text-slate-300 block mb-0.5">Дати виїзду:</span>
              <span className="text-sm font-bold text-white">{tour.dates}</span>
            </div>
            <div>
              <span className="text-slate-300 block mb-0.5">Формат групи:</span>
              <span className="text-sm font-bold text-white">{tour.groupSize}</span>
            </div>
            <div>
              <span className="text-slate-300 block mb-0.5">Вартість:</span>
              <span className="text-base font-black text-brand-500">
                {tour.priceEUR ? `${tour.priceEUR} €` : `$${tour.priceUSD}`}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ОСНОВНОЙ КОНТЕНТ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Левые колонки */}
          <div className="lg:col-span-2 space-y-12">
            {/* Описание тура */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-card">
              <h2 className="text-2xl font-black text-slate-900 mb-4">
                {language === 'ua' ? "Як проходить ця подорож" : "Как проходит это путешествие"}
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {tour.description[language]}
              </p>
            </div>

            {/* Программа по дням */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-card">
              <h2 className="text-2xl font-black text-slate-900 mb-6">
                {language === 'ua' ? "Детальна програма по днях" : "Подробная программа по дням"}
              </h2>

              <div className="space-y-3">
                {tour.program.map((item) => {
                  const isOpen = !!openDays[item.day];
                  return (
                    <div key={item.day} className="rounded-2xl border border-slate-200 overflow-hidden">
                      <button
                        onClick={() => toggleDay(item.day)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="w-8 h-8 rounded-xl bg-brand-500 text-slate-950 font-black text-xs flex items-center justify-center flex-shrink-0">
                            {item.day}
                          </span>
                          <span className="font-extrabold text-base text-slate-900">
                            {item.title[language]}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-slate-400 transition-transform ${
                            isOpen ? 'rotate-180 text-brand-600' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                          >
                            <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pl-14">
                              {item.desc[language]}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Включено / Не включено в стиле New Way */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50/70 p-6 rounded-3xl border border-emerald-200">
                <h3 className="font-extrabold text-base text-emerald-900 mb-4 flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">✓</span>
                  <span>{language === 'ua' ? "У вартість туру входить" : "В стоимость тура входит"}</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-emerald-900">
                  {tour.included[language].map((inc, i) => (
                    <li key={i} className="flex items-start space-x-2 font-medium">
                      <span className="text-emerald-600 font-bold mt-0.5">•</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                <h3 className="font-extrabold text-base text-slate-900 mb-4 flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-slate-400 text-white flex items-center justify-center text-xs font-bold">—</span>
                  <span>{language === 'ua' ? "Окремо сплачується" : "Отдельно оплачивается"}</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  {tour.notIncluded[language].map((notInc, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-slate-400 mt-0.5">•</span>
                      <span>{notInc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Фотогалерея */}
            <div>
              <h2 className="text-xl font-black text-slate-900 mb-4">
                {language === 'ua' ? "Фотографії з цього маршруту" : "Фотографии с этого маршрута"}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {tour.gallery.map((imgUrl, idx) => (
                  <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group shadow-sm">
                    <img
                      src={imgUrl}
                      alt={`Photo ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Правая колонка: Sticky бронирование и Турлидер */}
          <div className="space-y-6">
            <div className="sticky top-24 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-card space-y-5">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase block mb-1">
                  Ціна подорожі
                </span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900">
                    {tour.priceEUR ? `${tour.priceEUR} €` : `$${tour.priceUSD}`}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">/ людина</span>
                </div>
              </div>

              <div className="space-y-2 text-xs font-medium text-slate-600 pb-4 border-b border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-400">Дати виїзду:</span>
                  <span className="font-bold text-slate-800">{tour.dates}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Вільних місць:</span>
                  <span className="font-bold text-brand-600">{tour.remainingSeats} з {tour.totalSeats}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Складність:</span>
                  <span className="font-bold text-slate-800">{tour.difficulty}</span>
                </div>
              </div>

              <button
                onClick={() => openBookingModal(tour)}
                className="w-full py-4 bg-[#FACC15] hover:bg-[#eab308] active:scale-95 text-slate-950 font-black rounded-2xl text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <span>{language === 'ua' ? "Бронь місця" : "Бронь места"}</span>
                <Send className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-2 text-[11px] text-slate-500 justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>
                  {language === 'ua' ? "Офіційний договір та підтримка 24/7" : "Официальный договор и поддержка 24/7"}
                </span>
              </div>
            </div>

            {/* Карточка турлидера */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card">
              <span className="text-brand-600 text-[11px] font-extrabold uppercase tracking-wider block mb-3">
                {language === 'ua' ? "Турлідер вашої групи" : "Турлидер вашей группы"}
              </span>

              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={tour.teamLeader.photo}
                  alt={tour.teamLeader.name[language]}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-brand-500"
                />
                <div>
                  <h4 className="font-black text-base text-slate-900">
                    {tour.teamLeader.name[language]}
                  </h4>
                  <p className="text-xs text-brand-600 font-bold">{tour.teamLeader.role[language]}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {tour.teamLeader.bio[language]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Фиксированная плашка бронирования для мобилок (Mobile-First) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/90 p-3 sm:p-4 flex items-center justify-between shadow-[0_-5px_25px_rgba(0,0,0,0.1)]">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block leading-tight">
            {language === 'ua' ? "Вартість" : "Стоимость"}
          </span>
          <span className="text-xl font-black text-slate-900 leading-tight">
            {tour.priceEUR ? `${tour.priceEUR} €` : `$${tour.priceUSD}`}
          </span>
        </div>
        <button
          onClick={() => openBookingModal(tour)}
          className="px-6 py-2.5 bg-[#FACC15] hover:bg-[#eab308] active:scale-95 text-slate-950 font-black rounded-xl text-sm shadow-md flex items-center space-x-1.5 cursor-pointer"
        >
          <span>{language === 'ua' ? "Бронь місця" : "Бронь места"}</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
