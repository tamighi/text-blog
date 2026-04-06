import Button from "@/components/Button";
import {
  useTextSelection,
  type TextSelectionEvent,
} from "@/hooks/useTextSelection";
import type {
  Highlight,
  HighlightWithOptionalId,
} from "@shared/types/highlight";
import type { Post } from "@shared/types/post";
import React from "react";
import HighlightedText from "./highlights/HighlightedText";
import PostItemHighlights from "./PostItemHighlights";

type Props = {
  post: Post;
  active: boolean;
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

const PostItemContent = ({ post, active }: Props) => {
  const [highlights, setHighlights] = React.useState<Highlight[]>([]);

  const [activeHighlight, setActiveHighlight] =
    React.useState<HighlightWithOptionalId>();

  React.useEffect(() => {
    setHighlights(post.highlights);
  }, [post]);

  const onSelect = React.useCallback(
    (e: TextSelectionEvent) => {
      const { startOffset, endOffset } = e.range;
      const length = endOffset - startOffset;

      window.getSelection()?.removeAllRanges();

      if (length <= 0 || hasOverlap(startOffset, endOffset, highlights)) return;

      const newHighlight = {
        start: startOffset,
        length,
        postId: post.id,
        labels: [],
        comment: "",
      };

      setActiveHighlight(newHighlight);
    },
    [post, highlights],
  );

  const ref = React.useRef<HTMLDivElement>(null);

  useTextSelection(ref, { enabled: active, onSelect });

  return (
    <div className="flex gap-4 items-start">
      <div className="flex flex-col gap-8">
        <div
          ref={ref}
          className={`mt-2 text-md text-fg-secondary w-[36vw]
            whitespace-break-spaces ${
              active
                ? "max-h-[75vh] overflow-scroll"
                : "max-h-12 overflow-hidden"
            }`}
        >
          <HighlightedText
            highlights={highlights}
            activeHighlight={activeHighlight}
            text={post.content}
          />
        </div>

        {active && <Button className="self-start">Save</Button>}
      </div>
      <PostItemHighlights
        highlight={activeHighlight}
        post={post}
        active={active}
      />
    </div>
  );
};

export default PostItemContent;
