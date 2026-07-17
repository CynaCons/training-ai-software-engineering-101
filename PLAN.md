# PLAN.md — AI Software Engineering 101

## Iteration: feedback round 2 (2026-07-17)

Owner feedback: tool-calling bridge was under-built vs. CONTENT_OUTLINE (owner
wording); wants a small timeline slide for the 2017→2025 arc; failure modes
should return but better than the old bullet list; general visual polish.

- [x] New slide `tool-calling` — ToolCallBridge: model↔harness transcript with real JSON + static "The mechanism" panel (owner wording: model only emits tokens; harness parses, executes, feeds output back; loop)
- [x] Reworked `tools-reality` — ToolReach: owner arc read the world → change the world → operate independently (bash → patches/edit tools → chained autonomy)
- [x] New slide `turn-loop` — TurnLoop: 3 turns with growing context bars + chat/single-call/agent contrast (owner "critical concept")
- [x] New slide `evolution-timeline` — 2017 Transformer → 2025 coding agents, alternating timeline, "you are here" pulse
- [x] New slide `failure-modes` — 5 warning cards with tell + fix, spotlight cycle; segues into "Context is the product"
- [x] Foundations reordered to owner sketch: what-is-agentic → tool-calling → tools-reality → turn-loop → agent-loop → failure-modes → context-product
- [x] Visual polish: chapter-numeral watermark on section-open slides; blueprint corner registration marks on all slides
- [x] outline.ts + smoke test sequences extended; CONTENT_OUTLINE slide notes synced
- [x] Verify: npm run smoke (9/9 + build clean) + browser check of all new slides, console clean
- [x] Commit + push to origin/main (owner request — Pages deploy runs from main)

## Iteration: feedback round 1 (2026-07-17)

Owner feedback: Attention & Transformers slides unclear; 2017 slide must not
swap text dynamically; dislikes "What is agentic AI" and "The agent loop";
remove Practice + Ops chapters.

- [x] Remove Practice + Ops chapters (index.tsx, outline.ts, smoke test, module files deleted — recoverable via git)
- [x] Attention rebuilt: Winograd sentence ("…the ball because it was ___") with attention arcs to *ball*/*robot*; static intro + caption; playbar steps it/was/next
- [x] Transformers rebuilt: tokens-in → [Attention+FFN] block ×N → next-token scores pipeline, with static plain-language explainer column
- [x] 2017 architecture: caption is now static (one fixed explanation); highlight/focus motion kept
- [x] "What is agentic AI?" rebuilt: Agent = LLM + Tools + Loop + Your goal equation, plus Chat-vs-Agent contrast strip
- [x] "The agent loop" rebuilt: phase ring + concrete terminal run trace (fix flaky test, fail → adjust → green); all text static, highlight moves
- [x] docs/CONTENT_OUTLINE.md notes the removed Part G
- [x] Verify: npm run smoke (9/9 + build clean) + browser screenshots of all five reworked slides, console clean

## Iteration: visual enhance + diagram motion (2026-07-17)

Goal: UX-first visual pass. One motion concept — **signal flow** (pulses traveling
through pipelines, the literal subject of the training) — plus rhythm and
readability fixes. No slide ids, order, or content copy changes.

### Tasks

- [x] FlowSteps: staggered entrance + traveling highlight pulse (touches ~10 slides)
- [x] RequestPath: animated packet traveling CLI → model → response
- [x] LandmarkPapers: timeline rail with year ticks + staggered card entrance
- [x] RefineSpiral: rotating arm + sequential node highlight, larger orbit
- [x] AgentPersonalities: readable inactive cards, kill AnimatePresence blank gap, stable detail height
- [x] ModelFamilies: readable inactive cards (opacity 0.5 → 0.75, no scale-down blur)
- [x] EncoderDecoderArch: unclip / chip-style the cross-attn bridge label
- [x] SlideCard: subtle content entrance stagger (present mode only)
- [x] Title-variant slides: center body content (remove dead middle band)
- [x] DiagramPlaybar: lit Play state + larger step dots
- [x] Ambient glow drift in canvas background (reduced-motion safe)
- [x] Scale up sparse diagrams to fill dead vertical space (tokens, attention, causal mask, KV cache, MoE, request path, flow steps)
- [x] Bonus: brand favicon (teal dot) — was a 404 on every load
- [x] Verify: npm run smoke (9/9 tests + build clean) + browser screenshots of affected slides
