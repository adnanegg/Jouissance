import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/config/site";
import { getAlternateLocale } from "@/config/site";
import { business } from "@/config/business";
import type { SiteContent } from "@/lib/i18n";
import styles from "./Footer.module.css";

type Props = {
  locale: Locale;
  content: SiteContent;
};

export default function Footer({ locale, content }: Props) {
  const altLocale = getAlternateLocale(locale);
  const year = new Date().getFullYear();

  const getLinkIcon = (key: string) => {
    switch (key) {
      case "services":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
          </svg>
        );
      case "realizations":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        );
      case "approach":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 11 12 14 22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        );
      case "faq":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        );
      case "contact":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        );
      default:
        return null;
    }
  };

  const navLinks = [
    { key: "services", href: "#services" },
    { key: "realizations", href: "#realisations" },
    { key: "approach", href: "#approche" },
    { key: "faq", href: "#faq" },
    { key: "contact", href: "#contact" },
  ] as const;

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* Brand Column */}
        <div className={styles.brand}>
          <Link href={`/${locale}`} className={styles.logoLink} aria-label={content.nav.home}>
            <Image
              src="/logo.png"
              alt="Jouissance Travaux Divers"
              width={64}
              height={64}
              style={{ height: "58px", width: "auto", objectFit: "contain" }}
            />
            <div className={styles.logoText}>
              <span className={styles.logoName}>JOUISSANCE</span>
              <span className={styles.logoDesc}>TRAVAUX DIVERS</span>
            </div>
          </Link>
          <p className={styles.tagline}>{content.footer.tagline}</p>
          <p className={styles.coverage}>{content.footer.coverageStatement}</p>
        </div>

        {/* Links Column */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>{content.footer.linksTitle}</h3>
          <nav aria-label="Footer navigation">
            <ul className={styles.linkList}>
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a href={link.href} className={styles.link}>
                    <span className={styles.icon}>{getLinkIcon(link.key)}</span>
                    <span>{content.nav[link.key]}</span>
                  </a>
                </li>
              ))}
              <li>
                <Link href={`/${altLocale}`} className={styles.link}>
                  <span className={styles.icon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </span>
                  <span>{content.langSwitch.targetLabel}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Contact Column */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>{content.footer.contactTitle}</h3>
          <ul className={styles.contactList}>
            {Boolean(business.contact.phone) && (
              <li>
                <a href={`tel:${business.contact.phone}`} className={styles.link} dir="ltr">
                  <span className={styles.icon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  <span>{business.contact.phoneDisplay}</span>
                </a>
              </li>
            )}

            {Boolean(business.contact.address) && (
              <li className={styles.addressItem}>
                <span className={styles.icon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span>{business.contact.address}</span>
              </li>
            )}

            {business.mapsUrl && (
              <li>
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <span className={styles.icon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polygon points="3 11 22 2 13 21 11 13 3 11" />
                    </svg>
                  </span>
                  <span>Google Maps ↗</span>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p>© {year} {business.fullName}. {content.footer.rights}</p>
            <Link href={`/${locale}/politique-confidentialite`} className={styles.privacyLink}>
              {content.footer.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
