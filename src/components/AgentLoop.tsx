import { motion } from "framer-motion";
import { DiagramPlaybar } from "./diagrams/DiagramPlaybar";
import { useAutoplayStep } from "../hooks/useAutoplayStep";
import "./AgentLoop.css";

const PHASES = [
  { id: "goal", label: "Goal" },
  { id: "plan", label: "Plan" },
  { id: "act", label: "Act" },
  { id: "observe", label: "Observe" },
  { id: "adjust", label: "Adjust" },
] as const;

/** One realistic run, line by line. `phase` indexes into PHASES. */
const TRACE = [
  { id: "t0", phase: 0, tag: "goal", text: "“Fix the flaky login test”" },
  { id: "t1", phase: 1, tag: "plan", text: "reproduce → isolate → patch" },
  { id: "t2", phase: 2, tag: "act", text: "edit src/auth/session.ts" },
  { id: "t3", phase: 3, tag: "observe", text: "npm test → 2 still failing" },
  { id: "t4", phase: 4, tag: "adjust", text: "await session init before assert" },
  { id: "t5", phase: 3, tag: "observe", text: "npm test → all green ✓", done: true },
] as const;

/** The loop in the abstract (ring) and in practice (trace) — side by side. */
export function AgentLoop() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    TRACE.length,
    1900,
  );
  const activePhase = TRACE[step]!.phase;

  return (
    <div className="agent-loop" role="group" aria-label="The agent loop with a real run trace">
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="Agent loop"
        steps={TRACE.map((t) => ({ id: t.id, label: t.tag }))}
        step={step}
        onStep={setStep}
      />

      <div className="agent-loop__layout">
        <div className="agent-loop__ring" aria-hidden>
          {PHASES.map((phase, i) => {
            const angle = (i / PHASES.length) * 360 - 90;
            const rad = (angle * Math.PI) / 180;
            const x = 50 + 38 * Math.cos(rad);
            const y = 50 + 38 * Math.sin(rad);

            return (
              <div
                key={phase.id}
                className={`agent-loop__node ${activePhase === i ? "is-active" : ""}`}
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <span className="agent-loop__node-label">{phase.label}</span>
              </div>
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
              strokeDasharray={`${(2 * Math.PI * 38) / PHASES.length} ${2 * Math.PI * 38}`}
              initial={false}
              animate={{ rotate: activePhase * (360 / PHASES.length) }}
              style={{ transformOrigin: "50px 50px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <div className="agent-loop__core">
            <span className="agent-loop__core-tag">loop</span>
          </div>
        </div>

        <div className="agent-loop__trace">
          <header className="agent-loop__trace-head">
            <i />
            <i />
            <i />
            <span>one real turn</span>
          </header>
          <ol>
            {TRACE.map((line, i) => (
              <li
                key={line.id}
                className={`${i === step ? "is-live" : ""} ${i < step ? "is-done" : ""} ${
                  "done" in line && line.done ? "is-green" : ""
                }`}
              >
                <button type="button" onClick={() => setStep(i)}>
                  <span className="agent-loop__trace-tag">{line.tag}</span>
                  <span className="agent-loop__trace-text">{line.text}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <p className="agent-loop__caption">
        Same loop every turn: <strong>plan → act → observe</strong>, adjusting
        until the goal’s criteria pass. Notice the second lap — failure isn’t
        the end, it’s the next input. You can interrupt at any arrow.
      </p>
    </div>
  );
}
