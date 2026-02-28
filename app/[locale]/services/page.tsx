import Image from "next/image";
import { getTranslations } from "next-intl/server";
import FaqAccordion from "@/frontend/components/FaqAccordion";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });

  const services = [
    {
      icon: "💱",
      image: "/images/service-currency.jpg",
      title: t("currency.title"),
      description: t("currency.description"),
      features: [
        t("currency.features.1"),
        t("currency.features.2"),
        t("currency.features.3"),
        t("currency.features.4"),
      ],
    },
    {
      icon: "🌍",
      image: "/images/service-transfer.jpg",
      title: t("transfer.title"),
      description: t("transfer.description"),
      features: [
        t("transfer.features.1"),
        t("transfer.features.2"),
        t("transfer.features.3"),
        t("transfer.features.4"),
      ],
    },
    {
      icon: "📊",
      image: "/images/service-consultation.jpg",
      title: t("consultation.title"),
      description: t("consultation.description"),
      features: [
        t("consultation.features.1"),
        t("consultation.features.2"),
        t("consultation.features.3"),
        t("consultation.features.4"),
      ],
    },
  ];

  const whyChooseItems = [
    { icon: "⚡", key: "fast" },
    { icon: "🔐", key: "secure" },
    { icon: "💰", key: "rates" },
    { icon: "🌟", key: "expert" },
    { icon: "📱", key: "support" },
    { icon: "🏆", key: "trusted" },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <Image
          src="/images/hero-services.jpg"
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
            <p className="text-xl text-white/90">{t("subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative h-52">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 start-4 text-4xl bg-white/20 backdrop-blur-sm rounded-xl p-2">
                    {service.icon}
                  </div>
                </div>
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-4 text-gold-600 dark:text-gold-300">
                    {service.title}
                  </h2>
                  {service.description && (
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {service.description}
                    </p>
                  )}
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                      >
                        <span className="text-primary-600 dark:text-primary-400">
                          ✓
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gold-600 dark:text-gold-300">
            {t("whyChoose.title")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {whyChooseItems.map((item) => (
              <div
                key={item.key}
                className="flex flex-col items-center text-center gap-3 p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/30 text-xl sm:text-2xl">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm sm:text-lg font-bold mb-1 text-gold-600 dark:text-gold-300">
                    {t(`whyChoose.${item.key}.title` as any)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                    {t(`whyChoose.${item.key}.description` as any)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gold-600 dark:text-gold-300">
            {t("faq.title")}
          </h2>
          <FaqAccordion />
        </div>
      </section>
    </main>
  );
}
