import { AnimatePresence, motion } from "framer-motion";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const STEPS = [
  { id: "t1", label: "t₁", kv: "K₁ V₁" },
  { id: "t2", label: "t₂", kv: "K₂ V₂" },
  { id: "t3", label: "t₃", kv: "K₃ V₃" },
  { id: "tn", label: "tₙ", kv: "Kₙ Vₙ" },
] as const;

/** Growing KV cache animation with cost comparison. */
export function KvCache() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    STEPS.length,
    1400,
  );
  const filled = step + 1;
  const naivePct = Math.min(98, 28 + filled * 18);
  const cachePct = Math.min(48, 12 + filled * 6);

  return (
    <div
      className="kv-cache kv-cache--live"
      role="group"
      aria-label="Animated KV cache during generation"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="KV cache"
        steps={STEPS.map((s) => ({ id: s.id, label: s.label }))}
        step={step}
        onStep={setStep}
      />

      <div className="kv-cache__row">
        <AnimatePresence initial={false}>
          {STEPS.slice(0, filled).map((s, i) => (
            <motion.div
              key={s.id}
              className={`kv-cache__cell ${i === step ? "kv-cache__cell--new" : "kv-cache__cell--cached"}`}
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 360, damping: 24 }}
              layout
            >
              <span>{s.label}</span>
              <code>{s.kv}</code>
              {i === step && <em className="kv-cache__tag">new Q</em>}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="kv-cache__bars">
        <div>
          <span>Without cache · recompute prefix</span>
          <div className="kv-cache__bar">
            <motion.i
              animate={{ width: `${naivePct}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <em>Naive: redo Q,K,V for the whole prefix every new token</em>
        </div>
        <div>
          <span>With KV cache · append only</span>
          <div className="kv-cache__bar kv-cache__bar--good">
            <motion.i
              animate={{ width: `${cachePct}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <em>Smart: store past K/V; only compute the new token’s Q (and its K/V)</em>
        </div>
      </div>

      <p className="kv-cache__caption">
        <strong>Plain terms:</strong> generating token 100 shouldn’t re-read tokens
        1…99 from scratch. The cache remembers their keys/values.{" "}
        <em>But</em> a huge chat still costs RAM and attention work — cache ≠ free
        infinite context.
      </p>
    </div>
  );
}
