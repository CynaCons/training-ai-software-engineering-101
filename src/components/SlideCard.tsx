import { motion, useReducedMotion } from "framer-motion";
import type { SlideData } from "../slides/types";
import "./SlideCard.css";

interface SlideCardProps {
  slide: SlideData;
  index: number;
  isActive: boolean;
  scale?: number;
  /** Cascade the card content in on mount (present mode only). */
  reveal?: boolean;
  onClick?: () => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function SlideCard({
  slide,
  index,
  isActive,
  scale = 1,
  reveal = false,
  onClick,
}: SlideCardProps) {
  const variant = slide.variant ?? "default";
  const reduceMotion = useReducedMotion();
  const cascade = reveal && !reduceMotion;

  const enter = (delay: number) =>
    cascade
      ? {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.45, ease: EASE },
        }
      : {};

  return (
    <motion.article
      className={`slide-card slide-card--${variant} ${isActive ? "is-active" : ""}`}
      style={{ scale }}
      onClick={onClick}
      layout
      initial={false}
      animate={{
        opacity: isActive ? 1 : 0.55,
        filter: isActive ? "brightness(1)" : "brightness(0.75)",
      }}
      transition={{ duration: 0.35, ease: EASE }}
      role="group"
      aria-label={`Slide ${index + 1}: ${slide.title}`}
      aria-current={isActive ? "true" : undefined}
    >
      <div className="slide-card__grid" aria-hidden />
      {slide.chapterNo && (
        <span className="slide-card__watermark" aria-hidden>
          {slide.chapterNo}
        </span>
      )}
      <motion.header className="slide-card__header" {...enter(0.05)}>
        {slide.eyebrow && (
          <span className="slide-card__eyebrow">{slide.eyebrow}</span>
        )}
        <h2 className="slide-card__title">{slide.title}</h2>
      </motion.header>
      <motion.div className="slide-card__body" {...enter(0.16)}>
        {slide.content}
      </motion.div>
      <footer className="slide-card__footer">
        <span className="slide-card__index">
          {String(index + 1).padStart(2, "0")}
        </span>
      </footer>
    </motion.article>
  );
}
