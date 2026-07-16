import "./RequestPath.css";

const STEPS = [
  { id: "cli", label: "CLI", detail: "Your prompt + tool plan" },
  { id: "https", label: "HTTPS", detail: "Encrypted request" },
  { id: "us", label: "Cloud", detail: "US / provider region" },
  { id: "tokens", label: "Tokens", detail: "Text → token IDs" },
  { id: "model", label: "Model", detail: "Next-token generation" },
  { id: "back", label: "Response", detail: "Tokens → text / tool JSON" },
] as const;

export function RequestPath() {
  return (
    <div className="request-path" role="img" aria-label="CLI request path to the model and back">
      <ol className="request-path__flow">
        {STEPS.map((step, i) => (
          <li key={step.id} className="request-path__step">
            <span className="request-path__num">{String(i + 1).padStart(2, "0")}</span>
            <strong>{step.label}</strong>
            <span>{step.detail}</span>
            {i < STEPS.length - 1 && (
              <span className="request-path__arrow" aria-hidden>
                →
              </span>
            )}
          </li>
        ))}
      </ol>
      <p className="request-path__note">
        The model never sees your laptop disk directly — only what the harness
        packs into the request (prompt, history, tool results).
      </p>
    </div>
  );
}
