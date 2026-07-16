import type { SlideData } from "../types";

export const opsSlides: SlideData[] = [
  {
    id: "failure-modes",
    title: "Failure modes",
    eyebrow: "Ops",
    content: (
      <>
        <p className="slide-lead">
          Know the patterns so you catch them early — before the PR.
        </p>
        <ul className="slide-list">
          <li>
            <strong>Hallucinated APIs</strong> — invents methods that don’t exist
          </li>
          <li>
            <strong>Wrong file</strong> — edits a lookalike path or dead code
          </li>
          <li>
            <strong>Scope creep</strong> — “while I’m here” refactors you didn’t ask for
          </li>
          <li>
            <strong>Stuck loops</strong> — same failing fix repeated without new info
          </li>
          <li>
            <strong>Silent deletes</strong> — removes code to make types pass
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "recovery",
    title: "Recovery patterns",
    eyebrow: "Ops",
    variant: "split",
    content: (
      <div className="slide-split">
        <div>
          <ul className="slide-list">
            <li>
              <strong>Interrupt</strong> — stop the run; don’t let it dig deeper
            </li>
            <li>
              <strong>Replan</strong> — switch to Plan; agree on the next 3 steps
            </li>
            <li>
              <strong>Reset context</strong> — new chat with a tighter goal
            </li>
            <li>
              <strong>Smaller ask</strong> — one file or one failing test only
            </li>
          </ul>
        </div>
        <pre className="slide-code-block">
          <code>
            <span className="cmt"># When it’s looping</span>
            {"\nStop.\n"}
            {"Do not edit more files.\n"}
            {"Summarize what you tried and why it failed.\n"}
            {"Propose two options; wait for my pick.\n"}
          </code>
        </pre>
      </div>
    ),
  },
  {
    id: "subagents",
    title: "Subagents & parallel work",
    eyebrow: "Ops",
    content: (
      <>
        <p className="slide-lead">
          Split work when tasks are independent — not when they share the same
          contested files.
        </p>
        <ul className="slide-list">
          <li>Good: explore A while you draft B; research docs vs implement</li>
          <li>Good: review/security pass as a separate specialist agent</li>
          <li>Bad: two agents rewriting the same module at once</li>
          <li>Merge mentally: you own integration and conflict resolution</li>
        </ul>
        <div className="slide-pill-row">
          <span className="slide-pill">independent → parallel</span>
          <span className="slide-pill">shared files → serial</span>
        </div>
      </>
    ),
  },
  {
    id: "mcp-practice",
    title: "MCP in practice",
    eyebrow: "Ops",
    variant: "split",
    content: (
      <div className="slide-split">
        <div>
          <p className="slide-lead" style={{ marginBottom: "1rem" }}>
            Model Context Protocol servers expose tools (browser, DB, design
            systems) without leaving the IDE.
          </p>
          <ul className="slide-list">
            <li>Discover tools before assuming they exist</li>
            <li>Prefer MCP over pasting secrets into chat</li>
            <li>Same rules: approve risky actions, verify results</li>
          </ul>
        </div>
        <pre className="slide-code-block">
          <code>
            <span className="cmt"># Example asks</span>
            {"\n“Use the browser MCP to open localhost:5173\n"}
            {" and check the console for errors.”\n\n"}
            {"“List MCP tools available, then use the\n"}
            {" docs server to pull the rate-limit API.”\n"}
          </code>
        </pre>
      </div>
    ),
  },
  {
    id: "team-habits",
    title: "Team habits",
    eyebrow: "Ops",
    content: (
      <>
        <p className="slide-lead">
          Agent output is still your team’s code. Review and hygiene don’t go away.
        </p>
        <ul className="slide-list">
          <li>PR review focuses on intent, edge cases, and deleted code</li>
          <li>Shared rules in-repo beat tribal “prompt folklore”</li>
          <li>Never commit secrets the agent echoed into files</li>
          <li>Say in the PR when large chunks were agent-assisted — context helps reviewers</li>
        </ul>
      </>
    ),
  },
  {
    id: "walkthrough",
    title: "Mini workflow walkthrough",
    eyebrow: "Ops",
    content: (
      <>
        <p className="slide-lead">
          Example: add rate limiting to an existing login endpoint.
        </p>
        <ol className="slide-steps">
          <li>
            <span>
              <strong>Ask</strong> — “Where is login handled? What Redis client do we use?”
            </span>
          </li>
          <li>
            <span>
              <strong>Plan</strong> — agree files, limit values, error shape, tests
            </span>
          </li>
          <li>
            <span>
              <strong>Agent</strong> — implement with Goal / Context / Constraints / Done-when
            </span>
          </li>
          <li>
            <span>
              <strong>Verify</strong> — run tests + typecheck; spot-check 429 behavior
            </span>
          </li>
          <li>
            <span>
              <strong>Ship</strong> — small PR, note agent assist, human-owned merge
            </span>
          </li>
        </ol>
      </>
    ),
  },
  {
    id: "cheatsheet",
    title: "Cheatsheet",
    eyebrow: "Reference",
    variant: "split",
    content: (
      <div className="slide-cheatsheet">
        <div className="slide-cheatsheet__block">
          <h3>Modes</h3>
          <ul>
            <li>
              <strong>Ask</strong> — explore, no edits
            </li>
            <li>
              <strong>Plan</strong> — design before code
            </li>
            <li>
              <strong>Agent</strong> — implement &amp; iterate
            </li>
          </ul>
        </div>
        <div className="slide-cheatsheet__block">
          <h3>Prompt template</h3>
          <ul>
            <li>
              <strong>Goal</strong> · product outcome
            </li>
            <li>
              <strong>Context</strong> · files &amp; facts
            </li>
            <li>
              <strong>Constraints</strong> · stack &amp; don’ts
            </li>
            <li>
              <strong>Done when</strong> · verify commands
            </li>
          </ul>
        </div>
        <div className="slide-cheatsheet__block">
          <h3>Verify</h3>
          <ul>
            <li>test · typecheck · lint</li>
            <li>read the output yourself</li>
            <li>manual edge-case check</li>
          </ul>
        </div>
        <div className="slide-cheatsheet__block">
          <h3>When stuck</h3>
          <ul>
            <li>interrupt → replan</li>
            <li>new chat, smaller goal</li>
            <li>one failing test at a time</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "close",
    title: "Your practice challenge",
    variant: "title",
    eyebrow: "Close",
    content: (
      <>
        <p className="slide-lead">
          Pick a real ticket under half a day of work. Run Ask → Plan → Agent →
          Verify. Ship a PR you would defend in review.
        </p>
        <ul className="slide-list" style={{ marginTop: "1.25rem" }}>
          <li>Write the prompt with Goal / Context / Constraints / Done-when</li>
          <li>Interrupt once on purpose if it drifts — practice recovery</li>
          <li>Paste the verify commands and results into the PR description</li>
        </ul>
        <div className="title-meta">
          <div className="title-meta__line" />
          <span className="title-meta__label">
            You own the merge · the agent owned the draft
          </span>
        </div>
      </>
    ),
  },
];
