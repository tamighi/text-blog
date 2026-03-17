import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import Popover from "@/components/Popover";
import useDeleteLabel from "@/hooks/query/useDeleteLabel";
import type { Label } from "@shared/types/label";
import React from "react";
import { useToast } from "../toast/ToastProvider";

type Props = {
  label: Label;
};

const LabelItem = ({ label }: Props) => {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const labelRef = React.useRef<HTMLDivElement>(null);

  const { mutate } = useDeleteLabel({
    onSuccess: () => {
      toast({ content: "Label deleted." });
    },
    onError: () => toast({ content: "Error" }),
  });

  const onDelete = () => {
    mutate(label.id);
  };

  return (
    <>
      <div
        ref={labelRef}
        className="px-2 py-1 rounded-full relative"
        style={{ backgroundColor: label.color }}
      >
        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center absolute w-5 h-5 -right-2
            -top-3 bg-elevation-2 rounded-full cursor-pointer"
        >
          ×
        </button>
        <span className="text-black">{label.content}</span>
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
      </div>
      <Popover anchorRef={labelRef}>{label.content}</Popover>
    </>
  );
};

export default LabelItem;
