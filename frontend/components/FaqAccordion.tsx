"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function FaqAccordion() {
  const t = useTranslations("services.faq");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqKeys = ["1", "2", "3", "4", "5"];

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {faqKeys.map((key, index) => (
        <div
          key={key}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between gap-4 p-5 text-start hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <span className="font-semibold text-gray-900 dark:text-white">
              {t(`${key}.question`)}
            </span>
            <svg
              className={`w-5 h-5 flex-shrink-0 text-primary-600 dark:text-primary-400 transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              openIndex === index
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <p className="px-5 pb-5 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {t(`${key}.answer`)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
