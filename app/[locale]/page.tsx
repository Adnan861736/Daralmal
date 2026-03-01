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
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href={`/${locale}/contact`}
                    className="inline-block bg-gold-500 hover:bg-gold-600 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    {t("hero.cta")}
                  </Link>
                  <Link
                    href={`/${locale}/agents`}
                    className="inline-block bg-gold-500 hover:bg-gold-600 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    {t("agents.cta")}
                  </Link>
                </div>
                <Link
                  href={`/${locale}/branches`}
                  className="inline-block bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-lg border border-white/50 hover:border-white transition-all transform hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm"
                >
                  {t("nav.branches")}
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
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden flex flex-col sm:flex-row">
                <div className="relative h-48 sm:h-auto sm:w-40 md:w-48 flex-shrink-0">
                  <Image src="/images/service-transfer.jpg" alt="" fill className="object-cover" />
                </div>
                <div className="p-5 flex flex-col justify-center">
                  <h3 className="text-lg font-bold mb-2 text-gold-600 dark:text-gold-300">
                    {t("services.pickup.title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t("services.pickup.description")}
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden flex flex-col sm:flex-row">
                <div className="relative h-48 sm:h-auto sm:w-40 md:w-48 flex-shrink-0">
                  <Image src="/images/service-currency.jpg" alt="" fill className="object-cover" />
                </div>
                <div className="p-5 flex flex-col justify-center">
                  <h3 className="text-lg font-bold mb-2 text-gold-600 dark:text-gold-300">
                    {t("services.shamcash.title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t("services.shamcash.description")}
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

        {/* Follow Us Section */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gold-600 dark:text-gold-300">
              {t("contact.info.social")}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">تابعونا على منصات التواصل الاجتماعي</p>
            <div className="flex justify-center gap-4">
              <a href="#" className="flex items-center justify-center w-12 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-all hover:scale-110 shadow-md" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl transition-all hover:scale-110 shadow-md" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </a>
              <a href="#" className="flex items-center justify-center w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all hover:scale-110 shadow-md" aria-label="WhatsApp">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a href="#" className="flex items-center justify-center w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all hover:scale-110 shadow-md" aria-label="YouTube">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </section>
    </main>
  );
}
