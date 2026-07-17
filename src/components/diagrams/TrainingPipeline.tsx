import { AnimatePresence, motion } from "framer-motion";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const STAGES = [
  {
    id: "pre",
    title: "Pretraining",
    short: "Learn the world of text & code",
    detail:
      "Train on a huge pile of internet/code: predict the next token again and again. Result = a base model that “speaks” patterns, not an assistant yet. Expensive; done by the lab.",
    tone: "accent" as const,
  },
  {
    id: "ft",
    title: "Fine-tuning",
    short: "Specialize on a narrower job",
    detail:
      "Optional further training on a focused dataset (domain code, a language, a task). Same next-token idea, smaller data. Not every product does a separate public fine-tune step.",
    tone: "muted" as const,
  },
  {
    id: "post",
    title: "Post-training",
    short: "Become a usable assistant",
    detail:
      "Instruction + preference stages teach: answer questions, follow formats, call tools, refuse some asks. This is why ChatGPT ≠ a raw base checkpoint — behaviour, not just knowledge.",
    tone: "warm" as const,
  },
] as const;

/** Vocabulary of training stages — stepped with plain-language detail. */
export function TrainingPipeline() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    STAGES.length,
    2600,
  );
  const stage = STAGES[step]!;

  return (
    <div
      className="training-pipeline training-pipeline--live"
      role="group"
      aria-label="Pretraining, fine-tuning, and post-training stages"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="Training stages"
        steps={STAGES.map((s) => ({ id: s.id, label: s.title }))}
        step={step}
        onStep={setStep}
      />

      <div className="training-pipeline__stages">
        {STAGES.map((s, i) => (
          <motion.button
            key={s.id}
            type="button"
            className={`training-pipeline__stage training-pipeline__stage--${s.tone} ${i === step ? "is-active" : ""}`}
            onClick={() => setStep(i)}
            animate={{ opacity: i === step ? 1 : 0.55, y: i === step ? -4 : 0 }}
            aria-pressed={i === step}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            <strong>{s.title}</strong>
            <p>{s.short}</p>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={stage.id}
          className="training-pipeline__caption"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <strong>{stage.title}.</strong> {stage.detail}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
