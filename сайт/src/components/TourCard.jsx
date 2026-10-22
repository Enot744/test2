import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, Calendar, Clock, Users, ShoppingCart, 
  ArrowRight, Sparkles, ChevronDown 
} from 'lucide-react';
import { useTours } from '../context/ToursContext';

export default function TourCard({ tour }) {
  const { language, openBookingModal } = useTours();
  const isUa = language === 'ua';

  const priceFormatted = tour.priceEUR ? `${tour.priceEUR}€` : `$${tour.priceUSD}`;

  // Теги для отображения под заголовком как на референсе
  const tags = [
    tour.formatTag ? tour.formatTag[language] : null,
    isUa ? 'Дика природа' : 'Дикая природа',
    isUa ? 'Експедиції' : 'Экспедиции'
  ].filter(Boolean);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row group"
    >
      {/* ЛЕВАЯ ЧАСТЬ (Заголовок, теги, описание, кнопки) */}
      <div className="sm:w-1/2 p-5 sm:p-6 flex flex-col justify-between order-2 sm:order-1">
        <div>
          {/* Статус / Бейдж гарантии */}
          {tour.statusTag && (
            <div className="mb-2.5">
              <span className="bg-emerald-500/10 text-emerald-700 text-[11px] font-black px-2.5 py-0.5 rounded-full inline-flex items-center space-x-1.5 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{tour.statusTag[language]}</span>
              </span>
            </div>
          )}

          {/* Заголовок тура капсом как на скриншоте */}
          <Link to={`/tour/${tour.slug}`}>
            <h3 className="font-black text-base sm:text-lg text-slate-900 uppercase tracking-tight leading-snug hover:text-[#FA9A1B] transition-colors mb-2 line-clamp-2">
              {tour.title[language]}
            </h3>
          </Link>

          {/* Теги / Категории жирным шрифтом */}
          <p className="text-xs font-bold text-slate-700 mb-3 leading-snug line-clamp-2">
            {tags.join(', ')}
          </p>

          {/* Краткое описание тура */}
          <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed line-clamp-3 mb-5">
            {tour.subtitle ? tour.subtitle[language] : tour.description[language]}
          </p>
        </div>

        {/* Кнопки внизу: Увеличенная желтая Бронь + Оранжевые Подробности */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
          {/* Желтая кнопка Бронь */}
          <button
            onClick={() => openBookingModal(tour)}
            className="flex-1 px-4 py-2.5 bg-[#FACC15] hover:bg-[#eab308] active:scale-95 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center space-x-1"
          >
            <span>{isUa ? 'Бронь' : 'Бронь'}</span>
          </button>

          {/* Оранжевая кнопка Подробности */}
          <Link
            to={`/tour/${tour.slug}`}
            className="flex-1 px-4 py-2.5 bg-[#FA9A1B] hover:bg-[#e88d15] active:scale-95 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center space-x-1.5"
          >
            <span>{isUa ? 'Подробиці' : 'Подробности'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ПРАВАЯ ЧАСТЬ (Фото + вертикальный виджет с параметрами тура) */}
      <div className="sm:w-1/2 relative min-h-[240px] sm:min-h-[290px] overflow-hidden order-1 sm:order-2 bg-slate-900">
        {/* Фото тура */}
        <img
          src={tour.heroImage}
          alt={tour.title[language]}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.92]"
          loading="lazy"
        />

        {/* Свободные места в верхнем углу */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-slate-900 font-extrabold text-[11px] px-2.5 py-1 rounded-full shadow-md flex items-center space-x-1.5 z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>{tour.remainingSeats} {isUa ? 'місць' : 'мест'}</span>
        </div>

        {/* Парящий виджет параметров тура в точности как на скриншоте Намибии */}
        <div className="absolute bottom-3 right-3 left-3 bg-slate-950/75 backdrop-blur-md rounded-2xl p-3.5 text-white border border-white/15 shadow-xl z-10 text-xs space-y-1.5">
          {/* Локация */}
          <div className="flex items-center space-x-2">
            <MapPin className="w-3.5 h-3.5 text-[#FA9A1B] flex-shrink-0" />
            <span className="font-bold text-white truncate">{tour.country}</span>
          </div>

          {/* Сезон месяцев */}
          <div className="flex items-center space-x-2">
            <Calendar className="w-3.5 h-3.5 text-[#FA9A1B] flex-shrink-0" />
            <span className="text-slate-200 truncate">{tour.month}</span>
          </div>

          {/* Даты */}
          <div className="flex items-center space-x-2">
            <Calendar className="w-3.5 h-3.5 text-[#FA9A1B] flex-shrink-0" />
            <span className="text-slate-200 font-semibold truncate flex items-center space-x-1">
              <span>{tour.dates.split('—')[0]?.trim()}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </span>
          </div>

          {/* Длительность */}
          <div className="flex items-center space-x-2">
            <Clock className="w-3.5 h-3.5 text-[#FA9A1B] flex-shrink-0" />
            <span className="text-slate-200">{tour.durationDays} {isUa ? 'Днів' : 'Дней'}</span>
          </div>

          {/* Размер группы */}
          <div className="flex items-center space-x-2">
            <Users className="w-3.5 h-3.5 text-[#FA9A1B] flex-shrink-0" />
            <span className="text-slate-200 truncate">{tour.groupSize || '12 человек'}</span>
          </div>

          {/* Цена с иконкой корзины */}
          <div className="flex items-center space-x-2 pt-0.5 border-t border-white/10">
            <ShoppingCart className="w-3.5 h-3.5 text-[#FA9A1B] flex-shrink-0" />
            <span className="font-black text-sm tracking-tight text-white">{priceFormatted}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
