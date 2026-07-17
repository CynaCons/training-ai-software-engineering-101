import { motion } from "framer-motion";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const CHAIN = [
  {
    id: "prd",
    label: "PRD",
    title: "Vision",
    detail: "PRD.md — what & why, the product intent",
  },
  {
    id: "req",
    label: "Requirement",
    title: "Stable ID",
    detail: "One testable statement, one ID that never moves",
    tone: "accent",
  },
  {
    id: "accept",
    label: "Acceptance",
    title: "Done-when",
    detail: "Bullet criteria a test can actually check",
  },
  {
    id: "code",
    label: "Code",
    title: "Where it lives",
    detail: "Exact source files that satisfy it",
  },
  {
    id: "tests",
    label: "Tests",
    title: "Proof",
    detail: "Linked test IDs — the loop closes here",
  },
  {
    id: "status",
    label: "Status",
    title: "Lifecycle",
    detail: "Proposed → Approved → Implemented → Verified",
    tone: "warm",
  },
] as const;

/** SRS.md turns vision into traceable, testable requirements — real PowerTimeline. */
export function SrsTraceability() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    CHAIN.length,
    2100,
  );

  return (
    <div
      className="srs"
      role="group"
      aria-label="SRS.md requirement traceability from vision to verified tests"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="Requirement trace"
        steps={CHAIN.map((c) => ({ id: c.id, label: c.label }))}
        step={step}
        onStep={setStep}
      />

      <div className="srs__layout">
        <ol className="srs__chain">
          {CHAIN.map((c, i) => (
            <li key={c.id}>
              <motion.button
                type="button"
                className={`srs__link ${i === step ? "is-active" : ""} ${
                  "tone" in c ? `srs__link--${c.tone}` : ""
                }`}
                initial={false}
                animate={{ opacity: i <= step ? 1 : 0.5, x: i === step ? 4 : 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setStep(i)}
              >
                <span className="srs__link-top">
                  <span className="srs__link-label">{c.label}</span>
                  <strong>{c.title}</strong>
                </span>
                <span className="srs__link-detail">{c.detail}</span>
              </motion.button>
              {i < CHAIN.length - 1 && (
                <span
                  className={`srs__joint ${i < step ? "is-lit" : ""}`}
                  aria-hidden
                >
                  ↓
                </span>
              )}
            </li>
          ))}
        </ol>

        <div className="srs__snippet">
          <header className="srs__snippet-head">
            <span className="srs__snippet-path">docs/SRS_ZOOM.md</span>
            <span className="srs__snippet-note">powertimeline · real</span>
          </header>
          <div className="srs__snippet-body">
            <code className="srs__id">
              <span className={step === 1 ? "srs__hl" : ""}>CC-REQ-ZOOM-001</span>
              <span className="srs__badge srs__badge--verified">Verified</span>
            </code>
            <p className="srs__req-text">
              Zoom filters visible events; cursor-anchored zoom keeps the time
              under the cursor stable; boundaries clamp.
            </p>
            <span className="srs__field">Acceptance</span>
            <ul className={`srs__accept ${step === 2 ? "srs__hl-block" : ""}`}>
              <li>Zooming in reduces the visible range and filters events</li>
              <li>Zoom centers on the cursor; time under cursor stays put</li>
              <li>Boundaries clamp to min / max limits</li>
              <li>Fit All resets the view to show every event</li>
            </ul>
            <div className="srs__trace">
              <span className={step === 3 ? "srs__hl-block" : ""}>
                <em>Code</em> src/app/hooks/useViewWindow.ts
              </span>
              <span className={step === 4 ? "srs__hl-block" : ""}>
                <em>Tests</em> v5/17 · v5/20 · v5/24
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className="srs__caption">
        Between PRD and PLAN sits the contract: <strong>SRS.md gives every
        requirement a stable ID, acceptance criteria, code, and a test</strong>.
        The agent implements against it — and you can point at any ID and ask
        “is this done, and how do we know?”
      </p>
    </div>
  );
}
