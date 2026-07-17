import { motion } from "framer-motion";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const STEPS = [
  { id: "what", label: "Open weights" },
  { id: "run", label: "Run local" },
  { id: "tradeoff", label: "Trade-offs" },
] as const;

const FAMILIES = ["Llama", "Mistral", "Qwen", "DeepSeek", "Gemma"];

const TRADEOFFS = [
  { keep: "Privacy", detail: "code never leaves your machine" },
  { keep: "Cost", detail: "no per-token bill once it runs" },
  { keep: "Control", detail: "pin a version forever, fine-tune it" },
  { give: "Capability", detail: "frontier models stay ahead for agentic coding" },
] as const;

/** Open-weights ecosystem and running models locally with Ollama. */
export function OpenWeights() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    STEPS.length,
    3000,
  );

  return (
    <div
      className="open-w"
      role="group"
      aria-label="Open-weights models and running them locally with Ollama"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="Open weights"
        steps={STEPS.map((s) => ({ id: s.id, label: s.label }))}
        step={step}
        onStep={setStep}
      />

      <div className="open-w__layout">
        <motion.div
          className={`open-w__panel ${step === 0 ? "is-hot" : ""}`}
          initial={false}
          animate={{ opacity: step === 0 ? 1 : 0.7 }}
          onClick={() => setStep(0)}
        >
          <h3>Weights you can download</h3>
          <p>
            The labs publish the <strong>trained parameters</strong> — the
            billions of knobs — for anyone to run. Open weights ≠ open source:
            training data and recipe usually stay closed.
          </p>
          <div className="open-w__chips">
            {FAMILIES.map((f) => (
              <span key={f} className="open-w__chip">
                {f}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={`open-w__panel open-w__panel--term ${step === 1 ? "is-hot" : ""}`}
          initial={false}
          animate={{ opacity: step === 1 ? 1 : 0.7 }}
          onClick={() => setStep(1)}
        >
          <h3>One command away — Ollama</h3>
          <div className="open-w__term">
            <code>
              <span className="dim">$</span> ollama run qwen3:8b
            </code>
            <code className="dim">pulling manifest… 5.2 GB</code>
            <code>
              <span className="open-w__prompt">&gt;&gt;&gt;</span> explain this
              stack trace…
            </code>
          </div>
          <p>
            Ollama (or LM Studio, llama.cpp) downloads the weights and serves
            an <strong>OpenAI-style local API</strong> — an 8B model runs on a
            gaming GPU or a MacBook.
          </p>
        </motion.div>

        <motion.div
          className={`open-w__panel ${step === 2 ? "is-hot" : ""}`}
          initial={false}
          animate={{ opacity: step === 2 ? 1 : 0.7 }}
          onClick={() => setStep(2)}
        >
          <h3>What you trade</h3>
          <ul className="open-w__trades">
            {TRADEOFFS.map((t) => (
              <li
                key={t.detail}
                className={"give" in t ? "open-w__trade--give" : ""}
              >
                <strong>{"keep" in t ? t.keep : t.give}</strong>
                <span>{t.detail}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <p className="open-w__caption">
        Rule of thumb: <strong>frontier API for agentic coding, open weights
        for private, offline, or high-volume jobs</strong> — and the gap is
        re-measured every few months.
      </p>
    </div>
  );
}
