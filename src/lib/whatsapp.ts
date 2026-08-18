import { business } from "@/config/business";
import type { Locale } from "@/config/site";
import { getContent } from "@/lib/i18n";

/**
 * Build a WhatsApp click-to-chat URL with a localized prefilled message.
 */
export function getWhatsAppUrl(locale: Locale): string {
  const content = getContent(locale);
  const phone = business.contact.whatsapp.replace(/[^0-9]/g, "");
  const message = encodeURIComponent(content.whatsappMessage);
  return `https://wa.me/${phone}?text=${message}`;
}

/**
 * Build a tel: link from the centralized phone config.
 */
export function getPhoneUrl(): string {
  return `tel:${business.contact.phone}`;
}
