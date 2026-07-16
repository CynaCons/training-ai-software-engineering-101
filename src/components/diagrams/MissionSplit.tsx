import "./diagrams.css";

/** Two-column “you decide / they execute” statement — not another step strip. */
export function MissionSplit() {
  return (
    <div
      className="mission-split"
      role="img"
      aria-label="You know what to do; the model executes"
    >
      <blockquote className="mission-split__quote">
        Models are extraordinarily capable — and they will{" "}
        <em>not</em> invent the right mission for you.
      </blockquote>
      <div className="mission-split__cols">
        <div className="mission-split__you">
          <span className="mission-split__tag">You</span>
          <h3>Know what to do</h3>
          <p>Why · what · how (high level) · info needed · done-when</p>
        </div>
        <div className="mission-split__them">
          <span className="mission-split__tag">Model</span>
          <h3>Make them do it</h3>
          <p>Feed context, instructions, validation — then let them build</p>
        </div>
      </div>
    </div>
  );
}
