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
            <strong>A score for every possible next token</strong>
            <em>→ softmax → probabilities · sample one · run again</em>
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
            <em>each token is already a vector of numbers</em>
          </motion.div>
        </div>

        {/* Static explainer — nothing here changes while it plays */}
        <div className="xstack__explain">
          <h3>What’s actually happening</h3>
          <ul>
            <li>
              <strong>Numbers, not rules</strong> — each token is a{" "}
              <em>vector</em> (hundreds–thousands of floats). A block is{" "}
              <em>matrix multiplications</em>, not if/else logic.
            </li>
            <li>
              <strong>Attention mixes tokens</strong> — every token’s vector
              pulls in the others <em>across the whole sequence</em>, by a
              weighted sum. This is where words relate to each other.
            </li>
            <li>
              <strong>Feed-forward digests each</strong> — then every vector is
              transformed <em>on its own</em> (multiply + a simple non-linear
              step).
            </li>
            <li>
              <strong>The statistics live in the weights</strong> — learned
              from data. Running the model is fixed arithmetic that ends in a{" "}
              <em>probability for every next token</em>.
            </li>
          </ul>
        </div>
      </div>

      <p className="xstack__caption">
        So it’s <strong>computation, not lookup</strong> — matrix math on token
        vectors, one block repeated N times (the “layers” on a model card).
      </p>
    </div>
  );
}
