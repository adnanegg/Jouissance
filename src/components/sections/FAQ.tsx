"use client";

import type { SiteContent } from "@/lib/i18n";
import { trackFaqOpen } from "@/lib/analytics";
import styles from "./FAQ.module.css";

type Props = {
  content: SiteContent;
};

export default function FAQ({ content }: Props) {
  return (
    <section className="section" id="faq">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>{content.faq.sectionTitle}</h2>
        </div>

        <div className={styles.list}>
          {content.faq.items.map((item, index) => (
            <details
              key={index}
              className={styles.item}
              onToggle={(e) => {
                if ((e.target as HTMLDetailsElement).open) {
                  trackFaqOpen(`q_${index + 1}`);
                }
              }}
            >
              <summary className={styles.summary}>
                <span className={styles.question}>{item.question}</span>
                <span className={styles.icon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </summary>
              <div className={styles.answer}>
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
