import { AnimatePresence, motion } from "framer-motion";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const TOKENS = ["the", "cat", "sat", "on"] as const;

/** Step through query rows — causal triangle lights up progressively. */
export function CausalMask() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    TOKENS.length,
    1600,
  );
  const query = TOKENS[step]!;

  return (
    <div
      className="causal-mask causal-mask--live"
      role="group"
      aria-label="Animated causal attention mask"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="Causal mask"
        steps={TOKENS.map((t) => ({ id: t, label: t }))}
        step={step}
        onStep={setStep}
      />

      <div className="causal-mask__live">
        <div className="causal-mask__grid-wrap">
          <table className="causal-mask__grid">
            <thead>
              <tr>
                <th aria-hidden />
                {TOKENS.map((t) => (
                  <th key={t}>
                    <code>{t}</code>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TOKENS.map((row, i) => (
                <tr key={row} className={i === step ? "is-query" : ""}>
                  <th>
                    <button type="button" onClick={() => setStep(i)}>
                      <code>{row}</code>
                    </button>
                  </th>
                  {TOKENS.map((col, j) => {
                    const allowed = j <= i;
                    const revealed = i <= step;
                    const isFocus = i === step && allowed;
                    return (
                      <motion.td
                        key={`${row}-${col}`}
                        className={
                          !allowed
                            ? "is-off"
                            : isFocus
                              ? "is-focus"
                              : revealed
                                ? "is-on"
                                : "is-dim"
                        }
                        animate={{
                          scale: isFocus ? 1.12 : 1,
                          opacity: revealed || !allowed ? 1 : 0.25,
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                        title={
                          allowed
                            ? `${row} can attend to ${col}`
                            : `${row} cannot see future ${col}`
                        }
                      >
                        {allowed ? "●" : "·"}
                      </motion.td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="causal-mask__axis">
            Click a row or play — only the lower triangle is visible
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={query}
            className="causal-mask__callout"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <span>Query</span>
            <strong>
              <code>{query}</code>
            </strong>
            <p>
              Predicting after <code>{query}</code>, the model may only use:{" "}
              {TOKENS.slice(0, step + 1).join(", ")}. Later words are blocked —
              otherwise training would cheat by reading the answer.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="causal-mask__caption">
        <strong>Why “causal”?</strong> Cause must precede effect: you can’t use
        future tokens to invent the present one. That rule is why chat streams
        left→right — and why a KV cache of past keys/values stays valid forever.
      </p>
    </div>
  );
}
