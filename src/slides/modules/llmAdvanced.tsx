import { MoERouter } from "../../components/diagrams/MoERouter";
import { TrainingPipeline } from "../../components/diagrams/TrainingPipeline";
import type { SlideData } from "../types";

/** Part C — deeper model concepts for reading model cards & debugging behaviour */
export const llmAdvancedSlides: SlideData[] = [
  {
    id: "llm-advanced-open",
    title: "LLM advanced",
    variant: "title",
    eyebrow: "Concepts · advanced",
    content: (
      <>
        <p className="slide-lead">
          One level deeper: decoder-only stacks, mixture of experts, and what
          “training” actually means on a model card.
        </p>
        <div className="title-meta">
          <div className="title-meta__line" />
          <span className="title-meta__label">
            Enough to debug behaviour — not a research course
          </span>
        </div>
      </>
    ),
  },
  {
    id: "llm-transformers-deep",
    title: "Transformers, a bit deeper",
    eyebrow: "Concepts · advanced",
    variant: "split",
    content: (
      <div className="slide-split">
        <div>
          <ul className="slide-list">
            <li>
              <strong>Decoder-only</strong> — typical chat & coding models
              (generate left → right)
            </li>
            <li>
              <strong>Heads & layers</strong> — many attention patterns stacked
              deep
            </li>
            <li>
              <strong>Cost intuition</strong> — longer context ≈ more attention
              work
            </li>
            <li>
              When people say “the model looked at…” they mean attention over
              tokens in context
            </li>
          </ul>
        </div>
        <pre className="slide-code-block">
          <code>
            <span className="cmt"># Rough shapes (chat / coding)</span>
            {"\nencoder-decoder  → translation-era\n"}
            <span className="fn">decoder-only</span>
            {"     → GPT-style assistants\n\n"}
            <span className="cmt"># Limits you feel as a user</span>
            {"\ncontext length ↑  →  memory & $ ↑\n"}
            {"attention cost   ~  tokens² (intuition)\n"}
          </code>
        </pre>
      </div>
    ),
  },
  {
    id: "llm-moe",
    title: "Mixture of Experts",
    eyebrow: "Concepts · advanced",
    variant: "diagram",
    content: <MoERouter />,
  },
  {
    id: "llm-training",
    title: "Pretrain · fine-tune · post-train",
    eyebrow: "Concepts · advanced",
    variant: "diagram",
    content: <TrainingPipeline />,
  },
  {
    id: "llm-post-training",
    title: "Why chat models behave",
    eyebrow: "Concepts · advanced",
    content: (
      <>
        <p className="slide-lead">
          Post-training is why a raw base model and a coding assistant feel like
          different products.
        </p>
        <ul className="slide-list">
          <li>
            <strong>Instruction tuning</strong> — follow user requests and formats
          </li>
          <li>
            <strong>Preference / RL-style methods</strong> — helpful, safer,
            on-brand style (e.g. RLHF-family ideas)
          </li>
          <li>
            Coding relevance: tool-call schemas, refusals, verbosity, “do what I
            meant”
          </li>
          <li>
            When the model ignores your repo style — check rules & examples, not
            only the base weights
          </li>
        </ul>
        <div className="slide-pill-row">
          <span className="slide-pill">base ≠ assistant</span>
          <span className="slide-pill">post-train shapes behaviour</span>
        </div>
      </>
    ),
  },
];
