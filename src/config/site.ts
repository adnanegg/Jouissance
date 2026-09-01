export const locales = ["fr", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const siteConfig = {
  domain: "PLACEHOLDER_DOMAIN",
  get baseUrl() {
    return `https://${this.domain}`;
  },
  locales,
  defaultLocale,
  verification: {
    google: "rxn4-vvJSXniNDDI6Z4XB3eTMg6oAVNsXyo41XJ7UPY",
  },
} as const;

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function getCanonicalUrl(locale: Locale, path: string = ""): string {
  return `${siteConfig.baseUrl}/${locale}${path}`;
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "fr" ? "ar" : "fr";
}
