'use client';

import { useState, useEffect } from 'react';

export default function FloatingActions() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const check = () => setShowScroll(window.scrollY > 80);
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const whatsappNumber = process.env.NEXT_PUBLIC_MAIN_WHATSAPP || '0964455302';

  return (
    <div
      style={{ position: 'fixed', bottom: '24px', left: '16px', zIndex: 99999 }}
      className="flex flex-col gap-3"
    >
      {/* واتساب */}
      <a
        href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'flex' }}
        className="items-center justify-center bg-gold-500 hover:bg-gold-600 text-white w-12 h-12 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110"
        aria-label="WhatsApp"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>

      {/* زر العودة للأعلى */}
      <button
        onClick={scrollToTop}
        aria-label="العودة للأعلى"
        style={{
          display: 'flex',
          opacity: showScroll ? 1 : 0,
          transform: showScroll ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.3s, transform 0.3s',
          pointerEvents: showScroll ? 'auto' : 'none',
        }}
        className="items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white w-12 h-12 rounded-full shadow-xl hover:shadow-2xl hover:scale-110"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}
