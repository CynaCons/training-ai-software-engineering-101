import type { SlideData } from "./types";
import { agenticLeapSlides } from "./modules/agenticLeap";
import { engineerRoleSlides } from "./modules/engineerRole";
import { foundationsSlides } from "./modules/foundations";
import { llmAdvancedSlides } from "./modules/llmAdvanced";
import { llmBasicsSlides } from "./modules/llmBasics";
import { methodologySlides } from "./modules/methodology";
import { practiceSlides } from "./modules/practice";
import { opsSlides } from "./modules/ops";

/** open + landmark papers, then LLM concepts, then the rest of foundations */
const [openSlide, landmarkSlide, ...agentFoundationsSlides] = foundationsSlides;

export const slides: SlideData[] = [
  openSlide!,
  landmarkSlide!,
  ...llmBasicsSlides,
  ...llmAdvancedSlides,
  ...agentFoundationsSlides,
  ...agenticLeapSlides,
  ...engineerRoleSlides,
  ...methodologySlides,
  ...practiceSlides,
  ...opsSlides,
];

export type { SlideData };
