# AI Software Engineering 101

Interactive slide training for working software engineers learning agentic IDE workflows.

**Live:** https://cynacons.github.io/training-ai-software-engineering-101/

## Audience & delivery

| | |
|---|---|
| **Audience** | Engineers new to agents that edit repos (not just chat) |
| **Length** | ~45–60 minutes |
| **Stance** | Tool-agnostic concepts, Cursor-flavored examples (modes, MCP, rules) |

## Quick start

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.

## Content draft

Curriculum ideas (LLM foundations → tool-calling harness → practice) live in [`docs/CONTENT_OUTLINE.md`](docs/CONTENT_OUTLINE.md). Refine there before rewriting slides.

Landmark paper citations (Vaswani et al. 2017 and follow-ons): [`docs/REFERENCES.md`](docs/REFERENCES.md).

## Smoke tests

```bash
npm test          # vitest smoke suite
npm run smoke     # tests + production build
```

## Curriculum outline

**Foundations**

1. Open — who this is for, what you’ll leave with  
2. Completion vs chat vs agent  
3. What is agentic AI  
4. The agent loop *(interactive)*  
5. Context is the product  
6. Tools that touch reality  

**Practice**

7. Human in the loop  
8. Modes of work (Ask / Plan / Agent)  
9. Prompt shape that works  
10. Repo grounding  
11. Task sizing  
12. Verify or it didn’t happen  

**Ops & close**

13. Failure modes  
14. Recovery patterns  
15. Subagents & parallel work  
16. MCP in practice  
17. Team habits  
18. Mini workflow walkthrough  
19. Cheatsheet  
20. Practice challenge  

## Navigation

- **Left outline** — hierarchical sections; click to jump (current topic highlighted)  
- **Arrow keys** or **Prev/Next** — move between slides  
- **C** or the **Canvas** toggle — overview with scrollbars  
  - Scroll wheel: up/down · **Shift+scroll**: left/right · **Ctrl+scroll**: zoom  
  - Drag empty canvas space to pan  

- **P** / **E** / **V** — pen, eraser, navigate (optional annotation)  

Slides are **1280×720** (16:9).

## Project structure

```
src/
  slides/
    index.tsx           # Ordered deck
    modules/            # Foundations, practice, ops content
  components/           # Presenter shell, diagrams
  styles/               # Design tokens
```

## Visual theme (draft)

Blueprint Workshop — dark slate, teal accent, Syne / Outfit / IBM Plex Mono.
