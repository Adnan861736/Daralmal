import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales } from "./i18n";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "ar",
  localePrefix: "always",
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // استثناء مسارات /admin و /api من locale routing
  if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(ar|en)/:path*",
    "/((?!_next|_vercel|.*\\..*).*)", // يتضمن /admin و /api
  ],
};
