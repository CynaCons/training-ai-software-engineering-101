import { motion } from "framer-motion";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const STEPS = [
  {
    id: "pair",
    label: "A pair",
    title: "Take two numbers → a 2-D arrow",
    body: "RoPE works on the Q and K vectors two dimensions at a time. Read a pair (x₁, x₂) as an arrow in a plane — direction is what will carry position.",
    formula: "(x₁, x₂)  →  ↗",
  },
  {
    id: "rotate",
    label: "Rotate",
    title: "Position = a rotation angle",
    body: "Spin that arrow by θ = position × frequency. Token 0 no spin, token 1 one notch, token 2 two notches… position becomes an angle — nothing is added, the vector is turned.",
    formula: "R(θ) = [ cosθ  −sinθ ;  sinθ  cosθ ],  θ = pos · f",
  },
  {
    id: "relative",
    title: "Score sees only the gap",
    label: "Relative",
    body: "Attention takes Q·K. Q is turned by m·θ, K by n·θ, so the angle between them is (m−n)·θ — the distance between the tokens. Slide both along the text and the gap is unchanged.",
    formula: "Qₘ · Kₙ  depends on  (m − n)",
  },
  {
    id: "freqs",
    title: "Many speeds = many scales",
    label: "Frequencies",
    body: "Different dimension-pairs spin at different frequencies — like a clock’s second, minute, and hour hands. Fast hands resolve nearby tokens; slow hands keep order across a long context.",
    formula: "pair 0: fast f  ·  pair 1: slow f  · …",
  },
] as const;

const C = 90;
const R = 60;
const DEG = Math.PI / 180;
const pt = (deg: number, r = R): [number, number] => [
  C + r * Math.cos(deg * DEG),
  C - r * Math.sin(deg * DEG),
];

function Arrow({
  deg,
  cls,
  label,
  r = R,
}: {
  deg: number;
  cls: string;
  label?: string;
  r?: number;
}) {
  const [x, y] = pt(deg, r);
  const [lx, ly] = pt(deg, r + 16);
  return (
    <g className={cls}>
      <line x1={C} y1={C} x2={x} y2={y} />
      <circle cx={x} cy={y} r="3" />
      {label && (
        <text x={lx} y={ly}>
          {label}
        </text>
      )}
    </g>
  );
}

/** RoPE as literal 2-D rotation: position → angle, and the score sees the gap. */
export function PositionalSignal() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    STEPS.length,
    3200,
  );
  const s = STEPS[step]!;

  return (
    <div
      className="rope"
      role="group"
      aria-label="RoPE rotary position embedding shown as 2-D rotation geometry"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="RoPE geometry"
        steps={STEPS.map((x) => ({ id: x.id, label: x.label }))}
        step={step}
        onStep={setStep}
      />

      <div className="rope__stage">
        <div className="rope__geo">
          <svg viewBox="0 0 180 180" aria-hidden>
            <circle className="rope__ring" cx={C} cy={C} r={R} />
            <line className="rope__axis" x1="14" y1={C} x2="166" y2={C} />
            <line className="rope__axis" x1={C} y1="18" x2={C} y2="162" />

            {/* Step 0 — one arrow with x1/x2 components */}
            {step === 0 && (
              <>
                <line
                  className="rope__proj"
                  x1={pt(35)[0]}
                  y1={pt(35)[1]}
                  x2={pt(35)[0]}
                  y2={C}
                />
                <line
                  className="rope__proj"
                  x1={pt(35)[0]}
                  y1={C}
                  x2={C}
                  y2={C}
                />
                <Arrow deg={35} cls="rope__vec rope__vec--warm" label="(x₁,x₂)" />
                <text className="rope__ax-lbl" x={pt(35)[0]} y={C + 12}>
                  x₁
                </text>
              </>
            )}

            {/* Step 1 — position fans the arrow out by θ per token */}
            {step === 1 && (
              <>
                {[0, 1, 2, 3].map((m) => (
                  <Arrow
                    key={m}
                    deg={20 + m * 30}
                    cls={`rope__vec ${m === 3 ? "rope__vec--warm" : "rope__vec--ghost"}`}
                    label={`m=${m}`}
                  />
                ))}
                <path
                  className="rope__arc"
                  d={`M ${pt(20, 26)[0]} ${pt(20, 26)[1]} A 26 26 0 0 0 ${pt(110, 26)[0]} ${pt(110, 26)[1]}`}
                />
              </>
            )}

            {/* Step 2 — two tokens, the wedge is the relative distance */}
            {step === 2 && (
              <>
                <path
                  className="rope__wedge"
                  d={`M ${C} ${C} L ${pt(50)[0]} ${pt(50)[1]} A ${R} ${R} 0 0 0 ${pt(140)[0]} ${pt(140)[1]} Z`}
                />
                <Arrow deg={50} cls="rope__vec rope__vec--warm" label="Qₘ" />
                <Arrow deg={140} cls="rope__vec rope__vec--accent" label="Kₙ" />
                <text className="rope__gap" x={C - 4} y={C - 30}>
                  (m−n)·θ
                </text>
              </>
            )}

            {/* Step 3 — two hands at different speeds */}
            {step === 3 && (
              <>
                <motion.g
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: `${C}px ${C}px`, originX: `${C}px`, originY: `${C}px` }}
                >
                  <Arrow deg={0} cls="rope__vec rope__vec--accent" />
                </motion.g>
                <motion.g
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6.5, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: `${C}px ${C}px`, originX: `${C}px`, originY: `${C}px` }}
                >
                  <Arrow deg={90} cls="rope__vec rope__vec--warm" r={40} />
                </motion.g>
                <text className="rope__gap" x={C + 22} y={C - 40}>
                  fast
                </text>
                <text className="rope__gap" x={C + 14} y={C + 30}>
                  slow
                </text>
              </>
            )}
          </svg>
        </div>

        <div className="rope__explain">
          <span className="rope__idx">
            {String(step + 1).padStart(2, "0")} / {STEPS.length}
          </span>
          <h3>{s.title}</h3>
          <p>{s.body}</p>
          <code className="rope__formula">{s.formula}</code>
        </div>
      </div>

      <p className="rope__caption">
        <strong>Why you care:</strong> position is encoded as{" "}
        <strong>rotation</strong>, so attention naturally reads{" "}
        <strong>relative distance</strong> — cheaper, no learned position table,
        and it stretches to long context (extension tricks like YaRN just
        rescale these angles).
      </p>
    </div>
  );
}
