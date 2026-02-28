'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function AgentsPage() {
  const t = useTranslations('agents');
  const params = useParams();
  const locale = params.locale as string;

  const [form, setForm] = useState({
    company: '',
    manager: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(`طلب وكالة جديدة - ${form.company}`);
    const body = encodeURIComponent(
      `طلب وكالة جديدة من دار المال\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `اسم الشركة: ${form.company}\n` +
      `اسم المسؤول: ${form.manager}\n` +
      `البريد الإلكتروني: ${form.email}\n` +
      `رقم الهاتف: ${form.phone}\n` +
      `العنوان: ${form.address}\n` +
      (form.notes ? `ملاحظات: ${form.notes}\n` : '')
    );

    window.location.href = `mailto:dar.almal.syria@gmail.com?subject=${subject}&body=${body}`;
  };

  const benefits = [
    { icon: '🛠️', text: t('benefit1') },
    { icon: '📊', text: t('benefit2') },
    { icon: '📈', text: t('benefit3') },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-gold-300 mb-4">{t('subtitle')}</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">{t('description')}</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-3 bg-white dark:bg-gray-900 rounded-xl p-5 shadow-md">
                <span className="text-3xl">{b.icon}</span>
                <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-2xl font-bold text-gold-600 dark:text-gold-300 mb-8 text-center">{t('formTitle')}</h2>

          <form onSubmit={handleSubmit} className="space-y-5 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('company')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text" name="company" required value={form.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('manager')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text" name="manager" required value={form.manager}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500 outline-none text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('email')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email" name="email" required value={form.email}
                  onChange={handleChange} dir="ltr"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('phone')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel" name="phone" required value={form.phone}
                  onChange={handleChange} dir="ltr"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500 outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('address')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text" name="address" required value={form.address}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('notes')}
              </label>
              <textarea
                name="notes" rows={4} value={form.notes}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500 outline-none text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gold-500 hover:bg-gold-600 text-white font-bold py-4 px-8 rounded-lg transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <span>📧</span>
              {t('submit')} ←
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
