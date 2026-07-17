import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const PHASES = [
  {
    id: "found",
    label: "Bug found",
    title: "You find the bug",
    detail: "Real failure path, seen by a human",
  },
  {
    id: "test",
    label: "Write test",
    title: "Agent writes the test",
    detail: "Reproduces exactly how you found it",
  },
  {
    id: "red",
    label: "Red",
    title: "Fails on purpose",
    detail: "The bug is now pinned down",
  },
  {
    id: "fix",
    label: "Fix",
    title: "Agent patches the code",
    detail: "Iterates until the repro passes",
  },
  {
    id: "green",
    label: "Green",
    title: "Proof, not promise",
    detail: "Test passes — and guards the regression forever",
  },
] as const;

/** Which terminal lines are "on" at each phase (index into TERMINAL). */
const TERMINAL = [
  { at: 0, tag: "you", text: "logout kills other tabs’ sessions ?!" },
  { at: 1, tag: "agent", text: "write test: “logout keeps sibling sessions”" },
  { at: 2, tag: "red", text: "✗ FAIL session.spec.ts — expected 2 alive, got 0" },
  { at: 3, tag: "agent", text: "fix: scope revoke() to current session id" },
  { at: 4, tag: "green", text: "✓ PASS session.spec.ts — 12/12 green" },
] as const;

/** Bugs become failing tests first — red, then green with proof. */
export function BugToTest() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    PHASES.length,
    2200,
  );

  return (
    <div
      className="bugtdd"
      role="group"
      aria-label="Bug to failing test to green: test-driven bug fixing with an agent"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="Bug → test → green"
        steps={PHASES.map((p) => ({ id: p.id, label: p.label }))}
        step={step}
        onStep={setStep}
      />

      <div className="bugtdd__layout">
        <ol className="bugtdd__rail">
          {PHASES.map((p, i) => (
            <li key={p.id}>
              <button
                type="button"
                className={`bugtdd__phase ${i === step ? "is-active" : ""} ${
                  i < step ? "is-done" : ""
                } ${p.id === "red" ? "bugtdd__phase--red" : ""} ${
                  p.id === "green" ? "bugtdd__phase--green" : ""
                }`}
                onClick={() => setStep(i)}
              >
                <strong>{p.title}</strong>
                <span>{p.detail}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="bugtdd__term">
          <header className="bugtdd__term-head">
            <i />
            <i />
            <i />
            <span>the same bug, pinned</span>
          </header>
          <ol>
            {TERMINAL.map((line) => (
              <li
                key={line.text}
                className={`bugtdd__line bugtdd__line--${line.tag} ${
                  line.at === step ? "is-live" : ""
                } ${line.at < step ? "is-done" : ""}`}
              >
                <span className="bugtdd__line-tag">{line.tag}</span>
                <span className="bugtdd__line-text">{line.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <p className="bugtdd__caption">
        Test-driven in spirit: never let the agent “just fix it”. The failing
        test <strong>proves the bug existed and proves it’s gone</strong> — and
        stays behind as a tripwire.
      </p>
    </div>
  );
}
