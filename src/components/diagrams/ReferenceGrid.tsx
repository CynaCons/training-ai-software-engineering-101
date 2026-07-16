import "./diagrams.css";

const CELLS = [
  {
    id: "ds",
    title: "Datasheets",
    detail: "Feed the PDF — model finds registers & bitfields",
  },
  {
    id: "svd",
    title: "MCU description files",
    detail: "Debugger packs: addresses, names, short descriptions",
  },
  {
    id: "sdk",
    title: "Vendor SDK / HAL",
    detail: "GitHub examples — “how does silicon do X?”",
  },
  {
    id: "kernel",
    title: "Linux kernel (C)",
    detail: "Battle-tested reference patterns for drivers & HW",
  },
] as const;

/** Card mosaic for embedded reference sources — not a step strip. */
export function ReferenceGrid() {
  return (
    <div
      className="reference-grid"
      role="img"
      aria-label="Embedded reference sources for agents"
    >
      <div className="reference-grid__cells">
        {CELLS.map((cell) => (
          <div key={cell.id} className="reference-grid__cell">
            <strong>{cell.title}</strong>
            <span>{cell.detail}</span>
          </div>
        ))}
      </div>
      <p className="reference-grid__caption">
        Point the agent at real silicon docs and working C — don’t make it guess
        register maps from vibes.
      </p>
    </div>
  );
}
