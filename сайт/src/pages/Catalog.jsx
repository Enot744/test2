import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, RotateCcw, Compass } from 'lucide-react';
import { useTours } from '../context/ToursContext';
import TourCard from '../components/TourCard';

export default function Catalog() {
  const {
    filteredTours,
    language,
    t,
    selectedFormat,
    setSelectedFormat,
    selectedMonth,
    setSelectedMonth,
    maxPrice,
    setMaxPrice,
    searchQuery,
    setSearchQuery,
    resetFilters,
  } = useTours();

  const formats = [
    { key: 'all', label: { ua: 'Всі формати', ru: 'Все форматы' } },
    { key: 'camper', label: { ua: '🚐 Будинки на колесах', ru: '🚐 Дома на колесах' } },
    { key: '4x4', label: { ua: '🚙 Джип-експедиції 4х4', ru: '🚙 Джип-экспедиции 4х4' } },
    { key: 'expedition', label: { ua: '🗺️ Експедиції & Трекінг', ru: '🗺️ Экспедиции & Трекинг' } },
  ];

  const months = [
    { key: 'all', label: { ua: 'Всі дати виїздів', ru: 'Все даты выездов' } },
    { key: '07', label: { ua: 'Липень 2025', ru: 'Июль 2025' } },
    { key: '09', label: { ua: 'Вересень 2025', ru: 'Сентябрь 2025' } },
    { key: '10', label: { ua: 'Жовтень 2025', ru: 'Октябрь 2025' } },
    { key: '11', label: { ua: 'Листопад 2025', ru: 'Ноябрь 2025' } },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-10 pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок страницы */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[#FA9A1B] font-extrabold text-xs uppercase tracking-wider block mb-2">
            OUTWAY EXPEDITIONS 2025
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4">
            {language === 'ua' ? "Календар авторських подорожей" : "Календарь авторских путешествий"}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {language === 'ua'
              ? "Обирайте свій напрямок: від турів на кемперах у Норвегії та Ісландії до масштабних експедицій у Патагонію, Оман та Японію."
              : "Выбирайте направление: от кемпер-трипов по Норвегии и Исландии до экспедиций в Патагонию, Оман и Японию."}
          </p>
        </div>

        {/* Панель фильтров */}
        <div className="bg-white rounded-3xl p-6 mb-10 border border-slate-200 shadow-card space-y-6">
          {/* Поиск и быстрый сброс */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pb-5 border-b border-slate-100">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ua' ? "Пошук за країною або назвою туру..." : "Поиск по стране или названию тура..."}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-xs font-bold text-slate-500">
                {language === 'ua' ? `Знайдено турів: ${filteredTours.length}` : `Найдено туров: ${filteredTours.length}`}
              </span>

              <button
                onClick={resetFilters}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.common.clearFilters}</span>
              </button>
            </div>
          </div>

          {/* Формат тура: Табы в стиле New Way */}
          <div>
            <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              {language === 'ua' ? "Формат подорожі" : "Формат путешествия"}
            </span>
            <div className="flex flex-wrap gap-2">
              {formats.map((fmt) => (
                <button
                  key={fmt.key}
                  onClick={() => setSelectedFormat(fmt.key)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedFormat === fmt.key
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {fmt.label[language]}
                </button>
              ))}
            </div>
          </div>

          {/* Месяцы и бюджет */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                {language === 'ua' ? "Місяць виїзду" : "Месяц выезда"}
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-brand-500"
              >
                {months.map((m) => (
                  <option key={m.key} value={m.key}>
                    {m.label[language]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {language === 'ua' ? "Бюджет до:" : "Бюджет до:"}
                </label>
                <span className="text-xs font-extrabold text-brand-600">{maxPrice} €</span>
              </div>
              <input
                type="range"
                min="2000"
                max="5000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-brand-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Сетка туров: по 2 в строке как на скриншоте */}
        {filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatePresence>
              {filteredTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-3xl p-8 max-w-md mx-auto border border-slate-200 shadow-sm">
            <Compass className="w-12 h-12 text-slate-300 mx-auto mb-3 animate-spin duration-[8000ms]" />
            <h3 className="font-extrabold text-lg text-slate-900 mb-1">
              {t.common.noResults}
            </h3>
            <p className="text-slate-500 text-xs mb-4">
              {t.common.tryResetting}
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2 bg-brand-500 text-slate-950 font-bold text-xs rounded-xl"
            >
              {t.common.clearFilters}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
