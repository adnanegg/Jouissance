import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "@/config/site";
import type { Locale } from "@/config/site";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Skip static files, api routes, and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/brand") ||
    pathname.startsWith("/projects") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Detect preferred locale from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language") || "";
  let detectedLocale: Locale = defaultLocale;

  if (acceptLanguage.includes("ar")) {
    detectedLocale = "ar";
  }

  // Redirect root to the detected locale
  const url = request.nextUrl.clone();
  url.pathname = `/${detectedLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|brand|projects|.*\\..*).*)"],
};
