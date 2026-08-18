type EventParams = Record<string, string | number | boolean>;

/**
 * Push an event to the GTM dataLayer.
 * Gracefully handles missing GTM — the site remains fully functional
 * even if analytics is blocked.
 */
export function trackEvent(eventName: string, params?: EventParams): void {
  if (typeof window === "undefined") return;

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: eventName,
      ...params,
    });
  } catch {
    // Silently fail — analytics should never break the site
  }
}

/* ----- Convenience helpers ----- */

export function trackWhatsAppClick(location: string): void {
  trackEvent("whatsapp_click", { location });
}

export function trackPhoneClick(location: string): void {
  trackEvent("phone_click", { location });
}

export function trackFormStart(): void {
  trackEvent("quote_form_start");
}

export function trackFormSubmit(): void {
  trackEvent("quote_form_submit");
}

export function trackLanguageSwitch(from: string, to: string): void {
  trackEvent("language_switch", { from, to });
}

export function trackCarouselInteraction(slide: number): void {
  trackEvent("hero_carousel_interaction", { slide });
}

export function trackRealizationOpen(image: string): void {
  trackEvent("realization_image_open", { image });
}

export function trackFaqOpen(question: string): void {
  trackEvent("faq_open", { question });
}
