import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import "./diagrams.css";

export interface FlowStep {
  label: string;
  detail?: string;
  tone?: "accent" | "warm" | "muted";
}

interface FlowStepsProps {
  steps: FlowStep[];
  caption?: string;
  /** Accessible name for the diagram */
  label: string;
}

/**
 * Horizontal signal-flow steps. All text stays readable at rest; a soft
 * highlight travels the pipeline. Clicking a step pins the highlight there.
 */
export function FlowSteps({ steps, caption, label }: FlowStepsProps) {
  const reduceMotion = useReducedMotion();
  const [live, setLive] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (reduceMotion || pinned || steps.length <= 1) return;
    const id = window.setInterval(() => {
      setLive((s) => (s + 1) % steps.length);
    }, 2000);
    return () => window.clearInterval(id);
  }, [reduceMotion, pinned, steps.length]);

  return (
    <div className="flow-steps" role="group" aria-label={label}>
      <ol className="flow-steps__row">
        {steps.map((step, i) => (
          <motion.li
            key={`${step.label}-${i}`}
            className={`flow-steps__step flow-steps__step--${step.tone ?? "accent"} ${
              i === live ? "is-live" : ""
            }`}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.07 * i,
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={() => {
              setLive(i);
              setPinned(true);
            }}
          >
            <span className="flow-steps__idx">
              {String(i + 1).padStart(2, "0")}
            </span>
            <strong>{step.label}</strong>
            {step.detail && <span>{step.detail}</span>}
            {i < steps.length - 1 && (
              <span className="flow-steps__arrow" aria-hidden>
                →
              </span>
            )}
          </motion.li>
        ))}
      </ol>
      {caption && <p className="flow-steps__caption">{caption}</p>}
    </div>
  );
}
