import { AnimatePresence, motion } from "framer-motion";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const EXPERTS = ["Code", "Lang", "Math", "Other"] as const;
const ROUTES = [
  {
    token: "rate_",
    hot: [0, 1] as const,
    blurb:
      "For this identifier-like piece, the router wakes Code + Lang experts — not the whole network.",
  },
  {
    token: "∫",
    hot: [2] as const,
    blurb:
      "A math-heavy token can route to a Math specialist. Same model, sparse compute.",
  },
  {
    token: "the",
    hot: [1] as const,
    blurb:
      "Common English glue often hits the language expert. Uneven quality across domains is normal.",
  },
] as const;

/** Animated MoE routing — token → router → lit experts. */
export function MoERouter() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    ROUTES.length,
    2000,
  );
  const route = ROUTES[step]!;

  return (
    <div
      className="moe-router moe-router--live"
      role="group"
      aria-label="Animated Mixture of Experts router"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="MoE router"
        steps={ROUTES.map((r, i) => ({ id: `${r.token}-${i}`, label: r.token }))}
        step={step}
        onStep={setStep}
      />

      <div className="moe-router__flow">
        <AnimatePresence mode="wait">
          <motion.div
            key={route.token}
            className="moe-router__token"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
          >
            <span>Token</span>
            <strong>{route.token}</strong>
          </motion.div>
        </AnimatePresence>
        <motion.div
          className="moe-router__hub"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.2 }}
        >
          <span>Router</span>
          <strong>pick experts</strong>
        </motion.div>
        <div className="moe-router__experts">
          {EXPERTS.map((name, i) => {
            const on = (route.hot as readonly number[]).includes(i);
            return (
              <motion.div
                key={name}
                className={`moe-router__expert ${on ? "is-hot" : ""}`}
                animate={{
                  scale: on ? 1.08 : 0.96,
                  opacity: on ? 1 : 0.4,
                }}
              >
                {name}
              </motion.div>
            );
          })}
        </div>
      </div>
      <p className="moe-router__caption">
        <strong>MoE in one line:</strong> replace the dense FFN with many “expert”
        FFNs and a tiny router that picks a few per token. {route.blurb} Model
        cards brag about parameter count — active compute per token can stay
        lower.
      </p>
    </div>
  );
}
