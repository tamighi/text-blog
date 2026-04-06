import type {
  HighlightWithOptionalId,
  Highlight,
} from "@shared/types/highlight";
import React from "react";

type Props = {
  text: string;
  highlights: Highlight[];
  activeHighlight?: HighlightWithOptionalId;
};

const HighlightedText = ({ text, highlights, activeHighlight }: Props) => {
  const allHighlights =
    !!activeHighlight && !activeHighlight.id
      ? [...highlights, activeHighlight]
      : highlights;

  const sorted = [...allHighlights].sort((a, b) => a.start - b.start);
  const result: React.ReactNode[] = [];

  let cursor = 0;

  sorted.forEach((h, i) => {
    const end = h.start + h.length;

    if (cursor < h.start) {
      result.push(text.slice(cursor, h.start));
    }

    result.push(
      <span
        key={h.id ?? `i_${i}`}
        style={{
          backgroundColor: activeHighlight?.id === h.id ? "orange" : "yellow",
        }}
      >
        {text.slice(h.start, end)}
      </span>,
    );

    cursor = end;
  });

  if (cursor < text.length) {
    result.push(text.slice(cursor));
  }

  return <>{result}</>;
};

export default HighlightedText;
