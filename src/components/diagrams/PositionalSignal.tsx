import { AnimatePresence, motion } from "framer-motion";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const MODES = [
  {
    id: "abs",
    label: "Absolute",
    title: "Stamp an index on each token",
    tag: "Classic (2017)",
    detail:
      "Problem: attention alone doesn’t know order — “dog bites man” vs “man bites dog” would look the same if we shuffled tokens. Fix: add a position vector (sinusoidal or learned) to each embedding.",
    code: "x = emb(token) + pos(i)",
  },
  {
    id: "rope",
    label: "RoPE",
    title: "Encode distance by rotating Q & K",
    tag: "Modern LLMs",
    detail:
      "Instead of adding a fixed “seat number,” rotate the query/key vectors by an angle that depends on position. Relative distance falls out of the math — usually better when context gets long (Su et al., RoPE).",
    code: "attend(rotate(Q,i), rotate(K,j))",
  },
] as const;

/** Toggle absolute vs RoPE with a simple rotation visual. */
export function PositionalSignal() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    MODES.length,
    2800,
  );
  const mode = MODES[step]!;

  return (
    <div
      className="pos-signal pos-signal--live"
      role="group"
      aria-label="Positional encodings absolute vs RoPE"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="Positions"
        steps={MODES.map((m) => ({ id: m.id, label: m.label }))}
        step={step}
        onStep={setStep}
      />

      <div className="pos-signal__cols">
        {MODES.map((m, i) => (
          <motion.button
            key={m.id}
            type="button"
            className={`pos-signal__card ${i === 1 ? "pos-signal__card--accent" : ""} ${i === step ? "is-active" : ""}`}
            onClick={() => setStep(i)}
            animate={{
              opacity: i === step ? 1 : 0.55,
              scale: i === step ? 1.02 : 0.98,
            }}
            aria-pressed={i === step}
          >
            <span className="pos-signal__tag">{m.tag}</span>
            <strong>{m.title}</strong>
            <p>{m.detail}</p>
            <code>{m.code}</code>
          </motion.button>
        ))}
      </div>

      <div className="pos-signal__orbit" aria-hidden>
        <motion.div
          className="pos-signal__rotor"
          animate={{ rotate: step === 1 ? 360 : 0 }}
          transition={{
            duration: step === 1 ? 2.4 : 0.6,
            repeat: step === 1 ? Infinity : 0,
            ease: "linear",
          }}
        >
          <span>Q</span>
          <span>K</span>
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.em
            key={mode.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {step === 0 ? "add vector at index i" : "rotate by angle θ(i)"}
          </motion.em>
        </AnimatePresence>
      </div>

      <p className="pos-signal__caption">
        <strong>Why you care:</strong> long-context models advertise big windows —
        the position scheme (often RoPE or a cousin) is part of why that works.
        You don’t tune it; you feel it when “the model lost track of order.”
      </p>
    </div>
  );
}
