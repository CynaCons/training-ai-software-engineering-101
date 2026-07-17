import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import "./RequestPath.css";

const STEPS = [
  { id: "cli", label: "CLI", detail: "Your prompt + tool plan" },
  { id: "https", label: "HTTPS", detail: "Encrypted request" },
  { id: "us", label: "Cloud", detail: "US / provider region" },
  { id: "tokens", label: "Tokens", detail: "Text → token IDs" },
  { id: "model", label: "Model", detail: "Next-token generation" },
  { id: "back", label: "Response", detail: "Tokens → text / tool JSON" },
] as const;

/** Round-trip of one CLI request — a packet of light travels the path. */
export function RequestPath() {
  const reduceMotion = useReducedMotion();
  const [live, setLive] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setLive((s) => (s + 1) % STEPS.length);
    }, 1700);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <div
      className="request-path"
      role="group"
      aria-label="CLI request path to the model and back"
    >
      <ol className="request-path__flow">
        {STEPS.map((step, i) => (
          <motion.li
            key={step.id}
            className={`request-path__step ${i === live ? "is-live" : ""}`}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.07 * i,
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {i === live && !reduceMotion && (
              <motion.span
                className="request-path__signal"
                layoutId="request-path-signal"
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
                aria-hidden
              />
            )}
            <span className="request-path__num">
              {String(i + 1).padStart(2, "0")}
            </span>
            <strong>{step.label}</strong>
            <span>{step.detail}</span>
            {i < STEPS.length - 1 && (
              <span className="request-path__arrow" aria-hidden>
                →
              </span>
            )}
          </motion.li>
        ))}
      </ol>
      <p className="request-path__note">
        The model never sees your laptop disk directly — only what the harness
        packs into the request (prompt, history, tool results).
      </p>
    </div>
  );
}
