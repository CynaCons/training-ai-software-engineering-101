import "./diagrams.css";

const PAPERS = [
  {
    year: "2017",
    title: "Attention Is All You Need",
    org: "Google Brain / Google Research",
    why: "Introduces the Transformer — backbone of modern LLMs",
    highlight: true,
    href: "https://arxiv.org/abs/1706.03762",
  },
  {
    year: "2018",
    title: "BERT",
    org: "Google AI Language",
    why: "Shows transformers scale for language understanding",
    highlight: false,
    href: "https://arxiv.org/abs/1810.04805",
  },
  {
    year: "2020",
    title: "GPT-3 (Few-Shot Learners)",
    org: "OpenAI",
    why: "Scale + in-context learning goes mainstream",
    highlight: false,
    href: "https://arxiv.org/abs/2005.14165",
  },
  {
    year: "2022+",
    title: "Instruction / chat models",
    org: "Many labs",
    why: "Post-training makes models usable as assistants",
    highlight: false,
    href: "https://arxiv.org/abs/2203.02155",
  },
] as const;

export function LandmarkPapers() {
  return (
    <div
      className="landmark-papers"
      role="img"
      aria-label="Landmark papers from the Transformer to modern LLMs"
    >
      <div className="landmark-papers__rail" aria-hidden />
      <ol className="landmark-papers__list">
        {PAPERS.map((paper) => (
          <li
            key={paper.title}
            className={`landmark-papers__card ${paper.highlight ? "is-highlight" : ""}`}
          >
            <span className="landmark-papers__year">{paper.year}</span>
            <strong>{paper.title}</strong>
            <span className="landmark-papers__org">{paper.org}</span>
            <span className="landmark-papers__why">{paper.why}</span>
            <a
              className="landmark-papers__link"
              href={paper.href}
              target="_blank"
              rel="noreferrer"
            >
              arXiv
            </a>
          </li>
        ))}
      </ol>
      <p className="landmark-papers__caption">
        Anchor paper: Vaswani et al., NeurIPS 2017 —{" "}
        <em>Attention Is All You Need</em> (arXiv:1706.03762).
      </p>
    </div>
  );
}
