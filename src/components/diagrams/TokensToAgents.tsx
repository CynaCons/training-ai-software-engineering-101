import { motion } from "framer-motion";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const STAGES = [
  {
    id: "tokens",
    title: "Tokens",
    what: "Models got good at writing text",
    detail: "Next-token prediction at scale — fluent code and prose",
  },
  {
    id: "rules",
    title: "Rules",
    what: "We taught them to follow instructions",
    detail: "Instruction tuning: “do X, don’t do Y” actually sticks",
  },
  {
    id: "toolcalls",
    title: "Tool calls",
    what: "We taught them to emit JSON",
    detail: "Structured output a program can parse — not just prose",
  },
  {
    id: "harness",
    title: "Harness",
    what: "A program executes those calls",
    detail: "File edits + bash in your repo, results fed back in",
  },
  {
    id: "agentic",
    title: "Agentic AI",
    what: "Loop it on a goal",
    detail: "Read, edit, run, verify — until the goal’s criteria pass",
    tone: "warm",
  },
] as const;

/** The causal staircase: tokens → rules → JSON tool calls → harness → agents. */
export function TokensToAgents() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    STAGES.length,
    2600,
  );

  return (
    <div
      className="t2a"
      role="group"
      aria-label="How agentic AI emerged: tokens, rules, tool calls, harness, agents"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="How we got agents"
        steps={STAGES.map((s) => ({ id: s.id, label: s.title }))}
        step={step}
        onStep={setStep}
      />

      <div className="t2a__stairs">
        {STAGES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={`t2a__stage ${i === step ? "is-active" : ""} ${
              "tone" in s ? "t2a__stage--warm" : ""
            }`}
            onClick={() => setStep(i)}
          >
            <motion.span
              className="t2a__card"
              initial={false}
              animate={{
                y: i === step ? -4 : 0,
                opacity: i <= step ? 1 : 0.55,
              }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="t2a__num">{i + 1}</span>
              <strong>{s.title}</strong>
              <em>{s.what}</em>
              <span className="t2a__detail">{s.detail}</span>
            </motion.span>
            <span
              className="t2a__riser"
              style={{ height: `${0.4 + i * 2.4}rem` }}
              aria-hidden
            />
          </button>
        ))}
      </div>

      <p className="t2a__caption">
        Each step is small; the sum is the leap. Once a model that follows
        rules can emit tool calls and a harness executes them,{" "}
        <strong>“chatbot” becomes “colleague in the repo”</strong> — the rest
        of this chapter unpacks steps 3–5.
      </p>
    </div>
  );
}
