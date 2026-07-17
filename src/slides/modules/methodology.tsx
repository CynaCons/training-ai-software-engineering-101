import { AgentPersonalities } from "../../components/diagrams/AgentPersonalities";
import { ArchRequirement } from "../../components/diagrams/ArchRequirement";
import { BrowserLoop } from "../../components/diagrams/BrowserLoop";
import { BugToTest } from "../../components/diagrams/BugToTest";
import { CloseTheLoop } from "../../components/diagrams/CloseTheLoop";
import { ComparePanels } from "../../components/diagrams/ComparePanels";
import { CoordinatorPattern } from "../../components/diagrams/CoordinatorPattern";
import { DocPreview } from "../../components/diagrams/DocPreview";
import { FlowSteps } from "../../components/diagrams/FlowSteps";
import { LoopEngineering } from "../../components/diagrams/LoopEngineering";
import { PlanAccretion } from "../../components/diagrams/PlanAccretion";
import { McpBridge } from "../../components/diagrams/McpBridge";
import { PapersToCode } from "../../components/diagrams/PapersToCode";
import { ReferenceGrid } from "../../components/diagrams/ReferenceGrid";
import { RefineSpiral } from "../../components/diagrams/RefineSpiral";
import { SelfUpdatingDocs } from "../../components/diagrams/SelfUpdatingDocs";
import { SkillCapsule } from "../../components/diagrams/SkillCapsule";
import { SrsDashboard } from "../../components/diagrams/SrsDashboard";
import { SrsTraceability } from "../../components/diagrams/SrsTraceability";
import type { SlideData } from "../types";

/**
 * Methodology chapter — owner tricks & habits.
 */
export const methodologySlides: SlideData[] = [
  {
    id: "methodology-open",
    title: "Methodology",
    variant: "title",
    eyebrow: "Chapter",
    content: (
      <>
        <p className="slide-lead">
          A durable way to steer agents on a new product: vision in{" "}
          <strong>PRD.md</strong>, execution in <strong>PLAN.md</strong>, baby
          steps until it works and looks right.
        </p>
        <div className="title-meta">
          <div className="title-meta__line" />
          <span className="title-meta__label">
            Files as memory · checklists as control
          </span>
        </div>
      </>
    ),
  },
  {
    id: "methodology-prd",
    title: "Start with PRD.md",
    eyebrow: "Methodology · real examples",
    variant: "diagram",
    content: (
      <div className="doc-pair">
        <DocPreview filename="PRD.md" project="powerplanner">
          <span className="h1">PowerPlanner Product Requirements</span>
          <span className="h2">Executive Summary</span>
          <p>
            Gantt authoring for people who present plans — calendar-accurate,
            editable, presentation-grade. Ships first as a single-file portable
            HTML app…
          </p>
          <span className="h2">Product Vision</span>
          <p>
            Calendar-true · directly editable · presentation-grade · portable.
            For project leads, consultants, PMOs, engineers…
          </p>
          <span className="h2">Delivery Surfaces</span>
          <p>Portable HTML → Web app → PowerNote node → PowerPoint add-in</p>
        </DocPreview>
        <DocPreview filename="PRD.md" project="powertimelines" accent="warm">
          <span className="h1">PowerTimeline Product Requirements</span>
          <span className="h2">Executive Summary</span>
          <p>
            Collaborative platform for historical events — “GitHub for
            Timelines”: create, fork, merge, contribute.
          </p>
          <span className="h2">Product Vision</span>
          <p>
            Historians, researchers, students create timelines, fork others’
            work, submit merge requests, build collective knowledge…
          </p>
          <span className="h2">Core Features</span>
          <p>Editing · collaboration · discovery · rich content · infra</p>
        </DocPreview>
      </div>
    ),
  },
  {
    id: "methodology-prd-iterate",
    title: "Refine the PRD with the agent",
    eyebrow: "Methodology · vision",
    variant: "diagram",
    content: <RefineSpiral />,
  },
  {
    id: "methodology-srs",
    title: "SRS.md — requirements as the contract",
    eyebrow: "Methodology · requirements",
    variant: "diagram",
    content: <SrsTraceability />,
  },
  {
    id: "methodology-srs-scale",
    title: "Traceability at scale",
    eyebrow: "Methodology · requirements",
    variant: "diagram",
    content: <SrsDashboard />,
  },
  {
    id: "methodology-plan",
    title: "Then PLAN.md — the hard part",
    eyebrow: "Methodology · real example",
    variant: "diagram",
    content: (
      <DocPreview filename="PLAN.md" project="powerplanner" accent="warm">
        <span className="h1">PowerPlanner Implementation Plan</span>
        <span className="h2 warm">Quick Summary</span>
        <p>
          <span className="dim">Current:</span> v2.5.2 COMPLETE ·{" "}
          <span className="dim">Next:</span> v2.5.3 reactivity ≤200ms → v2.6 UX
          Overhaul
        </p>
        <span className="h2 warm">Format Rules</span>
        <p>Tasks: checkbox items only · NO “Files Modified” · NO verbose summaries</p>
        <span className="h2 warm">Next Up (execution order)</span>
        <p>
          <span className="open">[ ]</span> v2.5.3 — Direct-manipulation reactivity
        </p>
        <p>
          <span className="open">[ ]</span> v2.6.0→v2.6.8 — UX Overhaul U0..U8
        </p>
        <span className="h2 warm">v2.4.0 — Trace & continuity (COMPLETE)</span>
        <p>
          <span className="check">[x]</span> DumpChromeState at pre/post/delayed
          points
        </p>
        <p>
          <span className="check">[x]</span> Invariants + harness_driver traces
        </p>
        <p className="dim">…200+ baby-step iterations kept in this file…</p>
      </DocPreview>
    ),
  },
  {
    id: "methodology-checklists",
    title: "Checklist-only plans",
    eyebrow: "Methodology · execution",
    variant: "diagram",
    content: (
      <FlowSteps
        label="Agents update the checklist plan before and after each task"
        caption="Keep PLAN.md as checkboxes only — the agent marks progress so the file stays the source of truth for “what’s next.”"
        steps={[
          { label: "Before", detail: "Claim / clarify the row", tone: "warm" },
          { label: "Work", detail: "Implement the slice" },
          { label: "After", detail: "Check off · note reality", tone: "warm" },
          { label: "Next row", detail: "Pick the following step" },
        ]}
      />
    ),
  },
  {
    id: "methodology-plan-mode",
    title: "Start a slice in Plan mode",
    eyebrow: "Methodology · Plan mode",
    variant: "diagram",
    content: (
      <FlowSteps
        label="Plan mode forces explore, questions, a written plan file, then build after approval"
        caption="Plan mode is a harness skill: explore the repo, ask you questions, gather the brief into a file — then implement only after you approve."
        steps={[
          { label: "Pick row", detail: "Iteration / sub-iteration" },
          { label: "Plan mode", detail: "Explore · ask · gather", tone: "warm" },
          { label: "Plan file", detail: "Written approach" },
          { label: "You approve", detail: "Or steer / replan", tone: "warm" },
          { label: "Agent builds", detail: "Against the checklist" },
        ]}
      />
    ),
  },
  {
    id: "methodology-loop",
    title: "Iterate until you’re satisfied",
    eyebrow: "Methodology · rhythm",
    variant: "diagram",
    content: <PlanAccretion />,
  },
  {
    id: "methodology-self-updating",
    title: "Agents that maintain their own memory",
    eyebrow: "Methodology · self-reinforcing",
    variant: "diagram",
    content: <SelfUpdatingDocs />,
  },
  {
    id: "closing-the-loop",
    title: "Closing the loop",
    eyebrow: "Methodology · visibility",
    variant: "diagram",
    content: <CloseTheLoop />,
  },
  {
    id: "methodology-web-visibility",
    title: "See it in the browser",
    eyebrow: "Methodology · closing the loop",
    variant: "diagram",
    content: <BrowserLoop />,
  },
  {
    id: "methodology-bug-tdd",
    title: "Bugs → failing tests first",
    eyebrow: "Methodology · closing the loop",
    variant: "diagram",
    content: <BugToTest />,
  },
  {
    id: "methodology-embedded-loop",
    title: "Embedded: make it observable",
    eyebrow: "Methodology · closing the loop",
    variant: "diagram",
    content: (
      <ComparePanels
        label="Ways to give agents visibility into embedded software"
        left={{
          title: "Simulation & debug",
          tone: "good",
          body: (
            <ul>
              <li>SIL builds with simulated / emulated inputs</li>
              <li>Debugger interfaces for state</li>
              <li>Component-level behaviour checks</li>
            </ul>
          ),
        }}
        right={{
          title: "Buses & instruments",
          tone: "good",
          body: (
            <ul>
              <li>CAN / XCP read–write variables</li>
              <li>Probe measurement devices the AI can call</li>
              <li>Some steps stay human — plug what you can</li>
            </ul>
          ),
        }}
      />
    ),
  },
  {
    id: "methodology-embedded-refs",
    title: "Embedded: teach from silicon truth",
    eyebrow: "Methodology · closing the loop",
    variant: "diagram",
    content: <ReferenceGrid />,
  },
  {
    id: "methodology-arch-loop",
    title: "Close the loop by design",
    eyebrow: "Methodology · architecture",
    variant: "diagram",
    content: <ArchRequirement />,
  },
  {
    id: "methodology-loop-engineering",
    title: "Loop engineering",
    eyebrow: "Methodology · closing the loop",
    variant: "diagram",
    content: <LoopEngineering />,
  },
  {
    id: "methodology-papers",
    title: "From papers to implementations",
    eyebrow: "Methodology · research → code",
    variant: "diagram",
    content: <PapersToCode />,
  },
  {
    id: "methodology-coordinator",
    title: "The coordinator pattern",
    eyebrow: "Methodology · orchestration",
    variant: "diagram",
    content: <CoordinatorPattern />,
  },
  {
    id: "methodology-personalities",
    title: "Agent personalities",
    eyebrow: "Methodology · orchestration",
    variant: "diagram",
    content: <AgentPersonalities />,
  },
  {
    id: "methodology-skills",
    title: "Skills — how we do it here",
    eyebrow: "Methodology · skills & MCP",
    variant: "diagram",
    content: <SkillCapsule />,
  },
  {
    id: "methodology-mcp",
    title: "MCP — call real code",
    eyebrow: "Methodology · skills & MCP",
    variant: "diagram",
    content: <McpBridge />,
  },
];
