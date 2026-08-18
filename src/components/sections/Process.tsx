"use client";

import type { SiteContent } from "@/lib/i18n";
import styles from "./Process.module.css";

type Props = {
  content: SiteContent;
};

export default function Process({ content }: Props) {
  return (
    <section className="section section--surface">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>{content.process.sectionTitle}</h2>
          <p className={styles.subtitle}>{content.process.sectionSubtitle}</p>
        </div>

        <div className={styles.steps}>
          {content.process.steps.map((step, index) => (
            <div key={step.number} className={styles.step}>
              <div className={styles.stepNumberBox}>
                <span className={styles.stepNumber}>{step.number}</span>
                {index < content.process.steps.length - 1 && (
                  <div className={styles.line} />
                )}
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
