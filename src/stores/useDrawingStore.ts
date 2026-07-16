import { create } from "zustand";
import type { DrawTool, Stroke } from "../types/drawing";

const MAX_HISTORY = 50;

interface DrawingState {
  tool: DrawTool;
  penColor: string;
  penWidth: number;
  eraserRadius: number;
  strokesBySlide: Record<string, Stroke[]>;
  undoBySlide: Record<string, Stroke[][]>;

  setTool: (tool: DrawTool) => void;
  getStrokes: (slideId: string) => Stroke[];
  addStroke: (slideId: string, stroke: Stroke) => void;
  setStrokes: (slideId: string, strokes: Stroke[]) => void;
  removeStrokes: (slideId: string, ids: string[]) => void;
  undo: (slideId: string) => void;
  clearSlide: (slideId: string) => void;
  canUndo: (slideId: string) => boolean;
}

function cloneStrokes(strokes: Stroke[]): Stroke[] {
  return strokes.map((s) => ({ ...s, points: [...s.points] }));
}

function pushUndo(
  undoBySlide: Record<string, Stroke[][]>,
  slideId: string,
  strokes: Stroke[],
): Record<string, Stroke[][]> {
  const stack = [...(undoBySlide[slideId] ?? [])];
  stack.push(cloneStrokes(strokes));
  if (stack.length > MAX_HISTORY) stack.shift();
  return { ...undoBySlide, [slideId]: stack };
}

export const useDrawingStore = create<DrawingState>((set, get) => ({
  tool: "navigate",
  penColor: "#f0a84b",
  penWidth: 3,
  eraserRadius: 16,
  strokesBySlide: {},
  undoBySlide: {},

  setTool: (tool) => set({ tool }),

  getStrokes: (slideId) => get().strokesBySlide[slideId] ?? [],

  addStroke: (slideId, stroke) => {
    set((state) => {
      const current = state.strokesBySlide[slideId] ?? [];
      return {
        undoBySlide: pushUndo(state.undoBySlide, slideId, current),
        strokesBySlide: {
          ...state.strokesBySlide,
          [slideId]: [...current, stroke],
        },
      };
    });
  },

  setStrokes: (slideId, strokes) => {
    set((state) => {
      const current = state.strokesBySlide[slideId] ?? [];
      return {
        undoBySlide: pushUndo(state.undoBySlide, slideId, current),
        strokesBySlide: {
          ...state.strokesBySlide,
          [slideId]: strokes,
        },
      };
    });
  },

  removeStrokes: (slideId, ids) => {
    const idSet = new Set(ids);
    set((state) => {
      const current = state.strokesBySlide[slideId] ?? [];
      const next = current.filter((s) => !idSet.has(s.id));
      if (next.length === current.length) return state;
      return {
        undoBySlide: pushUndo(state.undoBySlide, slideId, current),
        strokesBySlide: {
          ...state.strokesBySlide,
          [slideId]: next,
        },
      };
    });
  },

  undo: (slideId) => {
    set((state) => {
      const stack = [...(state.undoBySlide[slideId] ?? [])];
      const prev = stack.pop();
      if (!prev) return state;
      return {
        undoBySlide: { ...state.undoBySlide, [slideId]: stack },
        strokesBySlide: {
          ...state.strokesBySlide,
          [slideId]: prev,
        },
      };
    });
  },

  clearSlide: (slideId) => {
    set((state) => {
      const current = state.strokesBySlide[slideId] ?? [];
      if (current.length === 0) return state;
      return {
        undoBySlide: pushUndo(state.undoBySlide, slideId, current),
        strokesBySlide: {
          ...state.strokesBySlide,
          [slideId]: [],
        },
      };
    });
  },

  canUndo: (slideId) => (get().undoBySlide[slideId]?.length ?? 0) > 0,
}));
