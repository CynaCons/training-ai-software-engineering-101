import "./diagrams.css";

/** Closed-loop as a first-class architecture requirement. */
export function ArchRequirement() {
  return (
    <div
      className="arch-req"
      role="img"
      aria-label="Closing the loop is an architectural requirement"
    >
      <div className="arch-req__badge">Architecture requirement</div>
      <h3 className="arch-req__title">Design so the agent can close the loop</h3>
      <div className="arch-req__grid">
        <div>
          <strong>Sense</strong>
          <span>Logs, harnesses, buses, UI, probes</span>
        </div>
        <div>
          <strong>Act</strong>
          <span>APIs, builds, flash, config writes</span>
        </div>
        <div>
          <strong>Judge</strong>
          <span>Tests & criteria the agent can run</span>
        </div>
      </div>
      <p className="arch-req__caption">
        If the system can’t be observed or exercised by tools, agentic
        development stalls — treat observability as a product requirement, not a
        nice-to-have.
      </p>
    </div>
  );
}
