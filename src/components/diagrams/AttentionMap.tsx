import { motion } from "framer-motion";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const TOKENS = [
  "The",
  "robot",
  "picked",
  "up",
  "the",
  "ball",
  "because",
  "it",
  "was",
] as const;

/** Column count = tokens + the "next word" slot. */
const COLS = TOKENS.length + 1;

interface Query {
  id: string;
  label: string;
  /** Column index doing the "asking" (9 = the next-word slot). */
  q: number;
  /** Illustrative attention weights on earlier columns. */
  weights: Record<number, number>;
}

const QUERIES: Query[] = [
  { id: "it", label: "it", q: 7, weights: { 1: 0.32, 5: 0.46, 6: 0.08 } },
  { id: "was", label: "was", q: 8, weights: { 1: 0.1, 5: 0.16, 7: 0.42 } },
  {
    id: "next",
    label: "next?",
    q: 9,
    weights: { 1: 0.1, 5: 0.28, 7: 0.34, 8: 0.2 },
  },
];

const colX = (i: number) => (i + 0.5) * (1000 / COLS);

/** Attention as learned lookups: arcs from the current word to what it needs. */
export function AttentionMap() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    QUERIES.length,
    2600,
  );
  const query = QUERIES[step]!;

  const arcs = Object.entries(query.weights).map(([target, w]) => {
    const from = colX(query.q);
    const to = colX(Number(target));
    const lift = Math.min(104, 26 + Math.abs(from - to) * 0.18);
    return {
      target: Number(target),
      w,
      d: `M ${from} 116 Q ${(from + to) / 2} ${116 - lift} ${to} 116`,
    };
  });

  return (
    <div
      className="attn2"
      role="group"
      aria-label="Attention: each new word looks back at the words that matter"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="Attention"
        steps={QUERIES.map((q) => ({ id: q.id, label: q.label }))}
        step={step}
        onStep={setStep}
      />

      <p className="attn2__intro">
        The model reads left to right, one word at a time. For each new word it
        asks: <strong>which earlier words matter right now?</strong>
      </p>

      <div className="attn2__stage">
        <svg
          className="attn2__arcs"
          viewBox="0 0 1000 120"
          preserveAspectRatio="none"
          aria-hidden
        >
          {arcs.map((arc) => (
            <motion.path
              key={`${query.id}-${arc.target}`}
              d={arc.d}
              fill="none"
              stroke="var(--accent)"
              strokeLinecap="round"
              strokeWidth={1.2 + arc.w * 7}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.28 + arc.w }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </svg>
        <div className="attn2__row">
          {TOKENS.map((tok, i) => {
            const w = query.weights[i] ?? 0;
            const isQuery = i === query.q;
            const clickable = QUERIES.findIndex((q) => q.q === i);
            return (
              <button
                key={`${tok}-${i}`}
                type="button"
                className={`attn2__tok ${isQuery ? "is-query" : ""} ${w > 0 ? "is-source" : ""}`}
                style={{
                  background:
                    w > 0
                      ? `rgba(61, 214, 198, ${0.08 + w * 0.55})`
                      : undefined,
                  borderColor:
                    w > 0
                      ? `rgba(61, 214, 198, ${0.25 + w * 0.6})`
                      : undefined,
                  cursor: clickable >= 0 ? "pointer" : "default",
                }}
                onClick={() => clickable >= 0 && setStep(clickable)}
                tabIndex={clickable >= 0 ? 0 : -1}
              >
                <code>{tok}</code>
              </button>
            );
          })}
          <button
            type="button"
            className={`attn2__tok attn2__tok--next ${query.q === COLS - 1 ? "is-query" : ""}`}
            onClick={() => setStep(QUERIES.length - 1)}
          >
            <code>?</code>
            <span>next word</span>
          </button>
        </div>
      </div>

      <p className="attn2__caption">
        <strong>Attention = learned focus.</strong> To continue “…it was ___”,
        the model must know what <em>it</em> refers to — the arcs pull in{" "}
        <em>ball</em> (and a little <em>robot</em>), so “heavy” beats “empty.”
        No grammar rules are coded in; these lookups are learned, and they run
        for every new word over everything before it.
      </p>
    </div>
  );
}
