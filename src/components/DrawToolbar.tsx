import { useDrawingStore } from "../stores/useDrawingStore";
import type { DrawTool } from "../types/drawing";
import "./DrawToolbar.css";

interface DrawToolbarProps {
  activeSlideId: string;
}

const TOOLS: { id: DrawTool; label: string; shortcut: string }[] = [
  { id: "navigate", label: "Navigate", shortcut: "V" },
  { id: "pen", label: "Pen", shortcut: "P" },
  { id: "eraser", label: "Eraser", shortcut: "E" },
];

export function DrawToolbar({ activeSlideId }: DrawToolbarProps) {
  const tool = useDrawingStore((s) => s.tool);
  const setTool = useDrawingStore((s) => s.setTool);
  const undo = useDrawingStore((s) => s.undo);
  const clearSlide = useDrawingStore((s) => s.clearSlide);
  const canUndo = useDrawingStore(
    (s) => (s.undoBySlide[activeSlideId]?.length ?? 0) > 0,
  );

  return (
    <div className="draw-toolbar" role="toolbar" aria-label="Drawing tools">
      <div className="draw-toolbar__tools">
        {TOOLS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={tool === t.id ? "is-active" : ""}
            onClick={() => setTool(t.id)}
            aria-pressed={tool === t.id}
            title={`${t.label} (${t.shortcut})`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="draw-toolbar__divider" aria-hidden />
      <button
        type="button"
        onClick={() => undo(activeSlideId)}
        disabled={!canUndo}
        title="Undo (Ctrl+Z)"
      >
        Undo
      </button>
      <button
        type="button"
        onClick={() => clearSlide(activeSlideId)}
        title="Clear drawings on this slide"
      >
        Clear
      </button>
    </div>
  );
}
