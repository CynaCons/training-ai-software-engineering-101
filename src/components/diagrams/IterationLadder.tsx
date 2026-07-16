import "./diagrams.css";

const STEPS = [
  { id: "i1", label: "Iteration 1", detail: "Smallest working slice" },
  { id: "i1a", label: "1.a · 1.b", detail: "Sub-iterations", nested: true },
  { id: "i2", label: "Iteration 2", detail: "Next vertical step" },
  { id: "i3", label: "Iteration 3+", detail: "Ideas land here as new rows" },
] as const;

export function IterationLadder() {
  return (
    <div
      className="iteration-ladder"
      role="img"
      aria-label="PLAN.md as iterations and sub-iterations"
    >
      <div className="iteration-ladder__stack">
        {STEPS.map((step) => (
          <div
            key={step.id}
            className={`iteration-ladder__row ${"nested" in step && step.nested ? "is-nested" : ""}`}
          >
            <span className="iteration-ladder__check" aria-hidden>
              ☐
            </span>
            <div>
              <strong>{step.label}</strong>
              <span>{step.detail}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="iteration-ladder__caption">
        Baby steps in the right direction — each row shippable and looking right
        before the next.
      </p>
    </div>
  );
}
