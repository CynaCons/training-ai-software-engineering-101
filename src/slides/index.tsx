import { AgentLoop } from "../components/AgentLoop";
import type { SlideData } from "./types";

export const slides: SlideData[] = [
  {
    id: "intro",
    title: "Agentic AI Software Engineering",
    variant: "title",
    eyebrow: "Training draft · v0.1",
    content: (
      <>
        <p className="slide-lead">
          How developers work with AI agents that plan, act, and iterate inside
          real codebases — not just chat.
        </p>
        <div className="title-meta">
          <div className="title-meta__line" />
          <span className="title-meta__label">Interactive slides · click to explore</span>
        </div>
      </>
    ),
  },
  {
    id: "what-is-agentic",
    title: "What is agentic AI?",
    eyebrow: "Foundations",
    content: (
      <>
        <p className="slide-lead">
          An agent is an AI system that pursues a goal through repeated cycles of
          reasoning and action — using tools, not just words.
        </p>
        <ul className="slide-list">
          <li>Receives a goal in natural language</li>
          <li>Plans steps and chooses tools (files, terminal, browser…)</li>
          <li>Observes outcomes and adjusts until done</li>
        </ul>
        <div className="slide-pill-row">
          <span className="slide-pill">autonomous loops</span>
          <span className="slide-pill">tool use</span>
          <span className="slide-pill">grounded in your repo</span>
        </div>
      </>
    ),
  },
  {
    id: "agent-loop",
    title: "The agent loop",
    eyebrow: "Core pattern",
    variant: "diagram",
    content: <AgentLoop />,
  },
  {
    id: "tools-context",
    title: "Tools & context",
    eyebrow: "How agents touch reality",
    variant: "split",
    content: (
      <div className="slide-split">
        <div>
          <ul className="slide-list">
            <li>Read and edit source files</li>
            <li>Run shell commands and tests</li>
            <li>Search the codebase semantically</li>
            <li>Call external APIs via MCP servers</li>
          </ul>
        </div>
        <pre className="slide-code-block">
          <code>
            {"agent.tools = [\n  "}
            <span className="str">"read_file"</span>
            {",\n  "}
            <span className="str">"edit_file"</span>
            {",\n  "}
            <span className="str">"run_terminal"</span>
            {",\n  "}
            <span className="str">"grep_search"</span>
            {",\n]\n\n"}
            <span className="cmt">// Context window = working memory</span>
            {"\ncontext = {\n  repo, open_files, errors, diff\n}"}
          </code>
        </pre>
      </div>
    ),
  },
  {
    id: "human-in-loop",
    title: "Human in the loop",
    eyebrow: "Trust & control",
    content: (
      <>
        <p className="slide-lead">
          Agents are fast — oversight keeps them safe and aligned with intent.
        </p>
        <ul className="slide-list">
          <li>Review diffs before merging</li>
          <li>Approve destructive commands</li>
          <li>Steer with follow-up prompts mid-task</li>
          <li>Set rules: conventions, scope, test requirements</li>
        </ul>
        <div className="slide-stat-row">
          <div className="slide-stat">
            <strong>You</strong>
            <span>set direction</span>
          </div>
          <div className="slide-stat">
            <strong>Agent</strong>
            <span>executes</span>
          </div>
          <div className="slide-stat">
            <strong>Loop</strong>
            <span>refines</span>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "patterns",
    title: "Practical patterns",
    eyebrow: "In the IDE",
    variant: "split",
    content: (
      <div className="slide-split">
        <div>
          <ul className="slide-list">
            <li>
              <strong>Agent mode</strong> — full autonomy for implementation
            </li>
            <li>
              <strong>Plan mode</strong> — design before code
            </li>
            <li>
              <strong>Ask mode</strong> — explore without edits
            </li>
            <li>
              <strong>Subagents</strong> — parallel specialists
            </li>
          </ul>
        </div>
        <pre className="slide-code-block">
          <code>
            <span className="cmt"># Effective prompt shape</span>
            {"\nGoal: Add rate limiting to /api\nConstraints: existing Redis, no new deps\nDone when: tests pass, README updated\n\n"}
            <span className="fn">→ agent plans → edits → runs tests → reports</span>
          </code>
        </pre>
      </div>
    ),
  },
  {
    id: "next",
    title: "Let's iterate on this",
    eyebrow: "What's next",
    variant: "title",
    content: (
      <>
        <p className="slide-lead">
          This is a visual draft. We'll refine theme, motion, and content
          slide by slide.
        </p>
        <div className="slide-pill-row">
          <span className="slide-pill">palette</span>
          <span className="slide-pill">typography</span>
          <span className="slide-pill">interactions</span>
          <span className="slide-pill">more slides</span>
        </div>
      </>
    ),
  },
];
