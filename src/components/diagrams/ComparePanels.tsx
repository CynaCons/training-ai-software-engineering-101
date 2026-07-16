import type { ReactNode } from "react";
import "./diagrams.css";

interface Panel {
  title: string;
  body: ReactNode;
  tone?: "bad" | "good";
}

interface ComparePanelsProps {
  left: Panel;
  right: Panel;
  label: string;
}

export function ComparePanels({ left, right, label }: ComparePanelsProps) {
  return (
    <div className="compare-panels" role="img" aria-label={label}>
      <div className={`compare-panels__panel compare-panels__panel--${left.tone ?? "bad"}`}>
        <h3>{left.title}</h3>
        <div className="compare-panels__body">{left.body}</div>
      </div>
      <div className="compare-panels__vs" aria-hidden>
        vs
      </div>
      <div className={`compare-panels__panel compare-panels__panel--${right.tone ?? "good"}`}>
        <h3>{right.title}</h3>
        <div className="compare-panels__body">{right.body}</div>
      </div>
    </div>
  );
}
