import type { Metadata } from "next";
import { locales } from "@/i18n";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://daralmal.sy";

export const metadata: Metadata = {
  title: {
    default: "دار المال للصرافة والحوالات المالية",
    template: "%s | دار المال للصرافة والحوالات المالية",
  },
  description:
    "دار المال للصرافة والحوالات المالية - شريكك الموثوق في تبادل العملات والتحويلات المالية الدولية. أفضل أسعار الصرف وأعلى معايير الأمان. أكثر من 65 فرعاً في جميع المحافظات السورية.",
  keywords: [
    "صرافة دار المال",
    "تبادل العملات سوريا",
    "حوالات مالية",
    "صرف عملات",
    "تحويل أموال سوريا",
    "صرافة سوريا",
    "Dar Al Mal Exchange",
    "currency exchange Syria",
  ],
  authors: [{ name: "صرافة دار المال" }],
  creator: "صرافة دار المال",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "ar_SY",
    alternateLocale: "en_US",
    url: siteUrl,
    siteName: "دار المال للصرافة والحوالات المالية",
    title: "دار المال للصرافة والحوالات المالية",
    description:
      "دار المال للصرافة والحوالات المالية - شريكك الموثوق في تبادل العملات والتحويلات المالية الدولية. أكثر من 65 فرعاً في سوريا.",
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "دار المال للصرافة والحوالات المالية",
      },
    ],
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
