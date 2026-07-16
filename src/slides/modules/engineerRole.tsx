import { MissionSplit } from "../../components/diagrams/MissionSplit";
import type { SlideData } from "../types";

/** The engineer’s job: brief the AI, don’t hand-type every line */
export const engineerRoleSlides: SlideData[] = [
  {
    id: "engineer-job",
    title: "Your job shifts upstream",
    eyebrow: "Engineering with agents",
    variant: "diagram",
    content: <MissionSplit />,
  },
  {
    id: "engineer-briefing",
    title: "Know what to do — then make them do it",
    eyebrow: "Engineering with agents",
    content: (
      <>
        <p className="slide-lead">
          Context engineering is not “prompt magic.” It’s deciding the mission
          and packing just enough signal for a capable model that{" "}
          <strong>won’t choose the goal for you</strong>.
        </p>
        <ul className="slide-list">
          <li>
            <strong>Why / what / how</strong> at a high level — you own intent
          </li>
          <li>
            <strong>Information needed</strong> — files, APIs, constraints, examples
          </li>
          <li>
            <strong>Done-when</strong> — validation and output criteria
          </li>
          <li>
            Then feed instructions + validation and <strong>let the AI create</strong>
          </li>
        </ul>
        <div className="slide-pill-row">
          <span className="slide-pill">you = mission</span>
          <span className="slide-pill">model = execution</span>
          <span className="slide-pill">context = the brief</span>
        </div>
      </>
    ),
  },
];
