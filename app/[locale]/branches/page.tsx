import Image from "next/image";
import { getTranslations } from "next-intl/server";
import BranchFilter from "@/frontend/components/BranchFilter";
import { prisma } from "@/backend/lib/prisma";
import { getBranchImage } from "@/backend/lib/branches";

export default async function BranchesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "branches" });

  const dbBranches = await prisma.branch.findMany({
    where: { status: "ACTIVE" },
    orderBy: { governorate: "asc" },
  });

  const branches = dbBranches.map((b) => ({
    id: b.id,
    governorate: b.governorate,
    name: locale === "ar" ? b.nameAr : (b.nameEn || b.nameAr),
    address: locale === "ar" ? b.addressAr : (b.addressEn || b.addressAr),
    phone: b.phone,
    image: b.image || getBranchImage(b.governorate),
    workingHours: b.workingHours,
    latitude: b.latitude,
    longitude: b.longitude,
  }));

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <Image
          src="/images/hero-branches.jpg"
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

      {/* Branches Grid with Filter */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <BranchFilter branches={branches} />
        </div>
      </section>
    </main>
  );
}
