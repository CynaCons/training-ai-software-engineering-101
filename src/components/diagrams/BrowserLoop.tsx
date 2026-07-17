import { motion } from "framer-motion";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const STEPS = [
  { id: "criteria", label: "Criteria" },
  { id: "drive", label: "Drive UI" },
  { id: "observe", label: "Observe" },
  { id: "judge", label: "Judge" },
] as const;

/** Agent drives a real browser and judges what it sees against your criteria. */
export function BrowserLoop() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    STEPS.length,
    2400,
  );

  return (
    <div
      className="browserloop"
      role="group"
      aria-label="Agent verifies web UI behaviour by driving a browser and reading the console"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="See it in the browser"
        steps={STEPS.map((s) => ({ id: s.id, label: s.label }))}
        step={step}
        onStep={setStep}
      />

      <div className="browserloop__layout">
        <div
          className={`browserloop__criteria ${step === 0 || step === 3 ? "is-hot" : ""}`}
          onClick={() => setStep(0)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setStep(0)}
        >
          <span className="browserloop__tag">done-when · yours</span>
          <ul>
            <li>cart badge updates without reload</li>
            <li>checkout button enabled ≤ 200 ms</li>
            <li>zero console errors on the happy path</li>
          </ul>
        </div>

        <div className="browserloop__stage">
          <motion.div
            className={`browserloop__browser ${step === 1 ? "is-hot" : ""}`}
            initial={false}
            animate={{ opacity: step === 2 ? 0.75 : 1 }}
            onClick={() => setStep(1)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setStep(1)}
          >
            <header>
              <i />
              <i />
              <i />
              <span>localhost:5173/shop</span>
            </header>
            <div className="browserloop__ui" aria-hidden>
              <div className="browserloop__ui-bar">
                <span className="browserloop__badge">cart · 2</span>
              </div>
              <div className="browserloop__ui-row" />
              <div className="browserloop__ui-row browserloop__ui-row--short" />
              <motion.span
                className="browserloop__cursor"
                initial={false}
                animate={
                  step === 1
                    ? { x: [0, 80, 80], y: [0, -6, -6], opacity: [0, 1, 1] }
                    : { opacity: 0 }
                }
                transition={{ duration: 1.2 }}
              >
                ➜
              </motion.span>
              <button type="button" className="browserloop__cta" tabIndex={-1}>
                Checkout
              </button>
            </div>
          </motion.div>

          <div
            className={`browserloop__console ${step === 2 ? "is-hot" : ""}`}
            onClick={() => setStep(2)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setStep(2)}
          >
            <span className="browserloop__tag">what the agent reads back</span>
            <code>screenshot ✓ badge “cart · 2”</code>
            <code>perf cta-enabled 142 ms</code>
            <code className="ok">console 0 errors</code>
          </div>
        </div>
      </div>

      <p className="browserloop__caption">
        “It compiles” proves nothing about UX. Give the agent browser tools —
        click, screenshot, read the console and DOM — so it can{" "}
        <strong>judge behaviour against your criteria</strong>, then hand you
        the evidence.
      </p>
    </div>
  );
}
