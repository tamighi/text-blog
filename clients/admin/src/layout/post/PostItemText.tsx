import {
  useTextSelection,
  type TextSelectionEvent,
} from "@/hooks/useTextSelection";
import type { HighlightWithOptionalId } from "@shared/types/highlight";
import type { Post } from "@shared/types/post";
import React from "react";

type Props = {
  post: Post;
  active: boolean;
  onSelect?: (e: TextSelectionEvent) => void;
  onClear?: () => void;
};

type Segment = {
  start: number;
  end: number;
  highlights: HighlightWithOptionalId[];
};

function buildSegments(
  text: string,
  highlights: HighlightWithOptionalId[],
): Segment[] {
  const points = new Set<number>();

  highlights.forEach((h) => {
    points.add(h.start);
    points.add(h.start + h.length);
  });

  points.add(0);
  points.add(text.length);

  const sorted = Array.from(points).sort((a, b) => a - b);

  const segments: Segment[] = [];

  for (let i = 0; i < sorted.length - 1; i++) {
    const start = sorted[i];
    const end = sorted[i + 1];

    const active = highlights.filter(
      (h) => h.start < end && h.start + h.length > start,
    );

    segments.push({ start, end, highlights: active });
  }

  return segments;
}

function defaultHighlightRenderer(
  children: React.ReactNode,
  highlights: HighlightWithOptionalId[],
) {
  return highlights.reduceRight((acc, h, i) => {
    return (
      <span
        key={h.id ?? i}
        style={{ backgroundColor: "yellow" }}
        data-highlight-id={h.id}
      >
        {acc}
      </span>
    );
  }, children);
}

export function renderHighlightedText(
  text: string,
  highlights: HighlightWithOptionalId[],
  renderHighlight = defaultHighlightRenderer,
) {
  const segments = buildSegments(text, highlights);

  return segments.map((seg) => {
    const content = text.slice(seg.start, seg.end);

    if (seg.highlights.length === 0) {
      return (
        <React.Fragment key={`${seg.start}-${seg.end}`}>
          {content}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment key={`${seg.start}-${seg.end}`}>
        {renderHighlight(content, seg.highlights)}
      </React.Fragment>
    );
  });
}

const PostItemText = ({ post, active, onClear }: Props) => {
  const [highlights, setHighlights] = React.useState<HighlightWithOptionalId[]>(
    [],
  );

  const [newHighlight, setNewHighlight] =
    React.useState<HighlightWithOptionalId | null>(null);

  React.useEffect(() => {
    setHighlights(post.highlights);
  }, [post]);

  const onSelect = React.useCallback(
    (e: TextSelectionEvent) => {
      const { startOffset, endOffset } = e.range;
      const length = endOffset - startOffset;

      if (length <= 0) return;

      setNewHighlight({
        start: startOffset,
        length,
        postId: post.id,
        labels: [],
        comment: "",
      });
    },
    [post],
  );

  const ref = React.useRef<HTMLDivElement>(null);

  useTextSelection(ref, { enabled: active, onSelect, onClear });

  const rendered = React.useMemo(() => {
    const allHighlights = newHighlight
      ? [...highlights, newHighlight]
      : highlights;

    return renderHighlightedText(post.content, allHighlights);
  }, [post.content, highlights, newHighlight]);

  return (
    <div
      ref={ref}
      className={`mt-2 text-md text-fg-secondary w-[36vw]
        whitespace-break-spaces ${
          active ? "max-h-[75vh] overflow-scroll" : "max-h-12 overflow-hidden"
        }`}
    >
      {rendered}
    </div>
  );
};

export default PostItemText;
