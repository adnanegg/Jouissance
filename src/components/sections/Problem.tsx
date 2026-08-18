"use client";

import type { SiteContent } from "@/lib/i18n";
import styles from "./Problem.module.css";

type Props = {
  content: SiteContent;
};

export default function Problem({ content }: Props) {
  return (
    <section className="section section--surface" id="approche">
      <div className={`container ${styles.inner}`}>
        <div className={styles.card}>
          <div className={styles.badge}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{content.nav.approach}</span>
          </div>
          <h2 className={styles.headline}>{content.problem.headline}</h2>
          <p className={styles.body}>{content.problem.body}</p>
          <div className={styles.solutionBox}>
            <div className={styles.checkIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className={styles.solutionText}>{content.problem.solution}</p>
          </div>
          <div className={styles.action}>
            <a href="#services" className="btn btn--primary">
              {content.problem.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
