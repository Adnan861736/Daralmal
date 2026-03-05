import { getRequestConfig } from "next-intl/server";

export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as Locale)) {
    locale = "ar";
  }

  const messages =
    locale === "ar"
      ? (await import("./frontend/messages/ar.json")).default
      : (await import("./frontend/messages/en.json")).default;

  return {
    locale,
    messages,
  };
});

