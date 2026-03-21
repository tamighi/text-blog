import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import Popover from "@/components/Popover";
import type { Label } from "@shared/types/label";
import React from "react";

type Props = {
  label: Label;
  onDelete: () => void;
  confirmOnDelete?: boolean;
  popoverNode?: React.ReactNode;
};

const LabelChip = ({
  label,
  onDelete,
  confirmOnDelete = true,
  popoverNode,
}: Props) => {
  const [open, setOpen] = React.useState(false);
  const labelRef = React.useRef<HTMLDivElement>(null);

  const _onDelete = () => {
    if (confirmOnDelete) setOpen(true);
    else onDelete();
  };

  return (
    <>
      <div
        ref={labelRef}
        className="px-2 py-1 rounded-full relative bg-elevation-1"
      >
        <button
          onClick={_onDelete}
          className="flex items-center justify-center absolute w-5 h-5 -right-2
            -top-3 bg-elevation-2 rounded-full cursor-pointer"
        >
          ×
        </button>
        <span className="text-secondary">{label.content}</span>
      </div>
      {popoverNode && <Popover anchorRef={labelRef}>{popoverNode}</Popover>}
      {confirmOnDelete && (
        <Dialog title="Delete label" open={open} onClose={() => setOpen(false)}>
          <div className="flex flex-col gap-4">
            <span>Confirm deletion?</span>
            <div className="flex justify-end gap-4">
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={onDelete} color="success">
                Confirm
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default LabelChip;
