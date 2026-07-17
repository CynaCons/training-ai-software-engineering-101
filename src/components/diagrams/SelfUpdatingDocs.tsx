import { motion } from "framer-motion";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const PHASES = [
  {
    id: "work",
    label: "Work",
    title: "Session works the repo",
    detail: "Agent plans, edits, tests — and hits the repo’s sharp edges",
  },
  {
    id: "learn",
    label: "Learn",
    title: "Lessons surface",
    detail: "“Vitest needs --pool=forks here” · “deploy runs from main only”",
  },
  {
    id: "write",
    label: "Write back",
    title: "Agent updates its own .md",
    detail: "AGENTS.md rules, PLAN.md checkboxes, new pointers — same commit",
    tone: "accent",
  },
  {
    id: "inherit",
    label: "Inherit",
    title: "Next session starts smarter",
    detail: "Fresh context auto-loads the updated files — no re-teaching",
    tone: "warm",
  },
] as const;

/** The self-reinforcing loop: agents maintain the .md files that instruct them. */
export function SelfUpdatingDocs() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    PHASES.length,
    2600,
  );

  return (
    <div
      className="selfdoc"
      role="group"
      aria-label="Self-reinforcing loop of agents updating their own instruction files"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="Self-updating memory"
        steps={PHASES.map((p) => ({ id: p.id, label: p.label }))}
        step={step}
        onStep={setStep}
      />

      <div className="selfdoc__ring">
        {PHASES.map((p, i) => (
          <motion.button
            key={p.id}
            type="button"
            className={`selfdoc__phase ${i === step ? "is-active" : ""} ${
              "tone" in p ? `selfdoc__phase--${p.tone}` : ""
            }`}
            initial={false}
            animate={{ opacity: i === step ? 1 : 0.65, scale: i === step ? 1.02 : 1 }}
            transition={{ duration: 0.3 }}
            onClick={() => setStep(i)}
          >
            <strong>{p.title}</strong>
            <span>{p.detail}</span>
            {i < PHASES.length - 1 ? (
              <i className="selfdoc__arrow" aria-hidden>
                →
              </i>
            ) : (
              <i className="selfdoc__arrow selfdoc__arrow--loop" aria-hidden>
                ⟲
              </i>
            )}
          </motion.button>
        ))}
      </div>

      <div className="selfdoc__proof">
        <span className="selfdoc__proof-tag">worked example</span>
        <span>
          This deck is built that way: its <code>AGENTS.md</code> ends with
          “when project conventions evolve, <strong>update this file</strong> so
          the next agent inherits them” — and <code>PLAN.md</code> logs every
          feedback round.
        </span>
      </div>

      <p className="selfdoc__caption">
        Make it a standing rule, not a favour: <strong>every session that
        learns something writes it back</strong>. The .md files become memory
        that compounds — your agents get better at your repo without retraining
        anything.
      </p>
    </div>
  );
}
