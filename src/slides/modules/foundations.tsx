import { AgentLoop } from "../../components/AgentLoop";
import { FlowSteps } from "../../components/diagrams/FlowSteps";
import { LandmarkPapers } from "../../components/diagrams/LandmarkPapers";
import type { SlideData } from "../types";

export const foundationsSlides: SlideData[] = [
  {
    id: "open",
    title: "AI Software Engineering 101",
    variant: "title",
    eyebrow: "Working session · concepts + methodology",
    content: (
      <div className="title-open">
        <div className="title-open__main">
          <p className="slide-lead">
            For engineers who write code in real repos — how to use AI agents that
            plan, act, and verify, not just chat about code.
          </p>
          <p className="slide-lead title-open__leave-label">Leave with:</p>
          <ul className="slide-list">
            <li>A repeatable workflow and methodology</li>
            <li>A clear understanding of what agents can do — and how</li>
            <li>Tips and tricks you can use on real projects</li>
          </ul>
          <div className="title-meta">
            <div className="title-meta__line" />
            <span className="title-meta__label">~50 min</span>
          </div>
        </div>
        <aside className="author-panel" aria-label="About the author">
          <span className="author-panel__eyebrow">About the author</span>
          <strong className="author-panel__name">Constantin Chabirand</strong>
          <p className="author-panel__role">
            Embedded systems · space lasercom · AI-augmented tooling
          </p>
          <p className="author-panel__bio">
            Nine years shipping production firmware — ASIL-D automotive ECUs,
            DARPA/ESA optical-terminal control, and a 60-engineer AUTOSAR practice
            built from zero. Based in Munich; builds agentic workflows for real
            hardware and real repos.
          </p>
          <ul className="author-panel__links">
            <li>
              <a
                href="https://cynacons.github.io/constantin-chabirand/"
                target="_blank"
                rel="noreferrer"
              >
                Portfolio
              </a>
            </li>
            <li>
              <a
                href="https://github.com/CynaCons"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/constantin-chabirand-3380468b"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </aside>
      </div>
    ),
  },
  {
    id: "landmark-papers",
    title: "The paper that changed the stack",
    eyebrow: "How we got here · references",
    variant: "diagram",
    content: <LandmarkPapers />,
  },
  {
    id: "chat-vs-agent",
    title: "Completion, chat, agent",
    eyebrow: "Foundations",
    variant: "compare",
    content: (
      <div className="slide-compare">
        <div className="slide-compare__col">
          <h3>Completion</h3>
          <p>Inline suggest-as-you-type in the editor.</p>
          <ul>
            <li>Best for local, known patterns</li>
            <li>You stay in flow</li>
            <li>No multi-file plan</li>
          </ul>
        </div>
        <div className="slide-compare__col">
          <h3>Chat</h3>
          <p>Q&amp;A and snippets in a side panel.</p>
          <ul>
            <li>Best for explaining &amp; exploring</li>
            <li>You paste or apply edits</li>
            <li>Weak at long tool chains</li>
          </ul>
        </div>
        <div className="slide-compare__col">
          <h3>Agent</h3>
          <p>Goal-driven loop with tools in your repo.</p>
          <ul>
            <li>Best for multi-step changes</li>
            <li>Reads, edits, runs commands</li>
            <li>Needs oversight &amp; verify</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "what-is-agentic",
    title: "What is agentic AI?",
    eyebrow: "Foundations",
    variant: "diagram",
    content: (
      <FlowSteps
        label="Agent pursues a goal with tools and observation"
        caption="Not magic autonomy — a loop grounded in your repo until done or you stop it."
        steps={[
          { label: "Goal", detail: "Natural language intent" },
          { label: "Plan", detail: "Break into steps" },
          { label: "Tools", detail: "Files, shell, browser…" },
          { label: "Observe", detail: "Results & errors" },
          { label: "Adjust", detail: "Next action or stop", tone: "warm" },
        ]}
      />
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
    id: "context-product",
    title: "Context is the product",
    eyebrow: "Foundations",
    content: (
      <>
        <p className="slide-lead">
          Models are extraordinarily capable — and directionless without you.
          They don’t know what <strong>you</strong> want until you put it in
          context. Your job: know what to do, and make them do it.
        </p>
        <ul className="slide-list">
          <li>Open files, @-mentions, and selection</li>
          <li>Diffs, terminal output, and error stacks</li>
          <li>Project rules, PRD / PLAN, conventions</li>
          <li>What you said earlier — keep it relevant and small</li>
        </ul>
        <div className="slide-pill-row">
          <span className="slide-pill">garbage in → confident garbage out</span>
          <span className="slide-pill">you own the mission</span>
        </div>
      </>
    ),
  },
  {
    id: "tools-reality",
    title: "Tools that touch reality",
    eyebrow: "Foundations",
    variant: "diagram",
    content: (
      <FlowSteps
        label="Agent tools that affect the real workspace"
        caption="Every tool call is a side effect — treat the agent like a junior with workspace access. Prefer edit → test → fix."
        steps={[
          { label: "Read", detail: "Open source & docs" },
          { label: "Search", detail: "Text + semantic" },
          { label: "Edit", detail: "Change the repo", tone: "warm" },
          { label: "Terminal", detail: "Build · test · scripts" },
          { label: "MCP", detail: "External systems", tone: "muted" },
        ]}
      />
    ),
  },
];
