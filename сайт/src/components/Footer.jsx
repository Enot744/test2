import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Youtube, Send, ShieldCheck, Heart } from 'lucide-react';
import { useTours } from '../context/ToursContext';

export default function Footer() {
  const { language, t } = useTours();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Бренд */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#FA9A1B] flex items-center justify-center font-black text-white text-lg shadow-md">
                OT
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tight text-white leading-none">
                  OUTWAY TRAVEL
                </span>
                <span className="text-[10px] font-extrabold tracking-widest text-[#FA9A1B] uppercase mt-0.5">
                  EXPEDITION CLUB
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {language === 'ua'
                ? "Організовуємо авторські подорожі на кемперах та експедиції дикою природою. Невеликі теплі групи, найкращі маршрути та незабутні враження."
                : "Организуем авторские путешествия на кемперах и экспедиции по дикой природе. Небольшие душевные группы, лучшие маршруты и яркие эмоции."}
            </p>

            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>
                {language === 'ua'
                  ? "Офіційна туроператорська діяльність та страхування"
                  : "Официальная деятельность туроператора и страхование"}
              </span>
            </div>
          </div>

          {/* Навигация */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
              {language === 'ua' ? "Розділи" : "Разделы"}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-[#FA9A1B] transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <a href="/#upcoming-tours" className="hover:text-[#FA9A1B] transition-colors">
                  {t.nav.tours}
                </a>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FA9A1B] transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-[#FA9A1B] transition-colors">
                  {t.nav.reviews}
                </Link>
              </li>
              <li>
                <Link to="/lucky-globe" className="text-amber-400 hover:text-amber-300 font-bold transition-colors flex items-center space-x-1">
                  <span>🌍 {language === 'ua' ? 'Глобус Удачі' : 'Глобус Удачи'}</span>
                  <span className="bg-red-500 text-white text-[9px] font-black px-1 rounded">HOT</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Направления */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
              {language === 'ua' ? "Напрямки" : "Направления"}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="/#upcoming-tours" className="hover:text-[#FA9A1B] transition-colors">
                  {language === 'ua' ? "Ісландія на кемперах" : "Исландия на кемперах"}
                </a>
              </li>
              <li>
                <a href="/#upcoming-tours" className="hover:text-[#FA9A1B] transition-colors">
                  {language === 'ua' ? "Норвегія: фіорди" : "Норвегия: фьорды"}
                </a>
              </li>
              <li>
                <a href="/#upcoming-tours" className="hover:text-[#FA9A1B] transition-colors">
                  {language === 'ua' ? "Патагонія на джипах" : "Патагония на джипах"}
                </a>
              </li>
              <li>
                <a href="/#upcoming-tours" className="hover:text-[#FA9A1B] transition-colors">
                  {language === 'ua' ? "Намібія: сафарі" : "Намибия: сафари"}
                </a>
              </li>
              <li>
                <a href="/#upcoming-tours" className="hover:text-[#FA9A1B] transition-colors">
                  {language === 'ua' ? "Оман на джипах 4х4" : "Оман на джипах 4х4"}
                </a>
              </li>
            </ul>
          </div>

          {/* Тестовые контакты по требованию */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
              {language === 'ua' ? "Контакти" : "Контакты"}
            </h4>
            <div className="space-y-3 text-sm">
              <a href="tel:+380990000000" className="flex items-center space-x-2 hover:text-[#FA9A1B] transition-colors">
                <Phone className="w-4 h-4 text-[#FA9A1B]" />
                <span>+38 (099) 000-00-00</span>
              </a>
              <a href="mailto:test@gmail.com" className="flex items-center space-x-2 hover:text-[#FA9A1B] transition-colors">
                <Mail className="w-4 h-4 text-[#FA9A1B]" />
                <span>test@gmail.com</span>
              </a>
              <div className="flex items-center space-x-2 text-slate-400">
                <MapPin className="w-4 h-4 text-[#FA9A1B]" />
                <span>м. Київ, вул. Тестова, 1</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-[#FA9A1B] hover:text-white flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-[#FA9A1B] hover:text-white flex items-center justify-center transition-colors"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-[#FA9A1B] hover:text-white flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Нижний бар */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} OUTWAY TRAVEL CLUB. Всі права захищено.</p>
          <div className="flex items-center space-x-1 mt-4 md:mt-0">
            <span>Зроблено для незабутніх вражень</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
