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
    content: (
      <>
        <p className="slide-lead slide-lead--diagram">
          Every layer repeats the same two moves — <strong>mix context</strong> (attention), then <strong>process it</strong> (feed-forward) — with shortcut connections so hundreds of stacked layers still train. “Deeper model” just means more of these blocks.
        </p>
        <TransformerBlock />
      </>
    ),
  },
  {
    id: "llm-arch-qkv",
    title: "Q, K, V — scaled attention",
    eyebrow: "Concepts · advanced · attention math",
    variant: "diagram",
    content: (
      <>
        <p className="slide-lead slide-lead--diagram">
          Attention is a lookup: each token asks a <strong>question (Q)</strong>, offers a <strong>label (K)</strong> and <strong>content (V)</strong> — match strength decides what gets copied forward. That’s the whole formula; the rest is bookkeeping.
        </p>
        <QkvAttention />
      </>
    ),
  },
  {
    id: "llm-arch-mha",
    title: "Multi-head attention",
    eyebrow: "Concepts · advanced · parallel subspaces",
    variant: "diagram",
    content: (
      <>
        <p className="slide-lead slide-lead--diagram">
          One attention pattern tracks one kind of relationship. Heads run <strong>many patterns in parallel</strong> — one on syntax, one on variable ↔ definition, one on error text. That’s how it juggles imports, types, and stack traces at once.
        </p>
        <MultiHeadAttention />
      </>
    ),
  },
  {
    id: "llm-arch-causal",
    title: "Causal mask",
    eyebrow: "Concepts · advanced · autoregression",
    variant: "diagram",
    content: (
      <>
        <p className="slide-lead slide-lead--diagram">
          While training, a mask hides every token to the right — the model may <strong>never peek at the future</strong>. This is why generation runs strictly left to right, one token at a time, and can’t go back to fix earlier output.
        </p>
        <CausalMask />
      </>
    ),
  },
  {
    id: "llm-arch-families",
    title: "Three families → decoder-only",
    eyebrow: "Concepts · advanced · where chat lives",
    variant: "diagram",
    content: (
      <>
        <p className="slide-lead slide-lead--diagram">
          The 2017 design split into three families; chat and coding models are all <strong>decoder-only</strong>. When a model card says “decoder-only transformer”, this is the shape it means.
        </p>
        <ModelFamilies />
      </>
    ),
  },
  {
    id: "llm-arch-positions",
    title: "Positions & RoPE",
    eyebrow: "Concepts · advanced · order without RNNs",
    variant: "diagram",
    content: (
      <>
        <p className="slide-lead slide-lead--diagram">
          Attention alone is <strong>order-blind</strong> — “A calls B” and “B calls A” would look identical. Position signals are mixed into each token’s vector; RoPE rotates them so <em>relative</em> distance survives long contexts.
        </p>
        <PositionalSignal />
      </>
    ),
  },
  {
    id: "llm-arch-kvcache",
    title: "KV cache & context cost",
    eyebrow: "Concepts · advanced · inference",
    variant: "diagram",
    content: (
      <>
        <p className="slide-lead slide-lead--diagram">
          Without a cache, every new token would recompute attention over the whole history. The <strong>KV cache</strong> stores each token’s keys and values instead — it’s the memory that makes long context fast but expensive, and where context pricing comes from.
        </p>
        <KvCache />
      </>
    ),
  },
  {
    id: "llm-moe",
    title: "Mixture of Experts",
    eyebrow: "Concepts · advanced",
    variant: "diagram",
    content: (
      <>
        <p className="slide-lead slide-lead--diagram">
          MoE swaps one giant feed-forward for <strong>many experts plus a router</strong> that picks a few per token — huge total capacity, small active compute. That’s the “xB total, yB active” line on modern model cards.
        </p>
        <MoERouter />
      </>
    ),
  },
  {
    id: "llm-training",
    title: "Pretrain · fine-tune · post-train",
    eyebrow: "Concepts · advanced",
    variant: "diagram",
    content: (
      <>
        <p className="slide-lead slide-lead--diagram">
          Three phases, one vocabulary: <strong>pretraining</strong> learns what text looks like, <strong>fine-tuning</strong> specialises it, <strong>post-training</strong> teaches it to behave. Knowing which phase does what tells you what a prompt can and can’t fix.
        </p>
        <TrainingPipeline />
      </>
    ),
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
