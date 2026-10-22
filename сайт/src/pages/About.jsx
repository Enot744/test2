import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Send, CheckCircle2, Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { useTours } from '../context/ToursContext';

export default function About() {
  const { language, t } = useTours();

  const [openFaq, setOpenFaq] = useState({ 0: true });
  const [formSent, setFormSent] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', phone: '', message: '' });

  const toggleFaq = (idx) => {
    setOpenFaq((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone) return;
    setFormSent(true);
  };

  const team = [
    {
      name: language === 'ua' ? "Олексій та Ірина" : "Алексей и Ирина",
      role: language === 'ua' ? "Засновники Outway Travel / Експерти Ісландії" : "Основатели Outway Travel / Эксперты Исландии",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      bio: language === 'ua'
        ? "14 років тому ми вперше сіли в кемпер в Ісландії і закохалися в цей формат. Відтоді ми провели понад 70 турів і показали справжній світ тисячам мандрівників."
        : "14 лет назад мы впервые сели в дом на колесах в Исландии и влюбились в этот формат. С тех пор провели более 70 кемпер-трипов."
    },
    {
      name: language === 'ua' ? "Дмитро Корнійчук" : "Дмитрий Корнийчук",
      role: language === 'ua' ? "Штурман Норвегії та Скандинавії" : "Штурман Норвегии и Скандинавии",
      photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
      bio: language === 'ua'
        ? "Знає всі найкращі стоянки над фіордами, де можна смажити рибу під північним сонцем і купатися після сходження на скелі."
        : "Знает самые живописные стоянки у фьордов и мастерски координирует маршруты."
    },
    {
      name: language === 'ua' ? "Андрій Мельник" : "Андрей Мельник",
      role: language === 'ua' ? "Гірський провідник / Патагонія та Оман" : "Горный проводник / Патагония и Оман",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      bio: language === 'ua'
        ? "Гірський гід, який провів десятки експедицій до Фіцроя, Торрес-дель-Пайне та пустель Оману. Забезпечує безпеку та затишок у найдикіших куточках."
        : "Опытный гид, за плечами которого десятки экспедиций в Патагонию, Анды и пустыни Омана."
    }
  ];

  const camperFaqs = [
    {
      q: language === 'ua' ? "Чи зручно спати та жити в кемпері?" : "Удобно ли спать и жить в кемпере?",
      a: language === 'ua'
        ? "Так! Сучасні європейські кемпери — це повноцінна 2-кімнатна квартира на колесах. Там є зручні м'які ліжка з постільною білизною, автономне опалення (тепло навіть коли за вікном +3°C), кухня з газовою плитою, холодильником, мийкою та гарячим душем. Крім того, всі ночівлі проходять у кемпінгах з сучасними душовими, пральнями та кухнями."
        : "Да! Европейские кемперы очень комфортабельны: мягкие кровати, автономное отопление, кухня с плитой и холодильником. Ночуем в благоустроенных кемпингах с горячим душем и Wi-Fi."
    },
    {
      q: language === 'ua' ? "Хто керує будинком на колесах?" : "Кто водит дом на колесах?",
      a: language === 'ua'
        ? "Кемпером керують наші гіди та учасники, які мають водійські права категорії «B» (зі стажем від 3 років) і бажання кермувати. Достатньо звичайних легкових прав! Кемпери легкі в управлінні, а попереду колони завжди їде автомобіль турлідера, який веде маршрут."
        : "Водят наши гиды и участники с правами категории «B» (стаж от 3 лет). Обычных прав достаточно! Впереди всегда идет ведущая машина гида."
    },
    {
      q: language === 'ua' ? "Як організовано харчування в турі?" : "Как организовано питание в туре?",
      a: language === 'ua'
        ? "У перший же день ми заїжджаємо у великий супермаркет і закуповуємо продукти на кілька днів. У кожному кемпері є повноцінна кухня з посудом. Ми разом готуємо смачні сніданки та вечері (стейки, лосось на грилі, пасту, супи), а вдень обідаємо в колоритних кафе по дорозі."
        : "В первый день закупаем свежие продукты в супермаркете. В кемперах полноценные кухни: готовим совместные стейки, рыбу на гриле или обедаем в кафе."
    },
    {
      q: language === 'ua' ? "Чи можна їхати самому / самій?" : "Можно ли ехать одному / одной?",
      a: language === 'ua'
        ? "Близько половини наших туристів приєднуються поодинці! Ми підбираємо комфортне розміщення з мандрівником вашої статі. З першого ж дня в кемпері складається тепла сімейна атмосфера, і після поїздки всі залишаються близькими друзями."
        : "Около половины туристов едут соло! Мы подбираем комфортное расселение. В кемпере моментально возникает душевная командная атмосфера."
    }
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
        {/* Шапка страницы О нас */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#FA9A1B] font-extrabold text-xs uppercase tracking-wider block mb-2">
            ABOUT OUTWAY TRAVEL CLUB
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-6">
            {language === 'ua' ? "Ми створюємо подорожі, які запам'ятовуються назавжди" : "Мы создаем путешествия, которые запоминаются навсегда"}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {language === 'ua'
              ? "OUTWAY TRAVEL — це спільнота людей, закоханих у дорогу, гори та романтику авторських подорожей. Ми відкриваємо планету поза звичними туристичними шаблонами."
              : "OUTWAY TRAVEL — сообщество людей, влюбленных в дорогу, горы и авторские путешествия. Мы открываем планету без скучных туристических шаблонов."}
          </p>
        </div>

        {/* 3 кита Outway Travel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
            <div className="text-3xl mb-3">🚐</div>
            <h3 className="font-extrabold text-xl text-slate-900 mb-2">
              {language === 'ua' ? "Експерти з автоекспедицій" : "Эксперты по автоэкспедициям"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {language === 'ua'
                ? "Ми знаємо про кемпери та джип-експедиції все: перевірені прокатні компанії, таємні стоянки та нюанси доріг різних країн."
                : "Знаем о кемперах и экспедициях все: надежные прокаты, живописные стоянки и особенности дорог."}
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="font-extrabold text-xl text-slate-900 mb-2">
              {language === 'ua' ? "Справжня родина в дорозі" : "Настоящая семья в пути"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {language === 'ua'
                ? "У наших поїздках немає чужих. Ми разом розпалюємо вогонь, ділимося історіями й повертаємося додому компанією близьких друзів."
                : "В поездках нет чужих. Мы готовим вместе ужины, делимся историями и остаемся друзьями на годы."}
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
            <div className="text-3xl mb-3">🛡️</div>
            <h3 className="font-extrabold text-xl text-slate-900 mb-2">
              {language === 'ua' ? "100% безпека та досвід" : "100% безопасность и опыт"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {language === 'ua'
                ? "Понад 14 років практичного досвіду. Провідне авто з турлідером, рації між екіпажами та цілодобова допомога в будь-яких ситуаціях."
                : "Более 14 лет опыта. Ведущая машина гида, связь между экипажами и поддержка 24/7."}
            </p>
          </div>
        </div>

        {/* Команда */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#FA9A1B] font-extrabold text-xs uppercase tracking-wider block mb-1">
              OUR TEAM
            </span>
            <h2 className="text-3xl font-black text-slate-900">
              {language === 'ua' ? "Турлідери Outway Travel" : "Турлидеры Outway Travel"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((m, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-extrabold text-lg text-slate-900 mb-1">{m.name}</h3>
                  <p className="text-[#FA9A1B] font-bold text-xs mb-3">{m.role}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="text-center mb-10">
            <span className="text-[#FA9A1B] font-extrabold text-xs uppercase tracking-wider block mb-1">
              FAQ
            </span>
            <h2 className="text-3xl font-black text-slate-900">
              {t.common.faqTitle}
            </h2>
          </div>

          <div className="space-y-3">
            {camperFaqs.map((faq, idx) => {
              const isOpen = !!openFaq[idx];
              return (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-extrabold text-base text-slate-900 pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-180 text-[#FA9A1B]' : ''
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
                        <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Контакты & Тестовая форма */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-[#FA9A1B] font-extrabold text-xs uppercase tracking-wider block mb-1">
                CONTACT US
              </span>
              <h2 className="text-3xl font-black text-slate-900 mb-4">
                {language === 'ua' ? "Залишилися запитання? Напишіть нам!" : "Остались вопросы? Напишите нам!"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                {language === 'ua'
                  ? "Ми завжди раді розповісти про деталі маршрутів, підказати щодо авіаквитків або порадити потрібне спорядження."
                  : "Мы с радостью ответим на любые вопросы, поможем с авиабилетами и подскажем нужное снаряжение."}
              </p>

              <div className="space-y-3 text-sm text-slate-700">
                <a href="tel:+380990000000" className="flex items-center space-x-2.5 font-bold hover:text-[#FA9A1B]">
                  <Phone className="w-4 h-4 text-[#FA9A1B]" />
                  <span>+38 (099) 000-00-00</span>
                </a>
                <a href="mailto:test@gmail.com" className="flex items-center space-x-2.5 font-bold hover:text-[#FA9A1B]">
                  <Mail className="w-4 h-4 text-[#FA9A1B]" />
                  <span>test@gmail.com</span>
                </a>
                <div className="flex items-center space-x-2.5 text-slate-500 font-medium">
                  <MapPin className="w-4 h-4 text-[#FA9A1B]" />
                  <span>м. Київ, вул. Тестова, 1</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 sm:p-7 rounded-2xl border border-slate-200">
              {!formSent ? (
                <form onSubmit={handleContactSubmit} className="space-y-3.5">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder={language === 'ua' ? "Ваше ім'я" : "Ваше имя"}
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:border-[#FA9A1B]"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder={language === 'ua' ? "Номер телефону (Telegram / Viber)" : "Номер телефона (Telegram / Viber)"}
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:border-[#FA9A1B]"
                    />
                  </div>
                  <div>
                    <textarea
                      rows={2}
                      placeholder={language === 'ua' ? "Який тур вас цікавить або ваше запитання..." : "Какой тур вас интересует или ваш вопрос..."}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:border-[#FA9A1B] resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#FA9A1B] hover:bg-[#e88d15] text-white font-extrabold rounded-xl text-sm shadow-sm transition-all"
                  >
                    {language === 'ua' ? "Надіслати запитання" : "Отправить вопрос"}
                  </button>
                </form>
              ) : (
                <div className="text-center py-6">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                  <h4 className="font-black text-lg text-slate-900 mb-1">
                    {language === 'ua' ? "Повідомлення надіслано!" : "Сообщение отправлено!"}
                  </h4>
                  <p className="text-xs text-slate-600">
                    {language === 'ua' ? "Турлідер зв'яжеться з вами найближчим часом." : "Турлидер свяжется с вами в ближайшее время."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
