import { FlowSteps } from "../../components/diagrams/FlowSteps";
import type { SlideData } from "../types";

export const practiceSlides: SlideData[] = [
  {
    id: "human-in-loop",
    title: "Human in the loop",
    eyebrow: "Practice",
    variant: "diagram",
    content: (
      <FlowSteps
        label="Human sets direction, agent executes, human verifies"
        caption="Review diffs (auth/data/deletes), approve destructive commands, steer mid-task, set blast radius."
        steps={[
          { label: "You", detail: "Direction & constraints", tone: "warm" },
          { label: "Agent", detail: "Plans & edits" },
          { label: "You", detail: "Review / interrupt", tone: "warm" },
          { label: "Agent", detail: "Fix & continue" },
          { label: "You", detail: "Verify & own merge", tone: "warm" },
        ]}
      />
    ),
  },
  {
    id: "modes-of-work",
    title: "Modes of work",
    eyebrow: "Practice",
    variant: "compare",
    content: (
      <div className="slide-compare">
        <div className="slide-compare__col">
          <h3>Ask</h3>
          <p>Explore without edits. Read-only investigation.</p>
          <ul>
            <li>“How does auth work here?”</li>
            <li>Map a module before changing it</li>
            <li>Switch here when unsure</li>
          </ul>
        </div>
        <div className="slide-compare__col">
          <h3>Plan</h3>
          <p>Design the approach before code lands.</p>
          <ul>
            <li>Trade-offs and file touch list</li>
            <li>Agree on steps, then implement</li>
            <li>Use for ambiguous or large work</li>
          </ul>
        </div>
        <div className="slide-compare__col">
          <h3>Agent</h3>
          <p>Full autonomy to implement inside the plan.</p>
          <ul>
            <li>Clear goal + constraints</li>
            <li>Watch diffs and terminal</li>
            <li>Interrupt when it drifts</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "prompt-shape",
    title: "Prompt shape that works",
    eyebrow: "Practice",
    variant: "split",
    content: (
      <div className="slide-split">
        <div>
          <ul className="slide-list">
            <li>
              <strong>Goal</strong> — what “done” looks like in product terms
            </li>
            <li>
              <strong>Context</strong> — relevant files, APIs, prior decisions
            </li>
            <li>
              <strong>Constraints</strong> — stack, style, “don’t add deps”
            </li>
            <li>
              <strong>Done-when</strong> — tests, checks, docs to update
            </li>
          </ul>
        </div>
        <pre className="slide-code-block">
          <code>
            <span className="cmt"># Template</span>
            {"\n"}
            <span className="kw">Goal:</span>
            {" Add rate limiting to POST /api/login\n"}
            <span className="kw">Context:</span>
            {" @src/routes/auth.ts Redis already in use\n"}
            <span className="kw">Constraints:</span>
            {" no new deps; match existing error shape\n"}
            <span className="kw">Done when:</span>
            {" unit tests pass; README notes the limit\n\n"}
            <span className="fn">→ plan → edit → test → report</span>
          </code>
        </pre>
      </div>
    ),
  },
  {
    id: "repo-grounding",
    title: "Repo grounding",
    eyebrow: "Practice",
    content: (
      <>
        <p className="slide-lead">
          Teach the agent how this codebase works before it invents a second
          style guide.
        </p>
        <ul className="slide-list">
          <li>
            Project rules / <strong>AGENTS.md</strong> — conventions, commands,
            forbidden paths
          </li>
          <li>Point at canonical examples: “match @src/…/GoodExample.tsx”</li>
          <li>Name the source of truth: schema, OpenAPI, design tokens</li>
          <li>Call out secrets, env files, and generated folders — never edit</li>
        </ul>
        <div className="slide-pill-row">
          <span className="slide-pill">rules beat reminders</span>
          <span className="slide-pill">examples beat adjectives</span>
          <span className="slide-pill">one style, not two</span>
        </div>
      </>
    ),
  },
  {
    id: "task-sizing",
    title: "Task sizing",
    eyebrow: "Practice",
    variant: "split",
    content: (
      <div className="slide-split">
        <div>
          <p className="slide-lead" style={{ marginBottom: "1rem" }}>
            Agents thrash on vague, huge asks. Slice until one loop can finish
            and verify.
          </p>
          <ul className="slide-list">
            <li>One vertical slice: API + test, then UI</li>
            <li>Prefer “add X behind flag” over “rewrite module”</li>
            <li>Separate explore (Ask) from change (Agent)</li>
          </ul>
        </div>
        <div>
          <pre className="slide-code-block">
            <code>
              <span className="cmt"># Too big</span>
              {"\n“Modernize the whole billing system”\n\n"}
              <span className="cmt"># Sized</span>
              {"\n1. Extract invoice PDF helper + tests\n"}
              {"2. Wire helper into existing endpoint\n"}
              {"3. Update error messages only\n"}
            </code>
          </pre>
        </div>
      </div>
    ),
  },
  {
    id: "verify",
    title: "Verify or it didn’t happen",
    eyebrow: "Practice",
    content: (
      <>
        <p className="slide-lead">
          A green story from the agent is not a green build. Close the loop with
          evidence.
        </p>
        <ul className="slide-list">
          <li>Run the project’s real commands: test, typecheck, lint</li>
          <li>Ask the agent to run them — then read the output yourself</li>
          <li>Manual check for UX and edge cases the suite misses</li>
          <li>If verify fails, that failure is the next prompt’s context</li>
        </ul>
        <div className="slide-pill-row">
          <span className="slide-pill">edit → verify → fix</span>
          <span className="slide-pill">no verify = not done</span>
        </div>
      </>
    ),
  },
];
