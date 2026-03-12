import Button from "@/components/Button";
import type { Post } from "@shared/index";
import React from "react";
import AssignLabelDialog from "../label/AssignLabelDialog";
import PostLabelItem from "../label/PostLabelItem";

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
        <PostLabelItem postLabel={postLabel} key={postLabel.label.id} />
      ))}

      {active && <Button onClick={() => setOpen(true)}>+</Button>}

      <AssignLabelDialog
        postId={post.id}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default PostItemHeader;
