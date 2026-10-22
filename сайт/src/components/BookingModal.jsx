import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Send, Phone, MessageSquare, ShieldCheck } from 'lucide-react';
import { useTours } from '../context/ToursContext';

export default function BookingModal() {
  const { isBookingOpen, closeBookingModal, bookingTour, language } = useTours();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    messenger: 'telegram',
    participants: 2,
    comment: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isBookingOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = language === 'ua' ? "Вкажіть ваше ім'я" : "Укажите ваше имя";
    if (!formData.phone.trim() || formData.phone.length < 9) errs.phone = language === 'ua' ? "Вкажіть телефон" : "Укажите телефон";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setFormData({ name: '', phone: '', messenger: 'telegram', participants: 2, comment: '' });
    setErrors({});
    closeBookingModal();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleResetAndClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl z-10 border border-slate-100 max-h-[92vh] overflow-y-auto"
      >
        <button
          onClick={handleResetAndClose}
          className="absolute top-3.5 right-3.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 flex items-center justify-center transition-colors z-20 cursor-pointer"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <div className="p-5 sm:p-8">
              <div className="mb-6">
                <span className="text-[#FA9A1B] font-extrabold text-xs uppercase tracking-wider block mb-1">
                  OUTWAY TRAVEL CLUB
                </span>
                <h3 className="font-extrabold text-2xl text-slate-900">
                  {bookingTour ? bookingTour.title[language] : (language === 'ua' ? "Забронювати участь у турі" : "Забронировать участие в туре")}
                </h3>
                {bookingTour && (
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-slate-500 font-medium">
                      {bookingTour.dates} • {bookingTour.priceEUR ? `${bookingTour.priceEUR - (bookingTour.bonusDiscount || 0)} €` : `$${bookingTour.priceUSD - (bookingTour.bonusDiscount || 0)}`}
                      {bookingTour.bonusDiscount && (
                        <span className="ml-2 line-through text-slate-400">
                          {bookingTour.priceEUR ? `${bookingTour.priceEUR} €` : `$${bookingTour.priceUSD}`}
                        </span>
                      )}
                    </p>

                    {bookingTour.bonusDiscount && (
                      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-2.5 text-xs text-amber-800 font-bold flex items-center space-x-2">
                        <span className="text-base">🎁</span>
                        <span>
                          {language === 'ua'
                            ? `Активовано бонус за спонтанність: знижка -${bookingTour.bonusDiscount} €!`
                            : `Активирован бонус за спонтанность: скидка -${bookingTour.bonusDiscount} €!`}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'ua' ? "Ваше ім'я *" : "Ваше имя *"}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={language === 'ua' ? "Олексій" : "Алексей"}
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-slate-900 focus:outline-none focus:border-brand-500 ${
                      errors.name ? 'border-red-500 bg-red-50/50' : 'border-slate-200 bg-slate-50'
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'ua' ? "Номер телефону *" : "Номер телефона *"}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+380 97 123 45 67"
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-slate-900 focus:outline-none focus:border-brand-500 ${
                      errors.phone ? 'border-red-500 bg-red-50/50' : 'border-slate-200 bg-slate-50'
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Удобный мессенджер для связи */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'ua' ? "Де зручніше отримати програму?" : "Где удобнее получить программу?"}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'telegram', label: 'Telegram' },
                      { id: 'viber', label: 'Viber' },
                      { id: 'whatsapp', label: 'WhatsApp' }
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, messenger: m.id })}
                        className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                          formData.messenger === m.id
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Количество человек */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'ua' ? "Скільки людей планує їхати?" : "Сколько человек планирует ехать?"}
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFormData({ ...formData, participants: num })}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                          formData.participants === num
                            ? 'bg-brand-500 text-slate-950 border-brand-500 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {num} {num === 1 ? (language === 'ua' ? 'людина' : 'человек') : (language === 'ua' ? 'людей' : 'человека')}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-slate-950 font-bold rounded-xl text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50 mt-2"
                >
                  <span>{language === 'ua' ? "Забронювати місце" : "Забронировать место"}</span>
                  <Send className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center space-x-1.5 text-xs text-slate-400 pt-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>
                    {language === 'ua'
                      ? "Без спаму. Відповімо протягом 15 хвилин"
                      : "Без спама. Ответим в течение 15 минут"}
                  </span>
                </div>
              </form>
            </div>
          ) : (
            <div className="p-8 sm:p-12 text-center">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
              <h4 className="font-extrabold text-2xl text-slate-900 mb-2">
                {language === 'ua' ? "Дякуємо! Заявку прийнято" : "Спасибо! Заявка принята"}
              </h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto mb-6">
                {language === 'ua'
                  ? `Турлідер зв'яжеться з вами за номером ${formData.phone} у вибраному месенджері та надішле детальну програму подорожі.`
                  : `Турлидер свяжется с вами по номеру ${formData.phone} и вышлет подробную программу путешествия.`}
              </p>
              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors"
              >
                {language === 'ua' ? "Чудово" : "Отлично"}
              </button>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
