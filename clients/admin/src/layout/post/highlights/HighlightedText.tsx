import type { HighlightWithOptionalId } from "@shared/types/highlight";
import React from "react";

export type HighlightWithState = HighlightWithOptionalId & {
  state?: "hovered" | "active";
};

type Props = {
  text: string;
  highlights: HighlightWithState[];
};

const HighlightedText = ({ text, highlights }: Props) => {
  const sorted = [...highlights].sort((a, b) => a.start - b.start);
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
          backgroundColor:
            h.state === "active"
              ? "orange"
              : h.state === "hovered"
                ? "red"
                : "yellow",
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
