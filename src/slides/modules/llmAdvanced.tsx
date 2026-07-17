import { CausalMask } from "../../components/diagrams/CausalMask";
import { EncoderDecoderArch } from "../../components/diagrams/EncoderDecoderArch";
import { KvCache } from "../../components/diagrams/KvCache";
import { ModelFamilies } from "../../components/diagrams/ModelFamilies";
import { MoERouter } from "../../components/diagrams/MoERouter";
import { MultiHeadAttention } from "../../components/diagrams/MultiHeadAttention";
import { PositionalSignal } from "../../components/diagrams/PositionalSignal";
import { QkvAttention } from "../../components/diagrams/QkvAttention";
import { TrainingPipeline } from "../../components/diagrams/TrainingPipeline";
import { TransformerBlock } from "../../components/diagrams/TransformerBlock";
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
          Same ideas as basics — now with enough structure to read a model card
          and reason about context cost. No research math required.
        </p>
        <ul className="slide-list">
          <li>
            <strong>Architecture</strong> — how tokens become predictions (blocks,
            attention, masks)
          </li>
          <li>
            <strong>Decoder-only</strong> — why chat & coding tools share one shape
          </li>
          <li>
            <strong>Inference tricks</strong> — KV cache, MoE, and what “training”
            vocabulary actually means
          </li>
        </ul>
        <div className="title-meta">
          <div className="title-meta__line" />
          <span className="title-meta__label">
            Play the diagrams · pause anytime · skip on a short path
          </span>
        </div>
      </>
    ),
  },
  {
    id: "llm-arch-2017",
    title: "The 2017 architecture",
    eyebrow: "Concepts · advanced · Vaswani et al.",
    variant: "diagram",
    content: <EncoderDecoderArch />,
  },
  {
    id: "llm-arch-block",
    title: "Inside one block",
    eyebrow: "Concepts · advanced · residual + norm",
    variant: "diagram",
    content: <TransformerBlock />,
  },
  {
    id: "llm-arch-qkv",
    title: "Q, K, V — scaled attention",
    eyebrow: "Concepts · advanced · attention math",
    variant: "diagram",
    content: <QkvAttention />,
  },
  {
    id: "llm-arch-mha",
    title: "Multi-head attention",
    eyebrow: "Concepts · advanced · parallel subspaces",
    variant: "diagram",
    content: <MultiHeadAttention />,
  },
  {
    id: "llm-arch-causal",
    title: "Causal mask",
    eyebrow: "Concepts · advanced · autoregression",
    variant: "diagram",
    content: <CausalMask />,
  },
  {
    id: "llm-arch-families",
    title: "Three families → decoder-only",
    eyebrow: "Concepts · advanced · where chat lives",
    variant: "diagram",
    content: <ModelFamilies />,
  },
  {
    id: "llm-arch-positions",
    title: "Positions & RoPE",
    eyebrow: "Concepts · advanced · order without RNNs",
    variant: "diagram",
    content: <PositionalSignal />,
  },
  {
    id: "llm-arch-kvcache",
    title: "KV cache & context cost",
    eyebrow: "Concepts · advanced · inference",
    variant: "diagram",
    content: <KvCache />,
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
          The base model learned “what text looks like.” Post-training teaches
          “how to act as an assistant.” Same architecture — different product.
        </p>
        <ul className="slide-list">
          <li>
            <strong>Instruction tuning</strong> — practice Q&amp;A style: when a
            human asks, answer in a helpful format (not raw continuation)
          </li>
          <li>
            <strong>Preference / RL-style methods</strong> — humans (or proxies)
            rank answers; the model shifts toward helpful, safer, on-brand style
            (RLHF-family ideas)
          </li>
          <li>
            <strong>What you feel in coding tools</strong> — tool-call JSON shapes,
            how verbose it is, when it refuses, how well it “does what I meant”
          </li>
          <li>
            <strong>Debug tip</strong> — if it ignores your repo style, fix{" "}
            <em>rules, examples, and prompts</em> first — not “the base weights”
          </li>
        </ul>
        <div className="slide-pill-row">
          <span className="slide-pill">base ≠ assistant</span>
          <span className="slide-pill">post-train shapes behaviour</span>
          <span className="slide-pill">harness still owns the mission</span>
        </div>
      </>
    ),
  },
];
