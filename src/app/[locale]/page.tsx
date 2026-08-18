import { notFound } from "next/navigation";
import { locales } from "@/config/site";
import type { Locale } from "@/config/site";
import { getContent } from "@/lib/i18n";

import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import WhyJouissance from "@/components/sections/WhyJouissance";
import Realizations from "@/components/sections/Realizations";
import Process from "@/components/sections/Process";
import Nationwide from "@/components/sections/Nationwide";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import FinalCTA from "@/components/sections/FinalCTA";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LandingPage({ params }: Props) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const content = getContent(typedLocale);

  return (
    <>
      <Hero locale={typedLocale} content={content} />
      <Services content={content} />
      <Realizations content={content} />
      <WhyJouissance content={content} />
      <Process content={content} />
      <Nationwide locale={typedLocale} content={content} />
      <FAQ content={content} />
      <Contact locale={typedLocale} content={content} />
      <FinalCTA locale={typedLocale} content={content} />
    </>
  );
}
