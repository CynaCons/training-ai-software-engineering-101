import { motion } from "framer-motion";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const TOKENS = [
  { t: "def", note: "keyword" },
  { t: " rate", note: "word" },
  { t: "_limit", note: "subword" },
  { t: "(", note: "punct" },
  { t: "req", note: "ident" },
  { t: ")", note: "punct" },
  { t: ":", note: "punct" },
] as const;

/** Animated tokenization — chips appear one by one. */
export function TokenStream() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    TOKENS.length,
    700,
  );
  const visible = step + 1;
  const fill = Math.round((visible / TOKENS.length) * 72);

  return (
    <div
      className="token-stream token-stream--live"
      role="group"
      aria-label="Animated text split into tokens"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="Tokenization"
        steps={TOKENS.map((tok, i) => ({ id: `${tok.t}-${i}`, label: tok.t.trim() || tok.note }))}
        step={step}
        onStep={setStep}
      />

      <p className="token-stream__source">
        <span className="dim">source</span> def rate_limit(req):
      </p>
      <div className="token-stream__chips">
        {TOKENS.map((tok, i) => (
          <motion.button
            key={tok.t + tok.note}
            type="button"
            className={`token-stream__chip ${i <= step ? "is-visible" : ""} ${i === step ? "is-hot" : ""}`}
            initial={false}
            animate={{
              opacity: i <= step ? 1 : 0.15,
              y: i <= step ? 0 : 8,
              scale: i === step ? 1.06 : 1,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            onClick={() => setStep(i)}
          >
            <code>{tok.t}</code>
            <span>{tok.note}</span>
          </motion.button>
        ))}
      </div>
      <div className="token-stream__window">
        <span>Context window · {visible} tokens shown</span>
        <div className="token-stream__bar">
          <motion.i
            animate={{ width: `${fill}%` }}
            transition={{ duration: 0.35 }}
          />
        </div>
        <em>Subwords ≠ words — cost, truncation, and memory are in tokens</em>
      </div>
    </div>
  );
}
