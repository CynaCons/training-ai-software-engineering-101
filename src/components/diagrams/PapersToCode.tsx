import { motion } from "framer-motion";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const STAGES = [
  {
    id: "scan",
    label: "Scan",
    title: "Scan the science",
    detail:
      "Agent sweeps arXiv, blogs, release notes for your problem’s keywords",
  },
  {
    id: "fit",
    label: "Evaluate",
    title: "Evaluate fit",
    detail:
      "Which findings match our constraints — data, latency, licence, hardware?",
  },
  {
    id: "prototype",
    label: "Prototype",
    title: "Prototype in a branch",
    detail: "Agent implements the paper’s method against your real code",
  },
  {
    id: "measure",
    label: "Measure",
    title: "Measure vs baseline",
    detail: "Closed loop: benchmarks decide, not the abstract’s claims",
    tone: "accent",
  },
  {
    id: "keep",
    label: "Keep / drop",
    title: "Keep or drop",
    detail: "Merge the win, or archive the branch with notes for next time",
    tone: "warm",
  },
] as const;

/** From publications to running code — the loop agents made cheap. */
export function PapersToCode() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    STAGES.length,
    2400,
  );

  return (
    <div
      className="p2c"
      role="group"
      aria-label="From papers to implementation: scan, evaluate, prototype, measure, keep"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="Papers → code"
        steps={STAGES.map((s) => ({ id: s.id, label: s.label }))}
        step={step}
        onStep={setStep}
      />

      <ol className="p2c__lane">
        {STAGES.map((s, i) => (
          <li key={s.id} className="p2c__slot">
            <motion.button
              type="button"
              className={`p2c__card ${i === step ? "is-active" : ""} ${
                "tone" in s ? `p2c__card--${s.tone}` : ""
              }`}
              initial={false}
              animate={{ opacity: i <= step ? 1 : 0.5, y: i === step ? -4 : 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setStep(i)}
            >
              <span className="p2c__idx">{String(i + 1).padStart(2, "0")}</span>
              <strong>{s.title}</strong>
              <span className="p2c__detail">{s.detail}</span>
            </motion.button>
          </li>
        ))}
      </ol>

      <div className="p2c__delta" aria-hidden>
        <span className="p2c__delta-was">
          before agents · read → understand → hand-implement → <em>months</em>
        </span>
        <span className="p2c__delta-now">
          with agents · point at the paper → prototype the same day →{" "}
          <em>days</em>
        </span>
      </div>

      <p className="p2c__caption">
        The latest science is <strong>directly actionable</strong> now: an
        agent can read the publication, judge whether it fits your problem,
        and draft the implementation — you keep the judgement and the
        benchmarks.
      </p>
    </div>
  );
}
