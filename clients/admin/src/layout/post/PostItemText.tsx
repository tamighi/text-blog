import {
  useTextSelection,
  type TextSelectionEvent,
} from "@/hooks/useTextSelection";
import type { HighlightWithOptionalId } from "@shared/types/highlight";
import type { Post } from "@shared/types/post";
import React from "react";
import HighlightedText from "./highlights/HighlightedText";

type Props = {
  post: Post;
  active: boolean;
  onNewHighlight?: (h: HighlightWithOptionalId) => void;
  onClear?: () => void;
};

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

const PostItemText = ({ post, active, onClear, onNewHighlight }: Props) => {
  const [highlights, setHighlights] = React.useState<HighlightWithOptionalId[]>(
    [],
  );

  React.useEffect(() => {
    setHighlights(post.highlights);
  }, [post]);

  const [newHighlight, setNewHighlight] =
    React.useState<HighlightWithOptionalId | null>(null);

  const onSelect = React.useCallback(
    (e: TextSelectionEvent) => {
      const { startOffset, endOffset } = e.range;
      const length = endOffset - startOffset;

      if (length <= 0 || hasOverlap(startOffset, endOffset, highlights)) return;

      const newHighlight = {
        start: startOffset,
        length,
        postId: post.id,
        labels: [],
        comment: "",
      };

      setNewHighlight(newHighlight);
      onNewHighlight?.(newHighlight);

      window.getSelection()?.removeAllRanges();
    },
    [post, highlights],
  );

  const ref = React.useRef<HTMLDivElement>(null);

  useTextSelection(ref, { enabled: active, onSelect, onClear });

  const allHighlights = React.useMemo(
    () => (newHighlight ? [...highlights, newHighlight] : highlights),
    [newHighlight, highlights],
  );

  return (
    <div
      ref={ref}
      className={`mt-2 text-md text-fg-secondary w-[36vw]
        whitespace-break-spaces ${
          active ? "max-h-[75vh] overflow-scroll" : "max-h-12 overflow-hidden"
        }`}
    >
      <HighlightedText highlights={allHighlights} text={post.content} />
    </div>
  );
};

export default PostItemText;
