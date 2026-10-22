import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, Play, CheckCircle2, MessageSquare, Send, 
  MapPin, Calendar, Heart, ShieldCheck, X, Filter 
} from 'lucide-react';
import { useTours } from '../context/ToursContext';

export default function Reviews() {
  const { language, openBookingModal } = useTours();
  const isUa = language === 'ua';

  // Фильтр по категории отзывов
  const [activeFilter, setActiveFilter] = useState('all');

  // Активный видеоотзыв для модального окна
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  // Форма добавления отзыва
  const [reviewForm, setReviewForm] = useState({
    name: '',
    city: '',
    tour: 'iceland',
    rating: 5,
    comment: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const reviewsData = [
    {
      id: 1,
      name: isUa ? "Юлія та Денис Мельники" : "Юлия и Денис Мельник",
      city: isUa ? "Київ" : "Киев",
      country: isUa ? "Ісландія" : "Исландия",
      tourTag: "iceland",
      tourName: isUa ? "Ісландія на кемперах: повне коло навколо острова" : "Исландия на кемперах: полное кольцо вокруг острова",
      date: "Липень 2025",
      rating: 5,
      type: "video",
      duration: "02:45 хв",
      thumb: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      quote: isUa 
        ? "Неймовірний формат подорожі! Зустрічати світанки в кемпері біля підніжжя водоспадів і засинати під шум океану. Організація продумана до найдрібніших деталей, смачне барбекю щовечора і дуже тепла компанія. Ми вже плануємо наступну поїздку в Норвегію!"
        : "Невероятный формат путешествия! Встречать рассветы в кемпере прямо у водопадов и засыпать под шум океана. Организация продумана до мелочей, барбекю каждый вечер и теплая компания. Уже планируем следующую поездку в Норвегию!"
    },
    {
      id: 2,
      name: isUa ? "Олександр Кучеренко" : "Александр Кучеренко",
      city: isUa ? "Львів" : "Львов",
      country: isUa ? "Норвегія" : "Норвегия",
      tourTag: "norway",
      tourName: isUa ? "Норвегія на кемперах: фіорди, водоспади та Язик Троля" : "Норвегия на кемперах: фьорды, водопады и Язык Тролля",
      date: "Серпень 2025",
      rating: 5,
      type: "video",
      duration: "03:12 хв",
      thumb: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      quote: isUa
        ? "Я їхав один і спочатку переживав, як складеться спілкування. Але команда здружилася вже в перший вечір! Сходження на Язик Троля перевершило всі сподівання, а гаряча сауна на березі фіорду після трекінгу — це чистий кайф. Дякую турлідеру Дмитру!"
        : "Ехал соло и переживал за компанию, но команда стала родной уже в первый вечер! Восхождение на Язык Тролля превзошло все ожидания, а сауна у фьорда — чистый кайф. Спасибо турлидеру Дмитрию!"
    },
    {
      id: 3,
      name: isUa ? "Марина та Сергій" : "Марина и Сергей",
      city: isUa ? "Дніпро" : "Днепр",
      country: isUa ? "Патагонія" : "Патагония",
      tourTag: "patagonia",
      tourName: isUa ? "Патагонія: Торрес-дель-Пайне та Періто-Морено на 4х4" : "Патагония: Торрес-дель-Пайне и Перито-Морено на 4х4",
      date: "Листопад 2025",
      rating: 5,
      type: "photo",
      duration: "12 фото",
      thumb: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=800&q=80",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      quote: isUa
        ? "Патагонія на надійних підготовлених джипах — це свобода, яку неможливо передати словами. Льодовик Періто-Морено з його гуркотом криги стоїть перед очима досі. Все було організовано на вищому рівні!"
        : "Патагония на подготовленных джипах — это свобода, которую невозможно описать словами. Ледник Перито-Морено с грохотом векового льда в памяти навсегда. Организация на высшем уровне!"
    },
    {
      id: 4,
      name: isUa ? "Олег та Наталія" : "Олег и Наталья",
      city: isUa ? "Харків" : "Харьков",
      country: isUa ? "Оман" : "Оман",
      tourTag: "oman",
      tourName: isUa ? "Оман на джипах: каньйони Джебель Шамс та Ваді Шааб" : "Оман на джипах: каньоны Джебель Шамс и Вади Шааб",
      date: "Грудень 2025",
      rating: 5,
      type: "video",
      duration: "02:15 хв",
      thumb: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      quote: isUa
        ? "Намети на даху джипів прямо посеред безкрайніх золотих дюн пустелі Вахіба! Купання в бірюзових прісних оазисах та свіжа риба на грилі на березі океану. Найромантичніша подорож нашого життя!"
        : "Палатки на крыше джипов посреди барханов пустыни Вахиба! Купание в бирюзовых оазисах и свежая рыба на гриле у океана. Самое яркое приключение в жизни!"
    },
    {
      id: 5,
      name: isUa ? "Ігор та Катерина" : "Игорь и Екатерина",
      city: isUa ? "Одеса" : "Одесса",
      country: isUa ? "Намібія" : "Намибия",
      tourTag: "namibia",
      tourName: isUa ? "Намібія: Сафарі в Етоші та червоні Дюни Соссусфлей" : "Намибия: Сафари в Этоше и красные Дюны Соссусфлей",
      date: "Жовтень 2025",
      rating: 5,
      type: "video",
      duration: "04:15 хв",
      thumb: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
      quote: isUa
        ? "Ніч у сафарі-траках під мільйонами зірок Південного хреста, слони та леви в 10 метрах від нашого авто, і неймовірний схід сонця на Дюні 45. Безпечно, драйвово та захоплююче!"
        : "Ночевки под миллионами звезд, дикие животные саванны на расстоянии вытянутой руки и восход солнца на Дюне 45. Драйв, безопасность и чистый восторг!"
    },
    {
      id: 6,
      name: isUa ? "Вікторія Левченко" : "Виктория Левченко",
      city: isUa ? "Вінниця" : "Винница",
      country: isUa ? "Японія" : "Япония",
      tourTag: "japan",
      tourName: isUa ? "Японія: Червоні клени момідзі, Кіото та гора Фудзі" : "Япония: Красные клены момидзи, Киото и гора Фудзи",
      date: "Листопад 2025",
      rating: 5,
      type: "photo",
      duration: "18 фото",
      thumb: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      quote: isUa
        ? "Поїздка продумана на 100%. Від традиційних онсенів із видом на Фудзі до прихованих від туристів храмів Кіото. Окрема подяка гіду за допомогу з японською кухнею та культурою!"
        : "Поездка спланирована безупречно! От онсенов с видом на Фудзи до аутентичных храмов Киото. Спасибо гиду за теплоту и невероятную атмосферу!"
    }
  ];

  const filteredReviews = reviewsData.filter((r) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'video') return r.type === 'video';
    if (activeFilter === 'photo') return r.type === 'photo';
    return r.tourTag === activeFilter;
  });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.comment) return;
    setFormSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-10 pb-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок страницы */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#FA9A1B] font-extrabold text-xs uppercase tracking-wider block mb-2">
            OUTWAY TRAVEL REVIEWS
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4">
            {isUa ? "Відгуки та враження наших туристів" : "Отзывы и впечатления наших туристов"}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {isUa 
              ? "Чесні відеозвіти та фото від людей, які проїхали з нами тисячі кілометрів автошляхами Ісландії, Норвегії, Намібії та Оману."
              : "Честные видеоотчеты и фото людей, проехавших с нами тысячи километров по дорогам Исландии, Норвегии, Намибии и Омана."}
          </p>
        </div>

        {/* Статистическая плашка доверия */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-md mb-12 text-center">
          <div>
            <div className="flex items-center justify-center space-x-1 text-amber-500 mb-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-amber-500" />
              ))}
            </div>
            <span className="text-2xl font-black text-slate-900 block">4.9 / 5.0</span>
            <span className="text-xs font-bold text-slate-400">
              {isUa ? "Середня оцінка турів" : "Средняя оценка туров"}
            </span>
          </div>

          <div>
            <span className="text-3xl font-black text-slate-900 block mb-1">1 200+</span>
            <span className="text-xs font-bold text-slate-400">
              {isUa ? "Щасливих туристів" : "Счастливых туристов"}
            </span>
          </div>

          <div>
            <span className="text-3xl font-black text-[#FA9A1B] block mb-1">94%</span>
            <span className="text-xs font-bold text-slate-400">
              {isUa ? "Повертаються знову" : "Возвращаются снова"}
            </span>
          </div>

          <div>
            <span className="text-3xl font-black text-slate-900 block mb-1">70+</span>
            <span className="text-xs font-bold text-slate-400">
              {isUa ? "Відео- та фотозвітів" : "Видео- и фотоотчетов"}
            </span>
          </div>
        </div>

        {/* Фильтры по типу и направлениям */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { key: 'all', label: isUa ? 'Всі відгуки' : 'Все отзывы' },
            { key: 'video', label: isUa ? '🎥 Відеозвіти' : '🎥 Видеоотчеты' },
            { key: 'photo', label: isUa ? '📸 Фотозвіти' : '📸 Фотоотчеты' },
            { key: 'iceland', label: isUa ? 'Ісландія' : 'Исландия' },
            { key: 'norway', label: isUa ? 'Норвегія' : 'Норвегия' },
            { key: 'patagonia', label: isUa ? 'Патагонія' : 'Патагония' },
            { key: 'oman', label: isUa ? 'Оман' : 'Оман' },
            { key: 'namibia', label: isUa ? 'Намібія' : 'Намибия' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeFilter === tab.key
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Сетка карточек отзывов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredReviews.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Медиа-превью карточки */}
                <div 
                  className="relative aspect-[16/10] overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => setActiveVideoModal(item)}
                >
                  <img
                    src={item.thumb}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.9]"
                    loading="lazy"
                  />

                  {/* Бейдж видео или фото */}
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-white font-extrabold text-[11px] flex items-center space-x-1.5 shadow-sm">
                    {item.type === 'video' ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span>{isUa ? "ВІДЕО" : "ВИДЕО"} • {item.duration}</span>
                      </>
                    ) : (
                      <span>📷 {item.duration}</span>
                    )}
                  </div>

                  {/* Кнопка Play */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#FA9A1B] text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Страна / Локация */}
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-slate-900 text-xs font-bold flex items-center space-x-1 shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-[#FA9A1B]" />
                    <span>{item.country}</span>
                  </div>
                </div>

                {/* Контент отзыва */}
                <div className="p-6">
                  {/* Оценка и тур */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1 text-amber-500">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-slate-400">{item.date}</span>
                  </div>

                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 mb-2 leading-snug line-clamp-2">
                    {item.tourName}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic line-clamp-4">
                    "{item.quote}"
                  </p>
                </div>
              </div>

              {/* Футер карточки с автором */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-[#FA9A1B]"
                    />
                    <div>
                      <h4 className="font-black text-sm text-slate-900 leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-xs text-slate-400 font-bold">
                        {isUa ? "м. " : "г. "}{item.city}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveVideoModal(item)}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-[#FA9A1B] hover:text-white text-slate-800 text-xs font-extrabold rounded-xl transition-colors"
                  >
                    {isUa ? "Дивитися" : "Смотреть"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Форма: Оставить свой отзыв */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-8 sm:p-12 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[#FA9A1B] font-extrabold text-xs uppercase tracking-wider block mb-1">
              SHARE YOUR STORY
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
              {isUa ? "Поділіться враженнями про подорож" : "Поделитесь впечатлениями о поездке"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {isUa 
                ? "Ми публікуємо відгуки наших туристів на сайті та в Instagram-спільноті."
                : "Мы публикуем отзывы наших путешественников на сайте и в Instagram-сообществе."}
            </p>
          </div>

          {!formSubmitted ? (
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isUa ? "Ваше ім'я та прізвище *" : "Ваше имя и фамилия *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                    placeholder={isUa ? "Олена Коваль" : "Елена Коваль"}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-[#FA9A1B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isUa ? "Ваше місто" : "Ваш город"}
                  </label>
                  <input
                    type="text"
                    value={reviewForm.city}
                    onChange={(e) => setReviewForm({ ...reviewForm, city: e.target.value })}
                    placeholder={isUa ? "Київ / Львів" : "Киев / Львов"}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-[#FA9A1B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isUa ? "В якому турі ви були?" : "В каком туре вы были?"}
                </label>
                <select
                  value={reviewForm.tour}
                  onChange={(e) => setReviewForm({ ...reviewForm, tour: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-[#FA9A1B]"
                >
                  <option value="iceland">{isUa ? "Ісландія на кемперах" : "Исландия на кемперах"}</option>
                  <option value="norway">{isUa ? "Норвегія: фіорди та Язик Троля" : "Норвегия: фьорды и Язык Тролля"}</option>
                  <option value="patagonia">{isUa ? "Патагонія на 4х4" : "Патагония на 4х4"}</option>
                  <option value="oman">{isUa ? "Оман на джипах" : "Оман на джипах"}</option>
                  <option value="namibia">{isUa ? "Намібія: сафарі" : "Намибия: сафари"}</option>
                  <option value="japan">{isUa ? "Японія: клені та Фудзі" : "Япония: клены и Фудзи"}</option>
                </select>
              </div>

              {/* Звезды рейтинга */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isUa ? "Ваша оцінка" : "Ваша оценка"}
                </label>
                <div className="flex items-center space-x-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= reviewForm.rating
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">
                    {reviewForm.rating} / 5.0
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isUa ? "Ваш відгук та враження *" : "Ваш отзыв и впечатления *"}
                </label>
                <textarea
                  rows={4}
                  required
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  placeholder={isUa ? "Розкажіть, що вам найбільше запам'яталося..." : "Расскажите, что вам больше всего запомнилось..."}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-[#FA9A1B] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#FA9A1B] hover:bg-[#e88d15] text-white font-black rounded-xl text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <span>{isUa ? "Надіслати відгук" : "Отправить отзыв"}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto mb-3" />
              <h4 className="font-black text-2xl text-slate-900 mb-2">
                {isUa ? "Дякуємо за ваш відгук!" : "Спасибо за ваш отзыв!"}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6">
                {isUa 
                  ? "Ваш відгук успішно збережено та буде опубліковано після швидкої перевірки модератором."
                  : "Ваш отзыв успешно сохранен и будет опубликован после быстрой проверки модератором."}
              </p>
              <button
                onClick={() => {
                  setFormSubmitted(false);
                  setReviewForm({ name: '', city: '', tour: 'iceland', rating: 5, comment: '' });
                }}
                className="px-6 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl"
              >
                {isUa ? "Додати ще один відгук" : "Добавить еще один отзыв"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Модалка просмотра видеоотзыва */}
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
                  src={activeVideoModal.thumb}
                  alt={activeVideoModal.name}
                  className="w-full h-full object-cover filter brightness-[0.6]"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-[#FA9A1B] text-white flex items-center justify-center mb-4 shadow-2xl">
                    <Play className="w-9 h-9 fill-white ml-1" />
                  </div>
                  <h3 className="font-black text-2xl text-white mb-2">
                    {activeVideoModal.tourName}
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md">
                    {isUa ? "Відеозвіт від:" : "Видеоотчет от:"} {activeVideoModal.name} ({isUa ? "м. " : "г. "}{activeVideoModal.city})
                  </p>
                </div>
              </div>

              <div className="p-6 bg-slate-900 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-white">{activeVideoModal.name}</h4>
                  <p className="text-xs text-slate-400">{activeVideoModal.tourName}</p>
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
