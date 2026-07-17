import { motion } from "framer-motion";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const LIFECYCLE = ["Proposed", "Approved", "Implemented", "Verified"] as const;

/** Real feature-area coverage from PowerTimeline's SRS_INDEX.md. */
const AREAS = [
  { name: "Layout & positioning", total: 18, impl: 100, verified: 100 },
  { name: "Zoom & navigation", total: 8, impl: 100, verified: 100 },
  { name: "Timeline editor", total: 28, impl: 100, verified: 21 },
  { name: "Event sources", total: 37, impl: 100, verified: 27 },
  { name: "AI integration", total: 98, impl: 51, verified: 15 },
] as const;

const STEPS = [
  { id: "totals", label: "Totals" },
  { id: "areas", label: "By area" },
  { id: "lifecycle", label: "Lifecycle" },
] as const;

/** The payoff: agents maintain hundreds of traceable requirements cheaply. */
export function SrsDashboard() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    STEPS.length,
    2600,
  );

  return (
    <div
      className="srsdash"
      role="group"
      aria-label="SRS requirements coverage dashboard from PowerTimeline"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="Coverage dashboard"
        steps={STEPS.map((s) => ({ id: s.id, label: s.label }))}
        step={step}
        onStep={setStep}
      />

      <div className="srsdash__layout">
        <div className={`srsdash__totals ${step === 0 ? "is-hot" : ""}`}>
          <span className="srsdash__totals-note">SRS_INDEX.md · one dashboard</span>
          <div className="srsdash__stat">
            <strong>~407</strong>
            <span>tracked requirements</span>
          </div>
          <div className="srsdash__stat">
            <strong className="srsdash__accent">55%</strong>
            <span>implemented</span>
          </div>
          <div className="srsdash__stat">
            <strong className="srsdash__warm">42%</strong>
            <span>verified with tests</span>
          </div>
        </div>

        <div className={`srsdash__areas ${step === 1 ? "is-hot" : ""}`}>
          {AREAS.map((a, i) => (
            <div key={a.name} className="srsdash__area">
              <span className="srsdash__area-name">
                {a.name} <em>· {a.total}</em>
              </span>
              <span className="srsdash__bar">
                <motion.i
                  className="srsdash__bar-impl"
                  initial={false}
                  animate={{ width: step >= 1 ? `${a.impl}%` : 0 }}
                  transition={{ duration: 0.5, delay: step === 1 ? i * 0.08 : 0 }}
                />
                <motion.i
                  className="srsdash__bar-verified"
                  initial={false}
                  animate={{ width: step >= 1 ? `${a.verified}%` : 0 }}
                  transition={{ duration: 0.5, delay: step === 1 ? i * 0.08 + 0.1 : 0 }}
                />
              </span>
              <span className="srsdash__area-pct">
                {a.impl}% · {a.verified}%
              </span>
            </div>
          ))}
          <div className="srsdash__legend">
            <span className="srsdash__legend-impl">implemented</span>
            <span className="srsdash__legend-verified">verified</span>
          </div>
        </div>
      </div>

      <div className={`srsdash__lifecycle ${step === 2 ? "is-hot" : ""}`}>
        {LIFECYCLE.map((s, i) => (
          <span key={s} className="srsdash__phase">
            <b>{s}</b>
            {i < LIFECYCLE.length - 1 && <i aria-hidden>→</i>}
          </span>
        ))}
      </div>

      <p className="srsdash__caption">
        This rigor used to cost a requirements team. Now <strong>the agent
        writes, links, and status-tracks hundreds of requirements</strong> as
        it works — ASPICE-style traceability becomes a byproduct of the loop,
        not a separate project.
      </p>
    </div>
  );
}
