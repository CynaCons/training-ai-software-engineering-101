export type DrawTool = "navigate" | "pen" | "eraser";

export interface Stroke {
  id: string;
  points: number[];
  color: string;
  width: number;
}

export interface Point {
  x: number;
  y: number;
}
