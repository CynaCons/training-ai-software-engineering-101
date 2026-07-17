import { motion } from "framer-motion";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const SIZES = [
  {
    id: "tiny",
    label: "~1B",
    name: "Tiny",
    runsOn: "laptop / phone",
    buys: "autocomplete, classification, quick drafts",
    width: 22,
  },
  {
    id: "small",
    label: "~8B",
    name: "Small",
    runsOn: "one consumer GPU",
    buys: "solid chat, summaries, simple code edits",
    width: 42,
  },
  {
    id: "mid",
    label: "~70B",
    name: "Mid",
    runsOn: "multi-GPU server",
    buys: "strong reasoning, real coding help",
    width: 68,
  },
  {
    id: "frontier",
    label: "~1T-class",
    name: "Frontier",
    runsOn: "datacenter",
    buys: "agentic coding — what this training uses",
    width: 100,
    tone: "accent",
  },
] as const;

/** Parameters = the learned knobs; the count is the model's capacity. */
export function ParameterScale() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    SIZES.length,
    2200,
  );

  return (
    <div
      className="param-scale"
      role="group"
      aria-label="What parameters are and what different parameter counts buy"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="Model sizes"
        steps={SIZES.map((s) => ({ id: s.id, label: s.label }))}
        step={step}
        onStep={setStep}
      />

      <div className="param-scale__layout">
        <div className="param-scale__what">
          <h3>What is a parameter?</h3>
          <p>
            One <strong>learned number</strong> inside the network — a knob
            training turned until next-token predictions got good. The weights
            in every attention and FFN layer you just saw are parameters.
          </p>
          <p>
            “<strong>7B</strong>” means seven billion of them. The count is the
            model’s <strong>capacity</strong>: how much pattern it can store.
          </p>
        </div>

        <div className="param-scale__bars">
          {SIZES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={`param-scale__row ${i === step ? "is-active" : ""} ${
                "tone" in s ? "param-scale__row--accent" : ""
              }`}
              onClick={() => setStep(i)}
            >
              <span className="param-scale__count">{s.label}</span>
              <span className="param-scale__track">
                <motion.i
                  initial={false}
                  animate={{
                    width: `${s.width}%`,
                    opacity: i === step ? 1 : 0.45,
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
              <span className="param-scale__meta">
                <strong>
                  {s.name} · {s.runsOn}
                </strong>
                <span>{s.buys}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <p className="param-scale__caption">
        More parameters → more capacity, but slower and costlier per token —
        and size isn’t everything: training data and post-training decide how
        well those knobs are used.
      </p>
    </div>
  );
}
