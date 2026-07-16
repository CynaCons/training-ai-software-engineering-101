import { AttentionMap } from "../../components/diagrams/AttentionMap";
import { TokenStream } from "../../components/diagrams/TokenStream";
import { TransformerStack } from "../../components/diagrams/TransformerStack";
import type { SlideData } from "../types";

/** Part B — basic LLM vocabulary before agentic tooling */
export const llmBasicsSlides: SlideData[] = [
  {
    id: "llm-basics-open",
    title: "LLM basics",
    variant: "title",
    eyebrow: "Concepts · basic",
    content: (
      <>
        <p className="slide-lead">
          Shared vocabulary before agents: what an LLM is, tokens, attention,
          and the Transformer stack underneath coding tools.
        </p>
        <div className="title-meta">
          <div className="title-meta__line" />
          <span className="title-meta__label">
            Intuition first · light on math
          </span>
        </div>
      </>
    ),
  },
  {
    id: "llm-what",
    title: "What is an LLM?",
    eyebrow: "Concepts · basic",
    content: (
      <>
        <p className="slide-lead">
          A <strong>large language model</strong> predicts the next token given
          context — trained on huge text/code corpora, used as a general
          generation and reasoning engine.
        </p>
        <ul className="slide-list">
          <li>Not a database — it doesn’t “look up” facts reliably</li>
          <li>Not human understanding — probabilistic next-token generation</li>
          <li>Inference = emit tokens one after another from what it can see</li>
          <li>Useful for software work when grounded with tools and context</li>
        </ul>
        <div className="slide-pill-row">
          <span className="slide-pill">next-token prediction</span>
          <span className="slide-pill">neural net at scale</span>
        </div>
      </>
    ),
  },
  {
    id: "llm-tokens",
    title: "Tokens",
    eyebrow: "Concepts · basic",
    variant: "diagram",
    content: <TokenStream />,
  },
  {
    id: "llm-attention",
    title: "Attention",
    eyebrow: "Concepts · basic",
    variant: "diagram",
    content: <AttentionMap />,
  },
  {
    id: "llm-transformers",
    title: "Transformers",
    eyebrow: "Concepts · basic",
    variant: "diagram",
    content: <TransformerStack />,
  },
];
