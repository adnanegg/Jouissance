"use client";

import type { SiteContent } from "@/lib/i18n";
import styles from "./Services.module.css";

type Props = {
  content: SiteContent;
};

const serviceIcons = [
  // 01 Construction
  <svg key="01" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 22h20"/><path d="M6 18v-7l6-5 6 5v7"/><path d="M10 18v-4h4v4"/><path d="M10 10h4"/></svg>,
  // 02 Peinture
  <svg key="02" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/></svg>,
  // 03 Plâtre
  <svg key="03" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/></svg>,
  // 04 Aluminium
  <svg key="04" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 3v18"/><path d="M3 12h18"/></svg>,
  // 05 Électricité & Plomberie
  <svg key="05" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  // 06 Sols & Finition
  <svg key="06" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 14.89 12 19l8-4.11M4 9.11 12 13.22l8-4.11M12 3 4 7.11l8 4.11 8-4.11L12 3z"/></svg>,
];

export default function Services({ content }: Props) {
  return (
    <section className="section" id="services">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>{content.services.sectionTitle}</h2>
          <p className={styles.subtitle}>{content.services.sectionSubtitle}</p>
        </div>

        <div className={styles.grid}>
          {content.services.items.map((service, index) => (
            <div key={service.number} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.number}>{service.number}</span>
                <div className={styles.iconBox}>{serviceIcons[index]}</div>
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.footerAction}>
          <a href="#contact" className="btn btn--primary btn--lg">
            {content.services.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
