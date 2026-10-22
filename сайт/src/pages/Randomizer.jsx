import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, Sparkles, MapPin, ArrowRight, RotateCw, 
  Gift, ShieldCheck, Zap
} from 'lucide-react';
import { useTours } from '../context/ToursContext';

export default function Randomizer() {
  const { tours, language, openBookingModal } = useTours();
  const isUa = language === 'ua';

  const [isSpinning, setIsSpinning] = useState(false);
  const [bgOffset, setBgOffset] = useState(0);
  const [selectedTour, setSelectedTour] = useState(null);
  const [spinProgress, setSpinProgress] = useState(0);
  const [displayedCoords, setDisplayedCoords] = useState("64.9631° N, 19.0208° W");
  const [flashingCountry, setFlashingCountry] = useState(isUa ? "Очікування..." : "Ожидание...");
  const [shockwaveActive, setShockwaveActive] = useState(false);

  // Параметры карты и сферы:
  // MAP_WIDTH — ширина одного цикла карты в пикселях. Благодаря repeat-x карта бесконечна!
  const MAP_WIDTH = 800;
  const SPHERE_SIZE = 320;

  // Координаты маркеров туров на панорамной карте (нормированные 0..1 по ширине и высоте)
  const tourLocations = [
    {
      id: "iceland-camper-adventure",
      name: isUa ? "Ісландія" : "Исландия",
      coordsText: "64.9631° N, 19.0208° W",
      normX: 0.428,
      normY: 0.22,
      color: "#38BDF8",
    },
    {
      id: "norway-fjords-camper",
      name: isUa ? "Норвегія" : "Норвегия",
      coordsText: "60.4720° N, 8.4689° E",
      normX: 0.542,
      normY: 0.20,
      color: "#34D399",
    },
    {
      id: "patagonia-4x4-expedition",
      name: isUa ? "Патагонія" : "Патагония",
      coordsText: "51.2532° S, 72.8814° W",
      normX: 0.305,
      normY: 0.72,
      color: "#F472B6",
    },
    {
      id: "namibia-safari-expedition",
      name: isUa ? "Намібія" : "Намибия",
      coordsText: "22.5609° S, 17.0658° E",
      normX: 0.522,
      normY: 0.66,
      color: "#FBBF24",
    },
    {
      id: "oman-4x4-desert",
      name: isUa ? "Оман" : "Оман",
      coordsText: "23.5880° N, 58.3829° E",
      normX: 0.630,
      normY: 0.45,
      color: "#FB923C",
    },
    {
      id: "japan-autumn-expedition",
      name: isUa ? "Японія" : "Япония",
      coordsText: "35.6762° N, 139.6503° E",
      normX: 0.825,
      normY: 0.36,
      color: "#EC4899",
    },
  ];

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSpinGlobe = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShockwaveActive(false);
    setSelectedTour(null);

    // 1. Случайный выбор победного тура
    const availableTours = tours && tours.length > 0 ? tours : [];
    const targetTour = availableTours.length > 0 
      ? availableTours[Math.floor(Math.random() * availableTours.length)]
      : null;

    const locInfo = tourLocations.find(l => l.id === targetTour?.id) || tourLocations[Math.floor(Math.random() * tourLocations.length)];

    // 2. Расчет смещения фона:
    // Земля делает 3 полных быстрых оборота (3 * MAP_WIDTH) плюс доворот,
    // чтобы целевая страна оказалась точно в центре сферы (SPHERE_SIZE / 2 = 160px).
    const spinRevolutions = 3;
    const baseShift = bgOffset + (spinRevolutions * MAP_WIDTH);
    const desiredMod = ((locInfo.normX * MAP_WIDTH - (SPHERE_SIZE / 2)) % MAP_WIDTH + MAP_WIDTH) % MAP_WIDTH;
    const currentMod = ((baseShift % MAP_WIDTH) + MAP_WIDTH) % MAP_WIDTH;
    let diff = desiredMod - currentMod;
    if (diff < 0) diff += MAP_WIDTH;
    const targetOffset = baseShift + diff;

    // Запускаем смещение background-position-x
    setBgOffset(targetOffset);

    const spinDuration = 2.8; // строго 2.8 секунды
    const startTime = Date.now();

    // 3. Быстрое переключение координат и стран на радаре каждые 80 мс
    intervalRef.current = setInterval(() => {
      const randomLoc = tourLocations[Math.floor(Math.random() * tourLocations.length)];
      setFlashingCountry(randomLoc.name);

      const lat = (Math.random() * 120 - 60).toFixed(4);
      const lng = (Math.random() * 360 - 180).toFixed(4);
      setDisplayedCoords(`${Math.abs(lat)}° ${lat >= 0 ? 'N' : 'S'}, ${Math.abs(lng)}° ${lng >= 0 ? 'E' : 'W'}`);

      const elapsed = (Date.now() - startTime) / (spinDuration * 1000);
      setSpinProgress(Math.min(elapsed, 1));
    }, 80);

    // 4. Фиксация результата через 2800 мс
    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);

      setDisplayedCoords(locInfo.coordsText);
      setFlashingCountry(locInfo.name);
      setSelectedTour(targetTour);
      setIsSpinning(false);
      setShockwaveActive(true);
      setSpinProgress(1);
    }, spinDuration * 1000);
  };

  const winningLocation = tourLocations.find(l => l.id === selectedTour?.id);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-[#0c4a60] via-[#093545] to-[#062430] text-white relative overflow-x-hidden selection:bg-[#FA9A1B] selection:text-slate-950 flex flex-col justify-center py-4 sm:py-6 px-4 sm:px-6">
      
      {/* 1. АТМОСФЕРНЫЙ ФОН: ГОРЫ И СВЕТОВЫЕ ПЯТНА */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=2000&q=85"
          alt=""
          className="w-full h-full object-cover opacity-15 mix-blend-overlay filter brightness-90"
        />
        <div className="absolute -top-24 left-1/4 w-[450px] h-[450px] bg-cyan-400/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 right-1/4 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col justify-center my-auto">
        
        {/* КОМПАКТНЫЙ ХЕДЕР СВЕРХУ (MOBILE-FIRST) */}
        <div className="text-center mb-3 sm:mb-5">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-bold text-amber-300 mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span className="uppercase tracking-wider text-[11px]">
              {isUa ? "✨ Гейміфікація подорожей" : "✨ Геймификация путешествий"}
            </span>
            <span className="bg-[#F59E0B] text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded uppercase">
              HOT
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
            {isUa ? "Глобус удачі: Обери спонтанну подорож" : "Глобус удачи: Выбери спонтанное путешествие"}
          </h1>
          <p className="text-xs sm:text-sm text-cyan-100/80 mt-1 max-w-xl mx-auto font-medium">
            {isUa 
              ? "Довірся долі та розкрути глобус — отримай гарантований бонус -50 € до подорожі!" 
              : "Доверься судьбе и крути глобус — получи гарантированный бонус -50 € к путешествию!"}
          </p>
        </div>

        {/* ДВУХКОЛОНОЧНЫЙ SPLIT-SCREEN (БЕЗ СКРОЛЛА НА НОУТБУКЕ, 1 КОЛОНКА НА СМАРТФОНЕ) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center max-w-6xl mx-auto w-full">
          
          {/* ЛЕВАЯ КОЛОНКА (6 колонок): ГЛОБУС + РАДАР + КНОПКА ЗАПУСКА */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            
            {/* Плашка радара координат */}
            <div className="w-full max-w-[320px] bg-white/10 backdrop-blur-md rounded-xl border border-white/20 px-3.5 py-2 mb-2 flex items-center justify-between text-xs shadow-lg">
              <div className="flex items-center space-x-2">
                <div className={`w-2.5 h-2.5 rounded-full ${isSpinning ? 'bg-amber-400 animate-ping' : 'bg-emerald-400 animate-pulse'}`} />
                <div>
                  <span className="text-[10px] font-bold text-cyan-200/80 uppercase tracking-wider block leading-none">
                    {isUa ? "Радар" : "Радар"}
                  </span>
                  <span className="text-xs font-black text-white font-mono mt-0.5 block">
                    {displayedCoords}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block leading-none">
                  {isUa ? "Фокус" : "Фокус"}
                </span>
                <span className="text-xs font-bold text-white mt-0.5 block truncate max-w-[120px]">
                  {flashingCountry}
                </span>
              </div>
            </div>

            {/* ЯРКИЙ, ЦВЕТНОЙ 3D ГЛОБУС ЗЕМЛИ */}
            <div className="relative w-[270px] h-[270px] sm:w-[320px] sm:h-[320px] flex items-center justify-center my-1 select-none">
              
              {/* Атмосферное внешнее свечение планеты */}
              <div className={`absolute inset-2 sm:inset-4 rounded-full transition-all duration-700 pointer-events-none ${
                isSpinning 
                  ? 'bg-amber-400/30 blur-2xl scale-105' 
                  : selectedTour 
                    ? 'bg-emerald-400/30 blur-2xl scale-100'
                    : 'bg-cyan-400/25 blur-xl'
              }`} />

              {/* Ударная волна при остановке глобуса */}
              <AnimatePresence>
                {shockwaveActive && (
                  <motion.div
                    initial={{ scale: 0.85, opacity: 1 }}
                    animate={{ scale: 1.45, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.1, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full border-2 border-amber-400 pointer-events-none shadow-[0_0_25px_#F59E0B]"
                  />
                )}
              </AnimatePresence>

              {/* ВРАЩАЮЩАЯСЯ ПУНКТИРНАЯ ОРБИТА СО СПУТНИКОМ */}
              <div 
                className="absolute -inset-4 sm:-inset-5 rounded-full border border-dashed border-cyan-400/35 pointer-events-none"
                style={{ animation: 'spin 26s linear infinite' }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#38BDF8]" />
                  <div className="w-5 h-0.5 bg-cyan-400/80 rounded" />
                </div>
              </div>

              {/* ТОНКОЕ КОЛЬЦО-КОМПАС С ДЕЛЕНИЯМИ N, S, W, E */}
              <div className="absolute -inset-1 rounded-full border border-cyan-300/35 pointer-events-none flex items-center justify-center">
                <span className="absolute top-1 text-[10px] font-black text-amber-300 tracking-wider">N</span>
                <span className="absolute bottom-1 text-[10px] font-bold text-cyan-300/70 tracking-wider">S</span>
                <span className="absolute left-1.5 text-[10px] font-bold text-cyan-300/70 tracking-wider">W</span>
                <span className="absolute right-1.5 text-[10px] font-bold text-cyan-300/70 tracking-wider">E</span>
              </div>

              {/* ОСНОВНАЯ 3D СФЕРА: НАСЫЩЕННЫЙ ЛАЗУРНО-САПФИРОВЫЙ ОКЕАН + ШЕЙДИНГ */}
              <div 
                className="relative w-full h-full rounded-full overflow-hidden border-2 border-cyan-400/50"
                style={{
                  background: 'radial-gradient(circle at 35% 28%, #0284c7 0%, #0369a1 40%, #02466b 75%, #05263b 100%)',
                  boxShadow: 'inset -35px -35px 60px rgba(2, 18, 32, 0.9), inset 15px 15px 40px rgba(56, 189, 248, 0.4), 0 0 50px rgba(56, 189, 248, 0.45)',
                }}
              >
                
                {/* НАКЛОН ОСИ ЗЕМЛИ НА 15 ГРАДУСОВ ДЛЯ ВРАЩАЮЩЕЙСЯ КАРТЫ */}
                <div 
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{ transform: 'rotate(-15deg) scale(1.15)' }}
                >
                  {/* БЕСШОВНЫЙ СЛОЙ КАРТЫ МАТЕРИКОВ ЧЕРЕЗ REPEAT-X (НИКОГДА НЕ ПРОПАДАЕТ!) */}
                  <div
                    className="w-full h-full relative"
                    style={{
                      backgroundImage: "url('/world-map.svg')",
                      backgroundRepeat: "repeat-x",
                      backgroundSize: `${MAP_WIDTH}px 100%`,
                      backgroundPositionX: `-${bgOffset}px`,
                      backgroundPositionY: "center",
                      transition: isSpinning 
                        ? "background-position-x 2.8s cubic-bezier(0.15, 0.85, 0.25, 1)" 
                        : "background-position-x 0.8s ease-out",
                      filter: isSpinning 
                        ? "sepia(20%) saturate(220%) brightness(1.15) blur(1px) drop-shadow(0 0 8px rgba(52, 211, 153, 0.6))"
                        : "sepia(20%) saturate(220%) brightness(1.15) drop-shadow(0 0 6px rgba(52, 211, 153, 0.6))",
                    }}
                  />
                </div>

                {/* НОЧНОЕ ЗАТЕМНЕНИЕ И ГЛУБИНА ПЛАНЕТЫ (СПРАВА СНИЗУ) */}
                <div 
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 30% 25%, transparent 35%, rgba(2, 14, 26, 0.45) 70%, rgba(1, 8, 16, 0.95) 100%)',
                  }}
                />

                {/* ТЕПЛОЕ СОЛНЕЧНО-ЗОЛОТИСТОЕ СВЕЧЕНИЕ СЛЕВА СВЕРХУ */}
                <div 
                  className="absolute -top-4 -left-4 w-[180px] h-[100px] rounded-[50%] pointer-events-none -rotate-45"
                  style={{
                    background: 'radial-gradient(ellipse at 30% 30%, rgba(251, 191, 36, 0.38) 0%, rgba(255, 255, 255, 0.25) 35%, transparent 70%)',
                    filter: 'blur(3px)',
                  }}
                />

                {/* ВНУТРЕННИЙ ГОЛУБОЙ ОРЕОЛ АТМОСФЕРЫ ЗЕМЛИ */}
                <div 
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    boxShadow: 'inset 0 0 35px rgba(56, 189, 248, 0.45)',
                  }}
                />

                {/* ПЕРЕКРЕСТИЕ РАДАРА В ЦЕНТРЕ (СТРОГО ГОРИЗОНТАЛЬНО) */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-16 h-[1px] bg-cyan-300/40" />
                  <div className="h-16 w-[1px] bg-cyan-300/40 absolute" />
                  <div className="w-10 h-10 rounded-full border border-cyan-300/50 absolute flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full border border-dashed border-cyan-200/40" />
                  </div>
                </div>

                {/* СТРОГО ГОРИЗОНТАЛЬНЫЙ ЗОЛОТОЙ ПИН И ВСПЛЫВАЮЩИЙ БЕЙДЖ ПОБЕДИТЕЛЯ */}
                {selectedTour && !isSpinning && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                    
                    {/* Пульсирующие золотые и коралловые кольца */}
                    <div className="absolute w-12 h-12 rounded-full border border-amber-300/50 animate-pulse" />
                    <div className="absolute w-8 h-8 rounded-full bg-[#fbbf24]/40 animate-ping" />
                    
                    {/* Сердцевина пина */}
                    <div className="relative w-4 h-4 rounded-full bg-[#f97316] border-2 border-white shadow-[0_0_15px_#f97316] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>

                    {/* Всплывающий горизонтальный бейдж */}
                    <motion.div
                      initial={{ scale: 0.7, opacity: 0, y: -2 }}
                      animate={{ scale: 1, opacity: 1, y: -40 }}
                      transition={{ type: "spring", stiffness: 350, damping: 22 }}
                      className="absolute flex flex-col items-center"
                    >
                      <div className="bg-[#051c26]/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border-2 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.65)] flex items-center space-x-1.5 whitespace-nowrap">
                        <span className="text-amber-400 text-xs">🎯</span>
                        <span className="text-white text-xs font-black tracking-wide">
                          {winningLocation?.name || flashingCountry}
                        </span>
                        <span className="text-cyan-300 text-[10px] font-mono opacity-85">
                          • {winningLocation?.coordsText.split(',')[0] || displayedCoords.split(',')[0]}
                        </span>
                      </div>
                      <div className="w-2.5 h-2.5 bg-amber-400 rotate-45 -mt-1 shadow-sm" />
                    </motion.div>
                  </div>
                )}
              </div>
            </div>

            {/* ЯРКАЯ ОРАНЖЕВАЯ КНОПКА ЗАПУСКА */}
            <button
              onClick={handleSpinGlobe}
              disabled={isSpinning}
              className={`w-full max-w-[340px] px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl font-extrabold text-xs sm:text-sm md:text-base tracking-wide uppercase shadow-xl transition-all flex items-center justify-center space-x-2.5 mt-3 sm:mt-4 cursor-pointer active:scale-95 disabled:cursor-not-allowed ${
                isSpinning
                  ? 'bg-slate-700/80 text-slate-300 border border-white/10'
                  : 'bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EA580C] hover:from-[#d97706] hover:to-[#c2410c] text-white border border-amber-300/40 hover:shadow-orange-500/40 hover:shadow-2xl'
              }`}
            >
              <RotateCw className={`w-4 h-4 sm:w-5 sm:h-5 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>
                {isSpinning 
                  ? (isUa ? "Обираємо маршрут..." : "Выбираем маршрут...")
                  : (isUa ? "🌍 КРУТИТИ ГЛОБУС (ВИПРОБУВАТИ ВДАЧУ)" : "🌍 КРУТИТЬ ГЛОБУС (ИСПЫТАТЬ УДАЧУ)")}
              </span>
            </button>

            <span className="text-[11px] sm:text-xs text-amber-300/90 font-medium mt-2 flex items-center space-x-1.5 text-center">
              <Gift className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>
                {isUa 
                  ? "Гарантований бонус -50 € до кожного виграного туру" 
                  : "Гарантированный бонус -50 € к каждому выпавшему туру"}
              </span>
            </span>
          </div>

          {/* ПРАВАЯ КОЛОНКА (6 колонок): ЗОНА РЕЗУЛЬТАТА В СТЕКЛЯННОЙ КАРТОЧКЕ */}
          <div className="lg:col-span-6 w-full flex flex-col justify-center">
            <AnimatePresence mode="wait">
              
              {/* СОСТОЯНИЕ 1: ДО ПРОКРУТКИ — СТИЛЬНАЯ КАРТОЧКА С ПРАВИЛАМИ И БОНУСОМ -50 € */}
              {!selectedTour && !isSpinning && (
                <motion.div
                  key="initial-placeholder"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-white/20 shadow-2xl text-center text-white relative overflow-hidden"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/15 border border-white/30 text-amber-300 flex items-center justify-center mx-auto mb-3 shadow-inner">
                    <Compass className="w-6 h-6 sm:w-7 sm:h-7 animate-spin duration-[20000ms]" />
                  </div>

                  <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest block mb-1">
                    {isUa ? "ГОТОВІ ДО ПРИГОДИ?" : "ГОТОВЫ К ПРИКЛЮЧЕНИЮ?"}
                  </span>

                  <h3 className="text-lg sm:text-2xl font-extrabold text-white mb-2 leading-tight">
                    {isUa ? "Куди приведе тебе доля цього разу?" : "Куда приведет тебя судьба в этот раз?"}
                  </h3>

                  <p className="text-xs sm:text-sm text-cyan-100/80 leading-relaxed mb-4 sm:mb-5 max-w-md mx-auto font-medium">
                    {isUa 
                      ? "Натисни кнопку зліва, щоб розкрутити глобус і довіритися випадку. Система обере твою наступну експедицію та подарує знижку -50 €!"
                      : "Нажми кнопку слева, чтобы раскрутить глобус и довериться случаю. Система выберет следующую экспедицию и подарит скидку -50 €!"}
                  </p>

                  <div className="p-3 sm:p-3.5 rounded-2xl bg-black/20 border border-white/10 text-left space-y-2 text-xs text-cyan-100/90">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>{isUa ? "6 унікальних авторських напрямків" : "6 уникальных авторских направлений"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Gift className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{isUa ? "Знижка -50 € закріплюється на 24 години" : "Скидка -50 € закрепляется на 24 часа"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-cyan-300 flex-shrink-0" />
                      <span>{isUa ? "Невеликі групи 8-12 мандрівників" : "Небольшие группы 8-12 путешественников"}</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* СОСТОЯНИЕ 2: ПРОЦЕСС ВРАЩЕНИЯ */}
              {isSpinning && (
                <motion.div
                  key="spinning-placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-amber-400/40 shadow-2xl text-center py-10 sm:py-12 text-white"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-amber-500/20 border-2 border-amber-400/40 text-amber-400 flex items-center justify-center mx-auto mb-4">
                    <RotateCw className="w-7 h-7 sm:w-8 sm:h-8 animate-spin" />
                  </div>

                  <span className="text-xs font-black text-amber-300 uppercase tracking-widest block mb-2 animate-pulse">
                    {isUa ? "РАДАР СКАНУЄ ПЛАНЕТУ..." : "РАДАР СКАНИРУЕТ ПЛАНЕТУ..."}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-black text-white mb-3 font-mono">
                    {flashingCountry}
                  </h3>

                  <p className="text-xs text-cyan-100/80 max-w-xs mx-auto mb-5">
                    {isUa ? "Шукаємо найідеальніший маршрут для вашої спонтанної відпустки..." : "Ищем идеальный маршрут для вашего спонтанного отпуска..."}
                  </p>

                  <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden border border-white/10">
                    <div 
                      className="bg-gradient-to-r from-amber-400 to-orange-500 h-full transition-all duration-75"
                      style={{ width: `${spinProgress * 100}%` }}
                    />
                  </div>
                </motion.div>
              )}

              {/* СОСТОЯНИЕ 3: ПОСЛЕ ОСТАНОВКИ — КАРТОЧКА ВЫПАВШЕГО ТУРА С БОНУСОМ */}
              {selectedTour && !isSpinning && (
                <motion.div
                  key="tour-result"
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 240, damping: 22 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-2xl text-white relative"
                >
                  {/* Промо-полоска со скидкой */}
                  <div className="bg-gradient-to-r from-[#F59E0B] via-amber-500 to-[#EA580C] px-3.5 py-2 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-md">
                    <Gift className="w-4 h-4 fill-slate-950 flex-shrink-0" />
                    <span className="truncate">
                      {isUa 
                        ? "🎁 Бонус за спонтанність: знижка -50 € закріплена!" 
                        : "🎁 Бонус за спонтанность: скидка -50 € закреплена!"}
                    </span>
                  </div>

                  {/* Фото выпавшего тура */}
                  <div className="relative h-36 sm:h-44 overflow-hidden bg-slate-900">
                    <img
                      src={selectedTour.heroImage}
                      alt={selectedTour.title[language] || selectedTour.title.ua}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#062430]/90 via-transparent to-black/30" />

                    {/* Страна */}
                    <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-lg text-slate-900 text-xs font-black flex items-center space-x-1 shadow-sm">
                      <MapPin className="w-3.5 h-3.5 text-[#EA580C]" />
                      <span>{selectedTour.country}</span>
                    </div>

                    {/* Формат */}
                    <div className="absolute top-2.5 right-2.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-lg text-white text-xs font-bold border border-white/10">
                      {selectedTour.formatTag ? (selectedTour.formatTag[language] || selectedTour.formatTag.ua) : 'Експедиція'}
                    </div>

                    {/* Стоимость со скидкой */}
                    <div className="absolute bottom-2.5 right-2.5 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-right border border-white/20">
                      <span className="text-[10px] text-slate-400 line-through block leading-tight">
                        {selectedTour.priceEUR ? `${selectedTour.priceEUR} €` : `$${selectedTour.priceUSD}`}
                      </span>
                      <span className="text-base sm:text-xl font-black text-amber-400 leading-tight">
                        {selectedTour.priceEUR ? `${selectedTour.priceEUR - 50} €` : `$${selectedTour.priceUSD - 50}`}
                      </span>
                    </div>
                  </div>

                  {/* Контент карточки */}
                  <div className="p-4 sm:p-5">
                    <h3 className="font-extrabold text-base sm:text-lg text-white leading-snug mb-1 line-clamp-1">
                      {selectedTour.title[language] || selectedTour.title.ua}
                    </h3>

                    <p className="text-xs text-cyan-100/80 leading-relaxed mb-3 line-clamp-2">
                      {selectedTour.subtitle 
                        ? (selectedTour.subtitle[language] || selectedTour.subtitle.ua) 
                        : (selectedTour.description[language] || selectedTour.description.ua)}
                    </p>

                    {/* Параметры тура */}
                    <div className="grid grid-cols-3 gap-2 p-2.5 bg-white/5 rounded-xl border border-white/10 mb-4 text-xs">
                      <div>
                        <span className="text-[10px] text-cyan-200/70 font-semibold block">{isUa ? "Дати" : "Даты"}</span>
                        <span className="font-bold text-white truncate block">{selectedTour.dates?.split('—')[0]?.trim()}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-cyan-200/70 font-semibold block">{isUa ? "Тривалість" : "Дней"}</span>
                        <span className="font-bold text-white">{selectedTour.durationDays} {isUa ? "дн." : "дн."}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-cyan-200/70 font-semibold block">{isUa ? "Місця" : "Места"}</span>
                        <span className="font-bold text-emerald-400">{selectedTour.remainingSeats} {isUa ? "вільно" : "свободно"}</span>
                      </div>
                    </div>

                    {/* Кнопки действий */}
                    <div className="space-y-2">
                      <button
                        onClick={() => openBookingModal({
                          ...selectedTour,
                          bonusDiscount: 50,
                          promoCode: 'LUCKY-GLOBE-50'
                        })}
                        className="w-full py-3 bg-gradient-to-r from-[#F59E0B] to-[#EA580C] hover:from-[#d97706] hover:to-[#c2410c] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
                      >
                        <Gift className="w-4 h-4 fill-white" />
                        <span>{isUa ? "Забронювати зі знижкою (-50 €)" : "Забронировать со скидкой (-50 €)"}</span>
                      </button>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Link
                          to={`/tour/${selectedTour.slug}`}
                          className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1 border border-white/15"
                        >
                          <span>{isUa ? "Програма туру" : "Программа тура"}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={handleSpinGlobe}
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1 border border-white/15 cursor-pointer"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                          <span>{isUa ? "Ще раз" : "Еще раз"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
