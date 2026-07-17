import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import "./diagrams.css";

const TIERS = [
  {
    n: "01",
    title: "Read the world",
    tools: "ls · cat · grep",
    detail: "bash gave models eyes — inspect files, dirs, build output",
  },
  {
    n: "02",
    title: "Change the world",
    tools: "patch · git apply · edit tools",
    detail: "then hands — precise, reviewable edits in the repo",
  },
  {
    n: "03",
    title: "Operate independently",
    tools: "read + edit + run, chained",
    detail: "enough to work a project on its own, turn after turn",
    hot: true,
  },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

/** Owner arc: how tool use escalated into “can work in a project.” */
export function ToolReach() {
  const reduceMotion = useReducedMotion();
  const [live, setLive] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(
      () => setLive((s) => (s + 1) % TIERS.length),
      2100,
    );
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <div
      className="tool-reach"
      role="group"
      aria-label="Tools escalate: read the world, change the world, operate independently"
    >
      <div className="tool-reach__row">
        {TIERS.map((tier, i) => (
          <motion.div
            key={tier.n}
            className={`tool-reach__tier ${"hot" in tier && tier.hot ? "tool-reach__tier--hot" : ""} ${
              i === live ? "is-live" : ""
            }`}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 * i, duration: 0.45, ease: EASE }}
            onClick={() => setLive(i)}
          >
            <span className="tool-reach__n">{tier.n}</span>
            <strong>{tier.title}</strong>
            <code>{tier.tools}</code>
            <em>{tier.detail}</em>
            {i < TIERS.length - 1 && (
              <span className="tool-reach__arrow" aria-hidden>
                →
              </span>
            )}
          </motion.div>
        ))}
      </div>
      <p className="tool-reach__caption">
        Every tool call is a <strong>side effect in your workspace</strong> —
        treat the agent like a junior engineer with commit access. Prefer
        edit → test → fix, and keep destructive actions behind approval.
      </p>
    </div>
  );
}
