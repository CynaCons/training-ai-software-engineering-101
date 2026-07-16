import "./diagrams.css";

const CONTEXT = ["import", "Redis", "…", "rate_limit", "(", "req", ")"];
const WEIGHTS = [0.08, 0.55, 0.05, 0.12, 0.05, 0.1, 0.05];

/** Heatmap-style attention: predicting next token looks back with weights. */
export function AttentionMap() {
  return (
    <div
      className="attention-map"
      role="img"
      aria-label="Attention weights over previous tokens when predicting the next one"
    >
      <p className="attention-map__prompt">
        Predicting next token — which earlier tokens matter?
      </p>
      <div className="attention-map__row">
        {CONTEXT.map((tok, i) => (
          <div
            key={`${tok}-${i}`}
            className="attention-map__cell"
            style={{
              background: `rgba(61, 214, 198, ${0.15 + WEIGHTS[i]! * 0.85})`,
              borderColor: `rgba(61, 214, 198, ${0.25 + WEIGHTS[i]! * 0.6})`,
            }}
          >
            <code>{tok}</code>
            <span>{Math.round(WEIGHTS[i]! * 100)}%</span>
          </div>
        ))}
        <div className="attention-map__next">
          <code>?</code>
          <span>next</span>
        </div>
      </div>
      <p className="attention-map__caption">
        <strong>Attention</strong> = learned focus. Here “Redis” lights up when
        writing rate-limit code — multiple heads can track different links in
        parallel.
      </p>
    </div>
  );
}
