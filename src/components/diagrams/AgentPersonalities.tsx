import { motion } from "framer-motion";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const ROLES = [
  {
    id: "arch",
    label: "Architect",
    focus: "Structure · interfaces · trade-offs",
    instructions: "PRD + constraints · no drive-by refactors",
    context: "Design docs, ADRs, API sketches",
    detail:
      "Narrow brief: shape the system. Doesn’t drown in test logs or ticket noise — so the window stays sharp.",
  },
  {
    id: "dev",
    label: "Implementer",
    focus: "Code in the slice · match plan",
    instructions: "PLAN.md slice · follow repo conventions",
    context: "Touched modules, nearby tests",
    detail:
      "Builds the current iteration. Personality = “ship this slice,” not “redesign the org.”",
  },
  {
    id: "qa",
    label: "Tester",
    focus: "Failing repros · coverage gaps",
    instructions: "Red tests first · no silent skips",
    context: "Test output, bug notes, repro steps",
    detail:
      "Obsessed with evidence. Clean window: failures and fixtures — not architecture debates.",
  },
  {
    id: "pm",
    label: "Project lead",
    focus: "Scope · sequencing · done-when",
    instructions: "Track iterations · call risks early",
    context: "PRD/PLAN status, open questions",
    detail:
      "Keeps the mission coherent. Great coordinator personality — or a human-facing summarizer.",
  },
] as const;

/** Specialized agents = focused instruction sets + unpolluted context. */
export function AgentPersonalities() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    ROLES.length,
    2400,
  );
  const role = ROLES[step]!;

  return (
    <div
      className="agent-persona"
      role="group"
      aria-label="Agent personalities with focused context windows"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="Personalities"
        steps={ROLES.map((r) => ({ id: r.id, label: r.label }))}
        step={step}
        onStep={setStep}
      />

      <div className="agent-persona__roster">
        {ROLES.map((r, i) => (
          <motion.button
            key={r.id}
            type="button"
            className={`agent-persona__card ${i === step ? "is-active" : ""}`}
            onClick={() => setStep(i)}
            animate={{
              opacity: i === step ? 1 : 0.72,
              y: i === step ? -4 : 0,
            }}
            whileTap={{ scale: 0.98 }}
            aria-pressed={i === step}
          >
            <span>{r.label}</span>
            <strong>{r.focus}</strong>
          </motion.button>
        ))}
      </div>

      {/* Keyed remount (no exit phase) so autoplay never blanks the panel */}
      <motion.div
        key={role.id}
        className="agent-persona__detail"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
          <div className="agent-persona__window">
            <header>
              <span>Context window</span>
              <em>kept narrow on purpose</em>
            </header>
            <ul>
              <li>
                <strong>Instructions</strong> {role.instructions}
              </li>
              <li>
                <strong>In window</strong> {role.context}
              </li>
              <li className="is-out">
                <strong>Kept out</strong> Other roles’ noise & unrelated dumps
              </li>
            </ul>
            <div className="agent-persona__fill" aria-hidden>
              <motion.i
                animate={{ width: `${38 + step * 8}%` }}
                transition={{ duration: 0.35 }}
              />
            </div>
          </div>
          <p>{role.detail}</p>
        </motion.div>

      <p className="agent-persona__caption">
        <strong>Personality ≠ vibes.</strong> It’s a stable instruction set +
        scoped context so the model isn’t juggling architect, tester, and PM in
        one polluted session.
      </p>
    </div>
  );
}
