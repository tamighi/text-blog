import React from "react";

export type TextSelectionEvent = { text: string; range: Range };

type UseTextSelectionOptions = {
  enabled?: boolean;
  onSelect?: (e: TextSelectionEvent) => void;
  onClear?: () => void;
};

export const useTextSelection = (
  ref: React.RefObject<HTMLElement | null>,
  { enabled = true, onSelect, onClear }: UseTextSelectionOptions,
) => {
  React.useEffect(() => {
    if (!enabled) return;

    const handleSelection = () => {
      const sel = window.getSelection();

      if (!sel || sel.isCollapsed) {
        onClear?.();
        return;
      }

      const anchorNode = sel.anchorNode;

      if (ref.current && anchorNode && !ref.current.contains(anchorNode)) {
        return;
      }

      onSelect?.({
        text: sel.toString(),
        range: sel.getRangeAt(0),
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
