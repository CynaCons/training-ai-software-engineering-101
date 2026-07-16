import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DrawToolbar } from "./DrawToolbar";
import { OutlineNav } from "./OutlineNav";
import { SlideCard } from "./SlideCard";
import { SlideFrame } from "./SlideFrame";
import { useDrawingStore } from "../stores/useDrawingStore";
import { CANVAS_GAP, SLIDE_HEIGHT, SLIDE_WIDTH } from "../slides/dimensions";
import type { DrawTool } from "../types/drawing";
import type { SlideData } from "../slides/types";
import "./TrainingCanvas.css";

type ViewMode = "present" | "canvas";

interface TrainingCanvasProps {
  slides: SlideData[];
}

const CANVAS_PAD = 80;
const COLS = 2;
const MIN_ZOOM = 0.35;
const MAX_ZOOM = 1.4;

export function TrainingCanvas({ slides }: TrainingCanvasProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>("present");
  const [zoom, setZoom] = useState(0.55);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });
  const viewportRef = useRef<HTMLDivElement>(null);

  const tool = useDrawingStore((s) => s.tool);
  const setTool = useDrawingStore((s) => s.setTool);
  const undo = useDrawingStore((s) => s.undo);

  const activeSlide = slides[activeIndex];
  const isDrawMode = tool === "pen" || tool === "eraser";
  const slideIds = useMemo(() => slides.map((s) => s.id), [slides]);

  const rows = Math.ceil(slides.length / COLS);
  const contentW =
    COLS * SLIDE_WIDTH + (COLS - 1) * CANVAS_GAP + CANVAS_PAD * 2;
  const contentH =
    rows * SLIDE_HEIGHT + (rows - 1) * CANVAS_GAP + CANVAS_PAD * 2;

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(Math.max(0, Math.min(slides.length - 1, index)));
    },
    [slides.length],
  );

  const goToSlideId = useCallback(
    (slideId: string) => {
      const index = slides.findIndex((s) => s.id === slideId);
      if (index >= 0) {
        goTo(index);
        setViewMode("present");
      }
    },
    [goTo, slides],
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        undo(activeSlide.id);
        return;
      }

      const toolKeys: Record<string, DrawTool> = {
        v: "navigate",
        p: "pen",
        e: "eraser",
      };
      const nextTool = toolKeys[e.key.toLowerCase()];
      if (nextTool && !e.ctrlKey && !e.metaKey) {
        setTool(nextTool);
        return;
      }

      if (isDrawMode) return;

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
  }, [next, prev, goTo, slides.length, setTool, undo, activeSlide.id, isDrawMode]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (viewMode !== "canvas" || isDrawMode) return;
    const el = viewportRef.current;
    if (!el) return;
    // Don't steal clicks from slides / scrollbars
    if ((e.target as HTMLElement).closest(".slide-card, .slide-frame")) return;
    isDragging.current = true;
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      scrollLeft: el.scrollLeft,
      scrollTop: el.scrollTop,
    };
    el.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !viewportRef.current) return;
    const el = viewportRef.current;
    el.scrollLeft = dragStart.current.scrollLeft - (e.clientX - dragStart.current.x);
    el.scrollTop = dragStart.current.scrollTop - (e.clientY - dragStart.current.y);
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  const onWheel = (e: React.WheelEvent) => {
    if (viewMode !== "canvas" || isDrawMode) return;
    const el = viewportRef.current;
    if (!el) return;

    // Ctrl / Cmd + wheel → zoom
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const offsetX = e.clientX - rect.left + el.scrollLeft;
      const offsetY = e.clientY - rect.top + el.scrollTop;
      const delta = e.deltaY > 0 ? -0.06 : 0.06;

      setZoom((prev) => {
        const nextZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prev + delta));
        const ratio = nextZoom / prev;
        // Keep cursor point stable while zooming
        requestAnimationFrame(() => {
          el.scrollLeft = offsetX * ratio - (e.clientX - rect.left);
          el.scrollTop = offsetY * ratio - (e.clientY - rect.top);
        });
        return nextZoom;
      });
      return;
    }

    // Shift + wheel → horizontal pan (trackpads often already send deltaX)
    if (e.shiftKey) {
      e.preventDefault();
      el.scrollLeft += e.deltaY !== 0 ? e.deltaY : e.deltaX;
      return;
    }

    // Default: native vertical scroll (and deltaX for horizontal trackpads)
    // No preventDefault — browser scrollbars + wheel just work.
  };

  // Non-passive wheel listener so ctrl+zoom can preventDefault reliably
  useEffect(() => {
    const el = viewportRef.current;
    if (!el || viewMode !== "canvas") return;

    const handler = (e: WheelEvent) => {
      if (isDrawMode) return;
      if (e.ctrlKey || e.metaKey || e.shiftKey) {
        // React onWheel may not always get preventDefault; mirror in native listener
        if (e.ctrlKey || e.metaKey) e.preventDefault();
        if (e.shiftKey) e.preventDefault();
      }
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [viewMode, isDrawMode]);

  const renderSlide = (
    slide: SlideData,
    index: number,
    isActive: boolean,
    onClick?: () => void,
  ) => (
    <SlideFrame slideId={slide.id}>
      <SlideCard slide={slide} index={index} isActive={isActive} onClick={onClick} />
    </SlideFrame>
  );

  return (
    <div className="training-canvas">
      <div className="training-canvas__bg" aria-hidden>
        <div className="training-canvas__glow training-canvas__glow--a" />
        <div className="training-canvas__glow training-canvas__glow--b" />
      </div>

      <header className="training-canvas__chrome">
        <div className="training-canvas__brand">
          <span className="training-canvas__dot" />
          <span>AI Software Engineering 101</span>
        </div>

        <DrawToolbar activeSlideId={activeSlide.id} />

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

      <div className="training-canvas__body">
        <OutlineNav
          slideIds={slideIds}
          activeIndex={activeIndex}
          onJump={goToSlideId}
          disabled={isDrawMode}
        />

        <div
          ref={viewportRef}
          className={`training-canvas__viewport training-canvas__viewport--${viewMode} ${isDrawMode ? "training-canvas__viewport--drawing" : ""}`}
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
                {renderSlide(activeSlide, activeIndex, true)}
              </motion.div>
            </AnimatePresence>
          ) : (
            <div
              className="training-canvas__scroll-space"
              style={{
                width: contentW * zoom,
                height: contentH * zoom,
              }}
            >
              <div
                className="training-canvas__grid"
                style={{
                  width: contentW,
                  height: contentH,
                  transform: `scale(${zoom})`,
                }}
              >
                {slides.map((slide, i) => {
                  const col = i % COLS;
                  const row = Math.floor(i / COLS);
                  return (
                    <div
                      key={slide.id}
                      className="training-canvas__grid-cell"
                      style={{
                        left: CANVAS_PAD + col * (SLIDE_WIDTH + CANVAS_GAP),
                        top: CANVAS_PAD + row * (SLIDE_HEIGHT + CANVAS_GAP),
                      }}
                    >
                      {renderSlide(slide, i, i === activeIndex, () => {
                        if (isDrawMode) return;
                        setActiveIndex(i);
                        setViewMode("present");
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="training-canvas__nav">
        <button
          type="button"
          onClick={prev}
          disabled={activeIndex === 0 || isDrawMode}
          aria-label="Previous slide"
        >
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
              onClick={() => !isDrawMode && goTo(i)}
              disabled={isDrawMode}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          disabled={activeIndex === slides.length - 1 || isDrawMode}
          aria-label="Next slide"
        >
          Next →
        </button>
      </footer>

      <p className="training-canvas__hint">
        {isDrawMode
          ? "Draw on the slide · V navigate · P pen · E eraser · Ctrl+Z undo"
          : "Arrow keys · outline to jump · C canvas · P pen · E eraser"}
        {viewMode === "canvas" &&
          !isDrawMode &&
          " · Scroll · Shift+scroll sideways · Ctrl+scroll zoom · Drag empty space"}
      </p>
    </div>
  );
}
