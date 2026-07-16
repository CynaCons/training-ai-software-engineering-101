export interface OutlineNode {
  id: string;
  label: string;
  /** Jump target slide id (defaults to first descendant with a slideId) */
  slideId?: string;
  children?: OutlineNode[];
}

/**
 * Hierarchical deck outline (Word-style). Keep slideIds in sync with modules.
 */
export const deckOutline: OutlineNode[] = [
  {
    id: "start",
    label: "Start",
    children: [
      { id: "start-open", label: "Title & author", slideId: "open" },
      {
        id: "foundations-papers",
        label: "Landmark papers",
        slideId: "landmark-papers",
      },
    ],
  },
  {
    id: "llm-basics",
    label: "LLM basics",
    children: [
      { id: "llm-basics-open", label: "Section open", slideId: "llm-basics-open" },
      { id: "llm-what", label: "What is an LLM?", slideId: "llm-what" },
      { id: "llm-tokens", label: "Tokens", slideId: "llm-tokens" },
      { id: "llm-attention", label: "Attention", slideId: "llm-attention" },
      { id: "llm-transformers", label: "Transformers", slideId: "llm-transformers" },
    ],
  },
  {
    id: "llm-advanced",
    label: "LLM advanced",
    children: [
      {
        id: "llm-advanced-open",
        label: "Section open",
        slideId: "llm-advanced-open",
      },
      {
        id: "llm-transformers-deep",
        label: "Transformers deeper",
        slideId: "llm-transformers-deep",
      },
      { id: "llm-moe", label: "Mixture of Experts", slideId: "llm-moe" },
      {
        id: "llm-training",
        label: "Pretrain · fine-tune · post-train",
        slideId: "llm-training",
      },
      {
        id: "llm-post-training",
        label: "Why chat models behave",
        slideId: "llm-post-training",
      },
    ],
  },
  {
    id: "foundations",
    label: "Agentic foundations",
    children: [
      {
        id: "foundations-modes",
        label: "Completion · chat · agent",
        slideId: "chat-vs-agent",
      },
      {
        id: "foundations-agentic",
        label: "What is agentic AI?",
        slideId: "what-is-agentic",
      },
      {
        id: "foundations-loop",
        label: "The agent loop",
        slideId: "agent-loop",
      },
      {
        id: "foundations-context-early",
        label: "Context is the product",
        slideId: "context-product",
      },
      {
        id: "foundations-tools",
        label: "Tools that touch reality",
        slideId: "tools-reality",
      },
      {
        id: "foundations-cli",
        label: "Coding CLIs emerge",
        slideId: "cli-tools",
      },
      {
        id: "foundations-request",
        label: "What a CLI request does",
        slideId: "request-path",
      },
      {
        id: "foundations-context",
        label: "Context & memory",
        children: [
          {
            id: "foundations-memory",
            label: "Session context window",
            slideId: "context-memory",
          },
          {
            id: "foundations-limits",
            label: "Limits · pull on demand",
            slideId: "context-limits",
          },
          {
            id: "foundations-markdown",
            label: "Blank slate → .md files",
            slideId: "markdown-memory",
          },
          {
            id: "foundations-agents-md",
            label: "AGENTS.md & friends",
            slideId: "harness-instruction-files",
          },
        ],
      },
    ],
  },
  {
    id: "engineer-role",
    label: "Your job as engineer",
    children: [
      {
        id: "engineer-job",
        label: "Shifts upstream",
        slideId: "engineer-job",
      },
      {
        id: "engineer-briefing",
        label: "Brief → instruct → validate",
        slideId: "engineer-briefing",
      },
    ],
  },
  {
    id: "methodology",
    label: "Methodology",
    children: [
      {
        id: "methodology-open",
        label: "Chapter open",
        slideId: "methodology-open",
      },
      {
        id: "methodology-prd-group",
        label: "PRD.md",
        children: [
          {
            id: "methodology-prd",
            label: "Start with PRD.md",
            slideId: "methodology-prd",
          },
          {
            id: "methodology-prd-iterate",
            label: "Refine with the agent",
            slideId: "methodology-prd-iterate",
          },
        ],
      },
      {
        id: "methodology-plan-group",
        label: "PLAN.md",
        children: [
          {
            id: "methodology-plan",
            label: "Iterations & baby steps",
            slideId: "methodology-plan",
          },
          {
            id: "methodology-checklists",
            label: "Checklist-only plans",
            slideId: "methodology-checklists",
          },
          {
            id: "methodology-plan-mode",
            label: "Plan mode",
            slideId: "methodology-plan-mode",
          },
          {
            id: "methodology-loop",
            label: "Iterate · don’t wipe",
            slideId: "methodology-loop",
          },
        ],
      },
      {
        id: "methodology-close-loop-group",
        label: "Closing the loop",
        children: [
          {
            id: "closing-the-loop",
            label: "Closing the loop",
            slideId: "closing-the-loop",
          },
          {
            id: "methodology-web-visibility",
            label: "Browser / UI visibility",
            slideId: "methodology-web-visibility",
          },
          {
            id: "methodology-bug-tdd",
            label: "Bugs → failing tests",
            slideId: "methodology-bug-tdd",
          },
          {
            id: "methodology-embedded-loop",
            label: "Embedded observability",
            slideId: "methodology-embedded-loop",
          },
          {
            id: "methodology-embedded-refs",
            label: "Datasheets · SDK · kernel",
            slideId: "methodology-embedded-refs",
          },
          {
            id: "methodology-arch-loop",
            label: "Close the loop by design",
            slideId: "methodology-arch-loop",
          },
          {
            id: "methodology-loop-engineering",
            label: "Loop engineering",
            slideId: "methodology-loop-engineering",
          },
        ],
      },
      {
        id: "methodology-skills-mcp",
        label: "Skills & MCP",
        children: [
          {
            id: "methodology-skills",
            label: "Skills",
            slideId: "methodology-skills",
          },
          {
            id: "methodology-mcp",
            label: "MCP",
            slideId: "methodology-mcp",
          },
        ],
      },
    ],
  },
  {
    id: "practice",
    label: "Practice",
    children: [
      { id: "practice-hitl", label: "Human in the loop", slideId: "human-in-loop" },
      { id: "practice-modes", label: "Modes of work", slideId: "modes-of-work" },
      { id: "practice-prompt", label: "Prompt shape", slideId: "prompt-shape" },
      { id: "practice-repo", label: "Repo grounding", slideId: "repo-grounding" },
      { id: "practice-sizing", label: "Task sizing", slideId: "task-sizing" },
      { id: "practice-verify", label: "Verify", slideId: "verify" },
    ],
  },
  {
    id: "ops",
    label: "Ops & close",
    children: [
      { id: "ops-fail", label: "Failure modes", slideId: "failure-modes" },
      { id: "ops-recovery", label: "Recovery patterns", slideId: "recovery" },
      { id: "ops-subagents", label: "Subagents", slideId: "subagents" },
      { id: "ops-mcp", label: "MCP in practice", slideId: "mcp-practice" },
      { id: "ops-team", label: "Team habits", slideId: "team-habits" },
      { id: "ops-walkthrough", label: "Walkthrough", slideId: "walkthrough" },
      { id: "ops-cheatsheet", label: "Cheatsheet", slideId: "cheatsheet" },
      { id: "ops-close", label: "Practice challenge", slideId: "close" },
    ],
  },
];

export interface FlatOutlineEntry {
  id: string;
  label: string;
  slideId: string;
  depth: number;
  ancestorIds: string[];
}

export function firstSlideId(node: OutlineNode): string | undefined {
  if (node.slideId) return node.slideId;
  for (const child of node.children ?? []) {
    const id = firstSlideId(child);
    if (id) return id;
  }
  return undefined;
}

/** Depth-first flatten of navigable outline entries (each resolves to a slide). */
export function flattenOutline(
  nodes: OutlineNode[] = deckOutline,
  depth = 0,
  ancestors: string[] = [],
): FlatOutlineEntry[] {
  const out: FlatOutlineEntry[] = [];
  for (const node of nodes) {
    const slideId = firstSlideId(node);
    const path = [...ancestors, node.id];
    if (slideId) {
      out.push({
        id: node.id,
        label: node.label,
        slideId,
        depth,
        ancestorIds: ancestors,
      });
    }
    if (node.children?.length) {
      out.push(...flattenOutline(node.children, depth + 1, path));
    }
  }
  return out;
}

/**
 * Active outline node = deepest entry whose slide appears at or before the
 * current slide in deck order (Word-style “you are here”).
 */
export function resolveActiveOutline(
  slideIdsInOrder: string[],
  activeIndex: number,
  nodes: OutlineNode[] = deckOutline,
): { activeId: string | null; activePath: string[] } {
  const flat = flattenOutline(nodes);
  const indexBySlide = new Map(slideIdsInOrder.map((id, i) => [id, i]));

  let best: FlatOutlineEntry | null = null;
  for (const entry of flat) {
    const slideIndex = indexBySlide.get(entry.slideId);
    if (slideIndex === undefined || slideIndex > activeIndex) continue;
    if (!best || slideIndex >= (indexBySlide.get(best.slideId) ?? -1)) {
      // Prefer deeper nodes when they share the same slide, else latest slide
      if (
        !best ||
        slideIndex > (indexBySlide.get(best.slideId) ?? -1) ||
        (slideIndex === (indexBySlide.get(best.slideId) ?? -1) &&
          entry.depth >= best.depth)
      ) {
        best = entry;
      }
    }
  }

  if (!best) return { activeId: null, activePath: [] };
  return {
    activeId: best.id,
    activePath: [...best.ancestorIds, best.id],
  };
}
