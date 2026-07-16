import "./diagrams.css";

const CELLS = [
  { id: "why", label: "Why", detail: "Intent & outcome" },
  { id: "what", label: "What", detail: "Scope of change" },
  { id: "how", label: "How", detail: "Approach at high level" },
  { id: "info", label: "Info needed", detail: "Files, APIs, constraints" },
  { id: "dod", label: "Done when", detail: "Validation & outputs" },
] as const;

export function EngineerBrief() {
  return (
    <div className="engineer-brief" role="img" aria-label="Engineer brief: why what how info done-when">
      <div className="engineer-brief__grid">
        {CELLS.map((cell) => (
          <div key={cell.id} className="engineer-brief__cell">
            <strong>{cell.label}</strong>
            <span>{cell.detail}</span>
          </div>
        ))}
      </div>
      <div className="engineer-brief__arrow" aria-hidden>
        ↓ feed the AI
      </div>
      <div className="engineer-brief__ai">
        <strong>Agent</strong>
        <span>instructions + context + validation criteria → create &amp; iterate</span>
      </div>
    </div>
  );
}
