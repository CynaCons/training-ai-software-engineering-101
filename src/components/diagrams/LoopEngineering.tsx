import { motion } from "framer-motion";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const STEPS = [
  { id: "goals", label: "Goals" },
  { id: "act", label: "Act" },
  { id: "system", label: "System" },
  { id: "observe", label: "Observe" },
  { id: "evaluate", label: "Evaluate" },
] as const;

/** A literal control loop: the agent as actuator, your checks as sensors. */
export function LoopEngineering() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    STEPS.length,
    2000,
  );

  const node = (
    i: number,
    cls: string,
    title: string,
    detail: string,
  ) => (
    <motion.button
      type="button"
      className={`loopeng__node loopeng__node--${cls} ${step === i ? "is-active" : ""}`}
      initial={false}
      animate={{ scale: step === i ? 1.03 : 1 }}
      onClick={() => setStep(i)}
    >
      <strong>{title}</strong>
      <span>{detail}</span>
    </motion.button>
  );

  return (
    <div
      className="loopeng"
      role="group"
      aria-label="Loop engineering as a closed control loop with the human setting goals"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="Control loop"
        steps={STEPS.map((s) => ({ id: s.id, label: s.label }))}
        step={step}
        onStep={setStep}
      />

      <div className="loopeng__schematic">
        {node(0, "goals", "Goals", "You set criteria & constraints — the setpoint")}

        <div className="loopeng__ring">
          <span
            className={`loopeng__edge loopeng__edge--top ${step === 2 ? "is-lit" : ""}`}
            aria-hidden
          />
          <span
            className={`loopeng__edge loopeng__edge--right ${step === 3 ? "is-lit" : ""}`}
            aria-hidden
          />
          <span
            className={`loopeng__edge loopeng__edge--bottom ${step === 4 ? "is-lit" : ""}`}
            aria-hidden
          />
          <span
            className={`loopeng__edge loopeng__edge--left ${step === 1 ? "is-lit" : ""}`}
            aria-hidden
          />

          {node(1, "act", "Act", "Agent changes the system")}
          {node(2, "system", "Your system", "App · firmware · pipeline")}
          {node(3, "observe", "Observe", "Tests · browser · sensors · logs")}
          {node(4, "evaluate", "Evaluate", "Measured state vs goals")}

          <div className="loopeng__interrupt">
            <span>you can interrupt any edge</span>
          </div>
        </div>
      </div>

      <p className="loopeng__caption">
        Classic control engineering, agent as actuator: once observation and
        evaluation are wired in, <strong>set goals and let it iterate
        indefinitely</strong> — you own the setpoint and the stop button, not
        every lap.
      </p>
    </div>
  );
}
