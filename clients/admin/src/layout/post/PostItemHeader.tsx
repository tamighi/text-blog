import Button from "@/components/Button";
import type { Post } from "@shared/index";
import React from "react";
import CreatePostLabelDialog from "../label/CreatePostLabelDialog";
import PostLabelChip from "../label/PostLabelChip";

type Props = {
  post: Post;
  onClick: () => void;
  active: boolean;
};

const PostItemHeader = ({ post, onClick, active }: Props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex items-center gap-4">
      <h2 className="font-medium cursor-pointer" onClick={onClick}>
        {post.title}
      </h2>

      {post.postLabels.map((postLabel) => (
        <PostLabelChip postLabel={postLabel} key={postLabel.label.id} />
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
