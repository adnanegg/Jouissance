"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/config/site";
import { getAlternateLocale } from "@/config/site";
import type { SiteContent } from "@/lib/i18n";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackWhatsAppClick, trackLanguageSwitch } from "@/lib/analytics";
import styles from "./Header.module.css";

type HeaderProps = {
  locale: Locale;
  content: SiteContent;
};

const navSections = [
  { key: "services", href: "#services" },
  { key: "realizations", href: "#realisations" },
  { key: "approach", href: "#approche" },
  { key: "faq", href: "#faq" },
  { key: "contact", href: "#contact" },
] as const;

export default function Header({ locale, content }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const altLocale = getAlternateLocale(locale);
  const whatsappUrl = getWhatsAppUrl(locale);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = () => setMenuOpen(false);

  const handleLangSwitch = () => {
    trackLanguageSwitch(locale, altLocale);
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={`container ${styles.inner}`}>
          <Link href={`/${locale}`} className={styles.logo} aria-label={content.nav.home}>
            <Image
              src="/logo.png"
              alt="Jouissance Travaux Divers"
              width={64}
              height={64}
              style={{ height: "56px", width: "auto", objectFit: "contain" }}
              priority
            />
            <div className={styles.logoText}>
              <span className={styles.logoName}>JOUISSANCE</span>
              <span className={styles.logoDesc}>TRAVAUX DIVERS</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            {navSections.map((section) => (
              <a
                key={section.key}
                href={section.href}
                className={styles.navLink}
              >
                {content.nav[section.key]}
              </a>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className={styles.actions}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn--whatsapp btn--sm ${styles.whatsappBtn}`}
              onClick={() => trackWhatsAppClick("header")}
            >
              <WhatsAppIcon />
              {content.nav.whatsappCta}
            </a>
            <Link
              href={`/${altLocale}`}
              className={styles.langSwitch}
              onClick={handleLangSwitch}
              aria-label={content.langSwitch.label}
            >
              {content.langSwitch.targetLabel}
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className={styles.mobileActions}>
            <Link
              href={`/${altLocale}`}
              className={styles.langSwitch}
              onClick={handleLangSwitch}
              aria-label={content.langSwitch.label}
            >
              {content.langSwitch.targetLabel}
            </Link>
            <button
              className={styles.menuToggle}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? content.nav.menuClose : content.nav.menuOpen}
            >
              <span className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)}>
          <nav
            className={styles.mobileMenu}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className={styles.mobileMenuHeader}>
              <button
                className={styles.closeButton}
                onClick={() => setMenuOpen(false)}
                aria-label={content.nav.menuClose}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className={styles.mobileMenuInner}>
              {navSections.map((section) => (
                <a
                  key={section.key}
                  href={section.href}
                  className={styles.mobileNavLink}
                  onClick={handleNavClick}
                >
                  {content.nav[section.key]}
                </a>
              ))}
              <div className={styles.mobileMenuCtas}>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--whatsapp btn--lg"
                  onClick={() => {
                    trackWhatsAppClick("mobile_menu");
                    handleNavClick();
                  }}
                  style={{ width: "100%" }}
                >
                  <WhatsAppIcon />
                  {content.nav.whatsappCta}
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
