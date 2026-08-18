"use client";

import { useState } from "react";
import Image from "next/image";
import type { SiteContent } from "@/lib/i18n";
import { trackRealizationOpen } from "@/lib/analytics";
import Lightbox from "@/components/ui/Lightbox";
import styles from "./Realizations.module.css";

type Props = {
  content: SiteContent;
};

export default function Realizations({ content }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = content.realizations.images;

  const handleOpen = (index: number) => {
    setLightboxIndex(index);
    trackRealizationOpen(`image_${index + 1}`);
  };

  const handleClose = () => setLightboxIndex(null);

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
  };

  return (
    <section className="section" id="realisations">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>{content.realizations.sectionTitle}</h2>
          <p className={styles.subtitle}>{content.realizations.sectionSubtitle}</p>
        </div>

        <div className={styles.grid}>
          {images.map((img, index) => (
            <div
              key={img.src}
              className={`${styles.item} ${index === 0 || index === 1 ? styles.itemFeatured : ""}`}
              onClick={() => handleOpen(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpen(index);
                }
              }}
              aria-label={`View ${img.category}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={
                  index === 0 || index === 1
                    ? "(max-width: 768px) 100vw, 50vw"
                    : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                }
                className={styles.image}
                loading="lazy"
                quality={80}
              />
              <div className={styles.overlay}>
                <span className={styles.category}>{img.category}</span>
                <span className={styles.zoomIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
          closeLabel={content.realizations.lightboxClose}
          prevLabel={content.realizations.lightboxPrev}
          nextLabel={content.realizations.lightboxNext}
        />
      )}
    </section>
  );
}
