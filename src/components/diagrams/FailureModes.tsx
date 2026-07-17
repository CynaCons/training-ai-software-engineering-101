import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const MODES = [
  {
    id: "f1",
    tag: "F1",
    name: "Hallucinated API",
    tell: "imports or methods that don’t exist",
    fix: "ground it — point at real files first",
  },
  {
    id: "f2",
    tag: "F2",
    name: "Wrong target",
    tell: "diff lands in a lookalike or dead file",
    fix: "name exact paths in the brief",
  },
  {
    id: "f3",
    tag: "F3",
    name: "Scope creep",
    tell: "diff far bigger than the ask",
    fix: "constrain — and interrupt early",
  },
  {
    id: "f4",
    tag: "F4",
    name: "Stuck loop",
    tell: "same failing fix, retried verbatim",
    fix: "stop; supply the missing fact",
  },
  {
    id: "f5",
    tag: "F5",
    name: "Silent delete",
    tell: "suite green — feature gone",
    fix: "review deletions line by line",
  },
] as const;

/** Five ways the loop goes wrong — and the tell that catches each early. */
export function FailureModes() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    MODES.length,
    2200,
  );

  return (
    <div
      className="failmode"
      role="group"
      aria-label="Agent failure modes with their tells and fixes"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="Failure modes"
        steps={MODES.map((m) => ({ id: m.id, label: m.name }))}
        step={step}
        onStep={setStep}
      />

      <div className="failmode__grid">
        {MODES.map((mode, i) => (
          <button
            key={mode.id}
            type="button"
            className={`failmode__card ${i === step ? "is-live" : ""}`}
            onClick={() => setStep(i)}
          >
            <span className="failmode__tag">{mode.tag}</span>
            <strong>{mode.name}</strong>
            <span className="failmode__row">
              <em>tell</em>
              {mode.tell}
            </span>
            <span className="failmode__row failmode__row--fix">
              <em>fix</em>
              {mode.fix}
            </span>
          </button>
        ))}
      </div>

      <p className="failmode__caption">
        All five are <strong>context problems in disguise</strong>. The
        recovery is rarely “try again” — it’s a tighter brief, new
        information, or an earlier interrupt. Which is exactly the next slide.
      </p>
    </div>
  );
}
