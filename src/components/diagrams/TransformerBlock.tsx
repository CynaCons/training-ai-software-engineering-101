import { motion } from "framer-motion";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const STEPS = [
  { id: "stream", label: "Stream" },
  { id: "attn", label: "Attention" },
  { id: "ffn", label: "Feed-forward" },
  { id: "stack", label: "× N" },
] as const;

const DEPTHS = [
  { name: "GPT-2", n: 12 },
  { name: "Llama-3-8B", n: 32 },
  { name: "Llama-3-70B", n: 80 },
  { name: "GPT-3", n: 96 },
];

/** One block: where the weight matrices are, what runs, how many stack. */
export function TransformerBlock() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    STEPS.length,
    2600,
  );

  return (
    <div
      className="tblock"
      role="group"
      aria-label="Anatomy of one transformer block: weight matrices, operations, and stack depth"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="Inside one block"
        steps={STEPS.map((s) => ({ id: s.id, label: s.label }))}
        step={step}
        onStep={setStep}
      />

      <div className="tblock__stage">
        <div className="tblock__schematic">
          <div className={`tblock__stream ${step === 0 ? "is-hot" : ""}`}>
            residual stream · one <b>d</b>-vector per token
          </div>

          <motion.div
            className={`tblock__sub ${step === 1 ? "is-hot" : ""}`}
            animate={{ opacity: step >= 1 ? 1 : 0.55 }}
          >
            <span className="tblock__sub-tag">Self-attention</span>
            <div className="tblock__ops">
              <span className="tblock__op">LayerNorm</span>
              <span className="tblock__arrow">→</span>
              <span className="tblock__w">
                W<sub>Q</sub> W<sub>K</sub> W<sub>V</sub>
                <em>d×d</em>
              </span>
              <span className="tblock__arrow">→</span>
              <span className="tblock__op tblock__op--calc">
                softmax(QKᵀ/√d)·V
              </span>
              <span className="tblock__arrow">→</span>
              <span className="tblock__w">
                W<sub>O</sub>
                <em>d×d</em>
              </span>
              <span className="tblock__add">⊕</span>
            </div>
          </motion.div>

          <motion.div
            className={`tblock__sub tblock__sub--ffn ${step === 2 ? "is-hot" : ""}`}
            animate={{ opacity: step >= 2 ? 1 : 0.55 }}
          >
            <span className="tblock__sub-tag">Feed-forward (per token)</span>
            <div className="tblock__ops">
              <span className="tblock__op">LayerNorm</span>
              <span className="tblock__arrow">→</span>
              <span className="tblock__w tblock__w--warm">
                W<sub>up</sub>
                <em>d×4d</em>
              </span>
              <span className="tblock__arrow">→</span>
              <span className="tblock__op tblock__op--calc">GELU</span>
              <span className="tblock__arrow">→</span>
              <span className="tblock__w tblock__w--warm">
                W<sub>down</sub>
                <em>4d×d</em>
              </span>
              <span className="tblock__add">⊕</span>
            </div>
          </motion.div>

          <div className={`tblock__repeat ${step === 3 ? "is-hot" : ""}`}>
            ↻ same block, stacked <b>× N</b>
          </div>
        </div>

        <div className="tblock__side">
          <div className="tblock__card">
            <span className="tblock__card-tag">where the weights live</span>
            <ul>
              <li>
                <code>W_Q, W_K, W_V, W_O</code> — attention, 4 × (d×d)
              </li>
              <li>
                <code>W_up, W_down</code> — FFN, ~⅔ of the block’s params
              </li>
              <li>
                LayerNorm scale/bias — tiny; the matrices hold nearly all of it
              </li>
            </ul>
            <div className="tblock__formula">
              ≈ 12 · d² weights per block
            </div>
          </div>

          <div className={`tblock__card ${step === 3 ? "is-hot" : ""}`}>
            <span className="tblock__card-tag">how many blocks · N = “layers”</span>
            <div className="tblock__depths">
              {DEPTHS.map((d) => (
                <div key={d.name} className="tblock__depth">
                  <span className="tblock__depth-name">{d.name}</span>
                  <span className="tblock__depth-bar">
                    <i style={{ width: `${(d.n / 96) * 100}%` }} />
                  </span>
                  <span className="tblock__depth-n">{d.n}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="tblock__caption">
        <strong>The whole model is this block, repeated.</strong> Each one reads
        the residual stream, runs attention then a feed-forward net — all matrix
        multiplies plus softmax/GELU — and adds the result back. Multiply
        params-per-block by N and you get the model’s size.
      </p>
    </div>
  );
}
