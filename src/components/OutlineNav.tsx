import { useCallback, useEffect, useMemo, useState } from "react";
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

const STORAGE_KEY = "aise101.outline.collapsed";

/** Ids of every node that has children (i.e. is collapsible). */
function collectSectionIds(nodes: OutlineNode[], acc: string[] = []): string[] {
  for (const node of nodes) {
    if (node.children?.length) {
      acc.push(node.id);
      collectSectionIds(node.children, acc);
    }
  }
  return acc;
}

function OutlineBranch({
  nodes,
  depth,
  activePath,
  activeId,
  collapsed,
  onToggle,
  onJump,
  disabled,
}: {
  nodes: OutlineNode[];
  depth: number;
  activePath: string[];
  activeId: string | null;
  collapsed: Set<string>;
  onToggle: (id: string) => void;
  onJump: (slideId: string) => void;
  disabled?: boolean;
}) {
  return (
    <ul className={`outline-nav__list outline-nav__list--depth-${depth}`}>
      {nodes.map((node) => {
        const isActive = node.id === activeId;
        const isAncestor = activePath.includes(node.id) && !isActive;
        const slideId = firstSlideId(node);
        const hasChildren = !!node.children?.length;
        const isCollapsed = hasChildren && collapsed.has(node.id);

        return (
          <li key={node.id}>
            <div
              className="outline-nav__row"
              style={{ paddingLeft: `${0.35 + depth * 0.85}rem` }}
            >
              {hasChildren ? (
                <button
                  type="button"
                  className="outline-nav__toggle"
                  aria-expanded={!isCollapsed}
                  aria-label={`${isCollapsed ? "Expand" : "Collapse"} ${node.label}`}
                  disabled={disabled}
                  onClick={() => onToggle(node.id)}
                >
                  <span
                    className={`outline-nav__chevron ${isCollapsed ? "" : "is-open"}`}
                    aria-hidden
                  >
                    ▸
                  </span>
                </button>
              ) : (
                <span className="outline-nav__toggle outline-nav__toggle--spacer" aria-hidden />
              )}

              <button
                type="button"
                className={[
                  "outline-nav__item",
                  isActive ? "is-active" : "",
                  isAncestor ? "is-ancestor" : "",
                  hasChildren ? "is-section" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                disabled={disabled || !slideId}
                onClick={() => slideId && onJump(slideId)}
                aria-current={isActive ? "true" : undefined}
              >
                <span className="outline-nav__label">{node.label}</span>
              </button>
            </div>

            {hasChildren && !isCollapsed && (
              <OutlineBranch
                nodes={node.children!}
                depth={depth + 1}
                activePath={activePath}
                activeId={activeId}
                collapsed={collapsed}
                onToggle={onToggle}
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
  const sectionIds = useMemo(() => collectSectionIds(deckOutline), []);

  const [collapsed, setCollapsed] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return new Set<string>(JSON.parse(raw));
    } catch {
      /* ignore unavailable / malformed storage */
    }
    return new Set();
  });

  // Persist collapse state across reloads.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...collapsed]));
    } catch {
      /* ignore */
    }
  }, [collapsed]);

  // Always reveal the section you're currently in when the active slide changes.
  useEffect(() => {
    setCollapsed((prev) => {
      let changed = false;
      const next = new Set(prev);
      for (const id of activePath) {
        if (next.delete(id)) changed = true;
      }
      return changed ? next : prev;
    });
    // activePath is derived from activeId; re-run only when the target changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  const toggle = useCallback((id: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const allCollapsed = sectionIds.every((id) => collapsed.has(id));

  const toggleAll = useCallback(() => {
    setCollapsed(() => (allCollapsed ? new Set<string>() : new Set(sectionIds)));
  }, [allCollapsed, sectionIds]);

  return (
    <nav className="outline-nav" aria-label="Training outline">
      <div className="outline-nav__header">
        <span className="outline-nav__title">Outline</span>
        <button
          type="button"
          className="outline-nav__all"
          onClick={toggleAll}
          disabled={disabled}
          aria-label={allCollapsed ? "Expand all sections" : "Collapse all sections"}
        >
          {allCollapsed ? "Expand all" : "Collapse all"}
        </button>
      </div>
      <OutlineBranch
        nodes={deckOutline}
        depth={0}
        activePath={activePath}
        activeId={activeId}
        collapsed={collapsed}
        onToggle={toggle}
        onJump={onJump}
        disabled={disabled}
      />
    </nav>
  );
}
