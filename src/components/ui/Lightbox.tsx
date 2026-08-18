"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import type { ProjectImage } from "@/lib/i18n";
import styles from "./Lightbox.module.css";

type Props = {
  images: ProjectImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
};

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  closeLabel,
  prevLabel,
  nextLabel,
}: Props) {
  const currentImage = images[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!currentImage) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label={closeLabel}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Prev Button */}
        <button
          className={`${styles.navBtn} ${styles.prevBtn}`}
          onClick={onPrev}
          aria-label={prevLabel}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Next Button */}
        <button
          className={`${styles.navBtn} ${styles.nextBtn}`}
          onClick={onNext}
          aria-label={nextLabel}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Image & Caption */}
        <div className={styles.imageWrapper}>
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className={styles.image}
            sizes="90vw"
            quality={90}
            priority
          />
        </div>

        <div className={styles.caption}>
          <span className={styles.category}>{currentImage.category}</span>
          <p className={styles.altText}>{currentImage.alt}</p>
        </div>
      </div>
    </div>
  );
}
