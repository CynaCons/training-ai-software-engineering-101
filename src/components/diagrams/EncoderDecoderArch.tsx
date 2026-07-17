import { motion } from "framer-motion";
import { useState } from "react";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const VIEWS = [
  {
    id: "enc",
    label: "Encoder",
    layers: ["Self-attention", "Feed-forward", "× N layers"],
    footer: "Source tokens → memory",
  },
  {
    id: "cross",
    label: "Cross",
    layers: ["Q from decoder", "K,V from encoder", "Align & copy cues"],
    footer: "Memory ↔ generation",
  },
  {
    id: "dec",
    label: "Decoder",
    layers: ["Masked self-attention", "Cross-attention", "Feed-forward", "× N"],
    footer: "Previous outputs → next token",
  },
] as const;

/** Interactive 2017 Transformer dual-stack. */
export function EncoderDecoderArch() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    VIEWS.length,
    2400,
  );
  const [solo, setSolo] = useState(false);

  return (
    <div
      className="enc-dec enc-dec--live"
      role="group"
      aria-label="Interactive 2017 Transformer encoder-decoder"
    >
      <div className="enc-dec__toolbar">
        <DiagramPlaybar
          playing={playing}
          onToggle={toggle}
          onNext={next}
          label="2017 architecture"
          steps={VIEWS.map((v) => ({ id: v.id, label: v.label }))}
          step={step}
          onStep={setStep}
        />
        <button
          type="button"
          className={`diagram-playbar__btn ${solo ? "is-lit" : ""}`}
          onClick={() => setSolo((s) => !s)}
        >
          {solo ? "Show both" : "Focus"}
        </button>
      </div>

      <div className="enc-dec__cols">
        <motion.div
          className={`enc-dec__stack ${step === 0 ? "is-hot" : ""}`}
          animate={{
            opacity: solo && step !== 0 ? 0.25 : 1,
            scale: step === 0 ? 1.02 : 1,
          }}
          onClick={() => setStep(0)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setStep(0)}
        >
          <header>
            <span>Encoder</span>
            <strong>Bidirectional over input</strong>
          </header>
          <ul>
            {VIEWS[0].layers.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <footer>{VIEWS[0].footer}</footer>
        </motion.div>

        <motion.div
          className={`enc-dec__bridge ${step === 1 ? "is-hot" : ""}`}
          animate={{ opacity: step === 1 ? 1 : 0.65, scale: step === 1 ? 1.08 : 1 }}
          aria-hidden
        >
          <span>cross-attn</span>
        </motion.div>

        <motion.div
          className={`enc-dec__stack enc-dec__stack--decoder ${step === 2 ? "is-hot" : ""}`}
          animate={{
            opacity: solo && step !== 2 ? 0.25 : 1,
            scale: step === 2 ? 1.02 : 1,
          }}
          onClick={() => setStep(2)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setStep(2)}
        >
          <header>
            <span>Decoder</span>
            <strong>Autoregressive output</strong>
          </header>
          <ul>
            {VIEWS[2].layers.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <footer>{VIEWS[2].footer}</footer>
        </motion.div>
      </div>

      <p className="enc-dec__caption">
        <strong>One machine, two jobs.</strong>
        <span className="enc-dec__caption-body">
          The encoder reads the whole input at once and builds a memory of it.
          The decoder writes the output one token at a time, peeking back at
          that memory through cross-attention. Chat models later keep only the
          decoder’s writing habit.
        </span>
      </p>
    </div>
  );
}
