import "./diagrams.css";

const LAYERS = [
  { id: "bootstrap", label: "AGENTS.md / CLAUDE.md", detail: "Auto-loaded every turn" },
  { id: "plans", label: "PLAN.md · TASKS.md · design notes", detail: "Long-running guidance" },
  { id: "project", label: "ARCHITECTURE.md · conventions", detail: "Reload or open on demand" },
  { id: "repo", label: "Source + tests (on demand)", detail: "Pulled when the task needs them" },
] as const;

export function MemoryStack() {
  return (
    <div className="memory-stack" role="img" aria-label="Markdown files extending model memory">
      <div className="memory-stack__layers">
        {LAYERS.map((layer, i) => (
          <div
            key={layer.id}
            className="memory-stack__layer"
            style={{ zIndex: LAYERS.length - i }}
          >
            <strong>{layer.label}</strong>
            <span>{layer.detail}</span>
          </div>
        ))}
      </div>
      <p className="memory-stack__caption">
        Disk is durable memory. Context is the working set.
      </p>
    </div>
  );
}
