"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const params = useParams();
  const locale = params.locale as string;

  const whatsappNumber = process.env.NEXT_PUBLIC_MAIN_WHATSAPP || "0964455302";
  const waDigits = whatsappNumber.replace(/\D/g, "");
  const waNumber = waDigits.startsWith("09") ? "963" + waDigits.slice(1) : waDigits.startsWith("963") ? waDigits : "963" + waDigits;

  const navItems = [
    { key: "home", href: `/${locale}` },
    { key: "about", href: `/${locale}/about` },
    { key: "services", href: `/${locale}/services` },
    { key: "branches", href: `/${locale}/branches` },
    { key: "agents", href: `/${locale}/agents` },
    { key: "contact", href: `/${locale}/contact` },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 mt-auto">
      {/* padding-bottom يمنع تغطية زر الواتساب الثابت للمحتوى */}
      <div className="container mx-auto px-4 py-10 pb-24 sm:pb-10">
        <div className="grid grid-cols-3 gap-4 sm:gap-8">

          {/* Column 1: Logo & Description */}
          <div className="flex flex-col items-start gap-3">
            <Link href={`/${locale}`}>
              <Image
                src="/images/logo.png"
                alt="دار المال"
                width={50}
                height={42}
                className="brightness-90"
              />
            </Link>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-start gap-3">
            <h3 className="text-gold-400 font-semibold text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap">
              {t("quickLinks")}
            </h3>
            <nav className="flex flex-col gap-1.5">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-xs sm:text-sm text-gray-400 hover:text-gold-400 transition-colors"
                >
                  {tNav(item.key as any)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact Us */}
          <div className="flex flex-col items-start gap-3">
            <h3 className="text-gold-400 font-semibold text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap">
              {t("contactUs")}
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-gray-400">
              {/* Phone / WhatsApp */}
              <li className="flex items-start gap-1.5">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <a
                  href={`https://wa.me/${waNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-400 transition-colors break-all"
                  dir="ltr"
                >
                  {whatsappNumber}
                </a>
              </li>
              {/* Email */}
              <li className="flex items-start gap-1.5">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <a
                  href={`mailto:${t("emailValue")}`}
                  className="hover:text-gold-400 transition-colors break-all"
                  dir="ltr"
                >
                  {t("emailValue")}
                </a>
              </li>
              {/* Address */}
              <li className="flex items-start gap-1.5">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>{t("addressValue")}</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 py-4">
        <p className="text-center text-xs text-gray-400 mb-1">
          صنع ب <span style={{ color: '#c4a94e', fontSize: '1rem' }}>♥</span> في سوريا
        </p>
        <p className="text-center text-xs text-gray-500">{t("copyright")}</p>
      </div>
    </footer>
  );
}
