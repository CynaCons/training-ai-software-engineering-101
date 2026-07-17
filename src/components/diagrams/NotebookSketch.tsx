import { motion } from "framer-motion";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

type Out =
  | { kind: "table" }
  | { kind: "text"; text: string }
  | { kind: "chart" }
  | { kind: "widget" };

const CELLS: { code: string[]; out: Out; label: string }[] = [
  {
    label: "Explore",
    code: ["import pandas as pd", 'df = pd.read_csv("runs.csv")', "df.head()"],
    out: { kind: "table" },
  },
  {
    label: "Process",
    code: ['df.groupby("model").score.mean()'],
    out: { kind: "text", text: "gpt-a 0.71  ·  gpt-b 0.63  ·  local 0.58" },
  },
  {
    label: "Visualize",
    code: ['df.plot.bar(x="model", y="score")'],
    out: { kind: "chart" },
  },
  {
    label: "Mini-app",
    code: ["@interact(thr=(0, 1, 0.1))", "def view(thr):", "    show(df[df.score > thr])"],
    out: { kind: "widget" },
  },
];

const BARS = [62, 44, 78, 51];

function CellOut({ out }: { out: Out }) {
  if (out.kind === "table") {
    return (
      <div className="nb__table" aria-hidden>
        <span>model</span>
        <span>score</span>
        <span>ok</span>
        <b>gpt-a</b>
        <b>0.71</b>
        <b>✓</b>
        <b>gpt-b</b>
        <b>0.63</b>
        <b>✓</b>
      </div>
    );
  }
  if (out.kind === "text") {
    return <code className="nb__text-out">{out.text}</code>;
  }
  if (out.kind === "chart") {
    return (
      <svg className="nb__chart" viewBox="0 0 160 64" aria-hidden>
        {BARS.map((h, i) => (
          <rect
            key={i}
            x={12 + i * 36}
            y={60 - h * 0.62}
            width="22"
            height={h * 0.62}
            rx="2"
          />
        ))}
        <line x1="6" y1="60" x2="154" y2="60" />
      </svg>
    );
  }
  return (
    <div className="nb__widget" aria-hidden>
      <span className="nb__widget-label">thr</span>
      <span className="nb__slider">
        <i />
        <b />
      </span>
      <span className="nb__widget-val">0.6</span>
    </div>
  );
}

/** A notebook as the agent's sketchpad: run a cell, see the result, iterate. */
export function NotebookSketch() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    CELLS.length,
    2200,
  );

  return (
    <div
      className="nb"
      role="group"
      aria-label="Using a Jupyter notebook to explore, process, visualize, and build mini-tools"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="evaluate.ipynb"
        steps={CELLS.map((c, i) => ({ id: `${c.label}-${i}`, label: c.label }))}
        step={step}
        onStep={setStep}
      />

      <div className="nb__layout">
        <div className="nb__book">
          <header className="nb__book-head">
            <span className="nb__dot" />
            <span className="nb__book-name">evaluate.ipynb</span>
            <span className="nb__kernel">Python 3 ● idle</span>
          </header>
          <div className="nb__cells">
            {CELLS.map((cell, i) => {
              const run = i <= step;
              return (
                <motion.button
                  type="button"
                  key={cell.label}
                  className={`nb__cell ${i === step ? "is-active" : ""}`}
                  initial={false}
                  animate={{ opacity: run ? 1 : 0.4 }}
                  onClick={() => setStep(i)}
                >
                  <div className="nb__in">
                    <span className="nb__gutter">{run ? `[${i + 1}]` : "[ ]"}</span>
                    <code>
                      {cell.code.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </code>
                  </div>
                  {run && (
                    <motion.div
                      className="nb__out"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="nb__out-gutter">out</span>
                      <CellOut out={cell.out} />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="nb__why">
          <h3>Reach for a notebook first</h3>
          <ul>
            <li>
              <strong>Learn fast</strong> — poke an API, a library, a dataset;
              run one cell, see the answer.
            </li>
            <li>
              <strong>See it</strong> — charts, tables, images inline. No UI to
              build.
            </li>
            <li>
              <strong>Evaluate &amp; crunch</strong> — run evals, process data,
              compare model outputs.
            </li>
            <li>
              <strong>Keep the mini-tool</strong> — a widget you rerun is a
              reusable app you never had to ship.
            </li>
          </ul>
          <div className="nb__why-key">
            <span>agent writes a cell → runs → reads output → adjusts</span>
          </div>
        </div>
      </div>

      <p className="nb__caption">
        When you need to <strong>know</strong> or <strong>see</strong> something
        — not ship it — a notebook beats an app: no scaffolding, no deploy, and
        the <strong>cell → run → see → iterate</strong> loop is one an agent
        drives natively.
      </p>
    </div>
  );
}
