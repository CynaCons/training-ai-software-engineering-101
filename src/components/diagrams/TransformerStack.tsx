import { motion } from "framer-motion";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

/** Pipeline stages, bottom to top. */
const STAGES = [
  { id: "in", label: "Tokens in" },
  { id: "b1", label: "Block 1" },
  { id: "b2", label: "Block 2" },
  { id: "bn", label: "× N" },
  { id: "out", label: "Predict" },
] as const;

/** Tokens in → same block stacked N times → next-token scores out. */
export function TransformerStack() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    STAGES.length,
    1500,
  );

  const stageClass = (i: number) =>
    `xstack__stage ${i === step ? "is-hot" : ""} ${i <= step ? "is-on" : ""}`;

  return (
    <div
      className="xstack"
      role="group"
      aria-label="Transformer: tokens flow up through repeated blocks to a next-token prediction"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="Transformer stack"
        steps={STAGES.map((s) => ({ id: s.id, label: s.label }))}
        step={step}
        onStep={setStep}
      />

      <div className="xstack__layout">
        {/* Pipeline column — rendered top-down, data flows bottom-up */}
        <div className="xstack__pipe">
          <motion.div
            className={`xstack__io xstack__io--out ${stageClass(4)}`}
            onClick={() => setStep(4)}
            animate={{ y: step === 4 ? -3 : 0 }}
          >
            <span className="xstack__tag">Out</span>
            <strong>Scores for every possible next token</strong>
            <em>pick one · append it · run again</em>
          </motion.div>

          <div className="xstack__flow" aria-hidden>
            ↑
          </div>

          <motion.div
            className={`xstack__block ${stageClass(3)}`}
            onClick={() => setStep(3)}
            animate={{ y: step === 3 ? -3 : 0 }}
          >
            <span className="xstack__tag">Block N</span>
            <div className="xstack__dots" aria-hidden>
              ⋮
            </div>
            <em>same recipe, repeated 30–100×</em>
          </motion.div>

          <div className="xstack__flow" aria-hidden>
            ↑
          </div>

          <motion.div
            className={`xstack__block ${stageClass(2)}`}
            onClick={() => setStep(2)}
            animate={{ y: step === 2 ? -3 : 0 }}
          >
            <span className="xstack__tag">Block 2</span>
            <div className="xstack__parts">
              <span className="xstack__part xstack__part--attn">Attention</span>
              <span className="xstack__part xstack__part--ffn">Feed-forward</span>
            </div>
          </motion.div>

          <div className="xstack__flow" aria-hidden>
            ↑
          </div>

          <motion.div
            className={`xstack__block ${stageClass(1)}`}
            onClick={() => setStep(1)}
            animate={{ y: step === 1 ? -3 : 0 }}
          >
            <span className="xstack__tag">Block 1</span>
            <div className="xstack__parts">
              <span className="xstack__part xstack__part--attn">Attention</span>
              <span className="xstack__part xstack__part--ffn">Feed-forward</span>
            </div>
          </motion.div>

          <div className="xstack__flow" aria-hidden>
            ↑
          </div>

          <motion.div
            className={`xstack__io ${stageClass(0)}`}
            onClick={() => setStep(0)}
            animate={{ y: step === 0 ? -3 : 0 }}
          >
            <span className="xstack__tag">In</span>
            <div className="xstack__tokens" aria-hidden>
              <code>The</code>
              <code>robot</code>
              <code>picked</code>
              <code>…</code>
            </div>
          </motion.div>
        </div>

        {/* Static explainer — nothing here changes while it plays */}
        <div className="xstack__explain">
          <h3>One simple block, stacked</h3>
          <ul>
            <li>
              <strong>Attention</strong> — every word looks back and pulls in
              the earlier words that matter (the previous slide).
            </li>
            <li>
              <strong>Feed-forward</strong> — then each word is processed on
              its own: mix first, digest second.
            </li>
            <li>
              <strong>Stack it</strong> — the same block repeats N times;
              each pass builds a richer understanding.
            </li>
            <li>
              <strong>Top of the stack</strong> — score every candidate next
              token, emit one, and run the whole thing again.
            </li>
          </ul>
        </div>
      </div>

      <p className="xstack__caption">
        That’s the entire trick. A modern LLM is this <strong>one block
        repeated</strong> — “layers” on a model card = how many times — run
        once per token it writes.
      </p>
    </div>
  );
}
