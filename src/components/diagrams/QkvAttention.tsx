import { motion } from "framer-motion";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const STEPS = [
  { id: "project", label: "Project" },
  { id: "score", label: "Score = angle" },
  { id: "softmax", label: "Softmax" },
  { id: "mix", label: "Mix values" },
] as const;

/** Candidate tokens the query at `rate_limit(` can look back at. */
const KEYS = [
  { tok: "Redis", angle: 54, weight: 0.46 },
  { tok: "def", angle: 98, weight: 0.31 },
  { tok: "import", angle: 18, weight: 0.16 },
  { tok: "return", angle: 140, weight: 0.07 },
] as const;

const Q_ANGLE = 66;
const C = 90;
const R = 60;

function pt(angleDeg: number, r = R): [number, number] {
  const a = (angleDeg * Math.PI) / 180;
  return [C + r * Math.cos(a), C - r * Math.sin(a)];
}

/** Scaled dot-product attention shown as vector geometry. */
export function QkvAttention() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    STEPS.length,
    2400,
  );
  const winner = KEYS[0]!;
  const [qx, qy] = pt(Q_ANGLE);
  const [wx, wy] = pt(winner.angle);

  return (
    <div
      className="qkv"
      role="group"
      aria-label="Scaled dot-product attention shown as vector geometry"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="Q · K · V"
        steps={STEPS.map((s) => ({ id: s.id, label: s.label }))}
        step={step}
        onStep={setStep}
      />

      <div className="qkv__project">
        <span className="qkv__x">
          x<small>token vector</small>
        </span>
        <span className="qkv__times">×</span>
        {[
          { m: "W_Q", r: "Q", role: "what I’m looking for", cls: "q" },
          { m: "W_K", r: "K", role: "how I’m labelled", cls: "k" },
          { m: "W_V", r: "V", role: "what I’ll hand over", cls: "v" },
        ].map((p) => (
          <span
            key={p.r}
            className={`qkv__proj qkv__proj--${p.cls} ${step === 0 ? "is-hot" : ""}`}
          >
            <code>{p.m}</code>
            <b>{p.r}</b>
            <small>{p.role}</small>
          </span>
        ))}
      </div>

      <div className="qkv__stage">
        <div className="qkv__geo">
          <svg viewBox="0 0 180 180" aria-hidden>
            {/* axes */}
            <line className="qkv__axis" x1="10" y1={C} x2="170" y2={C} />
            <line className="qkv__axis" x1={C} y1="14" x2={C} y2="166" />

            {/* angle wedge between Q and the winning key */}
            {step >= 1 && (
              <motion.path
                d={`M ${C} ${C} L ${qx} ${qy} A ${R} ${R} 0 0 1 ${wx} ${wy} Z`}
                className="qkv__wedge"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            )}

            {/* key vectors */}
            {KEYS.map((k, i) => {
              const [kx, ky] = pt(k.angle);
              const isWin = i === 0;
              return (
                <g
                  key={k.tok}
                  className={`qkv__kvec ${isWin && step >= 1 ? "is-win" : ""}`}
                  style={{ opacity: step >= 1 ? 1 : 0.25 }}
                >
                  <line x1={C} y1={C} x2={kx} y2={ky} />
                  <circle cx={kx} cy={ky} r="2.4" />
                  <text x={pt(k.angle, R + 20)[0]} y={pt(k.angle, R + 20)[1]}>
                    {k.tok}
                  </text>
                </g>
              );
            })}

            {/* theta label in the wedge */}
            {step >= 1 && (
              <text
                className="qkv__theta"
                x={pt((Q_ANGLE + winner.angle) / 2, 30)[0]}
                y={pt((Q_ANGLE + winner.angle) / 2, 30)[1]}
              >
                θ
              </text>
            )}

            {/* query vector */}
            <g className="qkv__qvec">
              <line x1={C} y1={C} x2={qx} y2={qy} />
              <circle cx={qx} cy={qy} r="3" />
              <text x={pt(Q_ANGLE, R + 24)[0]} y={pt(Q_ANGLE, R + 24)[1]}>
                Q
              </text>
            </g>
          </svg>
          <p className="qkv__geo-note">
            score(Q, K) = <b>Q · K</b> = |Q| |K| cos θ — <em>small angle → high
            score.</em> Redis points nearly the same way as the query, so it
            wins.
          </p>
        </div>

        <div className="qkv__right">
          <div className="qkv__weights">
            <span className="qkv__weights-tag">
              {step < 2 ? "raw scores  (Q·K / √dₖ)" : "softmax → weights sum to 1"}
            </span>
            {KEYS.map((k, i) => (
              <div key={k.tok} className="qkv__wrow">
                <span className="qkv__wtok">{k.tok}</span>
                <span className="qkv__wbar">
                  <motion.i
                    className={i === 0 ? "is-win" : ""}
                    initial={false}
                    animate={{
                      width:
                        step < 1
                          ? "0%"
                          : `${(step < 2 ? Math.sqrt(k.weight) * 78 : k.weight * 100)}%`,
                    }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </span>
                <span className="qkv__wval">
                  {step >= 2 ? `${Math.round(k.weight * 100)}%` : ""}
                </span>
              </div>
            ))}
          </div>

          <div className={`qkv__mix ${step === 3 ? "is-hot" : ""}`}>
            <span className="qkv__mix-tag">output for this token</span>
            <code>out = Σ wⱼ · Vⱼ</code>
            <p>
              A <strong>blend of the value vectors</strong>, weighted by how well
              each key matched the query — mostly Redis’ V, a bit of def’s.
            </p>
          </div>
        </div>
      </div>

      <p className="qkv__caption">
        <code>Attention(Q,K,V) = softmax(QKᵀ / √dₖ) · V</code> — three learned
        matrices turn each token into a <b>question</b>, a <b>label</b>, and a{" "}
        <b>payload</b>; alignment picks who to listen to, values are what you
        copy.
      </p>
    </div>
  );
}
