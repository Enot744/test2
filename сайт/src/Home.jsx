import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ChevronDown, ChevronLeft, ChevronRight, Play, Star, 
  MapPin, Calendar, Users, ShieldCheck, Heart, Sparkles, ArrowRight, X
} from 'lucide-react';
import { useTours } from '../context/ToursContext';
import TourCard from '../components/TourCard';

export default function Home() {
  const { tours, language, t, openBookingModal } = useTours();

  // Состояние поискового фильтра по центру Hero
  const [searchCategory, setSearchCategory] = useState('all');
  const [searchDestination, setSearchDestination] = useState('all');
  const [searchMonth, setSearchMonth] = useState('all');

  // Видео-модалка отзыва
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  // Карусель отзывов
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  const upcomingRef = useRef(null);

  // Фильтрация туров по поиску из Hero
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (upcomingRef.current) {
      upcomingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const displayedTours = tours.filter((tour) => {
    if (searchCategory !== 'all' && tour.format !== searchCategory) return false;
    if (searchDestination !== 'all' && tour.country.toLowerCase().indexOf(searchDestination.toLowerCase()) === -1) return false;
    if (searchMonth !== 'all' && tour.monthKey !== searchMonth) return false;
    return true;
  });

  // Фото-видео отзывы для интерактивной карусели
  const videoReviews = [
    {
      id: 1,
      name: "Юлія та Денис Мельники",
      city: "Київ",
      tour: language === 'ua' ? "Ісландія на кемперах: повне коло" : "Исландия на кемперах: полное кольцо",
      videoThumb: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      quote: language === 'ua' 
        ? "Неймовірний формат! Зустрічати світанки в кемпері біля водоспадів і засинати під шум океану. Організація New Way продумана до дрібниць, смачне барбекю щовечора і найкращі спогади."
        : "Невероятный формат! Встречать рассветы в кемпере прямо у водопадов и засыпать под шум океана. Организация New Way продумана до мелочей!",
      duration: "02:45 хв",
    },
    {
      id: 2,
      name: "Олександр Кучеренко",
      city: "Львів",
      tour: language === 'ua' ? "Норвегія: фіорди та Язик Троля" : "Норвегия: фьорды и Язык Тролля",
      videoThumb: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      quote: language === 'ua'
        ? "Я їхав один і сумнівався, чи буде комфортно. Але команда стала сім'єю вже на другий день. Підйом на Язик Троля перевершив усі очікування, а сауна на березі фіорду — чистий кайф!"
        : "Ехал соло и переживал за компанию. Но команда сплотилась уже на второй день. Подъем на Язык Тролля превзошел ожидания, а сауна у фьорда — восторг!",
      duration: "03:12 хв",
    },
    {
      id: 3,
      name: "Марина та Сергій",
      city: "Дніпро",
      tour: language === 'ua' ? "Патагонія: Торрес-дель-Пайне на 4х4" : "Патагония: Торрес-дель-Пайне на 4х4",
      videoThumb: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=800&q=80",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      quote: language === 'ua'
        ? "Патагонія на надійних джипах — це свобода, яку неможливо передати словами. Льодовик Періто-Морено з його гуркотом льоду стоїть перед очима досі. Дякуємо турлідеру Андрію!"
        : "Патагония на внедорожниках — это чистая свобода. Ледник Перито-Морено с грохотом векового льда стоит перед глазами до сих пор!",
      duration: "01:58 хв",
    },
    {
      id: 4,
      name: "Ігор та Катерина",
      city: "Одеса",
      tour: language === 'ua' ? "Намібія: Сафарі та Дюни Соссусфлей" : "Намибия: Сафари и Дюны Соссусфлей",
      videoThumb: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      quote: language === 'ua'
        ? "Ночівлі в сафарі-траках під мільйонами зірок, леви за 10 метрів від машини і схід сонця на Дюні 45. Найяскравіша пригода за всі наші подорожі!"
        : "Ночевки в сафари-траках под миллионами звезд, львы в 10 метрах от машины и рассвет на Дюне 45. Самое яркое приключение в жизни!",
      duration: "04:15 хв",
    }
  ];

  const nextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % videoReviews.length);
  };

  const prevReview = () => {
    setActiveReviewIndex((prev) => (prev - 1 + videoReviews.length) % videoReviews.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pb-20"
    >
      {/* 1. HERO СЕКЦИЯ В ТОЧНОСТИ КАК НА СКРИНШОТЕ NEWWAYTRAVEL */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-900 overflow-hidden">
        {/* Фоновое фото: Воздушные шары над долинами (Каппадокия) как на скриншоте */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=2000&q=85"
            alt="New Way Travel Cappadocia Balloons Background"
            className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.05]"
          />
          {/* Легкий градиент для кристальной читаемости текста */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/30 to-slate-900/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center text-white w-full">
          {/* Надзаголовок: АВТОРСКИЕ ТУРЫ */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-base sm:text-2xl font-black uppercase tracking-wider text-white mb-2 drop-shadow-md"
          >
            {language === 'ua' ? "АВТОРСЬКІ ТУРИ" : "АВТОРСКИЕ ТУРЫ"}
          </motion.div>

          {/* Главный титул: NEW WAY TRAVEL */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-7xl md:text-8xl font-black tracking-tight text-white uppercase drop-shadow-lg leading-none mb-4"
          >
            NEW WAY TRAVEL
          </motion.h1>

          {/* Подзаголовок: Твой лучший помощник в поисках впечатлений! */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white max-w-3xl mx-auto leading-relaxed mb-10 drop-shadow-md"
          >
            {language === 'ua' 
              ? "Твій найкращий помічник у пошуках вражень!" 
              : "Твой лучший помощник в поисках впечатлений!"}
          </motion.p>

          {/* ПОИСКОВАЯ ПАНЕЛЬ ПО ЦЕНТРУ (Категория | Направление | Месяц | Поиск) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl sm:rounded-full shadow-2xl border border-white/60 flex flex-col md:flex-row items-center gap-2"
            >
              {/* Поле 1: Категория */}
              <div className="relative w-full md:flex-1">
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="w-full appearance-none px-4 py-3 sm:py-3.5 bg-slate-50 border border-slate-200/90 rounded-xl sm:rounded-full text-slate-800 text-xs sm:text-sm font-bold focus:outline-none focus:border-[#FA9A1B] cursor-pointer pr-10"
                >
                  <option value="all">
                    {language === 'ua' ? "Категорія: Всі" : "Категория: Все"}
                  </option>
                  <option value="camper">
                    {language === 'ua' ? "Будинки на колесах" : "Дома на колесах"}
                  </option>
                  <option value="4x4">
                    {language === 'ua' ? "Джип-тури 4х4" : "Джип-туры 4х4"}
                  </option>
                  <option value="expedition">
                    {language === 'ua' ? "Експедиції" : "Экспедиции"}
                  </option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Поле 2: Направление */}
              <div className="relative w-full md:flex-1">
                <select
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  className="w-full appearance-none px-4 py-3 sm:py-3.5 bg-slate-50 border border-slate-200/90 rounded-xl sm:rounded-full text-slate-800 text-xs sm:text-sm font-bold focus:outline-none focus:border-[#FA9A1B] cursor-pointer pr-10"
                >
                  <option value="all">
                    {language === 'ua' ? "Напрямок: Всі" : "Направление: Все"}
                  </option>
                  <option value="Ісландія">Ісландія</option>
                  <option value="Норвегія">Норвегія</option>
                  <option value="Чилі">Патагонія (Чилі/Аргентина)</option>
                  <option value="Намібія">Намібія (Африка)</option>
                  <option value="Японія">Японія</option>
                  <option value="Перу">Перу</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Поле 3: Месяц */}
              <div className="relative w-full md:flex-1">
                <select
                  value={searchMonth}
                  onChange={(e) => setSearchMonth(e.target.value)}
                  className="w-full appearance-none px-4 py-3 sm:py-3.5 bg-slate-50 border border-slate-200/90 rounded-xl sm:rounded-full text-slate-800 text-xs sm:text-sm font-bold focus:outline-none focus:border-[#FA9A1B] cursor-pointer pr-10"
                >
                  <option value="all">
                    {language === 'ua' ? "Місяць: Будь-який" : "Месяц: Любой"}
                  </option>
                  <option value="07">{language === 'ua' ? "Липень 2025" : "Июль 2025"}</option>
                  <option value="09">{language === 'ua' ? "Вересень 2025" : "Сентябрь 2025"}</option>
                  <option value="10">{language === 'ua' ? "Жовтень 2025" : "Октябрь 2025"}</option>
                  <option value="11">{language === 'ua' ? "Листопад 2025" : "Ноябрь 2025"}</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Кнопка Поиск ярко-оранжевая как на скриншоте */}
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3.5 sm:py-4 bg-[#FA9A1B] hover:bg-[#e88d15] text-white font-extrabold text-sm sm:text-base rounded-xl sm:rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 flex-shrink-0"
              >
                <span>{language === 'ua' ? "Пошук" : "Поиск"}</span>
                <Search className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* 2. СЕКЦИЯ: БЛИЖАЙШИЕ ТУРЫ (РЕЗУЛЬТАТЫ ПОИСКА / ВИТРИНА) */}
      <section ref={upcomingRef} id="upcoming-tours" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-[#FA9A1B] font-extrabold text-xs uppercase tracking-wider block mb-1">
              {language === 'ua' ? "АКТУАЛЬНІ ВИЇЗДИ" : "АКТУАЛЬНЫЕ ВЫЕЗДЫ"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              {language === 'ua' ? "Ближчі тури та експедиції" : "Ближайшие туры и экспедиции"}
            </h2>
          </div>

          <Link
            to="/catalog"
            className="text-[#233876] hover:text-[#FA9A1B] font-extrabold text-sm flex items-center space-x-1 mt-4 sm:mt-0 transition-colors"
          >
            <span>{t.common.allTours}</span>
            <ChevronRight className="w-4 h-4 text-[#FA9A1B]" />
          </Link>
        </div>

        {/* Сетка туров */}
        {displayedTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
            <p className="text-slate-600 font-bold mb-3">
              {language === 'ua' 
                ? "За вашими критеріями пошуку зараз немає турів." 
                : "По вашим критериям поиска сейчас нет туров."}
            </p>
            <button
              onClick={() => {
                setSearchCategory('all');
                setSearchDestination('all');
                setSearchMonth('all');
              }}
              className="px-5 py-2.5 bg-[#FA9A1B] text-white font-bold text-xs rounded-xl"
            >
              {language === 'ua' ? "Скинути фільтри" : "Сбросить фильтры"}
            </button>
          </div>
        )}
      </section>

      {/* 3. КАРУСЕЛЬ ФОТО & ВИДЕО ОТЗЫВОВ */}
      <section className="py-20 bg-white border-y border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-[#FA9A1B] font-extrabold text-xs uppercase tracking-wider block mb-1">
                {language === 'ua' ? "ЖИВІ ВРАЖЕННЯ ТУРИСТІВ" : "ЖИВЫЕ ВПЕЧАТЛЕНИЯ ТУРИСТОВ"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                {language === 'ua' ? "Фото та відеовідгуки з подорожей" : "Фото и видеоотзывы из путешествий"}
              </h2>
            </div>

            {/* Стрелки управления каруселью */}
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <button
                onClick={prevReview}
                className="w-10 h-10 rounded-full border border-slate-300 hover:border-[#FA9A1B] hover:bg-[#FA9A1B] hover:text-white flex items-center justify-center transition-colors text-slate-700 shadow-sm"
                title="Попередній"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextReview}
                className="w-10 h-10 rounded-full border border-slate-300 hover:border-[#FA9A1B] hover:bg-[#FA9A1B] hover:text-white flex items-center justify-center transition-colors text-slate-700 shadow-sm"
                title="Наступний"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Интерактивный слайдер */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Левая часть: Видео/Фото превью карточки с кнопкой Play */}
              <div 
                className="relative aspect-[16/10] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-xl group cursor-pointer bg-slate-900"
                onClick={() => setActiveVideoModal(videoReviews[activeReviewIndex])}
              >
                <img
                  src={videoReviews[activeReviewIndex].videoThumb}
                  alt={videoReviews[activeReviewIndex].name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.85]"
                />
                
                {/* Кнопка Play по центру с пульсацией */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FA9A1B] text-white flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                      <Play className="w-8 h-8 fill-white ml-1" />
                    </div>
                    <span className="absolute inset-0 rounded-full bg-[#FA9A1B] animate-ping opacity-40 pointer-events-none" />
                  </div>
                </div>

                {/* Бейдж видеоотзыва */}
                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full text-white font-extrabold text-xs flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>{language === 'ua' ? "ВІДЕОЗВІТ" : "ВИДЕООТЧЕТ"} • {videoReviews[activeReviewIndex].duration}</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-slate-950/90 to-transparent p-4 rounded-b-2xl">
                  <p className="text-white font-bold text-sm">
                    {videoReviews[activeReviewIndex].tour}
                  </p>
                </div>
              </div>

              {/* Правая часть: Цитата и данные автора */}
              <div className="bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200/80 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center space-x-1 text-amber-500 mb-6">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-5 h-5 fill-amber-500" />
                    ))}
                    <span className="text-xs font-black text-slate-800 ml-2">5.0 / 5.0</span>
                  </div>

                  <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-semibold italic mb-8">
                    "{videoReviews[activeReviewIndex].quote}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                  <div className="flex items-center space-x-3.5">
                    <img
                      src={videoReviews[activeReviewIndex].avatar}
                      alt={videoReviews[activeReviewIndex].name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-[#FA9A1B]"
                    />
                    <div>
                      <h4 className="font-extrabold text-base text-slate-900 leading-tight">
                        {videoReviews[activeReviewIndex].name}
                      </h4>
                      <p className="text-xs font-bold text-slate-500">
                        м. {videoReviews[activeReviewIndex].city}
                      </p>
                    </div>
                  </div>

                  {/* Кнопка открыть видео */}
                  <button
                    onClick={() => setActiveVideoModal(videoReviews[activeReviewIndex])}
                    className="px-4 py-2 bg-[#233876] hover:bg-[#FA9A1B] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                  >
                    {language === 'ua' ? "Дивитися відео" : "Смотреть видео"}
                  </button>
                </div>
              </div>
            </div>

            {/* Точки переключения (Dots) */}
            <div className="flex items-center justify-center space-x-2 mt-8">
              {videoReviews.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setActiveReviewIndex(dotIdx)}
                  className={`h-2.5 rounded-full transition-all ${
                    activeReviewIndex === dotIdx
                      ? 'w-8 bg-[#FA9A1B]'
                      : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. МОДАЛЬНОЕ ОКНО ПРОСМОТРА ВИДЕООТЗЫВА */}
      <AnimatePresence>
        {activeVideoModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideoModal(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl z-10 text-white"
            >
              <button
                onClick={() => setActiveVideoModal(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 text-white hover:bg-white/40 flex items-center justify-center transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-video bg-black flex items-center justify-center">
                <img
                  src={activeVideoModal.videoThumb}
                  alt={activeVideoModal.name}
                  className="w-full h-full object-cover filter brightness-[0.6]"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-[#FA9A1B] text-white flex items-center justify-center mb-4 shadow-2xl">
                    <Play className="w-9 h-9 fill-white ml-1" />
                  </div>
                  <h3 className="font-black text-2xl text-white mb-2">
                    {activeVideoModal.tour}
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md">
                    Відеозвіт від мандрівників: {activeVideoModal.name} (м. {activeVideoModal.city})
                  </p>
                </div>
              </div>

              <div className="p-6 bg-slate-900 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-white">{activeVideoModal.name}</h4>
                  <p className="text-xs text-slate-400">{activeVideoModal.tour}</p>
                </div>
                <button
                  onClick={() => {
                    setActiveVideoModal(null);
                    openBookingModal(null);
                  }}
                  className="px-5 py-2.5 bg-[#FA9A1B] hover:bg-[#e88d15] text-slate-950 font-black text-xs rounded-xl transition-all"
                >
                  {language === 'ua' ? "Хочу в такий тур" : "Хочу в такой тур"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
