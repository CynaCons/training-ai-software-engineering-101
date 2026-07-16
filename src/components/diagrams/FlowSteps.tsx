import "./diagrams.css";

export interface FlowStep {
  label: string;
  detail?: string;
  tone?: "accent" | "warm" | "muted";
}

interface FlowStepsProps {
  steps: FlowStep[];
  caption?: string;
  /** Accessible name for the diagram */
  label: string;
}

export function FlowSteps({ steps, caption, label }: FlowStepsProps) {
  return (
    <div className="flow-steps" role="img" aria-label={label}>
      <ol className="flow-steps__row">
        {steps.map((step, i) => (
          <li
            key={`${step.label}-${i}`}
            className={`flow-steps__step flow-steps__step--${step.tone ?? "accent"}`}
          >
            <span className="flow-steps__idx">
              {String(i + 1).padStart(2, "0")}
            </span>
            <strong>{step.label}</strong>
            {step.detail && <span>{step.detail}</span>}
            {i < steps.length - 1 && (
              <span className="flow-steps__arrow" aria-hidden>
                →
              </span>
            )}
          </li>
        ))}
      </ol>
      {caption && <p className="flow-steps__caption">{caption}</p>}
    </div>
  );
}
