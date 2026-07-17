import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const HEADS = [
  {
    id: "h1",
    label: "Head 1",
    focus: "Syntax / brackets",
    detail:
      "One attention pass averages everything. Multiple heads = several specialists in parallel. This one might track ( ) / { } nesting so the model doesn’t invent broken structure.",
  },
  {
    id: "h2",
    label: "Head 2",
    focus: "Names ↔ defs",
    detail:
      "Another head can specialize in “where was this name defined?” — crucial for code. Same math as Head 1, different learned projections.",
  },
  {
    id: "h3",
    label: "Head 3",
    focus: "Local neighbors",
    detail:
      "Short-range glue: adjacent words and local phrases. Not every relationship is long-distance; some heads stay local on purpose.",
  },
  {
    id: "h4",
    label: "Head 4",
    focus: "Long-range theme",
    detail:
      "Coarser cues across the window — file topic, API style, “we’re in a React component.” Together, heads cover different kinds of “look at.”",
  },
] as const;

/** Clickable multi-head fan-out with autoplay. */
export function MultiHeadAttention() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    HEADS.length,
    2000,
  );
  const [merged, setMerged] = useState(false);
  const head = HEADS[step]!;

  return (
    <div
      className="mha mha--live"
      role="group"
      aria-label="Interactive multi-head attention"
    >
      <div className="mha__toolbar">
        <DiagramPlaybar
          playing={playing}
          onToggle={toggle}
          onNext={next}
          label="Multi-head"
          steps={HEADS.map((h) => ({ id: h.id, label: h.label }))}
          step={step}
          onStep={(i) => {
            setMerged(false);
            setStep(i);
          }}
        />
        <button
          type="button"
          className={`diagram-playbar__btn ${merged ? "is-lit" : ""}`}
          onClick={() => setMerged((m) => !m)}
        >
          {merged ? "Heads" : "Concat → W_O"}
        </button>
      </div>

      <div className="mha__layout">
        <div className="mha__in">
          <span>Input</span>
          <strong>d_model</strong>
        </div>

        <div className="mha__heads">
          {HEADS.map((h, i) => (
            <motion.button
              key={h.id}
              type="button"
              className={`mha__head ${i === step && !merged ? "is-active" : ""} ${merged ? "is-merged" : ""}`}
              onClick={() => {
                setMerged(false);
                setStep(i);
              }}
              animate={{
                opacity: merged || i === step ? 1 : 0.45,
                y: merged ? 0 : i === step ? -2 : 0,
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              aria-pressed={i === step && !merged}
            >
              <strong>{h.label}</strong>
              <span>{h.focus}</span>
            </motion.button>
          ))}
        </div>

        <motion.div
          className={`mha__out ${merged ? "is-active" : ""}`}
          animate={{ scale: merged ? 1.04 : 1 }}
        >
          <span>Concat → W_O</span>
          <strong>{merged ? "Richer vector" : "Await merge"}</strong>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={merged ? "merge" : head.id}
          className="mha__caption"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {merged ? (
            <>
              <strong>Merge:</strong> concatenate all heads, then a linear layer
              (W_O) → one vector that kept <em>several</em> relationship types at
              once. Vaswani used h = 8; modern models use many more.
            </>
          ) : (
            <>
              <strong>{head.label}.</strong> {head.detail}
            </>
          )}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
