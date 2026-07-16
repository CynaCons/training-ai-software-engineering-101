import "./diagrams.css";

/** Skills as on-demand instruction packs. */
export function SkillCapsule() {
  return (
    <div
      className="skill-capsule"
      role="img"
      aria-label="Skills load on demand or by explicit call"
    >
      <div className="skill-capsule__tray">
        <div className="skill-capsule__idle">
          <span>Library</span>
          <ul>
            <li>release-checklist</li>
            <li>can-trace-debug</li>
            <li>prd-refine</li>
          </ul>
        </div>
        <div className="skill-capsule__arrow" aria-hidden>
          load if relevant
        </div>
        <div className="skill-capsule__active">
          <span>In context</span>
          <strong>Skill instructions</strong>
          <p>How to perform this action the team’s way</p>
        </div>
      </div>
      <p className="skill-capsule__caption">
        Shared with the team. Loaded when the model recognizes the task — or when
        you call the skill explicitly. Not every turn.
      </p>
    </div>
  );
}
