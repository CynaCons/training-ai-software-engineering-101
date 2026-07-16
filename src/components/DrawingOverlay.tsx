import { useCallback, useRef, useState } from "react";
import { useDrawingStore } from "../stores/useDrawingStore";
import type { Point, Stroke } from "../types/drawing";
import "./DrawingOverlay.css";

interface DrawingOverlayProps {
  slideId: string;
}

const EMPTY_STROKES: Stroke[] = [];

function pointsToPath(points: number[]): string {
  if (points.length < 2) return "";
  let d = `M ${points[0]} ${points[1]}`;
  for (let i = 2; i < points.length; i += 2) {
    d += ` L ${points[i]} ${points[i + 1]}`;
  }
  return d;
}

function distance(a: Point, b: Point): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function strokeTouchesPoint(
  points: number[],
  center: Point,
  radius: number,
): boolean {
  for (let i = 0; i < points.length; i += 2) {
    if (distance({ x: points[i], y: points[i + 1] }, center) <= radius) {
      return true;
    }
  }
  return false;
}

export function DrawingOverlay({ slideId }: DrawingOverlayProps) {
  const tool = useDrawingStore((s) => s.tool);
  const penColor = useDrawingStore((s) => s.penColor);
  const penWidth = useDrawingStore((s) => s.penWidth);
  const eraserRadius = useDrawingStore((s) => s.eraserRadius);
  const strokes = useDrawingStore(
    (s) => s.strokesBySlide[slideId] ?? EMPTY_STROKES,
  );
  const addStroke = useDrawingStore((s) => s.addStroke);
  const removeStrokes = useDrawingStore((s) => s.removeStrokes);

  const overlayRef = useRef<SVGSVGElement>(null);
  const isDrawing = useRef(false);
  const currentPoints = useRef<number[]>([]);
  const [livePoints, setLivePoints] = useState<number[] | null>(null);
  const [cursor, setCursor] = useState<Point | null>(null);

  const isDrawMode = tool === "pen" || tool === "eraser";

  const getLocalPoint = useCallback((clientX: number, clientY: number): Point => {
    const rect = overlayRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }, []);

  const eraseAt = useCallback(
    (point: Point) => {
      const currentStrokes =
        useDrawingStore.getState().strokesBySlide[slideId] ?? [];
      const hits = currentStrokes
        .filter((stroke) => strokeTouchesPoint(stroke.points, point, eraserRadius))
        .map((stroke) => stroke.id);
      if (hits.length > 0) removeStrokes(slideId, hits);
    },
    [eraserRadius, removeStrokes, slideId],
  );

  const onPointerDown = (e: React.PointerEvent) => {
    if (!isDrawMode) return;
    e.preventDefault();
    e.stopPropagation();
    overlayRef.current?.setPointerCapture(e.pointerId);

    const point = getLocalPoint(e.clientX, e.clientY);
    setCursor(point);

    if (tool === "pen") {
      isDrawing.current = true;
      currentPoints.current = [point.x, point.y];
      setLivePoints([point.x, point.y]);
    } else {
      eraseAt(point);
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDrawMode) return;
    const point = getLocalPoint(e.clientX, e.clientY);
    setCursor(point);

    if (tool === "pen" && isDrawing.current) {
      currentPoints.current.push(point.x, point.y);
      setLivePoints([...currentPoints.current]);
    } else if (tool === "eraser" && e.buttons > 0) {
      eraseAt(point);
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (tool === "pen" && isDrawing.current) {
      isDrawing.current = false;
      const points = currentPoints.current;
      if (points.length >= 4) {
        addStroke(slideId, {
          id: crypto.randomUUID(),
          points,
          color: penColor,
          width: penWidth,
        });
      }
      currentPoints.current = [];
      setLivePoints(null);
    }
    overlayRef.current?.releasePointerCapture(e.pointerId);
  };

  const onPointerLeave = () => {
    setCursor(null);
  };

  return (
    <svg
      ref={overlayRef}
      className={`drawing-overlay ${isDrawMode ? "drawing-overlay--active" : ""} drawing-overlay--${tool}`}
      aria-hidden={!isDrawMode}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
    >
      {strokes.map((stroke) => (
        <path
          key={stroke.id}
          d={pointsToPath(stroke.points)}
          fill="none"
          stroke={stroke.color}
          strokeWidth={stroke.width}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}

      {livePoints && livePoints.length >= 2 && (
        <path
          d={pointsToPath(livePoints)}
          fill="none"
          stroke={penColor}
          strokeWidth={penWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.85}
        />
      )}

      {tool === "eraser" && cursor && (
        <circle
          cx={cursor.x}
          cy={cursor.y}
          r={eraserRadius}
          className="drawing-overlay__eraser-ring"
        />
      )}

      {tool === "pen" && cursor && (
        <circle
          cx={cursor.x}
          cy={cursor.y}
          r={penWidth / 2}
          fill={penColor}
          opacity={0.65}
        />
      )}
    </svg>
  );
}
