import { motion } from "framer-motion";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const STEPS = [
  { id: "front", label: "Frontend" },
  { id: "bridge", label: "Dev bridge" },
  { id: "backend", label: "Backend" },
  { id: "ship", label: "Ship it" },
] as const;

/** React frontend → Vite proxy → Python in dev; Tauri / Electron to ship. */
export function AppStack() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    STEPS.length,
    2600,
  );

  return (
    <div
      className="appstack"
      role="group"
      aria-label="Building easy web and local apps: React, a Vite dev proxy to Python, and Tauri or Electron packaging"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="Easy app stack"
        steps={STEPS.map((s) => ({ id: s.id, label: s.label }))}
        step={step}
        onStep={setStep}
      />

      <div className="appstack__layout">
        <div className="appstack__flow">
          <motion.div
            className={`appstack__node appstack__node--front ${step === 0 ? "is-active" : ""}`}
            onClick={() => setStep(0)}
            animate={{ opacity: step >= 0 ? 1 : 0.5 }}
          >
            <span className="appstack__tag">Frontend · one skill</span>
            <strong>React + Vite</strong>
            <code>fetch("/api/run")</code>
          </motion.div>

          <span className={`appstack__wire ${step >= 1 ? "is-lit" : ""}`} aria-hidden>
            ↓
          </span>

          <motion.div
            className={`appstack__node appstack__node--bridge ${step === 1 ? "is-active" : ""}`}
            onClick={() => setStep(1)}
            animate={{ opacity: step >= 1 ? 1 : 0.5 }}
          >
            <span className="appstack__tag">Dev bridge · Vite</span>
            <strong>Proxy catches /api</strong>
            <em>forward to a real backend — no CORS, no ports in your code</em>
          </motion.div>

          <span className={`appstack__wire ${step >= 2 ? "is-lit" : ""}`} aria-hidden>
            ↓
          </span>

          <motion.div
            className={`appstack__node appstack__node--back ${step === 2 ? "is-active" : ""}`}
            onClick={() => setStep(2)}
            animate={{ opacity: step >= 2 ? 1 : 0.5 }}
          >
            <span className="appstack__tag">Backend · does the work</span>
            <strong>Python (FastAPI)</strong>
            <em>ML, data, hardware, whatever — returns JSON</em>
          </motion.div>

          <div className={`appstack__ship ${step === 3 ? "is-active" : ""}`}>
            <span className="appstack__tag">Ship it as a desktop app</span>
            <div className="appstack__pack">
              <button
                type="button"
                className="appstack__pkg"
                onClick={() => setStep(3)}
              >
                <strong>Tauri</strong>
                <span>Rust · OS webview · ~5&nbsp;MB</span>
              </button>
              <button
                type="button"
                className="appstack__pkg"
                onClick={() => setStep(3)}
              >
                <strong>Electron</strong>
                <span>Node.js · ships Chromium · ~120&nbsp;MB</span>
              </button>
            </div>
          </div>
        </div>

        <div className="appstack__code">
          <header className="appstack__code-head">
            <span className="appstack__dot" />
            <span>vite.config.ts</span>
            <span className="appstack__code-note">dev-time API bridge</span>
          </header>
          <pre>
            <code>
              <span className="c-com">// frontend calls /api/* — Vite forwards it</span>
              {"\n"}
              <span className="c-key">export default</span> defineConfig({"{"}
              {"\n"}
              {"  "}server: {"{"}
              {"\n"}
              {"    "}proxy: {"{"}
              {"\n"}
              {"      "}<span className="c-str">"/api"</span>:{" "}
              <span className="c-str">"http://127.0.0.1:8000"</span>,{" "}
              <span className="c-com">// Python</span>
              {"\n"}
              {"    "}
              {"}"},{"\n"}
              {"  "}
              {"}"},{"\n"}
              {"}"});
            </code>
          </pre>
          <div className="appstack__note">
            <span>
              <b>Dev:</b> one command, frontend + Python talk over{" "}
              <code>/api</code>.
            </span>
            <span>
              <b>Ship:</b> bundle the backend as a Tauri sidecar / Electron
              child — or move logic into Rust commands.
            </span>
          </div>
        </div>
      </div>

      <p className="appstack__caption">
        Learn <strong>one frontend</strong> (React) and reuse it everywhere: a
        Vite proxy wires it to <strong>Python</strong> for local dev, and{" "}
        <strong>Tauri (Rust)</strong> or <strong>Electron (Node)</strong> turns
        the same build into a desktop app.
      </p>
    </div>
  );
}
