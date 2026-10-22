import React, { createContext, useContext, useState, useMemo } from 'react';
import { initialTours } from '../data/initialTours';

const ToursContext = createContext(null);

export const ToursProvider = ({ children }) => {
  const [tours, setTours] = useState(initialTours);
  const [language, setLanguage] = useState('ua');

  // Фильтры в стиле New Way Travel: по формату тура, месяцу, бюджету
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [maxPrice, setMaxPrice] = useState(5000);
  const [searchQuery, setSearchQuery] = useState('');

  // Модалка бронирования
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingTour, setBookingTour] = useState(null);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ua' ? 'ru' : 'ua'));
  };

  const openBookingModal = (tour = null) => {
    setBookingTour(tour);
    setIsBookingOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingOpen(false);
    setBookingTour(null);
  };

  const resetFilters = () => {
    setSelectedFormat('all');
    setSelectedMonth('all');
    setMaxPrice(5000);
    setSearchQuery('');
  };

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      // Формат: camper / 4x4 / expedition
      if (selectedFormat !== 'all' && tour.format !== selectedFormat) return false;
      // Месяц
      if (selectedMonth !== 'all' && tour.monthKey !== selectedMonth) return false;
      // Бюджет
      if (tour.priceEUR > maxPrice && tour.priceUSD > maxPrice) return false;

      // Поиск
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const titleMatch = tour.title[language].toLowerCase().includes(query);
        const countryMatch = tour.country.toLowerCase().includes(query);
        const descMatch = tour.subtitle[language].toLowerCase().includes(query);
        if (!titleMatch && !countryMatch && !descMatch) return false;
      }

      return true;
    });
  }, [tours, selectedFormat, selectedMonth, maxPrice, searchQuery, language]);

  const translations = {
    ua: {
      brand: "OUTWAY TRAVEL",
      brandSub: "EXPEDITION CLUB",
      phone: "+38 (099) 000-00-00",
      email: "test@gmail.com",
      nav: {
        home: "Головна",
        tours: "Найближчі тури",
        catalog: "Всі тури",
        about: "Про нас",
        reviews: "Відгуки",
        bookNow: "Бронь",
      },
      hero: {
        badge: "🚐 Авторські подорожі по всьому світу",
        titleLine1: "Авторські тури",
        titleLine2: "Твій найкращий помічник у пошуках вражень!",
        subtitle: "Подорожі на кемперах та експедиції дикою природою. Невеликі теплі компанії, затишні вечори і жодних пакетних шаблонів.",
        exploreBtn: "Найближчі тури",
        camperBtn: "Про нас",
        statsCampers: "Турів на кемперах",
        statsTravelers: "Щасливих туристів",
        statsYears: "Років у дорозі",
        statsRepeat: "Повертаються знову",
      },
      common: {
        days: "днів",
        from: "від",
        person: "особа",
        details: "Подробиці",
        bookTour: "Бронь",
        allTours: "Всі тури",
        clearFilters: "Скинути фільтри",
        noResults: "За вашим запитом турів не знайдено",
        tryResetting: "Спробуйте змінити фільтри або скинути пошук",
        reviewsTitle: "Що кажуть наші туристи",
        reviewsSubtitle: "Чесні відгуки людей, які проїхали з нами тисячі кілометрів",
        faqTitle: "Часті запитання про кемпери",
        faqSubtitle: "Все, що потрібно знати про життя в будинку на колесах",
      }
    },
    ru: {
      brand: "OUTWAY TRAVEL",
      brandSub: "EXPEDITION CLUB",
      phone: "+38 (099) 000-00-00",
      email: "test@gmail.com",
      nav: {
        home: "Главная",
        tours: "Ближайшие туры",
        catalog: "Все туры",
        about: "О нас",
        reviews: "Отзывы",
        bookNow: "Бронь",
      },
      hero: {
        badge: "🚐 Авторские путешествия по всему миру",
        titleLine1: "Авторские туры",
        titleLine2: "Твой лучший помощник в поисках впечатлений!",
        subtitle: "Авторские поездки на домах на колесах и экспедиции по дикой природе. Небольшие душевные компании, вечера у костра и никаких пакетных клише.",
        exploreBtn: "Ближайшие туры",
        camperBtn: "О нас",
        statsCampers: "Туров на кемперах",
        statsTravelers: "Счастливых туристов",
        statsYears: "Лет в пути",
        statsRepeat: "Возвращаются снова",
      },
      common: {
        days: "дней",
        from: "от",
        person: "человек",
        details: "Подробности",
        bookTour: "Бронь",
        allTours: "Все туры",
        clearFilters: "Сбросить фильтры",
        noResults: "По вашему запросу туров не найдено",
        tryResetting: "Попробуйте изменить параметры или сбросить фильтры",
        reviewsTitle: "Что говорят наши туристы",
        reviewsSubtitle: "Честные отзывы людей, проехавших с нами тысячи километров",
        faqTitle: "Частые вопросы о кемперах",
        faqSubtitle: "Все, что нужно знать о жизни в доме на колесах",
      }
    }
  };

  const t = translations[language];

  return (
    <ToursContext.Provider
      value={{
        tours,
        setTours,
        language,
        setLanguage,
        toggleLanguage,
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
        filteredTours,
        isBookingOpen,
        bookingTour,
        openBookingModal,
        closeBookingModal,
      }}
    >
      {children}
    </ToursContext.Provider>
  );
};

export const useTours = () => {
  const context = useContext(ToursContext);
  if (!context) {
    throw new Error('useTours must be used within a ToursProvider');
  }
  return context;
};
