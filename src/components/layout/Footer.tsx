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

const navLinks = [
  { key: "services", href: "#services" },
  { key: "realizations", href: "#realisations" },
  { key: "approach", href: "#approche" },
  { key: "faq", href: "#faq" },
  { key: "contact", href: "#contact" },
] as const;

export default function Footer({ locale, content }: Props) {
  const altLocale = getAlternateLocale(locale);
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* Brand Column */}
        <div className={styles.brand}>
          <Image
            src="/brand/logo-dark.svg"
            alt="Jouissance Travaux Divers"
            width={160}
            height={36}
          />
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
                    {content.nav[link.key]}
                  </a>
                </li>
              ))}
              <li>
                <Link href={`/${altLocale}`} className={styles.link}>
                  {content.langSwitch.targetLabel}
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
                  {business.contact.phoneDisplay}
                </a>
              </li>
            )}
            {Boolean(business.contact.email) && (
              <li>
                <a href={`mailto:${business.contact.email}`} className={styles.link}>
                  {business.contact.email}
                </a>
              </li>
            )}
            <li className={styles.address}>
              {business.location}
            </li>
            {business.mapsUrl && (
              <li>
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Google Maps ↗
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
