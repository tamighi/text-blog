import Autocomplete from "@/components/Autocomplete";
import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
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

  const { toast } = useToast();
  const { mutate, isPending } = useCreatePostLabel({
    onSuccess: () => {
      toast({ content: "Label assigned." });
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
  };

  const reset = () => {
    setLabel(undefined);
  };

  const _onClose = () => {
    reset();
    onClose?.();
  };

  const onAssign = () => {
    mutate({ postId, labelId: label!.id });
  };

  return (
    <Dialog open={open} onClose={_onClose} title={"New label"}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-row items-start gap-4">
          <Autocomplete
            placeholder="Name"
            options={labelOptions}
            onChange={onAutocompleteChange}
          />

          <div
            className="aspect-square rounded-lg h-10"
            style={{ backgroundColor: label?.color }}
          />
        </div>
        <div className="flex flex-row items-center justify-end gap-4">
          <Button onClick={onClose}>Cancel</Button>
          <Button disabled={!label || isPending} onClick={onAssign}>
            Assign
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default AssignLabelDialog;
