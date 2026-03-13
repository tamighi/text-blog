import Autocomplete from "@/components/Autocomplete";
import Button from "@/components/Button";
import ColorPicker from "@/components/ColorPicker";
import Dialog from "@/components/Dialog";
import useCreateLabel from "@/hooks/query/useCreateLabel";
import useCreatePostLabel from "@/hooks/query/useCreatePostLabel";
import useLabels from "@/hooks/query/useLabels";
import { type Label } from "@shared/types/label";
import React from "react";
import { useToast } from "../toast/ToastProvider";

type Props = {
  open?: boolean;
  onClose?: () => void;
  postId: number;
};

const AssignLabelDialog = ({ open = false, onClose, postId }: Props) => {
  const [label, setLabel] = React.useState<Label>();
  const [labelStr, setlabelStr] = React.useState("");
  const [color, setColor] = React.useState<string>();
  const [comment, setComment] = React.useState("");

  const { toast } = useToast();
  const { mutate: assignMutate, isPending: isAssignPending } =
    useCreatePostLabel({
      onSuccess: () => {
        toast({ content: "Label assigned." });
        _onClose();
      },
      onError: () => toast({ content: "Error" }),
    });

  const { mutate: createMutate, isPending: isCreatePending } = useCreateLabel({
    onSuccess: () => {
      toast({ content: "Label created." });
      _onClose();
    },
    onError: () => toast({ content: "Error" }),
  });

  const { data: labels = [] } = useLabels({
    enabled: open,
    queryParams: { excludePostId: postId },
  });

  const labelOptions = React.useMemo(
    () => labels.map((l) => l.content),
    [labels],
  );

  const onAutocompleteChange = (content: string) => {
    const newLabel = labels.find((v) => v.content === content);
    setLabel(newLabel);
    setlabelStr(content);
    if (newLabel) {
      setColor(newLabel.color);
    }
  };

  const reset = () => {
    setLabel(undefined);
    setlabelStr("");
    setComment("");
    setColor(undefined);
  };

  const _onClose = () => {
    reset();
    onClose?.();
  };

  const onAssign = () => {
    assignMutate({ postId, labelId: label!.id, comment });
  };

  const onCreateAndAssign = () => {
    createMutate(
      { content: labelStr, color: color as string },
      {
        onSuccess: (data) => {
          assignMutate({ postId, labelId: data.id, comment });
        },
      },
    );
  };

  return (
    <Dialog open={open} onClose={_onClose} title={"Assign label"}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-row items-start gap-4">
          <Autocomplete
            placeholder="Name"
            options={labelOptions}
            onChange={onAutocompleteChange}
            value={labelStr}
          />

          <ColorPicker
            value={label?.color ?? color}
            onChange={(color) => setColor(color)}
            disabled={!!label}
          />
        </div>
        <textarea
          className="input"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <div className="flex flex-row items-center justify-end gap-4">
          <Button onClick={onClose}>Cancel</Button>
          {!labelStr || label ? (
            <Button disabled={!label || isAssignPending} onClick={onAssign}>
              Assign
            </Button>
          ) : (
            <Button
              disabled={!labelStr || isAssignPending || isCreatePending}
              onClick={onCreateAndAssign}
            >
              Create & assign
            </Button>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default AssignLabelDialog;
