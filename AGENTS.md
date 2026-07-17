# Agent instructions — AI Software Engineering 101

Shared source of truth for coding agents in this repo.  
Codex / Cursor-style harnesses load this file. **Claude Code** should start from [`CLAUDE.md`](CLAUDE.md), which delegates back here so guidance stays in one place.

## What this project is

Interactive **slide training** (presenter shell + canvas overview) for **AI Software Engineering 101** — agentic IDE workflows for working engineers.

- **Live:** https://cynacons.github.io/training-ai-software-engineering-101/
- **Stack:** React 19 + TypeScript + Vite + Framer Motion + Zustand + Vitest
- **Visual theme:** “Blueprint Workshop” — dark slate, teal accent, Syne / Outfit / IBM Plex Mono
- **Slide size:** 1280×720 (16:9) — see `src/slides/dimensions.ts`

This is a **content + teaching-UX** product, not a general app. Prefer diagrams and motion over bullet walls. Prefer clear engineering explanations over research dumps.

## Layout

```
src/
  slides/
    index.tsx           # Ordered deck (import order = presentation order)
    outline.ts          # Left-nav hierarchy (keep in sync with slide ids)
    modules/            # Per-chapter slide arrays (foundations, llm*, methodology, …)
    types.ts, dimensions.ts
  components/
    TrainingCanvas.tsx  # Presenter shell (present / canvas / outline / drawing)
    diagrams/           # Teaching visuals (prefer interactive + DiagramPlaybar)
    *.tsx               # Shell chrome (OutlineNav, SlideCard, drawing, …)
  hooks/                # e.g. useAutoplayStep for diagram autoplay
  stores/               # Zustand (drawing)
  styles/               # Design tokens + global CSS
  test/                 # Vitest smoke suite
docs/
  CONTENT_OUTLINE.md    # Curriculum intent (what to teach)
  REFERENCES.md         # Landmark papers & citations
.github/workflows/
  deploy.yml            # GitHub Pages (push to main → smoke + deploy)
```

## Commands

```bash
npm install
npm run dev          # Vite dev server (usually http://localhost:5173)
npm test             # Vitest smoke
npm run smoke        # vitest + production build (required before claiming done)
npm run build        # tsc -b && vite build
npm run preview      # preview dist/
```

Deploy: pushing `main` runs `.github/workflows/deploy.yml` (smoke then Pages).  
`vite.config.ts` uses `base: "./"` for project Pages.

## How to change the deck

1. **Add / edit slides** in the right module under `src/slides/modules/`.
2. **Register order** only via `src/slides/index.tsx` (and foundations split for open/papers if needed).
3. **Update outline** in `src/slides/outline.ts` — every navigable item needs a real `slideId`.
4. **Extend smoke** in `src/test/smoke.test.tsx` when you add ids that define chapter order.
5. **Curriculum notes** — when teaching intent changes, update `docs/CONTENT_OUTLINE.md` (and `docs/REFERENCES.md` for citations).
6. **Diagrams** — new visuals go in `src/components/diagrams/`; shared styles in `diagrams.css`. Prefer:
   - Framer Motion + `DiagramPlaybar` / `useAutoplayStep` for architecture & methodology diagrams
   - Presenter-safe Play / Pause / Step (don’t rely on hover-only teaching)
   - Plain-language captions (“why you care”) for non-ML experts on advanced LLM slides

## Content principles

- Training name: **AI Software Engineering 101** (not “Agentic AI …” branding in chrome/title).
- Author on open slide: Constantin Chabirand (portfolio / GitHub / LinkedIn).
- Methodology is the distinctive core: PRD.md → PLAN.md → close the loop → skills / MCP / orchestration.
- LLM **basics** stay light; **advanced** carries architecture depth (still engineer-facing, not a paper club).
- Short delivery path: advanced LLM section is skippable — don’t make later chapters depend on every advanced slide.
- Orchestration patterns already in deck: coordinator (manager-of-agents + campaign loop), agent personalities. More patterns TBD by owner.

## Agent behaviour here

1. **Read before edit** — especially `outline.ts`, the target module, and related diagrams.
2. **Stay on the task** — don’t rewrite the whole curriculum when asked for one slide.
3. **Match existing patterns** — Blueprint tokens, diagram CSS vocabulary, playbar chrome.
4. **Verify** — run `npm run smoke` after substantive UI/content changes.
5. **Don’t invent product scope** — no backend, no auth, no CMS unless the user asks.
6. **Git** — only commit / push when the user explicitly asks.
7. **Secrets** — none expected; never add credentials.

## What not to do

- Don’t bloat auto-loaded context with giant pasted slide dumps — point at modules/files instead.
- Don’t replace interactive diagrams with static bullet lists “for simplicity.”
- Don’t change slide dimensions or theme tokens casually.
- Don’t force-push or skip hooks unless the user asks.
- Don’t treat `docs/CONTENT_OUTLINE.md` as final slide copy — it’s intent; slides are the product.

## Pointers (pull on demand)

| Need | Open |
|------|------|
| Curriculum intent | `docs/CONTENT_OUTLINE.md` |
| Paper citations | `docs/REFERENCES.md` |
| Deck order | `src/slides/index.tsx` |
| Nav tree | `src/slides/outline.ts` |
| Shell UX | `src/components/TrainingCanvas.tsx` |
| Smoke expectations | `src/test/smoke.test.tsx` |
| User-facing overview | `README.md` |

When project conventions evolve, **update this file** so the next agent inherits them.
