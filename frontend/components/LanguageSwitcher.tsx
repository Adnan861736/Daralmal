"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const currentLocale = params.locale as string;

  const switchLocale = (newLocale: string) => {
    if (currentLocale === newLocale) return;

    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPathname = segments.join("/");

    startTransition(() => {
      router.push(newPathname);
    });
  };

  return (
    <select
      value={currentLocale}
      onChange={(e) => switchLocale(e.target.value)}
      disabled={isPending}
      className="px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium text-gold-600 dark:text-gold-300 hover:bg-gold-50 dark:hover:bg-gold-900/20 transition-colors cursor-pointer focus:outline-none"
    >
      <option value="ar">العربية</option>
      <option value="en">English</option>
    </select>
  );
}
