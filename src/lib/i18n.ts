import type { Locale } from "@/config/site";
import { contentFr } from "@/content/fr";
import { contentAr } from "@/content/ar";

/* -------------------------------------------------- */
/*  Content type definition                           */
/* -------------------------------------------------- */

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BenefitItem {
  title: string;
  description: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  category: string;
}

export interface SiteContent {
  locale: Locale;
  dir: "ltr" | "rtl";

  /* SEO */
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };

  /* Navigation */
  nav: {
    home: string;
    services: string;
    realizations: string;
    approach: string;
    faq: string;
    contact: string;
    whatsappCta: string;
    callCta: string;
    menuOpen: string;
    menuClose: string;
  };

  /* Hero */
  hero: {
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaCall: string;
    trustLine: string;
    carouselLabel: string;
    carouselPrev: string;
    carouselNext: string;
    slideOf: string;
  };

  /* Trust Strip */
  trust: {
    items: string[];
  };


  /* Services */
  services: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: ServiceItem[];
    cta: string;
  };

  /* Why Jouissance */
  why: {
    sectionTitle: string;
    items: BenefitItem[];
  };

  /* Realizations */
  realizations: {
    sectionTitle: string;
    sectionSubtitle: string;
    images: ProjectImage[];
    lightboxClose: string;
    lightboxPrev: string;
    lightboxNext: string;
  };

  /* Process */
  process: {
    sectionTitle: string;
    sectionSubtitle: string;
    steps: ProcessStep[];
  };

  /* Nationwide */
  nationwide: {
    headline: string;
    body: string;
    cta: string;
  };

  /* FAQ */
  faq: {
    sectionTitle: string;
    items: FaqItem[];
  };

  /* Contact */
  contact: {
    sectionTitle: string;
    sectionSubtitle: string;
    whatsappLabel: string;
    whatsappDescription: string;
    callLabel: string;
    callDescription: string;
    formTitle: string;
    fieldName: string;
    fieldPhone: string;
    fieldEmail: string;
    fieldCity: string;
    fieldCategory: string;
    fieldCategoryPlaceholder: string;
    fieldDescription: string;
    fieldDescriptionPlaceholder: string;
    categories: string[];
    submit: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    errorMessage: string;
    requiredField: string;
  };

  /* Final CTA */
  finalCta: {
    headline: string;
    body: string;
    ctaWhatsapp: string;
    ctaCall: string;
    ctaDevis: string;
  };

  /* Footer */
  footer: {
    tagline: string;
    contactTitle: string;
    linksTitle: string;
    coverageStatement: string;
    address: string;
    mapsLabel: string;
    privacy: string;
    rights: string;
  };

  /* Language Switcher */
  langSwitch: {
    label: string;
    targetLabel: string;
  };

  /* WhatsApp prefilled message */
  whatsappMessage: string;

  /* Misc */
  backToTop: string;
}

/* -------------------------------------------------- */
/*  Content getter                                    */
/* -------------------------------------------------- */

export function getContent(locale: Locale): SiteContent {
  return locale === "ar" ? contentAr : contentFr;
}
