import type { ReactNode } from "react";

export type SlideVariant = "title" | "default" | "diagram" | "split";

export interface SlideData {
  id: string;
  title: string;
  eyebrow?: string;
  variant?: SlideVariant;
  content: ReactNode;
}
