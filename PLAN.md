# PLAN.md — AI Software Engineering 101

## Iteration: feedback round 4 (2026-07-17) — COMPLETE

Owner ask: add requirements/SRS.md practice to the methodology section, using
real snippets from the PowerTimeline repo. Push straight to the mainline
(no PR).

- [x] Studied PowerTimeline SRS system (cloned repo): `SRS.md` single source of
      truth, ~30 per-area fragments + `SRS_INDEX.md` dashboard, stable
      `CC-REQ-<AREA>-<NNN>` IDs, table of acceptance/code/tests/status, lifecycle
      Proposed → Approved → Implemented → Verified, ~407 requirements tracked.
- [x] New slide `methodology-srs` (SrsTraceability): PRD → requirement (stable
      ID) → acceptance → code → tests → status chain, beside a real snippet of
      `CC-REQ-ZOOM-001` from `docs/SRS_ZOOM.md`.
- [x] New slide `methodology-srs-scale` (SrsDashboard): real coverage numbers
      (~407 reqs, 55% implemented, 42% verified), per-area implemented/verified
      bars, status-lifecycle strip. Positions agents as making ASPICE-style
      traceability cheap.
- [x] Placed both as a new `SRS.md` outline group between PRD.md and PLAN.md;
      synced `outline.ts`, smoke sequence, `docs/CONTENT_OUTLINE.md` (F1b).
- [x] Verify: `npm run smoke` (9/9 + build clean) + browser check of both
      slides at 1280×720, console clean.
- [x] Push straight to `main` (owner approved, no PR).

## Iteration: feedback round 3 (2026-07-17) — COMPLETE

Owner feedback (photo of review notes, 12 points): six content additions
(self-updating .md files, RAG, papers→implementation, timeline to July 2026,
open weights / Ollama, loop-engineering visuals) and six fixes (methodology
chart monotony, missing "parameters" concept in basics, unclear "2017
architecture" slide, more text in LLM advanced, misaligned Agent Loop visuals,
Agentic-foundations narrative order).

### Workstream 1 — quick fixes (small, independent)

- [x] **Timeline → July 2026** (`src/components/diagrams/EvolutionTimeline.tsx`):
      extend the 2017→2025 arc with 2026 milestones (frontier reasoning models,
      multi-agent orchestration going mainstream, agent-native tooling); move the
      "you are here" pulse to Jul 2026. Also sweep other slides that say the story
      stops in 2025 (aria-labels, captions, `LandmarkPapers` if needed).
- [x] **Agent Loop misalignment** (`src/components/AgentLoop.tsx` + `.css`):
      reproduce in browser at 1280×720, fix the phase-ring / trace layout drift,
      re-screenshot in present mode to confirm.
- [x] **Parameters in LLM basics** (`src/slides/modules/llmBasics.tsx`):
      introduce "parameters" and "number of parameters" where transformers are
      taught — weights as learned knobs, what 7B vs 70B vs ~1T actually means for
      capability/cost. Either a strip added to `TransformerStack` or a small new
      basics slide `llm-parameters` (outline + smoke updates if new id).

### Workstream 2 — Agentic foundations narrative reorder (owner's arc)

- [x] Restructure the chapter opening to the owner's causal story:
      **(1)** models got good at outputting tokens → **(2)** we taught them to
      follow rules (instruction tuning) → **(3)** we taught them to emit JSON
      tool calls → **(4)** harnesses gave them file edits + bash → agentic AI.
- [x] New or reworked bridge slide (e.g. `tokens-to-agents` staircase diagram,
      one step per stage above) placed at the start of foundations; reorder
      existing slides (`chat-vs-agent`, `what-is-agentic`, `tool-calling`,
      `tools-reality`, `turn-loop`) to follow that arc instead of leading with
      definitions.
- [x] Sync `src/slides/index.tsx`, `outline.ts`, `smoke.test.tsx`,
      `docs/CONTENT_OUTLINE.md`.

### Workstream 3 — LLM sections clarity

- [x] **"2017 architecture" rework** (`llm-arch-2017`, `EncoderDecoderArch.tsx`):
      current encoder/decoder diagram doesn't land. Reframe as a story slide —
      "the 2017 Transformer had two towers; GPT-style models kept only the
      decoder" — with a plain-language column explaining *why we show this*
      (everything in LLM advanced is a refinement of this one diagram), and a
      visual crossfade from full architecture → decoder-only highlight.
- [x] **More text in LLM advanced** (`llmAdvanced.tsx` + its diagrams): add a
      consistent plain-language explainer column/caption ("what it is / why you
      care") to the diagram-only slides (QKV, multi-head, causal mask, positions,
      KV cache, MoE, training pipeline) per the AGENTS.md caption guidance —
      keep diagrams primary, text secondary.

### Workstream 4 — new content slides

- [x] **Open weights (Ollama)** — new LLM-advanced slide `llm-open-weights` next
      to "Decoder-only families": open-weights ecosystem (Llama, Mistral, Qwen,
      DeepSeek), what "open weights ≠ open source" means, running locally with
      Ollama, tradeoffs (privacy/cost/control vs frontier capability).
- [x] **RAG architecture** — new slide near the foundations "Context & memory"
      group (`rag-architecture`): query → embed → vector search → top-k chunks
      into context → grounded answer; contrast with context-stuffing and
      agentic retrieval (grep/file-reads) so it connects to the CLI story.
- [x] **Papers → implementation** — new methodology slide
      (`methodology-papers`): the loop "find latest publications → evaluate
      which findings match our problem → prototype with the agent → keep or
      discard"; positions agents as the reason science-to-code latency collapsed.
      Add citations to `docs/REFERENCES.md`.
- [x] **Self-reinforcing .md files** — new methodology slide
      (`methodology-self-updating`, near "Iterate · don't wipe"): the agent
      updates its own AGENTS.md / CLAUDE.md / PLAN.md as it learns the project,
      so the next session inherits the lessons; this repo itself as the worked
      example. Cycle diagram: work → learn → write back → better next run.
- [x] Register all new ids in `index.tsx` + `outline.ts` + smoke; sync
      `docs/CONTENT_OUTLINE.md`.

### Workstream 5 — methodology visual variety

- [x] **De-duplicate chart types**: 6 of 18 methodology slides render `FlowSteps`
      (plan-mode, web-visibility, bug-tdd, embedded-loop, arch-loop,
      loop-engineering). Keep FlowSteps for at most 2; rebuild the rest as
      distinct interactive forms (e.g. bug-tdd as red→green test panel,
      web-visibility as browser+console split, embedded-loop as
      firmware↔sensor loop ring).
- [x] **Loop engineering visuals** (owner point 6): promote from a generic
      FlowSteps row to a dedicated `LoopEngineering` diagram — closed control
      loop (goals → act → observe → evaluate → repeat) drawn as an actual loop
      with a traveling pulse, DiagramPlaybar-driven, interrupt/stop node for the
      human.

### Verification & delivery

- [x] `npm run smoke` green after each workstream; browser pass over every
      touched slide at 1280×720 (present mode), console clean.
- [x] Update `docs/CONTENT_OUTLINE.md` + `docs/REFERENCES.md` once at the end.
- [x] Commit per workstream on `claude/project-independence-c7479y`; pushed.
- Notes: deck is now 60 slides; browser walk over all of them, console clean
  (only the sandbox-blocked Google Fonts fetch fails). `methodology-papers`
  teaches the practice without naming specific papers, so REFERENCES.md
  needed no new citations.

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
