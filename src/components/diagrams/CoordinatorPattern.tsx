import { AnimatePresence, motion } from "framer-motion";
import { useEffect, type CSSProperties } from "react";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const MODES = [
  {
    id: "manager",
    label: "Manager",
    title: "Coordinator of agents",
    detail:
      "One agent owns the mission and delegates: spawn specialists, collect results, resolve conflicts, decide what’s next. You brief the coordinator — it briefs the team.",
  },
  {
    id: "campaign",
    label: "Campaign",
    title: "Coordinator of a long loop",
    detail:
      "Same idea, one agent: run the campaign, poll results, sanity-check, fix & log, restart, continue until the full suite is green — or you stop it.",
  },
] as const;

const CAMPAIGN = [
  { id: "run", label: "Run tests", detail: "Kick the suite / campaign" },
  { id: "poll", label: "Poll results", detail: "Watch CI, logs, dashboards" },
  { id: "check", label: "Plausibility", detail: "Does this failure make sense?" },
  { id: "fix", label: "Fix & log", detail: "Patch, note what changed" },
  { id: "restart", label: "Restart", detail: "Re-run affected scope" },
  { id: "done", label: "Full campaign", detail: "Until green / stop" },
] as const;

const TEAM = [
  { id: "a", role: "Implementer", task: "Feature slice" },
  { id: "b", role: "Reviewer", task: "Diff critique" },
  { id: "c", role: "Tester", task: "Failing repro" },
] as const;

/** Two flavors of the coordinator pattern — manager-of-agents vs campaign loop. */
export function CoordinatorPattern() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(2, 4500);
  const mode = MODES[step]!;
  const {
    step: campaignIdx,
    setStep: setCampaignIdx,
    next: campaignNext,
    playing: campaignPlaying,
    toggle: campaignToggle,
    setPlaying: setCampaignPlaying,
  } = useAutoplayStep(CAMPAIGN.length, 1400);

  useEffect(() => {
    setCampaignPlaying(step === 1);
  }, [step, setCampaignPlaying]);

  return (
    <div
      className="coord-pattern"
      role="group"
      aria-label="Coordinator pattern: manage agents or long-running campaigns"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="Coordinator flavor"
        steps={MODES.map((m) => ({ id: m.id, label: m.label }))}
        step={step}
        onStep={setStep}
      />

      <div className="coord-pattern__mode-tabs">
        {MODES.map((m, i) => (
          <button
            key={m.id}
            type="button"
            className={i === step ? "is-active" : ""}
            onClick={() => setStep(i)}
          >
            {m.title}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div
            key="manager"
            className="coord-pattern__manager"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            <div className="coord-pattern__boss">
              <span>Coordinator</span>
              <strong>Owns the mission</strong>
              <em>delegate · integrate · decide</em>
            </div>
            <div className="coord-pattern__spokes" aria-hidden>
              {TEAM.map((_, i) => (
                <motion.div
                  key={TEAM[i]!.id}
                  className="coord-pattern__spoke"
                  style={{ "--i": i } as CSSProperties}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    delay: i * 0.35,
                  }}
                />
              ))}
            </div>
            <div className="coord-pattern__team">
              {TEAM.map((agent, i) => (
                <motion.div
                  key={agent.id}
                  className="coord-pattern__worker"
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.25,
                  }}
                >
                  <strong>{agent.role}</strong>
                  <span>{agent.task}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="campaign"
            className="coord-pattern__campaign"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            <div className="coord-pattern__campaign-bar">
              <DiagramPlaybar
                playing={campaignPlaying}
                onToggle={campaignToggle}
                onNext={campaignNext}
                label="Campaign steps"
                steps={CAMPAIGN.map((c) => ({ id: c.id, label: c.label }))}
                step={campaignIdx}
                onStep={setCampaignIdx}
              />
            </div>
            <ol className="coord-pattern__ring">
              {CAMPAIGN.map((c, i) => (
                <motion.li
                  key={c.id}
                  className={i === campaignIdx ? "is-active" : ""}
                  animate={{
                    scale: i === campaignIdx ? 1.05 : 1,
                    opacity: i === campaignIdx ? 1 : 0.55,
                  }}
                  onClick={() => setCampaignIdx(i)}
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <strong>{c.label}</strong>
                  <em>{c.detail}</em>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="coord-pattern__caption">
        <strong>{mode.title}.</strong> {mode.detail}
      </p>
    </div>
  );
}
