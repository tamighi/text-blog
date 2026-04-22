import Popover from "@/components/Popover";
import type { Label } from "@shared/types/label";
import React from "react";

type Props = {
  label: Label;
  onDelete?: () => void;
  popoverNode?: React.ReactNode;
};

const LabelChip = ({ label, onDelete, popoverNode }: Props) => {
  const labelRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        ref={labelRef}
        className="px-2 py-1 rounded-full relative bg-elevation-1"
      >
        {onDelete && (
          <button
            onClick={onDelete}
            className="flex items-center justify-center absolute w-5 h-5
              -right-2 -top-3 bg-elevation-2 rounded-full cursor-pointer"
          >
            ×
          </button>
        )}
        <span className="text-secondary">{label.content}</span>
      </div>
      {popoverNode && <Popover anchorRef={labelRef}>{popoverNode}</Popover>}
    </>
  );
};

export default LabelChip;
