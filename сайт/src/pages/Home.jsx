import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ChevronDown, ChevronRight, Play, Star, 
  MapPin, Calendar, Clock, Users, ArrowRight, X, Sparkles
} from 'lucide-react';
import { useTours } from '../context/ToursContext';
import TourCard from '../components/TourCard';

export default function Home() {
  const { tours, language, t, openBookingModal } = useTours();

  const isUa = language === 'ua';

  // Поисковый фильтр в Hero
  const [searchCategory, setSearchCategory] = useState('all');
  const [searchDestination, setSearchDestination] = useState('all');
  const [searchMonth, setSearchMonth] = useState('all');

  // Видео-модалка отзыва
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  // Остановка ленты при наведении мыши
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

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

  // Коллекция живых фото- и видеоотзывов для бегущей ленты
  const reviewsList = [
    {
      id: 1,
      name: isUa ? "Юлія та Денис Мельники" : "Юлия и Денис Мельник",
      city: isUa ? "Київ" : "Киев",
      tour: isUa ? "Ісландія на кемперах: повне коло" : "Исландия на кемперах: полное кольцо",
      videoThumb: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      quote: isUa 
        ? "Неймовірний формат! Зустрічати світанки в кемпері біля водоспадів. Організація продумана до дрібниць, смачне барбекю щовечора!"
        : "Невероятный формат! Встречать рассветы в кемпере прямо у водопадов. Организация продумана до мелочей, барбекю каждый вечер!",
      duration: "02:45 хв",
      rating: 5,
      type: "video"
    },
    {
      id: 2,
      name: isUa ? "Олександр Кучеренко" : "Александр Кучеренко",
      city: isUa ? "Львів" : "Львов",
      tour: isUa ? "Норвегія: фіорди та Язик Троля" : "Норвегия: фьорды и Язык Тролля",
      videoThumb: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      quote: isUa
        ? "Їхав соло і переживав за компанію, але ми здружилися з першого дня! Сауна на березі фіорду та похід на Язик Троля — топ!"
        : "Ехал соло, но компания подобралась потрясающая! Сауна у фьорда и поход на Язык Тролля — незабываемый топ!",
      duration: "03:12 хв",
      rating: 5,
      type: "video"
    },
    {
      id: 3,
      name: isUa ? "Марина та Сергій" : "Марина и Сергей",
      city: isUa ? "Дніпро" : "Днепр",
      tour: isUa ? "Патагонія: Торрес-дель-Пайне на 4х4" : "Патагония: Торрес-дель-Пайне на 4х4",
      videoThumb: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=800&q=80",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      quote: isUa
        ? "Патагонія на позашляховиках — це свобода, яку не передати словами. Льодовик Періто-Морено з гуркотом стоїть перед очима досі."
        : "Патагония на внедорожниках — это чистая свобода. Ледник Перито-Морено с грохотом векового льда в памяти навсегда.",
      duration: "01:58 хв",
      rating: 5,
      type: "video"
    },
    {
      id: 4,
      name: isUa ? "Олег та Наталія" : "Олег и Наталья",
      city: isUa ? "Харків" : "Харьков",
      tour: isUa ? "Оман на джипах: каньйони та пустеля" : "Оман на джипах: каньоны и пустыня",
      videoThumb: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      quote: isUa
        ? "Намети на даху джипів прямо посеред барханів пустелі! Купання в смарагдових ваді та ніч під мільярдом зірок. Дуже рекомендуємо!"
        : "Палатки на крыше джипов посреди барханов! Купание в оазисах и ночь под миллиардом звезд. Полнейший восторг!",
      duration: "02:15 хв",
      rating: 5,
      type: "video"
    },
    {
      id: 5,
      name: isUa ? "Ігор та Катерина" : "Игорь и Екатерина",
      city: isUa ? "Одеса" : "Одесса",
      tour: isUa ? "Намібія: Сафарі та Дюни Соссусфлей" : "Намибия: Сафари и Дюны Соссусфлей",
      videoThumb: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
      quote: isUa
        ? "Ночівлі під зоряним небом Африки, леви поруч і схід сонця на Дюні 45. Найяскравіша пригода за все життя!"
        : "Ночевки под звездным небом Африки, дикие львы и рассвет на Дюне 45. Самое яркое путешествие за всю жизнь!",
      duration: "04:15 хв",
      rating: 5,
      type: "video"
    },
    {
      id: 6,
      name: isUa ? "Вікторія Левченко" : "Виктория Левченко",
      city: isUa ? "Вінниця" : "Винница",
      tour: isUa ? "Японія: Клени момідзі та Кіото" : "Япония: Клены момидзи и Киото",
      videoThumb: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      quote: isUa
        ? "Неймовірна атмосфера! Кожен готель, онсен та ресторан були підібрані з такою турботою, що не хотілося повертатися додому."
        : "Потрясающая атмосфера! Онсены, клены, древние храмы и очень чуткие турлидеры. Мечтаю поехать снова!",
      duration: "03:40 хв",
      rating: 5,
      type: "video"
    }
  ];

  // Дублируем массив для создания бесконечной бесшовной ленты
  const tickerItems = [...reviewsList, ...reviewsList];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pb-20"
    >
      {/* 1. HERO СЕКЦИЯ С ФОНОМ И ЦЕНТРАЛЬНЫМ ПОИСКОМ */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-900 overflow-hidden">
        {/* Фоновое фото: Каппадокия / воздушные шары в лучах рассвета */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=2000&q=85"
            alt="Outway Travel Background"
            className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/30 to-slate-900/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center text-white w-full">
          {/* Надзаголовок: АВТОРСКИЕ ТУРЫ */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-base sm:text-2xl font-black uppercase tracking-wider text-white mb-2 drop-shadow-md"
          >
            {isUa ? "АВТОРСЬКІ ТУРИ" : "АВТОРСКИЕ ТУРЫ"}
          </motion.div>

          {/* Уникальное название бренда */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase drop-shadow-lg leading-tight md:leading-none mb-3 sm:mb-4"
          >
            OUTWAY TRAVEL
          </motion.h1>

          {/* Подзаголовок: Твой лучший помощник в поисках впечатлений! */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-xl md:text-2xl font-extrabold text-white max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-10 drop-shadow-md px-2"
          >
            {isUa 
              ? "Твій найкращий помічник у пошуках вражень!" 
              : "Твой лучший помощник в поисках впечатлений!"}
          </motion.p>

          {/* ПОИСКОВАЯ ПАНЕЛЬ ПО ЦЕНТРУ (Категория | Направление | Месяц | Поиск) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto w-full px-1"
          >
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl md:rounded-full shadow-2xl border border-white/60 flex flex-col md:flex-row items-stretch md:items-center gap-2.5"
            >
              {/* Поле 1: Категория */}
              <div className="relative w-full md:flex-1">
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="w-full appearance-none px-4 py-3 bg-slate-50 border border-slate-200/90 rounded-xl md:rounded-full text-slate-800 text-xs sm:text-sm font-bold focus:outline-none focus:border-[#FA9A1B] cursor-pointer pr-10"
                >
                  <option value="all">
                    {isUa ? "Категорія: Всі" : "Категория: Все"}
                  </option>
                  <option value="camper">
                    {isUa ? "Будинки на колесах" : "Дома на колесах"}
                  </option>
                  <option value="4x4">
                    {isUa ? "Джип-тури 4х4" : "Джип-туры 4х4"}
                  </option>
                  <option value="expedition">
                    {isUa ? "Експедиції" : "Экспедиции"}
                  </option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Поле 2: Направление */}
              <div className="relative w-full md:flex-1">
                <select
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  className="w-full appearance-none px-4 py-3 bg-slate-50 border border-slate-200/90 rounded-xl md:rounded-full text-slate-800 text-xs sm:text-sm font-bold focus:outline-none focus:border-[#FA9A1B] cursor-pointer pr-10"
                >
                  <option value="all">
                    {isUa ? "Напрямок: Всі" : "Направление: Все"}
                  </option>
                  <option value="Ісландія">Ісландія</option>
                  <option value="Норвегія">Норвегія</option>
                  <option value="Чилі">Патагонія (Чилі/Аргентина)</option>
                  <option value="Намібія">Намібія (Африка)</option>
                  <option value="Оман">Оман</option>
                  <option value="Японія">Японія</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Поле 3: Месяц */}
              <div className="relative w-full md:flex-1">
                <select
                  value={searchMonth}
                  onChange={(e) => setSearchMonth(e.target.value)}
                  className="w-full appearance-none px-4 py-3 bg-slate-50 border border-slate-200/90 rounded-xl md:rounded-full text-slate-800 text-xs sm:text-sm font-bold focus:outline-none focus:border-[#FA9A1B] cursor-pointer pr-10"
                >
                  <option value="all">
                    {isUa ? "Місяць: Будь-який" : "Месяц: Любой"}
                  </option>
                  <option value="07">{isUa ? "Липень 2025" : "Июль 2025"}</option>
                  <option value="09">{isUa ? "Вересень 2025" : "Сентябрь 2025"}</option>
                  <option value="10">{isUa ? "Жовтень 2025" : "Октябрь 2025"}</option>
                  <option value="11">{isUa ? "Листопад 2025" : "Ноябрь 2025"}</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Кнопка Поиск */}
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3.5 bg-[#FA9A1B] hover:bg-[#e88d15] text-white font-black text-sm sm:text-base rounded-xl md:rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 flex-shrink-0 cursor-pointer active:scale-98"
              >
                <span>{isUa ? "Пошук" : "Поиск"}</span>
                <Search className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* 2. СЕКЦИЯ: БЛИЖАЙШИЕ ТУРЫ (ПО ОБРАЗЦУ СКРИНШОТА) */}
      <section ref={upcomingRef} id="upcoming-tours" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-[#FA9A1B] font-extrabold text-xs uppercase tracking-wider block mb-1">
              {isUa ? "АКТУАЛЬНІ ВИЇЗДИ" : "АКТУАЛЬНЫЕ ВЫЕЗДЫ"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              {isUa ? "Ближчі тури" : "Ближайшие туры"}
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

        {/* Сетка туров: по 2 в строке как на скриншоте */}
        {displayedTours.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {displayedTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
            <p className="text-slate-600 font-bold mb-3">
              {isUa 
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
              {isUa ? "Скинути фільтри" : "Сбросить фильтры"}
            </button>
          </div>
        )}
      </section>

      {/* 3. БЕГУЩАЯ ЛЕНТА ФОТО & ВИДЕО ОТЗЫВОВ (MARQUEE) */}
      <section id="reviews" className="py-20 bg-slate-50 border-y border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between">
            <div>
              <span className="text-[#FA9A1B] font-extrabold text-xs uppercase tracking-wider block mb-1">
                {isUa ? "ЖИВІ ЕМОЦІЇ МАНДРІВНИКІВ" : "ЖИВЫЕ ЭМОЦИИ ПУТЕШЕСТВЕННИКОВ"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                {isUa ? "Фото та відеовідгуки" : "Фото и видеоотзывы"}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4 mt-3 sm:mt-0">
              <Link
                to="/reviews"
                className="text-[#233876] hover:text-[#FA9A1B] font-extrabold text-sm flex items-center space-x-1 transition-colors"
              >
                <span>{isUa ? "Всі відгуки" : "Все отзывы"}</span>
                <ChevronRight className="w-4 h-4 text-[#FA9A1B]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Бегущая дорожка (Infinite Marquee) */}
        <div 
          className="relative w-full overflow-hidden py-4"
          onMouseEnter={() => setIsMarqueePaused(true)}
          onMouseLeave={() => setIsMarqueePaused(false)}
        >
          {/* Левое и правое размытие для мягкого растворения краев */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-6 w-max cursor-grab active:cursor-grabbing"
            animate={{
              x: isMarqueePaused ? undefined : ['0%', '-50%'],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 40,
                ease: 'linear',
              },
            }}
          >
            {tickerItems.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                onClick={() => setActiveVideoModal(item)}
                className="w-[300px] sm:w-[360px] bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 flex-shrink-0 group cursor-pointer flex flex-col justify-between"
              >
                {/* Фото/Видео превью */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={item.videoThumb}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-[0.9]"
                    loading="lazy"
                  />

                  {/* Бейдж видеоотчета */}
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-white font-extrabold text-[11px] flex items-center space-x-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span>{isUa ? "ВІДЕОЗВІТ" : "ВИДЕООТЧЕТ"} • {item.duration}</span>
                  </div>

                  {/* Кнопка воспроизведения */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FA9A1B] text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Название тура внизу фото */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-6">
                    <span className="text-white text-xs font-bold truncate block">
                      {item.tour}
                    </span>
                  </div>
                </div>

                {/* Текстовый отзыв и автор */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    {/* Звездочки рейтинга */}
                    <div className="flex items-center space-x-1 text-amber-500 mb-2.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-amber-500" />
                      ))}
                      <span className="text-[11px] font-black text-slate-700 ml-1.5">5.0</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium italic line-clamp-3 mb-4">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Профиль автора */}
                  <div className="flex items-center space-x-3 pt-3 border-t border-slate-100">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#FA9A1B]"
                    />
                    <div className="overflow-hidden">
                      <h4 className="font-black text-xs sm:text-sm text-slate-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] font-bold text-slate-400">
                        {isUa ? "м. " : "г. "}{item.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
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
                    {isUa ? "Відеозвіт від мандрівників:" : "Видеоотчет от путешественников:"} {activeVideoModal.name} ({isUa ? "м. " : "г. "}{activeVideoModal.city})
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
                  className="px-6 py-3 bg-[#FACC15] hover:bg-[#eab308] text-slate-950 font-black text-xs rounded-xl transition-all shadow-md"
                >
                  {isUa ? "Бронь цього туру" : "Бронь этого тура"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
