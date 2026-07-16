import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { SlideCard } from "./SlideCard";
import type { SlideData } from "../slides/types";
import "./TrainingCanvas.css";

type ViewMode = "present" | "canvas";

interface TrainingCanvasProps {
  slides: SlideData[];
}

export function TrainingCanvas({ slides }: TrainingCanvasProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>("present");
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const viewportRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(Math.max(0, Math.min(slides.length - 1, index)));
    },
    [slides.length],
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "c" || e.key === "C") {
        setViewMode((m) => (m === "present" ? "canvas" : "present"));
      } else if (e.key === "Home") {
        goTo(0);
      } else if (e.key === "End") {
        goTo(slides.length - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, goTo, slides.length]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (viewMode !== "canvas") return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    setPan({
      x: dragStart.current.panX + (e.clientX - dragStart.current.x),
      y: dragStart.current.panY + (e.clientY - dragStart.current.y),
    });
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  const onWheel = (e: React.WheelEvent) => {
    if (viewMode !== "canvas") return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    setZoom((z) => Math.min(1.4, Math.max(0.35, z + delta)));
  };

  const cols = 2;
  const slideW = 960;
  const slideH = 540;
  const gap = 80;

  return (
    <div className="training-canvas">
      <div className="training-canvas__bg" aria-hidden>
        <div className="training-canvas__glow training-canvas__glow--a" />
        <div className="training-canvas__glow training-canvas__glow--b" />
      </div>

      <header className="training-canvas__chrome">
        <div className="training-canvas__brand">
          <span className="training-canvas__dot" />
          <span>AI SWE Training</span>
        </div>
        <div className="training-canvas__mode-toggle">
          <button
            type="button"
            className={viewMode === "present" ? "is-active" : ""}
            onClick={() => setViewMode("present")}
          >
            Present
          </button>
          <button
            type="button"
            className={viewMode === "canvas" ? "is-active" : ""}
            onClick={() => setViewMode("canvas")}
          >
            Canvas
          </button>
        </div>
      </header>

      <div
        ref={viewportRef}
        className={`training-canvas__viewport training-canvas__viewport--${viewMode}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onWheel={onWheel}
      >
        {viewMode === "present" ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="training-canvas__present"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <SlideCard
                slide={slides[activeIndex]}
                index={activeIndex}
                isActive
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            className="training-canvas__grid"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            }}
          >
            {slides.map((slide, i) => {
              const col = i % cols;
              const row = Math.floor(i / cols);
              return (
                <div
                  key={slide.id}
                  className="training-canvas__grid-cell"
                  style={{
                    left: col * (slideW + gap),
                    top: row * (slideH + gap),
                  }}
                >
                  <SlideCard
                    slide={slide}
                    index={i}
                    isActive={i === activeIndex}
                    onClick={() => {
                      setActiveIndex(i);
                      setViewMode("present");
                    }}
                  />
                </div>
              );
            })}
          </motion.div>
        )}
      </div>

      <footer className="training-canvas__nav">
        <button type="button" onClick={prev} disabled={activeIndex === 0} aria-label="Previous slide">
          ← Prev
        </button>
        <div className="training-canvas__dots" role="tablist" aria-label="Slides">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              className={i === activeIndex ? "is-active" : ""}
              aria-selected={i === activeIndex}
              aria-label={`Go to slide ${i + 1}: ${slide.title}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          disabled={activeIndex === slides.length - 1}
          aria-label="Next slide"
        >
          Next →
        </button>
      </footer>

      <p className="training-canvas__hint">
        Arrow keys to navigate · C to toggle canvas view
        {viewMode === "canvas" && " · Drag to pan · Scroll to zoom"}
      </p>
    </div>
  );
}
