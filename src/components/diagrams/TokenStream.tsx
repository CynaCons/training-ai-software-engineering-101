import { motion } from "framer-motion";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const TOKENS = [
  { t: "def", note: "keyword", id: 1268, vec: "0.07  -0.42  0.15  0.88  -0.30" },
  { t: " rate", note: "word", id: 4478, vec: "-0.51  0.22  0.04  -0.19  0.63" },
  { t: "_limit", note: "subword", id: 11925, vec: "0.33  0.10  -0.77  0.25  -0.08" },
  { t: "(", note: "punct", id: 7, vec: "0.02  -0.05  0.11  -0.90  0.44" },
  { t: "req", note: "ident", id: 2035, vec: "-0.14  0.61  0.28  0.05  -0.52" },
  { t: ")", note: "punct", id: 8, vec: "0.09  -0.03  -0.12  0.87  -0.41" },
  { t: ":", note: "punct", id: 25, vec: "-0.20  0.17  0.55  -0.06  0.33" },
] as const;

/** Tokenization → the concrete numbers each token becomes (id + embedding). */
export function TokenStream() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    TOKENS.length,
    900,
  );
  const visible = step + 1;
  const fill = Math.round((visible / TOKENS.length) * 72);
  const active = TOKENS[step]!;

  return (
    <div
      className="token-stream token-stream--live"
      role="group"
      aria-label="Text split into tokens, then each token shown as an id and an embedding vector"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="Tokenization"
        steps={TOKENS.map((tok, i) => ({ id: `${tok.t}-${i}`, label: tok.t.trim() || tok.note }))}
        step={step}
        onStep={setStep}
      />

      <div className="token-stream__main">
        <div className="token-stream__left">
          <p className="token-stream__source">
            <span className="dim">source</span> def rate_limit(req):
          </p>
          <div className="token-stream__chips">
            {TOKENS.map((tok, i) => (
              <motion.button
                key={tok.t + tok.note}
                type="button"
                className={`token-stream__chip ${i <= step ? "is-visible" : ""} ${i === step ? "is-hot" : ""}`}
                initial={false}
                animate={{
                  opacity: i <= step ? 1 : 0.15,
                  y: i <= step ? 0 : 8,
                  scale: i === step ? 1.06 : 1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                onClick={() => setStep(i)}
              >
                <code>{tok.t}</code>
                <span>{tok.note}</span>
              </motion.button>
            ))}
          </div>
          <div className="token-stream__window">
            <span>Context window · {visible} tokens shown</span>
            <div className="token-stream__bar">
              <motion.i
                animate={{ width: `${fill}%` }}
                transition={{ duration: 0.35 }}
              />
            </div>
            <em>Subwords ≠ words — cost, truncation, and memory are in tokens</em>
          </div>
        </div>

        <div className="token-stream__concrete">
          <span className="token-stream__concrete-tag">
            what the model actually stores
          </span>
          <div className="token-stream__rows">
            <div className="token-stream__row">
              <span className="token-stream__k">text</span>
              <code className="token-stream__v">
                {active.t.replace(/ /g, "␣")}
              </code>
              <span className="token-stream__hint">
                a piece of text — never seen as letters again
              </span>
            </div>
            <div className="token-stream__row is-key">
              <span className="token-stream__k">token id</span>
              <code className="token-stream__v">{active.id}</code>
              <span className="token-stream__hint">
                one integer — an index into a ~100k-entry vocabulary
              </span>
            </div>
            <div className="token-stream__row">
              <span className="token-stream__k">embedding</span>
              <code className="token-stream__v">[ {active.vec} … ]</code>
              <span className="token-stream__hint">
                a learned vector — hundreds to thousands of numbers
              </span>
            </div>
          </div>
          <div className="token-stream__formula">
            <code>
              embedding = <b>E</b>[ id ]
            </code>
            <span>just a row lookup in one big learned table</span>
          </div>
        </div>
      </div>

      <p className="token-stream__caption">
        A token isn’t a word — it’s a <strong>number</strong>. Text is chopped
        into pieces, each piece maps to an integer <strong>id</strong>, and the
        model turns that id into a <strong>vector of numbers</strong>.
        Everything after this is math on those vectors.
        <em> ids &amp; vectors here are illustrative.</em>
      </p>
    </div>
  );
}
