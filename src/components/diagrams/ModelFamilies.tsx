import { motion } from "framer-motion";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const FAMILIES = [
  {
    id: "enc",
    title: "Encoder-only",
    example: "BERT-era",
    detail:
      "Reads both directions — great for classify / embed / fill-the-blank. Awkward at open-ended “keep writing.” Think: understanding engine, not chatbot.",
    tone: "muted" as const,
  },
  {
    id: "encdec",
    title: "Encoder–decoder",
    example: "T5 / original MT",
    detail:
      "Two towers: digest input, then write output while looking back. Classic translation & many seq2seq tasks. Heavier than a single stack.",
    tone: "warm" as const,
  },
  {
    id: "dec",
    title: "Decoder-only",
    example: "GPT / Llama / Claude…",
    detail:
      "One causal stack that only predicts the next token. Simple, scalable, and the shape behind Cursor / Claude Code / ChatGPT-style coding agents.",
    tone: "hot" as const,
  },
] as const;

/** Spotlight each family; land on decoder-only. */
export function ModelFamilies() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    FAMILIES.length,
    2200,
  );

  return (
    <div
      className="model-families model-families--live"
      role="group"
      aria-label="Transformer family spotlight"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="Model families"
        steps={FAMILIES.map((f) => ({ id: f.id, label: f.title }))}
        step={step}
        onStep={setStep}
      />

      <div className="model-families__cols">
        {FAMILIES.map((f, i) => (
          <motion.button
            key={f.id}
            type="button"
            className={`model-families__card model-families__card--${f.tone} ${i === step ? "is-active" : ""}`}
            onClick={() => setStep(i)}
            animate={{
              opacity: i === step ? 1 : 0.75,
              y: i === step ? -6 : 0,
              scale: i === step ? 1.02 : 1,
            }}
            whileTap={{ scale: 0.97 }}
            aria-pressed={i === step}
          >
            <span>{f.example}</span>
            <strong>{f.title}</strong>
            <p>{f.detail}</p>
          </motion.button>
        ))}
      </div>
      <p className="model-families__caption">
        <strong>Takeaway:</strong> when someone says “the LLM,” they almost always
        mean <em>decoder-only</em> — not BERT, not the full 2017 translator. Same
        attention math; different wiring.
      </p>
    </div>
  );
}
