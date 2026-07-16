import "./diagrams.css";

const TOKENS = [
  { t: "def", note: "keyword" },
  { t: " rate", note: "word" },
  { t: "_limit", note: "subword" },
  { t: "(", note: "punct" },
  { t: "req", note: "ident" },
  { t: ")", note: "punct" },
  { t: ":", note: "punct" },
] as const;

/** Text chopped into tokens — visual, not a step strip. */
export function TokenStream() {
  return (
    <div
      className="token-stream"
      role="img"
      aria-label="Text split into tokens, not always whole words"
    >
      <p className="token-stream__source">
        <span className="dim">source</span> def rate_limit(req):
      </p>
      <div className="token-stream__chips">
        {TOKENS.map((tok) => (
          <div key={tok.t + tok.note} className="token-stream__chip">
            <code>{tok.t}</code>
            <span>{tok.note}</span>
          </div>
        ))}
      </div>
      <div className="token-stream__window">
        <span>Context window</span>
        <div className="token-stream__bar">
          <i style={{ width: "62%" }} />
        </div>
        <em>How many tokens the model can see at once — cost, truncation, memory</em>
      </div>
    </div>
  );
}
