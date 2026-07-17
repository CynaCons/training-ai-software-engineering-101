import type { SlideData } from "./types";
import { agenticLeapSlides } from "./modules/agenticLeap";
import { engineerRoleSlides } from "./modules/engineerRole";
import { foundationsSlides } from "./modules/foundations";
import { llmAdvancedSlides } from "./modules/llmAdvanced";
import { llmBasicsSlides } from "./modules/llmBasics";
import { methodologySlides } from "./modules/methodology";

/** open + history slides, then LLM concepts, then the rest of foundations */
const [openSlide, landmarkSlide, evolutionSlide, ...agentFoundationsSlides] =
  foundationsSlides;

const ordered: SlideData[] = [
  openSlide!,
  landmarkSlide!,
  evolutionSlide!,
  ...llmBasicsSlides,
  ...llmAdvancedSlides,
  ...agentFoundationsSlides,
  ...agenticLeapSlides,
  ...engineerRoleSlides,
  ...methodologySlides,
];

/** Stamp section-open slides (not the deck open) with a chapter ordinal. */
let chapter = 0;
export const slides: SlideData[] = ordered.map((slide) => {
  if (slide.variant !== "title") return slide;
  chapter += 1;
  return chapter > 1
    ? { ...slide, chapterNo: String(chapter - 1).padStart(2, "0") }
    : slide;
});

export type { SlideData };
