import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

/** One real exchange, line by line. All lines stay visible; highlight moves. */
const LINES = [
  {
    id: "ask",
    label: "ask",
    who: "you",
    kind: "human",
    text: "“The login test is flaky — investigate.”",
  },
  {
    id: "call",
    label: "tool call",
    who: "model",
    kind: "json",
    text: '{ "tool": "bash", "input": { "command": "npm test" } }',
  },
  {
    id: "run",
    label: "execute",
    who: "harness",
    kind: "result",
    text: "exit 1 · FAIL auth.spec.ts — TypeError: session is null",
  },
  {
    id: "next",
    label: "next call",
    who: "model",
    kind: "json",
    text: '{ "tool": "read_file", "input": { "path": "src/auth/session.ts" } }',
  },
  {
    id: "answer",
    label: "answer",
    who: "model",
    kind: "text",
    text: "“session is used before init — here’s the patch.”",
  },
] as const;

/** The bridge from text to action: JSON out, harness executes, result back in. */
export function ToolCallBridge() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    LINES.length,
    2100,
  );

  return (
    <div
      className="toolcall"
      role="group"
      aria-label="Tool calling: the model emits JSON, the harness executes it"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="Tool calling"
        steps={LINES.map((l) => ({ id: l.id, label: l.label }))}
        step={step}
        onStep={setStep}
      />

      <div className="toolcall__layout">
        <div className="toolcall__transcript">
          <header className="toolcall__head">
            <i />
            <i />
            <i />
            <span>model ↔ harness, one exchange</span>
          </header>
          <ol>
            {LINES.map((line, i) => (
              <li
                key={line.id}
                className={`toolcall__line toolcall__line--${line.kind} ${
                  i === step ? "is-live" : ""
                } ${i < step ? "is-done" : ""}`}
              >
                <button type="button" onClick={() => setStep(i)}>
                  <span className="toolcall__who">{line.who}</span>
                  <code>{line.text}</code>
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* Static mechanism panel — the owner-worded core idea */}
        <div className="toolcall__mech">
          <h3>The mechanism</h3>
          <ul>
            <li>
              <strong>The model only ever emits tokens.</strong> A “tool call”
              is just structured JSON in its output — nothing runs inside the
              model.
            </li>
            <li>
              <strong>A schema names the tool + arguments</strong> so the
              output is parseable, not prose.
            </li>
            <li>
              <strong>The harness executes it</strong> in your real
              environment and feeds the output back in as new context.
            </li>
            <li>
              <strong>Loop</strong> — until the model answers with text
              instead of a tool call, or you stop it.
            </li>
          </ul>
        </div>
      </div>

      <p className="toolcall__caption">
        The scaffold around the model <strong>translates JSON into real
        actions</strong> — read a file, run a command. The model gained hands
        without ever leaving text. Everything agentic builds on this one trick.
      </p>
    </div>
  );
}
