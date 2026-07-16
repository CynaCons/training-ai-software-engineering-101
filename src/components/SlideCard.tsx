import { motion } from "framer-motion";
import type { SlideData } from "../slides/types";
import "./SlideCard.css";

interface SlideCardProps {
  slide: SlideData;
  index: number;
  isActive: boolean;
  scale?: number;
  onClick?: () => void;
}

export function SlideCard({
  slide,
  index,
  isActive,
  scale = 1,
  onClick,
}: SlideCardProps) {
  const variant = slide.variant ?? "default";

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
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      role="group"
      aria-label={`Slide ${index + 1}: ${slide.title}`}
      aria-current={isActive ? "true" : undefined}
    >
      <div className="slide-card__grid" aria-hidden />
      <header className="slide-card__header">
        {slide.eyebrow && (
          <span className="slide-card__eyebrow">{slide.eyebrow}</span>
        )}
        <h2 className="slide-card__title">{slide.title}</h2>
      </header>
      <div className="slide-card__body">{slide.content}</div>
      <footer className="slide-card__footer">
        <span className="slide-card__index">
          {String(index + 1).padStart(2, "0")}
        </span>
      </footer>
    </motion.article>
  );
}
