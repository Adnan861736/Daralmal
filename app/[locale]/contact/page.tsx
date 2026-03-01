import Image from "next/image";
import { getTranslations } from "next-intl/server";
import ContactForm from "@/frontend/components/ContactForm";
import ContactInfoBoxes from "@/frontend/components/ContactInfoBoxes";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <Image
            src="/images/hero-contact.jpg"
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

        {/* Contact Content */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gold-600 dark:text-gold-300">{t("sendMessage")}</h2>
                <ContactForm />
              </div>

              {/* Contact Information */}
              <ContactInfoBoxes />
            </div>
          </div>
        </section>
    </main>
  );
}
