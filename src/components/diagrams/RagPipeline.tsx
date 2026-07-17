import { motion } from "framer-motion";
import { DiagramPlaybar } from "./DiagramPlaybar";
import { useAutoplayStep } from "../../hooks/useAutoplayStep";
import "./diagrams.css";

const STAGES = [
  {
    id: "query",
    label: "Query",
    title: "Question",
    detail: "“How do we rotate API keys?”",
  },
  {
    id: "embed",
    label: "Embed",
    title: "Embed",
    detail: "Query → vector (a point in meaning-space)",
  },
  {
    id: "search",
    label: "Search",
    title: "Vector index",
    detail: "Find the k nearest doc chunks",
  },
  {
    id: "stuff",
    label: "Context",
    title: "Top-k chunks",
    detail: "Snippets injected into the prompt",
  },
  {
    id: "answer",
    label: "Answer",
    title: "Grounded answer",
    detail: "Cites the retrieved chunks, not vibes",
    tone: "warm",
  },
] as const;

/** Retrieval-augmented generation vs the agentic retrieval CLIs actually use. */
export function RagPipeline() {
  const { step, setStep, next, playing, toggle } = useAutoplayStep(
    STAGES.length,
    2200,
  );

  return (
    <div
      className="rag"
      role="group"
      aria-label="Retrieval-augmented generation pipeline compared with agentic retrieval"
    >
      <DiagramPlaybar
        playing={playing}
        onToggle={toggle}
        onNext={next}
        label="RAG pipeline"
        steps={STAGES.map((s) => ({ id: s.id, label: s.label }))}
        step={step}
        onStep={setStep}
      />

      <div className="rag__pipeline">
        {STAGES.map((s, i) => (
          <div key={s.id} className="rag__cell">
            <motion.button
              type="button"
              className={`rag__node ${i === step ? "is-active" : ""} ${
                "tone" in s ? "rag__node--warm" : ""
              }`}
              initial={false}
              animate={{ opacity: i <= step ? 1 : 0.45, y: i === step ? -3 : 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setStep(i)}
            >
              <strong>{s.title}</strong>
              <span>{s.detail}</span>
            </motion.button>
            {i < STAGES.length - 1 && (
              <span className={`rag__arrow ${i < step ? "is-lit" : ""}`} aria-hidden>
                →
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="rag__contrast">
        <div className="rag__mode">
          <strong>RAG</strong>
          <span>
            Pre-indexed corpus, one retrieval hop — built for chat over docs,
            wikis, tickets at scale.
          </span>
        </div>
        <div className="rag__mode rag__mode--agentic">
          <strong>Agentic retrieval</strong>
          <span>
            Coding CLIs mostly skip the index: they <em>grep, list, and open
            files on demand</em>, then loop — retrieval as tool calls.
          </span>
        </div>
      </div>

      <p className="rag__caption">
        Same goal — <strong>put the right knowledge in context</strong>. RAG
        pre-computes “what’s relevant”; an agent discovers it live. Pick RAG
        for large static corpora, the agent loop for a living repo.
      </p>
    </div>
  );
}
