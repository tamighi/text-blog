import Autocomplete from "@/components/Autocomplete";
import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import useCreatePostLabel from "@/hooks/query/useCreatePostLabel";
import useLabels from "@/hooks/query/useLabels";
import { type Label } from "@shared/types/label";
import React from "react";
import { useToast } from "../toast/ToastProvider";
import type { Post } from "@shared/types/post";

type Props = {
  open?: boolean;
  onClose?: () => void;
  post: Post;
};

const CreatePostLabelDialog = ({ open = false, onClose, post }: Props) => {
  const [labelInput, setLabelInput] = React.useState("");
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
    setLabelInput(content);
  };

  const reset = () => {
    setLabelInput("");
    setComment("");
  };

  const _onClose = () => {
    reset();
    onClose?.();
  };

  const onCreatePostLabel = () => {
    const newLabel = labels.find((l) => l.content === labelInput);
    mutate({ postId: post.id, labelId: newLabel!.id, comment });
  };

  return (
    <Dialog open={open} onClose={_onClose} title={"Assign label"}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-row gap-4">
          <Autocomplete
            placeholder="Name"
            value={labelInput}
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
          <Button
            disabled={!labelInput || isPending}
            onClick={onCreatePostLabel}
          >
            Assign
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default CreatePostLabelDialog;
