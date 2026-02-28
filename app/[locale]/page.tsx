import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <Image
            src="/images/hero-home.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/70 to-gold-900/60 dark:from-gray-900/90 dark:via-gray-900/85 dark:to-gray-900/80" />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-bold mb-6 drop-shadow-lg">
                <span className="block text-4xl md:text-5xl lg:text-6xl text-gold-300">{t("hero.titleLine1")}</span>
                <span className="block text-2xl md:text-3xl lg:text-4xl text-gold-300 mt-2">{t("hero.titleLine2")}</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-semibold mb-4">
                {t("hero.subtitle")}
              </p>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                {t("hero.description")}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-block bg-gold-500 hover:bg-gold-600 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {t("hero.cta")}
                </Link>
                <Link
                  href={`/${locale}/agents`}
                  className="inline-block bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-lg border border-white/50 hover:border-white transition-all transform hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm"
                >
                  {t("agents.cta")}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gold-600 dark:text-gold-300">
                {t("services.title")}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {t("services.subtitle")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden flex flex-col sm:flex-row">
                <div className="relative h-48 sm:h-auto sm:w-40 md:w-48 flex-shrink-0">
                  <Image src="/images/service-currency.jpg" alt="" fill className="object-cover" />
                </div>
                <div className="p-5 flex flex-col justify-center">
                  <h3 className="text-lg font-bold mb-2 text-gold-600 dark:text-gold-300">
                    {t("services.currency.title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t("services.currency.description")}
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden flex flex-col sm:flex-row">
                <div className="relative h-48 sm:h-auto sm:w-40 md:w-48 flex-shrink-0">
                  <Image src="/images/service-transfer.jpg" alt="" fill className="object-cover" />
                </div>
                <div className="p-5 flex flex-col justify-center">
                  <h3 className="text-lg font-bold mb-2 text-gold-600 dark:text-gold-300">
                    {t("services.transfer.title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t("services.transfer.description")}
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden flex flex-col sm:flex-row">
                <div className="relative h-48 sm:h-auto sm:w-40 md:w-48 flex-shrink-0">
                  <Image src="/images/service-consultation.jpg" alt="" fill className="object-cover" />
                </div>
                <div className="p-5 flex flex-col justify-center">
                  <h3 className="text-lg font-bold mb-2 text-gold-600 dark:text-gold-300">
                    {t("services.consultation.title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t("services.consultation.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/30 text-2xl">
                  🔒
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-gold-600 dark:text-gold-300">
                    {t("about.trust.title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t("about.trust.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/30 text-2xl">
                  ⭐
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-gold-600 dark:text-gold-300">
                    {t("about.experience.title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t("about.experience.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/30 text-2xl">
                  💼
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-gold-600 dark:text-gold-300">
                    {t("about.service.title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t("about.service.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden py-16">
          <Image
            src="/images/cta-bg.jpg"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gold-900/92 via-gold-800/88 to-gray-900/90" />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              {t("contact.subtitle")}
            </h2>
            <p className="text-xl mb-8 text-white/90">{t("hero.description")}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/${locale}/contact`}
                className="inline-block bg-gold-500 hover:bg-gold-600 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                {t("hero.cta")}
              </Link>
              <Link
                href={`/${locale}/agents`}
                className="inline-block bg-gold-500 hover:bg-gold-600 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                {t("agents.cta")}
              </Link>
            </div>
          </div>
        </section>
    </main>
  );
}
