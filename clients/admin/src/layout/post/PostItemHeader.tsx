import Button from "@/components/Button";
import useUpdatePost from "@/hooks/query/useUpdatePost";
import type { Post } from "@shared/types/post";
import React from "react";
import LabelChip from "../label/LabelChip";
import CreatePostLabelDialog from "../postLabel/CreatePostLabelDialog";
import { useToast } from "../toast/ToastProvider";

type Props = {
  post: Post;
  onClick: () => void;
  active: boolean;
};

const PostItemHeader = ({ post, onClick, active }: Props) => {
  const [open, setOpen] = React.useState(false);

  const { toast } = useToast();

  const { mutate } = useUpdatePost({
    onSuccess: () => toast({ content: "Label deleted" }),
    onError: () => toast({ content: "Error" }),
  });

  const onDelete = (labelId: number) => {
    mutate({
      id: post.id,
      dto: {
        labelIds: post.labels.filter((l) => l.id !== labelId).map((l) => l.id),
      },
    });
  };

  return (
    <div className="flex items-center gap-4">
      <h2 className="font-medium cursor-pointer" onClick={onClick}>
        {post.title}
      </h2>

      {post.labels.map((l) => (
        <LabelChip label={l} key={l.id} onDelete={() => onDelete(l.id)} />
      ))}

      {active && <Button onClick={() => setOpen(true)}>+</Button>}

      <CreatePostLabelDialog
        post={post}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default PostItemHeader;
