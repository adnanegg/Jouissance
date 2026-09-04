import type { Metadata } from "next";
import type { Locale } from "@/config/site";
import { siteConfig, getCanonicalUrl } from "@/config/site";
import { business } from "@/config/business";
import { getContent } from "@/lib/i18n";

/**
 * Generate Next.js Metadata for a given locale.
 */
export function generateLocaleMetadata(locale: Locale): Metadata {
  const content = getContent(locale);
  const canonical = getCanonicalUrl(locale);
  const altLocale = locale === "fr" ? "ar" : "fr";

  return {
    title: content.seo.title,
    description: content.seo.description,
    metadataBase: new URL(siteConfig.baseUrl),
    alternates: {
      canonical,
      languages: {
        fr: getCanonicalUrl("fr"),
        ar: getCanonicalUrl("ar"),
      },
    },
    openGraph: {
      title: content.seo.ogTitle,
      description: content.seo.ogDescription,
      url: canonical,
      siteName: business.fullName,
      locale: locale === "fr" ? "fr_MA" : "ar_MA",
      alternateLocale: altLocale === "fr" ? "fr_MA" : "ar_MA",
      type: "website",
      images: [
        {
          url: `/brand/og-image-${locale}.png`,
          width: 1200,
          height: 630,
          alt: content.seo.ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.ogTitle,
      description: content.seo.ogDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
    verification: {
      google: siteConfig.verification.google,
    },
    icons: {
      icon: [
        { url: "/favicon/favicon.ico", sizes: "any" },
        { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [
        { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    manifest: "/favicon/site.webmanifest",
  };
}

/**
 * Generate JSON-LD structured data for the landing page.
 */
export function generateStructuredData(locale: Locale): object[] {
  const content = getContent(locale);
  const url = getCanonicalUrl(locale);

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: business.fullName,
    url: siteConfig.baseUrl,
    logo: `${siteConfig.baseUrl}/brand/logo.svg`,
    sameAs: [business.social.facebook, business.social.instagram].filter(Boolean),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: business.contact.phone,
      contactType: "customer service",
      availableLanguage: ["French", "Arabic"],
    },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.fullName,
    url,
    telephone: business.contact.phone,
    sameAs: [business.social.facebook, business.social.instagram].filter(Boolean),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Salé",
      addressCountry: "MA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.coordinates.lat,
      longitude: business.coordinates.lng,
    },
    areaServed: {
      "@type": "Country",
      name: "Morocco",
    },
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: business.fullName,
    url: siteConfig.baseUrl,
    inLanguage: locale === "fr" ? "fr" : "ar",
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return [organization, localBusiness, webSite, faqPage];
}
