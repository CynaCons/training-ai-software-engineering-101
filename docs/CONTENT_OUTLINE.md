# Training content outline (draft)

Working notes for the AI Software Engineering 101 curriculum.  
Refine section by section — this is the source of truth for *what to teach*, not final slide copy.

**Status:** LLM basics + advanced are in the deck (`llmBasics` / `llmAdvanced`). Advanced now includes a full transformer architecture arc (2017 stack → QKV → causal → decoder-only → RoPE → KV cache) before MoE/training.  
**Delivery target:** often longer than 50 min if all concept slides stay — **short path: skip LLM advanced** (or jump from section open to MoE / post-train).

---

## Arc (high level)

1. **How we got here** — recent model evolution; why agents are possible now  
2. **LLM foundations** — what an LLM is, tokens, **attention**, transformers  
3. **Deeper model concepts** — MoE, pretraining, training, post-training  
4. **The agentic leap** — tool calling + harness → read/edit in a repo → turn-based autonomy  
5. **Software engineering practice** — using agents in real repos (modes, verify, HITL, etc.)

---

## Part A — Path to the recent model evolution

**Intent:** Set the stage. Audience understands that “chatbots” and “coding agents” sit on a short stack of ideas that matured quickly.

Topics to cover (order TBD while refining):

- Why language models matter for software work  
- Brief timeline / inflection points (high level, not a history lecture)  

*Slides in deck:* `landmark-papers` (anchor paper + follow-ons) ·
`evolution-timeline` (2017 Transformer → Jul 2026 agent teams, "you are here";
owner: timelines go to July 2026, not stopping 2025)
- **Landmark publications** — especially Google’s Transformer paper  
- From autocomplete → chat → tool-using agents  
- What changed recently that unlocked agentic coding products  

### Landmark papers (teach with references)

Full citations: [`docs/REFERENCES.md`](REFERENCES.md). Slide in deck: `landmark-papers`.

| Year | Paper | Org | Why it matters here |
|------|-------|-----|---------------------|
| 2017 | *Attention Is All You Need* (Vaswani et al.) | Google Brain / Research | **The** architecture behind modern LLMs — Transformer |
| 2018 | *BERT* (Devlin et al.) | Google AI | Pretraining transformers for language at scale |
| 2020 | *Language Models are Few-Shot Learners* (GPT-3) | OpenAI | Scale + in-context learning goes mainstream |
| 2022+ | InstructGPT / chat post-training (e.g. Ouyang et al.) | OpenAI (+ many labs) | Makes models usable as assistants |

**Call out in training:** the major inflection is Vaswani et al. 2017 — without Transformers, today’s LLM generation (and coding agents on top) does not exist in this form.

*Open questions for refinement:* how deep on history vs jump straight to LLM mechanics?

---

## Part B — LLM foundations (must teach)

**Intent:** Shared vocabulary before agentic tooling.

### What’s an LLM?

- Large language model: predicts next tokens given context  
- Trained on large text corpora; useful as a general reasoning / generation engine  
- Not a database, not “understanding” in the human sense — probabilistic generation  

### Underlying tech (stack, plain language)

- Neural networks at scale  
- Training on next-token prediction as the core objective (pretraining intuition)  
- Inference = generating tokens one after another  

### Tokens

- Text is split into tokens (subwords / pieces), not always whole words  
- Context window = how many tokens the model can see at once  
- Implications: cost, truncation, “what the model remembers” in a session  

### Attention (technical intro — teach early)

**Intent:** Give a concrete mental model before saying “transformer.” Don’t skip this.

- When predicting the next token, the model **looks back** at earlier tokens  
- **Attention** = learned weighting: which previous tokens matter *for this prediction*  
- Different positions get different “focus” (e.g. a variable name ↔ its definition)  
- Multiple **attention heads** can track different relationships in parallel (light touch)  
- Why it matters for coding: long files, imports, error stacks — the model must attend to the right bits of context  
- Keep math optional; prefer a simple diagram (query ↔ keys → weights → weighted values)  

*Open questions:* one dedicated slide vs weave into transformers; show a tiny code-context example?

### Transformers (intro level)

- Architecture behind modern LLMs — **built around attention** as the core mechanism  
- Stack of layers: attention + feed-forward, repeated  
- Parallelizable training vs older sequential architectures (keep light)  
- Why transformers + attention enabled scaling to today’s models  

*Open questions:* diagrams vs metaphors; how much of the attention formula on-slide?

### Parameters & scale (owner: was missing from basics)

- A **parameter** = one learned number (weight) inside the network — attention
  and FFN weights are parameters
- “7B” = seven billion of them; the **count is capacity**
- Scale ladder: ~1B (laptop) → ~8B (one GPU) → ~70B (server) → ~1T-class
  (frontier / datacenter)
- More parameters → more capacity but slower + costlier per token; data and
  post-training decide how well the knobs are used

*Slide in deck:* `llm-parameters`

---

## Part C — More advanced model concepts

**Intent:** Engineer-depth architecture + training vocabulary for debugging agent behaviour and reading model cards.  
**Short path:** skip this whole section, or keep only MoE + post-training.

### Transformer architecture (in deck)

1. **2017 encoder–decoder** — self-attn + FFN stacks; decoder adds cross-attn + causal mask (Vaswani Fig. 1)  
2. **One block** — MHA → Add&Norm → FFN → Add&Norm (residuals + LayerNorm)  
3. **QKV / scaled attention** — `softmax(QKᵀ/√dₖ)V`  
4. **Multi-head** — parallel subspaces, concat + project  
5. **Causal mask** — autoregressive train + generate  
6. **Families → decoder-only** — BERT / T5 / GPT-style; coding assistants live in decoder-only  
7. **Open weights (Ollama)** — Llama / Mistral / Qwen / DeepSeek / Gemma; open weights ≠ open source; Ollama-style local serving; privacy / cost / control vs frontier capability (`llm-open-weights`)  
8. **Positions & RoPE** — order without RNNs; rotary into Q/K  
9. **KV cache & cost** — reuse past K/V; long context still costs  

Presentation note (owner, round 3): the 2017 slide is now story-driven
(translation job → two towers → “GPT kept the decoder”), and every
diagram-only slide in Part C carries a plain-language lead sentence.

### Mixture of Experts (MoE)

- Sparse experts replace dense FFN slots; router activates a few per token  
- Scale capacity without full dense compute on every forward pass  
- Practical implication: behavior can feel uneven across domains  

### Pretraining

- Large-scale next-token (or similar) learning on broad data  
- Learns language, code patterns, world knowledge *as statistics*  
- Expensive, foundation of the base model  

### Training (clarify vocabulary)

Be precise in slides — people overload “training”:

| Term | Meaning (draft) |
|------|------------------|
| **Pretraining** | Base model on huge corpora |
| **Training** (generic) | Any parameter update process |
| **Fine-tuning** | Further training on narrower data |
| **Post-training** | Alignment / preference / instruction stages after the base model |

### Post-training

- Instruction tuning — follow user requests  
- Preference / RL-style methods (e.g. RLHF / similar) — useful, helpful, safer style  
- Why chat models behave differently from raw base models  
- Relevance to coding: following tools schemas, refusing some actions, verbosity  

*Open questions:* name specific methods lightly vs deep dive; include distillation / quantization?

---

## Part D — Basic extensions that enabled agentic tooling

**Intent:** Bridge from “model that writes text” to “system that acts in a repo.”

### Chapter arc (owner wording, feedback round 3 — keep this order)

> Models got good at outputting tokens → we taught the models to follow rules
> → we taught them to output JSON objects to code tool calls → that led to
> agentic AI by having harnesses giving the agents the ability to operate on
> files and using bash commands.

Slide order now follows that chain: `tokens-to-agents` (staircase overview) →
`tool-calling` → `tools-reality` → `what-is-agentic` (synthesis equation) →
`chat-vs-agent` (interaction-mode contrast) → `turn-loop` → `agent-loop` → …

### Core idea (owner wording — keep this)

> The model has been given the ability to **call tools** by generating **JSON objects** (or similar structured payloads). A **scaffold / harness** captures that output and **translates** it into **actual tool calls** (read file, run terminal, etc.).

### Mechanism (teach explicitly)

1. **Model still only emits tokens** — including structured tool-call text/JSON  
2. **Schema / format** — tool name + arguments the harness understands  
3. **Harness / scaffold** — runtime around the model:
   - parse tool calls  
   - execute tools in the real environment  
   - return results as new context (observations)  
   - loop until final answer or stop  
4. **Agent loop** = model ↔ harness ↔ tools ↔ observations  

*Slides in deck:* `tool-calling` (mechanism, JSON → harness) · `tools-reality`
(read → change → operate arc) · `turn-loop` (turn-based autonomy + contrast)

### Evolution in coding agents (owner narrative — keep this arc)

How tool use turned into “can work in a project”:

1. **Read the world** — tools (often via **bash** / shell) let the model **read files**, list dirs, inspect the repo  
2. **Change the world** — tools to **edit files** (e.g. bash workflows, **git apply** / patch-style edits, later dedicated edit tools)  
3. **Independent operation** — once read + edit (+ run commands) exist, the model can **operate in a project on its own** by chaining tools  

### Turn-based autonomy (critical concept)

Not one-shot magic — a **turn-based** loop:

1. Model proposes a **tool call**  
2. Harness runs it and returns **output** (stdout, file contents, errors)  
3. Model **evaluates** that observation  
4. Model calls the **next** tool (or finishes)  

Repeat until the goal is met, the model stops, or the human interrupts.

> Suddenly the models had the ability to independently operate in a project by calling tools and using a turn-based approach: call tool → wait for output → evaluate → call next tool → …

### Contrast

- **Chat without tools:** model answers from context only  
- **Single tool call:** one action, then answer  
- **Agent (turn-based):** many tool rounds; progress emerges from the loop  

### Optional depth (later)

- Parallel tool calls within a turn  
- Approvals / permissions in the harness  
- MCP as a standard way to plug more tools into the same harness pattern  
- From bash-everything → specialized IDE tools (search, apply_patch, MCP) — same loop, better tools  

### Coding CLIs emerge (~2025 Q2–Q3)

**Intent:** After tool calling exists, productize the loop as a **terminal agent in a repo**.

- Wave of CLI coding agents: **Codex CLI**, **Claude Code**, **Gemini CLI**, **OpenCode**, etc.  
- Same architecture: model + harness + tools, run from the project directory  
- Read / edit / run commands locally; model inference usually remote  
- IDE agents and CLIs are packaging differences on the same idea  

*Slides in deck:* `cli-tools`

### What a CLI request does (diagram)

**Intent:** Demystify the path from keystroke to model output.

Flow to teach (diagram on slide `request-path`):

1. **CLI** — your prompt + session state / tool plan  
2. **HTTPS** — payload encapsulated in an encrypted request  
3. **Cloud** — typically lands in a provider region (often US)  
4. **Tokens** — text converted to token IDs  
5. **Model** — next-token generation (and optional tool-call JSON)  
6. **Response** — tokens decoded → text / tool calls → harness continues the turn  

Emphasize: the remote model does **not** see your disk; only what the harness packs into the request.

### Context & memory arc (right after the request path)

#### 1. The session context window — `context-memory`

- Every session opens a **context window** stored on the **LLM provider’s servers**  
- Each request **adds up** in that window  
- Tool calls and model output **fill** the window  
- Each new request includes the **entire previous conversation history**  
- Longer session → ever-growing context → model more aware / accurate of the thread, but cost and noise grow  

#### 2. Limits — don’t over-pollute — `context-limits`

- Context memory is **limited**  
- Don’t dump everything “just in case”  
- Despite bigger windows, we **cannot fit the whole project** in memory  
- Brains don’t either: memories are **pulled on demand**  
- Target the same architecture: small working set + retrieve when needed  

#### 3. Blank slate → files as extended memory — `markdown-memory`

- New session, or a full window ≈ **blank plate**  
  - Nuance: providers offer **compact**; still effectively a reset / new window  
- Palliate by storing information in the repo — usually **`.md` files**  
- Store there:
  - Basic project info reloaded each turn / session start  
  - Plans, detailed design, task lists — guide work over long periods  
- **Markdown files are essential** to making good use of models  

#### 4. Harness instruction files — `harness-instruction-files`

- Standard files auto-loaded by agent harnesses **each turn**:
  - **AGENTS.md**, **CLAUDE.md**, **copilot-instructions.md** (and peers)  
- Contain instructions + **links to other files** the model can load on demand  
- Bootstrap, not the entire knowledge base  

#### 5. RAG — retrieval as architecture — `rag-architecture`

- Pipeline: query → embed → vector index → top-k chunks → grounded answer  
- Contrast with **agentic retrieval**: coding CLIs mostly grep / list / open
  files on demand inside the loop — retrieval as tool calls  
- Same goal (right knowledge in context); RAG for large static corpora,
  the agent loop for a living repo  

---

## Part E — Your job as the engineer

**Intent:** Name the shift in craft before the practice tactics.

### Upstream ownership — `engineer-job`

**Metaphor (owner):** models are like super-capable specialists who still don’t know what *you* want — brilliant at execution once pointed, blank on mission until briefed. Our job is to **know what to do**, and **make them do it**.

(Slide wording avoids pejorative labels; keep the teaching punch: capability ≠ initiative on intent.)

Our job becomes:

- Understand **what** we want to do  
- Understand the **why**, the **what**, and the **how** at a **high level**  
- Know **what information** is needed to complete the task  
- Define **validation & output criteria** → definition of done  

Then: feed that to the AI (instructions + validation) and **let the AI create**.

### Real PRD / PLAN previews

Slides use excerpts from live projects:

- `powerplanner/PRD.md`, `powertimelines/PRD.md` → `methodology-prd`  
- `powerplanner/PLAN.md` (checklist + metrics + next-up) → `methodology-plan`

### Brief → instruct → validate — `engineer-briefing`

Flow: Clarify → Assemble info → Define done → Instruct AI → AI creates → You validate.

Diagram-led slides (not bullet dumps).

---

## Part F — Methodology (tricks)

**Intent:** Owner’s practical methodology for agentic engineering — habits and tricks.

### F1 — New project: PRD.md first

- Long-term overall vision of the tool/product → usually **PRD.md**  
- Covers: purpose, what it works with, users, performance goals, product goals, tech stack, etc.  
- You don’t know it all by heart — start from the idea, **iterate and refine PRD.md with the agent** until it captures enough to guide the rest of development  

*Slides:* `methodology-prd`, `methodology-prd-iterate`

### F1b — SRS.md: requirements as the contract (owner, round 4)

Between vision (PRD) and execution (PLAN) sits the **requirements layer**.
Owner practice, taken from the PowerTimeline repo (ASPICE-style SRS with
traceability):

- **`SRS.md` is the single source of truth** for requirements; large systems
  split it into per-area fragments (`SRS_LAYOUT.md`, `SRS_ZOOM.md`, …) plus an
  `SRS_INDEX.md` dashboard
- Every requirement has a **stable ID** (`CC-REQ-<AREA>-<NNN>`) and a table
  row: **acceptance criteria · code references · linked tests · status**
- **Status lifecycle:** Proposed → Approved → Implemented → Verified
- Real example on the slide: `CC-REQ-ZOOM-001` (cursor-anchored zoom), with its
  acceptance bullets, `src/app/hooks/useViewWindow.ts`, tests `v5/17·20·24`
- **Payoff at scale:** PowerTimeline tracks ~407 requirements (≈55% implemented,
  ≈42% verified) in one dashboard — the agent writes, links, and status-tracks
  them as it works, so ASPICE-style traceability is a byproduct of the loop,
  not a separate project
- Requirements trace all the way to tests → this connects directly to the
  "closing the loop" theme later in the chapter

*Slides:* `methodology-srs` (traceability chain + real snippet),
`methodology-srs-scale` (coverage dashboard + lifecycle)

### F2 — PLAN.md (most important)

- Split product development into **iterations and sub-iterations**  
- Real engineering: choose what to build first vs next  
- **Baby steps** in the right direction; each step working correctly and looking good  
- Prefer **checklist-only** plans  
- Ask agents to **update the plan before and after** their tasks  

*Slides:* `methodology-plan`, `methodology-checklists`

### F3 — Plan mode to start a slice

- To start an iteration / sub-iteration, use **Plan mode**  
- Explain: a **harness skill** that forces the agent to explore, ask the user questions, gather information into a file, then work only when the user **approves**  

*Slide:* `methodology-plan-mode`

### F4 — Rhythm & durable context

- Iterate over product iterations until satisfied  
- New idea → ask the agent to **add it as an iteration** in PLAN.md  
- Keep the plan **lean and clear**; compress when needed  
- **Never really clear** the plan — agents keep project context without reverse-engineering git  

*Slide:* `methodology-loop`

### F4b — Self-reinforcing .md files (owner, round 3)

- Agents **auto-update their own instruction files** as they learn the repo:
  AGENTS.md rules, PLAN.md checkboxes, new pointers — in the same commit  
- Next session auto-loads the updated files and starts smarter — memory that
  compounds without retraining  
- Worked example: this deck’s repo (AGENTS.md “update this file”, PLAN.md
  iteration log)  

*Slide:* `methodology-self-updating`

### F5 — Closing the loop (visibility + self-evaluation)

**Intent:** You set final criteria; the agent needs **information and visibility** on its own work so it can **evaluate** progress.

*Title slide:* `closing-the-loop`

#### Web / desktop

- Agent manipulates a **browser** (or UI automation) and tests behaviour against criteria  

*Slide:* `methodology-web-visibility`

#### Bugs → tests (TDD-flavored)

- When you find a bug: agent designs a **test that reproduces** how you found it  
- Agent fixes; verifies the bug is lifted using that test  

*Slide:* `methodology-bug-tdd`

#### Embedded

- Give the agent a way to **visualize / observe** embedded behaviour:
  - SIL with simulated / emulated values  
  - Debugger interfaces  
  - CAN / XCP read–write  
  - Measurement devices plugged so the AI can close the loop  
- Some steps only the human can do — still wire what you can  

*Slide:* `methodology-embedded-loop`

#### Embedded reference material (extra)

- Feed **datasheets** so the model can find registers  
- Use **MCU debugger description files** (registers, addresses, basic descriptions)  
- Point at vendor **SDK / HAL / example projects** on GitHub — “how is this done there?”  
- **Linux kernel** as a strong C reference  

*Slide:* `methodology-embedded-refs`

#### Architecture requirement

- Design the project so the loop **can** close — observability / actuability is an **architectural requirement** for agentic success, not an afterthought  

*Slide:* `methodology-arch-loop`

#### Loop engineering

- With a closed loop: give a set of **goals**, ask the agent to **iterate indefinitely** toward them  
- You still own criteria and interrupts  

*Slide:* `methodology-loop-engineering` (dedicated control-loop schematic since round 3)

### F5c — From papers to implementations (owner, round 3)

- Agents collapse science-to-code latency: **look up the latest publications,
  evaluate which findings match our problem, fit them to our problem**  
- Loop: scan → evaluate fit (data / latency / licence / hardware) → prototype
  in a branch → measure vs baseline → keep or drop  
- Benchmarks decide, not the abstract’s claims  

*Slide:* `methodology-papers`

### F5d — Rapid tooling (owner, round 5)

Two fast ways to build *just enough* to make progress — often better than a
full app.

#### Jupyter notebooks — `methodology-notebooks`

- The owner's default sketchpad: **learn** (poke an API / library / dataset),
  **visualize** (charts, tables, images inline), **evaluate & process data**,
  and keep small **reusable mini-tools** (ipywidgets)
- **Works natively with agents**: cell → run → read output → adjust is a tight
  closed loop with no app to build; faster than scaffolding a UI
- Teach it as: when you need to *know* or *see* something (not ship it), reach
  for a notebook first

#### Easy web & local apps — `methodology-apps`

- Recommended stack: **React (+ Vite)** frontend — one skill for web and desktop
- **Package to desktop:** **Tauri** (Rust backend · OS webview · tiny binary)
  or **Electron** (Node.js · ships Chromium · max compatibility)
- **Local web-app pattern:** a **Vite dev proxy** catches `/api/*` calls from
  the frontend and forwards them to a real backend — e.g. **Python (FastAPI)** —
  so the UI just does `fetch("/api/…")` with no CORS/port wiring:

  ```ts
  // vite.config.ts
  server: { proxy: { "/api": "http://127.0.0.1:8000" } } // Python
  ```

- Dev vs ship: in the packaged app, bundle the backend as a Tauri sidecar /
  Electron child process, or move logic into Rust commands (Tauri `invoke`)

### F5b — Orchestration patterns

#### Coordinator pattern — `methodology-coordinator`
- **Manager of agents:** one agent owns the mission, delegates to specialists, integrates results  
- **Campaign loop (single agent):** e.g. run automated tests → poll results → check plausibility → fix & log → restart → continue until full campaign  

#### Agent personalities — `methodology-personalities`
- Stable instruction sets + scoped context (architect / implementer / tester / PM)  
- Keeps each agent’s window unpolluted by other roles’ noise  

#### More patterns (TBD)
- Owner will add another orchestration pattern after review — leave a slide slot when ready  

### F6 — Skills & MCP

#### Skills — `methodology-skills`

- Packets of instructions for doing something **a certain way**  
- Distributable to team members  
- Loaded when the model **recognizes** the task needs that skill, or when **called explicitly**  
- Not in context every turn — on demand  

#### MCP — `methodology-mcp`

- Way for the model to **call code** (usually Python)  
- Encapsulate complex programming workflows behind a **simple tool API**  
- Heavy compute runs outside the model; you mainly spend tokens on the **tool-call output** and whatever **observation** is returned into context  
- **Bridge the technical ↔ human gap:** name tools how people talk about the system  
  - e.g. “turn on the terminal”, “reflash the application using the bootloader”, “dump the memory using the debugger”  
  - Model stays in human vocabulary; server owns drivers, flash sequences, protocols  

---




## Part G — Software engineering practice (REMOVED from deck, 2026-07-17)

The Practice and Ops & close chapters were removed from the delivered deck by
owner decision (out of scope for this training). The deck now ends after
Methodology → Skills & MCP. The old modules (`practice.tsx`, `ops.tsx`) are
recoverable from git history if a future variant needs them:

- Human in the loop, modes (Ask / Plan / Agent), prompt shape  
- Repo grounding, task sizing, verify  
- Failure modes, recovery, subagents, MCP, team habits  
- Walkthrough, cheatsheet, practice challenge  

*Visual rule (still applies deck-wide):* prefer diagrams / flows over
bullet-only slides where the idea is a process or contrast.

---

## Proposed slide sequence (sketch — not final)

1. Title / who this is for  
2. How we got here (recent evolution)  
2b. **Landmark papers** (Vaswani et al. 2017 + follow-ons)  
3. What is an LLM?  
4. Tokens & context windows  
5. **Attention** (intro)  
6. Transformers (built on attention)  
7. Transformers (a bit deeper) — optional split  
8. Mixture of Experts  
9. Pretraining  
10. Post-training (and vocabulary: train / fine-tune / align)  
11. From text to action: tool calling (JSON → harness)  
12. Read → edit → operate (bash, patches, project tools)  
13. **Turn-based autonomy** (call → wait → evaluate → next)  
14. The agent loop (interactive)  
15. **Coding CLIs emerge** (Codex, Claude, Gemini CLI, OpenCode, …)  
16. **What a CLI request does** (HTTPS → cloud → tokens → model → back)  
17. **Session context window** (history resends every turn)  
18. **Limits · pull on demand** (don’t pollute; brain analogy)  
19. **Blank slate → .md as memory** (plans, project facts)  
20. **AGENTS.md / CLAUDE.md / copilot-instructions.md**  
21. **Your job shifts upstream** (why / what / how / info / done)  
22. **Brief → instruct → validate** (AI creates; you own done)  
23. … practice modules (modes, prompts, verify, etc.)  

---

## Refinement checklist

- [x] LLM basics in deck (LLM, tokens, attention, transformers)  
- [x] LLM advanced in deck (architecture arc, MoE, training vocabulary, post-training)  
- [ ] Glossary slide: token, attention, context, pretrain, post-train, tool call, harness, turn  
- [x] Timed short path noted (skip LLM advanced in ~50-min delivery)  
- [ ] Live demo beat for closing the loop 

---

## Out of scope for this note

- Final slide wording  
- Visual redesign  
- PowerNote integration  
