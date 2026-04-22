import type { HighlightWithOptionalId } from "@shared/types/highlight";
import LabelChip from "../label/LabelChip";

type Props = {
  highlight: HighlightWithOptionalId;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
};

const HighlightItem = ({
  onMouseOver,
  onMouseLeave,
  onClick,
  highlight,
}: Props) => {
  return (
    <div className="flex gap-4">
      {highlight.labels.map((l, i) => {
        return (
          <div
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            key={l.id}
            className="flex gap-2 items-center cursor-pointer"
          >
            <span>{i + 1}: </span>
            <LabelChip label={l} />
          </div>
        );
      })}
    </div>
  );
};

export default HighlightItem;
