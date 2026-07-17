import { motion, useReducedMotion } from "framer-motion";
import "./diagrams.css";

const MILESTONES = [
  {
    year: "2017",
    title: "Transformer",
    detail: "“Attention Is All You Need” — the architecture",
    era: "research",
  },
  {
    year: "2020",
    title: "Scale era",
    detail: "GPT-3: big models learn from context alone",
    era: "research",
  },
  {
    year: "2022",
    title: "Chat assistants",
    detail: "Instruction tuning makes models usable",
    era: "research",
  },
  {
    year: "2023",
    title: "Tool calling",
    detail: "Models act through JSON → real APIs",
    era: "agentic",
  },
  {
    year: "2024",
    title: "MCP & reasoning",
    detail: "Standard plugs into real systems",
    era: "agentic",
  },
  {
    year: "2025",
    title: "Coding agents",
    detail: "CLIs that work a repo on their own",
    era: "agentic",
    now: true,
  },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

/** Eight years from one paper to agents in your terminal. */
export function EvolutionTimeline() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="evo"
      role="group"
      aria-label="Timeline from the 2017 Transformer paper to 2025 coding agents"
    >
      <div className="evo__track">
        <motion.i
          className="evo__line"
          initial={reduceMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: EASE }}
          aria-hidden
        />
        {MILESTONES.map((m, i) => (
          <div
            key={m.year}
            className={`evo__col ${i % 2 === 0 ? "evo__col--up" : "evo__col--down"} ${
              "now" in m && m.now ? "is-now" : ""
            } evo__col--${m.era}`}
          >
            <motion.div
              className="evo__card"
              initial={reduceMotion ? false : { opacity: 0, y: i % 2 === 0 ? 12 : -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 * i + 0.25, duration: 0.45, ease: EASE }}
            >
              <strong>{m.title}</strong>
              <span>{m.detail}</span>
            </motion.div>
            <motion.span
              className="evo__dot"
              initial={reduceMotion ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.18 * i + 0.15, duration: 0.3, ease: EASE }}
              aria-hidden
            >
              {"now" in m && m.now && !reduceMotion && (
                <motion.i
                  animate={{ scale: [1, 2.1], opacity: [0.6, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                />
              )}
            </motion.span>
            <span className="evo__year">
              {m.year}
              {"now" in m && m.now && <em>you are here</em>}
            </span>
          </div>
        ))}
      </div>
      <p className="evo__caption">
        Eight years from one paper to agents in your terminal. The left half is
        research history — the right half is why <strong>this training
        exists</strong>: once models could call tools, software work changed.
      </p>
    </div>
  );
}
