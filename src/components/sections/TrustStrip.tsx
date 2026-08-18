"use client";

import type { SiteContent } from "@/lib/i18n";
import styles from "./TrustStrip.module.css";

type Props = {
  content: SiteContent;
};

export default function TrustStrip({ content }: Props) {
  return (
    <section className={styles.strip} aria-label="Trust indicators">
      <div className={`container ${styles.inner}`}>
        {content.trust.items.map((item, i) => (
          <div key={i} className={styles.item}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={styles.icon}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
