import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const TURNS = [
  {
    id: "t1",
    label: "turn 1",
    ctx: 34,
    ctxLabel: "prompt + repo rules",
    out: "tool call · npm test",
    final: false,
  },
  {
    id: "t2",
    label: "turn 2",
    ctx: 62,
    ctxLabel: "+ test output",
    out: "tool call · edit session.ts",
    final: false,
  },
  {
    id: "t3",
    label: "turn 3",
    ctx: 88,
    ctxLabel: "+ diff & re-run",
    out: "final answer · “fixed, tests green”",
    final: true,
  },
] as const;

/** Autonomy is turns: call → wait → evaluate → next, with context growing. */
export function TurnLoop() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    TURNS.length,
    2300,
  );

  return (
    <div
      className="turnloop"
      role="group"
      aria-label="Turn-based autonomy: repeated tool calls with growing context"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="Turn loop"
        steps={TURNS.map((t) => ({ id: t.id, label: t.label }))}
        step={step}
        onStep={setStep}
      />

      <div className="turnloop__layout">
        <div className="turnloop__turns">
          {TURNS.map((turn, i) => (
            <button
              key={turn.id}
              type="button"
              className={`turnloop__turn ${i === step ? "is-live" : ""} ${
                turn.final ? "turnloop__turn--final" : ""
              }`}
              onClick={() => setStep(i)}
            >
              <span className="turnloop__tag">{turn.label}</span>
              <span className="turnloop__ctx">
                <i style={{ width: `${turn.ctx}%` }} />
                <em>{turn.ctxLabel}</em>
              </span>
              <span className="turnloop__arrow" aria-hidden>
                →
              </span>
              <span className="turnloop__model">model</span>
              <span className="turnloop__arrow" aria-hidden>
                →
              </span>
              <span
                className={`turnloop__out ${turn.final ? "is-final" : ""}`}
              >
                {turn.out}
              </span>
            </button>
          ))}
        </div>

        {/* Static contrast — where autonomy actually comes from */}
        <div className="turnloop__contrast">
          <h3>Same model, three behaviours</h3>
          <ul>
            <li>
              <strong>Chat, no tools</strong> — answers from context only; you
              do the rest.
            </li>
            <li>
              <strong>One tool call</strong> — a single lookup or action, then
              an answer.
            </li>
            <li className="is-agent">
              <strong>Turn-based agent</strong> — many rounds; progress emerges
              from the loop.
            </li>
          </ul>
        </div>
      </div>

      <p className="turnloop__caption">
        Call tool → wait for output → evaluate → call the next tool — until the
        goal is met, the model stops, or you interrupt. Note the{" "}
        <strong>context bar growing every turn</strong>: the whole history
        rides along. That bill comes due a few slides from now.
      </p>
    </div>
  );
}
