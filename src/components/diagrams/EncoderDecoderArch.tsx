import { motion } from "framer-motion";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const STEPS = [
  { id: "job", label: "The job" },
  { id: "read", label: "Read" },
  { id: "write", label: "Write" },
  { id: "gpt", label: "What GPT kept" },
] as const;

const INPUT_TOKENS = ["the", "tests", "pass"];
const OUTPUT_TOKENS = ["die", "Tests", "laufen"];

/** The 2017 Transformer, told through its original job: translation. */
export function EncoderDecoderArch() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    STEPS.length,
    2600,
  );
  const gptView = step === 3;

  return (
    <div
      className="enc-dec enc-dec--live"
      role="group"
      aria-label="The 2017 Transformer explained through translation, and what GPT kept"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="2017 architecture"
        steps={STEPS.map((s) => ({ id: s.id, label: s.label }))}
        step={step}
        onStep={setStep}
      />

      <div className="enc-dec__layout">
        <div className="enc-dec__why">
          <h3>Why this slide</h3>
          <ul>
            <li className={step === 0 ? "is-hot" : ""}>
              The 2017 Transformer was built for <strong>translation</strong> —
              one sentence in, one sentence out.
            </li>
            <li className={step === 1 || step === 2 ? "is-hot" : ""}>
              Two towers: the <strong>encoder reads</strong> the whole input at
              once; the <strong>decoder writes</strong> the output one token at
              a time, peeking back through cross-attention.
            </li>
            <li className={gptView ? "is-hot" : ""}>
              GPT-style models <strong>kept only the writing tower</strong> —
              your prompt is simply the start of the token stream it continues.
            </li>
          </ul>
        </div>

        <div className="enc-dec__machine">
          <div className="enc-dec__io" aria-hidden>
            <span className="enc-dec__io-label">in · English</span>
            {INPUT_TOKENS.map((t) => (
              <motion.code
                key={t}
                className="enc-dec__tok"
                initial={false}
                animate={{ opacity: gptView ? 0.3 : step >= 0 ? 1 : 0.4 }}
              >
                {t}
              </motion.code>
            ))}
          </div>

          <div className="enc-dec__cols">
            <motion.div
              className={`enc-dec__stack ${step === 1 ? "is-hot" : ""}`}
              animate={{
                opacity: gptView ? 0.25 : 1,
                scale: step === 1 ? 1.02 : 1,
              }}
              onClick={() => setStep(1)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setStep(1)}
            >
              <header>
                <span>Encoder · reads</span>
                <strong>Whole input at once</strong>
              </header>
              <ul>
                <li>Self-attention</li>
                <li>Feed-forward</li>
                <li>× N layers</li>
              </ul>
              <footer>Sentence → memory</footer>
            </motion.div>

            <motion.div
              className={`enc-dec__bridge ${step === 2 ? "is-hot" : ""}`}
              animate={{
                opacity: gptView ? 0.2 : step === 2 ? 1 : 0.65,
                scale: step === 2 ? 1.08 : 1,
              }}
              aria-hidden
            >
              <span>cross-attn</span>
            </motion.div>

            <motion.div
              className={`enc-dec__stack enc-dec__stack--decoder ${
                step === 2 ? "is-hot" : ""
              } ${gptView ? "is-kept" : ""}`}
              animate={{ scale: step === 2 || gptView ? 1.02 : 1 }}
              onClick={() => setStep(2)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setStep(2)}
            >
              <header>
                <span>Decoder · writes</span>
                <strong>One token at a time</strong>
              </header>
              <ul>
                <li>Masked self-attention</li>
                <li>Cross-attention</li>
                <li>Feed-forward · × N</li>
              </ul>
              <footer>{gptView ? "= GPT / chat / coding models" : "Previous output → next token"}</footer>
            </motion.div>
          </div>

          <div className="enc-dec__io" aria-hidden>
            <span className="enc-dec__io-label">out · German</span>
            {OUTPUT_TOKENS.map((t, i) => (
              <motion.code
                key={t}
                className="enc-dec__tok enc-dec__tok--out"
                initial={false}
                animate={{ opacity: step >= 2 ? 1 : 0.35 }}
                transition={{ delay: step === 2 ? i * 0.25 : 0 }}
              >
                {t}
              </motion.code>
            ))}
          </div>
        </div>
      </div>

      <p className="enc-dec__caption">
        <strong>One machine, two towers — you only need one of them.</strong>
        <span className="enc-dec__caption-body">
          Translation needs a reader and a writer. Chat and coding models drop
          the reader: the decoder alone continues your prompt token by token.
          Every slide that follows zooms into a piece of this picture.
        </span>
      </p>
    </div>
  );
}
