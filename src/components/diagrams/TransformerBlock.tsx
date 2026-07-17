import { AnimatePresence, motion } from "framer-motion";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const PHASES = [
  {
    id: "in",
    label: "Input",
    title: "Input: a list of vectors",
    detail:
      "Each token is already a number vector (“embedding”). The block’s job is to refine those vectors so the next layer — and eventually the next-token guess — is smarter.",
  },
  {
    id: "attn",
    label: "Attention",
    title: "Attention = mix across positions",
    detail:
      "Analogy: in a meeting, everyone can listen to everyone else, then update their notes. Here each token gathers useful info from other tokens (e.g. a variable use looking at its definition).",
  },
  {
    id: "res1",
    label: "Add & Norm",
    title: "Residual: keep the old notes too",
    detail:
      "We add the attention result back onto the original vector (x + Attn), then LayerNorm steadies the scale. Without this skip, deep stacks forget or blow up — like overwriting a file with no backup.",
  },
  {
    id: "ffn",
    label: "FFN",
    title: "FFN = think locally per token",
    detail:
      "After mixing with others, each token runs the same small neural net by itself (two linear layers). Attention shares; FFN elaborates. In MoE models, this slot becomes “pick an expert.”",
  },
  {
    id: "res2",
    label: "Add & Norm",
    title: "Again: add, normalize, pass on",
    detail:
      "Same residual trick after the FFN. Output x′ is just a better list of vectors for the next identical block. Stack dozens of these → a full LLM.",
  },
] as const;

/** Animated walkthrough of one transformer block. */
export function TransformerBlock() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    PHASES.length,
    2000,
  );
  const phase = PHASES[step]!;

  return (
    <div
      className="xfmr-block xfmr-block--live"
      role="group"
      aria-label="Animated transformer block anatomy"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="Block walkthrough"
        steps={PHASES.map((p) => ({ id: p.id, label: p.label }))}
        step={step}
        onStep={setStep}
      />

      <div className="xfmr-block__live">
        <div className="xfmr-block__schematic" aria-hidden>
          <motion.div
            className={`xfmr-block__chip ${step === 0 ? "is-hot" : ""}`}
            animate={{ scale: step === 0 ? 1.04 : 1 }}
          >
            x
          </motion.div>
          <span className="xfmr-block__flow-arrow">↓</span>
          <motion.div
            className={`xfmr-block__chip xfmr-block__chip--wide ${step === 1 ? "is-hot" : ""}`}
            animate={{ scale: step === 1 ? 1.04 : 1 }}
          >
            Multi-head attention
          </motion.div>
          <motion.div
            className={`xfmr-block__chip xfmr-block__chip--res ${step === 2 ? "is-hot" : ""}`}
            animate={{ scale: step === 2 ? 1.04 : 1 }}
          >
            ⊕ Add &amp; Norm
          </motion.div>
          <span className="xfmr-block__flow-arrow">↓</span>
          <motion.div
            className={`xfmr-block__chip xfmr-block__chip--wide xfmr-block__chip--ffn ${step === 3 ? "is-hot" : ""}`}
            animate={{ scale: step === 3 ? 1.04 : 1 }}
          >
            Feed-forward
          </motion.div>
          <motion.div
            className={`xfmr-block__chip xfmr-block__chip--res ${step === 4 ? "is-hot" : ""}`}
            animate={{ scale: step === 4 ? 1.04 : 1 }}
          >
            ⊕ Add &amp; Norm
          </motion.div>
          <span className="xfmr-block__flow-arrow">↓</span>
          <motion.div
            className="xfmr-block__chip"
            animate={{ opacity: step === 4 ? 1 : 0.45 }}
          >
            x′
          </motion.div>

          {/* residual skip lines */}
          <svg className="xfmr-block__skips" viewBox="0 0 120 200" preserveAspectRatio="none">
            <motion.path
              d="M108 28 V72"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              animate={{ opacity: step === 2 ? 1 : 0.25 }}
            />
            <motion.path
              d="M108 108 V152"
              fill="none"
              stroke="var(--warm)"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              animate={{ opacity: step === 4 ? 1 : 0.25 }}
            />
          </svg>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={phase.id}
            className="xfmr-block__detail"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.28 }}
          >
            <span className="xfmr-block__detail-idx">
              {String(step + 1).padStart(2, "0")} / {PHASES.length}
            </span>
            <h3>{phase.title}</h3>
            <p>{phase.detail}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="xfmr-block__caption">
        <strong>Why you care:</strong> “layers” on a model card ≈ how many of these
        blocks are stacked. Deeper isn’t magic — it’s the same recipe repeated.
        Modern LLMs often use <em>pre-norm</em> (normalize before the sublayer),
        same idea.
      </p>
    </div>
  );
}
