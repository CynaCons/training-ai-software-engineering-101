import "./diagrams.css";

const LAYERS = [
  { id: "sys", label: "Instructions / tools", width: "28%" },
  { id: "hist", label: "Full chat + tool history", width: "72%" },
  { id: "turn", label: "This turn’s ask", width: "88%" },
] as const;

/** Growing context window as stacked fill bars — different from FlowSteps. */
export function ContextGauge() {
  return (
    <div
      className="context-gauge"
      role="img"
      aria-label="Context window filling as the session continues"
    >
      <div className="context-gauge__frame">
        <div className="context-gauge__label-row">
          <span>Session window</span>
          <span>token budget →</span>
        </div>
        {LAYERS.map((layer) => (
          <div key={layer.id} className="context-gauge__track">
            <div
              className="context-gauge__fill"
              style={{ width: layer.width }}
            />
            <span>{layer.label}</span>
          </div>
        ))}
      </div>
      <p className="context-gauge__caption">
        Every request resends the whole history. Longer session → bigger pack →
        more awareness, more cost, more noise risk.
      </p>
    </div>
  );
}
