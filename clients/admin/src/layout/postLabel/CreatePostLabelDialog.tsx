import Autocomplete from "@/components/Autocomplete";
import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import useCreatePostLabel from "@/hooks/query/useCreatePostLabel";
import useLabels from "@/hooks/query/useLabels";
import type { Post } from "@shared/index";
import { type Label } from "@shared/types/label";
import React from "react";
import { useToast } from "../toast/ToastProvider";

type Props = {
  open?: boolean;
  onClose?: () => void;
  post: Post;
};

const CreatePostLabelDialog = ({ open = false, onClose, post }: Props) => {
  const [label, setLabel] = React.useState<Label>();
  const [comment, setComment] = React.useState("");

  const { toast } = useToast();
  const { mutate, isPending } = useCreatePostLabel({
    onSuccess: () => {
      toast({ content: "Label assigned." });
      _onClose();
    },
    onError: () => toast({ content: "Error" }),
  });

  const { data: labels = [] } = useLabels({ enabled: open });

  const labelOptions = React.useMemo(
    () =>
      labels
        .filter((l) => !post.postLabels.some((pl) => pl.id === l.id))
        .map((l) => l.content),
    [labels],
  );

  const onAutocompleteChange = (content: string) => {
    const newLabel = labels.find((v) => v.content === content);
    setLabel(newLabel);
  };

  const reset = () => {
    setLabel(undefined);
    setComment("");
  };

  const _onClose = () => {
    reset();
    onClose?.();
  };

  const onCreatePostLabel = () => {
    mutate({ postId: post.id, labelId: label!.id, comment });
  };

  return (
    <Dialog open={open} onClose={_onClose} title={"Assign label"}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-row gap-4">
          <Autocomplete
            placeholder="Name"
            options={labelOptions}
            onChange={onAutocompleteChange}
          />
          <textarea
            className="input"
            placeholder="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <div className="flex gap-4 items-center justify-end">
          <Button onClick={onClose}>Cancel</Button>
          <Button disabled={!label || isPending} onClick={onCreatePostLabel}>
            Assign
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default CreatePostLabelDialog;
