import {
  deckOutline,
  firstSlideId,
  resolveActiveOutline,
  type OutlineNode,
} from "../slides/outline";
import "./OutlineNav.css";

interface OutlineNavProps {
  slideIds: string[];
  activeIndex: number;
  onJump: (slideId: string) => void;
  disabled?: boolean;
}

function OutlineBranch({
  nodes,
  depth,
  activePath,
  activeId,
  onJump,
  disabled,
}: {
  nodes: OutlineNode[];
  depth: number;
  activePath: string[];
  activeId: string | null;
  onJump: (slideId: string) => void;
  disabled?: boolean;
}) {
  return (
    <ul className={`outline-nav__list outline-nav__list--depth-${depth}`}>
      {nodes.map((node) => {
        const isActive = node.id === activeId;
        const isAncestor = activePath.includes(node.id) && !isActive;
        const slideId = firstSlideId(node);

        return (
          <li key={node.id}>
            <button
              type="button"
              className={[
                "outline-nav__item",
                isActive ? "is-active" : "",
                isAncestor ? "is-ancestor" : "",
                node.children?.length ? "is-section" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{ paddingLeft: `${0.75 + depth * 0.85}rem` }}
              disabled={disabled || !slideId}
              onClick={() => slideId && onJump(slideId)}
              aria-current={isActive ? "true" : undefined}
            >
              <span className="outline-nav__label">{node.label}</span>
            </button>
            {node.children && node.children.length > 0 && (
              <OutlineBranch
                nodes={node.children}
                depth={depth + 1}
                activePath={activePath}
                activeId={activeId}
                onJump={onJump}
                disabled={disabled}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function OutlineNav({
  slideIds,
  activeIndex,
  onJump,
  disabled,
}: OutlineNavProps) {
  const { activeId, activePath } = resolveActiveOutline(slideIds, activeIndex);

  return (
    <nav className="outline-nav" aria-label="Training outline">
      <div className="outline-nav__header">
        <span className="outline-nav__title">Outline</span>
      </div>
      <OutlineBranch
        nodes={deckOutline}
        depth={0}
        activePath={activePath}
        activeId={activeId}
        onJump={onJump}
        disabled={disabled}
      />
    </nav>
  );
}
