import React from "react";

export type TextSelectionEvent = {
  text: string;
  range: Range;
};

type UseTextSelectionOptions = {
  enabled?: boolean;
  onSelect?: (e: TextSelectionEvent) => void;
  onClear?: () => void;
};

function getTextOffset(root: HTMLElement, node: Node, offset: number) {
  let currentOffset = 0;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);

  let currentNode: Node | null = walker.nextNode();

  while (currentNode) {
    if (currentNode === node) {
      return currentOffset + offset;
    }

    currentOffset += currentNode.textContent?.length ?? 0;
    currentNode = walker.nextNode();
  }

  return currentOffset;
}

function getAbsoluteRange(root: HTMLElement, range: Range) {
  const start = getTextOffset(root, range.startContainer, range.startOffset);
  const end = getTextOffset(root, range.endContainer, range.endOffset);

  return {
    startOffset: Math.min(start, end),
    endOffset: Math.max(start, end),
  };
}

export const useTextSelection = (
  ref: React.RefObject<HTMLElement | null>,
  { enabled = true, onSelect, onClear }: UseTextSelectionOptions,
) => {
  React.useEffect(() => {
    if (!enabled) return;

    const handleSelection = () => {
      const sel = window.getSelection();

      if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
        onClear?.();
        return;
      }

      const range = sel.getRangeAt(0);
      const anchorNode = sel.anchorNode;

      if (ref.current && anchorNode && !ref.current.contains(anchorNode)) {
        return;
      }

      if (!ref.current) return;

      const { startOffset, endOffset } = getAbsoluteRange(ref.current, range);

      onSelect?.({
        text: sel.toString(),
        range: { ...range, startOffset, endOffset },
      });
    };

    document.addEventListener("mouseup", handleSelection);
    document.addEventListener("keyup", handleSelection);

    return () => {
      document.removeEventListener("mouseup", handleSelection);
      document.removeEventListener("keyup", handleSelection);
    };
  }, [ref, enabled, onSelect, onClear]);
};
