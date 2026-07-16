import type { ReactNode } from "react";
import { DrawingOverlay } from "./DrawingOverlay";
import "./SlideFrame.css";

interface SlideFrameProps {
  slideId: string;
  children: ReactNode;
}

export function SlideFrame({ slideId, children }: SlideFrameProps) {
  return (
    <div className="slide-frame">
      {children}
      <DrawingOverlay slideId={slideId} />
    </div>
  );
}
