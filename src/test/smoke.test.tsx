import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "../App";
import { slides } from "../slides";
import { SLIDE_HEIGHT, SLIDE_WIDTH } from "../slides/dimensions";
import { deckOutline, flattenOutline, resolveActiveOutline } from "../slides/outline";

describe("smoke", () => {
  it("exports a non-empty ordered slide deck", () => {
    expect(slides.length).toBeGreaterThanOrEqual(10);

    const ids = slides.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);

    for (const slide of slides) {
      expect(slide.id).toBeTruthy();
      expect(slide.title).toBeTruthy();
      expect(slide.content).toBeTruthy();
    }
  });

  it("starts with the training title slide", () => {
    expect(slides[0]?.id).toBe("open");
    expect(slides[0]?.title).toMatch(/AI Software Engineering 101/i);
  });

  it("includes the landmark papers slide with Transformer as the anchor", () => {
    const paperSlide = slides.find((s) => s.id === "landmark-papers");
    expect(paperSlide).toBeTruthy();
    expect(paperSlide?.title).toMatch(/paper/i);
    const ids = slides.map((s) => s.id);
    expect(ids.indexOf("landmark-papers")).toBeGreaterThan(ids.indexOf("open"));
    expect(ids.indexOf("landmark-papers")).toBeLessThan(ids.indexOf("chat-vs-agent"));
  });

  it("teaches LLM basics then advanced before agentic foundations", () => {
    const ids = slides.map((s) => s.id);
    const sequence = [
      "open",
      "landmark-papers",
      "evolution-timeline",
      "llm-basics-open",
      "llm-what",
      "llm-tokens",
      "llm-attention",
      "llm-transformers",
      "llm-parameters",
      "llm-advanced-open",
      "llm-arch-2017",
      "llm-arch-block",
      "llm-arch-qkv",
      "llm-arch-mha",
      "llm-arch-causal",
      "llm-arch-families",
      "llm-arch-positions",
      "llm-arch-kvcache",
      "llm-moe",
      "llm-training",
      "llm-post-training",
      "tokens-to-agents",
      "tool-calling",
      "tools-reality",
      "what-is-agentic",
      "chat-vs-agent",
      "turn-loop",
      "agent-loop",
      "failure-modes",
      "context-product",
    ];
    const indexes = sequence.map((id) => ids.indexOf(id));
    for (const index of indexes) {
      expect(index).toBeGreaterThanOrEqual(0);
    }
    for (let i = 1; i < indexes.length; i++) {
      expect(indexes[i]).toBeGreaterThan(indexes[i - 1]!);
    }
  });

  it("includes CLI → context arc → engineer role through methodology", () => {
    const ids = slides.map((s) => s.id);
    const sequence = [
      "tools-reality",
      "cli-tools",
      "request-path",
      "context-memory",
      "context-limits",
      "markdown-memory",
      "harness-instruction-files",
      "engineer-job",
      "engineer-briefing",
      "methodology-open",
      "methodology-prd",
      "methodology-prd-iterate",
      "methodology-plan",
      "methodology-checklists",
      "methodology-plan-mode",
      "methodology-loop",
      "closing-the-loop",
      "methodology-web-visibility",
      "methodology-bug-tdd",
      "methodology-embedded-loop",
      "methodology-embedded-refs",
      "methodology-arch-loop",
      "methodology-loop-engineering",
      "methodology-coordinator",
      "methodology-personalities",
      "methodology-skills",
      "methodology-mcp",
    ];
    const indexes = sequence.map((id) => ids.indexOf(id));
    for (const index of indexes) {
      expect(index).toBeGreaterThanOrEqual(0);
    }
    for (let i = 1; i < indexes.length; i++) {
      expect(indexes[i]).toBeGreaterThan(indexes[i - 1]!);
    }
  });

  it("uses the larger 16:9 slide size", () => {
    expect(SLIDE_WIDTH).toBe(1280);
    expect(SLIDE_HEIGHT).toBe(720);
  });

  it("keeps outline entries pointed at real slides", () => {
    const slideIds = new Set(slides.map((s) => s.id));
    for (const entry of flattenOutline(deckOutline)) {
      expect(slideIds.has(entry.slideId)).toBe(true);
    }
  });

  it("resolves the active outline section for the current slide", () => {
    const ids = slides.map((s) => s.id);
    const cliIndex = ids.indexOf("cli-tools");
    const { activeId, activePath } = resolveActiveOutline(ids, cliIndex);
    expect(activeId).toBe("foundations-cli");
    expect(activePath).toContain("foundations");

    const agentsIndex = ids.indexOf("harness-instruction-files");
    const agents = resolveActiveOutline(ids, agentsIndex);
    expect(agents.activeId).toBe("foundations-agents-md");
    expect(agents.activePath).toContain("foundations-context");
  });

  it("renders the presenter shell with outline navigation", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(
      screen.getAllByText("AI Software Engineering 101").length,
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByRole("heading", { name: /AI Software Engineering 101/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Constantin Chabirand/i)).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /training outline/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /present/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next slide/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Coding CLIs emerge/i }));
    expect(
      await screen.findByRole(
        "heading",
        { name: /Coding CLIs arrive/i },
        { timeout: 2000 },
      ),
    ).toBeInTheDocument();
  });
});
