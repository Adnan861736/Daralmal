"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const governorateColors: Record<string, string> = {
  damascus:    "from-amber-700 to-yellow-600",
  rif_damascus:"from-green-700 to-emerald-600",
  aleppo:      "from-blue-700 to-sky-600",
  homs:        "from-orange-700 to-amber-600",
  hama:        "from-teal-700 to-cyan-600",
  latakia:     "from-indigo-700 to-blue-600",
  tartous:     "from-violet-700 to-purple-600",
  deir_ez_zor: "from-red-700 to-orange-600",
  idlib:       "from-lime-700 to-green-600",
  daraa:       "from-rose-700 to-pink-600",
  raqqa:       "from-yellow-700 to-amber-500",
  hasakah:     "from-cyan-700 to-teal-500",
  suwayda:     "from-purple-700 to-violet-500",
  quneitra:    "from-emerald-700 to-green-500",
};

interface Branch {
  id: number;
  governorate: string;
  name: string;
  address: string;
  phone: string;
  image: string;
  image2?: string | null;
  image3?: string | null;
  workingHours?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

function formatWhatsApp(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("09")) return "963" + digits.slice(1);
  if (digits.startsWith("963")) return digits;
  return "963" + digits;
}

export default function BranchFilter({ branches }: { branches: Branch[] }) {
  const t = useTranslations("branches");
  const [selected, setSelected] = useState("all");
  const [brokenImages, setBrokenImages] = useState<Set<string>>(new Set());
  const [activeImg, setActiveImg] = useState<Record<number, number>>({});

  const handleImageError = (key: string) => {
    setBrokenImages((prev) => new Set(prev).add(key));
  };

  const activeGovernorates = Array.from(
    new Set(branches.map((b) => b.governorate))
  );

  const governorateOrder = [
    "damascus", "rif_damascus", "aleppo", "homs", "hama",
    "latakia", "tartous", "deir_ez_zor", "idlib", "daraa", "raqqa", "hasakah",
  ];

  const sortedGovernorates = governorateOrder.filter((g) =>
    activeGovernorates.includes(g)
  );

  const filtered =
    selected === "all"
      ? branches
      : branches.filter((b) => b.governorate === selected);

  return (
    <>
      {/* Governorate Filter */}
      <div className="max-w-md mx-auto mb-12">
        <label
          htmlFor="governorate-select"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
        >
          {t("filterByGovernorate")}
        </label>
        <div className="relative">
          <select
            id="governorate-select"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full appearance-none bg-white dark:bg-gray-800 border-2 border-primary-200 dark:border-gray-600 rounded-xl px-4 py-3 pe-10 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all cursor-pointer"
          >
            <option value="all">
              {t("allGovernorates")} ({branches.length})
            </option>
            {sortedGovernorates.map((gov) => {
              const count = branches.filter((b) => b.governorate === gov).length;
              return (
                <option key={gov} value={gov}>
                  {t(`governorates.${gov}` as any)} ({count})
                </option>
              );
            })}
          </select>
          <svg
            className="absolute top-1/2 -translate-y-1/2 end-3 w-5 h-5 text-gray-400 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
        {filtered.length} {t("branchCount")}
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🏢</div>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            {t("noBranches")}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((branch) => {
            const mapHref =
              branch.latitude && branch.longitude
                ? `https://www.google.com/maps?q=${branch.latitude},${branch.longitude}`
                : `https://maps.google.com/?q=${encodeURIComponent(branch.address)}`;

            const waHref = `https://wa.me/${formatWhatsApp(branch.phone)}`;

            // Build images array (filter out empty/null)
            const images = [branch.image, branch.image2, branch.image3].filter(
              (img): img is string => !!img
            );
            const idx = activeImg[branch.id] ?? 0;
            const currentImg = images[idx];
            const imgKey = `${branch.id}-${idx}`;
            const isBroken = brokenImages.has(imgKey);

            const goPrev = () =>
              setActiveImg((prev) => ({ ...prev, [branch.id]: (idx - 1 + images.length) % images.length }));
            const goNext = () =>
              setActiveImg((prev) => ({ ...prev, [branch.id]: (idx + 1) % images.length }));

            return (
              <div
                key={branch.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden flex flex-col"
              >
                {/* Image / Carousel */}
                <div className="relative h-56 flex-shrink-0">
                  {/* Gradient fallback background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${
                      governorateColors[branch.governorate] ?? "from-primary-700 to-primary-500"
                    }`}
                  />
                  {/* Current image */}
                  {currentImg && !isBroken && (
                    <img
                      src={currentImg}
                      alt={branch.name}
                      onError={() => handleImageError(imgKey)}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                  {/* Prev/Next arrows (only if multiple images) */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={goNext}
                        className="absolute start-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all z-10 shadow-md hover:scale-110"
                        aria-label="next image"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      <button
                        onClick={goPrev}
                        className="absolute end-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all z-10 shadow-md hover:scale-110"
                        aria-label="previous image"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                    </>
                  )}

                  <div className="absolute bottom-3 start-4 end-4 flex items-end justify-between gap-2">
                    <h2 className="text-sm font-bold text-white drop-shadow-lg leading-tight">
                      {branch.name}
                    </h2>
                    <span className="flex-shrink-0 text-[10px] font-semibold bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full">
                      {t(`governorates.${branch.governorate}` as any)}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="space-y-3 flex-1">
                    {/* Address */}
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {branch.address}
                      </p>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 flex-shrink-0 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a
                        href={`tel:${branch.phone.replace(/\s/g, "")}`}
                        className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium"
                        dir="ltr"
                      >
                        {branch.phone}
                      </a>
                    </div>

                    {/* Working Hours */}
                    {branch.workingHours && (
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 flex-shrink-0 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">
                          {branch.workingHours}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4">
                    {/* Map */}
                    <a
                      href={mapHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/40 text-primary-700 dark:text-primary-300 font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      {t("viewOnMap")}
                    </a>

                    {/* WhatsApp */}
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 text-green-700 dark:text-green-400 font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm"
                      title="واتساب"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      واتساب
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
