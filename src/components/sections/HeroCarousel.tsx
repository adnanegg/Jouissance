"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import type { Locale } from "@/config/site";
import type { SiteContent } from "@/lib/i18n";
import { trackCarouselInteraction } from "@/lib/analytics";
import styles from "./HeroCarousel.module.css";

type Props = {
  locale: Locale;
  content: SiteContent;
};

const heroImages = [
  { src: "/projects/image6.jpeg", index: 0 },
  { src: "/projects/image8.jpeg", index: 1 },
  { src: "/projects/image7.jpeg", index: 2 },
];

export default function HeroCarousel({ locale, content }: Props) {
  const [current, setCurrent] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isRtl = locale === "ar";

  const total = heroImages.length;

  const goTo = useCallback(
    (index: number) => {
      const next = (index + total) % total;
      setCurrent(next);
      trackCarouselInteraction(next);
    },
    [total]
  );

  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  // Very slow auto-advance (8s), pauses on interaction
  useEffect(() => {
    if (isInteracting) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const timer = setInterval(() => goTo(current + 1), 8000);
    return () => clearInterval(timer);
  }, [current, isInteracting, goTo]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsInteracting(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (isRtl) {
        diff < 0 ? next() : prev();
      } else {
        diff > 0 ? next() : prev();
      }
    }
  };

  const handlePrevClick = () => {
    setIsInteracting(true);
    prev();
  };

  const handleNextClick = () => {
    setIsInteracting(true);
    next();
  };

  // Get appropriate alt text
  const getAlt = (index: number) => {
    const heroImageSrc = heroImages[index].src;
    const img = content.realizations.images.find((i) => i.src === heroImageSrc);
    return img?.alt || `Project ${index + 1}`;
  };

  return (
    <div
      className={styles.carousel}
      role="region"
      aria-roledescription="carousel"
      aria-label={content.hero.carouselLabel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div
        className={styles.track}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {heroImages.map((img, i) => (
          <div
            key={img.src}
            className={styles.slide}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} ${content.hero.slideOf} ${total}`}
            aria-hidden={i !== current}
          >
            <Image
              src={img.src}
              alt={getAlt(i)}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={styles.image}
              priority
              quality={85}
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <button
          className={styles.arrow}
          onClick={handlePrevClick}
          aria-label={content.hero.carouselPrev}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <span className={styles.counter} aria-live="polite">
          <span className={styles.counterCurrent}>
            {String(current + 1).padStart(2, "0")}
          </span>
          {" "}/{" "}
          <span className={styles.counterTotal}>
            {String(total).padStart(2, "0")}
          </span>
        </span>

        <button
          className={styles.arrow}
          onClick={handleNextClick}
          aria-label={content.hero.carouselNext}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
