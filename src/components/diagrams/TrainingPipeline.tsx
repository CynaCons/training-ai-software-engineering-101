import "./diagrams.css";

const STAGES = [
  {
    id: "pre",
    title: "Pretraining",
    detail: "Huge corpora · next-token · base model",
    tone: "accent" as const,
  },
  {
    id: "ft",
    title: "Fine-tuning",
    detail: "Narrower data · specialize",
    tone: "muted" as const,
  },
  {
    id: "post",
    title: "Post-training",
    detail: "Instructions · preferences · chat behaviour",
    tone: "warm" as const,
  },
] as const;

/** Vocabulary of training stages as a pipeline. */
export function TrainingPipeline() {
  return (
    <div
      className="training-pipeline"
      role="img"
      aria-label="Pretraining, fine-tuning, and post-training stages"
    >
      <div className="training-pipeline__stages">
        {STAGES.map((stage, i) => (
          <div
            key={stage.id}
            className={`training-pipeline__stage training-pipeline__stage--${stage.tone}`}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            <strong>{stage.title}</strong>
            <p>{stage.detail}</p>
          </div>
        ))}
      </div>
      <p className="training-pipeline__caption">
        “Training” is overloaded. Chat/coding models you use are usually{" "}
        <em>post-trained</em> base models — they follow tools and refusals
        differently than a raw checkpoint.
      </p>
    </div>
  );
}
