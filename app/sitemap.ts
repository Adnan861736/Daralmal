import { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://daralmall.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "about", "services", "branches", "contact"];

  const routes: MetadataRoute.Sitemap = [];

  for (const locale of ["ar", "en"]) {
    for (const page of pages) {
      routes.push({
        url: `${siteUrl}/${locale}${page ? `/${page}` : ""}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : 0.8,
      });
    }
  }

  return routes;
}
