import { motion } from "framer-motion";
import { useState } from "react";
import "./AgentLoop.css";

const STEPS = [
  { id: "goal", label: "Goal", desc: "Understand the task" },
  { id: "plan", label: "Plan", desc: "Break work into steps" },
  { id: "act", label: "Act", desc: "Run tools & edit code" },
  { id: "observe", label: "Observe", desc: "Read results & errors" },
  { id: "reflect", label: "Reflect", desc: "Adjust and continue" },
] as const;

export function AgentLoop() {
  const [active, setActive] = useState(0);

  return (
    <div className="agent-loop">
      <div className="agent-loop__ring" aria-hidden>
        {STEPS.map((step, i) => {
          const angle = (i / STEPS.length) * 360 - 90;
          const rad = (angle * Math.PI) / 180;
          const x = 50 + 38 * Math.cos(rad);
          const y = 50 + 38 * Math.sin(rad);

          return (
            <motion.button
              key={step.id}
              type="button"
              className={`agent-loop__node ${active === i ? "is-active" : ""}`}
              style={{ left: `${x}%`, top: `${y}%` }}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              aria-pressed={active === i}
              aria-label={`${step.label}: ${step.desc}`}
            >
              <span className="agent-loop__node-label">{step.label}</span>
            </motion.button>
          );
        })}
        <svg className="agent-loop__svg" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="var(--panel-border)"
            strokeWidth="0.5"
            strokeDasharray="2 3"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeDasharray={`${(2 * Math.PI * 38) / STEPS.length} ${2 * Math.PI * 38}`}
            initial={false}
            animate={{ rotate: active * (360 / STEPS.length) }}
            style={{ transformOrigin: "50px 50px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <div className="agent-loop__core">
          <span className="agent-loop__core-tag">loop</span>
        </div>
      </div>

      <motion.div
        key={active}
        className="agent-loop__detail"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="agent-loop__step-num">
          {String(active + 1).padStart(2, "0")}
        </span>
        <h3>{STEPS[active].label}</h3>
        <p>{STEPS[active].desc}</p>
      </motion.div>
    </div>
  );
}
