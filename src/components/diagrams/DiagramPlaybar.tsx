import "./diagrams.css";

interface DiagramPlaybarProps {
  playing: boolean;
  onToggle: () => void;
  onNext: () => void;
  label?: string;
  steps?: { id: string; label: string }[];
  step?: number;
  onStep?: (i: number) => void;
}

/** Compact presenter controls shared by dynamic diagrams. */
export function DiagramPlaybar({
  playing,
  onToggle,
  onNext,
  label,
  steps,
  step,
  onStep,
}: DiagramPlaybarProps) {
  return (
    <div className="diagram-playbar" role="toolbar" aria-label={label ?? "Diagram controls"}>
      <button
        type="button"
        className={`diagram-playbar__btn ${playing ? "is-lit" : ""}`}
        onClick={onToggle}
      >
        {playing ? "Pause" : "Play"}
      </button>
      <button type="button" className="diagram-playbar__btn" onClick={onNext}>
        Step
      </button>
      {steps && onStep != null && step != null && (
        <div className="diagram-playbar__dots" role="group" aria-label="Steps">
          {steps.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={i === step ? "is-active" : ""}
              aria-pressed={i === step}
              aria-label={s.label}
              onClick={() => onStep(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
