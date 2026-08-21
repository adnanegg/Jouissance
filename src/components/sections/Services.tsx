"use client";

import Image from "next/image";
import type { SiteContent } from "@/lib/i18n";
import styles from "./Services.module.css";

type Props = {
  content: SiteContent;
};

const serviceImages = [
  { src: "/services/construction.png", alt: "Construction & Gros œuvre" },
  { src: "/services/peinture.png", alt: "Peinture & Décoration" },
  { src: "/services/platre.png", alt: "Plâtre & Faux plafonds" },
  { src: "/services/aluminium.png", alt: "Aluminium & Menuiserie" },
  { src: "/services/electricite.png", alt: "Électricité & Plomberie" },
  { src: "/services/finition.png", alt: "Sols, plafonds & finition" },
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
              <div className={styles.imageWrapper}>
                <Image
                  src={serviceImages[index]?.src || "/services/construction.png"}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={styles.cardImage}
                />
                <span className={styles.numberBadge}>{service.number}</span>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.description}</p>
              </div>
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

