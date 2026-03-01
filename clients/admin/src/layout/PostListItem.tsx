import type { Post } from "@shared/index";
import React from "react";

type Props = {
  post: Post;
};

const PostListItem = ({ post }: Props) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="py-4 max-w-2xl">
      <h2 className="font-medium cursor-pointer" onClick={handleClick}>
        {post.title}
      </h2>

      <p
        className={`mt-2 text-sm text-fg-secondary whitespace-break-spaces ${
          expanded ? "" : "line-clamp-3"
        }`}
      >
        {post.content}
      </p>
    </div>
  );
};

export default PostListItem;
