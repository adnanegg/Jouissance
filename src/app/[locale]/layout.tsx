import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, getDirection } from "@/config/site";
import type { Locale } from "@/config/site";
import { inter, cairo } from "@/lib/fonts";
import { generateLocaleMetadata, generateStructuredData } from "@/lib/seo";
import { analyticsConfig } from "@/config/analytics";
import { getContent } from "@/lib/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileContactBar from "@/components/layout/MobileContactBar";
import "@/app/globals.css";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  return generateLocaleMetadata(locale as Locale);
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const dir = getDirection(typedLocale);
  const font = typedLocale === "ar" ? cairo : inter;
  const content = getContent(typedLocale);
  const structuredData = generateStructuredData(typedLocale);

  return (
    <html lang={typedLocale} dir={dir} className={font.variable}>
      <head>
        {/* JSON-LD Structured Data */}
        {structuredData.map((data, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        ))}
        {/* GTM - only loads if configured */}
        {analyticsConfig.gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${analyticsConfig.gtmId}');`,
            }}
          />
        )}
      </head>
      <body>
        {analyticsConfig.gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${analyticsConfig.gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <Header locale={typedLocale} content={content} />
        <main id="main-content">{children}</main>
        <Footer locale={typedLocale} content={content} />
        <MobileContactBar locale={typedLocale} content={content} />
      </body>
    </html>
  );
}
