import type { ReactNode } from "react";
import "./diagrams.css";

interface DocPreviewProps {
  filename: string;
  project: string;
  children: ReactNode;
  accent?: "teal" | "warm";
}

/** Fake editor chrome showing a real excerpt from a project doc. */
export function DocPreview({
  filename,
  project,
  children,
  accent = "teal",
}: DocPreviewProps) {
  return (
    <div
      className={`doc-preview doc-preview--${accent}`}
      role="img"
      aria-label={`${filename} preview from ${project}`}
    >
      <header className="doc-preview__chrome">
        <span className="doc-preview__dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="doc-preview__path">
          {project} / <strong>{filename}</strong>
        </span>
      </header>
      <div className="doc-preview__body">{children}</div>
    </div>
  );
}
