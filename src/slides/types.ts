import type { ReactNode } from "react";

export type SlideVariant = "title" | "default" | "diagram" | "split" | "compare";

export interface SlideData {
  id: string;
  title: string;
  eyebrow?: string;
  variant?: SlideVariant;
  /** Chapter ordinal ("01"…) rendered as a watermark on section-open slides. */
  chapterNo?: string;
  content: ReactNode;
}
