import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import "./diagrams.css";

const PARTS = [
  { id: "llm", tag: "The brains", label: "LLM", detail: "predicts the next move from context" },
  { id: "tools", tag: "The hands", label: "Tools", detail: "read files · edit code · run commands" },
  { id: "loop", tag: "The persistence", label: "Loop", detail: "act → observe → adjust, until done" },
  { id: "goal", tag: "The mission", label: "Your goal", detail: "intent + done-criteria — always yours", warm: true },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

/** Agent = LLM + tools + loop + your goal. */
export function AgentEquation() {
  const reduceMotion = useReducedMotion();
  const [live, setLive] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setLive((s) => (s + 1) % (PARTS.length + 1));
    }, 1800);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <div
      className="agent-eq"
      role="group"
      aria-label="An agent is an LLM plus tools plus a loop, pointed at your goal"
    >
      <div className="agent-eq__row">
        {PARTS.map((part, i) => (
          <div className="agent-eq__unit" key={part.id}>
            <motion.div
              className={`agent-eq__chip ${"warm" in part && part.warm ? "agent-eq__chip--warm" : ""} ${
                live === i ? "is-live" : ""
              }`}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4, ease: EASE }}
            >
              <span>{part.tag}</span>
              <strong>{part.label}</strong>
              <em>{part.detail}</em>
            </motion.div>
            <span className="agent-eq__op" aria-hidden>
              {i < PARTS.length - 1 ? "+" : "="}
            </span>
          </div>
        ))}
        <motion.div
          className={`agent-eq__chip agent-eq__chip--result ${live === PARTS.length ? "is-live" : ""}`}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.45, ease: EASE }}
        >
          <span>Agentic AI</span>
          <strong>Agent</strong>
          <em>a goal-driven worker inside your repo</em>
        </motion.div>
      </div>

      <div className="agent-eq__contrast">
        <div className="agent-eq__mode">
          <span className="agent-eq__mode-tag">Chat</span>
          <p>
            question → answer → <em>you</em> do the work
          </p>
        </div>
        <div className="agent-eq__mode agent-eq__mode--agent">
          <span className="agent-eq__mode-tag">Agent</span>
          <p>
            goal → works the repo, checks itself → <em>verified change</em>
          </p>
        </div>
      </div>

      <p className="agent-eq__caption">
        Not magic autonomy — the same model, given hands and persistence,
        pointed at <strong>your</strong> goal. It keeps going until the job is
        done or you stop it.
      </p>
    </div>
  );
}
