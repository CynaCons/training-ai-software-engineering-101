import "./diagrams.css";

const NODES = [
  { id: "goal", label: "Goals / criteria", detail: "You set done-when" },
  { id: "build", label: "Agent builds", detail: "Edit · integrate" },
  { id: "see", label: "Agent sees", detail: "Browser · SIL · bus · probes" },
  { id: "judge", label: "Agent evaluates", detail: "Pass / fail vs criteria" },
  { id: "fix", label: "Fix & repeat", detail: "Until criteria hold" },
] as const;

export function CloseTheLoop() {
  return (
    <div
      className="close-the-loop"
      role="img"
      aria-label="Closing the loop: agent builds, observes outputs, evaluates, iterates"
    >
      <ol className="close-the-loop__ring">
        {NODES.map((node, i) => (
          <li key={node.id} className="close-the-loop__node">
            <span className="close-the-loop__idx">
              {String(i + 1).padStart(2, "0")}
            </span>
            <strong>{node.label}</strong>
            <span>{node.detail}</span>
            {i < NODES.length - 1 && (
              <span className="close-the-loop__arrow" aria-hidden>
                →
              </span>
            )}
          </li>
        ))}
      </ol>
      <p className="close-the-loop__caption">
        You own the criteria. The agent needs <em>visibility</em> on its output
        so it can judge progress without guessing.
      </p>
    </div>
  );
}
