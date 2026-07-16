import "./diagrams.css";

/** Layer cake: attention + FFN repeated. */
export function TransformerStack() {
  return (
    <div
      className="transformer-stack"
      role="img"
      aria-label="Transformer as stacked attention and feed-forward layers"
    >
      <div className="transformer-stack__column">
        {["Layer N", "Layer …", "Layer 2", "Layer 1"].map((label, i) => (
          <div key={label} className="transformer-stack__layer" style={{ zIndex: 4 - i }}>
            <strong>{label}</strong>
            <div className="transformer-stack__blocks">
              <span>Attention</span>
              <span>Feed-forward</span>
            </div>
          </div>
        ))}
        <div className="transformer-stack__base">Tokens in → representations out</div>
      </div>
      <p className="transformer-stack__caption">
        Modern LLMs are mostly <strong>decoder-only</strong> stacks of these
        blocks — parallelizable, scalable, built around attention.
      </p>
    </div>
  );
}
