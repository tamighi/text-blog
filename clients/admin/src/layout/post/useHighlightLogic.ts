import React from "react";
import type {
  Highlight,
  HighlightWithOptionalId,
} from "@shared/types/highlight";
import type { Post } from "@shared/types/post";
import type { HighlightWithState } from "./highlights/HighlightedText";
import type { TextSelectionEvent } from "@/hooks/useTextSelection";

const hasOverlap = (
  start: number,
  end: number,
  highlights: HighlightWithOptionalId[],
) => {
  return highlights.some((h) => {
    const hStart = h.start;
    const hEnd = h.start + h.length;
    return start < hEnd && end > hStart;
  });
};

const useHighlightLogic = (post: Post) => {
  const [highlights, setHighlights] = React.useState<HighlightWithState[]>([]);

  const activeHighlight = React.useMemo(
    () => highlights.find((h) => h.state === "active"),
    [highlights],
  );

  React.useEffect(() => {
    setHighlights(post.highlights);
  }, [post]);

  const onSelect = React.useCallback(
    (e: TextSelectionEvent) => {
      const { startOffset, endOffset } = e.range;
      const length = endOffset - startOffset;

      window.getSelection()?.removeAllRanges();

      if (length <= 0 || hasOverlap(startOffset, endOffset, highlights)) return;

      const newHighlight: HighlightWithState = {
        start: startOffset,
        length,
        postId: post.id,
        labels: [],
        comment: "",
        state: "active",
      };

      setHighlights((hs) => {
        const cleaned = hs
          .map((h) => ({ ...h, state: undefined }))
          .filter((h) => !!h.id);

        return [...cleaned, newHighlight];
      });
    },
    [highlights, post.id],
  );

  const onClick = React.useCallback((clicked: Highlight) => {
    setHighlights((hs) =>
      hs
        .filter((h) => !!h.id)
        .map((h) => ({
          ...h,
          state: clicked.id === h.id ? "active" : undefined,
        })),
    );
  }, []);

  const onLeave = React.useCallback(() => {
    setHighlights((hs) =>
      hs.map((h) => ({
        ...h,
        state: h.state === "hovered" ? undefined : h.state,
      })),
    );
  }, []);

  const onHover = React.useCallback((hovered: HighlightWithState) => {
    setHighlights((hs) =>
      hs.map((h) => ({
        ...h,
        state:
          hovered.id === h.id && h.state === undefined ? "hovered" : h.state,
      })),
    );
  }, []);

  return {
    highlights,
    activeHighlight,
    onSelect,
    onClick,
    onHover,
    onLeave,
  };
};

export default useHighlightLogic;
