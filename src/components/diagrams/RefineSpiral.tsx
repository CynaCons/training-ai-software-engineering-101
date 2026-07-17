import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import "./diagrams.css";

const STAGES = [
  { n: "01", label: "Idea", detail: "In your head" },
  { n: "02", label: "Draft", detail: "PRD.md dump" },
  { n: "03", label: "Gaps", detail: "Agent questions" },
  { n: "04", label: "Ready", detail: "Can guide build" },
] as const;

/** Circular / radial refinement — a sweeping arm cycles the stages. */
export function RefineSpiral() {
  const reduceMotion = useReducedMotion();
  // Monotonic counter so the arm always sweeps forward instead of unwinding.
  const [count, setCount] = useState(0);
  const step = count % STAGES.length;

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setCount((c) => c + 1), 1900);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <div
      className="refine-spiral"
      role="group"
      aria-label="Refine PRD with the agent in cycles"
    >
      <div className="refine-spiral__orbit">
        <div className="refine-spiral__ring" aria-hidden />
        {!reduceMotion && (
          <motion.div
            className="refine-spiral__arm"
            animate={{ rotate: -90 + count * 90 }}
            transition={{ type: "spring", stiffness: 60, damping: 14 }}
            aria-hidden
          >
            <i />
          </motion.div>
        )}
        {STAGES.map((stage, i) => {
          const angle = -90 + i * 90;
          return (
            <div
              key={stage.n}
              className={`refine-spiral__node ${i === step ? "is-live" : ""}`}
              style={{
                ["--a" as string]: `${angle}deg`,
              }}
            >
              <span>{stage.n}</span>
              <strong>{stage.label}</strong>
              <em>{stage.detail}</em>
            </div>
          );
        })}
        <div className="refine-spiral__core">
          <span>PRD.md</span>
          <small>co-write</small>
        </div>
      </div>
      <p className="refine-spiral__caption">
        You don’t need every detail by heart — iterate with the agent until the
        vision can steer the rest of development.
      </p>
    </div>
  );
}
