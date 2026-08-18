"use client";

import { useState } from "react";
import type { Locale } from "@/config/site";
import type { SiteContent } from "@/lib/i18n";
import { getWhatsAppUrl, getPhoneUrl } from "@/lib/whatsapp";
import { trackWhatsAppClick, trackPhoneClick, trackFormStart, trackFormSubmit } from "@/lib/analytics";
import styles from "./Contact.module.css";

type Props = {
  locale: Locale;
  content: SiteContent;
};

export default function Contact({ locale, content }: Props) {
  const whatsappUrl = getWhatsAppUrl(locale);
  const phoneUrl = getPhoneUrl();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    category: "",
    description: "",
    hp: "", // honeypot
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (status === "idle") {
      trackFormStart();
    }
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, locale }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        trackFormSubmit();
        setFormData({ name: "", phone: "", city: "", category: "", description: "", hp: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.error || content.contact.errorMessage);
      }
    } catch {
      setStatus("error");
      setErrorMessage(content.contact.errorMessage);
    }
  };

  return (
    <section className="section section--surface" id="contact">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>{content.contact.sectionTitle}</h2>
          <p className={styles.subtitle}>{content.contact.sectionSubtitle}</p>
        </div>

        <div className={styles.grid}>
          {/* Direct Communication Paths */}
          <div className={styles.directPaths}>
            {/* WhatsApp Box */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.pathCardWhatsApp}
              onClick={() => trackWhatsAppClick("contact_section")}
            >
              <div className={styles.pathIconBoxWhatsApp}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <h3 className={styles.pathTitle}>{content.contact.whatsappLabel}</h3>
                <p className={styles.pathDesc}>{content.contact.whatsappDescription}</p>
              </div>
            </a>

            {/* Phone Box */}
            <a
              href={phoneUrl}
              className={styles.pathCardPhone}
              onClick={() => trackPhoneClick("contact_section")}
            >
              <div className={styles.pathIconBoxPhone}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
              </div>
              <div>
                <h3 className={styles.pathTitle}>{content.contact.callLabel}</h3>
                <p className={styles.pathDesc}>{content.contact.callDescription}</p>
              </div>
            </a>
          </div>

          {/* Form */}
          <div className={styles.formContainer}>
            <h3 className={styles.formTitle}>{content.contact.formTitle}</h3>

            {status === "success" ? (
              <div className={styles.successBox} role="alert">
                <div className={styles.successIcon}>✓</div>
                <h4>{content.contact.successTitle}</h4>
                <p>{content.contact.successMessage}</p>
                <button
                  type="button"
                  className="btn btn--secondary btn--sm"
                  onClick={() => setStatus("idle")}
                  style={{ marginTop: "1rem" }}
                >
                  {content.contact.formTitle}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                {/* Honeypot anti-spam */}
                <input
                  type="text"
                  name="hp"
                  value={formData.hp}
                  onChange={handleChange}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {status === "error" && (
                  <div className={styles.errorBox} role="alert">
                    {errorMessage}
                  </div>
                )}

                <div className={styles.formRow}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="name" className={styles.label}>
                      {content.contact.fieldName} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="phone" className={styles.label}>
                      {content.contact.fieldPhone} *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="city" className={styles.label}>
                      {content.contact.fieldCity}
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="category" className={styles.label}>
                      {content.contact.fieldCategory}
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={styles.select}
                    >
                      <option value="">{content.contact.fieldCategoryPlaceholder}</option>
                      {content.contact.categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="description" className={styles.label}>
                    {content.contact.fieldDescription}
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder={content.contact.fieldDescriptionPlaceholder}
                    className={styles.textarea}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn btn--primary btn--lg"
                  style={{ width: "100%" }}
                >
                  {status === "submitting" ? content.contact.submitting : content.contact.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
