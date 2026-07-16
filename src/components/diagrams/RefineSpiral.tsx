import "./diagrams.css";

const STAGES = [
  { n: "01", label: "Idea", detail: "In your head" },
  { n: "02", label: "Draft", detail: "PRD.md dump" },
  { n: "03", label: "Gaps", detail: "Agent questions" },
  { n: "04", label: "Ready", detail: "Can guide build" },
] as const;

/** Circular / radial refinement — breaks the horizontal-step habit. */
export function RefineSpiral() {
  return (
    <div
      className="refine-spiral"
      role="img"
      aria-label="Refine PRD with the agent in cycles"
    >
      <div className="refine-spiral__orbit">
        {STAGES.map((stage, i) => {
          const angle = -90 + i * 90;
          return (
            <div
              key={stage.n}
              className="refine-spiral__node"
              style={{
                ["--a" as string]: `${angle}deg`,
              }}
            >
              <span>{stage.n}</span>
              <strong>{stage.label}</strong>
              <em>{stage.detail}</em>
            </div>
          );
        })}
        <div className="refine-spiral__core">
          <span>PRD.md</span>
          <small>co-write</small>
        </div>
      </div>
      <p className="refine-spiral__caption">
        You don’t need every detail by heart — iterate with the agent until the
        vision can steer the rest of development.
      </p>
    </div>
  );
}
