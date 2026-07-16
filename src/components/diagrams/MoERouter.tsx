import "./diagrams.css";

/** Token routed to a few experts, not the full dense net. */
export function MoERouter() {
  return (
    <div
      className="moe-router"
      role="img"
      aria-label="Mixture of Experts: router sends tokens to specialist experts"
    >
      <div className="moe-router__flow">
        <div className="moe-router__token">
          <span>Token</span>
          <strong>rate_</strong>
        </div>
        <div className="moe-router__hub">
          <span>Router</span>
          <strong>pick experts</strong>
        </div>
        <div className="moe-router__experts">
          {["Code", "Lang", "Math", "Other"].map((name, i) => (
            <div
              key={name}
              className={`moe-router__expert ${i < 2 ? "is-hot" : ""}`}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
      <p className="moe-router__caption">
        Not every parameter fires for every token — scale capacity without dense
        compute on every step. Behaviour can feel uneven across domains.
      </p>
    </div>
  );
}
