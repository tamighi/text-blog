import useUpdatePost from "@/hooks/query/useUpdatePost";
import type { Label } from "@shared/types/label";
import type { Post } from "@shared/types/post";
import React from "react";
import LabelChip from "../label/LabelChip";
import LabelPicker from "../label/LabelPicker";
import { useToast } from "../toast/ToastProvider";

type Props = {
  post: Post;
  onClick: () => void;
  active: boolean;
};

const PostItemHeader = ({ post, onClick, active }: Props) => {
  const { toast } = useToast();

  const { mutate } = useUpdatePost({
    onError: () => toast({ content: "Error" }),
  });

  const onDelete = (labelId: number) => {
    mutate(
      {
        id: post.id,
        dto: {
          labelIds: post.labels
            .filter((l) => l.id !== labelId)
            .map((l) => l.id),
        },
      },
      { onSuccess: () => toast({ content: "Label deleted" }) },
    );
  };

  const onLabelClick = (newLabel: Label) => {
    mutate(
      {
        id: post.id,
        dto: {
          labelIds: [...post.labels.map((l) => l.id), newLabel.id],
        },
      },
      { onSuccess: () => toast({ content: "Label added" }) },
    );
  };

  const labelFilter = React.useCallback(
    (labels: Label[]) =>
      labels.filter((l) => !post.labels.some((pl) => l.id === pl.id)),
    [post],
  );

  return (
    <div className="flex items-center gap-4">
      <h2 className="font-medium cursor-pointer" onClick={onClick}>
        {post.title}
      </h2>

      {post.labels.map((l) => (
        <LabelChip label={l} key={l.id} onDelete={() => onDelete(l.id)} />
      ))}

      {active && (
        <LabelPicker onLabelClick={onLabelClick} filter={labelFilter} />
      )}
    </div>
  );
};

export default PostItemHeader;
