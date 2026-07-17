import { RequestPath } from "../../components/RequestPath";
import { ComparePanels } from "../../components/diagrams/ComparePanels";
import { ContextGauge } from "../../components/diagrams/ContextGauge";
import { FlowSteps } from "../../components/diagrams/FlowSteps";
import { MemoryStack } from "../../components/diagrams/MemoryStack";
import { RagPipeline } from "../../components/diagrams/RagPipeline";
import type { SlideData } from "../types";

/** Slides that follow tool-calling: CLIs, request path, context/memory */
export const agenticLeapSlides: SlideData[] = [
  {
    id: "cli-tools",
    title: "Coding CLIs arrive",
    eyebrow: "Agentic leap · ~2025 Q2–Q3",
    variant: "diagram",
    content: (
      <>
        <p className="slide-lead" style={{ marginBottom: "1.1rem" }}>
          Tool-calling harnesses packaged as{" "}
          <strong>terminal-native agents</strong> in your repo.
        </p>
        <FlowSteps
          label="From chat model to coding CLI"
          caption="Codex CLI · Claude Code · Gemini CLI · OpenCode — same loop, new packaging."
          steps={[
            { label: "Chat model", detail: "Text in / text out" },
            { label: "Tool calling", detail: "JSON → harness" },
            { label: "Read / edit", detail: "Bash, patches, tools" },
            { label: "Turn loop", detail: "Call → wait → next" },
            { label: "Coding CLI", detail: "Agent in the repo", tone: "warm" },
          ]}
        />
      </>
    ),
  },
  {
    id: "request-path",
    title: "What a CLI request does",
    eyebrow: "Agentic leap · under the hood",
    variant: "diagram",
    content: <RequestPath />,
  },
  {
    id: "context-memory",
    title: "The session context window",
    eyebrow: "Context & memory",
    variant: "diagram",
    content: (
      <>
        <p className="slide-lead" style={{ marginBottom: "0.85rem", maxWidth: "52ch" }}>
          Capable models still need a mission. Context is how you point them —
          they won’t invent the right goal on their own.
        </p>
        <ContextGauge />
      </>
    ),
  },
  {
    id: "context-limits",
    title: "Limits — and pull on demand",
    eyebrow: "Context & memory",
    variant: "diagram",
    content: (
      <ComparePanels
        label="Dump everything versus pull on demand"
        left={{
          title: "Over-pollute",
          tone: "bad",
          body: (
            <ul>
              <li>Stuff the whole repo “just in case”</li>
              <li>Huge windows, weak focus</li>
              <li>Not how memory works in practice</li>
            </ul>
          ),
        }}
        right={{
          title: "Pull on demand",
          tone: "good",
          body: (
            <ul>
              <li>Small working set in context</li>
              <li>Fetch files when the task needs them</li>
              <li>Same idea as human memory</li>
            </ul>
          ),
        }}
      />
    ),
  },
  {
    id: "markdown-memory",
    title: "Blank slate → files as memory",
    eyebrow: "Context & memory",
    variant: "diagram",
    content: (
      <>
        <p className="slide-lead" style={{ marginBottom: "1rem" }}>
          New session or a full window ≈ blank plate (compact still resets).
          Extend memory with <strong>.md files</strong> in the repo.
        </p>
        <MemoryStack />
      </>
    ),
  },
  {
    id: "harness-instruction-files",
    title: "AGENTS.md & friends",
    eyebrow: "Context & memory",
    variant: "diagram",
    content: (
      <FlowSteps
        label="Harness auto-loads instruction files then model pulls linked docs"
        caption="AGENTS.md · CLAUDE.md · copilot-instructions.md — short bootstrap + pointers, not the whole wiki."
        steps={[
          { label: "Turn starts", detail: "Harness boots" },
          {
            label: "Auto-load",
            detail: "AGENTS / CLAUDE / …",
            tone: "warm",
          },
          { label: "Instructions", detail: "Rules & commands" },
          { label: "Pointers", detail: "Links to other .md" },
          {
            label: "On demand",
            detail: "Model opens what it needs",
            tone: "accent",
          },
        ]}
      />
    ),
  },
  {
    id: "rag-architecture",
    title: "RAG — retrieval as architecture",
    eyebrow: "Context & memory · beyond the repo",
    variant: "diagram",
    content: <RagPipeline />,
  },
];
