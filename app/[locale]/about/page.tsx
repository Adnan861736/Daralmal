import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <Image
            src="/images/hero-about.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/70 to-gold-900/60 dark:from-gray-900/90 dark:via-gray-900/85 dark:to-gray-900/80" />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gold-300 drop-shadow-lg">
                {t("title")}
              </h1>
              <p className="text-xl text-white/90">
                {t("subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t("description")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gold-600 dark:text-gold-300">
              {t("valuesTitle")}
            </h2>

            {/* Value 1 - Trust */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-20 max-w-6xl mx-auto">
              <div className="w-full md:w-1/2">
                <div className="relative h-72 md:h-80 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/value-trust.jpg"
                    alt={t("trust.title")}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-xl text-white shadow-md">
                    🔒
                  </div>
                  <h3 className="text-2xl font-bold text-gold-600 dark:text-gold-300">
                    {t("trust.title")}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                  {t("trust.detail")}
                </p>
              </div>
            </div>

            {/* Value 2 - Experience (reversed) */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12 mb-20 max-w-6xl mx-auto">
              <div className="w-full md:w-1/2">
                <div className="relative h-72 md:h-80 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/value-experience.jpg"
                    alt={t("experience.title")}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500 text-xl text-white shadow-md">
                    ⭐
                  </div>
                  <h3 className="text-2xl font-bold text-gold-600 dark:text-gold-300">
                    {t("experience.title")}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                  {t("experience.detail")}
                </p>
              </div>
            </div>

            {/* Value 3 - Service */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 max-w-6xl mx-auto">
              <div className="w-full md:w-1/2">
                <div className="relative h-72 md:h-80 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/value-service.jpg"
                    alt={t("service.title")}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-xl text-white shadow-md">
                    💼
                  </div>
                  <h3 className="text-2xl font-bold text-gold-600 dark:text-gold-300">
                    {t("service.title")}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                  {t("service.detail")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative overflow-hidden py-16">
          <Image
            src="/images/stats-bg.jpg"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-700/90 to-primary-900/85 dark:from-gray-900/90 dark:to-gray-900/85" />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">15+</div>
                <div className="text-lg opacity-90">
                  {t("experience.title")}
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
                <div className="text-lg opacity-90">{t("stats.customers")}</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">100+</div>
                <div className="text-lg opacity-90">{t("stats.currencies")}</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
                <div className="text-lg opacity-90">{t("stats.support")}</div>
              </div>
            </div>
          </div>
        </section>
    </main>
  );
}
