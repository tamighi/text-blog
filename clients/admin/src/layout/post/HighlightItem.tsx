import type { HighlightWithOptionalId } from "@shared/types/highlight";
import LabelChip from "../label/LabelChip";

type Props = {
  highlight: HighlightWithOptionalId;
};

const HighlightItem = ({ highlight }: Props) => {
  return (
    <div className="flex gap-4">
      {highlight.labels.map((l, i) => {
        return (
          <div className="flex gap-2 items-center">
            <span>{i + 1}: </span>
            <LabelChip key={l.id} label={l} />
          </div>
        );
      })}
    </div>
  );
};

export default HighlightItem;
