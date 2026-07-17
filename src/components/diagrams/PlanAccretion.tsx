import { motion } from "framer-motion";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const STEPS = [
  { id: "ship", label: "Ship" },
  { id: "review", label: "Review" },
  { id: "idea", label: "New idea" },
  { id: "compress", label: "Compress" },
  { id: "continue", label: "Continue" },
] as const;

/** Rows of PLAN.md: `on` = step at which the row lights up. */
const ROWS = [
  { at: 0, mark: "x", text: "v1.2 — inline edit (COMPLETE)", tone: "done" },
  { at: 0, mark: "x", text: "v1.3 — undo/redo (COMPLETE)", tone: "done" },
  { at: 1, mark: "x", text: "review: owner satisfied? → new ideas welcome", tone: "note" },
  { at: 2, mark: " ", text: "v1.4 — drag-reorder rows  ← appended, never wiped", tone: "new" },
  { at: 3, mark: "·", text: "v0.x history → 3-line summary (compressed, kept)", tone: "compress" },
  { at: 4, mark: " ", text: "next session reads this file and just continues", tone: "next" },
] as const;

/** PLAN.md accretes iterations — compressed sometimes, wiped never. */
export function PlanAccretion() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    STEPS.length,
    2200,
  );

  return (
    <div
      className="planacc"
      role="group"
      aria-label="PLAN.md accumulating iterations: ship, review, append ideas, compress, continue"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="Iterate · don’t wipe"
        steps={STEPS.map((s) => ({ id: s.id, label: s.label }))}
        step={step}
        onStep={setStep}
      />

      <div className="planacc__layout">
        <div className="planacc__doc">
          <header className="planacc__doc-head">
            <span className="planacc__doc-name">PLAN.md</span>
            <span className="planacc__doc-note">one file · whole product memory</span>
          </header>
          <ol>
            {ROWS.map((row) => (
              <motion.li
                key={row.text}
                className={`planacc__row planacc__row--${row.tone} ${
                  row.at === step ? "is-live" : ""
                }`}
                initial={false}
                animate={{ opacity: row.at <= step ? 1 : 0.25 }}
                transition={{ duration: 0.35 }}
              >
                <span className="planacc__mark">[{row.mark}]</span>
                <span>{row.text}</span>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="planacc__why">
          <div className={`planacc__point ${step <= 1 ? "is-hot" : ""}`}>
            <strong>Ship, then judge</strong>
            <span>each slice works and looks right before the next</span>
          </div>
          <div className={`planacc__point ${step === 2 ? "is-hot" : ""}`}>
            <strong>Ideas become rows</strong>
            <span>a new thought is a new iteration — appended, not a rewrite</span>
          </div>
          <div className={`planacc__point ${step >= 3 ? "is-hot" : ""}`}>
            <strong>Compress, never wipe</strong>
            <span>
              old detail shrinks to summaries; agents keep project context
              without reverse-engineering git
            </span>
          </div>
        </div>
      </div>

      <p className="planacc__caption">
        The plan is an{" "}
        <strong>append-only memory with a compaction pass</strong> — exactly
        what agents need to pick up where the last session stopped.
      </p>
    </div>
  );
}
