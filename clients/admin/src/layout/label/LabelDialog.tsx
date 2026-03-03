import Button from "@/components/Button";
import ColorPicker from "@/components/ColorPicker";
import Dialog from "@/components/Dialog";
import { useCreateLabel } from "@/hooks/query/useCreateLabel";
import { type CreateLabelDto, type Label } from "@shared/types/label";
import React from "react";

type Props = {
  open?: boolean;
  onClose?: () => void;
};

const LabelDialog = ({ open = false, onClose }: Props) => {
  const { mutate } = useCreateLabel();
  const [label, setLabel] = React.useState<Partial<Label>>({ content: "" });

  const onLabelChange = (e: Partial<Label>) => {
    setLabel((old) => ({ ...old, ...e }));
  };

  const reset = () => {
    setLabel({ content: "" });
  };

  const _onClose = () => {
    reset();
    onClose?.();
  };

  const onCreate = () => {
    mutate(label as CreateLabelDto);
  };

  const valid = React.useMemo(() => !!label.color && !!label.content, [label]);

  return (
    <Dialog open={open} onClose={_onClose} title={"New label"}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-row items-start gap-4">
          <input
            className="input"
            placeholder="Name"
            value={label.content}
            onChange={(e) => onLabelChange({ content: e.target.value })}
          />
          <ColorPicker
            value={label.color}
            onChange={(color) => onLabelChange({ color })}
          />
        </div>
        <div className="flex flex-row items-center justify-end gap-4">
          <Button onClick={onClose}>Cancel</Button>
          <Button disabled={!valid} onClick={onCreate}>
            Create
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default LabelDialog;
