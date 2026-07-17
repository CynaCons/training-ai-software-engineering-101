import { AnimatePresence, motion } from "framer-motion";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const STEPS = [
  {
    id: "q",
    label: "Q",
    title: "Query — the question",
    detail:
      "From this token’s point of view: “What am I looking for?” Example: standing on rate_limit(, the query might hunt for Redis or a docstring above.",
    formula: "Q = X W_Q",
  },
  {
    id: "k",
    label: "K",
    title: "Keys — the labels",
    detail:
      "Every other token hangs a label on its door: “Here’s what I offer.” Matching query↔key is how the model decides who is relevant — like search ranking, not a database lookup.",
    formula: "K = X W_K",
  },
  {
    id: "score",
    label: "·",
    title: "Scores → probabilities",
    detail:
      "Compare Q to every K (dot product), shrink by √dₖ so numbers don’t explode, then softmax → weights that sum to 100%. Brighter cell = more attention.",
    formula: "α = softmax(QKᵀ / √dₖ)",
  },
  {
    id: "v",
    label: "V",
    title: "Values — the payload",
    detail:
      "Keys decide who matters; values are the content you actually mix in. Softmax weights × values → the updated vector for this position. That’s “attention” in one sentence.",
    formula: "out = α V",
  },
] as const;

/** Animated scaled dot-product attention with step-through. */
export function QkvAttention() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    STEPS.length,
    2100,
  );
  const active = STEPS[step]!;

  return (
    <div
      className="qkv-attn qkv-attn--live"
      role="group"
      aria-label="Animated scaled dot-product attention"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="Attention pipeline"
        steps={STEPS.map((s) => ({ id: s.id, label: s.title }))}
        step={step}
        onStep={setStep}
      />

      <div className="qkv-attn__stage">
        <div className="qkv-attn__pipeline">
          {STEPS.map((s, i) => (
            <motion.button
              key={s.id}
              type="button"
              className={`qkv-attn__step ${i === step ? "is-active" : ""} ${i < step ? "is-done" : ""}`}
              onClick={() => setStep(i)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              aria-pressed={i === step}
            >
              <span className="qkv-attn__badge">{s.label}</span>
              <strong>{s.title}</strong>
              {i < STEPS.length - 1 && (
                <motion.span
                  className="qkv-attn__arrow"
                  aria-hidden
                  animate={{ opacity: i < step ? 1 : 0.35 }}
                >
                  →
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>

        <div className="qkv-attn__viz" aria-hidden>
          {["tok₀", "tok₁", "tok₂", "tok₃"].map((t, i) => (
            <motion.div
              key={t}
              className="qkv-attn__tok"
              animate={{
                backgroundColor:
                  step >= 2
                    ? `rgba(61, 214, 198, ${0.12 + (i === 1 ? 0.45 : 0.08)})`
                    : "rgba(255,255,255,0.03)",
                borderColor:
                  step === 0 && i === 1
                    ? "rgba(61, 214, 198, 0.7)"
                    : step === 1
                      ? "rgba(240, 168, 75, 0.45)"
                      : "rgba(255,255,255,0.08)",
                scale: step === 0 && i === 1 ? 1.08 : 1,
              }}
            >
              <code>{t}</code>
              {step >= 2 && i === 1 && <em>query</em>}
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            className="qkv-attn__explain"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            <code>{active.formula}</code>
            <p>{active.detail}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="qkv-attn__formula">
        <code>Attention(Q, K, V) = softmax(QKᵀ / √dₖ) V</code>
        <span>
          Ask (Q) · match labels (K) · blend payloads (V). The √dₖ scale is just
          numerical hygiene.
        </span>
      </div>
    </div>
  );
}
