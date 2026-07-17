# Claude instructions — AI Software Engineering 101

**Secondary entrypoint.** The normative agent guide lives in [`AGENTS.md`](AGENTS.md).  
Read that file first and follow it. Keep Claude-specific notes here only when they diverge.

## Delegation

1. Open and follow **`AGENTS.md`** for project shape, commands, deck-edit workflow, and content principles.
2. Prefer editing slides/diagrams over inventing parallel doc systems.
3. After substantive changes, run `npm run smoke` before claiming done.

## Claude-oriented habits

- Use the **Vite preview / browser** when checking layout of 1280×720 slides if the task is visual.
- For multi-step curriculum work, keep `docs/CONTENT_OUTLINE.md` aligned but do **not** treat it as slide copy.
- When adding interactive diagrams, reuse `DiagramPlaybar` + `useAutoplayStep` so presenters can Play / Pause / Step.
- GitHub Pages deploys from `main` via Actions — don’t hand-edit `dist/` for publish.

If guidance here conflicts with `AGENTS.md`, **`AGENTS.md` wins** — then fix this file to match.
