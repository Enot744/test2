import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, X } from 'lucide-react';
import { useTours } from '../context/ToursContext';

export default function LuckyGlobeWidget() {
  const location = useLocation();
  const { language } = useTours();
  const isUa = language === 'ua';

  const [isTooltipDismissed, setIsTooltipDismissed] = useState(false);

  // Полностью скрываем плавающий виджет на странице /lucky-globe
  if (location.pathname === '/lucky-globe' || location.pathname.startsWith('/lucky-globe')) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center pointer-events-auto">
      {/* Компактный всплывающий тултип (не перекрывает поисковую панель) */}
      <AnimatePresence>
        {!isTooltipDismissed && (
          <motion.div
            initial={{ opacity: 0, x: 12, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="hidden sm:flex items-center space-x-1.5 bg-[#093545]/95 backdrop-blur-md text-white text-xs font-semibold py-1.5 px-3 rounded-xl shadow-xl border border-amber-400/30 mr-2.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse flex-shrink-0" />
            <Link 
              to="/lucky-globe" 
              className="hover:text-amber-300 transition-colors whitespace-nowrap"
            >
              {isUa ? "Не знаєш куди? Крути глобус!" : "Не знаешь куда? Крути глобус!"}
            </Link>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsTooltipDismissed(true);
              }}
              className="text-white/60 hover:text-white p-0.5 ml-1 transition-colors cursor-pointer"
              title={isUa ? "Закрити" : "Закрыть"}
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Круглая кнопка с мини-глобусом */}
      <Link
        to="/lucky-globe"
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#062430] via-[#093545] to-[#0c4a60] text-white shadow-2xl border-2 border-amber-400 hover:border-amber-300 hover:scale-105 transition-all duration-300"
        title={isUa ? "Глобус Удачі: Спонтанна подорож" : "Глобус Удачи: Спонтанное путешествие"}
      >
        {/* Пульсирующее кольцо свечения */}
        <span className="absolute inset-0 rounded-full bg-amber-400/20 animate-ping pointer-events-none" />

        {/* Вращающийся компас / глобус */}
        <Compass className="w-7 h-7 text-amber-400 group-hover:rotate-180 transition-transform duration-700" />

        {/* Бейдж HOT */}
        <span className="absolute -top-1 -left-1 bg-gradient-to-r from-red-500 to-amber-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full border border-white shadow-sm uppercase leading-none">
          HOT
        </span>

        {/* Бонусный бейдж -50€ */}
        <span className="absolute -bottom-1 -right-1 bg-gradient-to-r from-[#F59E0B] to-[#EA580C] text-white text-[9px] font-black px-1.5 py-0.2 rounded-full border border-white shadow-sm leading-none">
          -50€
        </span>
      </Link>
    </div>
  );
}
